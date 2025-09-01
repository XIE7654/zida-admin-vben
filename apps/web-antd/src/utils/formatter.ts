// utils/formatter.ts
import dayjs from 'dayjs';

/**
 * 通用时间格式化
 * @param cellValue 时间戳 (支持秒/毫秒) 或 Date/string
 * @param format 格式化模板，默认 "YYYY-MM-DD HH:mm:ss"
 */
export function formatDateTime(
  { cellValue }: { cellValue: Date | number | string },
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  if (!cellValue) return '';
  const timestamp = Number(cellValue);

  // 如果是数字，区分 秒级时间戳 / 毫秒级时间戳
  if (!Number.isNaN(timestamp)) {
    const date = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    return dayjs(date).format(format);
  }

  // 其他情况（字符串 / Date 对象）
  return dayjs(cellValue).format(format);
}
