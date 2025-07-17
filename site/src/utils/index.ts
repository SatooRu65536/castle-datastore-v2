/**
 * @description 桁を揃える
 * @param num 数字
 * @param n 桁
 * @returns 桁を揃えた数字
 */
export function toDigits(num: number, n: number): string {
  return `${num}`.padStart(n, '0');
}
