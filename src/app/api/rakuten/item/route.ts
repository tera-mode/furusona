import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

/**
 * 楽天商品の詳細情報を取得
 * Query: ?shopCode=xxx&itemCode=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const shopCode = searchParams.get('shopCode');
    const itemCode = searchParams.get('itemCode');

    if (!shopCode || !itemCode) {
      return NextResponse.json(
        { error: 'shopCode and itemCode are required' },
        { status: 400 }
      );
    }

    if (!APPLICATION_ID) {
      return NextResponse.json(
        { error: 'Rakuten API Application ID is not configured' },
        { status: 500 }
      );
    }

    const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';

    // itemCodeは shopCode:itemCode の形式で指定
    const fullItemCode = `${shopCode}:${itemCode}`;

    const params = new URLSearchParams({
      applicationId: APPLICATION_ID,
      itemCode: fullItemCode,
    });

    if (AFFILIATE_ID && AFFILIATE_ID.trim() !== '') {
      params.append('affiliateId', AFFILIATE_ID);
    }

    const apiUrl = `${RAKUTEN_API_ENDPOINT}?${params.toString()}`;
    console.log('Rakuten API URL:', apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Rakuten API error response:', errorText);
      throw new Error(`Rakuten API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Items || data.Items.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const item = data.Items[0].Item;

    // 高解像度画像URLを取得するヘルパー関数
    const getHighResImageUrl = (url: string): string => {
      if (!url) return '';
      return url.replace(/_ex=\d+x\d+/, '_ex=600x600');
    };

    let imageUrl = '';
    if (item.mediumImageUrls?.[0]?.imageUrl) {
      imageUrl = getHighResImageUrl(item.mediumImageUrls[0].imageUrl);
    } else if (item.smallImageUrls?.[0]?.imageUrl) {
      imageUrl = getHighResImageUrl(item.smallImageUrls[0].imageUrl);
    }

    return NextResponse.json({
      itemCode: item.itemCode,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemUrl: item.itemUrl,
      affiliateUrl: item.affiliateUrl || item.itemUrl,
      imageUrl,
      shopName: item.shopName,
      reviewCount: item.reviewCount || 0,
      reviewAverage: item.reviewAverage || 0,
      genreId: item.genreId || '',
      mediumImageUrls: item.mediumImageUrls || [],
      smallImageUrls: item.smallImageUrls || [],
    });

  } catch (error) {
    console.error('Error fetching Rakuten item:', error);
    return NextResponse.json(
      {
        error: '商品情報の取得に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
