/* ============================================================
   Thème partagé pour toutes les sections du portfolio classique
   ============================================================ */

export const PHI = 1.618;
export const INV = 1 / PHI;

export const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  gold: "#d4af37",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* Fond standard pour les sections */
export const SECTION_BG =
  "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
  "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)";

/* Padding standard basé sur φ */
export const SECTION_PADDING = `${INV * PHI * PHI}rem ${1.0 * PHI}rem`;

/* Max-width standard */
export const SECTION_MAX_W = `${48 * PHI}rem`;

/* Style de section standard (objet prêt à spreader) */
export const SECTION_STYLE = {
  background: SECTION_BG,
  backdropFilter: "blur(2px)",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  padding: SECTION_PADDING,
};

/* Header h2 standard */
export const HEADING_STYLE = {
  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
  fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
  lineHeight: 1.0 + INV,
  color: THEME.text,
};
