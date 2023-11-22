// Directive specific to the client environment, its use is not standard in open-source projects.
"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

// Defining TypeScript types for the component props.
type Props = { chatId: number, userId: string };

// Defining the ChatComponent functional component.
const ChatComponent = ({ chatId, userId }: Props) => {
  // Setting up a query to fetch chat messages using react-query's useQuery hook.
  const { data, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      // Making a POST request to get messages using axios.
      const response = await axios.post<Message[]>('/api/get-messages', {
        chatId,
        userId
      });
      return response.data;
    },
  });

  // Using a custom useChat hook to manage chat input and submission.
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {
      chatId,
      userId
    },
    initialMessages: data || [],
  });

  // Using the React useEffect hook to scroll to the latest message.
  React.useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // Rendering the chat component UI.
  return (
    <div
      className="relative h-[100vh] overflow-scroll"
      id="message-container"
    >

      {/* Rendering the list of messages */}

      <MessageList messages={messages} isLoading={isLoading} />

      {/* Form for sending messages */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
      >
        <div className="flex">
          {/* Input for typing messages */}
          <Input
            value={input} // "sumarizze this contract"
            onChange={handleInputChange}
            placeholder="Send message"
            className="w-full"
          />
          {/* Button for submitting messages */}
          <Button className="bg-mainGreen ml-2">
            {/* Icon within the button */}
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

// Exporting the ChatComponent for use in other parts of the application.
export default ChatComponent;
