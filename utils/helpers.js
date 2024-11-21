const atob = require("atob");

const validateFile = (fileB64) => {
  try {
    const buffer = Buffer.from(fileB64, "base64");
    const mimeType = require("file-type").fromBuffer(buffer);
    const fileSizeKb = (buffer.length / 1024).toFixed(2);

    if (!mimeType) throw new Error("Invalid file");

    return {
      file_valid: true,
      file_mime_type: mimeType.mime,
      file_size_kb: fileSizeKb,
    };
  } catch {
    return { file_valid: false, file_mime_type: null, file_size_kb: null };
  }
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

module.exports = { validateFile, isPrime };
