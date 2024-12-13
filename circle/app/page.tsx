// app/page.tsx

"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to /login page
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserRole = async () => {
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
    };

    fetchUserRole();
  }, [user, router]);

  if (!user || role === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

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
