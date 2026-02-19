// src/pages/sections/UserStorySection.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSectionReveal from "../../hooks/useReveal";

/* ============================
   Nombre d'or & Thème
   ============================ */
const PHI = 1.618;
const INV = 1 / PHI;     // 0.618
const INV2 = INV * INV;  // 0.382

const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.78)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",  // cyan
  brandTo: "#a855f7",    // violet
  gold: "#d4af37",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============================
   Primitives
   ============================ */
function Panel({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[1.0rem] border backdrop-blur-xl shadow-xl overflow-hidden ${className}`}
      style={{ borderColor: THEME.border, background: THEME.card, boxShadow: "0 0.618rem 1.618rem rgba(0,0,0,.35)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(140% 100% at 0% 0%, transparent 0%, black 50%, black 100%)",
          background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
          opacity: 0.06,
          animation: "spin-slow 24s linear infinite",
        }}
      />
      {children}
      <div className="h-[0.236rem] w-full" style={{ background: THEME.line }} />
    </div>
  );
}

/* Révélation douce au scroll */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("reveal-in");
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ============================
   Section principale
   ============================ */
export default function UserStorySection() {
  const navigate = useNavigate();
  const { ref: sectionRef, revealed } = useSectionReveal();
  const refHero = useReveal();
  const refContact = useReveal();
  const refEasterEgg = useReveal();
  
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleEasterEggClick = () => {
    // Navigation vers la page Lunar
    navigate("/lunar");
  };

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="user-story"
      className={`min-h-[100svh] snap-center text-slate-100 relative overflow-hidden section-reveal${revealed ? " revealed" : ""}`}
      style={{
        background:
        "radial-gradient(60% 60% at 30% 15%, rgba(212,175,55,.05), transparent 62%)," +
        "radial-gradient(40% 40% at 80% 85%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${(INV * PHI) * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes floaty { 
          0% { transform: translateY(0) rotate(0deg) } 
          50% { transform: translateY(-12px) rotate(5deg) } 
          100% { transform: translateY(0) rotate(0deg) } 
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(168,85,247,0.2); }
          50% { box-shadow: 0 0 40px rgba(34,211,238,0.6), 0 0 80px rgba(168,85,247,0.4); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        .particles:before, .particles:after {
          content:""; position:absolute; inset:-20%; pointer-events:none;
          background:
            radial-gradient(3px 3px at 20% 30%, rgba(255,255,255,.12) 40%, transparent 41%),
            radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,.10) 40%, transparent 41%),
            radial-gradient(2.5px 2.5px at 80% 20%, rgba(255,255,255,.08) 40%, transparent 41%),
            radial-gradient(2px 2px at 35% 85%, rgba(255,255,255,.08) 40%, transparent 41%);
          animation: floaty 7s ease-in-out infinite;
        }
        .particles:after { animation-delay: 1.6s; filter: blur(0.5px); opacity:.7 }
        
        .reveal { opacity:0; transform: translateY(10px) scale(0.995); transition: opacity .6s ease, transform .6s ease }
        .reveal.reveal-in { opacity:1; transform: translateY(0) scale(1) }
        
        .easter-egg-container {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .easter-egg-container:hover {
          transform: scale(1.05);
          animation: shake 0.5s ease-in-out;
        }
        .easter-egg-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .ripple {
          position: absolute;
          border: 2px solid rgba(34,211,238,0.6);
          border-radius: 50%;
          animation: ripple 1s ease-out;
          pointer-events: none;
        }
        .orbit-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,1), rgba(168,85,247,0.5));
          animation: orbit 3s linear infinite;
        }
        .orbit-particle:nth-child(2) { animation-delay: -1s; }
        .orbit-particle:nth-child(3) { animation-delay: -2s; }
      `}</style>

      <div className="w-full mx-auto space-y-[1.618rem]" style={{ maxWidth: `${48 * PHI}rem` }}>
        {/* ======= HERO - REMERCIEMENT ======= */}
        <div ref={refHero} className="relative text-center reveal particles">
          <h2
            className="font-extrabold tracking-tight mb-[0.618rem]"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              background: `linear-gradient(135deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Merci d'être arrivé jusqu'ici ! 🎉
          </h2>
          <p 
            className="mx-auto max-w-2xl text-[1.05rem] leading-relaxed"
            style={{ color: THEME.text }}
          >
            Vous avez exploré mon univers, découvert mes projets et mes compétences.
            J'espère que ce voyage vous a plu autant que j'ai pris plaisir à le créer.
          </p>
          <div className="flex items-center justify-center gap-3 mt-[0.618rem]">
            <div className="w-16 h-1 rounded-full" style={{ background: THEME.line }} />
            <span className="text-2xl">✨</span>
            <div className="w-16 h-1 rounded-full" style={{ background: THEME.line }} />
          </div>
        </div>

        {/* ======= CONTACT ======= */}
        <div ref={refContact} className="reveal">
          <Panel>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-[0.618rem]">
                <h3 
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}
                >
                  Restons en contact
                </h3>
                <span className="text-3xl">📬</span>
              </div>
              
              <p className="text-[0.95rem] mb-[1rem]" style={{ color: THEME.sub }}>
                Une question ? Un projet ? Une opportunité ? N'hésitez pas à me contacter par l'un de ces moyens :
              </p>

              <div className="grid gap-[0.8rem] sm:grid-cols-2 lg:grid-cols-3">
                <ContactCard
                  icon=""
                  title="*prochainement "
                  value=""
                  href=""
                  color={THEME.brandFrom}
                />
                <ContactCard
                  icon="📧"
                  title="Email Pro"
                  value="jaggyinkgraph@gmail.com"
                  href="mailto:jaggyinkgraph@gmail.com"
                  color={THEME.brandTo}
                />
                <ContactCard
                  icon="💼"
                  title="LinkedIn"
                  value="Mir Sagar"
                  href="https://www.linkedin.com/in/mir-sagar/"
                  color="#0A66C2"
                  external
                />
                <ContactCard
                  icon="🐙"
                  title="GitHub"
                  value="smir75"
                  href="https://github.com/JaggyINK"
                  color="#ffffff"
                  external
                />
                <ContactCard
                  icon="💬"
                  title="Discord"
                  value="Rejoindre"
                  href="https://discord.gg/GZ59cJg5vR"
                  color="#5865F2"
                  external
                />
                <ContactCard
                  icon="📱"
                  title="Téléphone"
                  value="Sur demande"
                  color={THEME.gold}
                />
              </div>

              <div className="mt-[1rem] p-4 rounded-lg border border-white/10 bg-white/5">
                <p className="text-sm text-center" style={{ color: THEME.sub }}>
                  💡 <strong>Tip :</strong> Pour les demandes professionnelles, privilégiez{" "}
                  <a 
                    href="mailto:H2O.ALAFRENCH@gmail.com"
                    className="underline transition hover:text-cyan-300"
                    style={{ color: THEME.brandFrom }}
                  >
                    l'email pro
                  </a>{" "}
                  ou{" "}
                  <a 
                    href="https://www.linkedin.com/in/mir-sagar/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline transition hover:text-cyan-300"
                    style={{ color: THEME.brandFrom }}
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </Panel>
        </div>

        {/* ======= EASTER EGG ======= */}
        <div ref={refEasterEgg} className="reveal">
          <Panel>
            <div className="p-8 md:p-12">
              <div className="text-center mb-[1rem]">
                <h3 
                  className="text-xl md:text-2xl font-extrabold tracking-tight mb-[0.382rem]"
                  style={{ fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}
                >
                  Mais attendez... 🤔
                </h3>
                <p className="text-[0.95rem]" style={{ color: THEME.sub }}>
                  Il semblerait qu'il y ait quelque chose de plus à découvrir...
                </p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-[1rem]">
                {/* Easter Egg Button */}
                <div 
                  className="relative easter-egg-container"
                  onClick={(e) => {
                    createRipple(e);
                    handleEasterEggClick();
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Orbiting particles */}
                  {isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="orbit-particle"></div>
                      <div className="orbit-particle"></div>
                      <div className="orbit-particle"></div>
                    </div>
                  )}

                  {/* Main capsule */}
                  <div
                    className="relative p-8 transition-all duration-300 border-2 easter-egg-glow rounded-2xl"
                    style={{
                      borderColor: isHovering ? THEME.brandFrom : THEME.border,
                      background: isHovering 
                        ? `linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))`
                        : THEME.card,
                      transform: isHovering ? "translateY(-8px)" : "translateY(0)",
                    }}
                  >
                    {/* Ripples */}
                    {ripples.map(ripple => (
                      <div
                        key={ripple.id}
                        className="ripple"
                        style={{
                          left: ripple.x - 25,
                          top: ripple.y - 25,
                          width: 50,
                          height: 50,
                        }}
                      />
                    ))}

                    <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                      {/* Icon */}
                      <div 
                        className="text-6xl transition-transform duration-300"
                        style={{
                          animation: "floaty 3s ease-in-out infinite",
                          transform: isHovering ? "scale(1.2) rotate(15deg)" : "scale(1)",
                        }}
                      >
                        🚀
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <div 
                          className="mb-2 text-xl font-bold"
                          style={{ 
                            color: isHovering ? THEME.brandFrom : THEME.text,
                            transition: "color 0.3s ease",
                          }}
                        >
                          Zone Secrète Détectée
                        </div>
                        <div className="text-sm" style={{ color: THEME.sub }}>
                          Cliquez pour explorer l'univers caché...
                        </div>
                      </div>

                      {/* Hint */}
                      {isHovering && (
                        <div 
                          className="px-4 py-2 text-xs border rounded-full animate-pulse"
                          style={{
                            borderColor: THEME.brandFrom,
                            background: `${THEME.brandFrom}20`,
                            color: THEME.brandFrom,
                          }}
                        >
                          ✨ Mini-jeux éducatifs vous attendent
                        </div>
                      )}
                    </div>

                    {/* Floating particles inside */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                      <div
                        className="absolute w-2 h-2 rounded-full bg-cyan-400/50"
                        style={{
                          top: "20%",
                          left: "15%",
                          animation: "floaty 4s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/50"
                        style={{
                          top: "70%",
                          right: "20%",
                          animation: "floaty 3.5s ease-in-out infinite 0.5s",
                        }}
                      />
                      <div
                        className="absolute w-2.5 h-2.5 rounded-full bg-yellow-400/30"
                        style={{
                          bottom: "25%",
                          left: "80%",
                          animation: "floaty 4.5s ease-in-out infinite 1s",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="flex items-center gap-2 text-sm" style={{ color: THEME.sub }}>
                  <span className="animate-pulse">👆</span>
                  <span>Cliquez sur la capsule spatiale pour démarrer l'aventure</span>
                  <span className="animate-pulse">👆</span>
                </div>

                {/* Additional hints */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[1rem] w-full max-w-3xl">
                  <HintCard icon="🎮" text="Mini-jeux interactifs" />
                  <HintCard icon="🌍" text="Exploration spatiale" />
                  <HintCard icon="🎓" text="Contenu éducatif" />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* ======= FOOTER MESSAGE ======= */}
        <div className="text-center py-[1rem]">
          <p className="text-sm" style={{ color: THEME.sub }}>
            Fait avec 💙 et beaucoup de ☕ par Sagar
          </p>
          <p className="mt-2 text-xs" style={{ color: THEME.sub, opacity: 0.7 }}>
            © 2025 • Portfolio interactif • React + Three.js
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===== Contact Card ===== */
function ContactCard({ icon, title, value, href, color, external = false }) {
  const cardContent = (
    <div
      className="flex items-center gap-3 p-4 transition-all duration-300 border cursor-pointer rounded-xl hover:scale-105 hover:shadow-lg group"
      style={{
        borderColor: "rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="text-3xl transition-transform group-hover:scale-110">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="mb-1 text-xs font-semibold" style={{ color: THEME.sub }}>
          {title}
        </div>
        <div 
          className="text-sm font-medium truncate transition-colors group-hover:text-cyan-300"
          style={{ color }}
        >
          {value}
        </div>
      </div>
      {(href && external) && (
        <div className="transition-colors text-slate-400 group-hover:text-cyan-300">↗</div>
      )}
    </div>
  );

  if (!href) return cardContent;

  return external ? (
    <a href={href} target="_blank" rel="noreferrer">
      {cardContent}
    </a>
  ) : (
    <a href={href}>{cardContent}</a>
  );
}

/* ===== Hint Card ===== */
function HintCard({ icon, text }) {
  return (
    <div
      className="flex items-center gap-2 p-3 border rounded-lg border-white/10 bg-white/5"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm" style={{ color: THEME.sub }}>
        {text}
      </span>
    </div>
  );
}