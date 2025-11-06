'use client';

import { useState, useEffect } from 'react';
import { MONTHLY_APPEAL_STRATEGIES } from '@/utils/seasonality';

interface Product {
  affiliateUrl: string;
  itemName: string;
  itemPrice: number;
  imageUrl: string;
  category: string;
}

interface MonthlyProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (month: number, products: Product[]) => Promise<void>;
}

export default function MonthlyProductsModal({ isOpen, onClose, onSave }: MonthlyProductsModalProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [products, setProducts] = useState<Product[]>([
    { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
    { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
    { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 月が変わったら既存データを読み込む
  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/email/monthly-products?month=${selectedMonth}`);
        const data = await response.json();

        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // デフォルトの3つの空フォーム
          setProducts([
            { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
            { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
            { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch monthly products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedMonth, isOpen]);

  // 楽天APIから商品情報を取得
  const fetchProductInfo = async (affiliateUrl: string, index: number) => {
    if (!affiliateUrl) return;

    console.log('=== URL解析開始 ===');
    console.log('入力URL:', affiliateUrl);

    try {
      // 楽天アフィリエイトURLから実際の商品URLを抽出
      let actualUrl = affiliateUrl.trim(); // 前後の空白を削除

      // アフィリエイトURLの場合、エンコードされた商品URLを抽出
      if (affiliateUrl.includes('hb.afl.rakuten.co.jp') || affiliateUrl.includes('a.r10.to')) {
        console.log('アフィリエイトURL形式を検出');
        // URLパラメータから商品URLを抽出
        const pcMatch = affiliateUrl.match(/[?&]pc=([^&]+)/);
        if (pcMatch) {
          actualUrl = decodeURIComponent(pcMatch[1]);
          console.log('pc パラメータから抽出:', actualUrl);
        } else {
          // 直接リダイレクト先を含む場合
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

      // まずitem.rakuten.co.jpドメインかチェック
      if (actualUrl.includes('item.rakuten.co.jp')) {
        // パス部分を抽出（クエリパラメータの前まで）
        const pathMatch = actualUrl.match(/item\.rakuten\.co\.jp\/([^?#]+)/);
        
        console.log('正規表現マッチ結果:', pathMatch);
        
        if (pathMatch) {
          // マッチした部分から末尾のスラッシュを削除してから分割
          const pathParts = pathMatch[1].replace(/\/$/, '').split('/').filter(p => p);
          
          console.log('パス分割結果:', pathParts);
          console.log('パーツ数:', pathParts.length);

          if (pathParts.length >= 2) {
            // 最初が'item'なら除外（パターン1対応）
            if (pathParts[0] === 'item') {
              shopCode = pathParts[1];
              itemCode = pathParts[2];
              console.log('パターン1検出: /item/shopCode/itemCode/');
            } else {
              // 通常のパターン: /shopCode/itemCode/
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

      // 楽天Product API経由で商品情報を取得
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log('APIレスポンスステータス:', response.status);
      console.log('APIレスポンスデータ:', data);

      if (data.error) {
        // 404の場合は、URLだけ保存して手動入力を促す
        if (response.status === 404) {
          const shouldContinue = confirm(
            '楽天APIでこの商品が見つかりませんでした。\n\n' +
            '商品が削除されているか、APIで取得できない商品の可能性があります。\n' +
            'URLだけ保存して、商品情報を手動で入力しますか？\n\n' +
            'shopCode: ' + shopCode + '\n' +
            'itemCode: ' + itemCode
          );

          if (shouldContinue) {
            // URLだけ保存
            const newProducts = [...products];
            newProducts[index] = {
              ...newProducts[index],
              affiliateUrl,
            };
            setProducts(newProducts);
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
        affiliateUrl,
        itemName: data.itemName || '',
        itemPrice: data.itemPrice || 0,
        imageUrl: data.mediumImageUrls?.[0]?.imageUrl || data.smallImageUrls?.[0]?.imageUrl || '',
        category: data.genreId || '',
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
      alert('少なくとも1つの商品を設定してください');
      return;
    }

    setSaving(true);
    try {
      await onSave(selectedMonth, validProducts);
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
    setProducts([
      ...products,
      { affiliateUrl: '', itemName: '', itemPrice: 0, imageUrl: '', category: '' },
    ]);
  };

  const removeProductSlot = (index: number) => {
    if (products.length <= 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const monthlyStrategy = MONTHLY_APPEAL_STRATEGIES[selectedMonth];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">月別おすすめ商品設定</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* 月選択 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              設定する月を選択
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="block w-full max-w-xs px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}月
                </option>
              ))}
            </select>
          </div>

          {/* 月のテーマ表示 */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-bold text-purple-900 mb-2">
              {selectedMonth}月のテーマ: {monthlyStrategy.appealReason}
            </h3>
            <p className="text-sm text-purple-700">{monthlyStrategy.detailedReason}</p>
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
                      <h3 className="font-bold text-gray-700">商品 {index + 1}</h3>
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
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    )}

                    {/* 手動入力フィールド（必要に応じて） */}
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
