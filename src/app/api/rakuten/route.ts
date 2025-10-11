import { NextRequest, NextResponse } from 'next/server';
import { RakutenProduct } from '@/types';

const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';
const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID;
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || '肉';
    const maxPrice = searchParams.get('maxPrice') || '50000';
    const hits = searchParams.get('hits') || '30';

    if (!APPLICATION_ID) {
      return NextResponse.json(
        { error: 'Rakuten API Application ID is not configured' },
        { status: 500 }
      );
    }

    // 楽天APIのパラメータを構築
    const params = new URLSearchParams({
      applicationId: APPLICATION_ID,
      keyword: `${keyword} ふるさと納税`,
      hits: hits,
      sort: '-reviewCount', // レビュー数の多い順
      imageFlag: '1', // 画像URLを全て取得
    });

    // 価格上限を設定（100円以上の場合のみ）
    if (parseInt(maxPrice) >= 100) {
      params.append('maxPrice', maxPrice);
    }

    // アフィリエイトIDを設定（存在する場合のみ）
    if (AFFILIATE_ID && AFFILIATE_ID.trim() !== '') {
      params.append('affiliateId', AFFILIATE_ID);
    }

    // 楽天APIを呼び出し
    const apiUrl = `${RAKUTEN_API_ENDPOINT}?${params.toString()}`;
    console.log('Rakuten API URL:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Rakuten API error:', response.status, errorText);
      throw new Error(`Rakuten API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    // 高解像度画像URLを取得するヘルパー関数
    const getHighResImageUrl = (url: string): string => {
      if (!url) return '';
      return url.replace(/_ex=\d+x\d+/, '_ex=600x600');
    };

    // データを整形
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: RakutenProduct[] = data.Items.map((item: any) => {
      // 画像URLの優先順位: 中 > 小、高解像度版に変換
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

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
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
