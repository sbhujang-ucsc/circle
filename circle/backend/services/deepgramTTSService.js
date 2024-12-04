const axios = require("axios");
const fs = require("fs");

const generateSpeech = async (text) => {
  const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak?model=aura-luna-en";

  try {
    console.log("Sending text to Deepgram TTS API:", text);

    const response = await axios.post(
      DEEPGRAM_URL,
      { text }, // Payload
      {
        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "stream", // Stream the audio
      }
    );

    console.log("Audio stream received from Deepgram.");

    // Save the streamed audio to a file (optional)
    const audioPath = "./output.mp3"; // You can use a temp directory or serve directly
    const writer = fs.createWriteStream(audioPath);
    response.data.pipe(writer);

    // Return a promise that resolves when the file is fully written
    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(audioPath));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error from Deepgram TTS API:", error.response?.data || error.message);
    throw new Error("Deepgram TTS request failed");
  }
};

module.exports = { generateSpeech };

