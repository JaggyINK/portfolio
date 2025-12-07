// src/components/stations/php/QuickSummary.jsx
import React from "react";
import { Trophy, TrendingUp, ArrowUp } from "lucide-react";

function QuickSummary({
  score,
  total,
  difficulty,
  onNextLevel,
  onRestart,
  onViewFullStats
}) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;
  
  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent ! Prêt pour le niveau suivant ? 🚀", color: "text-emerald-300" };
    if (percentage >= 70) return { text: "Bien joué ! Tu peux passer au niveau supérieur ! 💪", color: "text-blue-300" };
    if (percentage >= 60) return { text: "Pas mal ! Entraîne-toi encore ou essaie le niveau suivant ! 📚", color: "text-cyan-300" };
    return { text: "Continue tes efforts ! Réessaie pour t'améliorer ! 🎯", color: "text-orange-300" };
  };

  const message = getMessage();
  const canLevelUp = difficulty !== "hard";
  const nextLevel = difficulty === "easy" ? "medium" : "hard";
  const nextLevelLabel = difficulty === "easy" ? "Intermédiaire" : "Difficile";

  return (
    <div className="space-y-4">
      {/* Résultat principal */}
      <div className="relative p-6 overflow-hidden border rounded-2xl bg-slate-950/90 backdrop-blur-md border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500" />
        
        <div className="relative space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${passed ? 'bg-gradient-to-br from-emerald-500 to-green-500' : 'bg-gradient-to-br from-orange-500 to-red-500'}`}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text">
                  Niveau {difficulty === "easy" ? "Facile" : "Intermédiaire"} terminé !
                </h2>
                <p className="text-sm text-slate-400">
                  {canLevelUp && passed ? "Tu peux maintenant augmenter la difficulté !" : "Continue de t'entraîner !"}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-emerald-300' : percentage >= 60 ? 'text-blue-300' : 'text-orange-300'}`}>
                {percentage}%
              </div>
              <p className="text-xs text-slate-400">{score} / {total}</p>
            </div>
          </div>

          <p className={`text-base font-medium ${message.color}`}>
            {message.text}
          </p>
        </div>
      </div>

      {/* Suggestion niveau suivant */}
      {canLevelUp && passed && (
        <div className="p-4 border rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <ArrowUp className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-cyan-200">Niveau suivant disponible !</p>
              <p className="text-xs text-slate-400">
                Tu as réussi ce niveau avec {percentage}%. Prêt pour le niveau {nextLevelLabel} ?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques rapides */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Score</p>
          </div>
          <p className="text-2xl font-bold text-cyan-300">{percentage}%</p>
          <p className="text-xs text-slate-500">{score} bonnes réponses sur {total}</p>
        </div>

        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Niveau</p>
          </div>
          <p className="text-2xl font-bold text-blue-300">
            {difficulty === "easy" ? "Facile" : "Moyen"}
          </p>
          <p className="text-xs text-slate-500">
            {passed ? "✓ Réussi" : "✗ À retravailler"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="px-4 py-2 text-sm font-semibold border rounded-lg border-slate-700 bg-slate-900/90 text-slate-200 hover:border-slate-500"
          >
            Recommencer ce niveau
          </button>

          <button
            type="button"
            onClick={onViewFullStats}
            className="px-4 py-2 text-sm font-semibold text-purple-200 border rounded-lg border-purple-700/40 bg-slate-900/90 hover:border-purple-500"
          >
            Voir les stats complètes
          </button>
        </div>

        {canLevelUp && (
          <button
            type="button"
            onClick={onNextLevel}
            className={`px-4 py-2 text-sm font-semibold rounded-lg ${
              passed
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/30 hover:brightness-110"
                : "border border-slate-700 bg-slate-900/90 text-slate-400 cursor-not-allowed"
            }`}
            disabled={!passed}
          >
            {passed ? `Niveau ${nextLevelLabel} →` : "Score insuffisant"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuickSummary;