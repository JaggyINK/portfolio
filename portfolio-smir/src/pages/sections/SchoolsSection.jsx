// src/pages/sections/SchoolsSection.jsx
import React from "react";
import useReveal from "../../hooks/useReveal";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ===== Système φ ===== */
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

/* ===== Données ===== */
const SCHOOLS = [
  {
    school: "IFCV",
    program: "BTS NDRC",
    full: "Négociation et Digitalisation de la Relation Client",
    link: "https://www.ifcv.fr/",
    rhythm: "1 sem. entreprise / 1 sem. cours",
    focus: ["Prospection & négociation", "Social selling & CRM", "Parcours client omnicanal", "E-commerce & outils digitaux"],
    color: "#22d3ee",
  },
  {
    school: "CFA Stephenson",
    program: "Titre SOFTEC",
    full: "Support des Opérations Fonctionnelles et Techniques",
    link: "https://stephenson-formation.fr/",
    rhythm: "1 sem. entreprise / 1 sem. cours",
    focus: ["Gestion opérationnelle", "Tech & support utilisateur", "Organisation de projet", "Qualité & méthodologie"],
    color: "#f59e0b",
  },
  {
    school: "DSP – IEF2I",
    program: "BTS SIO (SLAM)",
    full: "Services Informatiques aux Organisations",
    link: "https://www.digitalschool.paris/",
    rhythm: "1 sem. entreprise / 1 sem. cours",
    focus: ["Dév. applicatif (option SLAM)", "Bases de données & SQL", "Réseaux / Systèmes (SI)", "Sécurité & bonnes pratiques"],
    color: "#a855f7",
  },
];

/* ===== Compact school card ===== */
const SchoolCard = React.memo(function SchoolCard({ s }) {
  return (
    <a
      href={s.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border-l-[3px] transition-all hover:bg-white/[0.02]"
      style={{
        background: THEME.card,
        borderLeftColor: s.color,
      }}
    >
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-[0.88rem] font-bold" style={{ color: s.color }}>
            {s.school}
          </h4>
          <span
            className="px-1.5 py-0.5 text-[0.6rem] font-bold rounded"
            style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}
          >
            Alternance
          </span>
        </div>
        <p className="text-[0.78rem] font-semibold mb-0.5" style={{ color: THEME.text }}>
          {s.program}
        </p>
        <p className="text-[0.65rem] mb-2" style={{ color: THEME.sub }}>
          {s.full} · {s.rhythm}
        </p>

        <div className="flex flex-wrap gap-1">
          {s.focus.map((f) => (
            <span
              key={f}
              className="px-1.5 py-0.5 text-[0.6rem] rounded border border-white/6"
              style={{ color: THEME.sub }}
            >
              {f}
            </span>
          ))}
        </div>

        <span
          className="inline-block mt-2 text-[0.6rem] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: s.color }}
        >
          Site officiel ↗
        </span>
      </div>
    </a>
  );
});

/* ===== Section ===== */
export default function SchoolsSection() {
  const { ref, revealed } = useReveal();
  return (
    <section
      ref={ref}
      id="ecole"
      className={`min-h-[100svh] snap-start text-slate-100 section-reveal${revealed ? " revealed" : ""}`}
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
            Parcours scolaire
          </h2>
          <p className="mt-1.5 text-[0.85rem]" style={{ color: THEME.sub }}>
            Alternance continue — 1 semaine entreprise / 1 semaine cours
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* School cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {SCHOOLS.map((s) => (
            <SchoolCard key={s.school} s={s} />
          ))}
        </div>

        {/* Objectif M2 — compact banner */}
        <div
          className="rounded-xl border px-5 py-4"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.04), rgba(168,85,247,0.04))",
            borderColor: "rgba(34,211,238,0.15)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎯</span>
              <div>
                <h3
                  className="text-[0.88rem] font-extrabold"
                  style={{
                    fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                    color: THEME.brandFrom,
                  }}
                >
                  Objectif : M2 Big Data & IA
                </h3>
                <p className="text-[0.72rem]" style={{ color: THEME.sub }}>
                  Consolider dev / data / cloud — viser ML, data engineering & MLOps
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:ml-auto">
              {["Python data", "SQL avancé", "ETL / Spark", "MLOps", "IA générative"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[0.62rem] font-medium rounded-md"
                  style={{
                    background: "rgba(34,211,238,0.08)",
                    color: THEME.brandFrom,
                    border: "1px solid rgba(34,211,238,0.18)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[0.72rem]" style={{ color: THEME.sub }}>
          Documents et attestations disponibles sur demande
        </p>

        <ScrollDownHint targetId="bts" />
      </div>
    </section>
  );
}
