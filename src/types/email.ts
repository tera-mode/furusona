// メールテンプレート
export interface EmailTemplate {
  id: string; // "seasonal_recommendation", "limit_reminder", etc.
  name: string;
  subject: string; // "{{userName}}さん、{{month}}月の旬の返礼品をご紹介"
  htmlBody: string; // HTML形式のテンプレート
  textBody: string; // テキスト形式のテンプレート
  variables: string[]; // ["userName", "remainingLimit", etc.]
  active: boolean;
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
