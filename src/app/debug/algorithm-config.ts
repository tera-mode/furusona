/**
 * レコメンドアルゴリズム設定
 *
 * ⚠️ 重要: このファイルを変更した場合は、以下も更新してください:
 * 1. algorithm-flow.mmd (Mermaidフロー図)
 * 2. ALGORITHM_CHANGE_LOG (このファイル内の変更履歴)
 */

export interface JudgmentModule {
  id: string;
  name: string;
  description: string;
  priority: number;
  weight: number;
  enabled: boolean;
}

/**
 * 判定モジュール一覧
 */
export const JUDGMENT_MODULES: JudgmentModule[] = [
  {
    id: 'category_match',
    name: 'カテゴリ合致度',
    description: 'ユーザーの好みカテゴリと商品カテゴリの合致度を評価',
    priority: 1,
    weight: 0.25,
    enabled: true,
  },
  {
    id: 'price_range',
    name: '価格適合度',
    description: '限度額の1/3程度の価格帯であることを評価',
    priority: 2,
    weight: 0.20,
    enabled: true,
  },
  {
    id: 'review_score',
    name: 'レビュー評価',
    description: 'レビュー数と平均評価の高さを評価',
    priority: 3,
    weight: 0.20,
    enabled: true,
  },
  {
    id: 'family_structure',
    name: '家族構成適合度',
    description: '家族構成（人数）に適した商品量かを評価',
    priority: 4,
    weight: 0.15,
    enabled: true,
  },
  {
    id: 'allergy_check',
    name: 'アレルギー除外',
    description: 'アレルギー情報に基づいて不適切な商品を除外',
    priority: 5,
    weight: 0.10,
    enabled: true,
  },
  {
    id: 'past_selection',
    name: '過去選択除外',
    description: '過去に選択した商品との重複を除外',
    priority: 6,
    weight: 0.05,
    enabled: true,
  },
  {
    id: 'diversity',
    name: '多様性スコア',
    description: '同じような商品が集中しないよう多様性を評価',
    priority: 7,
    weight: 0.05,
    enabled: true,
  },
  {
    id: 'seasonality',
    name: '季節性スコア',
    description: '現在の月に旬・適した商品に+5点ボーナス（AIが判断）',
    priority: 8,
    weight: 0.05,
    enabled: true,
  },
  {
    id: 'preference_learning',
    name: 'ユーザー好み学習',
    description: '気になるリストの商品と類似→+10点、興味なしリストの商品と類似→-10点',
    priority: 9,
    weight: 0.10,
    enabled: true,
  },
];

/**
 * アルゴリズムフロー設定
 */
export const ALGORITHM_FLOW = {
  steps: [
    {
      id: 'user_input',
      name: 'ユーザー入力取得',
      description: '年収、家族構成、好みカテゴリ、アレルギー情報を取得',
    },
    {
      id: 'limit_calculation',
      name: '限度額計算',
      description: '年収と家族構成から寄付限度額を自動計算',
    },
    {
      id: 'product_fetch',
      name: '返礼品取得',
      description: 'Firestoreキャッシュまたは楽天APIから返礼品候補を取得（最大300件）',
    },
    {
      id: 'claude_scoring',
      name: 'Claude AI推薦',
      description: '判定モジュールの基準に基づいてClaude AIが商品をスコアリング',
    },
    {
      id: 'ranking',
      name: 'ランキング生成',
      description: 'スコアに基づいて上位9件を選定',
    },
    {
      id: 'result_output',
      name: '推薦結果出力',
      description: '商品情報と推薦理由を含む結果を返却',
    },
  ],
};

/**
 * アルゴリズム変更履歴
 *
 * ⚠️ アルゴリズムを変更した場合は必ずここに記録してください
 */
export const ALGORITHM_CHANGE_LOG = [
  {
    date: '2025-10-12',
    version: '1.4.0',
    author: 'System',
    changes: [
      'ユーザー好み学習機能の実装（気になる・興味なしボタン）',
      '気になるリストと類似商品に+10点ボーナス',
      '興味なしリストと類似商品に-10点ペナルティ',
      'UI/UX改善: 暖色系背景、クリッカブル商品カード、ボタンリネーム',
    ],
  },
  {
    date: '2025-10-12',
    version: '1.3.0',
    author: 'System',
    changes: [
      'Firestore永続キャッシュ実装（7日間有効、検索条件ベース）',
      '候補商品数を90件→300件に拡大（最大10カテゴリ × 30件）',
      '季節性判断をプリセットからAI判断に変更（現在の月を渡してAIが旬を判定）',
      '季節性スコアモジュール追加（+5点ボーナス）',
    ],
  },
  {
    date: '2025-10-12',
    version: '1.2.0',
    author: 'System',
    changes: [
      'Claude Haiku 3.5モデルへの変更',
      'プロンプト最適化によるトークン削減（約60-70%削減）',
      'リトライロジック追加（最大3回、指数バックオフ）',
      'メモリキャッシング機能追加（15分間有効）',
    ],
  },
  {
    date: '2025-10-11',
    version: '1.1.0',
    author: 'System',
    changes: [
      '推薦数を3件から9件に増加',
      '複数カテゴリ対応（最大3カテゴリから商品取得）',
      '候補商品数を最大90件に拡大',
      '多様性スコアモジュールの追加',
    ],
  },
  {
    date: '2025-10-01',
    version: '1.0.0',
    author: 'System',
    changes: [
      '初期リリース',
      'Claude Sonnet 4による推薦エンジン実装',
      '7つの判定モジュール実装',
      '基本的なスコアリングロジック構築',
    ],
  },
];

/**
 * 現在のモデル設定
 */
export const MODEL_CONFIG = {
  provider: 'Anthropic',
  model: 'claude-3-5-haiku-20241022',
  maxTokens: 1024,
  temperature: 0, // 決定論的な推薦のため0に設定
  retryAttempts: 3,
  retryDelay: 2000, // ms
  cacheEnabled: true,
  cacheDuration: 15 * 60 * 1000, // 15分
};

/**
 * スコアリング閾値
 */
export const SCORING_THRESHOLDS = {
  minScore: 70, // 最低スコア（これ以下は推薦しない）
  excellentScore: 90, // 優秀スコア（90以上）
  goodScore: 80, // 良好スコア（80-89）
  acceptableScore: 70, // 許容スコア（70-79）
};

/**
 * 商品取得設定
 */
export const PRODUCT_FETCH_CONFIG = {
  maxCategories: 10, // 取得する最大カテゴリ数
  hitsPerCategory: 30, // カテゴリあたりの取得件数
  maxTotalProducts: 300, // 合計最大商品数
  sort: '-reviewCount', // ソート順（レビュー数降順）
  cacheEnabled: true,
  cacheDuration: 7 * 24 * 60 * 60 * 1000, // 7日間（Firestore永続キャッシュ）
  cacheType: 'firestore', // キャッシュタイプ（firestore: 永続、memory: 15分）
};
