import { makePos } from "@/utils/math3d";

export default function buildStations(RADIUS) {
  return [
    {
      id: "quiz-javascript",
      short: "Quiz JS",
      label: "Station JavaScript Quiz",
      type: "dome",
      color: "#f59e0b",
      pos: makePos(RADIUS, 2, 12),
      openRadius: 0.18,
      lines: ["Quiz JavaScript complet", "Syntaxe • ES6+ • Async"]
    },
    {
      id: "quiz-python",
      short: "Quiz Python",
      label: "Station Python Quiz",
      type: "tower",
      color: "#10b981",
      pos: makePos(RADIUS, 0, 92),
      openRadius: 0.18,
      lines: ["Quiz Python complet", "Types • POO • Générateurs"]
    },
    {
      id: "quiz-sql",
      short: "Quiz SQL",
      label: "Station SQL Quiz",
      type: "ring",
      color: "#3b82f6",
      pos: makePos(RADIUS, 18, 210),
      openRadius: 0.20,
      lines: ["Quiz SQL complet", "SELECT • JOIN • Transactions"]
    },
    {
      id: "quiz-docker",
      short: "Quiz Docker",
      label: "Station Docker Quiz",
      type: "dish",
      color: "#0ea5e9",
      pos: makePos(RADIUS, -22, 300),
      openRadius: 0.22,
      lines: ["Quiz Docker 🐳", "Conteneurs • Images • Compose"]
    },
    {
      id: "quiz-php",
      short: "Quiz PHP",
      label: "Station PHP Quiz",
      type: "tower",
      color: "#22d3ee",
      pos: makePos(RADIUS, -10, 160),
      openRadius: 0.18,
      lines: ["Quiz PHP complet", "Syntaxe • BDD • POO"]
    }
  ];
}