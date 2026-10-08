import React from 'react';
import { Sparkles, Layers, CheckCircle2, ChevronRight, BookOpen, Info } from 'lucide-react';
import { DIMENSIONS } from '../data/questions';
import { AuroraText } from './AuroraText';


export default function WelcomeModal({ onStart }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Mapeamento <AuroraText>Ideológico</AuroraText>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Uma avaliação aprofundada em 7 dimensões independentes, medindo não apenas suas inclinações, mas seu grau de coerência e contextualidade.
        </p>
      </div>

      {/* Regras e Como Responder */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Como responder com precisão
        </h2>

        <div className="space-y-3">
          <p className="text-sm text-slate-300 font-medium">Para as afirmações, utilize a escala de 1 a 5:</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="font-bold text-rose-400 block text-sm">1</span>
              <span className="text-slate-300">Discordo totalmente</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="font-bold text-amber-400 block text-sm">2</span>
              <span className="text-slate-300">Discordo parcialmente</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 text-center space-y-1">
              <span className="font-bold text-indigo-300 block text-sm">3</span>
              <span className="text-slate-300 font-semibold">Depende / Intermediária</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="font-bold text-sky-400 block text-sm">4</span>
              <span className="text-slate-300">Concordo parcialmente</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="font-bold text-emerald-400 block text-sm">5</span>
              <span className="text-slate-300">Concordo totalmente</span>
            </div>
          </div>
        </div>

        {/* Nota de Destaque sobre o 3 */}
        <div className="relative p-5 rounded-2xl bg-indigo-950/20 border-l-4 border-l-indigo-500 border-t border-r border-b border-indigo-500/10 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-indigo-400">
            <Info className="w-4 h-4" />
            <span className="font-bold text-[11px] uppercase tracking-widest">Nota Importante</span>
          </div>
          <p className="text-sm text-indigo-100/80 leading-relaxed pl-6">
            O número <strong className="text-indigo-200">3 não significa necessariamente indecisão</strong>. Use-o quando sua posição realmente depender de condições, contexto ou circunstâncias.
          </p>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Questões com Cenário:</strong> Escolha a alternativa (A, B, C ou D) que melhor traduz sua tomada de decisão.</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Bloco Final:</strong> 3 perguntas complementares sobre princípios e balanço de efeitos.</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Exportação Completa:</strong> Baixe seu resultado e gabarito em PDF diagramado, TXT ou JSON ao concluir.</span>
          </p>
        </div>

        {/* CTA Iniciar */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white font-extrabold text-base tracking-wide transition-all duration-200 active:scale-95 active:brightness-90"
          >
            Iniciar Questionário
          </button>
        </div>
      </div>
    </div>
  );
}
