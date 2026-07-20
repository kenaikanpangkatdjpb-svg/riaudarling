import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY belum diset di Vercel.");
}

console.log("Gemini API Key tersedia:", process.env.GEMINI_API_KEY.substring(0, 6) + "...");
console.log("Model yang digunakan: gemini-flash-latest");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Format pesan tidak valid.",
      });
    }

    const history = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));
    const result = await ai.models.generateContent({
   model: "gemini-flash-latest",
      contents: history,
      config: {
        systemInstruction: `
Anda adalah Asisten Hijau Kanwil DJPb Provinsi Riau.
Jawablah menggunakan Bahasa Indonesia.
Berikan jawaban yang ramah, praktis, dan mendukung gerakan Riau Darling.
`,
      },
    });

    return res.status(200).json({
      text: result.text,
    });

  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}
