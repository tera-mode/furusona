# ふるそな記事作成ガイドライン

このドキュメントは、ふるそなの記事コンテンツを作成・編集する際の統一ルールをまとめたものです。

## 目次

1. [ファイル構成](#ファイル構成)
2. [SEO対策](#seo対策)
3. [メタデータ設定](#メタデータ設定)
4. [コンテンツ構成](#コンテンツ構成)
5. [UXデザイン](#uxデザイン)
6. [リンク設定](#リンク設定)
7. [チェックリスト](#チェックリスト)

---

## ファイル構成

### 基本構造

```
src/app/article/[slug]/
├── page.tsx              # メタデータとルーティング
└── [ArticleName].tsx     # 記事コンポーネント本体
```

### page.tsx の役割

- 記事のメタデータ（title, description, OGP等）を定義
- 構造化データ（JSON-LD）の追加
- スラッグに応じた記事コンポーネントのルーティング

### 記事コンポーネントの役割

- 記事の実際のコンテンツ表示
- インタラクティブな機能（フォーム、計算機等）
- クライアントサイドの状態管理

---

## SEO対策

### 1. 構造化データ（Structured Data）

記事の種類に応じて適切なスキーマを実装：

#### FAQPageスキーマ（Q&Aセクションがある場合）

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "質問文",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "回答文"
      }
    }
  ]
};
```

**効果**: Google検索結果でリッチリザルト表示され、CTR向上

#### その他推奨スキーマ

- **Article**: 一般的な記事コンテンツ
- **HowTo**: 手順を説明する記事
- **BreadcrumbList**: パンくずリスト

### 2. 見出し構造

```tsx
<h1>主要キーワード【最新版】補足キーワード</h1>
<h2>具体的なキーワードを含む小見出し</h2>
<h3>詳細な項目</h3>
```

**ポイント**:
- H1は1ページに1つだけ
- メタタイトルとH1を一致させる
- 年号（2025年など）を含める
- 「無料」「簡単」などユーザーメリットを明示

### 3. キーワード戦略

- **メインキーワード**: タイトル、H1、H2に含める
- **関連キーワード**: 本文中に自然に散りばめる
- **ロングテールキーワード**: H3やリスト項目で網羅

---

## メタデータ設定

### 必須項目

```typescript
const articleData: Record<string, { title: string; description: string }> = {
  'article-slug': {
    title: '主要キーワード【2025年最新版】補足キーワード',
    description: '120〜160文字で記事の要約。主要キーワードを含める。',
  }
};
```

### OpenGraph / Twitter Card

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const url = `https://furusona.com/article/${slug}`;
  const ogImage = 'https://furusona.com/img/og-article-name.png';

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url, // 重要: canonical URLを必ず設定
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: url,
      siteName: 'ふるそな',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}
```

**注意**:
- ~~`keywords`メタタグは非推奨のため削除~~
- OG画像は必ず1200x630pxで作成
- canonical URLを設定して重複コンテンツを防止

---

## コンテンツ構成

### 推奨セクション構成

```tsx
<article>
  {/* 1. タイトルと更新日 */}
  <h1>記事タイトル</h1>
  <p>更新日: YYYY年MM月DD日</p>

  {/* 2. 導入文（リード） */}
  <div>
    <p>ユーザーの悩みを提起</p>
    <p>記事で得られる価値を提示</p>
  </div>

  {/* 3. メインコンテンツ（ツール、計算機など） */}
  <section>
    <h2>具体的な見出し</h2>
    {/* インタラクティブなコンテンツ */}
  </section>

  {/* 4. 結果・解説 */}
  <section>
    <h2>結果の見出し</h2>
    {/* 結果表示や詳細解説 */}
  </section>

  {/* 5. CTA（Call to Action） */}
  <div>
    {/* ふるそなへの誘導 */}
  </div>

  {/* 6. 基礎知識・解説セクション */}
  <section>
    <h2>○○とは？</h2>
    {/* 制度や概念の説明 */}
  </section>

  {/* 7. 詳細解説 */}
  <section>
    <h2>詳しい内容</h2>
    {/* 深掘りした情報 */}
  </section>

  {/* 8. よくある質問（FAQ） */}
  <section>
    <h2>よくある質問</h2>
    {/* Q&A形式で疑問を解消 */}
  </section>

  {/* 9. 関連記事 */}
  <section>
    <h2>関連記事</h2>
    {/* 他記事への内部リンク */}
  </section>
</article>
```

### コンテンツの原則

1. **E-E-A-T を意識**
   - **Experience（経験）**: 実体験や具体例を含める
   - **Expertise（専門性）**: 正確で詳細な情報を提供
   - **Authoritativeness（権威性）**: 公式情報源へリンク
   - **Trustworthiness（信頼性）**: 情報の根拠を明示

2. **情報源の明記**
   ```tsx
   <p className="text-sm text-gray-600">
     <a
       href="https://www.soumu.go.jp/..."
       target="_blank"
       rel="noopener noreferrer"
       className="text-primary-600 hover:text-primary-700 underline"
     >
       総務省｜ふるさと納税ポータルサイト
     </a>
     より詳しい制度内容をご確認いただけます。
   </p>
   ```

3. **視覚的な補助**
   - 重要な注意事項は色付き枠で強調
   - リストやアイコンで可読性向上
   - スマホでも読みやすいレイアウト

---

## UXデザイン

### フォーム・入力フィールド

```tsx
<input
  type="number"
  inputMode="numeric"    // スマホで数字キーボード表示
  pattern="\d*"          // 数字のみ許可
  required
  min="0"
  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
/>
```

### 計算結果の表示

```tsx
{/* 計算条件の表示 */}
<div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm">
  <p className="font-semibold text-gray-700 mb-2">📋 計算条件</p>
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600">
    <span>条件1: {value1}</span>
    <span>•</span>
    <span>条件2: {value2}</span>
  </div>
</div>

{/* 結果の表示 */}
<div className="bg-orange-50 rounded-lg p-6">
  <p className="text-sm text-gray-600 mb-2">結果ラベル</p>
  <p className="text-4xl font-bold text-orange-600">
    {formatCurrency(result)}
    <span className="text-2xl">円</span>
  </p>
</div>
```

### セッションストレージの活用

ユーザーの入力状態を保持：

```tsx
const STORAGE_KEY = 'article_state_key';

useEffect(() => {
  // 状態の復元
  const savedState = sessionStorage.getItem(STORAGE_KEY);
  if (savedState) {
    const state = JSON.parse(savedState);
    // 状態を復元
  }
}, []);

useEffect(() => {
  // 状態の保存
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}, [state]);
```

---

## リンク設定

### 内部リンク（ふるそなへの誘導）

**ルール**: CTAボタンやPRセクションは別タブで開く

```tsx
<Link
  href="/"
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  無料で始める →
</Link>
```

**理由**: 記事ページを閉じずにサービスを利用できる

### 外部リンク（情報源）

```tsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary-600 hover:text-primary-700 underline"
>
  リンクテキスト
</a>
```

**注意**: `rel="noopener noreferrer"` を必ず付与

---

## チェックリスト

記事公開前に以下を確認：

### SEO

- [ ] H1にメインキーワードと年号を含めた
- [ ] メタタイトルとH1を一致させた
- [ ] メタディスクリプション（120〜160文字）を設定
- [ ] canonical URLを設定
- [ ] OG画像（1200x630px）を設定
- [ ] 構造化データ（JSON-LD）を実装
- [ ] 情報源へのリンクを追加

### コンテンツ

- [ ] 導入文でユーザーの悩みに共感
- [ ] 主要キーワードを自然に含めた
- [ ] FAQセクションを追加（3つ以上）
- [ ] 具体例や数値を含めた
- [ ] 注意事項を明示

### UX

- [ ] スマホで数字キーボードが表示される（inputMode）
- [ ] 計算結果に使用条件を表示
- [ ] 計算結果直下にCTAを配置
- [ ] ふるそなへのリンクは別タブで開く
- [ ] sessionStorageで状態を保持

### テスト

- [ ] ビルドエラーがない（`npm run build`）
- [ ] スマホ表示を確認
- [ ] リンクが正しく動作
- [ ] フォームのバリデーションが機能
- [ ] 計算ロジックが正確

---

## 参考リソース

- [総務省｜ふるさと納税ポータルサイト](https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/)
- [Google 構造化データマークアップ](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org](https://schema.org/)

---

## 更新履歴

- 2025-11-03: 初版作成（ふるさと納税限度額シミュレーション記事をベースに作成）
