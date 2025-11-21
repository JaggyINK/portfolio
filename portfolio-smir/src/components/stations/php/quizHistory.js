// src/components/stations/php/quizHistory.js

const STORAGE_KEY = 'php_quiz_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Structure d'un résultat de quiz :
 * {
 *   id: string,
 *   difficulty: 'easy' | 'medium' | 'hard',
 *   score: number,
 *   total: number,
 *   percentage: number,
 *   timeSpent: number,
 *   timestamp: number,
 *   answers: Array<{
 *     questionId: string,
 *     correct: boolean,
 *     selectedIndex: number,
 *     category: string
 *   }>
 * }
 */

// Récupère tout l'historique
export const getQuizHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('[QuizHistory] Error loading history:', error);
    return [];
  }
};

// Ajoute un résultat à l'historique
export const addQuizResult = (result) => {
  try {
    const history = getQuizHistory();
    
    const newResult = {
      ...result,
      id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };
    
    // Ajoute au début et limite à MAX_HISTORY_ITEMS
    history.unshift(newResult);
    const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return newResult;
  } catch (error) {
    console.error('[QuizHistory] Error saving result:', error);
    return null;
  }
};

// Récupère les statistiques globales
export const getGlobalStats = () => {
  const history = getQuizHistory();
  
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
  
  // Calcul moyennes par difficulté
  Object.keys(stats.byDifficulty).forEach(diff => {
    const diffData = stats.byDifficulty[diff];
    if (diffData.scores.length > 0) {
      diffData.avgScore = Math.round(
        diffData.scores.reduce((a, b) => a + b, 0) / diffData.scores.length
      );
    }
    delete diffData.scores; // Nettoie les données temporaires
  });
  
  return stats;
};

// Récupère les derniers résultats (n derniers)
export const getRecentResults = (count = 5) => {
  const history = getQuizHistory();
  return history.slice(0, count);
};

// Récupère les résultats pour une difficulté spécifique
export const getResultsByDifficulty = (difficulty) => {
  const history = getQuizHistory();
  return history.filter(result => result.difficulty === difficulty);
};

// Efface tout l'historique
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[QuizHistory] Error clearing history:', error);
    return false;
  }
};

// Récupère les catégories les plus faibles
export const getWeakCategories = (limit = 3) => {
  const history = getQuizHistory();
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
  
  // Convertit en tableau et trie par taux de réussite
  const categories = Object.entries(categoryStats)
    .map(([name, stats]) => ({
      name,
      percentage: Math.round((stats.correct / stats.total) * 100),
      correct: stats.correct,
      total: stats.total
    }))
    .sort((a, b) => a.percentage - b.percentage);
  
  return categories.slice(0, limit);
};

// Récupère la progression dans le temps
export const getProgressionData = (difficulty = null, days = 30) => {
  const history = getQuizHistory();
  const cutoffDate = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  const filtered = history
    .filter(result => {
      const matchesDifficulty = !difficulty || result.difficulty === difficulty;
      const matchesDate = result.timestamp >= cutoffDate;
      return matchesDifficulty && matchesDate;
    })
    .reverse(); // Du plus ancien au plus récent
  
  return filtered.map((result, idx) => ({
    quiz: idx + 1,
    score: result.percentage,
    date: new Date(result.timestamp).toLocaleDateString(),
    difficulty: result.difficulty
  }));
};

// Export des statistiques en format texte
export const exportStats = () => {
  const stats = getGlobalStats();
  const weak = getWeakCategories();
  
  let text = '=== STATISTIQUES PHP QUIZ ===\n\n';
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
};