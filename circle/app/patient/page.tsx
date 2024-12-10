"use client";

import { useState, useEffect, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/components/patient/LandingPage";
import QuestionnairePage from "@/components/patient/QuestionnairePage";
import CallPage from "@/components/patient/CallPage";
import DonePage from "@/components/patient/DonePage";

const PatientLanding = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [appointment, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        />
      )}
      {currentPage === 2 && (
        <QuestionnairePage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
        />
      )}
      {currentPage === 3 && (
        <CallPage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
        />
      )}
      {currentPage === 4 && (
        <DonePage
          handleLogout={handleLogout}
          handlePageChange={handlePageChange}
        />
      )}
    </ProtectedRoute>
  );
};

export default PatientLanding;
