/**
 * Monetag Ads Configuration & Helpers
 * Direct link / Smartlink integration for monetization on specific user actions
 */

export const MONETAG_SMARTLINK = "https://uplcm.com/4/12127029";

/**
 * Triggers Monetag Direct Link in a new tab safely without blocking user action
 */
export function triggerMonetagSmartlink() {
  if (typeof window !== "undefined" && MONETAG_SMARTLINK) {
    try {
      window.open(MONETAG_SMARTLINK, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Direct link trigger error", err);
    }
  }
}

/**
 * Handles Details button click with Monetag Direct Link
 */
export function handleDetailsAdClick(e?: React.MouseEvent) {
  triggerMonetagSmartlink();
}
