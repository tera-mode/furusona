import { EmailTemplate } from '@/types/email';

export const yearEndRushTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'year_end_rush',
  name: '年末駆け込みのご案内',
  subject: '【急ぎ】{{userName}}さん、ふるさと納税は12月31日まで！',
  variables: ['userName', 'remainingLimit', 'usageRate', 'year', 'products'],
  active: true,
  schedule: {
    enabled: true,
    months: [11, 12], // 11月、12月
    days: [1, 15], // 1日、15日（11月15日、12月1日、12月15日）
    hour: 0,
    minute: 0,
    timezone: 'Asia/Tokyo',
  },
  htmlBody: `
    <div style="background-color: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
      <h2 style="color: #991b1b; font-size: 20px; margin: 0 0 8px 0; text-align: center;">⏰ 年末まで残りわずか！</h2>
      <p style="color: #991b1b; font-size: 14px; margin: 0; text-align: center;">
        {{year}}年のふるさと納税は<strong>12月31日</strong>が期限です
      </p>
    </div>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      {{userName}}さん、こんにちは！<br>
      今年のふるさと納税の期限が迫っています。
    </p>

    {{#if usageRate > 0}}
    <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
      <p style="color: #1f2937; font-size: 16px; margin: 0 0 12px 0; font-weight: bold;">
        残り限度額: <span style="color: #ef4444; font-size: 24px;">{{remainingLimit}}円</span>
      </p>
      <p style="color: #6b7280; font-size: 14px; margin: 0;">
        このままですと、{{remainingLimit}}円分の節税メリットを逃してしまいます。
      </p>
    </div>
    {{else}}
    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 0 0 24px 0;">
      <p style="color: #92400e; font-size: 14px; margin: 0;">
        まだ今年のふるさと納税をご利用されていないようです。<br>
        お早めのご利用をおすすめします！
      </p>
    </div>
    {{/if}}

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">今からでも間に合う！おすすめ返礼品</h3>

    <!-- 商品リストはJavaScript側で挿入 -->
    <div id="product-list"></div>

    <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <h4 style="color: #1e40af; font-size: 16px; margin: 0 0 12px 0;">💡 年末駆け込みのポイント</h4>
      <ul style="color: #1e40af; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>決済完了が12月31日までに必要です</li>
        <li>人気商品は売り切れる可能性があります</li>
        <li>ワンストップ特例の申請期限は翌年1月10日です</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 32px 0 0 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard"
         style="display: inline-block; background-color: #ef4444; color: white; padding: 16px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
        今すぐ返礼品を選ぶ
      </a>
    </div>
  `,
  textBody: `
⏰ 年末まで残りわずか！

{{userName}}さん、こんにちは！

{{year}}年のふるさと納税は12月31日が期限です。

残り限度額: {{remainingLimit}}円

今からでも間に合います！
お早めのご利用をおすすめします。

💡 年末駆け込みのポイント
・決済完了が12月31日までに必要です
・人気商品は売り切れる可能性があります
・ワンストップ特例の申請期限は翌年1月10日です

詳しくはこちら: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard

━━━━━━━━━━━━━━━━━━━━
ふるそな
  `,
};
