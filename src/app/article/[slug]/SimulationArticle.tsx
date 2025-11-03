'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { calculateFurusatoLimit, roundToThousand } from '@/utils/furusatoCalculator';

const STORAGE_KEY = 'furusato_simulation_state';

interface SimulationState {
  annualIncome: string;
  married: boolean;
  dependents: number;
  result: number | null;
  showResult: boolean;
}

export default function SimulationArticle() {
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [married, setMarried] = useState<boolean>(false);
  const [dependents, setDependents] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);

    // sessionStorageから状態を復元
    try {
      const savedState = sessionStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const state: SimulationState = JSON.parse(savedState);
        setAnnualIncome(state.annualIncome);
        setMarried(state.married);
        setDependents(state.dependents);
        setResult(state.result);
        setShowResult(state.showResult);
      }
    } catch (error) {
      console.error('Failed to restore state:', error);
    }
  }, []);

  // 状態が変更されたらsessionStorageに保存
  useEffect(() => {
    if (!isClient) return;

    try {
      const state: SimulationState = {
        annualIncome,
        married,
        dependents,
        result,
        showResult,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [annualIncome, married, dependents, result, showResult, isClient]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const income = parseInt(annualIncome);
    if (isNaN(income) || income <= 0) {
      alert('正しい年収を入力してください');
      return;
    }

    const limit = calculateFurusatoLimit({
      annualIncome: income,
      married,
      dependents,
    });

    const rounded = roundToThousand(limit);
    setResult(rounded);
    setShowResult(true);

    // 結果までスクロール
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('ja-JP');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー部分 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image
              src="/img/furusona-logo-small.png"
              alt="ふるそな"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        {/* タイトル */}
        <article>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            ふるさと納税限度額シミュレーション【2025年最新】無料計算ツール
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月3日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              ふるさと納税を始めたいけど、「自分はいくらまで寄付できるの？」と悩んでいませんか？
              このページでは、年収と家族構成を入力するだけで、あなたのふるさと納税限度額を簡単に計算できます。
            </p>
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded border-l-4 border-orange-500">
              <strong>注意:</strong> この計算は目安です。実際の控除額は確定申告により変動する場合があります。
            </p>
          </div>

          {/* シミュレーションフォーム */}
          <section className="bg-gray-50 rounded-lg p-6 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              あなたのふるさと納税限度額を無料で計算する
            </h2>

            <form onSubmit={handleCalculate} className="space-y-6">
              {/* 年収入力 */}
              <div>
                <label htmlFor="income" className="block text-base font-bold text-primary-600 mb-2">
                  年収（額面）<span className="text-red-600 text-lg ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="income"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    placeholder="例: 5000000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                    required
                    min="0"
                    step="10000"
                    inputMode="numeric"
                    pattern="\d*"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    円
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  💡 源泉徴収票の「支払金額」を入力してください
                </p>
              </div>

              {/* 配偶者の有無 */}
              <div>
                <label className="block text-base font-bold text-primary-600 mb-3">
                  配偶者の有無<span className="text-red-600 text-lg ml-1">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="married"
                      checked={!married}
                      onChange={() => setMarried(false)}
                      className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">独身</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="married"
                      checked={married}
                      onChange={() => setMarried(true)}
                      className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">既婚</span>
                  </label>
                </div>
              </div>

              {/* 扶養人数 */}
              <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-2">
                  扶養人数（任意）
                </label>
                <select
                  id="dependents"
                  value={dependents}
                  onChange={(e) => setDependents(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                  <option value="5">5人以上</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  扶養している子どもや親の人数
                </p>
              </div>

              {/* 計算ボタン */}
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg transition-colors shadow-md text-lg"
              >
                限度額を計算する
              </button>
            </form>
          </section>

        {/* 計算結果 */}
        {showResult && result !== null && (
          <section id="result-section" className="bg-white rounded-lg p-6 mb-8 shadow-sm border-2 border-orange-500">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              計算結果
            </h2>

            {/* 計算条件の表示 */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm">
              <p className="font-semibold text-gray-700 mb-2">📋 計算条件</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600">
                <span>年収: {formatCurrency(parseInt(annualIncome))}円</span>
                <span>•</span>
                <span>{married ? '既婚' : '独身'}</span>
                <span>•</span>
                <span>扶養人数: {dependents}人</span>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">あなたの限度額（目安）</p>
              <p className="text-4xl font-bold text-orange-600 mb-2">
                {formatCurrency(result)}
                <span className="text-2xl">円</span>
              </p>
              <p className="text-sm text-gray-600">
                年間で約{formatCurrency(result)}円分のふるさと納税が可能です
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">自己負担額</span>
                <span className="font-semibold">2,000円</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">控除される金額</span>
                <span className="font-semibold">{formatCurrency(result - 2000)}円</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded mb-6">
              <p className="font-semibold mb-2">💡 ポイント</p>
              <p>
                この限度額内でふるさと納税をすれば、実質負担2,000円で地域の特産品がもらえます。
                限度額を超えると自己負担が増えるのでご注意ください。
              </p>
            </div>

            {/* 計算結果直下のCTA */}
            <div className="bg-gradient-to-r from-primary-50 to-warning-50 rounded-lg p-6 border border-primary-200">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                🎯 この限度額に合わせたおすすめ返礼品をAIが診断！
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                限度額{formatCurrency(result)}円を有効活用できる、あなたにぴったりの返礼品をAIが提案します。
              </p>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center font-bold py-3 rounded-lg transition-colors shadow-md"
              >
                無料でAI診断を始める →
              </Link>
            </div>
          </section>
        )}

        {/* ふるさと納税の基礎知識 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            ふるさと納税とは？
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              ふるさと納税は、自分が応援したい自治体に寄付をすることで、税金の控除を受けられる制度です。
              実質2,000円の負担で、全国の特産品を楽しむことができます。
            </p>
            <p className="text-sm text-gray-600">
              <a
                href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                総務省｜ふるさと納税ポータルサイト
              </a>
              より詳しい制度内容をご確認いただけます。
            </p>
            <div className="bg-primary-50 rounded p-5 my-4">
              <p className="font-bold text-gray-900 mb-3">主なメリット</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2 font-bold">✓</span>
                  <span>実質2,000円の負担で全国の返礼品がもらえる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2 font-bold">✓</span>
                  <span>所得税・住民税が控除される</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2 font-bold">✓</span>
                  <span>好きな自治体を応援できる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2 font-bold">✓</span>
                  <span>地域の特産品を楽しめる</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 限度額の計算方法 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            限度額はどう決まる？
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              ふるさと納税の限度額は、主に以下の要素で決まります：
            </p>
            <div className="space-y-3 my-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-1">年収</h3>
                <p className="text-sm text-gray-700">
                  収入が多いほど限度額が高くなります。年収が上がれば、それだけ多くの寄付が可能になります。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-1">家族構成</h3>
                <p className="text-sm text-gray-700">
                  配偶者や扶養家族がいると、控除額が増えるため、限度額が変わります。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-1">その他の控除</h3>
                <p className="text-sm text-gray-700">
                  住宅ローン控除や医療費控除などがあると、限度額に影響します。
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
              <strong>注意:</strong> 上記シミュレーターは給与所得者向けの簡易計算です。個人事業主の方や、複数の控除を受けている方は、より詳細な計算をおすすめします。
            </p>
          </div>
        </section>

        {/* ふるそなPRセクション */}
        <section className="bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg p-8 mb-10 border border-primary-200">
          <div className="text-center mb-6">
            <Link href="/" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
              <Image
                src="/img/furusona-logo-small.png"
                alt="ふるそな"
                width={160}
                height={53}
                className="h-10 w-auto"
              />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              もう、12月に慌てない。<br />
              AIがあなたにおすすめの<br className="sm:hidden" />ふるさと納税を診断
            </h2>
            <p className="text-gray-600 mb-6">
              限度額シミュレーションから返礼品の選び方まで。<br />
              あなた専属のAIアシスタントが、ふるさと納税を完全サポート
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-3xl">👌</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">AIおすすめ診断</h3>
                  <p className="text-sm text-gray-600">
                    好みのカテゴリーを選ぶだけで、AIがあなたにおすすめの返礼品を自動で診断
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">限度額シミュレーション</h3>
                  <p className="text-sm text-gray-600">
                    今年いくら寄付していて、残りいくら使えるのかをリアルタイムで把握
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📧</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">旬のタイミングで通知</h3>
                  <p className="text-sm text-gray-600">
                    旬の食材が出る時期に、メールでお知らせ。もう買い逃しなし
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center font-bold py-4 rounded-lg transition-colors shadow-md text-lg"
          >
            無料で始める →
          </Link>

          <p className="text-sm text-center text-gray-600 mt-4">
            完全無料 | クレジットカード登録不要 | 登録後すぐに利用開始
          </p>
        </section>

        {/* よくある質問 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            よくある質問
          </h2>
          <div className="space-y-5">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Q. 限度額を超えて寄付するとどうなる？
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A. 限度額を超えた分は控除されず、自己負担になります。2,000円を超える負担が発生するため、限度額内での寄付をおすすめします。
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Q. いつまでに寄付すればいい？
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A. その年の1月1日〜12月31日までの寄付が、翌年の住民税から控除されます。年末は混み合うので早めの寄付がおすすめです。
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Q. ワンストップ特例と確定申告、どっちがいい？
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A. 寄付先が5自治体以内なら「ワンストップ特例」が簡単です。6自治体以上や、他に確定申告が必要な場合は確定申告をしましょう。
              </p>
            </div>
          </div>
        </section>

        {/* 関連記事（将来の拡張用） */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
            関連記事
          </h2>
          <div className="space-y-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
            >
              <p className="font-bold text-gray-900 mb-1">
                ふるさと納税の始め方 - 初心者向け完全ガイド
              </p>
              <p className="text-sm text-gray-500">準備中</p>
            </Link>
          </div>
        </section>
        </article>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-6">
            <Image
              src="/img/furusona-logo-white-small.png"
              alt="ふるそな"
              width={180}
              height={60}
              className="h-8 w-auto mx-auto mb-4"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            <a
              href="https://www.laiv.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              運営会社
            </a>
            <a
              href="https://www.laiv.jp/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              プライバシーポリシー
            </a>
            <a
              href="https://www.laiv.jp/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              利用規約
            </a>
          </div>
          <p className="text-center text-sm">&copy; 2025 LAIV LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
