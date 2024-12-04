// app/page.tsx

"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          // Fetch the role from the `users` table using the user's ID
          const { data, error } = await supabase
            .from("users")
            .select("role")
            .eq("user_id", user.id)
            .single();

          if (error) {
            console.error("Error fetching user role:", error.message);
          } else {
            setRole(data.role); // Set the role in state
            console.log(`User role: ${data.role}`);
          }
        } catch (err) {
          console.error("Error fetching role:", err);
        }
      }
    };

    fetchUserRole();
  }, [user]);
  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to the Home Page.</h1>
        <h1>You shouldn't be able to access this.</h1>
        {role ? <p>Your role is: {role}</p> : <p>Loading role...</p>}
        <p>This is a protected route.</p>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
