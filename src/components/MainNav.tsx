"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Inter } from 'next/font/google'
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import MainFooter from "@/components/MainFooter";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ThemeProvider } from "next-themes"
import { redirect } from "next/navigation";




import logo from "../assets/pl_logo.png";

const MainNav =  () => {

    


  return (
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-font-light border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-allblack dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 hidden">
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-white text-gray-500  rounded md:bg-transparent md:text-mainGreen md:p-0 md:dark:text-mainGreen" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-500  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-mainGreen md:p-0 md:dark:hover:text-mainGreen dark:text-gray-500  dark:hover:bg-gray-700 dark:hover:text-gray-500  md:dark:hover:bg-transparent dark:border-gray-700">Who we are</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-500  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-mainGreen md:p-0 md:dark:hover:text-mainGreen dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Our Services</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-500  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-mainGreen md:p-0 md:dark:hover:text-mainGreen dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  );
};

export default MainNav;
