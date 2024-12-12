const validateFile = (file) => {
    if (!file) {
      return "No file uploaded.";
    }
  
    const allowedTypes = ["audio/wav", "audio/mpeg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return "Unsupported file type. Please upload a WAV or MP3 file.";
    }
  
    if (file.size > 10 * 1024 * 1024) {
      return "File size exceeds 10MB limit.";
    }
  
    return null; // No errors
  };
  
  module.exports = { validateFile };
  