import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

// Robust intelligent local fallback response generator
function getSimulatedResponse(query: string): string {
  const q = query.toLowerCase();
  
  const pantun = `\n\n*Elok nian si lebah sialang,\nBersarang tinggi di dahan kayu;\nAlam dijaga bumi pun tenang,\nWarisan luhur adat Melayu.*`;

  if (q.includes("karbon") || q.includes("co2") || q.includes("emisi")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Rekan Green DJPb! Karbon (atau CO2) adalah gas emisi rumah kaca yang menjadi penyebab utama pemanasan global dan perubahan iklim.\n\nDi lingkungan kantor Kanwil DJPb Riau, jejak karbon berasal dari penggunaan listrik (AC, lampu, komputer), kendaraan dinas, serta produksi sampah perkantoran.\n\nSetiap langkah kecil kita, seperti mematikan komputer setelah pulang kantor, menghemat 1 lembar kertas, atau membawa tumbler pribadi, berkontribusi langsung menurunkan gram demi gram CO2 yang dilepaskan ke udara Pekanbaru. Mari pantau jejak karbon kita melalui menu **Kalkulator Karbon**!${pantun}`;
  }
  
  if (q.includes("kertas") || q.includes("sakti") || q.includes("nadine") || q.includes("paperless") || q.includes("digit")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Rekan Green DJPb! Digitalisasi administrasi adalah senjata utama kita dalam melestarikan paru-paru bumi.\n\nDengan memanfaatkan aplikasi kementerian seperti **SAKTI, Nadine, DIGIPAY, dan SAKTI Web**, kita telah memotong rantai penggunaan kertas (paperless) secara drastis di Kanwil DJPb Riau. \n\nSatu rim kertas yang kita hemat setara dengan menyelamatkan sebagian kecil pohon rimba yang memproduksi oksigen bagi kehidupan kita. Selalu usahakan melakukan review dokumen secara digital sebelum memutuskan untuk mencetak dokumen fisik!${pantun}`;
  }
  
  if (q.includes("plastik") || q.includes("botol") || q.includes("tumbler") || q.includes("sampah") || q.includes("pantry")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Tuan dan Puan! Tahukah Anda bahwa sebuah botol plastik membutuhkan waktu hingga 450 tahun untuk dapat terurai secara alami?\n\nMelalui gerakan **Riau Darling**, Kanwil DJPb Riau mengampanyekan gerakan membawa tumbler pribadi ke tempat kerja. Dengan meniadakan botol air mineral plastik sekali pakai di ruang rapat dan pantry, kita menghentikan timbunan sampah mikroplastik yang dapat mencemari aliran air berharga seperti Sungai Siak. Mari jadikan membawa Tumbler sebagai gaya hidup keren di kantor!${pantun}`;
  }
  
  if (q.includes("listrik") || q.includes("energi") || q.includes("ac") || q.includes("lampu") || q.includes("komputer")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Rekan Green DJPb! Hemat energi adalah aksi nyata yang paling mudah dan berdampak instan di kantor kita.\n\nBeberapa aturan praktis hemat energi di Kanwil DJPb Riau:\n1. Atur suhu AC ruangan pada kisaran ideal 24°C - 25°C.\n2. Matikan AC dan lampu di ruangan yang sedang kosong atau saat istirahat.\n3. Shutdown penuh komputer, monitor, dan printer sebelum Tuan dan Puan meninggalkan meja kerja di sore hari.\n\nDengan menghemat energi, kita mengurangi beban pembangkit listrik berbahan bakar fosil yang mencemari udara bumi Lancang Kuning. Let's do this!${pantun}`;
  }
  
  if (q.includes("karhutla") || q.includes("kebakaran") || q.includes("gambut") || q.includes("asap")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Tuan dan Puan! Menjaga kelestarian lahan gambut Riau adalah tanggung jawab moral kita bersama.\n\nLahan gambut basah di Provinsi Riau adalah salah satu penyimpan karbon terbesar di dunia. Jika gambut mengering dan terbakar (karhutla), jutaan ton emisi karbon akan lepas ke atmosfer dan memicu bencana kabut asap yang berbahaya.\n\nGerakan Riau Darling mendukung kesadaran pencegahan karhutla dengan mengedukasi masyarakat luas serta mengadopsi gaya hidup bebas emisi karbon mulai dari lingkungan perkantoran pemerintah.${pantun}`;
  }
  
  if (q.includes("pantun") || q.includes("melayu") || q.includes("adat") || q.includes("budaya")) {
    return `[Asisten Hijau Riau Darling - Mode Pintar]\n\nHalo Tuan dan Puan! Budaya Melayu Riau sangat menjunjung tinggi kelestarian alam dan lingkungan hidup sebagai warisan sakral. Berikut pantun khusus untuk Anda:\n\n*Pergi ke pasar membeli madu,\nMadu manis lebah kelulut;\nMari bersama bersatu padu,\nMenjaga alam rimba dan gambut.*\n\n*Elok nian si lebah sialang,\nBersarang tinggi di dahan kayu;\nAlam dijaga bumi pun tenang,\nWarisan luhur adat Melayu.*`;
  }
  
  return `[Asisten Hijau Riau Darling]\n\nHalo Rekan Green DJPb! Terima kasih atas pertanyaannya yang luar biasa.\n\nMari terus dukung gerakan **Riau Darling (Sadar Lingkungan)** di Kanwil DJPb Provinsi Riau dengan mempraktikkan tiga aksi utama:\n1. **Zero Plastic**: Gunakan tumbler pribadi, hindari plastik sekali pakai.\n2. **Paperless**: Optimalkan SAKTI, Nadine, dan DIGIPAY untuk mengurangi cetak kertas.\n3. **Eco Energy**: Hemat listrik dengan mematikan perangkat elektronik pasca jam kerja dan atur AC pada suhu 24°C.\n\nAda hal spesifik yang ingin ditanyakan seputar hemat energi, kebijakan paperless, atau kearifan adat Melayu Riau? Silakan tanyakan kepada saya!${pantun}`;
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
    const fallbackText = getSimulatedResponse(userQuery);
    return res.json({ text: fallbackText });
  }

  try {
    // Build context or history for the chat
    const chatHistory = messages.map(msg => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));
console.log("===== GEMINI REQUEST =====");
console.log("Model:", "gemini-flash-latest");
    console.log("SDK:", "@google/genai");

try {
  const pager = await ai.models.list();

  console.log("===== MODEL TERSEDIA =====");

  for await (const model of pager) {
    console.log(model.name);
  }
} catch (e) {
  console.error("LIST MODEL ERROR:", e);
}

const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: chatHistory,
  config: {
    systemInstruction: `...`
  }
});

Tugas utama Anda:
1. Memberikan edukasi, tips, solusi praktis, dan jawaban ramah mengenai cara menjaga lingkungan di lingkungan perkantoran pemerintah (khususnya DJPb) dan kehidupan sehari-hari di Provinsi Riau.
2. Mendukung inisiatif Green Office: kurangi kertas (Paperless menggunakan SAKTI, Nadine, DIGIPAY, SAKTI Web), kurangi plastik sekali pakai (Zero Waste, penggunaan tumbler), hemat energi (AC suhu 24-25°C, matikan peralatan elektronik tak terpakai), serta hemat air.
3. Menghubungkan isu lokal Riau dengan pelestarian lingkungan, seperti pencegahan kebakaran hutan & lahan (karhutla), pelestarian lahan gambut basah, dan konservasi Sungai Siak & Kampar.
4. Memberikan nuansa budaya Melayu Riau yang hangat. Gunakan sapaan khas Melayu Riau seperti "Rekan Green DJPb" or "Tuan dan Puan". Bila memungkinkan atau di momen yang pas, sisipkan pantun Melayu yang bertema lingkungan di awal atau akhir jawaban Anda.

Gaya Komunikasi:
- Ramah, bersemangat, profesional, dan menginspirasi untuk peduli lingkungan.
- Selalu gunakan bahasa Indonesia yang baik, santun, dan komunikatif.
- Berikan saran yang konkret, bisa ditiru (actionable), dan logis.`
      }
    });

    const reply = response.text || "Maaf, saya tidak dapat merumuskan jawaban saat ini.";
    return res.json({ text: reply });
  } catch (error: any) {
    console.error("===== GEMINI ERROR =====");
    console.error(error);

    if (error?.message) {
      console.error("Message:", error.message);
    }

    if (error?.status) {
      console.error("Status:", error.status);
    }

    if (error?.error) {
      console.error("Detail:", error.error);
    }

    const fallbackText = getSimulatedResponse(userQuery);
    return res.json({ text: fallbackText });
  }
});

export default app;
