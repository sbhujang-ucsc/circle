import React from "react";
import { useSearchParams } from "next/navigation";

interface SummaryProps {
  patientName: string | null;
}

const Summary = ({ patientName }: SummaryProps) => {
  return (
    <div>
      <div
        className="bg-white min-h-[82vh] mt-[30px] mx-[110px]
      rounded-2xl border-[#6082EB] border-[2.5px] p-8"
      >
        <p>Viewing Details for {patientName}</p>
        <h2>AI Summary</h2>
        <p>Sample text</p>
        <h2>Inconsotencies/Warnings</h2>
        <p>Sample text</p>
        <h2>Analysis/Suggested Ideas</h2>
        <p>Sample text</p>
      </div>
    </div>
  );
};

export default Summary;
