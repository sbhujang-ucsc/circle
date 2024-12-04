// services/deepgramService.js
const axios = require("axios");

const transcribeAudio = async (file) => {
  try {
    const response = await axios.post(
      "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true",
      file.buffer,
      {
        headers: {
          "Content-Type": file.mimetype,
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        },
      }
    );

    // Log the entire response from Deepgram
    console.log("Deepgram API response:", response.data);

    const transcription = response.data.results.channels[0].alternatives[0].transcript;
    console.log("Extracted transcription:", transcription);

    return transcription;
  } catch (error) {
    console.error("Error from Deepgram API:", error.response?.data || error);
    throw new Error("Deepgram API transcription failed");
  }
};

module.exports = { transcribeAudio };
