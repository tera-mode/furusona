import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/email/brevo-client';
import { renderTemplate, wrapEmailHTML, renderProductList } from '@/lib/email/template-engine';
import { generateEmailVariables } from '@/lib/email/personalization';
import { getTemplate } from '@/lib/email-templates';
import { User } from '@/types';
import { EmailLog, EmailTemplate } from '@/types/email';

/**
 * POST /api/email/send
 * メールを送信
 *
 * Body:
 * {
 *   templateId: string;
 *   userId: string;
 *   testMode?: boolean; // trueの場合、管理者メールに送信
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, userId, testMode = false } = body;

    if (!templateId || !userId) {
      return NextResponse.json(
        { error: 'templateId and userId are required' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // ユーザー情報を取得
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = {
      uid: userDoc.id,
      ...userDoc.data(),
    } as User;

    // メール購読設定をチェック
    if (!testMode) {
      if (!user.newsletter) {
        return NextResponse.json(
          { error: 'User has not subscribed to newsletter' },
          { status: 400 }
        );
      }

      // テンプレート別の購読設定をチェック
      const emailPreferences = user.emailPreferences || {};
      const preferenceKey = templateId.replace('_', '') as keyof typeof emailPreferences;

      if (emailPreferences[preferenceKey] === false) {
        return NextResponse.json(
          { error: `User has opted out of ${templateId} emails` },
          { status: 400 }
        );
      }
    }

    // テンプレートを取得（Firestore優先、なければデフォルト）
    const template = await db.collection('emailTemplates').doc(templateId).get();
    let templateData: Partial<EmailTemplate> | undefined;

    if (template.exists) {
      templateData = template.data();
    } else {
      const defaultTemplate = getTemplate(templateId);
      if (!defaultTemplate) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
      templateData = defaultTemplate;
    }

    if (!templateData) {
      return NextResponse.json(
        { error: 'Template data is missing' },
        { status: 500 }
      );
    }

    if (!templateData.active && !testMode) {
      return NextResponse.json(
        { error: 'Template is not active' },
        { status: 400 }
      );
    }

    // パーソナライズ変数を生成
    const variables = await generateEmailVariables(user, templateId);

    // 件名をレンダリング
    const subject = renderTemplate(templateData.subject || '', variables);

    // 本文をレンダリング
    let htmlBody = renderTemplate(templateData.htmlBody || '', variables);

    // 商品リストがある場合は挿入
    if (variables.products && variables.products.length > 0) {
      const productListHTML = renderProductList(variables.products);
      htmlBody = htmlBody.replace('<div id="product-list"></div>', productListHTML);
    } else {
      htmlBody = htmlBody.replace('<div id="product-list"></div>', '');
    }

    // HTMLレイアウトでラップ
    const finalHTML = wrapEmailHTML(htmlBody);

    // テキスト本文をレンダリング
    const textBody = renderTemplate(templateData.textBody || '', variables);

    // メール送信
    const toEmail = testMode
      ? (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'tera.mode@gmail.com')
      : user.email;

    const emailResult = await sendEmail({
      to: toEmail,
      subject: testMode ? `[TEST] ${subject}` : subject,
      html: finalHTML,
      text: textBody,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error },
        { status: 500 }
      );
    }

    // 送信ログを記録（テストモード以外）
    if (!testMode) {
      const emailLog: EmailLog = {
        id: '', // Firestoreが自動生成
        userId,
        templateId,
        sentAt: new Date(),
        status: 'sent',
        resendId: emailResult.data?.messageId || undefined,
      };

      await db.collection('emailLogs').add(emailLog);

      // ユーザーの送信履歴を更新
      await db.collection('users').doc(userId).update({
        [`lastEmailSent.${templateId}`]: new Date(),
      });
    }

    return NextResponse.json({
      success: true,
      message: testMode ? 'Test email sent successfully' : 'Email sent successfully',
      emailId: emailResult.data?.messageId,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
