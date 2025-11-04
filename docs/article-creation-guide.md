# ふるそな記事作成ガイドライン

このドキュメントは、ふるそなの記事コンテンツを作成・編集する際の統一ルールをまとめたものです。

## 目次

1. [ファイル構成](#ファイル構成)
2. [スタイル・トンマナ](#スタイルトンマナ)
3. [PRふるそな紹介セクション](#prふるそな紹介セクション)
4. [デザイン・ビジュアル](#デザインビジュアル)
5. [SEO対策](#seo対策)
6. [メタデータ設定](#メタデータ設定)
7. [コンテンツ構成](#コンテンツ構成)
8. [UXデザイン](#uxデザイン)
9. [リンク設定](#リンク設定)
10. [チェックリスト](#チェックリスト)

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

## スタイル・トンマナ

### 文章スタイル

1. **語調**: 丁寧語（です・ます調）を使用
2. **読者への呼びかけ**: 「あなた」を使用（例: 「あなたにぴったりの返礼品」）
3. **強調**: `<strong>` タグで重要なキーワードを強調
4. **具体性**: 数値・データを積極的に使用（例: 「173%増」「76万点以上」）
5. **親しみやすさ**: 適度に絵文字を使用（🎯📊📧など）

### トーン

- 初心者にも分かりやすい言葉遣い
- 専門用語は必ず説明を添える
- ポジティブで前向きな表現（「簡単」「お得」「便利」など）
- 不安を煽らず、解決策を提示

### 避けるべき表現

- ❌ 「絶対」「必ず」などの断定表現
- ❌ 過度な煽り文句
- ❌ ネガティブな表現（「損する」「失敗する」など、解決策なしでは使わない）

---

## PR（ふるそな紹介）セクション

### 配置

- **FAQセクションの直前**に1箇所のみ配置
- 記事の中盤〜後半（全体の60〜80%地点）が理想
- 記事冒頭や末尾にCTAを複数配置しない

### 統一された構造

```tsx
{/* ふるそなPR */}
<div className="mb-12 p-8 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm">
  <div className="text-center mb-6">
    <Link href="/" className="inline-block mb-4">
      <span className="text-2xl font-bold text-primary-600">ふるそな</span>
    </Link>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      【記事内容に合わせたキャッチフレーズ】
    </h3>
    <p className="text-gray-700 mb-6">
      【記事内容に合わせたサブタイトル・説明文】
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6 mb-6">
    <div className="text-center">
      <div className="text-4xl mb-3">🎯</div>
      <h4 className="font-bold text-gray-900 mb-2">AIおすすめ診断</h4>
      <p className="text-sm text-gray-700">
        【記事内容に合わせた説明】
      </p>
    </div>
    <div className="text-center">
      <div className="text-4xl mb-3">📊</div>
      <h4 className="font-bold text-gray-900 mb-2">限度額シミュレーション</h4>
      <p className="text-sm text-gray-700">
        年収と家族構成を入力するだけで正確な限度額を計算
      </p>
    </div>
    <div className="text-center">
      <div className="text-4xl mb-3">📧</div>
      <h4 className="font-bold text-gray-900 mb-2">旬のタイミングで通知</h4>
      <p className="text-sm text-gray-700">
        楽天マラソン等のお得なタイミングをメール通知
      </p>
    </div>
  </div>

  <div className="text-center">
    <Link
      href="/"
      className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
    >
      無料で始める →
    </Link>
    <p className="text-sm text-gray-600 mt-4">
      完全無料 | クレジットカード登録不要 | 登録後すぐに利用開始
    </p>
  </div>
</div>
```

### 記事内容別のキャッチフレーズ例

| 記事タイプ | キャッチフレーズ例 |
|----------|---------------|
| AI推薦 | AIで返礼品選びを時短！1分で最適な返礼品が見つかる |
| 12月駆け込み | もう、12月に慌てない。AIがあなたに最適な返礼品を診断 |
| 楽天ポイント | 楽天ポイント還元を最大化！AIが最適なタイミングを提案 |
| 米ランキング | 家族にぴったりの米が見つかる！AIが最適な量と品種を提案 |
| 日用品 | 物価高対策！日用品で限度額を無駄なく使い切る |

### 3つの機能説明

**必須項目:**
1. **AIおすすめ診断** 🎯 - 記事内容に合わせてカスタマイズ
2. **限度額シミュレーション** 📊 - 固定文言
3. **旬のタイミングで通知** 📧 - 固定文言（楽天関連の場合は強調）

**注意点:**
- 記事のトピックに最も関連する機能を1番目に配置
- 説明文は簡潔に（20〜30文字程度）
- 具体的なベネフィットを明示

---

## デザイン・ビジュアル

### カラーパレット

#### 記事のテーマカラー

記事の内容に応じてメインカラーを選択し、セクション見出しの下線などに統一して使用：

- **オレンジ系** (`orange-500`): 一般的なふるさと納税、初心者向け
- **赤系** (`red-500`): 楽天ポイント、お得系
- **緑系** (`green-500`): 米、食品系
- **青系** (`blue-500`): 日用品、実用品系
- **紫系** (`purple-500`): 高級品、特別な返礼品

#### PRセクションの背景色（固定）

```css
bg-gradient-to-br from-primary-50 to-warning-50
```

すべての記事で統一して使用

### タイポグラフィ

```css
/* H1 - 記事タイトル */
text-3xl md:text-4xl font-bold text-gray-900

/* H2 - セクション見出し */
text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[color]-500

/* H3 - サブセクション見出し */
text-xl font-semibold text-gray-800 mb-4

/* H4 - 小見出し */
text-lg font-bold text-gray-900 mb-3

/* 本文 */
text-gray-700

/* 強調 */
font-bold text-gray-900

/* 小文字・注記 */
text-sm text-gray-600
```

### アイコン・絵文字

#### 推奨絵文字一覧

- 🎯 AIおすすめ診断、ターゲティング
- 📊 限度額計算、データ分析
- 📧 メール通知、リマインダー
- ⏰ 期限、時間
- 🍚 米
- 🥩 肉
- 🐟 海鮮
- 🍎 フルーツ
- 🧻 日用品
- 💰 お金、コスパ
- ✓ チェックポイント、成功
- ⚠️ 注意点

### 情報ボックス

```tsx
{/* 成功・ポジティブ */}
<div className="bg-green-50 border-l-4 border-green-500 p-4">
  <p className="text-sm text-gray-700">
    💡 <strong>ヒント</strong><br />
    補足情報
  </p>
</div>

{/* 警告・注意 */}
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
  <p className="text-sm text-gray-700">
    ⚠️ <strong>注意点</strong><br />
    注意すべき内容
  </p>
</div>

{/* 重要・エラー */}
<div className="bg-red-50 border-l-4 border-red-500 p-4">
  <p className="text-sm text-gray-700">
    🚨 <strong>重要</strong><br />
    絶対に守るべき内容
  </p>
</div>
```

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

- 2025-11-04: **スタイル・トンマナセクションを追加**（11/3・11/4作成記事の統一を反映）
  - PR（ふるそな紹介）セクションの統一フォーマットを定義
  - デザイン・ビジュアルガイドラインを追加
  - 記事内容別のキャッチフレーズ例を追加
  - カラーパレット、タイポグラフィ、絵文字の推奨リストを追加
- 2025-11-03: 初版作成（ふるさと納税限度額シミュレーション記事をベースに作成）
