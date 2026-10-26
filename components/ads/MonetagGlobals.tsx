'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { MONETAG_SMARTLINK } from '@/lib/monetagAd';

/**
 * Monetag Global Ads Manager
 * - Retains In-Page Push / MultiTag (Zone: 302292)
 * - Removes OnClick/Popunder so NO button or card on the site redirects to ads
 * - Guarantees ONLY the "Copy Prompt" button triggers the Monetag Smartlink (https://uplcm.com/4/12127029)
 */
export function MonetagGlobals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalOpen = window.open;
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    const originalFormSubmit = HTMLFormElement.prototype.submit;

    // Strict window.open guard:
    // Only allow legitimate application actions and the official Copy Prompt Monetag Smartlink.
    // Completely block any ad popunder or unauthorized redirect on any other button/element!
    window.open = function (url?: string | URL, target?: string, features?: string) {
      const urlStr = url ? String(url) : '';

      // Allow Monetag Smartlink explicitly triggered by copy button
      if (urlStr.includes('uplcm.com/4/12127029') || urlStr.includes(MONETAG_SMARTLINK)) {
        return originalOpen.call(window, url, target, features);
      }

      // Check if URL is an ad network popunder/redirect
      const isAdUrl =
        urlStr.includes('al5sm.com') ||
        urlStr.includes('quge5.com') ||
        urlStr.includes('3nbf4.com') ||
        urlStr.includes('abscloud.org') ||
        urlStr.includes('bauval.org') ||
        urlStr.includes('exdynsrv.com') ||
        urlStr.includes('highperformancegate.com') ||
        urlStr.includes('deloplen.com') ||
        urlStr.includes('onclickalgo.com') ||
        urlStr.includes('go.pub2srv.com') ||
        urlStr.includes('/act/files/');

      if (isAdUrl || urlStr === '' || urlStr === 'about:blank') {
        console.debug('[AdsGuard] Suppressed unauthorized ad redirect/popunder:', url);
        return null;
      }

      return originalOpen.call(window, url, target, features);
    };

    // Guard synthetic anchor clicks created by ad scripts
    HTMLAnchorElement.prototype.click = function () {
      const href = this.getAttribute('href') || '';
      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      const isLocalHost = isExternal && href.includes(window.location.host);
      const isSmartlink = href.includes('uplcm.com/4/12127029');

      if (isExternal && !isLocalHost && !isSmartlink) {
        console.debug('[AdsGuard] Suppressed synthetic external anchor click:', href);
        return;
      }
      return originalAnchorClick.call(this);
    };

    // Guard synthetic form submissions created by ad scripts
    HTMLFormElement.prototype.submit = function () {
      const action = this.getAttribute('action') || '';
      if (action.startsWith('http://') || action.startsWith('https://')) {
        console.debug('[AdsGuard] Suppressed synthetic form submit to external URL:', action);
        return;
      }
      return originalFormSubmit.call(this);
    };

    return () => {
      window.open = originalOpen;
      HTMLAnchorElement.prototype.click = originalAnchorClick;
      HTMLFormElement.prototype.submit = originalFormSubmit;
    };
  }, []);

  return (
    <>
      {/* Monetag In-Page Push / MultiTag (Zone: 302292) */}
      <Script
        id="monetag-inpage-tag"
        strategy="lazyOnload"
        src="https://quge5.com/88/tag.min.js"
        data-zone="302292"
        data-cfasync="false"
      />
    </>
  );
}
