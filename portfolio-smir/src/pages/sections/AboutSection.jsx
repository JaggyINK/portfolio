// src/pages/sections/AboutSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import CodeFlipCard from "../../components/CodeFlipCard";
import { TECH_DATA } from "../../components/TechData";
import useReveal from "../../hooks/useReveal";
import "./AboutSection.css";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ===== Golden ratio ===== */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  gold: "#d4af37",
  green: "#22c55e",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ===== KPI Data ===== */
const KPIS = [
  { value: "180+", label: "Utilisateurs quotidiens", color: THEME.brandFrom },
  { value: "-60%", label: "Tickets IT en moins", color: THEME.green },
  { value: "7+", label: "Années d\u2019exp\u00e9rience pro", color: THEME.brandTo },
  { value: "6+", label: "Applications livr\u00e9es", color: THEME.gold },
];

/* ===== What I bring ===== */
const STRENGTHS = [
  {
    title: "Fullstack op\u00e9rationnel",
    desc: "Python, Vue.js, Laravel 12, LDAP/AD",
    color: THEME.brandFrom,
  },
  {
    title: "Impact mesurable",
    desc: "\u221260% tickets \u00b7 4 sites live \u00b7 self-service 24/7",
    color: THEME.green,
  },
  {
    title: "S\u00e9curit\u00e9 by design",
    desc: "OWASP, bcrypt, AES, LDAP, SecNum 100%",
    color: THEME.brandTo,
  },
  {
    title: "Livraison document\u00e9e",
    desc: "Guides techniques, tutoriels, APIs REST",
    color: THEME.gold,
  },
];

/* ===== Domain chips ===== */
const DOMAINS = [
  { label: "Frontend", chips: ["React", "Vue.js", "Tailwind CSS", "Three.js"] },
  { label: "Backend", chips: ["Python", "PHP", "Laravel", "Node.js"] },
  { label: "Data & SI", chips: ["MySQL", "PostgreSQL", "SQLite", "APIs REST", "LDAP"] },
  { label: "DevOps", chips: ["Docker", "Git", "Vite", "CI/CD"] },
  { label: "E-commerce", chips: ["Shopify", "Liquid", "Custom apps"] },
  { label: "S\u00e9curit\u00e9", chips: ["OWASP", "Active Directory", "SSO"] },
];

/* ===== Grouped tech badges ===== */
const TECH_GROUPS = [
  { label: "Frontend", techs: [
    { name: "React", color: "#61DAFB" },
    { name: "Vue.js", color: "#42B883" },
    { name: "Three.js", color: "#049EF4" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "Next.js", color: "#E6ECF8" },
  ]},
  { label: "Backend", techs: [
    { name: "Python", color: "#3776AB" },
    { name: "PHP", color: "#777BB4" },
    { name: "Laravel", color: "#FF2D20" },
    { name: "Node.js", color: "#339933" },
  ]},
  { label: "Data & SI", techs: [
    { name: "MySQL", color: "#4479A1" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "SQLite", color: "#003B57" },
    { name: "APIs REST", color: "#E10098" },
  ]},
  { label: "DevOps", techs: [
    { name: "Docker", color: "#2496ED" },
    { name: "Git", color: "#F05032" },
    { name: "Vite", color: "#646CFF" },
  ]},
  { label: "E-commerce", techs: [
    { name: "Shopify", color: "#95BF46" },
  ]},
  { label: "S\u00e9curit\u00e9", techs: [
    { name: "OWASP", color: "#E34F26" },
    { name: "Active Directory", color: "#0078D4" },
  ]},
];

