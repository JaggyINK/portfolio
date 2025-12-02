// src/pages/ClassicHero.jsx
import React, { useEffect, useRef, useState } from "react";

/* ===== Golden ratio ===== */
const PHI = 1.618;

/* ===== avatar ===== */
const AVATAR_URL = "/avatar-smir.png"; // public/avatar-smir.png

export default function ClassicHero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [showCrawl, setShowCrawl] = useState(true);
  const [playingKey, setPlayingKey] = useState(0);

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

    function draw(now) {
      const dt = (now - t0) / 1000;
      t0 = now;

      // fond dégradé
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0b1020");
      g.addColorStop(1, "#080d18");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // lumière radiale
      const rad = ctx.createRadialGradient(
        W * 0.25,
        H * 0.2,
        0,
        W * 0.25,
        H * 0.2,
        W * 0.45
      );
      rad.addColorStop(0, "rgba(212,175,55,0.08)");
      rad.addColorStop(1, "transparent");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, W, H);

      const rad2 = ctx.createRadialGradient(
        W * 0.85,
        H * 0.8,
        0,
        W * 0.85,
        H * 0.8,
        W * 0.35
      );
      rad2.addColorStop(0, "rgba(147,51,234,0.07)");
      rad2.addColorStop(1, "transparent");
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, W, H);

      // étoiles
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += (25 + 55 * s.z) * dt;
        if (s.y > H) {
          s.y = -10;
          s.x = Math.random() * W;
        }
        ctx.globalAlpha = 0.5 + 0.5 * s.z;
        ctx.fillStyle = "#e5ecff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.08 + 0.12 * s.z;
        ctx.fillRect(s.x - 0.3, s.y - s.r * 6, 0.6, s.r * 12);
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    function onResize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // cacher l'intro si on sort du hero (scroll)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowCrawl(false);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
              className="mt-4 font-extrabold text-[clamp(1.8rem,4.4vw,2.6rem)] text-[#60a5fa] fade-in"
              style={{
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              }}
            >
              S. MIR
            </h2>

            {/* Punchline */}
            <p className="text-sm italic md:text-base text-slate-300/95 fade-in">
              Là où la logique rencontre l&apos;imaginaire.
            </p>

            <p className="mt-3 text-xs tracking-wide text-slate-400/90 fade-in">
              Dev · Ops · Builder
            </p>
          </div>
        </div>
      </div>

      {/* INTRO STAR WARS (avec fond noir léger) */}
      {showCrawl && (
        <StarCrawl key={playingKey} onEnd={() => setShowCrawl(false)} />
      )}

      {/* FOOTER INFO (en bas du hero) */}
      <footer className="absolute left-0 right-0 z-30 px-6 bottom-10">
        <div className="max-w-3xl mx-auto space-y-2 text-center">
          <div className="pt-2">
            {showCrawl ? (
              <button
                onClick={() => setShowCrawl(false)}
                className="px-3 py-1.5 rounded-xl border border-white/20 hover:bg-white/10 transition text-sm"
              >
                ⏭ Passer l&apos;intro
              </button>
            ) : (
              <button
                onClick={() => {
                  setPlayingKey((k) => k + 1);
                  setShowCrawl(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-sm"
              >
                ▶ Rejouer l&apos;intro
              </button>
            )}
          </div>

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
        .fade-in { animation: fade-in 1.8s ease-out forwards; }
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

/* =================================== */
/* Star Wars style opening crawl block */
/* =================================== */
function StarCrawl({ onEnd }) {
  useEffect(() => {
    const DURATION = 26000; // ~26s
    const t = setTimeout(() => onEnd?.(), DURATION);
    return () => clearTimeout(t);
  }, [onEnd]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Fond noir léger : on voit encore le décor */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />

      {/* Zone de texte Star Wars, alignée en bas */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-4xl h-[75vh] perspective">
          <div className="crawl-wrapper">
            <div className="crawl">
              <p className="intro-quote">
                « Les bons systèmes ne se voient pas. Ils fonctionnent. »
              </p>

              <p className="ep">Chapitre ZÉRO</p>
              <h2 className="title">Intention &amp; Exécution</h2>

              <p>
                Tu n&apos;es pas là pour regarder des animations.<br />
                Tu es là pour trouver quelqu&apos;un qui prend tes problèmes au sérieux.
              </p>

              <p>
                J&apos;aime les systèmes qui encaissent les pics, les pannes, les imprévus.<br />
                Moins de friction, plus de fiabilité. Moins de promesses, plus de livrables.
              </p>

              <p>
                Derrière chaque écran, il y a des humains, des risques et des coûts.<br />
                Mon travail : clarifier, prioriser, simplifier ce qui semble complexe.
              </p>

              <p className="strong">
                Le vrai savoir n&apos;est pas ce que tu possèdes déjà,<br />
                c&apos;est ta capacité à continuer d&apos;apprendre sans jamais t&apos;arrêter.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective {
          perspective: 520px;
        }

        .crawl-wrapper {
          position: relative;
          height: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            0deg,
            transparent 0%,
            black 18%,
            black 85%,
            transparent 100%
          );
        }

        .crawl {
          position: absolute;
          bottom: -15%;               /* démarre bien en bas */
          width: 100%;
          transform-origin: 50% 100%;
          transform: rotateX(24deg);
          color: #feda4a;
          text-align: justify;
          font-size: clamp(11px, 1.5vw, 15px);
          letter-spacing: 0.05em;
          line-height: 1.7;
          font-weight: 500;
          animation: crawl-move 26s linear forwards;
          text-shadow: 0 2px 3px rgba(0,0,0,0.65);
        }

        .crawl .intro-quote {
          text-align: center;
          font-size: clamp(13px, 1.8vw, 18px);
          font-style: italic;
          margin-bottom: 1.4rem;
          font-weight: 700;
          opacity: 0.98;
        }

        .crawl .ep {
          text-align: center;
          margin-bottom: 0.2rem;
          opacity: 0.9;
          font-size: 0.82em;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .crawl .title {
          text-align: center;
          font-size: clamp(16px, 2vw, 22px);
          margin-bottom: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .crawl p {
          margin: 0 0 0.9rem 0;
        }

        .crawl p.strong {
          text-align: center;
          font-weight: 800;
          margin-top: 1.3rem;
          font-size: 0.95em;
        }

        @keyframes crawl-move {
          0% {
            bottom: -15%;
            opacity: 0;
          }
          4% {
            opacity: 1;
          }
          100% {
            bottom: 200%;  /* sort largement par le haut */
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
