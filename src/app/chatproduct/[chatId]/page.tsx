import ChatSideBar from "@/components/ChatSideBar";
import TopBar from "@/components/TopBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatProduct = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats);
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
     <main className="bg-greyBg ease-soft-in-out  relative h-full max-h-screen rounded-xl transition-all duration-200">
      <div className="w-full px-6 py-6 mx-auto">
    <div className="flex flex-wrap -mx-3 ">
    <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
      <div className="flex flex-wrap -mx-3">
      
        <div className="w-full max-w-full px-3 xl:w-2/2 xl:flex-none">
          <div className="flex flex-nowrap -mx-3">
            <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 mx-6 mb-0 flex justify-center text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <div className="w-16 h-16 text-center bg-center icon bg-gradient-to-tl from-mainGreen to-darkGreen shadow-soft-2xl rounded-xl">
                    <i className="relative text-white opacity-100 fas fa-landmark text-xl top-31/100"></i>
                  </div>
                </div>
                <div className="flex-auto p-4 pt-0 text-center">
                  <h6 className="mb-0 text-center">Legislative chat</h6>
                  <span className="leading-tight text-xs">Chat with Canadian legislative docs</span>
                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <div className="flex-none w-2/2 max-w-full px-3 text-right">
                    <a className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25" href="javascript:;">Access</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 mt-6 md:mt-0 md:w-1/2 md:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 mx-6 flex justify-center mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <div className="w-16 h-16 text-center bg-center icon bg-gradient-to-tl from-mainGreen to-darkGreen shadow-soft-2xl rounded-xl">
                    <i className="relative text-white opacity-100 fas fa-landmark text-xl top-31/100"></i>
                  </div>
                </div>
                <div className="flex-auto p-4 pt-0 text-center">
                  <h6 className="mb-0 text-center">Contract Analizer</h6>
                  <span className="leading-tight text-xs">Analize and get insights about your contract</span>
                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <div className="flex-none w-2/2 max-w-full px-3 text-right">
                    <a className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-lg bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25" href="javascript:;">Access</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 mt-6 md:mt-0 md:w-1/2 md:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 mx-6 flex justify-center mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <div className="w-16 h-16 text-center bg-center icon bg-gradient-to-tl from-mainGreen to-darkGreen shadow-soft-2xl rounded-xl">
                    <i className="relative text-white opacity-100 fas fa-landmark text-xl top-31/100"></i>
                  </div>
                </div>
                <div className="flex-auto p-4 pt-0 text-center">
                  <h6 className="mb-0 text-center">Case Law</h6>
                  <span className="leading-tight text-xs">Lorem Impsum</span>
                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <div className="flex-none w-2/2 max-w-full px-3 text-right">
                    <a className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25" href="javascript:;">Access</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
            
      </div>
    </div>
   
  </div>
  </div>
  </main>

  );
};

export default ChatProduct;
