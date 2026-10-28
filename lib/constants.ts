/**
 * Central application constants & SEO config
 */
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://procraft.site";
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://cdn.procraft.site";

export const SITE_CONFIG = {
  name: "ProCraft",
  fullName: "ProCraft | Prompt Library & Directory",
  description: "Discover 800+ curated AI prompts and verified tools for Midjourney, ChatGPT, FLUX & Stable Diffusion. Copy ready-to-use prompts with 1-click on ProCraft.",
  url: SITE_URL,
  imageBaseUrl: IMAGE_BASE_URL,
  ogImage: `${IMAGE_BASE_URL}/create-premium-speaker-grid-advertisements.avif`,
  logo: `${SITE_URL}/icon-512.png`,
  twitterHandle: "@procraft",
  themeColor: "#ff3366",
  backgroundColor: "#09090b",
};

