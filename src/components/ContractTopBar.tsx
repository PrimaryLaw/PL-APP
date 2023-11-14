"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";



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
          <li className="text-sm pl-2 capitalize font-semibold leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Contract Analizer</li>
        </ol>
  
      </nav>

      <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
              <div className="transition-all duration-200 ease-nav-brand">
                <a href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/" target="_blank" className="inline-block w-full px-8 py-2 mb-0 text-xs font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro hover:shadow-soft-2xl hover:scale-102">My contracts</a>
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