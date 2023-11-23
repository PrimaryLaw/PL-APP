"use client";
import React, { useState } from "react";
import { useChat } from "ai/react";
import MessageInsight from "./MessageInsight";
import { XSquare } from "lucide-react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number, title: string, context: string };

const InsightChat = ({ chatId, context, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    try {
      setIsOpen(true)
      setIsLoading(true)
      const response = await axios.post('/api/insight', {
        chatId,
        context,
        messages: []
      });   
      
      setMessage(response.data)
      setIsLoading(false)
    } catch(error) {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  // Using the React useEffect hook to scroll to the latest message.
  React.useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [message]);

  // Rendering the chat component UI.
  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <div className="flex flex-col">
          <h6 className="leading-normal text-sm">
            <i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i> {title}
          </h6>
        </div>
        <div className="ml-auto text-right">
          <form
          >
            <button type="button" onClick={() => submit()}  className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Generate
            </button>
          </form>
        </div>
      </div>

      {isOpen && <div className="insight-response min-h-[60px] flex flex-col p-3 bg-defaultWhite mt-2 rounded-lg border border-mainGreen relative">
        <button type="button" onClick={() => setIsOpen(false)} className="flex justify-end cursor-pointer absolute right-0 mr-2">
          <XSquare />
        </button>
        <MessageInsight message={message} isLoading={isLoading} />
      </div>}
    </div>

  );
};

// Exporting the ChatComponent for use in other parts of the application.
export default InsightChat;
