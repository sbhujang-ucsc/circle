require("dotenv").config();
const express = require("express");
const cors = require("cors");
const transcribeRoutes = require("./routes/transcribe");
const chatgptRoutes = require("./routes/chatgpt");
const ttsRoutes = require("./routes/tts");



const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Routes
app.use("/transcribe", transcribeRoutes);
app.use("/chatgpt", chatgptRoutes);
app.use("/tts", ttsRoutes)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
