'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { Recommendation, Donation } from '@/types';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading, updateUserData } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [displayedItemCodes, setDisplayedItemCodes] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [dislikes, setDislikes] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasInitialLoadCompleted = useRef(false);

  const fetchDonations = async () => {
    if (!user) return;

    try {
      const currentYear = new Date().getFullYear();
      const donationsRef = collection(db, 'donations');
      const q = query(
        donationsRef,
        where('userId', '==', user.uid),
        where('year', '==', currentYear),
        orderBy('donatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const donationsList: Donation[] = [];

      querySnapshot.forEach((doc) => {
        donationsList.push({
          id: doc.id,
          ...doc.data(),
          donatedAt: doc.data().donatedAt.toDate(),
        } as Donation);
      });

      setDonations(donationsList);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchRecommendations = useCallback(async (excludeItemCodes?: string[], isInitialLoad = false) => {
    if (!user) return;

    setLoadingRecommendations(true);
    if (isInitialLoad) {
      setError(null);
    }

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          excludeItemCodes: excludeItemCodes || []
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // 返礼品が見つからない場合の特別な処理
        if (errorData.error === '返礼品が見つかりませんでした') {
          // 初回ロード時は深刻なエラーとして扱う
          if (isInitialLoad) {
            throw new Error('お客様の条件に合う返礼品が見つかりませんでした。プロフィール設定を変更してみてください。');
          }
          // 無限スクロール時は静かに終了（これ以上の候補がない）
          console.log('No more recommendations available');
          return;
        }

        throw new Error(errorData.error || '推薦の取得に失敗しました');
      }

      const data = await response.json();
      const newRecommendations = data.recommendations;

      // 重複を除外して新しい推薦のみを追加
      const filteredRecommendations = newRecommendations.filter((rec: Recommendation) =>
        !displayedItemCodes.has(rec.itemCode)
      );

      // 新しい推薦を追加
      setRecommendations(prev => [...prev, ...filteredRecommendations]);

      // 表示済みアイテムコードを更新
      const newItemCodes = new Set(displayedItemCodes);
      filteredRecommendations.forEach((rec: Recommendation) => {
        if (rec.itemCode) {
          newItemCodes.add(rec.itemCode);
        }
      });
      setDisplayedItemCodes(newItemCodes);

      // 初回ロードが完了したことを記録
      if (isInitialLoad) {
        hasInitialLoadCompleted.current = true;
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      if (isInitialLoad) {
        setError(error instanceof Error ? error.message : '推薦の取得に失敗しました');
      }
    } finally {
      setLoadingRecommendations(false);
    }
  }, [user, displayedItemCodes]);

  // 合計寄付額を計算（今年のみ）
  const totalDonated = donations.reduce((sum, d) => sum + d.productPrice, 0);
  const remainingLimit = user ? Math.max(0, user.calculatedLimit - totalDonated) : 0;

  // 気になる・興味なしリストを初期化
  useEffect(() => {
    if (user) {
      if (user.preferences.favorites) {
        setFavorites(new Set(user.preferences.favorites));
      }
      if (user.preferences.dislikes) {
        setDislikes(new Set(user.preferences.dislikes));
      }
    }
  }, [user]);

  // 気になるトグル
  const handleFavoriteToggle = async (itemCode: string) => {
    if (!user) return;

    const newFavorites = new Set(favorites);
    const newDislikes = new Set(dislikes);

    if (newFavorites.has(itemCode)) {
      newFavorites.delete(itemCode);
    } else {
      newFavorites.add(itemCode);
      // 気になるに追加する場合は興味なしから削除
      newDislikes.delete(itemCode);
    }

    setFavorites(newFavorites);
    setDislikes(newDislikes);

    // Firestoreに保存
    try {
      await updateUserData({
        preferences: {
          ...user.preferences,
          favorites: Array.from(newFavorites),
          dislikes: Array.from(newDislikes),
        },
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // 興味なしトグル
  const handleDislikeToggle = async (itemCode: string) => {
    if (!user) return;

    const newDislikes = new Set(dislikes);
    const newFavorites = new Set(favorites);

    if (newDislikes.has(itemCode)) {
      newDislikes.delete(itemCode);
    } else {
      newDislikes.add(itemCode);
      // 興味なしに追加する場合は気になるから削除
      newFavorites.delete(itemCode);
    }

    setDislikes(newDislikes);
    setFavorites(newFavorites);

    // Firestoreに保存
    try {
      await updateUserData({
        preferences: {
          ...user.preferences,
          favorites: Array.from(newFavorites),
          dislikes: Array.from(newDislikes),
        },
      });
    } catch (error) {
      console.error('Error updating dislikes:', error);
    }
  };

  // フィルター済みの推薦リスト
  const filteredRecommendations = showFavoritesOnly
    ? recommendations.filter(rec => favorites.has(rec.itemCode))
    : recommendations;

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    } else if (user && user.calculatedLimit === 0) {
      // 限度額が設定されていない場合はプロフィール設定へ
      router.push('/profile');
    } else if (user) {
      // 寄付履歴を取得
      fetchDonations();
      // 自動的に推薦を取得（初回ロードフラグを渡す）
      if (recommendations.length === 0) {
        fetchRecommendations([], true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);

  // 無限スクロール用のIntersection Observer
  useEffect(() => {
    // 初回ロードが完了するまでObserverを有効化しない
    if (!loadMoreRef.current || !user || !hasInitialLoadCompleted.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRecommendations) {
          // スクロールが最下部に到達したら、表示済みアイテムを除外して新しい推薦を取得
          const excludeCodes = Array.from(displayedItemCodes);
          fetchRecommendations(excludeCodes);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [user, loadingRecommendations, displayedItemCodes, fetchRecommendations, recommendations.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-slate-900">
      {/* ヘッダー */}
      <Header
        user={user}
        calculatedLimit={user?.calculatedLimit || 0}
        totalDonated={totalDonated}
        remainingLimit={remainingLimit}
      />

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 mt-4">

        {/* 推薦セクション */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              あなたへのおすすめ返礼品
            </h2>

            {/* 気になるフィルター */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                showFavoritesOnly
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:border-pink-500'
              }`}
            >
              <span className="text-xl">{showFavoritesOnly ? '♥' : '♡'}</span>
              <span className="text-sm">気になる{showFavoritesOnly && 'のみ'}</span>
              {favorites.size > 0 && (
                <span className="bg-white dark:bg-slate-700 text-pink-500 px-2 py-0.5 rounded-full text-xs font-bold">
                  {favorites.size}
                </span>
              )}
            </button>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-accent-700 dark:text-accent-400 mb-3">{error}</p>
                  <button
                    onClick={() => router.push('/profile')}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    プロフィール設定を変更
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ローディング状態 */}
          {loadingRecommendations && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">
                  AIがあなたにぴったりの返礼品を選んでいます...
                </p>
              </div>
            </div>
          )}

          {/* 推薦リスト */}
          {filteredRecommendations.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {filteredRecommendations.map((rec, index) => (
                <ProductCard
                  key={`${rec.itemCode}-${index}`}
                  recommendation={rec}
                  userId={user?.uid}
                  isFavorite={favorites.has(rec.itemCode)}
                  isDisliked={dislikes.has(rec.itemCode)}
                  onFavoriteToggle={handleFavoriteToggle}
                  onDislikeToggle={handleDislikeToggle}
                  onDonationAdded={() => {
                    // 寄付履歴に追加されたら、サマリーカードを更新
                    fetchDonations();
                  }}
                />
              ))}
            </div>
          )}

          {/* 気になる商品がない場合 */}
          {showFavoritesOnly && filteredRecommendations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                気になる商品がまだありません
              </p>
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                すべて表示
              </button>
            </div>
          )}

          {/* 無限スクロール用のトリガー要素 */}
          <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
            {loadingRecommendations && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  新しいおすすめを読み込み中...
                </p>
              </div>
            )}
          </div>

          {/* 推薦がない場合 */}
          {!loadingRecommendations && recommendations.length === 0 && !error && !showFavoritesOnly && (
            <div className="text-center py-20">
              <p className="text-slate-600 dark:text-slate-400">
                AIがおすすめを準備中です...
              </p>
            </div>
          )}
        </div>

        {/* ヒント */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2 text-sm">
            💡 ヒント
          </h3>
          <ul className="text-xs text-primary-800 dark:text-primary-200 space-y-1">
            <li>• 下にスクロールすると、新しいおすすめが自動で表示されます</li>
            <li>• プロフィール設定を変更すると、より最適な返礼品が提案されます</li>
            <li>• 限度額を超えないよう、残りの限度額を確認しましょう</li>
          </ul>
        </div>

        {/* 楽天アフィリエイト注釈 */}
        <div className="text-center py-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            楽天アフィリエイトを利用しています
          </p>
        </div>
      </main>

      {/* ログインモーダル */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => router.push('/')}
        canClose={false}
      />
    </div>
  );
}
