import OpenAI from "openai"

const apiKey = process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_A || process.env.OPENROUTER_API_KEY
const baseURL = process.env.AI_BASE_URL || "https://api.deepseek.com"

export const aiClient = new OpenAI({
  apiKey,
  baseURL,
})
