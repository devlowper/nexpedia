'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Selectors for UI elements that must NEVER trigger Monetag ads or redirects.
 */
const ADS_FREE_SELECTORS = [
  'nav',
  'nav *',
  'header',
  'header *',
  '[data-ads-free="true"]',
  '[data-ads-free="true"] *',
  '#navbar-login-btn',
  '#navbar-login-btn *',
  '#navbar-signup-btn',
  '#navbar-signup-btn *',
  '#navbar-hamburger-btn',
  '#navbar-hamburger-btn *',
  '#mobile-navbar-signup-btn',
  '#mobile-navbar-signup-btn *',
  '#auth-modal',
  '#auth-modal *',
  '[role="dialog"]',
  '[role="dialog"] *',
  '.ads-free',
  '.ads-free *',
];

/**
 * Helper to query all protected DOM elements
 */
function getProtectedElements(): Element[] {
  if (typeof document === 'undefined') return [];
  try {
    return Array.from(document.querySelectorAll(ADS_FREE_SELECTORS.join(',')));
  } catch (e) {
    return [];
  }
}

/**
 * Configure Monetag's internal exclusion lists so its OnClick engine
 * marks clicks on protected UI as excludedClick and completely skips ad opening.
 */
function setupMonetagExclusions() {
  if (typeof window === 'undefined') return;

  try {
    // Monetag checks window.onClickExcludes during its Ho() click-validation routine
    Object.defineProperty(window, 'onClickExcludes', {
      get: getProtectedElements,
      set: () => {},
      configurable: true,
      enumerable: true,
    });

    // Monetag checks window.stitialExcludes for interstitial / pop exclusions
    Object.defineProperty(window, 'stitialExcludes', {
      get: () => ADS_FREE_SELECTORS,
      set: () => {},
      configurable: true,
      enumerable: true,
    });

    // Fallback general excludes
    Object.defineProperty(window, 'excludes', {
      get: () => ADS_FREE_SELECTORS,
      set: () => {},
      configurable: true,
      enumerable: true,
    });
  } catch (e) {
    console.debug('Monetag exclusion setup notice:', e);
  }
}

// Run immediately upon script load if in browser
if (typeof window !== 'undefined') {
  setupMonetagExclusions();
}

/**
 * Monetag Global Ad Scripts with Multi-Layer Ads-Free Protection
 * Guarantees Navigation Bar, Login/Signup Buttons, Hamburger Menu, and Auth Modal are 100% ad-free.
 */
export function MonetagGlobals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setupMonetagExclusions();

    const originalOpen = window.open;
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    const originalFormSubmit = HTMLFormElement.prototype.submit;

    let isAdsFreeActive = false;
    let resetTimer: any = null;

    const isProtectedTarget = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;
      return !!target.closest(
        'nav, header, [data-ads-free="true"], #navbar-login-btn, #navbar-signup-btn, #navbar-hamburger-btn, #mobile-navbar-signup-btn, #auth-modal, #auth-modal-close, #auth-submit-btn, [role="dialog"], .ads-free'
      );
    };

    // Layer 1: Guard window.open to prevent ANY popunder or redirect from protected elements
    window.open = function (url?: string | URL, target?: string, features?: string) {
      if (isAdsFreeActive) {
        console.debug('[AdsFreeGuard] Suppressed window.open from protected UI click:', url);
        return null;
      }
      return originalOpen.call(window, url, target, features);
    };

    // Layer 2: Guard synthetic anchor clicks created by ad scripts
    HTMLAnchorElement.prototype.click = function () {
      if (isAdsFreeActive) {
        const href = this.getAttribute('href') || '';
        const isExternal = href.startsWith('http://') || href.startsWith('https://');
        const isLocalHost = isExternal && href.includes(window.location.host);

        if (isExternal && !isLocalHost) {
          console.debug('[AdsFreeGuard] Suppressed synthetic ad anchor click:', href);
          return;
        }
      }
      return originalAnchorClick.call(this);
    };

    // Layer 3: Guard synthetic form submissions created by ad scripts
    HTMLFormElement.prototype.submit = function () {
      if (isAdsFreeActive) {
        console.debug('[AdsFreeGuard] Suppressed synthetic form submit on protected click');
        return;
      }
      return originalFormSubmit.call(this);
    };

    // Mark interactions on protected areas in capture phase
    const handleCapture = (e: Event) => {
      if (isProtectedTarget(e.target)) {
        isAdsFreeActive = true;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          isAdsFreeActive = false;
        }, 800);
      }
    };

    const events = ['click', 'pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
    events.forEach((ev) => window.addEventListener(ev, handleCapture, true));

    return () => {
      window.open = originalOpen;
      HTMLAnchorElement.prototype.click = originalAnchorClick;
      HTMLFormElement.prototype.submit = originalFormSubmit;
      if (resetTimer) clearTimeout(resetTimer);
      events.forEach((ev) => window.removeEventListener(ev, handleCapture, true));
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

      {/* Monetag OnClick / Popunder Tag (Zone: 12127030) */}
      <Script
        id="monetag-onclick-tag"
        strategy="lazyOnload"
        src="https://al5sm.com/tag.min.js"
        data-zone="12127030"
        data-cfasync="false"
      />
    </>
  );
}
