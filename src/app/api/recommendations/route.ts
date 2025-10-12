import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, RakutenProduct, Recommendation } from '@/types';
import { ProductCacheService } from '@/lib/product-cache';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 推薦結果のキャッシュ（メモリ内、15分間保持）
const recommendationCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15分

function getCacheKey(userId: string, excludeItemCodes: string[]): string {
  return `${userId}_${excludeItemCodes.sort().join(',')}`;
}

function getFromCache(key: string) {
  const cached = recommendationCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  recommendationCache.delete(key);
  return null;
}

function setCache(key: string, data: unknown) {
  recommendationCache.set(key, { data, timestamp: Date.now() });

  // キャッシュのクリーンアップ（古いエントリを削除）
  if (recommendationCache.size > 100) {
    const now = Date.now();
    for (const [k, v] of recommendationCache.entries()) {
      if (now - v.timestamp >= CACHE_DURATION) {
        recommendationCache.delete(k);
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, excludeItemCodes = [] } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'ユーザーIDが必要です' },
        { status: 400 }
      );
    }

    // キャッシュをチェック
    const cacheKey = getCacheKey(userId, excludeItemCodes);
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // 1. Firestoreからユーザー情報を取得
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    const user = userDoc.data() as User;

    // 2. ユーザーの好みカテゴリから楽天APIで返礼品を取得
    const categories = user.preferences.categories;
    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: 'カテゴリが設定されていません' },
        { status: 400 }
      );
    }

    // 推奨額（限度額の1/3）
    const maxPrice = Math.floor(user.calculatedLimit / 3);

    const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;
    const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

    if (!APPLICATION_ID) {
      return NextResponse.json(
        { error: 'Rakuten API Application ID is not configured' },
        { status: 500 }
      );
    }

    // 複数のカテゴリから商品を取得して候補を増やす（最大300件）
    let products: RakutenProduct[] = [];

    // ユーザーカテゴリをシャッフル（多様性のため）
    const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);

    // 最大10カテゴリから取得（30件 × 10 = 最大300件）
    // ProductCacheServiceを使用してキャッシュ優先で取得
    for (const category of shuffledCategories.slice(0, 10)) {
      try {
        const fetchedProducts = await ProductCacheService.getProducts(
          category,
          APPLICATION_ID,
          AFFILIATE_ID,
          maxPrice >= 100 ? maxPrice : undefined,
          30
        );

        if (fetchedProducts.length > 0) {
          // 重複を避けるため、itemCodeでフィルタリング
          const existingItemCodes = new Set(products.map(p => p.itemCode));
          const newProducts = fetchedProducts.filter(
            (p: RakutenProduct) => !existingItemCodes.has(p.itemCode)
          );
          products = [...products, ...newProducts];
        }
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        // エラーが発生しても次のカテゴリを試す
        continue;
      }
    }

    // 除外リストがある場合はフィルタリング
    if (excludeItemCodes.length > 0) {
      products = products.filter(p => !excludeItemCodes.includes(p.itemCode));
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: '返礼品が見つかりませんでした' },
        { status: 404 }
      );
    }

    // 3. Claude APIにユーザー情報と商品リストを渡して推薦を取得
    const productList = products.map((p, i) =>
      `${i}. itemCode: ${p.itemCode} - ${p.itemName} (${p.itemPrice.toLocaleString()}円)`
    ).join('\n');

    // 現在の月を取得
    const currentMonth = new Date().getMonth() + 1;

    // 気になる・興味なしリストを取得
    const favorites = user.preferences.favorites || [];
    const dislikes = user.preferences.dislikes || [];

    // 簡潔なユーザー情報（トークン削減）
    const userInfo = `既婚:${user.familyStructure.married ? 1 : 0}|扶養:${user.familyStructure.dependents}|年収:${user.income.annualIncome}|限度額:${user.calculatedLimit}|カテゴリ:${categories.join(',')}|アレルギー:${user.preferences.allergies?.join(',') || 'なし'}|過去選択:${user.preferences.pastSelections?.length || 0}|気になる:${favorites.join(',') || 'なし'}|興味なし:${dislikes.join(',') || 'なし'}`;

    const prompt = `ふるさと納税返礼品を9つ選定。現在は${currentMonth}月です。

ユーザー: ${userInfo}

商品:
${productList}

基準:
1) カテゴリ合致
2) アレルギー除外
3) 価格≒限度額/3
4) 高評価
5) 家族構成考慮
6) 過去選択除外
7) 多様性
8) 季節性: ${currentMonth}月に旬・適した商品は+5点ボーナス（例: 10月なら栗・さつまいも・柿・秋刀魚など秋の味覚）
9) 好み反映: 気になるリストの商品と類似する商品(カテゴリ・食材・特徴が似ている)は+10点、興味なしリストの商品と類似する商品は-10点

以下のJSON形式のみで回答してください。説明文は一切不要です:
{"recommendations":[{"itemCode":"商品コード","reason":"理由(50字以内)","score":95},...]}`;

    // Claude APIを呼び出し（リトライ機能付き）
    let message;
    let retries = 0;
    const maxRetries = 3;
    const retryDelay = 2000; // 2秒

    while (retries < maxRetries) {
      try {
        message = await anthropic.messages.create({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: prompt
          }]
        });
        break; // 成功したらループを抜ける
      } catch (error) {
        retries++;

        // 過負荷エラー（529）またはレート制限エラー（429）の場合はリトライ
        if (error && typeof error === 'object' && 'status' in error && (error.status === 529 || error.status === 429) && retries < maxRetries) {
          console.log(`Claude API overloaded, retrying in ${retryDelay}ms... (attempt ${retries}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * retries)); // 指数バックオフ
          continue;
        }

        // その他のエラーまたは最大リトライ回数に達した場合は投げる
        throw error;
      }
    }

    if (!message) {
      throw new Error('Claude APIへのリクエストが失敗しました');
    }

    // Claudeのレスポンスからテキストを抽出
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('');

    console.log('Claude API Response:', responseText);

    // JSONを抽出（複数のパターンに対応）
    let jsonText = responseText;

    // パターン1: マークダウンのコードブロック
    const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) || responseText.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // パターン2: 中括弧で囲まれたJSON部分を抽出
      const braceMatch = responseText.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
      if (braceMatch) {
        jsonText = braceMatch[0];
      }
    }

    // JSONをパース
    let claudeResponse;
    try {
      claudeResponse = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Attempted to parse:', jsonText);
      throw new Error('Claude APIからの応答の解析に失敗しました');
    }

    if (!claudeResponse.recommendations || !Array.isArray(claudeResponse.recommendations)) {
      console.error('Invalid response structure:', claudeResponse);
      throw new Error('Claude APIからの応答形式が不正です');
    }

    const recommendations: Recommendation[] = claudeResponse.recommendations;

    // 4. 商品コードでマッチングして完全な情報を返す
    const enrichedRecommendations = recommendations.map(rec => {
      const product = products.find(p => p.itemCode === rec.itemCode);
      return {
        ...rec,
        product
      };
    });

    const result = {
      success: true,
      recommendations: enrichedRecommendations
    };

    // 結果をキャッシュに保存
    setCache(cacheKey, result);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error generating recommendations:', error);

    // エラーの種類に応じたメッセージを返す
    let errorMessage = '推薦の生成に失敗しました';
    let statusCode = 500;

    if (error && typeof error === 'object' && 'status' in error) {
      if (error.status === 529) {
        errorMessage = 'AI推薦サービスが混雑しています。しばらく待ってから再度お試しください。';
        statusCode = 503;
      } else if (error.status === 429) {
        errorMessage = 'リクエストが多すぎます。少し時間をおいてから再度お試しください。';
        statusCode = 429;
      }
    } else if (error instanceof Error && error.message?.includes('解析に失敗')) {
      errorMessage = 'AI推薦の応答処理に失敗しました。もう一度お試しください。';
      statusCode = 500;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
        retryable: error && typeof error === 'object' && 'status' in error && (error.status === 529 || error.status === 429)
      },
      { status: statusCode }
    );
  }
}
