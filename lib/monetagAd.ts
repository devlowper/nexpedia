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

// In-memory set of cards that have already triggered their 1st click ad
const clickedCards = new Set<string>();

/**
 * Handles prompt card clicks with 1-time redirect:
 * - 1st click: Triggers Monetag ad in a new tab, redirect turns off for this card.
 * - 2nd click: Directly navigates into the card to view details without redirecting.
 */
export function handleCardAdClick(e: React.MouseEvent, cardIdOrSlug: string) {
  if (typeof window === "undefined") return;

  const key = `ad_clicked_${cardIdOrSlug}`;
  const alreadyClicked = clickedCards.has(cardIdOrSlug) || sessionStorage.getItem(key) === "1";

  if (!alreadyClicked) {
    // 1st click: Trigger ad redirect once, prevent entering card immediately
    e.preventDefault();
    clickedCards.add(cardIdOrSlug);
    try {
      sessionStorage.setItem(key, "1");
    } catch (err) {}

    triggerMonetagSmartlink();
  }
  // 2nd click: alreadyClicked is true, so e.preventDefault() is NOT called,
  // allowing Next.js <Link> to navigate directly into details page.
}
