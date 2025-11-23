import { GoogleGenAI } from "@google/genai"

const aiModel = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
})

const model = "gemini-2.0-flash-lite"

const config = {
  responseMimeType: "text/plain",
}

export async function generateAIPicks(prompt) {
  try {
    const response = await aiModel.models.generateContent({
      model,
      config,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    })

    return response?.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendations available."
  } catch (error) {
    console.error("Error generating AI picks:", error)
    return null
  }
}
