import React from "react";

/* ============ Système φ (nombre d'or) ============ */
const PHI = 1.618;
const INV = 1 / PHI;

/* ============ Thème sobre & pro ============ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.90)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  proPrimary: "#ef4444",
  formationPrimary: "#3b82f6",
};

// Timeline organisée par périodes (plus récent en haut)
const TIMELINE = [
  {
    period: "2024-2026",
    label: "2024 - 2026",
    items: {
      left: {
        year: "2025",
        type: "pro",
        title: "Développeur Web",
        company: "CPMS",
        subtitle: "Alternance • depuis avril 2025",
        bullets: ["Apps internes", "Intégrations SI", "Qualité produit"],
        link: "https://www.cpms.fr/",
      },
      right: {
        year: "2024-2026",
        type: "formation",
        title: "BTS SIO (SLAM)",
        company: "Institut F2I",
        subtitle: "Digital School of Paris",
        bullets: ["Développement", "Bases de données", "Qualité logicielle"],
        link: "https://www.institut-f2i.fr",
      },
    },
  },
  {
    period: "2024-2025",
    label: "2024 - 2025",
    items: {
      left: {
        year: "2025",
        type: "pro",
        title: "Associé & Fondateur",
        company: "ALAFRENCH",
        subtitle: "H2O (SAS) • alafrench.fr",
        bullets: ["E-commerce Shopify", "Marketing & SEO", "Logistique & automatisations"],
        link: "https://alafrench.fr",
      },
      right: {
        year: "2024",
        type: "pro",
        title: "Fondateur",
        company: "ALAFRENCH CARE",
        subtitle: "H2O (SAS) • alafrenchcare.com",
        bullets: ["E-commerce Shopify", "Data & catalogue", "Automatisations"],
        link: "https://alafrenchcare.com",
      },
    },
  },
  {
    period: "2023-2024",
    label: "2023 - 2024",
    items: {
      left: {
        year: "2023-2024",
        type: "pro",
        title: "Conseiller Clientèle",
        company: "La Banque Postale",
        subtitle: "Colisée (75008)",
        bullets: ["Digitalisation", "Support applications", "Conseil client"],
        link: "https://www.labanquepostale.fr",
      },
      right: {
        year: "2023-2024",
        type: "formation",
        title: "Titre SOFTEC",
        company: "Stephenson Formation",
        subtitle: "COCLI (Formaposte)",
        bullets: ["Relation client", "Conformité bancaire", "Culture d'entreprise"],
        link: "https://www.stephenson-formation.com",
      },
    },
  },
  {
    period: "2021-2023",
    label: "2021 - 2023",
    items: {
      left: {
        year: "2021-2023",
        type: "pro",
        title: "Chargé de Clientèle",
        company: "La Banque Postale",
        subtitle: "Colisée (75008)",
        bullets: ["Parcours clients à distance", "Assistance plateformes digitales"],
        link: "https://www.labanquepostale.fr",
      },
      right: {
        year: "2021-2023",
        type: "formation",
        title: "BTS NDRC",
        company: "IFCV",
        subtitle: "Levallois-Perret",
        bullets: ["Négociation commerciale", "Relation client digitale"],
        link: "https://www.ifcv.fr",
      },
    },
  },
  {
    period: "2019-2021",
    label: "2019 - 2021",
    items: {
      left: {
        year: "2019-2021",
        type: "pro",
        title: "Réceptionniste",
        company: "Maison Albar Le Vendôme 5★",
        subtitle: "Hospitality de luxe",
        bullets: ["Accueil haut de gamme", "Service premium", "Gestion des imprévus"],
        link: "https://www.maison-albar-hotels.com",
      },
    },
  },
  {
    period: "2017-2019",
    label: "2017 - 2019",
    items: {
      left: {
        year: "2017-2019",
        type: "pro",
        title: "Technicien Fibre Optique (D3)",
        company: "Ekkocity",
        subtitle: "FTTH • Déploiement & maintenance",
        bullets: ["Installations réseau", "Configuration", "Diagnostics techniques"],
      },
      right: {
        year: "2017",
        type: "formation",
        title: "Bac STMG (Marketing)",
        company: "Lycée Maurice Utrillo",
        subtitle: "Seine-Saint-Denis",
        bullets: ["Management des organisations", "Marketing", "Économie-Droit"],
        link: "https://www.google.com/search?q=Lyc%C3%A9e+Maurice+Utrillo",
      },
    },
  },
];

// Composant Carte
function TimelineCard({ item, side }) {
  if (!item) return <div className="invisible" />;

  const isPro = item.type === "pro";
  const color = isPro ? THEME.proPrimary : THEME.formationPrimary;

  return (
    <div
      className="relative h-full p-5 overflow-hidden transition-all duration-300 rounded-xl hover:scale-[1.02]"
      style={{
        background: THEME.card,
        border: `2px solid ${color}40`,
        boxShadow: `0 4px 20px ${color}20`,
      }}
    >
      {/* Badge type en haut à droite */}
      <div
        className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full"
        style={{ background: color }}
      >
        {isPro ? "💼 Pro" : "🎓 Formation"}
      </div>

      {/* Année */}
      <div className="mb-3">
        <span
          className="inline-block px-3 py-1 text-xs font-extrabold text-white rounded-md"
          style={{ background: color }}
        >
          {item.year}
        </span>
      </div>

      {/* Titre & Entreprise */}
      <h3
        className="mb-1 text-lg font-extrabold leading-tight"
        style={{
          fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
          color: THEME.text,
        }}
      >
        {item.title}
      </h3>

      <p
        className="mb-1 text-sm font-bold"
        style={{ color: color, opacity: 0.9 }}
      >
        {item.company}
      </p>

      {/* Sous-titre */}
      {item.subtitle && (
        <p className="mb-3 text-xs" style={{ color: THEME.sub }}>
          {item.subtitle}
        </p>
      )}

      {/* Bullets */}
      {item.bullets && item.bullets.length > 0 && (
        <ul className="mb-3 space-y-1.5 text-xs" style={{ color: THEME.text }}>
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color }} className="mt-0.5 text-sm leading-none">•</span>
              <span className="flex-1 opacity-90">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Lien */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white transition-all rounded-lg hover:gap-2"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        >
          <span>Voir</span>
          <span>→</span>
        </a>
      )}

      {/* Indicateur de côté (pour alternance) */}
      {side === "left" && isPro && (
        <div
          className="absolute left-0 w-1 h-full top-0 rounded-l-xl"
          style={{ background: `linear-gradient(to bottom, ${color}, ${color}80)` }}
        />
      )}
      {side === "right" && !isPro && (
        <div
          className="absolute right-0 w-1 h-full top-0 rounded-r-xl"
          style={{ background: `linear-gradient(to bottom, ${color}, ${color}80)` }}
        />
      )}
    </div>
  );
}

