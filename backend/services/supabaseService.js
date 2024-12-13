/**
 * Service: SupabaseService
 * Purpose: Handles all interactions with the Supabase database.
 */

const { createClient } = require("@supabase/supabase-js");

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

module.exports = { fetchTranscript };
