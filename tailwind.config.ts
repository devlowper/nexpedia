import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: "var(--brand-solid)",
        "accent-hover": "var(--brand-solid-hover)",
        "accent-dim": "rgba(255,51,102,0.15)",
        // Clean mappings for standard utilities
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
        // Keep existing mappings for backward compatibility
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        "border": "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bricolage: ["var(--font-bricolage)", "'Bricolage Grotesque'", "sans-serif"],
      },
      animation: {
        "scroll-left": "scrollLeft 35s linear infinite",
        "scroll-right": "scrollRight 28s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        scrollLeft: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        scrollRight: { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        }
      },
    },
  },
  plugins: [],
};

export default config;
