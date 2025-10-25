'use client';

import { Recommendation } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  recommendation: Recommendation;
  userId?: string;
  isFavorite?: boolean;
  isDisliked?: boolean;
  onDonationAdded?: () => void;
  onFavoriteToggle?: (itemCode: string) => void;
  onDislikeToggle?: (itemCode: string) => void;
}

export default function ProductCard({
  recommendation,
  userId,
  isFavorite = false,
  isDisliked = false,
  onDonationAdded,
  onFavoriteToggle,
  onDislikeToggle
}: ProductCardProps) {
  const { product, reason } = recommendation;
  const [adding, setAdding] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const [disliking, setDisliking] = useState(false);

  if (!product) {
    return null;
  }

  const handleToggleFavorite = async () => {
    if (!userId || !onFavoriteToggle) return;

    setFavoriting(true);
    try {
      onFavoriteToggle(product.itemCode);
    } finally {
      setFavoriting(false);
    }
  };

  const handleToggleDislike = async () => {
    if (!userId || !onDislikeToggle) return;

    setDisliking(true);
    try {
      onDislikeToggle(product.itemCode);
    } finally {
      setDisliking(false);
    }
  };

  const handleRecordView = async () => {
    if (!userId) return;

    try {
      await fetch('/api/viewed-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          itemCode: product.itemCode,
          itemName: product.itemName,
          itemPrice: product.itemPrice,
          itemUrl: product.itemUrl,
          affiliateUrl: product.affiliateUrl,
          imageUrl: product.imageUrl,
          shopName: product.shopName,
        }),
      });
    } catch (error) {
      console.error('Error recording view:', error);
      // エラーがあってもユーザー体験を阻害しないため、エラーは握りつぶす
    }
  };

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
      {/* 商品画像 - クリッカブル */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleRecordView}
        className="block relative aspect-square bg-slate-100 dark:bg-slate-700 hover:opacity-90 transition-opacity"
      >
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
      </a>

      {/* 商品情報 */}
      <div className="p-4 space-y-3">
        {/* 商品名 - クリッカブル */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRecordView}
          className="block"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[3rem] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
            {product.itemName}
          </h3>
        </a>

        {/* 価格と気になる・興味なしボタン */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {product.itemPrice.toLocaleString()}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">円</span>
          </div>

          {/* 気になる・興味なしボタン */}
          {userId && (onFavoriteToggle || onDislikeToggle) && (
            <div className="flex items-center gap-2">
              {/* 興味なしボタン */}
              {onDislikeToggle && (
                <button
                  onClick={handleToggleDislike}
                  disabled={disliking}
                  className={`p-2 rounded-full transition-all ${
                    isDisliked
                      ? 'bg-slate-400 text-white hover:bg-slate-500'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
                  } disabled:opacity-50`}
                  title={isDisliked ? '興味なしから削除' : '興味なしに追加'}
                >
                  <span className="text-xl">{isDisliked ? '▲' : '△'}</span>
                </button>
              )}

              {/* 気になるボタン */}
              {onFavoriteToggle && (
                <button
                  onClick={handleToggleFavorite}
                  disabled={favoriting}
                  className={`p-2 rounded-full transition-all ${
                    isFavorite
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-600'
                  } disabled:opacity-50`}
                  title={isFavorite ? '気になるから削除' : '気になるに追加'}
                >
                  <span className="text-xl">{isFavorite ? '♥' : '♡'}</span>
                </button>
              )}
            </div>
          )}
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
            onClick={handleRecordView}
            className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
          >
            この返礼品を見る
          </a>
          {userId && (
            <button
              onClick={handleAddDonation}
              disabled={adding}
              className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {adding ? '追加中...' : '購入済みに変更'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