export default function ParcoursSection() {
  return (
    <section
      id="parcours"
      className="relative min-h-[100svh] snap-center text-slate-100 py-20 px-4"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 20%, rgba(212,175,55,.04), transparent 70%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.03), transparent 70%), rgba(8,12,24,0.3)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="w-full mx-auto" style={{ maxWidth: "1400px" }}>
        {/* INTRO */}
        <header className="mb-16 text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(2rem, 4vw, 3.5rem)`,
              lineHeight: 1.2,
            }}
          >
            Mon Parcours
          </h2>
          <div
            className="h-1 mx-auto mt-4 rounded-full"
            style={{
              width: `clamp(8rem, 20vw, 16rem)`,
              background: "linear-gradient(90deg, #22d3ee, #d4af37, #a855f7)",
            }}
          />
          <p
            className="max-w-3xl mx-auto mt-6 text-base leading-relaxed"
            style={{ color: THEME.sub }}
          >
            De 2017 à aujourd'hui : une progression continue du terrain au code, avec des expériences professionnelles menées en parallèle de formations qualifiantes.
          </p>
        </header>

        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full shadow-lg"
              style={{ background: THEME.proPrimary }}
            >
              💼
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: THEME.text }}>
                Expérience Professionnelle
              </p>
              <p className="text-xs" style={{ color: THEME.sub }}>
                Souvent à gauche
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full shadow-lg"
              style={{ background: THEME.formationPrimary }}
            >
              🎓
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: THEME.text }}>
                Formation
              </p>
              <p className="text-xs" style={{ color: THEME.sub }}>
                Souvent à droite
              </p>
            </div>
          </div>
        </div>

        {/* Indication alternance */}
        <div className="max-w-2xl p-4 mx-auto mb-10 text-center border rounded-xl" style={{
          background: "rgba(34,211,238,0.05)",
          borderColor: "rgba(34,211,238,0.2)"
        }}>
          <p className="text-sm font-semibold" style={{ color: THEME.brandFrom }}>
            ⚡ Les périodes côte à côte montrent les expériences menées en parallèle (alternance)
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative space-y-8">
          {TIMELINE.map((period, idx) => (
            <div key={period.period} className="relative">
              {/* Année centrale */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="relative px-6 py-2 text-center rounded-full shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(147,51,234,0.2))",
                    border: "2px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <div
                    className="text-lg font-extrabold"
                    style={{
                      fontFamily: "OrbitronLocal, Orbitron, sans-serif",
                      background: "linear-gradient(135deg, #fbbf24, #a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {period.label}
                  </div>
                </div>
              </div>

              {/* Cartes gauche/droite */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Gauche */}
                <div className={period.items.left ? "" : "invisible"}>
                  {period.items.left && (
                    <TimelineCard item={period.items.left} side="left" />
                  )}
                </div>

                {/* Droite */}
                <div className={period.items.right ? "" : "invisible"}>
                  {period.items.right && (
                    <TimelineCard item={period.items.right} side="right" />
                  )}
                </div>
              </div>

              {/* Connecteur vers la prochaine période */}
              {idx < TIMELINE.length - 1 && (
                <div className="flex justify-center my-6">
                  <div
                    className="w-0.5 h-8 rounded-full"
                    style={{
                      background: "linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.1))",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm italic" style={{ color: THEME.sub }}>
            Du terrain au code, une progression continue vers l'excellence technique
          </p>
        </div>
      </div>
    </section>
  );
}
