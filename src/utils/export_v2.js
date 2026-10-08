import { jsPDF } from "jspdf";
import { QUESTIONS } from "../data/questions.js";
import { VALUES_LIST } from "../data/dimensionsMap.js";

export function exportToPDF(results, answers, notes = {}, tradeoffAnswers = {}, selectedValues = [], includeGabarito = true, participantName = "Participante") {
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
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(140, 145, 160);
      doc.text("QUIZPOLIS — Relatório Multidimensional V2", margin, y);
      doc.text(`Página ${doc.internal.getNumberOfPages()}`, pageWidth - margin, y, { align: "right" });
      y += 8;
    }
  };

  // 1. Cabeçalho Principal
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 36, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("QUIZPOLIS", margin, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(199, 210, 254);
  doc.text("Diagnóstico de Perfil Político Multidimensional (V2)", margin, 23);

  doc.setFontSize(8);
  doc.setTextColor(165, 180, 252);
  const dateStr = new Date().toLocaleDateString("pt-BR", { dateStyle: "long" });
  doc.text(`Emitido em: ${dateStr} | Titular: ${participantName}`, margin, 30);

  y = 44;

  // 2. Resumo Executivo
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("PERFIL POLÍTICO PREDOMINANTE:", margin + 5, y + 8);

  doc.setFontSize(14);
  doc.setTextColor(79, 70, 229);
  doc.text(`${results.generalLabel.toUpperCase()}`, margin + 5, y + 16);

  y += 34;

  // 3. Estilo Político (Pragmatismo)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("ESTILO POLÍTICO DE DECISÃO", margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setTextColor(79, 70, 229);
  doc.text(`Pragmatismo: ${results.pragmatism.score}/100 — ${results.pragmatism.style}`, margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const pragLines = doc.splitTextToSize(results.pragmatism.description, contentWidth);
  doc.text(pragLines, margin, y);
  y += (pragLines.length * 4.5) + 6;

  // 4. Valores Principais
  checkPageBreak(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("VALORES PRIORITÁRIOS (TOP 4)", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  
  const valuesNames = selectedValues.map((valId, idx) => {
    const v = VALUES_LIST.find(x => x.id === valId);
    return `${idx + 1}. ${v ? v.text : valId}`;
  });
  
  valuesNames.forEach(text => {
    doc.text(text, margin + 2, y);
    y += 5;
  });
  
  y += 6;

  // 5. Dimensões Ideológicas
  checkPageBreak(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("MAPEAMENTO MULTIDIMENSIONAL (0 a 100)", margin, y);
  y += 8;

  Object.keys(results.dimensions).forEach(axisKey => {
    checkPageBreak(15);
    const axis = results.dimensions[axisKey];
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${axis.name}:`, margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(79, 70, 229);
    doc.text(`${axis.score}/100 (${axis.label})`, margin + 60, y);
    y += 4;
    
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`${axis.leftLabel} <---------------------> ${axis.rightLabel}`, margin, y);
    y += 8;
  });

  // Salvar
  doc.save(`Quizpolis_Relatorio_V2_${new Date().getTime()}.pdf`);
}

export function exportToText(results, answers, notes, tradeoffAnswers, selectedValues) {
  // Simplificado para V2
  let content = "QUIZPOLIS V2 — DIAGNÓSTICO\n";
  content += "=================================\n\n";
  content += `PERFIL: ${results.generalLabel}\n\n`;
  content += `Pragmatismo: ${results.pragmatism.score}/100 - ${results.pragmatism.style}\n`;
  content += `${results.pragmatism.description}\n\n`;

  content += "DIMENSÕES:\n";
  Object.keys(results.dimensions).forEach(key => {
    const a = results.dimensions[key];
    content += `- ${a.name}: ${a.score}/100 (${a.label})\n`;
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Quizpolis_V2_${new Date().getTime()}.txt`;
  link.click();
}

export function exportToJSON(results, answers, notes, tradeoffAnswers, selectedValues) {
  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      version: "2.0"
    },
    diagnostic: results,
    rawAnswers: answers,
    tradeoffAnswers,
    selectedValues,
    notes
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Quizpolis_Backup_V2_${new Date().getTime()}.json`;
  link.click();
}
