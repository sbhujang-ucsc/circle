"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import Summary from "./summary";
import Ehr from "./ehr";
import Transcript from "./transcript";
import { useSearchParams } from "next/navigation";

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
  );
};

export default Appointment;
