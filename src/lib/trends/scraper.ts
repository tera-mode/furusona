// Googleトレンドスクレイピングロジック
import googleTrends from 'google-trends-api';
import type { TrendingKeyword, TrendsResult } from '@/types/trends';

// Google Trends APIのレスポンス型定義
interface RankedKeywordItem {
  query: string;
  value: string | number;
  formattedValue?: string;
  link?: string;
}

interface RankedList {
  rankedKeyword?: RankedKeywordItem[];
}

interface TrendsApiResponse {
  default?: {
    rankedList?: RankedList[];
  };
}

/**
 * 指定したキーワードの関連する急上昇クエリを取得
 *
 * @param keyword ベースキーワード（例: "ふるさと納税"）
 * @param geo 地域コード（デフォルト: "JP"）
 * @param timeRange 期間（デフォルト: "now 1-d" = 過去24時間）
 * @returns TrendsResult
 */
export async function scrapeGoogleTrends(
  keyword: string = 'ふるさと納税',
  geo: string = 'JP',
  timeRange: string = 'now 1-d'
): Promise<TrendsResult> {
  try {
    console.log(`[Trends] Scraping related queries for keyword: "${keyword}", geo: ${geo}`);

    // 関連する急上昇キーワードを取得（relatedQueries）
    // 過去24時間のデータを取得
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const endTime = new Date();

    const result = await googleTrends.relatedQueries({
      keyword,
      geo,
      hl: 'ja',
      startTime,
      endTime,
    });

    const data = JSON.parse(result) as TrendsApiResponse;
    console.log('[Trends] Response structure:', JSON.stringify(data, null, 2).substring(0, 500));

    // rankedList[0] = Top queries (人気)
    // rankedList[1] = Rising queries (注目 - 急上昇)
    const topList = data.default?.rankedList?.[0];
    const risingList = data.default?.rankedList?.[1];

    const topQueries: TrendingKeyword[] = (topList?.rankedKeyword || [])
      .slice(0, 15) // 上位15件
      .map((item) => ({
        query: item.query,
        value: typeof item.value === 'number' ? item.value : 0,
        formattedValue: item.formattedValue || String(item.value),
        link: item.link || '',
      }));

    const risingQueries: TrendingKeyword[] = (risingList?.rankedKeyword || [])
      .slice(0, 25) // 上位25件（注目キーワード）
      .map((item) => ({
        query: item.query,
        value: item.value === 'RISING' || item.formattedValue === '急激増加' ? 'Breakout' : item.value,
        formattedValue: item.formattedValue || String(item.value),
        link: item.link || '',
      }));

    console.log(`[Trends] Found ${risingQueries.length} rising queries, ${topQueries.length} top queries`);

    return {
      keyword,
      risingQueries,
      topQueries,
      scrapedAt: new Date(),
      geo,
    };
  } catch (error) {
    console.error('[Trends] Scraping error:', {
      error,
      errorType: error?.constructor?.name,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      keyword,
      geo,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });

    // エラーメッセージを詳細化
    let detailedMessage = `Failed to scrape Google Trends for "${keyword}"`;
    if (error instanceof Error) {
      detailedMessage += `: ${error.message}`;
    }

    throw new Error(detailedMessage);
  }
}

/**
 * 急上昇キーワードのフィルタリング
 *
 * 特定の条件（例: "Breakout"または一定以上の増加率）でフィルタ
 */
export function filterSignificantKeywords(
  keywords: TrendingKeyword[],
  minValue: number = 0
): TrendingKeyword[] {
  return keywords.filter((kw) => {
    if (kw.value === 'Breakout') return true; // Breakoutは必ず含める
    if (typeof kw.value === 'number' && kw.value >= minValue) return true;
    return false;
  });
}
