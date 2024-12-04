// app/doctorlanding/page.tsx

"use client";

import { useState, useContext, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

const DoctorLanding = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the doctor's name and appointments
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user) return;

      try {
        // Fetch doctor's name
        const { data: doctorData, error: doctorError } = await supabase
          .from("users")
          .select("first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (doctorError) throw doctorError;

        setDoctorName(`${doctorData.first_name} ${doctorData.last_name}`);

        // Fetch appointments for the doctor
        const { data: appointmentData, error: appointmentError } =
          await supabase
            .from("appointments")
            .select("appointment_id, datetime, patient") // Select specific columns
            .eq("doctor", user.id); // Match doctor UUID

        if (appointmentError) throw appointmentError;

        // Map appointments with patient names
        const appointmentsWithPatients = await Promise.all(
          appointmentData.map(async (appointment: any) => {
            const { data: patientData, error: patientError } = await supabase
              .from("users")
              .select("first_name, last_name")
              .eq("user_id", appointment.patient)
              .single();

            if (patientError) throw patientError;

            return {
              ...appointment,
              patient_name: `${patientData.first_name} ${patientData.last_name}`,
            };
          })
        );

        setAppointments(appointmentsWithPatients);
      } catch (error: any) {
        console.error("Error fetching doctor data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [user]);

  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="bg-[#356BBB] flex justify-between items-center p-2
            text-[30px] font-semibold px-6"
      >
        <span className="text-white text-4xl font-semibold">
          Welcome back, {doctorName || "Doctor"}
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
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id} className="border-b">
                <td className="px-4 py-2">{appointment.appointment_id}</td>
                <td className="px-4 py-2">
                  {new Date(appointment.datetime).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(appointment.datetime).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2">{appointment.patient_name}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/appointment?app=${appointment.appointment_id}`
                      )
                    }
                    className="bg-[#9baee5] text-white py-2 px-5 rounded-lg hover:bg-[#90a3da] font-bold text-lg"
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
