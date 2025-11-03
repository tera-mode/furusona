'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ConfirmationTaxArticle() {
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
            ふるさと納税の確定申告のやり方【2025年完全マニュアル】手順を詳しく解説
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月4日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              「ふるさと納税の確定申告って難しそう…」そんな不安を抱えていませんか？
              この記事では、ふるさと納税の確定申告について、初心者でもわかるように手順を丁寧に解説します。
            </p>
            <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <strong>この記事でわかること:</strong> 確定申告が必要なケース、必要書類の準備から提出まで、e-Taxでのオンライン申告方法まで、すべてを網羅的に解説します。
            </p>
          </div>

          {/* 確定申告とは */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ふるさと納税の確定申告とは？
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ふるさと納税の確定申告は、寄付金控除を受けるために、1年間に行った寄付の内容を税務署に報告する手続きです。
                <strong>ワンストップ特例制度が利用できない方</strong>は、必ず確定申告を行う必要があります。
              </p>
              <div className="bg-orange-50 rounded-lg p-5 my-4">
                <p className="font-bold text-gray-900 mb-3">💡 確定申告で受けられる控除</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>所得税からの還付</strong> - 申告後1〜2ヶ月で指定口座に振り込まれます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>住民税からの控除</strong> - 翌年6月以降の住民税が減額されます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 font-bold">✓</span>
                    <span><strong>合計で寄付額-2,000円が控除</strong> - 実質2,000円の自己負担で済みます</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <a
                  href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/deduction.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  総務省｜ふるさと納税の控除について
                </a>
                で詳細をご確認いただけます。
              </p>
            </div>
          </section>

          {/* いつ確定申告が必要か */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              確定申告が必要なケース
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                以下のいずれかに該当する場合は、ワンストップ特例制度を利用できないため、確定申告が必要です。
              </p>

              <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
                <p className="font-bold text-gray-900 mb-3">📋 確定申告が必要な人</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">1.</span>
                    <div>
                      <strong>6自治体以上に寄付した方</strong>
                      <p className="text-sm text-gray-600 mt-1">同じ自治体に複数回寄付しても1自治体とカウントされます</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">2.</span>
                    <div>
                      <strong>もともと確定申告が必要な方</strong>
                      <p className="text-sm text-gray-600 mt-1">個人事業主、副業収入が年20万円超の方、医療費控除を受ける方など</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">3.</span>
                    <div>
                      <strong>ワンストップ特例の申請書を提出し忘れた方</strong>
                      <p className="text-sm text-gray-600 mt-1">翌年1月10日の期限を過ぎた場合は確定申告で対応</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">4.</span>
                    <div>
                      <strong>住所変更があった方</strong>
                      <p className="text-sm text-gray-600 mt-1">ワンストップ特例申請後に引っ越して変更届を出していない場合</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 ヒント:</strong> 5自治体以内で、確定申告が不要な会社員の方は、
                  <Link href="/article/furusato-onestop" className="text-primary-600 hover:text-primary-700 underline">
                    ワンストップ特例制度
                  </Link>
                  の方が簡単です。
                </p>
              </div>
            </div>
          </section>

          {/* 確定申告の手順 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              確定申告の手順【5ステップで完了】
            </h2>

            {/* ステップ1 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ1</span>
                <h3 className="text-xl font-bold text-gray-900">必要書類を準備する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                確定申告に必要な書類を揃えましょう。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>必要な書類</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>寄付金受領証明書</strong>（寄付した全自治体分）</li>
                  <li>• <strong>源泉徴収票</strong>（会社員の場合）</li>
                  <li>• <strong>マイナンバーカード</strong>または通知カード+本人確認書類</li>
                  <li>• <strong>還付金受取用の銀行口座情報</strong></li>
                  <li>• <strong>印鑑</strong>（郵送・窓口提出の場合）</li>
                </ul>
              </div>
              <div className="mt-3 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ 注意:</strong> 寄付金受領証明書は自治体から郵送されます。紛失した場合は自治体に再発行を依頼してください。
                </p>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ2</span>
                <h3 className="text-xl font-bold text-gray-900">確定申告書を作成する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                国税庁の「確定申告書等作成コーナー」を利用すれば、画面の指示に従って入力するだけで簡単に作成できます。
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">入力する主な項目</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>1. 給与所得の情報（源泉徴収票の内容）</li>
                    <li>2. 寄付金控除の情報（受領証明書の内容）</li>
                    <li>3. 還付金の振込先口座情報</li>
                    <li>4. マイナンバー</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>💡 ポイント:</strong> ふるさと納税の寄付金は「寄付金控除」の欄に入力します。全自治体への寄付額の合計を記入してください。
                  </p>
                </div>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ3</span>
                <h3 className="text-xl font-bold text-gray-900">寄付金の情報を入力する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                寄付金控除の欄に、ふるさと納税の情報を入力します。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>入力例</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 寄付先の名称: 〇〇県〇〇市</li>
                  <li>• 寄付金の種類: 「都道府県、市区町村に対する寄附金（ふるさと納税）」を選択</li>
                  <li>• 寄付金額: 30,000円（受領証明書に記載の金額）</li>
                  <li>• 寄付年月日: 2024年12月15日</li>
                </ul>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  複数の自治体に寄付した場合は、すべての自治体分を個別に入力するか、合計金額を入力します。
                </p>
              </div>
            </div>

            {/* ステップ4 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ4</span>
                <h3 className="text-xl font-bold text-gray-900">控除額を確認する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                入力が完了すると、自動的に控除額が計算されます。
              </p>
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>控除額の内訳</strong>
                </p>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>寄付金額:</span>
                    <span className="font-semibold">50,000円</span>
                  </div>
                  <div className="flex justify-between">
                    <span>自己負担額:</span>
                    <span className="font-semibold">-2,000円</span>
                  </div>
                  <div className="flex justify-between border-t border-orange-200 pt-2">
                    <span>控除額合計:</span>
                    <span className="font-bold text-lg">48,000円</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <div>• 所得税還付: 約4,800円（申告後1〜2ヶ月）</div>
                    <div>• 住民税控除: 約43,200円（翌年6月〜）</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ステップ5 */}
            <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
              <div className="flex items-center mb-3">
                <span className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full mr-3">ステップ5</span>
                <h3 className="text-xl font-bold text-gray-900">申告書を提出する</h3>
              </div>
              <p className="text-gray-700 mb-3">
                作成した確定申告書を提出します。提出方法は3種類あります。
              </p>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">✅ e-Tax（オンライン）おすすめ</p>
                  <p className="text-sm text-gray-700 mb-2">
                    マイナンバーカードがあれば、自宅から24時間いつでも提出可能。印刷や郵送が不要で最も便利です。
                  </p>
                  <p className="text-xs text-gray-600">
                    必要なもの: マイナンバーカード、ICカードリーダーまたはスマホ
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">📮 郵送</p>
                  <p className="text-sm text-gray-700 mb-2">
                    申告書を印刷して、添付書類とともに税務署へ郵送。消印の日付が提出日になります。
                  </p>
                  <p className="text-xs text-gray-600">
                    添付書類: 寄付金受領証明書、源泉徴収票、マイナンバー確認書類のコピー
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">🏢 税務署の窓口</p>
                  <p className="text-sm text-gray-700 mb-2">
                    税務署の窓口に直接持参。記入内容を確認してもらえます。
                  </p>
                  <p className="text-xs text-gray-600">
                    受付時間: 平日8:30〜17:00（確定申告期間中は一部日曜日も開庁）
                  </p>
                </div>
              </div>
              <div className="mt-3 bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-700">
                  <strong>📅 提出期限:</strong> 翌年2月16日〜3月15日（土日の場合は翌平日）
                </p>
              </div>
            </div>
          </section>

          {/* e-Taxでのオンライン申告方法 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              e-Taxでのオンライン申告方法
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                e-Taxを利用すれば、自宅から簡単に確定申告ができます。24時間いつでも提出でき、書類の郵送も不要です。
              </p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                <p className="font-bold text-gray-900 mb-4 text-lg">e-Taxのメリット</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⏰</span>
                    <div>
                      <p className="font-semibold text-gray-900">24時間いつでも提出可能</p>
                      <p className="text-sm text-gray-600">自宅から好きな時間に申告できます</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📄</span>
                    <div>
                      <p className="font-semibold text-gray-900">書類の印刷・郵送不要</p>
                      <p className="text-sm text-gray-600">紙の書類を用意する手間が省けます</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                      <p className="font-semibold text-gray-900">還付が早い</p>
                      <p className="text-sm text-gray-600">通常より1〜2週間早く還付されます</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🔒</span>
                    <div>
                      <p className="font-semibold text-gray-900">安全・確実</p>
                      <p className="text-sm text-gray-600">受付完了の通知がすぐに届きます</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">e-Taxの利用方法</h3>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm mr-2">STEP 1</span>
                    <h4 className="font-bold text-gray-900">準備するもの</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• マイナンバーカード</li>
                    <li>• ICカードリーダーまたはマイナンバーカード読み取り対応スマートフォン</li>
                    <li>• パソコンまたはスマートフォン</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm mr-2">STEP 2</span>
                    <h4 className="font-bold text-gray-900">国税庁の確定申告書等作成コーナーにアクセス</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    国税庁ホームページの「確定申告書等作成コーナー」から、「作成開始」をクリックします。
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm mr-2">STEP 3</span>
                    <h4 className="font-bold text-gray-900">マイナンバーカードでログイン</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    「マイナンバーカード方式」を選択し、ICカードリーダーまたはスマホでマイナンバーカードを読み取ります。
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm mr-2">STEP 4</span>
                    <h4 className="font-bold text-gray-900">申告内容を入力</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    画面の指示に従って、源泉徴収票の内容と寄付金控除の情報を入力します。
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm mr-2">STEP 5</span>
                    <h4 className="font-bold text-gray-900">送信して完了</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    入力内容を確認し、電子署名をして送信します。受付完了の通知メッセージが表示されたら完了です。
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 mt-4">
                <p className="text-sm text-gray-700">
                  <strong>💡 スマホ申告も可能:</strong> マイナンバーカード読み取り対応スマートフォンがあれば、スマホだけで確定申告が完結します。
                </p>
              </div>
            </div>
          </section>

          {/* 注意点 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              確定申告の注意点
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
                <p className="font-bold text-gray-900 mb-3">⚠️ これだけは気をつけて！</p>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold">1. 提出期限を守る</p>
                    <p className="text-sm text-gray-600">
                      確定申告の期限は翌年3月15日まで。期限を過ぎると延滞税がかかる場合があります。
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">2. 寄付金受領証明書は原本が必要（郵送・窓口の場合）</p>
                    <p className="text-sm text-gray-600">
                      コピーは認められません。e-Taxの場合は画像データでOKですが、原本は5年間保管してください。
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">3. ワンストップ特例との併用はできない</p>
                    <p className="text-sm text-gray-600">
                      ワンストップ特例を申請していても、確定申告をするとそちらが優先されます。確定申告では全ての寄付を記載してください。
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">4. 還付金の振込先を間違えない</p>
                    <p className="text-sm text-gray-600">
                      本人名義の口座を指定してください。家族名義の口座は指定できません。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 よくある間違い:</strong> 寄付金額から2,000円を引いた金額を記入してしまう方がいますが、
                  <strong>寄付金額はそのまま</strong>記入してください。控除額の計算は自動で行われます。
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
                ふるさと納税をもっと簡単に、ふるそなで！
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
                  Q. 確定申告とワンストップ特例、どちらがお得？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 控除額は同じなので、どちらでもお得度は変わりません。ただし、ワンストップ特例は住民税のみから控除されるのに対し、確定申告は所得税と住民税の両方から控除されます。手続きの簡単さではワンストップ特例が有利です。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 寄付金受領証明書を紛失した場合は？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 寄付した自治体に連絡すれば、再発行してもらえます。ただし、再発行には時間がかかる場合があるので、早めに依頼しましょう。確定申告の期限に間に合わない場合は、まず期限内に申告し、後日証明書を提出する方法もあります。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 医療費控除とふるさと納税は同時に申告できる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. はい、同時に申告できます。1つの確定申告書に、医療費控除とふるさと納税の寄付金控除の両方を記入してください。両方の控除を受けることで、さらに税金の還付が増える可能性があります。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. e-Taxで提出した後、書類の郵送は必要？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. e-Taxで提出した場合、寄付金受領証明書などの添付書類の送付は不要です。ただし、税務署から提出を求められた場合に備えて、原本は5年間保管してください。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 確定申告を忘れた場合、後から申告できる？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. はい、期限後でも「還付申告」として5年間は申告できます。ただし、早めに申告した方が還付も早く受けられるので、気づいたらすぐに申告することをおすすめします。
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
                href="/article/furusato-onestop"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税ワンストップ特例制度とは【2025年版】
                </p>
                <p className="text-sm text-gray-500">確定申告不要で控除を受ける方法</p>
              </Link>

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
                <p className="text-sm text-gray-500">よくあるミスと対策</p>
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
