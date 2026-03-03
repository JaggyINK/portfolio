// src/components/ScrollHint.jsx
// Composant partagé : hint "scroll down" cliquable + bouton "back to top"
import React from "react";

/**
 * Flèche "Faites défiler pour découvrir" → scroll vers la section suivante.
 * @param {{ targetId: string }} props
 */
export function ScrollDownHint({ targetId }) {
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="group flex flex-col items-center mx-auto mt-8 mb-2 cursor-pointer"
    >
      <span className="text-[0.7rem] font-light tracking-wide text-slate-400/70 transition-colors group-hover:text-slate-200">
        Faites défiler pour découvrir
      </span>
      <svg
        className="w-4 h-4 mt-1.5 text-[#d4af37]/60 transition-all group-hover:text-[#d4af37] group-hover:translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

/**
 * Bouton "retour en haut" aligné à droite.
 */
export function BackToTop() {
  return (
    <div className="flex justify-end mt-8 mb-2 pr-2">
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("hero");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:bg-white/[0.08] hover:border-[#22d3ee]/30 cursor-pointer"
      >
        <span className="text-[0.7rem] font-medium text-slate-400/80 transition-colors group-hover:text-slate-200">
          Retour en haut
        </span>
        <svg
          className="w-4 h-4 text-[#22d3ee]/60 transition-all group-hover:text-[#22d3ee] group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
