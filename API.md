# API仕様書

## ベースURL
```
http://localhost:3000/api  (開発環境)
https://your-domain.vercel.app/api  (本番環境)
```

---

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| POST | `/calculate-limit` | 限度額計算 |
| GET | `/rakuten` | 楽天返礼品検索 |
| POST | `/recommendations` | AI推薦取得 |
| POST | `/donations` | 寄付履歴追加 |

---

## 1. 限度額計算 API

### `POST /api/calculate-limit`

ユーザーの年収と家族構成から、ふるさと納税の限度額を計算します。

#### リクエスト

```typescript
{
  annualIncome: number;        // 年収（円）
  married: boolean;            // 既婚=true, 独身=false
  dependents: number;          // 扶養人数
  socialInsurance?: number;    // 社会保険料（任意、円）
  mortgageDeduction?: number;  // 住宅ローン控除（任意、円）
}
```

#### レスポンス（成功: 200）

```typescript
{
  data: {
    roundedLimit: number;      // 丸めた限度額（100円単位）
    exactLimit: number;        // 正確な限度額
    safetyMargin: number;      // 安全マージン（0.9 = 90%）
  }
}
```

#### サンプル

**Request:**
```json
{
  "annualIncome": 7500000,
  "married": true,
  "dependents": 2,
  "socialInsurance": 1200000
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

#### エラー

| ステータス | 説明 |
|----------|------|
| 400 | 必須パラメータ不足 |
| 500 | 計算エラー |

---

## 2. 楽天返礼品検索 API

### `GET /api/rakuten`

楽天市場からふるさと納税の返礼品を検索します。

#### クエリパラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|----------|---|------|----------|------|
| keyword | string | No | "肉" | 検索キーワード |
| maxPrice | string | No | "50000" | 最大価格（円） |
| hits | string | No | "30" | 取得件数（最大30） |

#### レスポンス（成功: 200）

```typescript
{
  success: true;
  count: number;
  products: RakutenProduct[];
}

// RakutenProduct の型定義
interface RakutenProduct {
  itemCode: string;          // 商品コード
  itemName: string;          // 商品名
  itemPrice: number;         // 価格
  itemUrl: string;           // 商品URL
  affiliateUrl: string;      // アフィリエイトURL
  imageUrl: string;          // 画像URL
  shopName: string;          // ショップ名
  reviewCount: number;       // レビュー数
  reviewAverage: number;     // レビュー平均点
}
```

#### サンプル

**Request:**
```
GET /api/rakuten?keyword=肉&maxPrice=30000&hits=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "products": [
    {
      "itemCode": "shop123:item456",
      "itemName": "【ふるさと納税】黒毛和牛 1kg",
      "itemPrice": 20000,
      "itemUrl": "https://item.rakuten.co.jp/...",
      "affiliateUrl": "https://hb.afl.rakuten.co.jp/...",
      "imageUrl": "https://thumbnail.image.rakuten.co.jp/...",
      "shopName": "ふるさと納税ショップ",
      "reviewCount": 150,
      "reviewAverage": 4.5
    }
  ]
}
```

#### エラー

| ステータス | 説明 |
|----------|------|
| 400 | 楽天APIパラメータエラー（hitsが30超など） |
| 500 | 楽天API接続エラー、Application ID未設定 |

---

## 3. AI推薦取得 API

### `POST /api/recommendations`

Claude APIを使用して、ユーザーに最適な返礼品を3つ推薦します。

#### リクエスト

```typescript
{
  userId: string;  // Firebase Auth UID
}
```

#### レスポンス（成功: 200）

```typescript
{
  success: true;
  recommendations: Recommendation[];
}

