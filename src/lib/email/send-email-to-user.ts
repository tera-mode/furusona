import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/email/brevo-client';
import { renderTemplate, wrapEmailHTML, renderProductList } from '@/lib/email/template-engine';
import { generateEmailVariables } from '@/lib/email/personalization';
import { getTemplate } from '@/lib/email-templates';
import { User } from '@/types';
import { EmailLog, EmailTemplate } from '@/types/email';

export interface SendEmailToUserOptions {
  templateId: string;
  userId: string;
  testMode?: boolean;
}

export interface SendEmailToUserResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * ユーザーにメールを送信する共有関数
 * API RouteとCronの両方から呼び出し可能
 */
export async function sendEmailToUser(
  options: SendEmailToUserOptions
): Promise<SendEmailToUserResult> {
  try {
    const { templateId, userId, testMode = false } = options;

    if (!templateId || !userId) {
      return {
        success: false,
        error: 'templateId and userId are required',
      };
    }

    const db = getFirestoreAdmin();

    // ユーザー情報を取得
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const user = {
      uid: userDoc.id,
      ...userDoc.data(),
    } as User;

    // メール購読設定をチェック
    if (!testMode) {
      if (!user.newsletter) {
        return {
          success: false,
          error: 'User has not subscribed to newsletter',
        };
      }

      // テンプレート別の購読設定をチェック
      const emailPreferences = user.emailPreferences || {};
      const preferenceKey = templateId.replace('_', '') as keyof typeof emailPreferences;

      if (emailPreferences[preferenceKey] === false) {
        return {
          success: false,
          error: `User has opted out of ${templateId} emails`,
        };
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
        return {
          success: false,
          error: 'Template not found',
        };
      }
      templateData = defaultTemplate;
    }

    if (!templateData) {
      return {
        success: false,
        error: 'Template data is missing',
      };
    }

    if (!templateData.active && !testMode) {
      return {
        success: false,
        error: 'Template is not active',
      };
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
      return {
        success: false,
        error: emailResult.error || 'Email sending failed',
      };
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
    }

    return {
      success: true,
      messageId: emailResult.data?.messageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
