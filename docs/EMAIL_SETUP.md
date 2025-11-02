# Email Delivery System Setup Guide

このドキュメントは、Next.js 15 + Brevo API + GitHub Actions を使用したスケジュール配信メールシステムの完全な実装ガイドです。本番環境で直面した問題とその解決策を詳細に記録しています。

**プロジェクト**: furusona（ふるさと納税推奨システム）
**バージョン**: v1.10.0
**作成日**: 2025-11-02

---

## 目次

1. [システム概要](#システム概要)
2. [技術スタック](#技術スタック)
3. [アーキテクチャ](#アーキテクチャ)
4. [環境変数の設定](#環境変数の設定)
5. [実装手順](#実装手順)
6. [発生した問題と解決策](#発生した問題と解決策)
7. [使用方法](#使用方法)
8. [デバッグ方法](#デバッグ方法)
9. [ファイル構成](#ファイル構成)

---

## システム概要

### 背景

ふるさと納税推奨システム「ふるそな」において、ユーザーに以下のようなメールを自動配信する必要がありました：

- **季節のおすすめ返礼品**（毎月1日）
- **限度額のお知らせ**（6月、9月、11月の1日）
- **年末駆け込みのお知らせ**（12月1日）
- **確定申告のリマインダー**（2月、3月1日）

### 機能

- ✅ メールテンプレートの管理（Firestore）
- ✅ 柔軟なスケジュール配信設定（月・日・時単位）※GitHub Actions cronの制約により分単位は不可
- ✅ パーソナライズ機能（ユーザー名、おすすめ商品、残り限度額など）
- ✅ 購読設定の管理（メールタイプ別にオプトアウト可能）
- ✅ テストモード（管理者のみに送信、本番環境でも安全）
- ✅ 自動送信（GitHub Actions Cronで毎時実行）
- ✅ デバッグUI（`/debug/email`でスケジュール編集・手動実行）

### 設計思想

1. **スケジュールベース制御**
   - 24時間重複チェックなし
   - スケジュール設定のみで送信を制御
   - シンプルで予測可能な動作

2. **直接関数呼び出しアーキテクチャ**
   - HTTP fetchを使わず、内部関数を直接呼び出し
   - Vercelのデプロイメント保護を回避
   - 認証レイヤーを通らないため堅牢

3. **安全なテスト機能**
   - 本番環境でも管理者のみに送信可能
   - 重複チェックをスキップして何度でもテスト可能

---

## 技術スタック

| 技術 | バージョン | 用途 | 備考 |
|------|-----------|------|------|
| Next.js | 15.5.4 | フレームワーク | App Router使用 |
| TypeScript | ^5 | 型安全性 | - |
| Firebase/Firestore | ^11.2.0 | データベース | Admin SDK使用 |
| Brevo (Sendinblue) | API v3 | メール送信サービス | 無料プラン300通/日 |
| GitHub Actions | - | スケジューラー（Cron） | 毎時0分実行（実際は10分前後） |
| Vercel | - | ホスティング | 環境変数管理 |

### Brevo API について

- **無料プラン**: 300通/日まで送信可能
- **トランザクショナルメール**: プログラムから送信するメールに最適
- **APIキー認証**: シンプルで実装が容易
- **代替**: SendGrid、Amazon SES、Resendなども同様のアーキテクチャで実装可能

---

## アーキテクチャ

### システム全体図

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions Cron                      │
│           (毎時0分に実行: 0 * * * *)                          │
│           ※実際の実行時刻は毎時10分前後（±10分程度）          │
│                                                               │
│  トリガー: スケジュール実行 or 手動実行                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP GET
                      │ ${{ secrets.APP_URL }}/api/cron/send-emails
                      │ ?secret=${{ secrets.CRON_SECRET }}
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│              /api/cron/send-emails/route.ts                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. CRON_SECRETで認証                                  │   │
│  │ 2. Firestoreから全メールテンプレート取得              │   │
│  │ 3. isScheduleMatching()で現在時刻と照合（±5分）      │   │
│  │ 4. newsletter=trueのユーザーを取得                   │   │
│  │ 5. テンプレート別emailPreferencesでフィルタ          │   │
│  │ 6. sendEmailToUser()を直接呼び出し ★重要★           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ 直接import & 関数呼び出し
                      │ import { sendEmailToUser } from '@/lib/email/...'
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│           /lib/email/send-email-to-user.ts                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Firestoreからユーザー情報取得                      │   │
│  │ 2. メルマガ購読状況をチェック                         │   │
│  │ 3. Firestoreからテンプレート取得                      │   │
│  │ 4. generateEmailVariables()でパーソナライズ変数生成  │   │
│  │ 5. renderTemplate()でHTMLレンダリング                │   │
│  │ 6. wrapEmailHTML()でレイアウト適用                   │   │
│  │ 7. sendEmail()でBrevo APIに送信                      │   │
│  │ 8. emailLogsコレクションに送信ログ記録               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Brevo API呼び出し
                      │ POST https://api.brevo.com/v3/smtp/email
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    Brevo API (外部サービス)                   │
│              無料プラン: 300通/日                             │
│           実際のメール配信（SMTP経由）                        │
└─────────────────────────────────────────────────────────────┘
```

### デバッグUI（/debug/email）

```
┌─────────────────────────────────────────────────────────────┐
│                   /debug/email (管理画面)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • テンプレート一覧表示                                │   │
│  │ • スケジュール設定編集（月/日/時）※分単位は不可       │   │
│  │ • テストメール送信（管理者のみ）                       │   │
│  │ • Cron手動実行（テストモード/本番モード）              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↓                        ↓
    /api/email/send         /api/cron/send-emails
    (テスト送信)            (手動Cron実行)
```

### 重要な設計判断

#### 1. HTTP Fetch → 直接関数呼び出し（最重要）

**問題**: Vercelのデプロイメント保護により、内部API呼び出しが401エラーになる。

```typescript
// ❌ 失敗するアーキテクチャ
// /api/cron/send-emails から /api/email/send を HTTP fetch で呼び出し
const response = await fetch(`${baseUrl}/api/email/send`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ templateId, userId, testMode })
});
// → HTTP 401: Authentication Required
//   Vercelの認証レイヤーに阻まれる

// ✅ 成功するアーキテクチャ
// /api/cron/send-emails から直接関数をimportして呼び出し
import { sendEmailToUser } from '@/lib/email/send-email-to-user';

const result = await sendEmailToUser({
  templateId,
  userId,
  testMode,
});
// → 認証レイヤーを完全に回避
//   内部関数呼び出しなので認証不要
```

**メリット**:
- Vercelの認証を回避
- レスポンスのパース不要（直接オブジェクトを返す）
- エラーハンドリングがシンプル
- パフォーマンスが向上（HTTPオーバーヘッドなし）

**実装の影響**:
1. `src/lib/email/send-email-to-user.ts` を新規作成
2. `/api/email/send` を共有関数を使うようリファクタ
3. `/api/cron/send-emails` をHTTP fetchから直接呼び出しに変更

#### 2. 24時間重複チェックを削除

当初は重複送信防止のため24時間チェックを実装していましたが、以下の理由で完全削除：

**削除理由**:
- スケジュール設定で十分に制御可能
- テスト実行の妨げになる（管理者が24時間以内に複数回テストできない）
- システムが複雑化する（`lastEmailSent`フィールドの管理が必要）
- デバッグが困難になる

**現在の動作**:
- **スケジュール設定のみ**で送信を制御
- シンプルで予測可能
- テスト実行が何度でも可能

#### 3. スケジュールマッチングは時間単位のみ

GitHub Actions Cronは1時間に1回のみ実行され、毎時0分（UTC）にスケジュールされていますが、
実際の実行時刻は毎時10分前後（±10分程度のずれ）となります。

参考: https://github.com/tera-mode/furusona/actions

このため、**hourが一致すれば送信する**という単純なロジックを採用しています。

```typescript
// 時刻のチェック（hourが一致すればOK、分単位のチェックは行わない）
if (schedule.hour !== currentHour) {
  return false;
}
```

**例**:
- スケジュール設定: `hour: 0`（0時）
- GitHub Actions実行時刻: 00:10頃（UTC） → ✅ マッチ
- スケジュール設定: `hour: 9`（9時）
- GitHub Actions実行時刻: 09:12頃（UTC） → ✅ マッチ

**制約**:
- 分単位の精密なスケジューリングはできません
- 1時間に複数回の送信スケジュールは設定できません

---

## 環境変数の設定

### ⚠️ 重要: 環境変数の種類

このシステムでは**3箇所**に環境変数を設定する必要があります：

1. **ローカル開発**: `.env.local`
2. **Vercel本番**: Vercelプロジェクト設定
3. **GitHub Actions**: GitHub Repository Secrets

**特に重要**: `APP_URL`と`NEXT_PUBLIC_APP_URL`は別物です！

### 1. ローカル開発（.env.local）

```env
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Firebase Configuration
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth.yourdomain.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Firebase Admin SDK (Service Account)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Brevo (Sendinblue) API
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@yourdomain.com
BREVO_FROM_NAME=Your App Name

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Admin Email (for test mode)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# App Configuration
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Cron Secret (for authentication)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRON_SECRET=generate-random-32-char-string-here
# 例: openssl rand -base64 32
```

### 2. Vercel環境変数

Vercelプロジェクト設定 → Settings → Environment Variables で以下を設定：

| 変数名 | 値 | 環境 | 備考 |
|--------|-----|------|------|
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Production | ⚠️ 本番URLに設定（localhostのままだとエラー） |
| `CRON_SECRET` | ランダム文字列（32文字以上推奨） | Production | GitHub Secretsと同じ値 |
| `BREVO_API_KEY` | Brevo APIキー | Production | - |
| `BREVO_FROM_EMAIL` | `noreply@yourdomain.com` | Production | - |
| `BREVO_FROM_NAME` | アプリ名 | Production | - |
| `FIREBASE_CLIENT_EMAIL` | サービスアカウントのメール | Production | - |
| `FIREBASE_PRIVATE_KEY` | プライベートキー（改行含む） | Production | - |
| その他Firebase設定 | - | Production | 全てのNEXT_PUBLIC_*変数 |
| `NEXT_PUBLIC_ADMIN_EMAIL` | 管理者メールアドレス | Production | テストモード用 |

**⚠️ よくある間違い**:
```
❌ NEXT_PUBLIC_APP_URL=http://localhost:3000  # 本番環境でこれはNG
✅ NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 3. GitHub Secrets

GitHubリポジトリ → Settings → Secrets and variables → Actions で以下を設定：

| シークレット名 | 値 | 用途 |
|---------------|-----|------|
| `APP_URL` | `https://your-app.vercel.app` | Cron実行先URL |
| `CRON_SECRET` | Vercelと同じ値 | Cron認証 |

**⚠️ 最重要**: `APP_URL` は必ず**永続的なVercel URL**を使用してください。

```
✅ 正しい: https://your-app.vercel.app
         （プロジェクトの永続URL）

❌ 間違い: https://your-app-xxxxx-username.vercel.app
         （一時的なデプロイURL、リダイレクトされる）

❌ 間違い: http://localhost:3000
         （ローカル環境、GitHub Actionsから到達不可）
```

**一時的なデプロイURLを使うとどうなるか**:
```bash
# GitHub Actions実行ログ
100    15    0    15    0     0     60      0 --:--:-- --:--:-- --:--:--    60
Redirecting...

HTTP Status: 301  # リダイレクト
```

→ 実際のAPIが呼ばれず、メールが送信されない

**永続URLの見つけ方**:
1. Vercelダッシュボード → プロジェクト選択
2. Settingsタブ → Domainsセクション
3. `*.vercel.app`の形式のURLを確認（これが永続URL）

### 環境変数の確認方法

デバッグ用のエンドポイントを作成すると便利です：

```typescript
// src/app/api/debug/env/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const adminEmail = request.nextUrl.searchParams.get('admin');

  // 認証
  if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 環境変数の存在チェック（値は表示しない）
  const envStatus = {
    CRON_SECRET: process.env.CRON_SECRET ? '✅ 設定済み' : '❌ 未設定',
    BREVO_API_KEY: process.env.BREVO_API_KEY ? '✅ 設定済み' : '❌ 未設定',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '❌ 未設定',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? '✅ 設定済み' : '❌ 未設定',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? '✅ 設定済み' : '❌ 未設定',
  };

  return NextResponse.json({ envStatus });
}
```

アクセス: `https://your-app.vercel.app/api/debug/env?admin=admin@example.com`

---

## 実装手順

### Step 1: 型定義（src/types/email.ts）

```typescript
export interface EmailSchedule {
  enabled: boolean;               // スケジュール送信の有効/無効
  months?: number[];              // 送信する月（1-12）。空配列=毎月
  days?: number[];                // 送信する日（1-31）。空配列=毎日
  hour: number;                   // 送信する時（0-23）
  minute: number;                 // 送信する分（0-59）
  timezone: string;               // タイムゾーン（例: Asia/Tokyo）
}

export interface EmailTemplate {
  id: string;                     // テンプレートID（例: seasonal_recommendation）
  name: string;                   // 表示名
  subject: string;                // 件名（変数使用可）
  htmlBody: string;               // HTML本文（変数使用可）
  textBody: string;               // テキスト本文（変数使用可）
  variables: string[];            // 使用する変数のリスト
  active: boolean;                // 有効/無効
  schedule?: EmailSchedule;       // 送信スケジュール設定
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailVariables {
  userName: string;               // ユーザー名
  userEmail: string;              // ユーザーメールアドレス
  remainingLimit: number;         // 残り限度額
  usageRate: number;              // 利用率（%）
  favoriteCategory: string;       // お気に入りカテゴリ
  lastDonationDate?: string;      // 最終寄付日
  totalDonations: number;         // 今年の寄付総額
  year: number;                   // 現在年
  month: number;                  // 現在月
  products?: Array<{              // おすすめ商品リスト
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    category: string;
  }>;
}

export interface EmailLog {
  id: string;
  userId: string;
  templateId: string;
  sentAt: Date;
  status: 'sent' | 'failed';
  resendId?: string;              // Brevoのメッセージ ID
  error?: string;
}
```

### Step 2: Brevoクライアント（src/lib/email/brevo-client.ts）

```typescript
import * as brevo from '@getbrevo/brevo';

let brevoApiInstance: brevo.TransactionalEmailsApi | null = null;

export function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (!brevoApiInstance) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    brevoApiInstance = apiInstance;
  }

  return brevoApiInstance;
}

export interface SendEmailParams {
  to: string | string[];
  from?: string;
  fromName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(params: SendEmailParams) {
  const apiInstance = getBrevoClient();

  try {
    const fromEmail = params.from || process.env.BREVO_FROM_EMAIL || 'noreply@furusona.jp';
    const fromName = params.fromName || process.env.BREVO_FROM_NAME || 'ふるそな';

    const toArray = Array.isArray(params.to) ? params.to : [params.to];
    const to = toArray.map(email => ({ email }));

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: fromEmail, name: fromName };
    sendSmtpEmail.to = to;
    sendSmtpEmail.subject = params.subject;
    sendSmtpEmail.htmlContent = params.html;

    if (params.text) {
      sendSmtpEmail.textContent = params.text;
    }

    console.log('📧 Sending email via Brevo:', fromEmail, '->', toArray);

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ Brevo response:', result.body);

    return {
      success: true,
      data: result.body,
      error: null,
    };
  } catch (error) {
    console.error('Failed to send email via Brevo:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### Step 3: テンプレートエンジン（src/lib/email/template-engine.ts）

```typescript
import { EmailVariables } from '@/types/email';

/**
 * {{変数名}} を実際の値に置換
 */
export function renderTemplate(
  template: string,
  variables: EmailVariables
): string {
  let rendered = template;

  const formatNumber = (num: number): string => num.toLocaleString('ja-JP');

  // 変数の置換
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');

    let replacementValue = '';
    if (value === undefined || value === null) {
      replacementValue = '';
    } else if (typeof value === 'number') {
      replacementValue = formatNumber(value);
    } else if (!Array.isArray(value)) {
      replacementValue = String(value);
    }

    rendered = rendered.replace(regex, replacementValue);
  });

  // 条件分岐の処理
  rendered = processConditionals(rendered, variables);

  return rendered;
}

/**
 * 条件分岐 {{#if condition}}...{{/if}}
 */
function processConditionals(
  template: string,
  variables: EmailVariables
): string {
  let result = template;

  // {{#if usageRate > 70}}...{{else}}...{{/if}}
  const ifRegex = /{{#if\s+(\w+)\s*([><=!]+)\s*(\d+)}}([\s\S]*?)(?:{{else}}([\s\S]*?))?{{\/if}}/g;

  result = result.replace(ifRegex, (match, varName, operator, threshold, truePart, falsePart) => {
    const value = variables[varName as keyof EmailVariables];
    const thresholdNum = parseInt(threshold, 10);

    let condition = false;
    if (typeof value === 'number') {
      switch (operator) {
        case '>': condition = value > thresholdNum; break;
        case '<': condition = value < thresholdNum; break;
        case '>=': condition = value >= thresholdNum; break;
        case '<=': condition = value <= thresholdNum; break;
        case '==': case '===': condition = value === thresholdNum; break;
        case '!=': case '!==': condition = value !== thresholdNum; break;
      }
    }

    return condition ? truePart : (falsePart || '');
  });

  return result;
}

/**
 * 商品リストのHTMLを生成
 */
export function renderProductList(products: EmailVariables['products']): string {
  if (!products || products.length === 0) return '';

  return products.map(product => `
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; max-width: 200px; border-radius: 4px;" />
      <h3 style="font-size: 16px; font-weight: bold; margin: 12px 0 8px 0;">${product.name}</h3>
      <p style="color: #ef4444; font-size: 18px; font-weight: bold; margin: 8px 0;">${product.price.toLocaleString('ja-JP')}円</p>
      <p style="color: #6b7280; font-size: 14px; margin: 4px 0;">${product.category}</p>
      <a href="${product.url}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; margin-top: 8px;">詳細を見る</a>
    </div>
  `).join('');
}

/**
 * 基本的なHTMLメールレイアウト
 */
export function wrapEmailHTML(content: string): string {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ふるそな</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #3b82f6; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">ふるそな</h1>
              <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 14px;">あなたにぴったりの返礼品を</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color: #f3f4f6; padding: 24px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0;">このメールは、ふるそなからの自動配信です。</p>
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                <a href="{{unsubscribeUrl}}" style="color: #3b82f6; text-decoration: none;">配信停止</a> |
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}" style="color: #3b82f6; text-decoration: none;">サイトを見る</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
```

### Step 4: パーソナライズ（src/lib/email/personalization.ts）

```typescript
import { User, Donation } from '@/types';
import { EmailVariables } from '@/types/email';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { getCurrentSeasonalKeywords } from '@/utils/seasonality';

async function getUserDonations(userId: string, year?: number): Promise<Donation[]> {
  const db = getFirestoreAdmin();
  const currentYear = year || new Date().getFullYear();

  const snapshot = await db
    .collection('donations')
    .where('userId', '==', userId)
    .where('year', '==', currentYear)
    .orderBy('donatedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    donatedAt: doc.data().donatedAt?.toDate(),
  })) as Donation[];
}

function calculateRemainingLimit(user: User, donations: Donation[]): number {
  const currentYear = new Date().getFullYear().toString();
  const limit = user.limitHistory?.[currentYear] || user.calculatedLimit || 0;
  const totalDonations = donations.reduce((sum, d) => sum + d.productPrice, 0);
  return Math.max(0, limit - totalDonations);
}

function calculateUsageRate(user: User, donations: Donation[]): number {
  const currentYear = new Date().getFullYear().toString();
  const limit = user.limitHistory?.[currentYear] || user.calculatedLimit || 0;
  if (limit === 0) return 0;
  const totalDonations = donations.reduce((sum, d) => sum + d.productPrice, 0);
  return Math.min(100, Math.round((totalDonations / limit) * 100));
}

async function getRecommendedProducts(
  user: User,
  remainingLimit: number,
  count: number = 3
): Promise<EmailVariables['products']> {
  const seasonalKeywords = getCurrentSeasonalKeywords();
  const favoriteCategories = user.preferences.categories || [];

  const priorityCategories = [
    ...favoriteCategories,
    ...seasonalKeywords.filter(cat => !favoriteCategories.includes(cat)),
  ];

  const db = getFirestoreAdmin();
  const products: EmailVariables['products'] = [];

  for (const category of priorityCategories.slice(0, 3)) {
    const snapshot = await db
      .collection('cachedProducts')
      .where('category', '==', category)
      .orderBy('itemPrice', 'desc')
      .limit(10)
      .get();

    if (!snapshot.empty) {
      const validDocs = snapshot.docs.filter(doc => doc.data().itemPrice <= remainingLimit);
      if (validDocs.length > 0) {
        const data = validDocs[0].data();
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

export async function generateEmailVariables(
  user: User,
  templateId: string
): Promise<EmailVariables> {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const donations = await getUserDonations(user.uid, currentYear);

  const userName = user.displayName || 'お客様';
  const remainingLimit = calculateRemainingLimit(user, donations);
  const usageRate = calculateUsageRate(user, donations);
  const favoriteCategory = user.preferences.categories?.[0] || '海鮮';
  const totalDonations = donations.reduce((sum, d) => sum + d.productPrice, 0);

  const variables: EmailVariables = {
    userName,
    userEmail: user.email,
    remainingLimit,
    usageRate,
    favoriteCategory,
    totalDonations,
    year: currentYear,
    month: currentMonth,
  };

  // テンプレートごとに商品リストを追加
  if (templateId === 'seasonal_recommendation') {
    variables.products = await getRecommendedProducts(user, remainingLimit, 3);
  } else if (templateId === 'limit_reminder' || templateId === 'year_end_rush') {
    variables.products = await getRecommendedProducts(user, remainingLimit, 2);
  }

  return variables;
}
```

### Step 5: メールテンプレート例（src/lib/email-templates/seasonal.ts）

```typescript
import { EmailTemplate } from '@/types/email';

export const seasonalRecommendationTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'seasonal_recommendation',
  name: '季節のおすすめ返礼品',
  subject: '{{userName}}さん、{{month}}月の旬の返礼品をご紹介',
  variables: ['userName', 'month', 'favoriteCategory', 'remainingLimit', 'usageRate', 'products'],
  active: true,
  schedule: {
    enabled: true,
    months: [],        // 空配列 = 毎月
    days: [1],         // 毎月1日
    hour: 10,          // 10時
    minute: 0,         // 0分
    timezone: 'Asia/Tokyo',
  },
  htmlBody: `
    <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">{{month}}月の旬の返礼品</h2>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      {{userName}}さん、こんにちは！<br>
      今月は特に{{favoriteCategory}}が美味しい季節です。
    </p>

    <div style="border-left: 4px solid #3b82f6; padding: 16px; margin: 0 0 24px 0; background-color: #dbeafe;">
      <p style="color: #1e40af; font-size: 14px; margin: 0;">
        <strong>残り限度額: {{remainingLimit}}円（利用率: {{usageRate}}%）</strong><br>
        {{#if usageRate < 30}}
        まだ十分な余裕があります。お気に入りの返礼品を見つけませんか？
        {{/if}}
        {{#if usageRate >= 30}}
        計画的なご利用をおすすめします。
        {{/if}}
      </p>
    </div>

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">今月のおすすめ</h3>

    <div id="product-list"></div>

    <div style="text-align: center; margin: 32px 0 0 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard"
         style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        もっと見る
      </a>
    </div>
  `,
  textBody: `
{{userName}}さん、こんにちは！

{{month}}月の旬の返礼品をご紹介します。

残り限度額: {{remainingLimit}}円
利用率: {{usageRate}}%

今月のおすすめカテゴリ: {{favoriteCategory}}

詳しくはこちら: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard
  `,
};
```

### Step 6: メール送信共有関数（src/lib/email/send-email-to-user.ts）

**★最重要★ API RouteとCronの両方から呼び出される共有関数**

```typescript
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/email/brevo-client';
import { renderTemplate, wrapEmailHTML, renderProductList } from '@/lib/email/template-engine';
import { generateEmailVariables } from '@/lib/email/personalization';
import { getTemplate } from '@/lib/email-templates';
import { User } from '@/types';
import { EmailLog, EmailTemplate } from '@/types/email';

export interface SendEmailToUserOptions {
  templateId: string;
  userId: string;
  testMode?: boolean;
}

export interface SendEmailToUserResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * ユーザーにメールを送信する共有関数
 * API RouteとCronの両方から呼び出し可能
 */
export async function sendEmailToUser(
  options: SendEmailToUserOptions
): Promise<SendEmailToUserResult> {
  try {
    const { templateId, userId, testMode = false } = options;

    if (!templateId || !userId) {
      return { success: false, error: 'templateId and userId are required' };
    }

    const db = getFirestoreAdmin();

    // ユーザー情報を取得
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }

    const user = { uid: userDoc.id, ...userDoc.data() } as User;

    // メール購読設定をチェック（テストモード以外）
    if (!testMode) {
      if (!user.newsletter) {
        return { success: false, error: 'User has not subscribed to newsletter' };
      }

      // テンプレート別の購読設定をチェック
      const emailPreferences = user.emailPreferences || {};
      const preferenceKey = templateId.replace('_', '') as keyof typeof emailPreferences;

      if (emailPreferences[preferenceKey] === false) {
        return { success: false, error: `User has opted out of ${templateId} emails` };
      }
    }

    // テンプレートを取得（Firestore優先、なければデフォルト）
    const template = await db.collection('emailTemplates').doc(templateId).get();
    let templateData: Partial<EmailTemplate> | undefined;

    if (template.exists) {
      templateData = template.data();
    } else {
      const defaultTemplate = getTemplate(templateId);
      if (!defaultTemplate) {
        return { success: false, error: 'Template not found' };
      }
      templateData = defaultTemplate;
    }

    if (!templateData) {
      return { success: false, error: 'Template data is missing' };
    }

    if (!templateData.active && !testMode) {
      return { success: false, error: 'Template is not active' };
    }

    // パーソナライズ変数を生成
    const variables = await generateEmailVariables(user, templateId);

    // 件名をレンダリング
    const subject = renderTemplate(templateData.subject || '', variables);

    // 本文をレンダリング
    let htmlBody = renderTemplate(templateData.htmlBody || '', variables);

    // 商品リストがある場合は挿入
    if (variables.products && variables.products.length > 0) {
      const productListHTML = renderProductList(variables.products);
      htmlBody = htmlBody.replace('<div id="product-list"></div>', productListHTML);
    } else {
      htmlBody = htmlBody.replace('<div id="product-list"></div>', '');
    }

    // HTMLレイアウトでラップ
    const finalHTML = wrapEmailHTML(htmlBody);

    // テキスト本文をレンダリング
    const textBody = renderTemplate(templateData.textBody || '', variables);

    // メール送信（テストモードの場合は管理者メールへ）
    const toEmail = testMode
      ? (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com')
      : user.email;

    const emailResult = await sendEmail({
      to: toEmail,
      subject: testMode ? `[TEST] ${subject}` : subject,
      html: finalHTML,
      text: textBody,
    });

    if (!emailResult.success) {
      return { success: false, error: emailResult.error || 'Email sending failed' };
    }

    // 送信ログを記録（テストモード以外）
    if (!testMode) {
      const emailLog: EmailLog = {
        id: '', // Firestoreが自動生成
        userId,
        templateId,
        sentAt: new Date(),
        status: 'sent',
        resendId: emailResult.data?.messageId || undefined,
      };

      await db.collection('emailLogs').add(emailLog);
    }

    return {
      success: true,
      messageId: emailResult.data?.messageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### Step 7: Cron API Endpoint（src/app/api/cron/send-emails/route.ts）

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmailToUser } from '@/lib/email/send-email-to-user';
import { User } from '@/types';
import { EmailTemplate, EmailSchedule } from '@/types/email';

/**
 * スケジュールマッチング判定（±5分の余裕）
 */
function isScheduleMatching(schedule: EmailSchedule): boolean {
  if (!schedule.enabled) return false;

  // タイムゾーンを考慮して現在時刻を取得
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: schedule.timezone || 'Asia/Tokyo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const currentMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0', 10);
  const currentDay = parseInt(parts.find(p => p.type === 'day')?.value || '0', 10);
  const currentHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const currentMinute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);

  // 月のチェック（空の場合は毎月）
  if (schedule.months && schedule.months.length > 0) {
    if (!schedule.months.includes(currentMonth)) return false;
  }

  // 日のチェック（空の場合は毎日）
  if (schedule.days && schedule.days.length > 0) {
    if (!schedule.days.includes(currentDay)) return false;
  }

  // 時刻のチェック（±5分の余裕）
  const scheduledMinutes = schedule.hour * 60 + schedule.minute;
  const currentMinutes = currentHour * 60 + currentMinute;
  const diff = Math.abs(scheduledMinutes - currentMinutes);

  return diff <= 5;
}

/**
 * GET /api/cron/send-emails
 *
 * スケジューリングされたメール配信
 * GitHub Actionsから毎時実行される
 *
 * クエリパラメータ:
 * - secret: 認証用シークレット (環境変数CRON_SECRETと一致する必要がある)
 * - testMode: true の場合、管理者メールアドレスのユーザーのみに送信（デバッグ用）
 */
export async function GET(request: NextRequest) {
  try {
    // シークレットキーで認証
    const secret = request.nextUrl.searchParams.get('secret');
    const testMode = request.nextUrl.searchParams.get('testMode') === 'true';
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json(
        { error: 'CRON_SECRET is not configured' },
        { status: 500 }
      );
    }

    if (secret !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = getFirestoreAdmin();

    // すべてのテンプレートをFirestoreから取得
    const templatesSnapshot = await db.collection('emailTemplates').get();

    if (templatesSnapshot.empty) {
      return NextResponse.json({
        message: 'No templates found',
        sent: 0,
      });
    }

    const templates = templatesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        schedule: data.schedule ? {
          ...data.schedule,
          lastSentAt: data.schedule.lastSentAt?.toDate(),
        } : undefined,
      } as EmailTemplate;
    });

    // 現在時刻にマッチするテンプレートをフィルタリング
    const matchingTemplates = templates.filter(template => {
      if (!template.schedule) return false;
      if (!template.active) return false;
      return isScheduleMatching(template.schedule);
    });

    if (matchingTemplates.length === 0) {
      return NextResponse.json({
        message: 'No templates matching current schedule',
        templates: templates.map(t => ({
          id: t.id,
          name: t.name,
          schedule: t.schedule,
        })),
        sent: 0,
      });
    }

    console.log(`📧 Found ${matchingTemplates.length} templates to send:`, matchingTemplates.map(t => t.id));

    if (testMode) {
      console.log('🧪 TEST MODE: Only sending to admin email address');
    }

    // メルマガ購読しているユーザーを取得
    const usersSnapshot = await db
      .collection('users')
      .where('newsletter', '==', true)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json({
        message: 'No subscribers found',
        matchingTemplates: matchingTemplates.map(t => t.id),
        sent: 0,
      });
    }

    let users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];

    // テストモードの場合、管理者メールアドレスのユーザーのみに絞り込む
    if (testMode) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (adminEmail) {
        users = users.filter(user => user.email === adminEmail);
        console.log(`🧪 Filtered to admin user only: ${users.length} user(s)`);
      } else {
        console.warn('⚠️ TEST MODE enabled but NEXT_PUBLIC_ADMIN_EMAIL is not set');
      }
    }

    const allResults: Record<string, Array<{ userId: string; status: string; error?: string }>> = {};

    // 各テンプレートについてメール送信
    for (const template of matchingTemplates) {
      console.log(`📧 Processing template: ${template.id} (${template.name})`);

      // フィルタリング: メールタイプ別の購読設定をチェック
      const filteredUsers = users.filter(user => {
        const preferences = user.emailPreferences || {};

        // テンプレートIDに応じて購読設定をチェック
        switch (template.id) {
          case 'seasonal_recommendation':
            return preferences.seasonal !== false; // デフォルトtrue
          case 'limit_reminder':
            return preferences.limitReminder !== false;
          case 'year_end_rush':
            return preferences.yearEnd !== false;
          case 'tax_reminder':
            return preferences.taxReminder !== false;
          default:
            return true;
        }
      });

      console.log(`  Total users: ${users.length}, Filtered: ${filteredUsers.length}`);

      // 各ユーザーにメール送信（★直接関数呼び出し★）
      const results = [];

      for (const user of filteredUsers) {
        console.log(`  Sending email to user ${user.uid}`);

        const result = await sendEmailToUser({
          templateId: template.id,
          userId: user.uid,
          testMode: testMode,
        });

        if (result.success) {
          console.log(`  ✓ Email sent successfully to ${user.uid}`);
          results.push({ userId: user.uid, status: 'sent' });
        } else {
          console.error(`  ✗ Email failed for ${user.uid}: ${result.error}`);
          results.push({
            userId: user.uid,
            status: 'failed',
            error: result.error || 'Unknown error',
          });
        }
      }

      allResults[template.id] = results;

      console.log(`  ✅ Sent ${results.filter(r => r.status === 'sent').length}/${results.length} emails`);
    }

    // 結果をまとめる
    const summary = Object.entries(allResults).map(([templateId, results]) => ({
      templateId,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      total: results.length,
    }));

    const totalSent = summary.reduce((sum, s) => sum + s.sent, 0);
    const totalFailed = summary.reduce((sum, s) => sum + s.failed, 0);

    return NextResponse.json({
      message: 'Email sending completed',
      matchingTemplates: matchingTemplates.map(t => ({ id: t.id, name: t.name })),
      totalSubscribers: users.length,
      sent: totalSent,
      failed: totalFailed,
      summary,
      details: allResults,
    });
  } catch (error) {
    console.error('Failed to send scheduled emails:', error);
    return NextResponse.json(
      {
        error: 'Failed to send scheduled emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

### Step 8: GitHub Actions設定（.github/workflows/scheduled-emails.yml）

```yaml
name: Scheduled Email Delivery

on:
  schedule:
    # 毎時0分に実行（UTC）
    # ※実際の実行時刻は毎時10分前後（±10分程度のずれ）
    # Firestoreのスケジュール設定に基づいて送信判定
    - cron: '0 * * * *'

  # 手動実行も可能
  workflow_dispatch:

jobs:
  send-emails:
    runs-on: ubuntu-latest
    steps:
      - name: Send Scheduled Emails
        run: |
          echo "Checking for emails to send..."
          echo "Target URL: ${{ secrets.APP_URL }}/api/cron/send-emails"

          # -L: リダイレクトを追跡, -s: サイレントモード, -S: エラーは表示, -w: HTTPコード表示
          response=$(curl -L -s -S -w "\n\nHTTP Status: %{http_code}\n" \
            -X GET "${{ secrets.APP_URL }}/api/cron/send-emails?secret=${{ secrets.CRON_SECRET }}")

          echo "Response:"
          echo "$response"
          echo ""
          echo "Email sending completed."
```

**重要ポイント**:
- `-L`: リダイレクトを追跡（URLが変わっても追従）
- `-s -S`: サイレントだがエラーは表示
- `-w "\n\nHTTP Status: %{http_code}\n"`: HTTPステータスコードを表示
- `${{ secrets.APP_URL }}`: 永続的なVercel URLを設定
- `${{ secrets.CRON_SECRET }}`: CRON_SECRETで認証

### Step 9: デバッグUI（src/app/debug/email/page.tsx）

主要な部分のみ抜粋：

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { EmailSchedule } from '@/types/email';

export default function EmailDebugPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editScheduleMode, setEditScheduleMode] = useState(false);

  // ★重要★ スケジュール編集モードに入る時の初期化
  const enterScheduleEditMode = (template: EmailTemplate) => {
    const templateWithSchedule = {
      ...template,
      schedule: template.schedule || {
        enabled: false,
        months: [],
        days: [],
        hour: 0,
        minute: 0,
        timezone: 'Asia/Tokyo',
      },
    };
    setSelectedTemplate(templateWithSchedule);
    setEditScheduleMode(true);
  };

  // ★重要★ スケジュール更新時の状態管理
  const updateScheduleEnabled = (enabled: boolean) => {
    setSelectedTemplate({
      ...selectedTemplate,
      schedule: {
        enabled: enabled,
        months: selectedTemplate.schedule?.months || [],
        days: selectedTemplate.schedule?.days || [],
        hour: selectedTemplate.schedule?.hour || 0,
        minute: selectedTemplate.schedule?.minute || 0,
        timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
      },
    });
  };

  // Cron手動実行（テストモード対応）
  const runCronManually = async () => {
    const cronSecret = prompt('CRON_SECRETを入力してください:');
    if (!cronSecret) return;

    const isTestMode = confirm(
      'テストモードで実行しますか？\n\n' +
      'はい: 管理者メールアドレスのみに送信（安全）\n' +
      'いいえ: 全ユーザーに送信（本番）'
    );

    const url = `/api/cron/send-emails?secret=${cronSecret}${isTestMode ? '&testMode=true' : ''}`;

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    // 詳細な結果表示
    if (response.ok) {
      const summary = data.summary || [];
      setMessage(
        `✅ Cron実行完了${isTestMode ? ' (🧪 テストモード)' : ''}\n\n` +
        `送信成功: ${data.sent || 0}通\n` +
        `送信失敗: ${data.failed || 0}通\n\n` +
        `サマリー:\n${summary.map(s => `  ${s.templateId}: ${s.sent}通成功, ${s.failed}通失敗`).join('\n')}`
      );
    } else {
      setMessage(`❌ Cron実行失敗: ${data.error || 'Unknown error'}`);
    }
  };

  // UIレンダリング...
}
```

---

## 発生した問題と解決策

実際に本番環境で発生した問題とその解決過程を詳細に記録します。

### 問題1: スケジュール編集時に他のテンプレートが消える

**発生状況**:
- `/debug/email`画面でテンプレート一覧を表示
- 「スケジュール」ボタンをクリックしてスケジュール編集モードに入る
- 他のテンプレートがリストから消えて、編集中のテンプレート1件のみ表示される

**ユーザーからの報告**:
> /debug/emailにてスケジュールを設定をしたが
> - ほかのテンプレートが消えた
> - リロードしたら、設定内容が保存されていなかった

**根本原因**:

`schedule`オブジェクトが`undefined`の状態でスプレッド演算子とnon-null assertion (`!`)を使用していた。

```typescript
// ❌ 失敗するコード (src/app/debug/email/page.tsx:306-310)
onClick={() => {
  setSelectedTemplate({
    ...template,
    schedule: { ...template.schedule! } // scheduleがundefinedだとエラー
  });
  setEditScheduleMode(true);
}}
```

**エラーの詳細**:
- `template.schedule`が`undefined`の場合、`...undefined`が実行される
- JavaScriptエラーが発生し、React の状態が破損
- 結果として、テンプレートリストの再レンダリングが失敗

**解決策**:

スケジュール編集モードに入る前に、デフォルト値で明示的に初期化。

```typescript
// ✅ 成功するコード (src/app/debug/email/page.tsx:305-321)
onClick={() => {
  // スケジュールが存在しない場合はデフォルト値で初期化
  const templateWithSchedule = {
    ...template,
    schedule: template.schedule || {
      enabled: false,
      months: [],
      days: [],
      hour: 0,
      minute: 0,
      timezone: 'Asia/Tokyo',
    },
  };
  setSelectedTemplate(templateWithSchedule);
  setEditMode(false);
  setEditScheduleMode(true);
}}
```

**結果**:
> スケジュール設定は保存され、テンプレートが消えるバグも直りました

**学んだこと**:
- TypeScriptの`?`（オプショナルプロパティ）は、値が`undefined`の可能性があることを示す
- スプレッド演算子を使う前に、必ずnullチェックまたはデフォルト値を設定
- non-null assertion (`!`)は危険。実行時エラーの原因になる

---

### 問題2: スケジュール設定が保存されない

**発生状況**:
- スケジュール編集画面で設定を変更
- 「保存」ボタンをクリック
- 成功メッセージが表示される
- ページをリロードすると、設定が消えている

**根本原因**:

状態更新時にスプレッド演算子で`undefined`を展開していた。

```typescript
// ❌ 失敗するコード
onChange={(e) =>
  setSelectedTemplate({
    ...selectedTemplate,
    schedule: {
      ...selectedTemplate.schedule!, // undefinedの可能性
      enabled: e.target.checked,
    },
  })
}
```

**なぜFirestoreに保存されないか**:

1. 状態更新が正しく行われない
2. `updateTemplate()`関数が不完全な`schedule`オブジェクトを送信
3. Firestoreに保存される`schedule`オブジェクトが不完全
4. 次回読み込み時に`undefined`フィールドが復元される

**解決策**:

すべてのフィールドを明示的に設定し、`||`でフォールバック。

```typescript
// ✅ 成功するコード (src/app/debug/email/page.tsx:354-366)
onChange={(e) =>
  setSelectedTemplate({
    ...selectedTemplate,
    schedule: {
      enabled: e.target.checked,
      months: selectedTemplate.schedule?.months || [],
      days: selectedTemplate.schedule?.days || [],
      hour: selectedTemplate.schedule?.hour || 0,
      minute: selectedTemplate.schedule?.minute || 0,
      timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
    },
  })
}
```

**適用範囲**:

この修正を以下のすべての状態更新ハンドラに適用：
- `enabled`チェックボックス (line 354-366)
- `months`チェックボックス (line 381-399)
- `days`チェックボックス (line 416-432)
- `hour`入力 (line 449-461)
- `minute`入力 (line 472-484)
- `timezone`セレクト (line 494-506)

**結果**:

スケジュール設定が正しくFirestoreに保存され、リロード後も保持されるようになった。

**学んだこと**:
- ネストされたオブジェクトの更新は慎重に
- すべてのフィールドを明示的に設定する
- オプショナルチェイニング (`?.`)とnullish coalescing (`||`)を組み合わせる

---

### 問題3: "CRON_SECRET is not configured" エラー

**発生状況**:
- `/debug/email`で「Cronを手動実行」ボタンをクリック
- CRON_SECRETを入力
- エラー: `❌ Cron実行失敗: CRON_SECRET is not configured`

**ユーザーからの報告**:
> RQuCneVKswUaSh3MW6s5QB4fwmytLzTg
> ❌ Cron実行失敗: CRON_SECRET is not configured

> Vercelの環境変数設定も、GitHubのSecretsも、いずれもすでに設定済です

**初期調査**:

環境変数の確認エンドポイントを作成：

```typescript
// src/app/api/debug/env/route.ts
export async function GET(request: NextRequest) {
  const adminEmail = request.nextUrl.searchParams.get('admin');

  if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    CRON_SECRET: process.env.CRON_SECRET ? '✅ 設定済み' : '❌ 未設定',
    BREVO_API_KEY: process.env.BREVO_API_KEY ? '✅ 設定済み' : '❌ 未設定',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '❌ 未設定',
  });
}
```

**ユーザーからの結果**:
```json
{
  "CRON_SECRET": "✅ 設定済み",
  "BREVO_API_KEY": "✅ 設定済み",
  "NEXT_PUBLIC_APP_URL": "http://localhost:3000",
  ...
}
```

**発見した問題**:
1. `NEXT_PUBLIC_APP_URL` が本番環境で `http://localhost:3000` になっていた
2. しかし、これは直接の原因ではなかった（後述の問題4が真の原因）

**解決策1（ローカル環境）**:

`.env.local`に`CRON_SECRET`を追加：

```env
CRON_SECRET=RQuCneVKswUaSh3MW6s5QB4fwmytLzTg
```

**解決策2（本番環境）**:

Vercel環境変数の`NEXT_PUBLIC_APP_URL`を修正：
```
❌ http://localhost:3000
✅ https://furusona.vercel.app
```

**しかし...**:

この段階では問題は完全に解決していなかった。次の問題4が真の原因だった。

---

### 問題4: HTTP 401 Authentication Required（最重要）

**発生状況**:
- Cron APIを実行
- CRON_SECRETは正しく設定されている
- しかし、全ユーザーへのメール送信が401エラーで失敗

**エラーメッセージ**:

```
エラー: HTTP 401: <!doctype html><html lang=en><title>Authentication Required</title><body><h1>401 Authentication Required</h1></body></html>
```

**ユーザーからのログ**:
```
本番
  Sending email to user abc123
  ✗ Email failed for abc123: HTTP 401: <!doctype html>...
  Sending email to user def456
  ✗ Email failed for def456: HTTP 401: <!doctype html>...

Total users: 6, Filtered: 6, Eligible: 6
✅ Sent 0/6 emails
```

**原因の調査**:

1. **CRON_SECRETは正しい**: `/api/cron/send-emails`は正常に実行されている
2. **Firestoreアクセスは正常**: ユーザーとテンプレートの取得は成功
3. **問題箇所**: メール送信部分で401エラー

**失敗していたアーキテクチャ**:

```typescript
// ❌ /api/cron/send-emails から /api/email/send を HTTP fetch で呼び出し

// /api/cron/send-emails/route.ts
for (const user of filteredUsers) {
  const response = await fetch(`${baseUrl}/api/email/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: template.id,
      userId: user.uid,
      testMode
    })
  });
  // → HTTP 401エラー
}
```

**根本原因**:

**Vercelのデプロイメント保護**が内部APIコールをブロックしていた。

Vercelの仕組み：
1. プロダクションデプロイには認証レイヤーがある
2. 外部からのHTTPリクエストは認証が必要
3. **内部APIからの fetch も「外部リクエスト」として扱われる**
4. 認証トークンがないため401エラーになる

```
┌────────────────────────────────────────┐
│   Vercel Deployment Protection Layer    │  ← 認証レイヤー
└────────────────┬───────────────────────┘
                 │ ❌ 401 Unauthorized
                 │
  HTTP fetch ────┘
  (/api/cron/send-emails → /api/email/send)
