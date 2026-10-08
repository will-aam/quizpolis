import React from 'react';
import { 
  Download, 
  FileText, 
  ArrowRight, 
  Layers, 
  ChevronDown,
  ArrowUp,
  ShieldCheck,
  Star,
  Activity,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { exportToPDF, exportToText, exportToJSON } from '../utils/export_v2';
import { QUESTIONS } from '../data/questions';
import { VALUES_LIST } from '../data/dimensionsMap';

export default function ResultsViewV2({ results, answers, notes = {}, tradeoffAnswers, selectedValues, onRestart }) {
  const [showFullGabarito, setShowFullGabarito] = React.useState(false);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [showCalcModal, setShowCalcModal] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      if (scrollPosition > (documentHeight - windowHeight) * 0.8) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper para cor de barra
  const getBarGradient = (score) => {
    if (score > 60) return "from-sky-500 to-indigo-600";
    if (score < 40) return "from-rose-500 to-red-600";
    return "from-amber-400 to-orange-500";
  };

  const getValuesText = () => {
    return selectedValues.map(v => {
      const val = VALUES_LIST.find(item => item.id === v);
      return val ? val.text : v;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div id="report-content" className="space-y-8">
        
        {/* CABEÇALHO DO PERFIL */}
        <div className="bg-transparent sm:bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-none sm:border border-indigo-500/30 rounded-none sm:rounded-3xl p-2 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 hidden sm:block"></div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-300">
              Diagnóstico Multidimensional V2
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Perfil Político</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span>{results.generalLabel}</span>
            </h1>
          </div>
        </div>

        {/* ESTRUTURA DE 2 COLUNAS: VALORES e ESTILO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valores */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
              <Star className="w-5 h-5" />
              <h3 className="font-bold text-lg text-white">Valores Predominantes</h3>
            </div>
            <ul className="space-y-3">
              {getValuesText().map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="font-medium text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estilo Político */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Activity className="w-5 h-5" />
              <h3 className="font-bold text-lg text-white">Estilo Político</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  <span>Pragmatismo</span>
                  <span className="text-indigo-400">{results.pragmatism.score}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${results.pragmatism.score}%` }}
                  />
                </div>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl">
                <h4 className="text-indigo-300 font-bold mb-2">{results.pragmatism.style}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {results.pragmatism.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIMENSÕES - BARRAS DE 0 a 100 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Posicionamento por Eixo</h2>
            <p className="text-sm text-slate-400">Como você se localiza em cada dimensão ideológica independente (0 a 100).</p>
          </div>

          <div className="space-y-8">
            {Object.keys(results.dimensions).map(axisKey => {
              const axis = results.dimensions[axisKey];
              return (
                <div key={axisKey} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-slate-200">{axis.name}</h3>
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{axis.label}</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-white">{axis.score}</span>
                  </div>

                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                    {/* Linha do centro */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600/50 z-10" />
                    
                    {/* Barra de progresso */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r ${getBarGradient(axis.score)} transition-all duration-1000`}
                      style={{ width: `${axis.score}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>{axis.leftLabel}</span>
                    <span>{axis.rightLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTROLES / BOTÕES */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => exportToPDF(results, answers, notes, tradeoffAnswers, selectedValues, false)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Baixar Relatório 
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
              <h2 className="text-xl font-bold text-white">Nova Arquitetura V2</h2>
            </div>
            
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>O <strong>Quizpolis V2</strong> não tenta adivinhar se você é "Esquerda" ou "Direita" em uma única linha reta. Ele divide sua ideologia em <strong>3 camadas</strong>:</p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Layers className="w-4 h-4 text-sky-400" /> 1. Camada A — Posição (Os 7 Eixos)</h3>
                <p>O quiz avalia de 0 a 100 a sua inclinação em 7 temas vitais e independentes (Economia, Tributação, Liberdade, etc). Cada resposta tem pesos diferentes: responder a favor do mercado pontua no eixo 'Economia', mas responder 'Depende' não afeta a sua posição ideológica, apenas seu pragmatismo.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> 2. Camada B — Valores Principais</h3>
                <p>Medimos não apenas o que você acha das políticas, mas os ideais que você coloca em primeiro lugar na hora de tomar decisões difíceis (ex: Proteção Social x Crescimento).</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> 3. Camada C — Estilo Político (Pragmatismo)</h3>
                <p>Capturamos as vezes em que você escolheu respostas mediadoras, condicionais e de *trade-off* (concessões). Isso gera seu índice de Pragmatismo, diferenciando dogmáticos que repetem discursos daqueles que ajustam a política ao contexto.</p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowCalcModal(false)} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all">
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 shadow-2xl transition-all z-50 hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-5"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
