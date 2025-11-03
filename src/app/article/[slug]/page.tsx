import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SimulationArticle from './SimulationArticle';

// 記事のメタデータ定義
const articleData: Record<string, { title: string; description: string }> = {
  'furusato-gendogaku-simulation': {
    title: 'ふるさと納税限度額シミュレーション【2025年最新版】無料計算ツール',
    description: 'ふるさと納税の限度額を簡単にシミュレーション。年収・家族構成を入力するだけで、あなたの控除上限額がすぐにわかります。無料で使える限度額計算ツールで、お得にふるさと納税を始めましょう。'
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
    default:
      notFound();
  }
}
