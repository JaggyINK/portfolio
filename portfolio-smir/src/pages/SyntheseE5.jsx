// src/pages/SyntheseE5.jsx
import React from "react";
import { Link } from "react-router-dom";

/* ===== Système φ ===== */
const PHI = 1.618;

const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.62)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  gold: "#d4af37",
  green: "#22c55e",
  border: "rgba(255,215,0,0.18)",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ===== En-tête épreuve ===== */
const HEAD = {
  diplome: "BTS SERVICES INFORMATIQUES AUX ORGANISATIONS",
  session: "SESSION 2026",
  candidat: "MIR Sagar",
  numero: "02243002949",
  centre: "Digital School of Paris — IEF2I",
  option: "SLAM",
  portfolio: "https://m-sagar.vercel.app/",
};

/* ===== 6 colonnes de compétences ===== */
const COLS = [
  {
    key: "patrimoine",
    label: "Gérer le patrimoine informatique",
    bullets: [
      "Recenser et identifier les ressources numériques",
      "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique",
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      "Gérer des sauvegardes",
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
    color: "#22d3ee",
  },
  {
    key: "incidents",
    label: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    bullets: [
      "Collecter, suivre et orienter des demandes",
      "Traiter des demandes concernant les services réseau et système, applicatifs",
      "Traiter des demandes concernant les applications",
    ],
    color: "#a855f7",
  },
  {
    key: "presence",
    label: "Développer la présence en ligne de l'organisation",
    bullets: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
    color: "#10b981",
  },
  {
    key: "projet",
    label: "Travailler en mode projet",
    bullets: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      "Planifier les activités",
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
    color: "#f59e0b",
  },
  {
    key: "service",
    label: "Mettre à disposition des utilisateurs un service informatique",
    bullets: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      "Déployer un service",
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
    color: "#ef4444",
  },
  {
    key: "devpro",
    label: "Organiser son développement professionnel",
    bullets: [
      "Mettre en place son environnement d'apprentissage personnel",
      "Mettre en œuvre des outils et stratégies de veille informationnelle",
      "Gérer son identité professionnelle",
      "Développer son projet professionnel",
    ],
    color: "#d4af37",
  },
];

/* ===== Réalisations groupées par bloc ===== */
const BLOCKS = [
  {
    title: "Réalisations en cours de formation",
    color: "#22d3ee",
    items: [
      {
        title: "FamiliDocs (Coffre administratif numérique familial)",
        period: "09/2025 → 06/2026",
        bullets: [
          "Application web Flask/Python (MVC)",
          "BDD SQLite 9 tables, ORM SQLAlchemy",
          "Chiffrement AES, auth bcrypt, RBAC 3 rôles",
          "41 tests pytest, versioning documents",
          "Dashboard, notifications, tâches, tags",
        ],
        skills: ["patrimoine", "incidents", "presence", "projet", "service"],
      },
      {
        title: "Bot Discord (Veille technologique automatisée)",
        period: "01/2025 → 06/2025",
        bullets: [
          "Bot Python (discord.py, asyncio, feedparser)",
          "Agrégation RSS multi-sources (OWASP, CERT-FR, MSRC...)",
          "Publication automatique 24h/24 avec embeds Discord",
          "Commandes interactives (!veille, !ldap, !web, !news)",
          "Filtrage par mots-clés, gestion erreurs et retry",
        ],
        skills: ["patrimoine", "incidents", "service", "devpro"],
      },
      {
        title: "Portfolio 3D interactif (Sagario)",
        period: "09/2025 → 06/2026",
        bullets: [
          "React 19, Three.js, React Three Fiber, Drei, Vite 5",
          "Scène 3D lunaire navigable (physique custom, quaternions, inertie)",
          "5 stations de quiz interactives (JS, Python, SQL, Docker, PHP)",
          "97 fichiers (41 composants 3D, 8+ hooks custom, système d'événements)",
          "Portfolio classique responsive (9 sections), déployé sur Vercel",
        ],
        skills: ["presence", "projet", "service", "devpro"],
      },
      {
        title: "Flipper Zero (Pentest Hardware)",
        period: "09/2025 → 06/2026",
        bullets: [
          "Analyse des protocoles RFID, NFC, Sub-GHz, IR, BadUSB",
          "Tests de sécurité sur matériel personnel (badges, signaux radio)",
          "Documentation des vulnérabilités et remédiation",
          "Veille cybersécurité et cadre légal (Art. 323 Code pénal)",
          "Intégration Wireshark, SDR++, Proxmark3",
        ],
        skills: ["patrimoine", "devpro"],
      },
      {
        title: "Annonz (Plateforme d'annonces en ligne)",
        period: "09/2024 → 06/2025",
        bullets: [
          "PHP 8 natif, architecture MVC manuelle (sans framework)",
          "MySQL avec recherche full-text (MATCH AGAINST)",
          "CRUD annonces, messagerie, modération, upload sécurisé",
          "Auth bcrypt, protection SQLi (PDO), XSS, CSRF",
          "Interface admin avec statistiques et signalements",
        ],
        skills: ["patrimoine", "incidents", "projet", "service"],
      },
    ],
  },
  {
    title: "Réalisations en milieu professionnel — 1ʳᵉ année",
    color: "#a855f7",
    items: [
      {
        title: "ALAFRENCH (E-commerce luxe, refonte thème Shopify)",
        period: "01/2025 → 06/2025",
        bullets: [
          "Refonte complète du thème Liquid (zéro template)",
          "Sections dynamiques, snippets, templates produits custom",
          "SEO avancé (Schema.org, OpenGraph, sitemap)",
          "Design responsive mobile-first, identité visuelle luxe",
          "Société H2O (SAS)",
        ],
        skills: ["presence", "projet", "service"],
      },
      {
        title: "ALAFRENCH CARE (E-commerce CBD, refonte thème Shopify)",
        period: "01/2025 → 06/2025",
        bullets: [
          "Refonte thème Liquid, sections custom, snippets",
          "Webhooks, automatisations, email marketing",
          "SEO, Schema.org Product, branding & packaging",
          "Responsive design, checkout sécurisé",
          "Société H2O (SAS)",
        ],
        skills: ["presence", "projet", "service"],
      },
      {
        title: "Drainage Academy (Plateforme école de formation)",
        period: "01/2025 → 05/2025",
        bullets: [
          "Fullstack React + Node.js + API REST + BDD",
          "Back-office CMS complet (blog, avis, médias, praticiens)",
          "Espace praticien sécurisé (JWT, bcrypt, CORS)",
          "Annuaire praticiens certifiés, agenda formations",
        ],
        skills: ["patrimoine", "presence", "projet", "service"],
      },
      {
        title: "Intranet CPMS (Phase 1 : Développement initial)",
        period: "07/04/2025 → 30/06/2025",
        bullets: [
          "Mise en place Laravel 12 + Vue.js 3 (SPA + API REST)",
          "Intégration Active Directory (LDAPS, LdapRecord)",
          "Changement MDP multi-systèmes (AD + AS400 via Python ODBC)",
          "Réactivation compte par challenge questions sécurité",
          "Déploiement initial pour 180+ collaborateurs",
        ],
        skills: ["patrimoine", "incidents", "projet", "service"],
      },
    ],
  },
  {
    title: "Réalisations en milieu professionnel — 2ᵉ année",
    color: "#d4af37",
    items: [
      {
        title: "Intranet CPMS (Phase 2 — V2 : Portail collaboratif & modules RH/Chat)",
        period: "09/2025 → 06/2026",
        bullets: [
          "Refonte navigation hiérarchique (8 sections, sidebar rétractable)",
          "Module Chat interne (forum 6 catégories, profils, avatars, temps réel)",
          "Espace RH admin (annonces, alertes urgentes, événements, CRUD complet)",
          "Recherche globale fuzzy, système de favoris étendu (8 max)",
          "API publiques widgets homepage + authentification multi-stratégie (AD/env/BDD)",
        ],
        skills: ["patrimoine", "incidents", "presence", "service", "devpro"],
      },
      {
        title: "Earth Sanitation (Site vitrine + admin BTP assainissement)",
        period: "01/2026 → 02/2026",
        bullets: [
          "Next.js 14, TypeScript, Tailwind CSS v4, Prisma ORM",
          "70+ pages dont 59 pages locales SEO (3 départements)",
          "Dashboard admin complet (leads, avis, blog, FAQ, stats)",
          "7 schémas Schema.org, 14 API Routes",
          "Auth NextAuth JWT, rate limiting, RGPD",
        ],
        skills: ["patrimoine", "presence", "projet", "service"],
      },
      {
        title: "Extazy (E-commerce CBD, thème Shopify Horizon custom)",
        period: "02/2026 → 03/2026",
        bullets: [
          "Thème Horizon v3.4.0 : 85 fichiers modifiés",
          "12 sections custom (produit, FAQ, carousel, bundle, footer)",
          "AJAX Cart, variant cards, badges produit, Trustpilot",
          "Responsive mobile-first",
          "Schema configurable (couleurs, polices, tailles, positions)",
        ],
        skills: ["incidents", "presence", "projet", "service"],
      },
    ],
  },
];

/* ============================================ */
export default function SyntheseE5() {
  return (
    <main
      className="min-h-screen text-slate-100"
      style={{
        background:
          "radial-gradient(70% 60% at 50% 0%, rgba(34,211,238,0.06), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(168,85,247,0.05), transparent 62%), #050811",
        padding: "1.2rem 1rem",
      }}
    >
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 8mm; }
          body { background: white !important; color: #0b1020 !important; }
          .no-print { display: none !important; }
          .print-bg { background: white !important; color: #0b1020 !important; }
          .print-bg * { color: #0b1020 !important; }
          .print-cell { background: white !important; }
          .print-row { border-color: #ccc !important; }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto" style={{ }}>

        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-5 no-print">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.82rem] font-medium rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all"
            style={{ color: THEME.sub }}
          >
            ← Retour au portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[0.82rem] font-bold rounded-lg border transition-all hover:scale-[1.03]"
            style={{
              background: "rgba(212,175,55,0.12)",
              color: THEME.gold,
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            🖨 Imprimer / PDF
          </button>
        </div>

        {/* En-tête E5 */}
        <header
          className="mb-6 rounded-2xl border p-5 print-bg"
          style={{ background: THEME.card, borderColor: THEME.border }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <h1
              className="text-[1.05rem] font-extrabold tracking-tight"
              style={{
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                color: THEME.text,
              }}
            >
              {HEAD.diplome}
            </h1>
            <span
              className="px-2.5 py-1 text-[0.68rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: `${THEME.gold}15`, color: THEME.gold, border: `1px solid ${THEME.gold}40` }}
            >
              {HEAD.session}
            </span>
          </div>

          <h2
            className="text-[1.4rem] font-extrabold tracking-tight mb-3"
            style={{
              background: "linear-gradient(135deg, #E6ECF8 30%, #22d3ee 70%, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tableau de synthèse des réalisations professionnelles — Épreuve E5
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-[0.82rem]">
            <Field label="NOM et prénom" value={HEAD.candidat} />
            <Field label="N° candidat" value={HEAD.numero} />
            <Field label="Centre de formation" value={HEAD.centre} />
            <Field label="Option" value={`☑ ${HEAD.option}`} highlight />
            <Field label="Portfolio" value={HEAD.portfolio} link={HEAD.portfolio} />
            <Field label="Session" value={HEAD.session} />
          </div>
        </header>

        {/* Légende des 6 compétences */}
        <section className="mb-4 rounded-2xl border p-3 print-bg" style={{ background: THEME.card, borderColor: "rgba(255,255,255,0.06)" }}>
          <h3 className="text-center text-[0.7rem] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: THEME.sub }}>
            Compétences mises en œuvre
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5">
            {COLS.map((c, i) => (
              <details
                key={c.key}
                className="rounded-md border px-2 py-1.5 text-[0.7rem] cursor-pointer"
                style={{ background: `${c.color}08`, borderColor: `${c.color}25` }}
              >
                <summary
                  className="font-bold leading-snug list-none"
                  style={{ color: c.color }}
                >
                  C{i + 1} — {c.label}
                </summary>
                <ul className="mt-1.5 space-y-0.5">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[0.65rem] leading-snug" style={{ color: THEME.sub }}>
                      <span className="mt-[0.32rem] flex-shrink-0 w-1 h-1 rounded-full" style={{ background: c.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* Tableau de synthèse */}
        <section className="space-y-5">
          {BLOCKS.map((block) => (
            <div key={block.title} className="rounded-2xl border overflow-hidden print-bg" style={{ background: THEME.card, borderColor: `${block.color}30` }}>
              {/* Bandeau bloc */}
              <div
                className="px-4 py-2.5 border-b"
                style={{
                  background: `linear-gradient(90deg, ${block.color}15, transparent 60%)`,
                  borderColor: `${block.color}30`,
                }}
              >
                <h3
                  className="text-[0.92rem] font-extrabold tracking-tight"
                  style={{
                    fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                    color: block.color,
                  }}
                >
                  {block.title}
                </h3>
              </div>

              {/* Tableau scrollable */}
              <div className="overflow-x-auto">
                <table className="w-full text-[0.78rem] min-w-[1100px]">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${block.color}25` }}>
                      <th className="px-3 py-2 text-left font-bold align-bottom" style={{ width: "28rem", color: THEME.text }}>
                        Réalisation professionnelle
                      </th>
                      <th className="px-2 py-2 text-left font-bold align-bottom" style={{ width: "7rem", color: THEME.text }}>
                        Période
                      </th>
                      {COLS.map((c, i) => (
                        <th
                          key={c.key}
                          className="px-1.5 py-2 text-center align-bottom"
                          style={{ minWidth: "5.5rem" }}
                        >
                          <div
                            className="text-[0.62rem] font-bold tracking-wider uppercase mb-0.5"
                            style={{ color: c.color }}
                          >
                            C{i + 1}
                          </div>
                          <div
                            className="text-[0.62rem] font-medium leading-tight"
                            style={{ color: THEME.sub }}
                          >
                            {c.label}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.items.map((it, idx) => (
                      <tr
                        key={it.title}
                        className="print-row"
                        style={{
                          borderBottom: idx < block.items.length - 1 ? `1px solid rgba(255,255,255,0.04)` : "none",
                        }}
                      >
                        <td className="px-3 py-2.5 align-top print-cell">
                          <p className="text-[0.82rem] font-bold mb-1" style={{ color: THEME.text }}>
                            {it.title}
                          </p>
                          <ul className="space-y-0.5">
                            {it.bullets.map((b, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-[0.7rem] leading-snug" style={{ color: THEME.sub }}>
                                <span className="mt-[0.32rem] flex-shrink-0 w-1 h-1 rounded-full" style={{ background: block.color }} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-2 py-2.5 align-top text-[0.7rem] whitespace-pre-line print-cell" style={{ color: THEME.sub }}>
                          {it.period}
                        </td>
                        {COLS.map((c) => {
                          const has = it.skills.includes(c.key);
                          return (
                            <td
                              key={c.key}
                              className="px-1.5 py-2.5 text-center align-middle print-cell"
                              style={{ background: has ? `${c.color}08` : "transparent" }}
                            >
                              {has ? (
                                <span
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[0.95rem] font-bold"
                                  style={{
                                    background: `${c.color}25`,
                                    color: c.color,
                                    border: `1px solid ${c.color}50`,
                                  }}
                                >
                                  ✓
                                </span>
                              ) : (
                                <span className="text-[0.7rem]" style={{ color: "rgba(255,255,255,0.15)" }}>—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        {/* Pied */}
        <footer className="mt-6 text-center text-[0.7rem] no-print" style={{ color: THEME.sub }}>
          Document généré depuis le portfolio · {HEAD.candidat} · session {HEAD.session}
        </footer>
      </div>
    </main>
  );
}

/* ===== Cellule clé/valeur en-tête ===== */
function Field({ label, value, link, highlight }) {
  return (
    <div
      className="rounded-lg border px-3 py-2"
      style={{
        background: highlight ? "rgba(34,211,238,0.06)" : "rgba(255,255,255,0.02)",
        borderColor: highlight ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.06)",
      }}
    >
      <p className="text-[0.62rem] font-bold tracking-wider uppercase" style={{ color: THEME.sub }}>
        {label}
      </p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-[0.85rem] font-semibold hover:underline break-all"
          style={{ color: THEME.brandFrom }}
        >
          {value}
        </a>
      ) : (
        <p className="text-[0.85rem] font-semibold" style={{ color: highlight ? THEME.brandFrom : THEME.text }}>
          {value}
        </p>
      )}
    </div>
  );
}
