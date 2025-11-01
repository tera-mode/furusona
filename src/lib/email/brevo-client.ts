import * as brevo from '@getbrevo/brevo';

// Brevoクライアントのシングルトンインスタンス
let brevoApiInstance: brevo.TransactionalEmailsApi | null = null;

/**
 * Brevoクライアントを取得
 */
export function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (!brevoApiInstance) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set in environment variables');
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    brevoApiInstance = apiInstance;
  }

  return brevoApiInstance;
}

/**
 * メール送信
 */
export interface SendEmailParams {
  to: string | string[];
  from?: string;
  fromName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(params: SendEmailParams) {
  const apiInstance = getBrevoClient();

  try {
    // デフォルトの送信者情報
    const fromEmail = params.from || process.env.BREVO_FROM_EMAIL || 'noreply@furusona.jp';
    const fromName = params.fromName || process.env.BREVO_FROM_NAME || 'ふるそな';

    // 受信者のフォーマット
    const toArray = Array.isArray(params.to) ? params.to : [params.to];
    const to = toArray.map(email => ({ email }));

    // メール送信オブジェクトを作成
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: fromEmail, name: fromName };
    sendSmtpEmail.to = to;
    sendSmtpEmail.subject = params.subject;
    sendSmtpEmail.htmlContent = params.html;

    if (params.text) {
      sendSmtpEmail.textContent = params.text;
    }

    if (params.replyTo) {
      sendSmtpEmail.replyTo = { email: params.replyTo };
    }

    // デバッグログ
    console.log('📧 Sending email via Brevo:');
    console.log('  From:', fromEmail, `(${fromName})`);
    console.log('  To:', toArray);
    console.log('  Subject:', params.subject);

    // メール送信
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ Brevo response:', result.body);

    return {
      success: true,
      data: result.body,
      error: null,
    };
  } catch (error) {
    console.error('Failed to send email via Brevo:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * テストメール送信（管理者アドレスに送信）
 */
export async function sendTestEmail(params: Omit<SendEmailParams, 'to'>) {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'tera.mode@gmail.com';

  return sendEmail({
    ...params,
    to: adminEmail,
    subject: `[TEST] ${params.subject}`,
  });
}
