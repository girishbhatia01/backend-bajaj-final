const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { validateFile, isPrime } = require("./utils/helpers");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Hardcoded User Info
const userInfo = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

// GET Endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data = [], file_b64 } = req.body;

    // Data validation
    if (!Array.isArray(data)) throw new Error("Invalid data format");

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const highestLowercase = alphabets
      .filter((item) => /^[a-z]$/.test(item))
      .sort()
      .pop();
    const isPrimeFound = numbers.some((num) => isPrime(parseInt(num)));

    let fileInfo = {
      file_valid: false,
      file_mime_type: null,
      file_size_kb: null,
    };

    if (file_b64) {
      fileInfo = validateFile(file_b64);
    }

    res.status(200).json({
      is_success: true,
      ...userInfo,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      is_prime_found: isPrimeFound,
      ...fileInfo,
    });
  } catch (error) {
    res.status(400).json({ is_success: false, message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
