// 記事カテゴリ
export const articleCategories = {
  basics: { name: '基礎知識', slug: 'basics', color: 'blue' },
  limits: { name: '限度額・計算', slug: 'limits', color: 'green' },
  procedures: { name: '手続き・申告', slug: 'procedures', color: 'purple' },
  products: { name: '返礼品', slug: 'products', color: 'orange' },
  platforms: { name: 'サイト攻略', slug: 'platforms', color: 'red' },
  tips: { name: '注意点・対策', slug: 'tips', color: 'yellow' },
} as const;

// CategorySlug型定義
type CategorySlug = keyof typeof articleCategories;
export type { CategorySlug };

// 記事のメタデータ定義
export const articleData: Record<string, {
  title: string;
  description: string;
  published: boolean;
  category: CategorySlug;
  date: string;
}> = {
  'furusato-gendogaku-simulation': {
    title: 'ふるさと納税限度額シミュレーション【2025年最新版】無料計算ツール',
    description: 'ふるさと納税の限度額を簡単にシミュレーション。年収・家族構成を入力するだけで、あなたの控除上限額がすぐにわかります。無料で使える限度額計算ツールで、お得にふるさと納税を始めましょう。',
    published: true,
    category: 'limits',
    date: '2025-11-10'
  },
  'furusato-hajimekata': {
    title: 'ふるさと納税の始め方【2025年完全ガイド】初心者でも簡単にできる手順を解説',
    description: 'ふるさと納税の始め方を初心者にもわかりやすく解説。5ステップで完了する申し込み手順から、限度額の確認、返礼品の選び方、控除の手続きまで完全ガイド。2025年にふるさと納税を始めたい方必見です。',
    published: true,
    category: 'basics',
    date: '2025-11-10'
  },
  'furusato-onestop': {
    title: 'ふるさと納税ワンストップ特例制度とは？【2025年最新】申請方法を完全解説',
    description: 'ワンストップ特例制度を使えば確定申告なしでふるさと納税の控除を受けられます。利用条件、申請方法、必要書類、提出期限まで詳しく解説。オンライン申請の方法も紹介します。',
    published: true,
    category: 'procedures',
    date: '2025-11-10'
  },
  'furusato-osusume-henreihin': {
    title: 'ふるさと納税おすすめ返礼品ランキング【2025年最新】人気カテゴリー別に紹介',
    description: '2025年のふるさと納税人気返礼品をランキング形式で紹介。肉・海鮮・フルーツ・お米・日用品など、カテゴリー別におすすめ返礼品を厳選。還元率や選び方のポイントも解説します。',
    published: true,
    category: 'products',
    date: '2025-11-10'
  },
  'furusato-kakuteishinkoku': {
    title: 'ふるさと納税の確定申告のやり方【2025年完全マニュアル】手順を詳しく解説',
    description: 'ふるさと納税の確定申告方法を初心者にもわかりやすく解説。必要書類、記入方法、提出手順を完全ガイド。e-Taxでのオンライン申告方法も詳しく紹介します。',
    published: true,
    category: 'procedures',
    date: '2025-11-10'
  },
  'furusato-shippai-chuui': {
    title: 'ふるさと納税で失敗しない方法と注意点【2025年版】よくあるミスと対策',
    description: 'ふるさと納税でよくある失敗を5つのパターンに分けて解説。限度額オーバー、申請書の提出忘れなど、トラブルを未然に防ぐチェックリストと対処法を紹介します。',
    published: true,
    category: 'tips',
    date: '2025-11-10'
  },
  'furusato-ai-suisen': {
    title: 'AIふるさと納税で時短＆最適化｜76万点から最適な返礼品を自動提案する新サービス2025',
    description: 'AIを活用したふるさと納税の新しい選び方。2〜3時間かかる返礼品選びがわずか1分で完了。Claude APIによる高度なパーソナライズ推薦で、あなたにぴったりの返礼品が見つかります。',
    published: true,
    category: 'basics',
    date: '2025-11-10'
  },
  'furusato-december-kakekomi': {
    title: '【2025年12月】ふるさと納税の駆け込みに間に合う！期限・おすすめ返礼品・注意点',
    description: '2025年ふるさと納税の期限は12月31日23:59まで。駆け込みでも間に合う返礼品選びと3つの注意点を解説。サーバー混雑、在庫切れ対策、ワンストップ申請の期限も詳しく紹介します。',
    published: true,
    category: 'procedures',
    date: '2025-11-10'
  },
  'furusato-rakuten-point': {
    title: '楽天ふるさと納税でポイント30%還元を狙う｜2025年SPU攻略とキャンペーン活用術',
    description: '楽天ふるさと納税で最大30%のポイント還元を実現する方法を解説。SPU、お買い物マラソン、5と0のつく日を組み合わせて、実質負担額をマイナスにする戦略を詳しく紹介します。',
    published: false,
    category: 'platforms',
    date: '2025-11-10'
  },
  'furusato-kome-ranking': {
    title: 'ふるさと納税 米ランキング20選【2025年最新】コスパ最強・品種別・定期便おすすめ',
    description: 'ふるさと納税で人気No.1の米ランキング20選。2024年は価格高騰で検索173%増。コスパ最強の品種別・寄付額別・定期便を詳しく紹介。コシヒカリ、ななつぼし、つや姫など。',
    published: true,
    category: 'products',
    date: '2025-11-10'
  },
  'furusato-nichiyouhin': {
    title: 'ふるさと納税 日用品おすすめ30選【2025年版】物価高対策に人気急上昇中の実用返礼品',
    description: '物価高で日用品のふるさと納税需要が急上昇。トイレットペーパー173%増、洗剤も人気。限度額の端数調整に最適な実用返礼品30選をカテゴリ別に詳しく紹介します。',
    published: true,
    category: 'products',
    date: '2025-11-10'
  },
  'furusato-nenshu-gendogaku': {
    title: '【2025年版】年収別ふるさと納税限度額一覧｜年収300万～1000万まで完全ガイド',
    description: '年収300万円から1000万円まで、家族構成別のふるさと納税限度額を一覧表で解説。独身・共働き・扶養家族ありなど、あなたのケースに合わせた正確な限度額がすぐわかります。',
    published: true,
    category: 'limits',
    date: '2025-11-10'
  },
  'furusato-beginner-guide': {
    title: '【2025年最新】ふるさと納税とは？初心者向け完全ガイド｜やり方・仕組みをわかりやすく解説',
    description: 'ふるさと納税を初めて利用する方向けに、仕組み・やり方・申請方法を徹底解説。実質2,000円で豪華な返礼品がもらえる制度を、図解付きでわかりやすく説明します。',
    published: true,
    category: 'basics',
    date: '2025-11-10'
  },
  'furusato-onestop-tokureiseido': {
    title: 'ふるさと納税ワンストップ特例制度とは？申請方法・期限・注意点を完全解説【2025年版】',
    description: '確定申告不要で税金控除を受けられるワンストップ特例制度の申請方法、期限、必要書類、注意点を詳しく解説。初めての方でも迷わず手続きできる完全マニュアルです。',
    published: true,
    category: 'procedures',
    date: '2025-11-10'
  },
  'furusato-tomobataraki-fufu': {
    title: '共働き夫婦のふるさと納税完全ガイド｜名義・限度額・おすすめの活用法【2025年版】',
    description: '共働き夫婦がふるさと納税を最大限活用する方法を徹底解説。夫婦それぞれの名義で寄付する際の注意点、合算限度額の計算、おすすめの配分戦略まで詳しく紹介します。',
    published: true,
    category: 'limits',
    date: '2025-11-10'
  },
  'furusato-schedule-kigen': {
    title: 'ふるさと納税の期限とスケジュール｜いつまでに何をすべき？年間スケジュール完全版【2025年】',
    description: 'ふるさと納税の寄付期限、申請期限、確定申告期限を月別に整理。12月の駆け込み寄付や1月のワンストップ申請など、忘れてはいけない重要な期限を詳しく解説します。',
    published: true,
    category: 'procedures',
    date: '2025-11-10'
  },
  'furusato-osusume-ranking': {
    title: '【2025年最新】ふるさと納税おすすめ返礼品ランキングTOP50｜カテゴリ別人気商品を徹底紹介',
    description: 'ふるさと納税の人気返礼品をカテゴリ別にランキング形式で紹介。肉、米、フルーツ、海鮮、日用品など、失敗しないおすすめ商品を還元率・レビューとともに詳しく解説します。',
    published: true,
    category: 'products',
    date: '2025-11-10'
  },
  'furusato-tyuiten-son': {
    title: 'ふるさと納税で損しないための注意点15選｜よくある失敗例と対策【2025年版】',
    description: 'ふるさと納税でよくある失敗例と対策を徹底解説。限度額オーバー、名義ミス、期限忘れなど、損しないための注意点を初心者向けにわかりやすく紹介します。',
    published: true,
    category: 'tips',
    date: '2025-11-10'
  },
  'furusato-hitorikurashi': {
    title: '一人暮らしのふるさと納税活用術｜おすすめ返礼品・少額寄付・保管のコツ【2025年版】',
    description: '一人暮らしでもふるさと納税を最大限活用する方法を徹底解説。保管スペースが少なくても選べる返礼品、少額でお得な商品、定期便の活用法を詳しく紹介します。',
    published: true,
    category: 'limits',
    date: '2025-11-10'
  }
};
