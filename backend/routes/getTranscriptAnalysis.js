const express = require("express");
const router = express.Router();
const { generateTranscriptAnalysis } = require("../services/chatgptService");
require("dotenv").config();

/**
 * POST /getTranscriptAnalysis
 * Generate an analysis for a transcript with EHR context.
 */
router.post("/", async (req, res) => {
  console.log('Here!');
  const { appointment_id, transcript, patient_id } = req.body;

  if (!appointment_id || !transcript || !patient_id) {
    return res.status(400).json({ error: "appointment_id, transcript, and patient_id are required" });
  }

  try {
    const analysis = await generateTranscriptAnalysis(transcript, patient_id);
    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Error generating transcript analysis:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
