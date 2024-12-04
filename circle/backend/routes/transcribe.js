const express = require("express");
const multer = require("multer");
const { transcribeAudio } = require("../services/deepgramService");
const { validateFile } = require("../utils/fileUtils");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// POST route for transcription
router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const file = req.file;

    console.log("Received file:", file.originalname); // Log file name

    // Validate the audio file
    const validationError = validateFile(file);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    console.log("File passed validation. Sending to Deepgram...");

    // Call the Deepgram API for transcription
    const transcription = await transcribeAudio(file);
    console.log("Transcription received:", transcription);

    res.status(200).json({ transcription });
  } catch (error) {
    console.error("/transcribe: Error in transcription:", error);
    res.status(500).json({ error: "Failed to process audio file" });
  }
});

module.exports = router;
