import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, RakutenProduct, Recommendation } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

    // 複数のカテゴリから商品を取得して候補を増やす
    let products: RakutenProduct[] = [];
    const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);

    // 最大3つのカテゴリから商品を取得（候補を増やすため）
    for (const category of shuffledCategories.slice(0, 3)) {
      try {
        const rakutenUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/rakuten`);
        rakutenUrl.searchParams.set('keyword', category);
        rakutenUrl.searchParams.set('maxPrice', maxPrice.toString());
        rakutenUrl.searchParams.set('hits', '30');

        const rakutenResponse = await fetch(rakutenUrl.toString());

        if (rakutenResponse.ok) {
          const rakutenData = await rakutenResponse.json();
          if (rakutenData.products && rakutenData.products.length > 0) {
            // 重複を避けるため、itemCodeでフィルタリング
            const existingItemCodes = new Set(products.map(p => p.itemCode));
            const newProducts = rakutenData.products.filter(
              (p: RakutenProduct) => !existingItemCodes.has(p.itemCode)
            );
            products = [...products, ...newProducts];
          }
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

    const userInfo = `
【ユーザー情報】
- 家族構成: ${user.familyStructure.married ? '既婚' : '独身'}、扶養人数: ${user.familyStructure.dependents}人
- 年収: ${user.income.annualIncome.toLocaleString()}円
- 限度額: ${user.calculatedLimit.toLocaleString()}円
- 好きなカテゴリ: ${categories.join(', ')}
- アレルギー: ${user.preferences.allergies?.join(', ') || 'なし'}
- 過去の選択: ${user.preferences.pastSelections?.length || 0}件
`;

    const prompt = `あなたはふるさと納税コンシェルジュです。以下の情報からユーザーに最適な返礼品を9つ選んでください。

${userInfo}

【商品リスト】
${productList}

【重要な選定基準】
1. ユーザーの好みカテゴリに合致すること
2. アレルギーがある場合は除外すること
3. 価格が限度額の1/3程度であること
4. レビューが多く評価が高いこと
5. 家族構成を考慮すること（家族が多い場合は量が多いもの）
6. 過去の選択と重複しないこと
7. バリエーション豊かに選ぶこと（同じような商品を避ける）

【出力形式】
必ず以下のJSON形式のみで回答してください。説明文やマークダウンは不要です：
{
  "recommendations": [
    { "itemCode": "商品コード1", "reason": "選定理由（50文字以内）", "score": 95 },
    { "itemCode": "商品コード2", "reason": "選定理由（50文字以内）", "score": 93 },
    { "itemCode": "商品コード3", "reason": "選定理由（50文字以内）", "score": 91 },
    { "itemCode": "商品コード4", "reason": "選定理由（50文字以内）", "score": 89 },
    { "itemCode": "商品コード5", "reason": "選定理由（50文字以内）", "score": 87 },
    { "itemCode": "商品コード6", "reason": "選定理由（50文字以内）", "score": 85 },
    { "itemCode": "商品コード7", "reason": "選定理由（50文字以内）", "score": 83 },
    { "itemCode": "商品コード8", "reason": "選定理由（50文字以内）", "score": 81 },
    { "itemCode": "商品コード9", "reason": "選定理由（50文字以内）", "score": 79 }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Claudeのレスポンスからテキストを抽出
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('');

    // JSONを抽出（マークダウンのコードブロックがある場合も対応）
    let jsonText = responseText;
    const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) || responseText.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // JSONをパース
    const claudeResponse = JSON.parse(jsonText.trim());
    const recommendations: Recommendation[] = claudeResponse.recommendations;

    // 4. 商品コードでマッチングして完全な情報を返す
    const enrichedRecommendations = recommendations.map(rec => {
      const product = products.find(p => p.itemCode === rec.itemCode);
      return {
        ...rec,
        product
      };
    });

    return NextResponse.json({
      success: true,
      recommendations: enrichedRecommendations
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      {
        error: '推薦の生成に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
