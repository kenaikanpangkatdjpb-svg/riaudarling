import { GreenActionTemplate, QuizQuestion, LoggedAction } from "./types";

export const GREEN_ACTION_TEMPLATES: GreenActionTemplate[] = [
  {
    id: "act-nadine",
    name: "Administrasi Paperless (Nadine)",
    category: "paperless",
    co2Saved: 0.25, // kg CO2
    plasticSaved: 0,
    points: 30,
    description: "Mengirimkan nota dinas, undangan, atau persuratan resmi sepenuhnya lewat aplikasi Nadine tanpa mencetak kertas.",
    iconName: "FileText"
  },
  {
    id: "act-sakti",
    name: "Pengajuan SAKTI / SP2D Elektronik",
    category: "paperless",
    co2Saved: 0.5,
    plasticSaved: 0,
    points: 40,
    description: "Memproses pengajuan anggaran, SPM, atau pendaftaran kontrak secara digital melalui SAKTI tanpa fotokopi berlebih.",
    iconName: "Cpu"
  },
  {
    id: "act-tumbler",
    name: "Membawa Tumbler Pribadi (Zero Bottle)",
    category: "plastic",
    co2Saved: 0.12,
    plasticSaved: 1, // 1 botol plastik dikurangi
    points: 20,
    description: "Membawa botol minum isi ulang sendiri dan mengisi air di dispenser kantor, menolak botol plastik sekali pakai.",
    iconName: "CupSoda"
  },
  {
    id: "act-lunchbox",
    name: "Membawa Wadah Makan Sendiri",
    category: "plastic",
    co2Saved: 0.18,
    plasticSaved: 1, // 1 kemasan styrofoam/plastik
    points: 25,
    description: "Membawa kotak makan sendiri saat membeli makan siang di sekitar Jalan Jenderal Sudirman Pekanbaru, menolak styrofoam.",
    iconName: "Utensils"
  },
  {
    id: "act-ac",
    name: "Hemat Energi AC (Suhu 24-25°C)",
    category: "energy",
    co2Saved: 0.8,
    plasticSaved: 0,
    points: 25,
    description: "Menyetel suhu AC ruangan kerja atau ruang rapat pada suhu ideal 24-25°C dan memastikan pintu/jendela tertutup rapat.",
    iconName: "Thermometer"
  },
  {
    id: "act-shutdown",
    name: "Matikan Alat Elektronik Pasca Kantor",
    category: "energy",
    co2Saved: 1.2,
    plasticSaved: 0,
    points: 35,
    description: "Mematikan komputer, monitor, printer, dan AC ruang kerja sebelum pulang kantor atau saat akhir pekan.",
    iconName: "Power"
  },
  {
    id: "act-trash",
    name: "Pilah Sampah di Pantry / Ruangan",
    category: "waste",
    co2Saved: 0.3,
    plasticSaved: 2,
    points: 25,
    description: "Memilah sampah organik (sisa makanan) dan anorganik (plastik/kertas) di tempat sampah yang telah disediakan.",
    iconName: "Trash2"
  },
  {
    id: "act-carpool",
    name: "Carpooling / Naik Transportasi Umum",
    category: "energy",
    co2Saved: 2.1,
    plasticSaved: 0,
    points: 50,
    description: "Berangkat kerja bersama rekan satu rute (carpooling) atau menggunakan Trans Metro Pekanbaru guna menekan emisi gas buang.",
    iconName: "Car"
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa kepanjangan dari program gerakan lingkungan internal di Kanwil DJPb Provinsi Riau?",
    options: [
      "Riau Sadar Lingkungan (Riau Darling)",
      "Riau Bersih Rapi (Riau Asri)",
      "Kemenkeu Riau Hijau (Keriuh)",
      "DJPb Riau Bebas Plastik (DJPb Riau Clean)"
    ],
    correctIndex: 0,
    explanation: "Kanwil DJPb Provinsi Riau menggalakkan gerakan 'Riau Sadar Lingkungan' (Riau Darling) sebagai komitmen mendukung kelestarian bumi dan meminimalisir emisi karbon kantor.",
    points: 15
  },
  {
    id: 2,
    question: "Lahan gambut Riau menyimpan cadangan karbon yang melimpah. Apa tindakan kantor terbaik untuk mencegah degradasi lahan gambut lokal?",
    options: [
      "Membakar daun kering di halaman kantor",
      "Mendukung kebijakan zero-deforestation dan efisiensi kertas yang bersumber dari serat kayu hutan gambut",
      "Membuang air sisa dispenser ke selokan",
      "Membuka lahan parkir baru dengan mengupas tanah gambut"
    ],
    correctIndex: 1,
    explanation: "Efisiensi penggunaan kertas di kantor (seperti gerakan paperless SAKTI dan Nadine) secara langsung membantu menekan penebangan pohon di hutan gambut Riau yang berharga bagi penyerapan emisi global.",
    points: 15
  },
  {
    id: 3,
    question: "Berapakah suhu pendingin ruangan (AC) ideal yang direkomendasikan untuk ruang kerja di lingkungan Kemenkeu agar hemat energi?",
    options: [
      "16°C - 18°C",
      "20°C - 22°C",
      "24°C - 25°C",
      "Suhu tidak perlu diatur, biarkan menyala terus"
    ],
    correctIndex: 2,
    explanation: "Suhu AC 24°C - 25°C adalah rentang paling efisien. Setiap penurunan suhu 1°C dapat meningkatkan konsumsi listrik AC sekitar 6% hingga 10%.",
    points: 10
  },
  {
    id: 4,
    question: "Aplikasi internal Kementerian Keuangan apa yang berperan besar dalam mengurangi pencetakan kertas untuk disposisi dan nota dinas?",
    options: [
      "SAKTI",
      "Nadine (Naskah Dinas Elektronik)",
      "DJPb Mobile",
      "DIGIPAY"
    ],
    correctIndex: 1,
    explanation: "Nadine memungkinkan persuratan dinas, disposisi, hingga tanda tangan elektronik bersertifikat BSrE berjalan 100% digital tanpa cetak kertas.",
    points: 10
  },
  {
    id: 5,
    question: "Berapa lama estimasi waktu yang dibutuhkan oleh satu botol plastik air mineral sekali pakai untuk dapat terurai di tanah?",
    options: [
      "Sekitar 10 tahun",
      "Sekitar 50 tahun",
      "Sekitar 100 tahun",
      "Sekitar 450 tahun atau lebih"
    ],
    correctIndex: 3,
    explanation: "Botol plastik sekali pakai (PET) membutuhkan waktu sekitar 450 tahun atau bahkan lebih untuk terurai penuh. Oleh sebab itu, Tuan & Puan di Kanwil Riau sangat didorong membawa tumbler!",
    points: 15
  },
  {
    id: 6,
    question: "Dalam adat Melayu Riau, terdapat konsep pelestarian alam tradisional. Apa sebutan bagi hutan adat yang dijaga ketat agar pohon sialang tempat bersarang lebah tidak rusak?",
    options: [
      "Rimba Kepungan Sialang",
      "Tanah Ulayat Gundul",
      "Ladang Gambut",
      "Taman Wisata Alam Siak"
    ],
    correctIndex: 0,
    explanation: "Rimba Kepungan Sialang merupakan kearifan lokal masyarakat Melayu Riau untuk menjaga pohon-pohon besar tempat bersarang lebah madu sialang agar tidak ditebang.",
    points: 15
  },
  {
    id: 7,
    question: "Tindakan sederhana apa di pantry kantor yang sangat membantu siklus daur ulang sampah perkantoran?",
    options: [
      "Membuang seluruh sampah makanan dan kemasan ke satu wadah campur",
      "Memisahkan sampah organik (sisa makanan) dari sampah anorganik (botol plastik, kertas)",
      "Membakar sampah plastik di belakang gedung Kanwil",
      "Mencuci wadah styrofoam lalu membuangnya ke selokan"
    ],
    correctIndex: 1,
    explanation: "Memisahkan sampah organik dan anorganik memudahkan petugas kebersihan menyalurkan sampah daur ulang ke bank sampah serta menghindari pembusukan sampah plastik.",
    points: 10
  },
  {
    id: 8,
    question: "Sungai Siak merupakan salah satu ikon penting Kota Pekanbaru dan Provinsi Riau. Apa ancaman limbah domestik terbesar dari kantor yang harus dihindari?",
    options: [
      "Membuang sampah plastik, sisa baterai, atau minyak pelumas ke saluran air kantor",
      "Mengalirkan air hujan bersih ke selokan",
      "Membiarkan rumput tumbuh di sekitar dermaga Siak",
      "Memasang saringan air di toilet kantor"
    ],
    correctIndex: 0,
    explanation: "Limbah beracun (seperti baterai bekas, oli, sampah plastik) yang dibuang sembarangan ke selokan kantor mengalir langsung ke daerah aliran sungai (DAS) Siak, memperparah polusi air.",
    points: 15
  }
];

