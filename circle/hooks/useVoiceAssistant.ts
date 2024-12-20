import { useState, useRef } from "react";

interface Message {
  role: "user" | "assistant"; // Define possible roles
  content: string; // Define content as a string
}

const useVoiceAssistant = ({ onSessionEnd }: { onSessionEnd: (localConversationHistory: any) => void }) => {
  const [isProcessing, setIsProcessing] = useState(false); // Whether processing is ongoing
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]); // User and AI messages
  const [finalTranscript, setFinalTranscript] = useState(""); // Full transcript
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for TTS audio playback

  /**
   * Handles recording, transcription, ChatGPT interaction, and TTS.
   */
  const processVoiceMessage = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      let localConversationHistory = [...conversationHistory];

      // Step 1: Transcription
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const transcriptionResponse = await fetch(
        "http://localhost:8080/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!transcriptionResponse.ok) {
        const errorText = await transcriptionResponse.text();
        console.error("Transcription API error:", errorText);
        throw new Error(`Transcription API error: ${errorText}`);
      }

      console.log(
        "Transcription API response status:",
        transcriptionResponse.status
      );
      const transcriptionData = await transcriptionResponse.json();
      console.log("Full transcription response:", transcriptionData);

      // Validate transcription response
      if (!transcriptionData || !transcriptionData.transcription) {
        console.warn(
          "Transcription data missing or invalid:",
          transcriptionData
        );
        alert(
          "The transcription was unclear. Please try speaking more clearly."
        );
        return;
      }

      const userMessage = transcriptionData.transcription.trim();
      if (userMessage.length === 0) {
        console.warn("Empty transcription received. Data:", transcriptionData);
        alert(
          "The transcription was unclear. Please try speaking more clearly."
        );
        return;
      }

      // Update conversation history with user's message
      localConversationHistory.push({ role: "user", content: userMessage });
      setConversationHistory(localConversationHistory); // Asynchronous React update
      setFinalTranscript((prev) => `${prev}\nYou: ${userMessage}`);


      // Step 2: ChatGPT interaction
      const chatGPTResponse = await fetch("http://localhost:8080/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription: userMessage }),
      });

      const chatGPTData = await chatGPTResponse.json();
      if (!chatGPTData.response) throw new Error("ChatGPT interaction failed.");
      const aiMessage = chatGPTData.response;

      // Update conversation history with AI's response
      localConversationHistory.push({ role: "assistant", content: aiMessage });
      setConversationHistory(localConversationHistory); // Asynchronous React update
      setFinalTranscript((prev) => `${prev}\nAI: ${aiMessage}`);


      // Step 3: TTS
      const ttsResponse = await fetch("http://localhost:8080/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiMessage }),
      });

      if (!ttsResponse.ok) throw new Error("TTS generation failed.");
      const ttsBlob = await ttsResponse.blob();
      const ttsURL = URL.createObjectURL(ttsBlob);

      // Play the TTS audio
      if (audioRef.current) {
        audioRef.current.src = ttsURL;
      
        // Wait for the TTS playback to finish
        await new Promise<void>((resolve) => {
          const audioElement = audioRef.current; // Save reference to ensure it's non-null
          if (!audioElement) return resolve(); // Safeguard against any race condition
      
          audioElement.onended = () => {
            audioElement.onended = null; // Clean up to prevent memory leaks
            resolve();
          };
          audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
            resolve(); // Resolve even if playback fails
          });
        });
      }
      
      // Check for session end signal
      if (
        aiMessage.includes(
          "I don't have any further questions. Thank you so much for taking the time to answer these questions. I'll relay your information to your primary care physician and they'll take it from there."
        )
      ) {
        console.log("Session end signal received.");
        onSessionEnd(localConversationHistory); // Trigger session end callback
        // store the transcript to the db here
        return;
      }

    } catch (error) {
      console.error("Error in voice assistant:", error);
    } finally {
      setIsProcessing(false); // Allow new recordings
    }
  };

  return {
    isProcessing,
    conversationHistory,
    finalTranscript,
    processVoiceMessage,
    audioRef,
  };
};

export default useVoiceAssistant;
