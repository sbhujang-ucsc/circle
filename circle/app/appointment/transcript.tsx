import React from "react";

interface SummaryProps {
  patientName: string | null;
}

const Transcript = ({ patientName }: SummaryProps) => {
  const messages = [
    { role: "AI Assistant", text: "Hi, how are you feeling today?" },
    { role: "Patient Name", text: "Hi, I am feeling much better today!" },
    { role: "AI Assistant", text: "That's great to hear. Any concerns?" },
    { role: "Patient Name", text: "No concerns, just wanted to check in." },
    { role: "AI Assistant", text: "Awesome, let me know if you need anything else." },
    { role: "Patient Name", text: "Sure, thank you so much for checking in." },
    { role: "AI Assistant", text: "You’re welcome. Have a great day ahead!" }
    ,
    { role: "Patient Name", text: "No concerns, just wanted to check in." },
    { role: "AI Assistant", text: "Awesome, let me know if you need anything else." },
    { role: "Patient Name", text: "Sure, thank you so much for checking in." },
    { role: "AI Assistant", text: "You’re welcome. Have a great day ahead!" },
    // Add more messages for testing the slider
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Transcript for {patientName}
      </h1>

      {/* Larger Chat Box with Visible Scrollbar */}
      <div
        className="overflow-y-auto h-[500px] p-4 bg-white rounded-md border border-gray-300 scrollbar-thumb-gray-600 scrollbar-track-gray-200 scrollbar-thin"
        style={{
          scrollbarWidth: "thin", // Firefox compatibility
          scrollbarColor: "gray darkgray", // Firefox scrollbar colors
        }}
      >
        <div className="space-y-4 min-w-[600px]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md break-words ${
                message.role === "AI Assistant" ? "bg-gray-200" : "bg-blue-100"
              }`}
            >
              <p className="text-black">
                <span className="font-bold">
                  {message.role === "Patient Name" && patientName
                    ? `${patientName}`
                    : `${message.role}`}
                </span>
                : {message.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transcript;
