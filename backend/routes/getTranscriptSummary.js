/**
 * Route: getTranscriptSummary
 * Purpose: Fetch transcript data from Supabase for a specific appointment,
 *          call OpenAI to generate a summary, and return the summary.
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

    // 2. Generate a summary using OpenAI
    const summary = await chatgptService.generateSummary(transcript);

    // 3. Return the summary to the client
    return res.status(200).json({ summary });
  } catch (error) {
    console.error("Error generating transcript summary:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
