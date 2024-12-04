const axios = require("axios");
// "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true" -- works much better for transcription

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

    return response.data.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error("Error from Deepgram API:", error.response?.data || error);
    throw new Error("Deepgram API transcription failed");
  }
};

module.exports = { transcribeAudio };
