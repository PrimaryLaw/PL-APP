import pdfParse from 'pdf-parse';
//import fetch from 'node-fetch';

export async function extractPdfText(pdfUrl: string): Promise<string> {
    try {
        console.log('is in function')
        console.log('pdf url '+ pdfUrl)
        const response = await fetch(pdfUrl);
        console.log(response)
        const dataBuffer = await response.buffer();
        
        const data = await pdfParse(dataBuffer);
        return data.text;


    } catch (error) {
        console.error('Error extracting PDF text:', error);
        throw error;
    }
}
