'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function OneStopArticle() {
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
            ふるさと納税ワンストップ特例制度とは？【2025年最新】申請方法を完全解説
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月3日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              「ふるさと納税の確定申告は面倒そう…」と思っている方に朗報です。
              <strong>ワンストップ特例制度</strong>を使えば、確定申告なしで税金の控除を受けられます。
            </p>
            <p className="text-sm text-gray-600 bg-green-50 p-4 rounded border-l-4 border-green-500">
              <strong>この記事でわかること:</strong> ワンストップ特例制度の仕組み、利用条件、申請方法、注意点まで、すべてを詳しく解説します。
            </p>
          </div>

          {/* ワンストップ特例制度とは */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ワンストップ特例制度とは？
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ワンストップ特例制度は、確定申告をしなくてもふるさと納税の控除を受けられる便利な制度です。
                寄付した自治体に申請書を送るだけで手続きが完了します。
              </p>
              <div className="bg-blue-50 rounded-lg p-5 my-4">
                <p className="font-bold text-gray-900 mb-3">✅ ワンストップ特例制度の特徴</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">✓</span>
                    <span><strong>確定申告が不要</strong> - 申請書を郵送するだけで完了</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">✓</span>
                    <span><strong>住民税から全額控除</strong> - 翌年6月以降の住民税が減額されます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">✓</span>
                    <span><strong>手続きが簡単</strong> - 書類記入と本人確認書類の提出のみ</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <a
                  href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/deduction.html#block02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  総務省｜ワンストップ特例制度について
                </a>
                で詳細をご確認いただけます。
              </p>
            </div>
          </section>

          {/* 利用条件 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ワンストップ特例制度を利用できる条件
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                ワンストップ特例制度を利用するには、以下の<strong>すべての条件</strong>を満たす必要があります。
              </p>

              <div className="bg-white rounded-lg p-6 border-2 border-green-500">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">✅</span>
                  <h3 className="text-lg font-bold text-gray-900">条件1: 確定申告が不要な給与所得者</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  会社員など、確定申告をする必要がない方が対象です。
                </p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-1">⚠️ 確定申告が必要な方（利用不可）</p>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• 個人事業主・フリーランス</li>
                    <li>• 年収2,000万円超の方</li>
                    <li>• 医療費控除を受ける方</li>
                    <li>• 住宅ローン控除（初年度）を受ける方</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-green-500">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">✅</span>
                  <h3 className="text-lg font-bold text-gray-900">条件2: 寄付先が5自治体以内</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  1年間（1月1日〜12月31日）の寄付先が5自治体までの場合に限ります。
                </p>
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <p className="font-semibold text-gray-900 mb-1">💡 ポイント</p>
                  <ul className="text-gray-700 space-y-1">
                    <li>• 同じ自治体に複数回寄付してもOK（1自治体としてカウント）</li>
                    <li>• 6自治体以上に寄付した場合は確定申告が必要</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-green-500">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">✅</span>
                  <h3 className="text-lg font-bold text-gray-900">条件3: 申請書を期限内に提出</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  寄付した自治体ごとに、申請書を提出する必要があります。
                </p>
                <div className="bg-red-50 p-3 rounded text-sm border-l-4 border-red-500">
                  <p className="font-semibold text-gray-900 mb-1">📅 申請期限</p>
                  <p className="text-gray-700">
                    <strong>翌年1月10日（必着）</strong><br />
                    例: 2025年の寄付 → 2026年1月10日までに申請
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 申請方法 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ワンストップ特例制度の申請方法【3ステップ】
            </h2>

            {/* ステップ1 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ1</span>
                <h3 className="text-xl font-bold text-gray-900">申請書を入手する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                寄付した自治体から申請書が郵送されます。届かない場合は自治体に連絡するか、自分でダウンロードして印刷することもできます。
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm font-semibold text-gray-900 mb-2">📄 申請書の正式名称</p>
                <p className="text-sm text-gray-700">
                  「寄附金税額控除に係る申告特例申請書」
                </p>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ2</span>
                <h3 className="text-xl font-bold text-gray-900">申請書に必要事項を記入する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                申請書に以下の情報を記入します。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold text-gray-900 mb-2">記入項目</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 氏名・住所・生年月日</li>
                  <li>• マイナンバー（個人番号）</li>
                  <li>• 寄付日・寄付金額</li>
                  <li>• 「申告特例申請書を提出する」にチェック</li>
                  <li>• 署名・押印（不要な自治体もあり）</li>
                </ul>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ3</span>
                <h3 className="text-xl font-bold text-gray-900">本人確認書類を添付して郵送する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                記入した申請書と本人確認書類のコピーを同封して、自治体に郵送します。
              </p>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">✅ マイナンバーカードを持っている場合</p>
                  <p className="text-sm text-gray-700">
                    マイナンバーカードの<strong>両面コピー</strong>を添付
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">📝 マイナンバーカードがない場合</p>
                  <p className="text-sm text-gray-700 mb-2">
                    以下の2種類の書類が必要です：
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. マイナンバー通知カードのコピー または マイナンバー記載の住民票</li>
                    <li>2. 本人確認書類（運転免許証、パスポートなど）のコピー</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* オンライン申請 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              オンラインで申請する方法
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                一部のふるさと納税サイトでは、<strong>オンライン申請</strong>に対応しています。
                郵送の手間が省けて便利です。
              </p>
              <div className="bg-purple-50 rounded-lg p-5">
                <p className="font-bold text-gray-900 mb-3">💻 オンライン申請対応サイト</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 font-bold">•</span>
                    <span>さとふる（さとふるアプリ経由）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 font-bold">•</span>
                    <span>ふるなび</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 font-bold">•</span>
                    <span>楽天ふるさと納税（一部自治体）</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  ※ 対応状況は自治体によって異なります
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
                ふるそななら、ワンストップ申請も簡単管理
              </h2>
              <p className="text-gray-600 mb-6">
                寄付履歴を自動で管理。<br />
                申請書の提出状況もチェックできます。
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📋</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">寄付履歴の一元管理</h3>
                    <p className="text-sm text-gray-600">
                      いつ・どの自治体に・いくら寄付したかを一覧で確認できます
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🔔</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">申請期限のリマインド</h3>
                    <p className="text-sm text-gray-600">
                      1月10日の期限前にメールでお知らせ。提出忘れを防げます
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
                  Q. 申請書を出し忘れたらどうなる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 1月10日までに申請書が届かなかった場合、ワンストップ特例は無効になります。その場合は確定申告をすることで控除を受けられます。確定申告の期限は3月15日なので、まだ間に合います。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 引っ越しした場合はどうする？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 申請書提出後に住所が変わった場合は、「申請事項変更届出書」を翌年1月10日までに提出する必要があります。変更届を提出しないと、正しく控除が適用されない可能性があります。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. ワンストップと確定申告、どちらがお得？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 控除額は同じです。違いは手続きの方法だけです。ワンストップは手続きが簡単ですが、寄付先が5自治体までという制限があります。6自治体以上に寄付したい場合は確定申告を選びましょう。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 同じ自治体に複数回寄付した場合、申請書は何枚必要？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 寄付するたびに申請書の提出が必要です。同じ自治体でも、寄付回数分の申請書を提出してください。ただし、「1自治体」としてカウントされるため、5自治体の制限には影響しません。
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
                <p className="text-sm text-gray-500">初心者でも簡単にできる手順を解説</p>
              </Link>
              <Link
                href="/article/furusato-kakuteishinkoku"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税の確定申告のやり方【2025年完全マニュアル】
                </p>
                <p className="text-sm text-gray-500">ワンストップが使えない場合の確定申告方法</p>
              </Link>
              <Link
                href="/article/furusato-shippai-chuui"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税で失敗しない方法と注意点【2025年版】
                </p>
                <p className="text-sm text-gray-500">申請書提出忘れなど、よくある失敗を防ぐ</p>
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
