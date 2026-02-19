// src/components/stations/php/AdvancedSummary.jsx
import React from "react";
import { Trophy, Target, Brain, BookOpen, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

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

export default function AdvancedSummary({
  score,
  total,
  answers,
  timeSpent,
  onRestart,
  onBackToPlanet
}) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;
  
  // Analyse des catégories
  const categoriesStats = {};
  const wrongCategories = [];
  
  answers.forEach((answer) => {
    const cat = answer.category || "Général";
    
    if (!categoriesStats[cat]) {
      categoriesStats[cat] = { correct: 0, total: 0, wrongQuestions: [] };
    }
    categoriesStats[cat].total++;
    
    if (answer.correct) {
      categoriesStats[cat].correct++;
    } else {
      categoriesStats[cat].wrongQuestions.push(answer);
      if (!wrongCategories.includes(cat)) {
        wrongCategories.push(cat);
      }
    }
  });

  // Tri des catégories par taux d'échec
  const weakCategories = Object.entries(categoriesStats)
    .map(([name, stats]) => ({
      name,
      percentage: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total,
      wrongCount: stats.total - stats.correct
    }))
    .filter(cat => cat.percentage < 100)
    .sort((a, b) => a.percentage - b.percentage);

  // Génération de conseils personnalisés basés sur les erreurs
  const generateAdvice = () => {
    const advice = [];
    const totalErrors = total - score;
    
    if (totalErrors === 0) {
      advice.push({
        icon: Trophy,
        title: "🎉 PARFAIT !",
        color: "from-emerald-500 to-green-500",
        description: "Tu maîtrises complètement le niveau difficile ! Tu es prêt pour des projets PHP professionnels.",
        tips: [
          "Continue avec des projets réels (Laravel, Symfony)",
          "Contribue à des projets open-source PHP",
          "Explore PHP 8+ (attributes, enums, fibers)"
        ]
      });
    } else if (totalErrors <= 2) {
      advice.push({
        icon: Target,
        title: "EXCELLENT !",
        color: "from-cyan-500 to-blue-500",
        description: "Quelques détails à peaufiner, mais tu maîtrises très bien PHP.",
        tips: weakCategories.slice(0, 2).map(cat => 
          `Révise : ${cat.name} (${cat.wrongCount} erreur${cat.wrongCount > 1 ? 's' : ''})`
        )
      });
    } else if (totalErrors <= 4) {
      advice.push({
        icon: Brain,
        title: "BIEN !",
        color: "from-blue-500 to-purple-500",
        description: "Tu as de bonnes bases, mais certains concepts méritent d'être approfondis.",
        tips: weakCategories.slice(0, 3).map(cat => 
          `Approfondis : ${cat.name} (${cat.percentage}%)`
        )
      });
    } else {
      advice.push({
        icon: BookOpen,
        title: "CONTINUE !",
        color: "from-orange-500 to-red-500",
        description: "Ce niveau est difficile ! Ne te décourage pas, révise les points faibles identifiés ci-dessous.",
        tips: [
          "Reprends les niveaux Facile et Moyen",
          "Lis la documentation PHP officielle",
          "Pratique avec des exercices sur php.net"
        ]
      });
    }

    // Conseils spécifiques par catégorie
    weakCategories.slice(0, 3).forEach(cat => {
      const categoryAdvice = getCategoryAdvice(cat.name, cat.wrongCount);
      if (categoryAdvice) {
        advice.push(categoryAdvice);
      }
    });

    return advice;
  };

  // Conseils spécifiques par catégorie
  const getCategoryAdvice = (category, errorCount) => {
    const adviceMap = {
      "POO": {
        icon: Brain,
        title: `POO : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-purple-500 to-pink-500",
        description: "La Programmation Orientée Objet est un pilier de PHP moderne.",
        tips: [
          "Révise : classes, héritage, interfaces, traits",
          "Pratique : visibilité (public, private, protected)",
          "Approfondis : classes abstraites vs interfaces",
          "Ressource : php.net/manual/fr/language.oop5.php"
        ]
      },
      "Sécurité": {
        icon: AlertTriangle,
        title: `Sécurité : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-red-500 to-orange-500",
        description: "La sécurité est CRITIQUE en PHP. Ces erreurs sont prioritaires !",
        tips: [
          "URGENT : Maîtrise les requêtes préparées (PDO)",
          "Comprends les injections SQL et comment les éviter",
          "Pratique : password_hash(), htmlspecialchars(), filter_var()",
          "Ressource : owasp.org/www-project-top-ten/"
        ]
      },
      "Bases de données": {
        icon: Brain,
        title: `Bases de données : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-blue-500 to-cyan-500",
        description: "PDO et les bases de données sont essentiels pour les applications PHP.",
        tips: [
          "Maîtrise PDO vs mysqli",
          "Pratique les requêtes préparées",
          "Comprends fetch(), fetchAll(), fetchColumn()",
          "Ressource : php.net/manual/fr/book.pdo.php"
        ]
      },
      "POO avancée": {
        icon: Brain,
        title: `POO avancée : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-purple-500 to-indigo-500",
        description: "Concepts avancés de POO nécessaires pour du code professionnel.",
        tips: [
          "Étudie : Design Patterns (Singleton, Factory, etc.)",
          "Comprends : Dependency Injection",
          "Pratique : Namespaces et autoloading",
          "Ressource : refactoring.guru/design-patterns/php"
        ]
      },
      "Architecture et patterns": {
        icon: Target,
        title: `Architecture : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-cyan-500 to-teal-500",
        description: "L'architecture propre rend ton code maintenable et évolutif.",
        tips: [
          "Apprends les principes SOLID",
          "Comprends MVC et autres patterns",
          "Pratique la séparation des responsabilités",
          "Ressource : clean-code-developer.com"
        ]
      },
      "Namespaces": {
        icon: BookOpen,
        title: `Namespaces : ${errorCount} erreur${errorCount > 1 ? 's' : ''}`,
        color: "from-blue-500 to-purple-500",
        description: "Les namespaces organisent ton code et évitent les conflits.",
        tips: [
          "Comprends la syntaxe : namespace App\\Controller;",
          "Maîtrise use, use as, use function",
          "Pratique avec Composer et PSR-4",
          "Ressource : php.net/manual/fr/language.namespaces.php"
        ]
      }
    };

    return adviceMap[category] || null;
  };

  const advice = generateAdvice();
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-4">
      {/* En-tête du résultat */}
      <div className="relative p-6 overflow-hidden border rounded-2xl bg-slate-950/90 backdrop-blur-md border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500" />
        
        <div className="relative space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${passed ? 'bg-gradient-to-br from-emerald-500 to-green-500' : 'bg-gradient-to-br from-orange-500 to-red-500'}`}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text">
                  Niveau Difficile terminé !
                </h2>
                <p className="text-sm text-slate-400">Analyse complète de tes performances</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-emerald-300' : percentage >= 60 ? 'text-blue-300' : 'text-orange-300'}`}>
                {percentage}%
              </div>
              <p className="text-xs text-slate-400">{score} / {total} • {formatTime(timeSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils personnalisés */}
      {advice.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className={`p-4 border rounded-xl bg-gradient-to-r ${item.color}/10 border-${item.color.split('-')[1]}-500/30`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}/20`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-200">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                {item.tips && item.tips.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-slate-300">
                    {item.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex items-start gap-2">
                        <span className="mt-0.5 text-cyan-400">→</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Performance par catégorie */}
      {Object.keys(categoriesStats).length > 1 && (
        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-200">Performance détaillée par catégorie</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(categoriesStats).map(([category, stats]) => {
              const catPercentage = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{category}</span>
                    <span className={`font-bold ${
                      catPercentage >= 80 ? 'text-emerald-300' :
                      catPercentage >= 60 ? 'text-cyan-300' : 'text-orange-300'
                    }`}>
                      {stats.correct}/{stats.total} ({catPercentage}%)
                    </span>
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

      {/* Revue des erreurs UNIQUEMENT */}
      {answers.filter(a => !a.correct).length > 0 && (
        <div className="p-4 border rounded-xl bg-slate-950/80 backdrop-blur-md border-slate-800">
          <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-200">
            <XCircle className="w-4 h-4 text-rose-400" />
            Questions à retravailler ({answers.filter(a => !a.correct).length})
          </h3>
          <div className="space-y-3">
            {answers.map((answer, idx) => {
              if (answer.correct) return null;
              
              return (
                <div
                  key={idx}
                  className="p-3 border rounded-lg border-rose-500/30 bg-rose-500/5"
                >
                  <div className="mb-2">
                    <p className="text-xs font-medium text-rose-300">
                      Question {idx + 1} {answer.category && (
                        <span className="ml-2 text-slate-500">• {answer.category}</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">
                      {renderWithCode(answer.question)}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2 border rounded border-rose-500/30 bg-rose-500/10">
                      <p className="font-semibold text-rose-300">❌ Ta réponse :</p>
                      <p className="mt-1 text-slate-300">{renderWithCode(answer.selectedChoice)}</p>
                      <p className="mt-1 text-slate-400">{renderWithCode(answer.selectedExplanation)}</p>
                    </div>
                    
                    <div className="p-2 border rounded border-emerald-500/30 bg-emerald-500/10">
                      <p className="font-semibold text-emerald-300">✓ Bonne réponse :</p>
                      <p className="mt-1 text-slate-300">{renderWithCode(answer.correctChoice)}</p>
                      <p className="mt-1 text-slate-400">{renderWithCode(answer.correctExplanation)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBackToPlanet}
          className="px-4 py-2 text-sm font-semibold border rounded-lg border-slate-700 bg-slate-900/90 text-slate-200 hover:border-slate-500"
        >
          ← Retour à la planète
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/30 hover:brightness-110"
        >
          Recommencer le niveau difficile
        </button>
      </div>
    </div>
  );
}