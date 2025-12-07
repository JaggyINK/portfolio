// src/scenes/ui/TopNav.jsx
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { dbg } from "@/utils/debug";

export default function TopNav({ stations = [], onNavTarget }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine current active station id
  const activeId = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const slug = parts[0]?.toLowerCase() || "";
    const routeToId = {
      "quiz-php": "quiz-php",
      "quiz-python": "quiz-python",
      "quiz-javascript": "quiz-javascript",
      "quiz-sql": "quiz-sql",
      "quiz-docker": "quiz-docker",
      "": "classic", // root = Classic Portfolio
    };
    return routeToId[slug] ?? null;
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false); // close mobile menu on route change
  }, [pathname]);

  const openQueued = useCallback(
    (id) => {
      dbg && dbg("TopNav click", { id, from: pathname });

      const isOnLunar = pathname.startsWith("/lunar") || pathname.startsWith("/scene");
      try {
        window.dispatchEvent(new CustomEvent("saga-focus-station", { detail: { id: null } }));
      } catch {}

      if (!isOnLunar) {
        navigate("/lunar");
        requestAnimationFrame(() => {
          dbg && dbg("TopNav → saga-open-station (queued after goto /lunar)", { id });
          try {
            window.dispatchEvent(
              new CustomEvent("saga-open-station", { detail: { id, timeout: 8000 } })
            );
          } catch {}
        });
      } else {
        dbg && dbg("TopNav → saga-open-station (direct on /lunar or /scene)", { id });
        try {
          window.dispatchEvent(
            new CustomEvent("saga-open-station", { detail: { id, timeout: 8000 } })
          );
        } catch {}
      }
    },
    [pathname, navigate]
  );

  const handleStationClick = (id) => {
    if (typeof onNavTarget === "function") {
      try {
        onNavTarget(id);
      } catch (e) {
        console.warn("[TopNav] onNavTarget threw:", e);
      }
    }

    // Ferme le menu mobile dès que l’utilisateur choisit une option
    setMobileOpen(false);

    if (id === "classic") {
      navigate("/"); // Classic Portfolio
    } else {
      openQueued(id);
    }
  };

  const handleKey = (e, fn) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  // Add the "Classic Portfolio" pseudo-station
  const navItems = useMemo(
    () => [...stations, { id: "classic", short: "Portfolio", label: "Classic Portfolio" }],
    [stations]
  );

  return (
    <header className="z-50 w-full">
      <div className="max-w-6xl px-4 py-3 mx-auto">
        <div className="relative border shadow-sm rounded-2xl border-slate-700/60 bg-slate-900/20 backdrop-blur-md top-nav-glass">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Brand */}
            <div className="flex items-center gap-3 select-none">
              <div className="flex items-center justify-center rounded-full shadow-md w-9 h-9 bg-gradient-to-br from-sky-400 to-cyan-400">
                <span className="text-sm font-bold text-slate-900">SM</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold font-orbitron text-sky-200">
                  S.MIR — Portfolio
                </span>
                <span className="text-xs text-slate-400">Sagario</span>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="items-center hidden gap-2 sm:flex" aria-label="Stations navigation">
              {navItems.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    title={`Aller à ${s.label}`}
                    onClick={() => handleStationClick(s.id)}
                    onKeyDown={(e) => handleKey(e, () => handleStationClick(s.id))}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/60 ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg"
                        : "bg-slate-900/60 text-slate-200 hover:bg-slate-800/70"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shadow-sm bg-sky-300/80" aria-hidden />
                    <span className="font-orbitron">{s.short}</span>
                    <span
                      aria-hidden
                      className={`absolute left-1 right-1 bottom-0 h-[2px] rounded-md transform transition-all duration-300 ${
                        isActive
                          ? "bg-white/90 scale-x-100"
                          : "bg-transparent scale-x-0 group-hover:bg-sky-400/70 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu toggle */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-lg hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav panel */}
          <div
            className={`sm:hidden px-3 pb-3 transition-maxh duration-300 overflow-y-auto ${
              mobileOpen ? "max-h-[80vh]" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2 mt-1">
              {navItems.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStationClick(s.id)}
                    onKeyDown={(e) => handleKey(e, () => handleStationClick(s.id))}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/60 ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-white"
                        : "bg-slate-900/60 text-slate-200 hover:bg-slate-800/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-sky-300/80" aria-hidden />
                      <div className="flex flex-col">
                        <span className="font-orbitron">{s.short}</span>
                        {s.label && <span className="text-xs text-slate-400">{s.label}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
