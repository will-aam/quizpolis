import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquarePlus,
  HelpCircle,
  X
} from 'lucide-react';
import { LIKERT_OPTIONS, DIMENSIONS } from '../data/questions';
import { EXPLANATIONS } from '../data/explanations.jsx';

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  currentNote,
  onSelectAnswer,
  onSaveNote,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev
}) {
  const [showExplanation, setShowExplanation] = React.useState(false);
  const dimensionInfo = Object.values(DIMENSIONS).find(d => d.id === question.dimension);
  const explanation = EXPLANATIONS[question.id];

  // Fechar modal ao trocar de questão
  useEffect(() => {
    setShowExplanation(false);
  }, [question.id]);

  // Teclas numéricas para responder rápido
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'textarea' || tag === 'input') return;

      if (question.type === 'likert') {
        const val = parseInt(e.key);
        if (val >= 1 && val <= 5) onSelectAnswer(val);
      } else if (question.type === 'scenario') {
        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(key)) onSelectAnswer(key);
      }
      if (e.key === 'ArrowRight' && canGoNext) onNext();
      if (e.key === 'ArrowLeft' && canGoPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, canGoNext, canGoPrev, onSelectAnswer, onNext, onPrev]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 py-4">

      {/* Header Minimalista */}
      <header className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-5">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-500">
            <span>Bloco {question.block}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-indigo-400">{dimensionInfo?.title}</span>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-slate-500 font-mono uppercase">
            Questão {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {question.isConditional && (
          <span className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            Cenário Condicional
          </span>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-100 leading-snug sm:leading-tight">
            {question.text}
          </h2>
          {explanation && (
            <div>
              <button
                onClick={() => setShowExplanation(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 border border-indigo-500/20 transition-colors shrink-0 text-xs font-bold uppercase tracking-wider"
              >
                <HelpCircle className="w-4 h-4" />
                Entenda a questão
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Opções de Resposta */}
      <section>
        {question.type === 'likert' && (
          <div className="flex flex-col sm:flex-row gap-2.5">
            {LIKERT_OPTIONS.map((opt) => {
              const isSelected = currentAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectAnswer(opt.value)}
                  className={`group flex-1 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-2 px-4 py-3 sm:py-3.5 rounded-xl border transition-all duration-200 ${isSelected
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300'
                      : 'bg-transparent border-slate-800/80 text-slate-400 hover:border-slate-600 hover:bg-slate-900/50'
                    }`}
                >
                  <span className={`text-xl font-medium font-mono ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {opt.value}
                  </span>
                  <span className={`text-[11px] sm:text-[10px] font-bold tracking-wider uppercase whitespace-nowrap ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {opt.short}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'scenario' && (
          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const isSelected = currentAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectAnswer(opt.id)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-5 ${isSelected
                      ? 'bg-indigo-600/10 border-indigo-500/50'
                      : 'bg-transparent border-slate-800/80 hover:border-slate-600 hover:bg-slate-900/50'
                    }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm shrink-0 transition-colors ${isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                    {opt.id}
                  </span>
                  <span className={`text-base sm:text-lg leading-relaxed pt-0.5 ${isSelected ? 'text-indigo-100 font-medium' : 'text-slate-300'
                    }`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Notas / Justificativa Minimalista */}
      <section className="pt-4">
        <label htmlFor={`notes-${question.id}`} className="group flex flex-col gap-3 cursor-text">
          <div className="flex items-center gap-2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <MessageSquarePlus className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Adicionar Nota (Opcional)
            </span>
          </div>
          <textarea
            id={`notes-${question.id}`}
            rows={1}
            value={currentNote || ''}
            onChange={(e) => onSaveNote && onSaveNote(e.target.value)}
            placeholder="Escreva aqui qualquer contexto adicional..."
            className="w-full bg-transparent border-b border-slate-800 focus:border-indigo-500 py-3 text-sm sm:text-base text-slate-200 placeholder:text-slate-700 focus:outline-none transition-colors resize-none overflow-hidden min-h-[44px]"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </label>
      </section>

      {/* Navegação */}
      <nav className="flex items-center justify-between pt-8 border-t border-slate-800/60 mt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`flex items-center gap-3 py-3 pr-4 text-sm font-bold tracking-wide transition-all ${canGoPrev
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-700 cursor-not-allowed'
            }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${canGoNext
              ? 'bg-white text-slate-950 hover:bg-slate-200 active:scale-95'
              : 'bg-slate-900 text-slate-600 cursor-not-allowed'
            }`}
        >
          <span>{currentIndex === totalQuestions - 1 ? "Prosseguir" : "Próxima"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </nav>

      {/* Modal Entenda a Questão */}
      {showExplanation && explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 sm:border border-slate-700 sm:rounded-2xl p-6 sm:p-8 w-full h-full sm:h-auto sm:max-h-[85vh] max-w-3xl overflow-y-auto space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowExplanation(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 text-indigo-400">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white">Entenda a Questão</h2>
            </div>
            
            <div className="mt-4">
              {explanation}
            </div>

            <div className="pt-6 mt-6 flex justify-end border-t border-slate-800">
              <button 
                onClick={() => setShowExplanation(false)} 
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all w-full sm:w-auto text-center"
              >
                Voltar para a pergunta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
