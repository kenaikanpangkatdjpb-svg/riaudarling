import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("Peringatan: GEMINI_API_KEY tidak ditemukan di environment. Fitur Asisten AI akan berjalan dalam mode simulasi.");
  }
} catch (error) {
  console.error("Gagal menginisialisasi GoogleGenAI:", error);
}

// AI Green Assistant Endpoint
app.post("/api/assistant", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Format pesan tidak valid." });
  }

  // Get user query from latest message
  const userQuery = messages[messages.length - 1]?.content || "";

  if (!ai) {
    // Elegant fallback mock response if API Key is not set yet
    const fallbackText = `[Simulasi Asisten Hijau Kanwil DJPb Riau]\n\nHalo Rekan Green DJPb! Saat ini layanan AI berjalan dalam mode demo karena kunci API belum diaktifkan.\n\nSebagai info, di Kanwil DJPb Provinsi Riau kita sangat mendukung kelestarian alam Lancang Kuning! Pastikan untuk selalu:\n1. Menggunakan tumbler pribadi (Zero Plastic Bottle)\n2. Mengurangi kertas dengan SAKTI, DIGIT, dan Nadine\n3. Mematikan AC dan komputer setelah jam pelayanan berakhir\n\n*Tanam kelapa di tepi sawah,\nTumbuh subur hijau daunnya;\nMari jaga lingkungan kita yang indah,\nDemi Riau lestari selamanya!*`;
    return res.json({ text: fallbackText });
  }

  try {
    // Build context or history for the chat
    const chatHistory = messages.map(msg => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatHistory,
      config: {
        systemInstruction: `Anda adalah Asisten Hijau (AI Green Assistant) yang berdedikasi untuk gerakan "Riau Sadar Lingkungan" (Riau Darling) di Kantor Wilayah Direktorat Jenderal Perbendaharaan (Kanwil DJPb) Provinsi Riau, Kementerian Keuangan Republik Indonesia.

Tugas utama Anda:
1. Memberikan edukasi, tips, solusi praktis, dan jawaban ramah mengenai cara menjaga lingkungan di lingkungan perkantoran pemerintah (khususnya DJPb) dan kehidupan sehari-hari di Provinsi Riau.
2. Mendukung inisiatif Green Office: kurangi kertas (Paperless menggunakan SAKTI, Nadine, DIGIPAY, SAKTI Web), kurangi plastik sekali pakai (Zero Waste, penggunaan tumbler), hemat energi (AC suhu 24-25°C, matikan peralatan elektronik tak terpakai), serta hemat air.
3. Menghubungkan isu lokal Riau dengan pelestarian lingkungan, seperti pencegahan kebakaran hutan & lahan (karhutla), pelestarian lahan gambut basah, dan konservasi Sungai Siak & Kampar.
4. Memberikan nuansa budaya Melayu Riau yang hangat. Gunakan sapaan khas Melayu Riau seperti "Rekan Green DJPb" atau "Tuan dan Puan". Bila memungkinkan atau di momen yang pas, sisipkan pantun Melayu yang bertema lingkungan di awal atau akhir jawaban Anda.

Gaya Komunikasi:
- Ramah, bersemangat, profesional, dan menginspirasi untuk peduli lingkungan.
- Selalu gunakan bahasa Indonesia yang baik, santun, dan komunikatif.
- Berikan saran yang konkret, bisa ditiru (actionable), dan logis.`
      }
    });

    const reply = response.text || "Maaf, saya tidak dapat merumuskan jawaban saat ini.";
    return res.json({ text: reply });
  } catch (error: any) {
    console.error("Kesalahan pada Gemini API:", error);
    return res.status(500).json({ error: error.message || "Terjadi kesalahan internal pada layanan AI." });
  }
});

// Serve Frontend using Vite or Static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Riau Sadar Lingkungan DJPb berjalan pada port ${PORT}`);
  });
}

startServer();
