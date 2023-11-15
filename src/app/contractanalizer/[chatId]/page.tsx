

import ContractTopBar from "@/components/ContractTopBar";
import ContractUpload from "@/components/ContractUpload";
import ContractPDFViewer from "@/components/ContractPDFViewer";
import VisualizationData from "@/components/VisualizationData"
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
  console.log({ _chats })
  if (!_chats) {
    return redirect("/");
  }

  const currentChat = parseInt(chatId) !== 0 ? _chats.find((chat) => chat.id === parseInt(chatId)) : _chats[0];

  if (!currentChat) {
    return redirect("/");
  }

  console.log({ currentChat, chatId })
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
          <VisualizationData userId={userId} chatId={chatId} showInsights={true} />
        </div>
      </div>
    </main>
  );
};

export default ContractAnalizer;
