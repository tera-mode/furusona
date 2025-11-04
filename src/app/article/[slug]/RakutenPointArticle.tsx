'use client';

import React from 'react';
import Link from 'next/link';

export default function RakutenPointArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          楽天ふるさと納税でポイント30%還元を狙う｜2025年SPU攻略とキャンペーン活用術
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月4日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税を<strong>楽天市場</strong>で行うだけで、最大30%のポイント還元が受けられることをご存知ですか？
          実質2,000円の負担がマイナスになる可能性もあります。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>楽天ふるさと納税でポイント還元を最大化する方法</strong>を徹底解説。
          SPU（スーパーポイントアッププログラム）、お買い物マラソン、5と0のつく日などを組み合わせて、お得度を極限まで高めましょう。
        </p>
      </div>


      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#why-rakuten" className="text-primary-600 hover:underline">1. なぜ楽天ふるさと納税が最強なのか</a></li>
          <li><a href="#spu" className="text-primary-600 hover:underline">2. SPU（スーパーポイントアップ）攻略法</a></li>
          <li><a href="#campaigns" className="text-primary-600 hover:underline">3. 活用すべき5つのキャンペーン</a></li>
          <li><a href="#strategy" className="text-primary-600 hover:underline">4. ポイント還元30%を実現する戦略</a></li>
          <li><a href="#example" className="text-primary-600 hover:underline">5. 実例：6万円で1.8万ptを獲得</a></li>
          <li><a href="#recommended" className="text-primary-600 hover:underline">6. 楽天おすすめ返礼品TOP10</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: なぜ楽天が最強か */}
      <section id="why-rakuten" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          なぜ楽天ふるさと納税が最強なのか
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ポイント還元が圧倒的に高い
          </h3>
          <p className="text-gray-700 mb-4">
            他のふるさと納税サイトと比較して、楽天は<strong>ポイント還元率が圧倒的</strong>です。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">サイト</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">基本還元率</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">最大還元率</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">楽天ふるさと納税</td>
                  <td className="border border-gray-300 px-4 py-3">1%</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600 font-bold">30%以上</td>
                  <td className="border border-gray-300 px-4 py-3">SPU、マラソン、5と0のつく日</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">ふるなび</td>
                  <td className="border border-gray-300 px-4 py-3">1%</td>
                  <td className="border border-gray-300 px-4 py-3">3%</td>
                  <td className="border border-gray-300 px-4 py-3">ふるなびコイン</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">さとふる</td>
                  <td className="border border-gray-300 px-4 py-3">0.5%</td>
                  <td className="border border-gray-300 px-4 py-3">2%</td>
                  <td className="border border-gray-300 px-4 py-3">PayPayポイント</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">ふるさとチョイス</td>
                  <td className="border border-gray-300 px-4 py-3">0%</td>
                  <td className="border border-gray-300 px-4 py-3">0%</td>
                  <td className="border border-gray-300 px-4 py-3">ポイント還元なし</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            楽天経済圏との相乗効果
          </h3>
          <p className="text-gray-700 mb-4">
            楽天カード、楽天モバイル、楽天銀行など、楽天グループのサービスを利用していれば、
            <strong>SPU（スーパーポイントアップ）</strong>が適用され、ポイント還元率がさらにアップします。
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>実質負担額がマイナスになる可能性</strong><br />
              ポイント還元が2,000円を超えれば、実質的に「お金をもらいながら返礼品を受け取る」ことが可能です。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            使いやすさと豊富な商品数
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>普段の楽天市場と同じUI</strong> - 使い慣れた画面で簡単</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>レビューが豊富</strong> - 実際の利用者の声が確認できる</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>検索機能が優れている</strong> - カテゴリ、価格帯、レビュー順など</span>
            </li>
          </ul>
        </div>
      </section>

      {/* セクション2: SPU攻略法 */}
      <section id="spu" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          SPU（スーパーポイントアップ）攻略法
        </h2>

        <p className="text-gray-700 mb-6">
          SPUは楽天グループのサービスを利用することで、楽天市場でのポイント還元率がアップするプログラムです。
          最大で<strong>+16倍</strong>までアップ可能です。
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            達成しやすいSPU条件（初心者向け）
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">楽天カード利用</h4>
                <span className="text-red-600 font-bold">+2倍</span>
              </div>
              <p className="text-sm text-gray-700">
                楽天カードで決済するだけ。年会費無料で最も簡単な条件。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">楽天モバイル契約</h4>
                <span className="text-red-600 font-bold">+4倍</span>
              </div>
              <p className="text-sm text-gray-700">
                楽天モバイルを利用しているだけで+4倍。月額980円〜で大幅アップ。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">楽天銀行+楽天カード</h4>
                <span className="text-red-600 font-bold">+1倍</span>
              </div>
              <p className="text-sm text-gray-700">
                楽天カードの引き落とし口座を楽天銀行に設定。無料で+1倍。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">楽天ブックス</h4>
                <span className="text-red-600 font-bold">+0.5倍</span>
              </div>
              <p className="text-sm text-gray-700">
                月1回、1,000円以上の買い物。本・雑誌・DVDなど。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">楽天Kobo</h4>
                <span className="text-red-600 font-bold">+0.5倍</span>
              </div>
              <p className="text-sm text-gray-700">
                電子書籍を月1回、1,000円以上購入。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            初心者でも達成可能なSPU倍率
          </h3>
          <p className="text-gray-700 mb-3">
            上記の条件を満たすだけで、<strong>基本1倍 + SPU 8倍 = 合計9倍</strong>のポイント還元が実現します。
          </p>
          <div className="bg-white p-4 rounded border border-green-200">
            <p className="text-sm text-gray-700">
              <strong>例:</strong> 6万円の寄付でSPU9倍の場合<br />
              60,000円 × 9% = <span className="text-red-600 font-bold text-lg">5,400ポイント</span>獲得
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: キャンペーン */}
      <section id="campaigns" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          活用すべき5つのキャンペーン
        </h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🏃 1. お買い物マラソン（最重要）
            </h3>
            <p className="text-gray-700 mb-3">
              月1〜2回開催される最大のポイントアップキャンペーン。
              <strong>最大+10倍</strong>（10ショップ購入）までアップします。
            </p>
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">攻略ポイント:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• ふるさと納税は各自治体が1ショップとしてカウント</li>
                <li>• 5自治体に寄付すれば自動的に5ショップ達成</li>
                <li>• 他の買い物と組み合わせて10ショップを目指す</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🗓️ 2. 5と0のつく日（毎月6回）
            </h3>
            <p className="text-gray-700 mb-3">
              毎月5日、10日、15日、20日、25日、30日に楽天カード決済で<strong>+2倍</strong>。
            </p>
            <div className="bg-white p-4 rounded border border-orange-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">注意点:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• エントリーが必須（忘れずに）</li>
                <li>• 楽天カード決済のみ対象</li>
                <li>• お買い物マラソンと重複可能</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              💳 3. 楽天カード利用特典デー（毎月2回）
            </h3>
            <p className="text-gray-700 mb-3">
              楽天カード会員限定の特典日。通常<strong>+1〜2倍</strong>アップ。
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🎉 4. 楽天大感謝祭・超ポイントバック祭（年数回）
            </h3>
            <p className="text-gray-700 mb-3">
              年に数回開催される大型セール。ポイント還元が通常より大幅アップ。
            </p>
            <div className="bg-white p-4 rounded border border-purple-200">
              <p className="text-sm text-gray-700">
                12月の大感謝祭は、ふるさと納税の駆け込み需要と重なるため、
                <strong>最大のチャンス</strong>です。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🎁 5. 勝ったら倍キャンペーン
            </h3>
            <p className="text-gray-700 mb-3">
              楽天イーグルス・ヴィッセル神戸・FCバルセロナが勝利した翌日にポイントアップ。
            </p>
          </div>
        </div>

      </section>

      {/* セクション4: 戦略 */}
      <section id="strategy" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          ポイント還元30%を実現する戦略
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            最強の組み合わせ
          </h3>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">基本ポイント</span>
                <span className="font-bold text-gray-900">1倍</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">SPU（楽天カード+モバイル等）</span>
                <span className="font-bold text-gray-900">+8倍</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">お買い物マラソン（10ショップ）</span>
                <span className="font-bold text-gray-900">+10倍</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">5と0のつく日</span>
                <span className="font-bold text-gray-900">+2倍</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">その他キャンペーン</span>
                <span className="font-bold text-gray-900">+2〜5倍</span>
              </div>
              <div className="border-t-2 border-red-300 pt-3 mt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">合計</span>
                <span className="text-2xl font-bold text-red-600">23〜26倍</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            実現のための5ステップ
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">楽天カードを作る</h4>
                <p className="text-sm text-gray-700">年会費無料。これだけで+2倍確定。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">SPUを上げる</h4>
                <p className="text-sm text-gray-700">楽天モバイル、楽天銀行などで+5倍を目指す。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">お買い物マラソン開催日を待つ</h4>
                <p className="text-sm text-gray-700">月1〜2回開催。カレンダーをチェック。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">5と0のつく日を狙う</h4>
                <p className="text-sm text-gray-700">マラソン期間中の5日、10日、15日、20日、25日、30日が最強。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">5</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">10ショップ以上で購入</h4>
                <p className="text-sm text-gray-700">ふるさと納税5自治体 + 通常の買い物5店舗で達成。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>ふるそなのAI機能</strong>なら、あなたの楽天SPU倍率を自動計算し、
            最適な寄付タイミングを提案します。
          </p>
        </div>
      </section>

      {/* セクション5: 実例 */}
      <section id="example" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          実例：6万円で1.8万ptを獲得
        </h2>

        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Aさん（38歳・会社員・年収700万円）の場合
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">条件:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• SPU: 9倍（楽天カード+モバイル+銀行+ブックス+Kobo）</li>
              <li>• お買い物マラソン期間中</li>
              <li>• 5のつく日（15日）</li>
              <li>• ふるさと納税5自治体 + 通常買い物5店舗 = 10ショップ</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">ポイント内訳:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 基本 1倍 + SPU 8倍 = 9倍</li>
              <li>• マラソン 10ショップ = +10倍</li>
              <li>• 5のつく日 = +2倍</li>
              <li>• その他キャンペーン = +3倍</li>
              <li className="font-bold text-red-600 mt-2">合計: 24倍</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-gray-700 mb-2">
              <strong>ふるさと納税額:</strong> 60,000円
            </p>
            <p className="text-gray-700 mb-2">
              <strong>ポイント還元:</strong> 60,000円 × 24% = 14,400pt
            </p>
            <p className="text-gray-700 mb-2">
              <strong>通常買い物（10,000円）:</strong> 10,000円 × 24% = 2,400pt
            </p>
            <p className="text-xl font-bold text-red-600 mt-3">
              合計獲得ポイント: 16,800pt
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ※ ポイント上限に注意（各キャンペーンに上限あり）
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            実質負担額の計算
          </h3>
          <p className="text-gray-700 mb-3">
            ふるさと納税の自己負担2,000円から、獲得ポイント（ふるさと納税分）14,400円を差し引くと...
          </p>
          <div className="bg-white p-4 rounded border border-blue-200">
            <p className="text-lg text-gray-900">
              2,000円 − 14,400円 = <span className="text-2xl font-bold text-green-600">−12,400円</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              実質的に<strong>12,400円もらいながら返礼品を受け取った</strong>ことになります！
            </p>
          </div>
        </div>
      </section>

      {/* セクション6: おすすめ返礼品 */}
      <section id="recommended" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          楽天おすすめ返礼品TOP10
        </h2>

        <p className="text-gray-700 mb-6">
          楽天ふるさと納税で人気が高く、レビュー評価も優れている返礼品をご紹介します。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">1位: 北海道産 米 ななつぼし 10kg</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★★ 4.7 (15,000件以上)</p>
            <p className="text-sm text-gray-700">コスパ最強の定番米。冷めても美味しいと評判。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">2位: 宮崎県産 豚肉 切り落とし 2kg</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★☆ 4.5 (8,000件以上)</p>
            <p className="text-sm text-gray-700">小分けパックで使いやすい。一人暮らしにも最適。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">3位: いくら醤油漬け 500g</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">15,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★★ 4.8 (10,000件以上)</p>
            <p className="text-sm text-gray-700">北海道産の新鮮ないくら。お正月にぴったり。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">4位: トイレットペーパー 96ロール</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">12,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★☆ 4.6 (12,000件以上)</p>
            <p className="text-sm text-gray-700">実用性抜群。端数調整にも便利。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">5位: シャインマスカット 1kg</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">20,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★★ 4.7 (6,000件以上)</p>
            <p className="text-sm text-gray-700">高級フルーツの代表格。贈答用にも。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">6位: 黒毛和牛 切り落とし 1.2kg</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">18,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★☆ 4.6 (7,500件以上)</p>
            <p className="text-sm text-gray-700">すき焼き・しゃぶしゃぶに最適。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">7位: ホタテ貝柱 1kg</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">15,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★★ 4.8 (9,000件以上)</p>
            <p className="text-sm text-gray-700">北海道産の大粒ホタテ。刺身でも焼いても絶品。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">8位: 洗剤・柔軟剤セット</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">8,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★☆ 4.5 (5,000件以上)</p>
            <p className="text-sm text-gray-700">日用品の定番。実用性重視の方に。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">9位: うなぎ蒲焼 3尾</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">20,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★☆ 4.6 (4,500件以上)</p>
            <p className="text-sm text-gray-700">国産うなぎの贅沢品。特別な日に。</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">10位: 季節のフルーツ定期便（3回）</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">30,000円</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">レビュー評価: ★★★★★ 4.7 (3,000件以上)</p>
            <p className="text-sm text-gray-700">年3回、旬のフルーツが届く。長く楽しめる。</p>
          </div>
        </div>
      </section>

      {/* ふるそなPR */}
      <div className="mb-12 p-8 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-primary-600">ふるそな</span>
          </Link>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            楽天ポイント還元を最大化！AIが最適なタイミングを提案
          </h3>
          <p className="text-gray-700 mb-6">
            あなたのSPU倍率を自動計算し、お買い物マラソンなど最適なキャンペーン時期をAIが通知。
            実質負担額をマイナスにする返礼品選びをサポートします。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIおすすめ診断</h4>
            <p className="text-sm text-gray-700">
              楽天ポイント還元を含めた実質価値を自動計算
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
              楽天マラソン・5と0のつく日をメール通知
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

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q1. 楽天ポイントはいつ付与される？
            </h3>
            <p className="text-gray-700">
              A. 通常ポイントは寄付の翌日、キャンペーンポイントは<strong>寄付月の翌々月15日頃</strong>に付与されます。
              期間限定ポイントが多いので、有効期限に注意しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q2. ポイント使用分もふるさと納税になる？
            </h3>
            <p className="text-gray-700">
              A. はい、<strong>ポイント利用分も寄付金額に含まれます</strong>。
              例えば、10,000円の寄付に5,000ポイント使った場合、10,000円の寄付として控除されます。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q3. SPUの倍率はいつ反映される？
            </h3>
            <p className="text-gray-700">
              A. SPUの条件達成は<strong>寄付する月の前月までに完了</strong>している必要があります。
              例えば、12月に寄付する場合、11月末までに楽天モバイルを契約しておく必要があります。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q4. ポイント上限はある？
            </h3>
            <p className="text-gray-700">
              A. はい、各キャンペーンにはポイント上限があります。
              お買い物マラソンは通常<strong>7,000pt上限</strong>、5と0のつく日は<strong>3,000pt上限</strong>などです。
              詳細は各キャンペーンページで確認しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q5. 楽天カードを持っていないけど間に合う？
            </h3>
            <p className="text-gray-700">
              A. 楽天カードの発行には<strong>1〜2週間</strong>かかります。
              12月に間に合わせたい場合は、11月中旬までに申し込みましょう。
              カードが届いたらすぐに楽天銀行を引き落とし口座に設定するとさらに+1倍です。
            </p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          まとめ：楽天経済圏で最大限お得に
        </h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            楽天ふるさと納税で30%還元を実現するポイント
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>楽天カード</strong>を作る（年会費無料で+2倍）</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>SPUを上げる</strong>（楽天モバイル+銀行等で+5倍以上）</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>お買い物マラソン</strong>を狙う（+10倍）</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>5と0のつく日</strong>にエントリー（+2倍）</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
              <span><strong>10ショップ以上</strong>で購入（ふるさと納税5自治体が基本）</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          楽天ふるさと納税は、楽天経済圏を活用することで、他のサイトとは比較にならないほどのポイント還元が実現します。
          実質負担額をマイナスにすることも夢ではありません。
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            🎁 <strong>ふるそなのAI機能</strong>なら、あなたの楽天SPU倍率を自動計算し、
            最適な返礼品と寄付タイミングを提案します。
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
            href="/article/furusato-ai-suisen"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              AIふるさと納税で時短＆最適化
            </h3>
            <p className="text-sm text-gray-600">
              返礼品選びが1分で完了する新サービス
            </p>
          </Link>
          <Link
            href="/article/furusato-hajimekata"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 transition-colors"
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
  );
}
