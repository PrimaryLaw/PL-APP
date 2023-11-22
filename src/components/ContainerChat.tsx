'use client'

import ChatComponent from "@/components/ChatComponent";
import InsightsComponent from "@/components/InsightsComponent";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import React, { useState } from "react";

type Props = {
    chatId: string;
    userId: string;
    currentChat: any;

};

const ContainerChat = ({ chatId, userId, currentChat }: Props) => {
    const [isChat, setIsChat] = useState(false);

    const handleChatButtonClick = () => {
        setIsChat(true)
    };

    const handleInsightsButtonClick = () => {
        setIsChat(false)
    };

    return (
        <div className="flex w-full h-[100vh] overflow-scroll">


            {/* chat sidebar 
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        */}
            {/* pdf viewer */}
            <div className="h-[100vh] px-2 py-5 rounded-lg border border-defaultWhite oveflow-scroll bg-defaultWhite flex-[4]">
                <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
            </div>

            {/* chat component */}
            <div className="flex-[4]  border-l-slate-200">
                <div className="flex justify-center">
                    <Button
                        className={`${isChat ? 'bg-mainGreen' : 'bg-defaultWhite text-slate-700  border-slate-700'} m-2 w-[27vh]  font-semibold leading-normal border`}
                        id="chat-comp"
                        onClick={handleChatButtonClick}
                    >
                        Chat
                    </Button>
                    <Button
                        className={`${!isChat ? 'bg-mainGreen' : 'bg-defaultWhite text-slate-700 border-slate-700'} m-2 w-[27vh]  font-semibold leading-normal  border`}
                        id="insights-comp"
                        onClick={handleInsightsButtonClick}
                    >
                        Insights
                    </Button>
                </div>


                {isChat ? (
                    <ChatComponent userId={userId} chatId={parseInt(chatId)} />
                ) : (
                    <InsightsComponent userId={userId} chatId={parseInt(chatId)} />
                )}


            </div>

        </div>
    );
};

export default ContainerChat;
