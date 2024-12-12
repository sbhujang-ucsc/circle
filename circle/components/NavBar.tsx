"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav>
      {/* Links to pages for css devolpment, can be removed later */}
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/patient">Patient</Link>
      <Link href="/doctor">Doctor</Link>
      <Link href="/appointment">AppointmentInfo</Link>
    </nav>
    /* <nav className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Circle</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/ehr" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">EHR</Link>
                <Link href="/appointment" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Make an Appointment</Link>
                <Link href="/contact" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Contact my Doctor</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-800">
                <ShoppingCartIcon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-800">
                <UserIcon className="h-5 w-5" />
              </button>
              {!user ? (
                <>
                  <Link href="/login" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link href="/signup" className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="hover:text-purple-500 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/products" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
            <Link href="/gallery" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Gallery</Link>
            <Link href="/about" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="/contact" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>

            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex space-x-4 mt-3">
              <button className="flex-1 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center">
                <ShoppingCartIcon className="h-5 w-5" />
              </button>
              <button className="flex-1 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center">
                <UserIcon className="h-5 w-5" />
              </button>
            </div>

            {!user ? (
              <>
                <Link href="/login" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link href="/signup" className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Signup</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="hover:text-purple-500 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav> */
  );
};

export default NavBar;
