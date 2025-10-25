import { adminDb } from './firebase-admin';
import { CachedProduct, RakutenProduct } from '@/types';

const CACHE_DURATION_DAYS = 7;
const NEW_PRODUCT_THRESHOLD_DAYS = 30;
const PRODUCTS_COLLECTION = 'cachedProducts';
const PRODUCT_CACHE_COLLECTION = 'productCache'; // 検索条件ベースのキャッシュ

/**
 * 検索条件からハッシュキーを生成
 */
function generateCacheKey(
  keyword: string,
  maxPrice?: number,
  sort?: string,
  hits?: number
): string {
  const params = {
    keyword: keyword.toLowerCase().trim(),
    maxPrice: maxPrice || 'none',
    sort: sort || '-reviewCount',
    hits: hits || 30,
  };

  return `${params.keyword}_${params.maxPrice}_${params.sort}_${params.hits}`;
}

export class ProductCacheService {
  /**
   * 検索条件ベースでキャッシュから商品を取得
   */
  static async getProductsBySearchCondition(
    keyword: string,
    maxPrice?: number,
    sort?: string,
    hits?: number
  ): Promise<RakutenProduct[] | null> {
    try {
      const cacheKey = generateCacheKey(keyword, maxPrice, sort, hits);
      const cacheDoc = await adminDb.collection(PRODUCT_CACHE_COLLECTION).doc(cacheKey).get();

      if (!cacheDoc.exists) {
        return null;
      }

      const cacheData = cacheDoc.data();
      if (!cacheData) {
        return null;
      }

      const updatedAt = cacheData.updatedAt?.toDate ? cacheData.updatedAt.toDate() : new Date(cacheData.updatedAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - CACHE_DURATION_DAYS);

      // 有効期限チェック
      if (updatedAt < sevenDaysAgo) {
        console.log(`Cache expired for key: ${cacheKey}`);
        return null;
      }

      console.log(`Cache hit for key: ${cacheKey}`);
      return cacheData.products as RakutenProduct[];
    } catch (error) {
      console.error('Error getting products by search condition:', error);
      return null;
    }
  }

  /**
   * 検索条件ベースで商品をキャッシュに保存
   */
  static async saveProductsBySearchCondition(
    keyword: string,
    products: RakutenProduct[],
    maxPrice?: number,
    sort?: string,
    hits?: number
  ): Promise<void> {
    try {
      const cacheKey = generateCacheKey(keyword, maxPrice, sort, hits);
      const now = new Date();

      await adminDb.collection(PRODUCT_CACHE_COLLECTION).doc(cacheKey).set({
        keyword,
        maxPrice: maxPrice || null,
        sort: sort || '-reviewCount',
        hits: hits || 30,
        products,
        updatedAt: now,
        createdAt: now,
      });

      console.log(`Saved ${products.length} products to cache with key: ${cacheKey}`);
    } catch (error) {
      console.error('Error saving products by search condition:', error);
      throw error;
    }
  }

