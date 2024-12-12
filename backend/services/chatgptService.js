const axios = require("axios");
const {initialSystemPrompt} = require("../utils/promptUtils")

let conversationHistory = [
  {
    role: "system",
    content: initialSystemPrompt
  }
];

const generateChatGPTResponse = async (userInput) => {
  try {
    // Append the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userInput });

    // Make a request to OpenAI API
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
    console.log('Assistant Response to User: \n\n', assistantResponse);
    console.log('_________________________________\n');
    conversationHistory.push({ role: "assistant", content: assistantResponse });

    return assistantResponse;
  } catch (error) {
    console.error("Error from OpenAI API:", error.response?.data || error);
    throw new Error("ChatGPT API request failed");
  }
};

module.exports = { generateChatGPTResponse };
