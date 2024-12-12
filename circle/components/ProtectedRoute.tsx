"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // Allow undefined and make it optional
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
        } else {
          setRole(data.role);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    if (user && role && !allowedRoles.includes(role)) {
      router.push("/login"); // Redirect if user role is not allowed
    }
  }, [user, role, allowedRoles]);

  if (!user || role === null) {
    return null; // Optionally return a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
