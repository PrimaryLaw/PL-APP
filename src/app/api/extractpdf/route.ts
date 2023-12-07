// app/api/extractpdf/extract-pdf.ts
import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import pdfParse from 'pdf-parse';
import fetch from 'node-fetch';

export default async function handler(req: { method: string; body: { pdfUrl: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { text?: string; error?: string; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
  console.log('esta aqui 1')
  if (req.method === 'POST') {
    console.log('esta aqui 2')
    try {
      console.log('esta aqui 3')
      const { pdfUrl } = req.body;
      console.log('esta aqui 4')
      // Fetch the PDF file
      console.log('esta aqui 5')
      console.log(pdfUrl)
      const response = await fetch(pdfUrl);
      const buffer = await response.buffer();

      // Use pdf-parse to extract text
      let data = await pdfParse(buffer);
      
      // Send the extracted text back in the response
      res.status(200).json({ text: data.text });
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      res.status(500).json({ error: 'Error extracting text from PDF' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
