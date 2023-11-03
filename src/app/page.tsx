import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
      <div className="flex h-screen">
        <div className="flex-1 bg-gradient-to-t from-black to-blue-900">
          {/* Content for the left side */}
          <div className="flex items-center">
             <h1 className="mr-3 text-8xl bg-gradient-to-r from-slate-100 to-blue-300 bg-clip-text text-transparent">We're lauching soon!</h1> 
             <p>PRIMARYLAW.AI</p>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-t from-black to-blue-900">
          {/* Content for the right side */}
          <div className="flex flex-col p-2 h-screen">
    <div className="max-w-md my-auto mx-9">
    <p className="text-deactivedGrey flex items-center text-sm">
          <svg className="text-deactivedGrey mr-2 h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
          </svg>
          testers only
        </p>

        <div className="border p-5 my-5 rounded">
          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="py-2">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="py-2">
            <button
                type="button"
                className="w-full rounded bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-solid border-2 border-green-600">
              Login
            </button>
          </div>
        </div>
    </div>
</div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-login hidden">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center ">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>

   
  );
}
