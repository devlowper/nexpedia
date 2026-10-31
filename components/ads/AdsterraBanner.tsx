'use client';

import React, { useState, useEffect } from 'react';

export type AdsterraBannerFormat = '300x250' | '728x90' | '320x50';

interface AdConfig {
  key: string;
  width: number;
  height: number;
}

const AD_CONFIGS: Record<AdsterraBannerFormat, AdConfig> = {
  '300x250': {
    key: '88615c4e5be368454ba6b17c5765a7ac',
    width: 300,
    height: 250,
  },
  '728x90': {
    key: '5d110b3033a83acb645822e998ca0bd7',
    width: 728,
    height: 90,
  },
  '320x50': {
    key: '89a9ce1a35e7cd038522cc2061dd838a',
    width: 320,
    height: 50,
  },
};

interface AdsterraBannerProps {
  format: AdsterraBannerFormat;
  className?: string;
  showLabel?: boolean;
}

/**
 * Sandboxed Adsterra Banner component using an isolated iframe loaded from `/adsterra-frame.html`.
 * Loading through same-origin `/adsterra-frame.html` allows Adsterra's script to verify
 * document.location.hostname and run its official invoke.js loader.
 *
 * Using sandbox="allow-scripts allow-same-origin allow-popups allow-forms" ensures:
 * 1. The ad script has full DOM execution inside its isolated frame.
 * 2. Clicks on the banner open legitimate advertiser links in a new tab (allow-popups).
 * 3. Crucially, WITHOUT 'allow-top-navigation', Adsterra is PHYSICALLY PREVENTED
 *    from redirecting the top-level parent window or hijacking navigation!
 */
export function AdsterraBanner({
  format,
  className = '',
  showLabel = true,
}: AdsterraBannerProps) {
  const config = AD_CONFIGS[format];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const frameSrc = `/adsterra-frame.html?key=${config.key}&w=${config.width}&h=${config.height}`;

  return (
    <div className={`flex flex-col items-center justify-center my-6 select-none ${className}`}>
      {showLabel && (
        <span className="text-[10px] uppercase tracking-widest text-muted/50 mb-1.5 font-medium">
          Advertisement
        </span>
      )}
      <div
        className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] shadow-sm flex items-center justify-center transition-opacity"
        style={{ width: config.width, height: config.height }}
      >
        {mounted ? (
          <iframe
            src={frameSrc}
            width={config.width}
            height={config.height}
            style={{ width: `${config.width}px`, height: `${config.height}px`, border: 'none', overflow: 'hidden' }}
            scrolling="no"
            loading="lazy"
            title={`Advertisement ${format}`}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <div
            style={{ width: `${config.width}px`, height: `${config.height}px` }}
            className="flex items-center justify-center text-muted/30 text-xs"
          >
            Ad Loading...
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Responsive banner: Renders 728x90 on Desktop/Tablet and 300x250 on Mobile inside sandboxed iframes.
 */
export function AdsterraResponsiveBanner({
  className = '',
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={`w-full flex justify-center items-center overflow-hidden ${className}`}>
      {/* Desktop & Tablet: 728x90 */}
      <div className="hidden md:flex justify-center w-full">
        <AdsterraBanner format="728x90" showLabel={showLabel} />
      </div>
      {/* Mobile: 300x250 */}
      <div className="flex md:hidden justify-center w-full">
        <AdsterraBanner format="300x250" showLabel={showLabel} />
      </div>
    </div>
  );
}

/**
 * Native Banner widget container inside sandboxed iframe.
 */
export function AdsterraNativeBanner({
  className = '',
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 ${className}`}>
      {showLabel && (
        <span className="text-[10px] uppercase tracking-widest text-muted/50 mb-2 font-medium">
          Sponsored Recommendations
        </span>
      )}
      <div className="w-full max-w-5xl rounded-2xl p-2 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 min-h-[160px] flex items-center justify-center">
        {mounted ? (
          <iframe
            src="/adsterra-native.html"
            style={{ width: '100%', height: '160px', border: 'none', overflow: 'hidden' }}
            scrolling="no"
            loading="lazy"
            title="Sponsored Recommendations"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <div className="w-full h-[160px] flex items-center justify-center text-muted/30 text-xs">
            Sponsored Loading...
          </div>
        )}
      </div>
    </div>
  );
}
