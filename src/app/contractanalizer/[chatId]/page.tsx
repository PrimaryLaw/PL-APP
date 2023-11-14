

import ContractTopBar from "@/components/ContractTopBar";
import ContractUpload from "@/components/ContractUpload";
import ContractInsights from "@/components/ContractInsights";
import ContractPDFViewer from "@/components/ContractPDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


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


    // State to toggle between Insights and Chat
   // const [showInsights, setShowInsights] = useState(true);

  return (
    <main className="ease-soft-in-out bg-mainGrey relative   rounded-xl transition-all duration-200">
       <ContractTopBar /> 

    <div className="w-full px-6 py-6 mx-auto">
          <ContractUpload pdf_name={currentChat?.name || ""} /> 
      
      </div>   

      <div className="flex flex-wrap my-6 -mx-3 h-128">

     <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-2/4 lg:flex-none">
       <ContractPDFViewer pdf_url={currentChat?.pdfUrl || ""} /> 
     </div>

     <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/4 lg:flex-none bg-white">
      <div className="border-black/12.5  relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
        <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
          <div className="flex flex-wrap mt-0 -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto flex md:w-1/2  lg:w-4/12">
              <button>Insights</button>
              <button>Insights</button>
          {/* <button 
                    type="button" 
                    className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 ${showInsights ? 'bg-mainGreen' : 'bg-white'}`} 
                    onClick={() => setShowInsights(true)}
                  >Insights</button>
                    <button 
                    type="button" 
                    className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 ${!showInsights ? 'bg-mainGreen' : 'bg-white'}`} 
                    onClick={() => setShowInsights(false)}
  >Chat</button> */}
             </div>
          </div>
        </div>
      </div>

     <div className="flex-auto p-6 px-0 pb-2">
    {/* {showInsights ? <ContractInsights /> : <ChatComponent userId={userId} chatId={parseInt(chatId)} />}  */} 
     <ContractInsights /> 
     {/*  <ChatComponent userId={userId} chatId={parseInt(chatId)} />*/} 
    
    </div>   

     </div>


      </div>
     

  </main>
  );
};

export default ContractAnalizer;
