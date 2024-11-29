// app/doctorlanding/page.tsx
// shows upcoming appointments for doctor

"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import appointmentData from "./appointments.json";

const DoctorLanding = () => {
  const router = useRouter();

  interface Appointment {
    appointment_id: string;
    date: string;
    time: string;
    patient_name: string;
  }

  const typedAppointmentData: Appointment[] = appointmentData as Appointment[];

  // Function to handle details button click
  const handleDetailsClick = (patientName: string) => {
    // Navigate to the appointment page with patient name in query
    router.push(`/appointment?patient_name=${encodeURIComponent(patientName)}`);
  };

  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="bg-[#356BBB] flex justify-between items-center p-2
            text-[30px] font-semibold px-6"
      >
        <span className="text-white text-4xl font-semibold">
          Welcome back, Example Doctor Name
        </span>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="text-white py-2 px-10 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
        >
          Log Out
        </button>
      </div>
      {/* Appointment Table */}
      <div className="bg-white flex-grow mx-auto height-auto shadow-xl shadow-gray-500 rounded-2xl mt-6">
        <table className="w-full border-collapse rounded-2xl overflow-hidden pt-4">
          <thead className="bg-[F9FCFD] p-4 border-b-2 ">
            <tr className="text-left text-xl">
              <th className="px-4 py-4 w-[200px] ml-2">Appointment ID</th>
              <th className="px-4 py-4 w-[200px] ">Date</th>
              <th className="px-4 py-4 w-[200px]">Time</th>
              <th className="px-4 py-4 w-[250px]">Patient Name</th>
              <th className="px-4 py-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {typedAppointmentData.map((appointment) => (
              <tr key={appointment.appointment_id} className="border-b">
                <td className="px-4 py-2 ml-2">{appointment.appointment_id}</td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{appointment.patient_name}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDetailsClick(appointment.patient_name)}
                    className="bg-[#356BBB] text-white py-1 px-3 my-2 rounded-lg hover:bg-[#174a95] font-bold text-lg" // Adjust padding and make rounded-lg
                  >
                    ➔
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorLanding;
