import React from "react";

export default function BTSSection() {
  return (
    <section
      id="bts"
      className="min-h-[100svh] text-slate-100 flex items-center snap-center bg-[rgba(8,12,24,0.35)] backdrop-blur-[2px] border-t border-white/5"
    >
      <div className="container px-6 py-16 mx-auto">
        {/* Titre */}
        <div className="mb-8">
          <h2
            className="text-3xl font-extrabold tracking-tight md:text-4xl"
            style={{ fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif" }}
          >
            BTS SIO – Services Informatiques aux Organisations
          </h2>
          <div className="mt-2 w-32 h-1 rounded bg-gradient-to-r from-[#60a5fa] via-[#d4af37] to-[#a41d28]" />
          <p className="mt-3 text-sm text-slate-400">
            Diplôme d’État de niveau 5 (Bac+2) – option{" "}
            <span className="font-semibold text-slate-200">SLAM</span> (développement
            d’applications).
          </p>
        </div>

        {/* Row 1 : Présentation + débouchés */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Présentation + objectifs */}
          <div className="p-6 border shadow-xl rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
            <h3 className="mb-3 text-lg font-semibold text-slate-100">
              Présentation rapide
            </h3>
            <p className="text-slate-200/95 text-[15px] leading-relaxed">
              Le <strong>BTS SIO</strong> forme des profils capables de{" "}
              concevoir, développer et maintenir des solutions numériques au service
              des métiers : applications web, outils internes, services informatiques…
            </p>

            <h4 className="mt-5 font-semibold text-slate-100 text-[15px]">
              Objectifs
            </h4>
            <ul className="pl-5 mt-3 space-y-2 list-disc text-slate-300/95 text-[14px]">
              <li>Maîtriser les bases du développement d’applications.</li>
              <li>Comprendre l’organisation d’un système d’information.</li>
              <li>Intégrer les contraintes de sécurité et de qualité.</li>
              <li>Préparer une insertion en entreprise ou une poursuite d’études.</li>
            </ul>
          </div>

          {/* Débouchés pro */}
          <div className="rounded-2xl p-6 shadow-xl border border-white/10 bg-gradient-to-br from-[#1b2a5b] via-[#1a2560] to-[#0f1b3f]">
  <h3 className="font-semibold text-slate-50">Quelques débouchés</h3>
  <p className="mt-2 text-sm text-slate-200/90">
    Selon l’option choisie, plusieurs métiers sont accessibles après le BTS SIO :
  </p>

  <div className="grid grid-cols-2 gap-3 mt-4 text-[13px]">
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
        url: "https://nextformation.com/fiches-metiers/technicien-support-applicatif#:~:text=Un%20technicien%20support%20applicatif%20est,excellent%20sens%20de%20la%20communication.",
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
        className="inline-flex items-center justify-center px-3 py-2 text-center transition border rounded-lg bg-white/10 border-white/10 hover:bg-white/20"
      >
        {d.label} ↗
      </a>
    ))}
  </div>
</div>
        </div>

        {/* Row 2 : options SLAM / SISR */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          {/* SLAM — option suivie */}
          <div className="relative rounded-2xl bg-white/5 border border-[#60a5fa]/40 shadow-xl p-6 overflow-hidden">
            <div className="absolute -inset-px rounded-2xl pointer-events-none bg-[radial-gradient(120%_120%_at_0%_0%,#60a5fa22,transparent)]" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#60a5fa]/15 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h10"
                    stroke="#60a5fa"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100">Option SLAM</h4>
                <p className="text-[13px] text-[#60a5fa] font-medium">
                  Solutions Logicielles et Applications Métiers (option suivie)
                </p>
              </div>
            </div>

            <ul className="relative pl-5 mt-4 space-y-2 list-disc text-slate-300/95 text-[14px]">
              <li>Conception et développement d’applications (web, mobile, API).</li>
              <li>Modélisation et gestion de bases de données.</li>
              <li>Intégration dans un SI existant (intranet, outils métiers…).</li>
              <li>Tests, qualité logicielle, documentation.</li>
            </ul>

            <div className="relative mt-4 rounded-xl bg-white/5 p-3 text-[13px] text-slate-300/90 border border-white/10">
              Orientation très <strong>développement</strong> : front, back, APIs, avec
              une sensibilité architecture et sécurité.
            </div>
          </div>

          {/* SISR — option alternative */}
          <div className="p-6 border shadow-xl rounded-2xl bg-white/5 border-white/10 opacity-95">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v18M3 12h18"
                    stroke="#9aa4bf"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100">Option SISR</h4>
                <p className="text-[13px] text-slate-400">
                  Solutions d’Infrastructure, Systèmes et Réseaux
                </p>
              </div>
            </div>

            <ul className="pl-5 mt-4 space-y-2 list-disc text-slate-300/95 text-[14px]">
              <li>Administration systèmes et réseaux.</li>
              <li>Virtualisation, déploiement de services et supervision.</li>
              <li>Sécurité d’exploitation et continuité de service.</li>
            </ul>

            <div className="mt-4 rounded-xl bg-white/5 p-3 text-[13px] text-slate-300/90 border border-white/10">
              Orientation <strong>infrastructure</strong> : serveurs, réseaux,
              services, environnement de production.
            </div>
          </div>
        </div>

        {/* Row 3 : Épreuves + liens */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          {/* Épreuves clés */}
          <div className="p-5 border shadow-lg rounded-2xl bg-white/5 border-white/10">
            <h3 className="font-semibold text-slate-100 text-[15px]">
              Épreuves professionnelles clés
            </h3>
            <ul className="pl-5 mt-3 space-y-1.5 list-disc text-[13px] text-slate-300/95">
              <li>
                <strong>E4</strong> – Conception et maintenance de solutions
                informatiques (projets, dossier + oral).
              </li>
              <li>
                <strong>E5</strong> – Production et fourniture de services
                informatiques (projets, alternance / stages).
              </li>
              <li>
                <strong>E6</strong> – Parcours de professionnalisation
                (synthèse du parcours, missions en entreprise, posture pro).
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="p-5 border shadow-lg rounded-2xl bg-white/5 border-white/10">
            <h3 className="font-semibold text-slate-100 text-[15px]">
              Liens officiels autour du BTS SIO
            </h3>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-300/95">
              <li>
                <a
                  href="https://www.francecompetences.fr/recherche/rncp/35340/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:no-underline"
                >
                  🔗 Fiche RNCP du BTS SIO
                </a>
              </li>
              <li>
                <a
                  href="https://candidat.examens-concours.gouv.fr/cyccandidat/portal/login"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:no-underline"
                >
                  🔗 Espace candidat Cyclades
                </a>
              </li>
              <li>
                <a
                  href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:no-underline"
                >
                  🔗 Onisep – Informations sur le BTS SIO
                </a>
              </li>
              <li className="pt-2 mt-1 border-t border-white/10">
                <span className="text-[12px] text-slate-400">
                  Quelques ressources de référence pour le diplôme et son cadre officiel.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bandeau résumé perso */}
        <div className="p-5 mt-8 border rounded-2xl border-white/10 bg-white/5 text-slate-300/95 text-[14px]">
          Actuellement en formation à la <strong>Digital School of Paris</strong> (groupe{" "}
          <strong>IEF2I</strong>), option <strong>SLAM</strong>, en alternance. Diplôme
          visé en <strong>juin 2026</strong>.
        </div>
      </div>
    </section>
  );
}
