import { QUESTIONS, DIMENSIONS, BLOCK_8_QUESTIONS } from '../data/questions.js';

/**
 * Normaliza o valor de uma questão Likert com base na sua direção:
 * - 'direct': 1 -> 1, 2 -> 2, 3 -> 3, 4 -> 4, 5 -> 5 (onde 1=Esquerda, 5=Direita)
 * - 'inverted': 1 -> 5, 2 -> 4, 3 -> 3, 4 -> 2, 5 -> 1
 */
export function getQuestionScore(question, answerValue) {
  if (question.type === 'likert') {
    const raw = Number(answerValue);
    if (isNaN(raw) || raw < 1 || raw > 5) return 3.0;
    if (question.direction === 'inverted') {
      return 6 - raw;
    }
    return raw;
  } else if (question.type === 'scenario') {
    const opt = question.options.find(o => o.id === answerValue);
    return opt ? opt.score : 3.0;
  }
  return 3.0;
}

/**
 * Converte média numérica de 1.0 a 5.0 para rótulo oficial:
 * 1,0–2,0 → tendência à esquerda
 * 2,1–2,9 → centro-esquerda
 * 3,0 → centro
 * 3,1–3,9 → centro-direita
 * 4,0–5,0 → tendência à direita
 */
export function scoreToLabel(score) {
  const rounded = Math.round(score * 10) / 10;
  if (rounded <= 2.04) return "Tendência à esquerda";
  if (rounded <= 2.94) return "Centro-esquerda";
  if (rounded <= 3.06) return "Centro";
  if (rounded <= 3.94) return "Centro-direita";
  return "Tendência à direita";
}

export function scoreToShortLabel(score) {
  const rounded = Math.round(score * 10) / 10;
  if (rounded <= 2.04) return "Esquerda";
  if (rounded <= 2.94) return "Centro-esquerda";
  if (rounded <= 3.06) return "Centro";
  if (rounded <= 3.94) return "Centro-direita";
  return "Direita";
}

/**
 * Calcula a análise completa do quiz com base nas respostas:
 * @param {Object} answers - { [questionId]: value }
 * @param {Object} block8 - { A: string[], B: number, C: string[] }
 */
export function calculateQuizResults(answers, block8 = {}) {
  // 1. Médias por Dimensão
  const dimensionResults = {};
  let totalScoreSum = 0;
  let totalDimensionCount = 0;

  Object.entries(DIMENSIONS).forEach(([dimKey, dimMeta]) => {
    const dimQuestions = QUESTIONS.filter(q => q.dimension === dimMeta.id);
    let sum = 0;
    let count = 0;

    dimQuestions.forEach(q => {
      const ans = answers[q.id];
      if (ans !== undefined && ans !== null) {
        const score = getQuestionScore(q, ans);
        sum += score;
        count++;
      }
    });

    const average = count > 0 ? sum / count : 3.0;
    dimensionResults[dimMeta.id] = {
      id: dimMeta.id,
      title: dimMeta.title,
      shortTitle: dimMeta.shortTitle,
      description: dimMeta.description,
      average: Number(average.toFixed(2)),
      label: scoreToLabel(average),
      shortLabel: scoreToShortLabel(average),
      answeredCount: count,
      totalQuestions: dimQuestions.length
    };

    totalScoreSum += average;
    totalDimensionCount++;
  });

  // 2. Eixo Geral
  const generalAverage = totalDimensionCount > 0 ? totalScoreSum / totalDimensionCount : 3.0;
  const generalLabel = scoreToLabel(generalAverage);

  // 3. Segunda Camada: Coerência e Contextualidade
  // Questões condicionais: 7, 8, 20, 21, 27, 32 e 37
  const conditionalIds = [7, 8, 20, 21, 27, 32, 37];
  let contextualWeightSum = 0;
  let answeredConditionals = 0;
  let choseDependeCount = 0;

  conditionalIds.forEach(id => {
    const q = QUESTIONS.find(item => item.id === id);
    const ans = answers[id];
    if (q && ans) {
      answeredConditionals++;
      const opt = q.options.find(o => o.id === ans);
      if (opt) {
        contextualWeightSum += (opt.contextualWeight || 0.2);
        if (opt.id === 'D' || opt.text.toLowerCase().startsWith('depende')) {
          choseDependeCount++;
        }
      }
    }
  });

  // Questões likert onde escolheu 3 (Depende / Intermediária)
  const likertQuestions = QUESTIONS.filter(q => q.type === 'likert');
  const likertThrees = likertQuestions.filter(q => answers[q.id] === 3).length;

  const contextualScore = answeredConditionals > 0 
    ? (contextualWeightSum / answeredConditionals) * 0.7 + (likertThrees / likertQuestions.length) * 0.3
    : 0.3;

  let contextualityGrade = "Moderado";
  let profileStyle = "Perfil pragmático";

  if (choseDependeCount >= 4 || contextualScore > 0.55) {
    contextualityGrade = "Alto";
    profileStyle = "Perfil pragmático / condicional";
  } else if (choseDependeCount <= 1 && contextualScore < 0.28) {
    contextualityGrade = "Baixo";
    profileStyle = "Perfil principialista / ideologicamente consistente";
  } else {
    contextualityGrade = "Moderado";
    profileStyle = "Perfil condicional moderado";
  }

  // 4. Perfil Sintético & Princípios
  const selectedPrinciples = block8.A || [];
  const balancePosture = block8.B || null;
  const contextFactors = block8.C || [];

  // Síntese expressiva requerida:
  // Ex: "Centro-direita econômica + centro em políticas sociais + posição mais rigorosa em segurança + pragmatismo elevado."
  const econShort = dimensionResults.economy?.shortLabel || "Centro";
  const taxShort = dimensionResults.taxation?.shortLabel || "Centro";
  const secShort = dimensionResults.security?.shortLabel || "Centro";
  const healthShort = dimensionResults.health?.shortLabel || "Centro";
  const envShort = dimensionResults.environment?.shortLabel || "Centro";

  const syntheticPhrase = buildSyntheticSummary({
    econShort,
    taxShort,
    secShort,
    healthShort,
    envShort,
    contextualityGrade
  });

  return {
    generalAverage: Number(generalAverage.toFixed(2)),
    generalLabel,
    disclaimer: "Essa classificação representa a tendência predominante entre as dimensões avaliadas, não uma identidade ideológica absoluta.",
    dimensions: dimensionResults,
    contextuality: {
      grade: contextualityGrade,
      score: Number(contextualScore.toFixed(2)),
      choseDependeCount,
      profileStyle,
      description: getContextualityDescription(contextualityGrade)
    },
    principles: {
      selected: selectedPrinciples,
      balancePosture,
      contextFactors,
      coherenceNote: checkPrincipleCoherence(selectedPrinciples, dimensionResults)
    },
    syntheticPhrase
  };
}

