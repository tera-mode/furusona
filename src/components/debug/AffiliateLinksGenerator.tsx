'use client';

import { useState } from 'react';

interface RakutenProduct {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  shopName: string;
  reviewCount: number;
  reviewAverage: number;
}

export default function AffiliateLinksGenerator() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [hits, setHits] = useState('10');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<RakutenProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<RakutenProduct | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const searchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keyword,
        hits,
      });

      if (maxPrice) {
        params.append('maxPrice', maxPrice);
      }

      const response = await fetch(`/api/rakuten?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        alert('商品検索に失敗しました');
      }
    } catch (error) {
      console.error('Error searching products:', error);
      alert('商品検索中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const generateAffiliateHTML = (product: RakutenProduct) => {
    return `<div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;">
  <div style="display:flex;gap:8px;">
    <div style="width:240px">
      <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${product.imageUrl}" border="0" style="margin:2px;width:240px;height:240px;object-fit:cover;" alt="${product.itemName}">
      </a>
    </div>
    <div style="vertical-align:top;width:248px;display:block;">
      <p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word">
        <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;">${product.itemName}</a><br>
        <span>価格：${product.itemPrice.toLocaleString()}円（税込、送料別)</span>
      </p>
      <div style="margin:10px;">
        <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;">
          <div style="width:100%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;padding:0 12px;border-radius:16px;cursor:pointer;text-align:center;">
            楽天で購入
          </div>
        </a>
      </div>
    </div>
  </div>
</div>`;
  };

  const generateReactCode = (product: RakutenProduct) => {
    return `<div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-md">
  <div className="flex justify-between items-start mb-3">
    <div>
      <span className="inline-block bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm mb-2">
        1位
      </span>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        ${product.itemName}
      </h3>
      <p className="text-sm text-gray-600">${product.shopName}</p>
    </div>
    <span className="text-orange-600 font-bold text-lg whitespace-nowrap ml-4">
      ${product.itemPrice.toLocaleString()}円
    </span>
  </div>
  <p className="text-gray-700 mb-4">
    商品の説明文をここに記載します。
  </p>
  <div className="bg-orange-50 p-3 rounded mb-4">
    <p className="text-sm text-gray-700">
      <strong>おすすめポイント</strong>: ポイントを記載します。
    </p>
  </div>
  <a
    href="${product.affiliateUrl}"
    target="_blank"
    rel="nofollow sponsored noopener"
    className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
  >
    楽天で購入する →
  </a>
</div>`;
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          楽天アフィリエイトリンク生成
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              検索キーワード
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="例: 奥州ロマン"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                最大価格（円）
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="例: 20000"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                取得件数
              </label>
              <select
                value={hits}
                onChange={(e) => setHits(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
              >
                <option value="5">5件</option>
                <option value="10">10件</option>
                <option value="20">20件</option>
                <option value="30">30件</option>
              </select>
            </div>
          </div>

          <button
            onClick={searchProducts}
            disabled={!keyword || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? '検索中...' : '商品を検索'}
          </button>
        </div>
      </div>

      {products.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            検索結果（{products.length}件）
          </h3>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.itemCode}
                className="border border-slate-300 dark:border-slate-600 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 line-clamp-2">
                      {product.itemName}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {product.shopName}
                    </p>
                    <p className="text-lg font-bold text-orange-600 mb-2">
                      {product.itemPrice.toLocaleString()}円
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span>⭐ {product.reviewAverage.toFixed(1)}</span>
                      <span>({product.reviewCount}件)</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      コード生成
                    </button>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium text-center transition-colors"
                    >
                      楽天で確認
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            生成されたコード
          </h3>

          <div className="space-y-6">
            {/* HTMLコード */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  HTMLコード（楽天スタイル）
                </label>
                <button
                  onClick={() => copyToClipboard(generateAffiliateHTML(selectedProduct), 0)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  {copiedIndex === 0 ? 'コピーしました！' : 'コピー'}
                </button>
              </div>
              <textarea
                readOnly
                value={generateAffiliateHTML(selectedProduct)}
                className="w-full h-48 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-mono text-xs bg-slate-50 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Reactコード */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Reactコード（Tailwind CSS）
                </label>
                <button
                  onClick={() => copyToClipboard(generateReactCode(selectedProduct), 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  {copiedIndex === 1 ? 'コピーしました！' : 'コピー'}
                </button>
              </div>
              <textarea
                readOnly
                value={generateReactCode(selectedProduct)}
                className="w-full h-64 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-mono text-xs bg-slate-50 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            {/* アフィリエイトURL */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  アフィリエイトURL
                </label>
                <button
                  onClick={() => copyToClipboard(selectedProduct.affiliateUrl, 2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  {copiedIndex === 2 ? 'コピーしました！' : 'コピー'}
                </button>
              </div>
              <textarea
                readOnly
                value={selectedProduct.affiliateUrl}
                className="w-full h-24 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-mono text-xs bg-slate-50 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
