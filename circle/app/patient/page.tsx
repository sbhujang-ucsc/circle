// app/patient/page.tsx

"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import patientlanding from "./patientlanding.jpeg";
import callpng from "./callpage.jpeg";
import Image from "next/image";

const PatientLanding = () => {
  const router = useRouter();

  // function to handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // state to track the current page (1, 2, or 3)
  const [currentPage, setCurrentPage] = useState(1);

  // function to navigate between pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 1 && (
        /// -----------------------------------------------------------------------------------------------------------
        /// Landing Page ------------------------------------------------------------------------------------------------
        /// -----------------------------------------------------------------------------------------------------------
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div
            className="bg-[#356BBB] flex justify-between items-center p-2
          text-[30px] font-semibold px-6"
          >
            <span className="text-white text-4xl">
              Welcome back, Example Name
            </span>
            <button
              onClick={handleLogout}
              className="text-white py-2 px-10 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
            >
              Log Out
            </button>
          </div>
          {/* Main */}
          <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
            {/* Left Box */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 p-4">
              <div className="flex items-center justify-center">
                <Image
                  src={patientlanding}
                  alt="Patient landing"
                  className="w-[800px]"
                />
              </div>
            </div>

            {/* Right Box */}
            <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10">
              <h2 className="text-black font-semibold text-4xl mb-16 mt-4">
                Book an appointment with Circle today!
              </h2>
              {/* Steps */}
              <div>
                {/* Step 1 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex items-center space-x-8 p-4">
                  <span className="font-bold text-gray-600 text-2xl">
                    STEP 1
                  </span>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Fill out a short questionnaire
                  </p>
                </div>

                {/* Step 2 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex items-center space-x-8 p-4">
                  <span className="font-bold text-gray-600 text-2xl">
                    STEP 2
                  </span>
                  <p className="text-gray-600  font-semibold text-2xl">
                    Call our smart AI assistant
                  </p>
                </div>

                {/* Step 3 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex items-center space-x-8 p-4">
                  <span className="font-bold text-gray-600 text-2xl">
                    STEP 3
                  </span>
                  <p className="text-gray-600 font-semibold text-2xl">
                    Get ready for your appointment!
                  </p>
                </div>
                <div className="h-0.5 bg-gray-400 my-4"></div>
              </div>
              {/* Steps Done */}
              <div className="flex justify-center">
                <button
                  onClick={() => handlePageChange(2)}
                  className="bg-[#356BBB] py-4 px-10 rounded-[40px] text-[30px] 
                  font-semibold hover:bg-[#174a95] mt-10 text-white"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 2 && (
        /// -----------------------------------------------------------------------------------------------------------
        /// Questionaire ------------------------------------------------------------------------------------------------
        /// -----------------------------------------------------------------------------------------------------------
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div
            className="bg-[#356BBB] flex justify-between items-center p-2
           text-[30px] font-semibold px-6"
          >
            <button
              onClick={() => handlePageChange(1)}
              className="text-white py-2 px-8 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
            >
              ← &nbsp;Cancel
            </button>
            <button
              onClick={handleLogout}
              className="text-white py-2 px-10 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
            >
              Log Out
            </button>
          </div>
          <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
            {/* Left Box */}
            <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
              <div>
                {/* Step 1 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex flex-col p-4 space-y-6">
                  <p className="font-bold text-[#174a95] text-2xl">STEP 1</p>
                  <p className="text-[#174a95] text-2xl font-semibold">
                    Fill out a short questionnaire
                  </p>
                </div>

                {/* Step 2 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 2</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Call our smart AI assisstant
                  </p>
                </div>

                {/* Step 3 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 3</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Get ready for your appointment!
                  </p>
                </div>
                <div className="h-0.5 bg-gray-400 my-4"></div>
              </div>
            </div>
            {/* Right Box */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
              <form>
                {/* First Input Section */}
                <div className="mb-6">
                  <label
                    htmlFor="symptoms"
                    className="block mb-2 text-2xl font-medium text-gray-900"
                  >
                    How are you feeling? Are there any symptoms you have?
                  </label>
                  <textarea
                    id="symptoms"
                    rows={5}
                    className="block p-4 w-full h-[20vh] text-lg text-gray-900 
                    bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your response here..."
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="additionalInfo"
                    className="block mb-2 text-2xl font-medium text-gray-900"
                  >
                    Is there anything else we should know?
                  </label>
                  <textarea
                    id="additionalInfo"
                    rows={5}
                    className="block p-4 w-full h-[20vh] text-lg text-gray-900 
                    bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your response here..."
                  ></textarea>
                </div>
              </form>

              <div className="flex justify-center mt-10">
                <button
                  onClick={() => handlePageChange(3)} // Navigate to the third page
                  className="bg-[#356BBB] p-4 px-10 rounded-[40px] text-[30px] 
                  font-semibold hover:bg-[#174a95] text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 3 && (
        /// -----------------------------------------------------------------------------------------------------------
        /// Call Page ------------------------------------------------------------------------------------------------
        /// -----------------------------------------------------------------------------------------------------------
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div
            className="bg-[#356BBB] flex justify-between items-center p-2
            text-[30px] font-semibold px-6"
          >
            <button
              onClick={() => handlePageChange(2)}
              className="text-white py-2 px-6 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer
              flex items-center gap-3"
            >
              ← &nbsp; Back
            </button>
            <button
              onClick={handleLogout}
              className="text-white py-2 px-10 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
            >
              Log Out
            </button>
          </div>
          <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
            {/* Left Box */}
            <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
              <div>
                {/* Step 1 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex flex-col p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 1</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Fill out a short questionnaire
                  </p>
                </div>

                {/* Step 2 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-[#174a95] text-2xl">STEP 2</p>
                  <p className="text-[#174a95] text-2xl font-semibold">
                    Call our smart AI assisstant
                  </p>
                </div>

                {/* Step 3 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 3</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Get ready for your appointment!
                  </p>
                </div>
                <div className="h-0.5 bg-gray-400 my-4"></div>
              </div>
            </div>
            {/* Right Box */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
              <h2 className="text-[35px] font-semibold">
                Thanks for filling out the form!
              </h2>
              <h2 className="text-[35px]">
                Call this number to talk to our smart assisstant:
              </h2>
              <p className="font-semibold font-exo text-[#356BBB] text-[45px] my-6 text-center">
                +1 123 - 123 - 4567
              </p>
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => handlePageChange(4)}
                  className="bg-[#356BBB] p-4 px-10 rounded-[40px] text-[30px] 
                  font-semibold hover:bg-[#174a95] text-white"
                >
                  Click here if done!
                </button>
              </div>
              <div className="flex justify-center absolute bottom-0 mb-16 left-1/2 ">
                <Image
                  src={callpng}
                  alt="Patient landing"
                  className="max-w-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 4 && (
        /// -----------------------------------------------------------------------------------------------------------
        /// Done with Call Page ------------------------------------------------------------------------------------------------
        /// -----------------------------------------------------------------------------------------------------------
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div
            className="bg-[#356BBB] flex justify-between items-center p-2
            text-[30px] font-semibold px-6"
          >
            <button
              onClick={() => handlePageChange(3)}
              className="text-white py-2 px-6 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer
              flex items-center gap-3"
            >
              ← &nbsp; Back
            </button>
            <button
              onClick={handleLogout}
              className="text-white py-2 px-10 rounded-xl bg-[#174a95] hover:bg-[#3b73c6] cursor-pointer"
            >
              Log Out
            </button>
          </div>
          <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
            {/* Left Box */}
            <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
              <div>
                {/* Step 1 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="flex flex-col p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 1</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Fill out a short questionnaire
                  </p>
                </div>

                {/* Step 2 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-gray-600 text-2xl">STEP 2</p>
                  <p className="text-gray-600 text-2xl font-semibold">
                    Call our smart AI assisstant
                  </p>
                </div>

                {/* Step 3 */}
                <div className="h-0.5 bg-gray-400 my-4"></div>
                <div className="p-4 space-y-6">
                  <p className="font-bold text-[#174a95] text-2xl">STEP 3</p>
                  <p className="text-[#174a95] text-2xl font-semibold">
                    Get ready for your appointment!
                  </p>
                </div>
                <div className="h-0.5 bg-gray-400 my-4"></div>
              </div>
            </div>

            {/* Right Box */}
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col items-center justify-center mt-4 py-4 px-10 mb-4">
                <h2 className="text-[42px] font-semibold tracking-tight">
                  Done with call!
                </h2>
                <h2 className="text-[42px] mx-16 text-center tracking-tight">
                  Congratulations, your appointment details have been generated:
                </h2>
              </div>

              <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
                <h1 className="text-4xl font-semibold border-b pb-2 mb-6 font-karla">
                  Appointment Details
                </h1>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">Location</h2>
                  <p className="text-gray-700 text-xl">
                    12345 Example St, Santa Cruz, CA, 95060
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold">Date</h2>
                  <p className="text-gray-700 text-xl">November 12, 2024</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Time</h2>
                  <p className="text-gray-700 text-xl">12:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientLanding;
