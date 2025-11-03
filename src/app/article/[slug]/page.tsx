import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SimulationArticle from './SimulationArticle';
import BeginnerGuideArticle from './BeginnerGuideArticle';
import OneStopArticle from './OneStopArticle';
import RecommendedGiftsArticle from './RecommendedGiftsArticle';
import ConfirmationTaxArticle from './ConfirmationTaxArticle';
import MistakesArticle from './MistakesArticle';

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
    default:
      notFound();
  }
}
