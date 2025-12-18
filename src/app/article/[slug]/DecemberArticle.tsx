'use client';

import React from 'react';
import Link from 'next/link';

export default function DecemberArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          【2025年12月】ふるさと納税の駆け込みに間に合う！期限・おすすめ返礼品・注意点
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月4日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg border-2 border-red-200">
        <p className="mb-4 text-gray-800 font-semibold">
          ⚠️ <strong>2025年のふるさと納税の期限は12月31日（決済完了分）まで！</strong>
        </p>
        <p className="text-gray-800">
          12月は年間検索ボリュームの50%以上が集中する最繁忙期です。
          この記事では、<strong>駆け込みでも間に合う返礼品選び</strong>と、
          失敗しないための3つの注意点を詳しく解説します。
        </p>
      </div>


      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#deadline" className="text-primary-600 hover:underline">1. 2025年の期限と締切時間</a></li>
          <li><a href="#attention" className="text-primary-600 hover:underline">2. 12月駆け込みの3つの注意点</a></li>
          <li><a href="#recommended" className="text-primary-600 hover:underline">3. 駆け込みにおすすめの返礼品</a></li>
          <li><a href="#quick-guide" className="text-primary-600 hover:underline">4. 最短で完了する5ステップ</a></li>
          <li><a href="#trouble" className="text-primary-600 hover:underline">5. トラブル対処法</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">6. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 期限 */}
      <section id="deadline" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          2025年の期限と締切時間
        </h2>

        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-3">
            📅 絶対に守るべき期限
          </h3>
          <p className="text-lg font-bold text-red-700 mb-2">
            2025年12月31日23:59までに<strong>決済完了</strong>
          </p>
          <p className="text-sm text-gray-700">
            ※ カード決済の場合、決済処理が完了した時点でカウントされます。
            申込だけでは認められないので注意！
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            サイト別の締切時間
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">サイト</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">締切時間</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">楽天ふるさと納税</td>
                  <td className="border border-gray-300 px-4 py-3">12/31 23:59</td>
                  <td className="border border-gray-300 px-4 py-3">決済完了が必須</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">ふるさとチョイス</td>
                  <td className="border border-gray-300 px-4 py-3">12/31 23:59</td>
                  <td className="border border-gray-300 px-4 py-3">混雑で遅延の可能性</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">さとふる</td>
                  <td className="border border-gray-300 px-4 py-3">12/31 23:59</td>
                  <td className="border border-gray-300 px-4 py-3">銀行振込は12/28まで推奨</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">ふるなび</td>
                  <td className="border border-gray-300 px-4 py-3">12/31 23:59</td>
                  <td className="border border-gray-300 px-4 py-3">在庫切れが早い</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 <strong>推奨：12月28日までに完了</strong><br />
            年末は注文が集中し、サーバー遅延や在庫切れのリスクが高まります。
            余裕を持って12月28日までの完了を強くおすすめします。
          </p>
        </div>
      </section>

      {/* セクション2: 注意点 */}
      <section id="attention" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          12月駆け込みの3つの注意点
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-red-200">
            <div className="flex items-start mb-3">
              <span className="text-3xl mr-3">⚠️</span>
              <h3 className="text-xl font-bold text-gray-900">
                注意点1: サーバー混雑による遅延
              </h3>
            </div>
            <p className="text-gray-700 mb-3">
              12月30〜31日は注文が集中し、サイトが重くなります。
              決済処理に時間がかかり、23:59に間に合わないリスクがあります。
            </p>
            <div className="bg-red-50 p-4 rounded">
              <p className="text-sm font-semibold text-red-700 mb-2">対策:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 12月28日までに完了する</li>
                <li>• 時間帯は午前中や深夜を狙う（昼・夕方は混雑）</li>
                <li>• 決済方法はクレジットカードを選択（銀行振込は時間がかかる）</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-yellow-200">
            <div className="flex items-start mb-3">
              <span className="text-3xl mr-3">📦</span>
              <h3 className="text-xl font-bold text-gray-900">
                注意点2: 人気返礼品の在庫切れ
              </h3>
            </div>
            <p className="text-gray-700 mb-3">
              12月は年間最大の注文月。
              人気の肉・海鮮・家電などは12月中旬には在庫切れになることも。
            </p>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-sm font-semibold text-yellow-700 mb-2">対策:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 第一希望が売り切れても焦らない（代替品を用意）</li>
                <li>• 米・日用品など定番品は在庫が豊富</li>
                <li>• AIで複数の候補を提案してもらう</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-start mb-3">
              <span className="text-3xl mr-3">📄</span>
              <h3 className="text-xl font-bold text-gray-900">
                注意点3: ワンストップ申請書の提出期限
              </h3>
            </div>
            <p className="text-gray-700 mb-3">
              12月31日に寄付しても、ワンストップ申請書の提出期限は<strong>翌年1月10日（必着）</strong>です。
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-semibold text-blue-700 mb-2">対策:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 寄付後すぐに申請書をダウンロード</li>
                <li>• オンライン申請（IAM等）を活用</li>
                <li>• 6自治体以上の場合は確定申告を検討</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: おすすめ返礼品 */}
      <section id="recommended" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          駆け込みにおすすめの返礼品
        </h2>

        <p className="text-gray-700 mb-6">
          12月でも在庫が豊富で、すぐに申し込める返礼品をカテゴリ別にご紹介します。
        </p>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🍚 1位: 米（在庫◎・実用性◎）
            </h3>
            <p className="text-gray-700 mb-3">
              定番中の定番。価格高騰の影響で2024年は173%増の需要。
              12月でも在庫が豊富で、選びやすいのが魅力です。
            </p>
            <div className="bg-white p-4 rounded border border-orange-200 text-sm">
              <p className="font-semibold text-gray-800 mb-2">おすすめ寄付額:</p>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• 10,000円: 米10kg</li>
                <li>• 15,000円: 米15kg</li>
                <li>• 20,000円: 米20kg（定期便も人気）</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🧻 2位: 日用品（物価高対策・端数調整に最適）
            </h3>
            <p className="text-gray-700 mb-3">
              トイレットペーパー、ティッシュ、洗剤など。
              実用性が高く、端数調整にも便利です。
            </p>
            <div className="bg-white p-4 rounded border border-blue-200 text-sm">
              <p className="font-semibold text-gray-800 mb-2">人気商品:</p>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• 5,000円: トイレットペーパー96ロール</li>
                <li>• 8,000円: 洗剤・柔軟剤セット</li>
                <li>• 12,000円: 日用品詰め合わせ</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🥩 3位: 肉（冷凍で長期保存可能）
            </h3>
            <p className="text-gray-700 mb-3">
              冷凍で届くため、長期保存が可能。
              小分けタイプなら一人暮らしでも使いやすい。
            </p>
            <div className="bg-white p-4 rounded border border-green-200 text-sm">
              <p className="font-semibold text-gray-800 mb-2">おすすめ:</p>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• 10,000円: 豚肉1.5kg（小分けパック）</li>
                <li>• 15,000円: 鶏肉2kg</li>
                <li>• 20,000円: 牛肉・豚肉セット</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🛡️ 4位: 防災グッズ（新トレンド・2.7倍増）
            </h3>
            <p className="text-gray-700 mb-3">
              2024年の能登半島地震の影響で需要急増。
              備蓄品として実用性が高い。
            </p>
            <div className="bg-white p-4 rounded border border-purple-200 text-sm">
              <p className="font-semibold text-gray-800 mb-2">人気商品:</p>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• 10,000円: 防災セット（水・食料）</li>
                <li>• 15,000円: 非常用トイレ・ライト</li>
                <li>• 20,000円: 総合防災セット</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🍊 5位: フルーツ（少額で端数調整）
            </h3>
            <p className="text-gray-700 mb-3">
              2,000円〜5,000円の少額返礼品が豊富。
              限度額の端数調整に最適です。
            </p>
            <div className="bg-white p-4 rounded border border-yellow-200 text-sm">
              <p className="font-semibold text-gray-800 mb-2">おすすめ:</p>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• 2,000円: みかん2kg</li>
                <li>• 5,000円: いちご500g</li>
                <li>• 8,000円: 季節のフルーツ詰め合わせ</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      {/* セクション4: 5ステップ */}
      <section id="quick-guide" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          最短で完了する5ステップ
        </h2>

        <p className="text-gray-700 mb-6">
          駆け込みでも慌てない！最短10分で完了する手順をご紹介します。
        </p>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                限度額を計算（1分）
              </h3>
              <p className="text-sm text-gray-700">
                AIで自動計算するのが最速。年収と家族構成を入力するだけ。
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                返礼品を選ぶ（3分）
              </h3>
              <p className="text-sm text-gray-700">
                在庫が豊富な米・日用品から選ぶのが安心。AIの推薦を参考に。
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                申し込み・決済（5分）
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                クレジットカード決済を選択。楽天なら楽天IDでログインするだけ。
              </p>
              <div className="bg-yellow-50 p-3 rounded text-sm text-gray-700">
                ⚠️ 住所・氏名を必ず確認！間違いがあると返礼品が届きません。
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                寄附金受領証明書を待つ（後日）
              </h3>
              <p className="text-sm text-gray-700">
                通常1〜2ヶ月で自治体から郵送されます。大切に保管しましょう。
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              5
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ワンストップ申請（1月10日まで）
              </h3>
              <p className="text-sm text-gray-700">
                5自治体以内ならワンストップ特例が簡単。オンライン申請も可能。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-gray-700">
            ✅ <strong>所要時間わずか10分</strong>で駆け込み申し込みが完了します！
          </p>
        </div>
      </section>

      {/* セクション5: トラブル対処法 */}
      <section id="trouble" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          トラブル対処法
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              トラブル1: 12月31日23:50に気づいた
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>対処法:</strong> すぐに決済できる少額返礼品を選ぶ。
              2,000円〜5,000円のフルーツや日用品なら在庫が豊富。
            </p>
            <p className="text-sm text-red-600 font-semibold">
              ⚠️ 欲張らず、確実に決済完了を優先しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              トラブル2: 決済エラーが出た
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>対処法:</strong> 別のクレジットカードを試す、または他のサイトで同じ返礼品を探す。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              トラブル3: 在庫切れで返礼品が選べない
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>対処法:</strong> 米・日用品など定番品は在庫が豊富。
              あなたのふるさと納税AIのAIで代替品を即座に提案してもらいましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              トラブル4: 年明けに気づいた
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>対処法:</strong> 残念ながら2025年分の控除には間に合いません。
              2026年の控除対象として、1月1日から新たに申し込みましょう。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q1. 12月31日の何時までに申し込めばいい？
            </h3>
            <p className="text-gray-700">
              A. <strong>決済完了が23:59まで</strong>に必要です。
              申し込みボタンを押しただけでは認められません。
              クレジットカード決済が完了し、「注文確定」画面が表示された時点でOKです。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q2. 12月31日に申し込んだ場合、いつ返礼品が届く？
            </h3>
            <p className="text-gray-700">
              A. 返礼品の配送時期は自治体によって異なりますが、通常<strong>1〜3ヶ月後</strong>です。
              定期便の場合はさらに遅くなることもあります。
              各返礼品ページの「配送時期」を必ず確認しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q3. ワンストップ申請書はいつまでに提出？
            </h3>
            <p className="text-gray-700">
              A. <strong>翌年1月10日（必着）</strong>です。
              12月31日に寄付しても、申請書の提出期限は変わりません。
              年明けすぐに準備を始めましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q4. 駆け込みで6自治体以上に寄付してしまった場合は？
            </h3>
            <p className="text-gray-700">
              A. ワンストップ特例は使えません。
              <strong>確定申告</strong>が必要になります。
              翌年2月16日〜3月15日に確定申告を行ってください。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q5. 12月に寄付が集中して在庫切れが多いのはなぜ？
            </h3>
            <p className="text-gray-700">
              A. ふるさと納税は12月31日が期限のため、<strong>年間検索ボリュームの50%以上が12月に集中</strong>します。
              特に人気の肉・海鮮・家電は早期に売り切れることが多いです。
            </p>
          </div>
        </div>
      </section>

      {/* あなたのふるさと納税AIPR */}
      <div className="mb-12 p-8 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-primary-600">あなたのふるさと納税AI</span>
          </Link>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            もう、12月に慌てない。AIがあなたに最適な返礼品を提案
          </h3>
          <p className="text-gray-700 mb-6">
            限度額を自動計算し、在庫のある返礼品から最適なものをAIが提案。
            12月の駆け込みでも、わずか3分で申し込み完了します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              在庫が豊富で確実に届く返礼品を優先表示
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">限度額シミュレーション</h4>
            <p className="text-sm text-gray-700">
              年収と家族構成を入力するだけで正確な限度額を計算
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📧</div>
            <h4 className="font-bold text-gray-900 mb-2">旬のタイミングで通知</h4>
            <p className="text-sm text-gray-700">
              楽天マラソン等のお得なタイミングをメール通知
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            無料で始める →
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            完全無料 | クレジットカード登録不要 | 登録後すぐに利用開始
          </p>
        </div>
      </div>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          まとめ：駆け込みでも焦らず確実に
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            12月駆け込みの成功ポイント
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>12月28日までに完了</strong>する（余裕を持つ）</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>クレジットカード決済</strong>を選択（即時決済）</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>在庫が豊富な返礼品</strong>を選ぶ（米・日用品）</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>AIで代替品を用意</strong>しておく</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>ワンストップ申請書は<strong>1月10日まで</strong>に提出</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          12月は駆け込み需要で混雑しますが、ポイントを押さえれば確実に間に合います。
          焦らず、在庫が豊富な返礼品から選びましょう。
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            ⏰ <strong>今日が12月28日以降の場合は、今すぐ行動しましょう！</strong><br />
            あなたのふるさと納税AIのAIなら、限度額計算から返礼品選びまで3分で完了します。
          </p>
        </div>
      </section>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-300">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/article/furusato-gendogaku-simulation"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税限度額シミュレーション
            </h3>
            <p className="text-sm text-gray-600">
              年収・家族構成から正確な限度額を計算
            </p>
          </Link>
          <Link
            href="/article/furusato-hajimekata"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税の始め方【完全ガイド】
            </h3>
            <p className="text-sm text-gray-600">
              初心者でも5ステップで簡単にスタート
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
    </div>
  );
}
