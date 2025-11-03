'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function RecommendedGiftsArticle() {
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
        <article>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
            ふるさと納税おすすめ返礼品ランキング【2025年最新】人気カテゴリー別に紹介
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月3日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              「ふるさと納税の返礼品、何を選べばいいかわからない…」そんな悩みを解決！
              2025年の人気返礼品をカテゴリー別にランキング形式でご紹介します。
            </p>
            <p className="text-sm text-gray-600 bg-orange-50 p-4 rounded border-l-4 border-orange-500">
              <strong>この記事でわかること:</strong> 肉・海鮮・フルーツ・日用品など、カテゴリー別のおすすめ返礼品と選び方のポイントをご紹介します。
            </p>
          </div>

          {/* 返礼品の選び方 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              返礼品の賢い選び方
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-5">
                <p className="font-bold text-gray-900 mb-3">💡 返礼品選びの3つのポイント</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">1.</span>
                    <span><strong>還元率をチェック</strong> - 寄付額の30%前後が目安</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">2.</span>
                    <span><strong>レビューを確認</strong> - 実際の利用者の声を参考に</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">3.</span>
                    <span><strong>配送時期に注意</strong> - 特に生鮮食品は受け取りタイミングを考慮</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* カテゴリー別ランキング */}

          {/* 肉類 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-orange-500 pb-2">
              🥩 肉類ランキング
            </h2>
            <p className="text-gray-700 mb-4">
              ふるさと納税で最も人気のカテゴリー。高級ブランド牛や大容量の豚肉・鶏肉が人気です。
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-400 text-white font-bold px-3 py-1 rounded mr-2">1位</span>
                  <h3 className="font-bold text-gray-900">黒毛和牛 切り落とし 1kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円</p>
                <p className="text-gray-700 text-sm">
                  コスパ抜群で使い勝手が良い。すき焼き、牛丼、炒め物など幅広く活用できます。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-400 text-white font-bold px-3 py-1 rounded mr-2">2位</span>
                  <h3 className="font-bold text-gray-900">豚肉 切り落とし 大容量 3kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円前後</p>
                <p className="text-gray-700 text-sm">
                  家族が多い方におすすめ。小分けになっているものが使いやすく人気です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-400 text-white font-bold px-3 py-1 rounded mr-2">3位</span>
                  <h3 className="font-bold text-gray-900">ブランド牛 ステーキ用</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 15,000円〜30,000円</p>
                <p className="text-gray-700 text-sm">
                  特別な日のご褒美に。松阪牛、神戸ビーフ、近江牛などが人気です。
                </p>
              </div>
            </div>
          </section>

          {/* 海鮮 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
              🐟 海鮮ランキング
            </h2>
            <p className="text-gray-700 mb-4">
              新鮮な魚介類が自宅に届く贅沢。カニ、いくら、ウニなど高級食材が人気です。
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-400 text-white font-bold px-3 py-1 rounded mr-2">1位</span>
                  <h3 className="font-bold text-gray-900">いくら醤油漬け 500g</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円</p>
                <p className="text-gray-700 text-sm">
                  お正月やお祝いの席に最適。北海道産が特に人気です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-400 text-white font-bold px-3 py-1 rounded mr-2">2位</span>
                  <h3 className="font-bold text-gray-900">ズワイガニ 1kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 15,000円〜20,000円</p>
                <p className="text-gray-700 text-sm">
                  冬の定番。ボイル済みのものが手軽で人気です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-400 text-white font-bold px-3 py-1 rounded mr-2">3位</span>
                  <h3 className="font-bold text-gray-900">うなぎ蒲焼き 3〜5尾</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円</p>
                <p className="text-gray-700 text-sm">
                  国産うなぎが人気。真空パックで長期保存可能なものが便利です。
                </p>
              </div>
            </div>
          </section>

          {/* フルーツ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
              🍎 フルーツランキング
            </h2>
            <p className="text-gray-700 mb-4">
              旬の時期に産地直送。季節感を楽しめるのが魅力です。
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-400 text-white font-bold px-3 py-1 rounded mr-2">1位</span>
                  <h3 className="font-bold text-gray-900">シャインマスカット 1〜2房</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円 | 旬: 8月〜10月</p>
                <p className="text-gray-700 text-sm">
                  種なしで皮ごと食べられる人気のぶどう。贈答用にも最適です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-400 text-white font-bold px-3 py-1 rounded mr-2">2位</span>
                  <h3 className="font-bold text-gray-900">みかん 5kg〜10kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 5,000円〜10,000円 | 旬: 11月〜2月</p>
                <p className="text-gray-700 text-sm">
                  大容量でコスパが良い。家族みんなで楽しめます。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-400 text-white font-bold px-3 py-1 rounded mr-2">3位</span>
                  <h3 className="font-bold text-gray-900">さくらんぼ（佐藤錦） 500g</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜20,000円 | 旬: 6月〜7月</p>
                <p className="text-gray-700 text-sm">
                  初夏の贅沢。山形県産が特に人気です。
                </p>
              </div>
            </div>
          </section>

          {/* お米 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">
              🌾 お米ランキング
            </h2>
            <p className="text-gray-700 mb-4">
              日常使いに最適。大容量で実用的なのが魅力です。
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-400 text-white font-bold px-3 py-1 rounded mr-2">1位</span>
                  <h3 className="font-bold text-gray-900">コシヒカリ 10kg〜20kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円</p>
                <p className="text-gray-700 text-sm">
                  定番ブランド米。新潟県、福井県産が人気です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-400 text-white font-bold px-3 py-1 rounded mr-2">2位</span>
                  <h3 className="font-bold text-gray-900">ゆめぴりか 10kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円前後</p>
                <p className="text-gray-700 text-sm">
                  北海道のブランド米。粘りと甘みが特徴です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-400 text-white font-bold px-3 py-1 rounded mr-2">3位</span>
                  <h3 className="font-bold text-gray-900">無洗米 つや姫 10kg</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜12,000円</p>
                <p className="text-gray-700 text-sm">
                  とぐ手間が省ける無洗米が便利。山形県産つや姫が人気です。
                </p>
              </div>
            </div>
          </section>

          {/* 日用品・雑貨 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-2">
              🧴 日用品・雑貨ランキング
            </h2>
            <p className="text-gray-700 mb-4">
              食品以外も充実。実用的な返礼品で節約にも貢献します。
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-400 text-white font-bold px-3 py-1 rounded mr-2">1位</span>
                  <h3 className="font-bold text-gray-900">トイレットペーパー 96ロール</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜13,000円</p>
                <p className="text-gray-700 text-sm">
                  日常使いに欠かせない消耗品。買い物の手間が省けます。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-400 text-white font-bold px-3 py-1 rounded mr-2">2位</span>
                  <h3 className="font-bold text-gray-900">ティッシュペーパー 60箱</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円前後</p>
                <p className="text-gray-700 text-sm">
                  大容量で長持ち。保管場所の確保が必要です。
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-400 text-white font-bold px-3 py-1 rounded mr-2">3位</span>
                  <h3 className="font-bold text-gray-900">洗剤セット（洗濯・食器用）</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">寄付額目安: 10,000円〜15,000円</p>
                <p className="text-gray-700 text-sm">
                  日本製の高品質な洗剤が人気。実用性抜群です。
                </p>
              </div>
            </div>
          </section>

          {/* AI診断CTA */}
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
                AIがあなたにぴったりの返礼品を診断
              </h2>
              <p className="text-gray-600 mb-6">
                好みと予算を入力するだけで、<br />
                AIが最適な返礼品を自動でおすすめします。
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">AIおすすめ診断</h3>
                    <p className="text-sm text-gray-600">
                      好みのカテゴリーと限度額から、あなたにぴったりの返礼品を提案
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📅</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">旬の通知機能</h3>
                    <p className="text-sm text-gray-600">
                      フルーツなどの旬の時期に、メールでお知らせ
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
                  Q. 返礼品はいつ届く？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 返礼品によって異なります。在庫があるものは1〜2週間、旬の食材は数ヶ月後になることも。申し込み時に配送時期を必ず確認しましょう。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 返礼品の還元率はどのくらい？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 総務省の規定により、返礼品の還元率は寄付額の30%以内と定められています。実質2,000円の負担で寄付額の30%相当の返礼品が受け取れるため、非常にお得です。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 同じ返礼品を複数回もらえる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. はい、可能です。気に入った返礼品は何度でも申し込めます。ただし、限度額内での寄付を心がけましょう。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 食品以外の返礼品もある？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. はい、日用品、家電、旅行券、体験型など多様な返礼品があります。最近は防災グッズやSDGs関連商品も人気です。
                </p>
              </div>
            </div>
          </section>

          {/* 関連記事 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              関連記事
            </h2>
            <div className="space-y-3">
              <Link
                href="/article/furusato-hajimekata"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税の始め方【2025年完全ガイド】
                </p>
                <p className="text-sm text-gray-500">返礼品を選ぶ前に基本をチェック</p>
              </Link>
              <Link
                href="/article/furusato-gendogaku-simulation"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税限度額シミュレーション【2025年最新】
                </p>
                <p className="text-sm text-gray-500">あなたの限度額を簡単計算</p>
              </Link>
              <Link
                href="/article/furusato-shippai-chuui"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税で失敗しない方法と注意点【2025年版】
                </p>
                <p className="text-sm text-gray-500">返礼品選びの失敗を防ぐ</p>
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
