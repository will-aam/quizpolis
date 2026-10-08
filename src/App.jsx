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
  Info
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

  // Estatísticas de progresso
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div 
          onClick={() => currentScreen !== 'quiz' && setCurrentScreen('welcome')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Quizpolis
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono">
                Multidimensional
              </span>
            </span>
          </div>
        </div>

        {/* Status bar quando no quiz */}
        {currentScreen === 'quiz' && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="text-slate-400 font-medium">Progresso do questionário</span>
              <span className="font-mono text-indigo-300 font-semibold">{answeredCount} de {QUESTIONS.length} respondidas ({progressPercent}%)</span>
            </div>

            <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Botão de reset rápido no header */}
        {currentScreen !== 'welcome' && (
          <button
            onClick={handleRestart}
            title="Reiniciar Questionário"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/70 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {currentScreen === 'welcome' && (
          <WelcomeModal onStart={handleStart} />
        )}

        {currentScreen === 'quiz' && currentQuestion && (
          <div className="space-y-6">
            {/* Seletor rápido de blocos (Navegação contextual) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
              {[1, 2, 3, 4, 5, 6, 7].map((bNum) => {
                const bQuestions = QUESTIONS.filter(q => q.block === bNum);
                const isCurrentBlock = currentQuestion.block === bNum;
                const answeredInBlock = bQuestions.filter(q => answers[q.id] !== undefined).length;
                const isBlockDone = answeredInBlock === bQuestions.length;

                return (
                  <button
                    key={bNum}
                    onClick={() => {
                      const firstQIndex = QUESTIONS.findIndex(q => q.block === bNum);
                      if (firstQIndex !== -1) setCurrentQuestionIndex(firstQIndex);
                    }}
                    className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isCurrentBlock
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                        : isBlockDone
                        ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>Bloco {bNum}</span>
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
