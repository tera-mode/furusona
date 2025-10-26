'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import Header from '@/components/Header';
import { Donation, ViewedProduct } from '@/types';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Tab = 'donations' | 'viewed';

export default function PastRecordsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('donations');

  // 寄付履歴関連
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [adding, setAdding] = useState(false);

  // 手動追加フォームの状態
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productUrl: '',
  });

  // 閲覧履歴関連
  const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([]);
  const [loadingViewed, setLoadingViewed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    } else if (user) {
      if (activeTab === 'donations') {
        fetchDonations();
      } else if (activeTab === 'viewed') {
        fetchViewedProducts();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, activeTab]);

  const fetchDonations = async () => {
    if (!user) return;

    setLoadingDonations(true);
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
    } finally {
      setLoadingDonations(false);
    }
  };

  const fetchViewedProducts = async () => {
    if (!user) return;

    setLoadingViewed(true);
    try {
      const response = await fetch(`/api/viewed-products?userId=${user.uid}&limit=50`);
      if (!response.ok) {
        throw new Error('閲覧履歴の取得に失敗しました');
      }
      const data = await response.json();
      setViewedProducts(data.viewedProducts || []);
    } catch (error) {
      console.error('Error fetching viewed products:', error);
    } finally {
      setLoadingViewed(false);
    }
  };

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (!formData.productName || !formData.productPrice || !formData.productUrl) {
      alert('すべての項目を入力してください');
      return;
    }

    setAdding(true);
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          productName: formData.productName,
          productPrice: Number(formData.productPrice),
          productUrl: formData.productUrl,
          year: new Date().getFullYear(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '寄付の追加に失敗しました');
      }

      alert('今年の寄付として追加しました');
      setFormData({ productName: '', productPrice: '', productUrl: '' });
      setShowAddForm(false);
      // 寄付履歴を再取得
      fetchDonations();
    } catch (error) {
      console.error('Error adding donation:', error);
      alert(error instanceof Error ? error.message : '寄付の追加に失敗しました');
    } finally {
      setAdding(false);
    }
  };

  // 合計寄付額を計算（今年のみ）
  const totalDonated = donations.reduce((sum, d) => sum + d.productPrice, 0);
  const remainingLimit = user && user.calculatedLimit ? Math.max(0, user.calculatedLimit - totalDonated) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* ヘッダー */}
      <Header
        user={user}
        calculatedLimit={user?.calculatedLimit || 0}
        totalDonated={totalDonated}
        remainingLimit={remainingLimit}
      />

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          過去履歴
        </h2>

        {/* タブ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('donations')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'donations'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              今年すでに行ったふるさと納税
            </button>
            <button
              onClick={() => setActiveTab('viewed')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'viewed'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              閲覧履歴
            </button>
          </div>
        </div>

        {/* 今年の寄付タブ */}
        {activeTab === 'donations' && (
          <>
            {/* 追加ボタン */}
            <div className="mb-8 flex justify-end">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {showAddForm ? 'キャンセル' : '今年の寄付を追加'}
              </button>
            </div>

            {/* 手動追加フォーム */}
            {showAddForm && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  今年すでに行ったふるさと納税を追加
                </h3>
                <form onSubmit={handleAddDonation} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      返礼品名 *
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                      placeholder="例: 北海道産 いくら醤油漬け 500g"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      寄付額（円） *
                    </label>
                    <input
                      type="number"
                      value={formData.productPrice}
                      onChange={(e) => setFormData({ ...formData, productPrice: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                      placeholder="例: 10000"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      返礼品URL *
                    </label>
                    <input
                      type="url"
                      value={formData.productUrl}
                      onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100"
                      placeholder="例: https://example.com/product/123"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={adding}
                    className="w-full bg-success-500 hover:bg-success-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {adding ? '追加中...' : '今年の寄付として追加'}
                  </button>
                </form>
              </div>
            )}

            {/* 寄付リスト */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              {loadingDonations ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-slate-600 dark:text-slate-400">読み込み中...</div>
                </div>
              ) : donations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          寄付日
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          返礼品名
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          寄付額
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          リンク
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {donations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                            {donation.donatedAt.toLocaleDateString('ja-JP')}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                            {donation.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-slate-900 dark:text-slate-100">
                            {donation.productPrice.toLocaleString()}円
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <a
                              href={donation.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600"
                            >
                              詳細
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    今年の寄付履歴はありません
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    おすすめを見る
                  </button>
                </div>
              )}
            </div>

            {/* 注意事項 */}
            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ 注意事項
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• 他サイトで寄付した返礼品も「今年の寄付を追加」ボタンから記録できます</li>
                <li>• ダッシュボードで推薦された返礼品から直接追加することもできます</li>
                <li>• ふるさと納税の控除を受けるには、確定申告またはワンストップ特例制度の申請が必要です</li>
                <li>• 限度額を超えた寄付は自己負担となりますのでご注意ください</li>
              </ul>
            </div>
          </>
        )}

        {/* 閲覧履歴タブ */}
        {activeTab === 'viewed' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            {loadingViewed ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-slate-600 dark:text-slate-400">読み込み中...</div>
              </div>
            ) : viewedProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        閲覧日時
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        商品画像
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        返礼品名
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        価格
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        リンク
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {viewedProducts.map((viewed) => (
                      <tr key={viewed.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
                          {new Date(viewed.viewedAt).toLocaleString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={viewed.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-16 h-16"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={viewed.imageUrl}
                              alt={viewed.itemName}
                              className="w-full h-full object-contain bg-slate-100 dark:bg-slate-700 rounded"
                              loading="lazy"
                            />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                          <a
                            href={viewed.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {viewed.itemName}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-slate-900 dark:text-slate-100">
                          {viewed.itemPrice.toLocaleString()}円
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <a
                            href={viewed.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                          >
                            詳細
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👀</div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  閲覧履歴はまだありません
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  ダッシュボードで返礼品をクリックすると、ここに履歴が表示されます
                </p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  ダッシュボードに戻る
                </button>
              </div>
            )}
          </div>
        )}
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
