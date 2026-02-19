// src/components/stations/shared/quizHistory.js
// Version générique pour tous les quiz (PHP, Python, JavaScript, SQL, Docker...)

const MAX_HISTORY_ITEMS = 50;

/**
 * Crée un gestionnaire d'historique pour un quiz spécifique
 * @param {string} quizType - Type de quiz (ex: 'php', 'python', 'javascript')
 */
export const createQuizHistory = (quizType = 'quiz') => {
  const STORAGE_KEY = `${quizType}_quiz_history`;

  return {
    // Récupère tout l'historique
    getHistory: () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored);
      } catch (error) {
        console.error(`[${quizType}History] Error loading history:`, error);
        return [];
      }
    },

    // Ajoute un résultat
    addResult: (result) => {
      try {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        const newResult = {
          ...result,
          id: `${quizType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        };
        
        history.unshift(newResult);
        const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        return newResult;
      } catch (error) {
        console.error(`[${quizType}History] Error saving result:`, error);
        return null;
      }
    },

    // Statistiques globales
    getGlobalStats: () => {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      if (history.length === 0) {
        return {
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          totalTime: 0,
          byDifficulty: {
            easy: { count: 0, avgScore: 0, bestScore: 0 },
            medium: { count: 0, avgScore: 0, bestScore: 0 },
            hard: { count: 0, avgScore: 0, bestScore: 0 }
          }
        };
      }
      
      const stats = {
        totalQuizzes: history.length,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0,
        byDifficulty: {
          easy: { count: 0, avgScore: 0, bestScore: 0, scores: [] },
          medium: { count: 0, avgScore: 0, bestScore: 0, scores: [] },
          hard: { count: 0, avgScore: 0, bestScore: 0, scores: [] }
        }
      };
      
      let totalScore = 0;
      
      history.forEach(result => {
        const percentage = result.percentage || 0;
        totalScore += percentage;
        stats.totalTime += result.timeSpent || 0;
        stats.bestScore = Math.max(stats.bestScore, percentage);
        
        if (stats.byDifficulty[result.difficulty]) {
          stats.byDifficulty[result.difficulty].count++;
          stats.byDifficulty[result.difficulty].scores.push(percentage);
          stats.byDifficulty[result.difficulty].bestScore = Math.max(
            stats.byDifficulty[result.difficulty].bestScore,
            percentage
          );
        }
      });
      
      stats.averageScore = Math.round(totalScore / history.length);
      
      Object.keys(stats.byDifficulty).forEach(diff => {
        const diffData = stats.byDifficulty[diff];
        if (diffData.scores.length > 0) {
          diffData.avgScore = Math.round(
            diffData.scores.reduce((a, b) => a + b, 0) / diffData.scores.length
          );
        }
        delete diffData.scores;
      });
      
      return stats;
    },

    // Récupère les derniers résultats
    getRecentResults: (count = 5) => {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return history.slice(0, count);
    },

    // Récupère par difficulté
    getResultsByDifficulty: (difficulty) => {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return history.filter(result => result.difficulty === difficulty);
    },

    // Efface l'historique
    clearHistory: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      } catch (error) {
        console.error(`[${quizType}History] Error clearing history:`, error);
        return false;
      }
    },

    // Catégories faibles
    getWeakCategories: (limit = 3) => {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (history.length === 0) return [];
      
      const categoryStats = {};
      
      history.forEach(result => {
        if (!result.answers) return;
        
        result.answers.forEach(answer => {
          const cat = answer.category || 'Général';
          if (!categoryStats[cat]) {
            categoryStats[cat] = { correct: 0, total: 0 };
          }
          categoryStats[cat].total++;
          if (answer.correct) categoryStats[cat].correct++;
        });
      });
      
      const categories = Object.entries(categoryStats)
        .map(([name, stats]) => ({
          name,
          percentage: Math.round((stats.correct / stats.total) * 100),
          correct: stats.correct,
          total: stats.total
        }))
        .sort((a, b) => a.percentage - b.percentage);
      
      return categories.slice(0, limit);
    },

    // Export stats
    exportStats: () => {
      const stats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const weak = this.getWeakCategories();
      
      let text = `=== STATISTIQUES ${quizType.toUpperCase()} QUIZ ===\n\n`;
      text += `Total de quiz complétés : ${stats.totalQuizzes}\n`;
      text += `Score moyen global : ${stats.averageScore}%\n`;
      text += `Meilleur score : ${stats.bestScore}%\n`;
      text += `Temps total passé : ${Math.round(stats.totalTime / 60)} minutes\n\n`;
      
      text += '--- Par niveau ---\n';
      Object.entries(stats.byDifficulty).forEach(([diff, data]) => {
        if (data.count > 0) {
          text += `${diff.toUpperCase()}: ${data.count} quiz, moyenne ${data.avgScore}%, record ${data.bestScore}%\n`;
        }
      });
      
      if (weak.length > 0) {
        text += '\n--- Catégories à améliorer ---\n';
        weak.forEach(cat => {
          text += `${cat.name}: ${cat.percentage}% (${cat.correct}/${cat.total})\n`;
        });
      }
      
      return text;
    }
  };
};

// ✨ Instances pré-créées pour tes 5 quiz
export const phpQuizHistory = createQuizHistory('php');
export const pythonQuizHistory = createQuizHistory('python');
export const javascriptQuizHistory = createQuizHistory('javascript');
export const sqlQuizHistory = createQuizHistory('sql');
export const dockerQuizHistory = createQuizHistory('docker');