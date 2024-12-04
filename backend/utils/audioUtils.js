const validateAudioFormat = (format) => {
    const allowedFormats = ["mp3", "wav"];
    return allowedFormats.includes(format);
  };
  
  module.exports = { validateAudioFormat };
  