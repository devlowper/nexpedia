/**
 * Monetag Ads Configuration & Helpers
 * All aggressive click-hijacking, smartlinks, and redirect popunders are disabled
 * so that navigation, search, cards, and buttons remain 100% smooth and redirect-free.
 */

export const MONETAG_SMARTLINK = "";

/**
 * Disabled to prevent annoying redirects on user clicks
 */
export function triggerMonetagSmartlink() {
  // No-op: do not redirect user
  return;
}

/**
 * Direct navigation without any click hijacking
 */
export function handleDetailsAdClick(e: React.MouseEvent, slug: string) {
  // No-op: do not prevent default, allow normal navigation
  return;
}
