
import ContractInsights from "@/components/ContractInsights";
import ChatComponent from "@/components/ChatComponent";
import Link from "next/link";

type Props = {
    userId: string;
    chatId: string;
    showInsights: boolean;
};

const VisualizationData = async ({ chatId, userId, showInsights }: Props) => {
    // State to toggle between Insights and Chat

    return (
        <div>
            <div className="border-black/12.5  relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                    <div className="flex flex-wrap mt-0 -mx-3">
                        <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto flex md:w-1/2  lg:w-4/12">
                            <button>Insights</button>
                            <button>Insights</button>
                            <Link href={`/contractanalizer/${chatId}`} >

                                <button
                                    type="button"
                                    className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 ${showInsights ? 'bg-mainGreen' : 'bg-white'}`}

                                >Insights</button>
                            </Link>
                            <Link href={`/chat/${chatId}`} >

                                <button
                                    type="button"
                                    className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 ${!showInsights ? 'bg-mainGreen' : 'bg-white'}`}

                                >Chat</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-auto p-6 px-0 pb-2">
                {showInsights ? <ContractInsights /> : <ChatComponent userId={userId} chatId={parseInt(chatId)} />}
            </div>

        </div>
    );
};

export default VisualizationData;
