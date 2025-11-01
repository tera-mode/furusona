import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/debug/env
 * 環境変数の設定状況を確認（開発用）
 */
export async function GET(request: NextRequest) {
  // 管理者メールアドレスによる簡易的な認証
  const adminEmail = request.nextUrl.searchParams.get('admin');

  if (adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const envStatus = {
    CRON_SECRET: process.env.CRON_SECRET ? '✅ 設定済み' : '❌ 未設定',
    BREVO_API_KEY: process.env.BREVO_API_KEY ? '✅ 設定済み' : '❌ 未設定',
    BREVO_FROM_EMAIL: process.env.BREVO_FROM_EMAIL || '❌ 未設定',
    BREVO_FROM_NAME: process.env.BREVO_FROM_NAME || '❌ 未設定',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '❌ 未設定',
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || '❌ 未設定',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? '✅ 設定済み' : '❌ 未設定',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? '✅ 設定済み' : '❌ 未設定',
    RAKUTEN_APPLICATION_ID: process.env.RAKUTEN_APPLICATION_ID ? '✅ 設定済み' : '❌ 未設定',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  return NextResponse.json({
    message: '環境変数の設定状況',
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    envStatus,
  });
}
