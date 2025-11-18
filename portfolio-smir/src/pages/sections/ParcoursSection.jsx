import React from "react";

/* ============ Système φ (nombre d'or) ============ */
const PHI = 1.618;
const INV = 1 / PHI;

/* ============ Thème sobre & pro ============ */
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

const ITEMS = [
  // --- 2025 / 2024–2026 (pairés)
  {
    year: "2025",
    color: "#22d3ee",
    type: "pro",
    title: "Développeur Web — CPMS",
    subtitle: "Alternance • depuis avril 2025",
    bullets: ["Apps internes, intégrations SI, qualité produit"],
    cta: { label: "Voir", href: "https://www.cpms.fr/" },
  },
  {
    year: "2024–2026",
    color: "#60a5fa",
    type: "formation",
    title: "BTS SIO (SLAM) — Institut F2I",
    subtitle: "Digital School of Paris • Groupe IEF2I",
    bullets: ["Dev, bases de données, qualité logicielle"],
    cta: { label: "Institut F2I", href: "https://www.institut-f2i.fr" },
  },

  // --- 2023–2024 (pairés)
  {
    year: "2023–2024",
    color: "#a855f7",
    type: "pro",
    title: "Conseiller Clientèle — La Banque Postale",
    subtitle: "Colisée (75008)",
    bullets: ["Digitalisation, support apps, conseil"],
    cta: { label: "LBP", href: "https://www.labanquepostale.fr" },
  },
  {
    year: "2023–2024",
    color: "#34d399",
    type: "formation",
    title: "Titre SOFTEC",
    subtitle: "Stephenson • COCLI (Formaposte)",
    bullets: ["Relation client, conformité, culture bancaire"],
    cta: { label: "Stephenson", href: "https://www.stephenson-formation.com" },
  },

  // --- 2021–2023 (pairés)
  {
    year: "2021–2023",
    color: "#ef4444",
    type: "pro",
    title: "Chargé de Clientèle — La Banque Postale",
    subtitle: "Colisée (75008)",
    bullets: ["Parcours clients à distance, assistance plateformes"],
    cta: { label: "LBP", href: "https://www.labanquepostale.fr" },
  },
  {
    year: "2021–2023",
    color: "#f97316",
    type: "formation",
    title: "BTS NDRC — IFCV",
    subtitle: "Levallois-Perret",
    bullets: ["Négociation, relation client digitale"],
    cta: { label: "IFCV", href: "https://www.ifcv.fr" },
  },

  // --- solos
  {
    year: "2024",
    color: "#2563eb",
    type: "pro",
    title: "Fondateur — ALAFRENCH CARE",
    subtitle: "H2O (SAS) • alafrenchcare.com",
    bullets: ["E-commerce Shopify, automatisations, data/catalogue"],
    cta: { label: "Visiter", href: "https://alafrenchcare.com" },
  },
  {
    year: "2025",
    color: "#2563eb",
    type: "pro",
    title: "Associé & Fondateur — ALAFRENCH",
    subtitle: "H2O (SAS) • alafrench.fr",
    bullets: ["E-commerce Shopify, automatisations, data/catalogue, marketing, logistique, service client, SEO, partenariats, etc."],
    cta: { label: "Visiter", href: "https://alafrench.fr" },
  },
  {
    year: "2019–2021",
    color: "#eab308",
    type: "pro",
    title: "Réceptionniste — Maison Albar Le Vendôme 5★",
    subtitle: "Hospitality de luxe",
    bullets: ["Accueil, service haut de gamme, gestion imprévus"],
    cta: { label: "Hôtel", href: "https://www.maison-albar-hotels.com" },
  },
  {
    year: "2017–2019",
    color: "#14b8a6",
    type: "pro",
    title: "Technicien Fibre Optique (D3) — Ekkocity",
    subtitle: "FTTH • Déploiement & maintenance",
    bullets: ["Installations, config réseau, diagnostics"],
  },
  {
    year: "2017",
    color: "#94a3b8",
    type: "formation",
    title: "Bac STMG (Marketing) — Lycée Maurice Utrillo",
    subtitle: "Seine-Saint-Denis",
    bullets: ["Management, marketing, éco-droit"],
    cta: {
      label: "Établissement",
      href: "https://www.google.com/search?q=Lyc%C3%A9e+Maurice+Utrillo",
    },
  },
];

// -------- util: accès par titre
const byTitle = (t) => ITEMS.find((i) => i.title === t) || null;

// -------- rows: chaque ligne = gauche (PRO) / droite (FORMATION)
const ROWS = [
  {
    left: byTitle("Développeur Web — CPMS"),
    right: byTitle("BTS SIO (SLAM) — Institut F2I"),
  },
  {
    left: byTitle("Associé & Fondateur — ALAFRENCH"),
    right: null,
  },
  {
    left: byTitle("Fondateur — ALAFRENCH CARE"),
    right: null,
  },
  {
    left: byTitle("Conseiller Clientèle — La Banque Postale"),
    right: byTitle("Titre SOFTEC"),
  },
  {
    left: byTitle("Chargé de Clientèle — La Banque Postale"),
    right: byTitle("BTS NDRC — IFCV"),
  },
  {
    left: byTitle("Réceptionniste — Maison Albar Le Vendôme 5★"),
    right: null,
  },
  {
    left: byTitle("Technicien Fibre Optique (D3) — Ekkocity"),
    right: null,
  },
  {
    left: null,
    right: byTitle("Bac STMG (Marketing) — Lycée Maurice Utrillo"),
  },
];

