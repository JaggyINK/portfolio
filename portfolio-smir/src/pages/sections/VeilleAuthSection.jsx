import React, { useMemo, useState } from "react";

/* ============ Système φ (nombre d'or) ============ */
const PHI = 1.618;
const INV = 1 / PHI;
const INV2 = INV * INV;

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

/* ============ Primitives UI ============ */
function Pill({ children }) {
  return (
    <span
      className="px-3 py-[0.38rem] text-[0.82rem] rounded-full border"
      style={{ color: THEME.text, borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)" }}
    >
      {children}
    </span>
  );
}

/* ============ Collapsible Module ============ */
function CollapsibleModule({ question, category, pill, children, moduleId, isOpen, onToggle }) {
  return (
    <div
      className="relative rounded-[1.0rem] overflow-hidden border shadow-xl backdrop-blur-xl transition-all duration-500"
      style={{
        borderColor: THEME.border,
        background: THEME.card,
        boxShadow: isOpen ? "0 0.618rem 1.618rem rgba(0,0,0,.35)" : "0 0.382rem 0.618rem rgba(0,0,0,.2)",
      }}
    >
      {/* Effet de fond animé */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(140% 100% at 0% 0%, transparent 0%, black 50%, black 100%)",
          background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
          opacity: 0.06,
          animation: "spin-slow 18s linear infinite",
        }}
      />

      {/* Header cliquable */}
      <button
        onClick={onToggle}
        className="relative w-full text-left transition-all duration-300 border-b border-white/10 hover:bg-white/5"
        style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}
      >
        <div className="flex items-center justify-between gap-[0.618rem]">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {pill && <Pill>{pill}</Pill>}
              <span className="text-xs tracking-wider uppercase" style={{ color: THEME.sub }}>
                {category}
              </span>
            </div>
            <h3
              className="font-extrabold tracking-tight"
              style={{
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                fontSize: `clamp(1.05rem, ${0.95 * PHI}rem, 1.5rem)`,
                lineHeight: 1.0 + INV2,
                color: THEME.text,
              }}
            >
              {question}
            </h3>
          </div>
          <span
            className="flex-shrink-0 text-2xl transition-transform duration-300"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              color: THEME.brandFrom,
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Contenu extensible */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isOpen ? '3000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="relative animate-fadeIn"
          style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}
        >
          {children}
        </div>
      </div>

      {/* Ligne décorative */}
      <div className="h-[0.236rem] w-full" style={{ background: THEME.line }} />
    </div>
  );
}

