import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import InitiativesOverview from "./components/InitiativesOverview";
import GreenCalculator from "./components/GreenCalculator";
import ActionLogger from "./components/ActionLogger";
import EcoQuiz from "./components/EcoQuiz";
import AiAssistant from "./components/AiAssistant";
import FirebaseManager from "./components/FirebaseManager";
import { LoggedAction } from "./types";
import { SEED_LOGGED_ACTIONS, GREEN_ACTION_TEMPLATES } from "./data";
import { isFirebaseConnected, subscribeToActions, saveActionToFirestore } from "./firebase";
import { Leaf, Trophy, Calculator, HelpCircle, Sparkles, Star, Trees, HelpCircle as HelpIcon } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calculator" | "quiz" | "assistant">("dashboard");
  const [loggedActions, setLoggedActions] = useState<LoggedAction[]>([]);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load and sync data
  useEffect(() => {
    const isConnected = isFirebaseConnected();
    setFirebaseConnected(isConnected);

    if (isConnected) {
      console.log("Menghubungkan ke real-time stream Firebase Firestore...");
      // Subscribe to real-time updates from Firestore
      const unsubscribe = subscribeToActions((actions) => {
        if (actions.length > 0) {
          setLoggedActions(actions);
        } else {
          // If Firestore collection is empty, seed it or fall back to seeds
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
          console.error("Gagal membaca riwayat aksi lokal:", e);
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

  // Callback to add a new green action logged by employee
  const handleAddAction = async (employeeName: string, actionId: string, notes?: string) => {
    const tmpl = GREEN_ACTION_TEMPLATES.find((t) => t.id === actionId);
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
        // Fallback local if failed
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

  return (
    <div className="min-h-screen bg-slate-50/70 py-6 px-4 sm:px-6 lg:px-8 font-sans green-gradient-bg" id="app-root-container">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Culturally Rich Header */}
        <Header />

        {/* Greenpeace-inspired Hero Banner with running text & images requested by user */}
        <HeroBanner 
          onStartQuiz={() => setActiveTab("quiz")} 
          onOpenAssistant={() => setActiveTab("assistant")} 
        />

        {/* Connection to Firebase Cloud Manager */}
        <FirebaseManager onConnectionChange={handleFirebaseRefresh} />

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap no-scrollbar gap-1" id="tab-navigation">
          {[
            { id: "dashboard", label: "Aksi & Klasemen", icon: Trophy },
            { id: "calculator", label: "Kalkulator Karbon", icon: Calculator },
            { id: "quiz", label: "Kuis Riau Darling", icon: HelpCircle },
            { id: "assistant", label: "Asisten AI", icon: Sparkles },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-sm transition-all relative ${
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
              <ActionLogger loggedActions={loggedActions} onAddAction={handleAddAction} />
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
              <EcoQuiz onEarnPoints={handleEarnQuizPoints} />
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

      </div>
    </div>
  );
}
