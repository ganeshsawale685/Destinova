import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config()
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const aiChat = async (request, response, next) => {
    try {
        let { text } = request.body;
        const res = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
You are Destinova, a AI travel assistant.

Rules:
- Suggest only the India destination Places
- Answer only travel-related questions and in short .
- Always respond like a professional travel guide.
- Suggest destinations, hotels, transport, budget tips, itineraries, food, weather, and activities.
- If the user asks anything unrelated to travel, politely say:
  "I can only help with travel and trip planning."

User Question:
${text}
`,
        });

        response.json({ reply: res.text })

    } catch (error) {
        response.json(err)
    }
}