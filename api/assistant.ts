import { GoogleGenAI } from "@google/genai";


const response = await fetch("/api/assistant", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ messages }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.error || "Gagal terhubung dengan server asisten hijau.");
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
       console.log("===== GEMINI REQUEST =====");
console.log("SDK Version:", "@google/genai");
console.log("Model:", "gemini-flash-latest");
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
  console.error("===== GEMINI ERROR =====");
  console.error(JSON.stringify(err, null, 2));

  return res.status(500).json({
    error: err.message,
    status: err.status,
  });
}

return res.status(err.status || 500).json({
  error: err.message,
  status: err.status,
});
  }
}
