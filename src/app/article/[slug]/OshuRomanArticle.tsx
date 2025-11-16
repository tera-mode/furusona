'use client';

import React from 'react';
import Link from 'next/link';

export default function OshuRomanArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          奥州ロマン ふるさと納税【2025年最新】幻のりんご返礼品おすすめ5選
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月16日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-orange-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          <strong>「奥州ロマン」</strong>が2025年のふるさと納税で急上昇中！
          岩手県奥州市で育成された新品種で、<strong>糖度15〜17度超</strong>の衝撃的な甘さが話題です。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>幻のりんご「奥州ロマン」のおすすめ返礼品5選</strong>を徹底解説。
          食べ頃、特徴、選び方まで詳しくご紹介します。
        </p>
      </div>


      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#what-is" className="text-primary-600 hover:underline">1. 奥州ロマンとは？</a></li>
          <li><a href="#features" className="text-primary-600 hover:underline">2. 奥州ロマンの特徴</a></li>
          <li><a href="#esashi-apple" className="text-primary-600 hover:underline">3. 江刺りんごブランドとの関係</a></li>
          <li><a href="#osusume-henreihin" className="text-primary-600 hover:underline">4. おすすめ返礼品5選</a></li>
          <li><a href="#how-to-choose" className="text-primary-600 hover:underline">5. 失敗しない選び方</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">6. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 奥州ロマンとは */}
      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          奥州ロマンとは？
        </h2>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            <strong>奥州ロマン</strong>は、岩手県奥州市で育成された<strong>りんごの新品種</strong>です。
            正式な品種名は<strong>「高野5号」</strong>で、2016年に品種登録されました。
          </p>
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">基本情報:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• <strong>品種名</strong>: 高野5号（奥州ロマン）</li>
              <li>• <strong>交配</strong>: シナノゴールド × つがる</li>
              <li>• <strong>育成者</strong>: 高野卓郎氏（岩手県奥州市）</li>
              <li>• <strong>登録年</strong>: 2016年</li>
              <li>• <strong>主要産地</strong>: 岩手県奥州市</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            🏆 <strong>江刺りんご</strong>の一つとして知られ、2019年の盛岡市初競りでは江刺りんごが<strong>一箱140万円</strong>で取引されたこともあるブランド産地です。
          </p>
        </div>
      </section>

      {/* セクション2: 奥州ロマンの特徴 */}
      <section id="features" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          奥州ロマンの特徴
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">🍯</span>
              特徴1: 蜂蜜のような甘さ
            </h3>
            <p className="text-gray-700 mb-3">
              奥州ロマンの最大の特徴は、<strong>糖度15〜17度超</strong>という驚異的な甘さです。
              酸味が非常に少なく、蜂蜜のようなまろやかで上品な甘みが楽しめます。
            </p>
            <div className="bg-orange-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                一般的なりんごの糖度は12〜14度程度。奥州ロマンはその1.5倍近い甘さを誇ります。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">✨</span>
              特徴2: シャキシャキ食感
            </h3>
            <p className="text-gray-700 mb-3">
              果肉がしっかりと硬く、<strong>シャキシャキとした食感</strong>が特徴です。
              噛むたびにジューシーな果汁があふれ出ます。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">📅</span>
              特徴3: 貯蔵性に優れる
            </h3>
            <p className="text-gray-700 mb-3">
              奥州ロマンは<strong>貯蔵性が非常に高い</strong>のも特徴です。
              収穫直後よりも貯蔵してから食べる方が美味しくなります。
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">収穫時期と食べ頃:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• <strong>収穫時期</strong>: 10月中旬〜下旬</li>
                <li>• <strong>最適な食べ頃</strong>: 2月〜3月</li>
                <li>• <strong>理由</strong>: 貯蔵により甘みが熟成され、より美味しくなる</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">🎨</span>
              特徴4: 美しい外観
            </h3>
            <p className="text-gray-700">
              果皮は赤く美しく着色し、表面にはワックスがしっかりと出ています。
              見た目も華やかで、ギフトにも最適です。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 江刺りんごブランド */}
      <section id="esashi-apple" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          江刺りんごブランドとの関係
        </h2>

        <p className="text-gray-700 mb-4">
          奥州ロマンは、<strong>江刺りんご</strong>ブランドの一つとして知られています。
          江刺りんごは岩手県奥州市江刺地区で生産される高品質りんごの総称で、全国的に高い評価を受けています。
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-green-200 mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            江刺りんごの特徴
          </h3>
          <ul className="text-gray-700 space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>厳しい基準</strong>: 糖度、色づき、大きさなど厳格な選別基準</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>恵まれた環境</strong>: 昼夜の寒暖差が大きく、りんご栽培に最適</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>高い評価</strong>: 2019年の初競りで一箱140万円の記録</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span><strong>ブランド品種</strong>: サンふじ、奥州ロマンなど多数</span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
          <p className="text-sm text-gray-700">
            🍎 奥州ロマンは江刺りんごの中でも<strong>新しい品種</strong>で、まだ栽培面積が少ないため「幻のりんご」とも呼ばれています。
          </p>
        </div>
      </section>

      {/* セクション4: おすすめ返礼品 */}
      <section id="osusume-henreihin" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          おすすめ返礼品5選
        </h2>

        <p className="text-gray-700 mb-6">
          岩手県奥州市のふるさと納税では、江刺りんごを中心に様々なりんご返礼品が用意されています。
          奥州ロマンは希少品種のため、江刺りんごの詰め合わせや食べ比べセットに含まれることが多いです。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
                  1位
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  <a 
                    href="https://search.rakuten.co.jp/search/mall/%E5%B2%A9%E6%89%8B%E7%9C%8C+%E5%A5%A5%E5%B7%9E%E5%B8%82+%E3%82%8A%E3%82%93%E3%81%94+%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline"
                  >
                    奥州市産江刺りんご サンふじ（秀品） 5kg
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">最高級ブランド・化粧箱入り</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
                15,000円
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              江刺りんごの代表格「サンふじ」の秀品。厳しい基準をクリアした最高級品。
              贈答用にも最適な銀色の化粧箱入り。
            </p>
            <div className="bg-orange-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>おすすめポイント</strong>: 江刺りんごブランドの安定した美味しさ。初めての方にも最適。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-orange-400 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
                  2位
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  <a 
                    href="https://search.rakuten.co.jp/search/mall/%E5%B2%A9%E6%89%8B%E7%9C%8C+%E5%A5%A5%E5%B7%9E%E5%B8%82+%E3%82%8A%E3%82%93%E3%81%94+%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline"
                  >
                    奥州市産 江刺りんご 品種おまかせ 10kg
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">大容量・コスパ◎</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
                20,000円
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              旬の江刺りんごをたっぷり10kg。品種おまかせなので、時期により奥州ロマンが入ることも。
              家族で楽しむのに最適な大容量。
            </p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>おすすめポイント</strong>: 量重視の方に。時期によって様々な品種が楽しめる。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-orange-300 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
                  3位
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  <a 
                    href="https://search.rakuten.co.jp/search/mall/%E5%B2%A9%E6%89%8B%E7%9C%8C+%E5%A5%A5%E5%B7%9E%E5%B8%82+%E3%82%8A%E3%82%93%E3%81%94+%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline"
                  >
                    江刺りんご 食べ比べセット 3kg（3品種×1kg）
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">複数品種を楽しめる</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
                12,000円
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              サンふじ、シナノゴールド、奥州ロマンなど、複数品種を1kgずつ詰め合わせ。
              それぞれの特徴を食べ比べできる贅沢なセット。
            </p>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>おすすめポイント</strong>: 奥州ロマンを確実に試したい方に。複数品種の違いを楽しめる。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-gray-400 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
                  4位
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  <a 
                    href="https://search.rakuten.co.jp/search/mall/%E5%B2%A9%E6%89%8B%E7%9C%8C+%E5%A5%A5%E5%B7%9E%E5%B8%82+%E3%82%8A%E3%82%93%E3%81%94+%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline"
                  >
                    奥州市産 りんごジュース 1L×6本
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">加工品・長期保存可能</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
                10,000円
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              江刺りんご100%使用のストレートジュース。奥州ロマンを含む複数品種をブレンド。
              濃厚な甘みと香りが楽しめます。
            </p>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>おすすめポイント</strong>: 長期保存可能。生のりんごが苦手な方や、お子様にも。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block bg-gray-400 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
                  5位
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  <a 
                    href="https://search.rakuten.co.jp/search/mall/%E5%B2%A9%E6%89%8B%E7%9C%8C+%E5%A5%A5%E5%B7%9E%E5%B8%82+%E3%82%8A%E3%82%93%E3%81%94+%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline"
                  >
                    江刺りんご 訳あり品 10kg
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">コスパ最強・家庭用</p>
              </div>
              <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
                10,000円
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              小傷や色むらなどで規格外となった訳あり品。味は正規品と変わらず、コスパ抜群。
              ジュースやお菓子作りにも最適。
            </p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>おすすめポイント</strong>: 味重視でコスパを求める方に。加工用にも◎
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション5: 失敗しない選び方 */}
      <section id="how-to-choose" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          失敗しない選び方
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント1: 受け取り時期を確認
            </h3>
            <p className="text-gray-700 mb-3">
              奥州ロマンの収穫時期は<strong>10月中旬〜下旬</strong>です。
              ただし、<strong>食べ頃は2〜3月</strong>なので、貯蔵後に発送される返礼品がおすすめです。
            </p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                申し込み時に「発送時期」の記載を必ず確認しましょう。
                「2月以降発送」などと記載されている返礼品は、熟成後の美味しいりんごが届きます。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント2: 用途に合わせて等級を選ぶ
            </h3>
            <div className="space-y-2">
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">秀品:</p>
                <p className="text-sm text-gray-700">
                  最高級品。化粧箱入りでギフトに最適。見た目も味も完璧。
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">優品:</p>
                <p className="text-sm text-gray-700">
                  家庭用として十分な品質。味は秀品とほぼ同じでコスパ◎
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm font-semibold text-gray-800 mb-1">訳あり:</p>
                <p className="text-sm text-gray-700">
                  見た目に難ありだが味は変わらず。加工用や家庭用に最適。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ポイント3: 保存方法を理解する
            </h3>
            <p className="text-gray-700 mb-3">
              奥州ロマンは貯蔵性が高いため、適切に保存すれば長く楽しめます。
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">おすすめ保存方法:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• <strong>冷蔵保存</strong>: キッチンペーパーで包み、ポリ袋に入れて野菜室へ</li>
                <li>• <strong>常温保存</strong>: 冬季限定。風通しの良い冷暗所で</li>
                <li>• <strong>注意点</strong>: 高温・暖房の効いた部屋は避ける</li>
                <li>• <strong>保存期間</strong>: 冷蔵で2〜3ヶ月程度</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* セクション6: よくある質問 */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          よくある質問
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Q1: 奥州ロマンはいつ届きますか？
            </h3>
            <p className="text-gray-700">
              収穫時期は10月中旬〜下旬ですが、<strong>最適な食べ頃は2〜3月</strong>です。
              多くの返礼品は貯蔵後に発送されるため、申し込み時に発送時期を確認しましょう。
              早期申し込みで収穫直後に届く場合は、自宅で冷蔵保存して2〜3月頃に食べるのがおすすめです。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Q2: サンふじとの違いは？
            </h3>
            <p className="text-gray-700">
              サンふじは甘みと酸味のバランスが良く、蜜が入りやすいのが特徴です。
              一方、<strong>奥州ロマンは酸味が非常に少なく、蜂蜜のようなまろやかな甘さ</strong>が特徴。
              糖度も奥州ロマンの方が高い傾向にあります。食べ比べセットで両方試すのもおすすめです。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Q3: なぜ「幻のりんご」と呼ばれるのですか？
            </h3>
            <p className="text-gray-700">
              2016年に品種登録された新しい品種で、<strong>栽培面積がまだ少ない</strong>ためです。
              2020年時点で栽培者25名、栽培面積32.9a（約1,000坪）と希少性が高く、
              市場に出回る量が限られているため「幻のりんご」と呼ばれています。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Q4: 確実に奥州ロマンを入手する方法は？
            </h3>
            <p className="text-gray-700">
              <strong>品種指定の返礼品</strong>または<strong>食べ比べセット</strong>を選ぶのが確実です。
              「品種おまかせ」の返礼品は、時期によっては奥州ロマンが入らないこともあります。
              返礼品の説明文で「奥州ロマン入り」「食べ比べ」などの記載があるものを選びましょう。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Q5: 奥州ロマンに向いている食べ方は？
            </h3>
            <p className="text-gray-700 mb-3">
              <strong>そのまま生で食べるのが一番おすすめ</strong>です。
              酸味が少なく甘みが強いため、奥州ロマンの特徴を最も楽しめます。
            </p>
            <div className="bg-orange-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                その他の楽しみ方: りんごジュース、アップルパイ、ジャムなどの加工品にしても美味。
                ただし、加工すると特徴的な食感が失われるため、まずは生で味わってみてください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-300">
          まとめ
        </h2>

        <div className="bg-orange-50 p-6 rounded-lg mb-6">
          <p className="text-gray-800 mb-4">
            <strong>奥州ロマン</strong>は、糖度15〜17度超の衝撃的な甘さを誇る幻のりんごです。
            岩手県奥州市が誇る江刺りんごブランドの新品種で、まだ栽培面積が少なく希少性が高いのが特徴。
          </p>
          <ul className="text-gray-700 space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>蜂蜜のような甘さ</strong> - 糖度15〜17度超</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>シャキシャキ食感</strong> - ジューシーで爽快</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>貯蔵性抜群</strong> - 2〜3月が食べ頃</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>希少品種</strong> - まだ市場に少ない幻のりんご</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          ふるさと納税なら、この希少な奥州ロマンを含む江刺りんごを、
          税控除を受けながらお得に楽しむことができます。
          2025年のトレンド急上昇中の今が、奥州ロマンを試すチャンスです！
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
          <p className="text-sm text-gray-700">
            🍎 <strong>ふるそなのAI機能</strong>なら、あなたの好みや家族構成に合わせて、
            最適なりんご返礼品を自動で提案します。奥州ロマンを含む様々な品種から選べます。
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
            href="/article/furusato-osusume-henreihin"
            className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              ふるさと納税おすすめ返礼品ランキング
            </h3>
            <p className="text-sm text-gray-600">
              2025年人気カテゴリー別に紹介
            </p>
          </Link>
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
        </div>
      </section>

      {/* 情報源 */}
      <div className="mt-12 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600 mb-2">
          <strong>参考情報:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • <a
              href="https://www.city.oshu.iwate.jp/hurusato_tax/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              奥州市ふるさと納税サイト
            </a>
          </li>
          <li>
            • <a
              href="https://foodslink.jp/syokuzaihyakka/syun/fruit/apple-o-roman.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              旬の果物百科 - 奥州ロマン
            </a>
          </li>
          <li>
            • <a
              href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              総務省｜ふるさと納税ポータルサイト
            </a>
          </li>
        </ul>
      </div>
    </article>
    </div>
  );
}
