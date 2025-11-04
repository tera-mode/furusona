'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AlgorithmVisualizer from '@/components/debug/AlgorithmVisualizer';
import RecommendationLogs from '@/components/debug/RecommendationLogs';
import ArticleManager from '@/components/debug/ArticleManager';

export default function DebugPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'algorithm' | 'logs' | 'articles' | 'email'>('algorithm');

  useEffect(() => {
    const checkAdmin = async () => {
      if (loading) return;

      if (!user) {
        router.push('/');
        return;
      }

      // 管理者メールアドレスをチェック
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (!adminEmail) {
        console.error('ADMIN_EMAIL is not configured');
        router.push('/dashboard');
        return;
      }

      if (user.email === adminEmail) {
        setIsAuthorized(true);
      } else {
        // 権限がない場合はダッシュボードにリダイレクト
        router.push('/dashboard');
      }

      setChecking(false);
    };

    checkAdmin();
  }, [user, loading, router]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400">認証を確認中...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // リダイレクト中
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-slate-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                デバッグ画面
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                レコメンドアルゴリズムの詳細情報と管理
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg transition-colors"
            >
              ダッシュボードに戻る
            </button>
          </div>
        </div>
      </header>

      {/* タブ */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('algorithm')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'algorithm'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              アルゴリズム設定
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'logs'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              推薦ログ・変更履歴
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'articles'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              記事管理
            </button>
            <button
              onClick={() => router.push('/debug/email')}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              メール管理
            </button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 警告メッセージ */}
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                重要: アルゴリズム変更時の注意事項
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• アルゴリズムを変更した場合は、<code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">src/app/debug/algorithm-config.ts</code> を更新してください</li>
                <li>• フロー図 <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">src/app/debug/algorithm-flow.mmd</code> も同期して更新してください</li>
                <li>• <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">ALGORITHM_CHANGE_LOG</code> に変更履歴を必ず記録してください</li>
              </ul>
            </div>
          </div>
        </div>

        {/* コンテンツ */}
        {activeTab === 'algorithm' && <AlgorithmVisualizer />}
        {activeTab === 'logs' && <RecommendationLogs />}
        {activeTab === 'articles' && <ArticleManager />}
      </main>
    </div>
  );
}
