import React, { useState, useEffect } from "react";
import ChatComponent from "@/components/ChatComponent";
import InsightsComponent from "@/components/InsightsComponent";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    chatId: string;
  };
};

const ActionBar = ({ params: { chatId } }: Props) => {
  const [showChat, setShowChat] = useState(true);
  const [userId, setUserId] = useState(null);

  const handleInsightsClick = () => {
    setShowChat(false);
  };

  const handleChatClick = () => {
    setShowChat(true);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const { userId } = await auth();
   //   setUserId(userId);
    };

    fetchUserId();
  }, []);

  return (
    <div className="flex justify-center">
      <Button
        className={`m-2 w-[27vh] active bg-mainGreen font-semibold leading-normal ${
          showChat ? "bg-mainGreen" : "bg-defaultWhite text-slate-700 border border-slate-700 opacity-50"
        }`}
        id="chat-comp"
        onClick={handleChatClick}
      >
        Chat
      </Button>
      <Button
        className={`m-2 w-[27vh] ${
          showChat ? "bg-defaultWhite text-slate-700 border border-slate-700 opacity-50" : "bg-mainGreen"
        }`}
        id="insights-comp"
        onClick={handleInsightsClick}
      >
        Insights
      </Button>
        {/* 
      {showChat ? (
        <ChatComponent userId={userId} chatId={parseInt(chatId)} />
      ) : (
        <InsightsComponent userId={userId} chatId={parseInt(chatId)} />
      )} */}
    </div>
  );
};

export default ActionBar;
