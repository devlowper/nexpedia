import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a view count with compact notation:
 * - < 1000: exact number (e.g., 950)
 * - 1000: 1k
 * - 1010: 1.1k (rounds up to 1 decimal for 1k..9.9k)
 * - 10k to 99k: 10k, 10.5k
 * - 100k to 999k: 100k, 250k
 * - >= 1M: 1M, 1.1M, etc.
 */
export function formatViewCount(views: number | null | undefined): string {
  if (views === null || views === undefined || isNaN(views) || views <= 0) {
    return "0";
  }

  // < 1000 -> exact number
  if (views < 1000) {
    return views.toString();
  }

  // >= 1M -> 1M, 1.1M, 10M
  if (views >= 1_000_000) {
    const millions = views / 1_000_000;
    if (views % 1_000_000 === 0) {
      return `${millions}M`;
    }
    const formatted = (Math.ceil(millions * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return `${formatted}M`;
  }

  // >= 100k to < 1M -> 100k, 250k, 999k
  if (views >= 100_000) {
    return `${Math.floor(views / 1000)}k`;
  }

  // >= 10k to < 100k -> 10k, 10.5k, 99k
  if (views >= 10_000) {
    if (views % 1000 === 0) {
      return `${views / 1000}k`;
    }
    const val = views / 1000;
    const formatted = (Math.floor(val * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return `${formatted}k`;
  }

  // 1000 to 9999 -> 1k, 1.1k (e.g. 1010 -> 1.1k)
  if (views === 1000) {
    return "1k";
  }
  const k = Math.ceil((views / 1000) * 10) / 10;
  return `${k.toFixed(1).replace(/\.0$/, "")}k`;
}