export const SEED_LOGGED_ACTIONS: LoggedAction[] = [
  {
    id: "seed-1",
    employeeName: "Ahmad Dani (Bidang SKKI)",
    actionId: "act-nadine",
    actionName: "Administrasi Paperless (Nadine)",
    category: "paperless",
    co2Saved: 0.25,
    plasticSaved: 0,
    points: 30,
    date: "2026-07-15T09:15:00.000Z",
    notes: "Disposisi 5 nota dinas triwulan II lewat Nadine digital."
  },
  {
    id: "seed-2",
    employeeName: "Siti Rahma (Bidang PAPK)",
    actionId: "act-tumbler",
    actionName: "Membawa Tumbler Pribadi (Zero Bottle)",
    category: "plastic",
    co2Saved: 0.12,
    plasticSaved: 1,
    points: 20,
    date: "2026-07-15T08:30:00.000Z",
    notes: "Refill air mineral 3 kali di dispenser lantai 2."
  },
  {
    id: "seed-3",
    employeeName: "Bambang Wibowo (Bagian Umum)",
    actionId: "act-shutdown",
    actionName: "Matikan Alat Elektronik Pasca Kantor",
    category: "energy",
    co2Saved: 1.2,
    plasticSaved: 0,
    points: 35,
    date: "2026-07-14T17:05:00.000Z",
    notes: "Memastikan komputer bidang dan AC dimatikan sebelum pulang malam."
  },
  {
    id: "seed-4",
    employeeName: "Fitriani (Bidang PPA I)",
    actionId: "act-lunchbox",
    actionName: "Membawa Wadah Makan Sendiri",
    category: "plastic",
    co2Saved: 0.18,
    plasticSaved: 1,
    points: 25,
    date: "2026-07-15T12:10:00.000Z",
    notes: "Beli nasi padang pakai kotak makan sendiri, menolak pembungkus plastik ganda."
  },
  {
    id: "seed-5",
    employeeName: "Rian Syahputra (Bidang PPA II)",
    actionId: "act-ac",
    actionName: "Hemat Energi AC (Suhu 24-25°C)",
    category: "energy",
    co2Saved: 0.8,
    plasticSaved: 0,
    points: 25,
    date: "2026-07-15T10:00:00.000Z",
    notes: "Mengatur suhu AC ruang rapat Lancang Kuning di 24 derajat."
  }
];
