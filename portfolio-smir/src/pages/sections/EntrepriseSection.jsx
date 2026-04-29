// src/pages/sections/EntrepriseSection.jsx
import React from "react";
import CodeFlipCard from "../../components/CodeFlipCard";
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
  gold: "#d4af37",
  green: "#22c55e",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ===== Identité CPMS (vue CEJM) ===== */
const FACTS = [
  { label: "Forme juridique", value: "SAS", color: THEME.brandFrom },
  { label: "Création", value: "1948", color: THEME.gold },
  { label: "Secteur", value: "Santé & Prévoyance", color: THEME.brandTo },
  { label: "Effectif", value: "≈ 180–200", color: THEME.green },
  { label: "CA 2023", value: "≈ 19 M€", color: THEME.gold },
  { label: "Capital social", value: "≈ 2,7 M€", color: THEME.brandFrom },
];

const SITES = [
  { city: "Paris 9ᵉ", role: "Siège social", addr: "4 rue Auber" },
  { city: "Bezannes (51)", role: "Centre de gestion", addr: "6 rue Henri-Moissan" },
];

/* ===== Place sur le marché (CEJM) ===== */
const MARKET = [
  {
    title: "Mission",
    desc: "Gestion déléguée des régimes santé & prévoyance pour assureurs, entreprises et particuliers.",
    color: THEME.brandFrom,
  },
  {
    title: "Clients & partenaires",
    desc: "Assureurs, courtiers, entreprises souscriptrices, assurés individuels (B2B & B2C).",
    color: THEME.brandTo,
  },
  {
    title: "Concurrence",
    desc: "Acteurs de la délégation de gestion (Almerys, Cegedim, Viamedis, Santiane).",
    color: THEME.gold,
  },
  {
    title: "Différenciation",
    desc: "Indépendance familiale (1948), proximité, qualité de service, conformité.",
    color: THEME.green,
  },
];

/* ===== Mon poste & mes missions (CEJM) ===== */
const POSTE = [
  { icon: "🎯", label: "Poste", value: "Développeur Web — Alternance" },
  { icon: "📅", label: "Période", value: "Depuis avril 2025 (BTS SIO SLAM)" },
  { icon: "🏢", label: "Service", value: "WEB" },
  { icon: "🧭", label: "Rythme", value: "1 semaine entreprise / 1 semaine cours" },
];

const MISSIONS = [
  "Concevoir et développer l'intranet self-service (180+ collaborateurs)",
  "Intégrer Active Directory & AS400 (LDAP, ODBC) pour authentification unifiée",
  "Réduire la charge IT support : changements MDP, déverrouillage compte (-60% tickets)",
  "Documenter les livrables (guides admin, guides utilisateur, cahiers des charges)",
  "Participer à la veille sécurité (OWASP, NIST, CERT-FR) sur les composants auth",
];

/* ===== Conformité (CEJM volet juridique) ===== */
const CONFORMITE = [
  { tag: "RGPD", desc: "Données de santé — registre des traitements, minimisation, DPO" },
  { tag: "OWASP 2025", desc: "A01 Broken Access Control, A07 Authentication Failures" },
  { tag: "NIST SP 800-63B", desc: "Politique mots de passe & cycle d'authentification" },
  { tag: "Code monétaire", desc: "Cadre des contrats d'assurance & prévoyance" },
];

