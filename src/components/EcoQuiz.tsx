import React, { useState } from "react";
import { INITIAL_QUIZ_QUESTIONS } from "../data";
import { QuizQuestion } from "../types";
import { HelpCircle, Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EcoQuizProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export default function EcoQuiz({ onEarnPoints }: EcoQuizProps) {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "summary">("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const questions: QuizQuestion[] = INITIAL_QUIZ_QUESTIONS;
  const currentQuestion = questions[currentIdx];

  const handleStartQuiz = () => {
    setGameState("playing");
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsLocked(false);
    setNumCorrect(0);
    setTotalPointsEarned(0);
    setUserAnswers([]);
  };

  const handleSelectOption = (optIdx: number) => {
    if (isLocked) return;
    setSelectedOptionIdx(optIdx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIdx === null || isLocked) return;

    setIsLocked(true);
    const correct = selectedOptionIdx === currentQuestion.correctIndex;
    const nextAnswers = [...userAnswers, selectedOptionIdx];
    setUserAnswers(nextAnswers);

    if (correct) {
      setNumCorrect((prev) => prev + 1);
      setTotalPointsEarned((prev) => prev + currentQuestion.points);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsLocked(false);
    } else {
      // End of quiz
      setGameState("summary");
      // Propagate earned points to the main app dashboard/leaderboard
      if (totalPointsEarned > 0) {
        onEarnPoints(totalPointsEarned, "Kuis Riau Darling");
      }
    }
  };

  // Determine Melayu Honor title based on correct answers
  const getHonorTitle = (score: number) => {
    if (score === 8) {
      return {
        title: "Laksamana Rimba Riau 👑",
        desc: "Kecerdasan luar biasa! Anda menguasai kearifan lokal Melayu Riau dan pilar Green Treasury Kemenkeu secara mutlak.",
        color: "text-amber-800 bg-amber-100 border-amber-300"
      };
    } else if (score >= 6) {
      return {
        title: "Pendekar Gambut Lestari 🍃",
        desc: "Bagus sekali! Pemahaman Anda mengenai pelestarian gambut dan efisiensi energi kantor sangat tinggi.",
        color: "text-emerald-800 bg-emerald-100 border-emerald-300"
      };
    } else if (score >= 4) {
      return {
        title: "Rekan Sahabat Sungai Siak 💧",
        desc: "Cukup baik! Anda peduli terhadap kelestarian ekosistem dan kebiasaan hemat sampah kantor.",
        color: "text-blue-800 bg-blue-100 border-blue-300"
      };
    } else {
      return {
        title: "Kader Hijau Pemula 🌱",
        desc: "Tetap semangat! Pelajari lagi tips-tips eco-office dari Asisten Hijau AI untuk memperdalam wawasan Anda.",
        color: "text-slate-800 bg-slate-100 border-slate-300"
      };
    }
  };

  const honor = getHonorTitle(numCorrect);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100" id="eco-quiz">
      {gameState === "welcome" && (
        <div className="text-center py-8 px-4 max-w-xl mx-auto">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <HelpCircle className="h-8 w-8 animate-bounce" />
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
            Edukasi & Refleksi
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-3 mb-2">Kuis Sadar Lingkungan Riau Darling</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Uji pemahaman Tuan & Puan mengenai budaya pelestarian alam Riau, regulasi eco-office, dan tips menghemat emisi karbon di kantor DJPb.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs text-left mb-6 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Ketentuan Kuis:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
              <li>Terdapat <strong>8 Pertanyaan pilihan ganda</strong>.</li>
              <li>Poin kuis akan langsung diakumulasikan ke papan skor utama.</li>
              <li>Setiap pertanyaan memiliki penjelasan detail untuk mengedukasi kita semua.</li>
            </ul>
          </div>
          <button
            onClick={handleStartQuiz}
            className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            Mulai Kuis Sekarang
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          {/* Header & Progress */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold">
                Pertanyaan {currentIdx + 1} dari {questions.length}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">+{currentQuestion.points} Pts</span>
            </div>
            <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-1.5 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Body */}
          <h4 className="text-md sm:text-lg font-bold text-slate-800 mb-6 leading-snug">
            {currentQuestion.question}
          </h4>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              // Styling logic based on selection and confirmation
              let btnStyle = "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50";
              let indicator = <span className="h-5 w-5 rounded-full border border-slate-300 flex-shrink-0" />;

              if (selectedOptionIdx === idx) {
                btnStyle = "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold";
                indicator = <span className="h-5 w-5 rounded-full border-4 border-emerald-600 bg-white flex-shrink-0" />;
              }

              if (isLocked) {
                if (idx === currentQuestion.correctIndex) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                  indicator = <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />;
                } else if (selectedOptionIdx === idx) {
                  btnStyle = "border-red-400 bg-red-50/60 text-red-950";
                  indicator = <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />;
                } else {
                  btnStyle = "border-slate-200 text-slate-400 opacity-60";
                  indicator = <span className="h-5 w-5 rounded-full border border-slate-200 flex-shrink-0" />;
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isLocked}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left text-sm transition-all ${btnStyle}`}
                >
                  {indicator}
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Action Area: Confirm & Explanations */}
          <div className="min-h-[100px] flex flex-col justify-end">
            {!isLocked ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOptionIdx === null}
                className={`py-3 px-6 text-sm font-bold rounded-xl shadow-sm self-end transition-all ${
                  selectedOptionIdx !== null
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Kunci Jawaban
              </button>
            ) : (
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <BookOpen className="h-4.5 w-4.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">Edukasi Ekologis:</span>
                    <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">{currentQuestion.explanation}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-emerald-800 font-bold">
                    {selectedOptionIdx === currentQuestion.correctIndex ? "🎉 Jawaban Benar! (+Poin)" : "❌ Jawaban Kurang Tepat"}
                  </span>
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1 py-1.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                  >
                    <span>{currentIdx < questions.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil Kuis"}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === "summary" && (
        <div className="text-center py-6 px-4 max-w-xl mx-auto">
          <div className="h-14 w-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Award className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Hasil Evaluasi Riau Darling</h3>
          <p className="text-slate-400 text-xs mb-6">Penilaian pemahaman sadar lingkungan Anda selesai.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Benar</span>
              <span className="text-2xl font-mono font-black text-emerald-700">{numCorrect}</span>
              <span className="text-xs text-slate-400 font-medium ml-1">/ {questions.length}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Bonus Poin</span>
              <span className="text-2xl font-mono font-black text-amber-600">+{totalPointsEarned}</span>
              <span className="text-xs text-slate-400 font-medium ml-1">Pts</span>
            </div>
          </div>

          {/* Honor Card */}
          <div className={`p-4 rounded-2xl border text-left text-xs mb-6 ${honor.color}`}>
            <span className="font-bold text-sm block mb-1">Gelar Adat: {honor.title}</span>
            <p className="opacity-90 leading-relaxed">{honor.desc}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Main Lagi
            </button>
            <button
              onClick={() => setGameState("welcome")}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              Kembali ke Menu Kuis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
