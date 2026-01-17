'use client';

import { useState, useEffect } from 'react';
import type { GoogleTrendsDocument, TrendingKeyword } from '@/types/trends';
import { generateTrendsRankingArticle } from '@/lib/article-templates/trends-ranking';

interface TrendsHistoryItem extends GoogleTrendsDocument {
  date: string; // YYYY-MM-DD
}

export default function TrendsHistory() {
  const [trends, setTrends] = useState<TrendsHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [generatingArticle, setGeneratingArticle] = useState(false);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      setError(null);

      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const response = await fetch(`/api/trends/history?admin=${adminEmail}&limit=30`);

      if (!response.ok) {
        throw new Error('トレンドデータの取得に失敗しました');
      }

      const data = await response.json();
      if (data.success) {
        setTrends(data.data);
      } else {
        throw new Error(data.error || 'データの取得に失敗しました');
      }
    } catch (err) {
      console.error('Error fetching trends:', err);
      setError(err instanceof Error ? err.message : 'トレンドデータの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const handleGenerateArticle = (trendsData: TrendsHistoryItem) => {
    try {
      setGeneratingArticle(true);

      // Select top 10 rising keywords
      const topKeywords = trendsData.risingQueries
        .slice(0, 10)
        .map((k: TrendingKeyword) => k.query);

      // Generate article content
      const articleContent = generateTrendsRankingArticle(trendsData, topKeywords);

      // Copy to clipboard
      navigator.clipboard.writeText(articleContent);
      alert('✅ 記事内容をクリップボードにコピーしました！');
    } catch (err) {
      console.error('Error generating article:', err);
      alert('❌ 記事生成に失敗しました');
    } finally {
      setGeneratingArticle(false);
    }
  };

  const toggleRow = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">トレンドデータを読み込み中...</p>
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
                onClick={fetchTrends}
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

  if (trends.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <p className="text-yellow-700 dark:text-yellow-400 mb-2">
                トレンドデータがまだありません
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                毎日午前10時（JST）に自動でスクレイピングが実行されます。初回データ収集までお待ちください。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          📈 Google Trendsデータ履歴
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          「ふるさと納税」関連のトレンドキーワード（過去{trends.length}日分）
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                日付
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                キーワード
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                急上昇
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Breakout
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {trends.map((trend) => (
              <>
                <tr
                  key={trend.date}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  onClick={() => toggleRow(trend.date)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                    {formatDate(trend.scrapedAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                    {trend.keyword}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {trend.significantCount}件
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    {trend.breakoutCount > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        🔥 {trend.breakoutCount}件
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateArticle(trend);
                      }}
                      disabled={generatingArticle}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                    >
                      📝 記事生成
                    </button>
                  </td>
                </tr>
                {selectedDate === trend.date && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-4">
                        {/* Rising Queries */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            🚀 急上昇キーワード（{trend.risingQueries.length}件）
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {trend.risingQueries.slice(0, 20).map((kw, i) => (
                              <div
                                key={i}
                                className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <span className="text-xs text-slate-900 dark:text-white truncate flex-1">
                                    {kw.query}
                                  </span>
                                  {kw.value === 'Breakout' ? (
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400 whitespace-nowrap">
                                      🔥
                                    </span>
                                  ) : (
                                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                      +{kw.value}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Top Queries */}
                        {trend.topQueries.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                              ⭐ 人気キーワード（{trend.topQueries.length}件）
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {trend.topQueries.slice(0, 12).map((kw, i) => (
                                <div
                                  key={i}
                                  className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700"
                                >
                                  <div className="flex items-start justify-between gap-1">
                                    <span className="text-xs text-slate-900 dark:text-white truncate flex-1">
                                      {kw.query}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                      {kw.value}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        最終更新: {formatDate(new Date())}
      </div>
    </div>
  );
}
