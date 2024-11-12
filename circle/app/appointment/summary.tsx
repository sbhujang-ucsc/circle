import React from "react";
import { useSearchParams } from "next/navigation";

interface SummaryProps {
  patientName: string | null;
}

const Summary = ({ patientName }: SummaryProps) => {
  return (
    <div className="flex space-x-8 w-4/5 mx-auto mt-8">
      {/* Patient Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[250px] min-h-[550px]">
        <div className="flex flex-col items-center">
          <div className="bg-[#44C7E1] w-40 h-40 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-5xl">👤</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{patientName || "John Doe"}</h3>
        </div>
        <div className="mt-4">
          <p className="flex flex-col text-xl font-semibold mb-2">
            <span className="flex items-center">
              📅 <span className="ml-2">Appointment:</span>
            </span>
            <span className="block ml-6 text-gray-800 mb-4">November 12th, 12:30 PM</span>
          </p>
          <p className="flex items-center text-lg font-semibold">
            <span className="mr-2">💜</span> Symptoms:
          </p>
          <ul className="ml-6 list-disc text-base text-gray-700">
            <li>Text</li>
            <li>Text</li>
          </ul>
        </div>
      </div>

      {/* Information and Chat Box */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-3/4 flex flex-col justify-between">
        <div className="flex flex-col space-y-4">
          {/* AI Summary Card */}
          <div className="bg-[#EDF5FF] p-6 rounded-xl h-40 shadow">
            <h2 className="text-lg font-bold text-gray-800">AI Summary:</h2>
            <p className="mt-2 text-gray-700">Example text: diagnosed with this because of these symptoms, prescribed ...</p>
          </div>

          {/* Inconsistencies / Warnings Card */}
          <div className="bg-[#EDF5FF] p-6 rounded-xl h-40 shadow">
            <h2 className="text-lg font-bold text-gray-800">Inconsistencies / Warnings:</h2>
            <p className="mt-2 text-gray-700">Generated warnings about patient symptoms or info</p>
          </div>

          {/* Suggested Ideas Card */}
          <div className="bg-[#EDF5FF] p-6 rounded-xl h-40 shadow">
            <h2 className="text-lg font-bold text-gray-800">Suggested Ideas:</h2>
            <p className="mt-2 text-gray-700">Example text: diagnosed with this because of these symptoms, prescribed ...</p>
          </div>
        </div>

        {/* Chat with AI Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-[#6082EB] text-white text-lg py-3 px-6 rounded-lg flex items-center space-x-2 shadow-lg">
            <span>💬</span>
            <span>Chat with AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
