// src/pages/sections/CertificationsSection.jsx
import React, { useMemo, useState, useCallback } from "react";

/* ============================
   Constantes "nombre d'or"
   ============================ */
const PHI = 1.618;
const INV = 1 / PHI;
const INV2 = INV * INV;

/* ============================
   Thème sobre & pro
   ============================ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.78)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============================
   Données certifications (gratuites, simples)
   Statuts mis à jour selon ta demande.
   ============================ */
const CERTS = [
  {
    id: "secnum",
    title: "SecNumAcadémie",
    provider: "ANSSI",
    track: "Sensibilisation cybersécurité",
    description:
      "Parcours officiel ANSSI : hygiène informatique, menaces, bonnes pratiques, RGPD / sécurité de l'info.",
    detail:
      "Modules e-learning interactifs. Évaluation finale en ligne. Très reconnu en France pour un socle cyber.",
    duration: "6–10 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "En cours",
    color: "#0ea5e9",
    link: "https://secnumacademie.gouv.fr/",
    tags: ["socle", "général", "conformité"],
  },
  {
    id: "nse1",
    title: "Fortinet NSE 1",
    provider: "Fortinet",
    track: "Network Security Associate",
    description:
      "Bases cybersécurité : menaces, terminologie, principes de protection et sensibilisation.",
    detail:
      "Cours en libre-service + quizz. Badge numérique délivré si réussite. Aucun prérequis technique.",
    duration: "3–5 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "En cours",
    color: "#ef4444",
    link: "https://training.fortinet.com/",
    tags: ["socle", "réseau"],
  },
  {
    id: "nse2",
    title: "Fortinet NSE 2",
    provider: "Fortinet",
    track: "Network Security Associate",
    description:
      "Approfondissement : panorama des solutions de sécurité et cas d'usage (FW, filtrage, SD-WAN…).",
    detail:
      "Toujours accessible gratuitement. Quizz par module. Badge délivré si réussite.",
    duration: "4–6 h",
    cost: "Gratuit",
    level: "Débutant+",
    status: "À passer",
    color: "#f59e0b",
    link: "https://training.fortinet.com/",
    tags: ["réseau", "panorama"],
  },
  {
    id: "nse3",
    title: "Fortinet NSE 3",
    provider: "Fortinet",
    track: "Network Security Associate",
    description:
      "Vue produit orientée solutions : mail secu, endpoint, sandbox, WAF, etc. Idéal pour le vocabulaire.",
    detail:
      "Toujours en self-paced gratuit. Permet d'avoir une vision transverse des briques de sécurité.",
    duration: "5–8 h",
    cost: "Gratuit",
    level: "Intermédiaire-",
    status: "À passer",
    color: "#10b981",
    link: "https://training.fortinet.com/",
    tags: ["réseau", "produits"],
  },
  {
    id: "cisco_intro",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    track: "Skills for All",
    description:
      "Initiation : acteurs, menaces, cryptographie, sécurité réseau et opportunités métiers sécurité.",
    detail:
      "Cours 100% en ligne, certif de complétion. Très accessible pour démarrer.",
    duration: "6–8 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "À passer",
    color: "#3b82f6",
    link: "https://skillsforall.com/",
    tags: ["socle", "réseau"],
  },
  {
    id: "ibm_fund",
    title: "Cybersecurity Fundamentals",
    provider: "IBM SkillsBuild",
    track: "Digital Badge",
    description:
      "Concepts fondamentaux : CIA triad, risques, contrôle d'accès, sécurité cloud et terminologie.",
    detail:
      "Parcours court avec badge numérique IBM à la clé. Idéal pour consolider le socle.",
    duration: "5–8 h",
    cost: "Gratuit",
    level: "Débutant",
    status: "À passer",
    color: "#8b5cf6",
    link: "https://skillsbuild.org/",
    tags: ["socle", "cloud"],
  },
];

/* ============================
   Filtres (coût / niveau / statut)
   ============================ */
const FILTERS = {
  all:      { label: "🌐 Tous",         color: "#64748b" },
  gratuit:  { label: "🆓 Gratuit",       color: "#0ea5e9" },
  debutant: { label: "🌱 Débutant",      color: "#10b981" },
  status_en_cours: { label: "🚧 En cours",  color: "#f59e0b" },
  status_a_passer: { label: "🎯 À passer",  color: "#6366f1" },
  status_termine:  { label: "✅ Terminé",   color: "#22c55e" },
};

function matchesFilter(cert, key) {
  if (key === "all") return true;
  if (key === "gratuit") return cert.cost.toLowerCase() === "gratuit";
  if (key === "debutant") return (cert.level || "").toLowerCase().includes("début");
  if (key === "status_en_cours") return cert.status === "En cours";
  if (key === "status_a_passer") return cert.status === "À passer";
  if (key === "status_termine") return cert.status === "Terminé";
  return true;
}

/* ============================
   Carte (flip + a11y)
   ============================ */
