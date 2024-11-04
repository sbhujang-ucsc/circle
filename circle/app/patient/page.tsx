// app/login/page.tsx

"use client";

import { useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import "./patient.css";
import backIcon from "./back.png";
import Image from "next/image";

const PatientLanding = () => {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // State to track the current page (1, 2, or 3)
  const [currentPage, setCurrentPage] = useState(1);

  // Function to navigate between pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 1 && (
        // First Page
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div className="bg-[#6082EB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe ] rounded-br-lg rounded-bl-lg p-4 text-[30px] font-bold font-exo">
            <span className="text-white text-4xl font-semibold">
              Welcome back, Example Name
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#609ceb] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#6082eb]"
            >
              Log Out
            </button>
          </div>
          <div className="bg-white py-[150px] px-[60px] mx-auto shadow-lg rounded-2xl mt-[50px] min-h-96">
            <div className="flex flex-col items-center justify-center flex-grow space-y-8 ">
              <h1 className="text-[50px] font-bold font-exo">
                Want to make an Appointment?
              </h1>
              <button
                onClick={() => handlePageChange(2)} // Navigate to the second page
                className="border-4 border-[#6082eb] bg-[#9baee5] py-2 px-10 rounded-[40px] text-[40px] font-exo hover:scale-110 hover:bg-[#90a3da] transition-transform"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 2 && (
        // Second Page
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div className="bg-[#6082EB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe ] rounded-br-lg rounded-bl-lg p-4 text-[30px] font-bold font-exo">
            <button
              onClick={() => handlePageChange(1)}
              className=" text-[30px] font-bold font-exo bg-[#609ceb] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#6082eb] flex items-center"
            >
              <Image src={backIcon} alt="Back Icon" className="h-8 w-8 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#609ceb] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#6082eb]"
            >
              Log Out
            </button>
          </div>
          <div className="flex flex-col px-10 py-10 justify-center space-y-5 mt-[20px] relative bg-white mx-[200px] shadow-lg rounded-3xl">
            <h2 className="text-[40px] font-bold font-exo">
              Fill Out the Form
            </h2>

            <form>
              {/* First Input Section */}
              <div className="mb-6">
                <label
                  htmlFor="symptoms"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  How are you feeling? Are there any symptoms you have?
                </label>
                <textarea
                  id="symptoms"
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your response here..."
                ></textarea>
              </div>

              {/* Second Input Section */}
              <div className="mb-6">
                <label
                  htmlFor="additionalInfo"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Is there anything else we should know?
                </label>
                <textarea
                  id="additionalInfo"
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your response here..."
                ></textarea>
              </div>
            </form>

            <button
              onClick={() => handlePageChange(3)} // Navigate to the third page
              className="mt-4 bg-[#9baee5] border-4 border-[#6082eb] py-2 px-10 rounded-[40px] text-[30px] font-exo hover:bg-[#90a3da]"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {currentPage === 3 && (
        // Third Page
        <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
          {/* Top bar */}
          <div className="bg-[#6082EB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe ] rounded-br-lg rounded-bl-lg p-4 text-[30px] font-bold font-exo">
            <button
              onClick={() => handlePageChange(2)}
              className=" text-[30px] font-bold font-exo bg-[#609ceb] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#6082eb] flex items-center"
            >
              <Image src={backIcon} alt="Back Icon" className="h-8 w-8 mr-2" />
              Back
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#609ceb] text-white border-2 border-white p-2 px-4 text-[30px] rounded-lg hover:bg-[#6082eb]"
            >
              Log Out
            </button>
          </div>
          <div className="flex flex-col px-10 py-10 justify-center items-center space-y-5 mt-[20px] relative bg-white mx-[200px] shadow-lg rounded-3xl">
            <h2 className="text-[40px] font-exo">
              Call this number to talk to our smart assisstant!
            </h2>

            <div className="mt-4 bg-[#9baee5] border-4 border-[#6082eb] py-2 px-10 rounded-[40px] text-[30px] mx-auto font-exo hover:bg-[#90a3da]">
              +1 111 - 222 - 3333
            </div>
          </div>
        </div>
      )}

      {/* Patient EHR to maybe implement later 
      
      <div className="patient-container">
        <div className="flex flex-row pt-4">
          <div className="w-[50vh] min-h-[80vh] rounded-lg border-2 border-[#6082eb] flex flex-col">
            <div className="m-4 p-2 bg-[#b2c5fc] rounded-lg">
              <h2 className="text-xl">Example Patient Name</h2>
              <p>Age:</p>
              <p>Height:</p>
              <p>Weight:</p>
              <p>Gender:</p>
              <p>Date Updated:</p>
            </div>
            <div className="bg-[#b2c5fc] rounded-lg m-4 p-2">
              <div className="flex">
                <h2 className="text-xl">Contact Info</h2>
              </div>
              <p>Address:</p>
              <p className="pl-4"> &emsp; address line 1</p>
              <p className="pl-4"> &emsp; address line 2</p>
              <p className="pl-4"> &emsp; address line 3</p>
              <p>Phone:</p>
              <p>Email:</p>
            </div>
            <div className="bg-[#b2c5fc] rounded-lg m-4 p-2">
              <div className="flex">
                <h2 className="text-xl">Provider Info</h2>
              </div>
              <p>Address:</p>
              <p className="pl-4"> &emsp; address line 1</p>
              <p className="pl-4"> &emsp; address line 2</p>
              <p className="pl-4"> &emsp; address line 3</p>
              <p>Phone:</p>
              <p>Email:</p>
            </div>
          </div>

          <div className="patient-body">
            <details className="collapse collapse-plus item">
              <summary className="collapse-title text-xl font-medium">
                Current Symptoms
              </summary>
              <div className="collapse-content">
                <p>content</p>
                <p>content</p>
                <p>content</p>
              </div>
            </details>
            <details className="collapse collapse-plus item">
              <summary className="collapse-title text-xl font-medium">
                Current Medication
              </summary>
              <div className="collapse-content">
                <p>content</p>
              </div>
            </details>
            <details className="collapse collapse-plus item">
              <summary className="collapse-title text-xl font-medium">
                Medical History
              </summary>
              <div className="collapse-content">
                <p>content</p>
              </div>
            </details>
            <details className="collapse collapse-plus item">
              <summary className="collapse-title text-xl font-medium">
                Vaccination History
              </summary>
              <div className="collapse-content">
                <p>content</p>
              </div>
            </details>
            <details className="collapse collapse-plus item">
              <summary className="collapse-title text-xl font-medium">
                Test Results
              </summary>
              <div className="collapse-content">
                <p>content</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    */}
    </>
  );
};

export default PatientLanding;