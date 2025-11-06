import { User, Donation } from '@/types';
import { EmailVariables } from '@/types/email';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { getCurrentSeasonalKeywords, getMonthlyAppealStrategy } from '@/utils/seasonality';

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
 * 季節のおすすめ商品を取得（全ユーザー共通）
 * 1. まずFirestoreの手動設定商品をチェック
 * 2. 手動設定がない場合は、月別訴求戦略のprimaryProductsに基づいて自動検索
 */
async function getSeasonalRecommendedProducts(
  primaryProducts: string[],
  count: number = 3,
  currentMonth?: number
): Promise<EmailVariables['seasonalProducts']> {
  const db = getFirestoreAdmin();
  const products: EmailVariables['seasonalProducts'] = [];
  const month = currentMonth || (new Date().getMonth() + 1);

  // 1. 手動設定の商品を取得
  const manualDoc = await db
    .collection('monthlyRecommendedProducts')
    .doc(`month_${month}`)
    .get();

  if (manualDoc.exists) {
    const manualData = manualDoc.data();
    const manualProducts = manualData?.products || [];

    if (manualProducts.length > 0) {
      console.log(`Using manually configured products for month ${month}`);
      // 手動設定商品をそのまま使用
      return manualProducts.slice(0, count).map((p: {
        itemName: string;
        itemPrice: number;
        imageUrl: string;
        affiliateUrl: string;
        category: string;
      }) => ({
        name: p.itemName,
        price: p.itemPrice,
        imageUrl: p.imageUrl,
        url: p.affiliateUrl,
        category: p.category,
      }));
    }
  }

  // 2. 手動設定がない場合は自動検索（従来の仕組み）
  console.log(`No manual products found for month ${month}, using automatic search`);

  // primaryProductsに含まれるカテゴリキーワードで商品を検索
  for (const keyword of primaryProducts) {
    const snapshot = await db
      .collection('cachedProducts')
      .where('category', '==', keyword)
      .orderBy('itemPrice', 'desc')
      .limit(5) // 各カテゴリから上位5件
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0]; // 最も高額な商品を1つ選択
      const data = doc.data();

      products.push({
        name: data.itemName,
        price: data.itemPrice,
        imageUrl: data.imageUrl,
        url: data.affiliateUrl,
        category: data.category,
      });
    }

    if (products.length >= count) break;
  }

  return products;
}

/**
 * おすすめ商品を取得（ルールベース・パーソナライズ）
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
  templateId: string,
  testMonth?: number // デバッグ用の月指定（1-12）
): Promise<EmailVariables> {
  const currentYear = new Date().getFullYear();
  const currentMonth = testMonth || (new Date().getMonth() + 1);

  // 今年の寄付履歴を取得
  const donations = await getUserDonations(user.uid, currentYear);

  // 基本情報
  const userName = user.displayName || 'お客様';
  const remainingLimit = calculateRemainingLimit(user, donations);
  const usageRate = calculateUsageRate(user, donations);
  const favoriteCategory = getFavoriteCategory(user, donations);
  const lastDonationDate = getLastDonationDate(donations);
  const totalDonations = donations.reduce((sum, d) => sum + d.productPrice, 0);

  // 月別訴求戦略を取得
  const monthlyStrategy = getMonthlyAppealStrategy(currentMonth);

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
    // 月別訴求情報を追加
    monthlyAppeal: {
      primaryProducts: monthlyStrategy.primaryProducts,
      appealReason: monthlyStrategy.appealReason,
      detailedReason: monthlyStrategy.detailedReason,
      needsStrength: monthlyStrategy.needsStrength,
    },
  };

  // テンプレートごとに商品リストを追加
  if (templateId === 'seasonal_recommendation') {
    // 季節のおすすめ商品（全ユーザー共通）
    // 手動設定を優先し、なければ自動検索
    variables.seasonalProducts = await getSeasonalRecommendedProducts(
      monthlyStrategy.primaryProducts,
      3,
      currentMonth
    );
    // パーソナライズされたおすすめ商品
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
