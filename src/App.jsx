import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  HelpCircle, 
  Layers, 
  RotateCcw, 
  Compass, 
  ListOrdered,
  ChevronRight,
  Info,
  Lock,
  Check
} from 'lucide-react';

import { QUESTIONS, DIMENSIONS } from './data/questions';
import { calculateQuizResults } from './utils/scoring';
import WelcomeModal from './components/WelcomeModal';
import QuestionCard from './components/QuestionCard';
import Block8Form from './components/Block8Form';
import ResultsView from './components/ResultsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'quiz' | 'block8' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});
  const [block8, setBlock8] = useState({ A: [], B: null, C: [] });
  const [results, setResults] = useState(null);

  // Carregar do localStorage se houver progresso prévio
  useEffect(() => {
    try {
      const saved = localStorage.getItem('quizpolis_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.block8) setBlock8(parsed.block8);
      }
    } catch (e) {
      console.warn("Could not load previous session", e);
    }
  }, []);

  // Salvar no localStorage conforme o usuário responde
  useEffect(() => {
    try {
      localStorage.setItem('quizpolis_session', JSON.stringify({ answers, notes, block8 }));
    } catch (e) {
      // Ignorar erros de quota
    }
  }, [answers, notes, block8]);

  const handleStart = () => {
    setCurrentScreen('quiz');
  };

  const handleSelectAnswer = (value) => {
    const q = QUESTIONS[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [q.id]: value
    }));
  };

  const handleSaveNote = (text) => {
    const q = QUESTIONS[currentQuestionIndex];
    setNotes(prev => ({
      ...prev,
      [q.id]: text
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('block8');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    const calculated = calculateQuizResults(answers, block8);
    setResults(calculated);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Confetti comemorativo de diagnóstico gerado
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleRestart = () => {
    if (window.confirm("Deseja realmente reiniciar o quiz? Suas respostas atuais serão apagadas.")) {
      setAnswers({});
      setNotes({});
      setBlock8({ A: [], B: null, C: [] });
      setResults(null);
      setCurrentQuestionIndex(0);
      setCurrentScreen('welcome');
      localStorage.removeItem('quizpolis_session');
    }
  };

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans select-none relative">
      
      {/* Barra de Progresso Global (visível apenas durante o quiz) */}
      {(currentScreen === 'quiz' || currentScreen === 'block8') && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${currentScreen === 'block8' ? 100 : progressPercentage}%` }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {currentScreen === 'welcome' && (
          <WelcomeModal onStart={handleStart} />
        )}

        {currentScreen === 'quiz' && currentQuestion && (
          <div className="space-y-6">
            {/* Progresso de Blocos Minimalista e Restrito */}
            <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-4 scrollbar-none w-full border-b border-slate-800/40 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map((bNum) => {
                const bQuestions = QUESTIONS.filter(q => q.block === bNum);
                const isCurrentBlock = currentQuestion.block === bNum;
                const answeredInBlock = bQuestions.filter(q => answers[q.id] !== undefined).length;
                const isBlockDone = answeredInBlock === bQuestions.length;

                // Bloqueia se algum bloco anterior estiver incompleto
                let isLocked = false;
                if (bNum > 1) {
                  for (let prev = 1; prev < bNum; prev++) {
                    const prevQs = QUESTIONS.filter(q => q.block === prev);
                    const prevAnswered = prevQs.filter(q => answers[q.id] !== undefined).length;
                    if (prevAnswered < prevQs.length) {
                      isLocked = true;
                      break;
                    }
                  }
                }

                return (
                  <button
                    key={bNum}
                    disabled={isLocked}
                    onClick={() => {
                      if (!isLocked) {
                        const firstQIndex = QUESTIONS.findIndex(q => q.block === bNum);
                        if (firstQIndex !== -1) setCurrentQuestionIndex(firstQIndex);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                      isCurrentBlock
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                        : isLocked
                        ? 'bg-transparent border-slate-800/30 text-slate-600 cursor-not-allowed'
                        : isBlockDone
                        ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 opacity-60" />
                    ) : (
                      <span>Bloco {bNum}</span>
                    )}
                    <span className="font-mono text-[10px] opacity-75">
                      ({answeredInBlock}/{bQuestions.length})
                    </span>
                  </button>
                );
              })}
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS.length}
              currentAnswer={answers[currentQuestion.id]}
              currentNote={notes[currentQuestion.id]}
              onSelectAnswer={handleSelectAnswer}
              onSaveNote={handleSaveNote}
              onNext={handleNext}
              onPrev={handlePrev}
              canGoNext={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null}
              canGoPrev={currentQuestionIndex > 0}
            />
          </div>
        )}

        {currentScreen === 'block8' && (
          <Block8Form
            data={block8}
            onChange={setBlock8}
            onFinish={handleFinishQuiz}
            onPrev={() => {
              setCurrentScreen('quiz');
              setCurrentQuestionIndex(QUESTIONS.length - 1);
            }}
          />
        )}

        {currentScreen === 'results' && results && (
          <ResultsView
            results={results}
            answers={answers}
            notes={notes}
            block8={block8}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer minimalista */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-400">
        <p>
          Quizpolis • Quiz de Alinhamento Político Multidimensional. Todas as análises são processadas localmente e privadamente no seu navegador.
        </p>
      </footer>
    </div>
  );
}
