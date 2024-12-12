import React, { useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { extractTextFromPDF } from "@/lib/pdfUtils";
import ChatbotModal from "./chatbot"; // Import ChatbotModal

interface SummaryProps {
  patientUUID: string | null;
  apptId: string | null;
}

const Summary = ({ patientUUID, apptId }: SummaryProps) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  /**
   * Fetch patient data from Supabase. If `basic_data` is null,
   * extract data from EHR, process with API, and update the database.
   */
  const fetchPatientData = async () => {
    if (!patientUUID) return;

    try {
      // Fetch patient details
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("first_name, last_name, basic_data")
        .eq("user_id", patientUUID)
        .single();

      if (patientError)
        throw new Error(`Patient fetch error: ${patientError.message}`);

      if (!patient.basic_data) {
        // Parse EHR and process via API
        const ehrText = await extractTextFromPDF("/ehr.pdf"); // Replace with dynamic EHR location
        const response = await fetch("/api/extract-patient-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ parsedText: ehrText }),
        });

        if (!response.ok) throw new Error("Failed to process EHR text");

        const { data: processedData } = await response.json();

        // Update Supabase with processed data
        const { error: updateError } = await supabase
          .from("patients")
          .update({ basic_data: processedData })
          .eq("user_id", patientUUID);

        if (updateError)
          throw new Error(
            `Failed to update patient data: ${updateError.message}`
          );

        patient.basic_data = processedData; // Use updated data
      }

      setPatientInfo(patient);
    } catch (error: any) {
      console.error("Error fetching patient data:", error.message);
    }
  };

  /**
   * Fetch appointment data from Supabase.
   */
  const fetchAppointmentData = async () => {
    if (!apptId) return;

    try {
      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .select("datetime, transcript")
        .eq("appointment_id", apptId)
        .single();

      if (appointmentError)
        throw new Error(`Appointment fetch error: ${appointmentError.message}`);

      setAppointmentData(appointment);

      // Extract symptoms from the transcript
      const extractedSymptoms = appointment?.transcript?.symptoms || ["N/A"];
      setSymptoms(extractedSymptoms);
    } catch (error: any) {
      console.error("Error fetching appointment data:", error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPatientData();
      await fetchAppointmentData();
    };
    loadData();
  }, [patientUUID, apptId]);

  if (!patientInfo || !appointmentData) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex space-x-8 w-[80%] mx-auto mt-8 items-stretch">
        {/* Patient Details Card */}
        <div
          className="bg-[#B8D8ED] text-gray-800 rounded-2xl shadow-lg shadow-gray-400
         p-6 w-[30%] flex flex-col min-h-[80vh]"
        >
          <h3 className="text-4xl text-[#174a95] font-bold mt-4 text-center">
            {patientInfo.first_name}{" "}
            {patientInfo.last_name || "Unknown Patient"}
          </h3>

          <table className="w-full text-left text-gray-800 text-lg my-8">
            <tbody>
              <tr>
                <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                  Age
                </th>
                <td className="py-2 pl-10">
                  {patientInfo.basic_data.age || "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                  Gender
                </th>
                <td className="py-2 pl-10">
                  {patientInfo.basic_data.gender || "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                  Weight
                </th>
                <td className="py-2 pl-10">
                  {patientInfo.basic_data.weight || "N/A"}kg
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                  Height
                </th>
                <td className="py-2 pl-10">
                  {patientInfo.basic_data.height || "N/A"}
                </td>
              </tr>
              <tr>
                <th className="py-2 pr-4 font-medium text-right border-r border-r-2 border-gray-700">
                  Allergies
                </th>
                <td className="py-2 pl-10">
                  {patientInfo.basic_data.allergies || "None"}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="flex flex-col text-2xl text-gray-800 font-semibold my-6">
            <span>Appointment:</span>
            <span className="block">
              {new Date(appointmentData.datetime).toLocaleString()}
            </span>
          </p>
          <div className="flex flex-col items-start">
            <p className="text-2xl font-semibold">Symptoms:</p>
            <ul className="ml-8 list-disc text-2xl text-gray-800">
              {symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panels */}
        <div className="flex flex-col gap-6 w-[60%] min-h-[80vh] text-xl text-gray-800">
          {/* AI Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              AI Summary
            </h3>
            <p>
              The patient has these symptoms, and these relevant underlying
              conditions . . . (Generated using LLM in the future)
            </p>
          </div>

          {/* Inconsistencies/Warnings */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              Inconsistencies / Warnings
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Has this allergy, which could affect this medication . . .
              </li>
              <li>
                Currently taking these medications, which are correlated with
                this symptom . . .
              </li>
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 flex-grow">
            <h3 className="text-2xl text-[#174a95] font-bold mb-4">
              Suggested Ideas
            </h3>
            <ul className="list-disc pl-6">
              <li>Medication list here . . .</li>
              <li>Talk about this to clarify . . .</li>
            </ul>
          </div>
        </div>
        {/* Chatbot Modal */}
        {isChatbotOpen && <ChatbotModal onClose={toggleChatbot} />}
      </div>

      {/* Chat with AI Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={toggleChatbot}
          className="bg-[#356BBB] text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-[#174a95] flex items-center space-x-2"
        >
          <span>💬</span>
          <span>Chat with AI</span>
        </button>
      </div>
    </div>
  );
};

export default Summary;
