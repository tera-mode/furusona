import { EmailVariables } from '@/types/email';

/**
 * シンプルなテンプレートエンジン
 * {{変数名}} を実際の値に置換する
 */
export function renderTemplate(
  template: string,
  variables: EmailVariables
): string {
  let rendered = template;

  // 数値をカンマ区切りにフォーマット
  const formatNumber = (num: number): string => {
    return num.toLocaleString('ja-JP');
  };

  // 変数の置換
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');

    let replacementValue = '';
    if (value === undefined || value === null) {
      replacementValue = '';
    } else if (typeof value === 'number') {
      replacementValue = formatNumber(value);
    } else if (Array.isArray(value)) {
      // 配列の場合はJSON文字列に変換（後でHTMLレンダリング時に使用）
      replacementValue = JSON.stringify(value);
    } else {
      replacementValue = String(value);
    }

    rendered = rendered.replace(regex, replacementValue);
  });

  // ネストされたオブジェクトのプロパティを置換 (e.g., monthlyAppeal.appealReason)
  rendered = processNestedVariables(rendered, variables);

  // 配列のループ処理 {{#each array}}...{{/each}}
  rendered = processEachLoop(rendered, variables);

  // 条件分岐の処理 {{#if usageRate > 70}}...{{/if}}
  rendered = processConditionals(rendered, variables);

  return rendered;
}

/**
 * 条件分岐を処理
 * {{#if condition}}...{{else}}...{{/if}}
 */
function processConditionals(
  template: string,
  variables: EmailVariables
): string {
  let result = template;

  // {{#if usageRate > 70}}...{{else}}...{{/if}} のようなパターンをマッチ
  const ifRegex = /{{#if\s+(\w+)\s*([><=!]+)\s*(\d+)}}([\s\S]*?)(?:{{else}}([\s\S]*?))?{{\/if}}/g;

  result = result.replace(ifRegex, (match, varName, operator, threshold, truePart, falsePart) => {
    const value = variables[varName as keyof EmailVariables];
    const thresholdNum = parseInt(threshold, 10);

    let condition = false;
    if (typeof value === 'number') {
      switch (operator) {
        case '>':
          condition = value > thresholdNum;
          break;
        case '<':
          condition = value < thresholdNum;
          break;
        case '>=':
          condition = value >= thresholdNum;
          break;
        case '<=':
          condition = value <= thresholdNum;
          break;
        case '==':
        case '===':
          condition = value === thresholdNum;
          break;
        case '!=':
        case '!==':
          condition = value !== thresholdNum;
          break;
      }
    }

    return condition ? truePart : (falsePart || '');
  });

  // シンプルな真偽値チェック {{#if newsletter}}...{{/if}}
  const simpleBoolRegex = /{{#if\s+(\w+)}}([\s\S]*?)(?:{{else}}([\s\S]*?))?{{\/if}}/g;
  result = result.replace(simpleBoolRegex, (match, varName, truePart, falsePart) => {
    const value = variables[varName as keyof EmailVariables];
    return value ? truePart : (falsePart || '');
  });

  return result;
}

/**
 * ネストされたオブジェクトのプロパティを置換
 * {{monthlyAppeal.appealReason}} のようなパターンをマッチ
 */
function processNestedVariables(
  template: string,
  variables: EmailVariables
): string {
  let result = template;

  // {{object.property}} のようなパターンをマッチ
  const nestedRegex = /{{(\w+)\.(\w+)}}/g;

  result = result.replace(nestedRegex, (match, objectKey, propertyKey) => {
    const obj = variables[objectKey as keyof EmailVariables];

    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      const value = (obj as Record<string, unknown>)[propertyKey];

      if (value === undefined || value === null) {
        return '';
      } else if (typeof value === 'number') {
        return value.toLocaleString('ja-JP');
      } else {
        return String(value);
      }
    }

    return match; // 置換できない場合は元のまま
  });

  return result;
}

/**
 * 配列のループ処理
 * {{#each array}}...{{/each}} のようなパターンをマッチ
 */
function processEachLoop(
  template: string,
  variables: EmailVariables
): string {
  let result = template;

  // {{#each array}}...{{/each}} のパターンをマッチ（ドット記法をサポート）
  const eachRegex = /{{#each\s+([\w.]+)}}([\s\S]*?){{\/each}}/g;

  result = result.replace(eachRegex, (match, arrayPath, loopBody) => {
    // ネストされたプロパティをサポート (e.g., monthlyAppeal.primaryProducts)
    const pathParts = arrayPath.split('.');
    let arrayValue: unknown = variables;

    for (const part of pathParts) {
      if (arrayValue && typeof arrayValue === 'object') {
        arrayValue = (arrayValue as Record<string, unknown>)[part];
      } else {
        arrayValue = undefined;
        break;
      }
    }

    if (!Array.isArray(arrayValue)) {
      return ''; // 配列でない場合は空文字を返す
    }

    // 配列の各要素に対してループ本文を処理
    return arrayValue.map((item) => {
      let itemResult = loopBody;

      // {{this}} を現在の要素に置換
      itemResult = itemResult.replace(/{{this}}/g, String(item));

      // オブジェクトの場合、プロパティにアクセス可能にする {{name}}, {{price}} など
      if (item && typeof item === 'object') {
        Object.entries(item).forEach(([key, value]) => {
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          let replacementValue = '';

          if (value !== undefined && value !== null) {
            if (typeof value === 'number') {
              replacementValue = value.toLocaleString('ja-JP');
            } else {
              replacementValue = String(value);
            }
          }

          itemResult = itemResult.replace(regex, replacementValue);
        });
      }

      return itemResult;
    }).join('');
  });

  return result;
}

/**
 * 商品リストのHTMLを生成
 */
export function renderProductList(products: EmailVariables['products']): string {
  if (!products || products.length === 0) {
    return '';
  }

  return products.map(product => `
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; max-width: 200px; border-radius: 4px;" />
      <h3 style="font-size: 16px; font-weight: bold; margin: 12px 0 8px 0;">${product.name}</h3>
      <p style="color: #ef4444; font-size: 18px; font-weight: bold; margin: 8px 0;">${product.price.toLocaleString('ja-JP')}円</p>
      <p style="color: #6b7280; font-size: 14px; margin: 4px 0;">${product.category}</p>
      <a href="${product.url}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; margin-top: 8px;">詳細を見る</a>
    </div>
  `).join('');
}

/**
 * 基本的なHTMLメールレイアウト
 */
export function wrapEmailHTML(content: string): string {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>あなたのふるさと納税AI</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #3b82f6; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">あなたのふるさと納税AI</h1>
              <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 14px;">あなたにぴったりの返礼品を</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f3f4f6; padding: 24px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0;">このメールは、あなたのふるさと納税AIからの自動配信です。</p>
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                <a href="{{unsubscribeUrl}}" style="color: #3b82f6; text-decoration: none;">配信停止</a> |
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://furusona.jp'}" style="color: #3b82f6; text-decoration: none;">サイトを見る</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
