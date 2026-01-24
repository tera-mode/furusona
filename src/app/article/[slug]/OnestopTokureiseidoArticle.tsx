'use client';

import React from 'react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export default function OnestopTokureiseidoArticle() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ふるさと納税ワンストップ特例制度とは？申請方法・期限・注意点を完全解説【2025年版】
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ワンストップ特例制度を使えば、<strong>確定申告不要</strong>でふるさと納税の税金控除が受けられます。
          会社員にとって最も手軽な方法です。
        </p>
        <p className="text-gray-800">
          この記事では、ワンストップ特例制度の<strong>申請方法・期限・必要書類・注意点</strong>を初めての方でも迷わず手続きできるよう、詳しく解説します。
        </p>
      </div>

      {/* 広告 */}
      <AdBanner />

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#what" className="text-primary-600 hover:underline">1. ワンストップ特例制度とは？</a></li>
          <li><a href="#conditions" className="text-primary-600 hover:underline">2. 利用条件</a></li>
          <li><a href="#comparison" className="text-primary-600 hover:underline">3. ワンストップ vs 確定申告</a></li>
          <li><a href="#howto" className="text-primary-600 hover:underline">4. 申請方法（詳細手順）</a></li>
          <li><a href="#deadline" className="text-primary-600 hover:underline">5. 申請期限と重要な日付</a></li>
          <li><a href="#troubles" className="text-primary-600 hover:underline">6. よくあるトラブルと対処法</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">7. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: ワンストップ特例制度とは？ */}
      <section id="what" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          ワンストップ特例制度とは？
        </h2>

        <p className="text-gray-700 mb-6">
          ワンストップ特例制度とは、<strong>確定申告をせずに</strong>ふるさと納税の税金控除を受けられる制度です。
          会社員など、普段確定申告をしない方に特に便利です。
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-blue-200 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">通常の場合との違い</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">項目</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">通常（確定申告）</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">ワンストップ特例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">手続き</td>
                  <td className="border border-gray-300 px-4 py-3">確定申告が必要</td>
                  <td className="border border-gray-300 px-4 py-3 bg-blue-50">申請書を郵送するだけ</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">控除方法</td>
                  <td className="border border-gray-300 px-4 py-3">所得税+住民税</td>
                  <td className="border border-gray-300 px-4 py-3">住民税のみ</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">控除額</td>
                  <td className="border border-gray-300 px-4 py-3">同じ</td>
                  <td className="border border-gray-300 px-4 py-3 bg-blue-50">同じ（実質的に同額）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-sm text-gray-700">
            💡 <strong>控除額は同じ</strong><br />
            ワンストップ特例を使っても、確定申告をしても、控除される金額は同じです。
            手続きが簡単な分、ワンストップ特例がおすすめです。
          </p>
        </div>
      </section>

      {/* セクション2: 利用条件 */}
      <section id="conditions" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          ワンストップ特例の利用条件
        </h2>

        <p className="text-gray-700 mb-6">
          以下の<strong>3つの条件を全て満たす</strong>必要があります。
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-start mb-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
              <h3 className="text-lg font-bold text-gray-900">確定申告をする必要がない給与所得者</h3>
            </div>
            <p className="text-gray-700 mb-3 ml-11">
              会社員・公務員など、年末調整で税務処理が完了する人が対象です。
            </p>
            <div className="ml-11 bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-700 mb-2"><strong>対象外となるケース:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 医療費控除を受ける人</li>
                <li>• 住宅ローン控除（初年度）を受ける人</li>
                <li>• 副業収入が20万円以上ある人</li>
                <li>• 個人事業主・フリーランス</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-start mb-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
              <h3 className="text-lg font-bold text-gray-900">1年間の寄付先が5自治体以内</h3>
            </div>
            <p className="text-gray-700 mb-3 ml-11">
              6自治体以上に寄付すると、ワンストップ特例は使えません。
            </p>
            <div className="ml-11 bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>ポイント:</strong> 同じ自治体に複数回寄付してもOK。
                例えば、A市に3回、B市に2回寄付しても「2自治体」としてカウントされます。
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-start mb-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
              <h3 className="text-lg font-bold text-gray-900">申請書を期限内に提出</h3>
            </div>
            <p className="text-gray-700 ml-11">
              翌年<strong>1月10日（必着）</strong>までに申請書を自治体に郵送する必要があります。
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 比較 */}
      <section id="comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          ワンストップ vs 確定申告の比較
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">項目</th>
                <th className="border border-gray-300 px-4 py-3 text-left">ワンストップ特例</th>
                <th className="border border-gray-300 px-4 py-3 text-left">確定申告</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">対象者</td>
                <td className="border border-gray-300 px-4 py-3">給与所得者のみ</td>
                <td className="border border-gray-300 px-4 py-3">全員</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">寄付先の制限</td>
                <td className="border border-gray-300 px-4 py-3 bg-yellow-50">5自治体まで</td>
                <td className="border border-gray-300 px-4 py-3 bg-green-50">制限なし</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">申請時期</td>
                <td className="border border-gray-300 px-4 py-3">寄付ごと（1月10日まで）</td>
                <td className="border border-gray-300 px-4 py-3">翌年2-3月</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">控除方法</td>
                <td className="border border-gray-300 px-4 py-3">住民税のみ</td>
                <td className="border border-gray-300 px-4 py-3">所得税+住民税</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-bold">手間</td>
                <td className="border border-gray-300 px-4 py-3 bg-green-50">簡単</td>
                <td className="border border-gray-300 px-4 py-3 bg-yellow-50">やや複雑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* セクション4: 申請方法 */}
      <section id="howto" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          ワンストップ特例の申請方法（詳細手順）
        </h2>

        <div className="space-y-8">
          {/* ステップ1 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">1</span>
              <h3 className="text-xl font-bold text-gray-900">寄付時に申請書にチェック</h3>
            </div>
            <p className="text-gray-700 ml-16 mb-3">
              楽天ふるさと納税などで寄付する際、<strong>「ワンストップ特例申請書を希望する」にチェック</strong>を入れます。
            </p>
            <div className="bg-blue-50 p-4 rounded ml-16">
              <p className="text-sm text-gray-700">
                これにチェックを入れると、自治体から申請書が郵送されてきます。
              </p>
            </div>
          </div>

          {/* ステップ2 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">2</span>
              <h3 className="text-xl font-bold text-gray-900">申請書が届くのを待つ</h3>
            </div>
            <p className="text-gray-700 ml-16">
              寄付から1〜2週間程度で、自治体から申請書が郵送されます。
              返礼品とは別便で届くことが多いです。
            </p>
          </div>

          {/* ステップ3 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">3</span>
              <h3 className="text-xl font-bold text-gray-900">申請書に必要事項を記入</h3>
            </div>
            <div className="ml-16 space-y-3">
              <p className="text-gray-700">記入項目:</p>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>氏名、住所、マイナンバー</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>寄付金額（記載済みの場合も）</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>5自治体以内であることの確認</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ステップ4 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">4</span>
              <h3 className="text-xl font-bold text-gray-900">本人確認書類を添付</h3>
            </div>
            <div className="ml-16 space-y-4">
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-bold text-gray-900 mb-2">パターンA: マイナンバーカードを持っている場合</h4>
                <p className="text-sm text-gray-700">
                  マイナンバーカードの<strong>両面コピー</strong>を添付
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-bold text-gray-900 mb-2">パターンB: マイナンバーカードがない場合</h4>
                <p className="text-sm text-gray-700 mb-2">以下の2種類が必要:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>1. マイナンバー通知カードまたは住民票のコピー</li>
                  <li>2. 本人確認書類（運転免許証、パスポートなど）のコピー</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ステップ5 */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">5</span>
              <h3 className="text-xl font-bold text-gray-900">自治体に郵送</h3>
            </div>
            <p className="text-gray-700 ml-16 mb-3">
              <strong>翌年1月10日必着</strong>で自治体に郵送します。
            </p>
            <div className="bg-red-50 p-4 rounded ml-16 border-l-4 border-red-500">
              <p className="text-sm text-gray-700">
                ⚠️ <strong>重要</strong><br />
                「消印有効」ではなく<strong>「必着」</strong>です。郵便局の窓口で確実に送付するのがおすすめです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション5: 期限 */}
      <section id="deadline" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          申請期限と重要な日付
        </h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">重要な期限</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="flex-shrink-0 w-32 font-bold text-gray-900">12月31日</span>
                <span className="text-gray-700">ふるさと納税の最終日</span>
              </div>
              <div className="flex items-center">
                <span className="flex-shrink-0 w-32 font-bold text-red-600">翌年1月10日</span>
                <span className="text-gray-700">ワンストップ申請書の提出期限（必着）</span>
              </div>
              <div className="flex items-center">
                <span className="flex-shrink-0 w-32 font-bold text-gray-900">翌年6月頃</span>
                <span className="text-gray-700">住民税の控除を確認</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              期限を守るためのコツ
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">12月に駆け込み寄付した場合の注意点</h4>
                <p className="text-sm text-gray-700">
                  申請書が年内に届かないことも。その場合は自治体HPからダウンロードして、自分で記入・郵送しましょう。
                </p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">年末年始は郵便が遅れる</h4>
                <p className="text-sm text-gray-700">
                  12月28日〜1月3日は郵便が遅れがちです。早めの発送を心がけましょう。
                </p>
              </div>
              <div className="bg-white p-4 rounded border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">おすすめスケジュール</h4>
                <p className="text-sm text-gray-700">
                  12月20日までに寄付完了 → 12月28日までに申請書を郵送 → 年内に手続き完了
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション6: トラブル */}
      <section id="troubles" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          よくあるトラブルと対処法
        </h2>

        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-gray-900 mb-3">トラブル1: 申請書が届かない</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>原因:</strong> 自治体によっては発送が遅い、または寄付時にチェックを入れ忘れた
            </p>
            <p className="text-sm text-gray-700">
              <strong>対処:</strong> 自治体HPからダウンロード、または自治体に連絡して再送依頼
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">トラブル2: 6自治体以上に寄付してしまった</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>原因:</strong> 寄付先をカウントし忘れた
            </p>
            <p className="text-sm text-gray-700">
              <strong>対処:</strong> 確定申告に切り替える（ワンストップは全て無効になる）
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-900 mb-3">トラブル3: 期限（1月10日）に間に合わなかった</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>原因:</strong> 郵送が遅れた、または忘れていた
            </p>
            <p className="text-sm text-gray-700">
              <strong>対処:</strong> 確定申告で対応（3月15日まで）
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-gray-900 mb-3">トラブル4: 引っ越した</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>原因:</strong> 寄付後に住所が変わった
            </p>
            <p className="text-sm text-gray-700">
              <strong>対処:</strong> 「寄附金税額控除に係る申告特例申請事項変更届出書」を提出
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-3">トラブル5: 名前や住所を間違えた</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>原因:</strong> 記入ミス
            </p>
            <p className="text-sm text-gray-700">
              <strong>対処:</strong> すぐに自治体に連絡して訂正
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
            期限を忘れない！AIがワンストップ申請をリマインド
          </h3>
          <p className="text-gray-700 mb-6">
            あなたのふるさと納税AIなら、寄付履歴を自動管理し、ワンストップ申請の期限（1月10日）をメールでお知らせ。
            申請忘れを防ぎます。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📧</div>
            <h4 className="font-bold text-gray-900 mb-2">期限リマインダー</h4>
            <p className="text-sm text-gray-700">
              1月10日の申請期限をメールで通知
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-bold text-gray-900 mb-2">寄付履歴管理</h4>
            <p className="text-sm text-gray-700">
              どこに寄付したか一元管理。5自治体を超えないようアラート
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              あなたの好みに合わせた最適な返礼品を提案
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          よくある質問
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ワンストップ特例を使うと控除額は減る？
            </h3>
            <p className="text-gray-700">
              A: 減りません。確定申告と同じ額が控除されます。ただし、控除方法が異なります（ワンストップは住民税のみから控除）。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 申請書を出し忘れたらどうなる？
            </h3>
            <p className="text-gray-700">
              A: 控除が受けられません。ただし、3月15日までに確定申告をすれば対応可能です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 複数の自治体に寄付した場合、全ての申請書を送る？
            </h3>
            <p className="text-gray-700">
              A: はい、寄付ごとに申請書が必要です。5自治体に寄付したら、5枚の申請書を送ります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: オンラインで申請できる？
            </h3>
            <p className="text-gray-700">
              A: 一部の自治体ではマイナンバーカードを使ったオンライン申請が可能です。自治体HPで確認しましょう。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 同じ自治体に3回寄付したら3自治体？
            </h3>
            <p className="text-gray-700">
              A: いいえ、1自治体としてカウントされます。同じ自治体への複数回寄付は何回でもOKです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 申請書はいつまでに届く？
            </h3>
            <p className="text-gray-700">
              A: 寄付から1〜2週間程度（自治体により異なる）。届かない場合は自治体に連絡しましょう。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIを使うメリットは？
            </h3>
            <p className="text-gray-700">
              A: 寄付履歴を自動管理し、期限をリマインドしてくれます。5自治体を超えないようアラートも出るため、失敗を防げます。
            </p>
          </div>
        </div>
      </section>

      {/* 広告 */}
      <AdBanner />

      {/* 関連記事 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          関連記事
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/article/furusato-beginner-guide" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">初心者向けふるさと納税完全ガイド</h3>
            <p className="text-sm text-gray-600">やり方・仕組みをわかりやすく解説</p>
          </Link>
          <Link href="/article/furusato-schedule-kigen" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">ふるさと納税のスケジュール・期限ガイド</h3>
            <p className="text-sm text-gray-600">いつまでに何をすべき？</p>
          </Link>
        </div>
      </section>

      {/* 情報源 */}
      <div className="mt-12 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          <a
            href="https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/deduction.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            総務省｜ふるさと納税のしくみ
          </a>
          より詳しい制度内容をご確認いただけます。
        </p>
      </div>
    </article>
    </div>
  );
}
