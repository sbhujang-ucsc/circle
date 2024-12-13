import React from "react";
import AudioRecorder from "@/components/AudioRecorder";
import ConversationHistory from "@/components/ConversationHistory";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";
import Sidebar from "@/components/patient/Sidebar";
import { supabase } from "@/lib/supabaseClient";

const CallPage = ({
  handleLogout,
  handlePageChange,
  appointmentID,
}: {
  handleLogout: () => void;
  handlePageChange: (page: number) => void;
  appointmentID: string | null;
}) => {
  // const textToJSON = (transcript: string) => {
  //   const lines = transcript.split("\n"); // Split the text into lines
  //   const conversation: Array<{ speaker: string; text: string }> = []; // Typed array for the conversation

  //   lines.forEach((line) => {
  //     const match = line.match(/^(You|AI):\s(.+)$/); // Match speaker and text
  //     if (match) {
  //       const [_, speaker, text] = match; // Extract speaker and text
  //       conversation.push({ speaker, text });
  //     }
  //   });

  //   return conversation;
  // };
  const {
    isProcessing,
    conversationHistory,
    processVoiceMessage,
    audioRef,
  } = useVoiceAssistant({
    onSessionEnd: async (localConversationHistory) => {
      try {
        if (appointmentID && localConversationHistory.length > 0) {
          // Update the transcript column in the appointments table
          const { error } = await supabase
            .from("appointments")
            .update({ transcript: localConversationHistory })
            .eq("appointment_id", appointmentID);
    
          if (error) {
            console.error("Error updating transcript in Supabase:", error);
          } else {
            console.log("Transcript successfully saved to Supabase.");
          }
        }
      } catch (error) {
        console.error("Error saving transcript:", error);
      }
    
      console.log("Session ended. Transcript:", localConversationHistory);
      handlePageChange(4); // Navigate to DonePage
    }    
  });

  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl m-6 p-8">
        <div className="flex justify-between items-center border-b-4 border-[#edf9fe] pb-4 mb-6">
          <button
            onClick={() => handlePageChange(1)} // again skipping questionaire page because redundant
            className="bg-[#356BBB] text-white p-4 px-6 rounded-lg hover:bg-[#174a95]"
          >
            Back
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#356BBB] text-white p-4 px-6 rounded-lg hover:bg-[#174a95]"
          >
            Log Out
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Speak with our smart assistant
        </h2>
        <AudioRecorder
          onRecordingComplete={processVoiceMessage}
          disabled={isProcessing}
        />

        <div className="mt-8">
          <ConversationHistory history={conversationHistory} />
        </div>

        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default CallPage;
