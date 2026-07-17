import React, { useState, useEffect } from "react";
import { Leaf, Calendar, ShieldCheck, MapPin } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " WIB";
  };

  return (
    <header className="relative bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/50 mb-8" id="app-header">
      {/* Traditional Malay Ornament inspired accent line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-emerald-800/60 rounded-2xl border border-emerald-600/30 flex items-center justify-center glow-green">
            <Leaf className="h-10 w-10 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-amber-400 text-emerald-950 rounded-full">
                Green Treasury Riau
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-300/90 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Riau Darling Campaign
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Riau Sadar Lingkungan <span className="text-amber-300">DJPb</span>
            </h1>
            <p className="text-emerald-200/85 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Kantor Wilayah Direktorat Jenderal Perbendaharaan Provinsi Riau
            </p>
            <div className="flex items-center gap-2 mt-3 text-emerald-300/80 text-xs">
              <MapPin className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
              <span>Jl. Jend. Sudirman No. 249, Pekanbaru</span>
            </div>
          </div>
        </div>

        {/* Live Date and Time */}
        <div className="flex flex-col md:items-end bg-emerald-900/40 backdrop-blur-md p-4 rounded-2xl border border-emerald-700/30 min-w-[200px]">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-1">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span>Waktu Server Riau</span>
          </div>
          <span className="text-sm font-medium text-emerald-100">{formatDate(time)}</span>
          <span className="text-xl font-mono font-bold text-amber-300 mt-1 tracking-wider">{formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
}
