import { useState, useRef } from "react";

const useVoiceAssistant = ({ onSessionEnd }: { onSessionEnd: () => void }) => {
  const [isProcessing, setIsProcessing] = useState(false); // Whether processing is ongoing
  const [conversationHistory, setConversationHistory] = useState([]); // User and AI messages
  const [finalTranscript, setFinalTranscript] = useState(""); // Full transcript
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for TTS audio playback

  /**
   * Handles recording, transcription, ChatGPT interaction, and TTS.
   */
  const processVoiceMessage = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
  
      // Step 1: Transcription
      const formData = new FormData();
      formData.append("audio", audioBlob);
  
      const transcriptionResponse = await fetch("http://localhost:8080/transcribe", {
        method: "POST",
        body: formData,
      });
  
      if (!transcriptionResponse.ok) {
        const errorText = await transcriptionResponse.text();
        console.error("Transcription API error:", errorText);
        throw new Error(`Transcription API error: ${errorText}`);
      }
  
      console.log("Transcription API response status:", transcriptionResponse.status);
      const transcriptionData = await transcriptionResponse.json();
      console.log("Full transcription response:", transcriptionData);
  
      // Validate transcription response
      if (!transcriptionData || !transcriptionData.transcription) {
        console.warn("Transcription data missing or invalid:", transcriptionData);
        alert("The transcription was unclear. Please try speaking more clearly.");
        return;
      }
  
      const userMessage = transcriptionData.transcription.trim();
      if (userMessage.length === 0) {
        console.warn("Empty transcription received. Data:", transcriptionData);
        alert("The transcription was unclear. Please try speaking more clearly.");
        return;
      }
  
      // Update conversation history with user's message
      setConversationHistory((prev) => [...prev, { role: "user", content: userMessage }]);
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
      setConversationHistory((prev) => [...prev, { role: "assistant", content: aiMessage }]);
      setFinalTranscript((prev) => `${prev}\nAI: ${aiMessage}`);
  
      // Check for session end signal
      if (
        aiMessage.includes(
        "I don't have any further questions. Thank you so much for taking the time to answer these questions. I'll relay your information to your primary care physician and they'll take it from there.")
      ) {
        console.log("Session end signal received.");
        onSessionEnd(); // Trigger session end callback
        return;
      }
  
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
        audioRef.current.play();
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
