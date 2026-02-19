// src/components/LeftDockNav.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useMediaQuery";

const ITEMS = [
  { id: "hero",           label: "Accueil",               icon: "home" },
  { id: "about",          label: "À propos",              icon: "id" },
  { id: "bts",            label: "BTS SIO",               icon: "layers" },
  { id: "parcours",       label: "Mon parcours",          icon: "road" },
  { id: "projets",        label: "Mes projets",           icon: "briefcase" },
  { id: "certifications", label: "Certifications",        icon: "award" },
  { id: "veille",         label: "Veille techno globale", icon: "globe" },
  { id: "veille-auth",    label: "Veille auth",           icon: "building" },
  { id: "ecole",          label: "Écoles",                icon: "school" },
  { id: "user-story",     label: "Profil",                icon: "user" },
];

function Icon({ name, className = "w-5 h-5" }) {
  switch (name) {
    case "home":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M3 11l9-7 9 7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "id":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="9"
            cy="12"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M14 9h5M14 12h5M14 15h5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "layers":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l9 5-9 5-9-5 9-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="m21 12-9 5-9-5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m21 17-9 5-9-5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "road":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M6 22l4-20h4l4 20" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2v5m0 4v4m0 4v3"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "award":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="8"
            r="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 14l-2 7 6-3 6 3-2-7"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="3"
            width="10"
            height="18"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M18 21V8h2v13h-2Z" fill="currentColor" />
        </svg>
      );
    case "school":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path
            d="m3 10 9-5 9 5-9 5-9-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M7 12v5l5 3 5-3v-5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="8"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5 20a7 7 0 0 1 14 0"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function LeftDockNav() {
  const [active, setActive] = useState("hero");
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const ioRef = useRef(null);

  const onScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActive(id);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Observer des sections pour l'item actif
  useEffect(() => {
    const sections = ITEMS.map((i) =>
      typeof document !== "undefined" ? document.getElementById(i.id) : null
    ).filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, threshold: 0.4 }
    );

    sections.forEach((sec) => obs.observe(sec));
    ioRef.current = obs;

    return () => obs.disconnect();
  }, []);

  /* Focus trap for mobile menu */
  const menuRef = useRef(null);
  const onKeyDownTrap = useCallback((e) => {
    if (e.key === "Escape") { setIsMobileMenuOpen(false); return; }
    if (e.key !== "Tab") return;
    const container = menuRef.current;
    if (!container) return;
    const focusable = container.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const container = menuRef.current;
    if (!container) return;
    const first = container.querySelector("button, a");
    first?.focus();
    document.addEventListener("keydown", onKeyDownTrap);
    return () => document.removeEventListener("keydown", onKeyDownTrap);
  }, [isMobileMenuOpen, onKeyDownTrap]);

  /* =========================
     VERSION MOBILE
     ========================= */
  if (isMobile) {
    return (
      <>
        {/* Bouton home toujours en haut à gauche */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className={
            "fixed left-3 top-3 z-[130] inline-flex items-center justify-center rounded-full shadow-lg shadow-black/50 backdrop-blur-md border transition-all duration-300 " +
            (isMobileMenuOpen
              ? "w-11 h-11 bg-sky-600/90 border-sky-300/80 scale-110"
              : "w-9 h-9 bg-slate-950/95 border-white/20 scale-100")
          }
          aria-label="Ouvrir le menu de navigation"
        >
          <Icon name="home" className="w-5 h-5 text-slate-100" />
        </button>

        {/* Overlay plein écran */}
        {isMobileMenuOpen && (
          <div ref={menuRef} className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Menu de navigation">
            <div className="absolute flex flex-col border shadow-2xl inset-x-3 top-7 bottom-5 rounded-2xl bg-slate-950/95 border-white/12 shadow-black/70">
              {/* Header menu */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Navigation
                  </span>
                  <span className="text-sm font-semibold text-slate-100">
                    Sections du portfolio
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-8 h-8 transition border rounded-full bg-white/10 border-white/20 text-slate-100 active:scale-95"
                  aria-label="Fermer le menu"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Liste items */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="px-3 py-3 space-y-1.5">
                  {ITEMS.map((it) => {
                    const isActive = active === it.id;
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            onScrollTo(it.id);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            isActive
                              ? "bg-sky-500/20 border border-sky-400/60 text-sky-50"
                              : "bg-white/[0.03] border border-white/8 text-slate-100 hover:bg-white/[0.08]"
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-9 h-9 rounded-lg border ${
                              isActive
                                ? "border-sky-400/80 bg-sky-500/25"
                                : "border-white/15 bg-slate-900/70"
                            }`}
                          >
                            <Icon name={it.icon} className="w-5 h-5" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {it.label}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              #{it.id}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }

  /* =========================
     VERSION DESKTOP
     ========================= */

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex items-center"
      onMouseEnter={() => setIsDesktopOpen(true)}
      onMouseLeave={() => setIsDesktopOpen(false)}
      aria-label="Navigation latérale"
    >
      {/* Bouton maison (toujours visible) */}
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 ml-1 transition-all border rounded-full shadow-xl border-white/20 bg-slate-950/95 text-slate-100 shadow-black/50 backdrop-blur-md hover:bg-slate-900"
        aria-label="Afficher la navigation"
      >
        <Icon name="home" className="w-5 h-5" />
      </button>

      {/* Barre latérale : totalement cachée quand fermée */}
      <aside
        className={
          "ml-2 transition-all duration-250 " +
          (isDesktopOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none")
        }
      >
        <div
          className="relative w-[64px] h-[84vh] rounded-2xl border border-white/15 overflow-hidden backdrop-blur-md flex flex-col items-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,19,39,.58), rgba(9,13,25,.58))",
            boxShadow:
              "0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04)",
          }}
        >
          <div className="h-3" />

          <nav className="flex-1 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <ul className="px-[6px] space-y-1.5">
              {ITEMS.map((it) => {
                const isActive = active === it.id;
                return (
                  <li key={it.id} className="relative group">
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-r transition-all duration-300 ${
                        isActive ? "bg-sky-400" : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                    <button
                      type="button"
                      onClick={() => onScrollTo(it.id)}
                      className={`w-full h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[#60a5fa]/20 text-[#e6f0ff] scale-105"
                          : "text-slate-200 hover:bg-white/10 hover:scale-105"
                      }`}
                      title={it.label}
                      aria-label={it.label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          isActive ? "text-[#60a5fa]" : "text-slate-200/90"
                        }`}
                      >
                        <Icon name={it.icon} />
                      </span>
                    </button>

                    <div className="pointer-events-none absolute left-[72px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                      <div className="px-2 py-1 text-xs border rounded-md shadow-lg bg-black/70 text-slate-100 whitespace-nowrap border-white/10 backdrop-blur-sm">
                        {it.label}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="h-3" />
        </div>
      </aside>
    </div>
  );
}
