const express = require("express");
const { generateChatGPTResponse } = require("../services/chatgptService");

const router = express.Router();

// POST route for ChatGPT response
router.post("/", async (req, res) => {
  try {
    const { transcription } = req.body;

    if (!transcription) {
      return res.status(400).json({ error: "Transcription is required." });
    }

    console.log("Received transcription:", transcription);

    // Generate ChatGPT response
    const chatGPTResponse = await generateChatGPTResponse(transcription);

    res.status(200).json({ response: chatGPTResponse });
  } catch (error) {
    console.error("Error in /chatgpt route:", error);
    res.status(500).json({ error: "Failed to process ChatGPT response" });
  }
});

module.exports = router;
