/**
 * サーチエンジンにサイトマップの更新を通知するスクリプト
 *
 * 使い方:
 * npm run ping-search-engines
 *
 * または特定のURLを通知する場合:
 * tsx scripts/ping-search-engines.ts https://furusona.jp/article/new-article
 */

const SITEMAP_URL = 'https://furusona.jp/sitemap.xml';
const SITE_URL = 'https://furusona.jp';

async function pingGoogle(url: string) {
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(pingUrl);
    if (response.ok) {
      console.log('✅ Google にサイトマップの更新を通知しました');
    } else {
      console.log('⚠️  Google への通知に失敗しました:', response.status);
    }
  } catch (error) {
    console.error('❌ Google への通知中にエラーが発生しました:', error);
  }
}

async function pingBing(url: string) {
  const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(pingUrl);
    if (response.ok) {
      console.log('✅ Bing にサイトマップの更新を通知しました');
    } else {
      console.log('⚠️  Bing への通知に失敗しました:', response.status);
    }
  } catch (error) {
    console.error('❌ Bing への通知中にエラーが発生しました:', error);
  }
}

async function requestIndexing(pageUrl: string) {
  console.log(`\n🔔 インデックス登録をリクエスト: ${pageUrl}`);

  // Google Search Console Indexing API を使用する場合は、
  // サービスアカウントの認証情報が必要です
  // 詳細: https://developers.google.com/search/apis/indexing-api/v3/quickstart

  console.log('💡 手動でのインデックス登録をリクエストする方法:');
  console.log('   1. Google Search Console (https://search.google.com/search-console) にアクセス');
  console.log('   2. 「URL検査」ツールで URL を入力');
  console.log(`   3. 「${pageUrl}」を検査`);
  console.log('   4. 「インデックス登録をリクエスト」をクリック');
}

async function main() {
  const specificUrl = process.argv[2];

  console.log('🚀 サーチエンジンへの通知を開始します...\n');

  // サイトマップを通知
  console.log('📍 サイトマップの更新を通知中...');
  await pingGoogle(SITEMAP_URL);
  await pingBing(SITEMAP_URL);

  // 特定のURLが指定されている場合
  if (specificUrl) {
    await requestIndexing(specificUrl);
  } else {
    console.log('\n💡 特定のページのインデックス登録をリクエストするには:');
    console.log('   npm run ping-search-engines https://furusona.jp/article/your-article-slug');
  }

  console.log('\n✨ 完了しました！');
  console.log('\n📝 注意事項:');
  console.log('   - サイトマップの通知は即座に反映されますが、実際のクロールには時間がかかる場合があります');
  console.log('   - より早くインデックスさせたい場合は、Google Search Console で手動リクエストを行ってください');
  console.log('   - 新しい記事を公開したら、このスクリプトを実行することをおすすめします');
}

main().catch(console.error);