// -------- carte avec le nouveau thème
function Card({ item, isPro }) {
  if (!item) return null;
  
  return (
    <div
      className="relative rounded-[0.8rem] overflow-hidden border shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        borderColor: THEME.border,
        background: THEME.card,
        boxShadow: "0 0.382rem 0.618rem rgba(0,0,0,.2)",
      }}
    >
      {/* Effet de fond animé subtil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(100% 100% at 0% 0%, transparent 0%, black 70%, black 100%)",
          background: `conic-gradient(from 0deg, ${item.color}15, transparent)`,
          opacity: 0.3,
        }}
      />

      {/* Badge type */}
      <div
        className="absolute top-2 right-3 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full shadow-md z-10"
        style={{ background: isPro ? "#ef4444" : "#3b82f6" }}
      >
        {isPro ? "💼 Pro" : "🎓 Formation"}
      </div>

      <div className="relative p-4">
        {/* Année */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block px-2.5 py-1 text-[11px] font-extrabold text-white rounded-md"
            style={{ background: item.color }}
          >
            {item.year}
          </span>
        </div>

        {/* Titre */}
        <h4
          className="text-[14px] font-extrabold leading-tight mb-1"
          style={{
            fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
            color: THEME.text,
          }}
        >
          {item.title}
        </h4>

        {/* Sous-titre */}
        {item.subtitle && (
          <p className="text-[11px] font-medium mb-2" style={{ color: THEME.sub }}>
            {item.subtitle}
          </p>
        )}

        {/* Bullets */}
        {item.bullets?.length > 0 && (
          <ul className="space-y-1 text-[11px]" style={{ color: THEME.text }}>
            {item.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-sm leading-none mt-0.5" style={{ color: item.color }}>
                  •
                </span>
                <span className="flex-1 opacity-90">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        {item.cta && (
          <div className="mt-3">
            <a
              href={item.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-white transition-all hover:gap-2 hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}
            >
              {item.cta.label}
              <span>→</span>
            </a>
          </div>
        )}
      </div>

      {/* Ligne décorative */}
      <div className="h-[0.2rem] w-full" style={{ background: THEME.line }} />
    </div>
  );
}

export default function ParcoursSection() {
  return (
    <section
      id="parcours"
      className="min-h-[100svh] snap-center text-slate-100"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${(INV * PHI) * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${56 * PHI}rem` }}>
        {/* INTRO */}
        <header className="mb-8 text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
              lineHeight: 1.0 + INV,
            }}
          >
            Mon Parcours
          </h2>
          <div
            className="h-1 mx-auto mt-3 rounded-full"
            style={{
              width: `${8 * PHI}rem`,
              background: "linear-gradient(90deg, #60a5fa, #d4af37, #a41d28)",
            }}
          />
          <p
            className="max-w-2xl mx-auto mt-4 text-[0.95rem]"
            style={{ color: THEME.sub }}
          >
            De la relation client au développement : un parcours guidé par l'exigence et le sens du service
          </p>
        </header>

        {/* Légende */}
        <div className="flex justify-center gap-6 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span style={{ color: THEME.sub }}>À gauche : Expérience professionnelle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
            <span style={{ color: THEME.sub }}>À droite : Formation</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ligne centrale */}
          <div
            className="absolute top-0 w-1 h-full -translate-x-1/2 left-1/2 opacity-30"
            style={{
              background: "linear-gradient(to bottom, #22d3ee, #d4af37, #64748b)",
            }}
          />

          {/* Lignes alignées */}
          <div className="space-y-3">
            {ROWS.map((row, idx) => {
              const dotColor = row.left?.color || row.right?.color || "#64748b";
              return (
                <div key={idx} className="relative flex items-stretch">
                  {/* Pastille centrale */}
                  <div className="absolute z-10 -translate-x-1/2 left-1/2 top-1/2 -mt-2.5">
                    <div
                      className={`w-5 h-5 rounded-full border-4 ${idx === 0 ? "animate-pulse" : ""}`}
                      style={{
                        borderColor: dotColor,
                        background: "#0a0f1c",
                        boxShadow: `0 0 16px ${dotColor}40`,
                      }}
                    />
                  </div>

                  {/* Trait vers gauche */}
                  {row.left && (
                    <div
                      className="absolute top-1/2 right-1/2 mr-2.5 w-8 h-0.5"
                      style={{
                        backgroundImage: `linear-gradient(to left, ${row.left.color}80, transparent)`,
                      }}
                    />
                  )}

                  {/* Trait vers droite */}
                  {row.right && (
                    <div
                      className="absolute top-1/2 left-1/2 ml-2.5 w-8 h-0.5"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${row.right.color}80, transparent)`,
                      }}
                    />
                  )}

                  {/* Colonne gauche (PRO) */}
                  <div className="flex justify-end w-1/2 pr-6">
                    <div className="w-full max-w-[380px]">
                      <Card item={row.left} isPro />
                    </div>
                  </div>

                  {/* Colonne droite (FORMATION) */}
                  <div className="w-1/2 pl-6">
                    <div className="w-full max-w-[380px]">
                      <Card item={row.right} isPro={false} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs italic" style={{ color: THEME.sub }}>
            Du terrain au code, une progression continue vers l'excellence technique
          </p>
        </div>
      </div>
    </section>
  );
}