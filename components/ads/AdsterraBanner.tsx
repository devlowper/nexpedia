'use client';

import React, { useEffect, useRef } from 'react';

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
 * Sandboxed Adsterra Banner component using an isolated iframe.
 * Prevents document.write crashes in Next.js/React and avoids variable collisions.
 */
export function AdsterraBanner({
  format,
  className = '',
  showLabel = true,
}: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = AD_CONFIGS[format];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous iframe on re-render / route change
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = `${config.width}`;
    iframe.height = `${config.height}`;
    iframe.style.width = `${config.width}px`;
    iframe.style.height = `${config.height}px`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', `Advertisement ${format}`);

    container.appendChild(iframe);

    try {
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { box-sizing: border-box; }
                html, body {
                  margin: 0;
                  padding: 0;
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  width: 100%;
                  height: 100%;
                }
              </style>
            </head>
            <body>
              <script type="text/javascript">
                atOptions = {
                  'key' : '${config.key}',
                  'format' : 'iframe',
                  'height' : ${config.height},
                  'width' : ${config.width},
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://bauval.org/22/${config.key}"></script>
            </body>
          </html>
        `);
        doc.close();
      }
    } catch (err) {
      console.warn('Adsterra iframe initialization warning:', err);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [format, config.key, config.width, config.height]);

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
        <div ref={containerRef} style={{ width: config.width, height: config.height }} />
      </div>
    </div>
  );
}

/**
 * Responsive banner: Renders 728x90 on Desktop/Tablet and 320x50 on Mobile.
 * Completely eliminates mobile horizontal scroll/overflow issues.
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
      {/* Mobile: 320x50 */}
      <div className="flex md:hidden justify-center w-full">
        <AdsterraBanner format="320x50" showLabel={showLabel} />
      </div>
    </div>
  );
}

/**
 * Native Banner widget container.
 * Loads the Adsterra native banner securely inside an isolated sandboxed iframe.
 * Never pollutes top-level document.body with external scripts.
 */
export function AdsterraNativeBanner({
  className = '',
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '160px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', 'Sponsored Recommendations');

    container.appendChild(iframe);

    try {
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                html, body {
                  background: transparent;
                  width: 100%;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              </style>
            </head>
            <body>
              <div id="container-e1f6812d1a6a17f547fa2eea499f1732" style="width:100%; display:flex; justify-content:center;"></div>
              <script async="async" data-cfasync="false" src="https://bauval.org/21/e1f6812d1a6a17f547fa2eea499f1732"></script>
            </body>
          </html>
        `);
        doc.close();
      }
    } catch (err) {
      console.warn('Native ad initialization warning:', err);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 ${className}`}>
      {showLabel && (
        <span className="text-[10px] uppercase tracking-widest text-muted/50 mb-2 font-medium">
          Sponsored Recommendations
        </span>
      )}
      <div className="w-full max-w-5xl rounded-2xl p-2 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 min-h-[160px] flex items-center justify-center">
        <div ref={containerRef} className="w-full flex justify-center" />
      </div>
    </div>
  );
}
