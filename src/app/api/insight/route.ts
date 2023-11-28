import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId, insight } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    // Only select the pdfUrl column since that's all we need
    const currPdf = _chats[0].pdfUrl;
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }



    // Prepare the prompt for OpenAI API
    const prompt = {
      role: "system",
      content: `As a legal expert, your primary function is to meticulously review and analyze legal this contract ${currPdf}.
      Based on the following insights: ${insight} 
      AI assistant will not invent anything that is not drawn directly from the context.
     AI assistant will give always with all response in blocks of Html, formatted with bold (for the titles or main words) and in list style.
  AI assistant will provide all responses in distinct HTML blocks, some examples of formatting are, <b>bold</b>,<ul><li>1. Definitions</li></ul> or <h2>headings</h2>, but always with HTML blocks.
      AI assistant will not provide more than 125 words. 
      You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.
      `,
    };

    // Use the more performant model if it meets your needs
    const modelName = "gpt-4"; // Change to "gpt-4" if necessary

    // Create a chat completion request
    const response = await openai.createChatCompletion({
      model: modelName,
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    // Use the streaming response to send back data as it's received
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('route - insight', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
