// src/styles/theme.js
// Thème centralisé pour tout le portfolio

/* ===== Ratio d'or (Golden Ratio) ===== */
export const PHI = 1.618;
export const INV_PHI = 1 / PHI; // ≈ 0.618
export const INV_PHI_2 = INV_PHI * INV_PHI; // ≈ 0.382

/* ===== Couleurs principales ===== */
export const COLORS = {
  // Backgrounds
  bg: {
    primary: "#0b1020",
    secondary: "#080d18",
    card: "rgba(11,16,32,0.78)",
    glass: "rgba(15,23,42,0.65)",
  },

  // Textes
  text: {
    primary: "#E6ECF8",
    secondary: "#9AA7BF",
    muted: "#64748b",
  },

  // Bordures
  border: {
    light: "rgba(255,215,0,0.12)",
    medium: "rgba(255,255,255,0.15)",
    gold: "rgba(212,175,55,0.35)",
  },

  // Accents / Brand
  brand: {
    cyan: "#22d3ee",
    purple: "#a855f7",
    gold: "#d4af37",
    blue: "#60a5fa",
  },

  // États
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
};

/* ===== Gradients prédéfinis ===== */
export const GRADIENTS = {
  line: "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
  
  cardBg: "linear-gradient(135deg, rgba(14,20,38,.50), rgba(8,12,24,.50))",
  
  brandHorizontal: "linear-gradient(90deg, #22d3ee, #a855f7, #f59e0b)",
  
  radialGlow: "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)",
  
  glass: "linear-gradient(180deg, rgba(15,23,42,0.65), rgba(2,6,23,0.65))",
};

/* ===== Espacements (basés sur le ratio d'or) ===== */
export const SPACING = {
  xs: `${0.25 * PHI}rem`,    // ~0.4rem
  sm: `${0.5 * PHI}rem`,     // ~0.8rem
  md: `${1 * PHI}rem`,       // ~1.6rem
  lg: `${1.5 * PHI}rem`,     // ~2.4rem
  xl: `${2 * PHI}rem`,       // ~3.2rem
  "2xl": `${3 * PHI}rem`,    // ~4.8rem
};

/* ===== Tailles de police responsive ===== */
export const FONT_SIZES = {
  xs: "clamp(0.7rem, 1.5vw, 0.85rem)",
  sm: "clamp(0.85rem, 1.8vw, 1rem)",
  base: "clamp(1rem, 2vw, 1.125rem)",
  lg: "clamp(1.125rem, 2.5vw, 1.5rem)",
  xl: "clamp(1.5rem, 3vw, 2rem)",
  "2xl": "clamp(1.8rem, 4vw, 2.5rem)",
  "3xl": "clamp(2rem, 5vw, 3rem)",
  "4xl": "clamp(2.5rem, 6vw, 4rem)",
};

/* ===== Ombres ===== */
export const SHADOWS = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.15)",
  xl: "0 20px 25px rgba(0,0,0,0.2)",
  "2xl": "0 25px 50px rgba(0,0,0,0.25)",
  
  glow: {
    cyan: "0 0 20px rgba(34,211,238,0.3)",
    purple: "0 0 20px rgba(168,85,247,0.3)",
    gold: "0 0 20px rgba(212,175,55,0.3)",
  },
};

/* ===== Bordures arrondies ===== */
export const RADIUS = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  full: "9999px",
};

/* ===== Transitions ===== */
export const TRANSITIONS = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "600ms cubic-bezier(0.16, 1, 0.3, 1)",
};

/* ===== Z-index hiérarchie ===== */
export const Z_INDEX = {
  background: 0,
  content: 10,
  header: 100,
  overlay: 110,
  modal: 120,
  toast: 130,
  tooltip: 140,
};

/* ===== Breakpoints (sync avec Tailwind) ===== */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/* ===== Helper: appliquer le thème ===== */
export const applyTheme = (customTheme = {}) => {
  return {
    colors: { ...COLORS, ...customTheme.colors },
    gradients: { ...GRADIENTS, ...customTheme.gradients },
    spacing: { ...SPACING, ...customTheme.spacing },
    fontSize: { ...FONT_SIZES, ...customTheme.fontSize },
    shadows: { ...SHADOWS, ...customTheme.shadows },
    radius: { ...RADIUS, ...customTheme.radius },
    transitions: { ...TRANSITIONS, ...customTheme.transitions },
    zIndex: { ...Z_INDEX, ...customTheme.zIndex },
  };
};

/* ===== Export par défaut ===== */
export default {
  PHI,
  INV_PHI,
  INV_PHI_2,
  colors: COLORS,
  gradients: GRADIENTS,
  spacing: SPACING,
  fontSize: FONT_SIZES,
  shadows: SHADOWS,
  radius: RADIUS,
  transitions: TRANSITIONS,
  zIndex: Z_INDEX,
  breakpoints: BREAKPOINTS,
};