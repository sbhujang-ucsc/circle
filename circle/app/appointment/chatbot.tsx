// app/appointment/chatbot.tsx

import React, { useState } from "react";
interface ChatbotModalProps {
  onClose: () => void;
}
const ChatbotModal = ({ onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      { text: "Hello! What can I help with?", isUser: false },
      { text: "Can you tell me why you suggested ... ?", isUser: true },
      {
        text: "Yes, these symptoms commonly correlate with so and so diagnosis because ...",
        isUser: false,
      },
    ]
  );
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim() === "") return;
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    // Placeholder response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "This is a placeholder response from the AI.", isUser: false },
      ]);
    }, 1000);
    // Clear input
    setInput("");
  };
  return (
    <div className="fixed bottom-24 right-8 w-[400px] h-[600px] bg-white rounded-xl shadow-lg flex flex-col z-50">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-blue-800 px-4 py-3 rounded-t-xl">
        <h2 className="text-lg font-bold text-white">AI Scribe</h2>
        <button onClick={onClose} className="text-white text-2xl">
          ✕
        </button>
      </div>
      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } max-w-[75%] break-words`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input Section */}
      <div className="p-4 flex items-center bg-white rounded-b-xl border-t border-gray-200">
        <input
          type="text"
          placeholder="Write your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 border border-gray-300 rounded-l-xl bg-white text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-3 rounded-r-xl hover:bg-blue-600"
        >
          ➔
        </button>
      </div>
    </div>
  );
};
export default ChatbotModal;
