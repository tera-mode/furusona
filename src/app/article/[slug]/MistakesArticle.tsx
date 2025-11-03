'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function MistakesArticle() {
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
            ふるさと納税で失敗しない方法と注意点【2025年版】よくあるミスと対策
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            2025年最新版 | 更新日: 2025年11月4日
          </p>

          {/* 導入文 */}
          <div className="mb-8 leading-relaxed text-gray-700">
            <p className="mb-4">
              「ふるさと納税をしたのに控除が受けられなかった…」そんな失敗をしないために、
              この記事では、ふるさと納税でよくある5つの失敗とその対策を詳しく解説します。
            </p>
            <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <strong>この記事でわかること:</strong> ふるさと納税の代表的な失敗事例と、失敗を防ぐためのチェックリスト、トラブル発生時の対処法をすべて網羅しています。
            </p>
          </div>

          {/* よくある失敗の概要 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              ふるさと納税でよくある5つの失敗
            </h2>
            <div className="bg-red-50 rounded-lg p-5 mb-6 border-l-4 border-red-500">
              <p className="text-gray-700 mb-3">
                ふるさと納税で失敗すると、<strong>控除が受けられず全額自己負担</strong>になってしまうことも。
                以下の5つの失敗パターンを知って、確実に節税効果を得ましょう。
              </p>
            </div>
          </section>

          {/* 失敗1: 限度額オーバー */}
          <section className="mb-10">
            <div className="bg-white rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full mr-3">失敗 1</span>
                <h3 className="text-xl font-bold text-gray-900">限度額オーバー</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  <strong className="text-red-600">最も多い失敗:</strong> 控除上限額を超えて寄付してしまい、超えた分が全額自己負担になってしまうケース。
                </p>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="font-semibold text-gray-900 mb-2">失敗例</p>
                  <p className="text-sm text-gray-700">
                    年収500万円（独身）のAさんは、限度額が約61,000円なのに、80,000円分の寄付をしてしまった。
                    結果、19,000円+2,000円=21,000円が自己負担に。
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-3">✅ 対策</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">1.</span>
                    <span><strong>事前に限度額を正確に計算する</strong> - シミュレーターを使って、年収・家族構成・各種控除を考慮して計算</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">2.</span>
                    <span><strong>余裕を持った金額設定</strong> - 限度額ギリギリではなく、90%程度に抑えると安心</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">3.</span>
                    <span><strong>年末に収入が確定してから追加寄付</strong> - ボーナスの変動なども考慮して調整</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">4.</span>
                    <span><strong>医療費控除など他の控除を考慮</strong> - 他の控除があると限度額が下がることに注意</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <Link
                  href="/article/furusato-gendogaku-simulation"
                  className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  限度額シミュレーターで計算 →
                </Link>
              </div>
            </div>
          </section>

          {/* 失敗2: 申請書の提出忘れ */}
          <section className="mb-10">
            <div className="bg-white rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full mr-3">失敗 2</span>
                <h3 className="text-xl font-bold text-gray-900">ワンストップ特例申請書の提出忘れ</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  <strong className="text-red-600">見落としがち:</strong> 寄付をしただけで満足してしまい、控除に必要な申請書を提出し忘れてしまうケース。
                </p>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="font-semibold text-gray-900 mb-2">失敗例</p>
                  <p className="text-sm text-gray-700">
                    Bさんは3つの自治体に寄付したが、ワンストップ特例申請書の提出を忘れていた。
                    確定申告もしなかったため、控除を一切受けられず全額自己負担に。
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-3">✅ 対策</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">1.</span>
                    <span><strong>寄付後すぐに申請書を提出</strong> - 自治体から申請書が届いたら、必要事項を記入してすぐに返送</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">2.</span>
                    <span><strong>提出期限を確認</strong> - ワンストップ特例は翌年1月10日必着、確定申告は3月15日まで</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">3.</span>
                    <span><strong>申請状況を管理</strong> - どの自治体に申請書を提出したか、スプレッドシートなどで管理</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">4.</span>
                    <span><strong>提出忘れに気づいたら確定申告</strong> - ワンストップの期限を過ぎても、確定申告で対応可能</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 オンライン申請がおすすめ:</strong> 自治体によっては、オンラインでワンストップ特例申請ができるところも。
                  郵送の手間がなく、提出状況も確認しやすいのでおすすめです。
                </p>
              </div>
            </div>
          </section>

          {/* 失敗3: 本人名義以外での申し込み */}
          <section className="mb-10">
            <div className="bg-white rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full mr-3">失敗 3</span>
                <h3 className="text-xl font-bold text-gray-900">本人名義以外での申し込み</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  <strong className="text-red-600">意外と多い:</strong> 家族のクレジットカードで寄付したり、配偶者名義で申し込んでしまい、控除が受けられないケース。
                </p>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="font-semibold text-gray-900 mb-2">失敗例</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>ケース1:</strong> 妻のCさんが、夫のクレジットカードでふるさと納税を申し込んだ。
                    寄付者が夫の名前になってしまい、妻の税金からは控除されなかった。
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>ケース2:</strong> 夫が妻名義でふるさと納税をして、夫が確定申告したが控除が認められなかった。
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-3">✅ 対策</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">1.</span>
                    <span><strong>必ず本人名義で申し込む</strong> - 寄付者名、クレジットカード、銀行口座、すべて本人名義に統一</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">2.</span>
                    <span><strong>家族カードに注意</strong> - 家族カードの場合、本会員の名前で申し込まれることがあるので注意</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">3.</span>
                    <span><strong>申込前に名義を確認</strong> - 寄付申込画面で、寄付者名が本人になっているか必ず確認</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">4.</span>
                    <span><strong>夫婦でそれぞれ申し込む</strong> - 夫婦それぞれが自分の限度額内で寄付すれば、世帯全体でお得に</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ 重要:</strong> 控除を受けるのは「税金を納めている本人」だけ。
                  専業主婦（主夫）や扶養内で働いている方は、所得税・住民税を納めていないため、控除の対象外です。
                </p>
              </div>
            </div>
          </section>

          {/* 失敗4: 年末ギリギリの申込み */}
          <section className="mb-10">
            <div className="bg-white rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full mr-3">失敗 4</span>
                <h3 className="text-xl font-bold text-gray-900">年末ギリギリの申込み</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  <strong className="text-red-600">タイミングミス:</strong> 12月31日までに寄付が完了しないと、その年の控除対象にならないため、年末ギリギリの申込みは危険。
                </p>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="font-semibold text-gray-900 mb-2">失敗例</p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>ケース1:</strong> Dさんは12月30日にクレジットカードで申し込んだが、
                    決済処理が年明けになってしまい、翌年の寄付扱いに。
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>ケース2:</strong> Eさんは12月28日に銀行振込で申し込んだが、年末年始で振込処理が遅れ、
                    入金が1月になってしまった。
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-3">✅ 対策</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">1.</span>
                    <span><strong>11月中旬までに申し込む</strong> - 余裕を持って申し込めば、年内の寄付が確実</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">2.</span>
                    <span><strong>支払い方法に注意</strong> - クレジットカードは決済日、銀行振込は入金日が基準になる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">3.</span>
                    <span><strong>自治体の受付状況を確認</strong> - 年末は混雑するため、12月20日頃から受付を締め切る自治体も</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">4.</span>
                    <span><strong>人気返礼品は早めに</strong> - 年末は在庫切れになる返礼品が増えるので、計画的に申し込む</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 寄付のタイミング:</strong> 年収が確定する11月〜12月初旬が理想的。
                  それより前に申し込む場合は、限度額に余裕を持たせておきましょう。
                </p>
              </div>
            </div>
          </section>

          {/* 失敗5: 住所変更の届け出忘れ */}
          <section className="mb-10">
            <div className="bg-white rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full mr-3">失敗 5</span>
                <h3 className="text-xl font-bold text-gray-900">住所変更の届け出忘れ</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  <strong className="text-red-600">引っ越しに注意:</strong> ワンストップ特例申請後に引っ越した場合、変更届を出さないと控除が受けられなくなる。
                </p>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="font-semibold text-gray-900 mb-2">失敗例</p>
                  <p className="text-sm text-gray-700">
                    Fさんは11月にふるさと納税をしてワンストップ特例を申請。12月に引っ越したが、
                    変更届を出すのを忘れてしまい、新住所の自治体に控除情報が伝わらず、控除が受けられなかった。
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                <p className="font-bold text-gray-900 mb-3">✅ 対策</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">1.</span>
                    <span><strong>引っ越したら即座に変更届を提出</strong> - 翌年1月10日までに、寄付した全自治体に「申請事項変更届出書」を提出</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">2.</span>
                    <span><strong>変更届の入手方法</strong> - 各自治体のホームページからダウンロードできる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">3.</span>
                    <span><strong>引っ越し予定があるなら確定申告を選択</strong> - 確定申告なら住所変更の届出が不要</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">4.</span>
                    <span><strong>マイナンバーも確認</strong> - 氏名や個人番号が変わった場合も変更届が必要</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ 注意:</strong> 変更届の提出期限も翌年1月10日必着です。
                  期限を過ぎた場合は、確定申告をすることで控除を受けられます。
                </p>
              </div>
            </div>
          </section>

          {/* 失敗を防ぐチェックリスト */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              失敗を防ぐチェックリスト
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-gray-700 mb-4">
                ふるさと納税をする際に、以下のチェックリストで確認しましょう。すべてチェックできれば安心です。
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-3">📋 申込み前のチェック</p>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">自分の控除上限額をシミュレーターで計算した</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">限度額の90%程度に抑えた金額で計画している</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">医療費控除など他の控除を考慮した</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">返礼品の在庫状況を確認した</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-3">🖊️ 申込み時のチェック</p>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">寄付者名が本人（自分）の名前になっている</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">クレジットカードまたは銀行口座が本人名義</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">住所・氏名・電話番号に誤りがない</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">寄付金額に間違いがない</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-3">📮 申込み後のチェック</p>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">寄付金受領証明書が届いた（大切に保管）</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">ワンストップ特例申請書を期限内に提出した</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">引っ越した場合は変更届を提出した</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">寄付した自治体と金額を記録している</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-3">📅 翌年のチェック</p>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">確定申告または住民税決定通知書で控除を確認した</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">所得税の還付金が振り込まれた（確定申告の場合）</span>
                    </label>
                    <label className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">6月以降の住民税が減額されている</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-700">
                  <strong>✅ すべてチェック済み:</strong> これで安心してふるさと納税の節税効果を受けられます！
                </p>
              </div>
            </div>
          </section>

          {/* トラブル発生時の対処法 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
              トラブル発生時の対処法
            </h2>
            <div className="space-y-5">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">📄 寄付金受領証明書を紛失した</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 寄付した自治体に連絡して再発行を依頼しましょう。
                    電話やメールで依頼できますが、再発行には1〜2週間かかる場合があります。
                  </p>
                  <p className="text-sm">
                    確定申告の期限に間に合わない場合は、まず期限内に申告し、
                    後日「更正の請求」で証明書を提出する方法もあります。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">📮 ワンストップ特例申請書の提出期限を過ぎた</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 翌年3月15日までに確定申告をすれば、控除を受けられます。
                    ワンストップ特例の期限（1月10日）を過ぎても諦めずに確定申告しましょう。
                  </p>
                  <p className="text-sm">
                    確定申告では、ワンストップ特例で申請した分も含め、
                    全ての寄付を記載してください。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">💳 家族名義で申し込んでしまった</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 残念ながら、名義変更はできません。
                    その寄付については控除を受けられないため、次回から本人名義で申し込むようにしましょう。
                  </p>
                  <p className="text-sm">
                    ただし、返礼品は受け取れますし、寄付自体は有効なので、
                    地域貢献としての意義はあります。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">🏠 引っ越し後に変更届を忘れた</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 1月10日の期限を過ぎた場合でも、3月15日までに確定申告をすれば控除を受けられます。
                    確定申告書には新住所を記載してください。
                  </p>
                  <p className="text-sm">
                    気づいた時点ですぐに確定申告の準備を始めましょう。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">❌ 控除が適用されていない</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 6月に届く「住民税決定通知書」を確認して、
                    控除額が反映されているかチェックしましょう。
                  </p>
                  <p className="text-sm">
                    もし反映されていない場合は、以下を確認：
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• ワンストップ特例申請書を提出したか</li>
                    <li>• 確定申告で寄付金控除を記載したか</li>
                    <li>• 住所変更があった場合、変更届を提出したか</li>
                  </ul>
                  <p className="text-sm">
                    問題が見つかったら、すぐに市区町村の税務課に相談しましょう。
                    場合によっては「更正の請求」で対応できます（5年以内）。
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-bold text-gray-900 mb-2">💰 限度額を超えて寄付してしまった</h3>
                <div className="text-gray-700 space-y-2">
                  <p className="text-sm">
                    <strong>対処法:</strong> 残念ながら、超えた分は全額自己負担になります。
                    寄付自体を取り消すことはできません。
                  </p>
                  <p className="text-sm">
                    ただし、返礼品は受け取れますし、地域貢献にはなるので、
                    完全に無駄というわけではありません。次回から限度額に注意しましょう。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-5 rounded border-l-4 border-blue-500">
              <p className="text-gray-700">
                <strong>💡 困ったときの相談先:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mt-3">
                <li>• <strong>ワンストップ特例について:</strong> 寄付した自治体のふるさと納税担当窓口</li>
                <li>• <strong>確定申告について:</strong> 最寄りの税務署（国税庁の税務相談室: 0570-00-5901）</li>
                <li>• <strong>住民税の控除について:</strong> お住まいの市区町村の税務課</li>
              </ul>
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
                失敗しないふるさと納税なら、ふるそなで！
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
                  Q. 限度額を少し超えてしまったら、どうなりますか？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 限度額を超えた分は全額自己負担になりますが、返礼品は通常通り受け取れます。
                  例えば、限度額が60,000円で65,000円寄付した場合、5,000円+2,000円=7,000円が自己負担となります。
                  節税効果は減りますが、寄付自体が無駄になるわけではありません。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 専業主婦でもふるさと納税はできますか？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 寄付自体はできますが、所得税・住民税を納めていない場合は控除を受けられません。
                  世帯主（配偶者）が寄付して控除を受ける場合は、必ず世帯主名義で申し込んでください。
                  専業主婦の方が自分名義で寄付しても、控除のメリットはありません。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. ワンストップ特例を申請したのに、確定申告もしてしまった場合は？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 確定申告をすると、ワンストップ特例の申請は自動的に無効になります。
                  確定申告の内容が優先されるので、確定申告書には必ず全ての寄付金を記載してください。
                  一部だけ記載すると、記載されなかった分は控除されません。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 年末の寄付で、決済日と入金日のどちらが基準？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. クレジットカード払いの場合は「決済日」、銀行振込の場合は「自治体の口座への入金日」が基準になります。
                  年末ギリギリに申し込む場合は、クレジットカード払いの方が確実です。
                  ただし、自治体によって基準が異なる場合があるので、事前に確認しましょう。
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Q. 控除が正しく適用されているか確認する方法は？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A. 翌年6月に届く「住民税決定通知書」の「税額控除額」の欄を確認してください。
                  「寄付金税額控除」または「ふるさと納税控除」といった項目に金額が記載されているはずです。
                  確定申告をした場合は、所得税の還付金も確認しましょう。不明な点があれば、市区町村の税務課に問い合わせてください。
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
                <p className="text-sm text-gray-500">正しい始め方を理解してミスを防ぐ</p>
              </Link>
              <Link
                href="/article/furusato-gendogaku-simulation"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税限度額シミュレーション【2025年最新】
                </p>
                <p className="text-sm text-gray-500">限度額オーバーを防ぐための正確な計算</p>
              </Link>
              <Link
                href="/article/furusato-onestop"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税ワンストップ特例制度とは？【2025年最新】
                </p>
                <p className="text-sm text-gray-500">申請書提出の正しい方法と期限</p>
              </Link>
              <Link
                href="/article/furusato-kakuteishinkoku"
                className="block p-5 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-sm transition-all"
              >
                <p className="font-bold text-gray-900 mb-1">
                  ふるさと納税の確定申告のやり方【2025年完全マニュアル】
                </p>
                <p className="text-sm text-gray-500">確定申告が必要な場合の正しい手続き</p>
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
