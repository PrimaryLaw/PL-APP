"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import FileUpload from "@/components/FileUpload";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";




import logo from "../assets/pl_logo.png";

type ContractUploadProps = {
  pdf_name: string;
  // ... other props if there are any
};


const ContractUpload = ({ pdf_name }: ContractUploadProps) => {

//const ContractUpload = async ({ pdf_url }: Props) => {





  return (

    <div className="flex flex-wrap -mx-3">
            {/*contract upload  */}
          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
          

          <FileUpload />


            {/* 
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
            </div>*/}
          </div>
                {/* contract name */}
            <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-3/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-6">
                  <div className="flex flex-row -mx-3">
                    <div className="flex items-center w-2/3 max-w-full px-3">
                      <span className="mx-3" >Name:</span>
                        <h5 className="mb-0 ml-4 font-bold text-mainGreen">
                        {pdf_name}
                        </h5>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
        </div>
  );
};

export default ContractUpload;