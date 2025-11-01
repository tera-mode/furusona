import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmailToUser } from '@/lib/email/send-email-to-user';
import { User } from '@/types';
import { EmailTemplate, EmailSchedule } from '@/types/email';

/**
 * 現在時刻がスケジュールにマッチするかチェック
 */
function isScheduleMatching(schedule: EmailSchedule, lastSentAt?: Date): boolean {
  if (!schedule.enabled) return false;

  // タイムゾーンを考慮して現在時刻を取得
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: schedule.timezone || 'Asia/Tokyo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const currentMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0', 10);
  const currentDay = parseInt(parts.find(p => p.type === 'day')?.value || '0', 10);
  const currentHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const currentMinute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);

  // 月のチェック（空の場合は毎月）
  if (schedule.months && schedule.months.length > 0) {
    if (!schedule.months.includes(currentMonth)) {
      return false;
    }
  }

  // 日のチェック（空の場合は毎日）
  if (schedule.days && schedule.days.length > 0) {
    if (!schedule.days.includes(currentDay)) {
      return false;
    }
  }

  // 時刻のチェック（±5分の余裕を持たせる）
  const scheduledMinutes = schedule.hour * 60 + schedule.minute;
  const currentMinutes = currentHour * 60 + currentMinute;
  const diff = Math.abs(scheduledMinutes - currentMinutes);

  if (diff > 5) {
    return false;
  }

  // 同じ日に既に送信済みかチェック
  if (lastSentAt) {
    const lastSentFormatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: schedule.timezone || 'Asia/Tokyo',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour12: false,
    });

    const lastSentParts = lastSentFormatter.formatToParts(lastSentAt);
    const lastSentYear = parseInt(lastSentParts.find(p => p.type === 'year')?.value || '0', 10);
    const lastSentMonth = parseInt(lastSentParts.find(p => p.type === 'month')?.value || '0', 10);
    const lastSentDay = parseInt(lastSentParts.find(p => p.type === 'day')?.value || '0', 10);

    const currentYear = parseInt(parts.find(p => p.type === 'year')?.value || '0', 10);

    // 同じ日なら送信しない
    if (lastSentYear === currentYear && lastSentMonth === currentMonth && lastSentDay === currentDay) {
      return false;
    }
  }

  return true;
}

/**
 * GET /api/cron/send-emails
 *
 * スケジューリングされたメール配信
 * GitHub Actionsから毎時実行される
 *
 * クエリパラメータ:
 * - secret: 認証用シークレット (環境変数CRON_SECRETと一致する必要がある)
 * - testMode: true の場合、管理者メールアドレスのユーザーのみに送信（デバッグ用）
 */
