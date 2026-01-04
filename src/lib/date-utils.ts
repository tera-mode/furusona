/**
 * 日付ユーティリティ（JST対応）
 * すべての日付計算は日本標準時（JST, UTC+9）で実行されます
 */

/**
 * 日付をJSTに変換
 */
export function getJSTDate(date?: Date): Date {
  const targetDate = date || new Date();

  // JSTはUTC+9時間
  const utc = targetDate.getTime() + (targetDate.getTimezoneOffset() * 60000);
  const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換

  return new Date(utc + jstOffset);
}

/**
 * 昨日の日付範囲を取得（JST）
 */
export function getYesterdayRange(): { start: Date; end: Date } {
  const now = getJSTDate();

  // 今日の0時0分0秒
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 昨日の0時0分0秒
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  return {
    start: yesterdayStart,
    end: todayStart
  };
}

/**
 * 過去7日間の日付範囲を取得（JST）
 */
export function getLast7DaysRange(): { start: Date; end: Date } {
  const now = getJSTDate();

  // 7日前の同時刻
  const start = new Date(now);
  start.setDate(start.getDate() - 7);

  return {
    start,
    end: now
  };
}

/**
 * 今月の日付範囲を取得（JST）
 */
export function getThisMonthRange(): { start: Date; end: Date } {
  const now = getJSTDate();

  // 今月の1日の0時0分0秒
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    start: monthStart,
    end: now
  };
}

/**
 * 日付をYYYY-MM-DD形式の文字列に変換（Firestore保存用）
 */
export function formatDateForFirestore(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
