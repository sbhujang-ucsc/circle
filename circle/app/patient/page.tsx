"use client";

import { useState, useEffect, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/components/patient/LandingPage";
// import QuestionnairePage from "@/components/patient/QuestionnairePage";
import CallPage from "@/components/patient/CallPage";
import DonePage from "@/components/patient/DonePage";

const PatientLanding = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [patientUUID, setPatientUUID] = useState<string | null>(null);
  const [appointmentID, setAppointmentID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user) return;

      try {
        // Fetch patient's name
        const { data: patientData, error: patientError } = await supabase
          .from("users")
          .select("user_id, first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (patientError) throw patientError;

        setPatientName(`${patientData.first_name} ${patientData.last_name}`);
        setPatientUUID(patientData.user_id);

        // Fetch the single appointment ID for the patient
        const { data: appointmentData, error: appointmentError } =
          await supabase
            .from("appointments")
            .select("appointment_id")
            .eq("patient", user.id)
            .single();

        if (appointmentError) throw appointmentError;

        setAppointmentID(appointmentData.appointment_id);
      } catch (error: any) {
        console.error("Error fetching patient data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [user]);

  // Function to handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    console.log("Navigating to page:", page);
    setCurrentPage(page);
  };

  return (
    <ProtectedRoute allowedRoles={["Patient", "Admin"]}>
      {currentPage === 1 && (
        <LandingPage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
          patientUUID={patientUUID}
          patientName={patientName}
        />
      )}
      {/* {currentPage === 2 && (
        <QuestionnairePage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
          patientUUID={patientUUID}
        />
      )} */}
      {currentPage === 3 && (
        <CallPage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
          appointmentID={appointmentID}
        />
      )}
      {currentPage === 4 && (
        <DonePage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
          appointmentID={appointmentID}
        />
      )}
    </ProtectedRoute>
  );
};

export default PatientLanding;
