import { jsPDF } from "jspdf";
import { QUESTIONS, BLOCK_8_QUESTIONS } from "../data/questions.js";

/**
 * Gera e faz download de um PDF diagramado com o Diagnóstico e o Gabarito Resumido
 */
export function exportToPDF(results, answers, notes = {}, block8 = {}, participantName = "Participante") {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      // Cabeçalho da nova página
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(140, 145, 160);
      doc.text("QUIZPOLIS — Relatório de Alinhamento Político Multidimensional", margin, y);
      doc.text(`Página ${doc.internal.getNumberOfPages()}`, pageWidth - margin, y, { align: "right" });
      y += 8;
    }
  };

  // 1. Cabeçalho Principal
  doc.setFillColor(30, 27, 75); // #1e1b4b indigo-950
  doc.rect(0, 0, pageWidth, 36, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("QUIZPOLIS", margin, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(199, 210, 254);
  doc.text("Diagnóstico de Alinhamento Político Multidimensional & Gabarito", margin, 23);

  doc.setFontSize(8);
  doc.setTextColor(165, 180, 252);
  const dateStr = new Date().toLocaleDateString("pt-BR", { dateStyle: "long" });
  doc.text(`Emitido em: ${dateStr} | Titular: ${participantName}`, margin, 30);

  y = 44;

  // 2. Resumo Executivo / Tendência Geral
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("TENDÊNCIA GERAL PREDOMINANTE:", margin + 5, y + 8);

  doc.setFontSize(14);
  doc.setTextColor(79, 70, 229); // #4f46e5
  doc.text(`${results.generalLabel.toUpperCase()} (Média ponderada: ${results.generalAverage.toFixed(1)})`, margin + 5, y + 16);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const disclaimerLines = doc.splitTextToSize(`"${results.disclaimer}"`, contentWidth - 10);
  doc.text(disclaimerLines, margin + 5, y + 23);

  y += 38;

  // 3. Síntese Descritiva & Grau de Contextualidade
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("SÍNTESE MULTIDIMENSIONAL DO PERFIL:", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const synthLines = doc.splitTextToSize(results.syntheticPhrase, contentWidth);
  doc.text(synthLines, margin, y);
  y += (synthLines.length * 4.5) + 4;

  // Bloco de Contextualidade e Princípios
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentWidth, 22, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text(`Grau de Contextualidade: ${results.contextuality.grade} (${results.contextuality.profileStyle})`, margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const contextDesc = doc.splitTextToSize(results.contextuality.description, contentWidth - 8);
  doc.text(contextDesc, margin + 4, y + 11);

  if (results.principles.selected.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text(`Princípios Prioritários: ${results.principles.selected.join(", ")}`, margin + 4, y + 18);
  }

  y += 28;

  // 4. Tabela de Posicionamento por Dimensão
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("POSICIONAMENTO POR DIMENSÃO:", margin, y);
  y += 6;

  // Header da tabela
  doc.setFillColor(224, 231, 255);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 27, 75);
  doc.text("Dimensão Temática", margin + 3, y + 5);
  doc.text("Média (1-5)", margin + 85, y + 5);
  doc.text("Posição Qualitativa", margin + 125, y + 5);
  y += 7;

  Object.values(results.dimensions).forEach((dim, idx) => {
    checkPageBreak(8);
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, 7, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(dim.title, margin + 3, y + 5);
    doc.text(dim.average.toFixed(1), margin + 85, y + 5);

    doc.setFont("helvetica", "bold");
    if (dim.label.includes("esquerda")) doc.setTextColor(220, 38, 38);
    else if (dim.label.includes("direita")) doc.setTextColor(37, 99, 235);
    else doc.setTextColor(100, 116, 139);

    doc.text(dim.label, margin + 125, y + 5);
    y += 7;
  });

  y += 8;

  // 5. Gabarito Resumido com Todas as Respostas
  checkPageBreak(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("GABARITO RESUMIDO DAS 40 QUESTÕES:", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Legenda: 1=Discordo Totalmente | 2=Discordo Parcialmente | 3=Depende/Intermediária | 4=Concordo Parcialmente | 5=Concordo Totalmente", margin, y);
  y += 5;

  QUESTIONS.forEach(q => {
    const ans = answers[q.id];
    const userNote = notes[q.id];
    let ansText = "Não respondida";

    if (q.type === 'likert') {
      const labels = {
        1: "1 — Discordo totalmente",
        2: "2 — Discordo parcialmente",
        3: "3 — Depende / posição intermediária",
        4: "4 — Concordo parcialmente",
        5: "5 — Concordo totalmente"
      };
      ansText = labels[ans] || "—";
    } else if (q.type === 'scenario') {
      const opt = q.options.find(o => o.id === ans);
      ansText = opt ? `Alternativa (${opt.id}) — ${opt.text}` : "—";
    }

    // Calcular altura estimada
    const noteLines = userNote ? doc.splitTextToSize(`Complemento: "${userNote}"`, contentWidth - 4) : [];
    const itemHeight = 11 + (noteLines.length > 0 ? (noteLines.length * 3.5) + 3 : 0);
    checkPageBreak(itemHeight + 2);

    doc.setFillColor(250, 250, 250);
    doc.rect(margin, y, contentWidth, itemHeight, "F");
    doc.setDrawColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, itemHeight, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`Q${q.id}. [${q.dimension.toUpperCase()}]`, margin + 2, y + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const qShort = q.text.length > 90 ? q.text.substring(0, 87) + "..." : q.text;
    doc.text(qShort, margin + 28, y + 4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text(`Sua resposta: ${ansText}`, margin + 2, y + 8);

    if (noteLines.length > 0) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(noteLines, margin + 2, y + 12);
    }

    y += itemHeight + 1.5;
  });

  // Bloco 8 no Gabarito
  checkPageBreak(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("BLOCO 8 — PRINCÍPIOS E TOMADA DE DECISÃO", margin, y);
  y += 5;

  // A
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`A. Princípios Prioritários: ${(block8.A || []).join(", ") || "Nenhum selecionado"}`, margin, y);
  y += 5;

  // B
  const optB = BLOCK_8_QUESTIONS.B.options.find(o => o.value === block8.B);
  doc.text(`B. Balanço de Efeitos: ${optB ? optB.label : "Não informado"}`, margin, y);
  y += 5;

  // C
  doc.text(`C. Fatores de Contexto: ${(block8.C || []).join(", ") || "Nenhum selecionado"}`, margin, y);
  y += 8;

  // Rodapé final
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Documento gerado automaticamente por Quizpolis. Uso analítico e reflexivo pessoal.", margin, pageHeight - 10);

  // Salvar
  doc.save(`Quizpolis_Resultado_Gabarito_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Exporta como arquivo JSON completo para backup e conferência
 */
export function exportToJSON(results, answers, notes = {}, block8 = {}) {
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      quizTitle: "Quiz de Alinhamento Político Multidimensional",
      app: "Quizpolis"
    },
    diagnostic: results,
    responses: {
      questions: Object.entries(answers).map(([id, ans]) => {
        const q = QUESTIONS.find(item => item.id === Number(id));
        return {
          questionId: Number(id),
          dimension: q?.dimension,
          type: q?.type,
          text: q?.text,
          answer: ans,
          userNote: notes[Number(id)] || null
        };
      }),
      block8
    }
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quizpolis_respostas_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Exporta como Gabarito em formato de Texto Limpo (.txt)
 */
export function exportToText(results, answers, notes = {}, block8 = {}) {
  let content = "====================================================\n";
  content += " QUIZPOLIS — DIAGNÓSTICO E GABARITO DE RESPOSTAS\n";
  content += " Quiz de Alinhamento Político Multidimensional\n";
  content += ` Gerado em: ${new Date().toLocaleString("pt-BR")}\n`;
  content += "====================================================\n\n";

  content += `TENDÊNCIA GERAL: ${results.generalLabel.toUpperCase()} (Média: ${results.generalAverage})\n`;
  content += `Ressalva: "${results.disclaimer}"\n\n`;

  content += `SÍNTESE MULTIDIMENSIONAL:\n${results.syntheticPhrase}\n\n`;

  content += `GRAU DE CONTEXTUALIDADE: ${results.contextuality.grade} (${results.contextuality.profileStyle})\n`;
  content += `${results.contextuality.description}\n\n`;

  content += "----------------------------------------------------\n";
  content += "POSICIONAMENTO POR DIMENSÃO:\n";
  content += "----------------------------------------------------\n";
  Object.values(results.dimensions).forEach(d => {
    content += `• ${d.title.padEnd(40, ' ')}: ${d.average.toFixed(1)} -> ${d.label}\n`;
  });

  content += "\n----------------------------------------------------\n";
  content += "BLOCO 8 — PRINCÍPIOS E TOMADA DE DECISÃO:\n";
  content += "----------------------------------------------------\n";
  content += `• Princípios Prioritários: ${(block8.A || []).join(", ")}\n`;
  const optB = BLOCK_8_QUESTIONS.B.options.find(o => o.value === block8.B);
  content += `• Balanço de Efeitos: ${optB ? optB.label : "—"}\n`;
  content += `• Fatores Condicionantes: ${(block8.C || []).join(", ")}\n`;

  content += "\n====================================================\n";
  content += " GABARITO DETALHADO DAS 40 QUESTÕES:\n";
  content += "====================================================\n\n";

  QUESTIONS.forEach(q => {
    const ans = answers[q.id];
    const userNote = notes[q.id];
    let ansStr = "—";
    if (q.type === 'likert') {
      const labels = {
        1: "1 — Discordo totalmente",
        2: "2 — Discordo parcialmente",
        3: "3 — Depende / posição intermediária",
        4: "4 — Concordo parcialmente",
        5: "5 — Concordo totalmente"
      };
      ansStr = labels[ans] || "Não respondida";
    } else {
      const opt = q.options.find(o => o.id === ans);
      ansStr = opt ? `(${opt.id}) ${opt.text}` : "Não respondida";
    }

    content += `[Q${String(q.id).padStart(2, '0')}] ${q.text}\n`;
    content += `>> SUA RESPOSTA: ${ansStr}\n`;
    if (userNote) {
      content += `>> COMPLEMENTO/JUSTIFICATIVA: "${userNote}"\n`;
    }
    content += "\n";
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quizpolis_gabarito_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
