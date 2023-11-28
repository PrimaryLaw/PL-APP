"use client";

import React from "react";
import { chats } from "@/lib/db/schema";
import ChatSideBar from "@/components/ChatSideBar";
import { db } from "@/lib/db";
import TopBar from "@/components/TopBar";






import logo from "../assets/pl_logo.png";

type Props = {
  params: {
    chatId: string;
  };
};

const ContractsList = async ({ params: { chatId } }: Props) => {




  const _chats = await db.select().from(chats);
  if (!_chats) {
  //  return redirect("/");
  }

  const currPage = ' Contracts List'; // Define the current page name

  return (
    
    <div className="flex-[1] max-w-xs">
    
     <ChatSideBar chats={_chats} chatId={parseInt(chatId)}  />
  </div>
  );
};

export default ContractsList;