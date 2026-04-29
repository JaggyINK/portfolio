// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import { RouterProvider, createBrowserRouter, Outlet, useNavigate, useLocation } from "react-router-dom";
import { SettingsProvider } from "./state/settings.jsx";

import Landing from "./scene/Landing.jsx";
import MoonScene from "./scene/MoonScene.jsx"; // import direct, pas lazy
import ClassicPortfolio from "./pages/ClassicPortfolio.jsx";
import SyntheseE5 from "./pages/SyntheseE5.jsx";

import JavascriptQuizStation from "./pages/JavascriptQuizStation.jsx";
import PhpQuizStation from "./pages/PhpQuizStation.jsx";
import PythonQuizStation from "./pages/PythonQuizStation.jsx";
import SqlQuizStation from "./pages/SqlQuizStation.jsx";
import DockerQuizStation from "./pages/DockerQuizStation.jsx"; 

import CursorTrail from "./scenes/ui/CursorTrail.jsx";
import TopNav from "./scenes/ui/TopNav.jsx";
import StarfieldBackdrop from "./components/StarfieldBackdrop.jsx";

/** Mini liste pour TopNav */
const NAV_STATIONS = [
  { id: "quiz-javascript", short: "Quiz JS", label: "Station JavaScript Quiz" },
  { id: "quiz-python", short: "Quiz Python", label: "Station Python Quiz" },
  { id: "quiz-sql", short: "Quiz SQL", label: "Station SQL Quiz" },
  { id: "quiz-docker", short: "Quiz Docker", label: "Station Docker Quiz" },
  { id: "quiz-php", short: "Quiz PHP", label: "Station PHP Quiz" }
];

function Root() {
  const [entered, setEntered] = useState(false);
  const [navTarget, setNavTarget] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLunarHome = pathname === "/lunar";
  const isSceneHome = pathname === "/scene";

  const showLanding = !entered && isLunarHome;
  const showMoonScene = (entered && isLunarHome) || isSceneHome;

  useEffect(() => {
    if (isLunarHome || isSceneHome) {
      import("./scene/MoonScene.jsx").catch(() => {});
    }
  }, [isLunarHome, isSceneHome]);

  // Callback quand une station s'ouvre (depuis TopNav ou MoonScene)
  const handleOpenStation = useCallback(
    (id) => {
      switch (id) {
        case "classic-portfolio":
          navigate("/");
          break;
        case "quiz-php":
          navigate("/quiz-php");
          break;
        case "quiz-python":
          navigate("/quiz-python");
          break;
        case "quiz-javascript":
          navigate("/quiz-javascript");
          break;
        case "quiz-sql":
          navigate("/quiz-sql");
          break;
        case "quiz-docker":
          navigate("/quiz-docker");
          break;
        default:
          console.warn("[App] Unknown station id:", id);
      }
    },
    [navigate]
  );

  const handleNavTarget = useCallback((id) => setNavTarget(id), []);
  const handleNavConsumed = useCallback(() => setNavTarget(null), []);

  return (
    <SettingsProvider>
      {!isLunarHome && !isSceneHome && <StarfieldBackdrop density={8000} />}

      {showLanding && <Landing onEnter={() => setEntered(true)} />}

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
          <MoonScene
            navTarget={navTarget}
            onNavConsumed={handleNavConsumed}
            onOpenStation={handleOpenStation}
            reduceMotion={!(isLunarHome || isSceneHome)}
            quality={isLunarHome || isSceneHome ? "high" : "low"}
            uiBlocked={!(isLunarHome || isSceneHome)}
          />
        </div>
      )}

      {(isLunarHome || isSceneHome) && (
        <>
          <TopNav stations={NAV_STATIONS} onNavTarget={handleNavTarget} onOpenStation={handleOpenStation} />
          {(entered || isSceneHome) && <CursorTrail enabled onlyOnSelector=".top-nav-glass" />}
        </>
      )}

      <div
        id="page-layer"
        data-active={!isLunarHome && !isSceneHome}
        className={!isLunarHome && !isSceneHome ? "app-scale-shell" : ""}
      >
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
      { index: true, element: <ClassicPortfolio /> },
      { path: "synthese-e5", element: <SyntheseE5 /> },
      { path: "lunar", element: <></> },
      { path: "scene", element: <></> },

      // Quiz
      { path: "quiz-php", element: <PhpQuizStation /> },
      { path: "quiz-python", element: <PythonQuizStation /> },  
      { path: "quiz-javascript", element: <JavascriptQuizStation /> },
      { path: "quiz-sql", element: <SqlQuizStation /> },
      { path: "quiz-docker", element: <DockerQuizStation /> },

      // Catch-all 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2rem",
        color: "#E6ECF8",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", marginBottom: "0.5rem", color: "#22d3ee" }}>404</h1>
      <p style={{ marginBottom: "1.5rem", color: "#C5D3E8" }}>Cette page n&apos;existe pas.</p>
      <a
        href="/"
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "0.6rem",
          border: "1px solid rgba(34,211,238,0.4)",
          background: "rgba(34,211,238,0.1)",
          color: "#22d3ee",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        ← Retour au portfolio
      </a>
    </main>
  );
}

export default function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />;
}
