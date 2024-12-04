import React from "react";
import AudioRecorder from "@/components/AudioRecorder";
import ConversationHistory from "@/components/ConversationHistory";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";
import Sidebar from "@/components/patient/Sidebar";

const CallPage = ({ handleLogout, handlePageChange }: { handleLogout: () => void; handlePageChange: (page: number) => void }) => {
  const { isProcessing, conversationHistory, finalTranscript, processVoiceMessage, audioRef } =
    useVoiceAssistant({
      onSessionEnd: async () => {
        console.log("Session ended. Final Transcript:", finalTranscript);
        handlePageChange(4); // Navigate to DonePage
      },
    });

  return (
    <div className="bg-[#dde3f2] text-black min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl m-6 p-8">
        <div className="flex justify-between items-center border-b-4 border-[#edf9fe] pb-4 mb-6">
          <button
            onClick={() => handlePageChange(2)}
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

        <h2 className="text-2xl font-semibold mb-4">Speak with our smart assistant</h2>
        <AudioRecorder onRecordingComplete={processVoiceMessage} disabled={isProcessing} />

        <div className="mt-8">
          <ConversationHistory history={conversationHistory} />
        </div>

        <audio ref={audioRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default CallPage;
