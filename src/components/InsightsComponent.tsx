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
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                <InsightChat chatId={chatId} title={'Summarize'} context="insight here" />
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
                <h6 className="leading-normal text-sm">
                  <i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i> Risks
                </h6>
              </div>
              <div className="ml-auto text-right">
                <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Generate
                </button>
              </div>
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
                <h6 className="leading-normal text-sm">
                  <i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i> Obligations & Rights
                </h6>
              </div>
              <div className="ml-auto text-right">
                <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Generate
                </button>
              </div>
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
                <h6 className="leading-normal text-sm">
                  <i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i> Liability & Indemnities
                </h6>
              </div>
              <div className="ml-auto text-right">
                <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Generate
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default InsightsComponent;
