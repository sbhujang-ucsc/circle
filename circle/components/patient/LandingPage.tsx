import Image from "next/image";
import patientlanding from "./patientlanding.jpeg";
import { useEffect } from "react";

const LandingPage = ({ handleLogout, handlePageChange }) => {
  useEffect(() => {
    console.log("LandingPage Rendered");
  }, []);
  
  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
        <span className="text-white text-4xl font-semibold">
          Welcome back, Example Name
        </span>
        <button
          onClick={handleLogout}
          className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] rounded-2xl hover:bg-[#174a95]"
        >
          Log Out
        </button>
      </div>
      
      {/* Main */}
      <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
        {/* Left Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 p-4">
          <div className="flex items-center justify-center">
            <Image src={patientlanding} alt="Patient landing" className="w-[800px]" />
          </div>
        </div>

        {/* Right Box */}
        <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10">
          <h2 className="text-black font-semibold text-4xl mb-16 mt-4">
            Book an appointment with Circle today!
          </h2>
          
          {/* Steps */}
          <div>
            <div className="h-0.5 bg-gray-400 my-4"></div>
            <div className="flex items-center space-x-8 p-4">
              <span className="font-bold text-gray-600 text-2xl">STEP 1</span>
              <p className="text-gray-600 text-2xl font-semibold">
                Fill out a short questionnaire
              </p>
            </div>

            {/* Step 2 */}
            <div className="h-0.5 bg-gray-400 my-4"></div>
            <div className="flex items-center space-x-8 p-4">
              <span className="font-bold text-gray-600 text-2xl">STEP 2</span>
              <p className="text-gray-600 text-2xl font-semibold">
                Call our smart AI assistant
              </p>
            </div>

            {/* Step 3 */}
            <div className="h-0.5 bg-gray-400 my-4"></div>
            <div className="flex items-center space-x-8 p-4">
              <span className="font-bold text-gray-600 text-2xl">STEP 3</span>
              <p className="text-gray-600 text-2xl font-semibold">
                Get ready for your appointment!
              </p>
            </div>
            <div className="h-0.5 bg-gray-400 my-4"></div>
          </div>
          
          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handlePageChange(2)}
              className="bg-[#356BBB] py-4 px-10 rounded-[40px] text-[30px] font-semibold hover:bg-[#174a95] mt-10 text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
