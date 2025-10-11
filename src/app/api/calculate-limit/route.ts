import { NextRequest, NextResponse } from 'next/server';
import { getFurusatoLimitDetails } from '@/utils/furusatoCalculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      annualIncome,
      married,
      dependents,
      socialInsurance,
      mortgageDeduction
    } = body;

    // バリデーション
    if (typeof annualIncome !== 'number' || annualIncome < 0) {
      return NextResponse.json(
        { error: '年収を正しく入力してください' },
        { status: 400 }
      );
    }

    if (typeof married !== 'boolean') {
      return NextResponse.json(
        { error: '婚姻状況を選択してください' },
        { status: 400 }
      );
    }

    if (typeof dependents !== 'number' || dependents < 0) {
      return NextResponse.json(
        { error: '扶養人数を正しく入力してください' },
        { status: 400 }
      );
    }

    // 限度額を計算
    const limitDetails = getFurusatoLimitDetails({
      annualIncome,
      married,
      dependents,
      socialInsurance,
      mortgageDeduction
    });

    return NextResponse.json({
      success: true,
      data: limitDetails
    });

  } catch (error) {
    console.error('Error calculating limit:', error);
    return NextResponse.json(
      { error: '限度額の計算に失敗しました' },
      { status: 500 }
    );
  }
}
