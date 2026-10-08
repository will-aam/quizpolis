import React, { useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Layers, 
  Check, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { LIKERT_OPTIONS, DIMENSIONS } from '../data/questions';

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
  const dimensionInfo = Object.values(DIMENSIONS).find(d => d.id === question.dimension);

  // Teclas numéricas para responder rápido (1 a 5 ou A-D), exceto se estiver digitando em campo de texto
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignorar se o foco estiver no textarea ou input
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'textarea' || tag === 'input') return;

      if (question.type === 'likert') {
        const val = parseInt(e.key);
        if (val >= 1 && val <= 5) {
          onSelectAnswer(val);
        }
      } else if (question.type === 'scenario') {
        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(key)) {
          onSelectAnswer(key);
        }
      }
      if (e.key === 'ArrowRight' && canGoNext) {
        onNext();
      }
      if (e.key === 'ArrowLeft' && canGoPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, canGoNext, canGoPrev, onSelectAnswer, onNext, onPrev]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Badge de Bloco & Dimensão */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold tracking-wide uppercase">
            Bloco {question.block}
          </span>
          <span className="text-slate-400 font-medium">
            {dimensionInfo?.title}
          </span>
        </div>

        <span className="font-mono text-slate-400 text-xs">
          Questão {currentIndex + 1} de {totalQuestions}
        </span>
      </div>

      {/* Cartão da Questão */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative space-y-8">
        {/* Cabeçalho da questão */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300 font-mono">
              {question.id}
            </span>
            {question.isConditional && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                Questão Condicional / Cenário
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-tight">
            {question.text}
          </h3>
        </div>

        {/* Respostas Likert (1 a 5) */}
        {question.type === 'likert' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Escolha sua posição (ou pressione 1 a 5 no teclado):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {LIKERT_OPTIONS.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSelectAnswer(opt.value);
                    }}
                    className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[92px] ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-sm font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-indigo-300'}`}>
                        {opt.value}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-xs font-medium mt-2 leading-tight">
                      {opt.short}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dica para o número 3 */}
            <p className="text-[11px] text-slate-400 italic pt-1 text-center">
              Lembre-se: o 3 representa que sua posição varia conforme as condições ou contexto do caso.
            </p>
          </div>
        )}

        {/* Respostas Cenário (A, B, C, D) */}
        {question.type === 'scenario' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Qual alternativa melhor representa sua postura?
            </p>

            <div className="space-y-2.5">
              {question.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectAnswer(opt.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Campo opcional de complemento / justificativa */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={`notes-${question.id}`} className="text-slate-300 font-medium flex items-center gap-1.5">
              <span>Complemento ou justificativa (opcional):</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {(currentNote || '').length} caracteres
            </span>
          </div>
          <textarea
            id={`notes-${question.id}`}
            rows={2}
            value={currentNote || ''}
            onChange={(e) => onSaveNote && onSaveNote(e.target.value)}
            placeholder="Se desejar, explique suas razões, condições ou nuances para complementar sua resposta..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
          />
        </div>

        {/* Barra de Ações Inferior */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canGoPrev}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              canGoPrev
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={currentAnswer === undefined || currentAnswer === null}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
              currentAnswer !== undefined && currentAnswer !== null
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-105 active:scale-95'
                : 'bg-slate-800/60 border border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === totalQuestions - 1 ? "Prosseguir para Bloco 8" : "Próxima"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
