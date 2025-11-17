// src/pages/sections/ProjectsSection.jsx
import React, { useState, useMemo, useCallback } from "react";

/* ============================
   Constantes “nombre d’or”
   ============================ */
const PHI = 1.618;           // φ
const INV = 1 / PHI;         // ≈ 0.618
const INV2 = INV * INV;      // ≈ 0.382

/* ============================
   Données projets (tes valeurs)
   ============================ */
const PROJECTS = [
  {
    id: "cpms",
    title: "Intranet CPMS",
    date: "2025",
    description: "Features d'administration et self-care pour les collaborateurs",
    detail:
      "Développement : changement de mot de passe, réactivation de compte, déverrouillage via question de sécurité, intégration d'un lecteur PDF et amélioration UX visuelle. Inclut captures d'écran et documentation technique/user.",
    category: "entreprise",
    color: "#22d3ee",
    docUrl: "/docs/cpms/index.html",
  },
  {
    id: "alafrenchcare",
    title: "alafrenchcare.com",
    date: "2024",
    description: "E-commerce cosmétique (CBD) — projet perso/pro",
    detail:
      "Site Shopify : cahier des charges, workflows commande, automatisations (webhooks), packaging et captures d'écran du site.",
    category: "autodidacte",
    color: "#f59e0b",
    docUrl: "https://alafrenchcare.com",
  },
  {
    id: "alafrenchfr",
    title: "alafrench.fr",
    date: "2024",
    description: "Marque de vêtements de luxe — vitrine & boutique",
    detail:
      "Site Shopify / vitrine : identité visuelle, fiches produits, SEO et captures d'écran. Société mère : H2O (regroupe alafrench & alafrenchcare).",
    category: "autodidacte",
    color: "#a855f7",
    docUrl: "https://alafrench.fr",
  },
  {
    id: "portfolio",
    title: "Portfolio 3D",
    date: "2024",
    description: "Portfolio personnel interactif (React + Three.js)",
    detail:
      "Expérience 3D immersive : scènes, assets, optimisation WebGL, et documentation technique + captures d'écran/vidéos du rendu.",
    category: "autodidacte",
    color: "#10b981",
    docUrl: "/docs/portfolio/index.html",
  },
  {
    id: "flipper",
    title: "Flipper Zero",
    date: "2023–2024",
    description: "Développement / pentest hardware",
    detail:
      "Dossiers techniques et comptes-rendus de pentest, infos sur firmwares alternatifs, scripts et procédures (à usage pédagogique).",
    category: "autodidacte",
    color: "#ef4444",
    docUrl: "/docs/flipper/index.html",
  },
  {
    id: "dev_annonce",
    title: "Annonz",
    date: "2024",
    description: "Plateforme d'annonces (développée de A à Z)",
    detail:
      "Conception et réalisation (CRUD, recherche full-text, upload, auth, modération). Documentation fonctionnelle & technique fournie.",
    category: "scolaire",
    color: "#3b82f6",
    docUrl: "/docs/dev_annonce/index.html",
  },
  {
    id: "tp_sql",
    title: "TP Injection SQL",
    date: "2024",
    description: "Exercice de sécurité — rapport & mitigations",
    detail:
      "PDF explicatif : démonstration d'exploitation SQLi, preuves de concept et correctifs (prepared statements / ORM).",
    category: "scolaire",
    color: "#8b5cf6",
    docUrl: "/docs/tp_sql/report.pdf",
  },
  {
    id: "linux_installs",
    title: "Installations Linux",
    date: "2023–2024",
    description: "Guides d'installation et scripts d'automatisation",
    detail:
      "Tutoriels : Kali / Ubuntu / Lubuntu, scripts d'automatisation ISO, partitionnement, configuration réseau et optimisations VM.",
    category: "scolaire",
    color: "#14b8a6",
    docUrl: "/docs/linux_installs/guide.pdf",
  },
  {
    id: "bootable_keys",
    title: "Clés bootables",
    date: "2023",
    description: "Outils de secours — création clés USB",
    detail:
      "Procédure pas-à-pas pour créer clés bootables (Windows/Linux) et exemples d'usage en récupération système.",
    category: "scolaire",
    color: "#eab308",
    docUrl: "/docs/bootable_keys/guide.pdf",
  },
  {
    id: "win_server",
    title: "Windows Server 2022",
    date: "2023",
    description: "Gestion parc & AD",
    detail:
      "Mises en place AD, GPO, images de déploiement, monitoring et procédures d'administration.",
    category: "scolaire",
    color: "#06b6d4",
    docUrl: "/docs/win_server/guide.pdf",
  },
  {
    id: "virtual_vm",
    title: "VirtualBox & VMware",
    date: "2023",
    description: "Virtualisation multi-OS",
    detail:
      "Best practices : snapshots, réseau (bridged/NAT), optimisation disque, backup et restauration de VM.",
    category: "scolaire",
    color: "#6366f1",
    docUrl: "/docs/virtual_vm/guide.pdf",
  },
];


/* ============================
   Badges catégories
   ============================ */
