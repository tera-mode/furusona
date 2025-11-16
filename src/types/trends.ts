// Googleトレンド関連の型定義

export interface TrendingKeyword {
  query: string;         // キーワード
  value: string | number; // 'Breakout' または検索増加率
  formattedValue?: string; // フォーマット済みの値
  link?: string;          // Googleトレンドへのリンク
}

export interface TrendsResult {
  keyword: string;           // ベースキーワード（例: "ふるさと納税"）
  risingQueries: TrendingKeyword[];  // 急上昇キーワード
  topQueries: TrendingKeyword[];     // 人気のキーワード
  scrapedAt: Date;
  geo: string;              // 地域コード（例: "JP"）
}

export interface TrendsScrapeResponse {
  success: boolean;
  message: string;
  data?: TrendsResult;
  error?: string;
  emailSent?: boolean;
}
