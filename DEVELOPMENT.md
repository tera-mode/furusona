# 開発ガイド

## クイックスタート

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd furusona
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env.local.example` を `.env.local` にコピーし、必要な値を設定:
```bash
cp .env.local.example .env.local
```

### 4. 開発サーバーの起動
```bash
npm run dev
```
→ http://localhost:3000 でアクセス可能

---

## 外部サービスのセットアップ

### Firebase
1. [Firebase Console](https://console.firebase.google.com/) でプロジェクト作成
2. Authentication で Email/Password と Google 認証を有効化
3. Firestore Database を作成（本番モード）
4. プロジェクト設定から設定情報を取得し、`.env.local` に設定
5. Firebase CLI でルールとインデックスをデプロイ:
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore
```

### 楽天API
1. [楽天デベロッパー](https://webservice.rakuten.co.jp/) でアカウント作成
2. アプリケーションIDを取得
3. アフィリエイトID取得（任意）
4. `.env.local` に設定

### Google Gemini API
1. [Google AI Studio](https://aistudio.google.com/app/apikey) でAPIキーを取得
2. `.env.local` に設定

---

## 開発の流れ

### 新機能の追加

#### 1. ページ追加
```bash
# src/app/new-page/page.tsx を作成
# App Routerなので自動ルーティング
```

#### 2. API追加
```bash
# src/app/api/new-endpoint/route.ts を作成
# GET/POST などのメソッドをexport
```

#### 3. コンポーネント追加
```bash
# src/components/NewComponent.tsx を作成
```

### データベーススキーマ変更

1. `src/types/index.ts` で型定義を更新
2. Firestoreのセキュリティルール (`firestore.rules`) を更新
3. 必要に応じてインデックス (`firestore.indexes.json`) を追加
4. デプロイ:
```bash
firebase deploy --only firestore
```

---

## よくある開発タスク

### 限度額計算ロジックの変更
→ `src/utils/furusatoCalculator.ts` を編集

### AI推薦プロンプトの改善
→ `src/app/api/recommendations/route.ts` の `prompt` 変数を編集

### 楽天API検索条件の変更
→ `src/app/api/rakuten/route.ts` の `params` を調整

### 認証フローの変更
→ `src/hooks/useAuth.tsx` を編集

---

## デバッグ

### Firebaseエラー
```bash
# コンソールでエラー確認
# ブラウザの開発者ツール → Console
```

### APIエラー
```bash
# サーバーログを確認（ターミナル）
# または Next.js Dev Tools
```

### インデックスエラー
エラーメッセージ内のURLをクリックしてFirebase Consoleで作成、または:
```bash
firebase deploy --only firestore:indexes
```

---

## テスト

### ローカルテスト
```bash
npm run dev
```

### ビルドテスト
```bash
npm run build
npm run start
```

---

## デプロイ

### Vercelへのデプロイ（推奨）

1. [Vercel](https://vercel.com/) でアカウント作成
2. GitHubリポジトリと連携
3. 環境変数を設定（Settings → Environment Variables）
4. 自動デプロイ開始

### Firebase Hosting（代替）
```bash
firebase init hosting
firebase deploy --only hosting
```

---

## トラブルシューティング

### 問題: 楽天APIで400エラー
**原因:** `hits` パラメータが30を超えている
**解決:** `src/app/api/rakuten/route.ts` で `hits` を30以下に設定

### 問題: Firestoreでクエリエラー
**原因:** 複合インデックスが未作成
**解決:**
```bash
firebase deploy --only firestore:indexes
```

### 問題: Gemini APIで推薦が取得できない
**原因1:** APIキーが無効
**解決:** `.env.local` の `GEMINI_API_KEY` を確認

**原因2:** レスポンスパース失敗
**解決:** `src/app/api/recommendations/route.ts` のプロンプトを確認

### 問題: 画像が表示されない
**原因:** 楽天APIから画像URLが返されていない
**解決:** `imageFlag: '1'` が設定されているか確認

---

## コードスタイル

### TypeScript
- 明示的な型定義を使用
- `any` は最小限に（unavoidable な場合のみ）

### React
- 'use client' ディレクティブを適切に使用
- カスタムフックで状態管理を抽出

### CSS
- Tailwind CSSクラスを使用
- インラインスタイルは避ける

---

## パフォーマンス最適化

### 画像の遅延読み込み
```tsx
<img loading="lazy" />
```

### API呼び出しのキャッシュ
- 楽天APIは1秒1リクエストの制限あり
- 必要に応じてキャッシュ実装を検討

---

## セキュリティベストプラクティス

1. **環境変数**
   - `.env.local` は `.gitignore` に含める
   - 本番環境変数はVercel/Firebase Hostingで設定

2. **Firestoreルール**
   - 必ず認証チェックを実装
   - `request.auth.uid` で所有者確認

3. **APIキー**
   - クライアント側で公開されるキーは最小限に
   - `NEXT_PUBLIC_` プレフィックスは公開される

---

## 参考リンク

- [Next.js 15 ドキュメント](https://nextjs.org/docs)
- [Firebase ドキュメント](https://firebase.google.com/docs)
- [楽天API ドキュメント](https://webservice.rakuten.co.jp/documentation/)
- [Anthropic API ドキュメント](https://docs.anthropic.com/)
