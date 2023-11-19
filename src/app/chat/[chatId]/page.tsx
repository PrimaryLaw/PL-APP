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
         <TopBar userId={userId} chatId={parseInt(chatId)} />
         <div className="ease-soft-in-out bg-mainGrey relative w-full flex sm:flex-none  rounded-xl transition-all duration-200">
        {/* file upload */}
         <div className=" w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button className="bg-allblack border border-mainGreen">
                  Login (test users only)
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
            {/* contract name  */}
            <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-3/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-6">
                  <div className="flex flex-row -mx-3">
                    <div className="flex items-center w-2/3 max-w-full px-3">
                      <span className="mx-3" >Name:</span>
                        <h5 className="mb-0 ml-4 font-bold text-mainGreen">
                          nome do contracto 
                        </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

         </div>

        
      <div className="flex w-full h-[100vh] overflow-scroll">
  
   
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="h-[100vh] px-2 py-5 rounded-lg border border-defaultWhite oveflow-scroll bg-defaultWhite flex-[4]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[4]  border-l-slate-200">
          <div className="flex justify-center">
            <Button className="m-2">Chat</Button>
            <Button className="m-2">Insights</Button>
          </div>
      
          <ChatComponent userId={userId} chatId={parseInt(chatId)} />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
