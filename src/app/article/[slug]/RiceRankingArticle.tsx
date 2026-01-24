'use client';

import React from 'react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export default function RiceRankingArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ふるさと納税 米ランキング20選【2025年最新】コスパ最強・品種別・定期便おすすめ
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月4日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税の返礼品で<strong>最も人気が高いのが「米」</strong>です。
          2024年は価格高騰の影響で、米の検索が<strong>173%増加</strong>しました。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>コスパ最強の米ランキング20選</strong>を品種別・寄付額別・定期便に分けて詳しくご紹介。
          あなたにぴったりの米がきっと見つかります。
        </p>
      </div>

      <AdBanner />

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#why-popular" className="text-primary-600 hover:underline">1. なぜふるさと納税で米が人気なのか</a></li>
          <li><a href="#how-to-choose" className="text-primary-600 hover:underline">2. 失敗しない米の選び方</a></li>
          <li><a href="#ranking-variety" className="text-primary-600 hover:underline">3. 品種別おすすめランキング</a></li>
          <li><a href="#ranking-amount" className="text-primary-600 hover:underline">4. 寄付額別ランキング</a></li>
          <li><a href="#ranking-regular" className="text-primary-600 hover:underline">5. 定期便おすすめランキング</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">6. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: なぜ人気か */}
      <section id="why-popular" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          なぜふるさと納税で米が人気なのか
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由1: 実用性が抜群
          </h3>
          <p className="text-gray-700 mb-4">
            米は日本人の主食であり、<strong>どの家庭でも確実に消費</strong>します。
            「返礼品選びで失敗したくない」という初心者にも最適です。
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>消費期限が長い</strong><br />
              精米後も適切に保存すれば1〜2ヶ月は美味しく食べられます。
              玄米なら半年以上保存可能。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由2: コスパが最強
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">寄付額</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">返礼品量</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">市場価格（概算）</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">還元率</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3">10,000円</td>
                  <td className="border border-gray-300 px-4 py-3">10kg</td>
                  <td className="border border-gray-300 px-4 py-3">約4,000円</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">40%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">15,000円</td>
                  <td className="border border-gray-300 px-4 py-3">15kg</td>
                  <td className="border border-gray-300 px-4 py-3">約6,000円</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">40%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">20,000円</td>
                  <td className="border border-gray-300 px-4 py-3">20kg</td>
                  <td className="border border-gray-300 px-4 py-3">約8,000円</td>
                  <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">40%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">
            ※ 市場価格は品種やブランドにより変動します
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            理由3: 2024年の価格高騰
          </h3>
          <p className="text-gray-700 mb-4">
            猛暑や物流コストの上昇により、2024年の米価格は<strong>前年比20〜30%上昇</strong>しました。
            スーパーで買うよりも、ふるさと納税の方が圧倒的にお得になっています。
          </p>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="text-sm font-semibold text-gray-800 mb-2">価格高騰の影響:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• ふるさと納税の米検索が173%増</li>
              <li>• 定期便の需要が急増（安定供給）</li>
              <li>• 複数品種の食べ比べも人気</li>
            </ul>
          </div>
        </div>
      </section>

      {/* セクション2: 選び方 */}
      <section id="how-to-choose" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          失敗しない米の選び方
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント1: 家族構成で量を決める
            </h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">目安:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 一人暮らし: 5kg/月（年間60kg）</li>
                <li>• 夫婦2人: 10kg/月（年間120kg）</li>
                <li>• 夫婦+子ども2人: 15〜20kg/月（年間180〜240kg）</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                ※ 外食頻度や弁当の有無で変動します
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント2: 品種の特徴を理解する
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">コシヒカリ系（粘り強い）</h4>
                <p className="text-sm text-gray-700">
                  粘りと甘みが強い。おにぎり、寿司、和食全般に最適。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">ななつぼし系（あっさり）</h4>
                <p className="text-sm text-gray-700">
                  粘りが少なくさっぱり。チャーハン、カレー、丼ものに合う。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">つや姫系（バランス型）</h4>
                <p className="text-sm text-gray-700">
                  粘りと甘みのバランスが良い。冷めても美味しい。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント3: 精米・玄米を選ぶ
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">精米（白米）</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>メリット:</strong> すぐ食べられる、美味しい
                </p>
                <p className="text-sm text-gray-700">
                  <strong>デメリット:</strong> 保存期間が短い（1〜2ヶ月）
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2">玄米</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>メリット:</strong> 長期保存可能（6ヶ月以上）、栄養豊富
                </p>
                <p className="text-sm text-gray-700">
                  <strong>デメリット:</strong> 炊き方が難しい、精米機が必要
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント4: 定期便 vs 一括
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>定期便</strong>: 新鮮な米が毎月届く。保管場所が少なくて済む。</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>一括</strong>: 手続きが1回で済む。まとめて受け取りたい方向け。</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* セクション3: 品種別ランキング */}
      <section id="ranking-variety" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          品種別おすすめランキング
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🥇 コシヒカリ系（人気No.1）
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">1位: 新潟県産コシヒカリ 10kg</h4>
                  <p className="text-sm text-gray-600 mt-1">特A評価の最高級米</p>
                </div>
                <span className="text-green-600 font-bold whitespace-nowrap ml-4">10,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                粘りと甘みの最高峰。おにぎり、寿司に最適。冷めても美味しい。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">2位: 新潟県魚沼産コシヒカリ 5kg</h4>
                  <p className="text-sm text-gray-600 mt-1">ブランド米の最高峰</p>
                </div>
                <span className="text-green-600 font-bold whitespace-nowrap ml-4">15,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                魚沼産は別格の美味しさ。特別な日やギフトにも。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">3位: 富山県産コシヒカリ 20kg</h4>
                  <p className="text-sm text-gray-600 mt-1">大容量でコスパ◎</p>
                </div>
                <span className="text-green-600 font-bold whitespace-nowrap ml-4">20,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                家族4人以上におすすめ。まとめて受け取りたい方に。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🥈 ななつぼし系（あっさり派に人気）
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">1位: 北海道産ななつぼし 10kg</h4>
                  <p className="text-sm text-gray-600 mt-1">コスパ最強・冷めても美味しい</p>
                </div>
                <span className="text-blue-600 font-bold whitespace-nowrap ml-4">10,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                粘りが少なくさっぱり。チャーハン、カレーに最適。お弁当にも◎
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">2位: 北海道産ななつぼし 15kg</h4>
                  <p className="text-sm text-gray-600 mt-1">大容量でさらにお得</p>
                </div>
                <span className="text-blue-600 font-bold whitespace-nowrap ml-4">15,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                夫婦2人で月15kg消費する方に最適。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🥉 つや姫・ゆめぴりか系（高級志向）
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">1位: 山形県産つや姫 10kg</h4>
                  <p className="text-sm text-gray-600 mt-1">甘みと粘りのバランス最高</p>
                </div>
                <span className="text-purple-600 font-bold whitespace-nowrap ml-4">12,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                上品な甘みと粘り。冷めても美味しく、お弁当に最適。
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">2位: 北海道産ゆめぴりか 10kg</h4>
                  <p className="text-sm text-gray-600 mt-1">もちもち食感が人気</p>
                </div>
                <span className="text-purple-600 font-bold whitespace-nowrap ml-4">12,000円</span>
              </div>
              <p className="text-sm text-gray-700">
                粘りが強く、甘みも豊か。和食全般に合う。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🌟 食べ比べセット（迷ったらコレ）
          </h3>
          <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">人気3品種食べ比べセット（各2kg×3種）</h4>
                <p className="text-sm text-gray-600 mt-1">コシヒカリ・ななつぼし・つや姫</p>
              </div>
              <span className="text-yellow-600 font-bold whitespace-nowrap ml-4">10,000円</span>
            </div>
            <p className="text-sm text-gray-700">
              初めてふるさと納税で米を選ぶ方におすすめ。好みの品種が見つかる。
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: 寄付額別ランキング */}
      <section id="ranking-amount" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          寄付額別ランキング
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              💰 10,000円（一番人気）
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">北海道産ななつぼし 10kg</h4>
                <p className="text-sm text-gray-700">コスパ最強。一人暮らし〜夫婦2人に最適。</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">新潟県産コシヒカリ 10kg</h4>
                <p className="text-sm text-gray-700">ブランド米の定番。粘りと甘みが強い。</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">宮城県産ひとめぼれ 10kg</h4>
                <p className="text-sm text-gray-700">バランス型で食べやすい。初心者向け。</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              💰 15,000円
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">北海道産ななつぼし 15kg</h4>
                <p className="text-sm text-gray-700">夫婦2人で月15kg消費する方に。</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">新潟県魚沼産コシヒカリ 5kg</h4>
                <p className="text-sm text-gray-700">最高級米を少量で楽しみたい方に。</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              💰 20,000円
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">北海道産ななつぼし 20kg</h4>
                <p className="text-sm text-gray-700">家族4人以上。まとめて受け取りたい方に。</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">新潟県産コシヒカリ 20kg</h4>
                <p className="text-sm text-gray-700">ブランド米を大容量で。コスパ◎</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション5: 定期便ランキング */}
      <section id="ranking-regular" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          定期便おすすめランキング
        </h2>

        <p className="text-gray-700 mb-6">
          定期便は、<strong>毎月新鮮な米が届く</strong>ため、保管場所が少なくて済み、常に美味しい米を食べられます。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">1位: 北海道産ななつぼし 5kg×3ヶ月</h3>
                <p className="text-sm text-gray-600 mt-1">一人暮らし・夫婦2人に最適</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">15,000円</span>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2">
                毎月5kgずつ届くので、常に新鮮。保管場所も取らない。
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-1">配送スケジュール:</p>
              <p className="text-sm text-gray-600">
                1月・2月・3月にそれぞれ5kg配送（申込月の翌月から）
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">2位: 新潟県産コシヒカリ 10kg×6ヶ月</h3>
                <p className="text-sm text-gray-600 mt-1">家族3〜4人に最適</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">60,000円</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              毎月10kgずつ半年間届く。年間60kgで家族3〜4人に最適。
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                限度額が大きい方におすすめ。年間を通じて安定供給。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">3位: 季節の品種食べ比べ 5kg×4ヶ月</h3>
                <p className="text-sm text-gray-600 mt-1">毎月違う品種が楽しめる</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">20,000円</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              コシヒカリ、ななつぼし、つや姫、ゆめぴりかが月替わりで届く。
            </p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                色々な品種を試したい方に。飽きずに楽しめる。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">4位: 新米定期便 10kg×12ヶ月</h3>
                <p className="text-sm text-gray-600 mt-1">1年間の安定供給</p>
              </div>
              <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">120,000円</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              毎月10kgずつ1年間。収穫時期に合わせて新米を配送。
            </p>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                限度額が大きい高所得者向け。年間120kgで家族4人以上に最適。
              </p>
            </div>
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
            家族にぴったりの米が見つかる！AIが最適な量と品種を提案
          </h3>
          <p className="text-gray-700 mb-6">
            家族構成と月の消費量から、最適な米の量・品種・定期便をAIが自動計算。
            2024年の価格高騰で需要急増中の米を、お得にゲットしましょう。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              家族構成に合わせた最適な米の量と品種を提案
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

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q1. 米の保存方法は？
            </h3>
            <p className="text-gray-700">
              A. <strong>冷暗所で密閉保存</strong>が基本です。
              夏場は冷蔵庫の野菜室が最適。直射日光や高温多湿を避けましょう。
              精米後は1〜2ヶ月、玄米は6ヶ月以上保存できます。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q2. 玄米と精米、どっちがいい？
            </h3>
            <p className="text-gray-700">
              A. <strong>すぐ食べるなら精米、長期保存なら玄米</strong>がおすすめです。
              玄米は精米機があれば、必要な分だけ精米できて新鮮です。
              栄養面でも玄米の方が優れていますが、炊き方が難しいのが難点です。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q3. 定期便の配送時期は選べる？
            </h3>
            <p className="text-gray-700">
              A. 多くの自治体では<strong>配送開始月を選択可能</strong>です。
              例えば、12月に申し込んで、1月から配送開始といった指定ができます。
              ただし、配送日の細かい指定はできない場合が多いので、自治体に確認しましょう。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q4. 一人暮らしで20kg頼んでも大丈夫？
            </h3>
            <p className="text-gray-700">
              A. 保管場所があれば大丈夫ですが、<strong>定期便の方がおすすめ</strong>です。
              20kgだと保管に場所を取り、鮮度も落ちやすいです。
              一人暮らしなら「5kg×3ヶ月」などの定期便が便利です。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q5. 無洗米はある？
            </h3>
            <p className="text-gray-700">
              A. はい、<strong>無洗米も返礼品として提供</strong>されています。
              研ぐ手間が省け、水道代も節約できます。
              「無洗米」で検索すると見つかります。
            </p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          まとめ：米は失敗しない鉄板返礼品
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            米を選ぶメリット
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>実用性抜群</strong> - 確実に消費できる</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>コスパ最強</strong> - 還元率40%以上</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>2024年は特にお得</strong> - 価格高騰で検索173%増</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>定期便で新鮮</strong> - 保管場所不要</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>選択肢が豊富</strong> - 品種、量、定期便など</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          ふるさと納税で米を選べば、まず失敗しません。
          初心者から上級者まで、誰もが満足できる鉄板返礼品です。
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            🍚 <strong>あなたのふるさと納税AIのAI機能</strong>なら、家族構成と消費量から、
            最適な米の量と品種を自動で提案します。
          </p>
        </div>
      </section>

      <AdBanner />

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-300">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/article/furusato-osusume-henreihin"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税おすすめ返礼品ランキング
            </h3>
            <p className="text-sm text-gray-600">
              2025年人気カテゴリー別に紹介
            </p>
          </Link>
          <Link
            href="/article/furusato-rakuten-point"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              楽天ポイント30%還元を狙う
            </h3>
            <p className="text-sm text-gray-600">
              SPU攻略とキャンペーン活用術
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
