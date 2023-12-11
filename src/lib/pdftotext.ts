import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
export async function extractPdfText(pdfURL: string): Promise<string> {
  console.log('start PDFJSLIB FUNCTION:')
  console.log('PDF URL Type: ' + typeof pdfURL);

  try {
    console.log('GET THE PDF URL AS PARAMETER: '+pdfURL)
    const loadingTask = pdfjsLib.getDocument(pdfURL);
   // const loadingTask = pdfjsLib.getDocument('https://chatpdf-primary-law.s3.eu-north-1.amazonaws.com/uploads/1702253023701contract_test.pdf');

    console.log('loading task: '+loadingTask)
    const pdf = await loadingTask.promise;
    console.log('PDF: '+pdf)

    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    console.log('TEXT CONTENT: '+textContent)

    // @ts-ignore
    const fullText = textContent.items.map((s) => s.str).join(' ');

    console.log('FULL TEXT: '+fullText)
    return fullText;
  } catch (error) {
    console.error('Error occurred:', error);
    return ''; // Return empty string in case of an error
  }
}
