// src/scene/Landing.jsx
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

/* ============================================
   GLContextGuards
   ============================================ */
function GLContextGuards() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(new THREE.Color(0, 0, 0), 0);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;

    const canvas = gl.domElement;

    const onLostCapture = (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    const onRestored = () => {
      try {
        gl.resetState();
      } catch (err) { console.error('[Landing] Error resetting WebGL state:', err); }
    };

    canvas.addEventListener("webglcontextlost", onLostCapture, { capture: true, passive: false });
    canvas.addEventListener("webglcontextrestored", onRestored, { passive: true });

    return () => {
      canvas.removeEventListener("webglcontextlost", onLostCapture, { capture: true });
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [gl]);

  return null;
}

/* ============================================
   LaunchPad - Plateforme de décollage
   ============================================ */
function LaunchPad() {
  const geometries = useMemo(
    () => ({
      platform: new THREE.CylinderGeometry(1.2, 1.3, 0.3, 32),
      base: new THREE.CylinderGeometry(1.5, 1.6, 0.2, 32),
      pillar: new THREE.CylinderGeometry(0.08, 0.08, 2.5, 16),
      support: new THREE.BoxGeometry(0.1, 2.0, 0.1),
    }),
    []
  );

  const materials = useMemo(
    () => ({
      platform: new THREE.MeshStandardMaterial({ color: "#4a5568", metalness: 0.7, roughness: 0.3 }),
      metal: new THREE.MeshStandardMaterial({ color: "#718096", metalness: 0.8, roughness: 0.2 }),
    }),
    []
  );

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
      Object.values(materials).forEach((mat) => mat.dispose());
    };
  }, [geometries, materials]);

  return (
    <group position={[0, -1.8, 0]}>
      {/* Base principale */}
      <mesh geometry={geometries.base} material={materials.platform} />
      {/* Plateforme */}
      <mesh position={[0, 0.25, 0]} geometry={geometries.platform} material={materials.metal} />
      
      {/* Piliers de support - 4 coins */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.0;
        const z = Math.sin(rad) * 1.0;
        return (
          <mesh
            key={i}
            position={[x, -1.0, z]}
            geometry={geometries.pillar}
            material={materials.metal}
          />
        );
      })}

      {/* Supports diagonaux */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.8;
        const z = Math.sin(rad) * 0.8;
        return (
          <mesh
            key={`support-${i}`}
            position={[x, -0.8, z]}
            rotation={[0, rad, Math.PI / 12]}
            geometry={geometries.support}
            material={materials.metal}
          />
        );
      })}

      {/* Lumières de la plateforme */}
      <pointLight position={[0, 0.5, 0]} intensity={1.5} distance={8} color="#60a5fa" />
      <pointLight position={[1, 0.2, 1]} intensity={0.8} distance={4} color="#3b82f6" />
      <pointLight position={[-1, 0.2, -1]} intensity={0.8} distance={4} color="#3b82f6" />
    </group>
  );
}

/* ============================================
   Ground - Sol avec texture
   ============================================ */
function Ground() {
  const meshRef = useRef();

  const geometry = useMemo(() => new THREE.CircleGeometry(50, 64), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2d3748",
        metalness: 0.1,
        roughness: 0.9,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.2, 0]}
      geometry={geometry}
      material={material}
      receiveShadow
    />
  );
}

/* ============================================
   Mountains - Montagnes au loin
   ============================================ */
