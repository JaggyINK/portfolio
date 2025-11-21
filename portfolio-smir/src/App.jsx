import React, { useEffect, useState, Suspense, lazy, useCallback } from "react";
import { RouterProvider, createBrowserRouter, Outlet, useNavigate, useLocation } from "react-router-dom";
import { SettingsProvider } from "./state/settings.jsx";

import Landing from "./scene/Landing.jsx";
//import BTS from "./pages/BTS.jsx";
import Competences from "./pages/Competences.jsx";
import Contact from "./pages/Contact.jsx";
import Parcours from "./pages/Parcours.jsx";
import Projets from "./pages/Projets.jsx";
import ClassicPortfolio from "./pages/ClassicPortfolio.jsx";
import PhpQuizStation from "./components/stations/php/PhpQuizStation.jsx";

import CursorTrail from "./scenes/ui/CursorTrail.jsx";
import TopNav from "./scenes/ui/TopNav.jsx";
import StarfieldBackdrop from "./components/StarfieldBackdrop.jsx";

// Scène 3D (lazy)
const MoonScene = lazy(() => import("./scene/MoonScene.jsx"));

/** Mini liste pour TopNav */
const NAV_STATIONS = [
  { id: "projets", short: "Projets", label: "Dôme Projets" },
  { id: "competences", short: "Skills", label: "Tour Compétences" },
  { id: "parcours", short: "Parcours", label: "Anneau Parcours" },
  { id: "contact", short: "Contact", label: "Hub Contact" },
  { id: "bts", short: "BTS", label: "BTS / Référentiel" },
];

function Root() {
  const [entered, setEntered] = useState(false);
  const [navTarget, setNavTarget] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isClassicHome = pathname === "/";
  const isLunarHome = pathname === "/lunar";
  const isSceneHome = pathname === "/scene";

  // Afficher Landing seulement sur /lunar
  const showLanding = !entered && isLunarHome;

  // Afficher MoonScene sur /lunar (après entered) ET sur /scene
  const showMoonScene = (entered && isLunarHome) || isSceneHome;

  // Prefetch MoonScene
  useEffect(() => {
    if (isLunarHome || isSceneHome) {
      import("./scene/MoonScene.jsx").catch(() => {});
    }
  }, [isLunarHome, isSceneHome]);

  // Callback quand une station s'ouvre (depuis MoonScene)
  const handleOpenStation = useCallback(
    (id) => {
      const key = String(id || "").toLowerCase();
      const route = {
        bts: "/BTS",
        competences: "/Competences",
        contact: "/Contact",
        parcours: "/Parcours",
        projets: "/Projets",
      }[key];
      if (route) navigate(route);
      else console.warn("[App] Unknown station id:", id);
    },
    [navigate]
  );

  // Callback quand un clic TopNav demande une rotation vers une station
  const handleNavTarget = useCallback((id) => {
    setNavTarget(id);
  }, []);

  // Une fois la cible consommée (rotation terminée)
  const handleNavConsumed = useCallback(() => {
    setNavTarget(null);
  }, []);

  return (
    <SettingsProvider>
      {/* 🌌 Starfield global — désactivé sur /lunar et /scene */}
      {!isLunarHome && !isSceneHome && <StarfieldBackdrop density={8000} />}

      {/* === Landing === */}
      {showLanding && <Landing onEnter={() => setEntered(true)} />}

      {/* === Scène 3D === */}
      {showMoonScene && (
        <div
          id="scene-layer"
          aria-hidden={!isLunarHome && !isSceneHome}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: isLunarHome || isSceneHome ? "auto" : "none",
          }}
        >
          <Suspense fallback={null}>
            <MoonScene
              navTarget={navTarget}
              onNavConsumed={handleNavConsumed}
              onOpenStation={handleOpenStation}
              reduceMotion={!(isLunarHome || isSceneHome)}
              quality={isLunarHome || isSceneHome ? "high" : "low"}
              uiBlocked={!(isLunarHome || isSceneHome)}
            />
          </Suspense>
        </div>
      )}

      {/* === TopNav visible sur /lunar et /scene === */}
      {(isLunarHome || isSceneHome) && (
        <>
          <TopNav stations={NAV_STATIONS} onNavTarget={handleNavTarget} />
          {(entered || isSceneHome) && <CursorTrail enabled onlyOnSelector=".top-nav-glass" />}
        </>
      )}

      {/* === Layer Pages === */}
      <div id="page-layer" data-active={!isLunarHome && !isSceneHome}>
        <Outlet />
      </div>
    </SettingsProvider>
  );
}

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Par défaut "/" rend ton portfolio classique
      { index: true, element: <ClassicPortfolio /> },

      // La "home 3D" est sur /lunar (Landing + MoonScene)
      { path: "lunar", element: <></> },

      // /scene affiche directement MoonScene (sans Landing)
      { path: "scene", element: <></> },

      // Tes autres pages
      { path: "BTS", element: <PhpQuizStation /> },
      { path: "Competences", element: <Competences /> },
      { path: "Contact", element: <Contact /> },
      { path: "Parcours", element: <Parcours /> },
      { path: "Projets", element: <Projets /> },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  );
}