interface Recommendation {
  itemCode: string;       // 商品コード
  reason: string;         // 推薦理由（50文字以内）
  score: number;          // スコア（0-100）
  product: RakutenProduct; // 商品詳細
}
```

#### サンプル

**Request:**
```json
{
  "userId": "abc123xyz"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "itemCode": "shop:item1",
      "reason": "家族4人で楽しめる大容量の黒毛和牛です",
      "score": 95,
      "product": {
        "itemName": "黒毛和牛 1kg",
        "itemPrice": 20000,
        "imageUrl": "https://...",
        // ... その他のプロパティ
      }
    },
    {
      "itemCode": "shop:item2",
      "reason": "レビュー評価が高く、人気のいくら醤油漬け",
      "score": 90,
      "product": { /* ... */ }
    },
    {
      "itemCode": "shop:item3",
      "reason": "限度額に適した価格帯で高品質なお米",
      "score": 85,
      "product": { /* ... */ }
    }
  ]
}
```

#### 処理フロー

1. Firestoreからユーザー情報を取得
2. ユーザーの好みカテゴリからランダム選択
3. 楽天APIで返礼品を30件取得（限度額の1/3程度の価格帯）
4. Claude APIに商品リストとユーザー情報を送信
5. AIが3つの商品を選定してスコア付き

#### エラー

| ステータス | 説明 |
|----------|------|
| 400 | userId不足、カテゴリ未設定 |
| 404 | ユーザー未登録、返礼品が見つからない |
| 500 | Firestore接続エラー、楽天API/Claude APIエラー |

---

## 4. 寄付履歴追加 API

### `POST /api/donations`

寄付履歴をFirestoreに保存します。

#### リクエスト

```typescript
{
  userId: string;          // Firebase Auth UID
  productName: string;     // 返礼品名
  productPrice: number;    // 寄付額（円）
  productUrl: string;      // 返礼品URL
  itemCode?: string;       // 商品コード（任意）
  year?: number;           // 寄付年度（任意、デフォルト=現在年）
}
```

#### レスポンス（成功: 200）

```typescript
{
  success: true;
  id: string;              // 作成されたドキュメントID
  message: string;         // "寄付履歴を追加しました"
}
```

#### サンプル

**Request:**
```json
{
  "userId": "abc123xyz",
  "productName": "北海道産 いくら醤油漬け 500g",
  "productPrice": 15000,
  "productUrl": "https://item.rakuten.co.jp/...",
  "itemCode": "shop:item789",
  "year": 2025
}
```

**Response:**
```json
{
  "success": true,
  "id": "donation_doc_id_123",
  "message": "寄付履歴を追加しました"
}
```

#### エラー

| ステータス | 説明 |
|----------|------|
| 400 | 必須パラメータ不足 |
| 500 | Firestore書き込みエラー |

---

## 認証

### Firebase認証が必要なエンドポイント

**現在はサーバー側での認証チェックなし**（クライアント側で制御）

将来的には以下のヘッダーで認証トークンを送信:
```
Authorization: Bearer <Firebase ID Token>
```

---

## レート制限

### 楽天API
- **制限:** 1秒1リクエスト
- **推奨:** クライアント側でリクエスト間隔を制御

### Claude API
- **制限:** 使用量に応じた課金
- **推奨:** 不要な連続リクエストを避ける

---

## エラーレスポンス形式

全てのエラーは以下の形式で返されます:

```typescript
{
  error: string;           // エラーメッセージ
  details?: string;        // 詳細情報（開発環境のみ）
}
```

**例:**
```json
{
  "error": "ユーザーが見つかりません",
  "details": "User document does not exist in Firestore"
}
```

---

## データ取得例（クライアント側）

### 限度額計算
```typescript
const response = await fetch('/api/calculate-limit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    annualIncome: 7500000,
    married: true,
    dependents: 2
  })
});
const data = await response.json();
console.log(data.data.roundedLimit); // 70000
```

### 推薦取得
```typescript
const response = await fetch('/api/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 'abc123' })
});
const data = await response.json();
console.log(data.recommendations); // Recommendation[]
```

---

## 型定義の参照

全ての型定義は `src/types/index.ts` に集約されています。

```typescript
// 主要な型
export interface User { /* ... */ }
export interface Donation { /* ... */ }
export interface RakutenProduct { /* ... */ }
export interface Recommendation { /* ... */ }
```
