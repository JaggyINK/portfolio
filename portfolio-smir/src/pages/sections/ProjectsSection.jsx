// src/pages/sections/ProjectsSection.jsx
import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ============================ */
const PHI = 1.618;
const INV = 1 / PHI;

/* ============================ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============================ */
const PROJECTS = [
  {
    id: "familidocs",
    title: "FamiliDocs",
    date: "2025–2026",
    description: "Coffre administratif numerique familial — Projet U5 BTS SIO",
    detail:
      "Projet principal BTS SIO SLAM (epreuve U5). Application web Python/Flask permettant aux familles de centraliser et securiser leurs documents administratifs. 9 modeles de donnees, chiffrement AES, versioning, tags, partage granulaire avec permissions temporaires, notifications temps reel, 41 tests pytest. Architecture MVC complete avec 7 services metier et 8 blueprints.",
    cejm: {
      contexte: "Les familles perdent en moyenne 1 papier sur 3 lors d'une démarche (CAF, impôts, santé). Besoin : un coffre numérique partagé entre les membres du foyer.",
      eco: "Gain de temps estimé 5h/an/foyer. Réduction des frais liés aux duplicatas (carte d'identité, justificatifs).",
      juri: "Données personnelles sensibles → chiffrement AES, conformité RGPD, droit à l'oubli, partage avec consentement explicite.",
      mana: "Méthode itérative, sprints mensuels, 41 tests automatisés, livraison documentée pour l'épreuve U5.",
      valeur: "Coffre-fort numérique sécurisé, accessible 24/7, partage granulaire entre conjoints / parents / enfants majeurs.",
    },
    tags: ["Python", "Flask", "SQLite", "AES", "pytest"],
    category: "projets",
    color: "#8b5cf6",
    docUrl: "/docs/familidocs-doc.html",
    cdcUrl: "/docs/cdc-familidocs.html",
    highlight: "Projet U5 BTS SIO SLAM",
  },
  {
    id: "cpms",
    title: "Intranet CPMS",
    date: "2025",
    description: "Administration & self-care pour 180+ collaborateurs",
    detail:
      "Plateforme self-service Laravel 12 + Vue 3 pour la CPMS : changement de mot de passe multi-systemes (Active Directory + AS400) en temps reel, deverrouillage de compte via questions de securite (bcrypt + leurres), dashboard admin avec stats temps reel, portail intranet centralise. V1 en production, V2 en developpement. Impact : -80% tickets IT, disponibilite 24/7.",
    cejm: {
      contexte: "CPMS (180+ collaborateurs, secteur santé/prévoyance) : équipe IT saturée par les demandes répétitives de mots de passe oubliés.",
      eco: "−60 % de tickets IT — économie estimée ≈ 80 k€/an (équivalent 1,5 ETP libéré pour des missions à plus forte valeur).",
      juri: "Données salariés et accès aux SI sensibles → conformité OWASP A07, RGPD, audit trail complet, recommandations ANSSI.",
      mana: "V1 livrée en production en 3 mois, V2 en cours de déploiement, formation des admins, documentation transmise à la DSI.",
      valeur: "Self-service MDP 24/7, déverrouillage compte sans appel IT, dashboard de pilotage temps réel pour la DSI.",
    },
    tags: ["Laravel 12", "Vue 3", "LDAP", "AS400", "PHP"],
    category: "projets",
    color: "#22d3ee",
    docV1: "/docs/cpms_v1.html",
    docV2: "/docs/cpms_v2.html",
    pdfUrl: "/docs/CPMS.pdf",
    cdcUrl: "/docs/cdc-cpms.html",
  },
  {
    id: "kardo",
    title: "Kardo",
    date: "2025–2026",
    description: "SaaS B2B — cartes de fidélité dématérialisées (Apple/Google Wallet)",
    detail:
      "Plateforme SaaS pour commerçants (restaurants, boulangeries, salons) : intégration Apple Wallet & Google Wallet sans application à télécharger côté client. Dashboard Vue 3 (13 vues), API Laravel 13 / PHP 8.4, base PostgreSQL 16 (UUID v7, 10 tables), application mobile Flutter, scanner QR intégré, autopilot marketing, CRM avec cohort retention, journal d'audit, paliers de récompenses configurables. Déployé sur Railway.",
    cejm: {
      contexte: "Marché de la fidélité commerçant : tampons papier perdus, applications dédiées que personne n'installe. Besoin : un programme zéro-friction.",
      eco: "Modèle SaaS B2B avec 3 plans (Free / Pro / Business), augmente la fréquence de visite client (≈ +25 %) et le panier moyen.",
      juri: "Données clients (nom, téléphone, anniversaire) → RGPD, consentement explicite, droit à l'oubli, contrats Apple/Google Wallet.",
      mana: "Architecture monorepo (3 services), UUID v7 pour scalabilité, plans gardés via guards, équipe en mode produit.",
      valeur: "Carte fidélité dans le Wallet en 10 secondes, sans app, marketing automatisé, statistiques fines pour le commerçant.",
    },
    tags: ["Laravel 13", "Vue 3", "Flutter", "PostgreSQL", "Wallet"],
    category: "projets",
    color: "#22c55e",
    siteUrl: "https://kardo-production.up.railway.app",
    docUrl: "/docs/kardo-doc.html",
    pdfUrl: "/docs/kardo-doc.pdf",
    cdcUrl: "/docs/cdc-kardo.html",
    adminGuideUrl: "/docs/guide-admin-kardo.html",
    adminGuidePdf: "/docs/guide-admin-kardo.pdf",
    userGuideUrl: "/docs/guide-utilisateur-kardo.html",
    userGuidePdf: "/docs/guide-utilisateur-kardo.pdf",
  },
  {
    id: "earth-sanitation",
    title: "Earth Sanitation",
    date: "2025",
    description: "Site vitrine & SEO pour entreprise d'assainissement 24h/24",
    detail:
      "Développement complet d'un site professionnel pour Earth Sanitation (débouchage & assainissement) : architecture Next.js + Tailwind CSS, 7 pages services détaillées, formulaire de devis, intégration WhatsApp, SEO local avancé (schema JSON-LD, annuaire 30+ villes), design responsive, animations fluides. Couverture Montpellier, Nîmes et 100 km autour.",
    cejm: {
      contexte: "TPE BTP urgentiste (assainissement 24h/24) sans visibilité Google sur Montpellier / Nîmes — concurrence locale très active.",
      eco: "SEO local → captation de leads sans publicité payante, devis WhatsApp pour réduire le coût d'acquisition client.",
      juri: "Mentions légales, conditions d'intervention, RGPD sur le formulaire de devis, données du sinistré.",
      mana: "Cycle court (1 mois), validation client à chaque livrable, transfert de propriété documenté.",
      valeur: "59+ pages SEO localisées, devis instantané, présence renforcée sur Google Maps et requêtes urgentes.",
    },
    tags: ["Next.js", "Tailwind CSS", "SEO", "React"],
    category: "projets",
    color: "#10b981",
    siteUrl: "https://earth-sanitation.fr",
    docUrl: "/docs/earth-sanitation-doc.html",
    cdcUrl: "/docs/cdc-earth-sanitation.html",
  },
  {
    id: "drainage-academy",
    title: "Drainage Academy",
    date: "2025",
    description: "Plateforme complète pour école de drainage lymphatique",
    detail:
      "Développement fullstack front + back + middleware : site vitrine avec agenda, annuaire praticiens, témoignages vidéo. Espace praticien sécurisé avec authentification. Back-office admin complet permettant la gestion dynamique du contenu (blog, avis, photos, activation/désactivation de pages). Fondateur : Dan Samama.",
    cejm: {
      contexte: "École de formation de praticiens (drainage lymphatique) : besoin d'un annuaire vérifié + d'un espace praticien.",
      eco: "Augmentation des inscriptions formations + visibilité des praticiens certifiés → revenus récurrents.",
      juri: "Données de santé indirectes, certifications, RGPD, consentement témoignages vidéo (droit à l'image).",
      mana: "Cahier des charges signé, jalons clairs (vitrine → admin → espace praticien), formation du fondateur.",
      valeur: "Annuaire en libre service, agenda formations, back-office autonome (admin gère sans dev).",
    },
    tags: ["React", "Node.js", "Auth", "Admin Panel"],
    category: "projets",
    color: "#d4af37",
    siteUrl: "https://drainage-academy.fr",
    docUrl: "/docs/drainage-academy-doc.html",
    cdcUrl: "/docs/cdc-drainage-academy.html",
  },
  {
    id: "discord-bot",
    title: "Bot Discord — Veille Tech",
    date: "2025",
    description: "Automatisation de veille technologique et sécurité",
    detail:
      "Bot Discord développé en Python pour automatiser la veille technologique : agrégation multi-sources (OWASP, CERT-FR, MSRC, Krebs, Hacker News), publication automatique 24h/24, commandes interactives (!veille, !ldap, !web, !news). Focus sécurité applicative et développement web pour le BTS SIO.",
    cejm: {
      contexte: "Veille techno BTS SIO : besoin de centraliser les sources fiables (OWASP, CERT-FR…) sans les rater.",
      eco: "Coût marginal (gratuit, hébergé sur poste perso) ; gain de temps quotidien sur la veille (≈ 30 min/j).",
      juri: "Conformité ToS Discord et des sites sources (RSS publics), citation des sources.",
      mana: "Méthodo : collecter → trier → tester → documenter, restituée chaque mois en synthèse.",
      valeur: "Veille passive 24/7, alerte communauté, support pour l'épreuve U6 (parcours pro).",
    },
    tags: ["Python", "Discord API", "RSS", "Automation"],
    category: "projets",
    color: "#5865F2",
    docUrl: "/docs/discord-bot-doc.html",
    cdcUrl: "/docs/cdc-discord-bot.html",
  },
  {
    id: "alafrenchcare",
    title: "ALAFRENCH CARE",
    date: "2024",
    description: "E-commerce cosmétique CBD — projet entrepreneurial",
    detail:
      "Site e-commerce Shopify complet : développement et modification intégrale du thème en Liquid, cahier des charges détaillé, workflows de commande optimisés, automatisations via webhooks, intégrations paiement. Gestion du packaging, identité visuelle et documentation complète.",
    cejm: {
      contexte: "Marque cosmétique CBD lancée par moi-même via H2O (SAS) — marché émergent, réglementation française stricte.",
      eco: "Modèle DTC (direct to consumer) Shopify, marges contrôlées, automatisations pour réduire la masse salariale.",
      juri: "CBD : conformité Code de la santé publique, taux THC, étiquetage, CGV, RGPD, DEEE/REP packaging.",
      mana: "Posture entrepreneur : vision produit, fournisseurs, design, logistique, SAV — j'arbitre toute la chaîne.",
      valeur: "Site e-commerce vivant, identité visuelle premium, automatisations qui font tourner la boutique seule.",
    },
    tags: ["Shopify", "Liquid", "E-commerce", "Webhooks", "SEO"],
    category: "projets",
    color: "#f59e0b",
    siteUrl: "https://alafrenchcare.com",
    docUrl: "/docs/alafrench-care-doc.html",
    cdcUrl: "/docs/cdc-alafrench-care.html",
  },
  {
    id: "alafrenchfr",
    title: "ALAFRENCH",
    date: "2025",
    description: "Marque de vêtements de luxe — vitrine & e-commerce",
    detail:
      "Site vitrine et boutique Shopify : développement et modification intégrale du thème en Liquid, architecture personnalisée, identité visuelle haut de gamme, fiches produits optimisées, SEO avancé. Société mère : H2O (SAS) regroupant ALAFRENCH et ALAFRENCH CARE. Documentation complète avec captures d'écran.",
    cejm: {
      contexte: "Marque de vêtements de luxe (ma société H2O — SAS), positionnement premium / Made in France.",
      eco: "Marges luxe, panier moyen élevé, stratégie SEO + branding pour soutenir le prix de vente.",
      juri: "Étiquetage textile, traçabilité, propriété intellectuelle (logo, modèles), CGV, RGPD.",
      mana: "Cohérence avec la marque sœur ALAFRENCH CARE, pilotage par mes soins (associé fondateur).",
      valeur: "Vitrine luxe cohérente, fiches produits soignées, identité visuelle qui justifie le prix.",
    },
    tags: ["Shopify", "Liquid", "E-commerce", "Branding", "SEO"],
    category: "projets",
    color: "#a855f7",
    siteUrl: "https://alafrench.fr",
    docUrl: "/docs/alafrench-doc.html",
    cdcUrl: "/docs/cdc-alafrench.html",
  },
  {
    id: "portfolio",
    title: "Portfolio 3D",
    date: "2025",
    description: "Expérience immersive React + Three.js",
    detail:
      "Portfolio personnel en 3D temps réel : scènes interactives Three.js, optimisation WebGL avancée, architecture React modulaire, animations fluides, responsive design. Documentation technique complète avec captures d'écran et vidéos du rendu final.",
    cejm: {
      contexte: "Recruteurs et jurys reçoivent 100+ portfolios « classiques » : besoin de me différencier sans nuire au fond.",
      eco: "Investissement temps personnel — retour sous forme d'opportunités (entretiens, alternance, freelance).",
      juri: "Mentions légales, RGPD si formulaire, droits d'auteur sur visuels et codes utilisés.",
      mana: "Double expérience (classique + 3D) pilotée seul, livraison continue (Vercel), versionnée Git.",
      valeur: "Portfolio mémorable, démonstration des compétences en conditions réelles, support de candidature.",
    },
    tags: ["React", "Three.js", "WebGL", "3D"],
    category: "projets",
    color: "#06b6d4",
    docUrl: "/docs/portfolio-3d-doc.html",
    cdcUrl: "/docs/cdc-portfolio-3d.html",
  },
  {
    id: "flipper",
    title: "Flipper Zero",
    date: "2025",
    description: "Pentest hardware & développement firmware",
    detail:
      "Dossiers techniques et comptes-rendus de pentest matériel, documentation sur firmwares alternatifs, développement de scripts personnalisés et procédures de test. Approche pédagogique pour la sécurité matérielle.",
    cejm: {
      contexte: "Sensibilisation sécurité hardware (RFID, NFC, Sub-GHz) — exercices sur matériel personnel uniquement.",
      eco: "Compétences valorisables en cybersécurité (consultant, pentester) — marché en tension.",
      juri: "Strict respect Art. 323 Code pénal (intrusion / maintien frauduleux), périmètre limité au matériel possédé.",
      mana: "Veille cadre légal continue, documentation systématique, restitution pédagogique.",
      valeur: "Compréhension des protocoles radio, identification des risques, posture défensive.",
    },
    tags: ["Hardware", "Pentest", "Firmware", "Security"],
    category: "projets",
    color: "#ef4444",
    docUrl: "/docs/flipper-zero-doc.html",
    cdcUrl: "/docs/cdc-flipper-zero.html",
  },
  {
    id: "dev_annonce",
    title: "Annonz",
    date: "2025",
    description: "Plateforme d'annonces full-stack",
    detail:
      "Conception et développement complet : architecture CRUD robuste, recherche full-text optimisée, système d'upload sécurisé, authentification avancée, modération. Documentation fonctionnelle et technique fournie.",
    cejm: {
      contexte: "Mini-marketplace d'annonces (style Le Bon Coin allégé) — projet pédagogique full-stack PHP natif.",
      eco: "Modèle freemium possible (annonces gratuites + mise en avant payante).",
      juri: "Modération obligatoire (LCEN), CGU, RGPD, signalement, protection contre fraudes.",
      mana: "MVC manuel sans framework, tests, déploiement, documentation utilisateur et admin.",
      valeur: "Recherche full-text rapide, messagerie intégrée, modération opérationnelle.",
    },
    tags: ["PHP", "MySQL", "Full-text", "Auth"],
    category: "projets",
    color: "#3b82f6",
    docUrl: "/docs/annonz-doc.html",
    cdcUrl: "/docs/cdc-annonz.html",
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
    docUrl: "/docs/guide-injection-sql.html",
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
    docUrl: "/docs/guide-lab-linux.html",
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
    docUrl: "/docs/guide-cles-bootables.html",
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
    docUrl: "/docs/guide-active-directory.html",
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
    docUrl: "/docs/guide-virtualisation.html",
  },
  {
    id: "docker_guide",
    title: "Docker & Containers",
    date: "2025",
    description: "Conteneurisation d'applications",
    detail:
      "Guide complet Docker : concepts (images, conteneurs, volumes, reseaux), Dockerfile, docker-compose multi-services, bonnes pratiques de containerisation. Deploiement d'environnements de dev reproductibles.",
    tags: ["Docker", "Containers", "DevOps", "Compose"],
    category: "guides",
    color: "#0ea5e9",
    docUrl: "/docs/guide-docker.html",
  },
  {
    id: "git_guide",
    title: "Git & GitHub",
    date: "2025",
    description: "Gestion de versions & collaboration",
    detail:
      "Workflow Git professionnel : branches, commits, merge, rebase, pull requests, gestion de conflits, .gitignore, tags, GitHub Actions. Bonnes pratiques pour le travail en equipe et le versionning de projets.",
    tags: ["Git", "GitHub", "Version Control", "CI/CD"],
    category: "guides",
    color: "#f97316",
    docUrl: "/docs/guide-git.html",
  },
];

