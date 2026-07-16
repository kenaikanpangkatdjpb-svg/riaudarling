import React, { useState } from "react";
import { Calculator, HelpCircle, AlertCircle, RefreshCw, Sparkles, Footprints } from "lucide-react";
import { motion } from "motion/react";

export default function GreenCalculator() {
  const [transportType, setTransportType] = useState("motor");
  const [distance, setDistance] = useState(15); // km round trip
  const [paperPages, setPaperPages] = useState(10); // pages printed/day
  const [bottlesPerWeek, setBottlesPerWeek] = useState(5); // plastic bottles
  const [acHours, setAcHours] = useState(6); // hours AC active in office/day

  // Monthly emission calculations (based on 20 working days/month)
  const calculateEmissions = () => {
    // 1. Transport emissions: km/day * 20 days * transport co2 factor (kg/km)
    // Factors: mobil = 0.20, motor = 0.10, ojol = 0.08, bus = 0.04, sepeda/jalan = 0
    let transportFactor = 0.10;
    if (transportType === "mobil") transportFactor = 0.20;
    if (transportType === "ojol") transportFactor = 0.08;
    if (transportType === "bus") transportFactor = 0.04;
    if (transportType === "sepeda") transportFactor = 0;

    const transportEmissions = distance * 20 * transportFactor;

    // 2. Paper emissions: pages/day * 20 days * 0.015 (15g per page)
    const paperEmissions = paperPages * 20 * 0.015;

    // 3. Plastic bottles emissions: bottles/week * 4 weeks * 0.12 (120g per PET bottle)
    const plasticEmissions = bottlesPerWeek * 4 * 0.12;

    // 4. AC emissions: hours/day * 20 days * 0.65 (650g CO2 per hour for standard 1PK AC)
    const acEmissions = acHours * 20 * 0.65;

    const totalEmissions = transportEmissions + paperEmissions + plasticEmissions + acEmissions;

    return {
      total: totalEmissions,
      transport: transportEmissions,
      paper: paperEmissions,
      plastic: plasticEmissions,
      ac: acEmissions
    };
  };

  const emissions = calculateEmissions();
  const avgPekanbaruWorker = 180; // kg CO2/month average typical office worker
  const isLowerThanAverage = emissions.total < avgPekanbaruWorker;
  const savingPct = Math.max(0, Math.min(100, ((avgPekanbaruWorker - emissions.total) / avgPekanbaruWorker) * 100));

  // Determine feedback text
  let scoreLevel = "Sedang";
  let scoreColor = "text-amber-600 bg-amber-50 border-amber-200";
  let feedbackMessage = "Jejak karbon Anda tergolong sedang. Cobalah beralih ke administrasi paperless dan membawa tumbler sendiri.";

  if (emissions.total <= 90) {
    scoreLevel = "Sangat Rendah (Super Green!)";
    scoreColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
    feedbackMessage = "Luar biasa, Tuan & Puan! Anda adalah pendekar hijau Riau Darling sejati. Gaya hidup Anda sangat ramah lingkungan.";
  } else if (emissions.total <= 140) {
    scoreLevel = "Rendah (Ramah Lingkungan)";
    scoreColor = "text-green-700 bg-green-50 border-green-200";
    feedbackMessage = "Bagus sekali! Jejak karbon Anda di bawah rata-rata pegawai perkantoran Pekanbaru. Pertahankan aksi hijau Anda.";
  } else if (emissions.total > 220) {
    scoreLevel = "Tinggi (Butuh Aksi Nyata)";
    scoreColor = "text-red-700 bg-red-50 border-red-200";
    feedbackMessage = "Jejak karbon Anda cukup tinggi. Sangat direkomendasikan menghemat listrik AC, mengoptimalkan Nadine paperless, dan mengurangi botol kemasan plastik.";
  }

  const resetFields = () => {
    setTransportType("motor");
    setDistance(15);
    setPaperPages(10);
    setBottlesPerWeek(5);
    setAcHours(6);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100" id="green-calculator">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Kalkulator Jejak Karbon Pegawai</h3>
            <p className="text-slate-500 text-xs">Ukur perkiraan emisi CO₂ bulanan dari aktivitas kerja Anda.</p>
          </div>
        </div>
        <button 
          onClick={resetFields}
          className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Reset Input"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Transport Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              1. Transportasi ke Kantor Kanwil
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: "mobil", label: "Mobil", desc: "Bensin/Diesel" },
                { id: "motor", label: "Motor", desc: "Bensin" },
                { id: "ojol", label: "Ojol / Ride", desc: "Roda Dua" },
                { id: "bus", label: "TMP Bus", desc: "Trans Metro" },
                { id: "sepeda", label: "Sepeda / Kaki", desc: "Bebas Emisi" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTransportType(item.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    transportType === item.id
                      ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-xs">{item.label}</span>
                  <span className="text-[9px] text-slate-400 font-normal">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Commute Distance */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                2. Jarak Perjalanan Bolak-Balik (Commute)
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {distance} KM / hari
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Dekat (0 km)</span>
              <span>Sedang (20 km)</span>
              <span>Jauh (&gt;60 km)</span>
            </div>
          </div>

          {/* 3. Printing Paper Pages */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                3. Rata-rata Lembar Kertas Dicetak (Print)
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {paperPages} Lembar / hari
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={paperPages}
              onChange={(e) => setPaperPages(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Paperless Sempurna (0)</span>
              <span>Sedang (30)</span>
              <span>Sangat Banyak (100+)</span>
            </div>
          </div>

          {/* 4. Plastic Bottles */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                4. Pembelian Botol Plastik Sekali Pakai
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {bottlesPerWeek} Botol / minggu
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={bottlesPerWeek}
              onChange={(e) => setBottlesPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Membawa Tumbler (0)</span>
              <span>Sedang (8)</span>
              <span>Ketergantungan (25+)</span>
            </div>
          </div>

          {/* 5. AC Active Hours */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                5. Durasi AC Menyala di Ruangan Kerja Anda
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {acHours} Jam / hari kerja
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={acHours}
              onChange={(e) => setAcHours(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Hemat/Mati (0)</span>
              <span>Jam Kantor Normal (8)</span>
              <span>Lembur Terus (12)</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-1.5">
              <Footprints className="h-4 w-4 text-emerald-600" />
              Estimasi Jejak Karbon Anda
            </h4>

            {/* BIG EMISSIONS NUMBER */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 text-center shadow-sm mb-4">
              <span className="text-xs text-slate-400 block mb-1">Emisi Karbon Bulanan Anda</span>
              <span className="text-4xl font-mono font-black text-emerald-600">{emissions.total.toFixed(1)}</span>
              <span className="text-xs font-bold text-slate-500 ml-1">kg CO₂ / Bulan</span>
            </div>

            {/* Score Badge */}
            <div className={`p-3 rounded-xl border text-xs text-center font-medium mb-4 ${scoreColor}`}>
              <span className="font-bold block mb-0.5">Klasifikasi: {scoreLevel}</span>
              {feedbackMessage}
            </div>

            {/* Emission Breakdown List */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Rincian Sumber Emisi:</span>
              {[
                { label: "Transportasi", val: emissions.transport, percent: emissions.total > 0 ? (emissions.transport / emissions.total) * 100 : 0, color: "bg-blue-500" },
                { label: "Pencetakan Kertas", val: emissions.paper, percent: emissions.total > 0 ? (emissions.paper / emissions.total) * 100 : 0, color: "bg-indigo-500" },
                { label: "Konsumsi Botol Plastik", val: emissions.plastic, percent: emissions.total > 0 ? (emissions.plastic / emissions.total) * 100 : 0, color: "bg-amber-500" },
                { label: "Penggunaan AC Kantor", val: emissions.ac, percent: emissions.total > 0 ? (emissions.ac / emissions.total) * 100 : 0, color: "bg-teal-500" }
              ].map((em) => (
                <div key={em.label} className="text-xs">
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>{em.label}</span>
                    <span className="font-mono font-semibold">{em.val.toFixed(1)} kg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div className={`${em.color} h-1 rounded-full`} style={{ width: `${em.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison to average */}
          <div className="pt-3 border-t border-slate-200 mt-4">
            <div className="flex items-start gap-2 text-xs">
              <AlertCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                {isLowerThanAverage ? (
                  <p className="text-slate-600">
                    Keren! Emisi Anda <strong className="text-emerald-700 font-semibold">{savingPct.toFixed(0)}% lebih rendah</strong> dibanding rata-rata pekerja kantor Pekanbaru ({avgPekanbaruWorker} kg CO₂).
                  </p>
                ) : (
                  <p className="text-slate-600">
                    Emisi Anda <strong className="text-red-700 font-semibold">di atas rata-rata</strong> pekerja kantor Pekanbaru ({avgPekanbaruWorker} kg CO₂). Mulailah mengurangi kertas dan menghemat AC untuk perbaikan!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
