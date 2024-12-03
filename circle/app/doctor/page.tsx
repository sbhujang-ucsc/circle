// app/doctorlanding/page.tsx

"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import appointmentData from "./appointments.json";
import ProtectedRoute from "@/components/ProtectedRoute";

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
    <ProtectedRoute allowedRoles={["Doctor"]}>
      <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] rounded-br-lg rounded-bl-lg p-4 text-[30px] font-bold font-exo">
          <span className="text-white text-4xl font-semibold">
            Welcome back, Example Doctor Name
          </span>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#174a95]"
          >
            Log Out
          </button>
        </div>
        {/* Appointment Table */}
        <div className="bg-white flex-grow mx-auto shadow-lg rounded-2xl">
          <table className="w-full border-collapse rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-[#bac7ef] text-left mx-[-30px]">
                <th className="px-4 py-2 w-[200px] text-[18px]">
                  Appointment ID
                </th>
                <th className="px-4 py-2 w-[200px] text-[18px]">Date</th>
                <th className="px-4 py-2 w-[200px] text-[18px]">Time</th>
                <th className="px-4 py-2 w-[250px] text-[18px]">
                  Patient Name
                </th>
                <th className="px-4 py-2 w-[00px] text-[18px]">Details</th>
              </tr>
            </thead>
            <tbody>
              {typedAppointmentData.map((appointment) => (
                <tr key={appointment.appointment_id} className="border-b">
                  <td className="px-4 py-2">{appointment.appointment_id}</td>
                  <td className="px-4 py-2">{appointment.date}</td>
                  <td className="px-4 py-2">{appointment.time}</td>
                  <td className="px-4 py-2">{appointment.patient_name}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        handleDetailsClick(appointment.patient_name)
                      }
                      className="bg-[#9baee5] text-white py-2 px-5 rounded-lg hover:bg-[#90a3da] font-bold text-lg" // Adjust padding and make rounded-lg
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
    </ProtectedRoute>
  );
};

export default DoctorLanding;