function CertCard({ c }) {
  const [flip, setFlip] = useState(false);
  const toggle = useCallback(() => setFlip((v) => !v), []);
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  // pastille statut
  const statusChip = c.status === "En cours"
    ? { txt: "En cours", cls: "bg-amber-500/20 text-amber-300 border-amber-400/30" }
    : c.status === "Terminé"
    ? { txt: "Terminé", cls: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" }
    : { txt: "À passer", cls: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30" };

  return (
    <div className="w-full">
      <div
        className="relative h-[17rem] cursor-pointer select-none"
        style={{ perspective: `${62 * INV}rem` }}
        onClick={toggle}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={flip}
        aria-label={`${c.title} — ${flip ? "détails" : "aperçu"}`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-[${Math.round(
            360 * PHI
          )}ms] [transform-style:preserve-3d] ${flip ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Face avant */}
          <div
            className="absolute inset-0 rounded-[1.0rem] p-[1.2rem] border shadow-lg backdrop-blur-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: THEME.border,
              background: THEME.card,
              boxShadow:
                "0 0.618rem 1.618rem rgba(0,0,0,.35), inset 0 0 0 0.062rem rgba(212,175,55,.08)",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Top row */}
              <div className="flex items-center justify-between mb-[0.6rem]">
                <span
                  className="px-[0.75rem] py-[0.45rem] text-[0.8rem] font-bold text-white rounded-full"
                  style={{ backgroundColor: c.color }}
                >
                  {c.provider}
                </span>

                <span className={`px-[0.6rem] py-[0.3rem] rounded-full text-[0.75rem] border ${statusChip.cls}`}>
                  {statusChip.txt}
                </span>
              </div>

              {/* Titre */}
              <h3
                className="mb-[0.5rem] font-extrabold leading-tight"
                style={{
                  color: c.color,
                  fontSize: `${1.15 * PHI}rem`,
                  lineHeight: 1.0 + INV2,
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
                title={c.title}
              >
                {c.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-[1.0rem] leading-relaxed" style={{ color: THEME.text }}>
                {c.description}
              </p>

              {/* Infos rapides */}
              <div className="pt-[0.6rem] mt-auto border-t border-white/10 text-[0.8rem] flex items-center justify-between" style={{ color: THEME.sub }}>
                <span>Durée : {c.duration}</span>
                <span className="font-semibold" style={{ color: THEME.brandFrom }}>
                  {c.cost}
                </span>
              </div>
            </div>
          </div>

          {/* Face arrière */}
          <div
            className="absolute inset-0 rounded-[1.0rem] p-[1.2rem] border shadow-lg backdrop-blur-xl [transform:rotateY(180deg)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: c.color,
              background: THEME.card,
            }}
          >
            <div className="flex flex-col h-full">
              <h4
                className="mb-[0.6rem] font-bold"
                style={{ color: c.color, fontSize: `${1.15}rem` }}
              >
                {c.track}
              </h4>

              <p className="flex-1 overflow-y-auto text-[0.95rem] leading-relaxed" style={{ color: THEME.text }}>
                {c.detail}
              </p>

              {/* Tags + bouton */}
              <div className="pt-[0.6rem] mt-[0.6rem] border-t border-white/10 flex items-center justify-between gap-[0.6rem]">
                <div className="flex flex-wrap gap-[0.35rem]">
                  {c.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-[0.6rem] py-[0.25rem] rounded-full text-[0.75rem] border border-white/10"
                      style={{ color: THEME.sub }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 px-[0.9rem] py-[0.55rem] text-[0.85rem] font-bold text-white rounded-lg transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ backgroundColor: c.color }}
                >
                  ↗ Aller au site
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
export default function CertificationsSection() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => CERTS.filter((c) => matchesFilter(c, filter)), [filter]);

  return (
    <section
      id="certifications"
      className="flex flex-col justify-center min-h-screen snap-center text-slate-100"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${(INV * PHI) * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: `${56 * PHI}rem`,
        }}
      >
        {/* Header */}
        <div className="mb-[1.0rem] text-center">
          <h2
            className="mb-[0.6rem] font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
              fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
              lineHeight: 1.0 + INV,
            }}
          >
            Certifications
          </h2>
          <p className="text-[0.95rem]" style={{ color: THEME.sub }}>
            Sélection gratuites et accessibles — statuts :{" "}
            <span className="font-semibold text-amber-300/90">En cours</span>,{" "}
            <span className="font-semibold text-indigo-300/90">À passer</span>,{" "}
            <span className="font-semibold text-emerald-300/90">Terminé</span>.
          </p>
          <div
            className="mx-auto h-[0.236rem] rounded-full mt-[0.6rem]"
            style={{
              width: `${8 * PHI}rem`,
              background: "linear-gradient(90deg, #22d3ee, #a855f7, #f59e0b)",
            }}
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center justify-center gap-[0.5rem] mb-[1.0rem]">
          {Object.entries(FILTERS).map(([k, meta]) => (
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

        {/* Grille */}
        <div className="grid gap-[1.2rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((c) => (
            <CertCard key={c.id} c={c} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-[1.5rem] text-center">
          <p className="text-[0.8rem] italic" style={{ color: THEME.sub }}>
            {filtered.length} certification{filtered.length > 1 ? "s" : ""} • Cliquez ou pressez Entrée pour retourner la carte
          </p>
        </div>
      </div>
    </section>
  );
}