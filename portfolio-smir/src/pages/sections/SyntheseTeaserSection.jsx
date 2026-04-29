// src/pages/sections/SyntheseTeaserSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import useReveal from "../../hooks/useReveal";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ===== Système φ ===== */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.18)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  gold: "#d4af37",
  green: "#22c55e",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ===== Aperçu rapide des 6 compétences ===== */
const COMPETENCES = [
  { code: "C1", label: "Gérer le patrimoine informatique", color: "#22d3ee" },
  { code: "C2", label: "Répondre aux incidents & demandes", color: "#a855f7" },
  { code: "C3", label: "Développer la présence en ligne", color: "#10b981" },
  { code: "C4", label: "Travailler en mode projet", color: "#f59e0b" },
  { code: "C5", label: "Mettre à disposition un service", color: "#ef4444" },
  { code: "C6", label: "Organiser son développement pro", color: "#d4af37" },
];

/* ===== Stats du tableau ===== */
const STATS = [
  { value: "12", label: "Réalisations" },
  { value: "6", label: "Compétences couvertes" },
  { value: "3", label: "Blocs (formation + 1ʳᵉ + 2ᵉ année)" },
  { value: "2026", label: "Session BTS" },
];

/* ===== Section ===== */
export default function SyntheseTeaserSection() {
  const { ref, revealed } = useReveal();

  return (
    <section
      ref={ref}
      id="synthese"
      className={`min-h-[100svh] snap-start text-slate-100 flex flex-col justify-center section-reveal${revealed ? " revealed" : ""}`}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.06), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${INV * PHI * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>

        {/* ── HEADER ── */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(212,175,55,0.12)", color: THEME.gold, border: "1px solid rgba(212,175,55,0.3)" }}
            >
              Épreuve E5 · Session 2026
            </span>
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(34,211,238,0.1)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.25)" }}
            >
              BTS SIO SLAM
            </span>
          </div>

          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              background: "linear-gradient(135deg, #E6ECF8 30%, #d4af37 60%, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tableau de synthèse E5
          </h2>
          <p className="mt-1.5 text-[0.9rem] max-w-2xl mx-auto" style={{ color: THEME.sub }}>
            Vue officielle des réalisations professionnelles croisées avec les 6 compétences du référentiel BTS SIO
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* ── STATS RAPIDES ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl border p-3 text-center"
              style={{
                background: THEME.card,
                borderColor: "rgba(212,175,55,0.18)",
                animation: `fadeIn 0.4s ease-out ${i * 0.08}s both`,
              }}
            >
              <p className="text-[1.4rem] font-extrabold leading-none" style={{ color: THEME.gold, fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}>
                {s.value}
              </p>
              <p className="text-[0.66rem] mt-1 leading-tight" style={{ color: THEME.sub }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── 6 COMPÉTENCES (mini-grid) ── */}
        <div className="mb-6">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: THEME.sub }}>
            Les 6 compétences évaluées
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {COMPETENCES.map((c) => (
              <div
                key={c.code}
                className="rounded-lg border px-2.5 py-2 text-center"
                style={{ background: `${c.color}08`, borderColor: `${c.color}28` }}
              >
                <p className="text-[0.72rem] font-extrabold mb-0.5" style={{ color: c.color, fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}>
                  {c.code}
                </p>
                <p className="text-[0.65rem] leading-snug" style={{ color: THEME.sub }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA — page complète ── */}
        <Link
          to="/synthese-e5"
          className="block group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all hover:scale-[1.01]"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(168,85,247,0.06))",
            borderColor: "rgba(212,175,55,0.30)",
            boxShadow: "0 8px 32px rgba(212,175,55,0.12)",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
              opacity: 0.7,
            }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-4xl">📋</span>
            <div className="flex-1">
              <h3
                className="text-[1.1rem] font-extrabold mb-1"
                style={{
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                  color: THEME.gold,
                }}
              >
                Ouvrir la page complète
              </h3>
              <p className="text-[0.85rem] leading-relaxed" style={{ color: THEME.text }}>
                Tableau officiel reproduit fidèlement : en-tête candidat, 12 réalisations × 6 compétences, version imprimable A4 paysage pour le jury.
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="px-2 py-0.5 text-[0.65rem] font-semibold rounded-md" style={{ background: "rgba(34,211,238,0.12)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.25)" }}>
                  Vue tableau
                </span>
                <span className="px-2 py-0.5 text-[0.65rem] font-semibold rounded-md" style={{ background: "rgba(168,85,247,0.12)", color: THEME.brandTo, border: "1px solid rgba(168,85,247,0.25)" }}>
                  Imprimable PDF
                </span>
                <span className="px-2 py-0.5 text-[0.65rem] font-semibold rounded-md" style={{ background: "rgba(34,197,94,0.12)", color: THEME.green, border: "1px solid rgba(34,197,94,0.25)" }}>
                  Sources cliquables
                </span>
              </div>
            </div>
            <span
              className="self-end sm:self-center text-[0.85rem] font-bold px-4 py-2 rounded-xl border transition-all group-hover:translate-x-1"
              style={{
                background: "rgba(212,175,55,0.15)",
                color: THEME.gold,
                border: "1px solid rgba(212,175,55,0.4)",
              }}
            >
              Ouvrir →
            </span>
          </div>
        </Link>

        <p className="mt-4 text-center text-[0.7rem]" style={{ color: THEME.sub }}>
          La page s&apos;ouvre dans le même onglet — bouton « Retour au portfolio » disponible
        </p>

        <ScrollDownHint targetId="certifications" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