function Mountains() {
  const groupRef = useRef();

  const mountains = useMemo(
    () => [
      { x: -15, z: -20, height: 4, width: 8, color: "#1a365d" },
      { x: -8, z: -22, height: 5, width: 10, color: "#2c5282" },
      { x: 3, z: -25, height: 6, width: 12, color: "#1e3a5f" },
      { x: 12, z: -20, height: 4.5, width: 9, color: "#2a4365" },
      { x: 20, z: -23, height: 5.5, width: 11, color: "#1a365d" },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {mountains.map((mountain, i) => {
        const geometry = new THREE.ConeGeometry(mountain.width / 2, mountain.height, 4);
        const material = new THREE.MeshStandardMaterial({
          color: mountain.color,
          metalness: 0.2,
          roughness: 0.8,
        });

        return (
          <mesh
            key={i}
            position={[mountain.x, mountain.height / 2 - 2, mountain.z]}
            rotation={[0, Math.PI / 4, 0]}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </group>
  );
}

/* ============================================
   Rocket - Fusée améliorée
   ============================================ */
function Rocket({ launch }) {
  const group = useRef();
  const vel = useRef(0);
  const y = useRef(0);
  const roll = useRef(0);
  const targetY = useRef(0);
  const baseY = useRef(0);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt || 0.016, 1 / 60);
    const t = state.clock.getElapsedTime();

    if (launch) {
      vel.current = Math.min(vel.current + 8.0 * dt, 6.5);
      y.current += vel.current * dt;
      roll.current = roll.current * 0.9 + Math.sin(t * 6) * 0.002;
    } else {
      const floatOffset = Math.sin(t * 1.1) * 0.06;
      targetY.current = baseY.current + floatOffset;
      y.current += (targetY.current - y.current) * dt * 8;
      roll.current += (Math.sin(t * 0.6) * 0.02 - roll.current) * dt * 6;
      vel.current *= Math.exp(-6.0 * dt);
    }

    if (group.current) {
      group.current.position.y = y.current;
      group.current.rotation.y = roll.current;
    }
  });

  const geometries = useMemo(
    () => ({
      body: new THREE.CylinderGeometry(0.15, 0.15, 1.0, 24),
      nose: new THREE.ConeGeometry(0.15, 0.3, 24),
      fin: new THREE.BoxGeometry(0.04, 0.28, 0.18),
      finZ: new THREE.BoxGeometry(0.18, 0.28, 0.04),
      engine: new THREE.CylinderGeometry(0.06, 0.14, 0.16, 16),
      flame: new THREE.ConeGeometry(0.18, launch ? 0.8 : 0.6, 16, 1, true),
      window: new THREE.CircleGeometry(0.08, 16),
    }),
    [launch]
  );

  const materials = useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({ 
        color: "#f0f4f8", 
        metalness: 0.3, 
        roughness: 0.4,
        emissive: launch ? "#60a5fa" : "#000000",
        emissiveIntensity: launch ? 0.1 : 0,
      }),
      nose: new THREE.MeshStandardMaterial({ color: "#e53e3e", metalness: 0.4, roughness: 0.3 }),
      fin: new THREE.MeshStandardMaterial({ color: "#2d3748", metalness: 0.5, roughness: 0.4 }),
      engine: new THREE.MeshStandardMaterial({ color: "#1a202c", metalness: 0.6, roughness: 0.3 }),
      flame: new THREE.MeshBasicMaterial({
        color: launch ? "#ff6b35" : "#9ad8ff",
        transparent: true,
        opacity: launch ? 0.9 : 0.45,
        blending: THREE.AdditiveBlending,
      }),
      window: new THREE.MeshBasicMaterial({ 
        color: "#60a5fa", 
        transparent: true, 
        opacity: 0.8 
      }),
    }),
    [launch]
  );

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
      Object.values(materials).forEach((mat) => mat.dispose());
    };
  }, [geometries, materials]);

  return (
    <group ref={group}>
      {/* Corps principal */}
      <mesh geometry={geometries.body} material={materials.body} castShadow />
      
      {/* Cône avant */}
      <mesh position={[0, 0.6, 0]} geometry={geometries.nose} material={materials.nose} castShadow />
      
      {/* Fenêtre */}
      <mesh position={[0, 0.2, 0.151]} geometry={geometries.window} material={materials.window} />
      
      {/* Ailerons X */}
      {[-1, 1].map((s) => (
        <mesh
          key={`x${s}`}
          position={[s * 0.16, -0.25, 0]}
          rotation={[0, 0, s * (Math.PI / 9)]}
          geometry={geometries.fin}
          material={materials.fin}
          castShadow
        />
      ))}
      
      {/* Ailerons Z */}
      {[-1, 1].map((s) => (
        <mesh
          key={`z${s}`}
          position={[0, -0.25, s * 0.16]}
          rotation={[s * (Math.PI / 9), 0, 0]}
          geometry={geometries.finZ}
          material={materials.fin}
          castShadow
        />
      ))}
      
      {/* Moteur */}
      <mesh position={[0, -0.55, 0]} geometry={geometries.engine} material={materials.engine} castShadow />
      
      {/* Flammes */}
      <mesh 
        frustumCulled={false} 
        position={[0, -0.72, 0]} 
        geometry={geometries.flame} 
        material={materials.flame} 
      />
      
      {/* Particules */}
      <group position={[0, -0.85, 0]}>
        <Sparkles 
          count={launch ? 60 : 20} 
          scale={1.2} 
          size={launch ? 2.0 : 1.6} 
          speed={launch ? 2.0 : 1.2} 
          color={launch ? "#ff6b35" : "#bfe3ff"} 
        />
      </group>
      
      {/* Lumière du moteur */}
      <pointLight 
        position={[0, -0.7, 0]} 
        intensity={launch ? 3.5 : 1.1} 
        distance={6} 
        color={launch ? "#ff6b35" : "#bfe3ff"} 
      />
    </group>
  );
}

/* ============================================
   RocketHUD
   ============================================ */
