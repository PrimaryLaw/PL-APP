// import pdfParse from 'pdf-parse';
// //import fetch from 'node-fetch';

// export async function extractPdfText(pdfUrl: string): Promise<string> {
//     try {
//         console.log('is in function')
//         console.log('pdf url '+ pdfUrl)
//         const response = await fetch(pdfUrl);
//         console.log(response)
//         const dataBuffer = await response.buffer();
        
//         const data = await pdfParse(dataBuffer);
//         return data.text;


//     } catch (error) {
//         console.error('Error extracting PDF text:', error);
//         throw error;
//     }
// }

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

export async function extractPdfText(pdfURL: string): Promise<string> {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfURL);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // @ts-ignore
    const fullText = textContent.items.map((s) => s.str).join(' ');
    return fullText;
  } catch (error) {
    console.error('Error occurred:', error);
    return ''; // Return empty string in case of an error
  }
}
