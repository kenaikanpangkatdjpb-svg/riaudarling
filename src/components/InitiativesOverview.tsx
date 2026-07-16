import React from "react";
import { LoggedAction } from "../types";
import { Leaf, Award, Recycle, FlameKindling, Zap, FileJson, CheckCircle2, Trees, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface InitiativesProps {
  loggedActions: LoggedAction[];
}

export default function InitiativesOverview({ loggedActions }: InitiativesProps) {
  // Aggregate stats
  const totalCo2 = loggedActions.reduce((sum, act) => sum + act.co2Saved, 0);
  const totalPlastic = loggedActions.reduce((sum, act) => sum + act.plasticSaved, 0);
  const totalPoints = loggedActions.reduce((sum, act) => sum + act.points, 0);
  
  // Custom unique employee names list
  const uniqueEmployees = Array.from(new Set(loggedActions.map(act => act.employeeName))).length;

  // Let's determine office tier based on total points
  let officeTier = "Perunggu (Bronze)";
  let tierColor = "text-amber-700 bg-amber-100 border-amber-300";
  let progressPct = Math.min((totalPoints / 1000) * 100, 100);
  let nextTierThreshold = 1000;
  
  if (totalPoints >= 1500) {
    officeTier = "Lancang Kuning Lestari (Emerald)";
    tierColor = "text-emerald-800 bg-emerald-100 border-emerald-300";
    progressPct = 100;
    nextTierThreshold = 1500;
  } else if (totalPoints >= 800) {
    officeTier = "Emas (Gold)";
    tierColor = "text-amber-600 bg-amber-50 border-amber-300";
    progressPct = ((totalPoints - 800) / 700) * 100;
    nextTierThreshold = 1500;
  } else if (totalPoints >= 400) {
    officeTier = "Perak (Silver)";
    tierColor = "text-slate-600 bg-slate-100 border-slate-300";
    progressPct = ((totalPoints - 400) / 400) * 100;
    nextTierThreshold = 800;
  } else {
    progressPct = (totalPoints / 400) * 100;
    nextTierThreshold = 400;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div id="initiatives-overview-wrapper" className="space-y-6 mb-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        id="initiatives-overview"
      >
      {/* Stats Panel */}
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-500" />
            Capaian Kampanye Riau Darling
          </h2>
          <p className="text-slate-500 text-xs mb-6">
            Hasil akumulasi aksi nyata seluruh pegawai dan pimpinan Kanwil DJPb Provinsi Riau secara real-time.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50">
              <span className="block text-xs font-semibold text-emerald-700/80 uppercase tracking-wider mb-1">CO₂ Terhindar</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-emerald-900">{totalCo2.toFixed(2)}</span>
                <span className="text-[10px] font-medium text-emerald-700">kg</span>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50">
              <span className="block text-xs font-semibold text-amber-800/80 uppercase tracking-wider mb-1">Botol Plastik</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-amber-900">{totalPlastic}</span>
                <span className="text-[10px] font-medium text-amber-700">Pcs</span>
              </div>
            </div>

            <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/50">
              <span className="block text-xs font-semibold text-sky-800/80 uppercase tracking-wider mb-1">Total Poin</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-sky-900">{totalPoints}</span>
                <span className="text-[10px] font-medium text-sky-700">Pts</span>
              </div>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50">
              <span className="block text-xs font-semibold text-purple-800/80 uppercase tracking-wider mb-1">Pegawai Hijau</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-purple-900">{uniqueEmployees}</span>
                <span className="text-[10px] font-medium text-purple-700">Orang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Office Level Status */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <span className="text-xs text-slate-500 block leading-tight">Sertifikasi Kantor</span>
                <span className="text-sm font-bold text-slate-800">Status Eco-Office DJPb Riau</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tierColor} self-start sm:self-center`}>
              {officeTier}
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1.5">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>{totalPoints} Poin Tercapai</span>
            <span>{totalPoints >= 1500 ? "Level Maksimal" : `Target Berikutnya: ${nextTierThreshold} Poin`}</span>
          </div>
        </div>
      </motion.div>

      {/* Riau Darling Key Actions */}
      <motion.div 
        variants={itemVariants}
        className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm border border-emerald-900 flex flex-col justify-between"
      >
        <div>
          <span className="px-2.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-emerald-800 text-emerald-300 rounded-full inline-block mb-3">
            Kearifan Lokal Riau
          </span>
          <h3 className="text-lg font-bold text-emerald-100 mb-2">4 Pilar Riau Darling</h3>
          <p className="text-emerald-300/80 text-xs mb-4 leading-relaxed">
            Menghidupkan komitmen ramah lingkungan dengan mengadopsi budaya pelestarian Melayu Riau.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-emerald-900 rounded-md text-amber-400 mt-0.5">
                <Recycle className="h-3.5 w-3.5" />
              </div>
              <div>
                <strong className="text-emerald-200 font-semibold block">Sakti & Nadine Paperless</strong>
                <span className="text-emerald-300/70 block">Digitalisasi penuh naskah dinas dan pencairan dana APBN.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-emerald-900 rounded-md text-amber-400 mt-0.5">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <div>
                <strong className="text-emerald-200 font-semibold block">Hemat Energi Lancang Kuning</strong>
                <span className="text-emerald-300/70 block">Suhu AC stabil 24°C - 25°C & shutdown monitor di akhir hari.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 bg-emerald-900 rounded-md text-amber-400 mt-0.5">
                <FlameKindling className="h-3.5 w-3.5" />
              </div>
              <div>
                <strong className="text-emerald-200 font-semibold block">Cegah Karhutla & Jaga Gambut</strong>
                <span className="text-emerald-300/70 block">Tidak membakar sampah dan peduli terhadap pelestarian gambut Riau.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-3 mt-4 text-[11px] italic text-emerald-300/70 flex items-center gap-1">
          <span>“Lancang Kuning belayar malam, mari bersama menjaga alam.”</span>
        </div>
      </motion.div>
    </motion.div>

    {/* 🌟 New Campaign Banner displaying the requested Tree Planting / Sapling Image */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-6 sm:p-8"
      id="tree-planting-campaign-banner"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Image Container representing the requested image */}
        <div className="md:col-span-5 relative group overflow-hidden rounded-2xl shadow-md border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
            alt="Aksi Penanaman Pohon Riau Darling" 
            className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Absolute overlay elements for high polish */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-amber-400 text-emerald-950 rounded-full inline-block mb-1 shadow-sm">
              Aksi Nyata
            </span>
            <p className="text-xs font-semibold text-slate-100 font-mono flex items-center gap-1">
              <Leaf className="h-3 w-3 text-emerald-400" />
              Satu Pegawai, Satu Harapan Hijau
            </p>
          </div>
        </div>

        {/* Text & Campaign Details Container */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Trees className="h-5 w-5 text-emerald-600" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest font-mono">
              Kampanye Adopsi Pohon Lancang Kuning
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Menghidupkan Tradisi Melestarikan Rimba Melayu Riau
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            Sebagai wujud komitmen pelestarian ekosistem dan pengurangan emisi Gas Rumah Kaca (GRK), Kanwil DJPb Provinsi Riau menggalakkan kampanye penanaman pohon endemik. Setiap bibit yang tumbuh menyumbang kehidupan baru bagi kelestarian udara bumi Lancang Kuning.
          </p>

          {/* Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              { title: "Pohon Endemik Riau", desc: "Penanaman Pohon Sialang, Meranti & tanaman lokal penahan abrasi." },
              { title: "Dekarbonisasi Kantor", desc: "Target penyerapan hingga 22 kg CO2 per tahun untuk tiap pohon dewasa." },
              { title: "Kearifan Adat Melayu", desc: "Melindungi hutan adat sebagai warisan luhur pusaka anak cucu." },
              { title: "Sinergi Kemenkeu", desc: "Satu pegawai menanam minimal satu bibit pohon secara berkelanjutan." }
            ].map((bullet, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{bullet.title}</h4>
                  <span className="text-[11px] text-slate-500 leading-normal block mt-0.5">{bullet.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Fun Fact Badge & Bottom Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Setiap aksi penanaman menyumbang <strong className="text-emerald-700 font-bold">150 Poin</strong> pada Klasemen Riau Darling!</span>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  </div>
  );
}
