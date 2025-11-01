# メール配信システム セットアップガイド

## 概要

ふるそなのメール配信システムは、Brevo (旧Sendinblue) を使用して、ユーザーに対してパーソナライズされたメールを送信します。

## システム構成

```
┌─────────────────────────────────────────────────────────┐
│                  メール配信システム                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │GitHub Actions │  │ テンプレート  │  │    Brevo     │ │
│  │ (スケジュール) │→│   管理       │→│ (メール送信)  │ │
│  └───────────────┘  └──────────────┘  └──────────────┘ │
│         ↓                   ↓                           │
│  ┌───────────────┐  ┌──────────────┐                   │
│  │  ユーザーDB   │  │  デバッグ    │                   │
│  │  (Firestore)  │  │  管理画面    │                   │
│  └───────────────┘  └──────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 1. 環境変数の設定

### ローカル開発 (`.env.local`)

```bash
# Brevo (Sendinblue) API
BREVO_API_KEY=your-brevo-api-key-here
BREVO_FROM_EMAIL=noreply@furusona.jp
BREVO_FROM_NAME=ふるそな

# Cron認証用シークレット（ランダムな文字列を生成）
CRON_SECRET=your-random-secret-here
```

### Vercel 本番環境

Vercelのダッシュボードで以下の環境変数を設定：

1. `BREVO_API_KEY` - BrevoのAPIキー
2. `BREVO_FROM_EMAIL` - 送信元メールアドレス
3. `BREVO_FROM_NAME` - 送信元名前
4. `CRON_SECRET` - GitHub Actionsからのリクエスト認証用

## 2. GitHub Secrets の設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下を設定：

1. `APP_URL` - 本番環境のURL (例: `https://furusona.jp`)
2. `CRON_SECRET` - Vercelと同じ値

## 3. メール種別と配信タイミング

| メール種別 | テンプレートID | 配信タイミング | 内容 |
|-----------|---------------|---------------|------|
| 季節のおすすめ | `seasonal_recommendation` | 毎月1日 9:00 | 旬の返礼品紹介 |
| 限度額通知 | `limit_reminder` | 6月、9月、11月の1日 9:00 | 残り限度額のお知らせ |
| 年末駆け込み | `year_end_rush` | 11/15, 12/1, 12/15 9:00 | 年末までの残り期間注意喚起 |
| 確定申告 | `tax_reminder` | 2/1, 2/20 9:00 | 確定申告のリマインド |

## 4. デバッグ管理画面の使い方

### アクセス方法

1. 管理者アカウントでログイン
2. `https://furusona.jp/debug/email` にアクセス

### 機能

#### テンプレート初期化

1. 「テンプレートを初期化」ボタンをクリック
2. デフォルトテンプレートがFirestoreに保存される

#### テンプレート編集

1. テンプレート一覧から編集したいテンプレートを選択
2. 「編集」ボタンをクリック
3. 件名、HTML本文、テキスト本文を編集
4. 「保存」ボタンで保存

#### テスト送信

1. テンプレート一覧から「テスト送信」ボタンをクリック
2. 管理者メールアドレス宛にテストメールが送信される

## 5. API エンドポイント

### メール送信 API

```
POST /api/email/send
```

**リクエストボディ:**
```json
{
  "templateId": "seasonal_recommendation",
  "userId": "user-id-here",
  "testMode": false
}
```

### テンプレート管理 API

```
GET /api/email/templates     # テンプレート一覧取得
PUT /api/email/templates     # テンプレート更新
POST /api/email/templates    # テンプレート初期化
```

### Cron API (GitHub Actions用)

```
GET /api/cron/send-emails?templateId=seasonal_recommendation&secret=your-secret
```

## 6. パーソナライズ変数

テンプレート内で使用できる変数：

| 変数名 | 説明 | 例 |
|-------|------|-----|
| `{{userName}}` | ユーザー名 | 田中太郎 |
| `{{userEmail}}` | メールアドレス | user@example.com |
| `{{remainingLimit}}` | 残り限度額 | 50,000 |
| `{{usageRate}}` | 利用率 | 60 |
| `{{favoriteCategory}}` | お気に入りカテゴリ | 海鮮 |
| `{{totalDonations}}` | 今年の寄付総額 | 100,000 |
| `{{year}}` | 年 | 2025 |
| `{{month}}` | 月 | 11 |

### 条件分岐

```html
{{#if usageRate > 70}}
  残りわずかです！
{{else}}
  まだ余裕があります。
{{/if}}
```

## 7. GitHub Actions のスケジュール

`.github/workflows/scheduled-emails.yml` で定義：

- **季節のおすすめ**: 毎月1日 0:00 UTC (9:00 JST)
- **限度額通知**: 6月、9月、11月の1日
- **年末駆け込み**: 11/15, 12/1, 12/15
- **確定申告**: 2/1, 2/20

### 手動実行

1. GitHubリポジトリの「Actions」タブを開く
2. 「Scheduled Email Delivery」ワークフローを選択
3. 「Run workflow」をクリック
4. テンプレートIDを選択して実行

## 8. トラブルシューティング

### メールが送信されない

1. Brevo APIキーが正しく設定されているか確認
2. ユーザーの `newsletter` フラグが `true` になっているか確認
3. `emailPreferences` で該当メールタイプが無効になっていないか確認
4. Firestoreの`emailLogs`コレクションでエラーログを確認

### GitHub Actionsが動かない

1. GitHub Secretsが正しく設定されているか確認
2. `APP_URL` が本番環境のURLになっているか確認
3. `CRON_SECRET` がVercelと一致しているか確認

### テストメールが届かない

1. Brevoの送信ログを確認
2. 管理者メールアドレスが正しいか確認
3. スパムフォルダを確認

## 9. コスト見積もり

### Brevo (無料プラン)

- 無料枠: **300通/日**
- 想定: 1,000ユーザー × 月4通 = 4,000通/月
- 1日あたり約133通 → **無料枠内で収まる**

### 有料プランが必要な場合

- Lite プラン: €25/月（約4,000円）で 10,000通/月
- Premium プラン: €65/月（約10,000円）で 20,000通/月

## 10. セキュリティ考慮事項

1. **CRON_SECRET**: 強固なランダム文字列を使用
2. **API認証**: Cron APIはシークレットキー必須
3. **重複送信防止**: 24時間以内の再送信を防止
4. **個人情報保護**: メールログは最小限の情報のみ記録
5. **配信停止**: 各メールに配信停止リンクを含める

## 11. 今後の拡張

- [ ] メール開封率・クリック率の追跡
- [ ] A/Bテスト機能
- [ ] ユーザーセグメント別配信
- [ ] 配信停止ページの実装
- [ ] メール配信履歴の可視化
