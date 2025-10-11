'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import Header from '@/components/Header';

const CATEGORY_OPTIONS = [
  '肉',
  '魚介',
  'フルーツ',
  '米',
  'お酒',
  'スイーツ',
  '加工品',
  '工芸品',
  '日用品',
  '旅行券',
];

export default function ProfilePage() {
  const { user, loading, updateUserData } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // フォーム状態
  const [annualIncome, setAnnualIncome] = useState('');
  const [married, setMarried] = useState(false);
  const [dependents, setDependents] = useState('0');
  const [socialInsurance, setSocialInsurance] = useState('');
  const [mortgageDeduction, setMortgageDeduction] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [favoriteRegions, setFavoriteRegions] = useState('');

  // 計算結果
  const [calculatedLimit, setCalculatedLimit] = useState(0);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    } else if (user) {
      // ユーザーデータから初期値を設定
      // 年収は円で保存されているので、万円に変換して表示
      const annualIncomeInManYen = user.income.annualIncome ? Math.floor(user.income.annualIncome / 10000) : 0;
      setAnnualIncome(annualIncomeInManYen > 0 ? annualIncomeInManYen.toString() : '');
      setMarried(user.familyStructure.married || false);
      setDependents(user.familyStructure.dependents?.toString() || '0');
      setSocialInsurance(user.income.socialInsurance?.toString() || '');
      setMortgageDeduction(user.income.mortgageDeduction?.toString() || '');
      setCategories(user.preferences.categories || []);
      setAllergies(user.preferences.allergies?.join(', ') || '');
      setFavoriteRegions(user.preferences.favoriteRegions?.join(', ') || '');
      setCalculatedLimit(user.calculatedLimit || 0);
    }
  }, [user, loading]);

  const handleCalculateLimit = async () => {
    setCalculating(true);
    try {
      // 年収は万円単位で入力されるので、円に変換
      const annualIncomeInYen = Number(annualIncome) * 10000;

      const response = await fetch('/api/calculate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annualIncome: annualIncomeInYen,
          married,
          dependents: Number(dependents),
          socialInsurance: socialInsurance ? Number(socialInsurance) : undefined,
          mortgageDeduction: mortgageDeduction ? Number(mortgageDeduction) : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('計算に失敗しました');
      }

      const data = await response.json();
      setCalculatedLimit(data.data.roundedLimit);
    } catch (error) {
      console.error('Error calculating limit:', error);
      alert('限度額の計算に失敗しました');
    } finally {
      setCalculating(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    if (categories.length === 0) {
      alert('少なくとも1つのカテゴリを選択してください');
      return;
    }

    if (calculatedLimit === 0) {
      alert('限度額を計算してください');
      return;
    }

    setSaving(true);
    try {
      // 年収は万円単位で入力されるので、円に変換
      const annualIncomeInYen = Number(annualIncome) * 10000;

      // Firestoreはundefinedを受け付けないので、オプショナルフィールドを適切に処理
      const incomeData: {
        annualIncome: number;
        socialInsurance?: number;
        mortgageDeduction?: number;
      } = {
        annualIncome: annualIncomeInYen,
      };

      if (socialInsurance && socialInsurance.trim() !== '') {
        incomeData.socialInsurance = Number(socialInsurance);
      }

      if (mortgageDeduction && mortgageDeduction.trim() !== '') {
        incomeData.mortgageDeduction = Number(mortgageDeduction);
      }

      await updateUserData({
        familyStructure: {
          married,
          dependents: Number(dependents),
        },
        income: incomeData,
        preferences: {
          categories,
          allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
          favoriteRegions: favoriteRegions ? favoriteRegions.split(',').map(r => r.trim()) : [],
          pastSelections: user.preferences.pastSelections || [],
        },
        calculatedLimit,
        updatedAt: new Date(),
      });

      alert('プロファイルを保存しました');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

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
      <Header
        user={user}
        calculatedLimit={calculatedLimit}
      />

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          プロファイル設定
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8 space-y-8">
          {/* 基本情報 */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              基本情報
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  年収（万円）
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                  placeholder="例: 750（750万円の場合）"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  婚姻状況
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!married}
                      onChange={() => setMarried(false)}
                      className="mr-2"
                    />
                    <span className="text-slate-700 dark:text-slate-300">独身</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={married}
                      onChange={() => setMarried(true)}
                      className="mr-2"
                    />
                    <span className="text-slate-700 dark:text-slate-300">既婚</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  扶養人数
                </label>
                <input
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  社会保険料（任意・円）
                </label>
                <input
                  type="number"
                  value={socialInsurance}
                  onChange={(e) => setSocialInsurance(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                  placeholder="未入力の場合は自動推定されます"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  住宅ローン控除（任意・円）
                </label>
                <input
                  type="number"
                  value={mortgageDeduction}
                  onChange={(e) => setMortgageDeduction(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                />
              </div>

              <button
                onClick={handleCalculateLimit}
                disabled={calculating || !annualIncome}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {calculating ? '計算中...' : '限度額を計算'}
              </button>

              {calculatedLimit > 0 && (
                <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-4">
                  <p className="text-sm text-accent-700 dark:text-accent-400 mb-1">
                    あなたのふるさと納税限度額（目安）
                  </p>
                  <p className="text-3xl font-bold text-accent-700 dark:text-accent-400">
                    {calculatedLimit.toLocaleString()}円
                  </p>
                  <p className="text-xs text-accent-600 dark:text-accent-300 mt-2">
                    ※ 安全マージン90%を適用した保守的な金額です
                  </p>
                  <p className="text-xs text-accent-600 dark:text-accent-300">
                    ※ 実際の控除額は確定申告の内容により変動する場合があります
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* 好みの設定 */}
          <section>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              好みの設定
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  好きなカテゴリ（複数選択可）
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        categories.includes(category)
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary-500'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  アレルギー（カンマ区切り、任意）
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                  placeholder="例: エビ, カニ, 小麦"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  好きな地域（カンマ区切り、任意）
                </label>
                <input
                  type="text"
                  value={favoriteRegions}
                  onChange={(e) => setFavoriteRegions(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                  placeholder="例: 北海道, 沖縄, 九州"
                />
              </div>
            </div>
          </section>

          {/* 保存ボタン */}
          <button
            onClick={handleSaveProfile}
            disabled={saving || categories.length === 0 || calculatedLimit === 0}
            className="w-full bg-success-500 hover:bg-success-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? '保存中...' : 'プロファイルを保存してダッシュボードへ'}
          </button>
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
