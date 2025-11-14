'use client';

import React from 'react';
import Link from 'next/link';

export default function AiArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          AIふるさと納税で時短＆最適化｜76万点から最適な返礼品を自動提案する新サービス2025
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月4日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税の返礼品選びに2〜3時間かかって疲れていませんか？76万点以上の返礼品から最適なものを見つけるのは至難の業です。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>AIを活用したふるさと納税の新しい選び方</strong>を徹底解説。
          2025年の最新AI推薦サービスを使えば、1分であなたにぴったりの返礼品が見つかります。
        </p>
      </div>


      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#problem" className="text-primary-600 hover:underline">1. ふるさと納税の返礼品選びが大変な理由</a></li>
          <li><a href="#ai-solution" className="text-primary-600 hover:underline">2. AIが解決する3つの課題</a></li>
          <li><a href="#furusona-ai" className="text-primary-600 hover:underline">3. ふるそなのAI機能5つ</a></li>
          <li><a href="#how-to-use" className="text-primary-600 hover:underline">4. AIふるさと納税の使い方</a></li>
          <li><a href="#comparison" className="text-primary-600 hover:underline">5. 他のAIサービスとの比較</a></li>
          <li><a href="#case-study" className="text-primary-600 hover:underline">6. AI推薦の実例</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 返礼品選びが大変な理由 */}
      <section id="problem" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるさと納税の返礼品選びが大変な理由
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            選択肢過多の問題
          </h3>
          <p className="text-gray-700 mb-4">
            2025年現在、ふるさと納税の返礼品は<strong>76万点以上</strong>にのぼります。
            これは大手プラットフォームを合わせた総数であり、選択肢が多すぎることが逆に悩みの種となっています。
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
            <p className="text-sm text-gray-700">
              📊 <strong>調査データ</strong>: ふるさと納税利用者の平均的な返礼品選択時間は<strong>2〜3時間</strong>。
              特に限度額が10万円を超える方は、複数サイトを行き来して5時間以上かかることも珍しくありません。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            比較検討の困難さ
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>サイトによって掲載情報が異なる</strong> - 還元率、レビュー、在庫状況がバラバラ</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>検索条件が複雑</strong> - カテゴリ、寄付額、地域、人気度など組み合わせが膨大</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span><strong>最適配分が難しい</strong> - 限度額を5自治体で効率よく使い切る計算が煩雑</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            選んだ後の後悔
          </h3>
          <p className="text-gray-700 mb-4">
            時間をかけて選んだのに、「もっと良いものがあったかも」「本当に欲しいものではなかった」という後悔も多く聞かれます。
            情報過多により、最適な選択ができないパラドックスが発生しています。
          </p>
        </div>
      </section>

      {/* セクション2: AIが解決する3つの課題 */}
      <section id="ai-solution" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          AIが解決する3つの課題
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              課題1: 時間がかかる
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>従来</strong>: 2〜3時間の比較検討
            </p>
            <p className="text-sm text-orange-600 font-semibold">
              <strong>AI活用</strong>: 1分で最適な選択肢を提示
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              課題2: 選択肢が多すぎる
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>従来</strong>: 76万点から手作業で探す
            </p>
            <p className="text-sm text-orange-600 font-semibold">
              <strong>AI活用</strong>: あなたに合った10〜20点に絞り込み
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              課題3: 最適化が難しい
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              <strong>従来</strong>: 限度額の配分を手計算
            </p>
            <p className="text-sm text-orange-600 font-semibold">
              <strong>AI活用</strong>: ポイント還元も含めた最適ポートフォリオ
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: ふるそなのAI機能5つ */}
      <section id="furusona-ai" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ふるそなのAI機能5つ
        </h2>

        <p className="text-gray-700 mb-6">
          ふるそなは<strong>Claude API</strong>を活用した高度なパーソナライズ推薦を実現しています。
        </p>

        <div className="space-y-6 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🧮 機能1: 限度額自動計算
            </h3>
            <p className="text-gray-700 mb-3">
              年収と家族構成を入力するだけで、AIが正確な控除上限額を計算。
              住宅ローン控除や医療費控除など、複雑な条件も自動で考慮します。
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• 源泉徴収票の数値を解析</li>
              <li>• 他の控除との相互作用を計算</li>
              <li>• 安全マージン10%を自動適用</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎁 機能2: パーソナライズ返礼品推薦
            </h3>
            <p className="text-gray-700 mb-3">
              あなたの好み、家族構成、過去の選択履歴から、最適な返礼品をAIが提案。
            </p>
            <div className="bg-white p-4 rounded border border-green-200 text-sm text-gray-700">
              <p className="mb-2"><strong>推薦の仕組み</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• 家族人数に応じた量の最適化</li>
                <li>• 好みのカテゴリ学習（肉、海鮮、日用品など）</li>
                <li>• レビュー評価の高い返礼品を優先</li>
                <li>• 季節性を考慮（旬の食材、防災グッズなど）</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📊 機能3: 横断比較・還元率表示
            </h3>
            <p className="text-gray-700 mb-3">
              複数サイトの返礼品を横断検索し、実質的な還元率を自動計算。
              楽天ポイントやキャンペーン還元も含めた「本当の価値」を表示します。
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              💰 機能4: 最適ポートフォリオ自動生成
            </h3>
            <p className="text-gray-700 mb-3">
              限度額を5自治体で効率よく使い切るポートフォリオを自動生成。
              カテゴリバランス、配送時期の分散、ポイント還元率を総合的に最適化します。
            </p>
            <div className="bg-white p-4 rounded border border-yellow-200 text-sm text-gray-700">
              <p className="font-semibold mb-2">例: 限度額60,000円の場合</p>
              <ul className="space-y-1">
                <li>• 自治体A: 20,000円（米10kg）</li>
                <li>• 自治体B: 15,000円（豚肉2kg）</li>
                <li>• 自治体C: 12,000円（海鮮セット）</li>
                <li>• 自治体D: 8,000円（日用品）</li>
                <li>• 自治体E: 5,000円（フルーツ）</li>
              </ul>
              <p className="mt-2 text-orange-600 font-semibold">
                ワンストップ特例対応 ✓
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📝 機能5: 履歴管理・リマインダー
            </h3>
            <p className="text-gray-700 mb-3">
              寄付履歴を自動記録し、ワンストップ申請書の提出期限をリマインド。
              過去の選択から学習し、翌年の推薦精度が向上します。
            </p>
          </div>
        </div>

      </section>

      {/* セクション4: 使い方 */}
      <section id="how-to-use" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          AIふるさと納税の使い方（3ステップ）
        </h2>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                基本情報を入力（1分）
              </h3>
              <p className="text-gray-700 mb-3">
                年収、家族構成、好みのカテゴリを入力します。
              </p>
              <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
                <p className="mb-2">入力項目例:</p>
                <ul className="space-y-1 ml-4">
                  <li>• 年収: 500万円</li>
                  <li>• 家族構成: 配偶者あり、子ども1人（高校生）</li>
                  <li>• 好みのカテゴリ: 肉、米、日用品</li>
                  <li>• その他控除: 住宅ローン控除あり</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AIが最適な返礼品を提案（30秒）
              </h3>
              <p className="text-gray-700 mb-3">
                限度額と最適な返礼品ポートフォリオが表示されます。
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>AI提案例</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  「あなたの限度額は<span className="text-orange-600 font-bold">58,000円</span>です。
                  家族4人で楽しめる返礼品を5つご提案します。
                  楽天スーパーセール期間に申し込むと、<span className="text-orange-600 font-bold">実質負担額が−8,000円</span>になります！」
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                気に入ったものを選んで申込（1分）
              </h3>
              <p className="text-gray-700 mb-3">
                楽天ふるさと納税に直接遷移し、スムーズに申し込みが完了します。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>所要時間わずか3分</strong>で、従来2〜3時間かかっていた返礼品選びが完了します。
          </p>
        </div>
      </section>

      {/* セクション5: 他サービスとの比較 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          他のAIサービスとの比較
        </h2>

        <p className="text-gray-700 mb-6">
          2025年現在、複数のふるさと納税AIサービスが登場していますが、ふるそなには独自の強みがあります。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">サービス</th>
                <th className="border border-gray-300 px-4 py-3 text-left">AI技術</th>
                <th className="border border-gray-300 px-4 py-3 text-left">対応返礼品数</th>
                <th className="border border-gray-300 px-4 py-3 text-left">楽天連携</th>
                <th className="border border-gray-300 px-4 py-3 text-left">特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-4 py-3 font-bold">ふるそな</td>
                <td className="border border-gray-300 px-4 py-3">Claude API</td>
                <td className="border border-gray-300 px-4 py-3">楽天全商品</td>
                <td className="border border-gray-300 px-4 py-3 text-green-600">◎</td>
                <td className="border border-gray-300 px-4 py-3">ポイント還元最適化、初心者特化</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3">ふるさとチョイスAI</td>
                <td className="border border-gray-300 px-4 py-3">独自AI</td>
                <td className="border border-gray-300 px-4 py-3">76万点</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-400">×</td>
                <td className="border border-gray-300 px-4 py-3">全自治体対応、網羅性◎</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3">AIコンシェルジュ</td>
                <td className="border border-gray-300 px-4 py-3">ChatGPT</td>
                <td className="border border-gray-300 px-4 py-3">限定</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-400">×</td>
                <td className="border border-gray-300 px-4 py-3">チャット形式で対話</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            ふるそなの3つの差別化ポイント
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 text-xl">1.</span>
              <span><strong>Claude APIの高度な理解力</strong> - 複雑な家族構成や好みのニュアンスを正確に理解</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 text-xl">2.</span>
              <span><strong>楽天ポイント還元の最適化</strong> - SPU、マラソン、5と0のつく日を総合計算</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 text-xl">3.</span>
              <span><strong>初心者に最も優しいUI</strong> - 専門用語を使わず、誰でも直感的に使える設計</span>
            </li>
          </ul>
        </div>
      </section>

      {/* セクション6: 実例 */}
      <section id="case-study" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          AI推薦の実例（ペルソナ別）
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              実例1: 28歳独身会社員（年収400万円）
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">入力情報:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 家族構成: 独身（一人暮らし）</li>
                <li>• 好み: 肉、日用品</li>
                <li>• 料理頻度: 週3回程度</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">AI提案:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 限度額: <strong className="text-orange-600">42,000円</strong></li>
                <li>• 自治体A: 15,000円（豚肉1.5kg・小分けタイプ）</li>
                <li>• 自治体B: 12,000円（トイレットペーパー96ロール）</li>
                <li>• 自治体C: 8,000円（ハンバーグ20個）</li>
                <li>• 自治体D: 5,000円（洗剤セット）</li>
                <li>• 自治体E: 2,000円（ティッシュ60箱）</li>
              </ul>
              <p className="text-sm text-green-600 font-semibold mt-3">
                ✓ 一人暮らしに最適な量・保存しやすいもの・実用性重視
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              実例2: 38歳既婚エンジニア（年収700万円、配偶者あり）
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">入力情報:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 家族構成: 夫婦2人</li>
                <li>• 好み: 海鮮、米、フルーツ</li>
                <li>• こだわり: 還元率重視</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">AI提案:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 限度額: <strong className="text-orange-600">108,000円</strong></li>
                <li>• 自治体A: 30,000円（米30kg・定期便）</li>
                <li>• 自治体B: 28,000円（いくら・うに豪華セット）</li>
                <li>• 自治体C: 25,000円（シャインマスカット2kg）</li>
                <li>• 自治体D: 15,000円（ホタテ1kg）</li>
                <li>• 自治体E: 10,000円（季節のフルーツ詰め合わせ）</li>
              </ul>
              <p className="text-sm text-orange-600 font-semibold mt-3">
                楽天マラソン期間なら実質負担額 −15,000円！
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              実例3: 45歳管理職（年収1,200万円、配偶者・子ども2人）
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">入力情報:</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 家族構成: 夫婦・子ども2人（中学生・小学生）</li>
                <li>• 好み: 家電、体験型、高級食材</li>
                <li>• 住宅ローン控除: あり</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-semibold text-gray-800 mb-2">AI提案:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 限度額: <strong className="text-orange-600">280,000円</strong>（住宅ローン控除考慮）</li>
                <li>• 自治体A: 100,000円（ダイソン空気清浄機）</li>
                <li>• 自治体B: 70,000円（黒毛和牛5kg）</li>
                <li>• 自治体C: 50,000円（ホテル宿泊券）</li>
                <li>• 自治体D: 35,000円（カニ2kg）</li>
                <li>• 自治体E: 25,000円（季節の果物定期便）</li>
              </ul>
              <p className="text-sm text-green-600 font-semibold mt-3">
                ✓ 家族全員が楽しめる・高価値返礼品・体験も含む
              </p>
            </div>
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
            AIで返礼品選びを時短！1分で最適な返礼品が見つかる
          </h3>
          <p className="text-gray-700 mb-6">
            もう、2〜3時間かけて返礼品を探す必要はありません。
            ふるそなのAIが、あなたにぴったりの返礼品を自動で提案します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIおすすめ診断</h4>
            <p className="text-sm text-gray-700">
              あなたの好み・家族構成から最適な返礼品を自動提案
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q1. AIの推薦は本当に正確ですか？
            </h3>
            <p className="text-gray-700">
              A. はい。Claude APIは2025年最新の言語モデルで、複雑な条件を高精度で処理できます。
              ただし、最終的な選択はユーザー自身が行いますので、AI提案を参考に自由にカスタマイズできます。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q2. 本当に無料で使えるのですか？
            </h3>
            <p className="text-gray-700">
              A. はい、ふるそなのAI機能はすべて無料です。
              楽天ふるさと納税へのアフィリエイトで収益を得ているため、ユーザーには一切費用がかかりません。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q3. AIの推薦を変更できますか？
            </h3>
            <p className="text-gray-700">
              A. もちろんです。AI提案はあくまで参考情報です。
              気に入らない返礼品は簡単に変更でき、再度AIに提案を求めることもできます。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q4. 個人情報は安全ですか？
            </h3>
            <p className="text-gray-700">
              A. はい。入力された情報は暗号化され、AI推薦の目的のみに使用されます。
              第三者への提供は一切ありません。詳しくは
              <Link href="/privacy" className="text-primary-600 hover:underline ml-1">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Q5. 楽天以外のサイトにも対応していますか？
            </h3>
            <p className="text-gray-700">
              A. 現在は楽天ふるさと納税に特化していますが、今後他のプラットフォームへの対応も検討しています。
              楽天はポイント還元が最も充実しているため、初心者には最もおすすめです。
            </p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          まとめ：AIでふるさと納税を賢く・楽に
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            AIふるさと納税がおすすめな人
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>返礼品選びに2〜3時間かけたくない方</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>選択肢が多すぎて何を選べばいいか分からない方</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>ポイント還元を最大限活用したい方</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>初めてふるさと納税をする方</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span>限度額の配分を最適化したい方</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-6">
          2025年は「AIふるさと納税元年」とも言える年です。
          従来2〜3時間かかっていた返礼品選びが、AIを使えばわずか3分で完了します。
        </p>

        <p className="text-gray-700 mb-6">
          ふるそなは、Claude APIの高度な理解力と楽天ポイント最適化で、
          あなたに最適なふるさと納税体験を提供します。
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 <strong>12月は年間最大の商機</strong>です。
            AI推薦を使って、効率よく・賢く・お得にふるさと納税を始めましょう！
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
