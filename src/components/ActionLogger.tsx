import React, { useState, useMemo } from "react";
import { LoggedAction, GreenActionTemplate, ActionCategory, LeaderboardEntry } from "../types";
import { GREEN_ACTION_TEMPLATES } from "../data";
import { PlusCircle, Award, Trophy, Users, CheckCircle, FileText, Cpu, CupSoda, Utensils, Thermometer, Power, Trash2, Car, HelpCircle, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ActionLoggerProps {
  loggedActions: LoggedAction[];
  onAddAction: (employeeName: string, actionId: string, notes?: string) => void;
}

export default function ActionLogger({ loggedActions, onAddAction }: ActionLoggerProps) {
  const [employeeName, setEmployeeName] = useState("");
  const [selectedActionId, setSelectedActionId] = useState(GREEN_ACTION_TEMPLATES[0].id);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Categories helper to map nice badges and icons
  const getCategoryBadge = (category: ActionCategory) => {
    switch (category) {
      case "paperless":
        return <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">Paperless</span>;
      case "energy":
        return <span className="bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">Hemat Energi</span>;
      case "plastic":
        return <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">Zero Plastik</span>;
      case "waste":
        return <span className="bg-teal-50 border border-teal-200 text-teal-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">Kelola Sampah</span>;
      default:
        return <span className="bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">Umum</span>;
    }
  };

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="h-4 w-4 text-indigo-600" />;
      case "Cpu":
        return <Cpu className="h-4 w-4 text-indigo-500" />;
      case "CupSoda":
        return <CupSoda className="h-4 w-4 text-emerald-600" />;
      case "Utensils":
        return <Utensils className="h-4 w-4 text-teal-600" />;
      case "Thermometer":
        return <Thermometer className="h-4 w-4 text-amber-600" />;
      case "Power":
        return <Power className="h-4 w-4 text-red-500" />;
      case "Trash2":
        return <Trash2 className="h-4 w-4 text-orange-500" />;
      case "Car":
        return <Car className="h-4 w-4 text-sky-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName.trim()) return;

    onAddAction(
      employeeName.trim(),
      selectedActionId,
      notes.trim() || undefined
    );

    // Reset notes & show feedback
    setNotes("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  // Compute leaderboard
  const leaderboard = useMemo(() => {
    const map = new Map<string, LeaderboardEntry>();

    loggedActions.forEach((act) => {
      const existing = map.get(act.employeeName) || {
        employeeName: act.employeeName,
        totalPoints: 0,
        totalCo2: 0,
        totalPlastic: 0,
        actionCount: 0,
      };

      existing.totalPoints += act.points;
      existing.totalCo2 += act.co2Saved;
      existing.totalPlastic += act.plasticSaved;
      existing.actionCount += 1;

      map.set(act.employeeName, existing);
    });

    return Array.from(map.values())
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }, [loggedActions]);

  const selectedTemplate = GREEN_ACTION_TEMPLATES.find(t => t.id === selectedActionId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8" id="action-logger-section">
      {/* Logger Form */}
      <div className="xl:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-sans">Catat Aksi Hijau Anda</h3>
              <p className="text-slate-500 text-xs">Laporkan kontribusi harian Anda di lingkungan kantor.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee Name */}
            <div>
              <label htmlFor="employeeName" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Nama Pegawai & Seksi/Bidang
              </label>
              <input
                id="employeeName"
                type="text"
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Contoh: Siti Rahma (Bidang PAPK)"
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Action Dropdown */}
            <div>
              <label htmlFor="actionId" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Aksi yang Dilakukan
              </label>
              <select
                id="actionId"
                value={selectedActionId}
                onChange={(e) => setSelectedActionId(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white transition-all cursor-pointer"
              >
                {GREEN_ACTION_TEMPLATES.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.name} (+{tmpl.points} Poin)
                  </option>
                ))}
              </select>
            </div>

            {/* Preview Selected Template Impact */}
            {selectedTemplate && (
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 text-xs space-y-2">
                <p className="text-slate-600 italic">"{selectedTemplate.description}"</p>
                <div className="flex gap-4 pt-1 font-mono text-[11px] text-emerald-800">
                  <span>🍃 CO₂: -{selectedTemplate.co2Saved.toFixed(2)} kg</span>
                  {selectedTemplate.plasticSaved > 0 && (
                    <span>🥤 Plastik: -{selectedTemplate.plasticSaved} botol</span>
                  )}
                  <span className="font-bold text-amber-700">⭐ +{selectedTemplate.points} Pts</span>
                </div>
              </div>
            )}

            {/* Optional Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Keterangan Tambahan <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Mengatur disposisi laporan semesteran"
                className="w-full text-sm px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              Kirim Laporan Aksi
            </button>
          </form>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-3 bg-emerald-500 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="h-4 w-4" />
              Laporan berhasil dikirim! Poin klasemen diperbarui.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leaderboard Panel */}
      <div className="xl:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Klasemen Pahlawan Hijau DJPb</h3>
            <p className="text-slate-500 text-xs">Pegawai dengan kontribusi lingkungan tertinggi bulan ini.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 space-y-2.5">
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">Belum ada laporan aksi. Ayo jadilah yang pertama!</div>
          ) : (
            leaderboard.map((entry, index) => {
              // Highlight ranks
              let rankStyle = "bg-slate-100 text-slate-700";
              let cardStyle = "border-slate-100 bg-white";
              let crown = null;

              if (entry.rank === 1) {
                rankStyle = "bg-amber-400 text-amber-950 font-bold";
                cardStyle = "border-amber-200 bg-amber-50/30 scale-[1.01] shadow-sm";
                crown = "👑 ";
              } else if (entry.rank === 2) {
                rankStyle = "bg-slate-300 text-slate-800 font-bold";
              } else if (entry.rank === 3) {
                rankStyle = "bg-amber-600 text-white font-bold";
              }

              return (
                <div
                  key={entry.employeeName}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${rankStyle}`}>
                      {entry.rank}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                        {crown}
                        {entry.employeeName}
                      </h4>
                      <div className="flex gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span>{entry.actionCount} kali aksi</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">{entry.totalCo2.toFixed(2)} kg CO₂</span>
                        {entry.totalPlastic > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-600 font-semibold">{entry.totalPlastic} botol</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl font-mono">
                      {entry.totalPoints} Pts
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="xl:col-span-3 bg-slate-50/50 rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-slate-200 rounded-xl text-slate-600">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 font-sans">Aktivitas Terbaru</h3>
            <p className="text-slate-500 text-[11px]">Aksi peduli lingkungan pegawai Kanwil Riau.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 pr-1">
          {loggedActions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">Belum ada aktivitas.</div>
          ) : (
            [...loggedActions].reverse().map((act) => {
              const matchingTemplate = GREEN_ACTION_TEMPLATES.find(t => t.id === act.actionId);
              const iconElement = getActionIcon(matchingTemplate?.iconName || "CheckCircle");

              return (
                <div key={act.id} className="p-3 bg-white rounded-2xl border border-slate-100/80 shadow-sm flex flex-col gap-1.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <div className="p-1 bg-slate-50 rounded-lg">
                        {iconElement}
                      </div>
                      <span className="truncate max-w-[130px] text-[11px]">{act.employeeName}</span>
                    </div>
                    {getCategoryBadge(act.category)}
                  </div>

                  <span className="text-slate-600 font-medium text-[11px] line-clamp-1">{act.actionName}</span>
                  {act.notes && (
                    <p className="text-[10px] text-slate-400 italic font-serif leading-tight bg-slate-50 p-1.5 rounded-lg">
                      "{act.notes}"
                    </p>
                  )}

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-mono border-t border-slate-50">
                    <span>🍃 {act.co2Saved.toFixed(2)} kg CO₂</span>
                    <span className="text-emerald-700 font-bold">+{act.points} Pts</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
