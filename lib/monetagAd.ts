/**
 * Monetag Ads Configuration & Helpers
 */

export const MONETAG_SMARTLINK = "https://uplcm.com/4/12127029";

/**
 * Triggers Monetag smartlink in a new tab when prompt copy button is clicked
 */
export function triggerMonetagSmartlink() {
  if (typeof window !== "undefined") {
    try {
      window.open(MONETAG_SMARTLINK, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.debug("Ad trigger notice:", e);
    }
  }
}
