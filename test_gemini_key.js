import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Fetch API key from .env file directly
const envFile = fs.readFileSync('.env', 'utf-8');
const match = envFile.match(/VITE_GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : null;

if (!apiKey) {
  console.error("Error: VITE_GEMINI_API_KEY not found in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say hello world in 3 words.");
    console.log("Success! Response:", result.response.text());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
