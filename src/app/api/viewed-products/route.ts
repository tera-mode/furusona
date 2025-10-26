import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// POST /api/viewed-products - 閲覧履歴を記録
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, itemCode, itemName, itemPrice, itemUrl, affiliateUrl, imageUrl, shopName } = body;

    // バリデーション
    if (!userId || !itemCode || !itemName || !itemPrice || !itemUrl || !affiliateUrl || !imageUrl || !shopName) {
      return NextResponse.json(
        { error: '必須パラメータが不足しています' },
        { status: 400 }
      );
    }

    // 同じ商品の閲覧履歴が既に存在するか確認
    const existingQuery = await adminDb.collection('viewedProducts')
      .where('userId', '==', userId)
      .where('itemCode', '==', itemCode)
      .limit(1)
      .get();

    const now = new Date();

    if (!existingQuery.empty) {
      // 既存の閲覧履歴を更新（viewedAtを最新に）
      const docId = existingQuery.docs[0].id;
      await adminDb.collection('viewedProducts').doc(docId).update({
        viewedAt: now,
      });

      return NextResponse.json({
        success: true,
        id: docId,
        message: '閲覧履歴を更新しました',
      });
    }

    // 新規閲覧履歴を作成
    const docRef = await adminDb.collection('viewedProducts').add({
      userId,
      itemCode,
      itemName,
      itemPrice,
      itemUrl,
      affiliateUrl,
      imageUrl,
      shopName,
      viewedAt: now,
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: '閲覧履歴を記録しました',
    });
  } catch (error) {
    console.error('Error recording viewed product:', error);
    return NextResponse.json(
      { error: '閲覧履歴の記録に失敗しました' },
      { status: 500 }
    );
  }
}

// GET /api/viewed-products - 閲覧履歴を取得
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limitCount = parseInt(searchParams.get('limit') || '50', 10);

    if (!userId) {
      return NextResponse.json(
        { error: 'userIdが必要です' },
        { status: 400 }
      );
    }

    const snapshot = await adminDb.collection('viewedProducts')
      .where('userId', '==', userId)
      .orderBy('viewedAt', 'desc')
      .limit(limitCount)
      .get();

    const viewedProducts = snapshot.docs.map((document) => {
      const data = document.data();
      return {
        id: document.id,
        ...data,
        viewedAt: data.viewedAt?.toDate ? data.viewedAt.toDate() : new Date(data.viewedAt),
      };
    });

    return NextResponse.json({
      success: true,
      viewedProducts,
      count: viewedProducts.length,
    });
  } catch (error) {
    console.error('Error fetching viewed products:', error);
    return NextResponse.json(
      { error: '閲覧履歴の取得に失敗しました' },
      { status: 500 }
    );
  }
}
