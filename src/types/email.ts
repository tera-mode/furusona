// メール送信スケジュール
// 注意: GitHub Actions cronは毎時0分（UTC）に実行されますが、
// 実際の実行時刻は10分前後のずれがあります。
// そのため、分単位の設定はできず、時間単位の設定のみ有効です。
export interface EmailSchedule {
  enabled: boolean;               // スケジュール送信の有効/無効
  months?: number[];              // 送信する月（1-12）。nullまたは空配列=毎月
  days?: number[];                // 送信する日（1-31）。nullまたは空配列=毎日
  hour: number;                   // 送信する時（0-23、UTC基準）
  timezone: string;               // タイムゾーン（デフォルト: Asia/Tokyo）
  lastSentAt?: Date;              // 最終送信日時（参考用）
}

// メールテンプレート
export interface EmailTemplate {
  id: string; // "seasonal_recommendation", "limit_reminder", etc.
  name: string;
  subject: string; // "{{userName}}さん、{{month}}月の旬の返礼品をご紹介"
  htmlBody: string; // HTML形式のテンプレート
  textBody: string; // テキスト形式のテンプレート
  variables: string[]; // ["userName", "remainingLimit", etc.]
  active: boolean;
  schedule?: EmailSchedule;       // 送信スケジュール設定
  createdAt: Date;
  updatedAt: Date;
}

// メール送信ログ
export interface EmailLog {
  id: string;
  userId: string;
  templateId: string;
  sentAt: Date;
  status: 'sent' | 'failed' | 'bounced';
  resendId?: string; // Resend API のメールID
  errorMessage?: string;
}

// メール種別
export type EmailType =
  | 'seasonal_recommendation'  // 季節のおすすめ
  | 'limit_reminder'           // 限度額通知
  | 'year_end_rush'            // 年末駆け込み
  | 'tax_reminder';            // 確定申告

// パーソナライズ変数
export interface EmailVariables {
  userName?: string;
  userEmail?: string;
  remainingLimit?: number;
  usageRate?: number;
  favoriteCategory?: string;
  lastDonationDate?: string;
  totalDonations?: number;
  year?: number;
  month?: number;
  // 月別訴求情報
  monthlyAppeal?: {
    primaryProducts: string[];    // 即時訴求品目
    appealReason: string;          // なぜ今購入すべきか
    detailedReason: string;        // 詳細な理由
    needsStrength: number;         // ニーズ強度（1-5）
  };
  // 季節のおすすめ商品（全ユーザー共通）
  seasonalProducts?: Array<{
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    category: string;
  }>;
  // パーソナライズされたおすすめ商品
  products?: Array<{
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    category: string;
  }>;
}

// メール送信リクエスト
export interface SendEmailRequest {
  templateId: string;
  userId: string;
  variables?: EmailVariables;
  testMode?: boolean; // テスト送信の場合true
}

// ユーザーのメール設定（既存のUser型に追加する用）
export interface EmailPreferences {
  seasonal: boolean;          // 季節のおすすめ
  limitReminder: boolean;     // 限度額通知
  yearEnd: boolean;           // 年末駆け込み
  taxReminder: boolean;       // 確定申告
}

// メール送信履歴（lastEmailSent用）
export type EmailSentHistory = {
  [templateId: string]: Date;
};

// 月別のおすすめ商品設定
export interface MonthlyRecommendedProduct {
  id: string; // ドキュメントID
  month: number; // 1-12
  products: Array<{
    affiliateUrl: string;
    itemName: string;
    itemPrice: number;
    imageUrl: string;
    category: string;
  }>;
  updatedAt: Date;
}
