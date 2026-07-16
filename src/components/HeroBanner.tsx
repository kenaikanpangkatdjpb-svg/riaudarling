import React, { useState, useEffect } from "react";
import { Leaf, Trees, Wind, Droplets, Landmark, ArrowRight, ShieldCheck, HelpCircle, Heart, FlameKindling } from "lucide-react";
import { motion } from "motion/react";

interface HeroBannerProps {
  onStartQuiz: () => void;
  onOpenAssistant: () => void;
}

export default function HeroBanner({ onStartQuiz, onOpenAssistant }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide indicator simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideContent = [
    {
      title: "Satu Langkah Hijau Insan Perbendaharaan untuk Bumi Lancang Kuning",
      subtitle: "Komitmen bersama seluruh pegawai Kanwil DJPb Provinsi Riau dalam mereduksi jejak karbon perkantoran, meniadakan plastik sekali pakai, dan menjaga kelestarian alam gambut Riau yang berharga.",
      buttonText: "Mari Beraksi Sekarang",
      action: onOpenAssistant
    },
    {
      title: "Melestarikan Rimba Kepungan Sialang & Gambut Melayu Riau",
      subtitle: "Menghubungkan kearifan lokal Melayu Riau dengan inisiatif Green Office Kementerian Keuangan guna menciptakan ekosistem kerja pemerintah yang berkelanjutan dan rendah emisi.",
      buttonText: "Uji Pemahaman Anda",
      action: onStartQuiz
    },
    {
      title: "Sinergi Kemenkeu Satu dalam Mengawal APBN Ramah Lingkungan",
      subtitle: "Melalui integrasi SAKTI, Nadine, dan DIGIPAY, kita kurangi jutaan lembar penggunaan kertas administrasi perkantoran demi mencegah penebangan pohon dan melestarikan hutan lindung.",
      buttonText: "Tanya Asisten AI",
      action: onOpenAssistant
    }
  ];

  return (
    <div className="relative bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-900 mb-8" id="hero-banner">
      {/* Decorative top gold line representing traditional Riau wood carving accent */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 z-30" />

      {/* Background Graphic Overlays imitating a misty peat forest in Pekanbaru at dusk */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-teal-950 to-emerald-900 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.12),transparent_50%)] z-0 animate-pulse duration-[8000ms]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_60%)] z-0" />
      
      {/* Semi-translucent Grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

      {/* TOP GLASS NAVIGATION BAR (Similar to Greenpeace Web Menu) */}
      <div className="relative z-20 border-b border-emerald-900/40 bg-emerald-950/40 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-emerald-950 shadow-inner">
            <Trees className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold tracking-wider text-xs sm:text-sm text-emerald-300 font-mono">
            RIAU DARLING
          </span>
        </div>
        
        {/* Navigation links inspired by the screenshot */}
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-wider font-bold text-emerald-100/90">
          <span className="hover:text-amber-400 transition-colors cursor-pointer border-b-2 border-amber-400 pb-1">Fokus Kerja</span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={onOpenAssistant}>Layanan AI</span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={onStartQuiz}>Kuis Adat</span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer">Panduan Kantor</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[9px] uppercase font-bold bg-amber-400 text-emerald-950 rounded-full flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 bg-emerald-950 rounded-full animate-ping" />
            Live Campaign
          </span>
        </div>
      </div>

      {/* HERO HERO MAIN BODY */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 flex flex-col justify-center min-h-[380px] max-w-4xl">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-[10px] sm:text-xs uppercase font-extrabold tracking-widest bg-emerald-800/80 text-emerald-300 border border-emerald-700/50 rounded-lg">
              Kementerian Keuangan Peduli Bumi
            </span>
          </div>

          {/* SIRA-inspired bold heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {slideContent[currentSlide].title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-emerald-200/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            {slideContent[currentSlide].subtitle}
          </p>

          {/* Yellow CTA Button like the Greenpeace SIRA button */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={slideContent[currentSlide].action}
              className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>{slideContent[currentSlide].buttonText}</span>
              <ArrowRight className="h-4 w-4 text-emerald-950 stroke-[3px]" />
            </button>
            <span className="text-[11px] text-emerald-300/80 font-mono hidden sm:inline">
              ⚡ Dukung Net-Zero Emission Kantor
            </span>
          </div>
        </motion.div>

        {/* Carousel indicator bar like in screenshot bottom left */}
        <div className="flex gap-2.5 mt-8 items-center">
          <span className="text-[10px] font-mono text-emerald-400/80 font-bold">0{currentSlide + 1}</span>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-amber-400" : "w-4 bg-emerald-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🌟 USER REQUEST: RUNNING TEXT MARQUEE (TULISAN BERJALAN) */}
      <div className="relative z-20 w-full bg-emerald-900/90 border-t border-b border-emerald-800/60 py-2.5 overflow-hidden flex items-center">
        <div className="absolute left-0 top-0 bottom-0 px-4 bg-amber-400 text-emerald-950 text-[10px] font-black uppercase tracking-widest flex items-center z-10 shadow-lg select-none">
          INFO UTAMA
        </div>
        <div className="flex whitespace-nowrap animate-marquee pl-[120px] text-[11px] sm:text-xs font-semibold text-emerald-100 tracking-wide font-mono">
          <span className="mx-4">🍃 [RIAU DARLING] Gerakan Riau Sadar Lingkungan Kanwil DJPb Provinsi Riau mendukung kelestarian alam Lancang Kuning!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">📢 Tuan & Puan diimbau membawa Tumbler Pribadi ke ruang kerja untuk mewujudkan Zero Single-Use Plastic Bottle!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">💻 Hemat Energi Kantor: Matikan komputer, printer, dan pastikan AC di-shutdown penuh selepas jam pelayanan berakhir!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">📄 SAKTI & Nadine Digitalisasi: Hemat puluhan rim kertas secara langsung demi masa depan paru-paru bumi Indonesia!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">🍯 Pantun Melayu: Elok nian si lebah sialang, bersarang tinggi di ranting dahan. Mari kita menjaga alam, warisan anak cucu masa depan!</span>
          <span className="mx-4 text-amber-300">•</span>
        </div>
        {/* Mirror ticker for seamless scrolling */}
        <div className="flex whitespace-nowrap animate-marquee2 absolute top-2.5 text-[11px] sm:text-xs font-semibold text-emerald-100 tracking-wide font-mono select-none pointer-events-none">
          <span className="mx-4">🍃 [RIAU DARLING] Gerakan Riau Sadar Lingkungan Kanwil DJPb Provinsi Riau mendukung kelestarian alam Lancang Kuning!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">📢 Tuan & Puan diimbau membawa Tumbler Pribadi ke ruang kerja untuk mewujudkan Zero Single-Use Plastic Bottle!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">💻 Hemat Energi Kantor: Matikan komputer, printer, dan pastikan AC di-shutdown penuh selepas jam pelayanan berakhir!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">📄 SAKTI & Nadine Digitalisasi: Hemat puluhan rim kertas secara langsung demi masa depan paru-paru bumi Indonesia!</span>
          <span className="mx-4 text-amber-300">•</span>
          <span className="mx-4">🍯 Pantun Melayu: Elok nian si lebah sialang, bersarang tinggi di ranting dahan. Mari kita menjaga alam, warisan anak cucu masa depan!</span>
          <span className="mx-4 text-amber-300">•</span>
        </div>
      </div>

      {/* 🌟 USER REQUEST: RUNNING IMAGES/CATEGORIES MARQUEE (GAMBAR BERJALAN) */}
      <div className="relative z-20 w-full bg-slate-900/40 py-6 overflow-hidden border-t border-emerald-900/30 flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400 mb-4 font-mono">
          Eksplorasi Pilar Aksi Riau Darling
        </span>
        
        <div className="flex w-full overflow-hidden relative">
          {/* Running Circle Cards with marquee behavior */}
          <div className="flex space-x-8 animate-marquee-slower whitespace-nowrap py-1">
            {[
              { title: "Rimba Gambut", desc: "Konservasi Lahan Gambut", icon: Trees, bg: "bg-emerald-900/60 text-emerald-400 border-emerald-500/40" },
              { title: "Iklim & Energi", desc: "Hemat AC & Listrik", icon: Wind, bg: "bg-amber-900/60 text-amber-400 border-amber-500/40" },
              { title: "Sungai Siak", desc: "Zero Sampah Cair", icon: Droplets, bg: "bg-blue-900/60 text-blue-400 border-blue-500/40" },
              { title: "Kantor Hijau", desc: "Nadine Paperless", icon: Landmark, bg: "bg-indigo-900/60 text-indigo-400 border-indigo-500/40" },
              { title: "Cegah Karhutla", desc: "Bebas Polusi Asap", icon: FlameKindling, bg: "bg-red-900/60 text-red-400 border-red-500/40" },
              { title: "Gaya Hidup", desc: "Bawa Tumbler Mandiri", icon: Heart, bg: "bg-rose-900/60 text-rose-400 border-rose-500/40" }
            ].map((circle, index) => {
              const Icon = circle.icon;
              return (
                <div 
                  key={index}
                  className="inline-flex flex-col items-center justify-center text-center p-3 w-40 bg-emerald-950/80 border border-emerald-900 rounded-2xl shadow-lg flex-shrink-0"
                >
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 mb-2.5 ${circle.bg} shadow-md`}>
                    <Icon className="h-6 w-6 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-100 block">{circle.title}</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5 leading-tight">{circle.desc}</span>
                </div>
              );
            })}
          </div>

          {/* Duplicate list for seamless running carousel */}
          <div className="flex space-x-8 animate-marquee-slower whitespace-nowrap py-1 absolute left-0 top-6 select-none pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
            {[
              { title: "Rimba Gambut", desc: "Konservasi Lahan Gambut", icon: Trees, bg: "bg-emerald-900/60 text-emerald-400 border-emerald-500/40" },
              { title: "Iklim & Energi", desc: "Hemat AC & Listrik", icon: Wind, bg: "bg-amber-900/60 text-amber-400 border-amber-500/40" },
              { title: "Sungai Siak", desc: "Zero Sampah Cair", icon: Droplets, bg: "bg-blue-900/60 text-blue-400 border-blue-500/40" },
              { title: "Kantor Hijau", desc: "Nadine Paperless", icon: Landmark, bg: "bg-indigo-900/60 text-indigo-400 border-indigo-500/40" },
              { title: "Cegah Karhutla", desc: "Bebas Polusi Asap", icon: FlameKindling, bg: "bg-red-900/60 text-red-400 border-red-500/40" },
              { title: "Gaya Hidup", desc: "Bawa Tumbler Mandiri", icon: Heart, bg: "bg-rose-900/60 text-rose-400 border-rose-500/40" }
            ].map((circle, index) => {
              const Icon = circle.icon;
              return (
                <div 
                  key={"dup-" + index}
                  className="inline-flex flex-col items-center justify-center text-center p-3 w-40 bg-emerald-950/80 border border-emerald-900 rounded-2xl shadow-lg flex-shrink-0"
                >
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 mb-2.5 ${circle.bg} shadow-md`}>
                    <Icon className="h-6 w-6 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-100 block">{circle.title}</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5 leading-tight">{circle.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
