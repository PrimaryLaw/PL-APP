import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  message: string;
};

const MessageInsight = ({ message, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!message) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 overflow-hidden h-auto  bg-defaultWhite rounded-lg border border-defaultWhite">
      {
          <div
            className="justify-start pr-10 bg-mainGrey border border-defaultWhite flex"
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-2  ring-1 ring-gray-900/10",
              )}
            >
              <p dangerouslySetInnerHTML={{ __html: message }}></p>
            </div>
          </div>
        }
    </div>
  );
};

export default MessageInsight;