```

**解決策**: 直接関数呼び出しアーキテクチャに変更

**ステップ1**: `sendEmailToUser()`関数を独立したモジュールに抽出

```typescript
// src/lib/email/send-email-to-user.ts (新規作成)
export async function sendEmailToUser(
  options: SendEmailToUserOptions
): Promise<SendEmailToUserResult> {
  // メール送信のすべてのロジックをここに
  // HTTPレスポンスではなく、プレーンなオブジェクトを返す
  return {
    success: true,
    messageId: 'xxx',
  };
}
```

**ステップ2**: `/api/email/send`を共有関数を使うようリファクタ

```typescript
// src/app/api/email/send/route.ts
import { sendEmailToUser } from '@/lib/email/send-email-to-user';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { templateId, userId, testMode = false } = body;

  // ✅ 共有関数を直接呼び出し
  const result = await sendEmailToUser({
    templateId,
    userId,
    testMode,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: 'Email sent successfully',
    emailId: result.messageId,
  });
}
```

**ステップ3**: `/api/cron/send-emails`も共有関数を直接呼び出し

```typescript
// src/app/api/cron/send-emails/route.ts
import { sendEmailToUser } from '@/lib/email/send-email-to-user';

export async function GET(request: NextRequest) {
  // ... 認証、テンプレート取得など ...

  for (const user of filteredUsers) {
    // ✅ 直接関数呼び出し（HTTP fetchを使わない）
    const result = await sendEmailToUser({
      templateId: template.id,
      userId: user.uid,
      testMode: testMode,
    });

    if (result.success) {
      console.log(`✓ Email sent successfully to ${user.uid}`);
    } else {
      console.error(`✗ Email failed for ${user.uid}: ${result.error}`);
    }
  }
}
```

**新しいアーキテクチャ**:

```
/api/cron/send-emails
  ↓ 直接import & 関数呼び出し
  sendEmailToUser()  ← 認証レイヤーを通らない
  ↓
  Brevo API
