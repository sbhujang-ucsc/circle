/**
 * Route: getTranscriptAnalysis
 * Purpose: Fetch transcript data from Supabase for a specific appointment,
 *          call OpenAI to generate an analysis, and return the analysis.
 */

const express = require("express");
const router = express.Router();
const supabaseService = require("../services/supabaseService");
const chatgptService = require("../services/chatgptService");

// Route handler
router.post("/", async (req, res) => {
  const { appointment_id } = req.body;

  if (!appointment_id) {
    return res.status(400).json({ error: "appointment_id is required" });
  }

  try {
    // 1. Fetch the transcript from Supabase
    const transcript = await supabaseService.fetchTranscript(appointment_id);

    if (!transcript) {
      return res.status(404).json({ error: "Transcript not found" });
    }

    // 2. Generate an analysis using OpenAI
    const analysis = await chatgptService.generateAnalysis(transcript);

    // 3. Return the analysis to the client
    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Error generating transcript analysis:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
