/**
 * 季節性判定ユーティリティ
 *
 * 現在の月に基づいて季節を判定し、季節に合った商品カテゴリを提供
 */

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonalCategory {
  keywords: string[];
  description: string;
}

/**
 * 現在の月から季節を判定
 */
export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1; // 1-12

  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

/**
 * 季節ごとのおすすめカテゴリとキーワード
 */
export const SEASONAL_CATEGORIES: Record<Season, SeasonalCategory> = {
  spring: {
    keywords: [
      'いちご',
      'さくらんぼ',
      '新茶',
      'アスパラガス',
      'たけのこ',
      '花',
      '山菜',
      '新玉ねぎ',
      'メロン',
      'マンゴー',
    ],
    description: '春の旬の味覚と新生活',
  },
  summer: {
    keywords: [
      'ビール',
      'アイス',
      'そうめん',
      '桃',
      'スイカ',
      'ぶどう',
      '海鮮',
      'うなぎ',
      'トマト',
      'きゅうり',
      'とうもろこし',
      '枝豆',
    ],
    description: '夏の爽やかな味覚',
  },
  autumn: {
    keywords: [
      'お米',
      '新米',
      '栗',
      'さつまいも',
      'かぼちゃ',
      'きのこ',
      '梨',
      'りんご',
      'ぶどう',
      '柿',
      '松茸',
      'サンマ',
    ],
    description: '秋の実りと収穫',
  },
  winter: {
    keywords: [
      '鍋セット',
      'カニ',
      'ズワイガニ',
      'タラバガニ',
      'ふぐ',
      'お歳暮',
      '温泉',
      '旅行券',
      'みかん',
      'りんご',
      'いくら',
      'ホタテ',
      'おせち',
    ],
    description: '冬の味覚と温かい食材',
  },
};

/**
 * 商品名が季節に合致するかチェック
 * @param productName 商品名
 * @param season 判定する季節（省略時は現在の季節）
 * @returns 合致する場合true
 */
export function isSeasonalProduct(productName: string, season?: Season): boolean {
  const targetSeason = season || getCurrentSeason();
  const seasonalKeywords = SEASONAL_CATEGORIES[targetSeason].keywords;

  return seasonalKeywords.some(keyword =>
    productName.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * 商品に季節性ボーナススコアを付与
 * @param productName 商品名
 * @returns ボーナススコア（0-5）
 */
export function getSeasonalBonus(productName: string): number {
  if (isSeasonalProduct(productName)) {
    return 5;
  }
  return 0;
}

/**
 * 現在の季節に合うカテゴリキーワードを取得
 * @returns 季節に合うキーワード配列
 */
export function getCurrentSeasonalKeywords(): string[] {
  const season = getCurrentSeason();
  return SEASONAL_CATEGORIES[season].keywords;
}

/**
 * 季節名を日本語で取得
 */
export function getSeasonName(season: Season): string {
  const seasonNames = {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  };
  return seasonNames[season];
}

/**
 * 現在の季節の説明を取得
 */
export function getCurrentSeasonDescription(): string {
  const season = getCurrentSeason();
  return SEASONAL_CATEGORIES[season].description;
}
