/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    quality: "auto",         // "auto" | "high" | "low"
    reduceMotion: false,
    highContrast: false,
    presentation: false,
    language: "fr",
  });
  const hydratedRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("sagario_settings");
    if (saved) {
      try { setSettings(JSON.parse(saved)); } catch (err) { console.error('[Settings] Error parsing saved settings:', err); }
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    // Évite d'écraser le localStorage avec les defaults avant la lecture initiale
    if (!hydratedRef.current) return;
    localStorage.setItem("sagario_settings", JSON.stringify(settings));
  }, [settings]);

  /* Sync reduceMotion to DOM for CSS targeting */
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  }, [settings.reduceMotion]);

  const value = useMemo(() => ({ settings, setSettings }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
