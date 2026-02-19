import { useEffect, useRef, useState } from "react";

/**
 * Returns { ref, revealed } — attach ref to the section wrapper.
 * `revealed` becomes true once the element enters the viewport.
 * Observes once (no re-hiding on scroll out).
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true); // fallback: show immediately
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
