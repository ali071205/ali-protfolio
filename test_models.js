import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let apiKey = null;
envContent.split('\n').forEach(line => {
  if (line.startsWith('VITE_GEMINI_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
});

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      const text = await response.text();
      console.error("Body:", text);
      return;
    }
    const data = await response.json();
    console.log("AVAILABLE MODELS:");
    data.models.forEach(m => console.log(`- ${m.name}`));
  } catch (err) {
    console.error("Error listing models:", err.message);
  }
}

listModels();
