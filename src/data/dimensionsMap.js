export const NEW_AXES = {
  economy: { id: "economy", name: "Economia", left: "Intervenção estatal", right: "Mercado livre" },
  distribution: { id: "distribution", name: "Distribuição", left: "Redistribuição", right: "Incentivos/produtividade" },
  socialState: { id: "socialState", name: "Estado Social", left: "Provisão estatal", right: "Provisão privada/mista" },
  liberty: { id: "liberty", name: "Liberdade", left: "Controle estatal", right: "Liberdade individual" },
  security: { id: "security", name: "Segurança", left: "Garantias individuais", right: "Ordem e autoridade" },
  environment: { id: "environment", name: "Meio Ambiente", left: "Regulação ambiental", right: "Desenvolvimento econômico" },
  fiscal: { id: "fiscal", name: "Fiscal", left: "Expansão do gasto", right: "Responsabilidade fiscal" }
};

export const QUESTION_MAPPING = {
  1: { axes: { economy: 1.0, fiscal: 0.3 }, type: "position" },
  2: { axes: { economy: -1.0 }, type: "position" },
  3: { axes: { economy: 1.0 }, type: "position" },
  4: { axes: { economy: -1.0 }, type: "position" },
  5: { axes: { economy: -1.0 }, type: "position" },
  6: { axes: { economy: -0.5, fiscal: 1.0 }, type: "position" },
  7: { axes: { fiscal: 1.0, economy: -0.5 }, type: "trade-off" },
  8: { axes: { economy: 1.0, fiscal: 1.0 }, type: "position" },
  9: { axes: { distribution: -1.0 }, type: "position" },
  10: { axes: { distribution: -1.0 }, type: "position" },
  11: { axes: { economy: 1.0, distribution: 0.5 }, type: "position" },
  12: { axes: { distribution: -1.0 }, type: "position" },
  13: { axes: { socialState: -1.0 }, type: "position" },
  14: { axes: { distribution: -1.0 }, type: "position" },
  15: { axes: { security: 1.0, fiscal: -0.5 }, type: "contextual" },
  16: { axes: { security: 1.0 }, type: "position" },
  17: { axes: { security: 1.0 }, type: "position" },
  18: { axes: { security: 1.0, liberty: -1.0 }, type: "trade-off" },
  19: { axes: { security: 1.0 }, type: "position" },
  20: { axes: { security: 0.0 }, type: "pragmatism" },
  21: { axes: { security: 0.0 }, type: "pragmatism" },
  22: { axes: { distribution: -1.0 }, type: "position" },
  23: { axes: { distribution: -1.0 }, type: "position" },
  24: { axes: { socialState: 1.0 }, type: "position" },
  25: { axes: { liberty: 1.0 }, type: "position" },
  26: { axes: { socialState: 1.0, liberty: 1.0 }, type: "position" },
  27: { axes: { socialState: 0.0 }, type: "pragmatism" },
  28: { axes: { socialState: -1.0 }, type: "position" },
  29: { axes: { socialState: 1.0 }, type: "position" },
  30: { axes: { liberty: 1.0, socialState: 1.0 }, type: "position" },
  31: { axes: { liberty: 1.0 }, type: "position" },
  32: { axes: { socialState: 1.0, fiscal: 1.0 }, type: "trade-off" },
  33: { axes: { environment: -1.0 }, type: "position" },
  34: { axes: { environment: 1.0 }, type: "position" },
  35: { axes: { environment: -1.0 }, type: "position" },
  36: { axes: { environment: 1.0 }, type: "position" },
  37: { axes: { environment: 1.0 }, type: "trade-off" },
  38: { axes: { liberty: 1.0 }, type: "position" },
  39: { axes: { liberty: 1.0 }, type: "position" },
  40: { axes: { liberty: 1.0 }, type: "position" },
};

