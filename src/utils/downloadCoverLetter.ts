import jsPDF from "jspdf";

export function downloadCoverLetterAsPdf(coverLetter: string, jobTitle?: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;

  doc.setFont("Times", "Normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(coverLetter, maxWidth);
  doc.text(lines, margin, margin);

  const filename = jobTitle
    ? `cover-letter-${jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`
    : "cover-letter.pdf";

  doc.save(filename);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}