// src/pages/sections/AboutSection.jsx
import React from "react";
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
  { value: "180+", label: "Utilisateurs intranet CPMS", color: THEME.brandFrom },
  { value: "3 ans", label: "Reporting & KPIs (banque)", color: THEME.green },
  { value: "−60%", label: "Tickets IT en moins", color: THEME.brandTo },
  { value: "Sept. 2026", label: "Alternance Data Analyst", color: THEME.gold },
];

/* ===== What I bring ===== */
const STRENGTHS = [
  {
    title: "Sens du métier",
    desc: "3 ans à La Banque Postale : KPIs commerciaux quotidiens, reporting hiérarchie, traduction besoin métier → indicateur",
    color: THEME.gold,
  },
  {
    title: "Data en projet réel",
    desc: "SQL (HackerRank Basic→Advanced), pandas, modélisation MCD/MLD, contrôle qualité",
    color: THEME.brandFrom,
  },
  {
    title: "Dataviz & BI",
    desc: "Looker Studio + GA4 en prod sur Extazy.fr · Power BI en montée",
    color: THEME.brandTo,
  },
  {
    title: "Livraison & impact",
    desc: "Apps en prod (180+ users), e-commerce qui tourne, projets BTS qui aboutissent",
    color: THEME.green,
  },
];

/* ===== Domain chips ===== */
const DOMAINS = [
  { label: "Data Analytics", chips: ["SQL avancé", "Python / pandas", "Power BI", "Looker Studio", "GA4", "Excel"] },
  { label: "Modélisation & SI", chips: ["MCD / MLD", "Recueil de besoins", "Méthodes Agiles", "MySQL", "PostgreSQL", "ODBC"] },
  { label: "Dev fullstack", chips: ["Python", "Vue.js", "Laravel 12", "React", "APIs REST"] },
  { label: "E-commerce & marketing", chips: ["Shopify", "GA4", "Meta Ads", "SEO"] },
  { label: "DevOps & outillage", chips: ["Git / GitHub", "Jira", "Docker", "Vite"] },
  { label: "Sécurité", chips: ["Active Directory / LDAP", "OWASP", "RGPD", "SecNum 100%"] },
];

/* ===== Grouped tech badges ===== */
const TECH_GROUPS = [
  { label: "Data Analytics", techs: [
    { name: "SQL", color: "#336791" },
    { name: "Python (pandas)", color: "#3776AB" },
    { name: "Power BI", color: "#F2C811" },
    { name: "Looker Studio", color: "#4285F4" },
    { name: "Google Analytics 4", color: "#E37400" },
    { name: "Excel", color: "#217346" },
    { name: "MCD / MLD", color: "#a855f7" },
  ]},
  { label: "Bases & SI", techs: [
    { name: "MySQL", color: "#4479A1" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "SQLite", color: "#003B57" },
    { name: "APIs REST", color: "#E10098" },
    { name: "Active Directory", color: "#0078D4" },
  ]},
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
  { label: "DevOps & outillage", techs: [
    { name: "Git", color: "#F05032" },
    { name: "Jira", color: "#0052CC" },
    { name: "Docker", color: "#2496ED" },
    { name: "Vite", color: "#646CFF" },
  ]},
  { label: "E-commerce", techs: [
    { name: "Shopify", color: "#95BF46" },
  ]},
  { label: "Sécurité", techs: [
    { name: "OWASP", color: "#E34F26" },
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
          <p className="about-role">Futur Data Analyst &middot; Développeur Fullstack</p>
          <div className="mx-auto mt-2 mb-3 h-[2px] w-32" style={{ background: THEME.line }} />

          {/* Pill recherche alternance */}
          <div
            className="about-status-pill"
            style={{
              background: "rgba(212,175,55,0.1)",
              borderColor: "rgba(212,175,55,0.3)",
              color: THEME.gold,
            }}
          >
            <span className="about-status-dot" style={{ background: THEME.gold, boxShadow: `0 0 8px ${THEME.gold}` }} />
            <span>🎯 Recherche alternance</span>
            <span className="about-status-sep">|</span>
            <span>Data Analyst / Business Analyst &middot; rentrée septembre 2026</span>
          </div>

          {/* Stack data */}
          <p className="about-stack-line">
            SQL &middot; Python &middot; Power BI &middot; Looker Studio &middot; GA4
            <span className="about-stack-dash">&mdash;</span>
            <span style={{ color: THEME.brandFrom }}>Stack data orientée métier</span>
          </p>

          {/* Poste actuel */}
          <p className="about-stack-line" style={{ color: THEME.sub }}>
            <span className="about-status-dot" style={{ background: THEME.green, marginRight: "0.4rem", display: "inline-block", verticalAlign: "middle" }} />
            <strong style={{ color: THEME.text }}>En alternance chez CPMS</strong> (gestionnaire de mutuelle) depuis avril 2025
            <span className="about-stack-dash">&mdash;</span>
            Intranet Laravel/Vue.js, requêtes MySQL/ODBC, dashboards KPIs direction
          </p>

          {/* Formation */}
          <p className="about-edu-line">
            BTS SIO SLAM &middot; Digital School of Paris &middot; Juin 2026
            <span className="about-stack-dash">&mdash;</span>
            <span style={{ color: THEME.brandFrom }}>Bachelor Data &amp; IA &middot; PSTB Paris &middot; Sept. 2026</span>
          </p>
        </header>

        {/* ========== BLOC A.bis — Pitch Data Analyst ========== */}
        <div
          className="rounded-xl border px-4 py-3 my-3 mx-auto max-w-3xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.05), rgba(168,85,247,0.04))",
            borderColor: "rgba(34,211,238,0.18)",
          }}
        >
          <p className="text-[0.85rem] leading-relaxed" style={{ color: THEME.text }}>
            Je viens de la <strong style={{ color: THEME.gold }}>relation client</strong> (3 ans à La Banque Postale),
            je passe aujourd&apos;hui par un <strong style={{ color: THEME.brandFrom }}>BTS SIO SLAM en alternance</strong>{" "}
            chez CPMS, et je m&apos;oriente vers <strong style={{ color: THEME.brandTo }}>l&apos;analyse de données</strong>.
            <br />
            <span style={{ color: THEME.sub, fontStyle: "italic" }}>
              Ce n&apos;est pas un virage : c&apos;est l&apos;aboutissement logique d&apos;un parcours toujours mis face à des chiffres, des KPIs et des décisions à prendre à partir de données.
            </span>
          </p>
        </div>

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
              Domaines clés
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
          <a href="mailto:jaggyinkgraph@gmail.com" className="about-cta-btn about-cta-btn-secondary">
            Me contacter
          </a>
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

        <ScrollDownHint targetId="parcours" />
      </div>
    </section>
  );
}
