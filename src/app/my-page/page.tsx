'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';

export default function MyPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-primary-100 dark:border-primary-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600 cursor-pointer" onClick={() => router.push('/')}>
              ふるそな
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                ダッシュボード
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          マイページ
        </h2>

        <div className="space-y-6">
          {/* アカウント情報 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-primary-100 dark:border-primary-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              アカウント情報
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">メールアドレス</span>
                <span className="text-sm text-slate-900 dark:text-slate-100">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-24">ユーザーID</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user?.uid}</span>
              </div>
            </div>
          </div>

          {/* プロフィール設定 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-primary-100 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
            <button
              onClick={() => router.push('/profile')}
              className="w-full p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      プロフィール編集
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      年収、家族構成、好みの設定を変更
                    </p>
                  </div>
                </div>
                <span className="text-primary-600 dark:text-primary-400">→</span>
              </div>
            </button>
          </div>

          {/* ログアウト */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-primary-100 dark:border-primary-800 hover:border-accent-300 dark:hover:border-accent-600 transition-colors">
            <button
              onClick={async () => {
                if (confirm('ログアウトしますか？')) {
                  await signOut();
                  router.push('/');
                }
              }}
              className="w-full p-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚪</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      ログアウト
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      アカウントからログアウトします
                    </p>
                  </div>
                </div>
                <span className="text-accent-600 dark:text-accent-400">→</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* ログインモーダル */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => router.push('/')}
        canClose={false}
      />
    </div>
  );
}
