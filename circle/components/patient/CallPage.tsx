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
    <div className="bg-[#dde3f2] text-black min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#356BBB] flex justify-between items-center border-b-4 border-b-solid border-b-[#edf9fe] p-4 text-[30px] font-bold font-exo">
        <button
          onClick={() => handlePageChange(1)}
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

      {/* Content */}
      <div className="flex-grow flex gap-8 px-10 py-10 mb-10">
        {/* Sidebar */}
        <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
          <div>
            <div className="h-0.5 bg-gray-400 my-4"></div>
            <div className="p-4 space-y-6">
              <p className="font-bold text-[#356BBB] text-2xl">STEP 1</p>
              <p className="text-[#356BBB] text-2xl font-semibold">
                Call our smart AI assistant
              </p>
            </div>
            <div className="h-0.5 bg-gray-400 my-4"></div>
            <div className="p-4 space-y-6">
              <p className="font-bold text-gray-600 text-2xl">STEP 2</p>
              <p className="text-gray-600 text-2xl font-semibold">
                Get ready for your appointment!
              </p>
            </div>
            <div className="h-0.5 bg-gray-400 my-4"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 rounded-2xl shadow-xl shadow-gray-500 px-12 py-10">
          <h2 className="text-3xl font-semibold mb-4">
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
    </div>
  );
};

export default CallPage;
