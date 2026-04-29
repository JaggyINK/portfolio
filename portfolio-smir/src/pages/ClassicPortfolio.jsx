// src/pages/ClassicPortfolio.jsx
import React, { lazy, Suspense } from "react";
import "./classic-portfolio.css";
import ClassicHero from "./ClassicHero";
import AboutSection from "./sections/AboutSection";
import ParcoursSection from "./sections/ParcoursSection";
import LeftDockNav from "../components/LeftDockNav";
import { useSettings } from "../state/settings.jsx";

/* Lazy-load sections below the fold */
const SchoolsSection = lazy(() => import("./sections/SchoolsSection"));
const BTSSection = lazy(() => import("./sections/BTSSection"));
const SyntheseTeaserSection = lazy(() => import("./sections/SyntheseTeaserSection"));
const CertificationsSection = lazy(() => import("./sections/CertificationsSection"));
const EntrepriseSection = lazy(() => import("./sections/EntrepriseSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const VeilleSection = lazy(() => import("./sections/VeilleSection"));
const VeilleAuthSection = lazy(() => import("./sections/VeilleAuthSection"));
const UserStorySection = lazy(() => import("./sections/UserStorySection"));
const EasterEggMoon = lazy(() => import("../components/EasterEggMoon"));

export default function ClassicPortfolio() {
  const { settings } = useSettings();
  // Désactive le snap-scroll si l'utilisateur a coché reduceMotion
  // (le snap-y vole PageDown/Espace au clavier sur certains navigateurs)
  const snapClass = settings.reduceMotion ? "" : "snap-y snap-proximity";
  return (
    <main className={`h-screen overflow-y-scroll ${snapClass} scroll-pt-0 [-webkit-overflow-scrolling:touch]`}>
      <LeftDockNav />
      {/* Above the fold — eagerly loaded */}
      <ClassicHero />
      <AboutSection />
      <ParcoursSection />
      {/* Below the fold — lazy loaded (un Suspense par section pour ne pas bloquer la suite) */}
      <Suspense fallback={null}><SchoolsSection /></Suspense>
      <Suspense fallback={null}><BTSSection /></Suspense>
      <Suspense fallback={null}><SyntheseTeaserSection /></Suspense>
      <Suspense fallback={null}><CertificationsSection /></Suspense>
      <Suspense fallback={null}><EntrepriseSection /></Suspense>
      <Suspense fallback={null}><ProjectsSection id="projets" /></Suspense>
      <Suspense fallback={null}><VeilleSection /></Suspense>
      <Suspense fallback={null}><VeilleAuthSection /></Suspense>
      <Suspense fallback={null}><UserStorySection /></Suspense>
      <Suspense fallback={null}><EasterEggMoon /></Suspense>
    </main>
  );
}
