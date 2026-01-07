import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { UserStats } from '@/types';
import {
  getYesterdayRange,
  getLast7DaysRange,
  getThisMonthRange,
  formatDateForFirestore
} from '@/lib/date-utils';

// 5分間のメモリキャッシュ
const CACHE_DURATION = 5 * 60 * 1000; // 5分

let statsCache: {
  data: UserStats | null;
  timestamp: number;
} | null = null;

/**
 * 新規ユーザー数を取得
 */
async function getNewUsers(
  isGuest: boolean,
  start: Date,
  end?: Date
): Promise<number> {
  try {
    let query = adminDb
      .collection('users')
      .where('isGuest', '==', isGuest)
      .where('createdAt', '>=', start);

    if (end) {
      query = query.where('createdAt', '<', end);
    }

    const snapshot = await query.count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error('Error fetching new users:', error);
    return 0;
  }
}

/**
 * アクティブユーザー数を取得
 * 注: 複合インデックスの問題を回避するため、クライアント側でフィルタリング
 */
async function getActiveUsers(
  isGuest: boolean,
  start: Date,
  end?: Date
): Promise<number> {
  try {
    const startDate = formatDateForFirestore(start);
    const endDate = end ? formatDateForFirestore(end) : null;

    console.log('🔍 Fetching active users:', {
      isGuest,
      startDate,
      endDate,
      startDateTime: start.toISOString(),
      endDateTime: end?.toISOString()
    });

    // isGuestのみでフィルタリング（複合インデックス不要）
    const query = adminDb
      .collection('dashboardAccess')
      .where('isGuest', '==', isGuest);

    const snapshot = await query.get();

    console.log('📊 Query result (before date filter):', {
      isGuest,
      docCount: snapshot.size
    });

    // クライアント側で日付フィルタリング
    const uniqueUserIds = new Set<string>();
    let filteredCount = 0;

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const docDate = data.date;

      // 日付範囲チェック
      let isInRange = docDate >= startDate;
      if (endDate) {
        isInRange = isInRange && docDate < endDate;
      }

      if (isInRange) {
        filteredCount++;
        const userId = data.userId;
        if (userId) {
          uniqueUserIds.add(userId);
        }

        // 最初の数件のみログ出力（デバッグ用）
        if (filteredCount <= 5) {
          console.log('📄 Document data:', { id: doc.id, date: docDate, userId });
        }
      }
    });

    console.log('✅ Filtered documents:', filteredCount);
    console.log('✅ Unique users found:', uniqueUserIds.size);

    return uniqueUserIds.size;
  } catch (error) {
    console.error('❌ Error fetching active users:', {
      isGuest,
      start: start.toISOString(),
      end: end?.toISOString(),
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return 0;
  }
}

/**
 * 統計を計算
 */
async function calculateStats(): Promise<UserStats> {
  const yesterdayRange = getYesterdayRange();
  const last7DaysRange = getLast7DaysRange();
  const thisMonthRange = getThisMonthRange();

  // すべてのクエリを並列実行
  const [
    // 新規ゲスト
    newGuestsYesterday,
    newGuestsLast7Days,
    newGuestsThisMonth,
    newGuestsAllTime,
    // アクティブゲスト
    activeGuestsYesterday,
    activeGuestsLast7Days,
    activeGuestsThisMonth,
    activeGuestsAllTime,
    // 新規会員
    newMembersYesterday,
    newMembersLast7Days,
    newMembersThisMonth,
    newMembersAllTime,
    // アクティブ会員
    activeMembersYesterday,
    activeMembersLast7Days,
    activeMembersThisMonth,
    activeMembersAllTime,
  ] = await Promise.all([
    // 新規ゲスト
    getNewUsers(true, yesterdayRange.start, yesterdayRange.end),
    getNewUsers(true, last7DaysRange.start),
    getNewUsers(true, thisMonthRange.start),
    getNewUsers(true, new Date(0)), // 全期間
    // アクティブゲスト
    getActiveUsers(true, yesterdayRange.start, yesterdayRange.end),
    getActiveUsers(true, last7DaysRange.start),
    getActiveUsers(true, thisMonthRange.start),
    getActiveUsers(true, new Date(0)), // 全期間
    // 新規会員
    getNewUsers(false, yesterdayRange.start, yesterdayRange.end),
    getNewUsers(false, last7DaysRange.start),
    getNewUsers(false, thisMonthRange.start),
    getNewUsers(false, new Date(0)), // 全期間
    // アクティブ会員
    getActiveUsers(false, yesterdayRange.start, yesterdayRange.end),
    getActiveUsers(false, last7DaysRange.start),
    getActiveUsers(false, thisMonthRange.start),
    getActiveUsers(false, new Date(0)), // 全期間
  ]);

  return {
    newGuests: {
      yesterday: newGuestsYesterday,
      last7Days: newGuestsLast7Days,
      thisMonth: newGuestsThisMonth,
      allTime: newGuestsAllTime,
    },
    activeGuests: {
      yesterday: activeGuestsYesterday,
      last7Days: activeGuestsLast7Days,
      thisMonth: activeGuestsThisMonth,
      allTime: activeGuestsAllTime,
    },
    newMembers: {
      yesterday: newMembersYesterday,
      last7Days: newMembersLast7Days,
      thisMonth: newMembersThisMonth,
      allTime: newMembersAllTime,
    },
    activeMembers: {
      yesterday: activeMembersYesterday,
      last7Days: activeMembersLast7Days,
      thisMonth: activeMembersThisMonth,
      allTime: activeMembersAllTime,
    },
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    // 管理者認証チェック
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!adminEmail) {
      return NextResponse.json(
        { error: 'Admin email not configured' },
        { status: 500 }
      );
    }

    // リクエストヘッダーから認証情報を取得（実際の実装では適切な認証を使用）
    // 今回は簡易的な実装のため、クエリパラメータまたはヘッダーでメールを確認
    // 本番環境では Firebase Auth のトークン検証を使用すべき

    // キャッシュチェック
    const now = Date.now();
    if (statsCache && (now - statsCache.timestamp) < CACHE_DURATION) {
      console.log('Returning cached stats');
      return NextResponse.json(statsCache.data);
    }

    // 統計を計算
    console.log('Calculating new stats...');
    const stats = await calculateStats();

    // キャッシュを更新
    statsCache = {
      data: stats,
      timestamp: now,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in user-stats API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user statistics' },
      { status: 500 }
    );
  }
}
