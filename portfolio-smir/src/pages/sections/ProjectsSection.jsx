// src/pages/sections/ProjectsSection.jsx
import React, { useState, useMemo, useCallback } from "react";

/* ============================ */
const PHI = 1.618;
const INV = 1 / PHI;

/* ============================ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.90)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
};

/* ============================ */
const PROJECTS = [
  {
    id: "cpms",
    title: "Intranet CPMS",
    date: "2025",
    description: "Administration & self-care pour 180+ collaborateurs",
    detail:
      "Développement fullstack de fonctionnalités critiques : réinitialisation de mot de passe sécurisée, réactivation de compte, déverrouillage via questions de sécurité. Intégration d'un lecteur PDF natif, refonte UX/UI complète. Documentation technique et user, captures d'écran de production.",
    tags: ["React", "PHP", "MySQL", "API REST"],
    category: "projets",
    color: "#22d3ee",
    docUrl: "/docs/CPMS.pdf",
  },
  {
    id: "discord-bot",
    title: "Bot Discord — Veille Tech",
    date: "2025",
    description: "Automatisation de veille technologique et sécurité",
    detail:
      "Bot Discord développé en Python pour automatiser la veille technologique : agrégation multi-sources (OWASP, CERT-FR, MSRC, Krebs, Hacker News), publication automatique 24h/24, commandes interactives (!veille, !ldap, !web, !news). Focus sécurité applicative et développement web pour le BTS SIO.",
    tags: ["Python", "Discord API", "RSS", "Automation"],
    category: "projets",
    color: "#5865F2",
    docUrl: "/docs/bot_discord.pdf",
  },
  {
    id: "alafrenchcare",
    title: "ALAFRENCH CARE",
    date: "2024",
    description: "E-commerce cosmétique CBD — projet entrepreneurial",
    detail:
      "Site e-commerce Shopify complet : développement et modification intégrale du thème en Liquid, cahier des charges détaillé, workflows de commande optimisés, automatisations via webhooks, intégrations paiement. Gestion du packaging, identité visuelle et documentation complète.",
    tags: ["Shopify", "Liquid", "E-commerce", "Webhooks", "SEO"],
    category: "projets",
    color: "#f59e0b",
    docUrl: "https://alafrenchcare.com",
  },
  {
    id: "alafrenchfr",
    title: "ALAFRENCH",
    date: "2025",
    description: "Marque de vêtements de luxe — vitrine & e-commerce",
    detail:
      "Site vitrine et boutique Shopify : développement et modification intégrale du thème en Liquid, architecture personnalisée, identité visuelle haut de gamme, fiches produits optimisées, SEO avancé. Société mère : H2O (SAS) regroupant ALAFRENCH et ALAFRENCH CARE. Documentation complète avec captures d'écran.",
    tags: ["Shopify", "Liquid", "E-commerce", "Branding", "SEO"],
    category: "projets",
    color: "#a855f7",
    docUrl: "https://alafrench.fr",
    highlight: "💎 Thème Liquid développé de A à Z",
  },
  {
    id: "portfolio",
    title: "Portfolio 3D",
    date: "2025",
    description: "Expérience immersive React + Three.js",
    detail:
      "Portfolio personnel en 3D temps réel : scènes interactives Three.js, optimisation WebGL avancée, architecture React modulaire, animations fluides, responsive design. Documentation technique complète avec captures d'écran et vidéos du rendu final.",
    tags: ["React", "Three.js", "WebGL", "3D"],
    category: "projets",
    color: "#10b981",
    docUrl: "/docs/PF_doc.pdf",
  },
  {
    id: "flipper",
    title: "Flipper Zero",
    date: "2025",
    description: "Pentest hardware & développement firmware",
    detail:
      "Dossiers techniques et comptes-rendus de pentest matériel, documentation sur firmwares alternatifs, développement de scripts personnalisés et procédures de test. Approche pédagogique pour la sécurité matérielle.",
    tags: ["Hardware", "Pentest", "Firmware", "Security"],
    category: "projets",
    color: "#ef4444",
    docUrl: "/docs/Fl_0.pdf",
    highlight: "🔒 Pentest interne",
  },
  {
    id: "dev_annonce",
    title: "Annonz",
    date: "2025",
    description: "Plateforme d'annonces full-stack",
    detail:
      "Conception et développement complet : architecture CRUD robuste, recherche full-text optimisée, système d'upload sécurisé, authentification avancée, modération. Documentation fonctionnelle et technique fournie.",
    tags: ["PHP", "MySQL", "Full-text", "Auth"],
    category: "projets",
    color: "#3b82f6",
    docUrl: "/docs/Annonz.pdf",
  },
  {
    id: "tp_sql",
    title: "TP Injection SQL",
    date: "2025",
    description: "Sécurité applicative — exploitation & mitigations",
    detail:
      "Rapport complet d'exploitation SQLi : démonstration des vulnérabilités, preuves de concept détaillées, correctifs (prepared statements, ORM), bonnes pratiques de sécurisation. Approche pédagogique OWASP Top 10.",
    tags: ["Security", "SQL Injection", "OWASP", "Mitigation"],
    category: "guides",
    color: "#8b5cf6",
    docUrl: "/docs/SQL.pdf",
  },
  {
    id: "linux_installs",
    title: "Installations Linux",
    date: "2025",
    description: "Guides d'installation & automatisation",
    detail:
      "Tutoriels détaillés : installation Kali/Ubuntu/Lubuntu, scripts d'automatisation ISO, partitionnement optimal, configuration réseau avancée, optimisations VM. Documentation complète pour déploiements rapides.",
    tags: ["Linux", "Automation", "Bash", "VM"],
    category: "guides",
    color: "#14b8a6",
    docUrl: "/docs/linux.pdf",
  },
  {
    id: "bootable_keys",
    title: "Clés bootables",
    date: "2025",
    description: "Outils de récupération système",
    detail:
      "Procédures détaillées pour créer des clés bootables (Windows/Linux), exemples d'usage en récupération système, troubleshooting avancé. Documentation pratique pour techniciens.",
    tags: ["Bootable USB", "Recovery", "Windows", "Linux"],
    category: "guides",
    color: "#eab308",
    docUrl: "/docs/usb.pdf",
  },
  {
    id: "win_server",
    title: "Windows Server 2022",
    date: "2025",
    description: "Administration Active Directory",
    detail:
      "Configuration complète AD : GPO avancées, images de déploiement, monitoring système, procédures d'administration. Documentation des best practices pour infrastructure Windows.",
    tags: ["Windows Server", "Active Directory", "GPO", "Admin"],
    category: "guides",
    color: "#06b6d4",
    docUrl: "/docs/win22.pdf",
  },
  {
    id: "virtual_vm",
    title: "VirtualBox & VMware",
    date: "2025",
    description: "Virtualisation multi-OS professionnelle",
    detail:
      "Best practices virtualisation : gestion snapshots, configuration réseau (bridged/NAT/host-only), optimisation disque, stratégies de backup et restauration. Guide complet pour environnements de test.",
    tags: ["VirtualBox", "VMware", "Virtualization", "Networking"],
    category: "guides",
    color: "#6366f1",
    docUrl: "/docs/VM.pdf",
  },
];

