import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// Vite: import worker as URL so it's bundled correctly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - ?url is a Vite import modifier
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc as unknown as string;

export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = (content.items as any[])
      .map((item) => ("str" in item ? (item as any).str : ""))
      .join(" ");
    fullText += pageText + "\n";
  }
  return fullText.trim();
}
