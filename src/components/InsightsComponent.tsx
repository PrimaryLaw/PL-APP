"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { XSquare } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import InsightChat from "@/components/InsightChat";

type Props = { chatId: number, userId: string };

const InsightsComponent = ({ chatId, userId }: Props) => {
    // Define your insights as objects
  const insights = [
    { title: 'Summarize', contentInsight: 'Please provide a summary complete regarding this contract.' },
    { title: 'Risks', contentInsight: 'Please provide the risks of this contract.' },
    { title: 'Obligations & Rights', contentInsight: 'Please provide the obligations and rights of this contract.' },
    { title: 'Liability & Indemnities', contentInsight: 'Please provide the liability and indemnities of this contract.' },
  ];







  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
        userId
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
      userId
    },
    initialMessages: data || [],
  });
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="relative h-[70vh] overflow-scroll mx-3" id="insights-container">
      <div className="overflow-x-auto rounded-lg border border-defaultWhite oveflow-scroll bg-defaultWhite">
        <div className="flex-auto p-4 pt-6">
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            {/* 
             <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                <InsightChat chatId={chatId} title={'Summarize'} insight="Please provide an summary complete regarding this contract." />
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
            <InsightChat chatId={chatId} title={'Risks'} insight="Please provide the risks of this contract." />
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
            <InsightChat chatId={chatId} title={'Obligations & Rights'} insight="Please provide the the obligations and rights of this contract." />
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
            <InsightChat chatId={chatId} title={'Liability & Indemnities'} insight="Please provide the liability and indemnities of this contract." />
            </li>
            
            
            
            */}
            {insights.map((insight) => (
              <li key={insight.title} className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                <InsightChat chatId={chatId} title={insight.title} insight={insight.contentInsight} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default InsightsComponent;
