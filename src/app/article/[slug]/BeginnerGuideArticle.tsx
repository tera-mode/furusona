'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function BeginnerGuideArticle() {
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
            ふるさと納税の始め方【2025年完全ガイド】初心者でも簡単にできる手順を解説
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月3日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              「ふるさと納税を始めてみたいけど、何から手をつければいいかわからない…」そんな悩みを抱えていませんか？
              この記事では、ふるさと納税の始め方を初心者にもわかりやすく、ステップごとに丁寧に解説します。
            </p>
            <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <strong>この記事でわかること:</strong> ふるさと納税の基本的な仕組みから、実際の申し込み方法、控除を受けるための手続きまで、すべてを網羅的に解説します。
            </p>
          </div>

          {/* ふるさと納税とは */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ふるさと納税とは？基本の仕組みを理解しよう
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ふるさと納税は、自分が応援したい自治体に寄付をすることで、所得税・住民税から控除を受けられる制度です。
                <strong>実質2,000円の自己負担</strong>で、全国各地の魅力的な返礼品を楽しむことができます。
              </p>
              <div className="bg-orange-50 rounded-lg p-5 my-4">
                <p className="font-bold text-gray-900 mb-3">💡 ふるさと納税の3つのメリット</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>実質2,000円で返礼品がもらえる</strong> - 寄付額の30%相当の返礼品を受け取れます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>税金が控除される</strong> - 所得税と住民税から寄付額-2,000円が控除されます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>地域を応援できる</strong> - 自分が選んだ自治体の発展に貢献できます</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <a
                  href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  総務省｜ふるさと納税ポータルサイト
                </a>
                で制度の詳細をご確認いただけます。
              </p>
            </div>
          </section>

          {/* 始め方の手順 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ふるさと納税の始め方【5ステップで完了】
            </h2>

            {/* ステップ1 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ1</span>
                <h3 className="text-xl font-bold text-gray-900">自分の限度額を確認する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                まずは、自分がいくらまでふるさと納税できるかの「控除上限額」を確認しましょう。
                年収や家族構成によって異なります。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>限度額の目安（給与収入・独身の場合）</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 年収300万円: 約28,000円</li>
                  <li>• 年収400万円: 約42,000円</li>
                  <li>• 年収500万円: 約61,000円</li>
                  <li>• 年収600万円: 約77,000円</li>
                  <li>• 年収700万円: 約108,000円</li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/article/furusato-gendogaku-simulation"
                  className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  限度額シミュレーターで正確に計算 →
                </Link>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ2</span>
                <h3 className="text-xl font-bold text-gray-900">返礼品を選ぶ</h3>
              </div>
              <p className="text-gray-700 mb-3">
                ふるさと納税サイトで、欲しい返礼品を探しましょう。食品、日用品、旅行券など、多様な返礼品があります。
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">人気のカテゴリー</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>• 肉・海鮮</div>
                  <div>• フルーツ</div>
                  <div>• お米</div>
                  <div>• 日用品・雑貨</div>
                  <div>• お酒・飲料</div>
                  <div>• 旅行券・体験</div>
                </div>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ3</span>
                <h3 className="text-xl font-bold text-gray-900">自治体に寄付を申し込む</h3>
              </div>
              <p className="text-gray-700 mb-3">
                返礼品を選んだら、ふるさと納税サイトから申し込みます。クレジットカードやコンビニ払いなど、支払い方法も選べます。
              </p>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ 注意:</strong> 必ず本人名義で申し込んでください。家族名義で申し込むと控除を受けられません。
                </p>
              </div>
            </div>

            {/* ステップ4 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ4</span>
                <h3 className="text-xl font-bold text-gray-900">返礼品と証明書を受け取る</h3>
              </div>
              <p className="text-gray-700 mb-3">
                寄付後、自治体から返礼品と「寄付金受領証明書」が届きます。証明書は控除の手続きに必要なので、必ず保管してください。
              </p>
              <div className="bg-red-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>📄 寄付金受領証明書の保管</strong><br />
                  確定申告やワンストップ特例に必要です。紛失しないよう、ファイルにまとめて保管しましょう。
                </p>
              </div>
            </div>

            {/* ステップ5 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ5</span>
                <h3 className="text-xl font-bold text-gray-900">控除の手続きをする</h3>
              </div>
              <p className="text-gray-700 mb-3">
                税金の控除を受けるには、「ワンストップ特例制度」または「確定申告」のいずれかの手続きが必要です。
              </p>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">✅ ワンストップ特例制度（簡単）</p>
                  <p className="text-sm text-gray-700 mb-2">
                    寄付先が5自治体以内で、確定申告が不要な方向け。自治体から送られてくる申請書を返送するだけで完了します。
                  </p>
                  <p className="text-xs text-gray-600">
                    申請期限: 翌年1月10日必着
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">📝 確定申告</p>
                  <p className="text-sm text-gray-700 mb-2">
                    6自治体以上に寄付した方、または他の理由で確定申告が必要な方向け。
                  </p>
                  <p className="text-xs text-gray-600">
                    申告期限: 翌年2月16日〜3月15日
                  </p>
                </div>
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
                ふるさと納税を始めるなら、ふるそなで！
              </h2>
              <p className="text-gray-600 mb-6">
                AIがあなたにぴったりの返礼品を診断。<br />
                限度額管理から旬の通知まで、すべてお任せください。
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
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
                  Q. ふるさと納税はいつからいつまでできる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. ふるさと納税は年中いつでも申し込めますが、その年の控除を受けたい場合は12月31日までに寄付を完了させる必要があります。年末は混み合うので、11月中旬までの申し込みがおすすめです。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 複数の自治体に寄付できる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. はい、何自治体でも寄付できます。ただし、ワンストップ特例制度を利用する場合は5自治体までです。6自治体以上に寄付する場合は確定申告が必要になります。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 控除はいつ受けられる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. ワンストップ特例制度の場合は翌年6月以降の住民税から控除されます。確定申告の場合は、所得税は申告後1〜2ヶ月で還付され、住民税は翌年6月以降から控除されます。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 限度額を超えて寄付したらどうなる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 限度額を超えた分は控除されず、全額自己負担になります。ただし返礼品は受け取れます。節税効果を最大化したい場合は、限度額内での寄付がおすすめです。
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
                href="/article/furusato-gendogaku-simulation"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税限度額シミュレーション【2025年最新】
                </p>
                <p className="text-sm text-gray-500">ステップ1で必要な限度額を簡単計算</p>
              </Link>
              <Link
                href="/article/furusato-onestop"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税ワンストップ特例制度とは？【2025年最新】
                </p>
                <p className="text-sm text-gray-500">確定申告不要の簡単な控除手続き</p>
              </Link>
              <Link
                href="/article/furusato-osusume-henreihin"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税おすすめ返礼品ランキング【2025年最新】
                </p>
                <p className="text-sm text-gray-500">人気カテゴリー別におすすめ返礼品を紹介</p>
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
