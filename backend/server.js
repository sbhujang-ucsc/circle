require("dotenv").config();
const express = require("express");
const cors = require("cors");
const transcribeRoutes = require("./routes/transcribe");
const chatgptRoutes = require("./routes/chatgpt");
const ttsRoutes = require("./routes/tts");
const getTranscriptSummaryRoute = require("./routes/getTranscriptSummary");
const getTranscriptAnalysisRoute = require("./routes/getTranscriptAnalysis");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Replace with frontend URL
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/transcribe", transcribeRoutes);
app.use("/chatgpt", chatgptRoutes);
app.use("/tts", ttsRoutes);
app.use("/getTranscriptSummary", getTranscriptSummaryRoute);
app.use("/getTranscriptAnalysis", getTranscriptAnalysisRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
