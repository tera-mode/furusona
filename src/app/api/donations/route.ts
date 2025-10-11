import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
    if (!userId || !productName || !productPrice || !productUrl) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // 年度が指定されていない場合は現在の年を使用
    const donationYear = year || new Date().getFullYear();

    // Firestoreに寄付履歴を追加
    const donationsRef = collection(db, 'donations');
    const docRef = await addDoc(donationsRef, {
      userId,
      productName,
      productPrice: Number(productPrice),
      productUrl,
      itemCode: itemCode || null,
      year: donationYear,
      donatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
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
