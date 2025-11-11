import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';

export interface CategoryRanking {
  category: string;
  products: {
    rank: number;
    affiliateUrl: string;
    itemName: string;
    itemPrice: number;
    imageUrl: string;
    returnRate?: number;
    reviewRating?: number;
    description?: string;
  }[];
  updatedAt: Date;
}

/**
 * GET: 指定カテゴリのランキング商品を取得
 * Query: ?category=meat
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'category parameter is required' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    const docRef = db.collection('categoryRankings').doc(`category_${category}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({
        category,
        products: [],
      });
    }

    const data = doc.data();
    return NextResponse.json({
      category,
      products: data?.products || [],
      updatedAt: data?.updatedAt?.toDate() || null,
    });
  } catch (error) {
    console.error('Failed to get category rankings:', error);
    return NextResponse.json(
      { error: 'Failed to get category rankings' },
      { status: 500 }
    );
  }
}

/**
 * POST: 指定カテゴリのランキング商品を保存/更新
 * Body: { category: 'meat', products: [...] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, products } = body;

    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { error: 'category is required and must be a string' },
        { status: 400 }
      );
    }

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'products must be an array' },
        { status: 400 }
      );
    }

    // 商品データのバリデーション
    for (const product of products) {
      if (!product.affiliateUrl || !product.itemName || !product.itemPrice) {
        return NextResponse.json(
          { error: 'Each product must have at least affiliateUrl, itemName, and itemPrice' },
          { status: 400 }
        );
      }
    }

    const db = getFirestoreAdmin();
    const docRef = db.collection('categoryRankings').doc(`category_${category}`);

    const data: Omit<CategoryRanking, 'id'> = {
      category,
      products,
      updatedAt: new Date(),
    };

    await docRef.set(data);

    return NextResponse.json({
      success: true,
      category,
      productsCount: products.length,
    });
  } catch (error) {
    console.error('Failed to save category rankings:', error);
    return NextResponse.json(
      { error: 'Failed to save category rankings' },
      { status: 500 }
    );
  }
}
