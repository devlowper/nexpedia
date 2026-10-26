/**
 * Monetag Ads Configuration & Helpers
 */

export const MONETAG_SMARTLINK = "https://uplcm.com/4/12127029";

/**
 * Triggers Monetag smartlink in a new tab
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

// In-memory set of details buttons that have already triggered their 1st click ad
const clickedDetails = new Set<string>();

/**
 * Handles AI Directory "Details" button click with 1-time redirect rule:
 * - 1st click on "Details": Triggers Monetag ad in a new tab, marks as clicked.
 * - 2nd click on "Details": Directly navigates to /ai-directory/[slug] without redirect.
 */
export function handleDetailsAdClick(e: React.MouseEvent, slug: string) {
  if (typeof window === "undefined") return;

  const key = `ad_details_${slug}`;
  const alreadyClicked = clickedDetails.has(slug) || sessionStorage.getItem(key) === "1";

  if (!alreadyClicked) {
    // 1st click: Trigger ad redirect once, prevent navigating immediately
    e.preventDefault();
    e.stopPropagation();
    clickedDetails.add(slug);
    try {
      sessionStorage.setItem(key, "1");
    } catch (err) {}

    triggerMonetagSmartlink();
  }
  // 2nd click: alreadyClicked is true -> e.preventDefault() is NOT called -> navigates to /ai-directory/${slug}
}
