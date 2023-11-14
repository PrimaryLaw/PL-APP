import ChatComponent from "@/components/ChatComponent";
import ContractTopBar from "@/components/ContractTopBar";
import ContractUpload from "@/components/ContractUpload";
import ContractInsights from "@/components/ContractInsights";
import ContractPDFViewer from "@/components/ContractPDFViewer";
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

const ContractAnalizer = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats);
  console.log({_chats})
  if (!_chats) {
    return redirect("/");
  }

  const currentChat = parseInt(chatId) !== 0 ? _chats.find((chat) => chat.id === parseInt(chatId)) : _chats[0];

  if (!currentChat) {
    return redirect("/");
  }

  console.log({currentChat, chatId})
  const isPro = await checkSubscription();

  return (
    <main className="ease-soft-in-out bg-mainGrey relative   rounded-xl transition-all duration-200">
       <ContractTopBar /> 

    <div className="w-full px-6 py-6 mx-auto">
          <ContractUpload /> 
      
      </div>   

      <div className="flex flex-wrap my-6 -mx-3">

     <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-2/4 lg:flex-none">
       <ContractPDFViewer pdf_url={currentChat?.pdfUrl || ""} /> 
     </div>

     <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/4 lg:flex-none">
      <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
        <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
          <div className="flex flex-wrap mt-0 -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto  md:w-1/2 md:flex-none lg:w-4/12">
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto  md:w-1/2 md:flex-none lg:w-4/12">
                    <div className="relative right-0">
                      <ul className="relative flex flex-wrap p-1 list-none bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl" nav-pills role="tablist" >
                        <li className="z-30 flex-auto text-center">
                          <a className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-black" nav-link  href="javascript:;" role="tab" aria-selected="true">
                            <i className="fa fa-solid fa-rocket"></i>
                            <span className="ml-1">Insights</span>
                          </a>
                        </li>
                        <li className="z-30 flex-auto text-center">
                          <a className="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link href="javascript:;" role="tab" aria-selected="false">
                            <i className="fa fa-solid fa-rocket"></i>
                            <span className="ml-1">Chat</span>
                          </a>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>

     <div className="flex-auto p-6 px-0 pb-2">
     <ContractInsights /> 
    
    </div>   

     </div>


      </div>
      {/*
      <div className="flex w-full h-[100vh] overflow-scroll">
  

        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>

        <div className="h-[100vh] px-2 py-5 rounded-lg border border-defaultWhite oveflow-scroll bg-defaultWhite flex-[4]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
 
        <div className="flex-[4]  border-l-slate-200">
          <ChatComponent userId={userId} chatId={parseInt(chatId)} />
        </div>
  </div> */}

  </main>
  );
};

export default ContractAnalizer;
