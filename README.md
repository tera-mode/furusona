# ふるそな - ふるさと納税パーソナライズ推薦サービス MVP

AIがあなたにぴったりのふるさと納税返礼品を提案するサービスです。

## ドキュメント

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 技術アーキテクチャ、データモデル、システム構成
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - 開発ガイド、セットアップ手順、トラブルシューティング
- **[API.md](./API.md)** - API仕様書、エンドポイント詳細

## 主な機能

1. **2ステップオンボーディング**: 初回登録時にカテゴリ選択→収入情報入力の分かりやすい導線
2. **15カテゴリ対応**: 肉、魚介、野菜、うなぎ、米、フルーツ、麺類、飲料、スイーツ、お酒、ティッシュ、日用品、工芸品、家電、旅行券
3. **限度額計算**: 年収と家族構成から、ふるさと納税の限度額を自動計算（すべてオプショナル）
4. **AIパーソナライズ推薦**: Google Gemini APIを使用して、ユーザーの好みに合わせた返礼品を9つ推薦
5. **ユーザー好み学習**: 気になる/興味なしボタンでAIが学習し、類似商品のスコアを自動調整
6. **季節性対応**: AIが現在の月を考慮して旬の商品を優先的に推薦
7. **無限スクロール**: 下にスクロールすると自動的に新しいおすすめ返礼品を表示
8. **寄付履歴管理**: 今年の寄付を一覧で管理し、残りの限度額をリアルタイム表示
9. **Firestore永続キャッシュ**: 楽天APIから取得した商品データを検索条件ベースでキャッシュ（7日間有効）
10. **レスポンシブデザイン**: モバイル・タブレット・デスクトップに最適化されたUI
11. **管理者デバッグ画面**: アルゴリズム設定・変更履歴・フロー図を可視化（`/debug`）

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **認証・DB**: Firebase (Auth, Firestore)
- **外部API**:
  - 楽天市場API: 返礼品データ取得
  - Google Gemini API: パーソナライズ推薦エンジン
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

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

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

