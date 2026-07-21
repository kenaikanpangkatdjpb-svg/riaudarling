import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import InitiativesOverview from "./components/InitiativesOverview";
import GreenCalculator from "./components/GreenCalculator";
import ActionLogger from "./components/ActionLogger";
import EcoQuiz from "./components/EcoQuiz";
import AiAssistant from "./components/AiAssistant";
import FirebaseManager from "./components/FirebaseManager";
import AdminPanel from "./components/AdminPanel";
import { LoggedAction, GreenActionTemplate, QuizQuestion } from "./types";
import { SEED_LOGGED_ACTIONS, GREEN_ACTION_TEMPLATES, INITIAL_QUIZ_QUESTIONS } from "./data";
import { isFirebaseConnected, subscribeToActions, saveActionToFirestore } from "./firebase";
import { Leaf, Trophy, Calculator, HelpCircle, Sparkles, Star, Trees, Settings, Lock, Unlock, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_ANNOUNCEMENTS = [
  "🍃 [RIAU DARLING] Gerakan Riau Sadar Lingkungan Kanwil DJPb Provinsi Riau mendukung kelestarian alam Lancang Kuning!",
  "📢 Tuan & Puan diimbau membawa Tumbler Pribadi ke ruang kerja untuk mewujudkan Zero Single-Use Plastic Bottle!",
  "💻 Hemat Energi Kantor: Matikan komputer, printer, dan pastikan AC di-shutdown penuh selepas jam pelayanan berakhir!",
  "📄 SAKTI & Nadine Digitalisasi: Hemat puluhan rim kertas secara langsung demi masa depan paru-paru bumi Indonesia!",
  "🍯 Pantun Melayu: Elok nian si lebah sialang, bersarang tinggi di ranting dahan. Mari kita menjaga alam, warisan anak cucu masa depan!"
];

const DEFAULT_SLIDES = [
  {
    title: "Satu Langkah Hijau Insan Perbendaharaan untuk Bumi Lancang Kuning",
    subtitle: "Komitmen bersama seluruh pegawai Kanwil DJPb Provinsi Riau dalam mereduksi jejak karbon perkantoran, meniadakan plastik sekali pakai, dan menjaga kelestarian alam gambut Riau yang berharga.",
    buttonText: "Mari Beraksi Sekarang"
  },
  {
    title: "Melestarikan Rimba Kepungan Sialang & Gambut Melayu Riau",
    subtitle: "Menghubungkan kearifan lokal Melayu Riau dengan inisiatif Green Office Kementerian Keuangan guna menciptakan ekosistem kerja pemerintah yang berkelanjutan dan rendah emisi.",
    buttonText: "Uji Pemahaman Anda"
  },
  {
    title: "Sinergi Kemenkeu Satu dalam Mengawal APBN Ramah Lingkungan",
    subtitle: "Melalui integrasi SAKTI, Nadine, dan DIGIPAY, kita kurangi jutaan lembar penggunaan kertas administrasi perkantoran demi mencegah penebangan pohon dan melestarikan hutan lindung.",
    buttonText: "Tanya Asisten AI"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calculator" | "quiz" | "assistant" | "admin">("dashboard");
  const [loggedActions, setLoggedActions] = useState<LoggedAction[]>([]);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Admin access control states
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("riau_darling_is_admin") === "true";
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Stateful website content
  const [actionTemplates, setActionTemplates] = useState<GreenActionTemplate[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [heroSlides, setHeroSlides] = useState<{ title: string; subtitle: string; buttonText: string }[]>([]);

  // Load and sync all stateful data
  useEffect(() => {
    // 1. Templates
    const storedTemplates = localStorage.getItem("riau_darling_templates");
    if (storedTemplates) {
      try {
        setActionTemplates(JSON.parse(storedTemplates));
      } catch (e) {
        setActionTemplates(GREEN_ACTION_TEMPLATES);
      }
    } else {
      setActionTemplates(GREEN_ACTION_TEMPLATES);
    }

    // 2. Quiz Questions
    const storedQuizzes = localStorage.getItem("riau_darling_quizzes");
    if (storedQuizzes) {
      try {
        setQuizQuestions(JSON.parse(storedQuizzes));
      } catch (e) {
        setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
      }
    } else {
      setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
    }

    // 3. Announcements/Marquees
    const storedAnnouncements = localStorage.getItem("riau_darling_announcements");
    if (storedAnnouncements) {
      try {
        setAnnouncements(JSON.parse(storedAnnouncements));
      } catch (e) {
        setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      }
    } else {
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    }

    // 4. Hero Slides
    const storedSlides = localStorage.getItem("riau_darling_slides");
    if (storedSlides) {
      try {
        setHeroSlides(JSON.parse(storedSlides));
      } catch (e) {
        setHeroSlides(DEFAULT_SLIDES);
      }
    } else {
      setHeroSlides(DEFAULT_SLIDES);
    }
  }, []);

  // Sync action logging database
  useEffect(() => {
    const isConnected = isFirebaseConnected();
    setFirebaseConnected(isConnected);

    if (isConnected) {
      console.log("Menghubungkan ke real-time stream Firebase Firestore...");
      const unsubscribe = subscribeToActions((actions) => {
        if (actions.length > 0) {
          setLoggedActions(actions);
        } else {
          setLoggedActions(SEED_LOGGED_ACTIONS);
        }
      });
      return () => unsubscribe();
    } else {
      console.log("Firebase tidak terkonfigurasi. Memuat data dari LocalStorage...");
      const stored = localStorage.getItem("riau_darling_actions");
      if (stored) {
        try {
          setLoggedActions(JSON.parse(stored));
        } catch (e) {
          setLoggedActions(SEED_LOGGED_ACTIONS);
        }
      } else {
        setLoggedActions(SEED_LOGGED_ACTIONS);
        localStorage.setItem("riau_darling_actions", JSON.stringify(SEED_LOGGED_ACTIONS));
      }
    }
  }, [refreshTrigger]);

  const handleFirebaseRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Content updaters (Admin panel actions)
  const handleUpdateTemplates = (newTemplates: GreenActionTemplate[]) => {
    setActionTemplates(newTemplates);
    localStorage.setItem("riau_darling_templates", JSON.stringify(newTemplates));
  };

  const handleUpdateQuizzes = (newQuizzes: QuizQuestion[]) => {
    setQuizQuestions(newQuizzes);
    localStorage.setItem("riau_darling_quizzes", JSON.stringify(newQuizzes));
  };

  const handleUpdateActions = (newActions: LoggedAction[]) => {
    setLoggedActions(newActions);
    localStorage.setItem("riau_darling_actions", JSON.stringify(newActions));
    // Note: In real setup, you could sync deletes/additions with Firestore too.
  };

  const handleUpdateAnnouncements = (newAnnouncements: string[]) => {
    setAnnouncements(newAnnouncements);
    localStorage.setItem("riau_darling_announcements", JSON.stringify(newAnnouncements));
  };

  const handleUpdateHeroSlides = (newSlides: { title: string; subtitle: string; buttonText: string }[]) => {
    setHeroSlides(newSlides);
    localStorage.setItem("riau_darling_slides", JSON.stringify(newSlides));
  };

  const handleResetAllData = () => {
    // Clear custom data
    localStorage.removeItem("riau_darling_templates");
    localStorage.removeItem("riau_darling_quizzes");
    localStorage.removeItem("riau_darling_actions");
    localStorage.removeItem("riau_darling_announcements");
    localStorage.removeItem("riau_darling_slides");

    // Re-seed from hardcoded source
    setActionTemplates(GREEN_ACTION_TEMPLATES);
    setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
    setLoggedActions(SEED_LOGGED_ACTIONS);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setHeroSlides(DEFAULT_SLIDES);

    localStorage.setItem("riau_darling_actions", JSON.stringify(SEED_LOGGED_ACTIONS));
    localStorage.setItem("riau_darling_templates", JSON.stringify(GREEN_ACTION_TEMPLATES));
    localStorage.setItem("riau_darling_quizzes", JSON.stringify(INITIAL_QUIZ_QUESTIONS));
    localStorage.setItem("riau_darling_announcements", JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    localStorage.setItem("riau_darling_slides", JSON.stringify(DEFAULT_SLIDES));
  };

  // Callback to add a new green action logged by employee
  const handleAddAction = async (employeeName: string, actionId: string, notes?: string) => {
    const tmpl = actionTemplates.find((t) => t.id === actionId);
    if (!tmpl) return;

    const actionToLog: LoggedAction = {
      id: "act-" + Date.now(),
      employeeName,
      actionId,
      actionName: tmpl.name,
      category: tmpl.category,
      co2Saved: tmpl.co2Saved,
      plasticSaved: tmpl.plasticSaved,
      points: tmpl.points,
      date: new Date().toISOString(),
      notes,
    };

    if (firebaseConnected) {
      const saved = await saveActionToFirestore(actionToLog);
      if (!saved) {
        const updated = [...loggedActions, actionToLog];
        setLoggedActions(updated);
        localStorage.setItem("riau_darling_actions", JSON.stringify(updated));
      }
    } else {
      const updated = [...loggedActions, actionToLog];
      setLoggedActions(updated);
      localStorage.setItem("riau_darling_actions", JSON.stringify(updated));
    }
  };

  // Callback to handle earning quiz points
  const handleEarnQuizPoints = async (points: number, reason: string) => {
    const actionToLog: LoggedAction = {
      id: "quiz-" + Date.now(),
      employeeName: "Pendekar Kuis Riau Darling",
      actionId: "quiz-bonus",
      actionName: `Menyelesaikan ${reason}`,
      category: "other",
      co2Saved: 0.1, // Symbolic Carbon saved by gaining knowledge
      plasticSaved: 0,
      points: points,
      date: new Date().toISOString(),
      notes: "Menjawab kuis sadar lingkungan secara digital",
    };

    if (firebaseConnected) {
      const saved = await saveActionToFirestore(actionToLog);
      if (!saved) {
        const updated = [...loggedActions, actionToLog];
        setLoggedActions(updated);
        localStorage.setItem("riau_darling_actions", JSON.stringify(updated));
      }
    } else {
      const updated = [...loggedActions, actionToLog];
      setLoggedActions(updated);
      localStorage.setItem("riau_darling_actions", JSON.stringify(updated));
    }
  };

  const handleVerifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "admin123" || pinInput === "adminriau") {
      setIsAdmin(true);
      sessionStorage.setItem("riau_darling_is_admin", "true");
      setIsLoginModalOpen(false);
      setPinInput("");
      setAuthError("");
      setActiveTab("admin");
    } else {
      setAuthError("Kode PIN salah. Silakan hubungi Bidang SKKI Kanwil DJPb Riau.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-6 px-4 sm:px-6 lg:px-8 font-sans green-gradient-bg" id="app-root-container">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Culturally Rich Header */}
        <Header />

        {/* Greenpeace-inspired Hero Banner with running text & images requested by user */}
        <HeroBanner 
          onStartQuiz={() => setActiveTab("quiz")} 
          onOpenAssistant={() => setActiveTab("assistant")} 
          announcements={announcements}
          heroSlides={heroSlides}
        />

        {/* Connection to Firebase Cloud Manager */}
        <FirebaseManager onConnectionChange={handleFirebaseRefresh} />

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap no-scrollbar gap-1 items-center" id="tab-navigation">
          {[
            { id: "dashboard", label: "Aksi & Klasemen", icon: Trophy },
            { id: "calculator", label: "Kalkulator Karbon", icon: Calculator },
            { id: "quiz", label: "Kuis Riau Darling", icon: HelpCircle },
            { id: "assistant", label: "Asisten AI", icon: Sparkles },
            ...(isAdmin ? [{ id: "admin", label: "Panel Admin", icon: Settings }] : []),
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-sm transition-all relative cursor-pointer ${
                  isActive
                    ? "border-emerald-700 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <IconComponent className={`h-4.5 w-4.5 ${isActive ? "text-emerald-700" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* Secure Admin Access Trigger Button */}
          {!isAdmin ? (
            <button
              onClick={() => {
                setAuthError("");
                setPinInput("");
                setIsLoginModalOpen(true);
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-xl text-xs font-bold transition-all border border-slate-200/60 active:scale-95 cursor-pointer"
              title="Akses Kontrol Admin"
              id="admin-login-trigger"
            >
              <Lock className="h-3.5 w-3.5 text-slate-400 hover:text-emerald-600" />
              <span className="hidden sm:inline">Admin Login</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsAdmin(false);
                sessionStorage.removeItem("riau_darling_is_admin");
                setActiveTab("dashboard");
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all border border-red-200/60 active:scale-95 cursor-pointer"
              title="Logout Administrator"
              id="admin-logout-trigger"
            >
              <Unlock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
          )}
        </div>

        {/* Dynamic Tab Panel Container */}
        <main className="transition-all duration-300" id="main-content-panel">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Core Overview & Green Level Stats */}
              <InitiativesOverview loggedActions={loggedActions} />

              {/* Logger & High Score Leaderboard */}
              <ActionLogger 
                loggedActions={loggedActions} 
                actionTemplates={actionTemplates}
                onAddAction={handleAddAction} 
              />
            </motion.div>
          )}

          {activeTab === "calculator" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <GreenCalculator />
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EcoQuiz 
                quizQuestions={quizQuestions}
                onEarnPoints={handleEarnQuizPoints} 
              />
            </motion.div>
          )}

          {activeTab === "assistant" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AiAssistant />
            </motion.div>
          )}

          {activeTab === "admin" && isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AdminPanel 
                loggedActions={loggedActions}
                actionTemplates={actionTemplates}
                quizQuestions={quizQuestions}
                onUpdateTemplates={handleUpdateTemplates}
                onUpdateQuizzes={handleUpdateQuizzes}
                onUpdateActions={handleUpdateActions}
                onResetAllData={handleResetAllData}
                announcements={announcements}
                onUpdateAnnouncements={handleUpdateAnnouncements}
                heroSlides={heroSlides}
                onUpdateHeroSlides={handleUpdateHeroSlides}
                firebaseConnected={firebaseConnected}
                onLogout={() => {
                  setIsAdmin(false);
                  sessionStorage.removeItem("riau_darling_is_admin");
                  setActiveTab("dashboard");
                }}
              />
            </motion.div>
          )}
        </main>

        {/* Dynamic footer detailing the DJPb Riau eco initiative */}
        <footer className="mt-16 text-center border-t border-slate-200/80 pt-8 pb-4 text-xs text-slate-400 font-sans" id="app-footer">
          <p className="flex items-center justify-center gap-1.5 font-semibold text-slate-500 mb-1">
            <Trees className="h-4 w-4 text-emerald-600" />
            <span>Gerakan Riau Darling (Sadar Lingkungan)</span>
          </p>
          <p>© 2026 Kantor Wilayah DJPb Provinsi Riau. Kemenkeu Satu, Kemenkeu Tepercaya.</p>
          <p className="mt-2 text-[10px] text-slate-400 italic">"Pelihara hutan menjaga bumi, warisan luhur adat Riau lestari."</p>
        </footer>

        {/* 🔒 Administrator Secure Login Modal */}
        <AnimatePresence>
          {isLoginModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-md w-full overflow-hidden p-6 sm:p-8 z-10"
                id="admin-auth-modal"
              >
                {/* Traditional Ornament Line Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400" />

                {/* Close Button */}
                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="text-center">
                  <div className="h-14 w-14 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Lock className="h-6 w-6 animate-pulse" />
                  </div>
                  
                  <h3 className="text-lg font-black tracking-tight text-slate-900 mb-1.5">
                    Akses Kontrol Administrator
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Hanya untuk admin. Silakan masukkan Kode PIN Keamanan untuk membuka Panel Kontrol website.
                  </p>

                  <form onSubmit={handleVerifyAdminPin} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        required
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Masukkan PIN (Default: admin123)"
                        className="w-full text-center text-sm px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono"
                        autoFocus
                      />
                    </div>

                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 text-red-700 rounded-xl text-xs text-left font-semibold flex items-start gap-2 border border-red-100"
                      >
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{authError}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-emerald-700/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Unlock className="h-4 w-4" />
                      <span>Verifikasi & Masuk</span>
                    </button>
                  </form>

                  <p className="text-[10px] text-slate-400 mt-6 italic bg-slate-50 border border-slate-100 p-2 rounded-xl">
                    *Info Demo PIN: <strong className="font-mono text-slate-600">admin123</strong> atau <strong className="font-mono text-slate-600">adminriau</strong>
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
