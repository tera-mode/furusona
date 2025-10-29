'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import Image from 'next/image';
import Script from 'next/script';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 構造化データ
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LAIV LLC',
    legalName: '合同会社LAIV',
    url: 'https://furusona.jp',
    logo: 'https://furusona.jp/img/furusona-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://www.laiv.jp',
    },
    sameAs: [
      'https://www.laiv.jp',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ふるそな',
    url: 'https://furusona.jp',
    description: 'もう12月に慌てない。AIがあなた専属でふるさと納税をサポート',
    publisher: {
      '@type': 'Organization',
      name: 'LAIV LLC',
    },
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ふるそな',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    description: 'AIがあなた専属でふるさと納税をサポート。限度額の管理から、旬の食材の通知まで。',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '本当に無料で使えますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、完全無料でご利用いただけます。クレジットカードの登録も不要です。',
        },
      },
      {
        '@type': 'Question',
        name: '利用に必要なものは？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'メールアドレスもしくはGoogle認証による会員登録が必要です。お預かりした個人情報は厳重に管理し、第三者に提供することはありません。',
        },
      },
      {
        '@type': 'Question',
        name: 'どの自治体の返礼品に対応していますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '全国すべての自治体の返礼品に対応しています。楽天ふるさと納税の返礼品からお選びいただけます。',
        },
      },
      {
        '@type': 'Question',
        name: '確定申告は必要ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '寄付先が5自治体以内の場合、ワンストップ特例制度を利用すれば確定申告不要です。6自治体以上の場合や、他の理由で確定申告が必要な方は、ふるさと納税の控除も確定申告で行います。',
        },
      },
      {
        '@type': 'Question',
        name: 'どんな返礼品がおすすめですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '人気の返礼品は、牛肉（黒毛和牛・宮崎牛など）、海鮮（カニ・いくら・海鮮セット）、お米、日用品（トイレットペーパー・ティッシュ）などです。AIがあなたの家族構成や好みに合わせて最適な返礼品を診断します。',
        },
      },
    ],
  };

  useEffect(() => {
    if (!loading && user) {
      // ユーザーがログイン済みの場合、プロフィール設定またはダッシュボードへリダイレクト
      if (user.preferences.categories && user.preferences.categories.length > 0) {
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
    <>
      {/* 構造化データ（SEO） */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Script
        id="software-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* ヘッダー */}
        <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-4 py-4 flex justify-between items-center">
          <Image
            src="/img/furusona-logo-small.png"
            alt="ふるそな"
            width={180}
            height={60}
            priority
            className="h-8 sm:h-10 w-auto dark:hidden"
          />
          <Image
            src="/img/furusona-logo-white-small.png"
            alt="ふるそな"
            width={180}
            height={60}
            priority
            className="h-8 sm:h-10 w-auto hidden dark:block"
          />
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            ログイン
          </button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-primary-50 to-warning-50 dark:from-slate-800 dark:to-slate-700 py-16 sm:py-20 overflow-hidden">
        {/* 背景画像プレースホルダー（画像追加時にコメント解除）
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/img/hero-bg.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        */}
        <div className="relative max-w-[800px] mx-auto px-4 text-center">
          <div className="inline-block bg-accent-500 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            完全無料
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            もう、12月に慌てない。<br />
            <span className="text-primary-600 dark:text-primary-400">AIがあなたにおすすめの</span><br />
            ふるさと納税を診断
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            限度額シミュレーションから返礼品の選び方まで。<br />
            楽天ふるさと納税の中から、あなたにぴったりの返礼品をAIが診断します
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
          >
            無料で始める <span>→</span>
          </button>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3">
            ※ クレジットカード登録不要
          </p>
        </div>
      </section>

      {/* 課題セクション */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-4">
            こんなお悩み、ありませんか？
          </h2>
          <div className="space-y-4">
            {/* 課題1 */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                限度額まで使いきれない
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                思い出したときに利用するけど、結局限度額の半分も使えていない...
              </p>
            </div>

            {/* 課題2 */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                12月に毎年慌てる
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                年末になって「まだ使ってなかった！」と焦って適当に選んでしまう...
              </p>
            </div>

            {/* 課題3 */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                限度額や使用額が不明
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                自分がいくらまで使えるのか、今年いくら使ったかも把握できていない...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 解決策セクション */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-warning-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            <span className="text-primary-600 dark:text-primary-400">ふるそな</span>が、すべて解決します
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            あなた専属のAIアシスタントが、ふるさと納税を完全サポート
          </p>
        </div>
      </section>

      {/* 機能セクション */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="space-y-8">
            {/* 機能1: AIパーソナライズ推薦 */}
            <div className="bg-primary-50 dark:bg-slate-800 rounded-xl p-6 sm:p-8">
              <div className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                機能 1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                <span className="text-2xl sm:text-3xl mr-2">🧑‍💼</span>
                AIおすすめ診断
              </h3>
              <h4 className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                あなたにぴったりの返礼品を診断
              </h4>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                好みのカテゴリー（牛肉・海鮮・日用品など）を選ぶだけで、AIがあなたにおすすめの返礼品を自動で診断。楽天ふるさと納税の膨大な商品から、本当に欲しいものを見つけ出します。
              </p>
            </div>

            {/* 機能2: かんたん限度額計算 */}
            <div className="bg-primary-50 dark:bg-slate-800 rounded-xl p-6 sm:p-8">
              <div className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                機能 2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                <span className="text-2xl sm:text-3xl mr-2">📊</span>
                限度額シミュレーション
              </h3>
              <h4 className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                残りいくら使えるか一目瞭然
              </h4>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                年収と家族構成を入力するだけで、限度額を自動シミュレーション。今年いくら寄付していて、残りいくら使えるのかをリアルタイムで把握。
              </p>
            </div>

            {/* 機能3: 旬のタイミングで通知 */}
            <div className="bg-primary-50 dark:bg-slate-800 rounded-xl p-6 sm:p-8">
              <div className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                機能 3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                <span className="text-2xl sm:text-3xl mr-2">📧</span>
                旬のタイミングで通知
              </h3>
              <h4 className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                もう買い逃しなし
              </h4>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                旬の食材が出る時期に、メールでお知らせ。ズワイガニは12月、シャインマスカットは9月など、最高のタイミングで返礼品を選べます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-8 sm:mb-12">
            3ステップで簡単スタート
          </h2>
          <div className="space-y-6">
            {/* ステップ1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  無料登録
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  メールアドレスだけで簡単に登録完了
                </p>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  情報入力
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  好みを入力。年収、家族構成は任意入力
                </p>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  AIが推薦
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  あなたにぴったりの返礼品が表示
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション1 */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-500 to-warning-500">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            今すぐ始めて、<br className="sm:hidden" />
            ふるさと納税を最大限活用しよう
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-6">
            無料で始められます。クレジットカード登録も不要。
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-white hover:bg-slate-100 text-primary-600 px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
          >
            無料登録する <span>→</span>
          </button>
          <p className="text-xs sm:text-sm text-white/80 mt-3">
            ※ 登録後すぐに利用開始できます
          </p>
        </div>
      </section>

      {/* FAQセクション */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-8 sm:mb-12">
            よくある質問
          </h2>
          <div className="space-y-4">
            {/* FAQ1 */}
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 group">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                <span className="text-base sm:text-lg">本当に無料で使えますか？</span>
                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                はい、完全無料でご利用いただけます。
              </p>
            </details>

            {/* FAQ2 */}
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 group">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                <span className="text-base sm:text-lg">利用に必要なものは？</span>
                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                メールアドレスもしくはGoogle認証による会員登録が必要です。お預かりした個人情報は厳重に管理し、第三者に提供することはありません。
              </p>
            </details>

            {/* FAQ3 */}
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 group">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                <span className="text-base sm:text-lg">どの自治体の返礼品に対応していますか？</span>
                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                全国すべての自治体の返礼品に対応しています。楽天ふるさと納税の返礼品からお選びいただけます。
              </p>
            </details>

            {/* FAQ4 */}
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 group">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                <span className="text-base sm:text-lg">確定申告は必要ですか？</span>
                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                寄付先が5自治体以内の場合、ワンストップ特例制度を利用すれば確定申告不要です。6自治体以上の場合や、他の理由で確定申告が必要な方は、ふるさと納税の控除も確定申告で行います。
              </p>
            </details>

            {/* FAQ5 */}
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 group">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between">
                <span className="text-base sm:text-lg">どんな返礼品がおすすめですか？</span>
                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                人気の返礼品は、牛肉（黒毛和牛・宮崎牛など）、海鮮（カニ・いくら・海鮮セット）、お米、日用品（トイレットペーパー・ティッシュ）などです。AIが 好みに合わせて最適な返礼品を診断します。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTAセクション2 */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-warning-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
          >
            無料で始める <span>→</span>
          </button>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-8 sm:py-12">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="text-center mb-6">
            <Image
              src="/img/furusona-logo-white-small.png"
              alt="ふるそな"
              width={180}
              height={60}
              className="h-8 w-auto mx-auto mb-4"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm mb-6">
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

      {/* ログインモーダル */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        canClose={true}
      />
      </div>
    </>
  );
}
