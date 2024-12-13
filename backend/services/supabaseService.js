/**
 * Service: SupabaseService
 * Purpose: Handles all interactions with the Supabase database.
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Fetch transcript from the appointments table for a given appointment_id.
 * @param {string} appointment_id - ID of the appointment.
 * @returns {Object} Transcript data or null if not found.
 */
async function fetchTranscript(appointment_id) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("transcript")
      .eq("appointment_id", appointment_id)
      .single();

    if (error) throw error;

    return data?.transcript || null; // Return the JSON transcript
  } catch (error) {
    console.error("Error fetching transcript:", error.message);
    throw error;
  }
}

/**
 * Fetch a file from Supabase storage and save it locally.
 * @param {string} patientId - The ID of the patient whose EHR file needs to be fetched.
 * @returns {Promise<string>} - The path to the saved temporary file.
 */
const fetchEHRFile = async (patientId) => {
  console.log(`Patient Id: ${patientId}`);
  try {
    const { data, error } = await supabase.storage
      .from("pdfs")
      .download(`${patientId}.pdf`);

    if (error) throw new Error(`Failed to fetch EHR file for patient: ${error.message}`);

    if (data) {
      // Convert the Blob to a Buffer
      const arrayBuffer = await data.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
    
      // Save the file to a temporary location
      const tempFilePath = `/tmp/${patientId}.pdf`;
      fs.writeFileSync(tempFilePath, buffer);
    
      return tempFilePath; // Return the path for further processing
    } else {
      throw new Error(`File not found for patientId: ${patientId}`);
    }

    return tempFilePath; // Return the temporary file path
  } catch (error) {
    console.error("Error in fetchEHRFile:", error.message);
    throw error;
  }
};


module.exports = { fetchTranscript, fetchEHRFile };
