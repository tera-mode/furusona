import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      productName,
      productPrice,
      productUrl,
      itemCode,
      year,
    } = body;

    // バリデーション
    if (!userId || !productName || !productPrice) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // 年度が指定されていない場合は現在の年を使用
    const donationYear = year || new Date().getFullYear();

    // Firestoreに寄付履歴を追加
    const docRef = await adminDb.collection('donations').add({
      userId,
      productName,
      productPrice: Number(productPrice),
      productUrl: productUrl || '-',
      itemCode: itemCode || null,
      year: donationYear,
      donatedAt: new Date(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: '寄付履歴を追加しました',
    });

  } catch (error) {
    console.error('Error adding donation:', error);
    return NextResponse.json(
      {
        error: '寄付履歴の追加に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get('id');
    const userId = searchParams.get('userId');

    // バリデーション
    if (!donationId || !userId) {
      return NextResponse.json(
        { error: 'IDとユーザーIDが必要です' },
        { status: 400 }
      );
    }

    // 寄付履歴を取得して、ユーザーが所有者であることを確認
    const donationDoc = await adminDb.collection('donations').doc(donationId).get();

    if (!donationDoc.exists) {
      return NextResponse.json(
        { error: '寄付履歴が見つかりません' },
        { status: 404 }
      );
    }

    const donationData = donationDoc.data();
    if (donationData?.userId !== userId) {
      return NextResponse.json(
        { error: '削除する権限がありません' },
        { status: 403 }
      );
    }

    // 寄付履歴を削除
    await adminDb.collection('donations').doc(donationId).delete();

    return NextResponse.json({
      success: true,
      message: '寄付履歴を削除しました',
    });

  } catch (error) {
    console.error('Error deleting donation:', error);
    return NextResponse.json(
      {
        error: '寄付履歴の削除に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
