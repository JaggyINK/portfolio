// src/styles/breakpoints.js
// Points de rupture responsive (sync avec Tailwind)

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/* ===== Media queries helper ===== */
export const media = {
  xs: `@media (min-width: ${BREAKPOINTS.xs}px)`,
  sm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  md: `@media (min-width: ${BREAKPOINTS.md}px)`,
  lg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  "2xl": `@media (min-width: ${BREAKPOINTS["2xl"]}px)`,
  
  // Max width (mobile first)
  maxXs: `@media (max-width: ${BREAKPOINTS.xs - 1}px)`,
  maxSm: `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  maxMd: `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  maxLg: `@media (max-width: ${BREAKPOINTS.lg - 1}px)`,
  maxXl: `@media (max-width: ${BREAKPOINTS.xl - 1}px)`,
  
  // Orientation
  portrait: "@media (orientation: portrait)",
  landscape: "@media (orientation: landscape)",
  
  // Interactions
  hover: "@media (hover: hover) and (pointer: fine)",
  touch: "@media (hover: none) and (pointer: coarse)",
  
  // Préférences
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
  darkMode: "@media (prefers-color-scheme: dark)",
};

/* ===== Helper: check if mobile ===== */
export const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.md;
};

/* ===== Helper: check if tablet ===== */
export const isTablet = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
};

/* ===== Helper: check if desktop ===== */
export const isDesktop = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= BREAKPOINTS.lg;
};

/* ===== Helper: get current breakpoint ===== */
export const getCurrentBreakpoint = () => {
  if (typeof window === "undefined") return "md";
  
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.xs) return "xs";
  if (width < BREAKPOINTS.sm) return "sm";
  if (width < BREAKPOINTS.md) return "md";
  if (width < BREAKPOINTS.lg) return "lg";
  if (width < BREAKPOINTS.xl) return "xl";
  return "2xl";
};

export default {
  BREAKPOINTS,
  media,
  isMobile,
  isTablet,
  isDesktop,
  getCurrentBreakpoint,
};