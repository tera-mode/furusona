'use client';

import React from 'react';
import Link from 'next/link';

export default function FurusatoBeginnerGuideArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          【2025年最新】ふるさと納税とは？初心者向け完全ガイド｜やり方・仕組みをわかりやすく解説
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-orange-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税は<strong>実質2,000円で豪華な返礼品がもらえる</strong>お得な制度です。
          でも、「仕組みがよくわからない」「手続きが面倒そう」と感じていませんか？
        </p>
        <p className="text-gray-800">
          この記事では、<strong>初めての方でも理解できるように</strong>、ふるさと納税の仕組み・やり方・申請方法を図解付きでわかりやすく解説します。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#what" className="text-primary-600 hover:underline">1. ふるさと納税とは？</a></li>
          <li><a href="#mechanism" className="text-primary-600 hover:underline">2. 仕組みを図解で理解</a></li>
          <li><a href="#merits" className="text-primary-600 hover:underline">3. ふるさと納税のメリット5つ</a></li>
          <li><a href="#howto" className="text-primary-600 hover:underline">4. ふるさと納税のやり方（5ステップ）</a></li>
          <li><a href="#mistakes" className="text-primary-600 hover:underline">5. よくある失敗と対策</a></li>
          <li><a href="#demerits" className="text-primary-600 hover:underline">6. デメリット・注意点</a></li>
          <li><a href="#recommended" className="text-primary-600 hover:underline">7. 初心者におすすめの返礼品</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">8. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: ふるさと納税とは？ */}
      <section id="what" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるさと納税とは？
        </h2>

        <p className="text-gray-700 mb-6">
          ふるさと納税とは、<strong>自分が選んだ自治体に寄付をすることで、所得税・住民税が控除される制度</strong>です。
          寄付のお礼として、その自治体から<strong>返礼品</strong>がもらえます。
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-orange-200 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">簡単に言うと...</h3>
          <p className="text-gray-700">
            自己負担2,000円で、<strong>お米、お肉、日用品など</strong>の返礼品がもらえる制度。
            実質的に約7,000円〜10,000円分の商品が2,000円で手に入るイメージです。
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>なぜお得なのか</strong><br />
            2,000円の自己負担で、通常3,000円〜10,000円相当の返礼品がもらえます。
            つまり、実質1,000円〜8,000円もお得になります。
          </p>
        </div>
      </section>

      {/* セクション2: 仕組みを図解で理解 */}
      <section id="mechanism" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          仕組みを図解で理解
        </h2>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-lg mb-6">
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">あなたが自治体に30,000円寄付</p>
              </div>
            </div>
            <div className="ml-12 text-3xl text-center">↓</div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">28,000円が税金から控除される</p>
                <p className="text-sm text-gray-600">（翌年の所得税・住民税が安くなる）</p>
              </div>
            </div>
            <div className="ml-12 text-3xl text-center">↓</div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">実質負担は2,000円のみ</p>
              </div>
            </div>
            <div className="ml-12 text-3xl text-center">↓</div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">返礼品（約9,000円相当）が届く</p>
              </div>
            </div>
            <div className="ml-12 text-3xl text-center">↓</div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">✓</div>
              <div className="flex-1">
                <p className="font-bold text-green-600 text-lg">実質7,000円もお得！</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: メリット */}
      <section id="merits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるさと納税のメリット5つ
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. 実質2,000円で豪華な返礼品
            </h3>
            <p className="text-gray-700 mb-4">
              お肉、お米、フルーツ、日用品など、様々な返礼品が選べます。
              還元率は通常30%程度なので、<strong>6万円の寄付なら約18,000円相当の返礼品</strong>がもらえます。
            </p>
            <div className="bg-white p-4 rounded border-2 border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>具体例:</strong> 年収500万円（独身）の場合<br />
                限度額: 約61,000円 → 自己負担2,000円で約18,000円相当の返礼品
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. 好きな自治体を応援できる
            </h3>
            <p className="text-gray-700">
              出身地、思い入れのある地域、災害支援など、自分が応援したい自治体を自由に選べます。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. 税金の使い道を選べる
            </h3>
            <p className="text-gray-700">
              教育支援、環境保全、災害復興など、寄付金の使い道を指定できる自治体も多くあります。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. 複数の自治体に寄付できる
            </h3>
            <p className="text-gray-700">
              5自治体でも10自治体でも自由。様々な返礼品を楽しめます。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5. 手続きが簡単
            </h3>
            <p className="text-gray-700">
              ワンストップ特例制度を使えば、<strong>確定申告不要</strong>で税金控除が受けられます。
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: やり方 */}
      <section id="howto" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるさと納税のやり方（5ステップ）
        </h2>

        <div className="space-y-8">
          {/* ステップ1 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">1</span>
              <h3 className="text-xl font-bold text-gray-900">限度額を調べる</h3>
            </div>
            <p className="text-gray-700 mb-4 ml-16">
              年収と家族構成によって、控除される上限額（限度額）が決まっています。
              この限度額を超えて寄付すると、自己負担が2,000円を超えてしまいます。
            </p>
            <div className="bg-orange-50 p-4 rounded ml-16">
              <p className="text-sm text-gray-700 mb-2"><strong>計算方法:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 総務省のふるさと納税ポータルサイトで簡易計算</li>
                <li>• <strong>ふるそなのAI計算機で自動計算（おすすめ）</strong></li>
                <li>• 各ふるさと納税サイトのシミュレーター</li>
              </ul>
            </div>
          </div>

          {/* ステップ2 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">2</span>
              <h3 className="text-xl font-bold text-gray-900">返礼品を選ぶ</h3>
            </div>
            <p className="text-gray-700 mb-4 ml-16">
              楽天ふるさと納税、さとふる、ふるなびなどのポータルサイトから返礼品を選びます。
            </p>
            <div className="bg-white p-4 rounded border-2 border-gray-200 ml-16">
              <p className="text-sm font-semibold text-gray-800 mb-2">人気カテゴリ:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 🍚 米（10kg）</li>
                <li>• 🥩 肉（牛肉、豚肉、鶏肉）</li>
                <li>• 🍎 フルーツ（シャインマスカット、みかんなど）</li>
                <li>• 🧻 日用品（トイレットペーパー、洗剤など）</li>
                <li>• 🐟 海鮮（いくら、カニ、うなぎなど）</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 ml-16 mt-4">
              <p className="text-sm text-gray-700">
                💡 <strong>ふるそなのAI推薦が便利</strong><br />
                あなたの好みを学習して、最適な返礼品を自動で提案します。
              </p>
            </div>
          </div>

          {/* ステップ3 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">3</span>
              <h3 className="text-xl font-bold text-gray-900">寄付を申し込む</h3>
            </div>
            <p className="text-gray-700 mb-4 ml-16">
              ポータルサイトでカートに入れて、通常のネットショッピングと同じように購入します。
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 ml-16">
              <p className="text-sm text-gray-700">
                ⚠️ <strong>重要</strong><br />
                • <strong>本人名義のクレジットカード</strong>を使用<br />
                • ワンストップ特例申請書を希望する場合はチェック
              </p>
            </div>
          </div>

          {/* ステップ4 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">4</span>
              <h3 className="text-xl font-bold text-gray-900">返礼品を受け取る</h3>
            </div>
            <p className="text-gray-700 ml-16">
              発送時期は返礼品によって異なります。即配送のものから数ヶ月後のものまで様々です。
            </p>
          </div>

          {/* ステップ5 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">5</span>
              <h3 className="text-xl font-bold text-gray-900">税金控除の手続き</h3>
            </div>
            <p className="text-gray-700 mb-4 ml-16">
              以下のいずれかの方法で税金控除を受けます。
            </p>
            <div className="ml-16 space-y-4">
              <div className="bg-white p-4 rounded border-2 border-green-200">
                <h4 className="font-bold text-gray-900 mb-2">パターン1: ワンストップ特例制度（おすすめ）</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>条件:</strong> 確定申告が不要な会社員で、5自治体以内の寄付
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>手続き:</strong> 申請書を自治体に郵送（翌年1月10日必着）
                </p>
                <p className="text-sm text-gray-700">
                  <strong>メリット:</strong> 確定申告不要で簡単
                </p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2">パターン2: 確定申告</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>条件:</strong> 6自治体以上に寄付、または医療費控除などがある人
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>手続き:</strong> 翌年2月16日〜3月15日に確定申告
                </p>
                <p className="text-sm text-gray-700">
                  <strong>メリット:</strong> 寄付先の制限なし
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション5: よくある失敗 */}
      <section id="mistakes" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          よくある失敗と対策
        </h2>

        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">失敗1: 限度額を超えて寄付</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>問題:</strong> 自己負担が2,000円を大きく超えてしまう
            </p>
            <p className="text-sm text-gray-700">
              <strong>対策:</strong> 事前に正確な限度額を計算。ふるそなのAI計算機がおすすめ
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-gray-900 mb-3">失敗2: 名義を間違える</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>問題:</strong> 配偶者や家族名義で寄付すると控除が受けられない
            </p>
            <p className="text-sm text-gray-700">
              <strong>対策:</strong> 必ず本人名義のクレジットカードで寄付
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-900 mb-3">失敗3: ワンストップの期限を過ぎる</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>問題:</strong> 申請書の提出期限（1月10日必着）を過ぎて控除されない
            </p>
            <p className="text-sm text-gray-700">
              <strong>対策:</strong> カレンダーに記録、ふるそなのリマインダー機能を活用
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-3">失敗4: 確定申告を忘れる</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>問題:</strong> 6自治体以上に寄付したのに確定申告しない
            </p>
            <p className="text-sm text-gray-700">
              <strong>対策:</strong> 6自治体以上ならワンストップは無効。必ず確定申告を
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-gray-900 mb-3">失敗5: 返礼品が思ったものと違う</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>問題:</strong> レビューを見ずに選んで失敗
            </p>
            <p className="text-sm text-gray-700">
              <strong>対策:</strong> レビューを確認、ふるそなのAIで最適な商品を選ぶ
            </p>
          </div>
        </div>
      </section>

      {/* セクション6: デメリット */}
      <section id="demerits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるさと納税のデメリット・注意点
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. 所得税・住民税を納めていない人は対象外
            </h3>
            <p className="text-gray-700">
              専業主婦（夫）、年収103万円以下のパート・アルバイトなど、税金を納めていない人は控除が受けられません。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. 上限額がある
            </h3>
            <p className="text-gray-700">
              年収や家族構成によって限度額が決まっており、無制限に寄付できるわけではありません。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. 返礼品の到着まで時間がかかる場合も
            </h3>
            <p className="text-gray-700">
              季節限定の返礼品は数ヶ月後の発送になることもあります。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. 自己負担2,000円は必ず発生
            </h3>
            <p className="text-gray-700">
              どんなに高額の寄付をしても、2,000円の自己負担は避けられません。
              ただし、楽天ポイントなどを併用すれば実質マイナスにすることも可能です。
            </p>
          </div>
        </div>
      </section>

      {/* セクション7: おすすめ返礼品 */}
      <section id="recommended" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          初心者におすすめの返礼品
        </h2>

        <p className="text-gray-700 mb-6">
          失敗しにくく、誰でも喜ばれる人気返礼品をご紹介します。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">🍚 米（10kg）</h3>
              <span className="text-green-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              コシヒカリ、ゆめぴりか、ななつぼしなど。誰でも確実に消費できる定番中の定番。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">🧻 トイレットペーパー（96ロール）</h3>
              <span className="text-blue-600 font-bold whitespace-nowrap ml-4">12,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              必ず使う日用品。保管場所があれば失敗ゼロ。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">🥩 牛肉（切り落とし 1kg）</h3>
              <span className="text-red-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              小分けパックなら使いやすい。冷凍保存で長期保管可能。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">🍎 フルーツ（みかん 10kg）</h3>
              <span className="text-orange-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              季節のフルーツは家族で楽しめる。冬はみかん、夏はシャインマスカットが人気。
            </p>
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
            AIで返礼品選びを時短！1分で最適な返礼品が見つかる
          </h3>
          <p className="text-gray-700 mb-6">
            初めての方でも安心。AIがあなたの好みと限度額に合わせて、最適な返礼品を自動で提案します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIおすすめ診断</h4>
            <p className="text-sm text-gray-700">
              好みを学習して失敗しない返礼品を提案
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ふるさと納税はいつまでにすればいい？
            </h3>
            <p className="text-gray-700">
              A: 12月31日までに寄付を完了すれば、今年の控除として適用されます。ワンストップ特例申請書は翌年1月10日必着です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 会社員でも確定申告が必要？
            </h3>
            <p className="text-gray-700">
              A: ワンストップ特例制度を使えば確定申告は不要です。ただし、5自治体以内という条件があります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 楽天ポイントは使える？
            </h3>
            <p className="text-gray-700">
              A: 使えます。ポイントで支払った分も寄付金額に含まれるため、控除額は変わりません。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 家族の名義でも寄付できる？
            </h3>
            <p className="text-gray-700">
              A: 控除を受けるなら本人名義が必要です。配偶者や家族名義で寄付すると控除が受けられません。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ふるさと納税したら住民税は安くなる？
            </h3>
            <p className="text-gray-700">
              A: 翌年6月から住民税が安くなります。給与明細や住民税決定通知書で確認できます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 初めてだけど何を選べばいい？
            </h3>
            <p className="text-gray-700">
              A: ふるそなのAIが好みに合わせて提案します。米、日用品、肉など失敗しにくい定番返礼品がおすすめです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 返礼品はいつ届く？
            </h3>
            <p className="text-gray-700">
              A: 商品により異なります。即配送のものから数ヶ月後のものまで様々です。返礼品ページで発送時期を確認しましょう。
            </p>
          </div>
        </div>
      </section>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/furusato-nenshu-gendogaku" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">年収別ふるさと納税限度額一覧</h3>
            <p className="text-sm text-gray-600">年収300万～1000万まで完全ガイド</p>
          </Link>
          <Link href="/article/furusato-onestop-tokureiseido" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">ワンストップ特例制度の完全マニュアル</h3>
            <p className="text-sm text-gray-600">申請方法・期限・注意点を解説</p>
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
