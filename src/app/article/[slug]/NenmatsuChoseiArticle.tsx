'use client';

import React from 'react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export default function NenmatsuChoseiArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* タイトルと更新日 */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ふるさと納税は年末調整できる？【2025年版】確定申告との違いを徹底解説
          </h1>
          <p className="text-sm text-gray-600">更新日: 2025年11月17日</p>
        </header>

        {/* 導入文 */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <p className="mb-4 text-gray-800">
            <strong>「ふるさと納税は年末調整でできる？」</strong>という疑問をお持ちの方は多いでしょう。
            結論から言うと、<strong className="text-red-600">ふるさと納税は年末調整ではできません</strong>。
          </p>
          <p className="text-gray-800">
            この記事では、なぜ年末調整ではできないのか、どんな手続きが必要なのか、
            ワンストップ特例制度と確定申告の違いまで詳しく解説します。
          </p>
        </div>

        {/* 広告 */}
        <AdBanner />

        {/* 目次 */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
          <ol className="space-y-2 text-gray-700">
            <li><a href="#nenmatsu-chosei-dekinai" className="text-primary-600 hover:underline">1. ふるさと納税は年末調整できない理由</a></li>
            <li><a href="#nenmatsu-chosei-towa" className="text-primary-600 hover:underline">2. 年末調整とは？</a></li>
            <li><a href="#furusato-tetsuduki" className="text-primary-600 hover:underline">3. ふるさと納税の控除手続き2つの方法</a></li>
            <li><a href="#onestop-vs-kakutei" className="text-primary-600 hover:underline">4. ワンストップ特例 vs 確定申告</a></li>
            <li><a href="#kaisha-tetsuduki" className="text-primary-600 hover:underline">5. 会社員が行うべき手続き</a></li>
            <li><a href="#nenmatsu-chosei-kanren" className="text-primary-600 hover:underline">6. 年末調整に関連する注意点</a></li>
            <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
          </ol>
        </nav>

        {/* セクション1: ふるさと納税は年末調整できない理由 */}
        <section id="nenmatsu-chosei-dekinai" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            ふるさと納税は年末調整できない理由
          </h2>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              ふるさと納税が年末調整でできない理由は、<strong>年末調整の対象となる控除項目に「寄附金控除」が含まれていない</strong>からです。
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>重要</strong><br />
                年末調整で対応できるのは、会社が把握できる控除のみです。
                ふるさと納税（寄附金控除）は個人が自治体に寄付するため、会社では把握できません。
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">年末調整で対応できる控除</h3>
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>生命保険料控除</strong> - 生命保険、介護医療保険、個人年金保険</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>地震保険料控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>社会保険料控除</strong> - 国民年金、国民健康保険など</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>小規模企業共済等掛金控除</strong> - iDeCo、小規模企業共済など</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>配偶者控除・配偶者特別控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>扶養控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>障害者控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>寡婦（寡夫）控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>勤労学生控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span><strong>基礎控除</strong></span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">年末調整で対応できない控除（確定申告が必要）</h3>
            <div className="bg-white p-6 rounded-lg border-2 border-red-200 mb-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">✗</span>
                  <span><strong>寄附金控除</strong> - ふるさと納税、特定寄附金など</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">✗</span>
                  <span><strong>医療費控除</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">✗</span>
                  <span><strong>雑損控除</strong> - 災害や盗難による損失</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">✗</span>
                  <span><strong>住宅ローン控除（初年度のみ）</strong> - 2年目以降は年末調整可</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* セクション2: 年末調整とは？ */}
        <section id="nenmatsu-chosei-towa" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            年末調整とは？
          </h2>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              <strong>年末調整</strong>とは、会社が従業員の代わりに1年間の所得税を精算する手続きです。
              毎月の給与から天引きされている所得税は概算のため、年末に正確な税額を計算し直します。
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">年末調整の流れ</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">11月頃: 書類提出</h4>
                    <p className="text-sm text-gray-700">
                      会社から配布される「給与所得者の保険料控除申告書」「給与所得者の基礎控除申告書」などに記入し、
                      生命保険料控除証明書などの必要書類を添付して提出
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">12月: 年末調整の計算</h4>
                    <p className="text-sm text-gray-700">
                      会社が提出された書類をもとに、1年間の所得税を正確に計算
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">12月または1月: 還付または徴収</h4>
                    <p className="text-sm text-gray-700">
                      払いすぎていた税金は還付され、不足していた場合は追加で徴収される
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-gray-700">
                💡 <strong>ポイント</strong><br />
                年末調整は会社が行う手続きなので、従業員は書類を提出するだけでOKです。
                確定申告のように税務署に行く必要はありません。
              </p>
            </div>
          </div>
        </section>

        {/* セクション3: ふるさと納税の控除手続き2つの方法 */}
        <section id="furusato-tetsuduki" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            ふるさと納税の控除手続き2つの方法
          </h2>

          <p className="text-gray-700 mb-6">
            ふるさと納税の控除を受けるには、<strong>2つの方法</strong>があります。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* ワンストップ特例制度 */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">📄</span>
                方法1: ワンストップ特例制度
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                <strong className="text-green-600">確定申告不要</strong>で控除を受けられる簡単な方法
              </p>

              <h4 className="font-bold text-gray-900 mb-2">利用条件</h4>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>✓ 確定申告をする必要がない給与所得者（会社員・公務員）</li>
                <li>✓ 1年間の寄付先が<strong>5自治体以内</strong></li>
                <li>✓ 申請書を<strong>翌年1月10日まで</strong>に提出</li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-2">手続き</h4>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. 寄付時に「ワンストップ特例申請書を希望」にチェック</li>
                <li>2. 自治体から送られてくる申請書に記入</li>
                <li>3. 本人確認書類を添付して郵送</li>
              </ol>
            </div>

            {/* 確定申告 */}
            <div className="bg-white p-6 rounded-lg border-2 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                方法2: 確定申告
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                <strong className="text-orange-600">6自治体以上</strong>に寄付した場合や、
                他の控除も受ける場合はこちら
              </p>

              <h4 className="font-bold text-gray-900 mb-2">こんな人は確定申告が必要</h4>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>✓ 6自治体以上に寄付した</li>
                <li>✓ 医療費控除を受ける</li>
                <li>✓ 住宅ローン控除（初年度）</li>
                <li>✓ 副業収入が20万円以上</li>
                <li>✓ 個人事業主・フリーランス</li>
              </ul>

              <h4 className="font-bold text-gray-900 mb-2">手続き</h4>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. 寄附金受領証明書を保管</li>
                <li>2. 翌年2月16日〜3月15日に確定申告</li>
                <li>3. 寄附金控除の欄に記入して提出</li>
              </ol>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>注意</strong><br />
              ワンストップ特例と確定申告を併用することはできません。
              確定申告をした場合、ワンストップ特例申請は<strong>全て無効</strong>になります。
            </p>
          </div>
        </section>

        {/* セクション4: ワンストップ特例 vs 確定申告 */}
        <section id="onestop-vs-kakutei" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            ワンストップ特例 vs 確定申告
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">項目</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">ワンストップ特例</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">確定申告</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">対象者</td>
                  <td className="border border-gray-300 px-4 py-2">給与所得者のみ</td>
                  <td className="border border-gray-300 px-4 py-2">全員</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">寄付先の制限</td>
                  <td className="border border-gray-300 px-4 py-2">5自治体まで</td>
                  <td className="border border-gray-300 px-4 py-2">制限なし</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">申請時期</td>
                  <td className="border border-gray-300 px-4 py-2">寄付ごと（翌年1月10日まで）</td>
                  <td className="border border-gray-300 px-4 py-2">翌年2月16日〜3月15日</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">控除方法</td>
                  <td className="border border-gray-300 px-4 py-2">住民税のみから控除</td>
                  <td className="border border-gray-300 px-4 py-2">所得税+住民税から控除</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">控除額</td>
                  <td className="border border-gray-300 px-4 py-2">同じ</td>
                  <td className="border border-gray-300 px-4 py-2">同じ</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">手間</td>
                  <td className="border border-gray-300 px-4 py-2">簡単（申請書を郵送するだけ）</td>
                  <td className="border border-gray-300 px-4 py-2">やや複雑（確定申告書の作成が必要）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">おすすめの人</td>
                  <td className="border border-gray-300 px-4 py-2">会社員で他の控除がない人</td>
                  <td className="border border-gray-300 px-4 py-2">6自治体以上、医療費控除等がある人</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">どちらを選ぶべき？</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong className="text-green-600">ワンストップ特例がおすすめ:</strong>
                会社員で、5自治体以内に寄付し、他に確定申告する理由がない場合
              </p>
              <p>
                <strong className="text-orange-600">確定申告がおすすめ:</strong>
                6自治体以上に寄付、医療費控除・住宅ローン控除などを受ける場合
              </p>
            </div>
          </div>
        </section>

        {/* セクション5: 会社員が行うべき手続き */}
        <section id="kaisha-tetsuduki" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            会社員が行うべき手続き
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">年間スケジュール</h3>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900 mb-2">11月</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>年末調整の書類を会社に提出</strong>（生命保険料控除など）</li>
                <li>• ふるさと納税の年間寄付額を確認</li>
                <li>• 限度額に余裕があれば追加で寄付</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 mb-2">12月</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>12月31日までにふるさと納税を完了</strong></li>
                <li>• ワンストップ申請書の到着を確認</li>
                <li>• 寄附金受領証明書の保管（確定申告する場合）</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-gray-900 mb-2">翌年1月</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>1月10日までにワンストップ申請書を郵送</strong>（必着）</li>
                <li>• 本人確認書類を添付</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-900 mb-2">翌年2〜3月（確定申告する場合）</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 2月16日〜3月15日に確定申告</li>
                <li>• 寄附金受領証明書を添付</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-bold text-gray-900 mb-2">翌年6月</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>住民税決定通知書で控除額を確認</strong></li>
                <li>• 「寄附金税額控除」の欄をチェック</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>重要ポイント</strong><br />
              年末調整とふるさと納税の手続きは<strong>別々</strong>です。
              年末調整の書類にふるさと納税の情報を記入する必要はありません。
            </p>
          </div>
        </section>

        {/* セクション6: 年末調整に関連する注意点 */}
        <section id="nenmatsu-chosei-kanren" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            年末調整に関連する注意点
          </h2>

          <div className="space-y-6">
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">注意点1: 年末調整後に確定申告すると還付が受けられる</h3>
              <p className="text-sm text-gray-700 mb-2">
                年末調整が終わった後でも、確定申告をすれば追加の控除（医療費控除、ふるさと納税など）を受けられます。
              </p>
              <p className="text-sm text-gray-700">
                <strong>例:</strong> 年末調整で生命保険料控除を受けた後、2〜3月に確定申告でふるさと納税の控除を追加で受けることが可能です。
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">注意点2: 住宅ローン控除（2年目以降）は年末調整で可能</h3>
              <p className="text-sm text-gray-700 mb-2">
                住宅ローン控除は初年度のみ確定申告が必要ですが、<strong>2年目以降は年末調整で対応できます</strong>。
              </p>
              <p className="text-sm text-gray-700">
                税務署から送られてくる「住宅借入金等特別控除申告書」を年末調整の書類と一緒に会社に提出すればOKです。
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">注意点3: 年末調整で申告し忘れた控除は確定申告で対応</h3>
              <p className="text-sm text-gray-700 mb-2">
                生命保険料控除や地震保険料控除を年末調整で申告し忘れた場合でも、確定申告で対応できます。
              </p>
              <p className="text-sm text-gray-700">
                年末調整のやり直しを会社に依頼することもできますが、自分で確定申告する方が簡単な場合もあります。
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">注意点4: 限度額計算には年末調整後の源泉徴収票を使う</h3>
              <p className="text-sm text-gray-700 mb-2">
                ふるさと納税の限度額を正確に計算するには、<strong>年末調整後の源泉徴収票</strong>を使いましょう。
              </p>
              <p className="text-sm text-gray-700">
                源泉徴収票は12月または翌年1月に会社から配布されます。
                この源泉徴収票に記載された「給与所得控除後の金額」「所得控除の額の合計額」を使って限度額を計算します。
              </p>
            </div>
          </div>
        </section>

        {/* あなたのふるさと納税AIPR */}
        <div className="mb-12 p-8 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <Link href="/" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
              <span className="text-2xl font-bold text-primary-600">あなたのふるさと納税AI</span>
            </Link>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              ふるさと納税の手続き、もう迷わない
            </h3>
            <p className="text-gray-700 mb-6">
              あなたのふるさと納税AIなら、限度額計算から返礼品選び、期限管理まで全てサポート。
              ワンストップ特例の期限も自動でリマインドします。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">限度額シミュレーション</h4>
              <p className="text-sm text-gray-700">
                年収と家族構成を入力するだけで正確な限度額を計算
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
              <p className="text-sm text-gray-700">
                あなたの好みに合わせて最適な返礼品をAIが自動提案
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📧</div>
              <h4 className="font-bold text-gray-900 mb-2">期限リマインダー</h4>
              <p className="text-sm text-gray-700">
                ワンストップ申請の期限（1月10日）をメールで通知
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              無料で始める →
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              完全無料 | クレジットカード登録不要 | 登録後すぐに利用開始
            </p>
          </div>
        </div>

        {/* よくある質問 */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            よくある質問
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q1: ふるさと納税は年末調整でできますか？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> いいえ、できません。ふるさと納税（寄附金控除）は年末調整の対象外です。
                ワンストップ特例制度または確定申告で控除を受ける必要があります。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q2: 年末調整の書類にふるさと納税のことを書く必要はありますか？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> いいえ、必要ありません。年末調整とふるさと納税の手続きは別々です。
                年末調整の書類には生命保険料控除などを記入し、ふるさと納税は別途ワンストップ申請または確定申告で対応します。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q3: ワンストップ特例を使えば会社にバレない？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> はい、ワンストップ特例を使えば会社に知られることはありません。
                ワンストップ特例は自治体と税務署のやり取りで完結し、会社を経由しないためです。
                確定申告の場合も、会社には通知されません。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q4: 年末調整後に確定申告してもいいですか？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> はい、問題ありません。年末調整を受けた後でも、医療費控除やふるさと納税などの追加控除を受けるために確定申告することができます。
                年末調整で受けた控除は確定申告書に自動で反映されます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q5: ワンストップ申請の期限（1月10日）を過ぎたらどうなる？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> 期限を過ぎた場合、ワンストップ特例は使えませんが、確定申告（3月15日まで）で対応できます。
                確定申告をすれば、ふるさと納税の控除を受けることができます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q6: 住宅ローン控除とふるさと納税は併用できますか？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> はい、併用できます。ただし、住宅ローン控除が大きい場合、ふるさと納税の控除可能額が減る場合があります。
                正確な限度額は、住宅ローン控除を考慮して計算する必要があります。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Q7: あなたのふるさと納税AIを使うメリットは？</h3>
              <p className="text-gray-700">
                <strong>A:</strong> あなたのふるさと納税AIは限度額の自動計算、AIによる返礼品推薦、ワンストップ申請期限のリマインダー機能など、
                ふるさと納税を簡単に、確実に活用できるサービスです。無料で使えるので、ぜひお試しください。
              </p>
            </div>
          </div>
        </section>

        {/* まとめ */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">まとめ</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span>ふるさと納税は<strong>年末調整ではできません</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span>控除を受けるには<strong>ワンストップ特例制度</strong>または<strong>確定申告</strong>が必要</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span>会社員で5自治体以内なら<strong>ワンストップ特例が簡単</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span>6自治体以上や医療費控除などがある場合は<strong>確定申告</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span>年末調整とふるさと納税の手続きは<strong>別々</strong>に行う</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">✓</span>
              <span><strong>あなたのふるさと納税AI</strong>なら期限管理や限度額計算が自動でできて安心</span>
            </li>
          </ul>
        </section>

        {/* 広告 */}
        <AdBanner />

        {/* 関連記事 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-300">
            関連記事
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/article/furusato-onestop-tokureiseido" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">ワンストップ特例制度とは？</h3>
              <p className="text-sm text-gray-600">確定申告不要で税金控除を受けられるワンストップ特例制度の申請方法を詳しく解説</p>
            </Link>
            <Link href="/article/furusato-kakuteishinkoku" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">確定申告のやり方</h3>
              <p className="text-sm text-gray-600">ふるさと納税の確定申告方法を初心者にもわかりやすく解説</p>
            </Link>
            <Link href="/article/furusato-gendogaku-simulation" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">限度額シミュレーション</h3>
              <p className="text-sm text-gray-600">年収と家族構成を入力するだけで限度額を自動計算</p>
            </Link>
            <Link href="/article/furusato-schedule-kigen" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">期限とスケジュール</h3>
              <p className="text-sm text-gray-600">ふるさと納税の重要な期限を月別に整理</p>
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
