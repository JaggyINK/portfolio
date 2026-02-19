// src/components/stations/javascript/JavascriptQuizStation.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Zap, Brain, Code2, Trophy, Clock 
} from "lucide-react";
import { JAVASCRIPT_QUESTIONS, DIFFICULTY_META } from "../components/stations/javascript/javascriptQuestions";
import QuickSummary from "../components/stations/shared/QuickSummary";
import AdvancedSummary from "../components/stations/shared/AdvancedSummary";
import { javascriptQuizHistory } from "../components/stations/shared/quizHistory";

// === UTILS ===

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const obfuscateCorrectIndex = (index, salt) => {
  return btoa(`${index}_${salt}_${Date.now()}`);
};

const deobfuscateCorrectIndex = (obfuscated) => {
  try {
    const decoded = atob(obfuscated);
    return parseInt(decoded.split("_")[0]);
  } catch {
    return -1;
  }
};

const buildShuffledSet = (level) => {
  const base = JAVASCRIPT_QUESTIONS[level] || [];
  const questionsRandomOrder = shuffleArray(base);
  const salt = Math.random().toString(36).substring(7);

  return questionsRandomOrder.map((q) => {
    const indices = q.choices.map((_, idx) => idx);
    const shuffledIndices = shuffleArray(indices);
    const newChoices = shuffledIndices.map((i) => q.choices[i]);
    const newCorrectIndex = shuffledIndices.indexOf(q.correctIndex);

    return {
      id: q.id,
      question: q.question,
      choices: newChoices,
      _protected: obfuscateCorrectIndex(newCorrectIndex, salt),
      category: q.category,
      difficulty: q.difficulty
    };
  });
};

const renderWithCode = (text) => {
  if (text == null) return null;
  const parts = String(text).split("`");
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <code
        key={idx}
        className="px-1 py-0.5 rounded border border-slate-700/80 bg-slate-900/90 font-mono text-[0.85em] text-yellow-200"
      >
        {part}
      </code>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
};

// === UI COMPONENTS ===

