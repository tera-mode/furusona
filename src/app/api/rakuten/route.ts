import { NextRequest, NextResponse } from 'next/server';
import { ProductCacheService } from '@/lib/product-cache';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || '肉';
    const maxPrice = searchParams.get('maxPrice');
    const hits = searchParams.get('hits') || '30';
    const sort = searchParams.get('sort') || '-reviewCount';

    if (!APPLICATION_ID) {
      return NextResponse.json(
        { error: 'Rakuten API Application ID is not configured' },
        { status: 500 }
      );
    }

    const maxPriceNum = maxPrice ? parseInt(maxPrice) : undefined;
    const hitsNum = parseInt(hits);

    // 1. まずFirestoreキャッシュをチェック
    const cachedProducts = await ProductCacheService.getProductsBySearchCondition(
      keyword,
      maxPriceNum,
      sort,
      hitsNum
    );

    let products = cachedProducts;
    let fromCache = false;

    if (cachedProducts && cachedProducts.length > 0) {
      // キャッシュヒット
      fromCache = true;
      console.log(`Cache HIT for keyword: ${keyword}`);
    } else {
      // キャッシュミス - 楽天APIから取得
      console.log(`Cache MISS for keyword: ${keyword}, fetching from Rakuten API`);

      const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';

      const params = new URLSearchParams({
        applicationId: APPLICATION_ID,
        keyword: `${keyword} ふるさと納税`,
        hits: hitsNum.toString(),
        sort: sort,
        imageFlag: '1',
      });

      if (maxPriceNum && maxPriceNum >= 100) {
        params.append('maxPrice', maxPriceNum.toString());
      }

      if (AFFILIATE_ID && AFFILIATE_ID.trim() !== '') {
        params.append('affiliateId', AFFILIATE_ID);
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
      products = data.Items.map((item: any) => {
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

      // Firestoreにキャッシュ保存
      if (products && products.length > 0) {
        await ProductCacheService.saveProductsBySearchCondition(
          keyword,
          products,
          maxPriceNum,
          sort,
          hitsNum
        );
      }
    }

    // productsがnullの場合は空配列を返す
    const finalProducts = products || [];

    return NextResponse.json({
      success: true,
      count: finalProducts.length,
      products: finalProducts,
      fromCache,
    });

  } catch (error) {
    console.error('Error fetching Rakuten products:', error);
    return NextResponse.json(
      {
        error: '返礼品の取得に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