#### Google Gemini API
1. [Google AI Studio](https://aistudio.google.com/app/apikey)でAPIキーを取得
2. APIキーを`.env.local`に設定

### 5. 商品データのプリフェッチ（任意）

初回起動時に主要カテゴリの返礼品データをキャッシュする場合:

```bash
npm run prefetch
```

これにより、以下の15カテゴリの商品データがFirestoreにキャッシュされます:
- 肉・肉加工品、魚介・水産加工品、野菜・きのこ、うなぎ・惣菜、米
- フルーツ、麺類、飲料、スイーツ、お酒
- ティッシュ・トイレットペーパー、日用品、工芸品・インテリア、家電・電化製品、旅行券・体験

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
│   │   │   └── recommendations/  # Gemini推薦API
│   │   ├── dashboard/       # ダッシュボード画面
│   │   ├── profile/         # プロファイル設定画面
│   │   ├── history/         # 寄付履歴画面
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── page.tsx         # トップページ
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # Reactコンポーネント
│   │   ├── auth/           # 認証関連コンポーネント
│   │   ├── Onboarding.tsx  # 2ステップオンボーディング
│   │   └── ProductCard.tsx # 返礼品カード
│   ├── hooks/              # カスタムフック
│   │   └── useAuth.tsx     # 認証フック
│   ├── lib/                # ライブラリ設定
│   │   ├── firebase.ts     # Firebase設定
│   │   ├── firebase-admin.ts
│   │   ├── categoryMapping.ts  # 15カテゴリマッピング
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
2. **オンボーディング**: 2ステップで簡単セットアップ
   - ステップ1: 好みのカテゴリ選択（15種類から複数選択可）、アレルギー情報、お気に入り地域
   - ステップ2: 収入情報入力（すべてオプショナル、スキップ可能）
3. **限度額計算**: 収入情報を入力すれば自動的にふるさと納税の限度額を計算（未入力でも利用可）
4. **おすすめ取得**: AIが最適な返礼品を9つ推薦
5. **好みの学習**: ♡気になるボタンで商品を保存、△興味なしボタンで除外（AIが自動学習）
6. **無限スクロール**: 下にスクロールするとさらに新しいおすすめが表示
7. **寄付記録**: 気に入った返礼品をクリックして楽天市場で寄付し、「購入済みに変更」ボタンで寄付履歴に追加

## 最新の更新

### v1.6.0 (2025-10-26)
- **2ステップオンボーディング実装**: 初回登録時の導線を改善
  - ステップ1: カテゴリ選択（必須、最低1つ）、アレルギー、地域、カスタムリクエスト
  - ステップ2: 収入情報（すべてオプショナル）、ニュースレター購読
  - スキップ機能により、収入情報なしでもサービス利用可能
- **15カテゴリへの拡張**: 10→15カテゴリに拡大
  - 新規追加: 野菜・きのこ、うなぎ・惣菜、麺類、飲料、ティッシュ・トイレットペーパー、日用品、家電・電化製品、旅行券・体験
  - カテゴリごとに楽天検索キーワードマッピングを最適化
- **オプショナルフィールド対応**: 収入・家族構成情報をすべて任意に変更
  - 限度額未設定でもおすすめ機能が利用可能
  - ヘッダーに限度額計算へのガイダンスを表示
- **検索精度向上**: カテゴリ検索をキーワードベースに最適化
  - ジャンルID検索を廃止し、キーワード検索に一本化
  - 各カテゴリで適切な商品が表示されるよう改善
- **Gemini API itemCode修正**: 推薦APIの商品コードマッチング精度を改善
  - インデックス番号ではなく実際の商品コードを返すよう修正
  - プロンプトに明示的な指示を追加

### v1.4.1 (2025-10-12)
- **バグ修正**: プロフィール編集後のダッシュボード表示問題を修正
  - 推薦キャッシュキーに`updatedAt`を含めることで、プロフィール変更時に必ず新しい推薦を生成
  - 連続API呼び出し防止のため`isFetchingRef`フラグを実装
  - 商品マッチング処理で型を統一（itemCodeを文字列比較）
- **パフォーマンス改善**:
  - fetchRecommendationsの依存配列から`displayedItemCodes`を削除し、refベースに変更
  - 無限スクロール時の無駄なAPI呼び出しを防止
- **デバッグ機能追加**: フロントエンドとバックエンドに詳細なログを追加し、問題診断を容易に

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

### v1.5.0 (2025-10-25)
- **AI推薦エンジン変更**: Claude API → Gemini 2.5 Flash Liteに移行
  - コスト削減: 1回あたり約$0.01 → $0.0002～$0.0003（約97-98%削減）
  - より高速な応答時間を実現（15～25秒）
  - 推薦品質を維持しながらコストを大幅削減
  - Gemini 2.5の思考トークン問題に対応（maxOutputTokens: 8192）
  - プロンプト最適化により商品数を20件に削減

### v1.2.0 (2025-10-12)
- **商品キャッシング基盤実装**: 楽天API返礼品データをFirestoreにキャッシュ（7日間有効）
- **ProductCacheServiceクラス追加**: キャッシュ優先の商品取得ロジックを実装
- **プリフェッチスクリプト**: 主要カテゴリの商品を事前キャッシュする`npm run prefetch`コマンド追加
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
- Gemini APIの利用には料金が発生します（1回あたり約$0.0002～$0.0003）
- 本サービスは楽天アフィリエイトを利用しています

## 🔧 Gemini API トラブルシューティング

### Gemini APIで空のレスポンスが返る場合

**症状:**
- `Output tokens: 0` とログに表示される
- `finishReason: "MAX_TOKENS"` が返る
- JSONパースエラーが発生する

**原因と解決策:**

#### 1. **Gemini 2.5モデルの思考トークン問題**
Gemini 2.5系モデル（特に`gemini-2.5-flash`）は「思考トークン」（`thoughtsTokenCount`）を使用し、これが出力トークンを圧迫する場合があります。

```typescript
// ❌ 問題のある設定
generationConfig: {
  maxOutputTokens: 1024,  // 思考トークンで埋まってしまう
}

// ✅ 正しい設定
generationConfig: {
  maxOutputTokens: 8192,  // 思考トークン + 実際の出力に十分な余裕
  temperature: 0.7,
  responseMimeType: 'application/json',
}
```

#### 2. **推奨モデル選択**
用途に応じてモデルを選択：

| モデル | 用途 | 特徴 | 思考トークン |
|--------|------|------|-------------|
| `gemini-2.5-flash-lite` | **推奨** | 最軽量・最高速・最低コスト | 少ない |
| `gemini-2.5-flash` | 標準 | バランス型 | 多い（2000+） |
| `gemini-1.5-flash` | 後方互換 | 安定版（思考トークンなし） | なし |

```typescript
// 現在の推奨設定（軽量・高速）
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
});
```

#### 3. **プロンプトの長さ削減**
プロンプトが長すぎると、思考トークンがさらに増える可能性があります：

- 商品リストを20～30件程度に制限
- 商品名を30～40文字に切り詰め
- ユーザー情報を簡潔に記述

```typescript
// ✅ 短縮されたプロンプト例
const productList = topProducts.map((p, i) =>
  `${i}:${String(p.itemCode)}|${p.itemName.slice(0, 30)}|¥${p.itemPrice}`
).join('\n');
```

#### 4. **安全設定の調整**
デフォルトの安全フィルターが厳しすぎる場合、応答がブロックされることがあります：

```typescript
safetySettings: [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_NONE',
  },
  // ... 他のカテゴリも同様
]
```

#### 5. **レスポンスのデバッグ方法**
問題を特定するため、詳細なログを出力：

```typescript
// レスポンス全体を確認
console.log('Full response:', JSON.stringify(result.response, null, 2));

// ブロック理由を確認
if (result.response.promptFeedback?.blockReason) {
  console.error('Blocked:', result.response.promptFeedback.blockReason);
}

// トークン使用量を確認
console.log('Thoughts tokens:', result.response.usageMetadata?.thoughtsTokenCount);
console.log('Output tokens:', result.response.usageMetadata?.candidatesTokenCount);
```

### よくあるエラーと対処法

#### エラー: `models/gemini-xxx is not found`
**原因:** モデル名が間違っているか、APIキーに権限がない

**解決策:**
1. モデル名を確認：`gemini-2.5-flash-lite`、`gemini-2.5-flash`、`gemini-1.5-flash`
2. Google AI StudioでAPIキーが有効か確認
3. `.env.local`のAPIキーが正しく設定されているか確認
4. 開発サーバーを再起動（環境変数の再読み込み）

#### エラー: `JSON Parse Error: Unexpected end of JSON input`
**原因:** Gemini APIが空のレスポンスを返している

**解決策:**
1. 上記の「空のレスポンス」対策を実施
2. `maxOutputTokens`を8192に増やす
3. プロンプトを短縮
4. `gemini-2.5-flash-lite`に変更

### パフォーマンス最適化

**現在の設定（v1.5.0以降）:**
- モデル: `gemini-2.5-flash-lite`
- 商品数: 20件
- maxOutputTokens: 8192
- **コスト: 約$0.0002～$0.0003/回**
- **応答時間: 15～25秒**

この設定により、Claude API比で**約97-98%のコスト削減**を実現しています。

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

#### 7. **Git操作の作業ルール（重要）**
- ❌ **絶対禁止**: AIが自動的に `git push` や `vercel deploy` を実行すること
- ✅ **必須**: GitHubへのプッシュとVercelデプロイは**必ずユーザーの明示的な指示があるまで実行しない**
- ✅ **推奨**: 変更内容のビルド確認は行うが、デプロイ前に必ずユーザーに確認を取る
- ✅ **推奨**: コミットメッセージの作成とステージングまでは行い、ユーザーに確認後にプッシュ

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