/* ============================ */
const CATEGORY_META = {
  all: { label: "Tous", color: "#64748b", icon: "🌟" },
  projets: { label: "Projets", color: "#10b981", icon: "🚀" },
  guides: { label: "Guides & Installations", color: "#3b82f6", icon: "📚" },
};

/* ============================ */
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
    <div className="w-full h-full">
      <div
        className="relative h-[21rem] cursor-pointer select-none group"
        style={{ perspective: "1000px" }}
        onClick={toggle}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={`${p.title} — ${isFlipped ? "détails" : "aperçu"}`}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ===== RECTO ===== */}
          <div
            className="absolute inset-0 p-5 overflow-hidden border-2 rounded-2xl backdrop-blur-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: `${p.color}40`,
              background: THEME.card,
              boxShadow: `0 4px 20px ${p.color}20`,
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-lg"
                  style={{ backgroundColor: p.color }}
                >
                  {CATEGORY_META[p.category].icon} {CATEGORY_META[p.category].label}
                </span>
                <span className="text-xs font-semibold" style={{ color: THEME.sub }}>
                  {p.date}
                </span>
              </div>

              {/* Highlight badge (si existe) */}
              {p.highlight && (
                <div
                  className="px-3 py-1.5 mb-3 text-xs font-bold text-center rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}30, ${p.color}10)`,
                    border: `1px solid ${p.color}60`,
                    color: p.color,
                  }}
                >
                  {p.highlight}
                </div>
              )}

              {/* Titre */}
              <h3
                className="mb-2 text-xl font-extrabold leading-tight"
                style={{
                  color: p.color,
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p className="flex-1 mb-3 text-sm leading-relaxed" style={{ color: THEME.text }}>
                {p.description}
              </p>

              {/* Tags */}
              {p.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[10px] font-semibold rounded"
                      style={{
                        background: `${p.color}20`,
                        color: p.color,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="pt-3 mt-auto border-t" style={{ borderColor: `${p.color}30` }}>
                <p className="text-xs italic text-center transition-all group-hover:scale-105" style={{ color: THEME.sub }}>
                  Cliquer pour voir les détails →
                </p>
              </div>
            </div>
          </div>

          {/* ===== VERSO ===== */}
          <div
            className="absolute inset-0 p-5 overflow-hidden border-2 rounded-2xl backdrop-blur-xl [transform:rotateY(180deg)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: p.color,
              background: THEME.card,
              boxShadow: `0 8px 32px ${p.color}30`,
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header verso */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-bold" style={{ color: p.color }}>
                  📋 Détails
                </h4>
                <span className="text-xs" style={{ color: THEME.sub }}>
                  {p.date}
                </span>
              </div>

              {/* Détails scrollable */}
              <div className="flex-1 mb-3 overflow-y-auto text-sm leading-relaxed custom-scrollbar" style={{ color: THEME.text }}>
                {p.detail}
              </div>

              {/* Tags complets */}
              {p.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[10px] font-semibold rounded"
                      style={{
                        background: `${p.color}25`,
                        color: p.color,
                        border: `1px solid ${p.color}40`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <a
                href={p.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full py-3 text-sm font-bold text-center text-white transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                style={{
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)`,
                  boxShadow: `0 4px 16px ${p.color}40`
                }}
              >
                📄 Voir la documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ */
export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="projets"
      className="relative min-h-screen py-20 snap-center text-slate-100 px-4"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 20%, rgba(212,175,55,.04), transparent 70%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.03), transparent 70%), rgba(8,12,24,0.3)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: "1400px" }}>
        {/* Header */}
        <header className="mb-16 text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.2,
            }}
          >
            Mes Projets
          </h2>
          <div
            className="h-1 mx-auto mt-4 rounded-full"
            style={{
              width: "clamp(8rem, 20vw, 16rem)",
              background: "linear-gradient(90deg, #22d3ee, #f59e0b, #a855f7)",
            }}
          />
          <p className="max-w-3xl mx-auto mt-6 text-base leading-relaxed" style={{ color: THEME.sub }}>
            Une sélection de projets professionnels, scolaires et personnels démontrant mes compétences en développement fullstack, sécurité et infrastructure.
          </p>
        </header>

        {/* Filtres */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.entries(CATEGORY_META).map(([k, meta]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/30 ${
                filter === k
                  ? "scale-105 shadow-xl"
                  : "opacity-80 hover:opacity-100 hover:scale-105"
              }`}
              style={{
                backgroundColor: meta.color,
                boxShadow: filter === k ? `0 8px 24px ${meta.color}40` : "none"
              }}
              aria-pressed={filter === k}
            >
              {meta.icon} {meta.label}
            </button>
          ))}
        </div>

        {/* Grille responsive */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: THEME.sub }}>
            <span className="font-semibold" style={{ color: THEME.text }}>
              {filtered.length}
            </span>{" "}
            projet{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""} • Cliquez sur une carte pour voir les détails
          </p>
        </div>
      </div>
    </section>
  );
}
