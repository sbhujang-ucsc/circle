import Groq from "groq-sdk";

export const config = {
  api: {
    bodyParser: false, // Manual parsing required
  },
};

const systemPrompt = `You are tasked with reading through a given block of text and extracting the following information in the specified JSON format. The data should be gathered as follows:

Age: Extract the age of the person. If not explicitly mentioned, return "N/A".
Gender: Extract the gender of the person. If not explicitly mentioned, return "N/A".
Weight: Extract the weight of the person in kilograms. If not mentioned or if ambiguous, return "N/A".
Height: Extract the height of the person. If not explicitly mentioned, return "N/A".
Allergies: Extract any allergies the person may have. This should be an array of strings. If no allergies are mentioned, return an empty array.
Your output should be in JSON format, structured as follows:
{
  "Age": "N/A",
  "Gender": "N/A",
  "Weight": "N/A",
  "Height": "N/A",
  "Allergies": []
}
  Please make sure that:
  The values for Age, Gender, Weight, and Height are strings, and represent the specific information when provided or "N/A" if not available.
  The Allergies field should be an array, even if empty (use [] if no allergies are provided).
  If any of the information is unclear or not mentioned, ensure you mark it as "N/A".`;

export async function POST(req) {
  let logs = [];
  try {
    // Log the incoming request to check its body
    const body = await req.text();
    logs.push("Received request body: " + body);

    // Attempt to parse the JSON body manually
    const { parsedText } = JSON.parse(body);
    logs.push("Parsed text: " + parsedText);

    // Make the call to the Groq API
    const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: parsedText },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    logs.push("Groq API response: " + JSON.stringify(response));

    const patientData = JSON.parse(response.choices[0].message.content);
    logs.push("Processed patient data: " + JSON.stringify(patientData));

    // Return the processed data
    return new Response(JSON.stringify({ data: patientData }), { status: 200 });
  } catch (error) {
    // Log the error and return all logs along with the error message
    console.error("Error processing text:", error);
    logs.push("Error processing text: " + error.message);

    return new Response(
      JSON.stringify({
        error: "Failed to process text",
        logs: logs,
      }),
      {
        status: 500,
      }
    );
  }
}
