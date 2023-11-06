import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatProductPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div class="flex min-h-screen justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <div class="from-toBlue to-fromBlue max-h-64 flex rounded-2xl bg-gradient-to-t px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10" id="legislative-tool">
    <div class="mx-auto max-w-md">
      <div class="divide-greyDisabled divide-y">
        <div class="pt-3 text-base font-semibold leading-7">
          <h2 class="text-3xl text-white">Legislative chat</h2>
          <button type="button" class="my-3 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800">Access</button>
        </div>
        <div class="space-y-6 pt-8 text-base leading-7 text-gray-600">
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="fill-sky1 stroke-sky2 h-6 w-6 flex-none stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-1 text-white">Enabled</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="from-toBlue to-fromBlue max-h-64 flex rounded-2xl bg-gradient-to-t px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10" id="legislative-tool">
    <div class="mx-auto max-w-md">
      <div class="divide-greyDisabled divide-y">
        <div class="pt-3 text-base font-semibold leading-7">
          <h2 class="text-3xl text-white">Contract Analysis</h2>
          <button type="button" class="my-3 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800">Access</button>
        </div>
        <div class="space-y-6 pt-8 text-base leading-7 text-gray-600">
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="fill-normalGrey stroke-greyDisabled h-6 w-6 flex-none stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="text-greyDisabled ml-1">Disabled</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="from-toBlue to-fromBlue max-h-64 flex rounded-2xl bg-gradient-to-t px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10" id="legislative-tool">
    <div class="mx-auto max-w-md">
      <div class="divide-greyDisabled divide-y">
        <div class="pt-3 text-base font-semibold leading-7">
          <h2 class="text-3xl text-white">Legal research</h2>
          <button type="button" class="my-3 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800">Access</button>
        </div>
        <div class="space-y-6 pt-8 text-base leading-7 text-gray-600">
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="fill-normalGrey stroke-greyDisabled h-6 w-6 flex-none stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="text-greyDisabled ml-1">Disabled</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChatProductPage;