function RocketHUD({ launch, zDist = 3.0, bottomPx = 88, scale = 1.0, onExitTop }) {
  const ref = useRef();
  const camY = useRef(0);
  const vy = useRef(0);
  const started = useRef(false);

  const tmp = useMemo(
    () => ({
      offset: new THREE.Vector3(),
      worldPos: new THREE.Vector3(),
    }),
    []
  );

  useFrame(({ camera, size }, rawDt) => {
    const dt = Math.min(rawDt || 0.016, 1 / 60);

    const fovRad = (camera.fov * Math.PI) / 180;
    const halfH = Math.tan(fovRad / 2) * zDist;
    const baseY = -halfH + (bottomPx / size.height) * (2 * halfH);

    if (!launch) {
      camY.current += (baseY - camY.current) * dt * 10;
      vy.current *= Math.exp(-8 * dt);
      started.current = false;
    } else {
      if (!started.current) {
        started.current = true;
        camY.current = baseY;
        vy.current = 0;
      }
      vy.current = Math.min(vy.current + 12 * dt, 10);
      camY.current += vy.current * dt;

      if (camY.current > halfH + 0.8) onExitTop?.();
    }

    tmp.offset.set(0, camY.current, -zDist).applyQuaternion(camera.quaternion);
    tmp.worldPos.copy(camera.position).add(tmp.offset);

    if (ref.current) {
      ref.current.position.copy(tmp.worldPos);
      ref.current.quaternion.copy(camera.quaternion);
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={ref} frustumCulled={false}>
      <Rocket launch={launch} />
    </group>
  );
}

/* ============================================
   DynamicSky - Transition jour → nuit
   ============================================ */
function DynamicSky({ progress }) {
  const { scene } = useThree();

  useFrame(() => {
    // Transition de couleur du fond
    const dayColor = new THREE.Color("#87CEEB"); // Bleu ciel
    const nightColor = new THREE.Color("#000814"); // Noir spatial
    
    const currentColor = dayColor.clone().lerp(nightColor, progress);
    scene.background = currentColor;
  });

  return (
    <>
      {/* Étoiles qui apparaissent progressivement */}
      {progress > 0.3 && (
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
          opacity={Math.min((progress - 0.3) / 0.7, 1)}
        />
      )}
    </>
  );
}

/* ============================================
   Composant Principal Landing
   ============================================ */
export default function Landing() {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const isUnmountedRef = useRef(false);
  const didEnterRef = useRef(false);

  // Empêche le scroll
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";
    return () => {
      if (!isUnmountedRef.current) {
        htmlEl.style.overflow = prevHtmlOverflow;
        bodyEl.style.overflow = prevBodyOverflow;
      }
    };
  }, []);

  // Animation de progression
  useEffect(() => {
    if (launching) {
      const duration = 3000; // 3 secondes
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);
        
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [launching]);

  const handleEnter = useCallback(() => {
    if (launching) return;
    setLaunching(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!isUnmountedRef.current && !didEnterRef.current) {
        didEnterRef.current = true;
        setIsVisible(false);
        // Navigation vers Scene
        navigate("/scene");
      }
    }, 3200);
  }, [launching, navigate]);

  // Entrée clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);

  // Cleanup
  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Respect "prefers-reduced-motion"
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced && isVisible && !launching && !didEnterRef.current) {
      didEnterRef.current = true;
      setIsVisible(false);
      navigate("/scene");
    }
  }, [isVisible, launching, navigate]);

  const canvasConfig = useMemo(
    () => ({
      dpr: [1, 2],
      gl: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        depth: true,
        stencil: false,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      },
      camera: { position: [0, 0.6, 4.2], fov: 46, near: 0.1, far: 100 },
    }),
    []
  );

  if (!isVisible) return null;

  return (
    <div
      id="landing-overlay"
      className={`fixed inset-0 z-[1000] text-slate-100 overflow-hidden ${launching ? "launching" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="landing-title"
      style={{ pointerEvents: "auto" }}
    >
      <style>{`
        /* Animations et styles CSS */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          75% { transform: translateX(2px) rotate(1deg); }
        }

        .landing-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .split-pane {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 50%;
          background: linear-gradient(to bottom, rgba(96,165,250,0.1), transparent 50%);
          z-index: 2;
          pointer-events: none;
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .split-pane.left {
          left: 0;
          background: linear-gradient(to right, rgba(8,16,30,0.95), transparent);
        }

        .split-pane.right {
          right: 0;
          background: linear-gradient(to left, rgba(8,16,30,0.95), transparent);
        }

        .launching .split-pane.left {
          transform: translateX(-100%);
        }

        .launching .split-pane.right {
          transform: translateX(100%);
        }

        .landing-center-wrap {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          pointer-events: none;
        }

        .landing-center {
          text-align: center;
          animation: fadeIn 1s ease-out;
          max-width: 900px;
          pointer-events: auto;
        }

        .launching .landing-center {
          animation: shake 0.3s ease-in-out;
        }

        .btn-glass {
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.2));
          border: 2px solid rgba(96,165,250,0.5);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(96,165,250,0.2);
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 0.5px;
        }

        .btn-glass:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(96,165,250,0.3), rgba(59,130,246,0.3));
          border-color: rgba(96,165,250,0.8);
          box-shadow: 0 12px 48px rgba(96,165,250,0.4);
          transform: translateY(-2px);
        }

        .btn-glass:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-glass:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          animation: pulse 2s ease-in-out infinite;
        }

        .countdown {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: rgba(234,88,12,0.2);
          border: 1px solid rgba(234,88,12,0.5);
          border-radius: 8px;
          font-size: 1.5rem;
          font-weight: bold;
          color: #fb923c;
          font-family: 'Orbitron', monospace;
          animation: pulse 1s ease-in-out infinite;
        }

        .status-text {
          margin-top: 1rem;
          font-size: 0.95rem;
          color: rgba(226,236,255,0.7);
          font-weight: 500;
        }

        .progress-bar {
          width: 100%;
          max-width: 400px;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
          margin: 1.5rem auto 0;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          transition: width 0.1s linear;
          box-shadow: 0 0 10px rgba(96,165,250,0.5);
        }
      `}</style>

      {/* Canvas 3D */}
      <div className="landing-canvas">
        <Canvas {...canvasConfig}>
          <GLContextGuards />
          <DynamicSky launch={launching} progress={progress} />
          
          {/* Lumières */}
          <ambientLight intensity={launching ? 0.2 : 0.5} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={launching ? 0.3 : 1.0} 
            castShadow 
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={launching ? 0.2 : 0.5} 
          />

          {/* Scène terrestre (disparaît avec le lancement) */}
          {!launching && (
            <>
              <Ground />
              <LaunchPad />
              <Mountains />
            </>
          )}

          {/* Fusée */}
          <RocketHUD
            launch={launching}
            zDist={3.0}
            bottomPx={88}
            scale={1.0}
            onExitTop={() => {
              if (!didEnterRef.current) {
                didEnterRef.current = true;
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
                setIsVisible(false);
                navigate("/scene");
              }
            }}
          />
        </Canvas>
      </div>

      {/* Split panes */}
      <div className="split-pane left" />
      <div className="split-pane right" />

      {/* Contenu UI */}
      <div className="landing-center-wrap" role="document">
        <div className="landing-center">
          <h1
            id="landing-title"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              lineHeight: 1.1,
              fontWeight: 800,
              margin: 0,
              marginBottom: "0.5rem",
              background: launching 
                ? "linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)"
                : "linear-gradient(135deg, #60a5fa, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {launching ? "Décollage Imminent" : "Bienvenue sur Sagar.io"}
          </h1>

          {!launching ? (
            <>
              <p
                style={{
                  maxWidth: 820,
                  color: "rgba(226,236,255,0.88)",
                  marginTop: 12,
                  marginBottom: 24,
                  lineHeight: 1.6,
                  fontSize: "1.05rem",
                }}
              >
                🚀 <strong>Mission :</strong> Exploration spatiale interactive
                <br />
                🌍 <strong>Départ :</strong> Base de lancement terrestre
                <br />
                🎮 <strong>Destination :</strong> Stations orbitales & mini-jeux éducatifs
              </p>

              <p
                style={{
                  color: "rgba(226,236,255,0.7)",
                  fontSize: "0.95rem",
                  marginBottom: 28,
                }}
              >
                Appuyez sur{" "}
                <kbd
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "rgba(96,165,250,0.2)",
                    border: "1px solid rgba(96,165,250,0.3)",
                    fontFamily: "monospace",
                    fontSize: "0.9em",
                    fontWeight: "bold",
                  }}
                >
                  Entrée
                </kbd>{" "}
                ou cliquez sur le bouton pour démarrer votre aventure
              </p>

              <div>
                <button
                  onClick={handleEnter}
                  className="btn-glass"
                  aria-label="Démarrer la mission"
                  autoFocus
                  disabled={launching}
                >
                  🚀 Démarrer la Mission
                </button>
              </div>

              <div style={{ marginTop: 32, color: "rgba(200,220,255,0.5)", fontSize: 14 }}>
                Créé par <strong>M. Sagar</strong> • © {new Date().getFullYear()}
              </div>
            </>
          ) : (
            <>
              <div className="countdown">
                {Math.ceil(3 - progress * 3)}
              </div>
              
              <div className="status-text">
                {progress < 0.33 && "🔧 Vérification des systèmes..."}
                {progress >= 0.33 && progress < 0.66 && "🔥 Allumage des moteurs..."}
                {progress >= 0.66 && "🚀 Décollage en cours..."}
              </div>

              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}