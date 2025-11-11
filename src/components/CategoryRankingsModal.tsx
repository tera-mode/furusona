'use client';

import { useState, useEffect } from 'react';

interface RankingProduct {
  rank: number;
  affiliateUrl: string;
  itemName: string;
  itemPrice: number;
  imageUrl: string;
  returnRate?: number;
  reviewRating?: number;
  description?: string;
}

interface CategoryRankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, products: RankingProduct[]) => Promise<void>;
}

const CATEGORIES = [
  { id: 'meat', name: '肉部門', color: 'red' },
  { id: 'rice', name: '米部門', color: 'green' },
  { id: 'fruits', name: 'フルーツ部門', color: 'purple' },
  { id: 'seafood', name: '海鮮部門', color: 'blue' },
  { id: 'daily-goods', name: '日用品部門', color: 'yellow' },
];

export default function CategoryRankingsModal({ isOpen, onClose, onSave }: CategoryRankingsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('meat');
  const [products, setProducts] = useState<RankingProduct[]>([
    { rank: 1, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
    { rank: 2, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
    { rank: 3, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // カテゴリが変わったら既存データを読み込む
  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/article/category-rankings?category=${selectedCategory}`);
        const data = await response.json();

        if (data.products && data.products.length > 0) {
          // ランクでソート
          const sortedProducts = data.products.sort((a: RankingProduct, b: RankingProduct) => a.rank - b.rank);
          setProducts(sortedProducts);
        } else {
          // デフォルトの3つの空フォーム
          setProducts([
            { rank: 1, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
            { rank: 2, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
            { rank: 3, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch category rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, isOpen]);

  // 楽天APIから商品情報を取得
  const fetchProductInfo = async (affiliateUrl: string, index: number) => {
    if (!affiliateUrl) return;

    console.log('=== URL解析開始 ===');
    console.log('入力URL:', affiliateUrl);

    try {
      // 楽天アフィリエイトURLから実際の商品URLを抽出
      let actualUrl = affiliateUrl.trim();

      // アフィリエイトURLの場合、エンコードされた商品URLを抽出
      if (affiliateUrl.includes('hb.afl.rakuten.co.jp') || affiliateUrl.includes('a.r10.to')) {
        console.log('アフィリエイトURL形式を検出');
        const pcMatch = affiliateUrl.match(/[?&]pc=([^&]+)/);
        if (pcMatch) {
          actualUrl = decodeURIComponent(pcMatch[1]);
          console.log('pc パラメータから抽出:', actualUrl);
        } else {
          const urlMatch = affiliateUrl.match(/https?%3A%2F%2Fitem\.rakuten\.co\.jp[^&]+/);
          if (urlMatch) {
            actualUrl = decodeURIComponent(urlMatch[0]);
            console.log('エンコードされたURLから抽出:', actualUrl);
          }
        }
      } else {
        console.log('直接商品URL形式');
      }

      console.log('処理対象URL:', actualUrl);

      // 商品URLからshopCodeとitemCodeを抽出
      let shopCode = '';
      let itemCode = '';

      if (actualUrl.includes('item.rakuten.co.jp')) {
        const pathMatch = actualUrl.match(/item\.rakuten\.co\.jp\/([^?#]+)/);

        console.log('正規表現マッチ結果:', pathMatch);

        if (pathMatch) {
          const pathParts = pathMatch[1].replace(/\/$/, '').split('/').filter(p => p);

          console.log('パス分割結果:', pathParts);
          console.log('パーツ数:', pathParts.length);

          if (pathParts.length >= 2) {
            if (pathParts[0] === 'item') {
              shopCode = pathParts[1];
              itemCode = pathParts[2];
              console.log('パターン1検出: /item/shopCode/itemCode/');
            } else {
              shopCode = pathParts[0];
              itemCode = pathParts[1];
              console.log('パターン2検出: /shopCode/itemCode/');
            }
          }

          console.log('抽出結果 - shopCode:', shopCode);
          console.log('抽出結果 - itemCode:', itemCode);
        } else {
          console.error('正規表現がマッチしませんでした');
        }
      } else {
        console.error('item.rakuten.co.jp ドメインではありません');
      }

      if (!shopCode || !itemCode) {
        console.error('shopCode または itemCode が空です');
        alert(
          '楽天の商品URLを正しく認識できませんでした。\n\n' +
          '対応形式:\n' +
          '• https://item.rakuten.co.jp/shop-code/item-code/\n' +
          '• https://hb.afl.rakuten.co.jp/...\n\n' +
          '入力されたURL: ' + affiliateUrl + '\n' +
          '解析後URL: ' + actualUrl + '\n' +
          'shopCode: ' + shopCode + '\n' +
          'itemCode: ' + itemCode
        );
        return;
      }

      console.log('=== APIリクエスト開始 ===');
      const apiUrl = `/api/rakuten/item?shopCode=${encodeURIComponent(shopCode)}&itemCode=${encodeURIComponent(itemCode)}`;
      console.log('リクエストURL:', apiUrl);

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('APIレスポンスステータス:', response.status);
      console.log('APIレスポンスデータ:', data);

      if (data.error) {
        if (response.status === 404) {
          const shouldContinue = confirm(
            '楽天APIでこの商品が見つかりませんでした。\n\n' +
            '商品が削除されているか、APIで取得できない商品の可能性があります。\n' +
            'URLだけ保存して、商品情報を手動で入力しますか？\n\n' +
            'shopCode: ' + shopCode + '\n' +
            'itemCode: ' + itemCode
          );

          if (shouldContinue) {
            const newProducts = [...products];
            newProducts[index] = {
              ...newProducts[index],
              affiliateUrl,
            };
            setProducts(newProducts);

            setTimeout(() => {
              const detailsElements = document.querySelectorAll('details');
              if (detailsElements[index]) {
                (detailsElements[index] as HTMLDetailsElement).open = true;
              }
            }, 100);

            alert('URLを保存しました。\n\n下記の「手動で編集」セクションが開きましたので、商品名・価格・画像URLを入力してください。');
            return;
          }
        } else {
          alert(`商品情報の取得に失敗しました: ${data.error}\n\nshopCode: ${shopCode}\nitemCode: ${itemCode}`);
        }
        return;
      }

      console.log('=== 商品情報取得成功 ===');
      console.log('商品名:', data.itemName);
      console.log('価格:', data.itemPrice);

      // 商品情報を自動入力
      const newProducts = [...products];
      newProducts[index] = {
        ...newProducts[index],
        affiliateUrl,
        itemName: data.itemName || '',
        itemPrice: data.itemPrice || 0,
        imageUrl: data.mediumImageUrls?.[0]?.imageUrl || data.smallImageUrls?.[0]?.imageUrl || '',
        reviewRating: data.reviewAverage || 0,
      };
      setProducts(newProducts);

      console.log('商品情報を設定しました');
    } catch (error) {
      console.error('=== エラー発生 ===');
      console.error('エラー詳細:', error);
      alert('商品情報の取得に失敗しました。\n\nエラー: ' + (error instanceof Error ? error.message : String(error)) + '\n\nURLだけ保存して、商品情報を手動で入力してください。');
    }
  };

  const handleSave = async () => {
    // 空の商品を除外
    const validProducts = products.filter(p => p.affiliateUrl && p.itemName);

    if (validProducts.length === 0) {
      const hasUrl = products.some(p => p.affiliateUrl);
      const hasName = products.some(p => p.itemName);

      if (hasUrl && !hasName) {
        alert('商品名が入力されていません。\n\n「手動で編集」セクションを開いて、商品名を入力してください。');
      } else if (!hasUrl && hasName) {
        alert('URLが入力されていません。\n\n楽天アフィリエイトURLを入力してください。');
      } else {
        alert('少なくとも1つの商品を設定してください。\n\nURLと商品名の両方が必要です。');
      }
      return;
    }

    setSaving(true);
    try {
      await onSave(selectedCategory, validProducts);
      alert('保存しました');
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const addProductSlot = () => {
    const nextRank = products.length + 1;
    setProducts([
      ...products,
      { rank: nextRank, affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', returnRate: 0, reviewRating: 0, description: '' },
    ]);
  };

  const removeProductSlot = (index: number) => {
    if (products.length <= 1) return;
    const newProducts = products.filter((_, i) => i !== index);
    // ランクを再割り当て
    newProducts.forEach((p, i) => p.rank = i + 1);
    setProducts(newProducts);
  };

  if (!isOpen) return null;

  const selectedCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">カテゴリ別ランキング商品設定</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* カテゴリ選択 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリを選択
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full max-w-xs px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* カテゴリ情報 */}
          <div className={`bg-${selectedCategoryInfo?.color}-50 rounded-lg p-4`}>
            <h3 className="font-bold text-gray-900 mb-2">
              {selectedCategoryInfo?.name}のランキングを設定
            </h3>
            <p className="text-sm text-gray-700">
              記事に表示される商品ランキングを設定します。楽天アフィリエイトURLから自動で商品情報を取得できます。
            </p>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">読み込み中...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                楽天市場の商品アフィリエイトURLを入力すると、商品情報が自動で取得されます
              </p>

              {/* 商品リスト */}
              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block bg-${selectedCategoryInfo?.color}-500 text-white font-bold px-3 py-1 rounded-full text-sm`}>
                          {product.rank}位
                        </span>
                        <h3 className="font-bold text-gray-700">商品 {product.rank}</h3>
                      </div>
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProductSlot(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          削除
                        </button>
                      )}
                    </div>

                    {/* アフィリエイトURL入力 */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        楽天アフィリエイトURL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={product.affiliateUrl}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].affiliateUrl = e.target.value;
                            setProducts(newProducts);
                          }}
                          placeholder="https://item.rakuten.co.jp/..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                          onClick={() => fetchProductInfo(product.affiliateUrl, index)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm whitespace-nowrap"
                        >
                          商品情報取得
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        対応形式: https://item.rakuten.co.jp/... または https://hb.afl.rakuten.co.jp/...
                      </p>
                    </div>

                    {/* 商品情報プレビュー */}
                    {product.imageUrl && (
                      <div className="flex gap-4 bg-white p-3 rounded border border-gray-200">
                        <img
                          src={product.imageUrl}
                          alt={product.itemName}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{product.itemName}</p>
                          <p className="text-red-600 font-bold text-lg">
                            {product.itemPrice.toLocaleString()}円
                          </p>
                          {product.reviewRating && product.reviewRating > 0 && (
                            <p className="text-xs text-gray-600">
                              評価: ★{product.reviewRating.toFixed(1)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 手動入力フィールド */}
                    <details className="mt-3">
                      <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                        手動で編集
                      </summary>
                      <div className="mt-3 space-y-2 pl-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">商品名</label>
                          <input
                            type="text"
                            value={product.itemName}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].itemName = e.target.value;
                              setProducts(newProducts);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">価格（円）</label>
                          <input
                            type="number"
                            value={product.itemPrice}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].itemPrice = Number(e.target.value);
                              setProducts(newProducts);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">画像URL</label>
                          <input
                            type="text"
                            value={product.imageUrl}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].imageUrl = e.target.value;
                              setProducts(newProducts);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">還元率（%）</label>
                          <input
                            type="number"
                            value={product.returnRate || 0}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].returnRate = Number(e.target.value);
                              setProducts(newProducts);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">評価（星）</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={product.reviewRating || 0}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].reviewRating = Number(e.target.value);
                              setProducts(newProducts);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">説明文</label>
                          <textarea
                            value={product.description || ''}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].description = e.target.value;
                              setProducts(newProducts);
                            }}
                            rows={2}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>

              {/* 商品追加ボタン */}
              <button
                onClick={addProductSlot}
                className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                + 商品を追加
              </button>
            </>
          )}
        </div>

        {/* フッター */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
