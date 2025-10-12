/**
 * 初期データ取得スクリプト
 * 主要カテゴリの返礼品を事前にキャッシュする
 *
 * 実行方法:
 * npx tsx scripts/prefetch-products.ts
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config({ path: '.env.local' });

// Firebase Adminの初期化
if (!getApps().length) {
  // 環境変数から認証情報を取得
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    console.error('Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
    process.exit(1);
  }

  initializeApp({
    credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

// 主要カテゴリ
const MAIN_CATEGORIES = [
  '肉',
  '魚介',
  'フルーツ',
  'お米',
  'スイーツ',
  '野菜',
  '加工品',
  '飲料',
];

// 楽天APIから商品を取得
async function fetchProductsFromRakuten(
  category: string,
  maxPrice?: number,
  hits: number = 30
): Promise<any[]> {
  const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';
  const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;
  const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

  if (!APPLICATION_ID) {
    throw new Error('RAKUTEN_APPLICATION_ID is not configured');
  }

  const params = new URLSearchParams({
    applicationId: APPLICATION_ID,
    keyword: `${category} ふるさと納税`,
    hits: hits.toString(),
    sort: '-reviewCount',
    imageFlag: '1',
  });

  if (maxPrice && maxPrice >= 100) {
    params.append('maxPrice', maxPrice.toString());
  }

  if (AFFILIATE_ID && AFFILIATE_ID.trim() !== '') {
    params.append('affiliateId', AFFILIATE_ID);
  }

  const apiUrl = `${RAKUTEN_API_ENDPOINT}?${params.toString()}`;
  console.log(`Fetching ${category} from Rakuten API...`);

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Rakuten API error: ${response.status}`);
  }

  const data = await response.json();

  // 高解像度画像URLを取得するヘルパー関数
  const getHighResImageUrl = (url: string): string => {
    if (!url) return '';
    return url.replace(/_ex=\d+x\d+/, '_ex=600x600');
  };

  const products = data.Items.map((item: any) => {
    let imageUrl = '';
    if (item.Item.mediumImageUrls?.[0]?.imageUrl) {
      imageUrl = getHighResImageUrl(item.Item.mediumImageUrls[0].imageUrl);
    } else if (item.Item.smallImageUrls?.[0]?.imageUrl) {
      imageUrl = getHighResImageUrl(item.Item.smallImageUrls[0].imageUrl);
    }

    return {
      itemCode: item.Item.itemCode,
      itemName: item.Item.itemName,
      itemPrice: item.Item.itemPrice,
      itemUrl: item.Item.itemUrl,
      affiliateUrl: item.Item.affiliateUrl || item.Item.itemUrl,
      imageUrl,
      shopName: item.Item.shopName,
      reviewCount: item.Item.reviewCount || 0,
      reviewAverage: item.Item.reviewAverage || 0,
    };
  });

  return products;
}

// Firestoreに商品を保存
async function saveProductsToFirestore(products: any[], category: string): Promise<void> {
  const batch = db.batch();
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  for (const product of products) {
    const docRef = db.collection('cachedProducts').doc(product.itemCode);

    // 既存データをチェック
    const existingDoc = await docRef.get();
    const isNew = existingDoc.exists
      ? existingDoc.data()?.isNew
      : now > thirtyDaysAgo;

    const cachedProduct = {
      ...product,
      category,
      isNew,
      createdAt: existingDoc.exists ? existingDoc.data()?.createdAt : now,
      updatedAt: now,
    };

    batch.set(docRef, cachedProduct, { merge: true });
  }

  await batch.commit();
  console.log(`✓ Saved ${products.length} products for category: ${category}`);
}

// メイン処理
async function main() {
  console.log('🚀 Starting prefetch of products...\n');

  let totalProducts = 0;

  for (const category of MAIN_CATEGORIES) {
    try {
      // 楽天APIから取得
      const products = await fetchProductsFromRakuten(category, undefined, 30);

      if (products.length > 0) {
        // Firestoreに保存
        await saveProductsToFirestore(products, category);
        totalProducts += products.length;
      }

      // APIレート制限を考慮して少し待機
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error fetching ${category}:`, error);
    }
  }

  console.log(`\n✅ Prefetch completed! Total products cached: ${totalProducts}`);
  process.exit(0);
}

// スクリプト実行
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
