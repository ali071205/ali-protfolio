import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

/**
 * Get Gemini model instance
 */
export function getGeminiModel() {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.')
  }
  return genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
}

/**
 * Send a message to Gemini and get a response
 * @param {string} prompt - The user's message
 * @param {Array} history - Chat history [{role, parts}]
 * @param {string} systemContext - Context about the portfolio
 * @returns {Promise<string>} AI response text
 */
export async function sendGeminiMessage(prompt, history = [], systemContext = '') {
  const model = getGeminiModel()

  const systemPrompt = `You are an AI assistant for Ali Ahmad Raza Sheikh's developer portfolio admin panel.

${systemContext}

Portfolio Owner Info:
- Name: Ali Ahmad Raza Sheikh
- Role: Fullstack Web Developer & BCA Student (2nd Year)
- Goal: Game Developer
- Skills: C, HTML5, C++, Python, CSS3, SEO, C#, JavaScript, React, Node.js
- GitHub: https://github.com/ali071205
- LinkedIn: https://linkedin.com/in/ali-ahmad-raza-sheikh-760aa335b
- Email: aliahmad071205@gmail.com

You can help with:
1. Writing project descriptions
2. Suggesting skill improvements
3. Drafting bio/about text
4. Analyzing portfolio content
5. Generating professional content
6. Answering questions about portfolio management

Be concise, professional, and helpful. When generating content for the portfolio, make it impressive and professional.`

  try {
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    })

    const fullPrompt = history.length === 0
      ? `${systemPrompt}\n\nUser: ${prompt}`
      : prompt

    const result = await chat.sendMessage(fullPrompt)
    return result.response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error(`AI Error: ${error.message}`)
  }
}

/**
 * Generate a professional project description
 */
export async function generateProjectDescription(projectName, techStack, basicInfo) {
  const model = getGeminiModel()
  const prompt = `Write a concise, professional project description (2-3 sentences) for a developer portfolio.
Project: ${projectName}
Tech Stack: ${techStack.join(', ')}
Basic Info: ${basicInfo}

Make it impressive, technical, and highlight the key achievement. Keep it under 100 words.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export const isGeminiConfigured = !!apiKey