/* ===== TechBadge component ===== */
const TechBadge = React.memo(function TechBadge({ name, color }) {
  const data = TECH_DATA[name];
  return (
    <div className="tech-badge-wrapper">
      <span
        className="tech-badge"
        style={{
          color: THEME.text,
          borderColor: `${color}40`,
          background: `${color}15`,
        }}
      >
        {name}
      </span>
      {data && (
        <div className="tech-tooltip" style={{ borderColor: `${color}60` }}>
          <h4 className="tech-tooltip-title" style={{ color }}>
            {name}
          </h4>
          <p className="tech-tooltip-description">{data.description}</p>
          {data.projects && data.projects.length > 0 && (
            <div className="tech-tooltip-projects">
              <p className="tech-tooltip-projects-title" style={{ color: THEME.brandTo }}>
                Projets :
              </p>
              <div className="tech-tooltip-projects-list">
                {data.projects.map((project, i) => (
                  <span
                    key={i}
                    className="tech-tooltip-project-tag"
                    style={{ background: `${color}20`, color: THEME.text }}
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

/* ===== Main Section ===== */
export default function AboutSection() {
  const { ref, revealed } = useReveal();

  return (
    <section
      ref={ref}
      id="about"
      className={`about-section section-reveal${revealed ? " revealed" : ""}`}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${INV * PHI * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <div className="about-container">

        {/* ========== BLOC A — HEADER + SITUATION ========== */}
        <header className="about-header-card">
          <h2 className="about-name">Sagar Mir</h2>
          <p className="about-role">Développeur Fullstack</p>
          <div className="mx-auto mt-2 mb-3 h-[2px] w-32" style={{ background: THEME.line }} />

          {/* En poste pill */}
          <div className="about-status-pill">
            <span className="about-status-dot" />
            <span>En poste</span>
            <span className="about-status-sep">|</span>
            <span>Alternance CPMS &middot; depuis avril 2025</span>
          </div>

          {/* Stack actuel */}
          <p className="about-stack-line">
            Python &middot; Vue.js &middot; Laravel &middot; LDAP &middot; MySQL
            <span className="about-stack-dash">&mdash;</span>
            Intranet 180+ collaborateurs
          </p>

          {/* Formation */}
          <p className="about-edu-line">
            BTS SIO SLAM &middot; Digital School of Paris &middot; Diplôme en juin 2026
            <span className="about-stack-dash">&mdash;</span>
            <span style={{ color: THEME.brandFrom }}>Objectif : M2 Big Data &amp; IA</span>
          </p>
        </header>

        {/* ========== BLOC B — KPI STRIP ========== */}
        <div className="about-kpi-grid">
          {KPIS.map((k) => (
            <div key={k.label} className="about-kpi-card" style={{ borderColor: `${k.color}25` }}>
              <span className="about-kpi-value" style={{ color: k.color }}>{k.value}</span>
              <span className="about-kpi-label">{k.label}</span>
            </div>
          ))}
        </div>

        {/* ========== BLOC C — TWO COLUMNS ========== */}
        <div className="about-columns">
          {/* Left — Ce que j'apporte */}
          <div className="about-col-left">
            <h3 className="about-col-title" style={{ color: THEME.brandFrom }}>
              Ce que j&apos;apporte
            </h3>
            <div className="about-strengths">
              {STRENGTHS.map((s) => (
                <div key={s.title} className="about-strength-item" style={{ borderLeftColor: s.color }}>
                  <p className="about-strength-title" style={{ color: s.color }}>{s.title}</p>
                  <p className="about-strength-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Domaines clés */}
          <div className="about-col-right">
            <h3 className="about-col-title" style={{ color: THEME.brandTo }}>
              Domaines cl\u00e9s
            </h3>
            <div className="about-domains">
              {DOMAINS.map((d) => (
                <div key={d.label} className="about-domain-row">
                  <span className="about-domain-label">{d.label}</span>
                  <div className="about-domain-chips">
                    {d.chips.map((c) => (
                      <span key={c} className="about-domain-chip">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== BLOC D — TECH BADGES GROUPED ========== */}
        <div className="about-tech-grouped">
          {TECH_GROUPS.map((g) => (
            <div key={g.label} className="about-tech-group-row">
              <span className="about-tech-group-label">{g.label}</span>
              <div className="about-tech-group-badges">
                {g.techs.map((t) => (
                  <TechBadge key={t.name} name={t.name} color={t.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ========== BLOC E — CTAs ========== */}
        <div className="about-cta">
          <a href="/cv.pdf" className="about-cta-btn about-cta-btn-primary">
            Télécharger mon CV
          </a>
          <Link to="/Contact" className="about-cta-btn about-cta-btn-secondary">
            Me contacter
          </Link>
          <a
            href="https://www.linkedin.com/in/mir-sagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta-btn about-cta-btn-tertiary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JaggyINK"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta-btn about-cta-btn-tertiary"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/GZ59cJg5vR"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta-btn about-cta-btn-tertiary"
          >
            Discord
          </a>
        </div>

        {/* FlipCard */}
        <div className="about-flipcard">
          <CodeFlipCard />
        </div>

        <ScrollDownHint targetId="bts" />
      </div>
    </section>
  );
}
