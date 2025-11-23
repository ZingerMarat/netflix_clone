import { GoogleGenAI } from "@google/genai"
import { z } from "zod"

const aiModel = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
})

const model = "gemini-2.0-flash-lite"

const responseItemSchema = z.array(z.string()).min(10).max(10).describe("Array of 10 movie titles")

const config = {
  responseMimeType: "application/json",
  responseSchema: z.toJSONSchema(responseItemSchema),
}

export async function generateAIPicks(prompt) {
  try {
    const response = await aiModel.models.generateContent({
      model,
      config,
      contents: prompt,
    })

    const raw = response.text
    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) return null

    return parsed.filter((item) => typeof item === "string" && item.trim().length > 0)
  } catch (error) {
    console.error("Error generating AI picks:", error)
    return null
  }
}
