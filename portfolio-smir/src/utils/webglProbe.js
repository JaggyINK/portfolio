// src/utils/webglProbe.js
// Détecte si WebGL est disponible avant de tenter de monter un Canvas Three.js.
// Évite le spam d'erreurs quand l'accélération matérielle est désactivée
// (ex: Chrome sans GPU, --disable-gpu, paramètres restrictifs).

let cached = null;

export function isWebGLAvailable() {
  if (cached !== null) return cached;
  if (typeof window === "undefined" || typeof document === "undefined") {
    cached = false;
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      cached = false;
      return false;
    }
    // Vérifier qu'on peut vraiment lire les capacités GPU
    const isReal = !!gl.getParameter(gl.VERSION);
    // Cleanup
    const ext = gl.getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
    cached = isReal;
    return isReal;
  } catch {
    cached = false;
    return false;
  }
}

// Reset (utile pour les tests / le HMR)
export function _resetWebGLProbeCache() {
  cached = null;
}
