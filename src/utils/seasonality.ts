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
    appealReason: '寒さが本格化する1月は、温かい鍋や贅沢な海鮮で家族団らんを楽しむ絶好の時期',
    detailedReason: '新年を迎えた1月は、まだまだ寒い日が続き、家族や親しい人と温かい食卓を囲みたくなる季節。プリプリのカニやいくら、ホタテなどの海鮮で贅沢な鍋を楽しんだり、ふっくら美味しいお米や柔らかい高級牛肉で特別な食事を味わうのにぴったりです。',
    needsStrength: 4,
    keywords: ['カニ', '海鮮', '冷凍', '米', '牛肉', 'ズワイガニ', 'タラバガニ', 'いくら', 'ホタテ'],
  },
  2: {
    month: 2,
    primaryProducts: ['チョコレート', 'スイーツ', 'ハウス栽培イチゴ'],
    appealReason: 'バレンタインに大切な人へ感謝を伝える特別なスイーツや、寒い季節に甘いものが恋しくなる時期',
    detailedReason: '2月はバレンタインデーで、大切な人に想いを込めたチョコレートや洋菓子を贈りたくなる季節。また、まだ寒さが厳しいこの時期は、温かいお茶と一緒に甘いスイーツでほっと一息つきたくなります。早春のハウス栽培イチゴも楽しめる、心温まる返礼品が揃います。',
    needsStrength: 3,
    keywords: ['チョコレート', 'スイーツ', 'いちご', '洋菓子', 'マドレーヌ', 'バレンタイン', 'ギフト'],
  },
  3: {
    month: 3,
    primaryProducts: ['蛤・貝類', 'ハンバーグ', 'ソーセージ', 'ハム'],
    appealReason: '春の訪れとともに旬を迎える蛤で、ひな祭りやお祝いの食卓を華やかに彩る時期',
    detailedReason: '3月はひな祭りや卒業・進学のお祝いシーズン。ふっくら美味しい蛤のお吸い物で春の訪れを感じたり、ジューシーなハンバーグやソーセージでお祝いの食卓を楽しく彩ることができます。家族みんなが喜ぶ、実用的で美味しい返礼品が揃う時期です。',
    needsStrength: 3,
    keywords: ['貝', '蛤', 'ハンバーグ', 'ソーセージ', 'ハム', '加工肉', '魚介'],
  },
  4: {
    month: 4,
    primaryProducts: ['大容量米', '調味料セット', 'アスパラガス', '常備菜'],
    appealReason: '新生活が始まり、毎日の食卓を支える美味しいお米や調味料を揃えたくなる時期',
    detailedReason: '4月は新生活のスタート。引っ越しや新しい暮らしが始まる中で、毎日の食事を支える美味しいお米や便利な調味料セットを揃えるのにぴったりです。春野菜のアスパラガスも旬を迎え、忙しい日々を助けてくれる常備菜も嬉しい時期。実用的で心強い返礼品が揃います。',
    needsStrength: 4,
    keywords: ['米', '調味料', 'アスパラガス', '常備菜', '新生活', '大容量', '実用'],
  },
  5: {
    month: 5,
    primaryProducts: ['母の日ギフト（花・スイーツ）', '早期メロン', '体験チケット'],
    appealReason: '母の日に日頃の感謝を込めて、特別なギフトや高級フルーツを贈りたくなる時期',
    detailedReason: '5月は母の日。お母さんへの感謝を込めて、美しい花束や上質なスイーツ、早摘みの高級メロンを贈りたくなる季節です。温泉旅行券や食事券などの体験型ギフトも喜ばれます。大切な人に特別な気持ちを届けられる、心温まる返礼品が揃います。',
    needsStrength: 4,
    keywords: ['花', 'スイーツ', 'メロン', '母の日', 'ギフト', '体験', '旅行券'],
  },
  6: {
    month: 6,
    primaryProducts: ['さくらんぼ', '早期メロン', '高級フルーツ'],
    appealReason: '初夏の宝石・さくらんぼやメロンが旬を迎え、甘く香り高い贅沢な味わいを楽しめる特別な時期',
    detailedReason: '6月は、宝石のように美しいさくらんぼと、芳醇な香りが広がる高級メロンが旬を迎える特別な季節。一年で限られた期間だけ味わえる、瑞々しく甘い高級フルーツを存分に楽しめます。初夏の贅沢を、大切な人や自分へのご褒美として味わいたくなる時期です。',
    needsStrength: 5,
    keywords: ['さくらんぼ', 'メロン', 'フルーツ', '高級', '稀少', '旬'],
  },
  7: {
    month: 7,
    primaryProducts: ['桃', '早期ブドウ（ハウス栽培）', 'うなぎ', 'スタミナ食'],
    appealReason: '夏本番を前に、みずみずしい桃やぶどう、スタミナたっぷりのうなぎで暑さに備える時期',
    detailedReason: '7月は夏本番の到来。みずみずしくて甘い桃や、早摘みの高級ぶどうで、暑い日のデザートを楽しめます。土用の丑の日には栄養満点のうなぎで夏バテ対策。じっくり焼いた香ばしいうなぎや、元気が出るスタミナ食で、暑い夏を乗り切る力をチャージできる時期です。',
    needsStrength: 4,
    keywords: ['桃', 'ぶどう', 'うなぎ', 'スタミナ', '夏', 'ハウス栽培', 'フルーツ'],
  },
  8: {
    month: 8,
    primaryProducts: ['夏野菜', 'アイスクリーム', 'そうめん', '麺類'],
    appealReason: '猛暑の中、冷たいアイスやさっぱりしたそうめんで涼を取り、夏バテ予防を楽しむ時期',
    detailedReason: '8月の猛暑日には、冷たくて美味しいアイスクリームやシャーベットで涼みたくなります。さっぱりとしたそうめんや冷やし麺も食欲をそそります。暑さで元気がなくなりがちな時期だからこそ、新鮮な夏野菜（トマト、きゅうり）で栄養補給。涼しく美味しく夏を乗り切る返礼品が揃います。',
    needsStrength: 3,
    keywords: ['野菜', 'アイス', 'そうめん', '麺', '夏', '冷たい', 'トマト', 'きゅうり'],
  },
  9: {
    month: 9,
    primaryProducts: ['新米', '梨', '早期収穫米'],
    appealReason: '待ちに待った新米が登場！ふっくら炊きたての新米で、秋の味覚を存分に堪能できる時期',
    detailedReason: '9月は待望の新米シーズン。ふっくらツヤツヤに炊き上がる新米の香りと甘みは、この時期だけの特別な美味しさです。みずみずしくて甘い梨も旬を迎え、秋の訪れを感じられます。毎日の食卓を豊かにする、実りの季節の恵みを楽しめる返礼品が揃います。',
    needsStrength: 4,
    keywords: ['新米', '米', '梨', '収穫', '秋', '実用', 'お米'],
  },
  10: {
    month: 10,
    primaryProducts: ['芋類', '栗', '地域野菜', '干し芋', '栗菓子'],
    appealReason: '実りの秋、ホクホクの焼き芋や栗スイーツで、秋ならではの温かい味わいを楽しむ時期',
    detailedReason: '10月は秋が深まり、ホクホクに焼けたさつまいもや、栗ご飯、栗きんとんなど、秋ならではの味覚が恋しくなる季節。干し芋や栗菓子などの保存がきく返礼品も充実し、地域の特産品を楽しめます。肌寒くなる秋の夜長に、温かいお茶と一緒に味わいたくなる返礼品が揃います。',
    needsStrength: 3,
    keywords: ['芋', '栗', 'さつまいも', '秋', '味覚', '地域', '特産'],
  },
  11: {
    month: 11,
    primaryProducts: ['鮭', 'ホタテ（冷凍ストック）', '蕎麦', '大容量肉セット'],
    appealReason: '冬の訪れとともに、脂の乗った鮭やホタテで温かい鍋料理が恋しくなる時期',
    detailedReason: '11月は冬の訪れを感じる季節。脂がたっぷり乗った鮭や、ぷりぷりのホタテで作る温かい鍋料理が美味しくなります。年末に向けて、大容量の肉セットや蕎麦をストックしておくのにも最適。寒い日に家族で囲む温かい食卓を支える、実用的で美味しい返礼品が揃います。',
    needsStrength: 4,
    keywords: ['鮭', 'ホタテ', '蕎麦', '肉', '冷凍', 'ストック', '年末', '大容量'],
  },
  12: {
    month: 12,
    primaryProducts: ['カニ', 'タラバガニ', '特選A5ランク牛肉', '酒', 'オードブルセット'],
    appealReason: '年末年始の特別な時間を、豪華なカニやA5ランク牛肉で家族みんなで祝いたくなる時期',
    detailedReason: '12月は一年で最も特別な時期。年末年始を豪華に彩る、ぷりぷりのカニやタラバガニ、とろけるような特選A5ランク牛肉で、家族や大切な人との時間を贅沢に過ごせます。美味しいお酒やオードブルセットで、新年を華やかに迎える準備を。一年の締めくくりにふさわしい、最高級の返礼品が揃います。',
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
