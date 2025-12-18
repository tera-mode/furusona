# あなたのふるさと納税AI - アーキテクチャドキュメント

## サービス概要

**あなたのふるさと納税AI**は、AIがユーザーの家族構成・年収・好みに基づいて最適なふるさと納税返礼品を推薦するWebサービスです。

### 主要機能
1. **限度額自動計算** - 年収・家族構成から控除限度額を計算
2. **AI推薦エンジン** - Claude APIが3つの最適な返礼品を選定
3. **寄付履歴管理** - 年度別の寄付記録と残額管理

---

## 技術スタック

### フロントエンド
- **Next.js 15** (App Router) - Reactフレームワーク
- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS 4** - スタイリング

### バックエンド・API
- **Next.js API Routes** - サーバーサイドAPI
- **Firebase Firestore** - NoSQLデータベース
- **Firebase Authentication** - ユーザー認証（Email/Password、Google）

### 外部API
- **楽天市場API** - 返礼品データ取得
- **Google Gemini API** - AI推薦エンジン

### デプロイ
- **Vercel** - ホスティング（推奨）

---

## ディレクトリ構成

```
furusona/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # APIエンドポイント
│   │   │   ├── calculate-limit/    # 限度額計算
│   │   │   ├── rakuten/            # 楽天API統合
│   │   │   ├── recommendations/    # AI推薦
│   │   │   └── donations/          # 寄付履歴追加
│   │   ├── dashboard/         # ダッシュボード（推薦表示）
│   │   ├── profile/           # プロファイル設定
│   │   ├── history/           # 寄付履歴
│   │   └── page.tsx           # トップページ
│   ├── components/            # Reactコンポーネント
│   │   ├── auth/             # 認証関連
│   │   └── ProductCard.tsx   # 返礼品カード
│   ├── hooks/                # カスタムフック
│   │   └── useAuth.tsx       # 認証状態管理
│   ├── lib/                  # ライブラリ設定
│   │   ├── firebase.ts       # Firebase Client SDK
│   │   └── firebase-admin.ts # Firebase Admin SDK
│   ├── types/                # TypeScript型定義
│   │   └── index.ts
│   └── utils/                # ユーティリティ
│       └── furusatoCalculator.ts  # 限度額計算ロジック
├── firestore.rules           # Firestoreセキュリティルール
├── firestore.indexes.json    # Firestoreインデックス定義
└── .env.local                # 環境変数（gitignore対象）
```

---

## データモデル

### Firestore コレクション

#### `users` コレクション
```typescript
{
  uid: string;              // Firebase Auth UID
  email: string;
  familyStructure: {
    married: boolean;       // 既婚/独身
    dependents: number;     // 扶養人数
  };
  income: {
    annualIncome: number;   // 年収（円）
    socialInsurance?: number;  // 社会保険料（任意）
    mortgageDeduction?: number; // 住宅ローン控除（任意）
  };
  preferences: {
    categories: string[];   // 好みカテゴリ（例: ["肉", "魚介"]）
    allergies?: string[];   // アレルギー
    favoriteRegions?: string[];  // 好きな地域
    pastSelections?: string[];   // 過去選択した商品コード
  };
  calculatedLimit: number;  // 計算された限度額
  createdAt: Date;
  updatedAt: Date;
}
```

#### `donations` コレクション
```typescript
{
  id: string;              // ドキュメントID
  userId: string;          // ユーザーUID
  productName: string;     // 返礼品名
  productPrice: number;    // 寄付額
  productUrl: string;      // 返礼品URL
  itemCode?: string;       // 楽天商品コード（任意）
  year: number;            // 寄付年度
  donatedAt: Timestamp;    // 寄付日時
  createdAt: Timestamp;
}
```

**必須インデックス:**
- `userId` (ASC) + `year` (ASC) + `donatedAt` (DESC)

---

## APIエンドポイント

### POST `/api/calculate-limit`
限度額を計算

**Request:**
```json
{
  "annualIncome": 7500000,
  "married": true,
  "dependents": 2,
  "socialInsurance": 1200000,
  "mortgageDeduction": 100000
}
```

**Response:**
```json
{
  "data": {
    "roundedLimit": 70000,
    "exactLimit": 73245.5,
    "safetyMargin": 0.9
  }
}
```

### GET `/api/rakuten`
楽天市場から返礼品検索

**Query Parameters:**
- `keyword`: 検索キーワード
- `maxPrice`: 最大価格
- `hits`: 取得件数（最大30）

**Response:**
```json
{
  "success": true,
  "count": 30,
  "products": [/* RakutenProduct[] */]
}
```

### POST `/api/recommendations`
AI推薦を取得

**Request:**
```json
{
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "itemCode": "shop:item123",
      "reason": "選定理由",
      "score": 95,
      "product": {/* RakutenProduct */}
    }
  ]
}
```

### POST `/api/donations`
寄付履歴を追加

**Request:**
```json
{
  "userId": "user123",
  "productName": "北海道産いくら",
  "productPrice": 10000,
  "productUrl": "https://...",
  "itemCode": "shop:item123",
  "year": 2025
}
```

---

## 主要な実装ロジック

### 1. 限度額計算 (`src/utils/furusatoCalculator.ts`)
```typescript
限度額 = (課税所得 × 税率 - 税額控除) × 安全マージン90%
```
- 給与所得控除、基礎控除、配偶者控除、扶養控除を考慮
- 社会保険料・住宅ローン控除も反映

### 2. AI推薦ロジック (`src/app/api/recommendations/route.ts`)
1. ユーザーの好みカテゴリからランダム選択
2. 楽天APIで該当商品を最大300件取得（限度額の1/3程度の価格帯）
3. サーバー側で事前スコアリング（レビュー、価格適合度、カテゴリ）を行い上位50件に絞る
4. Gemini APIに商品リストとユーザー情報を渡す
5. AIが9つの最適商品を選定（スコア付き、季節性・好み学習を考慮）

### 3. 認証フロー (`src/hooks/useAuth.tsx`)
- Firebase Auth でセッション管理
- リアルタイムでユーザーデータをFirestoreから取得
- `onAuthStateChanged` でログイン状態を監視

---

## セキュリティ

### Firestore ルール
```javascript
// usersコレクション: 自分のドキュメントのみ読み書き可
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// donationsコレクション: 自分の寄付履歴のみ操作可
match /donations/{donationId} {
  allow read, write: if request.auth.uid == resource.data.userId;
  allow create: if request.auth.uid == request.resource.data.userId;
}
```

---

## 環境変数

```.env.local
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# 楽天API
RAKUTEN_APPLICATION_ID=
RAKUTEN_AFFILIATE_ID=

# Google Gemini
GEMINI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 制限事項・注意点

1. **楽天API制限**
   - 1秒1リクエスト
   - hits パラメータは最大30

2. **Gemini API**
   - 使用量に応じて課金
   - モデル: `gemini-1.5-flash`
   - 料金: 入力$0.075/1M tokens、出力$0.30/1M tokens

3. **Firestore**
   - 複合インデックスが必要（`firestore.indexes.json`）
   - デプロイ必須: `firebase deploy --only firestore:indexes`

4. **計算精度**
   - 限度額は目安（実際の控除額は確定申告により変動）
   - 安全マージン90%を適用
