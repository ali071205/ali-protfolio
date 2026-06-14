import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .env file manually since we aren't using Vite here
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

let apiKey = null;
envContent.split('\n').forEach(line => {
  if (line.startsWith('VITE_GEMINI_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
});

if (!apiKey) {
  console.error("❌ API key not found in .env file");
  process.exit(1);
}

console.log(`Testing with API Key: ${apiKey.substring(0, 5)}...${apiKey.slice(-5)}`);

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Test with gemini-flash-latest first
    console.log("\nTesting model: gemini-flash-latest");
    let model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    let result = await model.generateContent('Say exactly the word "SUCCESS"');
    console.log("✅ Response:", result.response.text().trim());

  } catch (error) {
    console.error("❌ Error with gemini-1.5-flash-latest:", error.message);
    
    // Fallback to gemini-pro if flash fails
    console.log("\nFallback: Testing model: gemini-pro");
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      let model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      let result = await model.generateContent('Say exactly the word "SUCCESS"');
      console.log("✅ Response:", result.response.text().trim());
    } catch (fallbackError) {
      console.error("❌ Error with gemini-pro:", fallbackError.message);
      console.log("\n⚠️ Conclusion: The API key is invalid or does not have access to the Generative Language API.");
    }
  }
}

testGemini();
