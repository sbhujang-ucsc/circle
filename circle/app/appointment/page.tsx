"use client";

import { useState, useContext, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import Summary from "./summary";
import Ehr from "./ehr";
import Transcript from "./transcript";
import { useSearchParams } from "next/navigation";

const Appointment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("app"); // Use 'app' for appointment ID
  const { user } = useContext(AuthContext); // Authenticated user context

  const [activePage, setActivePage] = useState("summary");
  const [patientUUID, setPatientUUID] = useState<string | null>(null); // Store patient UUID
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (!appointmentId) {
        console.error("No appointment ID provided in the URL");
        router.push("/doctor"); // Redirect if no appointment ID is provided
        return;
      }

      try {
        // Fetch the appointment details from Supabase
        const { data: appointment, error } = await supabase
          .from("appointments")
          .select("patient")
          .eq("appointment_id", appointmentId)
          .single();

        if (error) throw error;

        if (!appointment) {
          console.error("Appointment not found");
          router.push("/doctor"); // Redirect if appointment not found
          return;
        }

        // Set the patient UUID
        setPatientUUID(appointment.patient);
      } catch (error: any) {
        console.error("Error fetching appointment data:", error.message);
        router.push("/doctor"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentId, router]);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  return (
    <div className="bg-[#dde3f2] min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="bg-[#356BBB] flex justify-between items-center py-0.5 px-2
      text-[28px] font-semibold"
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

      {/* Pages */}
      <div>
        {activePage === "summary" && (
          <div>
            {/* Pass patient UUID to Summary component */}
            <Summary patientUUID={patientUUID} apptId={appointmentId} />
          </div>
        )}
        {activePage === "ehr" && (
          <div>
            {/* Pass patient UUID to Patient EHR component */}
            <Ehr patientUUID={patientUUID} apptId={appointmentId} />
          </div>
        )}
        {activePage === "transcript" && (
          <div>
            {/* Pass patient UUID to Transcript component */}
            <Transcript patientUUID={patientUUID} apptId={appointmentId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
