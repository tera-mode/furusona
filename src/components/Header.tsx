'use client';

import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface HeaderProps {
  user: User | null;
  calculatedLimit?: number;
  totalDonated?: number;
  remainingLimit?: number;
}

export default function Header({ user, calculatedLimit = 0, totalDonated = 0, remainingLimit = 0 }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-primary-100 dark:border-primary-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* 上部: ロゴとナビゲーション */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-primary-600 cursor-pointer" onClick={() => router.push('/dashboard')}>
            ふるそな
          </h1>

          {user && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 過去履歴 */}
              <button
                onClick={() => router.push('/past-records')}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-primary-600 hover:text-primary-700 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                <span className="text-base sm:text-lg">📋</span>
                <span>過去履歴</span>
              </button>

              {/* マイページ */}
              <button
                onClick={() => router.push('/my-page')}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-primary-600 hover:text-primary-700 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                <span className="text-base sm:text-lg">👤</span>
                <span>マイページ</span>
              </button>
            </div>
          )}
        </div>

        {/* 下部: サマリー情報 */}
        {user && calculatedLimit > 0 && (
          <div className="flex flex-wrap items-center gap-4 text-xs border-t border-primary-100 dark:border-primary-800 pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-600 dark:text-slate-400">限度額</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {calculatedLimit.toLocaleString()}円
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-600 dark:text-slate-400">寄付済</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {totalDonated.toLocaleString()}円
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-600 dark:text-slate-400">残り</span>
              <span className="text-lg font-bold text-warning-600 dark:text-warning-400">
                {remainingLimit.toLocaleString()}円
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
