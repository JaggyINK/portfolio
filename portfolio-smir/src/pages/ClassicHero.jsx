// src/pages/ClassicHero.jsx
import React, { useEffect, useRef } from "react";
import { useSettings } from "../state/settings.jsx";

/* ===== Golden ratio ===== */
const PHI = 1.618;

/* ===== avatar ===== */
const AVATAR_URL = "/avatar-smir.webp"; // public/avatar-smir.webp (318KB vs 2.6MB PNG)

export default function ClassicHero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const { settings } = useSettings();
  const reduceMotion = settings.reduceMotion;

  /* ===== canvas étoiles ===== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let t0 = performance.now();

    const COUNT = Math.floor((W * H) / 8000);
    const stars = new Array(COUNT).fill(0).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 1 + 0.2,
      r: Math.random() * 1.5 + 0.3,
    }));

    function drawFrame(g, rad, rad2) {
      // fond dégradé
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // lumière radiale
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, W, H);

      // étoiles
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.globalAlpha = 0.5 + 0.5 * s.z;
        ctx.fillStyle = "#e5ecff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.08 + 0.12 * s.z;
        ctx.fillRect(s.x - 0.3, s.y - s.r * 6, 0.6, s.r * 12);
      }
      ctx.restore();
    }

    function buildGradients() {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0b1020");
      g.addColorStop(1, "#080d18");

      const rad = ctx.createRadialGradient(W * 0.25, H * 0.2, 0, W * 0.25, H * 0.2, W * 0.45);
      rad.addColorStop(0, "rgba(212,175,55,0.08)");
      rad.addColorStop(1, "transparent");

      const rad2 = ctx.createRadialGradient(W * 0.85, H * 0.8, 0, W * 0.85, H * 0.8, W * 0.35);
      rad2.addColorStop(0, "rgba(147,51,234,0.07)");
      rad2.addColorStop(1, "transparent");

      return { g, rad, rad2 };
    }

    let grads = buildGradients();

    /* reduceMotion → draw once, static */
    if (reduceMotion) {
      drawFrame(grads.g, grads.rad, grads.rad2);
    } else {
      function draw(now) {
        const dt = (now - t0) / 1000;
        t0 = now;

        drawFrame(grads.g, grads.rad, grads.rad2);

        // animate star positions
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.y += (25 + 55 * s.z) * dt;
          if (s.y > H) {
            s.y = -10;
            s.x = Math.random() * W;
          }
        }

        raf = requestAnimationFrame(draw);
      }
      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      grads = buildGradients();
      if (reduceMotion) drawFrame(grads.g, grads.rad, grads.rad2);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden text-slate-100 snap-center"
      aria-label="Bienvenue sur mon portfolio"
    >
      {/* BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* HEADER FIXE (titre uniquement) */}
      <header className="absolute left-0 right-0 z-30 px-6 pointer-events-none top-2 md:top-3">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-100 text-[12px] tracking-widest uppercase">
            Portfolio • Dev • Ops • Builder
          </div>
          <h1
            className="mt-3 font-extrabold leading-[1.06] text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
            }}
          >
            <span className="block text-[clamp(1.6rem,4.2vw,2.8rem)]">
              Bienvenue dans mon univers
            </span>
          </h1>
        </div>
      </header>

      {/* CONTENU CENTRAL : avatar + nom + punchline */}
      <div className="relative z-20 flex min-h-[100svh] px-6 pt-[16vh] md:pt-[18vh] justify-center">
        <div className="w-full max-w-5xl origin-top scale-[0.70] sm:scale-[0.78] md:scale-[0.84] lg:scale-[0.90]">
          <div className="flex flex-col items-center gap-3">
            <AvatarCard />

            {/* S.MIR - Nom principal */}
            <h2
              className="mt-4 font-extrabold text-[clamp(1.8rem,4.4vw,2.6rem)] text-[#60a5fa] fade-in stagger-1"
              style={{
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              }}
            >
              S. MIR
            </h2>

            {/* Punchline */}
            <p className="text-sm italic md:text-base text-slate-300/95 fade-in stagger-2">
              Là où la logique rencontre l&apos;imaginaire.
            </p>

            <p className="mt-3 text-xs tracking-wide text-slate-400/90 fade-in stagger-3">
              Dev · Ops · Builder
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER INFO (en bas du hero) */}
      <footer className="absolute left-0 right-0 z-30 px-6 bottom-10">
        <div className="max-w-3xl mx-auto space-y-2 text-center">
          {/* hint scroll */}
          <div className="flex flex-col items-center pt-3">
            <span className="text-xs font-light tracking-wide text-slate-300/80">
              Faites défiler pour découvrir
            </span>
            <div className="relative w-5 h-5 mt-2">
              <svg
                className="absolute inset-0 w-full h-full animate-bounce-slow text-[#f5c542]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div className="absolute inset-0 blur-lg bg-[radial-gradient(closest-side,#f5c54233,transparent)] animate-pulse-slow rounded-full" />
            </div>
          </div>
        </div>
      </footer>

      {/* Top/Bottom glow lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a41d28] to-transparent opacity-60" />

      <style>{`
        @keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .animate-bounce-slow{ animation:bounce-slow 2.4s ease-in-out infinite; }
        @keyframes pulse-slow{ 0%,100%{opacity:.6} 50%{opacity:1} }
        .animate-pulse-slow{ animation:pulse-slow 2.2s ease-in-out infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { opacity: 0; animation: fade-in 1.8s ease-out forwards; }
        .stagger-1 { animation-delay: 0.3s; }
        .stagger-2 { animation-delay: 0.6s; }
        .stagger-3 { animation-delay: 0.9s; }
      `}</style>
    </section>
  );
}

/* ================================ */
/* Avatar encadré : carte verre + halo */
/* ================================ */
function AvatarCard() {
  return (
    <div className="relative">
      {/* Aura large derrière - effet circulaire */}
      <div
        aria-hidden
        className="absolute -inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,.18), rgba(168,85,247,.12), rgba(0,0,0,0) 70%)",
          filter: "blur(22px)",
        }}
      />

      {/* Anneau d'orbites EXTERNE au cadre (au-dessus du border) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          "--orbitR": "calc(50% + 6px)",
        }}
      >
        <OrbitalSparksCircle dots={14} />
      </div>

      {/* Cadre circulaire type photo de profil */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: `clamp(200px, 28vw, 320px)`,
          height: `clamp(200px, 28vw, 320px)`,
          background:
            "linear-gradient(135deg, rgba(14,20,38,.50), rgba(8,12,24,.50))",
          border: "3px solid rgba(96,165,250,.35)",
          boxShadow:
            "0 20px 70px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.1), 0 0 50px rgba(96,165,250,.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Anneau gradient tournant autour (léger) */}
        <div
          aria-hidden
          className="absolute -inset-[3px] pointer-events-none rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(34,211,238,.4), rgba(168,85,247,.3), rgba(34,211,238,.4))",
            opacity: 0.2,
            animation: "spin-halo 16s linear infinite",
            zIndex: -1,
          }}
        />

        {/* l'image PNG - centrée et cadrée sur le visage */}
        <img
          src={AVATAR_URL}
          alt="Avatar"
          className="absolute inset-0 object-cover w-full h-full select-none"
          style={{
            objectPosition: "center 35%",
          }}
          draggable={false}
          loading="eager"
        />
      </div>

      <style>{`
        @keyframes spin-halo { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function OrbitalSparksCircle({ dots = 12 }) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: dots }).map((_, i) => {
        const dur = 8 + (i % 3);
        const delay = `${-i * 0.6}s`;
        return (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/90 shadow-[0_0_10px_rgba(34,211,238,1)]"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "center center",
              animation: `orbit-on-ring ${dur}s linear infinite`,
              animationDelay: delay,
            }}
          />
        );
      })}

      <style>{`
        @keyframes orbit-on-ring {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateY(calc(-1 * var(--orbitR)));
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateY(calc(-1 * var(--orbitR)));
          }
        }
      `}</style>
    </div>
  );
}

