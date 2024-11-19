// app/signup/page.tsx

"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import darklogo from "../lightlogo.png";
import Image from "next/image";
import React from "react";

const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(""); // Modal message content

  const [emailError, setEmailError] = useState(""); // Email validation error message
  const [passwordError, setPasswordError] = useState(""); // Password validation error message

  // Email validation using regex pattern for basic email structure
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation: at least 6 characters
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSignup = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    if (!isEmailValid) {
      setEmailError("Invalid email address.");
    }
    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters long.");
    }
    /*if (error) alert(error.message);
    else {
      alert(
        "Signup successful! Please check your email to confirm your account."
      );
      router.push("/login");
    }*/

    // If both are valid, proceed with signup
    if (isEmailValid && isPasswordValid) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setModalMessage(error.message); // Set error message in the modal
        setIsModalOpen(true); // Show modal
      } else {
        setModalMessage(
          "Signup successful! Please check your email to confirm your account."
        );
        setIsModalOpen(true); // Show success message modal
      }
    }
  };

  // FUTURE USE -- Google & Apple sign in
  /*const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
    if (error) {
      setModalMessage(error.message);  // Display error in the modal
      setIsModalOpen(true);            // Show modal
    }
  };

  const handleAppleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
    });
    if (error) {
      setModalMessage(error.message);  // Display error in the modal
      setIsModalOpen(true);            // Show modal
    }
  }; */
  const [role, setRole] = React.useState("Patient");

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <div className="w-1/2 relative overflow-hidden rounded-r-3xl text-white">
        <img
          src="https://as1.ftcdn.net/v2/jpg/02/25/01/90/1000_F_225019061_tRisS4zm7uoE0XmcYrmKzlh4ozD7RdfB.jpg"
          alt="Desert"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-[#4e6dc1] bg-opacity-80"></div>
        <div className="absolute top-2 right-450">
          <Image
            src={darklogo}
            alt="Back Icon"
            className="max-h-[160px] max-w-[240px]"
          />
        </div>
        <div className="absolute bottom-24 right-[240px]">
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
      {/* Sign Up Field --------------- --------------- --------------- --------------- --------------- ---------------*/}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        {/* Doctor Patient Sign Up Toggle --------------- --------------- --------------- ---------------*/}
        <div className="flex flex-col items-center mb-10">
          <div className="relative rounded-full bg-gray-200 min-w-[600px]">
            {/* Sliding background */}
            <div
              className={`absolute top-0 left-1 w-1/2 h-full rounded-full bg-blue-500 transform transition-transform duration-500 ${
                role === "Doctor" ? "translate-x-full" : "translate-x-0"
              }`}
            ></div>

            {/* Toggle Buttons */}
            <div className="relative flex">
              <button
                onClick={() => setRole("Patient")}
                className={`${
                  role === "Patient" ? "text-white" : "text-gray-600"
                } flex-1 text-center text-2xl font-medium p-4 transition-colors duration-500`}
              >
                Patient Sign-Up
              </button>
              <button
                onClick={() => setRole("Doctor")}
                className={`${
                  role === "Doctor" ? "text-white" : "text-gray-600"
                } flex-1 text-center text-2xl font-medium p-4 transition-colors duration-500`}
              >
                Doctor Sign-Up
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-2">Create an account</h2>
        <p className="mb-8 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#6082EB] hover:underline">
            Login
          </a>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="input border-1 border-gray-400 w-full bg-gray-300 text-black px-4 py-2 pr-10 rounded-lg"
            />
            <input
              type="text"
              placeholder="Last name"
              className="input border-1 border-gray-400 w-full bg-gray-300 text-black px-4 py-2 pr-10 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border-1 border-gray-400 w-full bg-gray-300 text-black px-4 py-2 pr-10 rounded-lg"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}{" "}
            {/* Show email error */}
          </div>
          {/* Added phone number field here --------------- */}
          <div className="mb-4">
            <input
              type="phone"
              placeholder="Phone Number"
              id="phone"
              className="input border-1 border-gray-400 w-full bg-gray-300 text-black px-4 py-2 pr-10 rounded-lg"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}{" "}
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input border-1 border-gray-400 w-full bg-gray-300 text-black px-4 py-2 pr-10 rounded-lg"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}{" "}
            {/* Show password error */}
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
          <label className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2 checkbox border-gray-500 border-2"
            />
            <span>
              I agree to the{" "}
              <a className="text-[#6082EB] hover:underline">
                Terms & Conditions
              </a>
            </span>
          </label>
          <button
            type="submit"
            onClick={handleSignup}
            className="btn bg-[#6082EB] text-white w-full hover:bg-[#6082EB] transition duration-300 rounded-lg"
          >
            Create account
          </button>
        </form>
        <div className="mt-8">
          <p className="text-center text-gray-600 mb-4">Or register with</p>
          <button className="btn bg-gray-300 border border-gray-100 flex-1 w-full flex items-center justify-center hover:bg-[#6082EB] transition duration-300 rounded-lg">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_dark_color_92x30dp.png"
              alt="Google"
              className="h-6"
            />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Notice</h2>
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="btn bg-[#6082EB] text-black w-full hover:bg-[#6082EB] transition duration-300 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignupPage;
