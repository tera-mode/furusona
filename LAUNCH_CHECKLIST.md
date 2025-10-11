# ふるそな ローンチチェックリスト

本番環境へのデプロイ前に、以下の項目を確認してください。

## 📋 デプロイ前チェック

### コード品質
- [x] ESLintエラーがない (`npm run lint`)
- [ ] TypeScriptエラーがない (`npm run build`)
- [ ] すべての環境変数が設定されている
- [ ] .env.local が .gitignore に含まれている
- [ ] console.log() などのデバッグコードを削除

### セキュリティ
- [x] Firestore セキュリティルールが設定されている
- [ ] Firebase Admin SDK の認証情報が安全に管理されている
- [ ] APIキーが環境変数で管理されている
- [ ] CORS設定が適切
- [ ] 本番環境でのデバッグモードが無効

### Firebase設定
- [ ] Firebase プロジェクトが作成されている
- [ ] Authentication で Email/Password が有効
- [ ] Authentication で Google 認証が有効
- [ ] Firestore Database が作成されている
- [ ] Firestore セキュリティルールがデプロイされている
- [ ] 承認済みドメインに `furusona.jp` が追加されている

### 外部API設定
- [x] 楽天 Application ID が取得済み
- [x] 楽天 Affiliate ID が取得済み
- [x] 楽天コールバックドメインに `furusona.jp` が設定されている
- [x] Anthropic API キーが取得済み
- [ ] Claude API の使用量制限を設定

### Vercel設定
- [ ] Vercelプロジェクトが作成されている
- [ ] GitHub リポジトリと連携されている
- [ ] すべての環境変数が設定されている
- [ ] ドメイン `furusona.jp` が追加されている
- [ ] DNS レコードが正しく設定されている

## 🚀 デプロイ手順

### 1. GitHubへのプッシュ

```bash
# リポジトリの状態確認
git status

# すべての変更をステージング（.env.localは除外される）
git add .

# コミット
git commit -m "feat: Initial release of furusona MVP"

# GitHubにプッシュ
git push origin main
```

### 2. Vercelでの自動デプロイ

- GitHubへのプッシュで自動的にデプロイが開始されます
- Vercel Dashboard でビルド状況を確認

### 3. 環境変数の設定（初回のみ）

Vercel Dashboard > Settings > Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
RAKUTEN_APPLICATION_ID=your_rakuten_application_id
RAKUTEN_AFFILIATE_ID=your_rakuten_affiliate_id
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_APP_URL=https://furusona.jp
```

### 4. ドメイン設定

詳細は `DOMAIN_SETUP.md` を参照

**DNSレコード:**
- A レコード: @ → 76.76.21.21
- CNAME レコード: www → cname.vercel-dns.com

### 5. Firebase設定の更新

1. Firebase Console > Authentication > Settings > Authorized domains
   - `furusona.jp` を追加

2. Google Cloud Console > 認証情報 > OAuth 2.0 クライアントID
   - 承認済みリダイレクトURIに追加:
     - `https://furusona.jp/__/auth/handler`
     - `https://furusona-23aa4.firebaseapp.com/__/auth/handler`

### 6. Firestore セキュリティルールのデプロイ

```bash
# Firebase CLI でログイン
firebase login

# プロジェクトを初期化（初回のみ）
firebase init firestore

# ルールをデプロイ
firebase deploy --only firestore:rules
```

## ✅ デプロイ後チェック

### 基本動作確認

- [ ] https://furusona.jp でアクセスできる
- [ ] HTTPSが有効（鍵アイコンが表示される）
- [ ] www.furusona.jp が furusona.jp にリダイレクトされる
- [ ] トップページが正しく表示される
- [ ] レスポンシブデザインが正しく動作する

### 認証機能

- [ ] メール/パスワードで新規登録できる
- [ ] メール/パスワードでログインできる
- [ ] Google認証で新規登録できる
- [ ] Google認証でログインできる
- [ ] ログアウトできる
- [ ] 認証エラーが適切に表示される

### プロファイル設定

- [ ] 年収を入力できる
- [ ] 家族構成を選択できる
- [ ] 限度額が正しく計算される
- [ ] 好みのカテゴリを選択できる
- [ ] プロファイルが保存される
- [ ] Firestoreにデータが保存される

### ダッシュボード