export const TRADE_OFF_QUESTIONS = [
  {
    id: "T1", type: "tradeoff",
    text: "O governo pode aumentar impostos sobre empresas e pessoas de alta renda para financiar programas sociais. Isso reduziria a desigualdade, mas pode diminuir investimentos privados.",
    options: [
      { id: "A", text: "Reduzir desigualdade mesmo com possível perda de investimento.", axes: { distribution: -1.0, economy: -1.0 } },
      { id: "B", text: "Fazer aumento moderado, buscando equilibrar redistribuição e investimento.", axes: { distribution: -0.3, economy: 0.3 }, isPragmatic: true },
      { id: "C", text: "Evitar aumento e priorizar crescimento econômico.", axes: { distribution: 1.0, economy: 1.0 } },
      { id: "D", text: "Reduzir impostos para maximizar investimentos, mesmo com maior desigualdade.", axes: { distribution: 1.0, economy: 1.5 } }
    ]
  },
  {
    id: "T2", type: "tradeoff",
    text: "Uma cidade apresenta forte aumento de crimes violentos. Uma tecnologia de monitoramento poderia reduzir significativamente os crimes, mas diminuiria a privacidade dos cidadãos.",
    options: [
      { id: "A", text: "Priorizar segurança máxima, aceitando a perda de privacidade.", axes: { security: 1.0, liberty: -1.0 } },
      { id: "B", text: "Buscar um equilíbrio, monitorando apenas áreas de altíssimo risco.", axes: { security: 0.5, liberty: -0.5 }, isPragmatic: true },
      { id: "C", text: "Priorizar a privacidade, recusando tecnologias de monitoramento em massa.", axes: { security: -1.0, liberty: 1.0 } }
    ]
  },
  {
    id: "T3", type: "tradeoff",
    text: "Uma fábrica emprega milhares de pessoas, mas gera impactos ambientais relevantes. Existe uma tecnologia mais limpa, porém sua adoção reduziria a competitividade da empresa no curto prazo.",
    options: [
      { id: "A", text: "Forçar a adoção da tecnologia limpa imediatamente, mesmo com perda de empregos.", axes: { environment: -1.0, economy: -1.0 } },
      { id: "B", text: "Dar um prazo flexível ou subsídio para adaptação gradual.", axes: { environment: -0.5, economy: 0.0 }, isPragmatic: true },
      { id: "C", text: "Permitir que a empresa opere sem mudanças para preservar empregos e competitividade.", axes: { environment: 1.0, economy: 1.0 } }
    ]
  },
  {
    id: "T4", type: "tradeoff",
    text: "Durante uma emergência sanitária, uma medida obrigatória pode reduzir significativamente os riscos coletivos, mas restringe temporariamente a liberdade individual.",
    options: [
      { id: "A", text: "Impor a medida obrigatoriamente a todos para proteção coletiva.", axes: { liberty: -1.0, security: 1.0 } },
      { id: "B", text: "Fazer campanhas de conscientização sem imposição legal.", axes: { liberty: 0.5 }, isPragmatic: true },
      { id: "C", text: "Rejeitar a medida, garantindo liberdade total de escolha.", axes: { liberty: 1.0, security: -1.0 } }
    ]
  },
  {
    id: "T5", type: "tradeoff",
    text: "Uma política nacional padronizada melhora os resultados médios dos alunos, mas reduz a autonomia de escolas e professores.",
    options: [
      { id: "A", text: "Adotar a padronização nacional para garantir eficiência geral.", axes: { liberty: -1.0, economy: -0.5 } },
      { id: "B", text: "Padronizar apenas o mínimo essencial e permitir alguma autonomia local.", axes: { liberty: 0.5 }, isPragmatic: true },
      { id: "C", text: "Garantir total autonomia às escolas, mesmo com resultados médios menores.", axes: { liberty: 1.0 } }
    ]
  },
  {
    id: "T6", type: "tradeoff",
    text: "O país está com dívida elevada, mas possui infraestrutura precária. Aumentar investimentos agora melhora a produtividade futura, porém aumenta o déficit no curto prazo.",
    options: [
      { id: "A", text: "Cortar gastos e não investir para garantir o equilíbrio fiscal.", axes: { fiscal: 1.0, economy: 1.0 } },
      { id: "B", text: "Realizar concessões privadas para atrair infraestrutura sem déficit estatal.", axes: { fiscal: 1.0, economy: 1.0, socialState: 1.0 }, isPragmatic: true },
      { id: "C", text: "Aumentar a dívida para garantir os investimentos urgentes no país.", axes: { fiscal: -1.0, economy: -1.0 } }
    ]
  },
  {
    id: "T7", type: "tradeoff",
    text: "Um programa de transferência de renda reduz significativamente a pobreza, mas existe evidência de que, em determinadas condições, ele reduz o incentivo ao trabalho.",
    options: [
      { id: "A", text: "Manter ou expandir o programa, pois a redução da pobreza é prioritária.", axes: { distribution: -1.0 } },
      { id: "B", text: "Manter o programa, mas atrelá-lo a exigências de qualificação profissional.", axes: { distribution: -0.5, economy: 0.5 }, isPragmatic: true },
      { id: "C", text: "Reduzir o programa para estimular o trabalho e a produtividade.", axes: { distribution: 1.0 } }
    ]
  },
  {
    id: "T8", type: "tradeoff",
    text: "Uma empresa privada consegue prestar determinado serviço com maior eficiência, mas existe risco de aumento do preço para populações de baixa renda.",
    options: [
      { id: "A", text: "Manter o serviço sob controle estatal para garantir acesso universal.", axes: { socialState: -1.0, economy: -1.0 } },
      { id: "B", text: "Privatizar o serviço, mas regulando preços ou dando vouchers aos mais pobres.", axes: { socialState: 0.5, economy: 0.5 }, isPragmatic: true },
      { id: "C", text: "Privatizar completamente, permitindo que o mercado dite os preços.", axes: { socialState: 1.0, economy: 1.0 } }
    ]
  },
  {
    id: "T9", type: "tradeoff",
    text: "Uma política de endurecimento penal reduz crimes, mas aumenta o risco de prisões injustas.",
    options: [
      { id: "A", text: "Implementar o endurecimento, aceitando o risco tolerável para garantir a ordem.", axes: { security: 1.0, liberty: -1.0 } },
      { id: "B", text: "Endurecer apenas para crimes hediondos, com revisão cuidadosa de penas.", axes: { security: 0.5 }, isPragmatic: true },
      { id: "C", text: "Rejeitar a política; garantias do devido processo não podem ser comprometidas.", axes: { security: -1.0, liberty: 1.0 } }
    ]
  },
  {
    id: "T10", type: "tradeoff",
    text: "Um projeto econômico gera milhares de empregos e aumento de arrecadação, mas apresenta impactos ambientais moderados que poderiam ser reduzidos com custos adicionais elevados.",
    options: [
      { id: "A", text: "Vetar o projeto ou exigir a mitigação ambiental completa, mesmo que inviabilize o negócio.", axes: { environment: -1.0, economy: -1.0 } },
      { id: "B", text: "Aprovar com mitigação ambiental parcial viável economicamente.", axes: { environment: 0.0, economy: 0.5 }, isPragmatic: true },
      { id: "C", text: "Aprovar rapidamente para aproveitar os benefícios econômicos urgentes.", axes: { environment: 1.0, economy: 1.0 } }
    ]
  }
];

export const VALUES_LIST = [
  { id: "liberty", text: "Liberdade individual" },
  { id: "opportunity", text: "Igualdade de oportunidades" },
  { id: "poverty", text: "Redução da pobreza" },
  { id: "growth", text: "Crescimento econômico" },
  { id: "security", text: "Segurança e ordem" },
  { id: "fiscal", text: "Responsabilidade fiscal" },
  { id: "environment", text: "Proteção ambiental" },
  { id: "equality", text: "Igualdade econômica" },
  { id: "autonomy", text: "Autonomia individual" },
  { id: "institution", text: "Estabilidade institucional" }
];
