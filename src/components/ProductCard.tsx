'use client';

import { Recommendation } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  recommendation: Recommendation;
  userId?: string;
  onDonationAdded?: () => void;
}

export default function ProductCard({ recommendation, userId, onDonationAdded }: ProductCardProps) {
  const { product, reason } = recommendation;
  const [adding, setAdding] = useState(false);

  if (!product) {
    return null;
  }

  const handleAddDonation = async () => {
    if (!userId) {
      alert('ログインが必要です');
      return;
    }

    if (!confirm(`「${product.itemName}」を寄付履歴に追加しますか？`)) {
      return;
    }

    setAdding(true);
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productName: product.itemName,
          productPrice: product.itemPrice,
          productUrl: product.affiliateUrl || product.itemUrl,
          itemCode: product.itemCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '寄付履歴の追加に失敗しました');
      }

      alert('寄付履歴に追加しました');
      if (onDonationAdded) {
        onDonationAdded();
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      alert(error instanceof Error ? error.message : '寄付履歴の追加に失敗しました');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* 商品画像 */}
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-700">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.itemName}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            画像なし
          </div>
        )}
      </div>

      {/* 商品情報 */}
      <div className="p-4 space-y-3">
        {/* 商品名 */}
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[3rem]">
          {product.itemName}
        </h3>

        {/* 価格 */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {product.itemPrice.toLocaleString()}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">円</span>
        </div>

        {/* ショップ名 */}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {product.shopName}
        </p>

        {/* レビュー情報 */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-accent-500">★</span>
            <span className="text-slate-700 dark:text-slate-300">
              {product.reviewAverage.toFixed(1)}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              ({product.reviewCount}件)
            </span>
          </div>
        )}

        {/* 推薦理由 */}
        <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-3">
          <p className="text-xs text-accent-700 dark:text-accent-400 mb-1 font-semibold">
            おすすめポイント
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {reason}
          </p>
        </div>

        {/* ボタングループ */}
        <div className="space-y-2">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
          >
            この返礼品を見る
          </a>
          {userId && (
            <button
              onClick={handleAddDonation}
              disabled={adding}
              className="w-full bg-success-500 hover:bg-success-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {adding ? '追加中...' : '寄付履歴に追加'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
