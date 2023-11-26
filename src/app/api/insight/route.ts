import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
   // const { messages, chatId, context } = await req.json();
    const { messages, chatId } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));

    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    const prompt = {
      role: "system",
      content: `As a legal expert, your primary function is to meticulously review and analyze legal contracts. 
      Please provide an summary complete regarding this contract. 
      AI assistant will not invent anything that is not drawn directly from the context.
      AI assistant will give all response in blocks of Html, formatted with bold or list or other options.
      `,
    };

    console.log({prompt})

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    
    const stream = OpenAIStream(response);

    console.log({stream, response})

    return NextResponse.json(
      {
        stream,
      },
      { status: 200 });

    //return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('route -insight', error);
  }
}
