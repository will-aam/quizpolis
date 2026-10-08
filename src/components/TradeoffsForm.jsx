import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TRADE_OFF_QUESTIONS } from '../data/dimensionsMap';

export default function TradeoffsForm({ tradeoffAnswers, onAnswer, onNext, onPrev }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQ = TRADE_OFF_QUESTIONS[currentIndex];
  const hasAnswered = !!tradeoffAnswers[currentQ.id];

  const handleNext = () => {
    if (currentIndex < TRADE_OFF_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo(0, 0);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo(0, 0);
    } else {
      onPrev();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 text-center">
        <ShieldAlert className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Conflito de Valores</h2>
        <p className="text-slate-300">
          Você definiu suas posições. Agora, o que acontece quando duas coisas boas entram em conflito? Escolha a prioridade nos cenários abaixo.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
          <span>Cenário {currentIndex + 1} de {TRADE_OFF_QUESTIONS.length}</span>
          <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">Trade-off</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
          {currentQ.text}
        </h3>

        <div className="space-y-3 mb-10">
          {currentQ.options.map((opt) => {
            const isSelected = tradeoffAnswers[currentQ.id] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onAnswer(currentQ.id, opt.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex gap-4 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-900/50'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-white' : 'border-slate-600'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`text-base sm:text-lg font-medium leading-relaxed ${
                  isSelected ? 'text-white' : 'text-slate-300'
                }`}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={handlePrev}
            className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className={`px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2 ${
              hasAnswered
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {currentIndex === TRADE_OFF_QUESTIONS.length - 1 ? 'Avançar para Valores' : 'Próximo Cenário'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
