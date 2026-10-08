import { NEW_AXES, QUESTION_MAPPING, TRADE_OFF_QUESTIONS } from '../data/dimensionsMap';

export function calculateQuizResultsV2(answers, tradeoffAnswers = {}, selectedValues = []) {
  let axisScores = {};
  let axisCounts = {};
  let pragmatismScore = 0;
  let pragmatismCount = 0;

  // Inicializa os eixos
  Object.keys(NEW_AXES).forEach(key => {
    axisScores[key] = 0;
    axisCounts[key] = 0;
  });

  // 1. Processar as 40 perguntas de posição (Escala 1 a 5)
  Object.keys(answers).forEach(qId => {
    const score = answers[qId]; // 1 a 5
    const mapping = QUESTION_MAPPING[qId];
    if (!mapping) return;

    if (mapping.type === 'position' || mapping.type === 'contextual' || mapping.type === 'trade-off') {
      // Normaliza de 1 a 5 para -1.0 a +1.0 (onde 3 é 0)
      const normalizedScore = (score - 3) / 2.0; 
      
      if (mapping.axes) {
        Object.keys(mapping.axes).forEach(axis => {
          const weight = mapping.axes[axis];
          axisScores[axis] += normalizedScore * weight;
          axisCounts[axis] += Math.abs(weight);
        });
      }
    }

    // A alternativa "3" (Depende) soma pontos para o pragmatismo
    if (score === 3) {
      pragmatismScore += 1;
    }
    pragmatismCount += 1;
  });

  // 2. Processar as 10 perguntas de Trade-off
  Object.keys(tradeoffAnswers).forEach(tId => {
    const ansId = tradeoffAnswers[tId];
    const tradeOffQ = TRADE_OFF_QUESTIONS.find(q => q.id === tId);
    if (!tradeOffQ) return;

    const option = tradeOffQ.options.find(o => o.id === ansId);
    if (!option) return;

    if (option.axes) {
      Object.keys(option.axes).forEach(axis => {
        const val = option.axes[axis];
        axisScores[axis] += val;
        axisCounts[axis] += Math.abs(val); // O "peso máximo" que a questão impõe
      });
    }

    // Se o usuário escolher a opção equilibrada/moderada, ganha score de pragmatismo
    if (option.isPragmatic) {
      pragmatismScore += 1.5; 
    } else {
      // Se ele escolheu uma extremada, não ganha score de pragmatismo
    }
    pragmatismCount += 1;
  });

  // 3. Normalizar os eixos para a escala 0 a 100
  const dimensions = {};
  let totalRight = 0;
  let totalCount = 0;

  Object.keys(NEW_AXES).forEach(key => {
    const rawScore = axisScores[key];
    const maxPossible = axisCounts[key] || 1; // Evita divisão por zero
    
    // rawScore varia de -maxPossible até +maxPossible
    // Para transformar em 0-100:
    let normalized = ((rawScore / maxPossible) + 1) * 50; 
    
    if (axisCounts[key] === 0) normalized = 50;
    
    normalized = Math.max(0, Math.min(100, normalized)); // clamp
    
    let label = "Centro";
    if (normalized > 60) label = "Direita";
    if (normalized > 75) label = "Direita Forte";
    if (normalized < 40) label = "Esquerda";
    if (normalized < 25) label = "Esquerda Forte";

    dimensions[key] = {
      score: Math.round(normalized),
      label: label,
      name: NEW_AXES[key].name,
      leftLabel: NEW_AXES[key].left,
      rightLabel: NEW_AXES[key].right
    };

    totalRight += normalized;
    totalCount += 1;
  });

  // 4. Calcular o Índice de Pragmatismo e Consistência (0-100)
  // O divisor é ajustado para que nem todo mundo seja 100% pragmático.
  const pragmatismIndex = Math.min(100, Math.round((pragmatismScore / (pragmatismCount * 0.6)) * 100));
  
  let pragmatismStyle = "Flexível/Contextual";
  if (pragmatismIndex < 35) pragmatismStyle = "Ideologicamente Consistente";
  else if (pragmatismIndex < 65) pragmatismStyle = "Pragmático Moderado";
  else if (pragmatismIndex > 80) pragmatismStyle = "Altamente Pragmático";

  // 5. Gerar o Rótulo Final Derivado (Ex: Centro-direita pragmático)
  const generalAvg = totalRight / totalCount;
  let posLabel = "Centro";
  if (generalAvg > 55 && generalAvg <= 65) posLabel = "Centro-direita";
  else if (generalAvg > 65) posLabel = "Direita";
  else if (generalAvg < 45 && generalAvg >= 35) posLabel = "Centro-esquerda";
  else if (generalAvg < 35) posLabel = "Esquerda";

  const pragLabel = pragmatismIndex > 50 ? " pragmático" : " ideológico";

  return {
    generalLabel: `${posLabel}${pragLabel}`,
    dimensions,
    values: selectedValues,
    pragmatism: {
      score: pragmatismIndex,
      style: pragmatismStyle,
      description: pragmatismIndex > 50 
        ? "Você tende a avaliar políticas pelo contexto, custo e resultado esperado em vez de seguir rigidamente uma doutrina."
        : "Você mantém forte coerência axiológica e fidelidade doutrinária, sustentando os mesmos princípios mesmo diante de variações de cenário."
    }
  };
}
