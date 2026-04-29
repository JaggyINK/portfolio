// src/scene/WebGLFallback.jsx
// UI affichée quand WebGL est indisponible (hardware acceleration off, GPU crash, etc.)
import React from "react";
import { Link } from "react-router-dom";

export default function WebGLFallback({ reason }) {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2rem",
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.06), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.05), transparent 62%), #050811",
        color: "#E6ECF8",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          padding: "2rem",
          borderRadius: "1rem",
          border: "1px solid rgba(212,175,55,0.25)",
          background: "rgba(11,16,32,0.72)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🛰️</div>
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            color: "#22d3ee",
            fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
          }}
        >
          WebGL indisponible
        </h1>
        <p style={{ color: "#C5D3E8", lineHeight: 1.6, marginBottom: "1.2rem" }}>
          La scène 3D nécessite l&apos;accélération matérielle WebGL,
          actuellement désactivée par votre navigateur ou votre système.
        </p>

        <details
          style={{
            textAlign: "left",
            marginBottom: "1.5rem",
            padding: "0.8rem 1rem",
            borderRadius: "0.6rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <summary style={{ cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#E6ECF8" }}>
            💡 Comment activer WebGL ?
          </summary>
          <ul
            style={{
              marginTop: "0.6rem",
              paddingLeft: "1.2rem",
              fontSize: "0.82rem",
              color: "#C5D3E8",
              lineHeight: 1.7,
            }}
          >
            <li>
              <strong>Chrome / Edge</strong> : Paramètres → Système → activer
              « Utiliser l&apos;accélération matérielle quand disponible »,
              puis redémarrer le navigateur.
            </li>
            <li>
              <strong>Firefox</strong> : <code>about:config</code> →{" "}
              <code>webgl.disabled</code> doit être <code>false</code>.
            </li>
            <li>
              <strong>Vérifier</strong> :{" "}
              <a
                href="https://get.webgl.org/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#22d3ee" }}
              >
                get.webgl.org
              </a>{" "}
              ·{" "}
              <a
                href="chrome://gpu"
                style={{ color: "#22d3ee" }}
                onClick={(e) => {
                  // chrome:// n'est pas cliquable depuis une page web ; on copie au lieu d'ouvrir
                  e.preventDefault();
                  navigator.clipboard?.writeText("chrome://gpu");
                  alert("URL chrome://gpu copiée — collez-la dans la barre d'adresse");
                }}
              >
                chrome://gpu (copier)
              </a>
            </li>
          </ul>
        </details>

        {reason && (
          <details
            style={{
              textAlign: "left",
              marginBottom: "1.5rem",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <summary style={{ cursor: "pointer", fontSize: "0.78rem", color: "#fda4af" }}>
              Détails techniques
            </summary>
            <pre
              style={{
                marginTop: "0.5rem",
                fontSize: "0.7rem",
                color: "#fda4af",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {String(reason)}
            </pre>
          </details>
        )}

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "0.7rem 1.4rem",
            borderRadius: "0.6rem",
            border: "1px solid rgba(34,211,238,0.4)",
            background: "rgba(34,211,238,0.12)",
            color: "#22d3ee",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Retour au portfolio classique
        </Link>
      </div>
    </main>
  );
}
