// components/NavBar.tsx

'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      {!user ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default NavBar;
