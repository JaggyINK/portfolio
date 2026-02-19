import React from "react";

/* ============ Système φ ============ */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  card: "rgba(11,16,32,0.78)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  pro: "#ef4444",
  formation: "#3b82f6",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Timeline data ============ */
const TIMELINE = [
  {
    period: "2024 – 2026",
    items: [
      { type: "pro", title: "Développeur Web", org: "CPMS", sub: "Alternance · depuis avr. 2025", bullets: ["Apps internes", "Intégrations SI", "Qualité produit"], link: "https://www.cpms.fr/" },
      { type: "formation", title: "BTS SIO (SLAM)", org: "Institut F2I", sub: "Digital School of Paris", bullets: ["Développement", "Bases de données", "Qualité logicielle"], link: "https://www.institut-f2i.fr" },
    ],
  },
  {
    period: "2024 – 2025",
    items: [
      { type: "pro", title: "Associé & Fondateur", org: "ALAFRENCH", sub: "H2O (SAS) · alafrench.fr", bullets: ["E-commerce Shopify", "Marketing & SEO", "Logistique"], link: "https://alafrench.fr" },
      { type: "pro", title: "Fondateur", org: "ALAFRENCH CARE", sub: "H2O (SAS) · alafrenchcare.com", bullets: ["E-commerce Shopify", "Data & catalogue", "Automatisations"], link: "https://alafrenchcare.com" },
    ],
  },
  {
    period: "2023 – 2024",
    items: [
      { type: "pro", title: "Conseiller Clientèle", org: "La Banque Postale", sub: "Colisée (75008)", bullets: ["Digitalisation", "Support apps", "Conseil client"], link: "https://www.labanquepostale.fr" },
      { type: "formation", title: "Titre SOFTEC", org: "Stephenson Formation", sub: "COCLI (Formaposte)", bullets: ["Relation client", "Conformité bancaire"], link: "https://www.stephenson-formation.com" },
    ],
  },
  {
    period: "2021 – 2023",
    items: [
      { type: "pro", title: "Chargé de Clientèle", org: "La Banque Postale", sub: "Colisée (75008)", bullets: ["Parcours clients à distance", "Assistance digitale"], link: "https://www.labanquepostale.fr" },
      { type: "formation", title: "BTS NDRC", org: "IFCV", sub: "Levallois-Perret", bullets: ["Négociation commerciale", "Relation client digitale"], link: "https://www.ifcv.fr" },
    ],
  },
  {
    period: "2019 – 2021",
    items: [
      { type: "pro", title: "Réceptionniste", org: "Maison Albar Le Vendôme 5★", sub: "Hospitality de luxe", bullets: ["Accueil haut de gamme", "Service premium"], link: "https://www.maison-albar-hotels.com" },
    ],
  },
  {
    period: "2017 – 2019",
    items: [
      { type: "pro", title: "Technicien Fibre Optique (D3)", org: "Ekkocity", sub: "FTTH · Déploiement & maintenance", bullets: ["Installations réseau", "Diagnostics techniques"] },
      { type: "formation", title: "Bac STMG (Marketing)", org: "Lycée Maurice Utrillo", sub: "Seine-Saint-Denis", bullets: ["Management", "Marketing", "Économie-Droit"] },
    ],
  },
];

/* ============ Compact card ============ */
function MiniCard({ item }) {
  const isPro = item.type === "pro";
  const color = isPro ? THEME.pro : THEME.formation;

  return (
    <div
      className="relative flex-1 min-w-0 rounded-lg p-3 border-l-[3px] transition-all hover:bg-white/[0.02]"
      style={{
        background: THEME.card,
        borderLeftColor: color,
      }}
    >
      {/* Type badge */}
      <span
        className="inline-block px-1.5 py-0.5 mb-1.5 text-[0.58rem] font-bold uppercase tracking-wider rounded text-white"
        style={{ background: color }}
      >
        {isPro ? "💼 Pro" : "🎓 Formation"}
      </span>

      {/* Title + org */}
      <h4
        className="text-[0.82rem] font-bold leading-tight mb-0.5"
        style={{ color: THEME.text }}
      >
        {item.title}
      </h4>
      <p className="text-[0.72rem] font-semibold mb-0.5" style={{ color }}>
        {item.org}
      </p>
      {item.sub && (
        <p className="text-[0.65rem] mb-1.5" style={{ color: THEME.sub }}>
          {item.sub}
        </p>
      )}

      {/* Bullets inline */}
      <div className="flex flex-wrap gap-1">
        {item.bullets.map((b) => (
          <span
            key={b}
            className="px-1.5 py-0.5 text-[0.6rem] rounded border border-white/6"
            style={{ color: THEME.sub }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* Link */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-[0.65rem] font-semibold hover:underline"
          style={{ color }}
        >
          Voir ↗
        </a>
      )}
    </div>
  );
}

/* ============ Section ============ */
export default function ParcoursSection() {
  return (
    <section
      id="parcours"
      className="relative min-h-[100svh] snap-center text-slate-100"
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
            Mon Parcours
          </h2>
          <p className="mt-1.5 text-[0.85rem]" style={{ color: THEME.sub }}>
            Du terrain au code — 2017 à aujourd&apos;hui
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* Légende compacte */}
        <div className="flex items-center justify-center gap-5 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: THEME.pro }} />
            <span className="text-[0.72rem] font-medium" style={{ color: THEME.sub }}>Professionnel</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: THEME.formation }} />
            <span className="text-[0.72rem] font-medium" style={{ color: THEME.sub }}>Formation</span>
          </div>
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full" style={{ background: "rgba(34,211,238,0.08)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.15)" }}>
            ⚡ Côte à côte = alternance
          </span>
        </div>

        {/* Timeline */}
        <div className="relative space-y-5">
          {/* Ligne centrale */}
          <div
            className="absolute left-[4.5rem] top-0 bottom-0 w-px hidden sm:block"
            style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.3), rgba(212,175,55,0.05))" }}
          />

          {TIMELINE.map((period) => (
            <div key={period.period} className="relative flex gap-4 items-start">
              {/* Période */}
              <div className="flex-shrink-0 w-[5rem] pt-2 text-right hidden sm:block">
                <span
                  className="inline-block text-[0.72rem] font-extrabold"
                  style={{
                    fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                    background: "linear-gradient(135deg, #fbbf24, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {period.period}
                </span>
              </div>

              {/* Dot */}
              <div className="flex-shrink-0 w-3 h-3 mt-3 rounded-full border-2 hidden sm:block" style={{ borderColor: "#d4af37", background: "#0b1020" }} />

              {/* Cards */}
              <div className="flex-1">
                {/* Mobile period label */}
                <span
                  className="sm:hidden inline-block mb-2 text-[0.72rem] font-extrabold"
                  style={{
                    fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                    background: "linear-gradient(135deg, #fbbf24, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {period.period}
                </span>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  {period.items.map((item, i) => (
                    <MiniCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[0.72rem] italic" style={{ color: THEME.sub }}>
          Progression continue du terrain au code
        </p>
      </div>
    </section>
  );
}
