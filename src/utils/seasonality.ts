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

/**
 * 月別の訴求戦略データ
 */
export interface MonthlyAppealStrategy {
  month: number;
  primaryProducts: string[]; // 即時訴求品目
  appealReason: string; // なぜ今購入すべきか
  detailedReason: string; // 詳細な理由
  needsStrength: 1 | 2 | 3 | 4 | 5; // ニーズ強度（5段階）
  keywords: string[]; // 検索キーワード
}

export const MONTHLY_APPEAL_STRATEGIES: Record<number, MonthlyAppealStrategy> = {
  1: {
    month: 1,
    primaryProducts: ['カニ', '高級冷凍海鮮', '貯蔵米', '高級牛肉'],
    appealReason: '年末の高需要期を過ぎ、キャンセル分や高品質な在庫が今なら手に入ります',
    detailedReason: '前月の高需要期を経た後、自治体側は残った在庫を早期に処理したいため、競争が少なく高品質な在庫が手に入りやすい時期です。年末の熱気を引き継ぎ、「今ならすぐ届く」贅沢品をお得に確保できます。',
    needsStrength: 4,
    keywords: ['カニ', '海鮮', '冷凍', '米', '牛肉', 'ズワイガニ', 'タラバガニ', 'いくら', 'ホタテ'],
  },
  2: {
    month: 2,
    primaryProducts: ['チョコレート', 'スイーツ', 'ハウス栽培イチゴ'],
    appealReason: 'バレンタインデーという明確なイベント需要で、ギフトに最適な時期です',
    detailedReason: 'バレンタインデーに向けて、常温・冷凍保存が可能な洋菓子や早期収穫のハウス栽培イチゴが充実。物流リスクが低く、贈答品としても最適な返礼品が揃います。',
    needsStrength: 3,
    keywords: ['チョコレート', 'スイーツ', 'いちご', '洋菓子', 'マドレーヌ', 'バレンタイン', 'ギフト'],
  },
  3: {
    month: 3,
    primaryProducts: ['蛤・貝類', 'ハンバーグ', 'ソーセージ', 'ハム'],
    appealReason: '早春の旬の魚介類と、通年人気の高い加工肉で安定供給が期待できます',
    detailedReason: '春の訪れとともに旬を迎える蛤などの魚介類に加え、在庫変動が大きい魚介類を補完する通年人気の加工肉（ハンバーグ、ソーセージ、ハム）が充実。実用性が高く、即時配送可能な返礼品が豊富です。',
    needsStrength: 3,
    keywords: ['貝', '蛤', 'ハンバーグ', 'ソーセージ', 'ハム', '加工肉', '魚介'],
  },
  4: {
    month: 4,
    primaryProducts: ['大容量米', '調味料セット', 'アスパラガス', '常備菜'],
    appealReason: '新生活シーズンで実用的な常備品の需要が急増する時期です',
    detailedReason: '年度変わりに伴う実用的な常備品の需要が高まります。大容量米やセット調味料、冷凍常備菜など、通年で安定供給される返礼品が充実。新生活に必要な実用性の高いアイテムが揃います。',
    needsStrength: 4,
    keywords: ['米', '調味料', 'アスパラガス', '常備菜', '新生活', '大容量', '実用'],
  },
  5: {
    month: 5,
    primaryProducts: ['母の日ギフト（花・スイーツ）', '早期メロン', '体験チケット'],
    appealReason: '母の日という明確なギフト需要があり、配送日指定の確実性が重要です',
    detailedReason: '「贈答品」としての訴求に特化した時期。花束、体験型ギフト（旅行券、食事券）、高級ハウス栽培メロンの早期収穫品など、配送指定日の正確性とパッケージの品質を重視した返礼品が揃います。',
    needsStrength: 4,
    keywords: ['花', 'スイーツ', 'メロン', '母の日', 'ギフト', '体験', '旅行券'],
  },
  6: {
    month: 6,
    primaryProducts: ['さくらんぼ', '早期メロン', '高級フルーツ'],
    appealReason: '年間最高レベルの高級フルーツが旬を迎え、短期間で在庫が枯渇します',
    detailedReason: 'さくらんぼや高級メロンの旬が集中し、即時配送可能な在庫が確保しやすいピーク。短期間で供給が止まる稀少性の高いさくらんぼは、在庫枯渇前に最大限の転換率を得るための集中キャンペーンが必要な、年間を通じて最高レベルのニーズ強度を持つ時期です。',
    needsStrength: 5,
    keywords: ['さくらんぼ', 'メロン', 'フルーツ', '高級', '稀少', '旬'],
  },
  7: {
    month: 7,
    primaryProducts: ['桃', '早期ブドウ（ハウス栽培）', 'うなぎ', 'スタミナ食'],
    appealReason: '夏の高級フルーツとスタミナ食の早期確保で、猛暑対策に最適です',
    detailedReason: 'ハウス栽培や早出し品種の桃・ブドウに特化し、9月発送の予約地獄を避けます。うなぎや夏の加工肉も訴求し、スタミナ補給に最適な返礼品が充実。即時配送可能な早期品で差別化を図ります。',
    needsStrength: 4,
    keywords: ['桃', 'ぶどう', 'うなぎ', 'スタミナ', '夏', 'ハウス栽培', 'フルーツ'],
  },
  8: {
    month: 8,
    primaryProducts: ['夏野菜', 'アイスクリーム', 'そうめん', '麺類'],
    appealReason: '酷暑期で冷たい食品や常温保存品が重宝され、実用性が高まります',
    detailedReason: '酷暑期で生鮮品の在庫管理が難しい時期。常温・冷凍保存が容易な加工品や、すぐに消費できる冷たい食品（アイスクリーム、そうめん/麺類）が充実。実用性重視で猛暑による需要を確実にカバーします。',
    needsStrength: 3,
    keywords: ['野菜', 'アイス', 'そうめん', '麺', '夏', '冷たい', 'トマト', 'きゅうり'],
  },
  9: {
    month: 9,
    primaryProducts: ['新米', '梨', '早期収穫米'],
    appealReason: '新米の早期収穫品が登場し、実用性と旬の味覚を両立できます',
    detailedReason: 'シャインマスカットの即時在庫枯渇を踏まえ「予約地獄」を回避。新米（早期収穫品）および梨を主軸訴求とし、この時期に需要が大きく高まる新米の実用性を前面に。高級ブドウは予約として別途訴求し、即時性を重視します。',
    needsStrength: 4,
    keywords: ['新米', '米', '梨', '収穫', '秋', '実用', 'お米'],
  },
  10: {
    month: 10,
    primaryProducts: ['芋類', '栗', '地域野菜', '干し芋', '栗菓子'],
    appealReason: '秋の味覚が充実し、貯蔵性の高い返礼品で年末に向けた準備ができます',
    detailedReason: '芋類・栗といった秋の味覚が旬を迎えます。生鮮品よりも貯蔵性が高いこれらの品目や、加工品（干し芋、栗菓子）にシフトし、在庫安定化を図ります。地域特産性や実用性を重視した返礼品が揃います。',
    needsStrength: 3,
    keywords: ['芋', '栗', 'さつまいも', '秋', '味覚', '地域', '特産'],
  },
  11: {
    month: 11,
    primaryProducts: ['鮭', 'ホタテ（冷凍ストック）', '蕎麦', '大容量肉セット'],
    appealReason: '年末に向けた冷凍庫準備と駆け込み需要の初期段階を捉えます',
    detailedReason: '年末に向けた冷凍庫の準備、大容量のストック品を検討する時期。検索トレンド上位のホタテや鮭など、大容量で冷凍ストックしやすい魚介類や大容量の豚肉・牛肉セットが充実。「駆け込み需要」の初期段階を確実に捉えます。',
    needsStrength: 4,
    keywords: ['鮭', 'ホタテ', '蕎麦', '肉', '冷凍', 'ストック', '年末', '大容量'],
  },
  12: {
    month: 12,
    primaryProducts: ['カニ', 'タラバガニ', '特選A5ランク牛肉', '酒', 'オードブルセット'],
    appealReason: '年内配送保証と究極の贅沢品で、年間最大の需要期です',
    detailedReason: '「年内配送の保証」と「究極の贅沢品」に絞られる最高レベルのニーズ強度。カニ、タラバガニ、特選A5ランク牛肉、酒、オードブルセットなど、高単価で贅沢な品目が充実。配送枠の明確な残数を伝えることで、ユーザーの緊急性を最大限に高めます。',
    needsStrength: 5,
    keywords: ['カニ', 'タラバガニ', '牛肉', 'A5', '特選', '酒', '贅沢', '年末', '正月'],
  },
};

/**
 * 指定月の訴求戦略を取得
 */
export function getMonthlyAppealStrategy(month?: number): MonthlyAppealStrategy {
  const targetMonth = month || (new Date().getMonth() + 1);
  return MONTHLY_APPEAL_STRATEGIES[targetMonth] || MONTHLY_APPEAL_STRATEGIES[1];
}

/**
 * 現在の月の訴求戦略を取得
 */
export function getCurrentMonthlyAppealStrategy(): MonthlyAppealStrategy {
  return getMonthlyAppealStrategy();
}
