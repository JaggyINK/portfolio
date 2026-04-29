// src/pages/sections/CertificationsSection.jsx
import React, { useState, useCallback } from "react";
import useReveal from "../../hooks/useReveal";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ============ Système φ ============ */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Données ============ */
const CERTS = [
  {
    id: "secnum",
    title: "SecNum Académie",
    provider: "ANSSI",
    family: "cyber",
    track: "Sensibilisation cybersécurité",
    description: "Parcours officiel ANSSI : hygiène informatique, menaces, bonnes pratiques, RGPD.",
    detail: "4 modules validés avec 100% de réussite : Panorama SSI, Sécurité de l'Authentification, Sécurité sur Internet, Sécurité du Poste de Travail et Nomadisme. Attestation délivrée le 23 janvier 2026.",
    duration: "6–10 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "done",
    color: "#0ea5e9",
    link: "https://secnumacademie.gouv.fr/",
    docUrl: "/docs/secnum.pdf",
    tags: ["socle", "général", "conformité"],
  },
  {
    id: "hr_css",
    title: "CSS",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Front-end · Skill Certification",
    description: "Sélecteurs, propriétés, Flexbox, Grid, animations, responsive, pseudo-classes.",
    detail: "Certification CSS HackerRank — épreuve technique chronométrée validée. Couvre layout (Flex/Grid), animations, transitions, media queries, sélecteurs avancés et pseudo-éléments.",
    duration: "60–90 min",
    cost: "Gratuit",
    level: "Intermédiaire",
    status: "done",
    color: "#06B6D4",
    link: "https://www.hackerrank.com/skills-verification/css",
    docUrl: "/docs/css certificate.pdf",
    tags: ["frontend", "css", "ui"],
  },
  {
    id: "hr_python",
    title: "Python (Basic)",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Programming · Skill Certification",
    description: "Syntaxe, types, structures de contrôle, fonctions, collections, exceptions.",
    detail: "Certification Python Basic HackerRank — épreuve algorithmique validée. Couvre conditions, boucles, listes, dictionnaires, gestion d'erreurs et bases de la POO.",
    duration: "90 min",
    cost: "Gratuit",
    level: "Débutant",
    status: "done",
    color: "#3776AB",
    link: "https://www.hackerrank.com/skills-verification/python_basic",
    docUrl: "/docs/python_basic certificate.pdf",
    tags: ["python", "algo", "backend"],
  },
  {
    id: "hr_rest",
    title: "REST API (Intermediate)",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Back-end · Skill Certification",
    description: "Consommation d'APIs REST : pagination, filtres, parsing JSON, gestion d'erreurs HTTP.",
    detail: "Certification REST API Intermediate HackerRank — épreuve pratique de consommation d'APIs : requêtes paginées, agrégation de résultats, parsing complexe de réponses JSON.",
    duration: "90 min",
    cost: "Gratuit",
    level: "Intermédiaire",
    status: "done",
    color: "#E10098",
    link: "https://www.hackerrank.com/skills-verification/rest_api_intermediate",
    docUrl: "/docs/rest_api_intermediate certificate.pdf",
    tags: ["api", "http", "json"],
  },
  {
    id: "hr_sql_basic",
    title: "SQL (Basic)",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Data · Skill Certification",
    description: "SELECT, WHERE, ORDER BY, fonctions agrégat, filtres simples.",
    detail: "Certification SQL Basic HackerRank — épreuve technique validée. Sélection de données, filtres conditionnels, tri, agrégations basiques (COUNT, SUM, AVG).",
    duration: "60 min",
    cost: "Gratuit",
    level: "Débutant",
    status: "done",
    color: "#4479A1",
    link: "https://www.hackerrank.com/skills-verification/sql_basic",
    docUrl: "/docs/sql_basic certificate.pdf",
    tags: ["sql", "data"],
  },
  {
    id: "hr_sql_intermediate",
    title: "SQL (Intermediate)",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Data · Skill Certification",
    description: "JOIN multiples, GROUP BY, sous-requêtes, fonctions de fenêtrage simples.",
    detail: "Certification SQL Intermediate HackerRank — JOIN INNER/LEFT/RIGHT, GROUP BY avec HAVING, sous-requêtes corrélées, manipulation de plusieurs tables.",
    duration: "60–90 min",
    cost: "Gratuit",
    level: "Intermédiaire",
    status: "done",
    color: "#336791",
    link: "https://www.hackerrank.com/skills-verification/sql_intermediate",
    docUrl: "/docs/sql_intermediate certificate.pdf",
    tags: ["sql", "joins", "data"],
  },
  {
    id: "hr_sql_advanced",
    title: "SQL (Advanced)",
    provider: "HackerRank",
    family: "hackerrank",
    track: "Data · Skill Certification",
    description: "Window functions, CTE, requêtes complexes, optimisation, indexation.",
    detail: "Certification SQL Advanced HackerRank — CTE récursives, fonctions de fenêtrage (ROW_NUMBER, RANK, LAG/LEAD), requêtes analytiques, optimisation de plans d'exécution.",
    duration: "90 min",
    cost: "Gratuit",
    level: "Avancé",
    status: "done",
    color: "#003B57",
    link: "https://www.hackerrank.com/skills-verification/sql_advanced",
    docUrl: "/docs/sql_advanced certificate.pdf",
    tags: ["sql", "window", "cte", "advanced"],
  },
  {
    id: "nse1",
    title: "Fortinet NSE 1",
    provider: "Fortinet",
    track: "Network Security Associate",
    description: "Bases cybersécurité : menaces, terminologie, principes de protection.",
    detail: "Cours en libre-service + quizz. Badge numérique délivré si réussite.",
    duration: "3–5 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "wip",
    color: "#ef4444",
    link: "https://training.fortinet.com/",
    tags: ["socle", "réseau"],
  },
  {
    id: "nse2",
    title: "Fortinet NSE 2",
    provider: "Fortinet",
    track: "Network Security Associate",
    description: "Approfondissement : solutions de sécurité, cas d'usage (FW, filtrage, SD-WAN).",
    detail: "Toujours accessible gratuitement. Quizz par module. Badge délivré si réussite.",
    duration: "4–6 h",
    cost: "Gratuit",
    level: "Débutant+",
    status: "wip",
    color: "#f59e0b",
    link: "https://training.fortinet.com/",
    tags: ["réseau", "panorama"],
  },
  {
    id: "nse3",
    title: "Fortinet NSE 3",
    provider: "Fortinet",
    track: "Network Security Associate",
    description: "Vue produit : mail secu, endpoint, sandbox, WAF. Idéal pour le vocabulaire.",
    detail: "Self-paced gratuit. Vision transverse des briques de sécurité.",
    duration: "5–8 h",
    cost: "Gratuit",
    level: "Intermédiaire",
    status: "wip",
    color: "#10b981",
    link: "https://training.fortinet.com/",
    tags: ["réseau", "produits"],
  },
  {
    id: "cisco_intro",
    title: "Introduction to Cybersecurity",
    provider: "Cisco",
    track: "Skills for All",
    description: "Initiation : acteurs, menaces, cryptographie, sécurité réseau.",
    detail: "Cours 100% en ligne, certif de complétion. Très accessible.",
    duration: "6–8 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "wip",
    color: "#3b82f6",
    link: "https://skillsforall.com/",
    tags: ["socle", "réseau"],
  },
  {
    id: "ibm_fund",
    title: "Cybersecurity Fundamentals",
    provider: "IBM",
    track: "Digital Badge",
    description: "CIA triad, risques, contrôle d'accès, sécurité cloud.",
    detail: "Parcours court avec badge numérique IBM à la clé.",
    duration: "5–8 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "wip",
    color: "#8b5cf6",
    link: "https://skillsbuild.org/",
    tags: ["socle", "cloud"],
  },
];

