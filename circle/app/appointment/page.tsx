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
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#6082EB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe ] rounded-br-lg rounded-bl-lg text-[30px] font-exo font-semibold">
        <div className="flex">
          <button
            onClick={() => setActivePage("summary")}
            className={`${
              activePage === "summary" ? "bg-[#5272d7]" : "bg-[#6C8BE9]"
            } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#6082eb]`}
          >
            Summary
          </button>
          <button
            onClick={() => setActivePage("ehr")}
            className={`${
              activePage === "ehr" ? "bg-[#5272d7]" : "bg-[#6C8BE9]"
            } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#6082eb]`}
          >
            Patient EHR
          </button>
          <button
            onClick={() => setActivePage("transcript")}
            className={`${
              activePage === "transcript" ? "bg-[#5272d7]" : "bg-[#6C8BE9]"
            } text-white border-r-2 border-r-white p-3 px-4 text-[30px] rounded-br-lg rounded-tr-lg hover:bg-[#6082eb]`}
          >
            Transcript
          </button>
        </div>

        <button
          onClick={() => router.push("/doctor")}
          className="bg-[#6C8BE9] text-white border-2 border-white p-3 px-4 text-[30px] rounded-lg hover:bg-[#6082eb]"
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