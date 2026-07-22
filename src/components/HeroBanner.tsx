import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  Menu, 
  Sparkles, 
  Phone, 
  Leaf, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Trees,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroBannerProps {
  onStartQuiz: () => void;
  onOpenAssistant: () => void;
  onNavigateTab?: (tabId: string, elementId?: string) => void;
  announcements: string[];
  heroSlides: { title: string; subtitle: string; buttonText: string }[];
}

export default function HeroBanner({ 
  onStartQuiz, 
  onOpenAssistant, 
  onNavigateTab,
  announcements, 
  heroSlides 
}: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const slideContent = [
    {
      hashtag: "#AKSIJAGAHUTAN",
      title: "Komitmen Bersama Menjaga Rimba & Gambut Riau",
      subtitle: "Aksi kolaboratif Kanwil DJPb Provinsi Riau mendukung kelestarian paru-paru dunia, pemulihan hutan kemasyarakatan, dan kelestarian ekosistem Lancang Kuning.",
      buttonText: "Mulai Aksi Pelestarian",
      action: onOpenAssistant,
      bgImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" // Aerial snaking river delta exactly like the user's uploaded image
    },
    {
      hashtag: "#AYOTANAMPOHON",
      title: "Satu Pegawai Satu Pohon Menghijaukan Bumi",
      subtitle: "Gerakan penanaman pohon serentak guna melipatgandakan serapan karbon, merehabilitasi lahan kritis di Riau, serta mewariskan udara bersih bagi generasi masa depan.",
      buttonText: "Mulai Uji Pemahaman",
      action: onStartQuiz,
      bgImage: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=1600" // Sunbeams filtering through lush canopy
    },
    {
      hashtag: "#RIAUDARLING",
      title: "Riau Sadar Lingkungan & Green Office Kemenkeu",
      subtitle: "Mendorong digitalisasi administrasi paperless, meniadakan plastik sekali pakai, dan menghemat konsumsi energi secara konsisten di seluruh unit kerja DJPb Riau.",
      buttonText: "Konsultasi Asisten AI",
      action: onOpenAssistant,
      bgImage: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1600" // Pristine misty rainforest canopy
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl text-white shadow-2xl border border-emerald-950/40 mb-8 bg-cover bg-center transition-all duration-1000 ease-in-out min-h-[500px] md:min-h-[620px] flex flex-col justify-between" 
      id="econet-hero-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%), url('${slideContent[currentSlide].bgImage}')`
      }}
    >
      
      {/* 🌿 Elegant dangling palm leaves silhouette on the top-left corner exactly like in the Dribbble concept */}
      <div className="absolute -left-2 -top-2 w-32 sm:w-48 md:w-64 h-auto opacity-40 md:opacity-55 select-none pointer-events-none z-10 transition-all origin-top-left hover:scale-105 duration-500">
        <svg viewBox="0 0 200 200" className="w-full text-emerald-400 fill-current">
          {/* Main stem curving down */}
          <path d="M0,0 Q60,30 130,120" stroke="#021a0e" strokeWidth="3" fill="none" />
          
          {/* Detailed tropical pinnule leaflets fanning out */}
          <path d="M5,3 Q-10,35 -5,55 Q10,35 15,18 Z" fill="#011b0e" />
          <path d="M12,10 Q-5,50 8,70 Q20,45 25,25 Z" fill="#022413" />
          <path d="M22,20 Q2,65 20,88 Q35,60 40,38 Z" fill="#022d18" />
          <path d="M32,32 Q10,80 32,105 Q50,75 52,50 Z" fill="#03361d" />
          <path d="M45,45 Q20,100 48,125 Q65,95 68,66 Z" fill="#044424" />
          <path d="M58,58 Q32,120 64,145 Q80,110 82,80 Z" fill="#05522b" />
          <path d="M72,72 Q45,140 80,165 Q95,125 96,95 Z" fill="#0a5c32" />
          <path d="M88,88 Q60,160 98,185 Q112,140 112,112 Z" fill="#0e6b3b" />
          <path d="M105,105 Q78,175 115,198 Q128,155 128,128 Z" fill="#15803d" />
          
          {/* Secondary smaller overlay branch for dense forest depth */}
          <path d="M0,0 Q40,15 90,50" stroke="#01140b" strokeWidth="2" fill="none" />
          <path d="M8,4 Q12,25 25,32 Q20,18 15,8 Z" fill="#011b0f" />
          <path d="M22,12 Q30,40 45,48 Q40,30 32,18 Z" fill="#022414" />
          <path d="M38,22 Q50,55 68,62 Q60,42 50,28 Z" fill="#022e19" />
          <path d="M56,35 Q72,70 92,78 Q82,55 70,42 Z" fill="#033e21" />
        </svg>
      </div>
      
      {/* 🌿 Elegant dangling palm leaves silhouette on the top-left corner exactly like in the Dribbble concept */}
      <div className="absolute -left-2 -top-2 w-32 sm:w-48 md:w-64 h-auto opacity-30 select-none pointer-events-none z-10 transition-all origin-top-left hover:scale-105 duration-500">
        <svg viewBox="0 0 200 200" className="w-full text-emerald-400 fill-current">
          <path d="M0,0 Q60,30 130,120" stroke="#021a0e" strokeWidth="3" fill="none" />
          <path d="M5,3 Q-10,35 -5,55 Q10,35 15,18 Z" fill="#011b0e" />
          <path d="M12,10 Q-5,50 8,70 Q20,45 25,25 Z" fill="#022413" />
          <path d="M22,20 Q2,65 20,88 Q35,60 40,38 Z" fill="#022d18" />
          <path d="M32,32 Q10,80 32,105 Q50,75 52,50 Z" fill="#03361d" />
          <path d="M45,45 Q20,100 48,125 Q65,95 68,66 Z" fill="#044424" />
          <path d="M58,58 Q32,120 64,145 Q80,110 82,80 Z" fill="#05522b" />
          <path d="M72,72 Q45,140 80,165 Q95,125 96,95 Z" fill="#0a5c32" />
          <path d="M88,88 Q60,160 98,185 Q112,140 112,112 Z" fill="#0e6b3b" />
          <path d="M105,105 Q78,175 115,198 Q128,155 128,128 Z" fill="#15803d" />
        </svg>
      </div>

      {/* Atmospheric rich forest glows */}
      <div className="absolute top-10 right-10 sm:right-24 w-80 h-80 rounded-full bg-emerald-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-[#00ff87]/5 blur-[140px] pointer-events-none z-0" />

      {/* --- 🏛️ KANWIL DJPB PROVINSI RIAU MENU BAR (Top Header) --- */}
      <nav className="relative z-30 border-b border-white/10 bg-black/25 backdrop-blur-md px-4 sm:px-8 py-4.5 flex items-center justify-between gap-4">
        
        {/* Left Side: Ministry Seal & Title */}
        <div className="flex items-center gap-3 select-none">
          {/* Detailed Kementerian Keuangan (Nagara Dana Rakca) emblem */}
          <div className="flex-shrink-0">
            <svg viewBox="0 0 400 400" className="h-11 w-11 flex-shrink-0">
              {/* Official Nagara Dana Rakca Pentagonal Emblem */}
              {/* Outer Black Border */}
              <polygon points="200,10 390,148 318,390 82,390 10,148" fill="black" />
              {/* Inner White Space */}
              <polygon points="200,15 385,149 314,385 86,385 15,149" fill="white" />
              {/* Inner Thin Black Line */}
              <polygon points="200,21 379,151 310,379 90,379 21,151" fill="black" />
              {/* Blue Shield Field */}
              <polygon points="200,23 377,152 308,377 92,377 23,152" fill="#0b5ca3" />

              {/* 1. Left Wing (Sayap Kiri) - Yellow/Gold */}
              <g fill="#f1b518" stroke="black" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M165,275 C150,260 128,210 126,110 C138,125 150,150 160,200 C165,225 167,250 165,275 Z" />
                <path d="M160,275 C142,250 118,200 110,118 C122,132 138,162 148,210 Q155,240 152,275 Z" />
                <path d="M152,275 C132,245 108,195 96,132 C108,148 124,180 134,220 C140,245 142,265 142,275 Z" />
                <path d="M142,275 C122,240 98,195 85,152 C95,168 111,200 121,235 C128,255 131,270 131,275 Z" />
                <path d="M131,275 C112,235 90,195 77,175 C85,190 101,220 111,248 C116,260 120,270 121,275 Z" />
                <path d="M121,275 C105,235 84,200 73,198 C80,210 93,235 101,255 C106,265 110,272 111,275 Z" />
                <path d="M111,275 C98,235 78,210 71,218 C76,228 86,248 93,263 Q100,275 101,275 Z" />
                <path d="M101,275 C90,240 75,225 71,238 C75,248 82,260 88,270 C91,275 93,275 93,275 Z" />
                <path d="M93,275 C84,248 72,240 72,255 C75,263 80,270 85,275 Z" />
                {/* Lower wing curls */}
                <path d="M90,275 C80,275 75,285 85,295 C95,300 105,295 108,285 C108,280 100,275 90,275 Z" />
                <path d="M105,285 C95,290 92,300 102,305 C112,308 122,302 124,292 Z" />
              </g>

              {/* 2. Mirrored Right Wing (Sayap Kanan) - Yellow/Gold */}
              <g transform="translate(400, 0) scale(-1, 1)" fill="#f1b518" stroke="black" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M165,275 C150,260 128,210 126,110 C138,125 150,150 160,200 C165,225 167,250 165,275 Z" />
                <path d="M160,275 C142,250 118,200 110,118 C122,132 138,162 148,210 Q155,240 152,275 Z" />
                <path d="M152,275 C132,245 108,195 96,132 C108,148 124,180 134,220 C140,245 142,265 142,275 Z" />
                <path d="M142,275 C122,240 98,195 85,152 C95,168 111,200 121,235 C128,255 131,270 131,275 Z" />
                <path d="M131,275 C112,235 90,195 77,175 C85,190 101,220 111,248 C116,260 120,270 121,275 Z" />
                <path d="M121,275 C105,235 84,200 73,198 C80,210 93,235 101,255 C106,265 110,272 111,275 Z" />
                <path d="M111,275 C98,235 78,210 71,218 C76,228 86,248 93,263 Q100,275 101,275 Z" />
                <path d="M101,275 C90,240 75,225 71,238 C75,248 82,260 88,270 C91,275 93,275 93,275 Z" />
                <path d="M93,275 C84,248 72,240 72,255 C75,263 80,270 85,275 Z" />
                {/* Lower wing curls */}
                <path d="M90,275 C80,275 75,285 85,295 C95,300 105,295 108,285 C108,280 100,275 90,275 Z" />
                <path d="M105,285 C95,290 92,300 102,305 C112,308 122,302 124,292 Z" />
              </g>

              {/* 3. Central Dome Pillar (Candi/Stupa) & Stacked Ribs */}
              {/* Dome top */}
              <path d="M183,136 C183,115 217,115 217,136 Z" fill="#f1b518" stroke="black" strokeWidth="2.5" />
              <path d="M183,136 L217,136" stroke="black" strokeWidth="2.5" />
              {/* Zigzag line on dome */}
              <path d="M188,131 L192,126 L196,131 L200,126 L204,131 L208,126 L212,131" stroke="black" strokeWidth="2" fill="none" />

              {/* Stacked ribs */}
              <rect x="183.5" y="140" width="33" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="184" y="148" width="32" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="184.5" y="156" width="31" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="164" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="172" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="180" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="188" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="196" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="204" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="212" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="220" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="228" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="236" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="244" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="252" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="260" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="268" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />
              <rect x="185" y="276" width="30" height="7.5" rx="3.5" fill="#f1b518" stroke="black" strokeWidth="2" />

              {/* 4. Base Bowl Container */}
              <path d="M155,302 C155,285 180,283 200,283 C220,283 245,285 245,302 Q200,305 155,302 Z" fill="#f1b518" stroke="black" strokeWidth="2.5" />
              <path d="M175,302 L225,302" stroke="black" strokeWidth="2" />

              {/* 5. Padi (Rice) - Left of the central pillar */}
              <g stroke="black" strokeWidth="1.5" fill="#f1b518">
                {/* Stem */}
                <path d="M175,290 Q145,210 152,110" fill="none" stroke="black" strokeWidth="2" />
                {/* Grains */}
                <path d="M152,110 C149,115 145,125 150,130 C155,125 155,115 152,110 Z" />
                <path d="M151,125 C143,130 141,140 148,145 C155,140 155,130 151,125 Z" />
                <path d="M149,140 C140,145 138,155 146,160 C154,155 154,145 149,140 Z" />
                <path d="M147,155 C137,160 135,170 143,175 C151,170 151,160 147,155 Z" />
                <path d="M146,170 C136,175 134,185 142,190 C150,185 150,175 146,170 Z" />
                <path d="M145,185 C135,190 133,200 141,205 C149,200 149,190 145,185 Z" />
                <path d="M145,200 C135,205 134,215 142,220 C150,215 150,205 145,200 Z" />
                <path d="M146,215 C137,220 136,230 144,235 C152,230 152,220 146,215 Z" />
                <path d="M148,230 C140,235 139,245 147,250 C155,245 155,235 148,230 Z" />
                <path d="M151,245 C144,250 143,260 151,265 C159,260 158,250 151,245 Z" />
                
                <path d="M153,120 C161,125 163,135 155,140 C148,135 148,125 153,120 Z" />
                <path d="M151,135 C159,140 161,150 153,155 C146,150 146,140 151,135 Z" />
                <path d="M149,150 C157,155 159,165 151,170 C144,165 144,155 149,150 Z" />
                <path d="M147,165 C155,170 157,180 149,185 C142,180 142,170 147,165 Z" />
                <path d="M146,180 C154,185 156,195 148,200 C141,195 141,185 146,180 Z" />
                <path d="M146,195 C154,200 156,210 148,215 C141,210 141,200 146,195 Z" />
                <path d="M147,210 C155,215 157,225 149,230 C142,225 142,215 147,210 Z" />
                <path d="M149,225 C157,230 159,240 151,245 C144,240 144,230 149,225 Z" />
                <path d="M152,240 C160,245 162,255 154,260 C147,255 147,245 152,240 Z" />
              </g>

              {/* 6. Kapas (Cotton) - Right of the central pillar */}
              <g stroke="black" strokeWidth="1.5">
                {/* Stem */}
                <path d="M225,290 Q255,210 248,110" fill="none" stroke="black" strokeWidth="2" />
                
                {/* Cotton 1 */}
                <path d="M242,122 L248,127 L254,122 L248,115 Z" fill="#22c55e" />
                <path d="M242,117 C238,117 238,109 243,109 C243,105 253,105 253,109 C258,109 258,117 254,117 Z" fill="white" />

                {/* Cotton 2 */}
                <path d="M245,139 L251,144 L257,139 L251,132 Z" fill="#22c55e" />
                <path d="M245,134 C241,134 241,126 246,126 C246,122 256,122 256,126 C261,126 261,134 257,134 Z" fill="white" />

                {/* Cotton 3 */}
                <path d="M247,156 L253,161 L259,156 L253,149 Z" fill="#22c55e" />
                <path d="M247,151 C243,151 243,143 248,143 C248,139 258,139 258,143 C263,143 263,151 259,151 Z" fill="white" />

                {/* Cotton 4 */}
                <path d="M248,173 L254,178 L260,173 L254,166 Z" fill="#22c55e" />
                <path d="M248,168 C244,168 244,160 249,160 C249,156 259,156 259,160 C264,160 264,168 260,168 Z" fill="white" />

                {/* Cotton 5 */}
                <path d="M248,190 L254,195 L260,190 L254,183 Z" fill="#22c55e" />
                <path d="M248,185 C244,185 244,177 249,177 C249,173 259,173 259,177 C264,177 264,185 260,185 Z" fill="white" />

                {/* Cotton 6 */}
                <path d="M247,207 L253,212 L259,207 L253,200 Z" fill="#22c55e" />
                <path d="M247,202 C243,202 243,194 248,194 C248,190 258,190 258,194 C263,194 263,202 259,202 Z" fill="white" />

                {/* Cotton 7 */}
                <path d="M245,224 L251,229 L257,224 L251,217 Z" fill="#22c55e" />
                <path d="M245,219 C241,219 241,211 246,211 C246,207 256,207 256,211 C261,211 261,219 257,219 Z" fill="white" />

                {/* Cotton 8 */}
                <path d="M242,241 L248,246 L254,241 L248,234 Z" fill="#22c55e" />
                <path d="M242,236 C238,236 238,228 243,228 C243,224 253,224 253,228 C258,228 258,236 254,236 Z" fill="white" />

                {/* Cotton 9 */}
                <path d="M238,258 L244,263 L250,258 L244,251 Z" fill="#22c55e" />
                <path d="M238,253 C234,253 234,245 239,245 C239,241 249,241 249,245 C254,245 254,253 250,253 Z" fill="white" />
              </g>

              {/* 7. White Ribbon/Scroll with "NAGARA DANA RAKCA" */}
              <path d="M110,320 C150,305 250,305 290,320 C305,335 285,350 275,345 C230,332 170,332 125,345 C115,350 95,335 110,320 Z" fill="white" stroke="black" strokeWidth="2.5" />
              <path d="M110,320 C95,310 90,325 105,335" fill="none" stroke="black" strokeWidth="2" />
              <path d="M290,320 C305,310 310,325 295,335" fill="none" stroke="black" strokeWidth="2" />
              
              <text x="200" y="333" fill="black" fontStyle="normal" fontWeight="900" fontSize="10.5" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.4">
                NAGARA DANA RAKÇA
              </text>
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-extrabold tracking-wider text-[11px] sm:text-[13px] text-white leading-tight uppercase font-sans">
              Kanwil DJPb Provinsi Riau
            </span>
            <span className="text-[9px] sm:text-[10px] text-emerald-300 font-bold tracking-widest leading-none font-sans uppercase">
              Kementerian Keuangan
            </span>
          </div>
        </div>

        {/* Center Section: Responsive Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[12px] font-extrabold text-white/90 tracking-wider">
          <button 
            onClick={() => onNavigateTab ? onNavigateTab("dashboard") : window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-5 py-2.5 bg-[#00a859] text-white rounded-xl shadow-md cursor-pointer transition-all hover:bg-[#00924d] active:scale-95 flex items-center gap-1 font-extrabold"
          >
            Beranda
          </button>
          
          <button 
            onClick={onOpenAssistant}
            className="px-4 py-2 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
          >
            Profil
          </button>
          
          <button 
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab("dashboard", "latest-articles-section");
              } else {
                document.getElementById("latest-articles-section")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-4 py-2 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
          >
            Artikel Terbaru
          </button>
          
          <button 
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab("dashboard", "contact-us-section");
              } else {
                document.getElementById("contact-us-section")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-4 py-2 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
          >
            Kontak Kami
          </button>
          
          <button 
            onClick={onStartQuiz}
            className="px-5 py-2.5 border border-emerald-400/40 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white rounded-xl transition-all font-black text-xs tracking-widest cursor-pointer ml-1 active:scale-95 uppercase"
          >
            Dukung Kami
          </button>
        </div>

        {/* Right Section: Search capsule and Hamburger */}
        <div className="flex items-center gap-3">
          
          {/* Modern elongated search capsule matching the "Pencarian" box */}
          <div className="relative hidden md:flex items-center">
            <input 
              type="text"
              placeholder="Pencarian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/20 border border-white/30 hover:border-white/55 focus:border-emerald-400 focus:bg-black/45 focus:outline-none focus:ring-0 text-white placeholder-white/60 text-xs font-semibold rounded-full px-5 py-2.5 w-44 lg:w-52 transition-all duration-300"
            />
            <Search className="absolute right-4.5 h-3.5 w-3.5 text-white/70 pointer-events-none" />
          </div>

          {/* Mobile hamburger menu trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/10"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer quick link menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-30 bg-[#041a10]/95 backdrop-blur-md border-b border-emerald-900/40 px-6 py-4 flex flex-col gap-3 lg:hidden"
          >
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest border-b border-emerald-900/50 pb-1.5">Navigasi</div>
            <button 
              onClick={() => { 
                if (onNavigateTab) onNavigateTab("dashboard"); 
                else window.scrollTo({ top: 0, behavior: "smooth" }); 
                setIsMenuOpen(false); 
              }} 
              className="text-left text-xs font-bold py-1.5 text-white hover:text-emerald-300 transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => { 
                onOpenAssistant(); 
                setIsMenuOpen(false); 
              }} 
              className="text-left text-xs font-bold py-1.5 text-white hover:text-emerald-300 transition-colors"
            >
              Profil
            </button>
            <button 
              onClick={() => { 
                if (onNavigateTab) {
                  onNavigateTab("dashboard", "latest-articles-section");
                } else {
                  document.getElementById("latest-articles-section")?.scrollIntoView({ behavior: "smooth" });
                }
                setIsMenuOpen(false); 
              }} 
              className="text-left text-xs font-bold py-1.5 text-white hover:text-emerald-300 transition-colors"
            >
              Artikel Terbaru
            </button>
            <button 
              onClick={() => { 
                if (onNavigateTab) {
                  onNavigateTab("dashboard", "contact-us-section");
                } else {
                  document.getElementById("contact-us-section")?.scrollIntoView({ behavior: "smooth" });
                }
                setIsMenuOpen(false); 
              }} 
              className="text-left text-xs font-bold py-1.5 text-white hover:text-emerald-300 transition-colors"
            >
              Kontak Kami
            </button>
            <button 
              onClick={() => { 
                onStartQuiz(); 
                setIsMenuOpen(false); 
              }} 
              className="text-left text-xs font-extrabold py-2 text-emerald-300 hover:text-white transition-colors bg-emerald-950/40 px-3 rounded-lg border border-emerald-800/30 text-center uppercase"
            >
              Dukung Kami
            </button>
            
            {/* Search Input for Mobile */}
            <div className="relative mt-2">
              <input 
                type="text"
                placeholder="Cari sesuatu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-emerald-900 text-white placeholder-white/50 text-xs rounded-xl px-4 py-2.5 outline-none"
              />
              <Search className="absolute right-3.5 top-3 h-3.5 w-3.5 text-white/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CENTRAL PRESENTATION: HASHTAG & DISPLAY HERO TEXT --- */}
      <div className="relative z-20 px-6 sm:px-12 md:px-16 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        
        {/* Giant Centered Slogan Hashtag exactly like the screenshot */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <motion.h1
            key={"centered-hashtag-" + currentSlide}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-white uppercase font-sans drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)]"
          >
            {slideContent[currentSlide].hashtag}
          </motion.h1>

          {/* Accompanying descriptive header text */}
          <motion.h2
            key={"centered-title-" + currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] tracking-wide max-w-2xl mx-auto leading-relaxed"
          >
            {slideContent[currentSlide].title}
          </motion.h2>

          {/* Beautiful support paragraph */}
          <motion.p
            key={"centered-subtitle-" + currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3 }}
            className="text-emerald-100/95 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.75)] font-semibold"
          >
            {slideContent[currentSlide].subtitle}
          </motion.p>

          {/* Beautiful interactive green button */}
          <motion.div
            key={"centered-cta-" + currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="pt-6"
          >
            <button
              onClick={slideContent[currentSlide].action}
              className="px-6 py-3.5 bg-[#00a859] hover:bg-[#00924d] text-white font-extrabold rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto border border-emerald-400/20 cursor-pointer"
            >
              <span>{slideContent[currentSlide].buttonText}</span>
              <ArrowRight className="h-4.5 w-4.5 text-white stroke-[2.5px]" />
            </button>
          </motion.div>
        </div>

      </div>

      {/* --- MANUAL SLIDER BUTTONS (Translucent Left / Green Right exactly like screenshot) --- */}
      {/* Left button: Dark translucent with white icon */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-black/35 hover:bg-black/55 border border-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 active:scale-90 cursor-pointer shadow-md"
        aria-label="Slide Sebelumnya"
      >
        <ArrowLeft className="h-5 w-5 stroke-[2.5px]" />
      </button>

      {/* Right button: Vibrant green with white icon */}
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-[#00a859] hover:bg-[#00924d] text-white flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-90 cursor-pointer"
        aria-label="Slide Selanjutnya"
      >
        <ArrowRight className="h-5 w-5 stroke-[2.5px]" />
      </button>

      {/* --- BOTTOM INFORMATION BLOCK --- */}
      <div className="relative z-20 border-t border-white/10 bg-black/35 backdrop-blur-md px-6 sm:px-12 py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left item */}
        <div className="md:col-span-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#00a859]/20 flex items-center justify-center text-emerald-400 font-mono text-[14px]">
            🍃
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest leading-none">Kampanye Hijau</span>
            <span className="text-xs font-bold text-white tracking-wide mt-1">Gerakan Riau Sadar Lingkungan</span>
          </div>
        </div>

        {/* Vertical thin line & Description block */}
        <div className="hidden md:block md:col-span-1 h-8 w-[1px] bg-white/10 justify-self-center" />

        <div className="md:col-span-7 text-left">
          <p className="text-[11px] text-emerald-200/90 leading-relaxed font-semibold">
            Integrasi kepedulian lingkungan hidup Kementerian Keuangan dengan Gerakan Riau Darling Kanwil DJPb Riau guna mengawal konservasi gambut, pengurangan penggunaan plastik sekali pakai, dan optimalisasi budaya digitalisasi.
          </p>
        </div>
      </div>

      {/* --- 🌟 HIGH-SPEED INFINITE TICKER MARQUEE --- */}
      <div className="relative z-20 w-full bg-[#00a859] py-3.5 overflow-hidden border-t border-emerald-900/10 flex items-center shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee text-[11px] font-black text-white uppercase tracking-widest font-sans select-none">
          {[...Array(3)].map((_, chunkIdx) => (
            <span key={chunkIdx} className="inline-flex items-center gap-6 sm:gap-12 mr-6 sm:mr-12">
              <span>Kementerian Keuangan RI</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Aksi Jaga Hutan</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Riau Darling Campaign</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Satu Pegawai Satu Pohon</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Peatland Conservation</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Kanwil DJPb Riau</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
            </span>
          ))}
        </div>
        {/* Mirror ticker for seamless infinite scroll */}
        <div className="flex whitespace-nowrap animate-marquee2 absolute top-3.5 text-[11px] font-black text-white uppercase tracking-widest font-sans select-none pointer-events-none">
          {[...Array(3)].map((_, chunkIdx) => (
            <span key={"mirror-" + chunkIdx} className="inline-flex items-center gap-6 sm:gap-12 mr-6 sm:mr-12">
              <span>Kementerian Keuangan RI</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Aksi Jaga Hutan</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Riau Darling Campaign</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Satu Pegawai Satu Pohon</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Peatland Conservation</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
              <span>Kanwil DJPb Riau</span>
              <span className="text-white/45 font-bold text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
