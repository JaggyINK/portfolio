// src/pages/sections/AboutSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CodeFlipCard from "../../components/CodeFlipCard";
import { TECH_DATA, TechLogos } from "../../components/TechData";

/* ============ Thème sobre & pro ============ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.78)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  gold: "#d4af37",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Tech Badge avec Tooltip ============ */
function TechBadge({ children, color = THEME.brandFrom, icon }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const techData = TECH_DATA[children];

  return (
    <div className="relative inline-block">
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[0.75rem] rounded-md border font-medium transition-all duration-200 cursor-pointer"
        style={{
          color: THEME.text,
          borderColor: `${color}40`,
          background: `${color}15`,
          transform: showTooltip ? 'scale(1.15)' : 'scale(1)',
          boxShadow: showTooltip ? `0 0 15px ${color}40` : 'none',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon && <span className="flex items-center justify-center w-4 h-4">{icon}</span>}
        {children}
      </span>

      {/* Tooltip */}
      {showTooltip && techData && (
        <div
          className="absolute p-4 mb-2 border rounded-lg shadow-2xl w-72 backdrop-blur-xl animate-fadeIn"
          style={{
            background: THEME.card,
            borderColor: `${color}60`,
            left: '50%',
            bottom: '100%',
            transform: 'translateX(-50%)',
            boxShadow: `0 10px 40px ${color}30, 0 0 0 1px ${color}20`,
            zIndex: 9999,
          }}
        >
          {/* Flèche */}
          <div
            className="absolute w-3 h-3 rotate-45"
            style={{
              background: THEME.card,
              borderLeft: `1px solid ${color}60`,
              borderTop: `1px solid ${color}60`,
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(225deg)',
            }}
          />

          {/* Contenu */}
          <div className="relative">
            <h4
              className="flex items-center gap-2 mb-2 text-sm font-bold"
              style={{ color }}
            >
              {icon && <span className="w-5 h-5">{icon}</span>}
              {children}
            </h4>

            <p
              className="mb-3 text-xs leading-relaxed"
              style={{ color: THEME.text }}
            >
              {techData.description}
            </p>

            {/* Liste OWASP Top 10 */}
            {techData.list && (
              <div className="mb-3">
                <p className="mb-2 text-xs font-semibold" style={{ color: THEME.brandFrom }}>
                  📋 Top 10 des vulnérabilités :
                </p>
                <ul className="text-[0.7rem] space-y-1" style={{ color: THEME.sub }}>
                  {techData.list.map((item, i) => (
                    <li key={i} className="leading-tight">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projets associés */}
            {techData.projects && techData.projects.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: THEME.brandTo }}>
                  🚀 Projets associés :
                </p>
                <div className="flex flex-wrap gap-1">
                  {techData.projects.map((project, i) => (
                    <span
                      key={i}
                      className="text-[0.7rem] px-2 py-0.5 rounded"
                      style={{
                        background: `${color}20`,
                        color: THEME.text,
                      }}
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-[100svh] snap-center text-slate-100 flex items-center bg-[rgba(8,12,24,0.5)] backdrop-blur-[2px] border-t border-white/5"
    >
      <style>{`
        @keyframes spin-slow { 
          to { transform: rotate(360deg); } 
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <div className="container px-6 py-16 mx-auto">
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
          <CodeFlipCard />

          <div>
            <h2
              className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl"
              style={{ fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}
            >
              À propos
            </h2>

            <div className="space-y-3 text-[15px] md:text-[15.5px] leading-relaxed text-slate-300/90">
              <p>
                <strong>Alternant développeur web chez CPMS</strong>, en formation{" "}
                <strong>BTS SIO option SLAM</strong> à la Digital School of Paris (IEF2I).
                Passionné par le développement, la sécurité et l'automatisation.
                Diplôme prévu <strong>juin 2026</strong>.
              </p>

              <p className="italic text-slate-400/90">
                De la banque au code : même exigence, nouvel horizon.
              </p>
            </div>

            {/* Stack technique avec tooltips */}
            <div
              className="relative p-4 mt-5 overflow-visible border rounded-xl backdrop-blur-xl"
              style={{
                background: THEME.card,
                borderColor: THEME.border,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  maskImage: "radial-gradient(140% 100% at 100% 0%, transparent 0%, black 50%, black 100%)",
                  background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
                  opacity: 0.04,
                  animation: "spin-slow 18s linear infinite",
                }}
              />

              <h3
                className="relative mb-3 text-sm font-bold tracking-wide uppercase"
                style={{ color: THEME.brandFrom }}
              >
                🛠️ Stack technique
                <span className="ml-2 text-[0.65rem] font-normal normal-case" style={{ color: THEME.sub }}>
                  (survolez pour les détails)
                </span>
              </h3>
              
              <div className="relative space-y-3">
                {/* Frontend */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    Frontend
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#61DAFB" icon={TechLogos.React}>React</TechBadge>
                    <TechBadge color="#38BDF8" icon={TechLogos.Tailwind}>Tailwind CSS</TechBadge>
                    <TechBadge color="#1572B6">CSS3</TechBadge>
                    <TechBadge color="#E34F26">HTML5</TechBadge>
                    <TechBadge color="#F7DF1E" icon={TechLogos.JavaScript}>JavaScript</TechBadge>
                    <TechBadge color="#049DE1">Three.js</TechBadge>
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    Backend
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#777BB4" icon={TechLogos.PHP}>PHP</TechBadge>
                    <TechBadge color="#339933" icon={TechLogos.Node}>Node.js</TechBadge>
                    <TechBadge color="#3776AB" icon={TechLogos.Python}>Python</TechBadge>
                    <TechBadge color="#FF2D20">Laravel</TechBadge>
                    <TechBadge color="#000000">Symfony</TechBadge>
                    <TechBadge color="#CC6699">Composer</TechBadge>
                    <TechBadge color="#CB3837">npm</TechBadge>
                  </div>
                </div>

                {/* Base de données */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    Base de données & APIs
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#4479A1" icon={TechLogos.MySQL}>MySQL</TechBadge>
                    <TechBadge color="#336791">PostgreSQL</TechBadge>
                    <TechBadge color="#F29111">phpMyAdmin</TechBadge>
                    <TechBadge color="#FF6C37">Postman</TechBadge>
                    <TechBadge color="#E10098">REST API</TechBadge>
                    <TechBadge color="#F7DF1E">JSON</TechBadge>
                  </div>
                </div>

                {/* DevOps & Versioning */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    DevOps & Versioning
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#F05032" icon={TechLogos.Git}>Git</TechBadge>
                    <TechBadge color="#181717">GitHub</TechBadge>
                    <TechBadge color="#2496ED" icon={TechLogos.Docker}>Docker</TechBadge>
                    <TechBadge color="#2088FF">CI/CD</TechBadge>
                    <TechBadge color="#607078">VMware</TechBadge>
                    <TechBadge color="#183A61">VirtualBox</TechBadge>
                  </div>
                </div>

                {/* Systèmes & Outils */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    Systèmes & Outils
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#FCC624">Linux</TechBadge>
                    <TechBadge color="#0078D6">Windows</TechBadge>
                    <TechBadge color="#0078D6">Windows Server</TechBadge>
                    <TechBadge color="#000000">macOS</TechBadge>
                    <TechBadge color="#FCC624">WSL</TechBadge>
                    <TechBadge color="#007ACC" icon={TechLogos.VSCode}>VS Code</TechBadge>
                    <TechBadge color="#0089D6">WAD</TechBadge>
                  </div>
                </div>

                {/* Méthodo & Sécurité */}
                <div>
                  <h4 className="text-[0.7rem] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: THEME.sub }}>
                    Méthodologies & Sécurité
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <TechBadge color="#009FDA">Agile / Scrum</TechBadge>
                    <TechBadge color="#5C2D91">UML</TechBadge>
                    <TechBadge color="#FF6C37">Merise</TechBadge>
                    <TechBadge color="#E34F26">OWASP Top 10</TechBadge>
                    <TechBadge color="#1A73E8">Tests unitaires</TechBadge>
                    <TechBadge color="#10B981">Veille technologique</TechBadge>
                  </div>
                </div>
              </div>

              <div className="h-[0.1rem] w-full mt-3" style={{ background: THEME.line }} />
            </div>

            {/* Projets récents */}
            <div
              className="relative p-4 mt-4 overflow-hidden border rounded-xl backdrop-blur-xl"
              style={{
                background: THEME.card,
                borderColor: THEME.border,
              }}
            >
              <h3
                className="relative flex items-center justify-between mb-2 text-sm font-bold tracking-wide uppercase"
                style={{ color: THEME.brandTo }}
              >
                <span>🚀 Projets récents</span>
                <a 
                  href="#projets"
                  className="text-xs font-medium normal-case hover:underline"
                  style={{ color: THEME.brandFrom }}
                >
                  Voir tous →
                </a>
              </h3>
              
              <div className="relative space-y-2 text-xs" style={{ color: THEME.text }}>
                <p>
                  <span className="font-bold" style={{ color: THEME.brandFrom }}>💼 Intranet CPMS</span> — 
                  Features d'administration, réactivation compte, intégration PDF
                </p>
                <p>
                  <span className="font-bold" style={{ color: THEME.brandTo }}>🤖 Bot Discord Veille Tech</span> — 
                  Python, agrégation RSS (OWASP, CERT-FR), automatisation
                </p>
                <p>
                  <span className="font-bold" style={{ color: THEME.gold }}>🎨 Portfolio 3D</span> — 
                  React + Three.js, expérience immersive
                </p>
              </div>

              <div className="h-[0.1rem] w-full mt-3" style={{ background: THEME.line }} />
            </div>

            {/* GitHub + Veille */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href="https://github.com/smir75"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 transition-all border rounded-xl hover:scale-105 hover:shadow-lg"
                style={{
                  background: THEME.card,
                  borderColor: THEME.border,
                  color: THEME.text,
                }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold">GitHub</span>
              </a>

              <a
                href="#veille"
                className="flex items-center justify-center gap-2 p-3 transition-all border rounded-xl hover:scale-105 hover:shadow-lg"
                style={{
                  background: THEME.card,
                  borderColor: THEME.border,
                  color: THEME.text,
                }}
              >
                <span className="text-xl">📡</span>
                <span className="text-sm font-semibold">Veille Tech</span>
              </a>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href="/cv_smir.pdf"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#233062] hover:bg-[#2a3973] transition shadow-md text-sm font-semibold"
              >
                📄 CV
              </a>

              <Link
                to="/Contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-white/95 text-[#0b1020] hover:bg-white transition shadow-md text-sm font-semibold"
              >
                ✉️ Contact
              </Link>

              <a
                href="https://www.linkedin.com/in/mir-sagar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#0f172a] border border-white/15 hover:bg-[#111b31] transition shadow-md text-sm font-semibold"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs italic text-center text-slate-500">
          Développeur • Alternant • Passionné de tech
        </p>
      </div>
    </section>
  );
}