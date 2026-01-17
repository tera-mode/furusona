// Google Trendsの履歴取得APIルート
// URL: /api/trends/history
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/trends/history
 *
 * 過去のGoogleトレンドデータを取得
 *
 * クエリパラメータ:
 * - admin: 管理者メールアドレス（必須・認証用）
 * - limit: 取得件数（デフォルト: 30）
 *
 * 使用例:
 * GET /api/trends/history?admin=admin@example.com&limit=30
 */
export async function GET(request: NextRequest) {
  try {
    // 1. 認証チェック（管理者のみアクセス可能）
    const adminEmail = request.nextUrl.searchParams.get('admin');
    const expectedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!expectedAdminEmail) {
      return NextResponse.json(
        { error: 'Admin email not configured' },
        { status: 500 }
      );
    }

    if (adminEmail !== expectedAdminEmail) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. クエリパラメータ取得
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '30', 10);

    console.log(`[Trends History API] Fetching last ${limit} trends records`);

    // 3. Firestoreから取得（最新順）
    const snapshot = await adminDb
      .collection('googleTrends')
      .orderBy('scrapedAt', 'desc')
      .limit(limit)
      .get();

    // 4. データ変換
    const trends = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        date: doc.id, // YYYY-MM-DD
        scrapedAt: data.scrapedAt?.toDate?.() || new Date(data.scrapedAt),
        keyword: data.keyword,
        geo: data.geo,
        risingQueries: data.risingQueries || [],
        topQueries: data.topQueries || [],
        significantCount: data.significantCount || 0,
        breakoutCount: data.breakoutCount || 0,
      };
    });

    console.log(`[Trends History API] Found ${trends.length} records`);

    // 5. 成功レスポンス
    return NextResponse.json({
      success: true,
      data: trends,
      count: trends.length,
    });
  } catch (error) {
    console.error('[Trends History API] Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch trends history',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
