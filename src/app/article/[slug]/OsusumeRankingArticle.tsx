'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface RankingProduct {
  rank: number;
  affiliateUrl: string;
  itemName: string;
  itemPrice: number;
  imageUrl?: string;
  returnRate?: number;
  reviewRating?: number;
  description?: string;
}

interface CategoryRankingData {
  category: string;
  products: RankingProduct[];
}

export default function OsusumeRankingArticle() {
  const [rankings, setRankings] = useState<Record<string, RankingProduct[]>>({
    meat: [],
    rice: [],
    fruits: [],
    seafood: [],
    'daily-goods': [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const categories = ['meat', 'rice', 'fruits', 'seafood', 'daily-goods'];
        const promises = categories.map(async (category) => {
          const response = await fetch(`/api/article/category-rankings?category=${category}`);
          const data = await response.json();
          return { category, products: data.products || [] };
        });

        const results = await Promise.all(promises);
        const newRankings: Record<string, RankingProduct[]> = {};
        results.forEach(({ category, products }) => {
          newRankings[category] = products;
        });

        setRankings(newRankings);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // 静的フォールバックデータ
  const fallbackRankings: Record<string, RankingProduct[]> = {
    meat: [
      { rank: 1, itemName: '黒毛和牛 切り落とし 1kg', itemPrice: 10000, returnRate: 35, reviewRating: 4.7, description: 'すき焼き、しゃぶしゃぶに最適。使いやすい小分けパック。コスパ最強の定番商品。', affiliateUrl: '#' },
      { rank: 2, itemName: '国産豚肉 バラエティセット 2kg', itemPrice: 10000, returnRate: 40, description: '量が多い、家族向け。バラ・ロース・モモなど複数部位。', affiliateUrl: '#' },
      { rank: 3, itemName: '鶏肉 むね肉・もも肉セット 3kg', itemPrice: 10000, returnRate: 38, description: 'ヘルシー、大容量。コスパ重視の方に。', affiliateUrl: '#' },
      { rank: 4, itemName: '佐賀牛 サーロインステーキ 300g', itemPrice: 20000, returnRate: 30, description: '特別な日のご馳走。ブランド牛の贅沢な味わい。', affiliateUrl: '#' },
      { rank: 5, itemName: '国産ハンバーグ 10個入り', itemPrice: 10000, returnRate: 35, description: '冷凍保存可能。子供に人気、使いやすい。', affiliateUrl: '#' },
    ],
    rice: [
      { rank: 1, itemName: '新潟県産 コシヒカリ 10kg', itemPrice: 10000, returnRate: 35, reviewRating: 4.8, description: '定番中の定番。失敗しない安定の美味しさ。全国的に人気のブランド米。', affiliateUrl: '#' },
      { rank: 2, itemName: '北海道産 ゆめぴりか 10kg', itemPrice: 10000, returnRate: 33, description: 'もちもち食感。冷めても美味しいと評判。', affiliateUrl: '#' },
      { rank: 3, itemName: '山形県産 つや姫 10kg', itemPrice: 10000, returnRate: 32, description: '艶やかな見た目と甘み。高級感のある味わい。', affiliateUrl: '#' },
      { rank: 4, itemName: '秋田県産 あきたこまち 10kg', itemPrice: 10000, returnRate: 34, description: 'バランスの良い味わい。毎日食べても飽きない。', affiliateUrl: '#' },
      { rank: 5, itemName: '佐賀県産 さがびより 10kg', itemPrice: 10000, returnRate: 33, description: '粒が大きく食べ応えあり。九州で人気の品種。', affiliateUrl: '#' },
    ],
    fruits: [
      { rank: 1, itemName: 'シャインマスカット 1kg', itemPrice: 15000, returnRate: 30, description: '贅沢な高級フルーツ。ギフトにも最適。種なしで食べやすい。', affiliateUrl: '#' },
      { rank: 2, itemName: 'みかん 10kg', itemPrice: 10000, returnRate: 40, description: '大容量、冬の定番。家族で楽しめる。', affiliateUrl: '#' },
      { rank: 3, itemName: '山梨県産 桃 2kg', itemPrice: 10000, returnRate: 35, description: '夏の贅沢。甘くてジューシー。', affiliateUrl: '#' },
    ],
    seafood: [
      { rank: 1, itemName: '北海道産 いくら醤油漬け 500g', itemPrice: 15000, returnRate: 35, reviewRating: 4.8, description: '高級、お正月に。プチプチ食感と濃厚な味わい。', affiliateUrl: '#' },
      { rank: 2, itemName: 'うなぎ蒲焼 5尾', itemPrice: 15000, returnRate: 32, description: '夏のご馳走。国産うなぎの贅沢品。', affiliateUrl: '#' },
      { rank: 3, itemName: 'ホタテ貝柱 1kg', itemPrice: 15000, returnRate: 38, description: '北海道産の大粒ホタテ。刺身でも焼いても絶品。', affiliateUrl: '#' },
    ],
    'daily-goods': [
      { rank: 1, itemName: 'トイレットペーパー 96ロール', itemPrice: 10000, returnRate: 40, reviewRating: 4.6, description: '確実に使う、保存可能。物価高対策に最適。約1年分。', affiliateUrl: '#' },
      { rank: 2, itemName: '洗剤セット（P&G）', itemPrice: 10000, returnRate: 35, description: '有名ブランド、実用的。洗濯洗剤・柔軟剤などセット。', affiliateUrl: '#' },
      { rank: 3, itemName: 'ティッシュペーパー 60箱', itemPrice: 8000, returnRate: 38, description: '家族で使える大容量。約半年～1年分。', affiliateUrl: '#' },
      { rank: 4, itemName: 'サランラップ・アルミホイルセット', itemPrice: 8000, returnRate: 35, description: 'キッチン必需品。長期保存可能。', affiliateUrl: '#' },
      { rank: 5, itemName: 'タオルセット', itemPrice: 10000, returnRate: 30, description: '今治タオルなど高品質。買い替え時期に最適。', affiliateUrl: '#' },
    ],
  };

  // データがあればAPIデータ、なければフォールバック
  const getMeatProducts = () => rankings.meat.length > 0 ? rankings.meat : fallbackRankings.meat;
  const getRiceProducts = () => rankings.rice.length > 0 ? rankings.rice : fallbackRankings.rice;
  const getFruitsProducts = () => rankings.fruits.length > 0 ? rankings.fruits : fallbackRankings.fruits;
  const getSeafoodProducts = () => rankings.seafood.length > 0 ? rankings.seafood : fallbackRankings.seafood;
  const getDailyGoodsProducts = () => rankings['daily-goods'].length > 0 ? rankings['daily-goods'] : fallbackRankings['daily-goods'];

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルと更新日 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          【2025年最新】ふるさと納税おすすめ返礼品ランキングTOP50｜カテゴリ別人気商品を徹底紹介
        </h1>
        <p className="text-sm text-gray-600">更新日: 2025年11月10日</p>
      </header>

      {/* 導入文 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
        <p className="mb-4 text-gray-800">
          ふるさと納税の返礼品選びに迷っていませんか？
          <strong>76万点以上</strong>の返礼品から選ぶのは大変ですよね。
        </p>
        <p className="text-gray-800">
          この記事では、<strong>2025年最新の人気返礼品をカテゴリ別にランキング</strong>で紹介。
          肉、米、フルーツ、海鮮、日用品など、失敗しないおすすめ商品を還元率・レビューとともに詳しく解説します。
        </p>
      </div>

      {/* 目次 */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
        <ol className="space-y-2 text-gray-700">
          <li><a href="#trends" className="text-primary-600 hover:underline">1. 2025年の人気トレンド</a></li>
          <li><a href="#meat" className="text-primary-600 hover:underline">2. 肉部門 TOP10</a></li>
          <li><a href="#rice" className="text-primary-600 hover:underline">3. 米部門 TOP5</a></li>
          <li><a href="#fruits" className="text-primary-600 hover:underline">4. フルーツ部門 TOP10</a></li>
          <li><a href="#seafood" className="text-primary-600 hover:underline">5. 海鮮部門 TOP10</a></li>
          <li><a href="#daily-goods" className="text-primary-600 hover:underline">6. 日用品部門 TOP5</a></li>
          <li><a href="#price" className="text-primary-600 hover:underline">7. 寄付額別おすすめ</a></li>
          <li><a href="#tips" className="text-primary-600 hover:underline">8. 失敗しない選び方</a></li>
          <li><a href="#faq" className="text-primary-600 hover:underline">9. よくある質問</a></li>
        </ol>
      </nav>

      {/* セクション1: 2025年の人気トレンド */}
      <section id="trends" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
          2025年の人気トレンド
        </h2>

        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              トレンド1: 物価高で日用品が人気急上昇
            </h3>
            <p className="text-gray-700">
              2025年も物価高が続く中、<strong>トイレットペーパー、洗剤などの日用品</strong>が前年比173%増と大人気。
              確実に使える商品で限度額を無駄なく活用する傾向が強まっています。
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              トレンド2: 定番の肉・米も根強い人気
            </h3>
            <p className="text-gray-700">
              米10kg、黒毛和牛切り落としなど、<strong>コスパの良い定番商品</strong>は安定した人気。
              レビュー数が多く、失敗しにくいのが魅力です。
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              トレンド3: 季節のフルーツは争奪戦
            </h3>
            <p className="text-gray-700">
              シャインマスカット、みかん、桃など、<strong>季節限定のフルーツ</strong>は発売と同時に売り切れる商品も。
              早めの予約が必須です。
            </p>
          </div>
        </div>
      </section>

      {/* セクション2: 肉部門 */}
      <section id="meat" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-red-500">
          肉部門 TOP{getMeatProducts().length}
        </h2>

        <div className="space-y-4">
          {getMeatProducts().map((product, index) => {
            const isTop = index === 0;
            const badgeColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-600', 'bg-gray-500'];
            const badgeColor = badgeColors[Math.min(index, 3)];

            return (
              <div key={index} className={`bg-white rounded-lg ${isTop ? 'p-6 border-2 border-red-200' : 'p-4 border-2 border-gray-200'}`}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block ${badgeColor} text-white font-bold px-3 py-1 rounded-full text-sm mb-2`}>
                      {product.rank}位
                    </span>
                    <h3 className={`${isTop ? 'text-lg' : ''} font-bold text-gray-900`}>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 hover:underline">
                        {product.itemName}
                      </a>
                    </h3>
                  </div>
                  <span className={`text-red-600 font-bold ${isTop ? 'text-lg' : ''} whitespace-nowrap ml-4`}>
                    {product.itemPrice.toLocaleString()}円
                  </span>
                </div>
                {(product.returnRate || product.reviewRating) && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.returnRate && `還元率: 約${product.returnRate}%`}
                    {product.returnRate && product.reviewRating && ' | '}
                    {product.reviewRating && `レビュー: ★${product.reviewRating.toFixed(1)}`}
                  </p>
                )}
                {product.description && (
                  <p className={`text-gray-700 ${isTop ? '' : 'text-sm'}`}>{product.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* セクション3: 米部門 */}
      <section id="rice" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          米部門 TOP{getRiceProducts().length}
        </h2>

        <div className="space-y-4">
          {getRiceProducts().map((product, index) => {
            const isTop = index === 0;
            const badgeColor = 'bg-green-500';

            return (
              <div key={index} className={`bg-white rounded-lg ${isTop ? 'p-6 border-2 border-green-200' : 'p-4 border-2 border-gray-200'}`}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block ${badgeColor} text-white font-bold px-3 py-1 rounded-full text-sm mb-2`}>
                      {product.rank}位
                    </span>
                    <h3 className={`${isTop ? 'text-lg' : ''} font-bold text-gray-900`}>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 hover:underline">
                        {product.itemName}
                      </a>
                    </h3>
                  </div>
                  <span className={`text-red-600 font-bold ${isTop ? 'text-lg' : ''} whitespace-nowrap ml-4`}>
                    {product.itemPrice.toLocaleString()}円
                  </span>
                </div>
                {(product.returnRate || product.reviewRating) && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.returnRate && `還元率: 約${product.returnRate}%`}
                    {product.returnRate && product.reviewRating && ' | '}
                    {product.reviewRating && `レビュー: ★${product.reviewRating.toFixed(1)}`}
                  </p>
                )}
                {product.description && (
                  <p className={`text-gray-700 ${isTop ? '' : 'text-sm'}`}>{product.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* セクション4: フルーツ部門 */}
      <section id="fruits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-purple-500">
          フルーツ部門 TOP{getFruitsProducts().length}
        </h2>

        <div className="space-y-4">
          {getFruitsProducts().map((product, index) => {
            const isTop = index === 0;
            const badgeColors = ['bg-purple-500', 'bg-orange-500', 'bg-yellow-600'];
            const badgeColor = badgeColors[Math.min(index, 2)] || 'bg-gray-500';

            return (
              <div key={index} className={`bg-white rounded-lg ${isTop ? 'p-6 border-2 border-purple-200' : 'p-4 border-2 border-gray-200'}`}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block ${badgeColor} text-white font-bold px-3 py-1 rounded-full text-sm mb-2`}>
                      {product.rank}位
                    </span>
                    <h3 className={`${isTop ? 'text-lg' : ''} font-bold text-gray-900`}>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 hover:underline">
                        {product.itemName}
                      </a>
                    </h3>
                  </div>
                  <span className={`text-red-600 font-bold ${isTop ? 'text-lg' : ''} whitespace-nowrap ml-4`}>
                    {product.itemPrice.toLocaleString()}円
                  </span>
                </div>
                {(product.returnRate || product.reviewRating) && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.returnRate && `還元率: 約${product.returnRate}%`}
                    {product.returnRate && product.reviewRating && ' | '}
                    {product.reviewRating && `レビュー: ★${product.reviewRating.toFixed(1)}`}
                  </p>
                )}
                {product.description && (
                  <p className={`text-gray-700 ${isTop ? '' : 'text-sm'}`}>{product.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* セクション5: 海鮮部門 */}
      <section id="seafood" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          海鮮部門 TOP{getSeafoodProducts().length}
        </h2>

        <div className="space-y-4">
          {getSeafoodProducts().map((product, index) => {
            const isTop = index === 0;
            const badgeColor = 'bg-blue-500';

            return (
              <div key={index} className={`bg-white rounded-lg ${isTop ? 'p-6 border-2 border-blue-200' : 'p-4 border-2 border-gray-200'}`}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block ${badgeColor} text-white font-bold px-3 py-1 rounded-full text-sm mb-2`}>
                      {product.rank}位
                    </span>
                    <h3 className={`${isTop ? 'text-lg' : ''} font-bold text-gray-900`}>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                        {product.itemName}
                      </a>
                    </h3>
                  </div>
                  <span className={`text-red-600 font-bold ${isTop ? 'text-lg' : ''} whitespace-nowrap ml-4`}>
                    {product.itemPrice.toLocaleString()}円
                  </span>
                </div>
                {(product.returnRate || product.reviewRating) && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.returnRate && `還元率: 約${product.returnRate}%`}
                    {product.returnRate && product.reviewRating && ' | '}
                    {product.reviewRating && `レビュー: ★${product.reviewRating.toFixed(1)}`}
                  </p>
                )}
                {product.description && (
                  <p className={`text-gray-700 ${isTop ? '' : 'text-sm'}`}>{product.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* セクション6: 日用品部門 */}
      <section id="daily-goods" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-500">
          日用品部門 TOP{getDailyGoodsProducts().length}
        </h2>

        <div className="space-y-4">
          {getDailyGoodsProducts().map((product, index) => {
            const isTop = index === 0;
            const badgeColor = 'bg-yellow-500';

            return (
              <div key={index} className={`bg-white rounded-lg ${isTop ? 'p-6 border-2 border-yellow-200' : 'p-4 border-2 border-gray-200'}`}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block ${badgeColor} text-white font-bold px-3 py-1 rounded-full text-sm mb-2`}>
                      {product.rank}位
                    </span>
                    <h3 className={`${isTop ? 'text-lg' : ''} font-bold text-gray-900`}>
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 hover:underline">
                        {product.itemName}
                      </a>
                    </h3>
                  </div>
                  <span className={`text-red-600 font-bold ${isTop ? 'text-lg' : ''} whitespace-nowrap ml-4`}>
                    {product.itemPrice.toLocaleString()}円
                  </span>
                </div>
                {(product.returnRate || product.reviewRating) && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.returnRate && `還元率: 約${product.returnRate}%`}
                    {product.returnRate && product.reviewRating && ' | '}
                    {product.reviewRating && `レビュー: ★${product.reviewRating.toFixed(1)}`}
                  </p>
                )}
                {product.description && (
                  <p className={`text-gray-700 ${isTop ? '' : 'text-sm'}`}>{product.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* セクション7: 寄付額別おすすめ */}
      <section id="price" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
          寄付額別おすすめ
        </h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              5,000円で選べる返礼品
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>うどん・そば（乾麺）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>調味料セット（醤油、味噌など）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>米 5kg</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>レトルトカレーセット</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              10,000円で選べる返礼品（最も選択肢が多い）
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>米 10kg（コスパ最強）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>肉 1kg（黒毛和牛、豚肉など）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>日用品（トイレットペーパー、洗剤）</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>海鮮（サーモン、牡蠣など）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              15,000円で選べる返礼品
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>フルーツ（シャインマスカット、メロンなど）</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>高級魚介（いくら、うなぎ、ホタテ）</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>ブランド牛（サーロインステーキなど）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              30,000円以上で選べる返礼品
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">✓</span>
                <span>家電（炊飯器、掃除機、電子レンジなど）</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span>
                <span>大容量の肉（5kg以上）</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>高級食材セット</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>定期便（年3回～12回）</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* セクション8: 失敗しない選び方 */}
      <section id="tips" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
          失敗しない返礼品の選び方
        </h2>

        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ✓ ポイント1: レビューを確認
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 星4以上が目安</li>
              <li>• レビュー数が多いものが安心（1,000件以上が理想）</li>
              <li>• 写真付きレビューをチェック</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ✓ ポイント2: 発送時期を確認
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 季節限定の返礼品は発送時期が限られる</li>
              <li>• すぐに欲しい場合は通年発送の商品を</li>
              <li>• 発送予定月を必ず確認</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ✓ ポイント3: 保管場所を考える
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• 冷凍庫のスペース確認</li>
              <li>• 常温保存可能なものは楽</li>
              <li>• 一人暮らしは定期便や小分けタイプがおすすめ</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              ✓ ポイント4: 好みに合わせる
            </h3>
            <p className="text-sm text-gray-700">
              <strong>あなたのふるさと納税AIのAI推薦なら、あなたの好みを学習して最適な返礼品を提案</strong>します。
              76万点以上の中から、本当に欲しいものが見つかります。
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
            76万点から1分で最適な返礼品が見つかる
          </h3>
          <p className="text-gray-700 mb-6">
            AIがあなたの好みを学習し、本当に欲しい返礼品だけを厳選提案
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">AIが返礼品をおすすめ</h4>
            <p className="text-sm text-gray-700">
              好みの食材・量・発送時期を考慮して最適な返礼品を提案
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
              Q: 人気の返礼品は売り切れる？
            </h3>
            <p className="text-gray-700">
              A: はい、肉や米、フルーツは早めに売り切れることがあります。特に12月は要注意です。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 還元率とは？
            </h3>
            <p className="text-gray-700">
              A: 返礼品の市場価格 ÷ 寄付額 × 100 で計算します。還元率30%以上なら高コスパです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 還元率が高い方がお得？
            </h3>
            <p className="text-gray-700">
              A: 基本的にはそうですが、好みも重要です。使わないものは損になります。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 定期便とは？
            </h3>
            <p className="text-gray-700">
              A: 毎月または隔月で少しずつ届くタイプです。保管場所が少ない方におすすめ。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: 訳あり品はどう？
            </h3>
            <p className="text-gray-700">
              A: 味は同じで見た目に難があるだけなので、気にしない人におすすめです。コスパが良いです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: ランキングは毎年変わる？
            </h3>
            <p className="text-gray-700">
              A: はい、物価やトレンドで変わります。2025年は日用品が急上昇しています。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Q: あなたのふるさと納税AIを使うメリットは？
            </h3>
            <p className="text-gray-700">
              A: AIがあなたの好みを学習し、76万点以上の中から最適な返礼品を提案します。
              レビューや還元率も考慮するため、失敗しない選択ができます。
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
          <Link href="/article/rakuten-furusato-kouryaku" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">楽天ふるさと納税の完全攻略ガイド</h3>
            <p className="text-sm text-gray-600">SPU・ポイント最大化・注意点</p>
          </Link>
          <Link href="/article/daily-goods-2025" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
            <h3 className="font-bold text-gray-900 mb-2">日用品返礼品おすすめ2025</h3>
            <p className="text-sm text-gray-600">物価高対策に最適な日用品を厳選</p>
          </Link>
        </div>
      </section>
    </article>
    </div>
  );
}
