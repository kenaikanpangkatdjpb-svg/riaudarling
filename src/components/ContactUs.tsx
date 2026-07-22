import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Saran",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "Saran", message: "" });
      
      // Auto close success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section 
      id="contact-us-section" 
      className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-100 mt-8 space-y-8 relative overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50/50 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      {/* Header */}
      <div className="relative z-10 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
            Hubungi Kami
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
          Punya pertanyaan, saran, atau ingin bekerjasama dalam aksi pelestarian lingkungan di lingkungan Kanwil DJPb Provinsi Riau? Silakan kirimkan pesan Anda!
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card (Bento Style Left) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-800/60 relative overflow-hidden">
            {/* Traditional Riau Malay element inspired watermark */}
            <div className="absolute -bottom-10 -right-10 text-emerald-800/15 pointer-events-none">
              <MapPin className="h-44 w-44" />
            </div>

            <span className="px-3 py-1 bg-amber-400 text-emerald-950 text-[10px] uppercase tracking-widest font-black rounded-full inline-block mb-4">
              Kantor Wilayah
            </span>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
              Kanwil DJPb Provinsi Riau
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium mb-6">
              Direktorat Jenderal Perbendaharaan • Kementerian Keuangan RI
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-emerald-100/95 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-white font-bold text-xs sm:text-sm">Alamat Kantor:</p>
                  <p className="leading-relaxed">
                    Jl. Jenderal Sudirman No. 249, Pekanbaru, Provinsi Riau 28111
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-white font-bold text-xs sm:text-sm">Hubungi Telepon / Fax:</p>
                  <p>Telp: (0761) 23821, 21102</p>
                  <p>Fax: (0761) 21102</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-white font-bold text-xs sm:text-sm">Surel Resmi:</p>
                  <a 
                    href="mailto:kanwilriau.djpb@kemenkeu.go.id" 
                    className="underline hover:text-amber-300 transition-colors"
                  >
                    kanwilriau.djpb@kemenkeu.go.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-emerald-200">
                  <p className="text-white font-bold text-xs sm:text-sm">Jam Layanan Publik:</p>
                  <p>Senin - Jumat | 08.00 - 17.00 WIB</p>
                  <p className="text-[10px] text-emerald-300 font-normal italic">Sabtu, Minggu & Hari Libur Nasional Tutup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="grid grid-cols-2 gap-3.5">
            <a 
              href="https://wa.me/6281112345678?text=Halo%20Admin%20Riau%20Darling%20DJPb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25d366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all text-center"
            >
              <span>Hubungi WA</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a 
              href="https://maps.google.com/?q=Kanwil+DJPb+Provinsi+Riau+Pekanbaru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all text-center border border-slate-200"
            >
              <span>Petunjuk Peta</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Contact Form Container (Right Side) */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit} 
            className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6 sm:p-8 space-y-4 relative"
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-200/60 pb-3 mb-2">
              <Send className="h-4.5 w-4.5 text-emerald-600" />
              <span>Kirim Saran & Aspirasi Hijau</span>
            </h3>

            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-900 text-xs sm:text-sm">Pesan Berhasil Terkirim!</h4>
                    <p className="text-emerald-700 text-[11px] sm:text-xs mt-0.5 leading-normal">
                      Terima kasih atas aspirasi Tuan & Puan. Kanwil DJPb Provinsi Riau sangat mengapresiasi kontribusi pemikiran untuk lingkungan yang lebih lestari.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600">Nama Lengkap Tuan & Puan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Andi Wijaya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600">Alamat Email Aktif</label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: andi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">Subjek Hubungan</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                <option value="Saran">Saran Peningkatan Kampanye Hijau</option>
                <option value="Aduan">Laporan / Aduan Kerusakan Lingkungan Kantor</option>
                <option value="Kerjasama">Kerjasama / Kolaborasi Komunitas</option>
                <option value="Tanya">Pertanyaan Informasi Umum</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">Pesan / Detail Aspirasi</label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan saran, pertanyaan, atau tanggapan Anda secara detail di sini..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/60 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Send className={`h-4 w-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
              <span>{isSubmitting ? "Sedang Mengirim..." : "Kirim Pesan Sekarang"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
