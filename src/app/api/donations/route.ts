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
      donatedAt, // 実際の寄付日（ISO 8601形式文字列）
    } = body;

    // バリデーション
    if (!userId || !productName || !productPrice) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // 寄付日の処理（指定がない場合は今日）
    const donationDate = donatedAt ? new Date(donatedAt) : new Date();
    const donationYear = donationDate.getFullYear();

    // 日付の妥当性チェック
    if (isNaN(donationDate.getTime())) {
      return NextResponse.json(
        { error: '寄付日の形式が正しくありません' },
        { status: 400 }
      );
    }

    // Firestoreに寄付履歴を追加
    const docRef = await adminDb.collection('donations').add({
      userId,
      productName,
      productPrice: Number(productPrice),
      productUrl: productUrl || '-',
      itemCode: itemCode || null,
      donatedAt: donationDate,
      createdAt: new Date(), // 記録作成日（システム自動）
      year: donationYear,
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      userId,
      productName,
      productPrice,
      productUrl,
      itemCode,
      donatedAt,
    } = body;

    // バリデーション
    if (!id || !userId || !productName || !productPrice) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // 寄付履歴を取得して、ユーザーが所有者であることを確認
    const donationDoc = await adminDb.collection('donations').doc(id).get();

    if (!donationDoc.exists) {
      return NextResponse.json(
        { error: '寄付履歴が見つかりません' },
        { status: 404 }
      );
    }

    const donationData = donationDoc.data();
    if (!donationData || donationData.userId !== userId) {
      return NextResponse.json(
        { error: '編集する権限がありません' },
        { status: 403 }
      );
    }

    // 寄付日の処理
    const donationDate = donatedAt ? new Date(donatedAt) : donationData.donatedAt.toDate();
    const donationYear = donationDate.getFullYear();

    // 日付の妥当性チェック
    if (isNaN(donationDate.getTime())) {
      return NextResponse.json(
        { error: '寄付日の形式が正しくありません' },
        { status: 400 }
      );
    }

    // 寄付履歴を更新
    await adminDb.collection('donations').doc(id).update({
      productName,
      productPrice: Number(productPrice),
      productUrl: productUrl || '-',
      itemCode: itemCode || null,
      donatedAt: donationDate,
      year: donationYear,
      updatedAt: new Date(), // 更新日時を記録
    });

    return NextResponse.json({
      success: true,
      message: '寄付履歴を更新しました',
    });

  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json(
      {
        error: '寄付履歴の更新に失敗しました',
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
