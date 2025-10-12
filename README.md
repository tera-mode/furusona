# ふるそな - ふるさと納税パーソナライズ推薦サービス MVP

AIがあなたにぴったりのふるさと納税返礼品を提案するサービスです。

## ドキュメント

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 技術アーキテクチャ、データモデル、システム構成
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - 開発ガイド、セットアップ手順、トラブルシューティング
- **[API.md](./API.md)** - API仕様書、エンドポイント詳細

## 主な機能

1. **限度額計算**: 年収と家族構成から、ふるさと納税の限度額を自動計算
2. **AIパーソナライズ推薦**: Claude APIを使用して、ユーザーの好みに合わせた返礼品を9つ推薦
3. **ユーザー好み学習**: 気になる/興味なしボタンでAIが学習し、類似商品のスコアを自動調整
4. **季節性対応**: AIが現在の月を考慮して旬の商品を優先的に推薦
5. **無限スクロール**: 下にスクロールすると自動的に新しいおすすめ返礼品を表示
6. **寄付履歴管理**: 今年の寄付を一覧で管理し、残りの限度額をリアルタイム表示
7. **Firestore永続キャッシュ**: 楽天APIから取得した商品データを検索条件ベースでキャッシュ（7日間有効）
8. **レスポンシブデザイン**: モバイル・タブレット・デスクトップに最適化されたUI
9. **管理者デバッグ画面**: アルゴリズム設定・変更履歴・フロー図を可視化（`/debug`）

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **認証・DB**: Firebase (Auth, Firestore)
- **外部API**:
  - 楽天市場API: 返礼品データ取得
  - Anthropic Claude API: パーソナライズ推薦エンジン
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`を`.env.local`にコピーして、以下の環境変数を設定してください:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Rakuten API
RAKUTEN_APPLICATION_ID=your_rakuten_app_id
RAKUTEN_AFFILIATE_ID=your_rakuten_affiliate_id

# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Firebaseプロジェクトの設定

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. Authentication で Email/Password と Google 認証を有効化
3. Firestore Database を作成
4. Firebase CLIをインストール（まだの場合）:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore
   ```
5. `firestore.rules`と`firestore.indexes.json`をデプロイ:
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

   または、エラーメッセージ内のURLから手動でインデックスを作成することもできます。

### 4. 外部APIの取得

