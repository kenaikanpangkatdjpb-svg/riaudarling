import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, Send, Sparkles, User, AlertCircle, RefreshCw, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const QUICK_PROMPTS = [
  "Bagaimana SAKTI & Nadine menghemat kertas?",
  "Tips hemat energi AC ruang rapat?",
  "Apa filosofi adat Riau tentang jaga alam?",
  "Cara cegah karhutla lewat kebiasaan kantor?"
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: `Selamat datang di Asisten Hijau Kanwil DJPb Provinsi Riau, Tuan dan Puan! 🍃\n\nSaya adalah asisten AI khusus yang siap membantu mengedukasi seputar aksi 'Riau Darling' (Riau Sadar Lingkungan) di lingkungan kerja kita.\n\nAda hal yang ingin ditanyakan seputar hemat energi, kebijakan paperless SAKTI/Nadine, pengelolaan sampah pantry, atau kearifan lokal Melayu Riau? Silakan ketik pertanyaan Anda!`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        let serverErrorMsg = "Gagal terhubung dengan server asisten hijau.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            serverErrorMsg = errData.error;
          }
        } catch (_) {}
        throw new Error(serverErrorMsg);
      }

      const data = await response.json();
      const modelMsg: ChatMessage = { role: "model", content: data.text };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Kesalahan Asisten AI:", err);
      setError(err.message || "Terjadi kendala jaringan. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        content: `Halo kembali! Saya Asisten Hijau Riau Darling. Silakan tanyakan apa saja seputar inisiatif eco-office di lingkungan Kanwil DJPb Provinsi Riau.`
      }
    ]);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-[520px] flex flex-col justify-between" id="ai-assistant">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-900 rounded-xl text-amber-400 glow-green">
            <Sparkles className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-1">
              Asisten Hijau AI Riau Darling
              <span className="text-[9px] bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Gemini 3.5</span>
            </h3>
            <p className="text-slate-500 text-[11px]">Edukasi ramah lingkungan berlatar tradisi Melayu Riau.</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          title="Reset Percakapan"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 text-xs sm:text-sm">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="h-7 w-7 rounded-full bg-emerald-950 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-sm border border-emerald-800">
                  <Leaf className="h-3.5 w-3.5" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed shadow-sm border ${
                  isUser
                    ? "bg-emerald-700 text-white border-emerald-600 rounded-tr-none font-medium"
                    : "bg-slate-50 text-slate-700 border-slate-100 rounded-tl-none font-normal"
                }`}
              >
                {msg.content}
              </div>
              {isUser && (
                <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0 border border-slate-300">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="h-7 w-7 rounded-full bg-emerald-950 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse">
              <Leaf className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="p-3 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs italic">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
              </span>
              Asisten Hijau sedang merumuskan jawaban...
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-150 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form & Quick chips */}
      <div>
        {/* Quick Chips - Only show when not loading to keep clean */}
        {!isLoading && messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPromptClick(prompt)}
                className="px-2.5 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 rounded-full transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
          <input
            type="text"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Tanyakan hal ramah lingkungan di DJPb Riau..."
            className="flex-1 text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed pr-10"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
