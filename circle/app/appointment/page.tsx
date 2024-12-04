"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import Summary from "./summary";
import Ehr from "./ehr";
import Transcript from "./transcript";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Appointment = () => {
  const router = useRouter();

  // State to track which page is currently active
  const [activePage, setActivePage] = useState("summary");

  // Function to handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const searchParams = useSearchParams();
  const patientName = searchParams.get("patient_name");

  return (
    <ProtectedRoute allowedRoles={["Doctor", "Admin"]}>
      <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-[#356BBB] flex justify-between items-center border-b-2 border-b-solid border-b-[#edf9fe ] rounded-br-lg rounded-bl-lg text-[30px] font-exo font-semibold">
          <div className="flex">
            <button
              onClick={() => setActivePage("summary")}
              className={`${
                activePage === "summary" ? "bg-[#174a95]" : "bg-[#356BBB]"
              } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#174a95]`}
            >
              Summary
            </button>
            <button
              onClick={() => setActivePage("ehr")}
              className={`${
                activePage === "ehr" ? "bg-[#174a95]" : "bg-[#356BBB]"
              } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#174a95]`}
            >
              Patient EHR
            </button>
            <button
              onClick={() => setActivePage("transcript")}
              className={`${
                activePage === "transcript" ? "bg-[#174a95]]" : "bg-[#356BBB]"
              } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#174a95]`}
            >
              Transcript
            </button>
          </div>

          <button
            onClick={() => router.push("/doctor")}
            className="bg-[#356BBB] text-white border-2 border-white p-3 px-4 text-[30px] rounded-lg hover:bg-[#174a95]"
          >
            Dashboard
          </button>
        </div>

        {/* Pages */}
        <div>
          {activePage === "summary" && (
            <div>
              {/*Summary page component */}
              <Summary patientName={patientName} />
            </div>
          )}
          {activePage === "ehr" && (
            <div>
              {/*Patient EHR page component */}
              <Ehr patientName={patientName} />
            </div>
          )}
          {activePage === "transcript" && (
            <div>
              {/* Transcript page component */}
              <Transcript patientName={patientName} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Appointment;
