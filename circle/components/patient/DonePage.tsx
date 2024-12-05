import Image from "next/image";
import backIcon from "./back.png";
import { useEffect, useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "../../providers/AuthProvider";
import Sidebar from "@/components/patient/Sidebar";

// DonePage.tsx
const DonePage = ({ handleLogout, handlePageChange }) => {
  const { user } = useContext(AuthContext);
  const [appointmentDetails, setAppointmentDetails] = useState<{
    location: string;
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    console.log(user.id);
    const fetchAppointment = async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("location, datetime")
          .eq("patient", user.id)
          .single();

        if (error) {
          console.error("Error fetching appointment:", error.message);
        } else {
          setAppointmentDetails({
            location: data.location,
            date: new Date(data.datetime).toLocaleDateString(),
            time: new Date(data.datetime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      } catch (err) {
        console.error("Unexpected error fetching appointment:", err);
      }
    };

    fetchAppointment();
  }, [user]);

  useEffect(() => {
    console.log("DonePage Rendered");
  }, []);

  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
        <button
          onClick={() => handlePageChange(3)}
          className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] flex items-center rounded-2xl hover:bg-[#174a95]"
        >
          Back
        </button>
        <button
          onClick={handleLogout}
          className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] rounded-2xl hover:bg-[#174a95]"
        >
          Log Out
        </button>
      </div>

      <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
        {/* Left Box */}
        <Sidebar />

        {/* Right Box */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center justify-center mt-4 py-4 px-10 mb-4">
            <h2 className="text-[36px] font-karla font-semibold tracking-tight">
              Done with call!
            </h2>
            <h2 className="text-[28px] font-karla mx-16 text-center tracking-tight">
              Congratulations, your appointment details have been generated:
            </h2>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-16 py-16">
            <h1 className="text-5xl font-exo font-semibold border-b pb-4 mb-8">
              Appointment Details
            </h1>
            {appointmentDetails ? (
              <>
                <div className="mb-10">
                  <h2 className="text-3xl font-semibold">Location</h2>
                  <p className="text-gray-700 text-2xl mt-2">
                    {appointmentDetails.location}
                  </p>
                </div>
                <div className="mb-10">
                  <h2 className="text-3xl font-semibold">Date</h2>
                  <p className="text-gray-700 text-2xl mt-2">
                    {appointmentDetails.date}
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">Time</h2>
                  <p className="text-gray-700 text-2xl mt-2">
                    {appointmentDetails.time}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-700 text-2xl">
                Loading appointment details...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonePage;
