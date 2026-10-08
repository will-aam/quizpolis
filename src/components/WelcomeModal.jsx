import React from 'react';
import { Sparkles, Layers, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { DIMENSIONS } from '../data/questions';

export default function WelcomeModal({ onStart }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Diagnóstico Multidimensional Avançado
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Quiz de Alinhamento <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-sky-400">Político</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Uma avaliação aprofundada em 7 dimensões independentes, medindo não apenas suas inclinações, mas seu grau de coerência e contextualidade.
        </p>
      </div>

      {/* Regras e Como Responder */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
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
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
          <span className="p-1 rounded-lg bg-indigo-500/20 font-bold text-xs uppercase tracking-wide">Importante</span>
          <p>
            O número <strong>3 não significa necessariamente indecisão</strong>. Use-o quando sua posição realmente depender de condições, contexto ou circunstâncias.
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>Iniciar Questionário</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
