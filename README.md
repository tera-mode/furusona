# ふるそな - ふるさと納税パーソナライズ推薦サービス MVP

AIがあなたにぴったりのふるさと納税返礼品を提案するサービスです。

## ドキュメント

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 技術アーキテクチャ、データモデル、システム構成
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - 開発ガイド、セットアップ手順、トラブルシューティング
- **[API.md](./API.md)** - API仕様書、エンドポイント詳細

## 主な機能

1. **限度額計算**: 年収と家族構成から、ふるさと納税の限度額を自動計算
2. **AIパーソナライズ推薦**: Claude APIを使用して、ユーザーの好みに合わせた返礼品を9つ推薦
3. **無限スクロール**: 下にスクロールすると自動的に新しいおすすめ返礼品を表示
4. **寄付履歴管理**: 今年の寄付を一覧で管理し、残りの限度額をリアルタイム表示
5. **レスポンシブデザイン**: モバイル・タブレット・デスクトップに最適化されたUI

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

### 5. 開発サーバーの起動

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
│   │   │   ├── rakuten/          # 楽天API統合
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
│   │   └── firebase-admin.ts
│   ├── types/              # TypeScript型定義
│   │   └── index.ts
│   └── utils/              # ユーティリティ関数
│       └── furusatoCalculator.ts
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
5. **無限スクロール**: 下にスクロールするとさらに新しいおすすめが表示
6. **寄付記録**: 気に入った返礼品をクリックして楽天市場で寄付し、寄付履歴に追加

## 最新の更新

### v1.1.1 (2025-10-11)
- **モバイルナビゲーション改善**: スマホ表示でもアイコン+テキスト形式で表示し操作性向上
- **推薦数増加**: デフォルトのおすすめ返礼品表示を3品から9品に増加
- **無限スクロール最適化**: 初回表示時の二重読み込みを防止し、スムーズなスクロール体験を実現
- **複数カテゴリ対応**: 最大3カテゴリから商品を取得し、候補数を大幅に増加（最大90件）
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

## ライセンス

MIT License

## お問い合わせ

バグ報告や機能要望は、GitHubのIssuesでお願いします。
