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
import NenshuGendogakuArticle from './NenshuGendogakuArticle';
import FurusatoBeginnerGuideArticle from './FurusatoBeginnerGuideArticle';
import OnestopTokureiseidoArticle from './OnestopTokureiseidoArticle';
import TomobatarakiFufuArticle from './TomobatarakiFufuArticle';
import ScheduleKigenArticle from './ScheduleKigenArticle';
import OsusumeRankingArticle from './OsusumeRankingArticle';
import TyuitenSonArticle from './TyuitenSonArticle';
import HitorikurashiArticle from './HitorikurashiArticle';
import OshuRomanArticle from './OshuRomanArticle';
import { getArticleSetting } from '@/lib/article-settings';
import { articleData, articleCategories, CategorySlug } from '@/lib/article-data';

// Re-export for compatibility
export { articleData, articleCategories };
export type { CategorySlug } from '@/lib/article-data';

type Props = {
  params: Promise<{ slug: string }>;
};

// 静的パスの生成（ビルド時にすべての記事ページを事前生成）
export async function generateStaticParams() {
  return Object.keys(articleData).map((slug) => ({
    slug,
  }));
}

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

  // Firestoreから設定を取得してデフォルト値とマージ
  const firestoreSetting = await getArticleSetting(slug);
  const published = firestoreSetting?.published ?? article.published;

  // 非公開記事へのアクセスを制限
  if (!published) {
    notFound();
  }

  // Article構造化データ（全記事共通）
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": "https://furusona.com/img/og-furusato-simulation.png",
    "author": {
      "@type": "Organization",
      "name": "ふるそな",
      "url": "https://furusona.jp"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ふるそな",
      "logo": {
        "@type": "ImageObject",
        "url": "https://furusona.com/img/og-furusato-simulation.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://furusona.jp/article/${slug}`
    }
  };

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
  const ArticleComponent = (() => {
    switch (slug) {
      case 'furusato-gendogaku-simulation':
        return SimulationArticle;
      case 'furusato-hajimekata':
        return BeginnerGuideArticle;
      case 'furusato-onestop':
        return OneStopArticle;
      case 'furusato-osusume-henreihin':
        return RecommendedGiftsArticle;
      case 'furusato-kakuteishinkoku':
        return ConfirmationTaxArticle;
      case 'furusato-shippai-chuui':
        return MistakesArticle;
      case 'furusato-ai-suisen':
        return AiArticle;
      case 'furusato-december-kakekomi':
        return DecemberArticle;
      case 'furusato-rakuten-point':
        return RakutenPointArticle;
      case 'furusato-kome-ranking':
        return RiceRankingArticle;
      case 'furusato-nichiyouhin':
        return DailyGoodsArticle;
      case 'furusato-nenshu-gendogaku':
        return NenshuGendogakuArticle;
      case 'furusato-beginner-guide':
        return FurusatoBeginnerGuideArticle;
      case 'furusato-onestop-tokureiseido':
        return OnestopTokureiseidoArticle;
      case 'furusato-tomobataraki-fufu':
        return TomobatarakiFufuArticle;
      case 'furusato-schedule-kigen':
        return ScheduleKigenArticle;
      case 'furusato-osusume-ranking':
        return OsusumeRankingArticle;
      case 'furusato-tyuiten-son':
        return TyuitenSonArticle;
      case 'furusato-hitorikurashi':
      case 'furusato-oshu-roman':
        return OshuRomanArticle;
        return HitorikurashiArticle;
      default:
        notFound();
    }
  })();

  return (
    <>
      {/* Article構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* FAQPage構造化データ（該当する場合のみ） */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticleComponent />
    </>
  );
}
