import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { chatId, userId } = await req.json();
  const _messages = await db.delete(messages)
    .where(and(eq(messages.chatId, chatId), eq(messages.userId, userId)));
  return NextResponse.json(_messages);
};
