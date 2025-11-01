import { EmailTemplate } from '@/types/email';

export const limitReminderTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'limit_reminder',
  name: '限度額のお知らせ',
  subject: '{{userName}}さん、ふるさと納税の限度額をご確認ください',
  variables: ['userName', 'remainingLimit', 'usageRate', 'totalDonations', 'year', 'products'],
  active: true,
  schedule: {
    enabled: true,
    months: [6, 9, 11], // 6月、9月、11月
    days: [1], // 1日
    hour: 0,
    minute: 0,
    timezone: 'Asia/Tokyo',
  },
  htmlBody: `
    <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">今年の限度額状況</h2>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      {{userName}}さん、{{year}}年のふるさと納税の利用状況をお知らせします。
    </p>

    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
      <table width="100%" cellpadding="8" cellspacing="0">
        <tr>
          <td style="color: #6b7280; font-size: 14px;">これまでの寄付額</td>
          <td style="color: #1f2937; font-size: 18px; font-weight: bold; text-align: right;">{{totalDonations}}円</td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-size: 14px;">残り限度額</td>
          <td style="color: #ef4444; font-size: 24px; font-weight: bold; text-align: right;">{{remainingLimit}}円</td>
        </tr>
        <tr>
          <td style="color: #6b7280; font-size: 14px;">利用率</td>
          <td style="color: #1f2937; font-size: 18px; font-weight: bold; text-align: right;">{{usageRate}}%</td>
        </tr>
      </table>
    </div>

    {{#if usageRate < 50}}
    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      まだ十分な枠があります。<br>
      お気に入りの返礼品を探してみませんか？
    </p>
    {{else}}
    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      年末に向けて、計画的なご利用をおすすめします。<br>
      残り{{remainingLimit}}円で選べる返礼品をご紹介します。
    </p>
    {{/if}}

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">残り枠で選べる返礼品</h3>

    <!-- 商品リストはJavaScript側で挿入 -->
    <div id="product-list"></div>

    <div style="text-align: center; margin: 32px 0 0 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard"
         style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        返礼品を探す
      </a>
    </div>
  `,
  textBody: `
{{userName}}さん、{{year}}年のふるさと納税の利用状況をお知らせします。

━━━━━━━━━━━━━━━━━━━━
これまでの寄付額: {{totalDonations}}円
残り限度額: {{remainingLimit}}円
利用率: {{usageRate}}%
━━━━━━━━━━━━━━━━━━━━

詳しくはこちら: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard

━━━━━━━━━━━━━━━━━━━━
ふるそな
  `,
};
