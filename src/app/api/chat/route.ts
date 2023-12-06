import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);


//const pdfParse = require('pdf-parse');
const fetch = require('node-fetch'); // For fetching PDF from URL

async function extractPdfText(pdfUrl: any) {
  console.log('entrou na funcao extractPdfText')
  try {
    console.log('foi chamar a api')
    const response = await fetch('/api/extractpdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pdfUrl }),
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error calling extract-pdf API:', error);
    throw error;
  }
}




export async function POST(req: Request) {
  try {
    const { messages, chatId, userId } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    // Only select the pdfUrl column since that's all we need
    const currPdf = _chats[0].pdfUrl;
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];


    // Extract text from the PDF
    const pdfText = await extractPdfText(currPdf);
    const context = await getContext(lastMessage.content, fileKey);
    {/* 
    const { messages, chatId, userId } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));

    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);
  
  
  
  */}
    

    const prompt = {
      role: "system",
      content: `The user uploaded this contract you will access and read it ${currPdf}.
      As a legal expert, your primary function is to meticulously review and analyze it.
      Your role is to remain observant and wait for specific user instructions or questions before you provide insights.
      When interacting with users, you will employ your extensive knowledge of contractual language, obligations, rights, and legal principles to provide detailed analyses of the contracts submitted for review.
      Maintain a professional tone befitting of a lawyer-client consultation, addressing the users' inquiries with the precision and clear, actionable advice that would be expected from an experienced legal counsel.
      Your guidance should clarify terms, identify potential risks, and ensure that contractual agreements align with the user's interests and legal requirements.
     Await user initiation for any contractual discussion or analysis.
     START CONTEXT BLOCK
      ${context} 
     END OF CONTEXT BLOCK
     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.        
     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question, you can contact one of our lawyers to an more detailed assistance".
     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
     AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };


     // Use the more performant model if it meets your needs
     const modelName = "gpt-4"; // Chat gpt-4 to read the contract
     console.log('ta aqui')
     console.log(prompt)
    const response = await openai.createChatCompletion({
      model: modelName,
      messages: [
        
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        await db.insert(_messages).values({
          chatId,
          content: lastMessage.content,
          role: "user",
          userId
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.insert(_messages).values({
          chatId,
          content: completion,
          role: "system",
          userId
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
