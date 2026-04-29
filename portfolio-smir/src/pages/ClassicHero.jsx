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
    let visible = true; // pause le RAF quand le hero sort du viewport (perf)
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

        if (visible) {
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
        }

        raf = requestAnimationFrame(draw);
      }
      raf = requestAnimationFrame(draw);
    }

    // Pause le rendu quand le hero sort du viewport (économise la batterie / le GPU)
    let io = null;
    if (heroRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting; },
        { threshold: 0 }
      );
      io.observe(heroRef.current);
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
      if (io) io.disconnect();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden text-slate-100 snap-start"
      aria-label="Bienvenue sur mon portfolio"
    >
      {/* BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* SPOTLIGHTS — retirer cette ligne pour désactiver l'effet */}
      <SpotlightOverlay containerRef={heroRef} />

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
              className="mt-4 font-extrabold text-[clamp(1.8rem,4.4vw,2.6rem)] text-[#22d3ee] fade-in stagger-1"
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
          <button
            type="button"
            aria-label="Aller à la section À propos"
            onClick={() => {
              const next = document.getElementById("about");
              if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex flex-col items-center mx-auto pt-3 cursor-pointer group"
          >
            <span className="text-xs font-light tracking-wide transition-colors text-slate-300/80 group-hover:text-slate-100">
              Faites défiler pour découvrir
            </span>
            <div className="relative w-5 h-5 mt-2">
              <svg
                className="absolute inset-0 w-full h-full animate-bounce-slow text-[#f5c542] transition-transform group-hover:translate-y-1"
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
          </button>
        </div>
      </footer>

      {/* Top/Bottom glow lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

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
            "radial-gradient(closest-side, rgba(34,211,238,.18), rgba(168,85,247,.12), rgba(0,0,0,0) 70%)",
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
          border: "3px solid rgba(34,211,238,.35)",
          boxShadow:
            "0 20px 70px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.1), 0 0 50px rgba(34,211,238,.2)",
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

/* ================================ */
/* Projecteurs : 2 faisceaux coniques depuis les côtés */
/* Retirer <SpotlightOverlay /> du JSX pour désactiver */
/* ================================ */
function SpotlightOverlay({ containerRef }) {
  const cvRef = useRef(null);

  useEffect(() => {
    const canvas = cvRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    function resize() {
      // Gère retina + dimensions live (au cas où le layout change)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = container.offsetWidth;
      H = container.offsetHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    let raf = 0;
    let mouseIn = false;
    let mx = W * 0.5;
    let my = H * 0.4;

    /* — Deux projecteurs : origine fixe, cible mobile — */
    const spots = [
      { ox: -10, oy: H + 10, x: W * 0.35, y: H * 0.3, phase: 0, speed: 0.35 },
      { ox: W + 10, oy: H + 10, x: W * 0.65, y: H * 0.3, phase: Math.PI * 0.8, speed: 0.45 },
    ];

    const LERP_SEARCH = 0.012;
    const LERP_TRACK = 0.04;
    const DARKNESS = 0.62;
    const CONE_SPREAD = 0.18;   // ouverture du cône (radians-like factor)

    function searchTarget(spot, t) {
      const a = t * spot.speed + spot.phase;
      return {
        tx: W * 0.5 + Math.sin(a) * W * 0.32,
        ty: H * 0.35 + Math.sin(a * 1.6) * H * 0.2,
      };
    }

    function drawBeam(spot) {
      const { ox, oy, x, y } = spot;
      const angle = Math.atan2(y - oy, x - ox);
      const dist = Math.hypot(x - ox, y - oy);
      const halfW = dist * CONE_SPREAD;
      const poolR = Math.min(W, H) * 0.2;

      /* — Cône lumineux — */
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.arc(x, y, halfW, angle - Math.PI / 2, angle + Math.PI / 2);
      ctx.closePath();

      const grad = ctx.createLinearGradient(ox, oy, x, y);
      grad.addColorStop(0, "rgba(0,0,0,0.05)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.45)");
      grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad;
      ctx.fill();

      /* — Halo circulaire au bout du faisceau — */
      const pool = ctx.createRadialGradient(x, y, 0, x, y, poolR);
      pool.addColorStop(0, "rgba(0,0,0,1)");
      pool.addColorStop(0.55, "rgba(0,0,0,0.6)");
      pool.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, poolR, 0, Math.PI * 2);
      ctx.fillStyle = pool;
      ctx.fill();
    }

    function draw(now) {
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      /* Couche sombre */
      ctx.fillStyle = `rgba(0,0,0,${DARKNESS})`;
      ctx.fillRect(0, 0, W, H);

      /* Percer les faisceaux */
      ctx.globalCompositeOperation = "destination-out";

      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        let tx, ty;

        if (mouseIn) {
          const off = i === 0 ? -25 : 25;
          tx = mx + off;
          ty = my;
        } else {
          const s = searchTarget(spot, t);
          tx = s.tx;
          ty = s.ty;
        }

        const lerp = mouseIn ? LERP_TRACK : LERP_SEARCH;
        spot.x += (tx - spot.x) * lerp;
        spot.y += (ty - spot.y) * lerp;

        /* Garder l'origine ancrée aux coins */
        spot.ox = i === 0 ? -10 : W + 10;
        spot.oy = H + 10;

        drawBeam(spot);
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      mouseIn = true;
    }
    function onLeave() { mouseIn = false; }
    function onResize() { resize(); }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    // ResizeObserver : capte aussi les changements de layout (sidebar, fonts qui chargent…)
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => onResize());
      ro.observe(container);
    }

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={cvRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden
    />
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

