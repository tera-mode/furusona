import { EmailTemplate } from '@/types/email';

export const seasonalRecommendationTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'seasonal_recommendation',
  name: '季節のおすすめ返礼品',
  subject: '{{userName}}さん、{{month}}月の旬の返礼品をご紹介',
  variables: ['userName', 'month', 'favoriteCategory', 'remainingLimit', 'usageRate', 'products'],
  active: true,
  htmlBody: `
    <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">{{month}}月の旬の返礼品</h2>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
      {{userName}}さん、こんにちは！<br>
      今月は特に{{favoriteCategory}}が美味しい季節です。
    </p>

    <div style="border-left: 4px solid #3b82f6; padding: 16px; margin: 0 0 24px 0; background-color: #dbeafe;">
      <p style="color: #1e40af; font-size: 14px; margin: 0;">
        <strong>残り限度額: {{remainingLimit}}円（利用率: {{usageRate}}%）</strong><br>
        {{#if usageRate < 30}}
        まだ十分な余裕があります。お気に入りの返礼品を見つけませんか？
        {{/if}}
        {{#if usageRate >= 30}}
        計画的なご利用をおすすめします。
        {{/if}}
        {{#if usageRate >= 70}}
        お早めのご利用をおすすめします！
        {{/if}}
      </p>
    </div>

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">今月のおすすめ</h3>

    <!-- 商品リストはJavaScript側で挿入 -->
    <div id="product-list"></div>

    <div style="text-align: center; margin: 32px 0 0 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard"
         style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        もっと見る
      </a>
    </div>
  `,
  textBody: `
{{userName}}さん、こんにちは！

{{month}}月の旬の返礼品をご紹介します。

残り限度額: {{remainingLimit}}円
利用率: {{usageRate}}%

今月のおすすめカテゴリ: {{favoriteCategory}}

詳しくはこちら: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard

━━━━━━━━━━━━━━━━━━━━
ふるそな
  `,
};
