import React, { useEffect, useState } from 'react';
import { useSimulationStore } from '../engine/store';
import lucyFacePFP from '../assets/lucy_FACE_PFP_clean.png';

const BOOT_PHRASES_EN = [
  'SYS_INIT: Booting Quantum Molecular Engine v2.5...',
  'CALIBRATING: 118 IUPAC Element Wavefunctions [STABLE]',
  'ALLOCATING: Thermodynamic Reaction Matrices [NOMINAL]',
  'ACTIVATING: Real-Time Hydrodynamic Fluid Solvers [ONLINE]',
  'CONNECTING: Neural Commlink with Prof. Lucy [SYNCHRONIZED]',
  'FINALIZING: Preparing Virtual Workbench Reality Matrix...'
];

const BOOT_PHRASES_VI = [
  'SYS_INIT: Khởi động Động cơ Lượng tử Phân tử v2.5...',
  'HIỆU CHUẨN: Hàm sóng 118 Nguyên tố chuẩn IUPAC [ỔN ĐỊNH]',
  'PHÂN BỔ: Ma trận Phản ứng Nhiệt động học [ĐẠT CHUẨN]',
  'KÍCH HOẠT: Bộ giải Thủy động lực học Thời gian thực [ONLINE]',
  'KẾT NỐI: Liên kết Nơ-ron với Giáo sư Lucy [ĐÃ ĐỒNG BỘ]',
  'HOÀN TẤT: Sẵn sàng Bàn Thí Nghiệm Lượng tử...'
];

const LUCY_QUOTES_EN = [
  "Synchronizing lab instruments... Please make sure your virtual safety goggles are on!",
  "Calibrating atomic orbitals and reaction kinetics. We are almost ready to experiment!",
  "Excited to synthesize new compounds with you today! Initializing workbench..."
];

const LUCY_QUOTES_VI = [
  "Đang đồng bộ hóa dụng cụ thí nghiệm... Em hãy chuẩn bị kính bảo hộ nhé!",
  "Đang hiệu chuẩn các orbital nguyên tử và động học phản ứng. Sắp bắt đầu rồi!",
  "Rất hào hứng được cùng em khám phá các phản ứng hôm nay! Đang hoàn tất bàn thí nghiệm..."
];