```

**結果**:

> 本番は成功しました

```
Total users: 6, Filtered: 6
  Sending email to user abc123
  ✓ Email sent successfully to abc123
  Sending email to user def456
  ✓ Email sent successfully to def456
  ...
✅ Sent 6/6 emails
```

**メリット**:
- ✅ Vercel認証を完全に回避
- ✅ コードの重複を排除（DRY原則）
- ✅ パフォーマンス向上（HTTPオーバーヘッドなし）
- ✅ エラーハンドリングがシンプル（JSONパース不要）
- ✅ 型安全性が向上（TypeScriptの型チェック）

**学んだこと**:
- Vercelのデプロイメント保護は内部API呼び出しにも適用される
- マイクロサービスアーキテクチャとモノリスの違いを理解する
- Next.jsのようなフルスタックフレームワークでは、関数の直接呼び出しが推奨される

---

### 問題5: テストモードで送信数が0になる

**発生状況**:
- テストモードでCronを手動実行
- 管理者ユーザーに絞り込み成功（1ユーザー）
- しかし "Eligible: 0" で、メールが送信されない

**ユーザーからの報告**:
> 本番
> 成功しているが、管理者メールに飛んでこない

**ログ**:
```
🧪 TEST MODE: Only sending to admin email address
🧪 Filtered to admin user only: 1 user(s)
📧 Processing template: seasonal_recommendation (季節のおすすめ返礼品)
  Total users: 1, Filtered: 1, Eligible: 0
