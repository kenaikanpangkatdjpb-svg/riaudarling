import React, { useState, useEffect } from "react";
import { 
  Database, 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  HelpCircle, 
  RefreshCw, 
  Copy, 
  Info,
  Server
} from "lucide-react";
import { 
  getStoredFirebaseConfig, 
  saveFirebaseConfig, 
  clearFirebaseConfig, 
  isFirebaseConnected, 
  FirebaseConfigData 
} from "../firebase";

interface FirebaseManagerProps {
  onConnectionChange: () => void;
}

export default function FirebaseManager({ onConnectionChange }: FirebaseManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Form State
  const [apiKey, setApiKey] = useState("");
  const [authDomain, setAuthDomain] = useState("");
  const [projectId, setProjectId] = useState("");
  const [storageBucket, setStorageBucket] = useState("");
  const [messagingSenderId, setMessagingSenderId] = useState("");
  const [appId, setAppId] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const checkConnectionStatus = () => {
    const connected = isFirebaseConnected();
    setIsConnected(connected);
    
    const config = getStoredFirebaseConfig();
    if (config) {
      setApiKey(config.apiKey || "");
      setAuthDomain(config.authDomain || "");
      setProjectId(config.projectId || "");
      setStorageBucket(config.storageBucket || "");
      setMessagingSenderId(config.messagingSenderId || "");
      setAppId(config.appId || "");
    }
  };

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || !projectId) {
      setMessage({ 
        type: "error", 
        text: "API Key dan Project ID wajib diisi untuk melakukan inisialisasi." 
      });
      return;
    }

    const newConfig: FirebaseConfigData = {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    };

    try {
      saveFirebaseConfig(newConfig);
      // Verify
      const success = isFirebaseConnected();
      if (success) {
        setIsConnected(true);
        setMessage({ 
          type: "success", 
          text: "Konfigurasi Firebase berhasil disimpan! Aplikasi sekarang terhubung ke database cloud real-time Anda." 
        });
        onConnectionChange();
      } else {
        setIsConnected(false);
        setMessage({ 
          type: "error", 
          text: "Gagal menghubungkan. Harap periksa apakah detail kredensial Firebase yang Anda masukkan sudah benar." 
        });
      }
    } catch (err: any) {
      setMessage({ 
        type: "error", 
        text: `Error: ${err.message || "Gagal menginisialisasi."}` 
      });
    }
  };

  const handleDisconnect = () => {
    if (window.confirm("Apakah Anda yakin ingin memutuskan koneksi Firebase? Aplikasi akan kembali menggunakan penyimpanan lokal browser Anda.")) {
      clearFirebaseConfig();
      setApiKey("");
      setAuthDomain("");
      setProjectId("");
      setStorageBucket("");
      setMessagingSenderId("");
      setAppId("");
      setIsConnected(false);
      setMessage({
        type: "success",
        text: "Berhasil kembali ke Penyimpanan Lokal (Offline/Local Storage Mode)."
      });
      onConnectionChange();
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-150 relative overflow-hidden" id="firebase-manager-panel">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl flex items-center justify-center ${isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            <Database className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-slate-800 text-lg">Koneksi Database Cloud (Firebase)</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                isConnected 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isConnected ? 'Terhubung (Cloud Live)' : 'Penyimpanan Lokal (Offline)'}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              {isConnected 
                ? "Hebat! Papan peringkat dan pencatatan aksi hijau tersinkronisasi langsung ke database Cloud Firestore."
                : "Semua aksi hijau disimpan secara lokal di browser Anda. Sambungkan ke Firebase untuk sinkronisasi antarkomputer."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all border border-slate-200"
          >
            <Settings className="h-4 w-4" />
            <span>{isOpen ? 'Tutup Pengaturan' : 'Atur Firebase'}</span>
          </button>

          {isConnected && (
            <button
              onClick={handleDisconnect}
              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-all border border-red-200"
              title="Putuskan sambungan Firebase"
            >
              Putuskan
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-fadeIn" id="firebase-form-container">
          {message && (
            <div className={`mb-5 p-4 rounded-2xl flex items-start gap-2.5 text-sm ${
              message.type === "success" 
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {message.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" /> : <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Settings */}
            <form onSubmit={handleSave} className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-slate-800 text-sm">Masukan Kredensial Firebase Client SDK</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">Project ID *</label>
                  <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="Contoh: riau-darling-djpb"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">API Key *</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">Auth Domain</label>
                  <input
                    type="text"
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    placeholder="riau-darling-djpb.firebaseapp.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">Storage Bucket</label>
                  <input
                    type="text"
                    value={storageBucket}
                    onChange={(e) => setStorageBucket(e.target.value)}
                    placeholder="riau-darling-djpb.appspot.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">Messaging Sender ID</label>
                  <input
                    type="text"
                    value={messagingSenderId}
                    onChange={(e) => setMessagingSenderId(e.target.value)}
                    placeholder="8291048290"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5">App ID</label>
                  <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    placeholder="1:8291048290:web:9as8d2g3h"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold text-xs rounded-xl transition-all"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>{showGuide ? "Sembunyikan Panduan" : "Cara Membuat Kredensial?"}</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Simpan & Hubungkan
                </button>
              </div>
            </form>

            {/* Explanations & Quick Tips */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4 text-xs text-slate-600">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                <Info className="h-4 w-4 text-amber-500" />
                <span>Tips Penyimpanan Cloud</span>
              </h4>
              <p className="leading-relaxed">
                Menghubungkan aplikasi Riau Darling dengan Firebase Firestore memungkinkan rekan kerja di Kantor Wilayah DJPb Riau berkolaborasi secara real-time.
              </p>
              <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">Manfaat Firebase:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Leaderboard yang otomatis diperbarui secara live.</li>
                  <li>Data tersimpan aman di cloud Google Cloud Platform.</li>
                  <li>Mendukung banyak pengguna/rekan kerja secara bersamaan.</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-400">
                * Kredensial Anda disimpan dengan aman secara lokal di browser Anda atau melalui file environment Vercel/GitHub Anda. Kami tidak menyimpan rahasia Anda pada server pihak ketiga mana pun.
              </p>
            </div>
          </div>

          {showGuide && (
            <div className="mt-6 p-5 bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl border border-amber-200/60 text-sm text-slate-700 animate-slideDown">
              <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-3">
                <Server className="h-5 w-5 text-amber-600" />
                <span>Langkah-langkah Membuat Firebase Project Baru</span>
              </h4>
              <ol className="list-decimal pl-5 space-y-2.5 text-slate-600">
                <li>
                  Buka konsol resmi Google Firebase di{" "}
                  <a 
                    href="https://console.firebase.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold underline hover:text-emerald-800"
                  >
                    console.firebase.google.com
                  </a>.
                </li>
                <li>Klik <strong>"Add Project"</strong> dan beri nama project, misalnya <code>riau-darling-djpb</code>.</li>
                <li>Setelah project siap, pilih opsi database <strong>Firestore Database</strong> di panel kiri, lalu klik <strong>Create Database</strong>. Pilih lokasi server terdekat (misalnya <code>asia-southeast1</code> untuk Singapura).</li>
                <li>Mulai dalam <strong>Test Mode</strong> (atau aktifkan rules publik) agar dapat melakukan penulisan dan pembacaan tanpa autentikasi login terlebih dahulu.</li>
                <li>Kembali ke Project Overview, klik ikon <strong>Web (&lt;/&gt;)</strong> untuk menambahkan aplikasi web baru. Beri nama aplikasi dan daftarkan.</li>
                <li>Salin objek konfigurasi JavaScript <code>firebaseConfig</code> yang ditampilkan, lalu masukkan nilainya ke dalam kolom di atas!</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
