/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#0b1020",
          text: "#E6ECF8",
          sub: "#C5D3E8",
        },
        brand: {
          cyan: "#22d3ee",
          purple: "#a855f7",
          gold: "#d4af37",
        },
      },
      fontFamily: {
        orbitron: ["OrbitronLocal", "Orbitron", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