✅ Sent 0/0 emails
```

**根本原因**:

24時間重複チェックが管理者ユーザーのメール送信をブロックしていた。

**失敗していたロジック**:

```typescript
// ❌ /api/cron/send-emails/route.ts

// テストモード用にユーザーをフィルタ
if (testMode) {
  users = users.filter(user => user.email === adminEmail);
}

// 24時間以内に送信したユーザーを除外
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const eligibleUsers = filteredUsers.filter(user => {
  const lastSent = user.lastEmailSent?.[template.id];
  if (!lastSent) return true;

  const lastSentDate = lastSent instanceof Date ? lastSent : new Date(lastSent);
  return lastSentDate < oneDayAgo;
  // → 管理者が24時間以内にテストした場合、ここで除外される
});

console.log(`  Eligible: ${eligibleUsers.length}`);
// → Eligible: 0
```

**問題点**:
1. 管理者は頻繁にテストを実行する
2. 24時間チェックにより、2回目のテスト実行が失敗する
3. デバッグが困難になる

**初期解決策**: テストモード時は24時間チェックをスキップ

```typescript
// ✅ 初期の修正
let eligibleUsers = filteredUsers;

if (!testMode) {
  // 本番モードのみ24時間チェック
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  eligibleUsers = filteredUsers.filter(user => {
    const lastSent = user.lastEmailSent?.[template.id];
    if (!lastSent) return true;
    const lastSentDate = lastSent instanceof Date ? lastSent : new Date(lastSent);
    return lastSentDate < oneDayAgo;
  });
} else {
  console.log('🧪 TEST MODE: Skipping 24-hour duplicate check');
}
```

**しかし、ユーザーから追加要望**:

> 24時間チェックの仕組みをはずして

**理由**:
- スケジュール設定で十分に制御可能
- 24時間チェックはシステムを複雑化する
- テストの妨げになる

**最終解決策**: 24時間チェックを完全削除

削除した要素：
1. ✂️ 24時間重複チェックのロジック
2. ✂️ `lastEmailSent`フィールドの更新
3. ✂️ `schedule.lastSentAt`の更新
4. ✂️ `lastSentAt`パラメータ

**現在のシンプルなロジック**:

```typescript
// ✅ 最終版: 24時間チェックなし
const filteredUsers = users.filter(user => {
  const preferences = user.emailPreferences || {};

  // テンプレート別の購読設定のみチェック
  switch (template.id) {
    case 'seasonal_recommendation':
      return preferences.seasonal !== false;
    case 'limit_reminder':
      return preferences.limitReminder !== false;
    default:
      return true;
  }
});

