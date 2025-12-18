'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articleData, articleCategories, CategorySlug } from '@/lib/article-data';

export default function InfoTopPage() {
  // 公開済み記事のみフィルタリング
  const publishedArticles = Object.entries(articleData)
    .filter(([_, article]) => article.published)
    .map(([slug, article]) => ({ slug, ...article }));

  // 新着記事（日付順、最新5件）
  const recentArticles = [...publishedArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // カテゴリ別記事数
  const articlesByCategory: Record<CategorySlug, typeof publishedArticles> = {
    basics: [],
    limits: [],
    procedures: [],
    products: [],
    platforms: [],
    tips: [],
  };

  publishedArticles.forEach((article) => {
    articlesByCategory[article.category].push(article);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                あなたのふるさと納税AI
              </Link>
              <h1 className="text-lg text-gray-600 mt-1">ふるさと納税情報サイト</h1>
            </div>
            <Link
              href="/"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              AIで返礼品を探す
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative py-16 sm:py-20 overflow-hidden mb-12">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 暗いオーバーレイ */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ふるさと納税の情報がすべてここに
          </h2>
          <p className="text-lg sm:text-xl text-white/95 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
            初心者ガイドから返礼品ランキング、手続き方法まで徹底解説
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* 新着記事 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">新着記事</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.slice(0, 3).map((article) => {
              const category = articleCategories[article.category];
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-${category.color}-100 text-${category.color}-800`}>
                    {category.name}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {article.description}
                  </p>
                  <p className="text-xs text-gray-500">{article.date}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* カテゴリ別記事一覧 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">カテゴリ別記事一覧</h2>
          <div className="space-y-12">
            {Object.entries(articleCategories).map(([categorySlug, category]) => {
              const articles = articlesByCategory[categorySlug as CategorySlug];
              if (articles.length === 0) return null;

              return (
                <div key={categorySlug} id={categorySlug}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-8 bg-${category.color}-500 rounded`}></div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {category.name}
                      <span className="ml-2 text-sm text-gray-500">
                        （{articles.length}記事）
                      </span>
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/article/${article.slug}`}
                        className={`bg-white rounded-lg p-4 border-l-4 border-${category.color}-500 hover:shadow-md transition-shadow`}
                      >
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {article.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTAセクション */}
        <section className="mt-16 bg-gradient-to-br from-primary-50 to-warning-50 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AIがあなたにぴったりの返礼品を提案
          </h2>
          <p className="text-gray-700 mb-6">
            76万点以上の返礼品から、あなたの好みに合わせて最適な商品をAIが提案
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            AIで返礼品を探す →
          </Link>
        </section>
      </div>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 あなたのふるさと納税AI All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
