const axios = require("axios");
const { initialSystemPrompt } = require("../utils/promptUtils");

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
 * Generate an analysis from a transcript using ChatGPT.
 * @param {Object} transcript - JSON transcript data.
 * @returns {Promise<string>} - Generated analysis.
 */
const generateAnalysis = async (transcript) => {
  const conversation = [
    {
      role: "system",
      content:
        `
        You're a medical assistant who helps take some of the stress away from the doctor. Although you cannot generate diagnoses, you try to alert the doctor of any potentially
        important information and try to generate any important connections that the doctor may be too fatigued to notice. You should be able to find links and potential hints to conditions and link at this. 
        You should also be alerting the doctor of any allergy interactions, anything that may be relevant in terms of family history, and more.
        
        The format should consist of dashes to delineate lists. Please generate header items of Symptoms, Family History, Recent Illness/Injury, Patient Concerns, Other which you may define with a "#".
        You may use ** ** to indicate you want to bold text.

        The user will now provide the transcript in the next message at which point, you may analyze.
        `,
    },
    {
      role: "user",
      content: `Analyze the following transcript:\n\n${JSON.stringify(
        transcript
      )}`,
    },
  ];

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: conversation,
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      }
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = { generateChatGPTResponse, generateSummary, generateAnalysis };
