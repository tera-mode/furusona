import { useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types';
import { formatDateForFirestore, getJSTDate } from '@/lib/date-utils';

/**
 * ダッシュボードアクセスをトラッキングするフック
 * - 日次ユニークアクセスのみ記録（sessionStorageで重複防止）
 * - エラーはサイレントに処理（ユーザー体験をブロックしない）
 */
export function useDashboardTracking(user: User | null) {
  useEffect(() => {
    if (!user) return;

    const trackDashboardAccess = async () => {
      try {
        // 今日の日付（JST）
        const today = formatDateForFirestore(getJSTDate());

        // sessionStorageキー
        const storageKey = `dashboard_access_logged_${user.uid}_${today}`;

        // 既に今日のログがある場合はスキップ
        if (sessionStorage.getItem(storageKey)) {
          return;
        }

        // Firestoreにアクセスログを記録
        const dashboardAccessRef = collection(db, 'dashboardAccess');
        await addDoc(dashboardAccessRef, {
          userId: user.uid,
          timestamp: serverTimestamp(),
          isGuest: user.isGuest || false,
          date: today
        });

        // sessionStorageにフラグを設定
        sessionStorage.setItem(storageKey, 'true');

        console.log('Dashboard access logged:', { userId: user.uid, date: today });
      } catch (error) {
        // エラーはコンソールに記録するのみ（ユーザー体験をブロックしない）
        console.error('Failed to log dashboard access:', error);
      }
    };

    trackDashboardAccess();
  }, [user]);
}
