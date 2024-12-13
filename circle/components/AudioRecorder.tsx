import React, { useState, useRef } from "react";

const AudioRecorder = ({
  onRecordingComplete,
  disabled,
}: {
  onRecordingComplete: (audioBlob: Blob) => void;
  disabled: boolean;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Audio stream:", stream);
      const mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.error(
          `MIME type ${mimeType} is not supported in this browser.`
        );
        return;
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        } else {
          console.warn("Empty audio chunk received.");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        console.log("Audio Blob:", audioBlob);

        // DEBUG: Download the audio blob locally
        const debugURL = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = debugURL;
        //a.download = "debug_audio.webm";
        //a.click();

        if (audioBlob.size === 0) {
          console.error("Recording failed: Blob size is 0.");
          return;
        }

        onRecordingComplete(audioBlob);
      };
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div>
      <button
        onClick={toggleRecording}
        disabled={disabled}
        className={`py-4 px-10 rounded-[40px] text-[30px] font-semibold mt-10 text-white ${
          disabled
            ? "bg-gray-500"
            : isRecording
            ? "bg-red-500 hover:bg-red-700"
            : "bg-[#356BBB] hover:bg-[#174a95]"
        }`}
      >
        {isRecording ? "Recording..." : "Press & Hold to Speak"}
      </button>
    </div>
  );
};

export default AudioRecorder;
