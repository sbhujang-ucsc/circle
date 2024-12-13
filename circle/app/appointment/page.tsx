"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Summary from "./summary";
import Ehr from "./ehr";
import Transcript from "./transcript";

const Appointment = () => {
  const router = useRouter();

  const [activePage, setActivePage] = useState("summary");
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [patientID, setPatientID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract appointmentId from the URL query string
    const params = new URLSearchParams(window.location.search);
    const appId = params.get("app");

    if (!appId) {
      console.error("No appointment ID provided in the URL.");
      router.push("/doctor"); // Redirect to doctor dashboard if no ID
    } else {
      setAppointmentId(appId);
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {
    // Ensure the appointmentId is set before calling getPatientID
    if (appointmentId) {
      const getPatientID = async () => {
        const { data: patient, error: patientError } = await supabase
          .from("appointments")
          .select("patient")
          .eq("appointment_id", appointmentId)
          .single();

        if (patientError) {
          console.error("Error fetching patient ID:", patientError.message);
        } else {
          setPatientID(patient?.patient || null); // Set patientID or null if no data
        }
      };
      getPatientID();
    }
  }, [appointmentId]); 

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  return (
    <div className="bg-[#dde3f2] min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="bg-[#356BBB] flex justify-between items-center py-0.5 px-2 text-[28px] font-semibold"
      >
        <div className="flex">
          <button
            onClick={() => setActivePage("summary")}
            className={`${
              activePage === "summary" ? "bg-[#174a95]" : "bg-[#356BBB]"
            } text-white py-2 px-10 rounded-xl hover:bg-[#174a95]`}
          >
            Summary
          </button>
          <button
            onClick={() => setActivePage("ehr")}
            className={`${
              activePage === "ehr" ? "bg-[#174a95]" : "bg-[#356BBB]"
            } text-white py-2 px-10 hover:bg-[#174a95] rounded-xl`}
          >
            Patient EHR
          </button>
          <button
            onClick={() => setActivePage("transcript")}
            className={`${
              activePage === "transcript" ? "bg-[#174a95]" : "bg-[#356BBB]"
            } text-white py-2 px-10 hover:bg-[#174a95] rounded-xl`}
          >
            Transcript
          </button>
        </div>

        <button
          onClick={() => router.push("/doctor")}
          className="bg-[#356BBB] text-white my-1 border-[1px] border-white py-2 px-10 rounded-xl hover:bg-[#174a95]"
        >
          Dashboard
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activePage === "summary" && (
          <Summary apptId={appointmentId} />
        )}
        {activePage === "ehr" && (
          <Ehr patientUUID={patientID} />
        )}
        {activePage === "transcript" && (
          <Transcript patientUUID={patientID} appointmentID={appointmentId} />
        )}
      </div>
    </div>
  );
};

export default Appointment;