// eligibleUsersは不要、filteredUsersを直接使用
for (const user of filteredUsers) {
  const result = await sendEmailToUser({
    templateId: template.id,
    userId: user.uid,
    testMode,
  });
}
```

**送信制御の方針**:
- ✅ **スケジュール設定のみ**で送信時期を制御
- ✅ **購読設定**でユーザーの受信希望を制御
- ❌ 24時間チェックは使わない

**メリット**:
- シンプルで予測可能
- テストが何度でも実行可能
- データベースの更新が少ない（パフォーマンス向上）

**結果**:

テストモードで何度でもメールを送信できるようになった。

---

### 問題6: GitHub Actionsが"Redirecting..."を返す

**発生状況**:
- 手動Cron実行は成功
- しかし、GitHub Actionsの自動実行からメールが届かない
- Vercelのログにも何も記録されていない

**ユーザーからの報告**:
> CRON手動実行はうまくいきますが、スケジュール通りにメールが飛んできません
> スケジュールになっても、Vercel側のログには何も飛んできていないようです

**GitHub Actionsのログ**:
```bash
Checking for emails to send...
Target URL: https://furusona-xxxxx-tera-modes-projects.vercel.app/api/cron/send-emails

100    15    0    15    0     0     60      0 --:--:-- --:--:-- --:--:--    60
Redirecting...

