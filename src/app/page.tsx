'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      // ユーザーがログイン済みの場合、プロフィール設定または ダッシュボードへリダイレクト
      if (user.calculatedLimit > 0) {
        router.push('/dashboard');
      } else {
        router.push('/profile');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Image
            src="/img/furusona-logo.png"
            alt="ふるそな"
            width={180}
            height={60}
            priority
            className="h-10 w-auto"
          />
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            ログイン
          </button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            AIがあなたにぴったりの<br />ふるさと納税を提案
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            家族構成・年収・好みを入力するだけで、<br />
            最適な返礼品を3つ自動推薦します
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            無料で始める
          </button>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">
            ふるそなの3つの特徴
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特徴1 */}
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">🧮</div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                かんたん限度額計算
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                年収と家族構成を入力するだけで、ふるさと納税の限度額を自動計算。複雑な計算は不要です。
              </p>
            </div>

            {/* 特徴2 */}
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                AIパーソナライズ推薦
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                あなたの好みとライフスタイルに合わせて、AIが最適な返礼品を3つ厳選します。
              </p>
            </div>

            {/* 特徴3 */}
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                寄付履歴管理
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                過去の寄付を一覧で管理。残りの限度額もひと目でわかります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            今すぐ始めて、最適な返礼品を見つけよう
          </h3>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            無料登録
          </button>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 ふるそな. All rights reserved.</p>
        </div>
      </footer>

      {/* ログインモーダル */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        canClose={true}
      />
    </div>
  );
}
