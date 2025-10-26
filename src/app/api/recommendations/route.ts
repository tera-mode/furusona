import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { adminDb } from '@/lib/firebase-admin';
import { User, RakutenProduct, Recommendation } from '@/types';
import { ProductCacheService } from '@/lib/product-cache';
import { getCategoryById } from '@/lib/categoryMapping';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// APIキーの確認
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
} else {
  console.log('✅ GEMINI_API_KEY is set');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Gemini 2.5 Flash Lite を使用（より高速・低コスト）
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
});

// 推薦結果のキャッシュ（メモリ内、15分間保持）
const recommendationCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15分

function getCacheKey(userId: string, excludeItemCodes: string[], userUpdatedAt?: Date | number): string {
  const timestamp = userUpdatedAt instanceof Date ? userUpdatedAt.getTime() : userUpdatedAt || 0;
  return `${userId}_${timestamp}_${excludeItemCodes.sort().join(',')}`;
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

    // 1. Firestoreからユーザー情報を取得
    const userDoc = await adminDb.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    if (!userData) {
      return NextResponse.json(
        { error: 'ユーザーデータが取得できません' },
        { status: 404 }
      );
    }

    const user = {
      ...userData,
      createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt),
      updatedAt: userData.updatedAt?.toDate ? userData.updatedAt.toDate() : new Date(userData.updatedAt),
    } as User;

    // キャッシュをチェック（ユーザー情報取得後、updatedAtを含めて）
    const cacheKey = getCacheKey(userId, excludeItemCodes, user.updatedAt);
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      console.log('✅ Cache hit, returning cached recommendations');
      return NextResponse.json(cachedResult);
    }

    // 2. ユーザーの好みカテゴリから楽天APIで返礼品を取得
    // カテゴリが未選択の場合、デフォルトカテゴリを使用
    let categories = user.preferences.categories;
    if (!categories || categories.length === 0) {
      console.log('⚠️ No categories set, using default popular categories');
      categories = ['meat', 'seafood', 'fruits', 'rice', 'sweets'];
    }

    // 推奨額（限度額の1/3）
    // 限度額が未設定の場合、デフォルトで50,000円を上限とする
    const calculatedLimit = user.calculatedLimit || 150000; // デフォルト15万円
    const maxPrice = Math.floor(calculatedLimit / 3);

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
    for (const categoryId of shuffledCategories.slice(0, 10)) {
      try {
        // カテゴリ情報を取得
        const categoryInfo = getCategoryById(categoryId);

        // カテゴリのキーワードリストから最初のキーワードを使用
        // より具体的な検索のため
        const searchKeyword = categoryInfo?.rakutenKeywords?.[0] || categoryInfo?.displayName || categoryId;

        console.log(`Fetching products for category: ${categoryId}, keyword: ${searchKeyword}`);

        const fetchedProducts = await ProductCacheService.getProducts(
          searchKeyword,
          APPLICATION_ID,
          AFFILIATE_ID,
          maxPrice >= 100 ? maxPrice : undefined,
          30
        );

        if (fetchedProducts.length > 0) {
          console.log(`Retrieved ${fetchedProducts.length} products for ${searchKeyword}`);
          // 重複を避けるため、itemCodeでフィルタリング
          const existingItemCodes = new Set(products.map(p => p.itemCode));
          const newProducts = fetchedProducts.filter(
            (p: RakutenProduct) => !existingItemCodes.has(p.itemCode)
          );
          products = [...products, ...newProducts];
        } else {
          console.log(`No products found for ${searchKeyword}`);
        }
      } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        // エラーが発生しても次のカテゴリを試す
        continue;
      }
    }

    // 除外リストがある場合はフィルタリング
    if (excludeItemCodes.length > 0) {
      products = products.filter(p => !excludeItemCodes.includes(p.itemCode));
    }

    console.log(`Total products retrieved: ${products.length}`);

    if (!products || products.length === 0) {
      console.error('No products found for any category');
      console.error('User categories:', categories);
      console.error('Max price:', maxPrice);

      return NextResponse.json(
        { error: '返礼品が見つかりませんでした' },
        { status: 404 }
      );
    }

    // サーバー側で事前フィルタリング・スコアリング（コスト削減のため）
    const scoredProducts = products.map(p => {
      let score = 0;

      // 1. レビュースコア (0-30点)
      if (p.reviewCount > 0) {
        score += Math.min(p.reviewAverage * 5, 25); // 最大25点
        score += Math.min(Math.log10(p.reviewCount + 1) * 2, 5); // レビュー数 最大5点
      }

      // 2. 価格適合度 (0-20点)
      const idealPrice = calculatedLimit / 3;
      const priceDiff = Math.abs(p.itemPrice - idealPrice) / idealPrice;
      score += Math.max(0, 20 - priceDiff * 20);

      // 3. カテゴリ合致度 (0-15点)
      const productNameLower = p.itemName.toLowerCase();
      for (const category of categories) {
        if (productNameLower.includes(category)) {
          score += 15;
          break;
        }
      }

      // 4. アレルギー除外 (該当なら0点)
      if (user.preferences.allergies && user.preferences.allergies.length > 0) {
        for (const allergen of user.preferences.allergies) {
          if (productNameLower.includes(allergen.toLowerCase())) {
            score = 0;
            break;
          }
        }
      }

      return { ...p, preScore: score };
    });

    // スコア順にソートして上位20件のみをGemini APIに送信（プロンプト短縮）
    const topProducts = scoredProducts
      .filter(p => p.preScore > 0)
      .sort((a, b) => b.preScore - a.preScore)
      .slice(0, 20);

    if (topProducts.length === 0) {
      return NextResponse.json(
        { error: '条件に合う返礼品が見つかりませんでした' },
        { status: 404 }
      );
    }

    // 3. Gemini APIに商品リストを渡して推薦を取得
    // 超短縮プロンプト
    const productList = topProducts.map((p) =>
      `ID:${String(p.itemCode)}|${p.itemName.slice(0, 30)}|¥${p.itemPrice}`
    ).join('\n');

    const prompt = `以下の商品から9つ選びJSON形式のみで回答。説明文不要。

商品:
${productList}

家族:${user.familyStructure.married?'既婚':'独身'},扶養${user.familyStructure.dependents}人
好み:${categories.join(',')}

itemCodeはID:の後の完全な文字列を使用。
{"recommendations":[{"itemCode":"f132039-musashino:10000198","reason":"理由25字","score":85},...]}`;

    console.log('=== Prompt Info ===');
    console.log(`Prompt length: ${prompt.length} characters`);
    console.log(`Products filtered: ${products.length} -> ${topProducts.length}`);
    console.log('===================');

    // Gemini APIを呼び出し（リトライ機能付き）
    let result;
    let retries = 0;
    const maxRetries = 3;
    const retryDelay = 2000; // 2秒

    while (retries < maxRetries) {
      try {
        result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });
        break; // 成功したらループを抜ける
      } catch (error) {
        retries++;

        // レート制限エラーや過負荷の場合はリトライ
        if (retries < maxRetries) {
          console.log(`Gemini API error, retrying in ${retryDelay}ms... (attempt ${retries}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * retries)); // 指数バックオフ
          continue;
        }

        // その他のエラーまたは最大リトライ回数に達した場合は投げる
        throw error;
      }
    }

    if (!result) {
      throw new Error('Gemini APIへのリクエストが失敗しました');
    }

    // トークン使用量をログ出力（Gemini 2.5 Flash料金）
    const usage = result.response.usageMetadata;
    const inputTokens = usage?.promptTokenCount || 0;
    const outputTokens = usage?.candidatesTokenCount || 0;
    const inputCost = (inputTokens / 1_000_000) * 0.075; // $0.075 per 1M input tokens
    const outputCost = (outputTokens / 1_000_000) * 0.30; // $0.30 per 1M output tokens
    const totalCost = inputCost + outputCost;

    console.log('=== Gemini API Usage ===');
    console.log(`Input tokens: ${inputTokens}`);
    console.log(`Output tokens: ${outputTokens}`);
    console.log(`Input cost: $${inputCost.toFixed(6)}`);
    console.log(`Output cost: $${outputCost.toFixed(6)}`);
    console.log(`Total cost: $${totalCost.toFixed(6)}`);
    console.log(`Products sent to Gemini: ${topProducts.length}`);
    console.log('========================');

    // Geminiのレスポンスをデバッグ
    console.log('Full response object:', JSON.stringify(result.response, null, 2));

    // レスポンスがブロックされていないか確認
    if (result.response.promptFeedback?.blockReason) {
      console.error('Response blocked:', result.response.promptFeedback.blockReason);
      throw new Error(`Gemini APIがブロックしました: ${result.response.promptFeedback.blockReason}`);
    }

    // Geminiのレスポンスからテキストを抽出
    const responseText = result.response.text();

    console.log('Gemini API Response:', responseText);

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
    let apiResponse;
    try {
      apiResponse = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Attempted to parse:', jsonText);
      throw new Error('Gemini APIからの応答の解析に失敗しました');
    }

    if (!apiResponse.recommendations || !Array.isArray(apiResponse.recommendations)) {
      console.error('Invalid response structure:', apiResponse);
      throw new Error('Gemini APIからの応答形式が不正です');
    }

    const recommendations: Recommendation[] = apiResponse.recommendations;

    // 4. 商品コードでマッチングして完全な情報を返す
    console.log('=== Product Matching ===');
    console.log(`Total recommendations from Gemini: ${recommendations.length}`);
    console.log(`Available products: ${topProducts.length}`);

    const enrichedRecommendations = recommendations.map(rec => {
      // 型を統一して比較（両方とも文字列に変換）
      const product = topProducts.find(p => String(p.itemCode) === String(rec.itemCode));
      if (!product) {
        console.log(`⚠️ Product not found for itemCode: ${rec.itemCode}`);
        console.log(`Available itemCodes sample:`, topProducts.slice(0, 5).map(p => String(p.itemCode)));
      }
      return {
        ...rec,
        product
      };
    }).filter(rec => rec.product !== undefined); // productが見つからないものは除外

    console.log(`Enriched recommendations: ${enrichedRecommendations.length}`);
    console.log('========================');

    const responseData = {
      success: true,
      recommendations: enrichedRecommendations
    };

    // 結果をキャッシュに保存
    setCache(cacheKey, responseData);

    return NextResponse.json(responseData);

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
