"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import prompts from "@/app/prompts/prompts.json";




import logo from "../assets/pl_logo.png";

const ContractInsights = () => {



const summarize = prompts.summarize; //get the prompts value

    return (
      <div className="overflow-x-auto " >
        <div className="flex-auto p-4 pt-6">
          <ul className="flex  flex-col pl-0 mb-0 rounded-lg">
            <li className="relative items-baseline flex-col p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
            <div className="flex">
              <div className="flex flex-col">
              <h6 className=" leading-normal text-sm"><i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i>Summarize</h6>
              </div>
              <div className="ml-auto text-right">
                 <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">Generate</button>
              </div>
              </div>
              <div className="contentInsightResult p-4 flex-col">
                <p>Insight 1</p>
                <p>Insight 2</p>
              </div>
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
              <h6 className=" leading-normal text-sm"><i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i>Risks</h6>
              </div>
              <div className="ml-auto text-right">
                
                 <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">Generate</button>
              </div>
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
              <h6 className=" leading-normal text-sm"><i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i>Obligations & Rights</h6>
              </div>
              <div className="ml-auto text-right">
                 <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">Generate</button>
              </div>
            </li>
            <li className="relative items-baseline flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
              <div className="flex flex-col">
              <h6 className=" leading-normal text-sm"><i className="mr-2 fas fa-file-alt text-slate-700" aria-hidden="true"></i>Liability & Indemnities</h6>
              </div>
              <div className="ml-auto text-right">
                 <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">Generate</button>
              </div>
            </li>
          </ul>
        </div>


      </div>

   
  );
};

export default ContractInsights;