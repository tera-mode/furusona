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
 * 指定時間待機する
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * リトライ付きでGoogle Trends APIを呼び出す
 */
async function fetchWithRetry(
  keyword: string,
  geo: string,
  startTime: Date,
  endTime: Date,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<TrendsApiResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Trends] Attempt ${attempt}/${maxRetries} for keyword: "${keyword}"`);

      const result = await googleTrends.relatedQueries({
        keyword,
        geo,
        hl: 'ja',
        startTime,
        endTime,
      });

      // HTMLレスポンスのチェック（Googleのブロックページ検出）
      if (typeof result === 'string' && result.trim().startsWith('<')) {
        const errorSnippet = result.substring(0, 200);
        console.error(`[Trends] Received HTML instead of JSON (attempt ${attempt}):`, errorSnippet);
        throw new Error(`Google returned HTML page instead of JSON. This usually indicates rate limiting or blocking. Response starts with: ${errorSnippet}`);
      }

      const data = JSON.parse(result) as TrendsApiResponse;
      console.log('[Trends] Response structure:', JSON.stringify(data, null, 2).substring(0, 500));
      return data;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[Trends] Attempt ${attempt} failed:`, lastError.message);

      if (attempt < maxRetries) {
        // 指数バックオフ: 2秒, 4秒, 8秒...
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`[Trends] Waiting ${delay}ms before retry...`);
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error('All retry attempts failed');
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
  _timeRange: string = 'now 1-d' // 将来の拡張用に保持
): Promise<TrendsResult> {
  // 過去24時間のデータを取得
  const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const endTime = new Date();

  try {
    console.log(`[Trends] Scraping related queries for keyword: "${keyword}", geo: ${geo}`);

    const data = await fetchWithRetry(keyword, geo, startTime, endTime);

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isHtmlResponse = errorMessage.includes('HTML') || errorMessage.includes('<html');

    console.error('[Trends] Scraping error:', {
      error,
      errorType: error?.constructor?.name,
      message: errorMessage,
      isHtmlResponse,
      stack: error instanceof Error ? error.stack : undefined,
      keyword,
      geo,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });

    // エラーメッセージを詳細化
    let detailedMessage = `Failed to scrape Google Trends for "${keyword}"`;
    if (isHtmlResponse) {
      detailedMessage += ': Google is blocking requests (rate limit or CAPTCHA). Try again later.';
    } else if (error instanceof Error) {
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
