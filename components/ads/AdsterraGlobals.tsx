'use client';

import Script from 'next/script';

/**
 * AdsterraGlobals loads background popunder only.
 * Social Bar is removed from global layout to prevent floating over the Navbar/Header.
 */
export function AdsterraGlobals() {
  return (
    <>
      {/* Adsterra Popunder */}
      <Script
        id="adsterra-popunder"
        strategy="lazyOnload"
        src="https://abscloud.org/1/f219b5f6fd3f336c5d4e43cbae9af7fb"
        data-cfasync="false"
      />
    </>
  );
}

/**
 * Optional Social Bar component only for specific blog article pages if desired.
 * Never mounted in global layout or near the navbar.
 */
export function AdsterraSocialBar() {
  return (
    <Script
      id="adsterra-social-bar"
      strategy="lazyOnload"
      src="https://bauval.org/14/d71297f42cc7c48831ed485c17555ade"
      data-cfasync="false"
    />
  );
}
