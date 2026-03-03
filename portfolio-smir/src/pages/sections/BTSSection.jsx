import React, { useState } from "react";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ============ Système φ (nombre d'or) ============ */
const PHI = 1.618;
const INV = 1 / PHI;

/* ============ Thème sobre & pro ============ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Épreuves ============ */
const EPREUVES = [
  {
    code: "U4",
    label: "Conception & maintenance de solutions informatiques",
    icon: "🛠",
    color: "#22d3ee",
    coef: "4",
    format: "Écrit (4h) + Oral (40 min)",
    description:
      "Analyse d'un SI existant, proposition d'améliorations, conception technique d'une solution et rédaction de documentation.",
    details: [
      "Étude de cas sur un système d'information existant",
      "Proposer des évolutions ou corrections techniques",
      "Maquettage, diagrammes UML, modélisation de données",
      "Justifier ses choix d'architecture et de technologie",
    ],
    perso: "Mon projet U4 : Intranet CPMS — V1 en production, V2 en développement (Laravel 12, Vue 3, LDAP, AS400).",
  },
  {
    code: "U5",
    label: "Production & fourniture de services informatiques",
    icon: "🚀",
    color: "#a855f7",
    coef: "4",
    format: "Oral (40 min) — portfolio de réalisations",
    description:
      "Présentation de projets réalisés en entreprise et en formation. Le candidat défend ses réalisations devant un jury.",
    details: [
      "Portefeuille de compétences avec preuves concrètes",
      "Réalisations en situation professionnelle (alternance)",
      "Projets personnels ou scolaires documentés",
      "Démonstration technique et argumentation des choix",
    ],
    perso: "Mon projet U5 : FamiliDocs — coffre administratif numérique familial (Python/Flask, AES, 41 tests).",
  },
  {
    code: "U6",
    label: "Parcours de professionnalisation",
    icon: "📋",
    color: "#d4af37",
    coef: "3",
    format: "Oral (20 min) — synthèse du parcours",
    description:
      "Synthèse du parcours professionnel : missions en entreprise, veille technologique, posture professionnelle et évolution.",
    details: [
      "Bilan des missions réalisées en alternance/stage",
      "Présentation de la veille technologique menée",
      "Analyse réflexive sur sa posture professionnelle",
      "Projection et projet professionnel post-diplôme",
    ],
    perso: "Mon parcours : Alternance 2 ans chez CPMS, veille cybersécurité (Bot Discord OWASP/CERT-FR), projets freelance.",
  },
];

/* ============ Options SLAM / SISR ============ */
const OPTIONS = [
  {
    id: "slam",
    label: "SLAM",
    full: "Solutions Logicielles et Applications Métiers",
    color: THEME.brandFrom,
    active: true,
    icon: "💻",
    focus: "Développement",
    skills: [
      "Conception & développement d'applications web, mobile, API",
      "Modélisation & gestion de bases de données",
      "Intégration dans un SI existant (intranet, outils métiers)",
      "Tests, qualité logicielle, documentation technique",
    ],
    techs: ["React", "Python", "PHP", "SQL", "Node.js", "API REST"],
  },
  {
    id: "sisr",
    label: "SISR",
    full: "Solutions d'Infrastructure, Systèmes et Réseaux",
    color: THEME.brandTo,
    active: false,
    icon: "🔧",
    focus: "Infrastructure",
    skills: [
      "Administration systèmes & réseaux",
      "Virtualisation, déploiement de services, supervision",
      "Sécurité d'exploitation & continuité de service",
      "Maintenance et support utilisateurs",
    ],
    techs: ["Linux", "Windows Server", "Active Directory", "VMware", "Cisco", "Firewall"],
  },
];

/* ============ Liens officiels ============ */
const LINKS = [
  { label: "Fiche RNCP", url: "https://www.francecompetences.fr/recherche/rncp/35340/" },
  { label: "Onisep", url: "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers" },
  { label: "Cyclades", url: "https://candidat.examens-concours.gouv.fr/cyccandidat/portal/login" },
];

/* ============ Section principale ============ */
export default function BTSSection() {
  const [openEp, setOpenEp] = useState(null);

  return (
    <section
      id="bts"
      className="min-h-[100svh] snap-start text-slate-100"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${0.9 * PHI}rem ${0.9 * PHI}rem`,
      }}
    >
      <style>{`
        @keyframes pulse-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>

        {/* ── HEADER ── */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{
                background: "rgba(212,175,55,0.12)",
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              Niveau 5 &middot; Bac+2
            </span>
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{
                background: "rgba(34,211,238,0.1)",
                color: THEME.brandFrom,
                border: `1px solid rgba(34,211,238,0.25)`,
              }}
            >
              Diplôme d&apos;État
            </span>
          </div>

          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              background: "linear-gradient(135deg, #E6ECF8 30%, #22d3ee 70%, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BTS SIO
          </h2>
          <p
            className="mt-1.5 text-[0.95rem] font-medium tracking-wide"
            style={{ color: THEME.sub }}
          >
            Services Informatiques aux Organisations
          </p>

          {/* Ligne déco */}
          <div className="mx-auto mt-4 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* ── MON PARCOURS (compact) ── */}
        <div
          className="mx-auto mb-8 px-5 py-3.5 rounded-xl text-center max-w-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(168,85,247,0.06))",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
        >
          <p style={{ color: THEME.text, fontSize: "0.88rem", lineHeight: 1.65 }}>
            <strong style={{ color: THEME.brandFrom }}>Digital School of Paris</strong>{" "}
            (groupe IEF2I) &middot; Option <strong>SLAM</strong> &middot; Alternance chez{" "}
            <strong>CPMS</strong> &middot; Diplôme visé{" "}
            <strong style={{ color: "#d4af37" }}>juin 2026</strong>
          </p>
        </div>

        {/* ── DEUX OPTIONS : SLAM vs SISR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="relative rounded-2xl overflow-hidden border transition-all duration-300"
              style={{
                borderColor: opt.active ? `${opt.color}40` : "rgba(255,255,255,0.08)",
                background: THEME.card,
                boxShadow: opt.active
                  ? `0 0 30px ${opt.color}15, 0 8px 32px rgba(0,0,0,0.3)`
                  : "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {/* Glow en haut pour l'option active */}
              {opt.active && (
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${opt.color}, transparent)`,
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                />
              )}

              <div className="p-5">
                {/* En-tête option */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-2xl">{opt.icon}</span>
                      <h3
                        className="text-xl font-extrabold tracking-tight"
                        style={{
                          fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                          color: opt.color,
                        }}
                      >
                        {opt.label}
                      </h3>
                      {opt.active && (
                        <span
                          className="px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-full"
                          style={{
                            background: `${opt.color}20`,
                            color: opt.color,
                            border: `1px solid ${opt.color}35`,
                          }}
                        >
                          Mon option
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[0.78rem] font-medium"
                      style={{ color: THEME.sub }}
                    >
                      {opt.full}
                    </p>
                  </div>
                </div>

                {/* Focus badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-[0.75rem] font-semibold"
                  style={{
                    background: `${opt.color}10`,
                    color: opt.color,
                    border: `1px solid ${opt.color}20`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: opt.color }} />
                  {opt.focus}
                </div>

                {/* Compétences */}
                <ul className="space-y-2 mb-5">
                  {opt.skills.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[0.85rem]"
                      style={{ color: THEME.text }}
                    >
                      <span
                        className="mt-[0.35rem] flex-shrink-0 w-1 h-1 rounded-full"
                        style={{ background: opt.color }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* Techs */}
                <div className="flex flex-wrap gap-1.5">
                  {opt.techs.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[0.72rem] font-medium rounded-md"
                      style={{
                        background: opt.active ? `${opt.color}12` : "rgba(255,255,255,0.04)",
                        color: opt.active ? opt.color : THEME.sub,
                        border: `1px solid ${opt.active ? `${opt.color}20` : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ligne décorative basse */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: opt.active
                    ? `linear-gradient(90deg, transparent, ${opt.color}80, transparent)`
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ── ÉPREUVES PROFESSIONNELLES ── */}
        <div className="mb-8">
          <h3
            className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: THEME.sub }}
          >
            Épreuves professionnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EPREUVES.map((ep) => {
              const isOpen = openEp === ep.code;
              return (
                <button
                  key={ep.code}
                  onClick={() => setOpenEp(isOpen ? null : ep.code)}
                  className="relative rounded-xl border text-center text-left transition-all duration-300 cursor-pointer group"
                  style={{
                    background: isOpen ? `linear-gradient(135deg, ${ep.color}08, ${ep.color}04)` : THEME.card,
                    borderColor: isOpen ? `${ep.color}40` : "rgba(255,255,255,0.06)",
                    boxShadow: isOpen ? `0 0 24px ${ep.color}10` : "none",
                  }}
                >
                  {/* Top glow quand ouvert */}
                  {isOpen && (
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${ep.color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Header compact (toujours visible) */}
                  <div className="px-4 py-3.5 text-center">
                    <span className="text-lg block mb-1">{ep.icon}</span>
                    <span
                      className="block text-sm font-extrabold tracking-tight mb-0.5 transition-colors duration-200"
                      style={{
                        fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                        color: isOpen ? ep.color : THEME.text,
                      }}
                    >
                      {ep.code}
                    </span>
                    <span
                      className="block text-[0.76rem] leading-snug"
                      style={{ color: THEME.sub }}
                    >
                      {ep.label}
                    </span>

                    {/* Indicateur cliquable */}
                    <span
                      className="inline-block mt-2 text-[0.65rem] font-medium tracking-wide transition-all duration-200"
                      style={{ color: isOpen ? ep.color : "rgba(255,255,255,0.25)" }}
                    >
                      {isOpen ? "▲ fermer" : "▼ détails"}
                    </span>
                  </div>

                  {/* Détail extensible */}
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: isOpen ? "600px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className="px-4 pb-4 text-left"
                      style={{ borderTop: `1px solid ${ep.color}15` }}
                    >
                      {/* Coef + Format */}
                      <div className="flex flex-wrap gap-2 mt-3 mb-3">
                        <span
                          className="px-2 py-0.5 text-[0.68rem] font-bold rounded-md"
                          style={{
                            background: `${ep.color}15`,
                            color: ep.color,
                            border: `1px solid ${ep.color}25`,
                          }}
                        >
                          Coef. {ep.coef}
                        </span>
                        <span
                          className="px-2 py-0.5 text-[0.68rem] rounded-md"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            color: THEME.sub,
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {ep.format}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-[0.82rem] leading-relaxed mb-3"
                        style={{ color: THEME.text }}
                      >
                        {ep.description}
                      </p>

                      {/* Détails en liste */}
                      <ul className="space-y-1.5 mb-3">
                        {ep.details.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[0.8rem]"
                            style={{ color: THEME.sub }}
                          >
                            <span
                              className="mt-[0.38rem] flex-shrink-0 w-1 h-1 rounded-full"
                              style={{ background: ep.color }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>

                      {/* Mon projet perso */}
                      <div
                        className="px-3 py-2.5 rounded-lg text-[0.78rem] leading-relaxed"
                        style={{
                          background: `${ep.color}08`,
                          borderLeft: `2px solid ${ep.color}60`,
                          color: THEME.text,
                        }}
                      >
                        <strong style={{ color: ep.color }}>Mon projet :</strong>{" "}
                        {ep.perso}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── LIENS OFFICIELS ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[0.78rem] font-medium rounded-lg border transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.1)",
                color: THEME.sub,
              }}
            >
              {l.label}
              <span style={{ color: THEME.brandFrom, fontSize: "0.7rem" }}>↗</span>
            </a>
          ))}
        </div>

        <ScrollDownHint targetId="parcours" />
      </div>
    </section>
  );
}
