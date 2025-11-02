import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmailToUser } from '@/lib/email/send-email-to-user';
import { User } from '@/types';
import { EmailTemplate, EmailSchedule } from '@/types/email';

/**
 * 現在時刻がスケジュールにマッチするかチェック
 *
 * 重要な制約:
 * GitHub Actions cronは1時間に1回のみ実行され、
 * 毎時0分（UTC）にスケジュールされています。
 * ただし、実際の実行時刻は毎時10分前後（±10分程度のずれ）となります。
 *
 * 参考: https://github.com/tera-mode/furusona/actions
 *
 * この制約により:
 * - 分単位の精密なスケジューリングはできません
 * - hourが一致すれば送信する（分単位のチェックは行わない）
 * - 1時間に複数回の送信スケジュールは設定できません
 */
function isScheduleMatching(schedule: EmailSchedule): boolean {
  if (!schedule.enabled) return false;

  // UTCでの現在時刻を取得（GitHub Actions cronはUTCで実行される）
  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1; // 0-11 → 1-12
  const currentDay = now.getUTCDate();
  const currentHour = now.getUTCHours();

  console.log(`Current time (UTC): ${currentMonth}月${currentDay}日 ${currentHour}時`);
  console.log(`Schedule: months=${schedule.months}, days=${schedule.days}, hour=${schedule.hour}`);

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

  // 時刻のチェック（hourが一致すればOK）
  if (schedule.hour !== currentHour) {
    return false;
  }

  return true;
}

/**
 * GET /api/cron/send-emails
 *
 * スケジューリングされたメール配信
 *
 * GitHub Actionsから1時間に1回、毎時0分（UTC）に実行されます。
 * 実際の実行時刻は毎時10分前後（±10分程度のずれ）となります。
 * 詳細: https://github.com/tera-mode/furusona/actions
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
      return isScheduleMatching(template.schedule);
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

      console.log(`  Total users: ${users.length}, Filtered: ${filteredUsers.length}`);

      // 各ユーザーにメール送信（直接関数呼び出し）
      const results = [];

      for (const user of filteredUsers) {
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
