import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SimulationArticle from './SimulationArticle';
import BeginnerGuideArticle from './BeginnerGuideArticle';
import OneStopArticle from './OneStopArticle';
import RecommendedGiftsArticle from './RecommendedGiftsArticle';
import ConfirmationTaxArticle from './ConfirmationTaxArticle';
import MistakesArticle from './MistakesArticle';
import AiArticle from './AiArticle';
import DecemberArticle from './DecemberArticle';
import RakutenPointArticle from './RakutenPointArticle';
import RiceRankingArticle from './RiceRankingArticle';
import DailyGoodsArticle from './DailyGoodsArticle';

// 記事のメタデータ定義
const articleData: Record<string, { title: string; description: string }> = {
  'furusato-gendogaku-simulation': {
    title: 'ふるさと納税限度額シミュレーション【2025年最新版】無料計算ツール',
    description: 'ふるさと納税の限度額を簡単にシミュレーション。年収・家族構成を入力するだけで、あなたの控除上限額がすぐにわかります。無料で使える限度額計算ツールで、お得にふるさと納税を始めましょう。'
  },
  'furusato-hajimekata': {
    title: 'ふるさと納税の始め方【2025年完全ガイド】初心者でも簡単にできる手順を解説',
    description: 'ふるさと納税の始め方を初心者にもわかりやすく解説。5ステップで完了する申し込み手順から、限度額の確認、返礼品の選び方、控除の手続きまで完全ガイド。2025年にふるさと納税を始めたい方必見です。'
  },
  'furusato-onestop': {
    title: 'ふるさと納税ワンストップ特例制度とは？【2025年最新】申請方法を完全解説',
    description: 'ワンストップ特例制度を使えば確定申告なしでふるさと納税の控除を受けられます。利用条件、申請方法、必要書類、提出期限まで詳しく解説。オンライン申請の方法も紹介します。'
  },
  'furusato-osusume-henreihin': {
    title: 'ふるさと納税おすすめ返礼品ランキング【2025年最新】人気カテゴリー別に紹介',
    description: '2025年のふるさと納税人気返礼品をランキング形式で紹介。肉・海鮮・フルーツ・お米・日用品など、カテゴリー別におすすめ返礼品を厳選。還元率や選び方のポイントも解説します。'
  },
  'furusato-kakuteishinkoku': {
    title: 'ふるさと納税の確定申告のやり方【2025年完全マニュアル】手順を詳しく解説',
    description: 'ふるさと納税の確定申告方法を初心者にもわかりやすく解説。必要書類、記入方法、提出手順を完全ガイド。e-Taxでのオンライン申告方法も詳しく紹介します。'
  },
  'furusato-shippai-chuui': {
    title: 'ふるさと納税で失敗しない方法と注意点【2025年版】よくあるミスと対策',
    description: 'ふるさと納税でよくある失敗を5つのパターンに分けて解説。限度額オーバー、申請書の提出忘れなど、トラブルを未然に防ぐチェックリストと対処法を紹介します。'
  },
  'furusato-ai-suisen': {
    title: 'AIふるさと納税で時短＆最適化｜76万点から最適な返礼品を自動提案する新サービス2025',
    description: 'AIを活用したふるさと納税の新しい選び方。2〜3時間かかる返礼品選びがわずか1分で完了。Claude APIによる高度なパーソナライズ推薦で、あなたにぴったりの返礼品が見つかります。'
  },
  'furusato-december-kakekomi': {
    title: '【2025年12月】ふるさと納税の駆け込みに間に合う！期限・おすすめ返礼品・注意点',
    description: '2025年ふるさと納税の期限は12月31日23:59まで。駆け込みでも間に合う返礼品選びと3つの注意点を解説。サーバー混雑、在庫切れ対策、ワンストップ申請の期限も詳しく紹介します。'
  },
  'furusato-rakuten-point': {
    title: '楽天ふるさと納税でポイント30%還元を狙う｜2025年SPU攻略とキャンペーン活用術',
    description: '楽天ふるさと納税で最大30%のポイント還元を実現する方法を解説。SPU、お買い物マラソン、5と0のつく日を組み合わせて、実質負担額をマイナスにする戦略を詳しく紹介します。'
  },
  'furusato-kome-ranking': {
    title: 'ふるさと納税 米ランキング20選【2025年最新】コスパ最強・品種別・定期便おすすめ',
    description: 'ふるさと納税で人気No.1の米ランキング20選。2024年は価格高騰で検索173%増。コスパ最強の品種別・寄付額別・定期便を詳しく紹介。コシヒカリ、ななつぼし、つや姫など。'
  },
  'furusato-nichiyouhin': {
    title: 'ふるさと納税 日用品おすすめ30選【2025年版】物価高対策に人気急上昇中の実用返礼品',
    description: '物価高で日用品のふるさと納税需要が急上昇。トイレットペーパー173%増、洗剤も人気。限度額の端数調整に最適な実用返礼品30選をカテゴリ別に詳しく紹介します。'
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleData[slug];

  if (!article) {
    return {
      title: '記事が見つかりません',
    };
  }

  const url = `https://furusona.com/article/${slug}`;
  const ogImage = 'https://furusona.com/img/og-furusato-simulation.png'; // OG画像のパスを適宜変更

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articleData[slug];

  if (!article) {
    notFound();
  }

  // FAQPage構造化データ（ふるさと納税限度額シミュレーション用）
  const faqSchema = slug === 'furusato-gendogaku-simulation' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "限度額を超えて寄付するとどうなる？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "限度額を超えた分は控除されず、自己負担になります。2,000円を超える負担が発生するため、限度額内での寄付をおすすめします。"
        }
      },
      {
        "@type": "Question",
        "name": "いつまでに寄付すればいい？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "その年の1月1日〜12月31日までの寄付が、翌年の住民税から控除されます。年末は混み合うので早めの寄付がおすすめです。"
        }
      },
      {
        "@type": "Question",
        "name": "ワンストップ特例と確定申告、どっちがいい？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "寄付先が5自治体以内なら「ワンストップ特例」が簡単です。6自治体以上や、他に確定申告が必要な場合は確定申告をしましょう。"
        }
      }
    ]
  } : null;

  // スラッグに応じた記事コンポーネントを返す
  switch (slug) {
    case 'furusato-gendogaku-simulation':
      return (
        <>
          {faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          )}
          <SimulationArticle />
        </>
      );
    case 'furusato-hajimekata':
      return <BeginnerGuideArticle />;
    case 'furusato-onestop':
      return <OneStopArticle />;
    case 'furusato-osusume-henreihin':
      return <RecommendedGiftsArticle />;
    case 'furusato-kakuteishinkoku':
      return <ConfirmationTaxArticle />;
    case 'furusato-shippai-chuui':
      return <MistakesArticle />;
    case 'furusato-ai-suisen':
      return <AiArticle />;
    case 'furusato-december-kakekomi':
      return <DecemberArticle />;
    case 'furusato-rakuten-point':
      return <RakutenPointArticle />;
    case 'furusato-kome-ranking':
      return <RiceRankingArticle />;
    case 'furusato-nichiyouhin':
      return <DailyGoodsArticle />;
    default:
      notFound();
  }
}
