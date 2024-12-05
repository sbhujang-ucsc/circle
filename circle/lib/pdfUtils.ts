import * as pdfjsLib from "pdfjs-dist";

export const extractTextFromPDF = async (pdfUrl: string): Promise<string> => {
  try {
    // Specify the worker source (needed for pdfjs-dist)
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.js`;

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    let extractedText = "";

    // Loop through each page and extract text
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      textContent.items.forEach((item: any) => {
        extractedText += item.str + " ";
      });
    }

    return extractedText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};
