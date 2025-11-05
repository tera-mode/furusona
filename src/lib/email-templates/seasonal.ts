import { EmailTemplate } from '@/types/email';

export const seasonalRecommendationTemplate: Omit<EmailTemplate, 'createdAt' | 'updatedAt'> = {
  id: 'seasonal_recommendation',
  name: '季節のおすすめ返礼品',
  subject: '{{userName}}さん、{{month}}月の旬の返礼品をご紹介',
  variables: ['userName', 'month', 'favoriteCategory', 'remainingLimit', 'usageRate', 'products', 'monthlyAppeal'],
  active: true,
  schedule: {
    enabled: true,
    months: [], // 空配列 = 毎月
    days: [1], // 毎月1日
    hour: 0, // 0時（UTC）= 9時（JST）
    timezone: 'Asia/Tokyo',
  },
  htmlBody: `
    <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">{{month}}月の旬の返礼品</h2>

    <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      {{userName}}さん、こんにちは！
    </p>

    <!-- 月別訴求理由 -->
    <div style="border-left: 4px solid #f97316; padding: 16px; margin: 0 0 24px 0; background-color: #fff7ed;">
      <h3 style="color: #ea580c; font-size: 16px; margin: 0 0 8px 0; font-weight: bold;">
        📌 今月がおすすめの理由
      </h3>
      <p style="color: #9a3412; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
        {{monthlyAppeal.appealReason}}
      </p>
      <p style="color: #7c2d12; font-size: 13px; line-height: 1.5; margin: 0;">
        {{monthlyAppeal.detailedReason}}
      </p>
    </div>

    <!-- 今月の注目返礼品 -->
    <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin: 0 0 24px 0;">
      <h3 style="color: #78350f; font-size: 16px; margin: 0 0 12px 0; font-weight: bold;">
        🌟 今月の注目返礼品
      </h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        {{#each monthlyAppeal.primaryProducts}}
        <span style="display: inline-block; background-color: #fbbf24; color: #78350f; padding: 6px 12px; border-radius: 16px; font-size: 13px; font-weight: 500;">
          {{this}}
        </span>
        {{/each}}
      </div>
    </div>

    <!-- 限度額情報 -->
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

    <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 16px 0;">あなたにおすすめの返礼品</h3>

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

━━━━━━━━━━━━━━━━━━━━
📌 今月がおすすめの理由
━━━━━━━━━━━━━━━━━━━━

{{monthlyAppeal.appealReason}}

{{monthlyAppeal.detailedReason}}

━━━━━━━━━━━━━━━━━━━━
🌟 今月の注目返礼品
━━━━━━━━━━━━━━━━━━━━

{{#each monthlyAppeal.primaryProducts}}
・{{this}}
{{/each}}

━━━━━━━━━━━━━━━━━━━━
💰 あなたの限度額情報
━━━━━━━━━━━━━━━━━━━━

残り限度額: {{remainingLimit}}円
利用率: {{usageRate}}%

詳しくはこちら: ${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}/dashboard

━━━━━━━━━━━━━━━━━━━━
ふるそな
  `,
};
