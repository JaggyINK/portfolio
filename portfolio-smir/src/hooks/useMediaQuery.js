// src/hooks/useMediaQuery.js
import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../styles/breakpoints";

/**
 * Hook pour détecter les media queries
 * @param {string} query - Media query CSS (ex: "(min-width: 768px)")
 * @returns {boolean} - true si la query matche
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    
    // Handler pour les changements
    const handleChange = (e) => setMatches(e.matches);
    
    // Initial check
    setMatches(mediaQuery.matches);
    
    // Écouter les changements (nouvelle API)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback pour anciens navigateurs
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

/**
 * Hook pour détecter si on est sur mobile
 * @returns {boolean}
 */
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/**
 * Hook pour détecter si on est sur tablette
 * @returns {boolean}
 */
export function useIsTablet() {
  const isTabletMin = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isTabletMax = useMediaQuery(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
  return isTabletMin && isTabletMax;
}

/**
 * Hook pour détecter si on est sur desktop
 * @returns {boolean}
 */
export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

/**
 * Hook pour détecter si l'appareil supporte le hover
 * @returns {boolean}
 */
export function useHasHover() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * Hook pour détecter si l'utilisateur préfère les animations réduites
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Hook pour obtenir le breakpoint actuel
 * @returns {"xs" | "sm" | "md" | "lg" | "xl" | "2xl"}
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (typeof window === "undefined") return "md";
    
    const width = window.innerWidth;
    if (width < BREAKPOINTS.xs) return "xs";
    if (width < BREAKPOINTS.sm) return "sm";
    if (width < BREAKPOINTS.md) return "md";
    if (width < BREAKPOINTS.lg) return "lg";
    if (width < BREAKPOINTS.xl) return "xl";
    return "2xl";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint = "md";
      
      if (width < BREAKPOINTS.xs) newBreakpoint = "xs";
      else if (width < BREAKPOINTS.sm) newBreakpoint = "sm";
      else if (width < BREAKPOINTS.md) newBreakpoint = "md";
      else if (width < BREAKPOINTS.lg) newBreakpoint = "lg";
      else if (width < BREAKPOINTS.xl) newBreakpoint = "xl";
      else newBreakpoint = "2xl";
      
      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    // Debounce pour optimiser les performances
    let timeoutId;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return breakpoint;
}

export default {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useHasHover,
  usePrefersReducedMotion,
  useBreakpoint,
};