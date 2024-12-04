// CallPage.tsx
import Image from "next/image";
import backIcon from "./back.png";
import callpng from "./callpage.jpeg";
import { useEffect } from "react";
import Sidebar from "@/components/patient/Sidebar";

const CallPage = ({ handleLogout, handlePageChange }) => {
  useEffect(() => {
    console.log("CallPage Rendered");
  }, []);
  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
        <button
          onClick={() => handlePageChange(2)}
          className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] flex items-center rounded-2xl hover:bg-[#174a95]"
        >
          <Image src={backIcon} alt="Back Icon" className="h-8 w-8 mr-2" />
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
      <Sidebar />
        
        {/* Right Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
          <h2 className="text-[35px] font-semibold">Thanks for filling out the form!</h2>
          <h2 className="text-[35px]">Call this number to talk to our smart assistant:</h2>
          <p className="font-semibold font-exo text-[#356BBB] text-[45px] my-6 text-center">
            (123) 456-7890
          </p>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => handlePageChange(4)}
              className="bg-[#356BBB] p-4 px-10 rounded-[40px] text-[30px] font-semibold hover:bg-[#174a95] text-white"
            >
              Click here if done!
            </button>
          </div>
          <div className="flex justify-center absolute bottom-0 mb-16 left-1/2 ">
            <Image src={callpng} alt="Call Page" className="max-w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallPage;