'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';

export interface CometButtonProps {
  /** The content inside the button (e.g. text, icons). Default: 'Get Start' */
  children?: React.ReactNode;
  /** Click handler for button or link */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Optional link URL. If provided, renders as an anchor/Link */
  href?: string;
  /** Link target (e.g. '_blank', '_self'). Auto adds rel="noopener noreferrer" when '_blank' */
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  /** Custom rel attribute for links */
  rel?: string;
  /** HTML element ID for testing/access */
  id?: string;
  /** Additional custom class names */
  className?: string;
  /** Button type if rendered as button */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;

  // --- 1. 4 Gradient Colors (Comet Trail) ---
  /**
   * 4 gradient colors defining the comet trail from tail to head.
   * Default: ['#38bdf8', '#818cf8', '#c084fc', '#ff3366']
   * (Electric Blue -> Indigo -> Violet -> Hot Pink with White Core)
   */
  gradientColors?: [string, string, string, string];

  // --- 2. Rotation Speed, Halo Blur, Spread, Opacity ---
  /** Normal rotation speed in seconds per full 360 loop. Default: 4.0 */
  rotationSpeed?: number;
  /** Accelerated rotation speed when hovered in seconds per loop. Default: 1.6 */
  hoverRotationSpeed?: number;
  /** Halo blur amount in px. Default: 16 */
  haloBlur?: number;
  /** Halo spread expansion in px. Default: 4 */
  haloSpread?: number;
  /** Default halo opacity when not hovered. Default: 0.7 */
  haloOpacity?: number;
  /** Halo opacity when hovered. Default: 1.0 */
  hoverHaloOpacity?: number;

  // --- 3. Border Thickness & Corner Radius ---
  /** Border thickness in px. Default: 1.75 */
  borderWidth?: number;
  /** Corner radius (e.g. '9999px' for pill, '12px' for boxy). Default: '9999px' */
  borderRadius?: string;

  // --- 4. Hover Scale & Background Color ---
  /** Scale factor applied on hover. Default: 1.05 */
  hoverScale?: number;
  /** Button resting background color. Default: '#0b0c10' */
  backgroundColor?: string;
  /** Button hover background color. Default: '#13141c' */
  hoverBackgroundColor?: string;

  // --- 5. Font, Text Color, Padding ---
  /** Text color at rest. Default: '#ffffff' */
  textColor?: string;
  /** Text color on hover. Default: '#ffffff' */
  hoverTextColor?: string;
  /** Font size (e.g. '0.875rem' or '14px'). Default: '0.875rem' */
  fontSize?: string;
  /** Font weight. Default: 600 */
  fontWeight?: string | number;
  /** Font family or class name (e.g. 'font-bricolage' or '') */
  fontClassName?: string;
  /** Internal padding. Default: '0.45rem 1.35rem' */
  padding?: string;

  // --- 6. Glow & Halo Toggle ---
  /** If true, enables the outer halo layer. Default: false to keep the background clean */
  enableHalo?: boolean;
  /** If true, the soft halo glow is always visible and flares on hover; if false, only appears on hover. Default: false */
  glowAlwaysOn?: boolean;

  // --- 7. Accessibility ---
  /** Respect prefers-reduced-motion to stop rotation for users with vestibular sensitivity. Default: true */
  respectReducedMotion?: boolean;
}

/**
 * CometButton: A high-performance, fully customizable Pill Button
 * with a thin comet of light chasing itself around the border forever.
 */
