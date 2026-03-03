// src/pages/ClassicPortfolio.jsx
import React, { lazy, Suspense } from "react";
import "./classic-portfolio.css";
import ClassicHero from "./ClassicHero";
import AboutSection from "./sections/AboutSection";
import BTSSection from "./sections/BTSSection";
import ParcoursSection from "./sections/ParcoursSection";
import ProjectsSection from "./sections/ProjectsSection";
import LeftDockNav from "../components/LeftDockNav";

/* Lazy-load sections below the fold */
const CertificationsSection = lazy(() => import("./sections/CertificationsSection"));
const VeilleSection = lazy(() => import("./sections/VeilleSection"));
const VeilleAuthSection = lazy(() => import("./sections/VeilleAuthSection"));
const SchoolsSection = lazy(() => import("./sections/SchoolsSection"));
const UserStorySection = lazy(() => import("./sections/UserStorySection"));
const EasterEggMoon = lazy(() => import("../components/EasterEggMoon"));

export default function ClassicPortfolio() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-proximity scroll-pt-0 [-webkit-overflow-scrolling:touch]">
      <LeftDockNav />
      {/* Above the fold — eagerly loaded */}
      <ClassicHero />
      <AboutSection />
      <BTSSection />
      <ParcoursSection />
      <ProjectsSection id="projets" />
      {/* Below the fold — lazy loaded */}
      <Suspense fallback={null}>
        <CertificationsSection />
        <VeilleSection />
        <VeilleAuthSection />
        <SchoolsSection />
        <UserStorySection />
        <EasterEggMoon />
      </Suspense>
    </main>
  );
}
