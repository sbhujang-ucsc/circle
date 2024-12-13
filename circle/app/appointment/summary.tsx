import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ChatbotModal from "./chatbot";

interface SummaryProps {
  apptId: string | null; // Appointment ID passed as a prop
}

const Summary = ({ apptId }: SummaryProps) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiWarnings, setAiWarnings] = useState<string | null>(null); // New state for AI-generated warnings
  const [loading, setLoading] = useState(true);

  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchAppointmentAndSummary = async () => {
    if (!apptId) return;

    try {
      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .select("datetime, transcript, patient")
        .eq("appointment_id", apptId)
        .single();
      if (appointmentError) throw new Error(appointmentError.message);
      setAppointmentData(appointment);

      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("first_name, last_name, basic_data")
        .eq("user_id", appointment.patient)
        .single();
      if (patientError) throw new Error(patientError.message);
      setPatientInfo(patient);

      // Fetch AI Warnings
      const warningsResponse = await fetch("http://localhost:8080/getTranscriptAnalysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment_id: apptId }),
      });
      if (!warningsResponse.ok) throw new Error(await warningsResponse.text());
      const { analysis } = await warningsResponse.json();
      setAiWarnings(analysis);

      const response = await fetch("http://localhost:8080/getTranscriptSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment_id: apptId }),
      });
      if (!response.ok) throw new Error(await response.text());
      const { summary } = await response.json();
      setAiSummary(summary);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentAndSummary();
  }, [apptId]);

  const formatSummary = (summary: string) => {
    const lines = summary.split("\n").filter((line) => line.trim() !== "");
    const formattedSummary: JSX.Element[] = [];
  
    let currentList: JSX.Element[] = [];
    let currentNestedList: JSX.Element[] = [];
    let inList = false;
    let inNestedList = false;
  
    const pushCurrentLists = () => {
      if (inNestedList) {
        currentList.push(
          <ul key={`nested-${Math.random()}`} className="list-disc ml-8 mb-2 text-black">
            {currentNestedList}
          </ul>
        );
        currentNestedList = [];
        inNestedList = false;
      }
  
      if (inList) {
        formattedSummary.push(
          <ul key={`list-${Math.random()}`} className="list-disc ml-6 mb-4 text-black">
            {currentList}
          </ul>
        );
        currentList = [];
        inList = false;
      }
    };
  
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
  
      // Check for headers
      if (trimmedLine.startsWith("# ")) {
        // Close any open lists before starting a header
        pushCurrentLists();
        formattedSummary.push(
          <h3
            key={`header-${index}`}
            className="text-xl font-bold mt-4 mb-2 text-black"
          >
            {trimmedLine.replace("# ", "")}
          </h3>
        );
        return;
      }
  
      // Identify if this is a bullet line
      const leadingSpacesMatch = line.match(/^(\s*)- /);
      if (leadingSpacesMatch) {
        const leadingSpaces = leadingSpacesMatch[1].length;
        const isNested = leadingSpaces >= 2; // Two or more spaces indicates a nested bullet
  
        // Extract formatting (bold, italic) if present
        let content = trimmedLine.replace(/^- /, "");
        const boldMatch = content.match(/\*\*(.*?)\*\*/);
        const italicMatch = content.match(/\*(.*?)\*/);
  
        const boldText = boldMatch ? boldMatch[1] : "";
        const italicText = italicMatch ? italicMatch[1] : "";
  
        content = content.replace(/\*\*(.*?)\*\*/, "").replace(/\*(.*?)\*/, "").trim();
  
        // Remove extra colon duplication
        const finalText = italicText
          ? content.startsWith(":")
            ? content // Preserve existing colon
            : `: ${content}` // Add colon if missing
          : content;
  
        // If this is a top-level bullet
        if (!isNested) {
          // If we were in a nested list, close it first
          if (inNestedList) {
            currentList.push(
              <ul key={`nested-${index}`} className="list-disc ml-8 mb-2 text-black">
                {currentNestedList}
              </ul>
            );
            currentNestedList = [];
            inNestedList = false;
          }
  
          inList = true;
          currentList.push(
            <li key={`list-item-${index}`} className="text-black">
              {boldText && <span className="font-bold">{boldText}</span>}
              {boldText && italicText ? " " : ""}
              {italicText && <span className="italic">{italicText}</span>}
              {italicText && finalText ? " " : ""}
              {finalText}
            </li>
          );
        } else {
          // Nested bullet
          inList = true; // Ensure parent list is open
          inNestedList = true;
          currentNestedList.push(
            <li key={`nested-list-item-${index}`} className="text-black">
              {boldText && <span className="font-bold">{boldText}</span>}
              {boldText && italicText ? " " : ""}
              {italicText && <span className="italic">{italicText}</span>}
              {italicText && finalText ? " " : ""}
              {finalText}
            </li>
          );
        }
      } else {
        // Line does not start with "#" or "-", so it's likely text not in a list
        pushCurrentLists();
        formattedSummary.push(
          <p key={`paragraph-${index}`} className="text-black mb-2">
            {trimmedLine}
          </p>
        );
      }
    });
  
    // Close any remaining open lists
    pushCurrentLists();
  
    return <div>{formattedSummary}</div>;
  };
  

  if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;

  if (!patientInfo || !appointmentData) {
    return <div className="text-center text-lg mt-10">No data available.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-screen bg-[#356BBB] text-white shadow-lg transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">{`${patientInfo.first_name} ${patientInfo.last_name}`}</h3>
          <p className="text-black">Age: {patientInfo.basic_data?.age || "N/A"}</p>
          <p className="text-black">Gender: {patientInfo.basic_data?.gender || "N/A"}</p>
          <p className="text-black">Weight: {patientInfo.basic_data?.weight || "N/A"}kg</p>
          <p className="text-black">Height: {patientInfo.basic_data?.height || "N/A"}</p>
          <p className="text-black">Allergies: {patientInfo.basic_data?.allergies || "None"}</p>
          <p className="text-black mt-4 text-sm">
            Appointment Date:{" "}
            {new Date(appointmentData.datetime).toLocaleString()}
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow flex flex-col gap-6 px-6 pt-6 overflow-y-auto">
        <button
          className="bg-[#356BBB] text-white py-2 px-4 rounded-lg self-start"
          onClick={toggleSidebar}
        >
          View Patient Info
        </button>
        <div className="grid grid-cols-3 gap-6">
          {/* AI Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-black">Summary</h3>
            {aiSummary ? (
              <div>{formatSummary(aiSummary)}</div>
            ) : (
              <p className="text-gray-500">Loading AI summary...</p>
            )}
          </div>
          {/* Inconsistencies/Warnings */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Inconsistencies / Warnings
            </h3>
              {aiWarnings ? (
                <div>{formatSummary(aiWarnings)}</div>
              ) : (
                <p className="text-gray-500">Loading AI warnings...</p>
              )}
          </div>
          {/* Suggestions */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Suggested Ideas
            </h3>
            <ul className="list-disc pl-6 text-black">
              <li>Example suggestion: Medication options...</li>
              <li>Example suggestion: Questions to clarify...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
