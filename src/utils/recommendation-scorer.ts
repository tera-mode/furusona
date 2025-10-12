/**
 * 推薦スコアリングユーティリティ
 *
 * 総合スコア =
 *   基本スコア（Claude評価）× 0.5
 *   + ユーザー好み一致度 × 0.2
 *   + 新着ボーナス × 0.15
 *   + 季節性ボーナス × 0.1
 *   + ランダム要素 × 0.05
 */

import { RakutenProduct } from '@/types';
import { getSeasonalBonus } from './seasonality';

export interface ScoringInput {
  product: RakutenProduct;
  claudeScore: number; // Claude APIからの基本スコア（0-100）
  userCategories: string[]; // ユーザーの好みカテゴリ
  isNew: boolean; // 新着商品フラグ
  randomFactor?: number; // ランダム要素（0-1、省略時は自動生成）
}

export interface ScoringResult {
  totalScore: number;
  breakdown: {
    baseScore: number;
    categoryMatchScore: number;
    newProductBonus: number;
    seasonalBonus: number;
    randomBonus: number;
  };
}

/**
 * 総合スコアを計算
 */
export function calculateTotalScore(input: ScoringInput): ScoringResult {
  const {
    product,
    claudeScore,
    userCategories,
    isNew,
    randomFactor = Math.random(),
  } = input;

  // 1. 基本スコア（Claude評価） × 0.5
  const baseScore = claudeScore * 0.5;

  // 2. ユーザー好み一致度 × 0.2
  const categoryMatchScore = calculateCategoryMatchScore(
    product.itemName,
    userCategories
  ) * 0.2;

  // 3. 新着ボーナス × 0.15
  const newProductBonus = isNew ? 10 * 0.15 : 0;

  // 4. 季節性ボーナス × 0.1
  const seasonalBonus = getSeasonalBonus(product.itemName) * 0.1;

  // 5. ランダム要素 × 0.05
  const randomBonus = (randomFactor * 10) * 0.05;

  // 総合スコア
  const totalScore = baseScore + categoryMatchScore + newProductBonus + seasonalBonus + randomBonus;

  return {
    totalScore: Math.min(100, totalScore), // 最大100点
    breakdown: {
      baseScore,
      categoryMatchScore,
      newProductBonus,
      seasonalBonus,
      randomBonus,
    },
  };
}

/**
 * カテゴリ一致度スコアを計算（0-100）
 */
function calculateCategoryMatchScore(
  productName: string,
  userCategories: string[]
): number {
  if (userCategories.length === 0) return 50; // デフォルトスコア

  const productNameLower = productName.toLowerCase();

  // ユーザーカテゴリとのマッチング
  const matches = userCategories.filter(category =>
    productNameLower.includes(category.toLowerCase())
  );

  if (matches.length === 0) return 30; // 一致なし
  if (matches.length === 1) return 70; // 1つ一致
  return 100; // 複数一致
}

/**
 * ランダム要素を持つ商品を選定（宝探し感）
 * @param products 商品リスト
 * @param excludeCategories 除外するカテゴリ（ユーザーの過去閲覧履歴）
 * @param count 選定する件数
 * @returns 選定された商品
 */
export function selectRandomDiscoveryProducts(
  products: RakutenProduct[],
  excludeCategories: string[],
  count: number = 1
): RakutenProduct[] {
  // 除外カテゴリに含まれない商品をフィルタリング
  const candidateProducts = products.filter(product => {
    const productNameLower = product.itemName.toLowerCase();
    return !excludeCategories.some(category =>
      productNameLower.includes(category.toLowerCase())
    );
  });

  if (candidateProducts.length === 0) {
    // 除外カテゴリに該当しない商品がない場合は全商品から選択
    return selectHighRatedRandomProducts(products, count);
  }

  // 高評価商品を優先しつつランダム選択
  return selectHighRatedRandomProducts(candidateProducts, count);
}

/**
 * 高評価商品を優先しつつランダム選択
 */
function selectHighRatedRandomProducts(
  products: RakutenProduct[],
  count: number
): RakutenProduct[] {
  // レビュー平均4.0以上の商品を優先
  const highRated = products.filter(p => p.reviewAverage >= 4.0);
  const pool = highRated.length > 0 ? highRated : products;

  // ランダムにシャッフル
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

/**
 * 新着商品の割合を計算
 */
export function calculateNewProductRatio(products: Array<{ isNew: boolean }>): number {
  if (products.length === 0) return 0;

  const newCount = products.filter(p => p.isNew).length;
  return newCount / products.length;
}

/**
 * 新着商品の割合が目標範囲内かチェック
 */
export function isNewProductRatioInRange(
  products: Array<{ isNew: boolean }>,
  targetMin: number = 0.2,
  targetMax: number = 0.3
): boolean {
  const ratio = calculateNewProductRatio(products);
  return ratio >= targetMin && ratio <= targetMax;
}
