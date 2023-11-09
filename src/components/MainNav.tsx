"use client";
import { DrizzleChat } from "@/lib/db/schema";
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



import logo from "../assets/pl_logo.png";

const MainNav = () => {
    


  return (
    <nav className="bg-allblack dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-allblack dark:border-gray-600 hidden">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center">
  
    </a>
    <div className="flex md:order-2">
        <button type="button" className="text-white bg-mainGreen hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-mainGreen dark:focus:ring-blue-800 hidden">Get started</button>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-font-light border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-allblack dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
    </div>
  </nav>
  );
};

export default MainNav;