const CATEGORY_META = {
  all: { label: "Tous", color: "#64748b" },
  scolaire: { label: "Scolaire", color: "#3b82f6" },
  entreprise: { label: "Entreprise", color: "#10b981" },
  autodidacte: { label: "Autodidacte", color: "#f59e0b" },
};

/* ============================
   Carte projet (flip + a11y)
   ============================ */
function ProjectCard({ p }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = useCallback(() => setIsFlipped((v) => !v), []);
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div className="w-full">
      <div
        className="relative h-[12.5rem] cursor-pointer select-none"
        style={{
          perspective: `${62 * INV}rem`, // ≈ 38rem
        }}
        onClick={toggle}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={`${p.title} — ${isFlipped ? "détails" : "aperçu"}`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-[${Math.round(
            380 * PHI
          )}ms] [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Face avant */}
          <div
            className="absolute inset-0 rounded-[1.0rem] p-[0.9rem] border shadow-lg border-white/10 bg-slate-900/90 backdrop-blur-sm"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow:
                "0 0.618rem 1.618rem rgba(0,0,0,.35), inset 0 0 0 0.062rem rgba(212,175,55,.08)",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-[0.5rem]">
                <span
                  className="px-[0.618rem] py-[0.382rem] text-[0.7rem] font-bold text-white rounded-full"
                  style={{ backgroundColor: CATEGORY_META[p.category].color }}
                >
                  {CATEGORY_META[p.category].label}
                </span>
                <span className="text-[0.75rem] font-medium text-slate-400">
                  {p.date}
                </span>
              </div>

              <h3
                className="mb-[0.382rem] font-extrabold leading-tight"
                style={{
                  color: p.color,
                  fontSize: `${1.0 * PHI}rem`, // ≈ 1.618rem
                  lineHeight: 1.0 + INV2,
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
                title={p.title}
              >
                {p.title}
              </h3>

              <p className="flex-1 text-[0.925rem] leading-relaxed text-slate-300">
                {p.description}
              </p>

              <div className="pt-[0.618rem] mt-auto border-t border-white/10">
                <p className="text-[0.7rem] italic text-center text-slate-500">
                  Cliquer / Entrée pour détails →
                </p>
              </div>
            </div>
          </div>

          {/* Face arrière */}
          <div
            className="absolute inset-0 rounded-[1.0rem] p-[0.9rem] border shadow-lg bg-slate-800/95 backdrop-blur-sm [transform:rotateY(180deg)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: p.color,
            }}
          >
            <div className="flex flex-col h-full">
              <h4
                className="mb-[0.6rem] font-bold"
                style={{ color: p.color, fontSize: `${1.0}rem` }}
              >
                Détails
              </h4>

              <p className="flex-1 overflow-y-auto text-[0.85rem] leading-relaxed text-slate-300">
                {p.detail}
              </p>

              <div className="pt-[0.618rem] mt-[0.618rem] border-t border-white/10">
                <a
                  href={p.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full py-[0.6rem] text-[0.8rem] font-bold text-center text-white transition-transform rounded-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ backgroundColor: p.color }}
                >
                  📄 Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================
   Section
   ============================ */
export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="projets"
      className="flex flex-col justify-center min-h-screen px-4 py-12 snap-center text-slate-100 bg-[rgba(8,12,24,0.3)] backdrop-blur-[2px] border-t border-white/5"
      style={{
        ["--phi"]: PHI,
        background:
        "radial-gradient(60% 60% at 30% 20%, rgba(212,175,55,.08), transparent 62%), radial-gradient(40% 40% at 80% 70%, rgba(164,29,40,.06), transparent 62%)",
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: `${56 * PHI}rem`,
          padding: `${(INV * PHI) * PHI}rem ${1.0 * PHI}rem`, // ≈ 1.0*φ² vertical, φ horizontal
        }}
      >
        {/* Header */}
        <div className="mb-[1.0rem] text-center">
          <h2
            className="mb-[0.6rem] font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: "#e2e8f0",
              fontSize: `${1.618 * PHI}rem`, // ≈ 2.618rem
              lineHeight: 1.0 + INV, // ≈ 1.618
            }}
          >
            Projets
          </h2>
          <div className="mx-auto w-[6.18rem] h-[0.236rem] rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center justify-center gap-[0.5rem] mb-[1.0rem]">
          {Object.entries(CATEGORY_META).map(([k, meta]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-[1.0rem] py-[0.6rem] rounded-full font-bold text-white text-[0.8rem] transition-all focus:outline-none ${
                filter === k
                  ? "scale-105 ring-2 ring-white/30 shadow-lg"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: meta.color }}
              aria-pressed={filter === k}
            >
              {meta.label}
            </button>
          ))}
        </div>

        {/* Grille compacte (4 → 3 → 2 → 1) */}
        <div className="grid gap-[0.9rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-[1.0rem] text-center">
          <p className="text-[0.75rem] italic text-slate-500">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""} • Cliquez ou pressez Entrée pour
            retourner la carte
          </p>
        </div>
      </div>
    </section>
  );
}
