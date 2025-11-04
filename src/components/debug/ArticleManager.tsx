'use client';

import { useState, useEffect } from 'react';

interface Article {
  slug: string;
  title: string;
  description: string;
  published: boolean;
}

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');

      const data = await response.json();
      setArticles(data.articles);
      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('記事一覧の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (slug: string, currentPublished: boolean) => {
    try {
      setUpdating(slug);
      setError(null);

      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          published: !currentPublished,
        }),
      });

      if (!response.ok) throw new Error('Failed to update article');

      // 記事一覧を再取得
      await fetchArticles();
    } catch (err) {
      console.error('Error updating article:', err);
      setError(`記事 "${slug}" の更新に失敗しました`);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-blue-600"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">記事一覧を読み込み中...</p>
      </div>
    );
  }

  const publishedArticles = articles.filter(a => a.published);
  const unpublishedArticles = articles.filter(a => !a.published);

  return (
    <div className="space-y-6">
      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">総記事数</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{articles.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">公開中</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{publishedArticles.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">非公開</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{unpublishedArticles.length}</div>
        </div>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 dark:text-red-400 mb-1">エラー</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 注意事項 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">
              記事管理について
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              公開/非公開の変更はFirestoreに保存され、永続化されます。
              デフォルト値を変更する場合は、<code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">page.tsx</code> のarticleDataを編集してください。
            </p>
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">記事一覧</h2>

        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.slug}
              className={`bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border ${
                article.published
                  ? 'border-green-200 dark:border-green-700'
                  : 'border-red-200 dark:border-red-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        article.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      }`}
                    >
                      {article.published ? '公開中' : '非公開'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {article.slug}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={`/article/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      記事を開く →
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => togglePublished(article.slug, article.published)}
                  disabled={updating === article.slug}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    article.published
                      ? 'bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300'
                      : 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/40 dark:hover:bg-green-900/60 dark:text-green-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {updating === article.slug ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-slate-600"></div>
                      更新中...
                    </span>
                  ) : article.published ? (
                    '非公開にする'
                  ) : (
                    '公開する'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
