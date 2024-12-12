// // REDUNDANT
// // NOT USING ANYMORE
// // REMOVE ALL REFERENCES FROM OTHER PAGES TO THIS PAGE

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Sidebar from "@/components/patient/Sidebar";

// const QuestionnairePage = ({ handleLogout, handlePageChange }) => {
//   const [symptoms, setSymptoms] = useState("");
//   const [additionalInfo, setAdditionalInfo] = useState("");

//   useEffect(() => {
//     console.log("QuestionnairePage Rendered");
//   }, []);

//   return (
//     <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
//       {/* Top bar */}
//       <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
//         <button
//           onClick={() => handlePageChange(1)}
//           className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] flex items-center rounded-2xl hover:bg-[#174a95]"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleLogout}
//           className="bg-[#356BBB] text-white border-2 border-white p-2 px-4 text-[30px] rounded-2xl hover:bg-[#174a95]"
//         >
//           Log Out
//         </button>
//       </div>

//       {/* Main content */}
//       <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
//         {/* Left Box */}
//         <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
//           <Sidebar />
//         </div>

//         {/* Right Box - Questionnaire Form */}
//         <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-400 px-8 py-12">
//           <form>
//             {/* First Input Section */}
//             <div className="mb-6">
//               <label
//                 htmlFor="symptoms"
//                 className="block mb-2 text-2xl font-medium text-gray-900"
//               >
//                 How are you feeling? Are there any symptoms you have?
//               </label>
//               <textarea
//                 id="symptoms"
//                 value={symptoms}
//                 onChange={(e) => setSymptoms(e.target.value)}
//                 rows={5}
//                 className="block p-4 w-full h-[20vh] text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your response here..."
//               ></textarea>
//             </div>

//             {/* Second Input Section */}
//             <div className="mb-6">
//               <label
//                 htmlFor="additionalInfo"
//                 className="block mb-2 text-2xl font-medium text-gray-900"
//               >
//                 Is there anything else we should know?
//               </label>
//               <textarea
//                 id="additionalInfo"
//                 value={additionalInfo}
//                 onChange={(e) => setAdditionalInfo(e.target.value)}
//                 rows={5}
//                 className="block p-4 w-full h-[20vh] text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your response here..."
//               ></textarea>
//             </div>
//           </form>

//           <div className="flex justify-center mt-10">
//             <button
//               onClick={() => handlePageChange(3)} // Navigate to the third page
//               className="bg-[#356BBB] p-4 px-10 rounded-[40px] text-[30px] font-semibold hover:bg-[#174a95] text-white"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionnairePage;
