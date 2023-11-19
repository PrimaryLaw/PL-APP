"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";



import logo from "../assets/pl_logo.png";

const TopBar = () => {


  return (
    <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all bg-mainGrey shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main="" navbar-scroll="true">
    <a className="block px-2 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="javascript:;" target="_blank">
    {/* < src={ logo } className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo"> */}  
    

    </a>
    <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
      <nav>
     
        <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
          <li className="text-sm leading-normal">
            <a className="opacity-50 text-slate-700" href="javascript:;">Products</a>
          </li>
          <li className="text-sm pl-2 capitalize font-semibold leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Contract Analyzer</li>
        </ol>
  
      </nav>

      <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
      <div className=" flex items-center md:ml-auto md:pr-4 relative flex flex-col min-w-0 break-words bg-transparend rounded-lg border border-mainGreen shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-2 ">
                <div className="flex flex-row -mx-3 hidden">
                  <div className="flex items-center w-2/3 max-w-full px-3 hidden">
                      <p className="mb-0 text-slate-700 font-bold">
                        New chat
                      </p>
                  </div>
                  
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-9 h-9 text-center rounded-lg bg-gradient-to-tl from-mainGreen to-darkGreen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2 mt-2 text-defaultWhite">
                    <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd" />
                    <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                  </svg>
                    </div>
                  </div>
                </div>
                <Button>my contracts</Button>

              </div>
            </div>

        <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
       
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default TopBar;