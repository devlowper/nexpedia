"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  variant = "slide-up",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