const CATEGORIES = [
  {
    key: "done",
    label: "Obtenues",
    icon: "✅",
    color: "#10b981",
    description: "Certifications validées",
  },
  {
    key: "wip",
    label: "En cours",
    icon: "🚀",
    color: "#f59e0b",
    description: "En préparation ou à passer",
  },
];

/* ============ Carte certif (flip) ============ */
function CertCard({ c }) {
  const [flip, setFlip] = useState(false);
  const toggle = useCallback(() => setFlip((v) => !v), []);
  const onKeyDown = useCallback(
    (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } },
    [toggle]
  );

  return (
    <div
      className="relative h-[15rem] cursor-pointer select-none"
      style={{ perspective: "38rem" }}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={flip}
      aria-label={`${c.title} — ${flip ? "détails" : "aperçu"}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flip ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Face avant */}
        <div
          className="absolute inset-0 rounded-xl p-4 border backdrop-blur-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: THEME.border,
            background: THEME.card,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span
                className="px-2 py-1 text-[0.7rem] font-bold text-white rounded-full"
                style={{ backgroundColor: c.color }}
              >
                {c.provider}
              </span>
              <span className="text-[0.7rem] font-medium" style={{ color: THEME.sub }}>
                {c.duration}
              </span>
            </div>

            <h3
              className="mb-1.5 font-extrabold leading-tight text-[1rem]"
              style={{
                color: c.color,
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              }}
            >
              {c.title}
            </h3>

            <p className="flex-1 text-[0.82rem] leading-relaxed" style={{ color: THEME.text }}>
              {c.description}
            </p>

            <div className="pt-2 mt-auto border-t border-white/8 flex items-center justify-between">
              <span className="text-[0.72rem] font-semibold" style={{ color: THEME.brandFrom }}>
                {c.cost}
              </span>
              <span className="text-[0.65rem]" style={{ color: THEME.sub }}>cliquer pour détails</span>
            </div>
          </div>
        </div>

        {/* Face arrière */}
        <div
          className="absolute inset-0 rounded-xl p-4 border backdrop-blur-xl [transform:rotateY(180deg)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: c.color,
            background: THEME.card,
          }}
        >
          <div className="flex flex-col h-full">
            <h4 className="mb-1 text-[0.85rem] font-bold" style={{ color: c.color }}>
              {c.track}
            </h4>

            <p className="flex-1 overflow-y-auto text-[0.8rem] leading-relaxed" style={{ color: THEME.text }}>
              {c.detail}
            </p>

            <div className="pt-2 mt-2 border-t border-white/8 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {c.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded text-[0.65rem] border border-white/8"
                    style={{ color: THEME.sub }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5 shrink-0">
                {c.docUrl && (
                  <a
                    href={c.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 text-[0.72rem] font-bold text-white rounded-lg hover:scale-105 transition-transform"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    Certificat
                  </a>
                )}
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1.5 text-[0.72rem] font-bold text-white rounded-lg hover:scale-105 transition-transform"
                  style={{ backgroundColor: c.color }}
                >
                  Site ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Carte catégorie (comme ProjectsSection) ============ */
function CategoryCard({ cat, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] text-left"
      style={{
        background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}04)`,
        borderColor: `${cat.color}30`,
        boxShadow: `0 8px 32px ${cat.color}10`,
        padding: "2rem 1.5rem",
      }}
    >
      {/* Glow top */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
      />

      <div className="flex items-center gap-4">
        <span className="text-3xl">{cat.icon}</span>
        <div className="flex-1">
          <h3
            className="text-lg font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: cat.color,
            }}
          >
            {cat.label}
          </h3>
          <p className="text-[0.8rem] mt-0.5" style={{ color: THEME.sub }}>
            {cat.description}
          </p>
        </div>
        <span
          className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold"
          style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }}
        >
          {count}
        </span>
      </div>
    </button>
  );
}

