import { User, Donation } from '@/types';
import { EmailVariables } from '@/types/email';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { getCurrentSeasonalKeywords } from '@/utils/seasonality';

/**
 * ユーザーの寄付履歴を取得
 */
async function getUserDonations(userId: string, year?: number): Promise<Donation[]> {
  const db = getFirestoreAdmin();
  const currentYear = year || new Date().getFullYear();

  const donationsSnapshot = await db
    .collection('donations')
    .where('userId', '==', userId)
    .where('year', '==', currentYear)
    .orderBy('donatedAt', 'desc')
    .get();

  return donationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    donatedAt: doc.data().donatedAt?.toDate(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as Donation[];
}

/**
 * ユーザーのお気に入りカテゴリを取得（寄付履歴から分析）
 */
function getFavoriteCategory(user: User, donations: Donation[]): string {
  // まずユーザーの好みカテゴリをチェック
  if (user.preferences.categories && user.preferences.categories.length > 0) {
    return user.preferences.categories[0];
  }

  // 寄付履歴がない場合はデフォルト
  if (donations.length === 0) {
    return '海鮮';
  }

  // 寄付履歴から最頻出のカテゴリを推測（簡易版）
  // 実際は商品名から推測する必要がある
  return '海鮮';
}

/**
 * 残り限度額を計算
 */
function calculateRemainingLimit(user: User, donations: Donation[]): number {
  const currentYear = new Date().getFullYear().toString();
  const limit = user.limitHistory?.[currentYear] || user.calculatedLimit || 0;

  const totalDonations = donations.reduce((sum, donation) => sum + donation.productPrice, 0);

  return Math.max(0, limit - totalDonations);
}

/**
 * 利用率を計算
 */
function calculateUsageRate(user: User, donations: Donation[]): number {
  const currentYear = new Date().getFullYear().toString();
  const limit = user.limitHistory?.[currentYear] || user.calculatedLimit || 0;

  if (limit === 0) return 0;

  const totalDonations = donations.reduce((sum, donation) => sum + donation.productPrice, 0);

  return Math.min(100, Math.round((totalDonations / limit) * 100));
}

/**
 * 最終寄付日を取得
 */
function getLastDonationDate(donations: Donation[]): string | undefined {
  if (donations.length === 0) return undefined;

  const lastDonation = donations[0]; // 既にdescでソート済み
  const date = lastDonation.donatedAt;

  return date ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日` : undefined;
}

/**
 * おすすめ商品を取得（ルールベース）
 */
async function getRecommendedProducts(
  user: User,
  remainingLimit: number,
  count: number = 3
): Promise<EmailVariables['products']> {
  // 季節の旬のキーワードを取得
  const seasonalKeywords = getCurrentSeasonalKeywords();

  // ユーザーの好みカテゴリ
  const favoriteCategories = user.preferences.categories || [];

  // カテゴリの優先順位（好み > 季節キーワード）
  const priorityCategories = [
    ...favoriteCategories,
    ...seasonalKeywords.filter(cat => !favoriteCategories.includes(cat)),
  ];

  // キャッシュから商品を取得
  const db = getFirestoreAdmin();
  const products: EmailVariables['products'] = [];

  for (const category of priorityCategories.slice(0, 3)) {
    // シンプルなクエリで取得してアプリケーション側でフィルタリング
    const snapshot = await db
      .collection('cachedProducts')
      .where('category', '==', category)
      .orderBy('itemPrice', 'desc')
      .limit(10) // 上位10件を取得
      .get();

    if (!snapshot.empty) {
      // 限度額以下の商品をフィルタリング
      const validDocs = snapshot.docs.filter(doc => doc.data().itemPrice <= remainingLimit);

      if (validDocs.length > 0) {
        const doc = validDocs[0]; // 最も高額な商品
        const data = doc.data();

        products.push({
          name: data.itemName,
          price: data.itemPrice,
          imageUrl: data.imageUrl,
          url: data.affiliateUrl,
          category: data.category,
        });
      }
    }

    if (products.length >= count) break;
  }

  return products;
}

/**
 * ユーザーに合わせたメール変数を生成
 */
export async function generateEmailVariables(
  user: User,
  templateId: string
): Promise<EmailVariables> {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // 今年の寄付履歴を取得
  const donations = await getUserDonations(user.uid, currentYear);

  // 基本情報
  const userName = user.displayName || 'お客様';
  const remainingLimit = calculateRemainingLimit(user, donations);
  const usageRate = calculateUsageRate(user, donations);
  const favoriteCategory = getFavoriteCategory(user, donations);
  const lastDonationDate = getLastDonationDate(donations);
  const totalDonations = donations.reduce((sum, d) => sum + d.productPrice, 0);

  // 基本変数
  const variables: EmailVariables = {
    userName,
    userEmail: user.email,
    remainingLimit,
    usageRate,
    favoriteCategory,
    lastDonationDate,
    totalDonations,
    year: currentYear,
    month: currentMonth,
  };

  // テンプレートごとに商品リストを追加
  if (templateId === 'seasonal_recommendation') {
    variables.products = await getRecommendedProducts(user, remainingLimit, 3);
  } else if (templateId === 'limit_reminder' || templateId === 'year_end_rush') {
    variables.products = await getRecommendedProducts(user, remainingLimit, 2);
  }

  return variables;
}

/**
 * セグメント判定: 新規ユーザー
 */
export function isNewUser(donations: Donation[]): boolean {
  return donations.length === 0;
}

/**
 * セグメント判定: アクティブユーザー
 */
export function isActiveUser(donations: Donation[]): boolean {
  return donations.length >= 3;
}

/**
 * セグメント判定: 上限近い
 */
export function isNearLimit(usageRate: number): boolean {
  return usageRate >= 80;
}
