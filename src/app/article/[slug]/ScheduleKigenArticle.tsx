'use client';

import React from 'react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export default function ScheduleKigenArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ふるさと納税の期限とスケジュール｜いつまでに何をすべき？年間スケジュール完全版【2025年】
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税には<strong>いくつかの重要な期限</strong>があります。
          期限を過ぎると控除が受けられなくなるため、スケジュール管理が重要です。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>寄付期限、ワンストップ申請期限、確定申告期限</strong>を月別に整理。
          12月の駆け込み寄付や1月のワンストップ申請など、忘れてはいけない重要な期限を詳しく解説します。
        </p>
      </div>

      {/* 広告 */}
      <AdBanner />

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#important-dates" className="text-primary-600 hover:underline">1. 重要な3つの期限</a></li>
          <li><a href="#yearly-schedule" className="text-primary-600 hover:underline">2. 年間スケジュール（月別）</a></li>
          <li><a href="#december" className="text-primary-600 hover:underline">3. 12月の駆け込み寄付の注意点</a></li>
          <li><a href="#onestop" className="text-primary-600 hover:underline">4. ワンストップ特例申請のスケジュール</a></li>
          <li><a href="#confirmation" className="text-primary-600 hover:underline">5. 控除の反映スケジュール</a></li>
          <li><a href="#checklist" className="text-primary-600 hover:underline">6. 期限を守るためのチェックリスト</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 重要な3つの期限 */}
      <section id="important-dates" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          重要な3つの期限
        </h2>

        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-500">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">📅</span>
              <h3 className="text-xl font-bold text-gray-900">12月31日: 寄付の期限</h3>
            </div>
            <p className="text-gray-700">
              今年の控除を受けるためには、<strong>12月31日23:59まで</strong>に寄付の決済を完了させる必要があります。
              返礼品の到着は翌年でもOKです。
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-500">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">📮</span>
              <h3 className="text-xl font-bold text-gray-900">翌年1月10日: ワンストップ申請書の提出期限</h3>
            </div>
            <p className="text-gray-700">
              ワンストップ特例制度を使う場合、申請書を<strong>翌年1月10日（必着）</strong>までに自治体に送付する必要があります。
              消印有効ではないので注意！
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-500">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">📝</span>
              <h3 className="text-xl font-bold text-gray-900">翌年3月15日: 確定申告の期限</h3>
            </div>
            <p className="text-gray-700">
              確定申告をする場合は、<strong>翌年2月16日～3月15日</strong>の期間に申告します。
              ワンストップを忘れた場合も確定申告で対応可能です。
            </p>
          </div>
        </div>
      </section>

      {/* セクション2: 年間スケジュール */}
      <section id="yearly-schedule" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          年間スケジュール（月別）
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1月 - ワンストップ申請の締切月
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>1月10日（必着）</strong>: 前年の寄付に対するワンストップ申請の締切</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>確定申告の受付開始（還付申告は1月から可能）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>新年の寄付スタート</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2月 - 確定申告期間の開始
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span><strong>2月16日～</strong>: 確定申告期間の開始</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>来年に向けて計画を立てる時期</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3月 - 確定申告の締切月
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>3月15日</strong>: 確定申告の締切</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>前年の寄付に対する控除手続きの最終期限</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4-5月 - 限度額の概算
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>源泉徴収票の準備</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>今年の限度額を概算</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6月 - 控除の確認月
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span><strong>住民税決定通知書</strong>で昨年の控除を確認</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>今年の寄付を開始</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              7-10月 - 計画的な寄付期間
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>秋の返礼品が充実</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>お買い物マラソンなどのキャンペーン活用</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              11月 - 最終確認の月
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>年収が確定してくる時期</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>正確な限度額を計算</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>駆け込み寄付の計画開始</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-500">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              12月 - 最も重要な月
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span><strong>12月31日23:59まで</strong>に寄付を完了</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span>駆け込み需要でサイトが混雑</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <span>人気商品は売り切れに注意</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* セクション3: 12月の注意点 */}
      <section id="december" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          12月の駆け込み寄付の注意点
        </h2>

        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ⚠️ 注意点1: 決済が12月31日までに完了していること
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• クレジットカード決済: 決済日が基準</li>
              <li>• 銀行振込: 入金が12月31日までに完了</li>
              <li>• コンビニ払い: 支払いが12月31日までに完了</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              💡 注意点2: 返礼品の到着日は関係ない
            </h3>
            <p className="text-sm text-gray-700">
              翌年に届いても控除は今年分として扱われます。発送時期は気にしなくてOKです。
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              🚨 注意点3: サイトの混雑
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 12月30-31日は特に混む</li>
              <li>• システムエラーのリスク</li>
              <li>• <strong>12月中旬までに済ませるのが安全</strong></li>
            </ul>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ⚠️ 注意点4: 人気商品の売り切れ
            </h3>
            <p className="text-sm text-gray-700">
              肉、米、フルーツなど人気商品は早めに売り切れます。11月末までに目処をつけましょう。
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: ワンストップ申請のスケジュール */}
      <section id="onestop" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ワンストップ特例申請のスケジュール
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            12月に寄付した場合の流れ
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">1</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">12月20日: 寄付</p>
                  <p className="text-sm text-gray-700">楽天ふるさと納税などで寄付を完了</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">2</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">12月25日: 申請書が届く</p>
                  <p className="text-sm text-gray-700">返礼品とは別に郵送される（自治体により異なる）</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">3</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">12月28日: 記入して郵送</p>
                  <p className="text-sm text-gray-700">マイナンバーカードのコピーと一緒に送付</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">✓</span>
                <div className="flex-1">
                  <p className="font-bold text-green-600">1月5日: 自治体に到着</p>
                  <p className="text-sm text-gray-700">1月10日必着なのでセーフ！</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-2">
            💡 余裕を持ったスケジュール
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• 12月10日までに寄付完了</li>
            <li>• 12月20日までに申請書を郵送</li>
            <li>• 年内に手続き完了</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="text-sm text-gray-700">
            ⚠️ <strong>申請書が届かない場合</strong><br />
            自治体HPからダウンロードできます。年末年始は郵便が遅れるため、早めの対応を！
          </p>
        </div>
      </section>

      {/* セクション5: 控除の反映スケジュール */}
      <section id="confirmation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          控除の反映スケジュール
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            所得税の還付（確定申告の場合）
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>確定申告後、<strong>3週間～2ヶ月</strong>で指定口座に振込</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>e-Taxの方が早い（3週間程度）</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>書面提出は1-2ヶ月かかる</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            住民税の控除
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>翌年6月ごろ</strong>から住民税が減額</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>住民税決定通知書で確認</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>「寄附金税額控除」の欄をチェック</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">
            タイムライン例（2025年に寄付した場合）
          </h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>2025年12月:</strong> 寄付</p>
            <p><strong>2026年1月:</strong> ワンストップ申請または確定申告準備</p>
            <p><strong>2026年3月:</strong> 確定申告（該当者のみ）</p>
            <p><strong>2026年4-5月:</strong> 所得税還付</p>
            <p className="text-green-600 font-bold"><strong>2026年6月:</strong> 住民税控除開始</p>
          </div>
        </div>
      </section>

      {/* セクション6: チェックリスト */}
      <section id="checklist" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          期限を守るためのチェックリスト
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              11月にやること
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>今年の年収を確認</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>限度額を計算</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>返礼品をリストアップ</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span><strong>あなたのふるさと納税AIで最適な返礼品を選ぶ</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              12月にやること
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span><strong>12月20日までに寄付を完了</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>ワンストップ申請書の到着を確認</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>寄附金受領証明書の保管</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              1月にやること
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span><strong>ワンストップ申請書を1月10日までに郵送</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>確定申告が必要な人は書類を準備</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              2-3月にやること
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>確定申告（該当者のみ）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>還付金の入金を確認</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              6月にやること
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>住民税決定通知書で控除額を確認</span>
              </li>
            </ul>
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
            もう、12月に慌てない。期限をリマインドして安心管理
          </h3>
          <p className="text-gray-700 mb-6">
            あなたのふるさと納税AIが重要な期限をメールで通知。ワンストップ申請の期限も逃しません
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⏰</div>
            <h4 className="font-bold text-gray-900 mb-2">期限リマインダー</h4>
            <p className="text-sm text-gray-700">
              ワンストップ申請や確定申告の期限を通知
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              11月に最適な返礼品を自動提案
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

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 12月31日の何時まで？
            </h3>
            <p className="text-gray-700">
              A: 23:59までです。クレジット決済が完了していればOKです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 返礼品が届くのは翌年でもいい？
            </h3>
            <p className="text-gray-700">
              A: OKです。控除は寄付した年の分として扱われます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ワンストップ申請は消印有効？
            </h3>
            <p className="text-gray-700">
              A: <strong>必着です</strong>。消印ではありません。郵便局の窓口で確実に送付しましょう。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 複数の自治体に寄付したけど、まとめて申請できる？
            </h3>
            <p className="text-gray-700">
              A: できません。寄付ごとに申請書が必要です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 11月に寄付して、申請書が12月に届いた場合は？
            </h3>
            <p className="text-gray-700">
              A: 翌年1月10日までに提出すればOKです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 期限を過ぎたら控除は受けられない？
            </h3>
            <p className="text-gray-700">
              A: ワンストップは無理ですが、確定申告なら対応可能です（3月15日まで）。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIを使うメリットは？
            </h3>
            <p className="text-gray-700">
              A: 寄付履歴を管理し、重要な期限をリマインドしてくれます。期限を忘れる心配がありません。
            </p>
          </div>
        </div>
      </section>

      {/* 広告 */}
      <AdBanner />

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/furusato-onestop-tokureiseido" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">ワンストップ特例制度の完全マニュアル</h3>
            <p className="text-sm text-gray-600">申請方法・期限・注意点を解説</p>
          </Link>
          <Link href="/article/furusato-kakuteishinkoku" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">確定申告でふるさと納税の控除を受ける方法</h3>
            <p className="text-sm text-gray-600">必要書類・書き方・e-Taxでの申請</p>
          </Link>
        </div>
      </section>
    </article>
    </div>
  );
}
