// src/scene/MoonScene.jsx
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

import { useSettings } from "@/state/settings.jsx";
import { BASE_RADIUS } from "@/constants/space";

import Scene from "@/scenes/core/Scene";
import buildStations from "@/scenes/stations/buildStations";
import { isWebGLAvailable } from "@/utils/webglProbe";
import WebGLFallback from "./WebGLFallback.jsx";
import WebGLErrorBoundary from "./WebGLErrorBoundary.jsx";

export default function MoonScene({
  onOpenStation,
  uiBlocked = false,
  reduceMotion,
  quality,
  navTarget,
  onNavConsumed,
}) {
  const { settings } = useSettings();

  // 🛡️ Détection précoce : si WebGL n'est pas dispo, on n'essaie même pas
  // de monter le Canvas (sinon Three.js spam la console à chaque tentative).
  const webglOk = useMemo(() => isWebGLAvailable(), []);

  const [canvasKey, setCanvasKey] = useState(0);

  const RADIUS = BASE_RADIUS;
  const stations = useMemo(() => buildStations(RADIUS), [RADIUS]);

  const worldQuatRef = useRef(new THREE.Quaternion());
  const zoomRef = useRef(0.25);

  const glRef = useRef(null);
  const lostOnceRef = useRef(false);

  const cleanupListenersRef = useRef(null);

  const onCanvasCreated = useCallback(({ camera, gl }) => {
    camera.lookAt(0, 0, 0);
    gl.setClearColor("#050a16", 1);
    gl.shadowMap.enabled = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    glRef.current = gl;

    // Attache le listener immédiatement (avant cela, il pouvait rater le cold start)
    const canvas = gl.domElement;
    const onLostCapture = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (window.__saga_navigating) return;
      if (lostOnceRef.current) return;
      lostOnceRef.current = true;
      setTimeout(() => setCanvasKey((k) => k + 1), 0);
    };
    const onRestored = () => {
      try { gl.resetState(); } catch (err) { console.error('[MoonScene] Error resetting WebGL state:', err); }
    };
    canvas.addEventListener("webglcontextlost", onLostCapture, { capture: true, passive: false });
    canvas.addEventListener("webglcontextrestored", onRestored, { passive: true });

    cleanupListenersRef.current = () => {
      canvas.removeEventListener("webglcontextlost", onLostCapture, true);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  useEffect(() => () => {
    cleanupListenersRef.current?.();
  }, [canvasKey]);

  // 🛑 Pas de WebGL → on affiche le fallback au lieu de laisser Three.js boucler en erreur
  if (!webglOk) {
    return <WebGLFallback reason="WebGL non disponible côté navigateur (accélération matérielle désactivée ou GPU bloqué)." />;
  }

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 bg-black">
        <Canvas
          key={canvasKey}
          dpr={[1, 1.75]}
          shadows={false}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            depth: true,
            stencil: false,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{ position: [0, 2.2, RADIUS * 3.2], fov: 42, near: 0.1, far: 1000 }}
          onCreated={onCanvasCreated}
          style={{ width: "100%", height: "100%", zIndex: 0, display: "block" }}
        >
          <Scene
            RADIUS={RADIUS}
            stations={stations}
            onOpenStation={onOpenStation}
            quality={quality ?? settings.quality}

            reduceMotion={(reduceMotion ?? settings.reduceMotion) || settings.presentation}
            highContrast={settings.highContrast}
            worldQuatRef={worldQuatRef}
            zoomRef={zoomRef}
            uiBlocked={uiBlocked}   // ✅ bloque l'interaction quand on est sur une page
            navTarget={navTarget}
            onNavConsumed={onNavConsumed}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