Email sending completed.
```

**問題点**:
1. curlコマンドが "Redirecting..." という短いレスポンスだけを受け取っている
2. HTTPステータスコードが表示されていない
3. 実際のAPIレスポンスが得られていない

**初期対応**: `-L`フラグでリダイレクトを追跡

```yaml
# .github/workflows/scheduled-emails.yml
- name: Send Scheduled Emails
  run: |
    # -L: リダイレクトを追跡
    response=$(curl -L -s -S -w "\n\nHTTP Status: %{http_code}\n" \
      -X GET "${{ secrets.APP_URL }}/api/cron/send-emails?secret=${{ secrets.CRON_SECRET }}")

    echo "Response:"
    echo "$response"
```

**修正後のログ**:
```bash
Checking for emails to send...
Target URL: https://furusona-xxxxx-tera-modes-projects.vercel.app/api/cron/send-emails

Redirecting...

HTTP Status: 301
```

**発見**: HTTP 301 (Moved Permanently) - 永続的なリダイレクト

**根本原因**:

GitHub Secretの`APP_URL`が**一時的なデプロイURL**に設定されていた。

```
❌ 設定されていたURL:
https://furusona-xxxxx-tera-modes-projects.vercel.app

✅ 正しいURL:
https://furusona.vercel.app
```

**Vercelの仕組み**:
1. デプロイごとに一時的なURL (`*-xxxxx-username.vercel.app`) が生成される
2. これは特定のデプロイを指す
3. 新しいデプロイ後は、古い一時URLは新しいURLにリダイレクトされる
4. しかし、GitHub Actionsは一時URLを保持し続ける
5. 結果として、常に301リダイレクトが発生

**永続URLの見つけ方**:
1. Vercelダッシュボード → プロジェクト選択
2. Settings タブ → Domains セクション
3. `*.vercel.app`の形式のURLを確認（これが永続URL）

**解決策**:

GitHub Secretsの`APP_URL`を永続URLに変更：

1. GitHubリポジトリ → Settings
2. Secrets and variables → Actions
3. `APP_URL`を編集
   ```
   ❌ https://furusona-gi2wvphms-tera-modes-projects.vercel.app
   ✅ https://furusona.vercel.app
   ```

**結果**:

> 無事とどきました。APP_URLをhttps://furusona.vercel.appに変えたらうまく行きました

**成功時のGitHub Actionsログ**:
```json
{
  "message": "Email sending completed",
  "matchingTemplates": [
    {"id": "seasonal_recommendation", "name": "季節のおすすめ返礼品"}
  ],
  "totalSubscribers": 6,
  "sent": 6,
  "failed": 0,
  "summary": [
    {"templateId": "seasonal_recommendation", "sent": 6, "failed": 0, "total": 6}
  ]
}

HTTP Status: 200
```

**学んだこと**:
- Vercelの一時URLと永続URLの違いを理解する
- GitHub Secretsには永続的な値のみを設定する
- curlコマンドには必ず `-L`（リダイレクト追跡）と `-w`（ステータスコード表示）を付ける

---

### 問題7: NEXT_PUBLIC_APP_URLがlocalhostのまま

**発生状況**:
- 環境変数デバッグエンドポイントで確認
- 本番環境の`NEXT_PUBLIC_APP_URL`が`http://localhost:3000`になっている

**ユーザーからのデバッグ結果**:
```json
{
  "CRON_SECRET": "✅ 設定済み",
  "BREVO_API_KEY": "✅ 設定済み",
  "NEXT_PUBLIC_APP_URL": "http://localhost:3000"
}
```

**影響**:

この問題は、当初は重大に思えたが、実際には**問題4の解決により影響がなくなった**。

**理由**:
- 当初のアーキテクチャでは、`NEXT_PUBLIC_APP_URL`を使って内部APIを呼び出していた
- 問題4の解決で、HTTP fetchを使わなくなった
- 現在は`NEXT_PUBLIC_APP_URL`はメールテンプレート内のリンクにしか使われていない

**しかし、修正は推奨**:

Vercel環境変数で`NEXT_PUBLIC_APP_URL`を修正：

1. Vercelダッシュボード → プロジェクト
2. Settings → Environment Variables
3. `NEXT_PUBLIC_APP_URL`を編集:
   ```
   ❌ http://localhost:3000
   ✅ https://furusona.vercel.app
   ```
4. Redeploy

**ベストプラクティス**: `VERCEL_URL`をフォールバックとして使用

```typescript
// 将来的にHTTPリクエストが必要になった場合の参考コード
const getBaseUrl = () => {
  // 環境変数が明示的に設定されていればそれを使用
  if (process.env.NEXT_PUBLIC_APP_URL &&
      process.env.NEXT_PUBLIC_APP_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Vercelが自動で設定する環境変数をフォールバック
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // ローカル開発環境
  return 'http://localhost:3000';
};
```

**注意**: この関数は現在のシステムでは使用していません（参考用）。

---

### 問題まとめ

