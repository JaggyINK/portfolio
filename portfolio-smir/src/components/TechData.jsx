// src/components/TechData.jsx

export const TECH_DATA = {
  // ===== FRONTEND =====
  React: {
    description: "Framework utilisé pour le portfolio 3D et certaines interfaces CPMS. Permet de créer des composants réutilisables et des expériences interactives.",
    projects: ["Portfolio 3D avec Three.js", "Composants intranet CPMS"]
  },
  "Vue.js": {
    description: "Framework frontend principal de l'intranet CPMS (2.7% du codebase). Gestion des dashboards, formulaires et interactions utilisateurs.",
    projects: ["Intranet CPMS (180+ users)"]
  },
  "Tailwind CSS": {
    description: "Framework CSS utility-first utilisé sur le portfolio et les projets récents. Accélère le développement et assure la cohérence visuelle.",
    projects: ["Portfolio 3D", "Projets personnels"]
  },
  "Three.js": {
    description: "Bibliothèque WebGL pour créer des scènes 3D interactives. Utilisée pour le portfolio avec navigation spatiale et animations.",
    projects: ["Portfolio 3D immersif"]
  },

  "Next.js": {
    description: "Framework React avec SSR et routing intégré. Utilisé pour des projets fullstack performants avec rendu hybride.",
    projects: ["Projets personnels"]
  },

  // ===== BACKEND =====
  Python: {
    description: "Langage principal de l'intranet CPMS (40% du codebase). Développement d'APIs, chatbot FAQ, intégrations Jira/SSO et automatisations.",
    projects: ["Intranet CPMS", "Bot Discord Veille Tech", "Scripts automatisation"]
  },
  PHP: {
    description: "Utilisé pour le développement backend de plusieurs projets académiques et professionnels avec Laravel.",
    projects: ["Projets Laravel", "Applications CPMS"]
  },
  Laravel: {
    description: "Framework PHP avec architecture MVC. Utilisé pour la plateforme Annonz (CRUD, recherche full-text, uploads, modération).",
    projects: ["Plateforme Annonz", "Projets académiques BTS"]
  },
  "Node.js": {
    description: "Runtime JavaScript côté serveur. Utilisé pour des outils de build, scripts serveur et environnements de développement.",
    projects: ["Portfolio 3D (tooling)", "Scripts automatisation"]
  },
  Shopify: {
    description: "Plateforme e-commerce custom. Développement de code source modifié, applications custom (convertisseur devises géolocalisé) et flows automatisés.",
    projects: ["alafrench.fr (luxe)", "alafrenchcare.com (cosmétique CBD)"]
  },

  // ===== INTÉGRATIONS & APIs =====
  "APIs REST": {
    description: "Conception et consommation d'APIs pour intégrations tierces : Jira (création/suivi tickets), SSO (authentification), géolocalisation, taux de change.",
    projects: ["Intégrations Jira CPMS", "Convertisseur devises alafrench", "APIs diverses"]
  },
  "Active Directory": {
    description: "Intégration SSO et gestion des permissions utilisateurs dans l'intranet CPMS. Synchronisation des comptes et gestion des rôles.",
    projects: ["Intranet CPMS (SSO/AD)"]
  },
  SQLite: {
    description: "Base de données embarquée légère. Utilisée pour le stockage local dans les applications desktop et les prototypes.",
    projects: ["Projets prototyping", "Applications locales"]
  },
  MySQL: {
    description: "Base de données relationnelle utilisée sur la majorité des projets. Conception de schémas, optimisation de requêtes et gestion des relations.",
    projects: ["CPMS", "Annonz", "Projets Laravel"]
  },

  // ===== AUTOMATISATION & DEVOPS =====
  Git: {
    description: "Système de versioning distribué. Utilisé quotidiennement pour le suivi de code, branches feature et collaboration.",
    projects: ["Tous les projets", "GitHub @JaggyINK"]
  },
  Vite: {
    description: "Build tool ultra-rapide avec HMR instantané. Utilisé pour le portfolio 3D avec chunking optimisé.",
    projects: ["Portfolio 3D", "Projets React/Vue"]
  },
  Docker: {
    description: "Conteneurisation d'applications pour déploiements reproductibles. Utilisé pour environnements de développement et déploiements potentiels.",
    projects: ["Bot Discord (déploiement potentiel)", "Environnements dev"]
  },
  Chatbot: {
    description: "Développement d'un chatbot FAQ intelligent intégré à l'intranet CPMS. Automatisation des réponses aux questions récurrentes.",
    projects: ["Chatbot FAQ CPMS"]
  },
  Automatisation: {
    description: "Scripts Python pour automatiser la veille technologique (OWASP, CERT-FR, MSRC), collecte de données et diffusion via Discord.",
    projects: ["Bot Discord Veille Tech", "Scripts divers"]
  },

  // ===== SÉCURITÉ =====
  OWASP: {
    description: "Application des bonnes pratiques sécurité : authentification robuste, contrôle d'accès, prévention injection SQL/XSS, gestion des rôles.",
    projects: ["Sécurisation CPMS", "Audits projets", "Veille automatisée"]
  },
  Authentification: {
    description: "Mise en place de systèmes d'authentification sécurisés : SSO, Active Directory, gestion des sessions, réinitialisation de mots de passe.",
    projects: ["Intranet CPMS", "Projets avec login"]
  },
};