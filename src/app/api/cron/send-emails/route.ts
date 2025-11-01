import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { User } from '@/types';

/**
 * GET /api/cron/send-emails
 *
 * スケジューリングされたメール配信
 * GitHub Actionsから定期的に呼び出される
 *
 * クエリパラメータ:
 * - templateId: メールテンプレートID (seasonal_recommendation, limit_reminder, year_end_rush, tax_reminder)
 * - secret: 認証用シークレット (環境変数CRON_SECRETと一致する必要がある)
 */
export async function GET(request: NextRequest) {
  try {
    // シークレットキーで認証
    const secret = request.nextUrl.searchParams.get('secret');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json(
        { error: 'CRON_SECRET is not configured' },
        { status: 500 }
      );
    }

    if (secret !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // テンプレートIDを取得
    const templateId = request.nextUrl.searchParams.get('templateId');

    if (!templateId) {
      return NextResponse.json(
        { error: 'templateId is required' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // メルマガ購読しているユーザーを取得
    const usersSnapshot = await db
      .collection('users')
      .where('newsletter', '==', true)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json({
        message: 'No subscribers found',
        sent: 0,
      });
    }

    const users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];

    // フィルタリング: メールタイプ別の購読設定をチェック
    const filteredUsers = users.filter(user => {
      const preferences = user.emailPreferences || {};

      // テンプレートIDに応じて購読設定をチェック
      switch (templateId) {
        case 'seasonal_recommendation':
          return preferences.seasonal !== false; // デフォルトtrue
        case 'limit_reminder':
          return preferences.limitReminder !== false;
        case 'year_end_rush':
          return preferences.yearEnd !== false;
        case 'tax_reminder':
          return preferences.taxReminder !== false;
        default:
          return true;
      }
    });

    // 送信履歴をチェック（重複送信を防ぐ）
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const eligibleUsers = filteredUsers.filter(user => {
      const lastSent = user.lastEmailSent?.[templateId];

      if (!lastSent) return true; // 未送信なら送信対象

      // 最後の送信から24時間以上経過していれば送信対象
      const lastSentDate = lastSent instanceof Date ? lastSent : new Date(lastSent);
      return lastSentDate < oneDayAgo;
    });

    // 各ユーザーにメール送信リクエストを送る
    const results = [];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    for (const user of eligibleUsers) {
      try {
        const response = await fetch(`${baseUrl}/api/email/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId,
            userId: user.uid,
            testMode: false,
          }),
        });

        if (response.ok) {
          results.push({ userId: user.uid, status: 'sent' });
        } else {
          const error = await response.json();
          results.push({ userId: user.uid, status: 'failed', error: error.error });
        }
      } catch (error) {
        results.push({
          userId: user.uid,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    const successCount = results.filter(r => r.status === 'sent').length;
    const failCount = results.filter(r => r.status === 'failed').length;

    return NextResponse.json({
      message: 'Email sending completed',
      templateId,
      totalSubscribers: users.length,
      eligibleUsers: eligibleUsers.length,
      sent: successCount,
      failed: failCount,
      results,
    });
  } catch (error) {
    console.error('Failed to send scheduled emails:', error);
    return NextResponse.json(
      {
        error: 'Failed to send scheduled emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