| 問題 | 根本原因 | 影響度 | 解決策 |
|------|----------|--------|--------|
| 1. テンプレート消失 | scheduleが`undefined`でスプレッド演算子エラー | 🔴 High | デフォルト値で初期化 |
| 2. スケジュール保存失敗 | 不完全なオブジェクトをFirestoreに保存 | 🔴 High | 全フィールドを明示的に設定 |
| 3. CRON_SECRET未設定 | ローカル`.env.local`に設定なし | 🟡 Medium | `.env.local`に追加 |
| 4. HTTP 401エラー | Vercel認証が内部API呼び出しをブロック | 🔴 Critical | 直接関数呼び出しに変更 |
| 5. テストモード送信0件 | 24時間チェックがテストをブロック | 🟡 Medium | 24時間チェックを完全削除 |
| 6. GitHub Actions Redirect | 一時URLが永続URLにリダイレクト | 🔴 High | 永続URLを使用 |
| 7. localhost URL | 本番環境にローカルURLが設定 | 🟢 Low | 本番URLに修正 |

**最重要の問題**: 問題4（HTTP 401エラー）

これは**アーキテクチャレベルの問題**であり、解決により：
- システムの堅牢性が大幅に向上
- パフォーマンスが改善
- コードが簡潔になった

---

## 使用方法

### 1. 新しいメールテンプレートの追加

**手順**:

1. テンプレートファイルを作成 (`src/lib/email-templates/new-template.ts`)

```typescript
import { EmailTemplate } from '@/types/email';

export const newTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'new_template',
  name: '新しいテンプレート',
  subject: 'こんにちは、{{userName}}さん',
  variables: ['userName', 'year', 'month'],
  active: true,
  schedule: {
    enabled: true,
    months: [1, 4, 7, 10], // 1月、4月、7月、10月
    days: [15],            // 15日
    hour: 10,              // 10時
    minute: 0,             // 0分
    timezone: 'Asia/Tokyo',
  },
  htmlBody: `
    <h2>{{userName}}さんへ</h2>
    <p>メッセージ内容</p>
  `,
  textBody: `
{{userName}}さんへ

メッセージ内容
  `,
};
```

2. `src/lib/email-templates/index.ts`でエクスポート:

```typescript
import { newTemplate } from './new-template';

export const EMAIL_TEMPLATES: Record<string, Omit<EmailTemplate, 'createdAt' | 'updatedAt'>> = {
  // ... 既存のテンプレート
  new_template: newTemplate,
};
```

3. Firestoreに登録（`/debug/email`画面から「テンプレートを初期化」ボタンをクリック）

4. 購読設定タイプを追加（オプション）:

```typescript
// src/types/index.ts
export interface User {
  // ...
  emailPreferences?: {
    seasonal?: boolean;
    limitReminder?: boolean;
    yearEnd?: boolean;
    taxReminder?: boolean;
    newTemplate?: boolean; // ← 追加
  };
}
```

5. Cron endpointでフィルタリングロジックを追加:

```typescript
// src/app/api/cron/send-emails/route.ts
const filteredUsers = users.filter(user => {
  const preferences = user.emailPreferences || {};

  switch (template.id) {
    // ... 既存のケース
    case 'new_template':
      return preferences.newTemplate !== false;
    default:
      return true;
  }
});
```

### 2. スケジュール設定の変更

**UIから変更**:

1. `/debug/email`にアクセス
2. 対象テンプレートの「スケジュール」ボタンをクリック
3. 設定を変更:

**設定項目**:

| 項目 | 説明 | 例 |
|------|------|-----|
| 有効/無効 | チェックボックスで切り替え | ✅ 有効 |
| 月 | 送信する月（複数選択可）<br>空=毎月 | 1,4,7,10 → 1月、4月、7月、10月 |
| 日 | 送信する日（複数選択可）<br>空=毎日 | 1,15 → 1日と15日 |
| 時 | 0-23 | 10 = 午前10時 |
| 分 | 0-59 | 30 = 30分 |
| タイムゾーン | IANA timezone | Asia/Tokyo |

**例: 毎月1日の朝10時に送信**:
```typescript
{
  enabled: true,
  months: [],     // 空配列 = 毎月
  days: [1],      // 1日
  hour: 10,       // 10時
  minute: 0,      // 0分
  timezone: 'Asia/Tokyo',
}
```

**例: 6月・9月・11月の1日、午前9時に送信**:
```typescript
{
  enabled: true,
  months: [6, 9, 11],
  days: [1],
  hour: 9,
  minute: 0,
  timezone: 'Asia/Tokyo',
}
```

**例: 毎月1日と15日、午後2時30分に送信**:
```typescript
{
  enabled: true,
  months: [],
  days: [1, 15],
  hour: 14,
  minute: 30,
  timezone: 'Asia/Tokyo',
}
```

4. 「保存」をクリック

**注意**: 変更はすぐに反映されます。次回のCron実行時から新しいスケジュールが適用されます。

### 3. テスト送信（安全）

#### 方法A: デバッグ画面から単一ユーザーにテスト送信

1. `/debug/email`にアクセス
2. 対象テンプレートの「テストメール送信」ボタンをクリック
3. 管理者メールアドレス(`NEXT_PUBLIC_ADMIN_EMAIL`)に送信される

**特徴**:
- ✅ 最も安全
- ✅ スケジュール設定に関係なく送信
- ✅ 本番データベースに影響なし
- ✅ ログインユーザーの情報でパーソナライズ

#### 方法B: 手動Cron実行（テストモード）

1. `/debug/email`にアクセス
2. 「Cronを手動実行」ボタンをクリック
3. CRON_SECRETを入力
4. 確認ダイアログで「はい（テストモード）」を選択

**動作**:
```
1. スケジュールマッチング実行
   ↓ 現在時刻に一致するテンプレートのみ処理
2. ユーザーを管理者のみに絞り込み
   ↓ filter(user => user.email === NEXT_PUBLIC_ADMIN_EMAIL)
3. 管理者に対して本番と同じロジックでメール送信
   ↓ パーソナライズ、商品推薦など
4. 送信ログは記録されない（testMode=true）
```

**特徴**:
- ✅ スケジュールマッチングをテスト可能
- ✅ 本番ロジックを完全に検証
- ✅ 送信ログが残らない
- ⚠️ スケジュールに一致しないと送信されない

**例**:
```
現在時刻: 2025-11-02 10:03 JST
テンプレート設定: 毎月1日 10:00 JST

→ マッチしない（日が異なる）
→ "No templates matching current schedule"
```

### 4. 本番送信

#### 方法A: 自動（推奨）

**設定不要**。GitHub Actionsが毎時0分（UTC）に自動実行されます。
※実際の実行時刻は毎時10分前後（±10分程度のずれ）となります。

**タイムライン**:
```
00:00 UTC (09:00 JST) - GitHub Actions実行（実際は00:10頃）
  ↓
  スケジュールマッチング
  ↓ 例: 毎月1日 hour: 0 (UTC) に設定されたテンプレート
  ✅ マッチ（hour一致のみチェック）
  ↓
  メルマガ購読ユーザー取得
  ↓
  購読設定でフィルタリング
  ↓
  メール送信
```

**モニタリング**:
- GitHub: Actions タブでログ確認
- Vercel: Logs タブで実行ログ確認

#### 方法B: 手動Cron実行（本番モード）

⚠️ **注意**: 全ユーザーにメールが送信されます。

1. `/debug/email`にアクセス
2. 「Cronを手動実行」ボタンをクリック
3. CRON_SECRETを入力
4. 確認ダイアログで「いいえ（本番モード）」を選択

**使用ケース**:
- 緊急でメールを送信する必要がある場合
- スケジュール設定をテストせずに即座に送信したい場合

---

## デバッグ方法

### 1. ローカルでのテスト

```bash
# 開発サーバー起動
npm run dev

# ブラウザで /debug/email にアクセス
# http://localhost:3000/debug/email

# テストメール送信
# 「テストメール送信」ボタンをクリック
# → 管理者メールアドレスに送信される

# 手動Cron実行
# 「Cronを手動実行」ボタンをクリック
# CRON_SECRETは .env.local の値を使用
```

**ローカルでのCron実行**:
```
API: http://localhost:3000/api/cron/send-emails
  ?secret=your-cron-secret
  &testMode=true
```

curlコマンドでテスト:
```bash
curl -L -s -S -w "\n\nHTTP Status: %{http_code}\n" \
  "http://localhost:3000/api/cron/send-emails?secret=RQuCneVKswUaSh3MW6s5QB4fwmytLzTg&testMode=true"
```

### 2. GitHub Actionsのログ確認

**手順**:

1. GitHubリポジトリ → **Actions** タブ
2. **「Scheduled Email Delivery」** ワークフロー
3. 最新の実行をクリック
4. **「send-emails」** ジョブをクリック
5. ログを確認

**成功例**:
```bash
Checking for emails to send...
Target URL: https://furusona.vercel.app/api/cron/send-emails

Response:
{
  "message": "Email sending completed",
  "matchingTemplates": [
    {"id": "seasonal_recommendation", "name": "季節のおすすめ返礼品"}
  ],
  "totalSubscribers": 6,
  "sent": 6,
  "failed": 0,
  "summary": [
    {
      "templateId": "seasonal_recommendation",
      "sent": 6,
      "failed": 0,
      "total": 6
    }
  ]
}

HTTP Status: 200

Email sending completed.
```

**失敗例1: 認証エラー**:
```bash
Response:
{"error": "Unauthorized"}

HTTP Status: 401
```

**原因と解決策**:
- `CRON_SECRET`が間違っている
- GitHub Secretsを確認: Settings → Secrets → `CRON_SECRET`
- Vercel環境変数と一致しているか確認

**失敗例2: リダイレクト**:
```bash
Response:
Redirecting...

HTTP Status: 301
```

