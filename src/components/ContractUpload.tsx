"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";



import logo from "../assets/pl_logo.png";

const ContractUpload = () => {


  return (

    <div className="flex flex-wrap -mx-3">
            {/*contract upload  */}
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex items-center w-2/3 max-w-full px-3">
                      <h5 className="mb-0 font-bold">
                        New contract
                      </h5>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-9 h-9 text-center rounded-lg bg-gradient-to-tl from-mainGreen to-darkGreen">
                      <i className="fa fa-solid fa-file-import text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                {/* contract name */}
            <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-3/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row -mx-3">
                    <div className="flex items-center w-2/3 max-w-full px-3">
                      <span className="mx-3" >Name:</span>
                        <h5 className="mb-0 ml-4 font-bold">
                         LAND BUY AND SELL AGREEMENT  
                        </h5>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-transparent-to-tl from-purple-700 to-pink-500">
                        <i className="fa fa-solid fa-file-import text-white"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
  );
};

export default ContractUpload;