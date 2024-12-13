const axios = require("axios");
const { initialSystemPrompt, analysisPrompt } = require("../utils/promptUtils");
const { fetchEHRFile } = require("./supabaseService.js");
const fs = require("fs");
const OpenAI = require("openai");
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is loaded from environment variables
});

let assistantId;

let conversationHistory = [
  {
    role: "system",
    content: initialSystemPrompt,
  },
];

/**
 * Generate a summary from a transcript using OpenAI Chat Completions API.
 * @param {Object} transcript - JSON transcript data.
 * @returns {string} Summary text.
 */
async function generateSummary(transcript) {
  try {
    // Construct the summary prompt
    const prompt = `Summarize the following conversation between a nurse and a patient:\n\n${JSON.stringify(
      transcript
    )}`;

    // Create the conversation history for the summary request
    const conversation = [
      {
        role: "system",
        content: `We'd like to generate a summary for the doctor about the patient intake conversation with the nurse. Be descriptive, your summary
      should include all the primary symptoms mentioned along with dates and severity. Instead of using full sentences, you may use dashes and 
      bullet points to format your output in a consumable format--your focus is to provide the doctor with the important information about the
      patient's conditions and associated experiences.

      A summary should be concise but that is ONLY after you mention all primary important information. Your summary is not accurate if it fails
      to include the important details and relevant information. 
      
      The format should consist of dashes to delineate lists. Please generate header items of Symptoms, Family History, Recent Illness/Injury, Patient Concerns, Other which you may define with a "#".
      You may use ** ** to indicate you want to bold text.


      Under these you may list the relevant information associated with those categories--you can mention the severity and time period if applicable.

      Patient Concerns -- These should be directly referencing any questions the patients asked or self diagnoses they've done and summarizing them here.
      These patient concerns shouldn't simply repeat the information that is already mentioned in the other categories. These concerns should be specific questions that the user asks
      rather than you creating concerns. If the section is not applicable, then simply say N/A.
      
      The user will now provide the transcript in the next message. Follow the instructions given and produce an output.`,
      },
      {
        role: "user",
        content: JSON.stringify(transcript),
      },
    ];

    // Make the request to OpenAI Chat Completions API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use GPT-4 for improved response quality
        messages: conversation,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract the assistant's response
    const summary = response.data.choices[0].message.content.trim();
    console.log("Generated Summary: \n\n", summary);
    console.log("_________________________________\n");

    return summary; // Return the summary text
  } catch (error) {
    // Log detailed error response
    console.error("Error generating summary:", error.response?.data || error.message);
    throw new Error("Failed to generate summary using Chat Completions API");
  }
}

/**
 * Generate a response using ChatGPT for a given user input.
 * @param {string} userInput - The user-provided input.
 * @returns {string} Assistant's response.
 */
const generateChatGPTResponse = async (userInput) => {
  try {
    // Append the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userInput });

    // Make a request to OpenAI Chat Completions API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // Specify the model
        messages: conversationHistory,
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract and append the assistant's response
    const assistantResponse = response.data.choices[0].message.content;
    console.log("Assistant Response to User: \n\n", assistantResponse);
    console.log("_________________________________\n");
    conversationHistory.push({ role: "assistant", content: assistantResponse });

    return assistantResponse;
  } catch (error) {
    console.error("Error from OpenAI API:", error.response?.data || error.message);
    throw new Error("ChatGPT API request failed");
  }
};

/**
 * Upload an EHR file to OpenAI and return its file ID.
 * @param {string} tempFilePath - Path to the temporary file.
 * @returns {Promise<string>} - The OpenAI file ID.
 */
const uploadEHRToOpenAI = async (tempFilePath) => {
  try {
    stream = fs.createReadStream(tempFilePath);
  } catch( error ) {
    console.log("Creating stream failed.")
  }
  try {
    const uploadedFile = await openai.files.create({
      file: stream,
      purpose: "assistants",
    });

    // Clean up the temporary file after uploading
    //fs.unlinkSync(tempFilePath);

    return uploadedFile.id; // Return the file ID
  } catch (error) {
    console.error("Error uploading EHR to OpenAI:", error.message);
    throw error;
  }
};

/**
 * Create a new assistant and store its ID for subsequent use.
 * @returns {Promise<string>} - The ID of the created assistant.
 */
const createAssistant = async () => {
  try {
    // If Assistant ID is cached, return it
    if (assistantId) return assistantId;

    // Create a new Assistant using OpenAI API
    const assistant = await openai.beta.assistants.create({
      name: "Transcript Analyzer",
      instructions: analysisPrompt,
      model: "gpt-4-turbo-preview",
      tools: [{ type: "file_search" }], // Include the file_search tool
    });

    assistantId = assistant.id; // Cache the Assistant ID for reuse
    console.log("Created Assistant ID:", assistantId);
    return assistantId;
  } catch (error) {
    console.error("Error creating assistant:", error.message);
    throw new Error("Failed to create assistant");
  }
};

/**
 * Generate an analysis for a transcript with EHR context.
 * @param {Object} transcript - The transcript JSON data.
 * @param {string} patientId - The ID of the patient (to fetch EHR).
 * @returns {Promise<string>} - The analysis from OpenAI.
 */
const generateTranscriptAnalysis = async (transcript, patientId) => {
  console.log("generateTranscriptAnalysis");
  try {
    // Step 1: Fetch EHR file from Supabase and save locally
    const tempFilePath = await fetchEHRFile(patientId);

    // Step 2: Upload the EHR file to OpenAI and get file ID
    const fileId = await uploadEHRToOpenAI(tempFilePath);

    // Step 3: Create or retrieve the Assistant ID
    const assistantId = await createAssistant(); // Dynamically create or fetch the Assistant ID
    if (!assistantId) {
      throw new Error("Assistant ID is undefined. Failed to create or retrieve Assistant ID.");
    }

    // Step 4: Create a thread and attach the file
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: `Analyze the given Electronic Health Record ${tempFilePath} along with the transcript to generate responses:\n\n${JSON.stringify(transcript)}`,
          attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
        },
      ],
    });

    // Step 5: Run the analysis and fetch results
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId, // Use the dynamically created Assistant ID
    });

    const messages = await openai.beta.threads.messages.list(thread.id, {
      run_id: run.id,
    });

    // Extract the final analysis
    const analysis = messages.data.pop()?.content?.[0]?.text || "No analysis found.";
    return analysis;
  } catch (error) {
    console.error("Error generating transcript analysis:", error.message);
    throw error;
  }
};

module.exports = { generateChatGPTResponse, generateSummary, generateTranscriptAnalysis };
