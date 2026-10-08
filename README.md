# Quizpolis — Quiz de Alinhamento Político Multidimensional

Aplicação web interativa para avaliação política multidimensional, medindo posicionamento por área temática, grau de coerência/contextualidade e princípios prioritários, com exportação de gabarito e diagnóstico em PDF, TXT e JSON.

---

## 🚀 Como Executar

O projeto foi configurado com **React + Vite + Tailwind CSS**.

1. **Instalar dependências**:
   ```bash
   pnpm install
   ```

2. **Rodar o servidor local**:
   ```bash
   pnpm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

3. **Gerar build de produção**:
   ```bash
   pnpm run build
   ```

---

## 📁 Estrutura do Projeto

```
quizpolis/
├── index.html                   # Entry point HTML com tipografia moderna
├── package.json                 # Dependências e scripts (React, Vite, jsPDF, Lucide)
├── vite.config.js               # Configuração do Vite
├── tailwind.config.js           # Paleta de cores e design system
├── src/
│   ├── main.jsx                 # Inicialização do React
│   ├── index.css                # Diretivas Tailwind e estilização base
│   ├── App.jsx                  # Fluxo suave (Welcome -> Quiz -> Bloco 8 -> Resultado)
│   ├── data/
│   │   └── questions.js         # Base completa das 40 questões + Bloco 8 calibradas
│   ├── utils/
│   │   ├── scoring.js           # Motor de pontuação, inversão de escala e contextualidade
│   │   └── export.js            # Geração de Relatório e Gabarito (PDF, TXT, JSON)
│   └── components/
│       ├── WelcomeModal.jsx     # Apresentação e instruções da escala Likert (1 a 5)
│       ├── QuestionCard.jsx     # Card fluido da questão com atalhos de teclado (1-5 e A-D)
│       ├── Block8Form.jsx       # Interface dos 3 princípios e critérios de decisão
│       └── ResultsView.jsx      # Diagnóstico visual, síntese, gráficos e gabarito
└── dist/                        # Build de produção otimizado
```

---

## 🎯 Metodologia de Cálculo

1. **Inversão de Direção por Questão**: Afirmações pró-mercado ou punitivas recebem pontuação direta (1 a 5), enquanto afirmações pró-intervenção estatal ou garantistas têm sua pontuação invertida (6 - X) para calibração padronizada no espectro.
2. **Posicionamento por Dimensão**: Médias individuais calculadas por bloco (Economia, Tributação, Segurança, Educação, Saúde, Meio Ambiente e Liberdades).
3. **Segunda Camada de Contextualidade**: Análise das questões condicionais (7, 8, 20, 21, 27, 32 e 37) para medir se o respondente possui perfil *Pragmático*, *Condicional* ou *Principialista*.
4. **Gabarito com Download**: Permite ao usuário baixar o diagnóstico e suas respostas completas em PDF diagramado, TXT sumarizado ou JSON.
