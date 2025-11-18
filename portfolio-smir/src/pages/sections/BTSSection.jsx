import React, { useState } from "react";

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
export default function BTSSection() {
  const [openModules, setOpenModules] = useState({ 
    module1: true,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
  });

  const toggleModule = (moduleId) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <section
      id="bts"
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
        {/* INTRO */}
        <header className="mb-[1.5rem] text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
              lineHeight: 1.0 + INV,
            }}
          >
            BTS SIO – Services Informatiques aux Organisations
          </h2>
          <p
            className="mx-auto mt-[0.618rem] max-w-3xl text-[0.95rem]"
            style={{ color: THEME.sub }}
          >
            Diplôme d'État de niveau 5 (Bac+2) – option{" "}
            <strong>SLAM</strong> (Solutions Logicielles et Applications Métiers)
          </p>
        </header>

        {/* Présentation + Objectifs */}
        <div className="grid grid-cols-1 gap-[1.0rem] lg:grid-cols-2">
          <div>
            <CollapsibleModule
              question="Qu'est-ce que le BTS SIO ?"
              category="Présentation"
              pill="Diplôme"
              moduleId="module1"
              isOpen={openModules.module1}
              onToggle={() => toggleModule('module1')}
            >
              <div className="space-y-4">
                <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                  Le <strong>BTS SIO</strong> forme des profils capables de concevoir, 
                  développer et maintenir des solutions numériques au service des métiers : 
                  applications web, outils internes, services informatiques…
                </p>

                <div>
                  <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                    🎯 Objectifs de la formation
                  </h4>
                  <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                    <li>• Maîtriser les bases du développement d'applications.</li>
                    <li>• Comprendre l'organisation d'un système d'information.</li>
                    <li>• Intégrer les contraintes de sécurité et de qualité.</li>
                    <li>• Préparer une insertion en entreprise ou une poursuite d'études.</li>
                  </ul>
                </div>

                <div
                  className="p-4 mt-4 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.brandFrom}` }}
                >
                  <p style={{ color: THEME.sub, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    <strong>💡 Mon parcours :</strong><br />
                    Actuellement en formation à la <strong>Digital School of Paris</strong> 
                    (groupe <strong>IEF2I</strong>), option <strong>SLAM</strong>, en alternance. 
                    Diplôme visé en <strong>juin 2026</strong>.
                  </p>
                </div>
              </div>
            </CollapsibleModule>
          </div>

          <div>
            <CollapsibleModule
              question="Quels débouchés après le BTS SIO ?"
              category="Débouchés"
              pill="Métiers"
              moduleId="module2"
              isOpen={openModules.module2}
              onToggle={() => toggleModule('module2')}
            >
              <div className="space-y-4">
                <p style={{ color: THEME.text, fontSize: `${0.95}rem`, lineHeight: 1.6 }}>
                  Selon l'option choisie, plusieurs métiers sont accessibles après le BTS SIO :
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Développeur / Développeuse",
                      url: "https://www.onisep.fr/ressources/univers-metier/metiers/developpeur-developpeuse-informatique",
                    },
                    {
                      label: "Intégrateur web",
                      url: "https://www.onisep.fr/ressources/univers-metier/metiers/integrateur-integratrice-web",
                    },
                    {
                      label: "Développeur full-stack junior",
                      url: "https://www.openclassrooms.com/fr/paths/717-developpeur-full-stack",
                    },
                    {
                      label: "Chef de projet junior",
                      url: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-de-projet-informatique",
                    },
                    {
                      label: "Support applicatif",
                      url: "https://webitechparis.com/metier/technicien-support-applicatif/",
                    },
                    {
                      label: "Technicien systèmes/applicatifs",
                      url: "https://nextformation.com/fiches-metiers/technicien-support-applicatif",
                    },
                    {
                      label: "Consultant IT",
                      url: "https://www.onisep.fr/ressources/univers-metier/metiers/consultant-consultante-en-systemes-d-information",
                    },
                    {
                      label: "Cybersécurité (spécialisation)",
                      url: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-en-securite-informatique",
                    },
                  ].map((d) => (
                    <a
                      key={d.label}
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 text-center transition border rounded-lg hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: THEME.text,
                        fontSize: "0.85rem",
                      }}
                    >
                      {d.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </CollapsibleModule>
          </div>
        </div>

        {/* Options SLAM / SISR */}
        <div className="mt-[1.0rem] grid grid-cols-1 lg:grid-cols-2 gap-[1.0rem]">
          <div>
            <CollapsibleModule
              question="Option SLAM – Solutions Logicielles"
              category="Option suivie"
              pill="Développement"
              moduleId="module3"
              isOpen={openModules.module3}
              onToggle={() => toggleModule('module3')}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                    💻 Compétences développées
                  </h4>
                  <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                    <li>• Conception et développement d'applications (web, mobile, API).</li>
                    <li>• Modélisation et gestion de bases de données.</li>
                    <li>• Intégration dans un SI existant (intranet, outils métiers…).</li>
                    <li>• Tests, qualité logicielle, documentation.</li>
                  </ul>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ background: "rgba(96,165,250,0.1)", borderLeft: `3px solid #60a5fa` }}
                >
                  <p style={{ color: THEME.text, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Orientation très <strong>développement</strong> : front, back, APIs, 
                    avec une sensibilité architecture et sécurité.
                  </p>
                </div>
              </div>
            </CollapsibleModule>
          </div>

          <div>
            <CollapsibleModule
              question="Option SISR – Infrastructure et Réseaux"
              category="Option alternative"
              pill="Infrastructure"
              moduleId="module4"
              isOpen={openModules.module4}
              onToggle={() => toggleModule('module4')}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                    🔧 Compétences développées
                  </h4>
                  <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                    <li>• Administration systèmes et réseaux.</li>
                    <li>• Virtualisation, déploiement de services et supervision.</li>
                    <li>• Sécurité d'exploitation et continuité de service.</li>
                  </ul>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${THEME.sub}` }}
                >
                  <p style={{ color: THEME.text, fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Orientation <strong>infrastructure</strong> : serveurs, réseaux, 
                    services, environnement de production.
                  </p>
                </div>
              </div>
            </CollapsibleModule>
          </div>
        </div>

        {/* Épreuves + Liens */}
        <div className="mt-[1.0rem] grid grid-cols-1 lg:grid-cols-2 gap-[1.0rem]">
          <div>
            <CollapsibleModule
              question="Quelles sont les épreuves professionnelles ?"
              category="Épreuves"
              pill="Examens"
              moduleId="module5"
              isOpen={openModules.module5}
              onToggle={() => toggleModule('module5')}
            >
              <div className="space-y-4">
                <ul className="space-y-[0.4rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
                  <li>
                    • <strong>E4</strong> – Conception et maintenance de solutions informatiques 
                    (projets, dossier + oral).
                  </li>
                  <li>
                    • <strong>E5</strong> – Production et fourniture de services informatiques 
                    (projets, alternance / stages).
                  </li>
                  <li>
                    • <strong>E6</strong> – Parcours de professionnalisation 
                    (synthèse du parcours, missions en entreprise, posture pro).
                  </li>
                </ul>

                <div>
                  <h4 className="mb-2 font-bold" style={{ color: THEME.brandFrom }}>
                    🔗 Liens officiels
                  </h4>
                  <ul className="space-y-2" style={{ color: THEME.text, fontSize: `${0.9}rem` }}>
                    <li>
                      <a
                        href="https://www.francecompetences.fr/recherche/rncp/35340/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: THEME.brandFrom }}
                      >
                        Fiche RNCP du BTS SIO ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://candidat.examens-concours.gouv.fr/cyccandidat/portal/login"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: THEME.brandFrom }}
                      >
                        Espace candidat Cyclades ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: THEME.brandFrom }}
                      >
                        Onisep – Informations sur le BTS SIO ↗
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleModule>
          </div>
        </div>
      </div>
    </section>
  );
}