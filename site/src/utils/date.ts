import { toDigits } from '.';

/**
 * @description 日付の文字列を取得する
 * @param d 日付
 * @returns 日付の文字列
 */
export function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hours = toDigits(d.getHours(), 2);
  const minutes = toDigits(d.getMinutes(), 2);

  return `${year}年${month}月${date}日 ${hours}時${minutes}分`;
}
