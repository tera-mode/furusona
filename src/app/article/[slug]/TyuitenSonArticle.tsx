'use client';

import React from 'react';
import Link from 'next/link';

export default function TyuitenSonArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ふるさと納税で損しないための注意点15選｜よくある失敗例と対策【2025年版】
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-yellow-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税は<strong>お得な制度</strong>ですが、制度を正しく理解していないと損をすることも。
          「限度額オーバー」「名義ミス」「期限忘れ」など、よくある失敗で控除が受けられないケースが多発しています。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>ふるさと納税でよくある失敗例15選と対策</strong>を徹底解説。
          初心者が陥りやすいミスを事前に知って、確実に控除を受けましょう。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#intro" className="text-primary-600 hover:underline">1. ふるさと納税で損するケース</a></li>
          <li><a href="#limit" className="text-primary-600 hover:underline">2. 限度額に関する失敗</a></li>
          <li><a href="#name" className="text-primary-600 hover:underline">3. 名義に関する失敗</a></li>
          <li><a href="#procedure" className="text-primary-600 hover:underline">4. 手続きに関する失敗</a></li>
          <li><a href="#product" className="text-primary-600 hover:underline">5. 返礼品選びの失敗</a></li>
          <li><a href="#tax" className="text-primary-600 hover:underline">6. 税金控除に関する失敗</a></li>
          <li><a href="#checklist" className="text-primary-600 hover:underline">7. 失敗を防ぐチェックリスト</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">8. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 損するケース */}
      <section id="intro" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-500">
          ふるさと納税で損するケース
        </h2>

        <p className="text-gray-700 mb-6">
          制度を正しく理解していないと、以下のような損をする可能性があります。
        </p>

        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-500">
            <h3 className="font-bold text-gray-900 mb-2">🚨 損するケース1: 控除が受けられない</h3>
            <p className="text-gray-700">
              手続きミスや期限超過で、控除が全く受けられず自己負担が全額になる。
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-500">
            <h3 className="font-bold text-gray-900 mb-2">⚠️ 損するケース2: 自己負担が2,000円を超える</h3>
            <p className="text-gray-700">
              限度額オーバーで、超過分が全額自己負担になる。
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-500">
            <h3 className="font-bold text-gray-900 mb-2">⚠️ 損するケース3: 返礼品が期待外れ</h3>
            <p className="text-gray-700">
              レビューを確認せず、写真と実物が違って後悔する。
            </p>
          </div>
        </div>
      </section>

      {/* セクション2: 限度額に関する失敗 */}
      <section id="limit" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          限度額に関する失敗
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗1: 限度額を大幅に超えて寄付
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 自己負担が2,000円を大きく超える</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 限度額を正しく計算していない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> <strong>あなたのふるさと納税AIで正確な限度額を計算</strong>しましょう。
                年収、家族構成、各種控除を入力すれば自動で計算できます。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗2: 限度額ギリギリまで使い切ろうとする
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 計算ミスで超過するリスク</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 住宅ローン控除などを考慮していない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 限度額の95%程度に抑えるのが安全です。少し余裕を持った金額で寄付しましょう。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗3: 年の途中で転職・退職したのに前年の限度額で計算
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 今年の年収が下がり、限度額オーバー</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 今年の年収見込みで計算すべき</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 現在の状況で再計算しましょう。年収が変わった場合は特に注意が必要です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: 名義に関する失敗 */}
      <section id="name" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          名義に関する失敗
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗4: 家族の名義で寄付
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 控除が受けられない</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 夫の名義で妻のカードを使う、など</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 必ず本人名義のカードと名義を統一してください。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗5: 楽天の家族アカウントを使う
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 控除が受けられない可能性</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 寄付者と決済者が異なる</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 本人のアカウントを使ってください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション4: 手続きに関する失敗 */}
      <section id="procedure" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          手続きに関する失敗
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗6: ワンストップ申請書を出し忘れ
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 控除が受けられない</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 申請書の存在を忘れる</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> <strong>あなたのふるさと納税AIのリマインダー機能で期限管理</strong>しましょう。
                1月10日必着を忘れずに！
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗7: ワンストップ申請書の期限(1月10日)を過ぎる
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 確定申告が必要になる</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 年末年始で忘れる</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 12月中に郵送完了しましょう。年末年始の郵便は遅れるため、早めの対応を。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗8: 6自治体以上に寄付してワンストップが無効に
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 確定申告をしないと控除されない</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 5自治体ルールを知らない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 寄付先を管理し、または最初から確定申告を予定しましょう。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗9: 引っ越したのに変更届を出さない
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 控除が正しく適用されない</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 変更届の存在を知らない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 引っ越したら「寄附金税額控除に係る申告特例申請事項変更届出書」を提出しましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション5: 返礼品選びの失敗 */}
      <section id="product" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-purple-500">
          返礼品選びの失敗
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗10: 写真と実物が違う
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> がっかりする</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> レビューを確認していない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> レビュー星4以上、レビュー数が多いものを選びましょう。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗11: 冷凍庫に入りきらない
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 保管できず、急いで消費</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 保管スペースを考えていない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 定期便や小分けタイプを選びましょう。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗12: 季節外れの返礼品を選ぶ
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 発送が半年後</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 発送時期を確認していない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> <strong>あなたのふるさと納税AIのAIが旬の返礼品を提案</strong>します。
                発送時期も考慮した最適な商品が見つかります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション6: 税金控除に関する失敗 */}
      <section id="tax" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          税金控除に関する失敗
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗13: 控除額を確認しない
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 正しく控除されているか不明</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> 住民税決定通知書を見ていない</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> 6月の通知書で必ず確認しましょう。「寄附金税額控除」の欄をチェック。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              ❌ 失敗14: 所得税の還付がないことに焦る
            </h3>
            <div className="mb-4">
              <p className="text-gray-700 mb-2"><strong>結果:</strong> 不安になる</p>
              <p className="text-gray-700 mb-2"><strong>原因:</strong> ワンストップは住民税のみの控除</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>✓ 対策:</strong> ワンストップは住民税のみ、確定申告は所得税+住民税から控除されます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション7: その他の失敗 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          その他の失敗
        </h2>

        <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            ❌ 失敗15: 12月31日ギリギリに寄付してシステムエラー
          </h3>
          <div className="mb-4">
            <p className="text-gray-700 mb-2"><strong>結果:</strong> 決済が完了せず、翌年扱い</p>
            <p className="text-gray-700 mb-2"><strong>原因:</strong> 駆け込み需要で混雑</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>✓ 対策:</strong> 12月中旬までに完了しましょう。12月30-31日は特に混雑します。
            </p>
          </div>
        </div>
      </section>

      {/* セクション8: チェックリスト */}
      <section id="checklist" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          失敗を防ぐためのチェックリスト
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              寄付前
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>限度額を正確に計算した</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>本人名義のクレジットカードを用意</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>返礼品のレビューを確認した</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>保管スペースを確認した</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>発送時期を確認した</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              寄付後
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>ワンストップ申請書の到着を確認</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>申請書を1月10日までに郵送</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>寄附金受領証明書を保管</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>寄付履歴を記録</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              控除確認
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>6月の住民税決定通知書で控除額を確認</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☐</span>
                <span>計算通りの控除があるか確認</span>
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
            あなたのふるさと納税AIで失敗を防ぐ
          </h3>
          <p className="text-gray-700 mb-6">
            AIが限度額計算、期限管理、寄付履歴管理をサポート。失敗を大幅に減らせます
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">正確な限度額計算</h4>
            <p className="text-sm text-gray-700">
              AIが自動で計算。限度額オーバーを防止
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⏰</div>
            <h4 className="font-bold text-gray-900 mb-2">期限リマインダー</h4>
            <p className="text-sm text-gray-700">
              ワンストップ申請の期限を通知
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📝</div>
            <h4 className="font-bold text-gray-900 mb-2">寄付履歴管理</h4>
            <p className="text-sm text-gray-700">
              どこに寄付したか一元管理
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 限度額を超えたらどうなる？
            </h3>
            <p className="text-gray-700">
              A: 超過分は自己負担（控除されない）になります。例えば限度額6万円で8万円寄付した場合、2万円は全額自己負担です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ワンストップ申請を忘れたら？
            </h3>
            <p className="text-gray-700">
              A: 確定申告で対応可能です（3月15日まで）。ただし、手間がかかります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 名義を間違えたら控除は受けられない？
            </h3>
            <p className="text-gray-700">
              A: 受けられません。寄付者と決済者の名義が一致していることが絶対条件です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 返礼品が写真と違ったら？
            </h3>
            <p className="text-gray-700">
              A: 自治体に連絡してください。ただし対応は自治体次第です。レビューを事前に確認することが重要です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 12月31日23:59に決済したら間に合う？
            </h3>
            <p className="text-gray-700">
              A: 間に合いますが、システムエラーのリスクがあります。12月中旬までに済ませるのが安全です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 控除が正しくされているか確認する方法は？
            </h3>
            <p className="text-gray-700">
              A: 6月の住民税決定通知書の「寄附金税額控除」の欄を確認してください。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIを使えば失敗しない？
            </h3>
            <p className="text-gray-700">
              A: 限度額計算、期限管理、寄付履歴管理で失敗を大幅に減らせます。
              AIが最適な返礼品も提案するため、返礼品選びの失敗も防げます。
            </p>
          </div>
        </div>
      </section>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/furusato-beginner-guide" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">初心者向けふるさと納税完全ガイド</h3>
            <p className="text-sm text-gray-600">やり方・仕組みをわかりやすく解説</p>
          </Link>
          <Link href="/article/furusato-schedule-kigen" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">ふるさと納税の期限とスケジュール</h3>
            <p className="text-sm text-gray-600">いつまでに何をすべき？完全版</p>
          </Link>
        </div>
      </section>
    </article>
    </div>
  );
}
