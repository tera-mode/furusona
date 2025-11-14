'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/categoryMapping';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: (data: Partial<OnboardingData>) => void;
  isGuest?: boolean; // ゲストユーザーフラグ
}

export interface OnboardingData {
  // Step 1: Preferences
  categories: string[];
  allergies: string[];
  favoriteRegions: string[];
  customRequest: string;

  // Step 2: Income & Limit Calculation
  annualIncome?: number;
  married?: boolean;
  dependents?: number;
  socialInsurance?: number;
  mortgageDeduction?: number;
  calculatedLimit?: number;
  newsletter: boolean;
}

export default function Onboarding({ onComplete, onSkip, isGuest }: OnboardingProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 state
  const [categories, setCategories] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [favoriteRegions, setFavoriteRegions] = useState('');
  const [customRequest, setCustomRequest] = useState('');

  // Step 2 state
  const [annualIncome, setAnnualIncome] = useState('');
  const [married, setMarried] = useState<boolean | undefined>(undefined);
  const [dependents, setDependents] = useState('');
  const [socialInsurance, setSocialInsurance] = useState('');
  const [mortgageDeduction, setMortgageDeduction] = useState('');
  const [newsletter, setNewsletter] = useState(true);

  // Step 2: Calculated limit
  const [calculatedLimit, setCalculatedLimit] = useState(0);
  const [calculating, setCalculating] = useState(false);

  const toggleCategory = (categoryId: string) => {
    if (categories.includes(categoryId)) {
      setCategories(categories.filter(c => c !== categoryId));
    } else {
      setCategories([...categories, categoryId]);
    }
  };

  const handleStep1Next = () => {
    if (categories.length === 0) {
      alert('少なくとも1つのカテゴリを選択してください');
      return;
    }
    setStep(2);
  };

  const handleCalculateLimit = async () => {
    if (!annualIncome) {
      alert('年収を入力してください');
      return;
    }

    setCalculating(true);
    try {
      const annualIncomeInYen = Number(annualIncome) * 10000;

      const response = await fetch('/api/calculate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annualIncome: annualIncomeInYen,
          married: married ?? false,
          dependents: dependents ? Number(dependents) : 0,
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

  const handleComplete = () => {
    const data: OnboardingData = {
      categories,
      allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
      favoriteRegions: favoriteRegions ? favoriteRegions.split(',').map(r => r.trim()) : [],
      customRequest,
      annualIncome: annualIncome ? Number(annualIncome) * 10000 : undefined,
      married: married,
      dependents: dependents ? Number(dependents) : undefined,
      socialInsurance: socialInsurance ? Number(socialInsurance) : undefined,
      mortgageDeduction: mortgageDeduction ? Number(mortgageDeduction) : undefined,
      calculatedLimit: calculatedLimit > 0 ? calculatedLimit : undefined,
      newsletter,
    };

    onComplete(data);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">1</div>
              <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700"></div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 flex items-center justify-center font-semibold">2</div>
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">ステップ 1 / 2</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">
              あなたの好みを教えてください
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-center">
              AIがあなたにぴったりの返礼品を提案します
            </p>

            <div className="space-y-8">
              {/* カテゴリ選択 */}
              <div>
                <label className="block text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  好きなカテゴリ <span className="text-red-500">*</span>
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                    （複数選択可、最低1つ必須）
                  </span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                        categories.includes(category.id)
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{category.emoji}</div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {category.displayName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* アレルギー */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  アレルギー <span className="text-slate-400">（任意）</span>
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="例: エビ, カニ, 小麦"
                />
              </div>

              {/* 好きな地域 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  好きな地域 <span className="text-slate-400">（任意）</span>
                </label>
                <input
                  type="text"
                  value={favoriteRegions}
                  onChange={(e) => setFavoriteRegions(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="例: 北海道, 沖縄, 九州"
                />
              </div>

              {/* カスタムリクエスト */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  カスタムリクエスト <span className="text-slate-400">（任意）</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  AIレコメンドで考慮してほしい条件を自由に入力してください
                </p>
                <textarea
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="例: 子供が喜ぶもの、健康志向のもの、大容量がいい"
                />
              </div>
            </div>

            {/* Next button */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleStep1Next}
                disabled={categories.length === 0}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
              >
                次へ →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">✓</div>
            <div className="w-16 h-1 bg-primary-500"></div>
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">2</div>
          </div>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">ステップ 2 / 2</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">
            限度額を計算しましょう
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
            より正確なおすすめのために、収入情報を入力してください
          </p>

          {/* 安心メッセージ */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  安心してご入力ください
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  すべての情報は暗号化されて保存され、第三者に共有されることはありません。<br />
                  また、すべて任意項目のため、スキップして後から入力することも可能です。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* 年収 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                年収（万円）<span className="text-slate-400">（任意）</span>
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                💡 ヒント: 源泉徴収票の「支払金額」をご入力ください
              </p>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="例: 750（750万円の場合）"
              />
            </div>

            {/* 婚姻状況 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                婚姻状況 <span className="text-slate-400">（任意）</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={married === false}
                    onChange={() => setMarried(false)}
                    className="mr-2 w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">独身</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={married === true}
                    onChange={() => setMarried(true)}
                    className="mr-2 w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">既婚</span>
                </label>
              </div>
            </div>

            {/* 扶養人数 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                扶養人数 <span className="text-slate-400">（任意）</span>
              </label>
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                min="0"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            {/* 社会保険料 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                社会保険料（円）<span className="text-slate-400">（任意）</span>
              </label>
              <input
                type="number"
                value={socialInsurance}
                onChange={(e) => setSocialInsurance(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="未入力の場合は自動推定されます"
              />
            </div>

            {/* 住宅ローン控除 */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                住宅ローン控除（円）<span className="text-slate-400">（任意）</span>
              </label>
              <input
                type="number"
                value={mortgageDeduction}
                onChange={(e) => setMortgageDeduction(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="住宅ローン控除がある場合のみ"
              />
            </div>

            {/* 限度額計算ボタン */}
            {annualIncome && (
              <button
                onClick={handleCalculateLimit}
                disabled={calculating}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {calculating ? '計算中...' : '💰 限度額を計算する'}
              </button>
            )}

            {/* 計算結果 */}
            {calculatedLimit > 0 && (
              <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-6">
                <p className="text-sm text-accent-700 dark:text-accent-400 mb-1">
                  💰 概算限度額
                </p>
                <p className="text-4xl font-bold text-accent-700 dark:text-accent-400">
                  {calculatedLimit.toLocaleString()}円
                </p>
                <p className="text-xs text-accent-600 dark:text-accent-300 mt-3">
                  ※ 安全マージン90%を適用した保守的な金額です
                </p>
                <p className="text-xs text-accent-600 dark:text-accent-300">
                  ※ 詳細な控除情報を入力すると、さらに正確な金額が計算されます
                </p>
              </div>
            )}

            {/* メルマガ購読 */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <label className={`flex items-start gap-3 ${isGuest ? 'cursor-not-allowed opacity-60' : 'cursor-pointer group'}`}>
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  disabled={isGuest}
                  className="mt-1 w-5 h-5 text-primary-600 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="flex-1">
                  <div className="font-medium text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    ✅ お得な情報をメールで受け取る
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p>以下の情報をお届けします：</p>
                    <ul className="list-none space-y-1 ml-2">
                      <li>🎁 季節に合わせた旬の返礼品おすすめ情報</li>
                      <li>💰 残りの限度額リマインダー</li>
                      <li>✨ 新着返礼品や人気ランキング情報</li>
                    </ul>
                    {isGuest ? (
                      <p className="text-xs text-warning-600 dark:text-warning-400 mt-2">
                        ※ 登録すると利用できます
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                        ※ いつでも配信停止できます
                      </p>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setStep(1)}
              className="sm:w-32 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              ← 戻る
            </button>
            <button
              onClick={() => {
                // Step 1のデータを保存してスキップ
                onSkip({
                  categories,
                  allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
                  favoriteRegions: favoriteRegions ? favoriteRegions.split(',').map(r => r.trim()) : [],
                  customRequest,
                  calculatedLimit: 0, // スキップ時は0を設定
                  newsletter: newsletter,
                });
              }}
              className="flex-1 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              後で設定する（スキップ）
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 bg-success-500 hover:bg-success-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
            >
              登録完了してダッシュボードへ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
