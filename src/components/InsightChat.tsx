"use client";
import React, { useState } from "react";
import MessageInsight from "./MessageInsight";
import { XSquare, FileText, FileWarning, Scale ,BookMarked } from "lucide-react";
import axios from "axios";

type Props = { chatId: number, title: string, insight: string, insightIcon: string };

const InsightChat = ({ chatId, insight, title, insightIcon}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    try {
      setIsOpen(true)
      setIsLoading(true)
      const response = await axios.post('/api/insight', {
        chatId,
        insight,
        messages: []
      });   
      
      setMessage(response.data)
      setIsLoading(false)
    } catch(error) {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center">
        <div className="flex">
           {insightIcon}
          <h6 className="mb-0 ml-2 text-sm  capitalize font-semibold leading-normal text-normalGrey">
         {title}
          </h6>
        </div>
        <div className="ml-auto text-right">
          <form
          >
            <button type="button" onClick={() => submit()}  className="bg-transparent hover:bg-mainGreen text-mainGreen font-semibold hover:text-defaultWhite py-2 px-4 border border-mainGreen hover:border-transparent rounded">
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

export default InsightChat;
