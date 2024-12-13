const fs = require("fs");
const OpenAI = require("openai");
const { supabase } = require("../supabaseClient");

const openai = new OpenAI();

// Upload files and create vector store
async function uploadPatientEHR(patientId, ehrFilePath) {
  const fileStream = fs.createReadStream(ehrFilePath);

  // Create a vector store
  const vectorStore = await openai.beta.vectorStores.create({
    name: `${patientId}-EHR`,
  });

  // Upload the file to the vector store
  await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, [fileStream]);

  return vectorStore.id;
}

// Fetch patient EHR file from Supabase bucket
async function fetchPatientEHRFile(patientId) {
  const { data, error } = await supabase
    .storage
    .from("patient_ehr_bucket")
    .download(`${patientId}.pdf`);
    
  if (error) {
    throw new Error(`Failed to fetch EHR file for patient: ${error.message}`);
  }

  const filePath = `/tmp/${patientId}.pdf`;
  fs.writeFileSync(filePath, data);
  return filePath;
}

module.exports = { uploadPatientEHR, fetchPatientEHRFile };
