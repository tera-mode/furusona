'use client';

import React from 'react';
import Link from 'next/link';

export default function DailyGoodsArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ふるさと納税 日用品おすすめ30選【2025年版】物価高対策に人気急上昇中の実用返礼品
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月4日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          物価高が続く2025年、<strong>日用品のふるさと納税返礼品</strong>が注目されています。
          トイレットペーパーの需要は173%増、洗剤類も急上昇中です。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>実用性抜群の日用品おすすめ30選</strong>をカテゴリ別にご紹介。
          限度額の端数調整にも最適な返礼品が見つかります。
        </p>
      </div>

      {/* CTA1: 記事冒頭 */}
      <div className="mb-12 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 mb-2">
            🧻 AIで端数調整に最適な日用品を提案
          </p>
          <p className="text-sm text-gray-700 mb-4">
            限度額を無駄なく使い切る返礼品を自動計算
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ふるそなで無料診断 →
          </Link>
        </div>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#why-popular" className="text-primary-600 hover:underline">1. なぜ日用品が人気なのか</a></li>
          <li><a href="#toilet-paper" className="text-primary-600 hover:underline">2. トイレットペーパー・ティッシュ</a></li>
          <li><a href="#detergent" className="text-primary-600 hover:underline">3. 洗剤・柔軟剤</a></li>
          <li><a href="#kitchen" className="text-primary-600 hover:underline">4. キッチン用品</a></li>
          <li><a href="#bath" className="text-primary-600 hover:underline">5. バス・トイレ用品</a></li>
          <li><a href="#other" className="text-primary-600 hover:underline">6. その他おすすめ日用品</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: なぜ人気か */}
      <section id="why-popular" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          なぜ日用品が人気なのか
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由1: 物価高対策で実用性抜群
          </h3>
          <p className="text-gray-700 mb-4">
            2024〜2025年の物価高により、日用品の価格が軒並み上昇。
            特にトイレットペーパーやティッシュは<strong>173%増の需要</strong>となっています。
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>節約効果が大きい</strong><br />
              月に3,000円以上かかる日用品を、ふるさと納税で賄えば、
              年間36,000円以上の節約になります。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由2: 限度額の端数調整に最適
          </h3>
          <p className="text-gray-700 mb-4">
            日用品は<strong>2,000円〜15,000円</strong>と寄付額の幅が広く、
            限度額を無駄なく使い切るのに便利です。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">寄付額</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">返礼品例</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">2,000円</td>
                  <td className="border border-gray-300 px-4 py-3">ティッシュ60箱</td>
                  <td className="border border-gray-300 px-4 py-3">端数調整</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">5,000円</td>
                  <td className="border border-gray-300 px-4 py-3">トイレットペーパー48ロール</td>
                  <td className="border border-gray-300 px-4 py-3">端数調整</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">8,000円</td>
                  <td className="border border-gray-300 px-4 py-3">洗剤・柔軟剤セット</td>
                  <td className="border border-gray-300 px-4 py-3">メイン返礼品</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">12,000円</td>
                  <td className="border border-gray-300 px-4 py-3">トイレットペーパー96ロール</td>
                  <td className="border border-gray-300 px-4 py-3">メイン返礼品</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由3: 選択失敗のリスクがゼロ
          </h3>
          <p className="text-gray-700 mb-4">
            食品や嗜好品と違い、<strong>日用品は誰でも確実に消費</strong>します。
            「選んだけど好みじゃなかった」という失敗がありません。
          </p>
        </div>
      </section>

      {/* セクション2: トイレットペーパー・ティッシュ */}
      <section id="toilet-paper" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          トイレットペーパー・ティッシュ（人気No.1）
        </h2>

        <p className="text-gray-700 mb-6">
          最も需要が高い日用品。保管場所があれば、まとめ買いが断然お得です。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥇 1位: トイレットペーパー 96ロール（ダブル）</h3>
                <p className="text-sm text-gray-600 mt-1">4人家族で約3ヶ月分</p>
              </div>
              <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">12,000円</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              最も人気の大容量タイプ。4人家族で約3ヶ月分。ダブル派におすすめ。
            </p>
            <div className="bg-blue-50 p-3 rounded text-sm">
              <p className="text-gray-600">
                <strong>保管場所:</strong> 96ロールで約0.5畳分のスペースが必要
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥈 2位: トイレットペーパー 48ロール（シングル）</h3>
                <p className="text-sm text-gray-600 mt-1">一人暮らし・夫婦2人向け</p>
              </div>
              <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              少量で試したい方に。シングル派や保管場所が少ない方に最適。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥉 3位: ティッシュペーパー 60箱</h3>
                <p className="text-sm text-gray-600 mt-1">端数調整に最適</p>
              </div>
              <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">2,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              2,000円で60箱（5箱×12パック）。限度額の端数調整に便利。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">4位: トイレットペーパー 144ロール（超大容量）</h3>
                <p className="text-sm text-gray-600 mt-1">年間買いだめ派に</p>
              </div>
              <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">18,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              4人家族で約半年分。保管場所があれば最もコスパ良し。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">5位: ボックスティッシュ 120箱</h3>
                <p className="text-sm text-gray-600 mt-1">1年分まとめ買い</p>
              </div>
              <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              月10箱使う家庭で1年分。花粉症シーズンにも安心。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 洗剤・柔軟剤 */}
      <section id="detergent" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          洗剤・柔軟剤（実用性◎）
        </h2>

        <p className="text-gray-700 mb-6">
          毎日使う洗剤類も人気。詰め替え用なら長期保存も可能です。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥇 1位: 洗濯洗剤・柔軟剤セット（1年分）</h3>
                <p className="text-sm text-gray-600 mt-1">詰め替え用20袋</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">12,000円</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              洗剤10袋+柔軟剤10袋のセット。4人家族で約1年分。
            </p>
            <div className="bg-green-50 p-3 rounded text-sm">
              <p className="text-gray-600">
                <strong>人気ブランド:</strong> アタック、ボールド、ソフランなど
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥈 2位: 食器用洗剤セット（詰め替え用）</h3>
                <p className="text-sm text-gray-600 mt-1">詰め替え12袋</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              ジョイ、キュキュット等の人気ブランド。1年分まとめ買い。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥉 3位: お風呂・トイレ用洗剤セット</h3>
                <p className="text-sm text-gray-600 mt-1">バスマジックリン等</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">8,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              お風呂用、トイレ用、カビ取り剤など、掃除用洗剤の詰め合わせ。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">4位: ハンドソープ・ボディソープセット</h3>
                <p className="text-sm text-gray-600 mt-1">詰め替え10袋</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">7,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              ビオレ、キレイキレイ等。毎日使うものだから嬉しい。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">5位: 洗濯槽クリーナー 12個セット</h3>
                <p className="text-sm text-gray-600 mt-1">月1回使用で1年分</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              月1回の洗濯槽掃除に。カビ・ニオイ対策に必須。
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: キッチン用品 */}
      <section id="kitchen" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          キッチン用品
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥇 1位: サランラップ・アルミホイルセット</h3>
                <p className="text-sm text-gray-600 mt-1">各12本セット</p>
              </div>
              <span className="text-yellow-600 font-bold text-lg whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              毎日使うラップとアルミホイル。1年分まとめ買いで便利。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥈 2位: ジップロック各種セット</h3>
                <p className="text-sm text-gray-600 mt-1">フリーザーバッグ・スタンディングバッグ</p>
              </div>
              <span className="text-yellow-600 font-bold text-lg whitespace-nowrap ml-4">8,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              食材保存に欠かせない。様々なサイズの詰め合わせ。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥉 3位: キッチンペーパー 24ロール</h3>
                <p className="text-sm text-gray-600 mt-1">料理・掃除に万能</p>
              </div>
              <span className="text-yellow-600 font-bold text-lg whitespace-nowrap ml-4">6,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              油切りや拭き掃除に便利。吸水性抜群のスコッティ等。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">4位: ゴミ袋セット（各サイズ）</h3>
                <p className="text-sm text-gray-600 mt-1">45L、30L、20L各種</p>
              </div>
              <span className="text-yellow-600 font-bold text-lg whitespace-nowrap ml-4">7,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              自治体指定ゴミ袋やレジ袋タイプなど。地味に助かる。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">5位: 食器用スポンジ 100個</h3>
                <p className="text-sm text-gray-600 mt-1">2年分のストック</p>
              </div>
              <span className="text-yellow-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              月4個交換する家庭で2年分。スコッチブライト等の人気ブランド。
            </p>
          </div>
        </div>
      </section>

      {/* セクション5: バス・トイレ用品 */}
      <section id="bath" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          バス・トイレ用品
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥇 1位: 入浴剤セット（100包）</h3>
                <p className="text-sm text-gray-600 mt-1">バスクリン、きき湯等</p>
              </div>
              <span className="text-purple-600 font-bold text-lg whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              毎日のお風呂が楽しみに。様々な香りの詰め合わせ。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥈 2位: シャンプー・コンディショナーセット</h3>
                <p className="text-sm text-gray-600 mt-1">詰め替え用12袋</p>
              </div>
              <span className="text-purple-600 font-bold text-lg whitespace-nowrap ml-4">12,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              パンテーン、ラックス等の人気ブランド。1年分まとめ買い。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">🥉 3位: トイレ用消臭剤・芳香剤セット</h3>
                <p className="text-sm text-gray-600 mt-1">消臭力、ファブリーズ等</p>
              </div>
              <span className="text-purple-600 font-bold text-lg whitespace-nowrap ml-4">6,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              置き型・スプレー型の詰め合わせ。1年分のストック。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">4位: 歯ブラシ・歯磨き粉セット</h3>
                <p className="text-sm text-gray-600 mt-1">歯ブラシ30本+歯磨き粉12本</p>
              </div>
              <span className="text-purple-600 font-bold text-lg whitespace-nowrap ml-4">8,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              月1回歯ブラシ交換で2.5年分。家族全員分まとめ買い。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">5位: トイレ流せるクリーナー 96個</h3>
                <p className="text-sm text-gray-600 mt-1">トイレ掃除に便利</p>
              </div>
              <span className="text-purple-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              週2回使用で約1年分。掃除がラクになる。
            </p>
          </div>
        </div>
      </section>

      {/* セクション6: その他おすすめ */}
      <section id="other" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          その他おすすめ日用品
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">マスク 300枚（不織布）</h3>
                <p className="text-sm text-gray-600 mt-1">花粉症・風邪対策に</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">6,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              個包装で衛生的。家族4人で約2ヶ月分。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">ウェットティッシュ 100個</h3>
                <p className="text-sm text-gray-600 mt-1">除菌タイプ・ノンアルコールタイプ</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">8,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              小さなお子様がいる家庭に。常備しておくと安心。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">使い捨てカイロ 200個</h3>
                <p className="text-sm text-gray-600 mt-1">冬の必需品</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">7,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              貼るタイプ・貼らないタイプの詰め合わせ。冬に大活躍。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">電池セット（単3・単4各50本）</h3>
                <p className="text-sm text-gray-600 mt-1">リモコン等に必須</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              パナソニック等の大手ブランド。長期保存可能。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">保冷剤・保冷バッグセット</h3>
                <p className="text-sm text-gray-600 mt-1">夏のお買い物に</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">5,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              繰り返し使える保冷剤と保冷バッグ。エコで実用的。
            </p>
          </div>
        </div>
      </section>

      {/* CTA2: 記事中盤 */}
      <div className="mb-12 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200">
        <p className="text-center text-gray-800 mb-4">
          <strong>AIで限度額の端数を無駄なく使い切る</strong>
        </p>
        <div className="text-center">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ふるそなで最適化 →
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q1. 日用品は食品と比べて損？
            </h3>
            <p className="text-gray-700">
              A. いいえ、<strong>むしろ実用性では日用品が有利</strong>です。
              食品は好みがあり、消費期限もありますが、日用品は確実に消費でき、長期保存も可能です。
              還元率も30〜40%と食品と同等かそれ以上です。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q2. 保管場所が心配...
            </h3>
            <p className="text-gray-700">
              A. <strong>定期便タイプ</strong>を選びましょう。
              例えば「トイレットペーパー12ロール×8ヶ月」なら、毎月少量ずつ届くので保管場所を取りません。
              一人暮らしにも最適です。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q3. どのタイミングで申し込むべき？
            </h3>
            <p className="text-gray-700">
              A. 日用品は<strong>年間通して在庫が安定</strong>しています。
              限度額を計算した後、端数調整用として12月の駆け込み時期に活用するのがおすすめです。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q4. ブランドは選べる？
            </h3>
            <p className="text-gray-700">
              A. 多くの自治体では<strong>有名ブランドを指定</strong>しています。
              例えば「P&Gセット」「花王セット」など、メーカー名が明記されているので安心です。
              気になる方は返礼品ページで確認しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q5. 日用品だけでふるさと納税を完結できる？
            </h3>
            <p className="text-gray-700">
              A. はい、可能です。
              トイレットペーパー、洗剤、キッチン用品など、様々な寄付額の返礼品があるので、
              <strong>限度額の全額を日用品で使い切る</strong>こともできます。
              実用性重視の方におすすめです。
            </p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          まとめ：日用品は物価高対策の救世主
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            日用品を選ぶメリット
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span><strong>物価高対策</strong> - トイレットペーパー需要173%増</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span><strong>端数調整に最適</strong> - 2,000円〜15,000円と幅広い</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span><strong>失敗リスクゼロ</strong> - 誰でも確実に消費</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span><strong>長期保存可能</strong> - まとめ買いでお得</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span><strong>還元率30〜40%</strong> - コスパ抜群</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          2025年の物価高で、日用品のふるさと納税需要は過去最高です。
          実用性重視の方、限度額の端数調整をしたい方は、ぜひ日用品を検討してみてください。
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            🧻 <strong>ふるそなのAI機能</strong>なら、限度額の端数を自動計算し、
            最適な日用品を提案します。無駄なく使い切りましょう。
          </p>
        </div>
      </section>

      {/* CTA3: 記事末尾 */}
      <div className="mb-12 p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          AIで限度額を無駄なく使い切る
        </h3>
        <p className="mb-6">
          端数調整に最適な日用品を<br />
          自動で提案します
        </p>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg transition-colors text-lg"
        >
          今すぐ無料で始める →
        </Link>
      </div>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-300">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/article/furusato-kome-ranking"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税 米ランキング20選
            </h3>
            <p className="text-sm text-gray-600">
              コスパ最強・品種別・定期便おすすめ
            </p>
          </Link>
          <Link
            href="/article/furusato-gendogaku-simulation"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税限度額シミュレーション
            </h3>
            <p className="text-sm text-gray-600">
              年収・家族構成から正確な限度額を計算
            </p>
          </Link>
        </div>
      </section>

      {/* 情報源 */}
      <div className="mt-12 pt-6 border-t border-gray-300">
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
      </div>
    </article>
  );
}
