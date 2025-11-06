import { MetadataRoute } from 'next';
import { articleData } from './article/[slug]/page';
import { getArticleSetting } from '@/lib/article-settings';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://furusona.jp';

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 記事ページ
  const articlePages: MetadataRoute.Sitemap = await Promise.all(
    Object.entries(articleData).map(async ([slug, article]) => {
      // Firestoreから公開設定を取得
      const firestoreSetting = await getArticleSetting(slug);
      const published = firestoreSetting?.published ?? article.published;

      // 公開されている記事のみサイトマップに含める
      if (!published) {
        return null;
      }

      return {
        url: `${baseUrl}/article/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    })
  ).then(results => results.filter((item): item is NonNullable<typeof item> => item !== null));

  return [...staticPages, ...articlePages];
}
