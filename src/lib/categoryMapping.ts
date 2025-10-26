/**
 * ふるさと納税カテゴリマッピング
 * UIカテゴリと楽天API検索キーワードの対応表
 */

export interface CategoryInfo {
  id: string;
  displayName: string;
  emoji: string;
  rakutenKeywords: string[];
  rakutenGenreId?: string; // 楽天ジャンルID
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'meat',
    displayName: '肉・肉加工品',
    emoji: '🥩',
    rakutenKeywords: ['牛肉', '豚肉', '鶏肉', 'ハンバーグ', '焼肉', 'すき焼き'],
    rakutenGenreId: '559885', // 食品 > 精肉・肉加工品
    description: '高級和牛、ブランド豚、地鶏など'
  },
  {
    id: 'seafood',
    displayName: '魚介・水産加工品',
    emoji: '🐟',
    rakutenKeywords: ['いくら', 'ホタテ', 'カニ', 'サーモン', '海老', 'うに', '明太子'],
    rakutenGenreId: '100316', // 食品 > 魚介類・水産加工品
    description: '新鮮な魚介類、海産物'
  },
  {
    id: 'vegetables',
    displayName: '野菜・きのこ',
    emoji: '🥬',
    rakutenKeywords: ['野菜', 'きのこ', 'トマト', '玉ねぎ', 'じゃがいも', 'アスパラ', 'とうもろこし'],
    rakutenGenreId: '200990', // 食品 > 野菜・きのこ
    description: '旬の野菜、産地直送'
  },
  {
    id: 'unagi',
    displayName: 'うなぎ・惣菜',
    emoji: '🍱',
    rakutenKeywords: ['うなぎ', '惣菜', '弁当', 'おかず'],
    rakutenGenreId: '307452', // 食品 > 惣菜
    description: 'うなぎ、お惣菜、お弁当'
  },
  {
    id: 'rice',
    displayName: '米',
    emoji: '🌾',
    rakutenKeywords: ['米', 'お米', 'コシヒカリ', '新米'],
    rakutenGenreId: '559890', // 食品 > 米・雑穀
    description: 'ブランド米、新米'
  },
  {
    id: 'fruits',
    displayName: 'フルーツ',
    emoji: '🍎',
    rakutenKeywords: ['りんご', 'みかん', 'いちご', 'ぶどう', 'メロン', '桃', 'さくらんぼ'],
    rakutenGenreId: '559887', // 食品 > フルーツ・果物
    description: '旬のフルーツ、高級果物'
  },
  {
    id: 'noodles',
    displayName: '麺類',
    emoji: '🍜',
    rakutenKeywords: ['ラーメン', 'うどん', 'そば', 'パスタ'],
    rakutenGenreId: '100318', // 食品 > 麺類
    description: 'ラーメン、うどん、そば'
  },
  {
    id: 'drinks',
    displayName: '飲料',
    emoji: '🥤',
    rakutenKeywords: ['お茶', 'コーヒー', 'ジュース', '水', 'ミネラルウォーター'],
    rakutenGenreId: '100316', // 食品 > 水・ソフトドリンク
    description: 'お茶、コーヒー、ジュース'
  },
  {
    id: 'sweets',
    displayName: 'スイーツ',
    emoji: '🍰',
    rakutenKeywords: ['ケーキ', 'アイス', 'チョコレート', 'お菓子', 'スイーツ'],
    rakutenGenreId: '551177', // 食品 > スイーツ・お菓子
    description: 'ケーキ、アイス、和菓子'
  },
  {
    id: 'alcohol',
    displayName: 'お酒',
    emoji: '🍶',
    rakutenKeywords: ['日本酒', 'ビール', 'ワイン', '焼酎', 'ウイスキー'],
    rakutenGenreId: '100227', // ビール・洋酒
    description: '日本酒、ビール、ワイン'
  },
  {
    id: 'tissue',
    displayName: 'ティッシュ・トイレットペーパー',
    emoji: '🧻',
    rakutenKeywords: ['ティッシュ', 'トイレットペーパー', 'キッチンペーパー'],
    rakutenGenreId: '101164', // 日用品雑貨・文房具・手芸 > トイレ用品
    description: '日用消耗品'
  },
  {
    id: 'daily',
    displayName: '日用品',
    emoji: '🧴',
    rakutenKeywords: ['洗剤', 'シャンプー', '石鹸', '日用品', 'タオル'],
    rakutenGenreId: '215783', // 日用品雑貨・文房具・手芸
    description: '洗剤、タオル、日用雑貨'
  },
  {
    id: 'crafts',
    displayName: '工芸品・インテリア',
    emoji: '🎨',
    rakutenKeywords: ['工芸品', '陶器', '漆器', 'インテリア', '伝統工芸'],
    rakutenGenreId: '100938', // インテリア・寝具・収納
    description: '伝統工芸品、インテリア'
  },
  {
    id: 'electronics',
    displayName: '家電・電化製品',
    emoji: '📱',
    rakutenKeywords: ['家電', '電化製品', '掃除機', '炊飯器', 'ドライヤー'],
    rakutenGenreId: '562637', // 家電
    description: '家電製品、電化製品'
  },
  {
    id: 'travel',
    displayName: '旅行券・体験',
    emoji: '✈️',
    rakutenKeywords: ['旅行券', '宿泊券', '体験', 'チケット', 'ギフト券'],
    rakutenGenreId: '100939', // サービス・リフォーム
    description: '旅行券、体験チケット'
  }
];

/**
 * カテゴリIDからカテゴリ情報を取得
 */
export function getCategoryById(id: string): CategoryInfo | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

/**
 * 旧カテゴリ名から新カテゴリIDへのマッピング（後方互換性のため）
 */
export const LEGACY_CATEGORY_MAPPING: Record<string, string> = {
  '肉': 'meat',
  '魚介': 'seafood',
  'フルーツ': 'fruits',
  '米': 'rice',
  'お酒': 'alcohol',
  'スイーツ': 'sweets',
  '加工品': 'seafood', // 水産加工品として扱う
  '工芸品': 'crafts',
  '日用品': 'daily',
  '旅行券': 'travel'
};

/**
 * 旧カテゴリ名を新カテゴリIDに変換
 */
export function migrateLegacyCategory(oldCategory: string): string {
  return LEGACY_CATEGORY_MAPPING[oldCategory] || oldCategory;
}

/**
 * カテゴリIDから楽天API検索キーワードを取得
 */
export function getRakutenKeywords(categoryId: string): string[] {
  const category = getCategoryById(categoryId);
  return category?.rakutenKeywords || [];
}