export const CometButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, CometButtonProps>(
  (
    {
      children = 'Get Start',
      onClick,
      href,
      target,
      rel,
      id,
      className = '',
      type = 'button',
      disabled = false,

      // 1. 4 gradient colors (Electric Blue -> Indigo -> Violet -> Hot Pink)
      gradientColors = ['#38bdf8', '#818cf8', '#c084fc', '#ff3366'],

      // 2. Rotation & Halo
      rotationSpeed = 4.0,
      hoverRotationSpeed = 1.6,
      haloBlur = 16,
      haloSpread = 4,
      haloOpacity = 0.7,
      hoverHaloOpacity = 1.0,

      // 3. Border & Radius
      borderWidth = 1.75,
      borderRadius = '9999px',

      // 4. Hover Scale & Background
      hoverScale = 1.05,
      backgroundColor = '#0b0c10',
      hoverBackgroundColor = '#141520',

      // 5. Typography & Padding
      textColor = '#ffffff',
      hoverTextColor = '#ffffff',
      fontSize = '0.875rem',
      fontWeight = 600,
      fontClassName = '',
      padding = '0.45rem 1.35rem',

      // 6. Halo Toggle (disabled by default to prevent unwanted background shapes)
      enableHalo = false,
      glowAlwaysOn = false,

      // 7. Accessibility
      respectReducedMotion = true,
    },
    forwardedRef
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const shouldDisableMotion = respectReducedMotion && prefersReducedMotion;

    // Continuous rotation angle maintained with requestAnimationFrame
    // to prevent any jumping or stutter when hovering/unhovering.
    const rotateAngle = useMotionValue(0);
    const angleRef = useRef(0);
    const isHoveredRef = useRef(isHovered);
    isHoveredRef.current = isHovered;

    useEffect(() => {
      if (shouldDisableMotion) {
        rotateAngle.set(90);
        return;
      }

      let animationFrameId: number;
      let lastTime = performance.now();

      const animate = (now: number) => {
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const currentSpeedSec = isHoveredRef.current ? hoverRotationSpeed : rotationSpeed;
        const degreesPerSecond = 360 / Math.max(currentSpeedSec, 0.1);

        angleRef.current = (angleRef.current + degreesPerSecond * delta) % 360;
        rotateAngle.set(angleRef.current);

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }, [shouldDisableMotion, rotationSpeed, hoverRotationSpeed, rotateAngle]);

    // Build the rich conic gradient string:
    // Starts with a fading tail (blue -> indigo -> violet -> hot pink),
    // reaches a pure brilliant white-hot comet core head, then cleanly falls off into darkness.
    const [c1, c2, c3, c4] = gradientColors;
    const cometGradient = `conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      transparent 15deg,
      ${c1} 45deg,
      ${c2} 75deg,
      ${c3} 105deg,
      ${c4} 130deg,
      #ffffff 138deg,
      transparent 145deg,
      transparent 360deg
    )`;

    // Compute effective halo opacity
    const currentHaloOpacity = disabled
      ? 0
      : isHovered
      ? hoverHaloOpacity
      : glowAlwaysOn
      ? haloOpacity
      : 0;

    // Target rel attribute
    const computedRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

    const content = (
      <>
        {/* Layer 0: Static subtle dark border base track */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none border border-white/10 dark:border-white/10"
          style={{ borderRadius }}
        />

        {/* Layer 1: Optional Soft Halo (only rendered if explicitly enabled) */}
        {enableHalo && currentHaloOpacity > 0 && (
          <div
            aria-hidden="true"
            className="absolute pointer-events-none transition-all duration-300 ease-out"
            style={{
              inset: `-${haloSpread}px`,
              filter: `blur(${isHovered ? haloBlur * 1.3 : haloBlur}px)`,
              opacity: currentHaloOpacity,
            }}
          >
            <div
              className="w-full h-full overflow-hidden"
              style={{ borderRadius }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '320%',
                  height: '320%',
                  marginLeft: '-160%',
                  marginTop: '-160%',
                  background: cometGradient,
                  rotate: rotateAngle,
                }}
              />
            </div>
          </div>
        )}

        {/* Layer 2: Ultra-Crisp Moving Border Track */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: '320%',
              height: '320%',
              marginLeft: '-160%',
              marginTop: '-160%',
              background: cometGradient,
              rotate: rotateAngle,
            }}
          />
        </div>

        {/* Layer 3: Solid Interactive Core Surface with Typography */}
        <span
          className={`relative z-10 w-full h-full flex items-center justify-center gap-2 select-none transition-colors duration-250 ${fontClassName}`}
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
            color: isHovered ? hoverTextColor : textColor,
            padding,
            fontSize,
            fontWeight,
          }}
        >
          {children}
        </span>
      </>
    );

    const commonMotionProps = {
      id,
      className: `relative inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`,
      style: {
        borderRadius,
        padding: `${borderWidth}px`,
      },
      onMouseEnter: () => !disabled && setIsHovered(true),
      onMouseLeave: () => !disabled && setIsHovered(false),
      whileHover: !disabled ? { scale: hoverScale } : undefined,
      whileTap: !disabled ? { scale: 0.96 } : undefined,
      transition: { type: 'spring' as const, stiffness: 450, damping: 25 },
    };

    if (href) {
      return (
        <motion.div {...commonMotionProps}>
          <Link
            ref={forwardedRef as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={computedRel}
            onClick={onClick}
            className="w-full h-full flex items-center justify-center text-inherit no-underline"
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={forwardedRef as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...commonMotionProps}
      >
        {content}
      </motion.button>
    );
  }
);

CometButton.displayName = 'CometButton';

export default CometButton;
