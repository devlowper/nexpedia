'use client';

import { useEffect, useRef } from 'react';

/**
 * MonetagGlobals
 * Renders the global Monetag In-Page Push ad tag cleanly without blocking UI navigation or logins.
 */
export function MonetagGlobals() {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    try {
      const scriptSrc = 'https://nap5k.com/tag.min.js';
      const zoneId = '12127646';

      // Ensure script isn't added multiple times
      if (!document.querySelector(`script[src="${scriptSrc}"][data-zone="${zoneId}"]`)) {
        const s = document.createElement('script');
        s.src = scriptSrc;
        s.dataset.zone = zoneId;
        s.async = true;
        (document.documentElement || document.body).appendChild(s);
      }
    } catch (err) {
      console.debug('Monetag In-Page Push init:', err);
    }
  }, []);

  return null;
}