const GradientBorder = ({ children, color = "from-yellow-500" }) => (
  <div
    className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${color} to-orange-500 p-0.5`}
  >
    <div className="relative p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md rounded-2xl">
      {children}
    </div>
  </div>
);

const ModuleHeader = ({ icon: Icon, title, subtitle, color }) => (
  <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-400 sm:text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

const Gauge = ({ value = 0, label = "Progression" }) => {
  const pct = Math.round((value || 0) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-yellow-300">{pct}%</span>
      </div>
      <div className="w-full h-3 overflow-hidden border rounded-full bg-slate-900 border-slate-800">
        <div
          className="h-full transition-all duration-500 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// === MAIN COMPONENT ===

export default function JavascriptQuizStation() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState(() => buildShuffledSet("easy"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showFullStats, setShowFullStats] = useState(false);

  const [timeSpent, setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    if (isRunning && !finished) {
      timerRef.current = setInterval(() => {
        setTimeSpent((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, finished]);

  useEffect(() => {
    if (isAnswered && !timerStarted && !finished) {
      setIsRunning(true);
      setTimerStarted(true);
    }
  }, [isAnswered, timerStarted, finished]);

  const loadStats = useCallback(() => {
    setGlobalStats(javascriptQuizHistory.getGlobalStats());
  }, []);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const progress = total > 0 ? currentIndex / total : 0;

  const resetForDifficulty = (level) => {
    setDifficulty(level);
    setQuestions(buildShuffledSet(level));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeSpent(0);
    setIsRunning(false);
    setTimerStarted(false);
    setShowFullStats(false);
  };

  const handleSelect = (choiceIndex) => {
    if (isAnswered || finished || !currentQuestion) return;

    setSelectedIndex(choiceIndex);
    const correctIdx = deobfuscateCorrectIndex(currentQuestion._protected);
    const correct = choiceIndex === correctIdx;

    setIsAnswered(true);
    setIsCorrect(correct);

    const answerData = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      correct,
      selectedIndex: choiceIndex,
      correctIndex: correctIdx,
      selectedChoice: currentQuestion.choices[choiceIndex].text,
      correctChoice: currentQuestion.choices[correctIdx].text,
      selectedExplanation: currentQuestion.choices[choiceIndex].explanation,
      correctExplanation: currentQuestion.choices[correctIdx].explanation,
      category: currentQuestion.category,
      allChoices: currentQuestion.choices
    };
    setAnswers((prev) => [...prev, answerData]);

    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= total) {
      setFinished(true);
      setIsRunning(false);

      const finalScore = score + (isCorrect ? 1 : 0);
      const result = {
        difficulty,
        score: finalScore,
        total,
        percentage: Math.round((finalScore / total) * 100),
        timeSpent,
        answers
      };
      javascriptQuizHistory.addResult(result);
      loadStats();
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  };

  const handleRestart = () => {
    setQuestions(buildShuffledSet(difficulty));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeSpent(0);
    setIsRunning(false);
    setTimerStarted(false);
    setShowFullStats(false);
  };

  const handleNextLevel = () => {
    const nextDiff = difficulty === "easy" ? "medium" : "hard";
    resetForDifficulty(nextDiff);
  };

  const handleBackToPlanet = () => {
    navigate("/scene");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const finalScore = score;

  return (
    <div className="relative min-h-[100vh] w-full px-4 py-6 sm:px-6 sm:py-8">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b22_0,#02061700_55%,#020617_100%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ModuleHeader
            icon={Code2}
            title="Station JavaScript – Quiz Galactique"
            subtitle="Teste tes connaissances JS et progresse niveau par niveau."
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBackToPlanet}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-yellow-100 border shadow-sm rounded-xl border-yellow-500/40 bg-slate-950/70 shadow-yellow-500/20 backdrop-blur-md hover:border-yellow-300 sm:text-sm"
            >
              <span className="text-lg leading-none">⭠</span>
              <span>Planète</span>
            </button>
          </div>
        </div>

        {/* Sélecteur de difficulté */}
        {!finished && (
          <GradientBorder color="from-yellow-500">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.18em] text-yellow-300 uppercase">
                  NIVEAU
                </p>
                <p className="text-sm text-slate-300">
                  {DIFFICULTY_META[difficulty]?.description}
                </p>
              </div>
              <div className="flex gap-2">
                {[
                  { k: "easy", label: "Facile", icon: Zap },
                  { k: "medium", label: "Inter.", icon: Brain },
                  { k: "hard", label: "Difficile", icon: Trophy }
                ].map(({ k, label, icon: Icon }) => {
                  const active = difficulty === k;
                  return (
                    <button
                      key={k}
                      onClick={() => resetForDifficulty(k)}
                      className={`inline-flex flex-1 items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
                        active
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30"
                          : "border border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-yellow-500/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </GradientBorder>
        )}

        {/* Quiz OU Résumé */}
        {!finished ? (
          <div className="space-y-4">
            <GradientBorder color="from-orange-500">
              {currentQuestion ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <Gauge value={progress} label="Progression" />
                    </div>
                    <div className="flex items-center gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="font-mono font-bold text-yellow-300">
                          {formatTime(timeSpent)}
                        </span>
                      </div>
                      <div className="text-right text-slate-300">
                        <p>
                          Question{" "}
                          <span className="font-semibold text-yellow-300">
                            {currentIndex + 1}
                          </span>{" "}
                          / {total}
                        </p>
                        <p>
                          Score :{" "}
                          <span className="font-semibold text-emerald-300">
                            {score}
                          </span>{" "}
                          / {total}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                      QUESTION
                    </p>
                    <h3 className="text-base font-semibold leading-relaxed text-slate-100 sm:text-lg">
                      {renderWithCode(currentQuestion.question)}
                    </h3>
                  </div>

                  <div className="grid gap-2">
                    {currentQuestion.choices.map((choice, idx) => {
                      const isSelected = selectedIndex === idx;
                      const correctIdx = deobfuscateCorrectIndex(
                        currentQuestion._protected
                      );
                      const isCorrectChoice = isAnswered && idx === correctIdx;
                      const isWrongSelected =
                        isAnswered && isSelected && idx !== correctIdx;

                      let baseClasses =
                        "w-full text-left rounded-xl border px-3 py-2 text-sm sm:text-base transition-all focus:outline-none";
                      let stateClasses =
                        "border-slate-700/80 bg-slate-900/80 text-slate-100 hover:border-slate-500/80";

                      if (isCorrectChoice) {
                        stateClasses =
                          "border-emerald-500/70 bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/60";
                      } else if (isWrongSelected) {
                        stateClasses =
                          "border-rose-500/70 bg-rose-500/20 text-rose-100 ring-1 ring-rose-400/70";
                      } else if (isSelected && !isAnswered) {
                        stateClasses =
                          "border-yellow-500/80 bg-yellow-500/20 text-yellow-100 ring-1 ring-yellow-400/60";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelect(idx)}
                          className={`${baseClasses} ${stateClasses}`}
                        >
                          <span className="mr-2 inline-block rounded-md bg-slate-800/90 px-2 py-0.5 text-xs text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="align-middle">
                            {renderWithCode(choice.text)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-3 space-y-2 text-sm border rounded-xl bg-slate-900/90 border-slate-700/80">
                      <p
                        className={`font-semibold ${
                          isCorrect ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {isCorrect
                          ? "✅ Bonne réponse !"
                          : "❌ Mauvaise réponse."}
                      </p>
                      <p className="leading-relaxed text-slate-200">
                        {renderWithCode(
                          currentQuestion.choices[selectedIndex].explanation
                        )}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="px-4 py-2 text-xs font-semibold border rounded-lg border-slate-700 bg-slate-900/90 text-slate-200 hover:border-slate-500 sm:text-sm"
                    >
                      Recommencer
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold sm:text-sm ${
                        isAnswered
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md shadow-yellow-500/30 hover:brightness-110"
                          : "cursor-not-allowed bg-slate-800 text-slate-500"
                      }`}
                    >
                      {currentIndex + 1 === total
                        ? "Voir le résultat"
                        : "Question suivante"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-200">
                  Aucune question disponible.
                </p>
              )}
            </GradientBorder>
          </div>
        ) : (
          <div className="mt-2 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 pb-4 space-y-4">
            {difficulty === "hard" ? (
              <AdvancedSummary
                score={finalScore}
                total={total}
                answers={answers}
                timeSpent={timeSpent}
                onRestart={handleRestart}
                onBackToPlanet={handleBackToPlanet}
              />
            ) : showFullStats && globalStats ? (
              <div className="space-y-4">
                <GradientBorder color="from-purple-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-purple-200">
                        📊 Statistiques globales
                      </h3>
                      <button
                        onClick={() => setShowFullStats(false)}
                        className="px-3 py-1 text-sm border rounded-lg border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white"
                      >
                        Retour
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="p-3 border rounded-lg bg-slate-900/50 border-slate-700">
                        <p className="text-xs text-slate-400">Quiz complétés</p>
                        <p className="text-2xl font-bold text-yellow-300">
                          {globalStats.totalQuizzes}
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg bg-slate-900/50 border-slate-700">
                        <p className="text-xs text-slate-400">Score moyen</p>
                        <p className="text-2xl font-bold text-orange-300">
                          {globalStats.averageScore}%
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg bg-slate-900/50 border-slate-700">
                        <p className="text-xs text-slate-400">Meilleur score</p>
                        <p className="text-2xl font-bold text-cyan-300">
                          {globalStats.bestScore}%
                        </p>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-slate-900/50 border-slate-700">
                      <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
                        Par niveau
                      </p>
                      <div className="space-y-2 text-sm">
                        {Object.entries(globalStats.byDifficulty).map(
                          ([diff, data]) =>
                            data.count > 0 && (
                              <div
                                key={diff}
                                className="flex justify-between text-slate-300"
                              >
                                <span className="capitalize">{diff}</span>
                                <span>
                                  {data.count} quiz • Moy: {data.avgScore}% •
                                  Max: {data.bestScore}%
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </GradientBorder>
              </div>
            ) : (
              <QuickSummary
                score={finalScore}
                total={total}
                difficulty={difficulty}
                onNextLevel={handleNextLevel}
                onRestart={handleRestart}
                onViewFullStats={() => setShowFullStats(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}