/* ============ Section ============ */
export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { ref, revealed } = useReveal();

  const doneCerts = CERTS.filter((c) => c.status === "done");
  const wipCerts = CERTS.filter((c) => c.status === "wip");

  const activeCerts = activeCategory === "done" ? doneCerts : activeCategory === "wip" ? wipCerts : [];

  return (
    <section
      ref={ref}
      id="certifications"
      className={`flex flex-col justify-center min-h-screen snap-start text-slate-100 section-reveal${revealed ? " revealed" : ""}`}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${INV * PHI * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>
        {/* Header */}
        <header className="text-center mb-6">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              color: THEME.text,
            }}
          >
            Certifications
          </h2>
          <p className="mt-1.5 text-[0.88rem]" style={{ color: THEME.sub }}>
            Cybersécurité, dev & data — vérifiables et reconnues
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* Vue catégories OU vue détail */}
        {activeCategory === null ? (
          /* ── 2 cartes catégorie ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.key}
                cat={cat}
                count={cat.key === "done" ? doneCerts.length : wipCerts.length}
                onClick={() => setActiveCategory(cat.key)}
              />
            ))}
          </div>
        ) : (
          /* ── Vue détaillée ── */
          <div>
            {/* Bouton retour */}
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 mb-5 px-3 py-1.5 text-[0.8rem] font-medium rounded-lg border border-white/10 hover:bg-white/5 transition-all"
              style={{ color: THEME.sub }}
            >
              ← Retour
            </button>

            {/* Titre catégorie active */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">
                {CATEGORIES.find((c) => c.key === activeCategory)?.icon}
              </span>
              <h3
                className="text-lg font-extrabold"
                style={{
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                  color: CATEGORIES.find((c) => c.key === activeCategory)?.color,
                }}
              >
                {CATEGORIES.find((c) => c.key === activeCategory)?.label}
              </h3>
              <span className="text-[0.75rem]" style={{ color: THEME.sub }}>
                ({activeCerts.length} certification{activeCerts.length > 1 ? "s" : ""})
              </span>
            </div>

            {/* Grille de cartes — groupée par famille pour la vue "done" */}
            {activeCategory === "done" ? (
              <div className="space-y-6">
                {(() => {
                  const families = [
                    { key: "hackerrank", label: "HackerRank — Skill Verification", color: "#1ba94c" },
                    { key: "cyber", label: "Cybersécurité & réseaux", color: "#0ea5e9" },
                  ];
                  return families.map((fam) => {
                    const list = activeCerts.filter((c) => (c.family || "cyber") === fam.key);
                    if (!list.length) return null;
                    return (
                      <div key={fam.key}>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wider uppercase rounded-full"
                            style={{
                              background: `${fam.color}15`,
                              color: fam.color,
                              border: `1px solid ${fam.color}30`,
                            }}
                          >
                            {fam.label}
                          </span>
                          <span className="text-[0.72rem]" style={{ color: THEME.sub }}>
                            ({list.length})
                          </span>
                        </div>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {list.map((c) => (
                            <CertCard key={c.id} c={c} />
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {activeCerts.map((c) => (
                  <CertCard key={c.id} c={c} />
                ))}
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-[0.72rem]" style={{ color: THEME.sub }}>
          Cliquer sur une carte pour voir les détails
        </p>

        <ScrollDownHint targetId="entreprise" />
      </div>
    </section>
  );
}
