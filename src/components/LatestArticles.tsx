import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  BookOpen, 
  Clock, 
  Tag, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  X, 
  Check, 
  ShieldCheck, 
  Image as ImageIcon, 
  AlertCircle,
  Sparkles
} from "lucide-react";

export interface FeaturedArticle {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

export interface Article {
  id: string;
  category: string;
  hashtag: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  imageUrl: string;
  url: string;
}

export const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: "feat-1",
    tag: "Green Info",
    title: "Superfood Lokal Indonesia di Tengah Krisis Pangan Dunia",
    excerpt: "Indonesia adalah salah satu negara dengan keanekaragaman hayati tertinggi di dunia, namun masih menghadapi berbagai tantangan pangan global. Berbagai tanaman lokal berpotensi menjadi superfood masa depan.",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    url: "https://www.kemenkeu.go.id/single-page/green-economy"
  },
  {
    id: "feat-2",
    tag: "Green Info",
    title: "Hemat Kertas, Hemat Biaya: Solusi Gabung PDF untuk UMKM Berkelanjutan",
    excerpt: "Di tengah tren digitalisasi yang semakin pesat, para pelaku UMKM Indonesia mulai beralih menggunakan format digital terintegrasi untuk mengurangi limbah kertas dan menghemat biaya operasional.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
    url: "https://www.kemenkeu.go.id/single-page/digitalisasi-umkm"
  },
  {
    id: "feat-3",
    tag: "Green Info",
    title: "Menggali Potensi Pangan Lokal Indonesia Sebagai Solusi Ketahanan Pangan di Tengah Krisis Iklim",
    excerpt: "Indonesia dikenal sebagai negara agraris yang kaya akan sumber pangan lokal non-beras seperti sagu, jagung, dan ubi jalar sebagai garda terdepan dalam menghadapi perubahan iklim global.",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    url: "https://www.kemenkeu.go.id/single-page/ketahanan-pangan"
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "art-1",
    category: "Hutan",
    hashtag: "#Hutan",
    title: "Keterangan Saksi Tergugat Membuktikan Proyek Jalan 135 km Berjalan Serampangan",
    excerpt: "Keterangan saksi tergugat mengungkap bagaimana operasi PSN berkelindan dengan kepentingan aktor lokal guna membungkam suara Masyarakat Adat.",
    source: "Greenpeace Indonesia",
    date: "16 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b2e9?auto=format&fit=crop&q=80&w=600",
    url: "https://www.greenpeace.org/indonesia/siaran-pers/"
  },
  {
    id: "art-2",
    category: "Kabar dan Cerita",
    hashtag: "#Ummah4Earth",
    title: "Meninjau Kembali Prinsip Tayib Batu Bara dalam Keuangan Syariah di Indonesia",
    excerpt: "Greenpeace Indonesia menggelar diskusi publik guna menyambut perilisan makalah \"Meninjau Kembali Batu Bara dalam Keuangan Islam: Imperatif Etis untuk Divestasi dan Keberlanjutan\" dalam Bahasa Indonesia...",
    source: "Greenpeace Indonesia",
    date: "15 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    url: "https://www.greenpeace.org/indonesia/kabar-dan-cerita/"
  },
  {
    id: "art-3",
    category: "Iklim dan Energi",
    hashtag: "#EnergiTerbarukan",
    title: "Terjebak Carbon Lock-In, Ambisi Dekarbonisasi Sistem Ketenagalistrikan Indonesia Dipertanyakan",
    excerpt: "Komitmen ambisius Pemerintah Indonesia untuk memangkas emisi gas rumah kaca (GRK) sebesar 5,42-18,24% dibanding skenario dasar pada tahun 2030 serta target megaproyek PLTS 100 GW yang dimulai tahun ini menghadapi tembok besar.",
    source: "Greenpeace Indonesia",
    date: "9 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    url: "https://www.greenpeace.org/indonesia/publikasi/"
  },
  {
    id: "art-4",
    category: "Hutan",
    hashtag: "#Hutan",
    title: "Masyarakat Adat Bersaksi tentang Pembangunan Jalan 135 km yang Membabat Hutan Merauke",
    excerpt: "Rute jalan 135 kilometer ini bukanlah jalur yang biasa dilalui masyarakat setempat, tetapi justru membelah hutan.",
    source: "Greenpeace Indonesia",
    date: "8 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    url: "https://www.greenpeace.org/indonesia/cerita-kita/"
  }
];

