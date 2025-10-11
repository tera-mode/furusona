# ふるそな デプロイメントガイド

## 必要な準備

### 1. Firebase プロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `furusona`）
4. Google アナリティクスは任意で設定

### 2. Firebase Authentication の設定

1. Firebase Console で「Authentication」を選択
2. 「始める」をクリック
3. サインイン方法タブで以下を有効化:
   - メール/パスワード
   - Google

### 3. Firestore Database の作成

1. Firebase Console で「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. 本番環境モードを選択
4. ロケーションを選択（asia-northeast1 推奨）
5. ルールタブで、`firestore.rules` の内容をコピーペースト

### 4. Firebase SDK 設定の取得

1. Firebase Console でプロジェクト設定を開く
2. 「マイアプリ」セクションで「ウェブアプリを追加」
3. アプリのニックネームを入力
4. Firebase Hosting は任意
5. 表示される設定値（apiKey, authDomain等）をコピー

### 5. 楽天 API の取得

1. [楽天デベロッパーサイト](https://webservice.rakuten.co.jp/)でアカウント作成
2. 「アプリID発行」から新規アプリを作成
3. アプリケーションID（必須）をコピー
4. アフィリエイトID（任意）も取得推奨

### 6. Anthropic API の取得

1. [Anthropic Console](https://console.anthropic.com/)でアカウント作成
2. API Keys ページで新しいキーを作成
3. キーをコピー（一度しか表示されません）

## Vercel へのデプロイ

### 1. Vercel アカウントの作成

1. [Vercel](https://vercel.com/)でアカウント作成
2. GitHub アカウントと連携

### 2. GitHubリポジトリの準備

```bash
# Gitリポジトリを初期化
git init

# .gitignoreファイルが正しく設定されているか確認
# .env.local が除外されていることを確認！

# 全てのファイルをコミット
git add .
git commit -m "Initial commit: ふるそな MVP"

# GitHubに新しいリポジトリを作成後、push
git remote add origin https://github.com/yourusername/furusona.git
git branch -M main
git push -u origin main
```

### 3. Vercel でプロジェクトをインポート

1. Vercel ダッシュボードで「Add New Project」
2. GitHubリポジトリを選択
3. Framework Preset: Next.js（自動検出されます）
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `.next`

### 4. 環境変数の設定

Vercel のプロジェクト設定で「Environment Variables」タブを開き、以下を追加:

#### Firebase 設定
```
NEXT_PUBLIC_FIREBASE_API_KEY=あなたのAPIキー
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

#### 楽天 API
```
RAKUTEN_APPLICATION_ID=あなたのアプリケーションID
RAKUTEN_AFFILIATE_ID=あなたのアフィリエイトID（任意）
```

#### Anthropic API
```
ANTHROPIC_API_KEY=sk-ant-あなたのAPIキー
```

#### アプリURL（デプロイ後に更新）
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 5. デプロイ実行

1. 「Deploy」ボタンをクリック
2. ビルドが成功するのを待つ
3. デプロイURLを確認

### 6. アプリURLの更新

1. Vercel からデプロイされたURLをコピー
2. Vercel の環境変数で `NEXT_PUBLIC_APP_URL` を更新
3. 再デプロイ

## Firebase Hosting へのデプロイ（任意）

Vercel の代わりに Firebase Hosting を使用する場合:

### 1. Firebase CLI のインストール

```bash
npm install -g firebase-tools
```

### 2. Firebase にログイン

```bash
firebase login
```

### 3. Firebase プロジェクトを初期化

```bash
firebase init hosting
```

- プロジェクトを選択
- Public directory: `.next` を入力
- Configure as a single-page app: Yes
- Set up automatic builds and deploys with GitHub: 任意

### 4. ビルドとデプロイ

```bash
npm run build
firebase deploy --only hosting
```

## デプロイ後の確認事項

### 1. 動作確認

- [ ] トップページが表示される
- [ ] Google認証でログインできる
- [ ] メール/パスワードでログインできる
- [ ] プロファイル設定で限度額計算ができる
- [ ] ダッシュボードで推薦が表示される
- [ ] 返礼品のリンクが正しく動作する

### 2. Firebase の確認

- [ ] Authentication にユーザーが登録される
- [ ] Firestore にユーザーデータが保存される
- [ ] セキュリティルールが正しく動作する

### 3. API の確認

- [ ] 楽天APIから返礼品が取得できる
- [ ] Claude API が推薦を生成する
- [ ] エラーログを確認（Vercel Dashboard）

## トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルドテスト
npm run build

# TypeScriptエラーを確認
npm run lint
```

### 環境変数のエラー

- すべての環境変数が設定されているか確認
- `NEXT_PUBLIC_` プレフィックスが正しいか確認
- 値に余分なスペースや引用符がないか確認

### Firebase 接続エラー

- Firebase設定が正しいか確認
- Firestore セキュリティルールが正しいか確認
- Authentication が有効になっているか確認

### API エラー

- 楽天 API: アプリケーションIDが正しいか確認
- Claude API: APIキーが有効か確認、使用量制限を確認
- レート制限に達していないか確認

## モニタリング

### Vercel Analytics

1. Vercel Dashboard でプロジェクトを開く
2. Analytics タブでアクセス状況を確認

### Firebase Console

1. Authentication でユーザー数を確認
2. Firestore でデータ使用量を確認
3. 使用量アラートを設定

### エラー追跡

Vercel の Logs タブでエラーログを確認:
- Function Logs
- Build Logs
- Edge Logs

## コスト管理

### Firebase（無料枠）
- Authentication: 月間 10,000 認証まで無料
- Firestore: 1GB ストレージ、50,000 読み取り/20,000 書き込み/日まで無料

### Anthropic Claude API
- 使用量に応じた従量課金
- 推薦1回あたり約$0.01-0.03程度
- 使用量制限の設定を推奨

### 楽天 API
- 無料（API利用制限あり: 1秒1リクエスト）
- アフィリエイトIDを設定すれば収益化可能

### Vercel（無料枠）
- Hobby プラン: 無料
- 商用利用の場合は Pro プラン推奨

## セキュリティチェックリスト

- [ ] `.env.local` がGitリポジトリに含まれていない
- [ ] Firebase セキュリティルールが適切に設定されている
- [ ] CORS設定が適切（Next.js API Routesは自動設定）
- [ ] APIキーが環境変数で管理されている
- [ ] 本番環境でのデバッグログが無効化されている

## 次のステップ

- カスタムドメインの設定
- Google Analytics の追加
- エラー追跡サービス（Sentry等）の導入
- パフォーマンス最適化
- SEO対策
