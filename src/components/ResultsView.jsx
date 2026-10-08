import React from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Layers,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { exportToPDF, exportToText, exportToJSON } from '../utils/export';
import { QUESTIONS, BLOCK_8_QUESTIONS } from '../data/questions';

export default function ResultsView({ results, answers, notes = {}, block8, onRestart }) {
  const [showFullGabarito, setShowFullGabarito] = React.useState(false);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [showCalcModal, setShowCalcModal] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Show if scrolled more than 80%
      if (scrollPosition >= documentHeight * 0.8) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper para cor de badge
  const getBadgeColor = (label) => {
    if (label.includes("esquerda")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    if (label.includes("direita")) {
      return "bg-sky-500/10 text-sky-400 border-sky-500/30";
    }
    return "bg-amber-500/10 text-amber-300 border-amber-500/30";
  };

  const getBarColor = (label) => {
    if (label.includes("esquerda")) return "from-rose-500 to-red-600";
    if (label.includes("direita")) return "from-sky-500 to-indigo-600";
    return "from-amber-400 to-orange-500";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      
      <div id="report-content" className="space-y-8">
      {/* Banner Principal com Tendência e Ressalva */}
      <div className="bg-transparent sm:bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-none sm:border border-indigo-500/30 rounded-none sm:rounded-3xl p-2 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 hidden sm:block"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-300">
            Diagnóstico Final Concluído
          </div>
          <span className="text-xs text-slate-400">40 questões analisadas + Bloco de Decisão</span>
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Tendência Predominante</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2 sm:gap-3">
            <span>{results.generalLabel}</span>
            <span className="text-slate-500 font-light">-</span>
            <span className="text-2xl sm:text-3xl font-medium text-slate-300">
              Média {results.generalAverage.toFixed(1)}
            </span>
          </h1>

          {/* Ressalva Obrigatória */}
          <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 text-sm sm:text-base text-slate-300 italic bg-indigo-950/20 rounded-r-xl">
            "{results.disclaimer}"
          </blockquote>

          {/* Síntese Sintética (Regra de ouro: não dizer X% de direita) */}
          <div className="pt-4 border-t border-slate-800">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              Síntese Multidimensional:
            </p>
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              {results.syntheticPhrase}
            </p>
          </div>
        </div>
      </div>

        {/* Botões de Download e Compartilhamento */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => exportToPDF(results, answers, notes, block8, false)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Baixar Relatório 
            </button>
            <button
              onClick={() => exportToPDF(results, answers, notes, block8, true)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all"
            >
              <Download className="w-4 h-4" />
              Relatório + Gabarito
            </button>

            <button
              onClick={() => exportToText(results, answers, notes, block8)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all hidden sm:flex"
            >
              <FileText className="w-4 h-4" />
              TXT
            </button>
            <button
              onClick={() => exportToJSON(results, answers, notes, block8)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all hidden sm:flex"
            >
              <Layers className="w-4 h-4" />
              Exportar JSON
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCalcModal(true)}
              className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 px-3 py-2 rounded-lg hover:bg-indigo-500/10 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Como o cálculo é feito?
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Refazer Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Contextualidade e Princípios Prioritários */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Grau de Contextualidade */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Segunda Camada</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${results.contextuality.grade === 'Alto' ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' :
                results.contextuality.grade === 'Baixo' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                  'bg-blue-500/10 text-blue-300 border-blue-500/30'
              }`}>
              Grau {results.contextuality.grade}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            {results.contextuality.profileStyle}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {results.contextuality.description}
          </p>

          <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Cenários com resposta "Depende":</span>
            <span className="font-mono font-semibold text-indigo-300">{results.contextuality.choseDependeCount} de 7 cenários</span>
          </div>
        </div>

        {/* 3. Princípios Prioritários (Bloco 8) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Princípios & Tomada de Decisão</span>
            <span className="text-xs text-slate-400">Bloco 8</span>
          </div>

          <h3 className="text-xl font-bold text-white">Princípios Escolhidos</h3>

          <div className="flex flex-wrap gap-2">
            {results.principles.selected.length > 0 ? (
              results.principles.selected.map((p, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 rounded-xl text-xs sm:text-sm font-medium text-indigo-200">
                  {p}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500 italic">Nenhum princípio selecionado.</span>
            )}
          </div>

          {results.principles.coherenceNote && (
            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
              <span className="text-indigo-400 font-semibold">Análise de coerência:</span> {results.principles.coherenceNote}
            </p>
          )}

          {results.principles.contextFactors.length > 0 && (
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-300 font-medium">Fatores de contexto decisivos:</span> {results.principles.contextFactors.join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* 4. Posicionamento por Dimensão (Tabela e Barras Gráficas) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">1. Posicionamento por Dimensão</h2>
          <p className="text-sm text-slate-400 mt-1">
            Cada área temática calculada individualmente, respeitando a direção ideológica de cada afirmação.
          </p>
        </div>

        <div className="space-y-4">
          {Object.values(results.dimensions).map((dim) => {
            const percentage = ((dim.average - 1) / 4) * 100; // 1 -> 0%, 5 -> 100%
            return (
              <div
                key={dim.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-semibold text-white">{dim.title}</h4>
                    <p className="text-xs text-slate-400">{dim.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-slate-300">{dim.average.toFixed(1)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(dim.label)}`}>
                      {dim.label}
                    </span>
                  </div>
                </div>

                {/* Barra de espectro visual */}
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getBarColor(dim.label)} transition-all duration-700`}
                      style={{ width: `${Math.max(6, Math.min(100, percentage))}%` }}
                    />
                    {/* Marcador central */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-600/50" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 px-0.5 font-medium">
                    <span>Tendência à esquerda (1.0)</span>
                    <span>Centro (3.0)</span>
                    <span>Tendência à direita (5.0)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Gabarito Resumido com Toggle */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-indigo-400" />
              Gabarito Resumido das Respostas
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Confira a marcação exata das 40 questões respondidas.
            </p>
          </div>
          <button
            onClick={() => setShowFullGabarito(!showFullGabarito)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            {showFullGabarito ? (
              <>Recolher Gabarito <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Visualizar Todas as 40 Respostas <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>

        {showFullGabarito && (
          <div className="space-y-3 pt-4 border-t border-slate-800 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {QUESTIONS.map((q) => {
              const ans = answers[q.id];
              let answerLabel = "Não respondida";

              if (q.type === 'likert') {
                const map = {
                  1: "1 — Discordo totalmente",
                  2: "2 — Discordo parcialmente",
                  3: "3 — Depende / posição intermediária",
                  4: "4 — Concordo parcialmente",
                  5: "5 — Concordo totalmente"
                };
                answerLabel = map[ans] || "—";
              } else if (q.type === 'scenario') {
                const opt = q.options.find(o => o.id === ans);
                answerLabel = opt ? `(${opt.id}) ${opt.text}` : "—";
              }

              const noteText = notes[q.id];

              return (
                <div
                  key={q.id}
                  className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col gap-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 max-w-xl">
                      <span className="font-mono font-bold text-indigo-400 mr-2">Q{q.id}.</span>
                      <span className="text-slate-300">{q.text}</span>
                    </div>
                    <div className="shrink-0 font-medium sm:text-right">
                      <span className="text-slate-400 block text-[10px] uppercase">Sua Escolha:</span>
                      <span className="text-indigo-300 font-semibold">{answerLabel}</span>
                    </div>
                  </div>

                  {noteText && (
                    <div className="pt-2 border-t border-slate-900 flex items-start gap-2 text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/50">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">
                          Sua Justificativa / Complemento:
                        </span>
                        <p className="text-slate-300 italic whitespace-pre-wrap">{noteText}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Botão flutuante para voltar ao topo */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 shadow-2xl transition-all z-50 hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-5"
          title="Voltar ao Topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      {/* Modal: Entenda o Cálculo */}
      {showCalcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 sm:border border-slate-700 sm:rounded-2xl p-6 sm:p-8 w-full h-full sm:h-auto sm:max-h-[85vh] max-w-2xl overflow-y-auto space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowCalcModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center gap-3 text-indigo-400">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white">Como seu resultado foi calculado?</h2>
            </div>
            
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>O <strong>Mapeamento Ideológico</strong> não soma simplesmente "pontos de direita e esquerda". Ele funciona através de um modelo <strong>multidimensional</strong>:</p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Layers className="w-4 h-4 text-sky-400" /> 1. Eixos Independentes</h3>
                <p>O quiz é dividido em 7 áreas (Economia, Segurança, Costumes, etc.). Cada resposta que você dá movimenta seu "peso" em uma escala de 1 a 5 apenas dentro daquela área específica. Por isso você pode ser avaliado como Centro em Economia, mas Direita em Segurança, sem que um anule o outro.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 2. O Peso da Contextualidade</h3>
                <p>Nós medimos quantas vezes você optou por <strong>cenários condicionais</strong> (a alternativa "Depende"). Se você tem um alto número de "Dependes", o algoritmo entende que seu perfil é pragmático e flexível. Se você evita o "Depende", seu perfil é principialista e ideologicamente rígido. Isso afeta o seu <em>Grau de Contextualidade</em>.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 3. Análise de Coerência</h3>
                <p>No Bloco 8, você selecionou seus princípios fundamentais. O algoritmo cruza o princípio que você disse ser o mais importante (ex: Liberdade) com as respostas dadas ao longo do teste (ex: Você realmente defendeu liberdade de mercado e costumes?). Isso gera a análise final de coerência.</p>
              </div>

              <p className="italic text-slate-400 pt-2 text-xs text-center">A matemática utiliza médias ponderadas aplicadas aos pesos predefinidos de cada alternativa.</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowCalcModal(false)} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all">
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
