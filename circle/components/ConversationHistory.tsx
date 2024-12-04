import React from "react";

const ConversationHistory = ({ history }: { history: { role: string; content: string }[] }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Conversation History:</h3>
      <ul className="mt-4">
        {history.map((msg, index) => (
          <li key={index} className={`my-2 ${msg.role === "user" ? "text-blue-500" : "text-gray-700"}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistory;
