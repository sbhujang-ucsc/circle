// app/login/page.tsx

"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-2">Login to Circle</h2>
        <p className="mb-8 text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#6082EB] hover:underline">
            Sign up
          </a>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
            />
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="btn bg-[#6082EB] text-white w-full hover:bg-[#6082EB] transition duration-300 rounded-lg"
          >
            Login
          </button>
        </form>
        <div className="mt-8">
          <p className="text-center text-gray-400 mb-4">Or sign in with</p>
          <button className="btn border border-gray-700 flex-1 w-full flex items-center justify-center hover:bg-gray-800 transition duration-300 rounded-lg">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png"
              alt="Google"
              className="h-6"
            />
          </button>
        </div>
      </div>
      <div className="w-1/2 relative overflow-hidden rounded-l-3xl">
        <img
          src="https://images.unsplash.com/photo-1581594693690-517d9a71e1f2?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Desert"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-[#4e6dc1] bg-opacity-50"></div>
        <div className="absolute top-8 left-8">||||||</div>
        <div className="absolute top-8 right-8">
          <h1 className="text-3xl font-bold">Circle</h1>
        </div>
        <div className="absolute bottom-16 right-8">
          <h2 className="text-4xl font-bold mb-4">
            Reconnecting Doctors & Patients
            <br />
            Saving Memories
          </h2>
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