#### 楽天市場API
1. [楽天デベロッパーサイト](https://webservice.rakuten.co.jp/)でアカウント作成
2. アプリケーションIDを取得
3. アフィリエイトIDを取得（任意）

#### Anthropic Claude API
1. [Anthropic Console](https://console.anthropic.com/)でアカウント作成
2. APIキーを取得

### 5. 商品データのプリフェッチ（任意）

初回起動時に主要カテゴリの返礼品データをキャッシュする場合:

```bash
npm run prefetch
```

これにより、以下のカテゴリの商品データがFirestoreにキャッシュされます:
- 肉、魚介、フルーツ、お米、スイーツ、野菜、加工品、飲料

キャッシュは7日間有効で、期限切れの場合は自動的に楽天APIから再取得されます。

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## プロジェクト構造

```
furusona/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # APIルート
│   │   │   ├── calculate-limit/  # 限度額計算API
│   │   │   ├── rakuten/          # 楽天API統合（キャッシング対応）
│   │   │   └── recommendations/  # Claude推薦API
│   │   ├── dashboard/       # ダッシュボード画面
│   │   ├── profile/         # プロファイル設定画面
│   │   ├── history/         # 寄付履歴画面
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── page.tsx         # トップページ
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # Reactコンポーネント
│   │   ├── auth/           # 認証関連コンポーネント
│   │   └── ProductCard.tsx # 返礼品カード
│   ├── hooks/              # カスタムフック
│   │   └── useAuth.tsx     # 認証フック
│   ├── lib/                # ライブラリ設定
│   │   ├── firebase.ts     # Firebase設定
│   │   ├── firebase-admin.ts
│   │   └── product-cache.ts # 商品キャッシュサービス
│   ├── types/              # TypeScript型定義
│   │   └── index.ts
│   └── utils/              # ユーティリティ関数
│       └── furusatoCalculator.ts
├── scripts/                # スクリプト
│   └── prefetch-products.ts # 商品データプリフェッチ
├── .env.local.example      # 環境変数テンプレート
├── firestore.rules         # Firestoreセキュリティルール
├── next.config.ts          # Next.js設定
├── package.json            # 依存関係
└── tsconfig.json           # TypeScript設定
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com/)でアカウント作成
2. GitHubリポジトリと連携
3. 環境変数を設定
4. デプロイ

```bash
npm run build
```

### Firestore セキュリティルールとインデックスのデプロイ

```bash
# セキュリティルールとインデックスを両方デプロイ
firebase deploy --only firestore

# または個別にデプロイ
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## 使い方

1. **アカウント登録**: メールアドレスまたはGoogleアカウントで登録
2. **プロファイル設定**: 年収、家族構成、好みのカテゴリを入力
3. **限度額計算**: 自動的にふるさと納税の限度額を計算
4. **おすすめ取得**: AIが最適な返礼品を9つ推薦
5. **好みの学習**: ♡気になるボタンで商品を保存、△興味なしボタンで除外（AIが自動学習）
6. **無限スクロール**: 下にスクロールするとさらに新しいおすすめが表示
7. **寄付記録**: 気に入った返礼品をクリックして楽天市場で寄付し、「購入済みに変更」ボタンで寄付履歴に追加

## 最新の更新

### v1.4.0 (2025-10-12)
- **ユーザー好み学習機能**: 気になる(♡)・興味なし(△)ボタンによるAI学習機能を実装
  - 気になるリストと類似商品に+10点ボーナス
  - 興味なしリストと類似商品に-10点ペナルティ
  - 両ボタンは相互排他的に動作（片方を押すと他方は自動解除）
- **UI/UX改善**:
  - メイン背景を暖色系（#faf6f4）に変更し、温かみのあるデザインに
  - 商品画像と商品名をクリッカブルに（アフィリエイトリンクへ直接遷移）
  - 「寄付履歴に追加」→「購入済みに変更」にボタン名称を変更
  - ボタンデザインをより控えめなスタイルに変更

### v1.3.0 (2025-10-12)
- **Firestore永続キャッシュ実装**: 検索条件ベースのハッシュキーでキャッシュを管理（7日間有効）
- **候補商品数拡大**: 90件 → 300件に拡大（最大10カテゴリ × 30件）
- **季節性判断の改善**: プリセットキーワードを廃止し、AIによる季節性判断に変更
  - AIが現在の月を考慮して旬の商品を判断
  - 季節性ボーナス: 旬の商品に+5点（強制ではなく、多様性を保持）
- **管理者デバッグ画面**: `/debug` にアルゴリズム設定・変更履歴・フロー図を実装

### v1.2.0 (2025-10-12)
- **商品キャッシング基盤実装**: 楽天API返礼品データをFirestoreにキャッシュ（7日間有効）
- **ProductCacheServiceクラス追加**: キャッシュ優先の商品取得ロジックを実装
- **プリフェッチスクリプト**: 主要カテゴリの商品を事前キャッシュする`npm run prefetch`コマンド追加
- **Claude APIコスト削減**: Haiku 3.5モデル採用、プロンプト最適化で約85-90%コスト削減
- **API呼び出し削減**: 楽天APIリクエスト数を大幅削減し、レート制限対策を実施

### v1.1.1 (2025-10-11)
- **モバイルナビゲーション改善**: スマホ表示でもアイコン+テキスト形式で表示し操作性向上
- **推薦数増加**: デフォルトのおすすめ返礼品表示を3品から9品に増加
- **無限スクロール最適化**: 初回表示時の二重読み込みを防止し、スムーズなスクロール体験を実現
- **エラーハンドリング強化**: 返礼品が見つからない場合の適切なフィードバックと対処方法の提示
- **楽天アフィリエイト表記**: ダッシュボード下部に表記を追加し、透明性の向上

### v1.1.0 (2025-10-11)
- **UIデザイン刷新**: 暖色系の統一されたカラーパレットを適用
- **無限スクロール実装**: 自動で新しいおすすめを読み込み
- **ヘッダー最適化**: 限度額サマリーをヘッダーに統合し、常時表示
- **マイページ追加**: アカウント情報とプロフィール設定を集約

## 注意事項

- ブラウザストレージ（localStorage, sessionStorage）は使用していません
- すべてのデータはFirestoreに保存されます
- 楽天APIは1秒1リクエストの制限があります
- Claude APIの利用には料金が発生します
- 本サービスは楽天アフィリエイトを利用しています

## 🚨 セキュリティルール（必読）

### 絶対に守るべきルール

#### 1. **環境変数・APIキーの取り扱い**
- ❌ **絶対禁止**: 実際のAPIキーや環境変数の値をコードやドキュメントに記載しない
- ❌ **絶対禁止**: `.env.local` ファイルをGitにコミットしない
- ✅ **推奨**: `.env.local.example` に例示値（`your_api_key`等）のみ記載
- ✅ **推奨**: 環境変数は必ず `.gitignore` に含める

#### 2. **ドキュメント・コメントの記述ルール**
- ❌ **絶対禁止**: 実際のAPIキー、アプリケーションID、認証情報をドキュメントに記載
- ❌ **絶対禁止**: デバッグログやコメントに機密情報を含める
- ✅ **推奨**: 例示には必ずプレースホルダーを使用（例: `your_rakuten_app_id`）
- ✅ **推奨**: 設定手順を記載する際は「取得した値を設定」のように記述

#### 3. **コミット前のチェック**
Gitにコミットする前に、以下を必ず確認：
```bash
# 機密情報が含まれていないか検索
git diff | grep -E "(AIzaSy|sk-ant-|[0-9]{19})"

# .env.local がステージングされていないか確認
git status | grep "\.env\.local$"
```

#### 4. **万が一漏洩した場合の対処**
1. **即座にAPIキーを無効化・再生成**
   - Firebase: Console > Project Settings > API Keys
   - Rakuten: デベロッパーサイトでアプリケーション削除
   - Anthropic: Console > API Keys > Revoke
2. **Git履歴から完全削除**
   ```bash
   # 履歴をリセットして新規コミット
   git checkout --orphan new-main
   git add -A
   git commit -m "security: Clean commit without sensitive data"
   git branch -D main
   git branch -m new-main main
   git push origin main --force
   ```
3. **新しいAPIキーで `.env.local` を更新**

#### 5. **公開リポジトリでの注意**
- Firebase公開APIキー（`NEXT_PUBLIC_FIREBASE_API_KEY`）は公開されても、Firestoreセキュリティルールが適切なら問題なし
- しかし、Rakuten、Anthropic等のサーバーサイドAPIキーは**絶対に公開厳禁**
- `.env.local.example` には実際の値を記載しない

#### 6. **Claude Code利用時の注意**
- AIが自動生成したドキュメントやコメントに実際の認証情報が含まれていないか必ず確認
- 作業完了後、全ファイルを検索して機密情報の有無をチェック

### 推奨ツール
```bash
# 機密情報検出ツール
npm install -g git-secrets
git secrets --install
git secrets --register-aws  # または適切なパターン登録
```

## ライセンス

MIT License

## お問い合わせ

バグ報告や機能要望は、GitHubのIssuesでお願いします。
