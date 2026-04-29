// src/scene/WebGLErrorBoundary.jsx
// Filet de sécurité : si la création du contexte WebGL échoue après le mount
// (alors que le probe initial était positif), on affiche le fallback au lieu
// de laisser React Three Fiber boucler en erreur.
import React from "react";
import WebGLFallback from "./WebGLFallback.jsx";

export default class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log léger seulement en dev
    if (import.meta.env?.DEV) {
      console.error("[WebGLErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallback reason={this.state.error?.message || this.state.error} />;
    }
    return this.props.children;
  }
}
