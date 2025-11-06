import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { MonthlyRecommendedProduct } from '@/types/email';

/**
 * GET: 指定月のおすすめ商品を取得
 * Query: ?month=1
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month');

    if (!monthParam) {
      return NextResponse.json(
        { error: 'month parameter is required (1-12)' },
        { status: 400 }
      );
    }

    const month = parseInt(monthParam, 10);
    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: 'month must be between 1 and 12' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    const docRef = db.collection('monthlyRecommendedProducts').doc(`month_${month}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({
        month,
        products: [],
      });
    }

    const data = doc.data();
    return NextResponse.json({
      month,
      products: data?.products || [],
      updatedAt: data?.updatedAt?.toDate() || null,
    });
  } catch (error) {
    console.error('Failed to get monthly products:', error);
    return NextResponse.json(
      { error: 'Failed to get monthly products' },
      { status: 500 }
    );
  }
}

/**
 * POST: 指定月のおすすめ商品を保存/更新
 * Body: { month: 1, products: [...] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { month, products } = body;

    if (!month || month < 1 || month > 12) {
      return NextResponse.json(
        { error: 'month must be between 1 and 12' },
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
      if (!product.affiliateUrl || !product.itemName || !product.itemPrice || !product.imageUrl || !product.category) {
        return NextResponse.json(
          { error: 'Each product must have affiliateUrl, itemName, itemPrice, imageUrl, and category' },
          { status: 400 }
        );
      }
    }

    const db = getFirestoreAdmin();
    const docRef = db.collection('monthlyRecommendedProducts').doc(`month_${month}`);

    const data: Omit<MonthlyRecommendedProduct, 'id'> = {
      month,
      products,
      updatedAt: new Date(),
    };

    await docRef.set(data);

    return NextResponse.json({
      success: true,
      month,
      productsCount: products.length,
    });
  } catch (error) {
    console.error('Failed to save monthly products:', error);
    return NextResponse.json(
      { error: 'Failed to save monthly products' },
      { status: 500 }
    );
  }
}
