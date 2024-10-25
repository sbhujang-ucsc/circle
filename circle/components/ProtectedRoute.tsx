// components/ProtectedRoute.tsx

'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user]);

  if (user === null) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

export default ProtectedRoute;
