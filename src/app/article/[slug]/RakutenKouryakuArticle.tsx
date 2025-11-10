'use client';

import React from 'react';
import Link from 'next/link';

export default function RakutenKouryakuArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          楽天ふるさと納税完全攻略ガイド｜SPU・ポイント最大化・注意点を徹底解説【2025年版】
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          楽天ふるさと納税は、<strong>楽天ポイントが貯まる・使える</strong>最強のふるさと納税サービス。
          SPUやお買い物マラソンを活用すれば、<strong>ポイント還元率30%以上</strong>も夢ではありません。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>楽天ふるさと納税の使い方、SPUの活用法、ポイント還元率を最大化する方法</strong>を徹底解説。
          お買い物マラソンや5と0のつく日の活用法、注意点まで詳しく紹介します。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#about" className="text-primary-600 hover:underline">1. 楽天ふるさと納税とは？</a></li>
          <li><a href="#merits" className="text-primary-600 hover:underline">2. 楽天ふるさと納税のメリット</a></li>
          <li><a href="#how-to" className="text-primary-600 hover:underline">3. 楽天ふるさと納税の使い方</a></li>
          <li><a href="#spu" className="text-primary-600 hover:underline">4. SPUの活用法</a></li>
          <li><a href="#marathon" className="text-primary-600 hover:underline">5. お買い物マラソンの活用法</a></li>
          <li><a href="#campaigns" className="text-primary-600 hover:underline">6. その他のキャンペーン</a></li>
          <li><a href="#cautions" className="text-primary-600 hover:underline">7. 楽天ふるさと納税の注意点</a></li>
          <li><a href="#strategy" className="text-primary-600 hover:underline">8. ポイント最大化戦略</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">9. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 楽天ふるさと納税とは */}
      <section id="about" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          楽天ふるさと納税とは？
        </h2>

        <p className="text-gray-700 mb-6">
          楽天ふるさと納税は、<strong>楽天市場内で運営されているふるさと納税サービス</strong>です。
          通常の楽天市場での買い物と同じように、楽天ポイントが貯まり、使えます。
        </p>

        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            最大の特徴: ポイント還元率が圧倒的に高い
          </h3>
          <p className="text-gray-700 mb-4">
            SPU（スーパーポイントアッププログラム）やお買い物マラソンを活用すれば、
            <strong>最大30%以上のポイント還元</strong>が可能です。
          </p>
          <div className="bg-white p-4 rounded border border-red-200">
            <p className="text-sm text-gray-700">
              <strong>例:</strong> 6万円の寄付でポイント還元30%の場合<br />
              60,000円 × 30% = <span className="text-red-600 font-bold text-lg">18,000ポイント</span>獲得<br />
              実質負担2,000円 − 18,000ポイント = <span className="text-green-600 font-bold">実質16,000円のプラス</span>
            </p>
          </div>
        </div>
      </section>

      {/* セクション2: メリット */}
      <section id="merits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          楽天ふるさと納税のメリット
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-red-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              メリット1: 楽天ポイントが貯まる
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>SPU倍率に応じてポイント還元</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>最大30%還元も可能</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>通常ポイント+期間限定ポイント</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              メリット2: 楽天ポイントが使える
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>期間限定ポイントも使用可能</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>ポイントで寄付できる</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>ポイントを使っても控除額は変わらない</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              メリット3: お買い物マラソンでポイントアップ
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>10ショップで+10倍</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>ふるさと納税が1ショップとしてカウント</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>複数自治体に寄付すれば自動的に複数ショップ達成</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              メリット4: 楽天市場と同じ操作感
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>使い慣れたインターフェース</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>注文履歴で管理しやすい</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>レビューが豊富</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              メリット5: 返礼品の種類が豊富
            </h3>
            <p className="text-gray-700">
              約50万点以上の返礼品から選べます。検索機能も優れていて、カテゴリ、価格帯、レビュー順などで絞り込み可能。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 使い方 */}
      <section id="how-to" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          楽天ふるさと納税の使い方
        </h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">楽天市場にログイン</h3>
              <p className="text-gray-700">楽天会員IDでログイン。まだ会員でない場合は新規登録（無料）。</p>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">「楽天ふるさと納税」で検索</h3>
              <p className="text-gray-700">楽天市場内で「ふるさと納税」と検索、または専用ページにアクセス。</p>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">返礼品を探す</h3>
              <p className="text-gray-700">
                カテゴリ、寄付額、地域で絞り込み。
                <strong>ふるそなのAI推薦も活用</strong>すれば、最適な返礼品がすぐ見つかります。
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">カートに入れる</h3>
              <p className="text-gray-700">通常の楽天市場での買い物と同じ。</p>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">5</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">注文内容を確認</h3>
              <ul className="text-gray-700 space-y-1 mt-2">
                <li>• ワンストップ特例申請書を希望する場合はチェック</li>
                <li>• <strong>本人名義のクレジットカードを使用</strong></li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-3">6</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">注文確定</h3>
              <p className="text-gray-700">決済完了で寄付完了。楽天ポイントが貯まります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション4: SPU */}
      <section id="spu" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-purple-500">
          SPUの活用法
        </h2>

        <p className="text-gray-700 mb-6">
          SPU（スーパーポイントアッププログラム）は、楽天グループのサービスを利用することで、
          楽天市場でのポイント還元率がアップするプログラムです。
        </p>

        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            達成しやすいSPU条件（初心者向け）
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white p-3 rounded">
              <span className="text-gray-700">楽天カード利用</span>
              <span className="text-red-600 font-bold">+2倍</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded">
              <span className="text-gray-700">楽天モバイル契約</span>
              <span className="text-red-600 font-bold">+4倍</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded">
              <span className="text-gray-700">楽天銀行+楽天カード</span>
              <span className="text-red-600 font-bold">+1倍</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded">
              <span className="text-gray-700">楽天ブックス（月1回、1,000円以上）</span>
              <span className="text-red-600 font-bold">+0.5倍</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded">
              <span className="text-gray-700">楽天Kobo（月1回、1,000円以上）</span>
              <span className="text-red-600 font-bold">+0.5倍</span>
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

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>詳細はRakutenPointArticleを参照</strong><br />
            SPUの詳しい攻略法は
            <Link href="/article/rakuten-point-strategy" className="text-primary-600 hover:underline">
              「楽天ポイント戦略」記事
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      {/* セクション5: お買い物マラソン */}
      <section id="marathon" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          お買い物マラソンの活用法
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            基本ルール
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>期間中に複数ショップで買い物</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>10ショップで最大+10倍</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>月1-2回開催（不定期）</span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ふるさと納税での活用法
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>各自治体が1ショップとしてカウント</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>5自治体に寄付 = 5ショップ達成</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>他の買い物と組み合わせて10ショップを目指す</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">活用例</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• ふるさと納税5自治体</li>
            <li>• 日用品、本、食品、洋服、家電を楽天市場で購入</li>
            <li>• 合計10ショップ → <span className="text-red-600 font-bold">+10倍</span></li>
          </ul>
        </div>
      </section>

      {/* セクション6: その他のキャンペーン */}
      <section id="campaigns" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          その他のキャンペーン
        </h2>

        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5と0のつく日（毎月6回）
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>毎月5日、10日、15日、20日、25日、30日</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>楽天カード決済で<strong>+2倍</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>エントリーが必須（忘れずに）</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              楽天大感謝祭・超ポイントバック祭（年数回）
            </h3>
            <p className="text-gray-700 mb-3">
              年に数回開催される大型セール。ポイント還元が通常より大幅アップ。
            </p>
            <div className="bg-white p-4 rounded border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong>12月の大感謝祭</strong>は、ふるさと納税の駆け込み需要と重なるため、最大のチャンスです。
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              勝ったら倍キャンペーン
            </h3>
            <p className="text-gray-700">
              楽天イーグルス・ヴィッセル神戸・FCバルセロナが勝利した翌日にポイントアップ。
            </p>
          </div>
        </div>
      </section>

      {/* セクション7: 注意点 */}
      <section id="cautions" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-500">
          楽天ふるさと納税の注意点
        </h2>

        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ⚠️ 注意点1: 楽天ポイントは控除額に影響しない
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              ポイントで寄付しても、実際の寄付金額で控除計算されます。
            </p>
            <div className="bg-white p-3 rounded mt-2">
              <p className="text-sm text-gray-700">
                <strong>例:</strong> 10,000円の寄付に5,000ポイント使用<br />
                → 控除額は10,000円（ポイント使用分も含む）
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              🚨 注意点2: 本人名義のカードを使う
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 家族カードでも本人名義ならOK</li>
              <li>• 配偶者名義のカードはNG</li>
              <li>• 名義が違うと控除が受けられない</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              💡 注意点3: ポイント付与のタイミング
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 通常ポイント: 翌月15日頃</li>
              <li>• 期間限定ポイント: キャンペーンにより異なる</li>
              <li>• 多くは翌々月15日頃</li>
            </ul>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ⚠️ 注意点4: ワンストップ申請書は別途郵送
            </h3>
            <p className="text-sm text-gray-700">
              楽天市場での注文だけでは不十分。申請書を自治体に郵送が必要です。
            </p>
          </div>
        </div>
      </section>

      {/* セクション8: 最大化戦略 */}
      <section id="strategy" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          楽天ポイントを最大化する戦略
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

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            実現のための5ステップ
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">1</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">楽天カードを作る</p>
                <p className="text-sm text-gray-700">年会費無料。これだけで+2倍確定。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">2</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">SPUを上げる</p>
                <p className="text-sm text-gray-700">楽天モバイル、楽天銀行などで+5倍を目指す。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">3</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">お買い物マラソン開催日を待つ</p>
                <p className="text-sm text-gray-700">月1〜2回開催。カレンダーをチェック。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">4</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">5と0のつく日を狙う</p>
                <p className="text-sm text-gray-700">マラソン期間中の5日、10日、15日、20日、25日、30日が最強。</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">5</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">10ショップ以上で購入</p>
                <p className="text-sm text-gray-700">ふるさと納税5自治体 + 通常の買い物5店舗で達成。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ふるそなPR */}
      <div className="mb-12 p-8 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
            <span className="text-2xl font-bold text-primary-600">ふるそな</span>
          </Link>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ふるそなで最適な返礼品を選び、楽天で購入するのが最強
          </h3>
          <p className="text-gray-700 mb-6">
            AIが最適な返礼品を提案。楽天マラソンのタイミングも通知します
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
              Q: 楽天ポイントはいつ付与される？
            </h3>
            <p className="text-gray-700">
              A: 通常ポイントは翌月15日頃、キャンペーンポイントは翌々月15日頃に付与されます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ポイント使用分もふるさと納税になる？
            </h3>
            <p className="text-gray-700">
              A: はい、<strong>ポイント利用分も寄付金額に含まれます</strong>。
              例えば、10,000円の寄付に5,000ポイント使った場合、10,000円の寄付として控除されます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: SPUの倍率はいつ反映される？
            </h3>
            <p className="text-gray-700">
              A: SPUの条件達成は<strong>寄付する月の前月までに完了</strong>している必要があります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ポイント上限はある？
            </h3>
            <p className="text-gray-700">
              A: はい、各キャンペーンにはポイント上限があります。
              お買い物マラソンは通常7,000pt上限、5と0のつく日は3,000pt上限などです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 楽天以外のサイトと比較して得？
            </h3>
            <p className="text-gray-700">
              A: ポイント重視なら楽天が圧倒的に有利です。他サイトは還元率0～3%程度ですが、楽天は30%以上も可能です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 楽天カードを持っていないけど間に合う？
            </h3>
            <p className="text-gray-700">
              A: 楽天カードの発行には1〜2週間かかります。12月に間に合わせたい場合は、11月中旬までに申し込みましょう。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ふるそなを使うメリットは？
            </h3>
            <p className="text-gray-700">
              A: AIがあなたの好みを学習し、最適な返礼品を提案。
              楽天マラソンなど最適なキャンペーン時期も通知します。
              実質負担額をマイナスにする返礼品選びをサポートします。
            </p>
          </div>
        </div>
      </section>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/rakuten-point-strategy" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">楽天ポイント戦略の詳細ガイド</h3>
            <p className="text-sm text-gray-600">SPU・キャンペーン活用の完全版</p>
          </Link>
          <Link href="/article/furusato-osusume-ranking" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">おすすめ返礼品ランキング</h3>
            <p className="text-sm text-gray-600">カテゴリ別人気商品を徹底紹介</p>
          </Link>
        </div>
      </section>
    </article>
  );
}
