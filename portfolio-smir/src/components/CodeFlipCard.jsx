import React, { useState } from "react";
import CodeRain from "./CodeRain";

const CODE_RAIN_SOURCE = `DEBUT DE LA TRANSMISSION
================================================
CPMS — Centre de Prévoyance Médico-Sociale
================================================

   //////\\              ||||||\\            ||\\    //||            /////\\
  //      \\             ||     \\           || \\  // ||           //      
 ||                     ||||||//           ||  \\//  ||           \\////\\
 ||                     ||                 ||       ||                \\\\
  \\      //             ||                 ||       ||                //
   \\////                ||                 ||       ||           \\/////
                                                                       

— Identité
  • Dénomination : CPMS (SAS) – opérateur de gestion santé & prévoyance
  • Création : 1948 (indépendant, origine familiale)
  • Mission : Gestion déléguée des régimes santé & prévoyance pour assureurs, entreprises et particuliers

— Gouvernance
  • Direction : Eric Dana (Président)
  • Valeurs : qualité de service, proximité, conformité

— Effectif & Sites
  • Effectif : ~180–200 collaborateurs
  • Siège : 4 rue Auber, 75009 Paris
  • Centre de gestion : Bezannes (6 rue Henri-Moissan, 51430 Bezannes)

— Activités (vue d’ensemble)
  • Gestion des contrats santé/prévoyance (individuels & collectifs)
  • Services aux assurés : remboursements, prises en charge, carte tiers payant
  • Services aux entreprises & courtiers : pilotage et suivi des contrats
  • Portails & application MyCPMS pour le suivi au quotidien

— Indicateurs clés
  • Chiffre d’affaires (2023) : ~19 M€
  • Capital social : ~2,7 M€

— Objectifs
  1) Excellence opérationnelle & qualité de service
  2) Parcours digital simple (portails & mobile)
  3) Conformité & confiance
  4) Partenariats multi-assureurs

— Contacts
  • Adresse : 4 rue Auber, 75009 Paris
  • Sites web : www.cpms.fr 
  • Espace assurés : portail MyCPMS (web & app)
  • Application mobile : MyCPMS (iOS & Android)

================================================
FIN DE LA TRANSMISSION_`;

export default function CodeFlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      {flipped && (
        <div
          className="fixed inset-0 z-[9]"
          onClick={() => setFlipped(false)}
          aria-hidden
        />
      )}

      <div className="relative z-10 w-full max-w-[900px] mx-auto">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className="absolute top-3 right-3 z-20 rounded-xl px-3 py-1.5 text-[12px] font-semibold bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm transition"
        >
          {flipped ? "↩︎ Retour" : "<- CPMS ? "}
        </button>

        {/* ✅ MODIFIÉ : Hauteur réduite de 15% */}
        {/* Avant : 460px / 560px → Après : 390px / 475px */}
        <div
          className="relative w-full h-[280px] sm:h-[320px] md:h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          style={{ perspective: "1200px" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="w-full h-full bg-[#0b1327]">
                <CodeRain density={26} speed={1.15} charSize={16} color="#32f58a" />
              </div>
            </div>

            <div
              className="absolute inset-0"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className={`w-full h-full bg-black/95 text-[#32f58a] flex flex-col ${flipped ? "" : "pointer-events-none"}`}>
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#32f58a22] text-[12px] tracking-wide">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                  <span className="ml-2 opacity-80">terminal — smir@portfolio</span>
                </div>
                <pre className={`flex-1 p-4 font-mono text-[13.5px] leading-relaxed whitespace-pre ${flipped ? "overflow-auto" : "overflow-hidden"}`}>
{CODE_RAIN_SOURCE}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}