export async function GET(request: NextRequest) {
  try {
    // シークレットキーで認証
    const secret = request.nextUrl.searchParams.get('secret');
    const testMode = request.nextUrl.searchParams.get('testMode') === 'true';
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

    const db = getFirestoreAdmin();

    // すべてのテンプレートをFirestoreから取得
    const templatesSnapshot = await db.collection('emailTemplates').get();

    if (templatesSnapshot.empty) {
      return NextResponse.json({
        message: 'No templates found',
        sent: 0,
      });
    }

    const templates = templatesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        schedule: data.schedule ? {
          ...data.schedule,
          lastSentAt: data.schedule.lastSentAt?.toDate(),
        } : undefined,
      } as EmailTemplate;
    });

    // 現在時刻にマッチするテンプレートをフィルタリング
    const matchingTemplates = templates.filter(template => {
      if (!template.schedule) return false;
      if (!template.active) return false;
      return isScheduleMatching(template.schedule, template.schedule.lastSentAt);
    });

    if (matchingTemplates.length === 0) {
      return NextResponse.json({
        message: 'No templates matching current schedule',
        templates: templates.map(t => ({
          id: t.id,
          name: t.name,
          schedule: t.schedule,
        })),
        sent: 0,
      });
    }

    console.log(`📧 Found ${matchingTemplates.length} templates to send:`, matchingTemplates.map(t => t.id));

    if (testMode) {
      console.log('🧪 TEST MODE: Only sending to admin email address');
    }

    // メルマガ購読しているユーザーを取得
    const usersSnapshot = await db
      .collection('users')
      .where('newsletter', '==', true)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json({
        message: 'No subscribers found',
        matchingTemplates: matchingTemplates.map(t => t.id),
        sent: 0,
      });
    }

    let users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];

    // テストモードの場合、管理者メールアドレスのユーザーのみに絞り込む
    if (testMode) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (adminEmail) {
        users = users.filter(user => user.email === adminEmail);
        console.log(`🧪 Filtered to admin user only: ${users.length} user(s)`);
      } else {
        console.warn('⚠️ TEST MODE enabled but NEXT_PUBLIC_ADMIN_EMAIL is not set');
      }
    }

    const allResults: Record<string, Array<{ userId: string; status: string; error?: string }>> = {};

    // 各テンプレートについてメール送信
    for (const template of matchingTemplates) {
      console.log(`📧 Processing template: ${template.id} (${template.name})`);

      // フィルタリング: メールタイプ別の購読設定をチェック
      const filteredUsers = users.filter(user => {
        const preferences = user.emailPreferences || {};

        // テンプレートIDに応じて購読設定をチェック
        switch (template.id) {
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

      // 送信履歴をチェック（重複送信を防ぐ - 24時間以内の送信をスキップ）
      // ただし、テストモードの場合は履歴チェックをスキップ
      let eligibleUsers = filteredUsers;

      if (!testMode) {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        eligibleUsers = filteredUsers.filter(user => {
          const lastSent = user.lastEmailSent?.[template.id];

          if (!lastSent) return true; // 未送信なら送信対象

          // 最後の送信から24時間以上経過していれば送信対象
          const lastSentDate = lastSent instanceof Date ? lastSent : new Date(lastSent);
          return lastSentDate < oneDayAgo;
        });
      } else {
        console.log('🧪 TEST MODE: Skipping 24-hour duplicate check');
      }

      console.log(`  Total users: ${users.length}, Filtered: ${filteredUsers.length}, Eligible: ${eligibleUsers.length}`);

      // 各ユーザーにメール送信（直接関数呼び出し）
      const results = [];

      for (const user of eligibleUsers) {
        console.log(`  Sending email to user ${user.uid}`);

        const result = await sendEmailToUser({
          templateId: template.id,
          userId: user.uid,
          testMode: testMode, // テストモードの場合は送信履歴を更新しない
        });

        if (result.success) {
          console.log(`  ✓ Email sent successfully to ${user.uid}`);
          results.push({ userId: user.uid, status: 'sent' });
        } else {
          console.error(`  ✗ Email failed for ${user.uid}: ${result.error}`);
          results.push({
            userId: user.uid,
            status: 'failed',
            error: result.error || 'Unknown error',
          });
        }
      }

      allResults[template.id] = results;

      // テンプレートのlastSentAtを更新
      await db.collection('emailTemplates').doc(template.id).update({
        'schedule.lastSentAt': new Date(),
      });

      console.log(`  ✅ Sent ${results.filter(r => r.status === 'sent').length}/${results.length} emails`);
    }

    // 結果をまとめる
    const summary = Object.entries(allResults).map(([templateId, results]) => ({
      templateId,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      total: results.length,
    }));

    const totalSent = summary.reduce((sum, s) => sum + s.sent, 0);
    const totalFailed = summary.reduce((sum, s) => sum + s.failed, 0);

    return NextResponse.json({
      message: 'Email sending completed',
      matchingTemplates: matchingTemplates.map(t => ({ id: t.id, name: t.name })),
      totalSubscribers: users.length,
      sent: totalSent,
      failed: totalFailed,
      summary,
      details: allResults,
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
