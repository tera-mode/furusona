'use client';

import { useState, useEffect } from 'react';
import { ALGORITHM_CHANGE_LOG } from '@/app/debug/algorithm-config';

interface RecommendationLog {
  id: string;
  userId: string;
  userEmail?: string;
  userInput: {
    categories: string[];
    allergies?: string[];
    calculatedLimit: number;
    familyStructure: {
      married: boolean;
      dependents: number;
    };
  };
  recommendations: Array<{
    itemCode: string;
    itemName: string;
    reason: string;
    score: number;
  }>;
  timestamp: Date;
}

export default function RecommendationLogs() {
  const [logs, setLogs] = useState<RecommendationLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // ここでは、実際のログデータがFirestoreに保存されていると仮定
      // 本番環境では /api/recommendations でログを保存する実装が必要

      // デモデータを表示
      const demoLogs: RecommendationLog[] = [
        {
          id: 'demo-1',
          userId: 'user123',
          userEmail: 'user@example.com',
          userInput: {
            categories: ['肉', 'スイーツ'],
            allergies: ['なし'],
            calculatedLimit: 60000,
            familyStructure: {
              married: true,
              dependents: 2,
            },
          },
          recommendations: [
            {
              itemCode: 'f012246-chitose:10001256',
              itemName: 'チーズケーキ',
              reason: 'チーズケーキ高評価、家族向け',
              score: 95,
            },
            {
              itemCode: 'f016331-kamishihoro:10000134',
              itemName: '牛乳アイス',
              reason: '牛乳アイス、低カロリー',
              score: 92,
            },
          ],
          timestamp: new Date(),
        },
      ];

      setLogs(demoLogs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendation logs:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600 dark:text-slate-400">ログを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 最近の推薦ログ */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          最近の推薦ログ
        </h2>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            推薦ログがまだありません
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
              >
                {/* ヘッダー */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {log.userEmail || 'ユーザー'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {log.timestamp.toLocaleString('ja-JP')}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {log.recommendations.length}件の推薦
                  </div>
                </div>

                {/* ユーザー入力 */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    ユーザー入力
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                      <span className="text-slate-600 dark:text-slate-400">カテゴリ:</span>{' '}
                      <span className="text-slate-900 dark:text-slate-100">
                        {log.userInput.categories.join(', ')}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                      <span className="text-slate-600 dark:text-slate-400">限度額:</span>{' '}
                      <span className="text-slate-900 dark:text-slate-100">
                        {log.userInput.calculatedLimit.toLocaleString()}円
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                      <span className="text-slate-600 dark:text-slate-400">家族構成:</span>{' '}
                      <span className="text-slate-900 dark:text-slate-100">
                        {log.userInput.familyStructure.married ? '既婚' : '独身'} /{' '}
                        扶養{log.userInput.familyStructure.dependents}人
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded">
                      <span className="text-slate-600 dark:text-slate-400">アレルギー:</span>{' '}
                      <span className="text-slate-900 dark:text-slate-100">
                        {log.userInput.allergies?.join(', ') || 'なし'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 推薦結果 */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    推薦結果 (上位3件)
                  </h4>
                  <div className="space-y-2">
                    {log.recommendations.slice(0, 3).map((rec, index) => (
                      <div
                        key={rec.itemCode}
                        className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {rec.itemName}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {rec.reason}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {rec.score}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">点</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* アルゴリズム変更履歴 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          アルゴリズム変更履歴
        </h2>

        <div className="space-y-4">
          {ALGORITHM_CHANGE_LOG.map((log) => (
            <div
              key={log.version}
              className="border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900 p-4 rounded"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded text-sm font-semibold">
                    v{log.version}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {log.date}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  by {log.author}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {log.changes.map((change, index) => (
                  <li
                    key={index}
                    className="text-sm text-slate-700 dark:text-slate-300"
                  >
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
