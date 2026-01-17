// Google Trendsデータから記事を生成するテンプレート
import type { GoogleTrendsDocument } from '@/types/trends';

/**
 * トレンドランキング記事生成
 *
 * @param trendsData - Google Trendsデータ
 * @param selectedKeywords - 記事に含めるキーワードリスト
 * @returns Markdown形式の記事コンテンツ
 */
export function generateTrendsRankingArticle(
  trendsData: GoogleTrendsDocument,
  selectedKeywords: string[]
): string {
  const date = new Date(trendsData.scrapedAt);
  const dateStr = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const yearMonth = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
  });

  // 記事テンプレート
  const article = `# 【${yearMonth}最新】${trendsData.keyword}のトレンドキーワードTOP${selectedKeywords.length}

## はじめに

${dateStr}現在、Googleトレンドで注目されている「${trendsData.keyword}」関連のキーワードをランキング形式でご紹介します。

最新のトレンドを把握することで、今人気の返礼品や注目されているふるさと納税の活用方法がわかります。

## 急上昇キーワードTOP${selectedKeywords.length}

${selectedKeywords
  .map((keyword, index) => {
    const rank = index + 1;
    return `### ${rank}位: ${keyword}

「${keyword}」は現在、ふるさと納税関連で注目度が高まっているキーワードです。`;
  })
  .join('\n\n')}

## まとめ

${dateStr}時点で注目されている${trendsData.keyword}関連キーワードをご紹介しました。

これらのキーワードから、以下のようなトレンドが見えてきます：

- 人気のジャンルや返礼品
- 季節に応じた注目商品
- よく検索されている手続き・制度

ふるさと納税をこれから始める方、追加で寄付を検討している方は、ぜひこれらのトレンドキーワードを参考にしてみてください。

## 関連記事

- [ふるさと納税の始め方【2025年完全ガイド】](/article/furusato-hajimekata)
- [ふるさと納税おすすめ返礼品ランキング【2025年最新】](/article/furusato-osusume-henreihin)
- [ふるさと納税限度額シミュレーション【2025年最新版】](/article/furusato-gendogaku-simulation)

---

**データ取得日:** ${dateStr}
**データソース:** Google Trends
**キーワード:** ${trendsData.keyword}
**対象地域:** 日本 (${trendsData.geo})
`;

  return article.trim();
}

/**
 * シンプルなリスト形式の記事生成
 *
 * @param trendsData - Google Trendsデータ
 * @param selectedKeywords - 記事に含めるキーワードリスト
 * @returns Markdown形式の記事コンテンツ（簡易版）
 */
export function generateSimpleTrendsList(
  trendsData: GoogleTrendsDocument,
  selectedKeywords: string[]
): string {
  const date = new Date(trendsData.scrapedAt);
  const dateStr = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `# ${dateStr}の${trendsData.keyword}トレンドキーワード

## 急上昇キーワード一覧

${selectedKeywords.map((kw, i) => `${i + 1}. ${kw}`).join('\n')}

---
*データ取得: ${dateStr} / データソース: Google Trends*
`;
}
