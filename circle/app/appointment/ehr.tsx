import React from "react";
import ehrPdf from "./ehr.pdf";

interface SummaryProps {
  patientName: string | null;
}

const Ehr = ({ patientName }: SummaryProps) => {
  return (
    <div>
      {/*  <h1>Electronic Health Record for {patientName || "Unknown Patient"}</h1> */}
      <iframe
        src={ehrPdf}
        width="85%"
        height="1000px"
        title="EHR PDF Viewer"
        className="mx-auto"
      ></iframe>
    </div>
  );
};

export default Ehr;
