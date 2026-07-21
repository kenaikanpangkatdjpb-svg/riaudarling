import React, { useState } from "react";
import { 
  GreenActionTemplate, 
  QuizQuestion, 
  LoggedAction, 
  ActionCategory 
} from "../types";
import { 
  Lock, 
  Unlock, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  RefreshCw, 
  Database, 
  PlusCircle, 
  Award, 
  Leaf, 
  AlertTriangle,
  BookOpen,
  FileText,
  Megaphone,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminPanelProps {
  loggedActions: LoggedAction[];
  actionTemplates: GreenActionTemplate[];
  quizQuestions: QuizQuestion[];
  onUpdateTemplates: (newTemplates: GreenActionTemplate[]) => void;
  onUpdateQuizzes: (newQuizzes: QuizQuestion[]) => void;
  onUpdateActions: (newActions: LoggedAction[]) => void;
  onResetAllData: () => void;
  // Dynamic settings persistence
  announcements: string[];
  onUpdateAnnouncements: (newAnnouncements: string[]) => void;
  heroSlides: { title: string; subtitle: string; buttonText: string }[];
  onUpdateHeroSlides: (newSlides: { title: string; subtitle: string; buttonText: string }[]) => void;
  firebaseConnected: boolean;
  onLogout?: () => void;
}

export default function AdminPanel({
  loggedActions,
  actionTemplates,
  quizQuestions,
  onUpdateTemplates,
  onUpdateQuizzes,
  onUpdateActions,
  onResetAllData,
  announcements,
  onUpdateAnnouncements,
  heroSlides,
  onUpdateHeroSlides,
  firebaseConnected,
  onLogout
}: AdminPanelProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Sub-tab navigation
  const [activeSubTab, setActiveSubTab] = useState<"templates" | "quizzes" | "logs" | "settings">("templates");

  // Feedback notifications
  const [successMsg, setSuccessMsg] = useState("");

  // Form states - Action Template
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    id: "",
    name: "",
    category: "paperless" as ActionCategory,
    co2Saved: 0.25,
    plasticSaved: 0,
    points: 20,
    description: "",
    iconName: "FileText"
  });

  // Form states - Quiz Question
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);
  const [quizForm, setQuizForm] = useState({
    id: 0,
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    explanation: "",
    points: 10
  });

  // Form states - Log Action manually
  const [logForm, setLogForm] = useState({
    employeeName: "",
    actionId: actionTemplates[0]?.id || "",
    notes: ""
  });

  // Form states - Announcement/Marquee settings
  const [newAnnouncementText, setNewAnnouncementText] = useState("");

  // Form states - Hero Slides editor
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [slideEditTitle, setSlideEditTitle] = useState(heroSlides[0]?.title || "");
  const [slideEditSubtitle, setSlideEditSubtitle] = useState(heroSlides[0]?.subtitle || "");

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "admin123" || pinInput === "adminriau") {
      setIsAuthenticated(true);
      setAuthError("");
      setPinInput("");
      triggerSuccess("Login Administrator Berhasil!");
    } else {
      setAuthError("Kode PIN salah. Silakan hubungi Bidang SKKI Kanwil DJPb Riau.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput("");
    if (onLogout) onLogout();
  };

  // --- ACTION TEMPLATE CRUD ---
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateForm.name || !templateForm.description) return;

    if (editingTemplateId) {
      // Edit mode
      const updated = actionTemplates.map(t => 
        t.id === editingTemplateId ? { ...t, ...templateForm } : t
      );
      onUpdateTemplates(updated);
      triggerSuccess("Templat Aksi berhasil diperbarui!");
      setEditingTemplateId(null);
    } else {
      // Create mode
      const newId = "act-" + Date.now();
      const newTemplate: GreenActionTemplate = {
        ...templateForm,
        id: newId
      };
      onUpdateTemplates([...actionTemplates, newTemplate]);
      triggerSuccess("Templat Aksi baru berhasil ditambahkan!");
    }

    // Reset template form
    setTemplateForm({
      id: "",
      name: "",
      category: "paperless",
      co2Saved: 0.2,
      plasticSaved: 0,
      points: 20,
      description: "",
      iconName: "FileText"
    });
  };

  const startEditTemplate = (tmpl: GreenActionTemplate) => {
    setEditingTemplateId(tmpl.id);
    setTemplateForm({
      id: tmpl.id,
      name: tmpl.name,
      category: tmpl.category,
      co2Saved: tmpl.co2Saved,
      plasticSaved: tmpl.plasticSaved,
      points: tmpl.points,
      description: tmpl.description,
      iconName: tmpl.iconName
    });
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Apakah Tuan & Puan yakin ingin menghapus templat aksi hijau ini?")) {
      const filtered = actionTemplates.filter(t => t.id !== id);
      onUpdateTemplates(filtered);
      triggerSuccess("Templat aksi berhasil dihapus.");
    }
  };

  // --- QUIZ QUESTIONS CRUD ---
  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizForm.question || quizForm.options.some(opt => !opt)) return;

    if (editingQuizId !== null) {
      const updated = quizQuestions.map(q => 
        q.id === editingQuizId ? { ...q, ...quizForm } : q
      );
      onUpdateQuizzes(updated);
      triggerSuccess("Pertanyaan kuis berhasil diperbarui!");
      setEditingQuizId(null);
    } else {
      const newId = quizQuestions.length > 0 ? Math.max(...quizQuestions.map(q => q.id)) + 1 : 1;
      const newQuiz: QuizQuestion = {
        ...quizForm,
        id: newId
      };
      onUpdateQuizzes([...quizQuestions, newQuiz]);
      triggerSuccess("Pertanyaan kuis baru berhasil ditambahkan!");
    }

    // Reset quiz form
    setQuizForm({
      id: 0,
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      explanation: "",
      points: 10
    });
  };

  const startEditQuiz = (q: QuizQuestion) => {
    setEditingQuizId(q.id);
    setQuizForm({
      id: q.id,
      question: q.question,
      options: [...q.options],
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      points: q.points
    });
  };

  const handleDeleteQuiz = (id: number) => {
    if (confirm("Apakah Tuan & Puan yakin ingin menghapus pertanyaan kuis ini?")) {
      const filtered = quizQuestions.filter(q => q.id !== id);
      onUpdateQuizzes(filtered);
      triggerSuccess("Pertanyaan kuis berhasil dihapus.");
    }
  };

  // --- LOGGED ACTION CONTROL ---
  const handleAddManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logForm.employeeName || !logForm.actionId) return;

    const selectedTmpl = actionTemplates.find(t => t.id === logForm.actionId);
    if (!selectedTmpl) return;

    const newLog: LoggedAction = {
      id: "log-" + Date.now(),
      employeeName: logForm.employeeName,
      actionId: selectedTmpl.id,
      actionName: selectedTmpl.name,
      category: selectedTmpl.category,
      co2Saved: selectedTmpl.co2Saved,
      plasticSaved: selectedTmpl.plasticSaved,
      points: selectedTmpl.points,
      date: new Date().toISOString(),
      notes: logForm.notes.trim() || undefined
    };

    onUpdateActions([...loggedActions, newLog]);
    triggerSuccess(`Berhasil mencatatkan aksi manual untuk ${logForm.employeeName}!`);
    setLogForm({
      employeeName: "",
      actionId: actionTemplates[0]?.id || "",
      notes: ""
    });
  };

  const handleDeleteLog = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus riwayat laporan ini dari database?")) {
      const filtered = loggedActions.filter(act => act.id !== id);
      onUpdateActions(filtered);
      triggerSuccess("Laporan berhasil dihapus.");
    }
  };

  // --- ANNOUNCEMENTS EDITOR ---
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementText.trim()) return;
    const updated = [...announcements, newAnnouncementText.trim()];
    onUpdateAnnouncements(updated);
    setNewAnnouncementText("");
    triggerSuccess("Pengumuman teks berjalan berhasil ditambahkan!");
  };

  const handleDeleteAnnouncement = (index: number) => {
    const updated = announcements.filter((_, idx) => idx !== index);
    onUpdateAnnouncements(updated);
    triggerSuccess("Pengumuman berhasil dihapus.");
  };

  // --- SLIDE CONTENT EDITOR ---
  const handleSaveSlideEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = heroSlides.map((slide, idx) => {
      if (idx === selectedSlideIndex) {
        return {
          ...slide,
          title: slideEditTitle,
          subtitle: slideEditSubtitle
        };
      }
      return slide;
    });
    onUpdateHeroSlides(updated);
    triggerSuccess(`Slide 0${selectedSlideIndex + 1} berhasil diperbarui!`);
  };

  const loadSlideToEdit = (idx: number) => {
    setSelectedSlideIndex(idx);
    setSlideEditTitle(heroSlides[idx]?.title || "");
    setSlideEditSubtitle(heroSlides[idx]?.subtitle || "");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden" id="admin-panel-section">
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-800 text-amber-400">
            <Settings className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-md sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>Panel Kontrol Administrator Riau Darling</span>
              <span className="text-[10px] bg-red-500 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest">
                Internal Only
              </span>
            </h3>
            <p className="text-slate-300 text-xs font-medium">Lakukan pembaruan website, kelola aksi, kuis, dan teks pengumuman dinamis.</p>
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* SUCCESS ALERTS OVERLAY */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-500 text-white font-bold text-xs text-center py-2.5 px-4 flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4 stroke-[3px]" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAuthenticated ? (
        /* LOGIN GATES */
        <div className="p-8 sm:p-12 text-center max-w-md mx-auto">
          <div className="h-14 w-14 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <Lock className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">Autentikasi Administrator</h4>
          <p className="text-slate-500 text-xs mb-6 leading-relaxed">
            Silakan masukkan kode PIN keamanan untuk melakukan pembaruan konten website secara instan dan aman.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan Kode PIN Keamanan (admin123)"
                className="w-full text-center text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs text-left font-semibold flex items-start gap-2 border border-red-100">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Unlock className="h-4 w-4" />
              <span>Verifikasi Akses Admin</span>
            </button>
          </form>

          <p className="text-[10px] text-slate-400 mt-6 italic">
            *Default PIN Demo: <strong className="font-mono text-slate-500 bg-slate-50 px-1 py-0.5 rounded border border-slate-100">admin123</strong>
          </p>
        </div>
      ) : (
        /* LOGGED IN - MAIN PANEL CONTROLS */
        <div className="p-6">
          
          {/* TAB BAR */}
          <div className="flex border-b border-slate-200 mb-6 gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "templates", label: "Pilar Aksi Hijau", icon: Leaf },
              { id: "quizzes", label: "Pertanyaan Kuis", icon: Award },
              { id: "logs", label: "Manajemen Log Pegawai", icon: Database },
              { id: "settings", label: "Tulisan Berjalan & Slide", icon: Megaphone }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                    activeSubTab === tab.id
                      ? "bg-emerald-750 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CONTENT VIEW */}
          {activeSubTab === "templates" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Add/Edit */}
                <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                    <PlusCircle className="h-4.5 w-4.5 text-emerald-700" />
                    <span>{editingTemplateId ? "Ubah Templat Aksi" : "Tambah Templat Aksi Baru"}</span>
                  </h4>

                  <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Nama Aksi Hijau</label>
                      <input
                        type="text"
                        required
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                        placeholder="Contoh: Penggunaan Sepeda Motor Listrik"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Kategori</label>
                        <select
                          value={templateForm.category}
                          onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value as ActionCategory })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="paperless">Paperless</option>
                          <option value="energy">Hemat Energi</option>
                          <option value="plastic">Zero Plastik</option>
                          <option value="waste">Kelola Sampah</option>
                          <option value="other">Umum / Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Poin Diberikan</label>
                        <input
                          type="number"
                          required
                          min={5}
                          max={200}
                          value={templateForm.points}
                          onChange={(e) => setTemplateForm({ ...templateForm, points: Number(e.target.value) })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Reduksi CO₂ (kg)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          min={0}
                          value={templateForm.co2Saved}
                          onChange={(e) => setTemplateForm({ ...templateForm, co2Saved: Number(e.target.value) })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Reduksi Botol Plastik (pcs)</label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={templateForm.plasticSaved}
                          onChange={(e) => setTemplateForm({ ...templateForm, plasticSaved: Number(e.target.value) })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Ikon Lucide</label>
                      <select
                        value={templateForm.iconName}
                        onChange={(e) => setTemplateForm({ ...templateForm, iconName: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                      >
                        <option value="FileText">FileText (Nadine/Kertas)</option>
                        <option value="Cpu">Cpu (SAKTI/Sistem)</option>
                        <option value="CupSoda">CupSoda (Tumbler/Gelas)</option>
                        <option value="Utensils">Utensils (Wadah Makan)</option>
                        <option value="Thermometer">Thermometer (Suhu AC)</option>
                        <option value="Power">Power (Elektronik Mati)</option>
                        <option value="Trash2">Trash2 (Pilah Sampah)</option>
                        <option value="Car">Car (Carpooling/Bus)</option>
                        <option value="Leaf">Leaf (Daun/Sadar Lingkungan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Deskripsi Ringkas</label>
                      <textarea
                        rows={2}
                        required
                        value={templateForm.description}
                        onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                        placeholder="Deskripsikan cara pegawai melakukan aksi hijau ini..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white resize-none"
                      />
                    </div>

                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all"
                      >
                        {editingTemplateId ? "Simpan Perubahan" : "Tambahkan Templat"}
                      </button>
                      {editingTemplateId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTemplateId(null);
                            setTemplateForm({
                              id: "",
                              name: "",
                              category: "paperless",
                              co2Saved: 0.25,
                              plasticSaved: 0,
                              points: 20,
                              description: "",
                              iconName: "FileText"
                            });
                          }}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-all"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Templates List */}
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4">
                    Templat Aksi Aktif ({actionTemplates.length})
                  </h4>

                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {actionTemplates.map((tmpl) => (
                      <div 
                        key={tmpl.id} 
                        className="p-3 bg-white border border-slate-100 rounded-xl shadow-inner-sm flex items-start justify-between gap-3 text-xs hover:border-slate-200 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{tmpl.name}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">
                              {tmpl.category}
                            </span>
                          </div>
                          <p className="text-slate-500 italic text-[11px]">"{tmpl.description}"</p>
                          <div className="flex gap-4 font-mono text-[10px] font-bold text-emerald-800">
                            <span>🍃 CO₂: -{tmpl.co2Saved} kg</span>
                            <span>🥤 Plastik: -{tmpl.plasticSaved} pcs</span>
                            <span className="text-amber-700">⭐ +{tmpl.points} Poin</span>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          <button
                            onClick={() => startEditTemplate(tmpl)}
                            className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all"
                            title="Edit Templat"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(tmpl.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                            title="Hapus Templat"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeSubTab === "quizzes" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Quiz */}
                <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                    <Award className="h-4.5 w-4.5 text-emerald-700" />
                    <span>{editingQuizId !== null ? "Ubah Pertanyaan Kuis" : "Tambah Pertanyaan Kuis Baru"}</span>
                  </h4>

                  <form onSubmit={handleSaveQuiz} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Pertanyaan</label>
                      <textarea
                        rows={2}
                        required
                        value={quizForm.question}
                        onChange={(e) => setQuizForm({ ...quizForm, question: e.target.value })}
                        placeholder="Contoh: Apa nama sungai terpanjang kedua di Riau?"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-semibold text-slate-600">Pilihan Jawaban (Isi Semua)</label>
                      {quizForm.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-mono text-slate-400">0{idx + 1}</span>
                          <input
                            type="text"
                            required
                            value={opt}
                            onChange={(e) => {
                              const nextOpts = [...quizForm.options];
                              nextOpts[idx] = e.target.value;
                              setQuizForm({ ...quizForm, options: nextOpts });
                            }}
                            placeholder={`Pilihan Jawaban Ke-${idx + 1}`}
                            className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Indeks Jawaban Benar</label>
                        <select
                          value={quizForm.correctIndex}
                          onChange={(e) => setQuizForm({ ...quizForm, correctIndex: Number(e.target.value) })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value={0}>Pilihan 01 (Benar)</option>
                          <option value={1}>Pilihan 02 (Benar)</option>
                          <option value={2}>Pilihan 03 (Benar)</option>
                          <option value={3}>Pilihan 04 (Benar)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Nilai Poin Pertanyaan</label>
                        <input
                          type="number"
                          required
                          min={5}
                          max={50}
                          value={quizForm.points}
                          onChange={(e) => setQuizForm({ ...quizForm, points: Number(e.target.value) })}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Penjelasan Edukatif (Setelah Kunci Terjawab)</label>
                      <textarea
                        rows={3}
                        required
                        value={quizForm.explanation}
                        onChange={(e) => setQuizForm({ ...quizForm, explanation: e.target.value })}
                        placeholder="Berikan info edukatif atau konteks adat pelestarian di balik jawaban ini..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white resize-none"
                      />
                    </div>

                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all"
                      >
                        {editingQuizId !== null ? "Simpan Perubahan" : "Tambahkan Pertanyaan"}
                      </button>
                      {editingQuizId !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingQuizId(null);
                            setQuizForm({
                              id: 0,
                              question: "",
                              options: ["", "", "", ""],
                              correctIndex: 0,
                              explanation: "",
                              points: 10
                            });
                          }}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-all"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Quizzes List */}
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4">
                    Kumpulan Soal Kuis Aktif ({quizQuestions.length})
                  </h4>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {quizQuestions.map((q, idx) => (
                      <div 
                        key={q.id} 
                        className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col gap-2 text-xs"
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-slate-800 leading-tight">
                            {idx + 1}. {q.question}
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => startEditQuiz(q)}
                              className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all"
                              title="Edit Soal"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuiz(q.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                              title="Hapus Soal"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] pl-1 font-sans">
                          {q.options.map((opt, oIdx) => (
                            <span 
                              key={oIdx} 
                              className={`p-1 rounded ${
                                oIdx === q.correctIndex 
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold" 
                                  : "bg-slate-50 text-slate-500"
                              }`}
                            >
                              {oIdx + 1}. {opt}
                            </span>
                          ))}
                        </div>

                        <div className="bg-slate-50/50 p-2.5 rounded-lg text-[10px] text-slate-500 italic leading-normal border-l-2 border-emerald-600">
                          <strong>Edukasi:</strong> {q.explanation} (⭐ {q.points} Pts)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeSubTab === "logs" && (
            <div className="space-y-6">
              
              {/* Reset to Default Action Card */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-amber-900">Reset Semua Laporan Aksi</h5>
                    <p className="text-amber-700 text-[11px] leading-tight">
                      Membersihkan semua riwayat laporan aksi yang tercatat dan mengembalikannya ke data simulasi bawaan (seed data).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Apakah Tuan & Puan di Kanwil DJPb Riau yakin ingin me-reset seluruh log laporan aksi kembali ke default? Semua laporan kustom baru akan hilang!")) {
                      onResetAllData();
                      triggerSuccess("Penyimpanan lokal & Cloud di-reset penuh ke Seed Data!");
                    }
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 self-stretch sm:self-center justify-center shadow-sm"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset Data Default</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                
                {/* Manual Log Logger */}
                <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
                    <Plus className="h-4.5 w-4.5 text-emerald-700" />
                    <span>Catatkan Aksi Pegawai (Manual Admin)</span>
                  </h4>

                  <form onSubmit={handleAddManualLog} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Nama Pegawai & Seksi/Bidang</label>
                      <input
                        type="text"
                        required
                        value={logForm.employeeName}
                        onChange={(e) => setLogForm({ ...logForm, employeeName: e.target.value })}
                        placeholder="Contoh: Rian (Kasi Verifikasi PAPK)"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Jenis Aksi yang Dilakukan</label>
                      <select
                        value={logForm.actionId}
                        onChange={(e) => setLogForm({ ...logForm, actionId: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      >
                        {actionTemplates.map(t => (
                          <option key={t.id} value={t.id}>{t.name} (+{t.points} Pts)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Catatan Khusus Admin</label>
                      <input
                        type="text"
                        value={logForm.notes}
                        onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                        placeholder="Contoh: Memilah kardus bekas pemilu di gedung arsip..."
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Input Laporan Manual</span>
                    </button>
                  </form>
                </div>

                {/* Logged Actions History Control */}
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4">
                    Daftar Log Laporan Terdaftar ({loggedActions.length})
                  </h4>

                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {loggedActions.length === 0 ? (
                      <p className="text-slate-400 text-center py-8 text-xs font-medium">Belum ada riwayat laporan terdaftar.</p>
                    ) : (
                      [...loggedActions].reverse().map((act) => (
                        <div 
                          key={act.id} 
                          className="p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">{act.employeeName}</span>
                              <span className="text-[9px] bg-slate-50 border border-slate-200 text-slate-500 px-1.5 py-0.2 rounded font-semibold uppercase">
                                {act.category}
                              </span>
                            </div>
                            <span className="text-slate-600 font-medium block mt-0.5">{act.actionName}</span>
                            {act.notes && <span className="text-[10px] text-slate-400 block italic">"{act.notes}"</span>}
                            <div className="flex gap-3 text-[9px] font-mono font-bold text-emerald-800 mt-1">
                              <span>🍃 -{act.co2Saved.toFixed(2)} kg CO₂</span>
                              <span>⭐ +{act.points} Pts</span>
                              <span className="text-slate-400 font-normal">{new Date(act.date).toLocaleDateString("id-ID")}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteLog(act.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                            title="Hapus Log"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeSubTab === "settings" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
                
                {/* Announcement Ticker Settings */}
                <div className="lg:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Megaphone className="h-4.5 w-4.5 text-emerald-700" />
                    <span>Papan Pengumuman Berjalan (Marquee)</span>
                  </h4>

                  <p className="text-slate-500 leading-normal text-[11px]">
                    Tambahkan atau edit kalimat-kalimat pengumuman yang berjalan dinamis pada spanduk atas halaman depan.
                  </p>

                  <form onSubmit={handleAddAnnouncement} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newAnnouncementText}
                      onChange={(e) => setNewAnnouncementText(e.target.value)}
                      placeholder="Contoh: 🏆 Klasemen Triwulan I ditutup pada tanggal 31 Juli..."
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Tambah</span>
                    </button>
                  </form>

                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 pt-2">
                    {announcements.map((text, idx) => (
                      <div 
                        key={idx} 
                        className="p-2 bg-white rounded-lg border border-slate-100/85 flex items-center justify-between gap-3 text-[11px]"
                      >
                        <span className="text-slate-700 font-medium leading-normal">{text}</span>
                        <button
                          onClick={() => handleDeleteAnnouncement(idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                          title="Hapus"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Slides Editor */}
                <div className="lg:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="h-4.5 w-4.5 text-emerald-700" />
                    <span>Editor Slide Utama (Hero Banner Slides)</span>
                  </h4>

                  <p className="text-slate-500 leading-normal text-[11px]">
                    Sesuaikan judul dan sub-deskripsi kampanye utama yang dimuat di dalam slider depan.
                  </p>

                  <div className="flex gap-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadSlideToEdit(idx)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all border ${
                          selectedSlideIndex === idx
                            ? "bg-emerald-700 text-white border-emerald-800"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Slide 0{idx + 1}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSaveSlideEdit} className="space-y-3.5 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Judul Utama Slide</label>
                      <textarea
                        rows={2}
                        required
                        value={slideEditTitle}
                        onChange={(e) => setSlideEditTitle(e.target.value)}
                        placeholder="Ubah judul kampanye slide..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white resize-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 mb-1">Deskripsi / Sub-judul</label>
                      <textarea
                        rows={3}
                        required
                        value={slideEditSubtitle}
                        onChange={(e) => setSlideEditSubtitle(e.target.value)}
                        placeholder="Ubah deskripsi detail kampanye slide..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white resize-none text-slate-600 leading-normal"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Check className="h-4 w-4" />
                      <span>Simpan Konten Slide 0{selectedSlideIndex + 1}</span>
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
