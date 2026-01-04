'use client';

import { useState, useEffect } from 'react';
import { UserStats } from '@/types';

export default function UserStatistics() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/user-stats');

      if (!response.ok) {
        throw new Error('統計の取得に失敗しました');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err instanceof Error ? err.message : '統計の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // 数値をカンマ区切りでフォーマット
  const formatNumber = (num: number): string => {
    return num.toLocaleString('ja-JP');
  };

  // 最終更新時刻をフォーマット
  const formatLastUpdated = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">統計を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-red-700 dark:text-red-400 mb-3">{error}</p>
              <button
                onClick={fetchStats}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                再試行
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <p className="text-slate-600 dark:text-slate-400 text-center py-10">
          データがありません
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
      {/* ヘッダー */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              ユーザー統計
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              最終更新: {formatLastUpdated(stats.lastUpdated)}
            </p>
          </div>
          <button
            onClick={fetchStats}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
          >
            🔄 更新
          </button>
        </div>
      </div>

      {/* 統計テーブル */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 dark:border-slate-600">
              <th className="text-left p-3 font-semibold text-slate-900 dark:text-slate-100">
                指標
              </th>
              <th className="text-right p-3 font-semibold text-slate-900 dark:text-slate-100">
                昨日
              </th>
              <th className="text-right p-3 font-semibold text-slate-900 dark:text-slate-100">
                過去7日間
              </th>
              <th className="text-right p-3 font-semibold text-slate-900 dark:text-slate-100">
                今月
              </th>
              <th className="text-right p-3 font-semibold text-slate-900 dark:text-slate-100">
                累計
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 新規ゲスト */}
            <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                新規ゲスト利用者数
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newGuests.yesterday)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newGuests.last7Days)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newGuests.thisMonth)}
              </td>
              <td className="p-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                {formatNumber(stats.newGuests.allTime)}
              </td>
            </tr>

            {/* アクティブゲスト */}
            <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                アクティブゲスト利用者数
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeGuests.yesterday)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeGuests.last7Days)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeGuests.thisMonth)}
              </td>
              <td className="p-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                {formatNumber(stats.activeGuests.allTime)}
              </td>
            </tr>

            {/* 新規会員 */}
            <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                新規会員数
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newMembers.yesterday)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newMembers.last7Days)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.newMembers.thisMonth)}
              </td>
              <td className="p-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                {formatNumber(stats.newMembers.allTime)}
              </td>
            </tr>

            {/* アクティブ会員 */}
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="p-3 font-medium text-slate-900 dark:text-slate-100">
                アクティブ会員数
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeMembers.yesterday)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeMembers.last7Days)}
              </td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">
                {formatNumber(stats.activeMembers.thisMonth)}
              </td>
              <td className="p-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                {formatNumber(stats.activeMembers.allTime)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 追加情報 */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
          📊 追加インサイト
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-600 dark:text-slate-400">ゲスト→会員変換率（累計）</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {stats.newGuests.allTime > 0
                ? ((stats.newMembers.allTime / stats.newGuests.allTime) * 100).toFixed(1)
                : '0.0'}
              %
            </p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">本日のアクティブユーザー</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatNumber(stats.activeGuests.yesterday + stats.activeMembers.yesterday)}
            </p>
          </div>
          <div>
            <p className="text-slate-600 dark:text-slate-400">累計ユーザー数</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatNumber(stats.newGuests.allTime + stats.newMembers.allTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