interface LatestArticlesProps {
  featuredArticles?: FeaturedArticle[];
  articles?: Article[];
  isAdmin?: boolean;
  onUpdateFeaturedArticles?: (newFeat: FeaturedArticle[]) => void;
  onUpdateArticles?: (newArticles: Article[]) => void;
}

export default function LatestArticles({
  featuredArticles = FEATURED_ARTICLES,
  articles = ARTICLES_DATA,
  isAdmin = false,
  onUpdateFeaturedArticles,
  onUpdateArticles
}: LatestArticlesProps) {
  const [toastMsg, setToastMsg] = useState("");

  // Modal States
  const [editingFeat, setEditingFeat] = useState<FeaturedArticle | null>(null);
  const [isAddingFeat, setIsAddingFeat] = useState(false);
  const [featForm, setFeatForm] = useState<Omit<FeaturedArticle, "id">>({
    tag: "Green Info",
    title: "",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    url: "https://www.kemenkeu.go.id"
  });

  const [editingArt, setEditingArt] = useState<Article | null>(null);
  const [isAddingArt, setIsAddingArt] = useState(false);
  const [artForm, setArtForm] = useState<Omit<Article, "id">>({
    category: "Hutan",
    hashtag: "#Hutan",
    title: "",
    excerpt: "",
    source: "Kanwil DJPb Provinsi Riau",
    date: "21 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b2e9?auto=format&fit=crop&q=80&w=600",
    url: "https://www.kemenkeu.go.id"
  });

  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string; type: "feat" | "art" } | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Helper for uploading image file locally
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar (maksimal 5MB).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onSuccess(reader.result);
        triggerToast("Foto artikel berhasil diunggah!");
      }
    };
    reader.readAsDataURL(file);
  };

  // --- FEATURED ARTICLES HANDLERS ---
  const handleSaveFeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featForm.title || !featForm.excerpt) return;

    let updated: FeaturedArticle[];
    if (editingFeat) {
      updated = featuredArticles.map((item) =>
        item.id === editingFeat.id ? { ...featForm, id: item.id } : item
      );
      triggerToast("Artikel utama berhasil diperbarui!");
    } else {
      const newItem: FeaturedArticle = {
        ...featForm,
        id: `feat-${Date.now()}`
      };
      updated = [newItem, ...featuredArticles];
      triggerToast("Artikel utama baru berhasil ditambahkan!");
    }

    if (onUpdateFeaturedArticles) onUpdateFeaturedArticles(updated);
    setEditingFeat(null);
    setIsAddingFeat(false);
  };

  const handleDeleteFeat = (id: string, title: string) => {
    setDeleteConfirm({ id, title, type: "feat" });
  };

  const confirmDeleteAction = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "feat") {
      const updated = featuredArticles.filter((item) => item.id !== deleteConfirm.id);
      if (onUpdateFeaturedArticles) onUpdateFeaturedArticles(updated);
      triggerToast("Artikel utama berhasil dihapus!");
    } else {
      const updated = articles.filter((item) => item.id !== deleteConfirm.id);
      if (onUpdateArticles) onUpdateArticles(updated);
      triggerToast("Kabar/Berita konservasi berhasil dihapus!");
    }
    setDeleteConfirm(null);
  };

  const handleDirectFeatImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(e, (dataUrl) => {
      const updated = featuredArticles.map((item) =>
        item.id === id ? { ...item, imageUrl: dataUrl } : item
      );
      if (onUpdateFeaturedArticles) onUpdateFeaturedArticles(updated);
    });
  };

  // --- CONSERVATION ARTICLES HANDLERS ---
  const handleSaveArt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artForm.title || !artForm.excerpt) return;

    let updated: Article[];
    if (editingArt) {
      updated = articles.map((item) =>
        item.id === editingArt.id ? { ...artForm, id: item.id } : item
      );
      triggerToast("Kabar/Berita lingkungan berhasil diperbarui!");
    } else {
      const newItem: Article = {
        ...artForm,
        id: `art-${Date.now()}`
      };
      updated = [newItem, ...articles];
      triggerToast("Kabar/Berita lingkungan baru berhasil ditambahkan!");
    }

    if (onUpdateArticles) onUpdateArticles(updated);
    setEditingArt(null);
    setIsAddingArt(false);
  };

  const handleDeleteArt = (id: string, title: string) => {
    setDeleteConfirm({ id, title, type: "art" });
  };

  const handleDirectArtImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(e, (dataUrl) => {
      const updated = articles.map((item) =>
        item.id === id ? { ...item, imageUrl: dataUrl } : item
      );
      if (onUpdateArticles) onUpdateArticles(updated);
    });
  };

  return (
    <div id="latest-articles-section" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mt-8 space-y-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-900 text-amber-300 font-bold px-5 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-2 text-xs"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Mode Badge */}
      {isAdmin && (
        <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-4 border border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-emerald-950 rounded-xl font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>Kewenangan Administrator Aktif</span>
              </p>
              <p className="text-[11px] text-emerald-200">
                Tuan & Puan dapat menambahkan, mengunggah foto, mengedit, dan menghapus artikel & berita langsung di bawah ini.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setFeatForm({
                  tag: "Green Info",
                  title: "",
                  excerpt: "",
                  imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
                  url: "https://www.kemenkeu.go.id"
                });
                setIsAddingFeat(true);
              }}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Artikel Utama</span>
            </button>
            <button
              onClick={() => {
                setArtForm({
                  category: "Hutan",
                  hashtag: "#Hutan",
                  title: "",
                  excerpt: "",
                  source: "Kanwil DJPb Provinsi Riau",
                  date: "21 Juli 2026",
                  imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b2e9?auto=format&fit=crop&q=80&w=600",
                  url: "https://www.kemenkeu.go.id"
                });
                setIsAddingArt(true);
              }}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-500"
            >
              <Plus className="h-4 w-4" />
              <span>+ Kabar Konservasi</span>
            </button>
          </div>
        </div>
      )}

      {/* --- SECTION 1: MAIN FEATURED ARTICLES (3-COLUMN GRID) --- */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              <span>Artikel Terbaru</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium">Informasi & Edukasi Hijau Kanwil DJPb Riau</p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setFeatForm({
                  tag: "Green Info",
                  title: "",
                  excerpt: "",
                  imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
                  url: "https://www.kemenkeu.go.id"
                });
                setIsAddingFeat(true);
              }}
              className="self-start sm:self-auto px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Artikel Utama</span>
            </button>
          )}
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group relative bg-white rounded-2xl p-2 border border-slate-100 hover:border-slate-200 transition-all shadow-xs"
            >
              {/* Card Image */}
              <div className="w-full aspect-[4/3] relative overflow-hidden rounded-xl bg-slate-100 border border-slate-100 shadow-sm">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Direct Admin Toolbar on Card Image */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1.5 rounded-xl shadow-md z-10">
                    {/* Upload Photo Button */}
                    <label 
                      title="Unggah Foto Baru"
                      className="p-1.5 bg-white/20 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleDirectFeatImageUpload(article.id, e)}
                      />
                    </label>

                    {/* Edit Button */}
                    <button
                      title="Edit Artikel"
                      onClick={() => {
                        setEditingFeat(article);
                        setFeatForm({
                          tag: article.tag,
                          title: article.title,
                          excerpt: article.excerpt,
                          imageUrl: article.imageUrl,
                          url: article.url
                        });
                      }}
                      className="p-1.5 bg-white/20 hover:bg-amber-500 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      title="Hapus Artikel"
                      onClick={() => handleDeleteFeat(article.id, article.title)}
                      className="p-1.5 bg-white/20 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Tag & Admin Quick Control Bar */}
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-full shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  <span>{article.tag}</span>
                </span>

                {isAdmin && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Dapat Diubah</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug hover:text-emerald-700 active:text-emerald-800 transition-colors line-clamp-3"
              >
                {article.title}
              </a>

              {/* Excerpt */}
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-sans line-clamp-3 flex-1">
                {article.excerpt}
              </p>

              {/* Read Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingFeat(article);
                        setFeatForm({
                          tag: article.tag,
                          title: article.title,
                          excerpt: article.excerpt,
                          imageUrl: article.imageUrl,
                          url: article.url
                        });
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Ubah</span>
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => handleDeleteFeat(article.id, article.title)}
                      className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: CONSERVATION LIST ARTICLES --- */}
      <div className="pt-8 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 gap-3">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full" />
            <span>Kabar Konservasi & Isu Lingkungan</span>
          </h3>

          {isAdmin && (
            <button
              onClick={() => {
                setArtForm({
                  category: "Hutan",
                  hashtag: "#Hutan",
                  title: "",
                  excerpt: "",
                  source: "Kanwil DJPb Provinsi Riau",
                  date: "21 Juli 2026",
                  imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b2e9?auto=format&fit=crop&q=80&w=600",
                  url: "https://www.kemenkeu.go.id"
                });
                setIsAddingArt(true);
              }}
              className="self-start sm:self-auto px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kabar/Berita</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col md:flex-row gap-5 items-start group relative pb-6 border-b border-slate-100/60 last:border-0 last:pb-0 bg-white p-3 rounded-2xl hover:bg-slate-50/60 transition-colors"
            >
              {/* Image Container on the Left */}
              <div className="w-full md:w-52 h-36 flex-shrink-0 relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-sm">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Direct Admin Upload Overlay */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1.5 rounded-xl shadow-md z-10">
                    <label 
                      title="Unggah Foto Berita"
                      className="p-1.5 bg-white/20 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleDirectArtImageUpload(article.id, e)}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Content Details on the Right */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-2 w-full">
                <div>
                  {/* Category & Hashtag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider font-mono">
                      <span>{article.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[#3b823e]">{article.hashtag}</span>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingArt(article);
                            setArtForm({
                              category: article.category,
                              hashtag: article.hashtag,
                              title: article.title,
                              excerpt: article.excerpt,
                              source: article.source,
                              date: article.date,
                              imageUrl: article.imageUrl,
                              url: article.url
                            });
                          }}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Ubah</span>
                        </button>
                        <button
                          onClick={() => handleDeleteArt(article.id, article.title)}
                          className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-base font-bold text-slate-900 leading-snug tracking-tight hover:text-emerald-700 active:text-emerald-800 transition-colors"
                  >
                    {article.title}
                  </a>

                  {/* Excerpt */}
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed font-sans line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Publisher & Date Footer */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-medium border-t border-slate-100/80 mt-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-600">{article.source}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                  
                  {/* External Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 text-[10px] bg-emerald-50 px-2.5 py-1 rounded-lg"
                  >
                    <span>Baca Artikel</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* --- MODAL FOR FEATURED ARTICLE (ADD / EDIT) --- */}
      <AnimatePresence>
        {(isAddingFeat || editingFeat) && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative space-y-4 my-8"
            >
              <button
                onClick={() => {
                  setIsAddingFeat(false);
                  setEditingFeat(null);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {editingFeat ? "Ubah Artikel Utama" : "Tambah Artikel Utama Baru"}
                </h3>
              </div>

              <form onSubmit={handleSaveFeat} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tag / Label Artikel</label>
                  <input
                    type="text"
                    required
                    value={featForm.tag}
                    onChange={(e) => setFeatForm({ ...featForm, tag: e.target.value })}
                    placeholder="Contoh: Green Info / Inovasi Hijau"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Artikel Utama</label>
                  <input
                    type="text"
                    required
                    value={featForm.title}
                    onChange={(e) => setFeatForm({ ...featForm, title: e.target.value })}
                    placeholder="Judul menarik..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ringkasan / Excerpt</label>
                  <textarea
                    required
                    rows={3}
                    value={featForm.excerpt}
                    onChange={(e) => setFeatForm({ ...featForm, excerpt: e.target.value })}
                    placeholder="Tuliskan ringkasan singkat artikel..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                {/* Photo Upload & URL Area */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <label className="block font-bold text-slate-700 text-xs flex items-center justify-between">
                    <span>Gambar / Foto Artikel</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Lokal File / Web URL</span>
                  </label>

                  {/* Upload button */}
                  <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl cursor-pointer text-emerald-800 font-bold text-xs transition-all shadow-xs">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    <span>Unggah Foto dari Komputer / HP</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setFeatForm({ ...featForm, imageUrl: url }))}
                    />
                  </label>

                  <input
                    type="text"
                    required
                    value={featForm.imageUrl}
                    onChange={(e) => setFeatForm({ ...featForm, imageUrl: e.target.value })}
                    placeholder="Atau tempel Tautan Gambar (https://...)"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                  />

                  {featForm.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100 flex items-center justify-center">
                      <img src={featForm.imageUrl} alt="Pratinjau" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">Pratinjau Gambar</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tautan Asli (URL Kemenkeu/Web)</label>
                  <input
                    type="text"
                    required
                    value={featForm.url}
                    onChange={(e) => setFeatForm({ ...featForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingFeat(false);
                      setEditingFeat(null);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    <span>Simpan Artikel Utama</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL FOR CONSERVATION ARTICLE (ADD / EDIT) --- */}
      <AnimatePresence>
        {(isAddingArt || editingArt) && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative space-y-4 my-8"
            >
              <button
                onClick={() => {
                  setIsAddingArt(false);
                  setEditingArt(null);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {editingArt ? "Ubah Kabar/Berita Lingkungan" : "Tambah Kabar/Berita Lingkungan"}
                </h3>
              </div>

              <form onSubmit={handleSaveArt} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                    <input
                      type="text"
                      required
                      value={artForm.category}
                      onChange={(e) => setArtForm({ ...artForm, category: e.target.value })}
                      placeholder="Contoh: Hutan / Iklim"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hashtag</label>
                    <input
                      type="text"
                      required
                      value={artForm.hashtag}
                      onChange={(e) => setArtForm({ ...artForm, hashtag: e.target.value })}
                      placeholder="Contoh: #Hutan / #Energi"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Kabar / Berita</label>
                  <input
                    type="text"
                    required
                    value={artForm.title}
                    onChange={(e) => setArtForm({ ...artForm, title: e.target.value })}
                    placeholder="Judul berita..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ringkasan Berita</label>
                  <textarea
                    required
                    rows={3}
                    value={artForm.excerpt}
                    onChange={(e) => setArtForm({ ...artForm, excerpt: e.target.value })}
                    placeholder="Ringkasan berita..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Sumber Penerbit</label>
                    <input
                      type="text"
                      required
                      value={artForm.source}
                      onChange={(e) => setArtForm({ ...artForm, source: e.target.value })}
                      placeholder="Contoh: Greenpeace / Kanwil DJPb Riau"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
                    <input
                      type="text"
                      required
                      value={artForm.date}
                      onChange={(e) => setArtForm({ ...artForm, date: e.target.value })}
                      placeholder="Contoh: 21 Juli 2026"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Photo Upload & URL Area */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <label className="block font-bold text-slate-700 text-xs flex items-center justify-between">
                    <span>Gambar / Foto Berita</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Lokal File / Web URL</span>
                  </label>

                  <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl cursor-pointer text-emerald-800 font-bold text-xs transition-all shadow-xs">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    <span>Unggah Foto dari Komputer / HP</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setArtForm({ ...artForm, imageUrl: url }))}
                    />
                  </label>

                  <input
                    type="text"
                    required
                    value={artForm.imageUrl}
                    onChange={(e) => setArtForm({ ...artForm, imageUrl: e.target.value })}
                    placeholder="Atau tempel Tautan Gambar (https://...)"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                  />

                  {artForm.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100 flex items-center justify-center">
                      <img src={artForm.imageUrl} alt="Pratinjau" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">Pratinjau Gambar</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tautan Asli Berita</label>
                  <input
                    type="text"
                    required
                    value={artForm.url}
                    onChange={(e) => setArtForm({ ...artForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingArt(false);
                      setEditingArt(null);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    <span>Simpan Kabar/Berita</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CONFIRMATION MODAL FOR DELETION --- */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Konfirmasi Hapus Artikel</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Apakah Tuan & Puan yakin ingin menghapus <span className="font-bold text-slate-800">"{deleteConfirm.title}"</span>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDeleteAction}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Ya, Hapus</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
