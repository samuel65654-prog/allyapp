"use client";

import { useState, useRef, useEffect } from "react";

interface ChatProps {
  messages: {
    sender: string;
    text: string;
  }[];
  onSendMessage: (message: string) => void;
  onReportUser: () => void;
  onBlockUser: () => void;
}

export default function Chat({ messages, onSendMessage, onReportUser, onBlockUser }: ChatProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`inline-block p-3 rounded-2xl max-w-xs text-sm ${
                message.sender === "me"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white border text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
        <div className="flex justify-end mt-2 gap-3">
          <button onClick={onReportUser} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Report User</button>
          <button onClick={onBlockUser} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Block User</button>
        </div>
      </div>
    </div>
  );
}