function buildSyntheticSummary({ econShort, taxShort, secShort, healthShort, envShort, contextualityGrade }) {
  const parts = [];

  // Economia
  if (econShort.includes("direita")) {
    parts.push("orientação liberal/pró-mercado na economia");
  } else if (econShort.includes("esquerda")) {
    parts.push("orientação desenvolvimentista/estatal na economia");
  } else {
    parts.push("visão equilibrada e mista na economia");
  }

  // Social / Saúde / Educação
  if (healthShort.includes("esquerda") || taxShort.includes("esquerda")) {
    parts.push("ênfase em garantias sociais e redução da desigualdade");
  } else if (healthShort.includes("direita") || taxShort.includes("direita")) {
    parts.push("foco em eficiência fiscal e mérito individual nas políticas sociais");
  } else {
    parts.push("postura ponderada em políticas sociais");
  }

  // Segurança
  if (secShort.includes("direita")) {
    parts.push("abordagem rigorosa e firme em segurança pública");
  } else if (secShort.includes("esquerda")) {
    parts.push("ênfase garantista e preventiva em segurança pública");
  } else {
    parts.push("equilíbrio entre prevenção e repressão na segurança");
  }

  // Contextualidade
  if (contextualityGrade === "Alto") {
    parts.push("elevado grau de pragmatismo condicional");
  } else if (contextualityGrade === "Baixo") {
    parts.push("fidelidade consistente a princípios doutrinários fixos");
  } else {
    parts.push("pragmatismo moderado com consideração aos cenários");
  }

  return parts.join(" + ") + ".";
}

function getContextualityDescription(grade) {
  if (grade === "Alto") {
    return "Suas posições dependem fortemente das circunstâncias concretas, custos e evidências de cada cenário, recusando soluções pré-fabricadas rígidas.";
  }
  if (grade === "Baixo") {
    return "Suas escolhas mantêm forte coerência axiológica e fidelidade doutrinária uniforme, sustentando os mesmos princípios mesmo diante de variações de cenário.";
  }
  return "Você combina diretrizes valorativas claras com flexibilidade para admitir exceções práticas e adequações de acordo com o contexto orçamentário e fático.";
}

function checkPrincipleCoherence(principles, dimensions) {
  if (!principles || principles.length === 0) return "";

  const notes = [];
  if (principles.includes("Responsabilidade fiscal") && dimensions.economy?.average >= 3.0) {
    notes.push("Forte alinhamento entre o princípio de responsabilidade fiscal e suas respostas econômicas.");
  }
  if (principles.includes("Liberdade individual") && dimensions.social?.average >= 3.0) {
    notes.push("Coerência explícita na primazia das liberdades individuais frente à intervenção moral do Estado.");
  }
  if (principles.includes("Preservação ambiental") && dimensions.environment?.average <= 3.0) {
    notes.push("Suas decisões reforçam a proteção ecológica como critério limitador do crescimento a qualquer custo.");
  }
  if (principles.includes("Segurança e ordem") && dimensions.security?.average >= 3.0) {
    notes.push("Alinhamento direto entre a valorização da ordem e o fortalecimento das medidas de segurança.");
  }
  if (principles.includes("Redução da pobreza") && dimensions.taxation?.average <= 3.0) {
    notes.push("Coerência entre o foco na redução da pobreza e posições redistributivas na tributação.");
  }

  if (notes.length === 0) {
    return "Os princípios selecionados refletem as ponderações gerais indicadas ao longo das questões.";
  }
  return notes.join(" ");
}
