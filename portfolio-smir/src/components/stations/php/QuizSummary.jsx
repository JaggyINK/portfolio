// src/components/stations/php/QuizSummary.jsx
import React from "react";
import { Trophy, Target, Clock, TrendingUp, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const renderWithCode = (text) => {
  if (text == null) return null;
  const parts = String(text).split("`");
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <code
        key={idx}
        className="px-1 py-0.5 rounded border border-slate-700/80 bg-slate-900/90 font-mono text-[0.85em] text-cyan-200"
      >
        {part}
      </code>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
};

export default function QuizSummary({
  score,
  total,
  answers,
  questions,
  timeSpent,
  difficulty,
  onRestart,
  onChangeDifficulty,
  onBackToPlanet
}) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;
  
  // Calcul des catégories
  const categoriesStats = {};
  answers.forEach((answer, idx) => {
    const question = questions[idx];
    const category = question.category || "Général";
    
    if (!categoriesStats[category]) {
      categoriesStats[category] = { correct: 0, total: 0 };
    }
    categoriesStats[category].total++;
    if (answer.correct) categoriesStats[category].correct++;
  });

  // Format temps
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Messages personnalisés selon le score
  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent ! Tu maîtrises parfaitement ce niveau ! 🚀", color: "text-emerald-300" };
    if (percentage >= 80) return { text: "Très bien ! Tu as de solides connaissances ! 🌟", color: "text-green-300" };
    if (percentage >= 70) return { text: "Bien joué ! Quelques points à revoir mais tu es sur la bonne voie ! 💪", color: "text-blue-300" };
    if (percentage >= 60) return { text: "Pas mal ! Continue de t'entraîner pour progresser ! 📚", color: "text-cyan-300" };
    return { text: "Continue tes efforts ! Révise les points faibles et recommence ! 🎯", color: "text-orange-300" };
  };

  const message = getMessage();

  return (
    <div className="space-y-4">
      {/* En-tête du résultat */}
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
                  Quiz terminé !
                </h2>
                <p className="text-sm text-slate-400">Niveau {difficulty}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-emerald-300' : percentage >= 60 ? 'text-blue-300' : 'text-orange-300'}`}>
                {percentage}%
              </div>
              <p className="text-xs text-slate-400">{score} / {total} bonnes réponses</p>
            </div>
          </div>

          <p className={`text-base font-medium ${message.color}`}>
            {message.text}
          </p>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Précision</p>
          </div>
          <p className="text-2xl font-bold text-cyan-300">{percentage}%</p>
          <p className="text-xs text-slate-500">de réussite</p>
        </div>

        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Temps</p>
          </div>
          <p className="text-2xl font-bold text-blue-300">{formatTime(timeSpent)}</p>
          <p className="text-xs text-slate-500">~{Math.round(timeSpent / total)}s / question</p>
        </div>

        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Score</p>
          </div>
          <p className="text-2xl font-bold text-purple-300">{score} / {total}</p>
          <p className="text-xs text-slate-500">questions réussies</p>
        </div>
      </div>

      {/* Stats par catégorie */}
      {Object.keys(categoriesStats).length > 1 && (
        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Performance par catégorie</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(categoriesStats).map(([category, stats]) => {
              const catPercentage = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{category}</span>
                    <span className="font-bold text-cyan-300">{stats.correct}/{stats.total}</span>
                  </div>
                  <div className="w-full h-2 overflow-hidden border rounded-full bg-slate-900 border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        catPercentage >= 80 ? 'bg-gradient-to-r from-emerald-400 to-green-400' :
                        catPercentage >= 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                        'bg-gradient-to-r from-orange-400 to-red-400'
                      }`}
                      style={{ width: `${catPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Revue détaillée des questions */}
      <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">Revue détaillée</h3>
        <div className="space-y-3">
          {answers.map((answer, idx) => {
            const question = questions[idx];
            const isCorrect = answer.correct;
            
            return (
              <div
                key={idx}
                className={`p-3 border rounded-lg ${
                  isCorrect 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-rose-500/30 bg-rose-500/5'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-300">
                      Question {idx + 1} {question.category && (
                        <span className="ml-2 text-slate-500">• {question.category}</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">
                      {renderWithCode(question.question)}
                    </p>
                  </div>
                </div>

                <div className="pl-6 space-y-2 text-xs">
                  {!isCorrect && (
                    <div className="p-2 border rounded border-rose-500/30 bg-rose-500/10">
                      <p className="font-semibold text-rose-300">Ta réponse :</p>
                      <p className="mt-1 text-slate-300">{renderWithCode(answer.selectedChoice)}</p>
                      <p className="mt-1 text-slate-400">{renderWithCode(answer.explanation)}</p>
                    </div>
                  )}
                  
                  <div className={`p-2 border rounded ${
                    isCorrect 
                      ? 'border-emerald-500/30 bg-emerald-500/10' 
                      : 'border-cyan-500/30 bg-cyan-500/10'
                  }`}>
                    <p className={`font-semibold ${isCorrect ? 'text-emerald-300' : 'text-cyan-300'}`}>
                      {isCorrect ? '✓ Ta réponse' : 'Bonne réponse'} :
                    </p>
                    <p className="mt-1 text-slate-300">
                      {renderWithCode(question.choices[question.correctIndex].text)}
                    </p>
                    <p className="mt-1 text-slate-400">
                      {renderWithCode(question.choices[question.correctIndex].explanation)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBackToPlanet}
          className="px-4 py-2 text-sm font-semibold border rounded-lg border-slate-700 bg-slate-900/90 text-slate-200 hover:border-slate-500"
        >
          ← Retour à la planète
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onChangeDifficulty}
            className="px-4 py-2 text-sm font-semibold border rounded-lg border-cyan-700/40 bg-slate-900/90 text-cyan-200 hover:border-cyan-500"
          >
            Changer de niveau
          </button>
          
          <button
            type="button"
            onClick={onRestart}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:brightness-110"
          >
            Recommencer ce niveau
          </button>
        </div>
      </div>
    </div>
  );
}