**原因と解決策**:
- `APP_URL`が一時URLになっている
- GitHub Secretsを確認: Settings → Secrets → `APP_URL`
- 永続URL (`https://your-app.vercel.app`) に変更

**失敗例3: スケジュールマッチなし**:
```bash
Response:
{
  "message": "No templates matching current schedule",
  "templates": [
    {
      "id": "seasonal_recommendation",
      "schedule": {
        "enabled": true,
        "months": [],
        "days": [1],
        "hour": 10,
        "minute": 0
      }
    }
  ],
  "sent": 0
}

HTTP Status: 200
```

**原因**:
- 現在時刻がスケジュールに一致していない
- 例: 現在が11月2日だが、スケジュールは「毎月1日」

**解決策**:
- 正常な動作（エラーではない）
- スケジュール設定を変更するか、次回の実行を待つ

### 3. Vercelログの確認

**手順**:

1. Vercelダッシュボード → プロジェクト
2. **Logs** タブ
3. フィルタ: `api/cron/send-emails`
4. ログを確認

**確認すべきログ**:

```
📧 Found 1 templates to send: seasonal_recommendation
  Total users: 6, Filtered: 6
  Sending email to user abc123
  ✓ Email sent successfully to abc123
  Sending email to user def456
  ✓ Email sent successfully to def456
  ...
  ✅ Sent 6/6 emails
```

**エラーの例**:

```
  Sending email to user abc123
  ✗ Email failed for abc123: User has not subscribed to newsletter
```

**原因**: ユーザーが `newsletter: false` に設定されている

**確認**:
```javascript
// Firebaseコンソール → Firestore → users → abc123
{
  email: "user@example.com",
  newsletter: false  // ← これが原因
}
```

### 4. 環境変数の確認

**方法A**: デバッグエンドポイント（推奨）

```typescript
// src/app/api/debug/env/route.ts
export async function GET(request: NextRequest) {
  const adminEmail = request.nextUrl.searchParams.get('admin');

  if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    // 値は表示しない（セキュリティ）
    CRON_SECRET: process.env.CRON_SECRET ? '✅ 設定済み' : '❌ 未設定',
    BREVO_API_KEY: process.env.BREVO_API_KEY ? '✅ 設定済み' : '❌ 未設定',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '❌ 未設定',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? '✅ 設定済み' : '❌ 未設定',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? '✅ 設定済み' : '❌ 未設定',
  });
}
```

アクセス:
```
https://your-app.vercel.app/api/debug/env?admin=admin@example.com
```

**方法B**: Vercel環境変数画面で直接確認

1. Vercelダッシュボード → プロジェクト
2. Settings → Environment Variables
3. 各変数が設定されているか確認

### 5. 一般的な問題のチェックリスト

| 症状 | 確認項目 | 解決策 |
|------|---------|--------|
| メールが送信されない | ❶ スケジュール設定 | `/debug/email`で`enabled: true`か確認 |
| | ❷ 現在時刻がマッチするか | ±5分の余裕があるか確認 |
| | ❸ テンプレートが有効か | `active: true`か確認 |
| | ❹ ユーザーのメルマガ購読 | `newsletter: true`か確認 |
| | ❺ Brevo APIキー | 環境変数を確認 |
| | ❻ Brevo送信制限 | 1日300通を超えていないか |
| Cron実行が401エラー | ❶ CRON_SECRET | GitHub Secret/Vercel環境変数を確認 |
| | ❷ APP_URL | 永続的なVercel URLか確認 |
| GitHub Actionsが実行されない | ❶ Cronスケジュール | `.github/workflows/`の設定確認 |
| | ❷ リポジトリのActions | Settings → Actions → 有効化確認 |
| テストメールが届かない | ❶ 管理者メール設定 | `NEXT_PUBLIC_ADMIN_EMAIL`を確認 |
| | ❷ Brevoの送信制限 | ダッシュボードで確認 |
| | ❸ スパムフォルダ | メールクライアントで確認 |
| スケジュール設定が保存されない | ❶ ブラウザのコンソール | JavaScriptエラーを確認 |
| | ❷ Firestoreのルール | 書き込み権限を確認 |
| | ❸ 認証状態 | ログインしているか確認 |

### 6. デバッグのベストプラクティス

**段階的なテスト**:

```
1. ローカルでテストメール送信
   ↓ 成功
2. ローカルで手動Cron実行（テストモード）
   ↓ 成功
3. 本番で手動Cron実行（テストモード）
   ↓ 成功
4. GitHub Actionsで手動実行（workflow_dispatch）
   ↓ 成功
5. GitHub Actionsの自動実行を待つ
   ↓ 成功
```

**ログの読み方**:

```
📧 = メール関連の情報
✅ = 成功
❌ = エラー
⚠️ = 警告
🧪 = テストモード
```

**トラブルシューティングの順序**:

1. **環境変数**: 全て正しく設定されているか
2. **認証**: CRON_SECRETが一致しているか
3. **スケジュール**: 現在時刻にマッチするか
4. **ユーザー**: メルマガ購読しているか
5. **テンプレート**: 有効になっているか
6. **Brevo API**: APIキーが正しいか、送信制限を超えていないか

---

## ファイル構成

```
src/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── send-emails/
│   │   │       └── route.ts          # ★ Cronエンドポイント（メイン）
│   │   ├── email/
│   │   │   ├── send/
│   │   │   │   └── route.ts          # 単一ユーザーへのメール送信API
│   │   │   └── templates/
│   │   │       └── route.ts          # テンプレート管理API
│   │   └── debug/
│   │       └── env/
│   │           └── route.ts          # 環境変数確認（デバッグ用）
│   └── debug/
│       └── email/
│           └── page.tsx              # ★ デバッグUI
├── lib/
│   ├── email/
│   │   ├── send-email-to-user.ts    # ★ 共有メール送信関数（重要）
│   │   ├── brevo-client.ts          # Brevo API クライアント
│   │   ├── template-engine.ts       # テンプレートレンダリング
│   │   └── personalization.ts       # パーソナライズ変数生成
│   ├── email-templates/
│   │   ├── index.ts                 # テンプレートエクスポート
│   │   ├── seasonal.ts              # 季節のおすすめ
│   │   ├── limit-reminder.ts        # 限度額のお知らせ
│   │   ├── year-end.ts              # 年末駆け込み
│   │   └── tax-reminder.ts          # 確定申告リマインダー
│   └── firebase-admin.ts            # Firebase Admin SDK
├── types/
│   ├── index.ts                     # 基本型定義
│   └── email.ts                     # ★ メール関連型定義
└── utils/
    └── seasonality.ts               # 季節キーワード取得

.github/
└── workflows/
    └── scheduled-emails.yml         # ★ GitHub Actions設定

.env.local                           # ローカル環境変数
```

**重要度の高いファイル**:

| ファイル | 役割 | 変更頻度 |
|---------|------|---------|
| `src/app/api/cron/send-emails/route.ts` | Cronメイン処理 | 🔵 低 |
| `src/lib/email/send-email-to-user.ts` | 共有メール送信関数 | 🔵 低 |
| `src/app/debug/email/page.tsx` | デバッグUI | 🟢 中 |
| `src/lib/email-templates/*.ts` | メールテンプレート | 🟡 高 |
| `.github/workflows/scheduled-emails.yml` | Cron設定 | 🔵 低 |
| `src/types/email.ts` | 型定義 | 🟢 中 |

---

## まとめ

このガイドで実装したメール配信システムの特徴:

### ✅ 実現したこと

1. **スケジュールベース配信**
   - 月・日・時・分単位で柔軟に設定可能
   - タイムゾーン対応（Asia/Tokyo）
   - ±5分の余裕で実行タイミングのずれに対応

2. **堅牢なアーキテクチャ**
   - 直接関数呼び出しでVercel認証を回避
   - HTTPオーバーヘッドなしで高速
   - 型安全（TypeScript）

3. **安全なテスト機能**
   - 本番環境でも管理者のみに送信可能
   - 重複チェックなしで何度でもテスト可能
   - テストモード時は送信ログを記録しない

4. **柔軟な購読設定**
   - メールタイプ別にオプトアウト可能
   - ユーザーが受信したいメールだけを選択

5. **充実したデバッグ機能**
   - `/debug/email`でスケジュール編集
   - 手動Cron実行（テストモード/本番モード）
   - 詳細な実行結果表示

6. **自動化**
   - GitHub Actionsで毎時実行
   - 手動介入不要

### 🎓 学んだ重要な教訓

1. **Vercelのデプロイメント保護**
   - 内部API呼び出しもブロックされる
   - 直接関数呼び出しで回避

2. **永続URLと一時URL**
   - GitHub Secretsには永続URLを設定
   - 一時URLはリダイレクトの原因になる

3. **React状態管理**
   - オプショナルプロパティは必ずnullチェック
   - スプレッド演算子使用前にデフォルト値を設定

4. **シンプルさの重要性**
   - 24時間チェックは不要だった
   - スケジュール設定のみで十分に制御可能

5. **環境変数の管理**
   - ローカル・Vercel・GitHub の3箇所に設定
   - `APP_URL`と`NEXT_PUBLIC_APP_URL`は別物

### 🚀 他プロジェクトへの適用

このガイドは以下のプロジェクトで再利用可能:

- ✅ Next.js 13以降（App Router）
- ✅ Firebase/Firestore使用
- ✅ Vercelデプロイ
- ✅ Brevo（または類似のメールAPI）
- ✅ GitHub Actions使用

**必要な変更点**:
1. テンプレートの内容（プロジェクトに合わせて）
2. パーソナライズ変数（ユーザーデータ構造に合わせて）
3. スケジュール設定（送信タイミング）
4. 環境変数（API キー、URL など）

### 📚 参考資料

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Brevo API Documentation](https://developers.brevo.com/)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

**ドキュメント作成**: 2025-11-02
**プロジェクト**: furusona
**バージョン**: v1.10.0
