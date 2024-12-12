const express = require("express");
const { generateSpeech } = require("../services/deepgramTTSService");
const fs = require("fs");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS." });
    }

    console.log("Text received for TTS:", text);

    // Generate speech and get audio file path
    const audioPath = await generateSpeech(text);

    // Stream the audio file back to the client
    res.set("Content-Type", "audio/mpeg");
    const stream = fs.createReadStream(audioPath);
    stream.pipe(res);

    // Clean up the temporary file after sending
    stream.on("close", () => {
      fs.unlink(audioPath, (err) => {
        if (err) console.error("Error deleting temporary audio file:", err);
      });
    });
  } catch (error) {
    console.error("Error in TTS route:", error.message);
    res.status(500).json({ error: "Failed to generate speech." });
  }
});

module.exports = router;
