import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { BLOCK_8_QUESTIONS } from '../data/questions';

export default function Block8Form({ data, onChange, onFinish, onPrev }) {
  const currentData = data || { A: [], B: null, C: [] };

  const handleToggleA = (option) => {
    const prev = currentData.A || [];
    if (prev.includes(option)) {
      onChange({ ...currentData, A: prev.filter(item => item !== option) });
    } else {
      if (prev.length < 3) {
        onChange({ ...currentData, A: [...prev, option] });
      }
    }
  };

  const handleSelectB = (val) => {
    onChange({ ...currentData, B: val });
  };

  const handleToggleC = (factor) => {
    const prev = currentData.C || [];
    if (prev.includes(factor)) {
      onChange({ ...currentData, C: prev.filter(item => item !== factor) });
    } else {
      onChange({ ...currentData, C: [...prev, factor] });
    }
  };

  const isComplete = (currentData.A && currentData.A.length > 0) && (currentData.B !== null && currentData.B !== undefined);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Cabeçalho do Bloco 8 */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          Etapa Final • Bloco 8
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Princípios e Tomada de Decisão</h2>
        <p className="text-sm text-slate-400">
          Estas três perguntas finais complementam a calibração do seu perfil político e grau de contextualidade.
        </p>
      </div>

      {/* Questão A */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">{BLOCK_8_QUESTIONS.A.title}</h3>
          <p className="text-sm text-slate-300 mt-1">{BLOCK_8_QUESTIONS.A.instruction}</p>
          <span className="text-xs text-indigo-400 font-medium">
            Selecionados: {(currentData.A || []).length} / 3
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BLOCK_8_QUESTIONS.A.options.map((opt) => {
            const isSelected = (currentData.A || []).includes(opt);
            const isDisabled = !isSelected && (currentData.A || []).length >= 3;

            return (
              <button
                key={opt}
                type="button"
                disabled={isDisabled}
                onClick={() => handleToggleA(opt)}
                className={`p-3.5 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                    : isDisabled
                    ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questão B */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">{BLOCK_8_QUESTIONS.B.title}</h3>
          <p className="text-sm text-slate-300 mt-1">{BLOCK_8_QUESTIONS.B.instruction}</p>
        </div>

        <div className="space-y-2">
          {BLOCK_8_QUESTIONS.B.options.map((opt) => {
            const isSelected = currentData.B === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelectB(opt.value)}
                className={`w-full p-4 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questão C */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">{BLOCK_8_QUESTIONS.C.title}</h3>
          <p className="text-sm text-slate-300 mt-1">{BLOCK_8_QUESTIONS.C.instruction}</p>
          <span className="text-xs text-slate-400">Escolha quantos julgar relevantes:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BLOCK_8_QUESTIONS.C.options.map((factor) => {
            const isSelected = (currentData.C || []).includes(factor);
            return (
              <button
                key={factor}
                type="button"
                onClick={() => handleToggleC(factor)}
                className={`p-3.5 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{factor}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navegação */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
        >
          Voltar às Questões
        </button>

        <button
          type="button"
          onClick={onFinish}
          disabled={!isComplete}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
            isComplete
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
          }`}
        >
          Gerar Meu Diagnóstico Completo →
        </button>
      </div>
    </div>
  );
}
