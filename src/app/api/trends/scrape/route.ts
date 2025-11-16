// トレンドスクレイピングAPIルート
// URL: /api/trends/scrape
import { NextRequest, NextResponse } from 'next/server';
import { scrapeGoogleTrends, filterSignificantKeywords } from '@/lib/trends/scraper';
import { sendTrendsAlertEmail } from '@/lib/trends/email-sender';
import type { TrendsScrapeResponse } from '@/types/trends';

/**
 * GET /api/trends/scrape
 *
 * Googleトレンドをスクレイピングして急上昇キーワードをメール送信
 *
 * クエリパラメータ:
 * - secret: 認証用シークレット（必須）
 * - keyword: スクレイピング対象キーワード（デフォルト: "ふるさと納税"）
 * - minValue: フィルタリングの最小値（デフォルト: 100）
 *
 * 使用例:
 * GET /api/trends/scrape?secret=YOUR_SECRET&keyword=ふるさと納税
 */
export async function GET(request: NextRequest) {
  try {
    // 1. 認証チェック
    const secret = request.nextUrl.searchParams.get('secret');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json<TrendsScrapeResponse>(
        {
          success: false,
          message: 'Server configuration error',
          error: 'CRON_SECRET is not configured',
        },
        { status: 500 }
      );
    }

    if (secret !== cronSecret) {
      return NextResponse.json<TrendsScrapeResponse>(
        {
          success: false,
          message: 'Unauthorized',
          error: 'Invalid secret',
        },
        { status: 401 }
      );
    }

    // 2. パラメータ取得
    const keyword = request.nextUrl.searchParams.get('keyword') || 'ふるさと納税';
    const minValueParam = request.nextUrl.searchParams.get('minValue');
    const minValue = minValueParam ? parseInt(minValueParam, 10) : 0; // すべての関連キーワードを含める

    // 管理者メールアドレス（tera.mode@gmail.com）に固定
    const recipientEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'tera.mode@gmail.com';

    console.log('[Trends API] Starting scrape for:', keyword);

    // 3. トレンドをスクレイピング
    const trendsData = await scrapeGoogleTrends(keyword, 'JP', 'now 1-d');

    // 4. 重要なキーワードのみフィルタリング
    const filteredRising = filterSignificantKeywords(trendsData.risingQueries, minValue);

    const filteredTrendsData = {
      ...trendsData,
      risingQueries: filteredRising,
    };

    console.log(
      `[Trends API] Found ${filteredRising.length} significant rising queries (filtered from ${trendsData.risingQueries.length})`
    );

    // 5. メール送信（急上昇キーワードがある場合のみ）
    let emailSent = false;
    if (filteredRising.length > 0) {
      try {
        await sendTrendsAlertEmail(filteredTrendsData, recipientEmail);
        emailSent = true;
        console.log('[Trends API] Email sent successfully to:', recipientEmail);
      } catch (emailError) {
        console.error('[Trends API] Email sending failed:', emailError);
        // メール送信失敗してもスクレイピング結果は返す
      }
    } else {
      console.log('[Trends API] No significant rising queries found, skipping email');
    }

    // 6. 成功レスポンス
    return NextResponse.json<TrendsScrapeResponse>(
      {
        success: true,
        message: emailSent
          ? `Successfully scraped trends and sent email to ${recipientEmail}`
          : 'Successfully scraped trends (no significant keywords, email not sent)',
        data: filteredTrendsData,
        emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Trends API] Error:', error);

    return NextResponse.json<TrendsScrapeResponse>(
      {
        success: false,
        message: 'Failed to scrape Google Trends',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/trends/scrape
 *
 * 同じ機能をPOSTでも提供（GitHub Actionsから使いやすくするため）
 */
export async function POST(request: NextRequest) {
  // GETと同じロジックを使用
  return GET(request);
}
