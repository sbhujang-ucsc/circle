import { useEffect } from "react";

// DonePage.tsx
const DonePage = ({ handleLogout, handlePageChange }) => {
    useEffect(() => {
        console.log("DonePage Rendered");
      }, []);
    
    return (
      <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
          <button
            onClick={() => handlePageChange(3)}
            className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] flex items-center rounded-2xl hover:bg-[#174a95]"
          >
            Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] rounded-2xl hover:bg-[#174a95]"
          >
            Log Out
          </button>
        </div>
        
        <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
          {/* Left Box */}
          <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
            <div>
              <div className="h-0.5 bg-gray-400 my-4"></div>
              <div className="flex flex-col p-4 space-y-6">
                <p className="font-bold text-gray-600 text-2xl">STEP 1</p>
                <p className="text-gray-600 text-2xl font-semibold">Fill out a short questionnaire</p>
              </div>
              <div className="h-0.5 bg-gray-400 my-4"></div>
              <div className="p-4 space-y-6">
                <p className="font-bold text-gray-600 text-2xl">STEP 2</p>
                <p className="text-gray-600 text-2xl font-semibold">Call our smart AI assistant</p>
              </div>
              <div className="h-0.5 bg-gray-400 my-4"></div>
              <div className="p-4 space-y-6">
                <p className="font-bold text-[#356BBB] text-2xl">STEP 3</p>
                <p className="text-[#356BBB] text-2xl font-semibold">Get ready for your appointment!</p>
              </div>
              <div className="h-0.5 bg-gray-400 my-4"></div>
            </div>
          </div>
          
          {/* Right Box */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col items-center justify-center mt-4 py-4 px-10 mb-4">
              <h2 className="text-[42px] font-karla font-semibold tracking-tight">
                Done with call!
              </h2>
              <h2 className="text-[42px] font-karla mx-16 text-center tracking-tight">
                Congratulations, your appointment details have been generated:
              </h2>
            </div>
  
            <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
              <h1 className="text-4xl font-exo font-semibold border-b pb-2 mb-6">
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
    );
  };
  
  export default DonePage;