import React, { useState } from "react";
import ChatbotModal from "./Chatbot"; // Import ChatbotModal

interface SummaryProps {
  patientName: string | null;
}

const Summary = ({ patientName }: SummaryProps) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const patientInfo = [
    { label: "Age", value: "45" },
    { label: "Gender", value: "Male" },
    { label: "Weight", value: "75kg" },
    { label: "Height", value: "5'9\"" },
    { label: "Allergies", value: "None" },
  ];

  return (
    <div>
      <div className="flex space-x-8 w-[80%] mx-auto mt-8 items-stretch">
        {/* Patient Details Card */}
        <div
          className="bg-[#B8D8ED] text-gray-800 rounded-2xl shadow-lg shadow-gray-400
         p-6 w-[30%] flex flex-col min-h-[80vh]"
        >
          <h3 className="text-4xl text-[#174a95] font-bold mt-4 text-center">
            {patientName || "John Doe"}
          </h3>

          <table className="w-full text-left text-gray-800 text-lg my-8">
            <tbody>
              {patientInfo.map((info, index) => (
                <tr key={index}>
                  <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                    {info.label}
                  </th>
                  <td className="py-2 pl-10">{info.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="flex flex-col text-2xl text-gray-800 font-semibold my-6">
            <span>Appointment:</span>
            <span className="block">November 12th, 12:30 PM</span>
          </p>

          <div className="flex flex-col items-start">
            <p className="text-2xl font-semibold">Symptoms:</p>
            <ul className="ml-8 list-disc text-2xl text-gray-800">
              <li>Text</li>
              <li>Text</li>
              <li>Text</li>
              <li>Text</li>
            </ul>
          </div>
        </div>

        {/* Right Panels */}
        <div className="flex flex-col gap-6 w-[60%] min-h-[80vh] text-xl text-gray-800">
          {/* AI Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              AI Summary
            </h3>
            <p>
              The patient has these symptoms, and these relevant underlying
              conditions . . . example text example text example text example
              text example text example text example text
            </p>
          </div>

          {/* Inconsitencies/Warnings */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              Inconsistencies / Warnings
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Has this allergy. which could affect this medication . . .
              </li>
              <li>
                Currently taking these medications, which are correlated with
                this symptom . . .
              </li>
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              Suggested Ideas
            </h3>
            <ul className="list-disc pl-6">
              <li>Medication list here . . .</li>
              <li>Talk about this to clarify . . .</li>
            </ul>
          </div>
        </div>
        {/* Chatbot Modal */}
        {isChatbotOpen && <ChatbotModal onClose={toggleChatbot} />}
      </div>

      {/* Chat with AI Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={toggleChatbot}
          className="bg-[#356BBB] text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-[#174a95] flex items-center space-x-2"
        >
          <span>💬</span>
          <span>Chat with AI</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
