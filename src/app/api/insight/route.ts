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

    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    const prompt = {
      role: "system",
      content: `As a legal expert, your primary function is to meticulously review and analyze legal contracts.
      ${insight}
      AI assistant will not invent anything that is not drawn directly from the context.
      AI assistant will give always with all response in blocks of Html, formatted with bold or list or other options.
      AI assistant will provide all responses in distinct HTML blocks, some examples after, with <p>The contract includes <p/>, with <b>bold</b> formatting,  with <ul><li>1. Definitions</li></ul> formatting or <h2>headings</h2>, but always with HTML blocks.
      `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('route - insight', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