  /**
   * キャッシュから商品を取得（有効期限内のもののみ）
   */
  static async getProductsFromCache(
    category: string,
    maxPrice?: number,
    limitCount: number = 30
  ): Promise<RakutenProduct[]> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - CACHE_DURATION_DAYS);

      // クエリを構築
      const querySnapshot = await adminDb.collection(PRODUCTS_COLLECTION)
        .where('category', '==', category)
        .where('updatedAt', '>', sevenDaysAgo)
        .orderBy('updatedAt', 'desc')
        .orderBy('reviewCount', 'desc')
        .limit(limitCount)
        .get();

      const products: RakutenProduct[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CachedProduct;

        // 価格フィルタリング
        if (maxPrice && data.itemPrice > maxPrice) {
          return;
        }

        // RakutenProduct形式に変換
        products.push({
          itemCode: data.itemCode,
          itemName: data.itemName,
          itemPrice: data.itemPrice,
          itemUrl: data.itemUrl,
          affiliateUrl: data.affiliateUrl,
          imageUrl: data.imageUrl,
          shopName: data.shopName,
          reviewCount: data.reviewCount,
          reviewAverage: data.reviewAverage,
        });
      });

      return products;
    } catch (error) {
      console.error('Error fetching products from cache:', error);
      return [];
    }
  }

  /**
   * 商品をキャッシュに保存
   */
  static async saveProductToCache(
    product: RakutenProduct,
    category: string
  ): Promise<void> {
    try {
      const existingDoc = await adminDb.collection(PRODUCTS_COLLECTION).doc(product.itemCode).get();

      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - NEW_PRODUCT_THRESHOLD_DAYS);

      // 既存のドキュメントがある場合、createdAtを保持
      let createdAtValue: Date;
      if (existingDoc.exists) {
        const existingData = existingDoc.data();
        if (existingData) {
          createdAtValue = existingData.createdAt?.toDate ? existingData.createdAt.toDate() : new Date(existingData.createdAt);
        } else {
          createdAtValue = now;
        }
      } else {
        // 新規作成の場合は現在時刻
        createdAtValue = now;
      }

      const cachedProduct = {
        ...product,
        category,
        isNew: existingDoc.exists
          ? (existingDoc.data() as CachedProduct).isNew
          : now > thirtyDaysAgo,
        createdAt: createdAtValue,
        updatedAt: now,
      };

      await adminDb.collection(PRODUCTS_COLLECTION).doc(product.itemCode).set(cachedProduct);
    } catch (error) {
      console.error('Error saving product to cache:', error);
      throw error;
    }
  }

  /**
   * 複数の商品を一括でキャッシュに保存
   */
  static async saveProductsToCache(
    products: RakutenProduct[],
    category: string
  ): Promise<void> {
    const savePromises = products.map(product =>
      this.saveProductToCache(product, category)
    );

    try {
      await Promise.all(savePromises);
      console.log(`Saved ${products.length} products to cache for category: ${category}`);
    } catch (error) {
      console.error('Error saving products to cache:', error);
      throw error;
    }
  }

  /**
   * キャッシュが有効かチェック
   */
  static async isCacheValid(category: string): Promise<boolean> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - CACHE_DURATION_DAYS);

      const querySnapshot = await adminDb.collection(PRODUCTS_COLLECTION)
        .where('category', '==', category)
        .where('updatedAt', '>', sevenDaysAgo)
        .limit(1)
        .get();

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking cache validity:', error);
      return false;
    }
  }

  /**
   * 特定カテゴリの商品数を取得
   */
  static async getCachedProductCount(category: string): Promise<number> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - CACHE_DURATION_DAYS);

      const querySnapshot = await adminDb.collection(PRODUCTS_COLLECTION)
        .where('category', '==', category)
        .where('updatedAt', '>', sevenDaysAgo)
        .get();

      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting cached product count:', error);
      return 0;
    }
  }

  /**
   * 楽天APIから商品を取得してキャッシュに保存
   */
  static async fetchAndCacheProducts(
    category: string,
    applicationId: string,
    affiliateId?: string,
    maxPrice?: number,
    hits: number = 30
  ): Promise<RakutenProduct[]> {
    try {
      const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';

      const params = new URLSearchParams({
        applicationId,
        keyword: `${category} ふるさと納税`,
        hits: hits.toString(),
        sort: '-reviewCount',
        imageFlag: '1',
      });

      if (maxPrice && maxPrice >= 100) {
        params.append('maxPrice', maxPrice.toString());
      }

      if (affiliateId && affiliateId.trim() !== '') {
        params.append('affiliateId', affiliateId);
      }

      const apiUrl = `${RAKUTEN_API_ENDPOINT}?${params.toString()}`;
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const products: RakutenProduct[] = data.Items.map((item: any) => {
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

      // キャッシュに保存
      await this.saveProductsToCache(products, category);

      return products;
    } catch (error) {
      console.error('Error fetching and caching products:', error);
      throw error;
    }
  }

  /**
   * キャッシュ優先で商品を取得（キャッシュがなければAPIから取得）
   */
  static async getProducts(
    category: string,
    applicationId: string,
    affiliateId?: string,
    maxPrice?: number,
    hits: number = 30
  ): Promise<RakutenProduct[]> {
    // まずキャッシュから取得を試みる
    const cachedProducts = await this.getProductsFromCache(category, maxPrice, hits);

    if (cachedProducts.length > 0) {
      console.log(`Using ${cachedProducts.length} cached products for category: ${category}`);
      return cachedProducts;
    }

    // キャッシュがない場合はAPIから取得
    console.log(`Cache miss for category: ${category}, fetching from Rakuten API`);
    return await this.fetchAndCacheProducts(category, applicationId, affiliateId, maxPrice, hits);
  }
}