const LoadingScreen: React.FC = () => {
  const setAppState = useSimulationStore(state => state.setAppState);
  const rawLanguage = useSimulationStore(state => state.language);
  const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';

  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [logHistory, setLogHistory] = useState<string[]>([]);

  const bootPhrases = isVi ? BOOT_PHRASES_VI : BOOT_PHRASES_EN;
  const lucyQuote = isVi ? LUCY_QUOTES_VI[phraseIndex % LUCY_QUOTES_VI.length] : LUCY_QUOTES_EN[phraseIndex % LUCY_QUOTES_EN.length];

  // Typewriter effect for current log line
  useEffect(() => {
    const currentPhrase = bootPhrases[phraseIndex] || bootPhrases[0];
    let i = 0;
    setTypedText('');

    const interval = setInterval(() => {
      if (i <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [phraseIndex, bootPhrases]);

  // Loading progress simulation
  useEffect(() => {
    const duration = 4800;
    const interval = 40;
    const steps = duration / interval;
    let currentStep = 0;

    const phraseSwitchInterval = setInterval(() => {
      setPhraseIndex(prev => {
        const next = prev + 1;
        if (next < bootPhrases.length) {
          setLogHistory(h => [...h, bootPhrases[prev]]);
          return next;
        }
        return prev;
      });
    }, 780);

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        clearInterval(phraseSwitchInterval);
        setTimeout(() => {
          setAppState('WORKBENCH');
        }, 400);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearInterval(phraseSwitchInterval);
    };
  }, [setAppState, bootPhrases]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#020612] via-[#040b1a] to-[#010308] text-cyan-300 font-sans select-none overflow-hidden p-6 md:p-10">
      
      {/* Ambient Cyber Nebulae & Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Cyberpunk Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00f3ff 1px, transparent 1px), linear-gradient(to bottom, #00f3ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Header Status Ribbon */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-cyan-950/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
          <span className="font-mono font-black text-sm tracking-[0.25em] uppercase">
            <span className="chemic-gradient-cycle">
              CHEMIC-AI
            </span>{' '}
            <span className="text-cyan-400 font-normal">// QUANTUM RESEARCH MATRIX</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-900/60">
            NODE: <span className="text-cyan-300 font-bold">GEMINI 2.5 CORE</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 font-bold">
            {isVi ? 'HỆ THỐNG: HOẠT ĐỘNG' : 'STATUS: ONLINE'}
          </span>
        </div>
      </div>

      {/* Center Stage: Holographic Particle Accelerator Core */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Quantum Orbital Gyroscope */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
          
          {/* Outer Compass Reticle */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-[spin_20s_linear_infinite]" />
          
          {/* Reticle Angle Marks */}
          <div className="absolute -top-3 text-[9px] font-mono text-cyan-400/60 tracking-widest">000°</div>
          <div className="absolute -bottom-3 text-[9px] font-mono text-cyan-400/60 tracking-widest">180°</div>
          <div className="absolute -left-5 text-[9px] font-mono text-cyan-400/60 tracking-widest">270°</div>
          <div className="absolute -right-5 text-[9px] font-mono text-cyan-400/60 tracking-widest">090°</div>

          {/* Dynamic 3D Orbital Rings */}
          <div className="absolute inset-4 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-blue-600 border-l-transparent animate-[spin_3.5s_linear_infinite] shadow-[0_0_25px_rgba(34,211,238,0.3)]" />
          <div className="absolute inset-10 rounded-full border-2 border-r-cyan-300 border-b-transparent border-l-indigo-500 border-t-transparent animate-[spin_4.5s_linear_infinite_reverse]" />
          <div className="absolute inset-16 rounded-full border border-cyan-400/40 border-dashed animate-[spin_7s_linear_infinite]" />
          
          {/* Inner Glowing Atomic Core */}
          <div className="absolute w-28 h-28 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-xl animate-pulse" />
          
          {/* Center Digital Percentage Readout */}
          <div className="absolute flex flex-col items-center justify-center select-none">
            <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
              {Math.floor(progress)}<span className="text-2xl md:text-3xl text-cyan-400 font-sans font-light">%</span>
            </span>
            <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-cyan-300/80 mt-1 uppercase font-bold">
              {isVi ? 'ĐANG KHỞI ĐỘNG' : 'SYSTEM BOOT'}
            </span>
          </div>
        </div>

        {/* Futuristic Glowing Progress Bar */}
        <div className="w-72 sm:w-96 md:w-[480px] mt-6 flex flex-col gap-2">
          <div className="h-2 w-full bg-[#030914] border border-cyan-900/60 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_15px_#22d3ee] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
            <span className="text-cyan-400/80">
              {isVi ? 'TIẾN TRÌNH KHỞI TẠO' : 'INITIALIZING QUANTUM WORKBENCH'}
            </span>
            <span className="font-bold text-cyan-300">
              {Math.floor(progress)} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Split Lucy Comms & Cyber Boot Terminal */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Holographic AI Assistant Comms Capsule */}
        <div className="lg:col-span-5 bg-[#030a16]/80 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex items-center gap-4">
          <div className="relative shrink-0">
            <img 
              src={lucyFacePFP} 
              alt="Lucy Holographic Assistant" 
              className="w-14 h-14 rounded-2xl border-2 border-cyan-400/80 object-cover shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#030a16] rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-white tracking-wider uppercase font-sans">
                {isVi ? 'GS. LUCY // CỐ VẤN AI' : 'PROF. LUCY // AI MENTOR'}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-widest bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-800/40">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug font-sans italic line-clamp-2">
              "{lucyQuote}"
            </p>
          </div>
        </div>

        {/* Right: Cyber Boot Diagnostic Console */}
        <div className="lg:col-span-7 bg-[#020813]/85 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col justify-between h-28 md:h-28">
          {/* Terminal Title Bar */}
          <div className="px-4 py-1.5 bg-[#030d1e] border-b border-cyan-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold">
                {isVi ? 'NHẬT KÝ KHỞI ĐỘNG HỆ THỐNG' : 'SYSTEM BOOT SEQUENCE LOG'}
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500">TTY-1 // 60 FPS</span>
          </div>

          {/* Terminal Log Lines */}
          <div className="p-3 font-mono text-xs flex flex-col justify-end gap-1 overflow-hidden">
            {logHistory.slice(-2).map((log, idx) => (
              <div key={idx} className="text-cyan-500/50 truncate text-[11px]">
                {log}
              </div>
            ))}
            <div className="text-cyan-300 font-bold flex items-center min-h-[18px] text-[11px] truncate">
              <span>{typedText}</span>
              <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-1.5 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LoadingScreen;