- [ ] おすすめ返礼品が3つ表示される
- [ ] 商品画像が表示される
- [ ] 商品情報が正しく表示される
- [ ] おすすめ理由が表示される
- [ ] スコアが表示される
- [ ] 「新しいおすすめを取得」が動作する
- [ ] 楽天へのリンクが正しく動作する
- [ ] アフィリエイトIDが含まれている

### 寄付履歴

- [ ] 履歴ページが表示される
- [ ] 年度選択が動作する
- [ ] 限度額サマリーが正しく表示される

### エラーハンドリング

- [ ] APIエラーが適切に処理される
- [ ] ネットワークエラーが適切に表示される
- [ ] 未認証時のリダイレクトが正しく動作する
- [ ] 404ページが表示される（存在しないページ）

### パフォーマンス

- [ ] ページの初期表示が3秒以内
- [ ] 画像が最適化されている
- [ ] レスポンスタイムが適切

### SEO

- [ ] robots.txt が正しく配信される
- [ ] sitemap.xml が正しく配信される
- [ ] OGPメタタグが設定されている
- [ ] タイトルタグが適切
- [ ] ディスクリプションが適切

## 🔍 監視とモニタリング

### Vercel Analytics

- [ ] Vercel Analytics が有効になっている
- [ ] アクセス数が記録されている
- [ ] エラーレートを確認

### Firebase Console

- [ ] Authentication のユーザー数を確認
- [ ] Firestore の読み取り/書き込み数を確認
- [ ] 使用量アラートを設定

### エラーログ

- [ ] Vercel Function Logs でエラーを確認
- [ ] Claude API のエラーレートを確認
- [ ] 楽天API のエラーレートを確認

## 💰 コスト管理

### Firebase（無料枠の確認）

- [ ] Authentication: 月間 10,000 認証以内
- [ ] Firestore: 50,000 読み取り/20,000 書き込み/日以内
- [ ] 使用量アラートが設定されている

### Anthropic Claude API

- [ ] 初月の予算を設定（例: $50）
- [ ] 使用量制限を設定
- [ ] 請求アラートを設定

### Vercel

- [ ] 無料プランの制限内か確認
- [ ] 必要に応じてProプランへアップグレード

## 📊 Google Analytics（任意）

- [ ] Google Analytics 4 プロパティを作成
- [ ] 測定IDを取得
- [ ] Next.js に Google Analytics を統合
- [ ] イベントトラッキングを設定

## 🔐 セキュリティ強化（推奨）

### HTTPSセキュリティヘッダー

- [ ] HSTS ヘッダーが設定されている
- [ ] X-Frame-Options が設定されている
- [ ] X-Content-Type-Options が設定されている

### レート制限

- [ ] API エンドポイントのレート制限を検討
- [ ] Claude API の過度な使用を防ぐ

### データ保護

- [ ] 個人情報の適切な取り扱い
- [ ] プライバシーポリシーの作成（必要に応じて）
- [ ] 利用規約の作成（必要に応じて）

## 📝 ドキュメント

- [x] README.md が最新
- [x] DEPLOYMENT.md が最新
- [x] DOMAIN_SETUP.md が作成されている
- [ ] APIドキュメントが作成されている（必要に応じて）

## 🎉 ローンチ後のタスク

### 初日
- [ ] 全機能の動作確認
- [ ] エラーログの監視
- [ ] パフォーマンスメトリクスの確認

### 1週間後
- [ ] ユーザーフィードバックの収集
- [ ] バグレポートの確認と修正
- [ ] 使用量とコストの確認

### 1ヶ月後
- [ ] 月間レポートの作成
- [ ] 機能改善の優先順位付け
- [ ] スケーリング計画の検討

## 🆘 トラブルシューティング

問題が発生した場合:

1. **ビルドエラー**
   - Vercel の Build Logs を確認
   - ローカルで `npm run build` を実行して確認

2. **ランタイムエラー**
   - Vercel の Function Logs を確認
   - 環境変数が正しく設定されているか確認

3. **認証エラー**
   - Firebase Console で承認済みドメインを確認
   - OAuth リダイレクトURIを確認

4. **API エラー**
   - 各APIの使用量制限を確認
   - APIキーが有効か確認

## 連絡先

- Vercel Support: https://vercel.com/support
- Firebase Support: https://firebase.google.com/support
- GitHub Issues: （プロジェクトリポジトリ）

---

**最終確認日**: ___________
**確認者**: ___________
**デプロイ日時**: ___________
**本番URL**: https://furusona.jp