/* ============================ */
const CATEGORIES = [
  {
    key: "projets",
    label: "Projets",
    description: "Applications web, sites professionnels, outils et projets personnels",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    key: "guides",
    label: "Guides & Installations",
    description: "Tutoriels, rapports de sécurité, guides d'administration et virtualisation",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

/* ============================ */
function CejmBox({ label, color, text }) {
  return (
    <div
      className="rounded-md px-1.5 py-1 overflow-hidden"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
      }}
    >
      <p className="text-[8.5px] font-bold tracking-wider uppercase leading-none" style={{ color }}>
        {label}
      </p>
      <p className="mt-0.5 text-[10px] leading-snug" style={{ color: THEME.text }}>
        {text}
      </p>
    </div>
  );
}

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
          {/* ===== RECTO — Vue CEJM (lecture économique / juridique / managériale) ===== */}
          <div
            className="absolute inset-0 p-4 overflow-hidden border-2 rounded-2xl backdrop-blur-xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderColor: `${p.color}40`,
              background: THEME.card,
              boxShadow: `0 4px 20px ${p.color}20`,
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header — date + pill CEJM */}
              <div className="flex items-start justify-between mb-1.5">
                <span
                  className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded"
                  style={{
                    background: `${p.color}15`,
                    color: p.color,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  CEJM · vue métier
                </span>
                <span className="text-[10px] font-semibold" style={{ color: THEME.sub }}>
                  {p.date}
                </span>
              </div>

              {/* Titre */}
              <h3
                className="mb-1 text-base font-extrabold leading-tight"
                style={{
                  color: p.color,
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
              >
                {p.title}
              </h3>

              {p.cejm ? (
                <>
                  {/* Contexte */}
                  <p className="text-[11px] italic leading-snug mb-2" style={{ color: THEME.sub }}>
                    {p.cejm.contexte}
                  </p>

                  {/* 4 mini-cartes CEJM */}
                  <div className="grid grid-cols-2 gap-1.5 flex-1 overflow-hidden">
                    <CejmBox label="Économique" color="#22c55e" text={p.cejm.eco} />
                    <CejmBox label="Juridique" color="#f59e0b" text={p.cejm.juri} />
                    <CejmBox label="Managérial" color="#a855f7" text={p.cejm.mana} />
                    <CejmBox label="Valeur livrée" color={p.color} text={p.cejm.valeur} />
                  </div>
                </>
              ) : (
                /* Fallback : description courte (projets sans CEJM) */
                <p className="flex-1 mb-2 text-sm leading-relaxed" style={{ color: THEME.text }}>
                  {p.description}
                </p>
              )}

              {/* Tags */}
              {p.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[9px] font-semibold rounded"
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
              <div className="pt-2 mt-2 border-t" style={{ borderColor: `${p.color}30` }}>
                <p className="text-[10px] italic text-center transition-all group-hover:scale-105" style={{ color: THEME.sub }}>
                  Cliquer pour voir le détail technique →
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
                  {p.title}
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
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {p.siteUrl && (
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-3 text-sm font-bold text-center text-white transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                      style={{
                        background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)`,
                        boxShadow: `0 4px 16px ${p.color}40`,
                      }}
                    >
                      Voir le site
                    </a>
                  )}
                  {p.docUrl && (
                    <a
                      href={p.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`${p.siteUrl ? "flex-1" : "w-full"} py-3 text-sm font-bold text-center text-white transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40`}
                      style={{
                        background: p.siteUrl
                          ? `rgba(255,255,255,0.1)`
                          : `linear-gradient(135deg, ${p.color}, ${p.color}dd)`,
                        border: p.siteUrl ? `1px solid ${p.color}60` : "none",
                        boxShadow: p.siteUrl ? "none" : `0 4px 16px ${p.color}40`,
                      }}
                    >
                      {p.docUrl.startsWith("http") ? "Voir le site" : "Documentation"}
                    </a>
                  )}
                </div>
                {/* CPMS: V1/V2 selector + PDF */}
                {p.docV1 && p.docV2 && (
                  <div className="flex gap-2">
                    <a
                      href={p.docV1}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2.5 text-sm font-bold text-center text-white transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                      style={{
                        background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)`,
                        boxShadow: `0 4px 16px ${p.color}40`,
                      }}
                    >
                      Doc V1 (prod)
                    </a>
                    <a
                      href={p.docV2}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2.5 text-sm font-bold text-center text-white transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                      style={{
                        background: `rgba(255,255,255,0.1)`,
                        border: `1px solid ${p.color}60`,
                      }}
                    >
                      Doc V2 (dev)
                    </a>
                  </div>
                )}
                {p.pdfUrl && (
                  <a
                    href={p.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2 text-xs font-semibold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                    style={{
                      background: `rgba(212,175,55,0.12)`,
                      color: "#d4af37",
                      border: `1px solid rgba(212,175,55,0.3)`,
                    }}
                  >
                    Document explicatif (PDF)
                  </a>
                )}
                {p.cdcUrl && (
                  <a
                    href={p.cdcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2 text-xs font-semibold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                    style={{
                      background: `rgba(168,85,247,0.12)`,
                      color: "#a855f7",
                      border: `1px solid rgba(168,85,247,0.3)`,
                    }}
                  >
                    Cahier des charges
                  </a>
                )}
                {(p.adminGuideUrl || p.userGuideUrl) && (
                  <div className="flex flex-col gap-1.5">
                    {p.adminGuideUrl && (
                      <div className="flex gap-1.5">
                        <a
                          href={p.adminGuideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2 text-xs font-semibold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                          style={{
                            background: `rgba(34,211,238,0.12)`,
                            color: "#22d3ee",
                            border: `1px solid rgba(34,211,238,0.3)`,
                          }}
                        >
                          Guide admin
                        </a>
                        {p.adminGuidePdf && (
                          <a
                            href={p.adminGuidePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-2 text-xs font-bold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                            style={{
                              background: `rgba(34,211,238,0.06)`,
                              color: "#22d3ee",
                              border: `1px solid rgba(34,211,238,0.25)`,
                            }}
                            aria-label="Guide admin (PDF)"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    )}
                    {p.userGuideUrl && (
                      <div className="flex gap-1.5">
                        <a
                          href={p.userGuideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2 text-xs font-semibold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                          style={{
                            background: `rgba(34,197,94,0.12)`,
                            color: "#22c55e",
                            border: `1px solid rgba(34,197,94,0.3)`,
                          }}
                        >
                          Guide utilisateur
                        </a>
                        {p.userGuidePdf && (
                          <a
                            href={p.userGuidePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-2 text-xs font-bold text-center transition-all rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                            style={{
                              background: `rgba(34,197,94,0.06)`,
                              color: "#22c55e",
                              border: `1px solid rgba(34,197,94,0.25)`,
                            }}
                            aria-label="Guide utilisateur (PDF)"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ */
function CategoryCard({ cat, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full overflow-hidden border-2 cursor-pointer group rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{
        borderColor: `${cat.color}50`,
        background: THEME.card,
        boxShadow: `0 8px 32px ${cat.color}20`,
        minHeight: "16rem",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300"
        style={{ background: cat.gradient }}
      />

      <div className="relative flex flex-col items-center justify-center h-full gap-5 p-8">
        {/* Icon */}
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${cat.color}20`,
            border: `2px solid ${cat.color}50`,
            color: cat.color,
          }}
        >
          {cat.icon}
        </div>

        {/* Label */}
        <h3
          className="text-2xl font-extrabold tracking-tight"
          style={{
            color: cat.color,
            fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
          }}
        >
          {cat.label}
        </h3>

        {/* Description */}
        <p className="max-w-sm text-sm leading-relaxed text-center" style={{ color: THEME.sub }}>
          {cat.description}
        </p>

        {/* Count badge */}
        <span
          className="px-4 py-1.5 text-sm font-bold text-white rounded-full"
          style={{ background: cat.gradient }}
        >
          {count} {count > 1 ? "items" : "item"}
        </span>
      </div>
    </button>
  );
}

/* ============================ */
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(null);

  const projectCount = useMemo(() => PROJECTS.filter((p) => p.category === "projets").length, []);
  const guideCount = useMemo(() => PROJECTS.filter((p) => p.category === "guides").length, []);

  const filtered = useMemo(() => {
    if (!activeCategory) return [];
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activeMeta = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <section
      id="projets"
      className="relative min-h-[100svh] snap-start text-slate-100"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${INV * PHI * PHI}rem ${1.0 * PHI}rem`,
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

      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>
        {/* Header */}
        <header className="mb-8 text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              color: THEME.text,
            }}
          >
            Mes Projets
          </h2>
          <p className="mt-1.5 text-[0.88rem]" style={{ color: THEME.sub }}>
            Projets professionnels, scolaires et personnels — fullstack, sécurité, infrastructure
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />

          {/* CTA — Tableau de synthèse E5 */}
          <Link
            to="/synthese-e5"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-[0.82rem] font-bold rounded-xl border transition-all hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(168,85,247,0.08))",
              borderColor: "rgba(212,175,55,0.3)",
              color: "#d4af37",
              boxShadow: "0 4px 16px rgba(212,175,55,0.1)",
            }}
          >
            <span>📋</span>
            <span>Voir le Tableau de synthèse E5</span>
            <span style={{ color: "#a855f7" }}>↗</span>
          </Link>
        </header>

        {/* Catégories ou contenu */}
        {!activeCategory ? (
          /* ===== 2 cartes catégories ===== */
          <div className="grid max-w-4xl gap-8 mx-auto grid-cols-1 sm:grid-cols-2">
            <CategoryCard
              cat={CATEGORIES[0]}
              count={projectCount}
              onClick={() => setActiveCategory("projets")}
            />
            <CategoryCard
              cat={CATEGORIES[1]}
              count={guideCount}
              onClick={() => setActiveCategory("guides")}
            />
          </div>
        ) : (
          /* ===== Projets de la catégorie sélectionnée ===== */
          <div>
            {/* Barre retour */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-all rounded-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{
                  background: `${activeMeta.color}30`,
                  border: `1px solid ${activeMeta.color}50`,
                }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                </svg>
                Retour
              </button>
              <h3
                className="text-xl font-bold"
                style={{
                  color: activeMeta.color,
                  fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                }}
              >
                {activeMeta.label}
              </h3>
              <span className="text-sm" style={{ color: THEME.sub }}>
                {filtered.length} {filtered.length > 1 ? "items" : "item"}
              </span>
            </div>

            {/* Grille responsive */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-[0.72rem]" style={{ color: THEME.sub }}>
          {PROJECTS.length} projets au total — cliquer sur une carte pour les détails
        </p>

        <ScrollDownHint targetId="veille" />
      </div>
    </section>
  );
}
