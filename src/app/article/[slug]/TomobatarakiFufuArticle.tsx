'use client';

import React from 'react';
import Link from 'next/link';

export default function TomobatarakiFufuArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          共働き夫婦のふるさと納税完全ガイド｜名義・限度額・おすすめの活用法【2025年版】
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          共働き夫婦なら、<strong>夫婦それぞれが寄付できる</strong>ため、合算すれば大きな金額を活用可能です。
          でも、名義の扱いや限度額の計算方法がわからないという方も多いのではないでしょうか？
        </p>
        <p className="text-gray-800">
          この記事では、<strong>共働き夫婦がふるさと納税を最大限活用する方法</strong>を徹底解説。
          夫婦それぞれの名義で寄付する際の注意点、合算限度額の計算、おすすめの配分戦略まで詳しく紹介します。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#double-benefit" className="text-primary-600 hover:underline">1. 共働き夫婦は2倍お得</a></li>
          <li><a href="#rules" className="text-primary-600 hover:underline">2. 基本ルール</a></li>
          <li><a href="#calculation" className="text-primary-600 hover:underline">3. 限度額計算例</a></li>
          <li><a href="#name" className="text-primary-600 hover:underline">4. 名義に関するQ&A</a></li>
          <li><a href="#strategy" className="text-primary-600 hover:underline">5. おすすめの配分戦略</a></li>
          <li><a href="#procedures" className="text-primary-600 hover:underline">6. 確定申告・ワンストップ</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 共働き夫婦は2倍お得 */}
      <section id="double-benefit" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          共働き夫婦はふるさと納税が2倍お得
        </h2>

        <p className="text-gray-700 mb-6">
          共働き夫婦の最大のメリットは、<strong>夫婦それぞれが独立して寄付できる</strong>こと。
          合算すれば、片働き世帯の2倍近い金額を活用できます。
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            💡 <strong>合算例</strong><br />
            夫年収600万円(限度額7.7万円) + 妻年収400万円(限度額4.2万円) = <strong>合計11.9万円</strong>分の寄付が可能！
          </p>
        </div>
      </section>

      {/* セクション2: 基本ルール */}
      <section id="rules" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          共働き夫婦の基本ルール
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ルール1: 名義は必ず分ける
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>夫は夫の名義、妻は妻の名義で寄付</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>クレジットカードも本人名義を使う</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>配送先は同じ住所でOK</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ルール2: それぞれが限度額を計算
            </h3>
            <p className="text-gray-700">
              夫の年収 → 夫の限度額、妻の年収 → 妻の限度額。
              合算した限度額で寄付が可能です。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ルール3: 控除も個別に受ける
            </h3>
            <p className="text-gray-700">
              夫の寄付 → 夫の税金から控除、妻の寄付 → 妻の税金から控除されます。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 限度額計算例 */}
      <section id="calculation" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          共働き夫婦の限度額計算例
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ケース1: 夫年収600万円、妻年収400万円
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-bold">夫の限度額</td>
                    <td className="border border-gray-300 px-4 py-3">約77,000円</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-bold">妻の限度額</td>
                    <td className="border border-gray-300 px-4 py-3">約42,000円</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-bold">合計</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">約119,000円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ケース2: 夫年収800万円、妻年収500万円
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-bold">夫の限度額</td>
                    <td className="border border-gray-300 px-4 py-3">約129,000円</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-bold">妻の限度額</td>
                    <td className="border border-gray-300 px-4 py-3">約61,000円</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-bold">合計</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">約190,000円</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>計算のポイント</strong><br />
              扶養控除は適用しません。共働きなので独身・共働きの欄を参照してください。
              あなたのふるさと納税AIなら夫婦それぞれの限度額を自動計算します。
            </p>
          </div>
        </div>
      </section>

      {/* セクション4: 名義に関するQ&A */}
      <section id="name" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          名義に関するよくある質問
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              Q: 夫名義で妻のクレジットカードを使っていい？
            </h3>
            <p className="text-gray-700">
              A: <strong>ダメです</strong>。必ず本人名義のカードを使ってください。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              Q: 夫の年収が高いので、全額夫名義で寄付したい
            </h3>
            <p className="text-gray-700">
              A: <strong>OKです</strong>。ただし妻の限度額は使えなくなります。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              Q: 返礼品は妻宛に送っていい？
            </h3>
            <p className="text-gray-700">
              A: <strong>OKです</strong>。配送先は自由に設定できます。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              Q: 楽天ポイントは誰のアカウントを使う？
            </h3>
            <p className="text-gray-700">
              A: <strong>寄付する本人のアカウント</strong>を使ってください。
            </p>
          </div>
        </div>
      </section>

      {/* セクション5: おすすめの配分戦略 */}
      <section id="strategy" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          共働き夫婦におすすめの配分戦略
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              戦略1: 年収比で配分
            </h3>
            <p className="text-gray-700 mb-4">
              例: 夫6:妻4の比率で年収がある場合、限度額も同じ比率になります。
              バランスよく返礼品を選べます。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              戦略2: カテゴリで分担
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>夫: 肉、酒、米などの食品</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>妻: 日用品、フルーツ、スイーツ</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>好みに合わせて選びやすい</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              戦略3: 限度額を使い切る
            </h3>
            <p className="text-gray-700">
              年収の高い方を優先し、余った分をもう一方で使う。合算で最大限活用できます。
            </p>
          </div>
        </div>
      </section>

      {/* セクション6: 確定申告・ワンストップ */}
      <section id="procedures" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          共働き夫婦の確定申告・ワンストップ
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ワンストップ特例を使う場合
            </h3>
            <p className="text-gray-700 mb-4">
              夫と妻、それぞれが5自治体以内なら、ワンストップ特例が使えます。
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-gray-700">
                💡 夫5自治体、妻5自治体 = <strong>合計10自治体OK</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              確定申告をする場合
            </h3>
            <p className="text-gray-700 mb-4">
              夫と妻、それぞれが個別に申告します。寄附金受領証明書も個別に管理してください。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              片方だけ確定申告する場合
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>夫: 確定申告（6自治体以上）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>妻: ワンストップ特例（5自治体以内）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>これも可能です</span>
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
            夫婦それぞれの限度額を一括管理
          </h3>
          <p className="text-gray-700 mb-6">
            AIが夫婦それぞれの限度額を計算し、最適な返礼品を提案します
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">夫婦の限度額を一括計算</h4>
            <p className="text-sm text-gray-700">
              それぞれの年収と控除を入力して自動計算
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              家族の好みに合わせた最適な返礼品を提案
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 夫婦で同じ自治体に寄付できる？
            </h3>
            <p className="text-gray-700">
              A: できます。それぞれ個別の寄付として扱われます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 返礼品は1つの住所に届けられる？
            </h3>
            <p className="text-gray-700">
              A: 届けられます。配送先は自由に設定できます。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 片方だけ寄付してもいい？
            </h3>
            <p className="text-gray-700">
              A: いいです。もう片方は寄付しなくてもOKです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 楽天の家族アカウントは使える？
            </h3>
            <p className="text-gray-700">
              A: 使えません。本人名義のアカウントが必要です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 産休中でも寄付できる？
            </h3>
            <p className="text-gray-700">
              A: できますが、限度額は今年の年収で計算されるため下がります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 扶養に入っている場合は？
            </h3>
            <p className="text-gray-700">
              A: 扶養される側は所得税・住民税を納めていないため、寄付できません。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIで夫婦の寄付を一緒に管理できる？
            </h3>
            <p className="text-gray-700">
              A: できます。それぞれアカウントを作成し、家族として管理できます。
            </p>
          </div>
        </div>
      </section>

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/furusato-nenshu-gendogaku" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">年収別ふるさと納税限度額一覧</h3>
            <p className="text-sm text-gray-600">年収300万～1000万まで完全ガイド</p>
          </Link>
          <Link href="/article/furusato-beginner-guide" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">初心者向けふるさと納税完全ガイド</h3>
            <p className="text-sm text-gray-600">やり方・仕組みをわかりやすく解説</p>
          </Link>
        </div>
      </section>
    </article>
    </div>
  );
}
