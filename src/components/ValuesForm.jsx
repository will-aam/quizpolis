import React from 'react';
import { ArrowRight, ArrowLeft, Star, AlertTriangle } from 'lucide-react';
import { VALUES_LIST } from '../data/dimensionsMap';

export default function ValuesForm({ selectedValues, onChange, onNext, onPrev }) {
  const isComplete = selectedValues.length === 4;

  const handleToggle = (valId) => {
    if (selectedValues.includes(valId)) {
      onChange(selectedValues.filter(id => id !== valId));
    } else {
      if (selectedValues.length < 4) {
        onChange([...selectedValues, valId]);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
        <Star className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative z-10">Prioridade de Valores</h2>
        <p className="text-slate-300 relative z-10">
          Para refinar seu perfil político, selecione exatamente <strong>4 princípios</strong> que você considera os mais importantes para orientar decisões públicas.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Valores Fundamentais
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isComplete ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
          }`}>
            {selectedValues.length} de 4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {VALUES_LIST.map((val) => {
            const isSelected = selectedValues.includes(val.id);
            const isDisabled = !isSelected && selectedValues.length >= 4;

            return (
              <button
                key={val.id}
                onClick={() => handleToggle(val.id)}
                disabled={isDisabled}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                    : isDisabled
                    ? 'bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                  isSelected ? 'bg-indigo-500 border-indigo-400' : 'border-slate-600'
                }`}>
                  {isSelected && <Star className="w-3 h-3 text-white fill-white" />}
                </div>
                <span className="font-medium text-sm">{val.text}</span>
              </button>
            );
          })}
        </div>

        {!isComplete && selectedValues.length > 0 && (
          <div className="mb-8 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-amber-200/80 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>Selecione mais {4 - selectedValues.length} {4 - selectedValues.length === 1 ? 'valor' : 'valores'} para prosseguir.</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={onPrev}
            className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2 ${
              isComplete
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            Gerar Diagnóstico
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
