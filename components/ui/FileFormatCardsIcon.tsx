import React from 'react';

export function FileFormatCardsIcon({ className = "w-56 h-38" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 260 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Clean neutral paper drop shadow without glow */}
          <filter id="line-card-shadow" x="-20%" y="-15%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.07" />
          </filter>
        </defs>

        {/* ════════════════════════════════════════════════════════
            CARD 1: .png (Back / Left, tilted -14 deg)
            PNG Line Icon: Line art image frame, sun, mountains & transparency grid
        ════════════════════════════════════════════════════════ */}
        <g transform="translate(30, 24) rotate(-14 42 58)" filter="url(#line-card-shadow)">
          {/* Card Sheet with folded top-right dog-ear corner */}
          <path
            d="M 12 0 L 58 0 L 84 26 L 84 104 A 12 12 0 0 1 72 116 L 12 116 A 12 12 0 0 1 0 104 L 0 12 A 12 12 0 0 1 12 0 Z"
            className="fill-white dark:fill-[#181316]"
            stroke="var(--brand-solid)"
            strokeWidth="1.6"
          />
          {/* Dog-ear fold */}
          <path
            d="M 58 0 L 58 18 A 8 8 0 0 0 66 26 L 84 26 Z"
            className="fill-[#FCE7F0] dark:fill-[#2d1a24]"
            stroke="var(--brand-solid)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* ── PNG LINE ICON ── */}
          <g>
            {/* Outline Image Frame */}
            <rect
              x="18"
              y="33"
              width="48"
              height="36"
              rx="6"
              fill="none"
              stroke="var(--brand-solid)"
              strokeWidth="1.8"
            />

            {/* PNG Transparency 2x2 Checkerboard in Line Art */}
            <rect x="22.5" y="37.5" width="4.5" height="4.5" rx="1" fill="var(--brand-solid)" />
            <rect x="27" y="37.5" width="4.5" height="4.5" rx="1" fill="none" stroke="var(--brand-solid)" strokeWidth="1" />
            <rect x="22.5" y="42" width="4.5" height="4.5" rx="1" fill="none" stroke="var(--brand-solid)" strokeWidth="1" />
            <rect x="27" y="42" width="4.5" height="4.5" rx="1" fill="var(--brand-solid)" />

            {/* Line Sun */}
            <circle cx="53" cy="42" r="3.5" fill="none" stroke="var(--brand-solid)" strokeWidth="1.6" />

            {/* Line Mountain Curves */}
            <path
              d="M 23 61 L 34 49 L 43 58 L 49 52 L 60 61"
              stroke="var(--brand-solid)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* Extension Label */}
          <text
            x="20"
            y="100"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="800"
            fill="var(--brand-solid)"
            letterSpacing="-0.5"
          >
            .png
          </text>
        </g>

        {/* ════════════════════════════════════════════════════════
            CARD 2: .jpg (Middle, center, tilted -2 deg)
            JPG Line Icon: Line art photo frame, radiant sun & twin mountain peaks
        ════════════════════════════════════════════════════════ */}
        <g transform="translate(88, 12) rotate(-2 42 58)" filter="url(#line-card-shadow)">
          {/* Card Sheet with folded top-right dog-ear corner */}
          <path
            d="M 12 0 L 58 0 L 84 26 L 84 104 A 12 12 0 0 1 72 116 L 12 116 A 12 12 0 0 1 0 104 L 0 12 A 12 12 0 0 1 12 0 Z"
            className="fill-white dark:fill-[#181316]"
            stroke="var(--brand-solid)"
            strokeWidth="1.6"
          />
          {/* Dog-ear fold */}
          <path
            d="M 58 0 L 58 18 A 8 8 0 0 0 66 26 L 84 26 Z"
            className="fill-[#FCE7F0] dark:fill-[#2d1a24]"
            stroke="var(--brand-solid)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* ── JPG LINE ICON ── */}
          <g>
            {/* Outline Photo Frame */}
            <rect
              x="18"
              y="33"
              width="48"
              height="36"
              rx="6"
              fill="none"
              stroke="var(--brand-solid)"
              strokeWidth="1.8"
            />

            {/* Line Sun */}
            <circle cx="31" cy="43" r="4.2" fill="none" stroke="var(--brand-solid)" strokeWidth="1.8" />

            {/* Dual Line Mountain Peaks */}
            <path
              d="M 23 61 L 36 45 L 47 57"
              stroke="var(--brand-solid)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 43 53 L 50 46 L 61 59"
              stroke="var(--brand-solid)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Ground Line */}
            <line
              x1="23"
              y1="61"
              x2="61"
              y2="61"
              stroke="var(--brand-solid)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* Extension Label */}
          <text
            x="20"
            y="100"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="800"
            fill="var(--brand-solid)"
            letterSpacing="-0.5"
          >
            .jpg
          </text>
        </g>

        {/* ════════════════════════════════════════════════════════
            CARD 3: .webp (Front / Right, tilted +11 deg)
            WEBP Line Icon: Line art web frame, globe coordinates & sparkle
        ════════════════════════════════════════════════════════ */}
        <g transform="translate(146, 20) rotate(11 42 58)" filter="url(#line-card-shadow)">
          {/* Card Sheet with folded top-right dog-ear corner */}
          <path
            d="M 12 0 L 58 0 L 84 26 L 84 104 A 12 12 0 0 1 72 116 L 12 116 A 12 12 0 0 1 0 104 L 0 12 A 12 12 0 0 1 12 0 Z"
            className="fill-white dark:fill-[#181316]"
            stroke="var(--brand-solid)"
            strokeWidth="1.6"
          />
          {/* Dog-ear fold */}
          <path
            d="M 58 0 L 58 18 A 8 8 0 0 0 66 26 L 84 26 Z"
            className="fill-[#FCE7F0] dark:fill-[#2d1a24]"
            stroke="var(--brand-solid)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* ── WEBP LINE ICON ── */}
          <g>
            {/* Outline Web Frame */}
            <rect
              x="18"
              y="33"
              width="48"
              height="36"
              rx="6"
              fill="none"
              stroke="var(--brand-solid)"
              strokeWidth="1.8"
            />

            {/* Line Web Globe */}
            <circle cx="42" cy="51" r="10.5" stroke="var(--brand-solid)" strokeWidth="1.8" fill="none" />
            <ellipse cx="42" cy="51" rx="4.6" ry="10.5" stroke="var(--brand-solid)" strokeWidth="1.3" fill="none" />
            <line x1="31.5" y1="51" x2="52.5" y2="51" stroke="var(--brand-solid)" strokeWidth="1.3" strokeLinecap="round" />

            {/* Next-Gen Sparkle Star in line/accent */}
            <path
              d="M 55 37 L 56.5 40.5 L 60 42 L 56.5 43.5 L 55 47 L 53.5 43.5 L 50 42 L 53.5 40.5 Z"
              fill="var(--brand-solid)"
            />
          </g>

          {/* Extension Label */}
          <text
            x="17"
            y="100"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="800"
            fill="var(--brand-solid)"
            letterSpacing="-0.5"
          >
            .webp
          </text>
        </g>
      </svg>
    </div>
  );
}
