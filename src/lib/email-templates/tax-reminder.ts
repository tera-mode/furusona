import { EmailTemplate } from '@/types/email';

export const taxReminderTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'tax_reminder',
  name: '確定申告のリマインド',
  subject: '{{userName}}さん、ふるさと納税の確定申告をお忘れなく',
  variables: ['userName', 'year', 'totalDonations'],
  active: true,
  htmlBody: `
    <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">確定申告のお知らせ</h2>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      {{userName}}さん、こんにちは！<br>
      確定申告の時期が近づいてきました。
    </p>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 0 0 24px 0;">
      <p style="color: #1e40af; font-size: 16px; margin: 0 0 12px 0; font-weight: bold;">
        {{year}}年の寄付総額: {{totalDonations}}円
      </p>
      <p style="color: #1e40af; font-size: 14px; margin: 0;">
        確定申告またはワンストップ特例の手続きをお忘れなく！
      </p>
    </div>

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">📋 必要な手続き</h3>

    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 16px 0;">
      <h4 style="color: #1f2937; font-size: 16px; margin: 0 0 12px 0;">1️⃣ ワンストップ特例を利用する場合</h4>
      <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>寄付先が<strong>5自治体以内</strong>であること</li>
        <li>確定申告をしない給与所得者であること</li>
        <li>申請書の提出期限: <strong>翌年1月10日必着</strong></li>
      </ul>
    </div>

    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
      <h4 style="color: #1f2937; font-size: 16px; margin: 0 0 12px 0;">2️⃣ 確定申告をする場合</h4>
      <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>寄付先が<strong>6自治体以上</strong>の場合</li>
        <li>自営業・フリーランスの方</li>
        <li>医療費控除など他の控除も申請する方</li>
        <li>申告期限: <strong>2月16日〜3月15日</strong></li>
      </ul>
    </div>

    <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
      <h4 style="color: #92400e; font-size: 16px; margin: 0 0 12px 0;">⚠️ 重要な注意点</h4>
      <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
        手続きを忘れると、せっかくのふるさと納税の税制メリットが受けられません。<br>
        各自治体から送られてくる<strong>「寄付金受領証明書」</strong>を大切に保管し、必ず期限内に手続きを完了させましょう。
      </p>
    </div>

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">📄 ふるそなでの寄付履歴確認</h3>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      ふるそなのマイページから、今年の寄付履歴を確認できます。<br>
      確定申告の際の参考にご活用ください。
    </p>

    <div style="text-align: center; margin: 32px 0 0 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/past-records"
         style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        寄付履歴を確認する
      </a>
    </div>
  `,
  textBody: `
{{userName}}さん、こんにちは！

確定申告の時期が近づいてきました。

━━━━━━━━━━━━━━━━━━━━
{{year}}年の寄付総額: {{totalDonations}}円
━━━━━━━━━━━━━━━━━━━━

📋 必要な手続き

1️⃣ ワンストップ特例を利用する場合
・寄付先が5自治体以内
・確定申告をしない給与所得者
・申請書の提出期限: 翌年1月10日必着

2️⃣ 確定申告をする場合
・寄付先が6自治体以上
・自営業・フリーランスの方
・申告期限: 2月16日〜3月15日

⚠️ 重要
手続きを忘れると税制メリットが受けられません。
「寄付金受領証明書」を大切に保管してください。

寄付履歴の確認: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/past-records

━━━━━━━━━━━━━━━━━━━━
ふるそな
  `,
};
