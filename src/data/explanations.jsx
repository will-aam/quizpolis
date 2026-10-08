import React from 'react';

export const EXPLANATIONS = {
  6: (
    <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
      <p>
        Essa frase é mais uma <strong>afirmação</strong> sobre política econômica, e provavelmente quer que você <strong>concorde ou discorde</strong> dela. Vou explicar por partes.
      </p>

      <div className="space-y-2">
        <h3 className="text-indigo-400 font-bold text-base">O que é recessão econômica?</h3>
        <p>Recessão é quando a economia <strong>encolhe</strong>: as pessoas consomem menos, as empresas vendem menos, produzem menos, contratam menos e o desemprego aumenta. É um ciclo vicioso: menos consumo → menos produção → menos empregos → menos consumo.</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-400 font-bold text-base">O que é déficit público?</h3>
        <p>Déficit público acontece quando o <strong>governo gasta mais do que arrecada</strong> em impostos. Para cobrir essa diferença, ele precisa <strong>pegar dinheiro emprestado</strong> (emitir dívida pública).</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-400 font-bold text-base">O que a frase está dizendo?</h3>
        <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-950/30 rounded-r-lg italic">
          "Em uma recessão, o governo deveria aceitar temporariamente um aumento do déficit para estimular a atividade econômica."
        </blockquote>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>O governo <strong>gastaria mais</strong> (ou cortaria impostos) mesmo sem ter dinheiro sobrando;</li>
          <li>Isso aumentaria o <strong>déficit</strong> e a <strong>dívida pública</strong>;</li>
          <li>Mas o objetivo seria <strong>aquecer a economia</strong>: gerar empregos, renda e consumo;</li>
          <li>E isso seria <strong>temporário</strong> — só durante a recessão.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-400 font-bold text-base">Por que alguém defenderia isso?</h3>
        <p>É a ideia de que, em uma recessão, <strong>ninguém está gastando</strong> (empresas e famílias estão com medo). Então o <strong>governo entra como comprador de última instância</strong>:</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li>Contrata pessoas;</li>
          <li>Faz obras públicas;</li>
          <li>Dá auxílios;</li>
          <li>Corta impostos.</li>
        </ul>
        <p className="mt-2">Assim, o dinheiro volta a circular, as empresas voltam a produzir e a economia se recupera. Quando a economia melhorar, o governo reduz os gastos e paga a dívida.</p>
        <p className="text-emerald-400/80 italic mt-2">Isso é basicamente o que diz o economista <strong>John Maynard Keynes</strong>: em recessão, o governo deve gastar para compensar a queda do setor privado.</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-indigo-400 font-bold text-base">Por que alguém discordaria?</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Aumentar o déficit <strong>aumenta a dívida pública</strong>, que alguém vai ter que pagar depois (mais impostos ou inflação);</li>
          <li>Pode gerar <strong>desconfiança dos investidores</strong>, fazendo o dólar subir, os juros aumentarem e a situação piorar;</li>
          <li>O governo pode <strong>gastar mal</strong> (corrupção, obras inúteis), sem estimular de verdade a economia;</li>
          <li>Melhor seria <strong>cortar gastos</strong> e <strong>equilibrar as contas</strong>, para recuperar a confiança e atrair investimentos.</li>
        </ul>
        <p className="text-emerald-400/80 italic mt-2">Essa é a visão mais <strong>liberal/ortodoxa</strong>: primeiro ajusta as contas, depois a economia cresce sozinha.</p>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse border border-slate-700">
          <thead>
            <tr className="bg-slate-800 text-indigo-300 text-xs uppercase tracking-wider">
              <th className="p-3 border border-slate-700">A favor (intervencionista/Keynesiano)</th>
              <th className="p-3 border border-slate-700">Contra (liberal/ortodoxo)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-3 border border-slate-700">Governo deve gastar em recessão</td>
              <td className="p-3 border border-slate-700">Governo deve cortar gastos em recessão</td>
            </tr>
            <tr>
              <td className="p-3 border border-slate-700">Déficit temporário é aceitável</td>
              <td className="p-3 border border-slate-700">Déficit é sempre ruim</td>
            </tr>
            <tr>
              <td className="p-3 border border-slate-700">Estimula consumo e emprego</td>
              <td className="p-3 border border-slate-700">Gera dívida, inflação e desconfiança</td>
            </tr>
            <tr>
              <td className="p-3 border border-slate-700">Interesse: sair da crise rápido</td>
              <td className="p-3 border border-slate-700">Interesse: equilíbrio fiscal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h3 className="text-indigo-400 font-bold text-base mb-3">Como você pode responder:</h3>
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="font-bold text-emerald-400">Se concorda:</span>
          <p className="italic text-slate-400">"Sim, em recessão o governo deve aceitar um déficit temporário para estimular a economia, porque o setor privado está retraído e alguém precisa gastar para reativar a produção e o emprego."</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="font-bold text-rose-400">Se discorda:</span>
          <p className="italic text-slate-400">"Não, aumentar o déficit só agrava a dívida pública e a desconfiança. O governo deve cortar gastos e equilibrar as contas para a economia se recuperar de forma sustentável."</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="font-bold text-amber-400">Se fica no meio-termo:</span>
          <p className="italic text-slate-400">"Depende do tamanho da recessão e da situação fiscal do país. Um estímulo temporário pode ser útil, mas precisa ser bem direcionado e acompanhado de um plano de ajuste depois."</p>
        </div>
      </div>
    </div>
  )
};
