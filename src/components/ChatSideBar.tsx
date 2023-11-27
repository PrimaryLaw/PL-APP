"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
//  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    if (chats.length > 0) {
      const currentChat = chats.find((chat) => chat.id === chatId)
      setSelectedOption(currentChat?.id ?? 0);
    }
  }, []);

  const handleOptionChange = (chatId: number) => {
    if (chatId !== selectedOption) {
      setSelectedOption(chatId);
      window.location.href = `/chat/${chatId}`;
    }
  };

  return (
    <div className="w-full h-[100vh] overflow-y-auto soff p-4 text-gray-200 bg-transparent scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300">
      <Link href="/" className="hidden">
        <Button className="w-full bg-darkGreen border-white py-3 border">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
          New Chat
        </Button>
      </Link>

      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-darkGreen">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>

        <p className="text-slate-700">
          Documents</p>

      </div>


      <div className="content-legislative-doc">
        <fieldset className="space-y-4">
          <legend className="sr-only">Delivery</legend>
          {chats.map((document) => (
          <div className="w-full">
            <input
              type="radio"
              name={document.name}
              value={document.id}
              id={`${document.id}`}
              className="peer hidden"
              checked={selectedOption === document.id}
              onChange={() => handleOptionChange(document.id)}
            />
            <label
              htmlFor={`${document.id}`}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-mainGreen bg-white p-4 text-sm font-medium shadow-sm hover:border-mainGreen peer-checked:border-mainGreen px-3 peer-checked:text-defaultWhite peer-checked:bg-transparentGreen peer-checked:ring-1 peer-checked:ring-mainGreen"
            >
              <p className="text-gray-700 whitespace-nowrap text-ellipsis">{document.name}</p>
              <p className="text-gray-900"></p>
            </label>
          </div>))}
        </fieldset>
      </div>
    </div>

  );
};

export default ChatSideBar;
