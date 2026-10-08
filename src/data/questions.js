// Dados das questões do Quiz Político Multidimensional

export const DIMENSIONS = {
  ECONOMY: {
    id: "economy",
    title: "Economia e Papel do Estado",
    shortTitle: "Economia",
    description: "Avalia a preferência entre regulação/intervenção estatal e livre mercado.",
    questions: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  TAXATION: {
    id: "taxation",
    title: "Tributação e Desigualdade",
    shortTitle: "Tributação & Desigualdade",
    description: "Avalia posições sobre redistribuição de renda e justiça fiscal vs eficiência de incentivos.",
    questions: [9, 10, 11, 12, 13, 14]
  },
  SECURITY: {
    id: "security",
    title: "Segurança Pública e Justiça",
    shortTitle: "Segurança & Justiça",
    description: "Avalia posturas entre ênfase punitiva/ostensiva e garantias de direitos/prevenção social.",
    questions: [15, 16, 17, 18, 19, 20, 21]
  },
  EDUCATION: {
    id: "education",
    title: "Educação",
    shortTitle: "Educação",
    description: "Avalia o papel do Estado, setor privado e autonomia pedagógica.",
    questions: [22, 23, 24, 25, 26, 27]
  },
  HEALTH: {
    id: "health",
    title: "Saúde",
    shortTitle: "Saúde",
    description: "Avalia universalidade e estatização vs participação privada e autonomia individual.",
    questions: [28, 29, 30, 31, 32]
  },
  ENVIRONMENT: {
    id: "environment",
    title: "Meio Ambiente e Desenvolvimento",
    shortTitle: "Meio Ambiente",
    description: "Avalia restrições ecológicas e sustentabilidade vs crescimento econômico irrestrito.",
    questions: [33, 34, 35, 36, 37]
  },
  SOCIAL: {
    id: "social",
    title: "Questões Sociais e Liberdades Individuais",
    shortTitle: "Liberdades Individuais",
    description: "Avalia autonomia individual e laicidade/pluralismo vs tutela moral e preservação tradicional.",
    questions: [38, 39, 40]
  }
};

export const LIKERT_OPTIONS = [
  { value: 1, label: "1 — Discordo totalmente", short: "Discordo totalmente" },
  { value: 2, label: "2 — Discordo parcialmente", short: "Discordo parcialmente" },
  { value: 3, label: "3 — Depende / posição intermediária", short: "Depende / Intermediária" },
  { value: 4, label: "4 — Concordo parcialmente", short: "Concordo parcialmente" },
  { value: 5, label: "5 — Concordo totalmente", short: "Concordo totalmente" }
];

export const QUESTIONS = [
  // BLOCO 1 — ECONOMIA E PAPEL DO ESTADO
  {
    id: 1,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "O Estado deve interferir o mínimo possível na atividade econômica, deixando que preços, investimentos e produção sejam determinados principalmente pelo mercado.",
    // Concordar (5) = Mercado/Direita (score 5). Direção direta: 1 (Esq) -> 5 (Dir)
    direction: "direct"
  },
  {
    id: 2,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "Em setores considerados essenciais, o Estado deve intervir mesmo quando isso reduzir a liberdade de atuação das empresas.",
    // Concordar (5) = Intervenção/Esquerda (score 1). Invertida: 5->1, 1->5
    direction: "inverted"
  },
  {
    id: 3,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "Uma redução de impostos pode ser justificável mesmo que diminua a arrecadação no curto prazo, caso aumente investimentos, produção e empregos.",
    // Concordar (5) = Redução de impostos/oferta/Direita. Direta.
    direction: "direct"
  },
  {
    id: 4,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "Empresas de grande porte devem estar sujeitas a regras mais rigorosas quando seu tamanho lhes permite exercer influência significativa sobre determinados mercados.",
    // Concordar (5) = Regulação anti-truste/Intervenção estatal. Invertida.
    direction: "inverted"
  },
  {
    id: 5,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "O governo deve priorizar o equilíbrio das contas públicas mesmo que isso implique reduzir ou adiar determinados programas públicos.",
    // Concordar (5) = Austeridade fiscal / ortodoxia. Direta.
    direction: "direct"
  },
  {
    id: 6,
    block: 1,
    dimension: "economy",
    type: "likert",
    text: "Em uma situação de recessão econômica, o governo deveria aceitar temporariamente um aumento do déficit para estimular a atividade econômica.",
    // Concordar (5) = Keynesianismo/estímulo estatal via dívida. Invertida.
    direction: "inverted"
  },
  {
    id: 7,
    block: 1,
    dimension: "economy",
    type: "scenario",
    isConditional: true,
    text: "Cenário: a economia está crescendo, o desemprego está baixo, mas a dívida pública está aumentando rapidamente. Qual posição mais se aproxima da sua?",
    options: [
      { id: "A", text: "Aumentar gastos para aproveitar o crescimento.", score: 1.5, contextualWeight: 0.1 },
      { id: "B", text: "Manter os gastos atuais.", score: 2.8, contextualWeight: 0.3 },
      { id: "C", text: "Reduzir o crescimento dos gastos e buscar equilíbrio fiscal.", score: 4.5, contextualWeight: 0.1 },
      { id: "D", text: "Depende principalmente da origem e da qualidade dos gastos.", score: 3.0, contextualWeight: 1.0 }
    ]
  },
  {
    id: 8,
    block: 1,
    dimension: "economy",
    type: "scenario",
    isConditional: true,
    text: "Cenário: um determinado imposto elevado prejudica investimentos e competitividade, mas sua eliminação reduziria recursos destinados a serviços públicos. O que deveria pesar mais na decisão?",
    options: [
      { id: "A", text: "Reduzir o imposto.", score: 4.5, contextualWeight: 0.1 },
      { id: "B", text: "Manter o imposto.", score: 1.5, contextualWeight: 0.1 },
      { id: "C", text: "Reformular o imposto para reduzir seus efeitos econômicos.", score: 3.5, contextualWeight: 0.5 },
      { id: "D", text: "Depende da situação fiscal e dos serviços financiados por ele.", score: 3.0, contextualWeight: 1.0 }
    ]
  },

  // BLOCO 2 — TRIBUTAÇÃO E DESIGUALDADE
  {
    id: 9,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "Pessoas com maior renda devem contribuir proporcionalmente mais para o financiamento do Estado.",
    // Concordar (5) = Progressividade tributária (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 10,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "Reduzir a desigualdade econômica deve ser uma prioridade importante das políticas públicas, mesmo quando isso exigir maior intervenção estatal.",
    // Concordar (5) = Redistribuição ativa (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 11,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "O sistema tributário deve priorizar a simplicidade e a eficiência, mesmo que isso limite sua capacidade de redistribuir renda.",
    // Concordar (5) = Eficiência > redistribuição (Direita). Direta.
    direction: "direct"
  },
  {
    id: 12,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "O governo deve evitar políticas que reduzam significativamente a desigualdade caso elas diminuam os incentivos para investir, trabalhar ou empreender.",
    // Concordar (5) = Foco em incentivos e mérito de mercado (Direita). Direta.
    direction: "direct"
  },
  {
    id: 13,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "Programas de transferência de renda são justificáveis quando conseguem reduzir pobreza e vulnerabilidade sem criar dependência excessiva do Estado.",
    // Concordar (5) = Pró-transferência focalizada com condicionalidade (Ponto de conciliação / centro ou moderado social).
    // Pontuação calibrada: 1 (anti-transferência) -> 5 (apoio condicional à rede de proteção).
    // Aqui um acordo forte é social-democrata/liberal social, enquanto desacordo rejeita programas sociais ou quer universal irrestrito.
    // Direção padrão: apoio a programas assistenciais = menor pontuação no espectro econômico puro de direita tradicional, logo Invertida.
    direction: "inverted"
  },
  {
    id: 14,
    block: 2,
    dimension: "taxation",
    type: "likert",
    text: "O objetivo principal das políticas econômicas deveria ser aumentar a prosperidade geral, e não necessariamente produzir resultados econômicos semelhantes entre diferentes grupos.",
    // Concordar (5) = Crescimento e prosperidade ampla vs igualdade de resultado (Direita). Direta.
    direction: "direct"
  },

  // BLOCO 3 — SEGURANÇA PÚBLICA E JUSTIÇA
  {
    id: 15,
    block: 3,
    dimension: "security",
    type: "likert",
    text: "O Estado deve aumentar o investimento em policiamento e investigação mesmo que isso exija maior gasto público.",
    // Concordar (5) = Lei e ordem / ampliação de forças policiais (Direita). Direta.
    direction: "direct"
  },
  {
    id: 16,
    block: 3,
    dimension: "security",
    type: "likert",
    text: "Penas mais severas são uma ferramenta importante para reduzir determinados tipos de crime.",
    // Concordar (5) = Punitivismo penal / dissuasão severa (Direita). Direta.
    direction: "direct"
  },
  {
    id: 17,
    block: 3,
    dimension: "security",
    type: "likert",
    text: "A prevenção social da criminalidade deve receber prioridade semelhante à repressão policial.",
    // Concordar (5) = Foco nas causas sociais do crime (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 18,
    block: 3,
    dimension: "security",
    type: "likert",
    text: "O direito à privacidade deve impor limites significativos ao uso de tecnologias de vigilância pelo Estado.",
    // Concordar (5) = Garantismo civilista contra o Estado policial (Esquerda / Garantista). Invertida.
    direction: "inverted"
  },
  {
    id: 19,
    block: 3,
    dimension: "security",
    type: "likert",
    text: "Em determinadas situações de alta criminalidade, o Estado pode ampliar temporariamente seus poderes de segurança, desde que existam limites legais e mecanismos de fiscalização.",
    // Concordar (5) = Flexibilização securitária / mão firme (Direita). Direta.
    direction: "direct"
  },
  {
    id: 20,
    block: 3,
    dimension: "security",
    type: "scenario",
    isConditional: true,
    text: "Cenário: uma região apresenta aumento expressivo de crimes violentos. O orçamento permite escolher apenas uma prioridade inicial:",
    options: [
      { id: "A", text: "Aumentar o policiamento ostensivo.", score: 4.5, contextualWeight: 0.1 },
      { id: "B", text: "Aumentar investigação e inteligência policial.", score: 3.5, contextualWeight: 0.4 },
      { id: "C", text: "Investir principalmente em prevenção social.", score: 1.5, contextualWeight: 0.1 },
      { id: "D", text: "Combinar medidas, priorizando a que apresentar maior evidência de eficácia local.", score: 3.0, contextualWeight: 1.0 }
    ]
  },
  {
    id: 21,
    block: 3,
    dimension: "security",
    type: "scenario",
    isConditional: true,
    text: "Cenário: uma política de segurança reduz crimes significativamente, mas aumenta abordagens policiais e o risco de abusos. Você tenderia a:",
    options: [
      { id: "A", text: "Manter a política porque a redução da criminalidade é prioritária.", score: 4.8, contextualWeight: 0.1 },
      { id: "B", text: "Encerrar a política porque os riscos aos direitos são excessivos.", score: 1.5, contextualWeight: 0.1 },
      { id: "C", text: "Manter a política com controles e fiscalização mais rigorosos.", score: 3.4, contextualWeight: 0.5 },
      { id: "D", text: "Depende da magnitude dos resultados e dos abusos registrados.", score: 3.0, contextualWeight: 1.0 }
    ]
  },

  // BLOCO 4 — EDUCAÇÃO
  {
    id: 22,
    block: 4,
    dimension: "education",
    type: "likert",
    text: "O Estado deve garantir uma educação pública de qualidade independentemente da renda das famílias.",
    // Concordar (5) = Universalidade pública obrigatória do Estado (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 23,
    block: 4,
    dimension: "education",
    type: "likert",
    text: "A participação do setor privado na educação pode ser ampliada quando isso melhorar eficiência e resultados.",
    // Concordar (5) = Livre mercado/parcerias privadas/vouchers (Direita). Direta.
    direction: "direct"
  },
  {
    id: 24,
    block: 4,
    dimension: "education",
    type: "likert",
    text: "O governo deve estabelecer padrões nacionais de aprendizagem, mesmo que isso reduza a autonomia das escolas e redes locais.",
    // Concordar (5) = Centralização estatal de currículo e controle. Invertida.
    direction: "inverted"
  },
  {
    id: 25,
    block: 4,
    dimension: "education",
    type: "likert",
    text: "Professores e escolas devem ter maior autonomia para escolher métodos de ensino adequados à realidade de seus alunos.",
    // Concordar (5) = Descentralização pedagógica. Direta.
    direction: "direct"
  },
  {
    id: 26,
    block: 4,
    dimension: "education",
    type: "likert",
    text: "A política educacional deveria priorizar principalmente a igualdade de oportunidades, e não necessariamente resultados iguais entre todos os alunos.",
    // Concordar (5) = Meritocracia e igualdade de partida vs nivelamento de chegada (Direita). Direta.
    direction: "direct"
  },
  {
    id: 27,
    block: 4,
    dimension: "education",
    type: "scenario",
    isConditional: true,
    text: "Cenário: uma escola pública apresenta resultados muito baixos. Uma reforma aumenta significativamente o desempenho dos alunos, mas reduz parte da autonomia dos professores. Sua posição seria:",
    options: [
      { id: "A", text: "Apoiar a reforma.", score: 4.2, contextualWeight: 0.1 },
      { id: "B", text: "Rejeitar a reforma.", score: 1.8, contextualWeight: 0.1 },
      { id: "C", text: "Apoiar parcialmente, mantendo mecanismos de autonomia.", score: 3.2, contextualWeight: 0.5 },
      { id: "D", text: "Depende de como os resultados foram medidos e dos efeitos sobre os alunos.", score: 3.0, contextualWeight: 1.0 }
    ]
  },

  // BLOCO 5 — SAÚDE
  {
    id: 28,
    block: 5,
    dimension: "health",
    type: "likert",
    text: "A saúde deve ser tratada como um serviço que o Estado precisa garantir universalmente.",
    // Concordar (5) = Sistema público universal (SUS) (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 29,
    block: 5,
    dimension: "health",
    type: "likert",
    text: "O setor privado pode desempenhar papel maior na prestação de serviços de saúde quando isso reduzir custos ou aumentar a qualidade.",
    // Concordar (5) = Mercado/OSS/Privatização ou gestão privada (Direita). Direta.
    direction: "direct"
  },
  {
    id: 30,
    block: 5,
    dimension: "health",
    type: "likert",
    text: "O governo deve aumentar investimentos em prevenção mesmo que isso reduza recursos disponíveis para tratamentos imediatos.",
    // Concordar (5) = Saúde preventiva/planejamento central coletivo (Esquerda/Progressista). Invertida.
    direction: "inverted"
  },
  {
    id: 31,
    block: 5,
    dimension: "health",
    type: "likert",
    text: "A liberdade individual deve limitar a capacidade do Estado de impor determinadas medidas relacionadas à saúde.",
    // Concordar (5) = Autonomia individual vs coerção sanitária estatal (Direita/Liberal). Direta.
    direction: "direct"
  },
  {
    id: 32,
    block: 5,
    dimension: "health",
    type: "scenario",
    isConditional: true,
    text: "Cenário: uma determinada política pública de saúde é cara, mas apresenta forte evidência de que reduz mortes e complicações futuras. Você tenderia a:",
    options: [
      { id: "A", text: "Financiar a política mesmo com alto custo.", score: 1.8, contextualWeight: 0.1 },
      { id: "B", text: "Não financiar se o custo for excessivo.", score: 4.5, contextualWeight: 0.1 },
      { id: "C", text: "Financiar, mas procurar alternativas mais eficientes.", score: 3.3, contextualWeight: 0.5 },
      { id: "D", text: "Depende do orçamento disponível e da magnitude do benefício.", score: 3.0, contextualWeight: 1.0 }
    ]
  },

  // BLOCO 6 — MEIO AMBIENTE E DESENVOLVIMENTO
  {
    id: 33,
    block: 6,
    dimension: "environment",
    type: "likert",
    text: "O Estado deve impor restrições ambientais às empresas quando determinadas atividades causarem danos relevantes ao meio ambiente.",
    // Concordar (5) = Regulação ecológica firme (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 34,
    block: 6,
    dimension: "environment",
    type: "likert",
    text: "Políticas ambientais não devem comprometer significativamente o crescimento econômico e a geração de empregos.",
    // Concordar (5) = Prioridade ao crescimento/desenvolvimentismo (Direita). Direta.
    direction: "direct"
  },
  {
    id: 35,
    block: 6,
    dimension: "environment",
    type: "likert",
    text: "O governo deve incentivar tecnologias menos poluentes por meio de investimentos e incentivos econômicos.",
    // Concordar (5) = Transição verde / intervenção indutiva (Esquerda). Invertida.
    direction: "inverted"
  },
  {
    id: 36,
    block: 6,
    dimension: "environment",
    type: "likert",
    text: "Empresas que causam danos ambientais devem arcar com os custos correspondentes, mesmo que isso reduza sua rentabilidade.",
    // Concordar (5) = Princípio poluidor-pagador / responsabilização rígida. Invertida.
    direction: "inverted"
  },
  {
    id: 37,
    block: 6,
    dimension: "environment",
    type: "scenario",
    isConditional: true,
    text: "Cenário: uma atividade econômica gera muitos empregos em uma região, mas causa danos ambientais relevantes. Qual posição mais se aproxima da sua?",
    options: [
      { id: "A", text: "Restringir fortemente a atividade.", score: 1.5, contextualWeight: 0.1 },
      { id: "B", text: "Permitir a atividade com poucas restrições.", score: 4.8, contextualWeight: 0.1 },
      { id: "C", text: "Permitir com regras ambientais rigorosas e fiscalização.", score: 2.8, contextualWeight: 0.5 },
      { id: "D", text: "Depende da gravidade do dano e da possibilidade de alternativas econômicas.", score: 3.0, contextualWeight: 1.0 }
    ]
  },

  // BLOCO 7 — QUESTÕES SOCIAIS E LIBERDADES INDIVIDUAIS
  {
    id: 38,
    block: 7,
    dimension: "social",
    type: "likert",
    text: "O Estado deve interferir o mínimo possível nas escolhas individuais dos cidadãos quando essas escolhas não causarem dano direto a outras pessoas.",
    // Concordar (5) = Liberdade individual máxima / Princípio do dano de Mill (Liberal/Direita em liberdades individuais). Direta.
    direction: "direct"
  },
  {
    id: 39,
    block: 7,
    dimension: "social",
    type: "likert",
    text: "A proteção de determinados valores sociais pode justificar algumas restrições às escolhas individuais.",
    // Concordar (5) = Comunitarismo/moralismo/intervencionismo de costumes ou controle social. Invertida em termos de liberdade individual direta.
    direction: "inverted"
  },
  {
    id: 40,
    block: 7,
    dimension: "social",
    type: "likert",
    text: "Quando liberdade individual, igualdade e segurança entram em conflito, nenhuma dessas prioridades deve ser considerada automaticamente superior: a decisão deve depender do caso concreto.",
    // Concordar (5) = Ponderação constitucional / pragmatismo contextual.
    // Score central equilibrado.
    direction: "direct"
  }
];

export const BLOCK_8_QUESTIONS = {
  A: {
    id: "block8_A",
    title: "A. Princípios Prioritários",
    instruction: "Escolha até 3 princípios que você considera mais importantes na formulação de políticas públicas:",
    maxSelect: 3,
    options: [
      "Liberdade individual",
      "Igualdade de oportunidades",
      "Redução da pobreza",
      "Crescimento econômico",
      "Responsabilidade fiscal",
      "Segurança e ordem",
      "Eficiência do Estado",
      "Direitos individuais",
      "Preservação ambiental",
      "Estabilidade institucional",
      "Outro"
    ]
  },
  B: {
    id: "block8_B",
    title: "B. Balanço de Efeitos",
    instruction: "Quando uma política pública apresenta bons resultados, mas também efeitos negativos relevantes, qual postura mais representa você?",
    options: [
      { value: 1, label: "1 — Priorizar os resultados positivos" },
      { value: 2, label: "2 — Dar mais peso aos resultados positivos" },
      { value: 3, label: "3 — Avaliar caso a caso" },
      { value: 4, label: "4 — Dar mais peso aos efeitos negativos" },
      { value: 5, label: "5 — Priorizar a rejeição da política se os efeitos negativos forem graves" }
    ]
  },
  C: {
    id: "block8_C",
    title: "C. Fatores de Contexto",
    instruction: "Quando sua posição sobre determinado assunto muda conforme o contexto, por quê? Escolha os fatores que mais influenciam sua decisão:",
    options: [
      "Situação econômica",
      "Evidências disponíveis",
      "Custo da política",
      "Resultado esperado",
      "Impacto social",
      "Liberdade individual",
      "Direitos fundamentais",
      "Segurança",
      "Eficiência",
      "Capacidade financeira do Estado",
      "Circunstâncias excepcionais"
    ]
  }
};
