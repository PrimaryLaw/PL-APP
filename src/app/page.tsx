import React, { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";
import MainNav from "@/components/MainNav";
import MainFooter from "@/components/MainFooter";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import plLogo from '/src/assets/fulllogo_mainGreen.png';
import linesBg from '/src/assets/lines_bg.png';
import Image from 'next/image'; // Import the Image component


export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats);
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  if (isAuth) {
    // return redirect("/chat/0");
  }

  return (
    <div className="w-screen min-h-screen bg-black">
      <nav className="bg-allblack dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-allblack dark:border-gray-600 ">
        <div className=" flex flex-wrap items-center justify-between mx-11 xs:mx-4 p-4">
          <a href="www.primarylaw.ai" className="flex items-center text-mainGreen">
               <Image src={plLogo} alt="PL Logo" width={160} height={100} /> 
          </a>
          <div className="flex md:order-2">
           
            <UserButton afterSignOutUrl="/" />
            <div className="w-full mt-4 xs:mt-0">
              {!isAuth && (
                <Link href="/sign-in">
                  <Button className="bg-allblack border border-mainGreen hover:bg-mainGreen">
                    Login (demo testers only)
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden xs:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <MainNav />
        </div>
      </nav>
      <div className="content-login">
        <div className="flex w-full h-[100vh] flex overflow-scroll flex flex-col sm:flex-row">
                <div className="h-[100vh] px-2 py-5 rounded-lg border border-allblack oveflow-scroll flex flex-col  items-center flex-[4]">
                  <div className="content-ever">
                      <div className="mt-40 flex p-8">
                            <h1 className="mr-3 text-mainGreenTransparent lg:text-8xl font-medium hidden">
                            When <span className="font-bold mx-1">LEGAL</span> meets <span className="font-bold mx-1">TECH.</span>
                            </h1>
                        </div>
                        <p className="text-defaultWhite font-light ml-3 mt-3 px-8 xs:text-5xl lg:text-8xl ">We're launching soon.</p>
                        <div className="flex ml-3 mt-6 px-8">
                  {isAuth && firstChat && (
                    <>
                      <Link href={`/chat/${firstChat.id}`}>
                        <Button className="text-defaultWhite bg-transparent hover:bg-mainGreen border border-mainGreen rounded">
                          Start <ArrowRight className="ml-2 text-defaultWhite " />
                        </Button>
                      </Link>
                      <div className="ml-3">
                        <SubscriptionButton isPro={isPro} />
                      </div>
                    </>
                  )}
                      </div>

                  </div>
                   
                </div>
                <div className="h-[100vh] px-2 py-5 rounded-lg border border-allblack oveflow-scroll bg-darkgreen flex-[4]">
                   <Image src={linesBg} alt="PL Logo" width={750} height={500} /> 
                </div>
        </div> 
       
      </div>
    {/* <MainFooter /> */}  
    </div>
  );
}
