// トレンドアラートメール送信ロジック
import type { TrendsResult } from '@/types/trends';
import { sendEmail } from '@/lib/email/brevo-client';

/**
 * Brevo APIを使ってトレンドアラートメールを送信
 */
export async function sendTrendsAlertEmail(
  trendsData: TrendsResult,
  recipientEmail: string
): Promise<boolean> {
  try {
    const emailHtml = generateTrendsEmailHtml(trendsData);
    const emailText = generateTrendsEmailText(trendsData);

    const result = await sendEmail({
      to: recipientEmail,
      subject: `🔍 ふるさと納税 - 関連キーワード【${new Date().toLocaleDateString('ja-JP')}】`,
      html: emailHtml,
      text: emailText,
    });

    if (!result.success) {
      throw new Error(result.error || 'Email sending failed');
    }

    console.log('[Trends Email] Successfully sent to:', recipientEmail);
    return true;
  } catch (error) {
    console.error('[Trends Email] Failed to send:', error);
    throw error;
  }
}

/**
 * メールHTMLを生成
 */
function generateTrendsEmailHtml(trendsData: TrendsResult): string {
  const date = trendsData.scrapedAt.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ふるさと納税 - 急上昇キーワード</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Sans', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #e63946;
      border-bottom: 3px solid #e63946;
      padding-bottom: 10px;
    }
    h2 {
      color: #457b9d;
      margin-top: 30px;
    }
    .keyword-list {
      list-style: none;
      padding: 0;
    }
    .keyword-item {
      background-color: #f1faee;
      margin: 10px 0;
      padding: 12px 15px;
      border-radius: 6px;
      border-left: 4px solid #e63946;
    }
    .keyword-query {
      font-size: 16px;
      font-weight: bold;
      color: #1d3557;
    }
    .keyword-value {
      font-size: 14px;
      color: #e63946;
      margin-top: 4px;
    }
    .breakout {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 ふるさと納税 - 関連キーワード</h1>
    <p style="color: #666; font-size: 14px;">${date} 時点のデータ</p>

    ${
      trendsData.risingQueries.length > 0
        ? `
    <h2>📈 急上昇中の関連キーワード</h2>
    <p style="color: #666; font-size: 14px;">
      過去24時間で検索が急増している関連キーワードです。これらのキーワードに関連する返礼品の需要が高まっています。
    </p>
    <ul class="keyword-list">
      ${trendsData.risingQueries
        .map(
          (kw) => `
        <li class="keyword-item">
          <div class="keyword-query">${kw.query}</div>
          <div class="keyword-value">
            ${
              kw.value === 'Breakout'
                ? '<span class="breakout">🚀 BREAKOUT</span> - 検索が爆発的に増加中!'
                : `検索増加率: +${kw.formattedValue || kw.value}%`
            }
          </div>
        </li>
      `
        )
        .join('')}
    </ul>
    `
        : '<p style="color: #999;">本日は急上昇キーワードがありませんでした。</p>'
    }

    ${
      trendsData.topQueries.length > 0
        ? `
    <h2>⭐ 人気の関連キーワード</h2>
    <p style="color: #666; font-size: 14px;">
      継続的に人気のある関連キーワードです。安定した需要があります。
    </p>
    <ul class="keyword-list">
      ${trendsData.topQueries
        .map(
          (kw) => `
        <li class="keyword-item">
          <div class="keyword-query">${kw.query}</div>
          <div class="keyword-value">
            人気度: ${kw.formattedValue || kw.value}
          </div>
        </li>
      `
        )
        .join('')}
    </ul>
    `
        : ''
    }

    <div class="footer">
      <p>このメールは<strong>ふるそな</strong>から自動送信されています。</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * メールテキスト版を生成
 */
function generateTrendsEmailText(trendsData: TrendsResult): string {
  const date = trendsData.scrapedAt.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  let text = `ふるさと納税 - 関連キーワード\n`;
  text += `${date} 時点のデータ\n\n`;

  if (trendsData.risingQueries.length > 0) {
    text += `【急上昇中の関連キーワード】\n`;
    text += `過去24時間で検索が急増している関連キーワードです。\n\n`;
    trendsData.risingQueries.forEach((kw, index) => {
      text += `${index + 1}. ${kw.query}\n`;
      text += `   ${
        kw.value === 'Breakout'
          ? '🚀 BREAKOUT - 検索が爆発的に増加中!'
          : `検索増加率: +${kw.formattedValue || kw.value}%`
      }\n\n`;
    });
  } else {
    text += `本日は急上昇キーワードがありませんでした。\n\n`;
  }

  if (trendsData.topQueries.length > 0) {
    text += `\n【人気の関連キーワード】\n`;
    text += `継続的に人気のある関連キーワードです。安定した需要があります。\n\n`;
    trendsData.topQueries.forEach((kw, index) => {
      text += `${index + 1}. ${kw.query}\n`;
      text += `   人気度: ${kw.formattedValue || kw.value}\n\n`;
    });
  }

  text += `\n---\n`;
  text += `このメールは「ふるそな」から自動送信されています。`;

  return text;
}
