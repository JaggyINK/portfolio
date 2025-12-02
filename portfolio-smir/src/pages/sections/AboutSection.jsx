// src/pages/sections/AboutSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import CodeFlipCard from "../../components/CodeFlipCard";
import { TECH_DATA, TechLogos } from "../../components/TechData";
import { useIsMobile } from "../../hooks/useMediaQuery";

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

/* ============ Tech Badge avec Tooltip PARFAITEMENT POSITIONNÉ ============ */
function TechBadge({
  children,
  color = THEME.brandFrom,
  icon,
  placement = "top", // "top" ou "bottom" (desktop only)
  isMobile = false,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const badgeRef = useRef(null);
  const tooltipRef = useRef(null);
  const techData = TECH_DATA[children];
  const hasHover = !isMobile; // 👉 stable : sur mobile, jamais de hover

  // ✅ Calculer la position EXACTE par rapport au badge (pour desktop seulement)
  useEffect(() => {
    if (showTooltip && badgeRef.current && hasHover) {
      const rect = badgeRef.current.getBoundingClientRect();

      setPosition({
        top: placement === "bottom" ? rect.bottom : rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [showTooltip, placement, hasHover]);

  // ✅ Fermer quand on clique ailleurs (mobile + desktop)
  useEffect(() => {
    if (!showTooltip) return;

    const handleClickOutside = (e) => {
      if (badgeRef.current && badgeRef.current.contains(e.target)) return;
      if (tooltipRef.current && tooltipRef.current.contains(e.target)) return;
      setShowTooltip(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showTooltip]);

  const handleMouseEnter = () => {
    if (!hasHover) return; // pas de hover sur mobile
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!hasHover) return;
    setShowTooltip(false);
  };

  const handleClick = () => {
    // 👉 Sur mobile : toggle au tap
    if (hasHover) return;
    setShowTooltip((prev) => !prev);
  };

  // Style de position du tooltip
  const tooltipPositionStyle = hasHover
    ? // Desktop / tablette : ancré au badge
      {
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform:
          placement === "bottom"
            ? "translate(-50%, 8px)"
            : "translate(-50%, calc(-100% - 8px))",
      }
    : // Mobile : centré plein écran DIRECT (pas de flicker)
      {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };

  return (
    <div className="relative inline-block" ref={badgeRef}>
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[0.75rem] rounded-md border font-medium transition-all duration-200 cursor-pointer"
        style={{
          color: THEME.text,
          borderColor: `${color}40`,
          background: `${color}15`,
          transform: showTooltip ? "scale(1.15)" : "scale(1)",
          boxShadow: showTooltip ? `0 0 15px ${color}40` : "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {icon && (
          <span className="flex items-center justify-center w-4 h-4">
            {icon}
          </span>
        )}
        {children}
      </span>

      {/* ✅ Tooltip via portal (desktop + mobile) */}
      {showTooltip &&
        techData &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-[99999] p-4 border rounded-lg shadow-2xl w-72 max-w-[90vw] backdrop-blur-xl animate-fadeIn"
            style={{
              background: THEME.card,
              borderColor: `${color}60`,
              boxShadow: `0 10px 40px ${color}30, 0 0 0 1px ${color}20`,
              pointerEvents: hasHover ? "none" : "auto", // desktop: display-only, mobile: clickable
              ...tooltipPositionStyle,
            }}
          >
            {/* Flèche : uniquement sur desktop (ancrée au badge) */}
            {hasHover && (
              <>
                {placement === "bottom" ? (
                  // flèche en haut (tooltip sous le badge)
                  <div
                    className="absolute w-3 h-3"
                    style={{
                      background: THEME.card,
                      borderLeft: `1px solid ${color}60`,
                      borderTop: `1px solid ${color}60`,
                      top: "-6px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  />
                ) : (
                  // flèche en bas (tooltip au-dessus du badge)
                  <div
                    className="absolute w-3 h-3"
                    style={{
                      background: THEME.card,
                      borderRight: `1px solid ${color}60`,
                      borderBottom: `1px solid ${color}60`,
                      bottom: "-6px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  />
                )}
              </>
            )}

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

              {techData.list && (
                <div className="mb-3">
                  <p
                    className="mb-2 text-xs font-semibold"
                    style={{ color: THEME.brandFrom }}
                  >
                    📋 Top 10 des vulnérabilités :
                  </p>
                  <ul
                    className="text-[0.7rem] space-y-1"
                    style={{ color: THEME.sub }}
                  >
                    {techData.list.map((item, i) => (
                      <li key={i} className="leading-tight">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {techData.projects && techData.projects.length > 0 && (
                <div>
                  <p
                    className="text-xs font-semibold mb-1.5"
                    style={{ color: THEME.brandTo }}
                  >
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
          </div>,
          document.body
        )}
    </div>
  );
}

export default function AboutSection() {
  const isMobile = useIsMobile();

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

      <div className="container h-full px-3 py-4 mx-auto md:px-6 lg:py-8">
        {/* ✅ LAYOUT RESPONSIVE */}
        <div className="grid h-full grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2 lg:gap-6">
          {/* ========== COLONNE GAUCHE (ou haut sur mobile) ========== */}
          <div className="flex flex-col justify-between space-y-2 md:space-y-4">
            {/* Titre + Description */}
            <div className="w-full max-w-md mx-auto text-center">
              <h2
                className="mb-2 text-xl font-extrabold tracking-tight md:mb-3 md:text-2xl lg:text-4xl"
                style={{
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
              >
                À propos
              </h2>

              <div className="space-y-1.5 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed text-slate-300/90">
                <p>
                  <strong>Alternant développeur web chez CPMS</strong>, en
                  formation <strong>BTS SIO option SLAM</strong> à la Digital
                  School of Paris (IEF2I). Passionné par le développement, la
                  sécurité et l&apos;automatisation. Diplôme prévu{" "}
                  <strong>juin 2026</strong>.
                </p>

                <p className="italic text-slate-400/90">
                  De la banque au code : même exigence, nouvel horizon.
                </p>
              </div>
            </div>

            {/* FlipCard */}
            <div className="flex justify-center w-full">
              <CodeFlipCard />
            </div>

            {/* Boutons */}
            <div className="w-full max-w-md mx-auto space-y-2 md:space-y-3">
              {/* GitHub + Veille */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <a
                  href="https://github.com/smir75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 md:p-2.5 transition-all border rounded-xl hover:scale-105 hover:shadow-lg text-xs md:text-sm"
                  style={{
                    background: THEME.card,
                    borderColor: THEME.border,
                    color: THEME.text,
                  }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">GitHub</span>
                </a>

                <a
                  href="#veille"
                  className="flex items-center justify-center gap-1.5 p-2 md:p-2.5 transition-all border rounded-xl hover:scale-105 hover:shadow-lg text-xs md:text-sm"
                  style={{
                    background: THEME.card,
                    borderColor: THEME.border,
                    color: THEME.text,
                  }}
                >
                  <span className="text-lg md:text-xl">📡</span>
                  <span className="font-semibold">Veille</span>
                </a>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                <a
                  href="/cv.pdf"
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 md:px-4 md:py-2 bg-[#233062] hover:bg-[#2a3973] transition shadow-md text-xs md:text-sm font-semibold"
                >
                  📄 CV
                </a>

                <Link
                  to="/Contact"
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 md:px-4 md:py-2 bg-white/95 text-[#0b1020] hover:bg:white transition shadow-md text-xs md:text-sm font-semibold"
                >
                  ✉️ Contact
                </Link>

                <a
                  href="https://www.linkedin.com/in/mir-sagar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 md:px-4 md:py-2 bg-[#0f172a] border border-white/15 hover:bg-[#111b31] transition shadow-md text-xs md:text-sm font-semibold"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ========== COLONNE DROITE : Stack technique ========== */}
          <div className="flex items-center">
            <div
              className="relative w-full h-full p-2.5 md:p-3 lg:p-4 border rounded-xl backdrop-blur-xl"
              style={{
                background: THEME.card,
                borderColor: THEME.border,
                maxHeight: isMobile ? "none" : "calc(100vh - 100px)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  maskImage:
                    "radial-gradient(140% 100% at 100% 0%, transparent 0%, black 50%, black 100%)",
                  background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
                  opacity: 0.04,
                  animation: "spin-slow 18s linear infinite",
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />

              <h3
                className="relative mb-2 text-xs font-bold tracking-wide uppercase md:mb-3 md:text-sm"
                style={{ color: THEME.brandFrom }}
              >
                🛠️ Stack technique
                <span
                  className="ml-2 text-[0.55rem] md:text-[0.6rem] font-normal normal-case"
                  style={{ color: THEME.sub }}
                >
                  (survolez / touchez)
                </span>
              </h3>

              <div
                className="relative"
                style={{
                  overflowY: isMobile ? "visible" : "auto",
                  maxHeight: isMobile ? "none" : "calc(100vh - 180px)",
                }}
              >
                <div className="space-y-2 pb-3 md:space-y-2.5 md:pb-4">
                  {/* Frontend */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge
                        color="#61DAFB"
                        icon={TechLogos.React}
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        React
                      </TechBadge>
                      <TechBadge
                        color="#38BDF8"
                        icon={TechLogos.Tailwind}
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        Tailwind CSS
                      </TechBadge>
                      <TechBadge
                        color="#1572B6"
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        CSS3
                      </TechBadge>
                      <TechBadge
                        color="#E34F26"
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        HTML5
                      </TechBadge>
                      <TechBadge
                        color="#F7DF1E"
                        icon={TechLogos.JavaScript}
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        JavaScript
                      </TechBadge>
                      <TechBadge
                        color="#049DE1"
                        placement="bottom"
                        isMobile={isMobile}
                      >
                        Three.js
                      </TechBadge>
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge color="#777BB4" icon={TechLogos.PHP} isMobile={isMobile}>
                        PHP
                      </TechBadge>
                      <TechBadge color="#339933" icon={TechLogos.Node} isMobile={isMobile}>
                        Node.js
                      </TechBadge>
                      <TechBadge color="#3776AB" icon={TechLogos.Python} isMobile={isMobile}>
                        Python
                      </TechBadge>
                      <TechBadge color="#FF2D20" isMobile={isMobile}>
                        Laravel
                      </TechBadge>
                      <TechBadge color="#000000" isMobile={isMobile}>
                        Symfony
                      </TechBadge>
                      <TechBadge color="#CC6699" isMobile={isMobile}>
                        Composer
                      </TechBadge>
                      <TechBadge color="#CB3837" isMobile={isMobile}>
                        npm
                      </TechBadge>
                    </div>
                  </div>

                  {/* Base de données */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      Base de données & APIs
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge
                        color="#4479A1"
                        icon={TechLogos.MySQL}
                        isMobile={isMobile}
                      >
                        MySQL
                      </TechBadge>
                      <TechBadge color="#336791" isMobile={isMobile}>
                        PostgreSQL
                      </TechBadge>
                      <TechBadge color="#F29111" isMobile={isMobile}>
                        phpMyAdmin
                      </TechBadge>
                      <TechBadge color="#FF6C37" isMobile={isMobile}>
                        Postman
                      </TechBadge>
                      <TechBadge color="#E10098" isMobile={isMobile}>
                        REST API
                      </TechBadge>
                      <TechBadge color="#F7DF1E" isMobile={isMobile}>
                        JSON
                      </TechBadge>
                    </div>
                  </div>

                  {/* DevOps & Versioning */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      DevOps & Versioning
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge
                        color="#F05032"
                        icon={TechLogos.Git}
                        isMobile={isMobile}
                      >
                        Git
                      </TechBadge>
                      <TechBadge color="#181717" isMobile={isMobile}>
                        GitHub
                      </TechBadge>
                      <TechBadge
                        color="#2496ED"
                        icon={TechLogos.Docker}
                        isMobile={isMobile}
                      >
                        Docker
                      </TechBadge>
                      <TechBadge color="#2088FF" isMobile={isMobile}>
                        CI/CD
                      </TechBadge>
                      <TechBadge color="#607078" isMobile={isMobile}>
                        VMware
                      </TechBadge>
                      <TechBadge color="#183A61" isMobile={isMobile}>
                        VirtualBox
                      </TechBadge>
                    </div>
                  </div>

                  {/* Systèmes & Outils */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      Systèmes & Outils
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge color="#FCC624" isMobile={isMobile}>
                        Linux
                      </TechBadge>
                      <TechBadge color="#0078D6" isMobile={isMobile}>
                        Windows
                      </TechBadge>
                      <TechBadge color="#0078D6" isMobile={isMobile}>
                        Windows Server
                      </TechBadge>
                      <TechBadge color="#000000" isMobile={isMobile}>
                        macOS
                      </TechBadge>
                      <TechBadge color="#FCC624" isMobile={isMobile}>
                        WSL
                      </TechBadge>
                      <TechBadge
                        color="#007ACC"
                        icon={TechLogos.VSCode}
                        isMobile={isMobile}
                      >
                        VS Code
                      </TechBadge>
                      <TechBadge color="#0089D6" isMobile={isMobile}>
                        WAD
                      </TechBadge>
                    </div>
                  </div>

                  {/* Méthodo & Sécurité */}
                  <div>
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.sub }}
                    >
                      Méthodologies & Sécurité
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                      <TechBadge color="#009FDA" isMobile={isMobile}>
                        Agile / Scrum
                      </TechBadge>
                      <TechBadge color="#5C2D91" isMobile={isMobile}>
                        UML
                      </TechBadge>
                      <TechBadge color="#FF6C37" isMobile={isMobile}>
                        Merise
                      </TechBadge>
                      <TechBadge color="#E34F26" isMobile={isMobile}>
                        OWASP Top 10
                      </TechBadge>
                      <TechBadge color="#1A73E8" isMobile={isMobile}>
                        Tests unitaires
                      </TechBadge>
                      <TechBadge color="#10B981" isMobile={isMobile}>
                        Veille technologique
                      </TechBadge>
                    </div>
                  </div>

                  {/* Projets récents */}
                  <div
                    className="pt-1.5 mt-1.5 md:pt-2 md:mt-2 border-t"
                    style={{ borderColor: THEME.border }}
                  >
                    <h4
                      className="text-[0.6rem] md:text-[0.68rem] font-semibold mb-1 md:mb-1.5 uppercase tracking-wider"
                      style={{ color: THEME.brandTo }}
                    >
                      🚀 Projets récents
                    </h4>
                    <div
                      className="space-y-1 md:space-y-1.5 text-[0.65rem] md:text-[0.7rem]"
                      style={{ color: THEME.text }}
                    >
                      <p>
                        <span
                          className="font-bold"
                          style={{ color: THEME.brandFrom }}
                        >
                          💼 Intranet CPMS
                        </span>{" "}
                        — Admin, PDF, auth
                      </p>
                      <p>
                        <span
                          className="font-bold"
                          style={{ color: THEME.brandTo }}
                        >
                          🤖 Bot Discord
                        </span>{" "}
                        — Veille OWASP/CERT
                      </p>
                      <p>
                        <span
                          className="font-bold"
                          style={{ color: THEME.gold }}
                        >
                          🎨 Portfolio 3D
                        </span>{" "}
                        — React + Three.js
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="h-[0.1rem] w-full mt-2 md:mt-3"
                style={{ background: THEME.line }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
