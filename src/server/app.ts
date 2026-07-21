import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const MODEL_NAME = "gemini-2.5-flash-lite";

// ==============================
// Inisialisasi Gemini
// ==============================

let ai: GoogleGenAI | null = null;

if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  console.log("✅ Gemini API Key berhasil dimuat");
} else {
  console.warn("⚠ GEMINI_API_KEY tidak ditemukan. Menggunakan mode fallback.");
}

// ==============================
// Fallback Response
// ==============================

function getFallbackResponse(question: string) {
  return `🌿 Asisten Hijau Riau Darling

Maaf, layanan AI sedang tidak dapat digunakan.

Pertanyaan Anda:
"${question}"

Silakan coba beberapa saat lagi.

Tetap semangat mendukung Gerakan Riau Darling:
• 🌱 Hemat energi
• 📄 Paperless
• ♻ Kurangi plastik
• 💧 Hemat air`;
}

// ==============================
// Endpoint
// ==============================

app.post("/api/assistant", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Format messages tidak valid.",
      });
    }

    const lastQuestion =
      messages[messages.length - 1]?.content ?? "";

    if (!ai) {
      return res.json({
        text: getFallbackResponse(lastQuestion),
      });
    }

    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    console.log("==================================");
    console.log("MODEL :", MODEL_NAME);
    console.log("SDK   : @google/genai");
    console.log("==================================");

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: `
Anda adalah Asisten Hijau Kanwil DJPb Provinsi Riau.

Tugas Anda:
- Menjawab dalam Bahasa Indonesia.
- Ramah.
- Singkat tetapi informatif.
- Mendukung Gerakan Riau Darling.
- Mendorong budaya Green Office.
- Berikan solusi praktis.
- Bila sesuai, tambahkan pantun Melayu bertema lingkungan.
`,
      },
    });

    return res.json({
      text: response.text ?? "Maaf, saya belum memiliki jawaban.",
    });
  } catch (error: any) {
    console.error("===== GEMINI ERROR =====");
    console.error(error);

    return res.json({
      text: getFallbackResponse(""),
      debug:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
});

export default app;
