"use client";

import { useState } from "react";
import Chat from "@/components/Chat";

// Mock data for demonstration purposes
const mockMessages = [
  { sender: "them", text: "Hi there!" },
  { sender: "me", text: "Hello! How are you?" },
  { sender: "them", text: "I'm doing well, thanks for asking!" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { sender: "me", text: message }]);
  };

  const handleReportUser = () => {
    console.log("User reported!");
  };

  const handleBlockUser = () => {
    console.log("User blocked!");
  };

  return (
    <Chat
      messages={messages}
      onSendMessage={handleSendMessage}
      onReportUser={handleReportUser}
      onBlockUser={handleBlockUser}
    />
  );
}
