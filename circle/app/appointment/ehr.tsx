import React from "react";

interface SummaryProps {
  patientUUID: string | null;
}

const Ehr = ({ patientUUID }: SummaryProps) => {
  return (
    <div>
      {/*  <h1>Electronic Health Record for {patientName || "Unknown Patient"}</h1> */}
      <iframe
        width="85%"
        height="1000px"
        title="EHR PDF Viewer"
        className="mx-auto"
      ></iframe>
    </div>
  );
};

export default Ehr;
