'use client';

import React, { useState, useEffect } from "react";

/**
 * Monetag Ads Configuration & Helpers
 * 4 Direct Smartlinks rotated evenly across high-intent monetization buttons:
 * 1. https://uplcm.com/4/12127029
 * 2. https://uplcm.com/4/12155084
 * 3. https://uplcm.com/4/12155091
 * 4. https://uplcm.com/4/12156082
 */

export const DIRECT_LINKS = [
  "https://uplcm.com/4/12127029",
  "https://uplcm.com/4/12155084",
  "https://uplcm.com/4/12155091",
  "https://uplcm.com/4/12156082",
] as const;

export const MONETAG_SMARTLINK = DIRECT_LINKS[0];

let currentLinkIdx = 0;

/**
 * Returns the next direct link in round-robin fashion.
 */
export function getNextDirectLink(): string {
  const link = DIRECT_LINKS[currentLinkIdx % DIRECT_LINKS.length];
  currentLinkIdx++;
  return link;
}

/**
 * Opens a direct link in a new tab safely using native simulated anchor click
 * to avoid browser popup blockers.
 */
export function triggerMonetagSmartlink(customUrl?: string) {
  if (typeof window === "undefined") return;
  const url = customUrl || getNextDirectLink();
  try {
    const win = window.open(url, "_blank");
    if (!win) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer sponsored";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (_) {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer sponsored";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.warn("Direct link trigger error", err);
    }
  }
}

// In-memory set of buttons/cards that have already triggered their 1st click ad in this session
const clickedEntities = new Set<string>();

/**
 * Two-Click Card / Button Ad Pattern:
 * - 1st click: Triggers direct link ad in a new tab, marks as clicked.
 * - 2nd click: Navigates to or opens the original destination link.
 */
export function handleTwoClickAd(
  e: React.MouseEvent,
  id: string,
  originalUrl?: string
) {
  if (typeof window === "undefined") return;

  const sessionKey = `pc_ad_clicked_${id}`;
  const alreadyClicked =
    clickedEntities.has(id) ||
    (typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(sessionKey) === "1");

  if (!alreadyClicked) {
    // 1st click: Trigger ad in a new tab & prevent default navigation
    e.preventDefault();
    clickedEntities.add(id);
    try {
      sessionStorage.setItem(sessionKey, "1");
    } catch (_) {}

    triggerMonetagSmartlink();
  } else {
    // 2nd click: reset state and allow navigation to original link
    clickedEntities.delete(id);
    try {
      sessionStorage.removeItem(sessionKey);
    } catch (_) {}

    const target = e.currentTarget;
    const isAnchorWithHref =
      target instanceof HTMLAnchorElement &&
      Boolean(target.href) &&
      !target.href.endsWith("#");

    if (!isAnchorWithHref && originalUrl) {
      triggerMonetagSmartlink(originalUrl);
    }
  }
}

/**
 * TwoClickLink Component:
 * Bulletproof 2-click affiliate component.
 * - 1st click: Native <a> click pointing to rotated Monetag direct link in a new tab (100% bypasses popup blockers).
 * - 2nd click: Native <a> click pointing to original destination (internal route or external partner URL).
 * - Cycles back on subsequent clicks.
 */
export interface TwoClickLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  originalHref: string;
  originalTarget?: string;
  isInternal?: boolean;
  customAdUrl?: string;
  entityId?: string;
}

export function TwoClickLink({
  originalHref,
  originalTarget = "_blank",
  isInternal = false,
  customAdUrl,
  entityId,
  children,
  onClick,
  ...props
}: TwoClickLinkProps) {
  const [hasClickedAd, setHasClickedAd] = useState(() => {
    if (entityId && clickedEntities.has(entityId)) return true;
    return false;
  });

  const adUrl = customAdUrl || getNextDirectLink();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (!hasClickedAd) {
      // 1st click: Browser natively opens activeHref (adUrl) in a new tab
      // Delay state flip slightly so browser navigation is cleanly dispatched
      if (entityId) {
        clickedEntities.add(entityId);
      }
      setTimeout(() => {
        setHasClickedAd(true);
      }, 150);
    } else {
      // 2nd click: Browser navigates to originalHref
      if (entityId) {
        clickedEntities.delete(entityId);
      }
      setTimeout(() => {
        setHasClickedAd(false);
      }, 1000);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const activeHref = hasClickedAd ? originalHref : adUrl;
  const activeTarget = hasClickedAd ? (isInternal ? "_self" : originalTarget) : "_blank";

  return (
    <a
      href={activeHref}
      target={activeTarget}
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
