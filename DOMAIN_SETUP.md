# furusona.jp ドメイン設定ガイド

## 概要

このガイドでは、Vercelで furusona.jp ドメインを設定する手順を説明します。

## 前提条件

- furusona.jp ドメインを所有している
- Vercel アカウントを作成済み
- プロジェクトがVercelにデプロイ済み

## ステップ1: Vercelプロジェクトにドメインを追加

### 1.1 Vercelダッシュボードを開く

1. [Vercel Dashboard](https://vercel.com/dashboard)にログイン
2. furusona プロジェクトを選択
3. 「Settings」タブをクリック
4. 左メニューから「Domains」を選択

### 1.2 ドメインを追加

1. 「Add Domain」ボタンをクリック
2. `furusona.jp` と入力
3. 「Add」をクリック
4. さらに `www.furusona.jp` も追加

## ステップ2: DNSレコードの設定

Vercelが表示するDNSレコードをドメインレジストラ（お名前.com、ムームードメイン等）で設定します。

### 2.1 Aレコードの設定（furusona.jp）

**Type**: A
**Name**: @ (または空欄)
**Value**: `76.76.21.21`
**TTL**: 3600（自動）

### 2.2 CNAMEレコードの設定（www.furusona.jp）

**Type**: CNAME
**Name**: www
**Value**: `cname.vercel-dns.com`
**TTL**: 3600（自動）

### 2.3 お名前.comでの設定例

1. お名前.comにログイン
2. 「ドメイン設定」→「DNS設定/転送設定」
3. furusona.jp を選択
4. 「DNSレコード設定を利用する」を選択
5. 上記のAレコードとCNAMEレコードを追加
6. 「確認画面へ進む」→「設定する」

### 2.4 ムームードメインでの設定例

1. ムームードメインにログイン
2. 「ドメイン操作」→「ムームーDNS」
3. furusona.jp の「変更」をクリック
4. 「カスタム設定」を選択
5. 上記のAレコードとCNAMEレコードを追加
6. 「セットアップ情報変更」をクリック

## ステップ3: DNS伝播の確認

DNS設定が反映されるまで最大48時間かかる場合がありますが、通常は数分〜数時間で完了します。

### 確認方法

1. ターミナルで以下のコマンドを実行:

```bash
# Aレコードの確認
nslookup furusona.jp

# CNAMEレコードの確認
nslookup www.furusona.jp
```

2. オンラインツールで確認:
   - [What's My DNS](https://www.whatsmydns.net/)
   - [DNS Checker](https://dnschecker.org/)

## ステップ4: Vercelでドメイン検証

1. Vercel Dashboardの「Domains」ページに戻る
2. furusona.jp の横に緑のチェックマークが表示されれば成功
3. エラーが表示される場合は、DNSレコードを再確認

## ステップ5: HTTPS/SSL証明書の自動設定

Vercelは自動的にSSL証明書を発行します。

- ドメイン検証が完了すると、自動的にLet's Encrypt証明書が発行されます
- 通常、数分以内に完了
- `https://furusona.jp` でアクセス可能になります

## ステップ6: www → ルートドメインへのリダイレクト設定

Vercelでは自動的に `www.furusona.jp` → `furusona.jp` へリダイレクトされます。

設定を変更する場合:

1. Vercel Dashboard の「Domains」ページ
2. www.furusona.jp の横の「...」メニュー
3. 「Redirect to furusona.jp」を選択

## ステップ7: 環境変数の更新

ドメイン設定後、環境変数を更新します。

1. Vercel Dashboard の「Settings」→「Environment Variables」
2. `NEXT_PUBLIC_APP_URL` を編集
3. 値を `https://furusona.jp` に変更
4. 「Save」をクリック
5. 「Deployments」タブで最新デプロイを選択
6. 「Redeploy」をクリック

## ステップ8: Firebase認証の設定更新

### 8.1 承認済みドメインの追加

1. [Firebase Console](https://console.firebase.google.com/)にログイン
2. furusona-23aa4 プロジェクトを選択
3. 「Authentication」→「Settings」→「Authorized domains」
4. 「Add domain」をクリック
5. `furusona.jp` を追加
6. 保存

### 8.2 OAuth リダイレクトURIの設定（Google認証）

1. [Google Cloud Console](https://console.cloud.google.com/)
2. 該当プロジェクトを選択
3. 「APIとサービス」→「認証情報」
4. OAuth 2.0 クライアントIDを選択
5. 「承認済みのリダイレクトURI」に以下を追加:
   - `https://furusona.jp/__/auth/handler`
   - `https://furusona-23aa4.firebaseapp.com/__/auth/handler`

## ステップ9: 楽天APIコールバックドメインの確認

楽天デベロッパーサイトで既に設定済み:
- コールバック許可ドメイン: `furusona.jp` ✓

追加設定は不要です。

## ステップ10: 動作確認

以下の項目を確認してください:

### 基本動作
- [ ] https://furusona.jp でアクセスできる
- [ ] HTTPSが有効（南京錠アイコンが表示される）
- [ ] www.furusona.jp がfurusona.jp にリダイレクトされる

### 認証
- [ ] メール/パスワードでログインできる
- [ ] Google認証でログインできる
- [ ] ログアウトできる

### 機能
- [ ] プロファイル設定で限度額計算ができる
- [ ] ダッシュボードでAI推薦が表示される
- [ ] 返礼品リンクが正しく動作する
- [ ] 寄付履歴が表示される

## トラブルシューティング

### ドメインが検証されない

**原因**: DNSレコードが正しく設定されていない

**解決策**:
1. DNSレコードを再確認
2. TTLを300秒に短縮して再試行
3. 既存のAレコード/CNAMEレコードと競合していないか確認

### SSL証明書が発行されない

**原因**: ドメイン検証が完了していない

**解決策**:
1. ドメイン検証が完了するまで待つ
2. Vercelサポートに問い合わせ

### Google認証でエラー

**原因**: OAuth リダイレクトURIが設定されていない

**解決策**:
1. Firebase Consoleで承認済みドメインを確認
2. Google Cloud ConsoleでリダイレクトURIを確認

### 楽天APIが動作しない

**原因**: コールバックドメインの設定

**解決策**:
1. 楽天デベロッパーサイトでコールバックドメインを確認
2. 必要に応じて `www.furusona.jp` も追加

## セキュリティ設定（推奨）

### HSTS (HTTP Strict Transport Security)

Vercelは自動的にHSTSヘッダーを設定しますが、確認方法:

1. ブラウザの開発者ツールを開く
2. ネットワークタブでレスポンスヘッダーを確認
3. `Strict-Transport-Security` ヘッダーがあることを確認

### Content Security Policy

`next.config.ts` にCSP設定を追加（任意）:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
```

## 完了チェックリスト

- [ ] DNSレコードが正しく設定されている
- [ ] ドメインがVercelで検証されている
- [ ] SSL証明書が発行されている
- [ ] Firebase認証ドメインが追加されている
- [ ] 環境変数が更新されている
- [ ] すべての機能が正常に動作している
- [ ] セキュリティヘッダーが設定されている

## サポート

問題が解決しない場合:
- [Vercel Support](https://vercel.com/support)
- [Firebase Support](https://firebase.google.com/support)
- プロジェクトのGitHub Issues

## 次のステップ

ドメイン設定完了後:
1. Google Search Consoleに登録
2. Google Analyticsの設定
3. sitemap.xmlの生成と送信
4. robots.txtの設定
5. OGP画像の設定
