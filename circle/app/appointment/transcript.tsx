import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SummaryProps {
  patientUUID: string | null;
  appointmentID: string | null;
}

const Transcript = ({ patientUUID, appointmentID }: SummaryProps) => {
  const [patientName, setPatientName] = useState<string>("Loading...");
  const [transcript, setTranscript] = useState<any[]>([]); // Replace `any` with your specific transcript type

  useEffect(() => {
    if (patientUUID) {
      fetchPatientName(patientUUID);
    }
    if (appointmentID) {
      fetchTranscript(appointmentID);
    }
  }, [patientUUID, appointmentID]);

  const fetchPatientName = async (uuid: string) => {
    const { data, error } = await supabase
      .from("patients")
      .select("first_name, last_name")
      .eq("user_id", uuid)
      .single();

    if (error) {
      console.error("Error fetching patient name:", error);
      setPatientName("Unknown Patient");
    } else {
      setPatientName(`${data.first_name} ${data.last_name}`);
    }
  };

  const fetchTranscript = async (id: string) => {
    const { data, error } = await supabase
      .from("appointments")
      .select("transcript")
      .eq("appointment_id", id)
      .single();

    if (error) {
      console.error("Error fetching transcript:", error);
      setTranscript([]);
    } else {
      setTranscript(data.transcript || []);
    }
  };


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Transcript for {patientName}
      </h1>

      {/* Larger Chat Box with Visible Scrollbar */}
      <div
        className="overflow-y-auto h-[500px] p-4 bg-white rounded-md border border-gray-300 scrollbar-thumb-gray-600 scrollbar-track-gray-200 scrollbar-thin"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "gray darkgray",
        }}
      >
        <div className="space-y-4 min-w-[600px]">
        {transcript.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md break-words ${
                message.role === "assistant" ? "bg-gray-200" : "bg-blue-100"
              }`}
            >
              <p className="text-black">
                <span className="font-bold">
                  {message.role === "user" ? patientName : "Nurse"}:
                </span>{" "}
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transcript;