/* ===== Section ===== */
export default function EntrepriseSection() {
  const { ref, revealed } = useReveal();

  return (
    <section
      ref={ref}
      id="entreprise"
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

        {/* ── HEADER ── */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(34,211,238,0.1)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.25)" }}
            >
              Entreprise d&apos;accueil
            </span>
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(212,175,55,0.1)", color: THEME.gold, border: "1px solid rgba(212,175,55,0.25)" }}
            >
              CEJM · Lecture économique
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
            CPMS — Centre de Prévoyance Médico-Sociale
          </h2>
          <p className="mt-1.5 text-[0.9rem]" style={{ color: THEME.sub }}>
            Gestion déléguée santé & prévoyance — Paris 9ᵉ · Bezannes
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* ── BLOC 1 — IDENTITÉ (chiffres clés) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="p-3 text-center border rounded-xl"
              style={{
                background: THEME.card,
                borderColor: `${f.color}25`,
              }}
            >
              <p className="text-[0.85rem] font-extrabold" style={{ color: f.color }}>{f.value}</p>
              <p className="text-[0.62rem] mt-0.5" style={{ color: THEME.sub }}>{f.label}</p>
            </div>
          ))}
        </div>

        {/* ── BLOC 2 — CARTE MATRIX (fiche détaillée animée) ── */}
        <div className="mb-6">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: THEME.sub }}>
            Fiche détaillée — cliquer pour basculer
          </h3>
          <CodeFlipCard />
        </div>

        {/* ── BLOC 3 — DEUX COLONNES : MARCHÉ + MON POSTE ── */}
        <div className="grid grid-cols-1 gap-5 mb-6 lg:grid-cols-2">
          {/* Gauche — Marché */}
          <div
            className="p-4 border rounded-2xl"
            style={{ background: THEME.card, borderColor: "rgba(255,255,255,0.06)" }}
          >
            <h3 className="text-[0.95rem] font-extrabold mb-3" style={{ color: THEME.brandFrom, fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}>
              Place sur le marché
            </h3>
            <div className="space-y-2.5">
              {MARKET.map((m) => (
                <div
                  key={m.title}
                  className="rounded-lg p-2.5 border-l-[3px]"
                  style={{ background: "rgba(255,255,255,0.02)", borderLeftColor: m.color }}
                >
                  <p className="text-[0.78rem] font-bold mb-0.5" style={{ color: m.color }}>{m.title}</p>
                  <p className="text-[0.76rem]" style={{ color: THEME.sub }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Droite — Mon poste */}
          <div
            className="p-4 border rounded-2xl"
            style={{ background: THEME.card, borderColor: "rgba(255,255,255,0.06)" }}
          >
            <h3 className="text-[0.95rem] font-extrabold mb-3" style={{ color: THEME.brandTo, fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}>
              Mon poste & mes missions
            </h3>
            <div className="space-y-1.5 mb-3">
              {POSTE.map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-[0.8rem]" style={{ color: THEME.text }}>
                  <span className="text-base">{p.icon}</span>
                  <span style={{ color: THEME.sub }}>{p.label} :</span>
                  <span className="font-semibold">{p.value}</span>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5">
              {MISSIONS.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.78rem]" style={{ color: THEME.sub }}>
                  <span className="mt-[0.45rem] flex-shrink-0 w-1 h-1 rounded-full" style={{ background: THEME.brandTo }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BLOC 4 — CONFORMITÉ (juridique CEJM) ── */}
        <div
          className="p-4 mb-6 border rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.04), rgba(168,85,247,0.04))",
            borderColor: "rgba(212,175,55,0.15)",
          }}
        >
          <h3 className="text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: THEME.sub }}>
            Cadre juridique & conformité
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CONFORMITE.map((c) => (
              <div key={c.tag} className="px-3 py-2 border rounded-lg" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-[0.78rem] font-bold" style={{ color: THEME.gold }}>{c.tag}</p>
                <p className="text-[0.72rem] mt-0.5" style={{ color: THEME.sub }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOC 5 — SITES + LIEN ── */}
        <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 border sm:flex-row rounded-xl"
          style={{ background: THEME.card, borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-wrap gap-3">
            {SITES.map((s) => (
              <div key={s.city} className="text-[0.74rem]">
                <span className="font-bold" style={{ color: THEME.text }}>{s.city}</span>
                <span style={{ color: THEME.sub }}> — {s.role} · {s.addr}</span>
              </div>
            ))}
          </div>
          <a
            href="https://www.cpms.fr/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.78rem] font-medium rounded-lg border transition-all hover:scale-[1.03]"
            style={{
              background: "rgba(34,211,238,0.08)",
              borderColor: "rgba(34,211,238,0.25)",
              color: THEME.brandFrom,
            }}
          >
            cpms.fr ↗
          </a>
        </div>

        <ScrollDownHint targetId="projets" />
      </div>
    </section>
  );
}
