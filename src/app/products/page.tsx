import ProductsComponent from "@/components/ProductsComponent";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: {
      chatId: '12'
    };
  };

const ProductsPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/products");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/products");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/products");
  }

 // const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <h1 className="mr-3 text-5xl font-semibold">OUR PRODUCTS</h1>
            {/* chat component */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
        <ProductsComponent/>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
