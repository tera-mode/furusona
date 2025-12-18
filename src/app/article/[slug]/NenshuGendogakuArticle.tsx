'use client';

import React from 'react';
import Link from 'next/link';

export default function NenshuGendogakuArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          【2025年版】年収別ふるさと納税限度額一覧｜年収300万～1000万まで完全ガイド
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-orange-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税の<strong>限度額は年収と家族構成で決まります</strong>。
          限度額を超えて寄付すると自己負担が増えてしまうため、正確な計算が重要です。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>年収300万円から1000万円まで</strong>の家族構成別限度額を一覧表で解説。
          あなたのケースに合わせた正確な限度額がすぐわかります。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#table" className="text-primary-600 hover:underline">1. 年収別限度額早見表</a></li>
          <li><a href="#cases" className="text-primary-600 hover:underline">2. ケース別詳細解説</a></li>
          <li><a href="#over-limit" className="text-primary-600 hover:underline">3. 限度額を超えるとどうなる？</a></li>
          <li><a href="#calculate" className="text-primary-600 hover:underline">4. 正確な限度額を知る方法</a></li>
          <li><a href="#factors" className="text-primary-600 hover:underline">5. 年収以外に影響する要素</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">6. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 年収別限度額早見表 */}
      <section id="table" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          年収別限度額早見表
        </h2>

        <p className="text-gray-700 mb-6">
          給与所得者（会社員・公務員）の概算限度額です。
          自分の年収と家族構成を確認して、ふるさと納税の計画を立てましょう。
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">年収</th>
                <th className="border border-gray-300 px-4 py-3 text-left">独身・共働き</th>
                <th className="border border-gray-300 px-4 py-3 text-left">夫婦（配偶者控除あり）</th>
                <th className="border border-gray-300 px-4 py-3 text-left">夫婦+子供1人</th>
                <th className="border border-gray-300 px-4 py-3 text-left">夫婦+子供2人</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">300万円</td>
                <td className="border border-gray-300 px-4 py-3">28,000円</td>
                <td className="border border-gray-300 px-4 py-3">19,000円</td>
                <td className="border border-gray-300 px-4 py-3">19,000円</td>
                <td className="border border-gray-300 px-4 py-3">11,000円</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-4 py-3 font-bold">400万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">42,000円</td>
                <td className="border border-gray-300 px-4 py-3">33,000円</td>
                <td className="border border-gray-300 px-4 py-3">33,000円</td>
                <td className="border border-gray-300 px-4 py-3">25,000円</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">500万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">61,000円</td>
                <td className="border border-gray-300 px-4 py-3">49,000円</td>
                <td className="border border-gray-300 px-4 py-3">44,000円</td>
                <td className="border border-gray-300 px-4 py-3">40,000円</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-4 py-3 font-bold">600万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">77,000円</td>
                <td className="border border-gray-300 px-4 py-3">69,000円</td>
                <td className="border border-gray-300 px-4 py-3">60,000円</td>
                <td className="border border-gray-300 px-4 py-3">57,000円</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">700万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">108,000円</td>
                <td className="border border-gray-300 px-4 py-3">86,000円</td>
                <td className="border border-gray-300 px-4 py-3">78,000円</td>
                <td className="border border-gray-300 px-4 py-3">75,000円</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-4 py-3 font-bold">800万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">129,000円</td>
                <td className="border border-gray-300 px-4 py-3">120,000円</td>
                <td className="border border-gray-300 px-4 py-3">110,000円</td>
                <td className="border border-gray-300 px-4 py-3">107,000円</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">900万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">152,000円</td>
                <td className="border border-gray-300 px-4 py-3">141,000円</td>
                <td className="border border-gray-300 px-4 py-3">132,000円</td>
                <td className="border border-gray-300 px-4 py-3">128,000円</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-4 py-3 font-bold">1000万円</td>
                <td className="border border-gray-300 px-4 py-3 font-bold">176,000円</td>
                <td className="border border-gray-300 px-4 py-3">166,000円</td>
                <td className="border border-gray-300 px-4 py-3">157,000円</td>
                <td className="border border-gray-300 px-4 py-3">153,000円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-gray-700 mb-2">
            ⚠️ <strong>注意点</strong>
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• 給与所得者の概算値です</li>
            <li>• 住宅ローン控除や医療費控除がある場合は減額されます</li>
            <li>• 正確な計算には個別シミュレーションが必要です</li>
          </ul>
        </div>
      </section>

      {/* セクション2: ケース別詳細解説 */}
      <section id="cases" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          ケース別詳細解説
        </h2>

        <div className="space-y-8">
          {/* ケース1: 独身・共働き */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              独身・共働き世帯
            </h3>
            <p className="text-gray-700 mb-4">
              最も限度額が高いパターンです。扶養控除がないため、年収500万円なら約6万円、年収800万円なら約13万円が目安となります。
            </p>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">おすすめの使い方</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>自分の好きな返礼品を自由に選べる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>米や肉など定番商品を中心に</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>日用品で限度額を使い切るのもおすすめ</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ケース2: 専業主婦(夫)世帯 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              専業主婦(夫)世帯
            </h3>
            <p className="text-gray-700 mb-4">
              配偶者控除により限度額が減少します。年収500万円なら約4.9万円が目安です。
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-sm text-gray-700">
                ⚠️ <strong>注意点</strong><br />
                配偶者の年収が103万円を超えると配偶者控除が適用されなくなり、限度額が上がります。
              </p>
            </div>
          </div>

          {/* ケース3: 子供がいる世帯 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              子供がいる世帯
            </h3>
            <p className="text-gray-700 mb-4">
              16歳以上の子供がいる場合、扶養控除により限度額が減少します。
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left">子供の年齢</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">扶養控除</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">限度額への影響</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">15歳以下</td>
                    <td className="border border-gray-300 px-4 py-3">なし</td>
                    <td className="border border-gray-300 px-4 py-3">影響なし</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">16〜18歳</td>
                    <td className="border border-gray-300 px-4 py-3">38万円</td>
                    <td className="border border-gray-300 px-4 py-3">限度額減少</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">19〜22歳（大学生）</td>
                    <td className="border border-gray-300 px-4 py-3">63万円</td>
                    <td className="border border-gray-300 px-4 py-3">限度額大幅減少</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ケース4: 共働き夫婦 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              共働き夫婦
            </h3>
            <p className="text-gray-700 mb-4">
              夫婦それぞれが寄付できるため、合算すれば大きな金額を活用可能です。
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-gray-700">
                💡 <strong>お得な活用法</strong><br />
                夫年収600万円(限度額7.7万円) + 妻年収400万円(限度額4.2万円) = 合計11.9万円分の寄付が可能！
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              詳しくは<Link href="/article/furusato-tomobataraki-fufu" className="text-primary-600 hover:underline">「共働き夫婦のふるさと納税完全ガイド」</Link>をご覧ください。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 限度額を超えるとどうなる？ */}
      <section id="over-limit" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          限度額を超えるとどうなる？
        </h2>

        <p className="text-gray-700 mb-6">
          限度額を超えた分は控除されず、<strong>自己負担が2,000円を超えてしまいます</strong>。
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">具体例</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">✅ 限度額内の場合（年収500万円・独身）</p>
              <ul className="ml-4 mt-2 space-y-1">
                <li>• 限度額: 61,000円</li>
                <li>• 寄付額: 60,000円</li>
                <li>• 自己負担: 2,000円</li>
                <li className="text-green-600 font-bold">→ 控除額: 58,000円 ✓</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">❌ 限度額オーバーの場合</p>
              <ul className="ml-4 mt-2 space-y-1">
                <li>• 限度額: 61,000円</li>
                <li>• 寄付額: 80,000円</li>
                <li>• 自己負担: 2,000円 + 19,000円 = 21,000円</li>
                <li className="text-red-600 font-bold">→ 控除額: 59,000円（19,000円の損）</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>安全な寄付方法</strong><br />
            限度額の95%程度に抑えるのが安全です。少し余裕を持った金額で寄付しましょう。
          </p>
        </div>
      </section>

      {/* セクション4: 正確な限度額を知る方法 */}
      <section id="calculate" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          正確な限度額を知る方法
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            方法1: あなたのふるさと納税AIのAI計算機（おすすめ）
          </h3>
          <p className="text-gray-700 mb-4">
            年収と家族構成を入力するだけで、<strong>AIが正確な限度額を自動計算</strong>します。
            住宅ローン控除やiDeCoなども考慮した精密な計算が可能です。
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            方法2: 総務省のポータルサイト
          </h3>
          <p className="text-gray-700 mb-4">
            総務省のふるさと納税ポータルサイトでも簡易計算ができます。
          </p>
          <p className="text-sm text-gray-600">
            <a
              href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/deduction.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              総務省｜ふるさと納税のしくみ
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            方法3: 税理士に相談
          </h3>
          <p className="text-gray-700">
            複雑な収入がある場合や、他の控除が多い場合は税理士に相談するのが確実です。
          </p>
        </div>
      </section>

      {/* セクション5: 年収以外に影響する要素 */}
      <section id="factors" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          年収以外に限度額に影響する要素
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              住宅ローン控除
            </h3>
            <p className="text-gray-700">
              住宅ローン控除を受けている場合、ふるさと納税の限度額が減少します。
              特に住民税からの控除枠が減るため、注意が必要です。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              医療費控除
            </h3>
            <p className="text-gray-700">
              医療費控除を受ける場合も、ふるさと納税の限度額が減少します。
              確定申告が必要になる点にも注意しましょう。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              iDeCo（個人型確定拠出年金）
            </h3>
            <p className="text-gray-700">
              iDeCoの掛金は所得控除されるため、課税所得が下がり、ふるさと納税の限度額も減少します。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              その他の所得控除
            </h3>
            <p className="text-gray-700">
              生命保険料控除、地震保険料控除、寄付金控除なども限度額に影響します。
            </p>
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
            AIがあなたの正確な限度額を計算します
          </h3>
          <p className="text-gray-700 mb-6">
            年収・家族構成・各種控除を入力するだけで、AIが最適な限度額と返礼品を提案
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">正確な限度額計算</h4>
            <p className="text-sm text-gray-700">
              住宅ローン控除やiDeCoも考慮した精密計算
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              あなたの好みに合わせた最適な返礼品を提案
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
              Q: 年収はいつの年収で計算する？
            </h3>
            <p className="text-gray-700">
              A: 今年の年収（見込み）で計算します。12月のボーナスも含めた年収合計で考えましょう。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ボーナスも含める？
            </h3>
            <p className="text-gray-700">
              A: はい、ボーナスも含めた年収総額で計算します。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 副業収入がある場合は？
            </h3>
            <p className="text-gray-700">
              A: 給与所得以外の収入がある場合は、別途計算が必要です。確定申告も必要になります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 限度額ぴったりまで使うべき？
            </h3>
            <p className="text-gray-700">
              A: 少し余裕を持つのが安全です。限度額の95%程度に抑えることをおすすめします。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 年の途中で転職した場合は？
            </h3>
            <p className="text-gray-700">
              A: 今年の年収合計（転職前+転職後）で計算します。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 共働きの場合、どちらの名義で寄付する？
            </h3>
            <p className="text-gray-700">
              A: それぞれの名義で寄付可能です。夫婦合算で大きな金額を活用できます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIを使うとどう便利？
            </h3>
            <p className="text-gray-700">
              A: AIが限度額を自動計算し、最適な返礼品を提案します。楽天マラソンなどお得なタイミングも通知するため、計画的にふるさと納税ができます。
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
          <Link href="/article/furusato-beginner-guide" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">初心者向けふるさと納税完全ガイド</h3>
            <p className="text-sm text-gray-600">やり方・仕組みをわかりやすく解説</p>
          </Link>
          <Link href="/article/furusato-tomobataraki-fufu" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">共働き夫婦のふるさと納税戦略</h3>
            <p className="text-sm text-gray-600">名義・限度額・配分のコツ</p>
          </Link>
        </div>
      </section>
    </article>
    </div>
  );
}
