'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import Header from '@/components/Header';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Donation } from '@/types';

export default function MyPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    }
  }, [user, loading]);

  // 寄付履歴を取得
  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;

      try {
        const currentYear = new Date().getFullYear();
        const donationsRef = collection(db, 'donations');
        const q = query(
          donationsRef,
          where('userId', '==', user.uid),
          where('year', '==', currentYear),
          orderBy('donatedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const donationsList: Donation[] = [];

        querySnapshot.forEach((doc) => {
          donationsList.push({
            id: doc.id,
            ...doc.data(),
            donatedAt: doc.data().donatedAt.toDate(),
          } as Donation);
        });

        setDonations(donationsList);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [user]);

  // 寄付済み金額と残りの限度額を計算
  const totalDonated = donations.reduce((sum, donation) => sum + donation.productPrice, 0);
  const calculatedLimit = user?.calculatedLimit || 0;
  const remainingLimit = calculatedLimit > 0 ? Math.max(0, calculatedLimit - totalDonated) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 共通ヘッダー */}
      <Header
        user={user}
        calculatedLimit={calculatedLimit}
        totalDonated={totalDonated}
        remainingLimit={remainingLimit}
      />

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          マイページ
        </h2>

        <div className="space-y-6">
          {/* アカウント情報（ログインユーザーのみ表示） */}
          {!user?.isGuest && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-primary-100 dark:border-primary-800">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                アカウント情報
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400 w-24">メールアドレス</span>
                  <span className="text-sm text-slate-900 dark:text-slate-100">{user?.email}</span>
                </div>
              </div>
            </div>
          )}

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

          {/* 利用規約・プライバシーポリシー */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-primary-100 dark:border-primary-800">
            <div className="space-y-2">
              <a
                href="https://www.laiv.jp/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                <span>📄</span>
                <span>利用規約</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://www.laiv.jp/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                <span>🔒</span>
                <span>プライバシーポリシー</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://www.laiv.jp/contact/service"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
              >
                <span>💬</span>
                <span>お問い合わせ</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
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
