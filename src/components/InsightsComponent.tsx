"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

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
    <div
      className="relative h-[100vh] overflow-scroll"
      id="message-container"
    >
      <div className="flex flex-col col">
        <div className="flex">
        <p className="mx-4">Sumarizze</p>
        <button className="bg-mainGreen" id="1-sumarizze">Generate</button>
        </div>
    

        <div className="border border-mainGreen">
          <ul>
            <li>- this is a contract document in name of lorem impsum</li>
            <li>- this contract talks about lorem impsum </li>
            <li>- lorem impsum lorem impsum lorem impsum </li>
            </ul>
        </div>
      </div>
      <div className="flex flex-col col">
        <div className="flex">
        <p className="mx-4">Legal Liabilities</p>
        <button className="bg-mainGreen" id="1-liabilities">Generate</button>
        </div>
    

        <div className="border border-mainGreen">
          <ul>
            <li>- this is a contract document in name of lorem impsum</li>
            <li>- this contract talks about lorem impsum </li>
            <li>- lorem impsum lorem impsum lorem impsum </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightsComponent;