/* ============ Section principale ============ */
export default function VeilleAuthSection() {
  const [focus, setFocus] = useState("backend");
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [openModules, setOpenModules] = useState({ module1: true }); // Gérer l'état de tous les modules

  const tabs = useMemo(
    () => [
      { key: "backend", label: "API Laravel" },
      { key: "frontend", label: "Front React" },
    ],
    []
  );

  // Fonction pour toggle un module spécifique
  const toggleModule = (moduleId) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <section
      id="veille-auth"
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${56 * PHI}rem` }}>
        {/* INTRO : thème + problématique */}
        <header className="mb-[1.5rem] text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
              lineHeight: 1.0 + INV,
            }}
          >
            Veille technologique : Sécurité de l'authentification en entreprise
          </h2>
          <p
            className="mx-auto mt-[0.618rem] max-w-3xl text-[0.95rem]"
            style={{ color: THEME.sub }}
          >
            Sujet choisi dans le cadre de mon <strong>BTS SIO option SLAM</strong> :
            <br />
            <strong>
              «&nbsp;Comment sécuriser l'authentification d'une application web moderne
              tout en garantissant son intégration avec les services d'identité de l'entreprise
              (Active Directory) ?&nbsp;»
            </strong>
          </p>
        </header>

        {/* ============ 1. EXPRESSION DE BESOIN DE LA VEILLE ============ */}
        <div className="mb-[1.5rem]">
          <h3
            className="mb-4 text-2xl font-bold text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            1. Expression de besoin de la veille
          </h3>
        </div>

        {/* 1.1 Contexte + 1.2 Enjeux */}
        <div className="grid grid-cols-1 gap-[1.0rem] lg:grid-cols-2">
          <div>
            <CollapsibleModule
              question="Pourquoi l'authentification est-elle un enjeu critique aujourd'hui ?"
              category="1.1. Contexte & 1.2. Enjeux"
              pill="Contexte"
              moduleId="module1"
              isOpen={openModules.module1}
              onToggle={() => toggleModule('module1')}
            >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  📊 Contexte actuel
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
              • <strong>Les entreprises basculent vers des applications web</strong> : 
              au lieu des anciens logiciels installés sur chaque poste, on utilise des applis web 
              accessibles partout. Résultat : <strong>l’identification devient la première barrière de sécurité</strong>.
            </li>
            <li>
              • <strong>Les cyberattaques ciblent maintenant les comptes utilisateurs</strong> : 
              mots de passe volés, hameçonnage, attaques par force brute…  
              Aujourd’hui, <strong>voler un compte est plus simple que pirater un serveur</strong>.
            </li>
            <li>
              • <strong>Les salariés doivent gérer trop de comptes</strong> :  
              sans solution centralisée (SSO), chacun accumule des dizaines d’identifiants → 
              risques d’oubli, de réutilisation et de failles.
            </li>
            <li>
              • <strong>Active Directory reste le cœur du système d’identité</strong> :  
              dans la majorité des entreprises, toutes les informations utilisateurs sont dans l’AD.  
              Les nouvelles applications doivent donc <strong>s’y intégrer proprement</strong>.
            </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🎯 Enjeux stratégiques
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
              • <strong>Sécuriser l’accès aux données sensibles</strong> :  
              si l’authentification est faible, tout le système derrière devient vulnérable.
            </li>
            <li>
              • <strong>Respecter les normes (RGPD, ISO 27001)</strong> :  
              ces réglementations imposent un contrôle strict des accès, une traçabilité 
              et une bonne gestion des identités.
            </li>
            <li>
              • <strong>Faciliter la vie des utilisateurs</strong> :  
              une authentification compliquée entraîne contournement, post-it, mots de passe simples…  
              Une bonne sécurité doit rester <strong>simple à utiliser</strong>.
            </li>
            <li>
              • <strong>Assurer une architecture durable</strong> :  
              l’entreprise doit pouvoir ajouter des applications, renforcer la sécurité (MFA, SSO…),  
              sans tout refaire à chaque fois.
            </li>
                </ul>
              </div>
              <div
                className="p-4 mt-4 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
              >
                <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
                  <strong>💡 Vocabulaire :</strong>
                  <br />

      • <strong>Active Directory (AD)</strong> :  
      C’est l’annuaire interne de l’entreprise. Il contient tous les comptes employés  
      (identifiant + mot de passe) utilisés pour se connecter au poste et aux services internes.
      <br />

      • <strong>LDAP Bind</strong> :  
      Méthode qui permet de demander à AD :  
      “Est-ce que ce mot de passe est correct pour cet utilisateur ?”.
      <br />

      • <strong>ODBC</strong> :  
      Un connecteur permettant à l’application (Laravel) de récupérer les informations AD  
      sans modifier l’infrastructure existante.
      <br />

      • <strong>JWT</strong> :  
      Un “jeton d’accès” utilisé dans les architectures web modernes pour prouver  
      l’identité d’un utilisateur.  
      (Utilisé surtout si l’application est accessible en dehors du réseau interne.)
      <br />

      • <strong>SSO</strong> (Single Sign-On) :  
      Le fait de se connecter une seule fois pour accéder à plusieurs applications.
    </p>
              </div>
            </div>
            </CollapsibleModule>
          </div>

          {/* 1.3 Objectif + 1.4 Besoins fonctionnels */}
          <div>
            <CollapsibleModule
              question="Quels sont les objectifs et besoins de cette veille ?"
              category="1.3. Objectifs & 1.4. Besoins fonctionnels"
              pill="Objectifs"
              moduleId="module2"
              isOpen={openModules.module2}
              onToggle={() => toggleModule('module2')}
            >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🎯 Objectif général
                </h4>
                 <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
          Cette veille a pour objectif de comprendre comment <strong>sécuriser un module de gestion
          de comptes</strong> (activation, changement de mot de passe, déverrouillage) dans un
          <strong> intranet d'entreprise</strong> :
          l'accès est réservé aux postes déjà connectés au réseau et authentifiés sur
          <strong> Active Directory</strong>, il n'y a donc pas de page de connexion classique ni de
          jetons d’accès exposés sur Internet. L’enjeu est de s’appuyer sur cette identité existante
          tout en ajoutant une <strong>couche de sécurité renforcée</strong> pour les opérations sensibles.
        </p>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  ✅ Besoins fonctionnels
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
            • <strong>Reconnaître automatiquement l’utilisateur</strong> à partir de son identifiant
            de session Windows / Active Directory, sans lui redemander son login.
          </li>
          <li>
            • <strong>Sécuriser les actions sensibles</strong> :
            exiger la saisie du mot de passe actuel pour changer son mot de passe,
            activer son compte ou le déverrouiller.
          </li>
          <li>
            • <strong>Appliquer des règles de mot de passe claires</strong> :
            longueur minimale, diversité des caractères, interdiction de certains mots trop simples,
            tout en restant compréhensible pour l’utilisateur.
          </li>
          <li>
            • <strong>Donner des messages compréhensibles</strong> (erreurs et confirmations)
            sans révéler d’informations sensibles
            (par exemple ne pas dire si un compte existe ou non).
          </li>
          <li>
            • <strong>Tracer les opérations</strong> : journaliser les demandes et changements
            de mot de passe (qui, quand, depuis quel poste) pour permettre un suivi et un audit.
          </li>
                </ul>
              </div>
            </div>
            </CollapsibleModule>
          </div>
        </div>

        {/* 1.5 Besoins techniques + 1.6 Contraintes */}
        <div className="mt-[1.0rem] grid grid-cols-1 lg:grid-cols-2 gap-[1.0rem]">
          <div>
            <CollapsibleModule
              question="Quelles technologies et standards adopter ?"
              category="1.5. Besoins techniques"
              pill="Stack"
              moduleId="module3"
              isOpen={openModules.module3}
              onToggle={() => toggleModule('module3')}
            >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🔧 Stack technique recommandée
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>Backend : Laravel (PHP 8.2+)</strong>  
        Framework robuste permettant de créer une API claire, sécurisée et
        facilement maintenable.
      </li>
      <li>
        • <strong>Frontend : React 18+ ou Vue.js 3+</strong>  
        Deux technologies modernes pour créer des interfaces web dynamiques (SPA).
      </li>
      <li>
        • <strong>Protocoles utilisés</strong> :  
        LDAP Bind pour vérifier les mots de passe AD,  
        ODBC pour récupérer les informations utilisateurs AD,  
        JWT lorsque l’application doit fonctionner sans session serveur (cas API REST).
      </li>
      <li>
        • <strong>Base de données</strong> : MySQL ou PostgreSQL  
        Stockage des logs, audits, historiques et données internes.
      </li>
      <li>
        • <strong>Intégration Active Directory</strong> :  
        via ODBC + LDAP Bind, permettant d’utiliser les comptes déjà existants
        de l’entreprise (pas besoin de recréer des comptes pour l’intranet).
      </li>
                </ul>
              </div>
              

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  📚 Standards
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>OWASP Top 10</strong>  
        Référence mondiale regroupant les 10 risques de sécurité les plus courants :  
        injection SQL, vols de sessions, mauvaises configurations, fuites de données, etc.
      </li>
      <li>
        • <strong>REST API</strong>  
        Méthode moderne pour faire communiquer un frontend (React) et un backend (Laravel)
        via des appels HTTP simples, structurés et standardisés.
      </li>
      <li>
        • <strong>HTTPS</strong>  
        Chiffre toutes les communications pour éviter l’interception de données sensibles
        (mots de passe, identifiants AD, tokens…).
      </li>
      <li>
        • <strong>Rate limiting</strong>  
        Empêche un attaquant d’essayer des milliers de mots de passe en quelques secondes.
      </li>
      <li>
        • <strong>Journalisation / audit</strong>  
        Trace toutes les actions sensibles (changements de mot de passe, déverrouillages…).
      </li>
                </ul>
              </div>
              <div
                className="p-4 mt-4 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
              >
                <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
                  <strong>💡 Vocabulaire :</strong>
                  <br />
      • <strong>REST API</strong> — Une manière simple de communiquer entre le front (React)
      et le backend (Laravel), via des requêtes du type : GET /user — POST /change-password.
      <br />
      • <strong>OWASP</strong> — Organisation internationale qui définit les bonnes pratiques
      pour éviter les failles de sécurité les plus répandues.
      <br />

      • <strong>SPA</strong> — Single Page Application : une application web “fluide” qui recharge la page en continu
      (React, Vue) pour offrir une meilleure expérience utilisateur.
    </p>
              </div>
            </div>
            </CollapsibleModule>
          </div>
          
          {/* 1.6 Contraintes + 1.7 Livrables */}          <div>
            <CollapsibleModule
              question="Quelles sont les contraintes et livrables ?"
              category="1.6. Contraintes & 1.7. Livrables"
              pill="Contraintes"
              moduleId="module4"
              isOpen={openModules.module4}
              onToggle={() => toggleModule('module4')}
            >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  ⚠️ Contraintes
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>Compatibilité avec AD :  </strong>  
        L’infrastructure peut utiliser des versions plus anciennes : le développeur doit donc
        adapter son code aux protocoles disponibles (LDAP, LDAPs, ODBC, JDBC, etc) sans imposer une mise à jour serveur.
      </li>

      <li>
        • <strong>Performance: </strong>  
        Les opérations de changement de mot de passe ou d’activation doivent être rapides :
        l’interface ne doit jamais “bloquer” l’utilisateur, sauf cas d'intrusion détectée. (blocage compte AD)
      </li>

      <li>
        • <strong>Sécurité + simplicité : </strong>  
        Trouver l’équilibre : sécuriser les actions critiques (re-saisir le mot de passe actuel)
        tout en gardant une interface compréhensible pour tous les employés.
      </li>

      <li>
        • <strong>Coût : </strong>  
        Favoriser les solutions open-source déjà présentes dans l’entreprise (Laravel, React,
        connecteurs LDAP / ODBC) pour éviter des dépenses supplémentaires.
      </li>

      <li>
        • <strong>Montée en compétence : </strong>  
        L’authentification AD est un sujet avancé : nécessité pour le développeur SLAM de
        comprendre LDAP,LDAPs, WAD, ODBC/JDBC, les politiques de mots de passe et les règles AD, et de sécurité internes.
      </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  📦 Livrables
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>Documentation technique</strong>  
        Explication du fonctionnement du module (LDAP Bind, ODBC, règles de mot de passe,
        sécurisation des endpoints…).
      </li>

      <li>
        • <strong>Code source commenté</strong>  
        Backend Laravel + Front React, avec bonnes pratiques d’authentification et protections OWASP.
      </li>

      <li>
        • <strong>Diagrammes de flux</strong> (sequence diagrams)  
        Schémas montrant le parcours complet :  
        “Utilisateur → Intranet → API Laravel → Active Directory → réponse”.
      </li>

      <li>
        • <strong>Tests techniques et tests de sécurité</strong>  
        Exemple : tentatives de mots de passe erronés, validation des règles, journalisation, contrôle
        des erreurs LDAP / ODBC.
      </li>

      <li>
        • <strong>Support de présentation (E4) : </strong>  
        Informations et explication claires et pédagogiques pour pouvoir expliquer la solution à un jury non-développeur.
      </li>
                </ul>
              </div>
            </div>
            </CollapsibleModule>
          </div>
        </div>

        {/* ============ 2. DÉMARCHE DE VEILLE ============ */}
        <div className="mt-[2rem] mb-[1.5rem]">
          <h3
            className="mb-4 text-2xl font-bold text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            2. Démarche et organisation de la veille
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-[1.0rem] lg:grid-cols-2">
          <div>
            <CollapsibleModule
              question="Comment organiser une veille technique efficace ?"
              category="Méthodologie"
              pill="Veille"
              moduleId="module5"
              isOpen={openModules.module5}
              onToggle={() => toggleModule('module5')}
            >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🔍 Outils et sources
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
  • <strong>Classement des informations</strong><br/>
  Je classe ma veille en catégories simples pour rester efficace :<br/>
  – <strong>Protocoles</strong> : LDAP, JWT, HTTPS.<br/>
  – <strong>Bonnes pratiques</strong> : OWASP, sécurité API, gestion des mots de passe.<br/>
  – <strong>Cas d’usage</strong> : intranet interne, intégration AD, API REST.
</li>

<li>
  • <strong>Sources fiables et variées</strong><br/>
  J’utilise un mélange de sources techniques et de vulgarisation pour avoir une vision complète :<br/>
  – <strong>Technologie générale</strong> : Wired, The Verge.<br/>
  – <strong>Cybersécurité</strong> : BleepingComputer, KrebsOnSecurity.<br/>
  – <strong>Développement</strong> : Mozilla Hacks, Laravel News.<br/>
  – <strong>IA / Innovations</strong> : OpenAI Blog, Google AI Blog.<br/>
  Quelques sources bien choisies suffisent pour rester à jour sans se perdre.
</li>

<li>
  • <strong>Veille quotidienne automatisée</strong><br/>
  Mon portfolio intègre une petite API personnelle qui récupère automatiquement :<br/>
  – les actualités développeurs (Hacker News),<br/>
  – les tendances GitHub.<br/>
  Cela me donne un tableau de bord rapide des nouveautés importantes.
</li>

<li>
  • <strong>Experts suivis</strong><br/>
  Je suis quelques leaders du secteur (ex : Dan Abramov – React, Mitchell Hashimoto – HashiCorp)  
  pour anticiper les évolutions majeures en développement web.
</li>

<li>
  • <strong>Rythme de suivi</strong><br/>
  – <strong>Quotidien</strong> : actualités dev + sécurité (HN, GitHub).<br/>
  – <strong>Hebdomadaire</strong> : veille sur les failles (CVE).<br/>
  – <strong>Mensuel</strong> : synthèse + mise à jour de ma page de veille.
</li>

<li>
  • <strong>Mise en pratique directe</strong><br/>
  Je teste les concepts sur mes projets : intégration LDAP/ODBC, sécurisation API Laravel, protections OWASP.  
  Cela me permet de valider la théorie par la pratique.
</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  📂 Organisation de la veille
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                 <li>
      • <strong>Classement des informations</strong><br/>
      Pour éviter d'être submergé, j'organise ma veille en trois catégories simples :<br/>
      1) <strong>Protocoles</strong> (LDAP, JWT, HTTPS),<br/>
      2) <strong>Bonnes pratiques de sécurité</strong> (OWASP, gestion des mots de passe),<br/>
      3) <strong>Cas d’usage concrets</strong> (intranet interne, API REST, intégration AD).
    </li>

    <li>
      • <strong>Sources fiables et variées</strong><br/>
      Je combine des sources généralistes et techniques pour avoir une vision équilibrée :<br/>
      – <strong>The Verge / Wired</strong> : tendances tech accessibles,<br/>
      – <strong>BleepingComputer</strong> : actualités cybersécurité,<br/>
      – <strong>Laravel News / Mozilla Hacks</strong> : nouveautés dev web,<br/>
      – <strong>Hacker News</strong> : innovations en temps réel.<br/>
      Cela me permet de rester informé sans multiplier inutilement les canaux.
    </li>

    <li>
      • <strong>Centralisation des notes</strong><br/>
      J'utilise <strong>Discord,</strong> j'ai mon propre serveur privé où j'ai un canal dédié à la veille technologique, ce qui me pemet de centraliser mes découvertes, liens et réflexions au même endroit.
      et ça me permet de les échanger facilement avec mes camarades développeurs. Tous le monde peut contribuer a l'enrichissement des connaissances.
    </li>

    <li>
      • <strong>Rythme de suivi</strong><br/>
      – <strong>Quotidien</strong> : actualités dev + sécurité via mon tableau automatisé sur mon portfolio (Hacker News / GitHub).<br/>
      – <strong>Hebdomadaire</strong> : surveillance des vulnérabilités (CVE) touchant PHP, LDAP, certificats TLS, etc.<br/>
      – <strong>Mensuel</strong> : synthèse globale mise à jour dans ma page de veille.
    </li>

    <li>
      • <strong>Mise en pratique directe</strong><br/>
      Dès qu’un concept m’intéresse, je le teste immédiatement sur mes projets (intranet, API Laravel, sandbox LDAP local).  
      Cela me permet de valider la théorie par l’expérimentation.
    </li>
                </ul>
              </div>
              {/* VOCABULAIRE */}
<div
  className="p-4 mt-4 rounded-lg"
  style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
>
  <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
    <strong>💡 Vocabulaire de la veille :</strong><br />

    • <strong>Veille technologique</strong> :<br/>
    Démarche continue permettant de se tenir informé des nouveautés techniques
    pour anticiper les évolutions, renforcer ses compétences et améliorer ses projets.

    <br />

    • <strong>CVE (Common Vulnerabilities and Exposures)</strong> :<br/>
    Base de données mondiale listant toutes les failles de sécurité connues dans les logiciels,
    systèmes et protocoles.

    <br />

    • <strong>Standard</strong> :<br/>
    Référence reconnue par les professionnels (ex : OWASP Top 10 pour la sécurité web).

    <br />
    • <strong>Meilleures pratiques (Best Practices)</strong> :<br/>
    Méthodes recommandées pour éviter les erreurs fréquentes et renforcer la sécurité.

    <br />

    • <strong>Open Source</strong> :<br/>
    Logiciels dont le code est public et amélioré par une communauté (Laravel, React, OpenLDAP).
  </p>
</div>
            </div>
            </CollapsibleModule>
          </div>

          <div>
            <CollapsibleModule
              question="Peut-on vraiment parler d'Active Directory en dev ?"
              category="Angle SLAM"
              pill="Dev"
              moduleId="module6"
              isOpen={openModules.module6}
              onToggle={() => toggleModule('module6')}
            >
            <div className="space-y-4">
              <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                <strong>Oui !</strong> Le développeur SLAM n'administre pas AD (rôle SISR),
                mais <strong>intègre</strong> l'application avec ce service d'authentification.
                Concrètement : on ne touche pas à AD, mais on apprend à <strong>s’y brancher proprement</strong>.
              </p>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🔌 Mes tests d'intégration AD avec Laravel
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
            • <strong>ODBC</strong> : méthode simple qui permet de lire les informations utilisateurs
            depuis AD (nom, email, état du compte). Fonctionne directement en PHP.
          </li>
          <li>
            • <strong>JDBC</strong> : équivalent côté Java. Fonctionnel, mais nécessite un environnement Java.
            Utile pour tester plusieurs approches.
          </li>
          <li>
            • <strong>LDAP Bind</strong> : méthode standard pour vérifier un mot de passe AD 
            sans jamais le stocker. On vérifie simplement si “AD accepte la connexion”.
          </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🎫 Deux approches testées pour la connexion
                </h4>
                <div className="space-y-3">
                  <div>
                    <p style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                      <strong>1. Avec JWT</strong> — idéal pour les applications modernes (React / Vue)
                    </p>
                    <ul className="ml-4 space-y-1" style={{ color: THEME.sub, fontSize: `${0.9}rem` }}>
                      <li>→ L’utilisateur se connecte via AD (LDAP Bind / ODBC).</li>
              <li>→ L’API génère un <strong>JWT</strong> signé.</li>
              <li>→ Le front utilise ce token pour accéder aux autres pages.</li>
              <li>→ Adapté aux architectures “API + SPA”.</li>
                    </ul>
                  </div>
                  <div>
                    <p style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                      <strong>2. Sans JWT</strong> — fonctionnement classique (sessions Laravel)
                    </p>
                    <ul className="ml-4 space-y-1" style={{ color: THEME.sub, fontSize: `${0.9}rem` }}>
                      <li>→ L’utilisateur est vérifié une seule fois via AD.</li>
              <li>→ Laravel crée une session stockée dans un cookie.</li>
              <li>→ Simpler mais moins adapté aux applications modernes en JavaScript.</li>
                      <li>→ Convient aux apps web traditionnelles (Blade)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  ✅ Ce que j'ai appris
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>• ODBC et JDBC permettent tous deux de lire les informations depuis AD.</li>
          <li>• ODBC est plus simple car directement utilisable en PHP / Laravel.</li>
          <li>• Le <strong>Bind LDAP</strong> est la méthode officielle pour vérifier un mot de passe AD.</li>
          <li>• Les <strong>JWT</strong> sont indispensables pour une API moderne découpée en front + backend.</li>
          <li>• Les mots de passe AD ne doivent <strong>jamais</strong> être stockés dans la base locale.</li>
                </ul>
              </div>

              {/* VOCABULAIRE */}
      <div
        className="p-4 mt-4 rounded-lg"
        style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
      >
        <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
          <strong>💡 Vocabulaire :</strong><br /><br />

          • <strong>Active Directory (AD)</strong> : annuaire central qui contient tous les comptes
          utilisateurs, mots de passe, groupes et permissions d’une entreprise.

          <br /><br />

          • <strong>LDAP Bind</strong> : méthode qui permet de vérifier un mot de passe auprès d’AD sans le stocker.
          AD confirme simplement si les identifiants sont corrects.

          <br /><br />

          • <strong>ODBC</strong> : standard qui permet à une application de lire des données
          dans une base (ici AD), quel que soit le langage utilisé.

          <br /><br />

          • <strong>JDBC</strong> : équivalent Java d’ODBC. Utile pour tester plusieurs environnements.

          <br /><br />

          • <strong>JWT (JSON Web Token)</strong> : “ticket d’accès” sécurisé envoyé au navigateur après connexion,
          qui prouve l’identité de l’utilisateur pour les requêtes suivantes.
        </p>
      </div>
            </div>
            </CollapsibleModule>
          </div>
        </div>

        {/* ============ 3. SYNTHÈSE DE VEILLE ============ */}
        <div className="mt-[2rem] mb-[1.5rem]">
          <h3
            className="mb-4 text-2xl font-bold text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            3. Synthèse de la veille
          </h3>
        </div>

        {/* Bonnes pratiques actuelles */}
        <div className="grid grid-cols-1 gap-[1.0rem]">
          <CollapsibleModule
            question="Quelles sont les bonnes pratiques actuelles ?"
            category="Bonnes pratiques"
            pill="2025"
            moduleId="module7"
            isOpen={openModules.module7}
            onToggle={() => toggleModule('module7')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🔐 Authentification
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>Hashage moderne</strong> : utiliser bcrypt (cost 12+) ou Argon2id,
        et ne jamais utiliser des algorithmes obsolètes comme MD5 ou SHA-1.
      </li>
      <li>
        • <strong>MFA recommandé</strong> : ajouter un deuxième facteur (code, appli, clé physique)
        en plus du mot de passe.
      </li>
      <li>
        • <strong>Politique de mots de passe</strong> : au moins 12 caractères, 
        et s’inspirer des recommandations récentes (NIST) qui privilégient des mots de passe longs
        plutôt que des changements trop fréquents.
      </li>
      <li>
        • <strong>Rate limiting agressif</strong> : limiter le nombre d’essais (ex. 5 tentatives/minute)
        et augmenter la temporisation en cas d’échecs successifs.
      </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🎫 Gestion des tokens
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>JWT de courte durée</strong> : durée de vie limitée (15 min à 1 h)
        + éventuellement un “refresh token” plus long.
      </li>
      <li>
        • <strong>Stockage sécurisé</strong> : cookies HttpOnly + Secure + SameSite
        ou stockage en mémoire côté front pour limiter les risques d’attaque XSS.
      </li>
      <li>
        • <strong>Révocation</strong> : possibilité d’invalider un token avant sa date d’expiration
        (ex. blacklist en base ou via Redis).
      </li>
      <li>
        • <strong>Rotation des secrets</strong> : changer régulièrement la clé de signature des JWT.
      </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🛡️ Protection OWASP
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
        • <strong>Injection / XSS</strong> : validation stricte des entrées,
        ORM (Eloquent) et échappement systématique côté vue.
      </li>
      <li>
        • <strong>CSRF</strong> : utilisation de tokens CSRF sur toutes les requêtes de modification
        (création, mise à jour, suppression).
      </li>
      <li>
        • <strong>CORS</strong> : n’autoriser que les domaines connus à appeler l’API.
      </li>
      <li>
        • <strong>Headers de sécurité</strong> : configuration de CSP, X-Frame-Options, HSTS, etc.
      </li>
                </ul>
              </div>
              <div
    className="p-4 mt-4 rounded-lg"
    style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
  >
    <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
      <strong>💡 Vocabulaire associé :</strong><br />

      • <strong>MFA (Multi-Factor Authentication)</strong> :<br/>
      authentification à plusieurs facteurs (mot de passe + code SMS, appli d’authentification,
      clé USB de sécurité, biométrie…).<br />

      • <strong>TOTP</strong> (Time-based One-Time Password) :<br/>
      code temporaire qui change toutes les 30 secondes, généré par une application
      comme Google Authenticator ou Microsoft Authenticator.<br />

      • <strong>NIST</strong> :<br/>
      organisme américain qui publie des recommandations de sécurité, notamment 
      sur les mots de passe (longueur, complexité, renouvellement…).<br />

      • <strong>Blacklist Redis</strong> :<br/>
      technique qui consiste à stocker dans Redis (base en mémoire très rapide)
      la liste des tokens à considérer comme invalides (par exemple après un logout).<br />

      • <strong>Token CSRF</strong> :<br/>
      jeton unique ajouté aux formulaires pour vérifier que la requête vient bien 
      du site légitime et non d’un site tiers malveillant.<br />

      • <strong>CSP (Content-Security-Policy)</strong> :<br/>
      en-tête HTTP qui limite les sources autorisées pour le JavaScript, les images, les styles, etc.
      Très efficace contre certaines attaques XSS.<br />

      • <strong>X-Frame-Options</strong> :<br/>
      en-tête HTTP qui empêche une page d’être chargée dans une iframe
      (protection contre les attaques de type clickjacking).<br />

      • <strong>HSTS (HTTP Strict Transport Security)</strong> :<br/>
      en-tête HTTP qui force le navigateur à utiliser uniquement HTTPS pour ce site,
      même si l’utilisateur tape “http://” par erreur.
    </p>
  </div>
            </div>
          </CollapsibleModule>
        </div>

        {/* Solutions comparées */}
        <div className="mt-[1.0rem] grid grid-cols-1 gap-[1.0rem]">
          <CollapsibleModule
            question="Quelles solutions comparer pour l'authentification ?"
            category="Solutions comparées"
            pill="Analyse"
            moduleId="module8"
            isOpen={openModules.module8}
            onToggle={() => toggleModule('module8')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  📊 Tableau comparatif
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" style={{ color: THEME.text }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${THEME.border}` }}>
                        <th className="p-2 text-left">Solution</th>
                        <th className="p-2 text-left">Avantages</th>
                        <th className="p-2 text-left">Inconvénients</th>
                        <th className="p-2 text-left">Cas d'usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                        <td className="p-2"><strong>Laravel Sanctum</strong></td>
                        <td className="p-2">
                          • Simple<br/>
                          • Intégré Laravel<br/>
                          • Gratuit
                        </td>
                        <td className="p-2">
                          • Basique<br/>
                          • Pas d'OAuth complet
                        </td>
                        <td className="p-2">
                          SPA + API<br/>
                          Applications internes
                        </td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                        <td className="p-2"><strong>Laravel Passport</strong></td>
                        <td className="p-2">
                          • OAuth 2.0 complet<br/>
                          • Scopes avancés<br/>
                          • Gestion clients
                        </td>
                        <td className="p-2">
                          • Plus complexe<br/>
                          • Tables additionnelles
                        </td>
                        <td className="p-2">
                          API publique<br/>
                          Intégrations tierces
                        </td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                        <td className="p-2"><strong>Auth0 / Okta</strong></td>
                        <td className="p-2">
                          • Clé en main<br/>
                          • MFA intégré<br/>
                          • Support entreprise
                        </td>
                        <td className="p-2">
                          • Coût élevé<br/>
                          • Dépendance SaaS
                        </td>
                        <td className="p-2">
                          Grandes entreprises<br/>
                          Multi-applications
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2"><strong>Keycloak</strong></td>
                        <td className="p-2">
                          • Open-source<br/>
                          • OIDC/SAML<br/>
                          • Self-hosted
                        </td>
                        <td className="p-2">
                          • Administration complexe<br/>
                          • Ressources serveur
                        </td>
                        <td className="p-2">
                          Infrastructure on-premise<br/>
                          SSO entreprise
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  💡 Recommandation basée sur mon expérience
                </h4>
                <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                  Pour un projet BTS SLAM : <strong>Laravel Sanctum</strong> est le meilleur
                  compromis (simplicité, gratuit, parfait pour SPA + API).
                  <br />
                  <br />
                  Pour une vraie intégration AD en entreprise : j'ai testé avec succès
                  <strong> ODBC</strong> (natif PHP, simple) et <strong>JDBC</strong> (via bridge Java, fonctionnel),
                  tous les deux combinés avec <strong>LDAP Bind</strong> pour l'authentification.
                  <br />
                  <br />
                  <strong>Mon choix final :</strong> ODBC + LDAP Bind + JWT. Cette stack permet de :
                  <br />
                  • Interroger l'annuaire AD (ODBC)
                  <br />
                  • Authentifier sans stocker les mots de passe (LDAP Bind)
                  <br />
                  • Générer des tokens pour l'API (JWT Laravel Sanctum)
                  <br />
                  <br />
                  <em>Note :</em> JDBC fonctionne aussi mais nécessite un serveur Java en plus de PHP.
                  ODBC est donc plus léger pour un environnement Laravel pur.
                </p>
              </div>
            </div>
          </CollapsibleModule>
        </div>

        {/* Conclusion */}
        <div className="mt-[1.0rem] grid grid-cols-1 gap-[1.0rem]">
          <CollapsibleModule
            question="Quelle conclusion tirer de cette veille ?"
            category="Conclusion"
            pill="Synthèse"
            moduleId="module9"
            isOpen={openModules.module9}
            onToggle={() => toggleModule('module9')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  ✅ Points clés retenus
                </h4>
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
                    • <strong>L'authentification est un pilier fondamental</strong> de la sécurité
                    applicative - aucune négligence n'est acceptable
                  </li>
                  <li>
                    • <strong>Les standards modernes (JWT, OIDC)</strong> sont matures et bien
                    documentés - pas besoin de réinventer la roue
                  </li>
                  <li>
                    • <strong>L'intégration avec Active Directory</strong> est possible via LDAP
                    ou OIDC - le développeur SLAM joue un rôle clé dans cette intégration
                  </li>
                  <li>
                    • <strong>La sécurité est un processus continu</strong> : veille sur les CVE,
                    tests réguliers, mise à jour des dépendances
                  </li>
                  <li>
                    • <strong>L'équilibre UX/sécurité</strong> est crucial - une authentification
                    trop complexe pousse les utilisateurs à contourner la sécurité
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🚀 Apports pour le BTS SIO
                </h4>
                <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                  Cette veille m'a permis de <strong>comprendre concrètement</strong> comment
                  sécuriser une application web professionnelle. Je peux maintenant :
                </p>
                <ul className="mt-2 space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>• Concevoir une API REST d'authentification avec Laravel</li>
                  <li>• Intégrer un front SPA (React/Vue) de manière sécurisée</li>
                  <li>• Dialoguer avec les équipes infra sur l'intégration AD</li>
                  <li>• Identifier et corriger les failles OWASP courantes</li>
                  <li>• Argumenter mes choix techniques auprès d'un jury ou client</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                  🔮 Perspectives et évolutions
                </h4>
                <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                  Les tendances à suivre pour 2025-2026 :
                </p>
                <ul className="mt-2 space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
                    • <strong>Passkeys / WebAuthn</strong> : authentification sans mot de passe
                    (biométrie, clés physiques)
                  </li>
                  <li>
                    • <strong>Zero Trust Architecture</strong> : ne jamais faire confiance,
                    toujours vérifier
                  </li>
                  <li>
                    • <strong>IA et détection d'anomalies</strong> : analyse comportementale
                    pour détecter les connexions suspectes
                  </li>
                  <li>
                    • <strong>Décentralisation</strong> : SSI (Self-Sovereign Identity) et
                    identités décentralisées (blockchain)
                  </li>
                </ul>
              </div>
            </div>
          </CollapsibleModule>
        </div>

        {/* ============ 4. COMPÉTENCES BTS SIO ============ */}
        <div className="mt-[2rem] mb-[1.5rem]">
          <h3
            className="mb-4 text-2xl font-bold text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            4. Compétences BTS SIO mobilisées
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-[1.0rem]">
          <CollapsibleModule
            question="Quelles compétences BTS SIO cette veille mobilise-t-elle ?"
            category="Référentiel"
            pill="E4 / E5"
            moduleId="module10"
            isOpen={openModules.module10}
            onToggle={() => toggleModule('module10')}
          >
            <ul className="space-y-[0.5rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>
                📚 <strong>C1.1 / C1.2 - Veille technologique</strong> :
                Rechercher, analyser et synthétiser l'information sur un sujet technique.
                Présenter les résultats de manière structurée et argumentée.
              </li>
              <li>
                💻 <strong>C2.1 / C2.2 - Conception et développement</strong> :
                Concevoir une architecture applicative sécurisée, développer une API REST
                en respectant les bonnes pratiques (validation, tests, documentation).
              </li>
              <li>
                🔐 <strong>C2.3 - Sécurité des applications</strong> :
                Intégrer les mécanismes de sécurité (authentification, autorisation, chiffrement)
                dès la phase de conception, appliquer les recommandations OWASP.
              </li>
              <li>
                🏢 <strong>C3.1 / C3.2 - Intégration dans le SI</strong> :
                Prendre en compte les contraintes d'un système d'information existant
                (annuaire AD, protocoles d'entreprise, normes de sécurité, compatibilité).
              </li>
              <li>
                🎤 <strong>Communication professionnelle</strong> :
                Capacité à vulgariser un sujet technique complexe auprès d'un jury
                non-spécialiste, répondre aux questions avec pertinence.
              </li>
            </ul>
          </CollapsibleModule>
        </div>

        {/* ============ 5. EXEMPLES TECHNIQUES ============ */}
        <div className="mt-[2rem] mb-[1rem]">
          <h3
            className="mb-4 text-2xl font-bold text-center"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            5. Exemples d'implémentation
          </h3>
        </div>

        <div className="mt-[1.0rem]">
          <button
            onClick={() => setIsCodeOpen(!isCodeOpen)}
            className="w-full px-6 py-4 rounded-[1.0rem] border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            style={{
              borderColor: THEME.border,
              background: THEME.card,
              color: THEME.text,
              boxShadow: "0 0.382rem 1.0rem rgba(0,0,0,.25)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Pill>Code</Pill>
                  <span className="text-xs tracking-wider uppercase" style={{ color: THEME.sub }}>
                    Exemples concrets
                  </span>
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                  }}
                >
                  💻 Comment implémenter l'authentification en pratique ?
                </h3>
                <p className="mt-1 text-sm" style={{ color: THEME.sub }}>
                  Architecture SPA + API Laravel avec Laravel Sanctum (code commenté)
                </p>
              </div>
              <span
                className="text-2xl transition-transform duration-300"
                style={{
                  transform: isCodeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                  color: THEME.brandFrom,
                }}
              >
                ▼
              </span>
            </div>
          </button>

          {/* Panel extensible des exemples de code */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: isCodeOpen ? '4000px' : '0',
              opacity: isCodeOpen ? 1 : 0,
            }}
          >
            <div className="mt-[1.0rem]">
              <div
                className="relative rounded-[1.0rem] overflow-hidden border shadow-xl backdrop-blur-xl"
                style={{ borderColor: THEME.border, background: THEME.card }}
              >
                {/* Header avec tabs */}
                <div
                  className="flex items-center justify-between border-b border-white/10"
                  style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}
                >
                  <h4 className="font-bold" style={{ color: THEME.text }}>
                    Exemples de code
                  </h4>
                  <div className="flex gap-[0.382rem]">
                    {tabs.map((t) => (
                      <button
                        key={t.key}
                        className={`px-3 py-[0.4rem] rounded-md border transition-all duration-200 ${
                          focus === t.key ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"
                        }`}
                        onClick={() => setFocus(t.key)}
                        style={{ color: THEME.text, fontSize: "0.85rem" }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contenu code */}
                <div style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}>
                  {focus === "backend" && (
                    <pre className="overflow-x-auto text-xs leading-relaxed" style={{ color: THEME.sub }}>
{`// ============================================
// BACKEND : API Laravel avec Sanctum
// ============================================

// -------------------- 1. Routes API --------------------
// routes/api.php

use App\\Http\\Controllers\\AuthController;
use Illuminate\\Support\\Facades\\Route;

// Route de connexion (limitée à 5 tentatives/minute par IP)
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// Route de déconnexion (nécessite authentification)
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

// Récupérer l'utilisateur connecté
Route::get('/me', [AuthController::class, 'me'])
    ->middleware('auth:sanctum');


// -------------------- 2. Controller --------------------
// app/Http/Controllers/AuthController.php

namespace App\\Http\\Controllers;

use App\\Http\\Requests\\LoginRequest;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Support\\Facades\\RateLimiter;

class AuthController extends Controller
{
    /**
     * Connexion utilisateur avec protection brute-force
     * @param LoginRequest $request - Requête validée
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // 1. Protection supplémentaire contre le brute-force par email
        $throttleKey = 'login:' . $request->ip() . ':' . $request->email;
        
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'message' => "Trop de tentatives. Réessayez dans {$seconds}s"
            ], 429);
        }

        // 2. Extraction des credentials validés
        $credentials = $request->only('email', 'password');

        // 3. Tentative d'authentification via Laravel Auth
        //    Hash le password et le compare avec la BDD (bcrypt)
        if (!Auth::attempt($credentials)) {
            // Incrémenter le compteur d'échecs
            RateLimiter::hit($throttleKey, 60); // Bloque 60 secondes
            
            // Message volontairement générique (pas de "email inexistant")
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        // 4. Réinitialiser le compteur en cas de succès
        RateLimiter::clear($throttleKey);

        // 5. Récupération de l'utilisateur authentifié
        $user = Auth::user();

        // 6. Vérifications supplémentaires (optionnel)
        if (!$user->email_verified_at) {
            Auth::logout();
            return response()->json([
                'message' => 'Veuillez vérifier votre email'
            ], 403);
        }

        // 7. Génération d'un token d'accès via Laravel Sanctum
        //    - 'access' : nom du token
        //    - ['*'] : permissions (tous les scopes)
        //    - now()->addDay() : expiration dans 24h
        $token = $user->createToken(
            'access',
            ['*'],
            now()->addDay()
        )->plainTextToken;

        // 8. Log de l'authentification (audit trail)
        \\Log::info('User logged in', [
            'user_id' => $user->id,
            'ip' => $request->ip(),
        ]);

        // 9. Réponse avec données minimales + token
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'), // Si RBAC
            ],
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => now()->addDay()->toISOString(),
        ], 200);
    }

    /**
     * Déconnexion (révocation du token actuel)
     */
    public function logout(): JsonResponse
    {
        Auth::user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }

    /**
     * Récupérer l'utilisateur authentifié
     */
    public function me(): JsonResponse
    {
        return response()->json(['user' => Auth::user()], 200);
    }
}


// -------------------- 3. Validation --------------------
// app/Http/Requests/LoginRequest.php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'L\\'email est requis',
            'email.email' => 'Format d\\'email invalide',
            'password.min' => 'Minimum 8 caractères',
        ];
    }
}`}
                    </pre>
                  )}
                  {focus === "frontend" && (
                    <pre className="overflow-x-auto text-xs leading-relaxed" style={{ color: THEME.sub }}>
{`// ============================================
// FRONTEND : Service d'authentification React
// ============================================

/**
 * Connecte l'utilisateur et récupère son token
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<Object>} Données utilisateur + token
 */
async function login(email, password) {
  // 1. Validation côté client
  if (!email || !password) {
    throw new Error('Email et mot de passe requis');
  }

  if (!/\\S+@\\S+\\.\\S+/.test(email)) {
    throw new Error('Format d\\'email invalide');
  }

  try {
    // 2. Appel API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // 3. Gestion des erreurs HTTP
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 401:
          throw new Error('Identifiants invalides');
        case 403:
          throw new Error('Compte suspendu ou non vérifié');
        case 429:
          throw new Error('Trop de tentatives. Réessayez plus tard');
        default:
          throw new Error('Erreur de connexion');
      }
    }

    // 4. Extraction et stockage sécurisé du token
    const data = await response.json();
    
    // ⚠️ Stockage en mémoire (pas localStorage - vulnérable XSS)
    window.__authToken = data.token;
    
    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Serveur inaccessible');
    }
    throw error;
  }
}

/**
 * Déconnecte l'utilisateur
 */
async function logout() {
  try {
    const token = window.__authToken;
    if (token) {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Accept': 'application/json',
        },
      });
    }
  } finally {
    delete window.__authToken;
  }
}

/**
 * Helper pour requêtes authentifiées
 */
async function authenticatedFetch(url, options = {}) {
  const token = window.__authToken;
  
  if (!token) {
    throw new Error('Non authentifié');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': \`Bearer \${token}\`,
      'Accept': 'application/json',
    },
  });

  if (response.status === 401) {
    delete window.__authToken;
    throw new Error('Session expirée');
  }

  return response;
}

// Export
export { login, logout, authenticatedFetch };`}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau final */}
        <div className="mt-[1.5rem] text-center" style={{ color: THEME.sub, fontSize: `${0.95}rem` }}>
          Veille maintenue mensuellement — dernière mise à jour : <strong>novembre 2025</strong>.
          <br />
          Questions ou retours ?{" "}
          <a href="#contact" className="underline hover:no-underline">
            Contactez-moi
          </a>.
        </div>
      </div>
    </section>
  );
}