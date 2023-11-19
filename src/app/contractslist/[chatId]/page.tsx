import React, { useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes"
import { checkSubscription } from "@/lib/subscription";
import MainNav from "@/components/MainNav";
import MainFooter from "@/components/MainFooter";
import { Inter } from 'next/font/google'



//import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {

  const { userId } = await auth();
  const isAuth = !!userId;

  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats);
  console.log({_chats})
  if (!_chats) {
    return redirect("/");
  }

   if (isAuth) {
    //return redirect("/chat/0");
  }

  const currentChat = parseInt(chatId) !== 0 ? _chats.find((chat) => chat.id === parseInt(chatId)) : _chats[0];

  if (!currentChat) {
    return redirect("/");
  }

  console.log({currentChat, chatId})
  const isPro = await checkSubscription();

  return (
    <main className="ease-soft-in-out bg-mainGrey relative h-full max-h-screen rounded-xl transition-all duration-200">
         
     

        
      <div className="flex w-full h-[100vh] overflow-scroll">
  
   
   
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
 
      
      
      </div>
    </main>
  );
};

export default ChatPage;
