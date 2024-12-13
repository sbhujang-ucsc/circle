import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface EhrProps {
  patientUUID: string | null;
}

const Ehr = ({ patientUUID }: EhrProps) => {
  const [ehrUrl, setEhrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!patientUUID) {
      console.log("No patientUUID provided.");
      setLoading(false);
      return;
    }

    const getEhrPdfUrl = async (patientUUID: string) => {
      console.log(`Fetching URL for patientUUID: ${patientUUID}`);

      const { data, error } = await supabase
        .storage
        .from('pdfs')  // your bucket name
        .getPublicUrl(`${patientUUID}.pdf`);  // file path, assuming the file name is {patientUUID}.pdf

      if (error) {
        console.error("Error fetching EHR PDF:", error.message);
        setLoading(false);
        return;
      }

      console.log("EHR PDF URL fetched:", data?.publicUrl);
      setEhrUrl(data?.publicUrl || null);
      setLoading(false);
    };

    getEhrPdfUrl(patientUUID);
  }, [patientUUID]); // Trigger effect whenever patientUUID changes

  // Show loading message until the PDF URL is available
  if (loading) {
    console.log("Loading EHR PDF...");
    return <div className="text-center text-lg mt-10">Loading EHR...</div>;
  }

  // If no PDF is found for the given patientUUID
  if (!ehrUrl) {
    console.log("No EHR PDF found for this patient.");
    return <div className="text-center text-lg mt-10">No EHR found for this patient.</div>;
  }

  console.log("Rendering EHR PDF iframe with URL:", ehrUrl);

  return (
    <div>
      <iframe
        width="85%"
        height="1000px"
        title="EHR PDF Viewer"
        src={ehrUrl}
        className="mx-auto"
      ></iframe>
    </div>
  );
};

export default Ehr;
