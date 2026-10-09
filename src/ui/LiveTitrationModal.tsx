import React, { useState, useMemo, useEffect } from 'react';
import { audioManager } from '../engine/AudioManager';

interface LiveTitrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

interface AnalyteConfig {
  id: string;
  name: { EN: string; VN: string };
  formula: string;
  type: 'strong_acid' | 'weak_acid' | 'diprotic_acid';
  conc: number; // M
  initVol: number; // mL
  ka?: number;
  pka?: number;
}

interface TitrantConfig {
  id: string;
  name: { EN: string; VN: string };
  formula: string;
  conc: number; // M
}

interface IndicatorConfig {
  id: string;
  name: { EN: string; VN: string };
  range: [number, number];
  colorAcid: string;
  colorBase: string;
  acidLabel: { EN: string; VN: string };
  baseLabel: { EN: string; VN: string };
}

const ANALYTES: AnalyteConfig[] = [
  {
    id: 'hcl',
    name: { EN: 'Hydrochloric Acid (Strong Acid)', VN: 'Axit Clohiđric (Axit mạnh)' },
    formula: 'HCl',
    type: 'strong_acid',
    conc: 0.1,
    initVol: 25.0
  },
  {
    id: 'ch3cooh',
    name: { EN: 'Acetic Acid (Vinegar / Weak Acid)', VN: 'Axit Axetic (Giấm ăn / Axit yếu)' },
    formula: 'CH₃COOH',
    type: 'weak_acid',
    conc: 0.1,
    initVol: 25.0,
    ka: 1.75e-5,
    pka: 4.76
  },
  {
    id: 'h2so4',
    name: { EN: 'Sulfuric Acid (Diprotic Strong Acid)', VN: 'Axit Sunfuric (Axit 2 nấc mạnh)' },
    formula: 'H₂SO₄',
    type: 'diprotic_acid',
    conc: 0.05,
    initVol: 25.0
  }
];

const TITRANTS: TitrantConfig[] = [
  {
    id: 'naoh',
    name: { EN: 'Sodium Hydroxide (Standard 0.100M)', VN: 'Natri Hiđroxit (Dung dịch chuẩn 0.100M)' },
    formula: 'NaOH',
    conc: 0.1
  },
  {
    id: 'koh',
    name: { EN: 'Potassium Hydroxide (Standard 0.100M)', VN: 'Kali Hiđroxit (Dung dịch chuẩn 0.100M)' },
    formula: 'KOH',
    conc: 0.1
  }
];

const INDICATORS: IndicatorConfig[] = [
  {
    id: 'phenolphthalein',
    name: { EN: 'Phenolphthalein (pH 8.3 - 10.0)', VN: 'Phenolphtalein (pH 8.3 - 10.0)' },
    range: [8.3, 10.0],
    colorAcid: 'rgba(240, 249, 255, 0.2)',
    colorBase: '#f43f5e',
    acidLabel: { EN: 'Colorless', VN: 'Không màu' },
    baseLabel: { EN: 'Vibrant Magenta Pink', VN: 'Hồng cánh sen' }
  },
  {
    id: 'methyl_orange',
    name: { EN: 'Methyl Orange (pH 3.1 - 4.4)', VN: 'Metyl Da Cam (pH 3.1 - 4.4)' },
    range: [3.1, 4.4],
    colorAcid: '#ef4444',
    colorBase: '#f59e0b',
    acidLabel: { EN: 'Red-Orange', VN: 'Đỏ cam' },
    baseLabel: { EN: 'Yellow', VN: 'Vàng' }
  },
  {
    id: 'bromothymol_blue',
    name: { EN: 'Bromothymol Blue (pH 6.0 - 7.6)', VN: 'Bromothymol Xanh (pH 6.0 - 7.6)' },
    range: [6.0, 7.6],
    colorAcid: '#eab308',
    colorBase: '#0284c7',
    acidLabel: { EN: 'Yellow', VN: 'Vàng' },
    baseLabel: { EN: 'Blue', VN: 'Xanh lam' }
  }
];

export const LiveTitrationModal: React.FC<LiveTitrationModalProps> = ({
  isOpen,
  onClose,
  isVi = true
}) => {
  const [selectedAnalyteId, setSelectedAnalyteId] = useState('ch3cooh');
  const [selectedTitrantId, setSelectedTitrantId] = useState('naoh');
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('phenolphthalein');
  const [addedVolume, setAddedVolume] = useState(0.0); // mL titrant added
  const [isAutoTitrating, setIsAutoTitrating] = useState(false);

  const analyte = ANALYTES.find(a => a.id === selectedAnalyteId) || ANALYTES[0];
  const titrant = TITRANTS.find(t => t.id === selectedTitrantId) || TITRANTS[0];
  const indicator = INDICATORS.find(i => i.id === selectedIndicatorId) || INDICATORS[0];

  // Mathematical Calculation of pH at given added volume V_b
  const calculatePH = (Vb: number, ana: AnalyteConfig, tit: TitrantConfig): number => {
    const Va = ana.initVol;
    const Ca = ana.conc;
    const Cb = tit.conc;
    const nAcid = (ana.type === 'diprotic_acid' ? Ca * 2 : Ca) * Va; // mmol of H+
    const nBase = Cb * Vb; // mmol of OH-
    const totalV = Va + Vb;

    if (ana.type === 'strong_acid' || ana.type === 'diprotic_acid') {
      if (nBase < nAcid) {
        // Excess strong acid
        const hConc = (nAcid - nBase) / totalV;
        return Math.max(0.5, Math.min(6.9, -Math.log10(hConc)));
      } else if (Math.abs(nBase - nAcid) < 1e-4) {
        // Neutral equivalence
        return 7.0;
      } else {
        // Excess strong base
        const ohConc = (nBase - nAcid) / totalV;
        const pOH = -Math.log10(ohConc);
        return Math.min(13.8, 14.0 - pOH);
      }
    } else {
      // Weak acid (CH3COOH)
      const pka = ana.pka || 4.76;
      const ka = ana.ka || 1.75e-5;
      const Veq = nAcid / Cb;

      if (Vb <= 0.001) {
        // Pure weak acid solution: [H+] = sqrt(Ka * Ca)
        const hConc = Math.sqrt(ka * Ca);
        return -Math.log10(hConc);
      } else if (Vb < Veq) {
        // Henderson-Hasselbalch Buffer Region: pH = pKa + log([A-] / [HA])
        const ratio = Vb / (Veq - Vb);
        if (ratio <= 0.001) return pka - 3.0;
        const ph = pka + Math.log10(ratio);
        return Math.max(1.8, Math.min(7.5, ph));
      } else if (Math.abs(Vb - Veq) <= 0.1) {
        // Equivalence point: Hydrolysis of acetate ion CH3COO- + H2O <=> CH3COOH + OH-
        // [OH-] = sqrt((Kw / Ka) * C_salt)
        const Csalt = nAcid / totalV;
        const kw = 1.0e-14;
        const ohConc = Math.sqrt((kw / ka) * Csalt);
        const pOH = -Math.log10(ohConc);
        return 14.0 - pOH; // approx 8.72
      } else {
        // Post-equivalence: Excess OH- dominates
        const ohConc = (nBase - nAcid) / totalV;
        const pOH = -Math.log10(ohConc);
        return Math.min(13.5, 14.0 - pOH);
      }
    }
  };

  const currentPH = useMemo(() => {
    return calculatePH(addedVolume, analyte, titrant);
  }, [addedVolume, analyte, titrant]);

  // Equivalence volume
  const eqVolume = useMemo(() => {
    const factor = analyte.type === 'diprotic_acid' ? 2 : 1;
    return (analyte.conc * factor * analyte.initVol) / titrant.conc;
  }, [analyte, titrant]);

  // Equivalence pH
  const eqPH = useMemo(() => {
    return calculatePH(eqVolume, analyte, titrant);
  }, [eqVolume, analyte, titrant]);

  // Solution Visual Color based on Indicator and Current pH
  const solutionColor = useMemo(() => {
    const [minRange, maxRange] = indicator.range;
    if (currentPH <= minRange) {
      return indicator.colorAcid;
    } else if (currentPH >= maxRange) {
      return indicator.colorBase;
    } else {
      // Transition range interpolation
      const t = (currentPH - minRange) / (maxRange - minRange);
      if (indicator.id === 'phenolphthalein') {
        return `rgba(244, 63, 94, ${Math.min(0.9, 0.1 + t * 0.8)})`;
      } else if (indicator.id === 'methyl_orange') {
        return t > 0.5 ? '#f59e0b' : '#ef4444';
      } else {
        return t > 0.5 ? '#0284c7' : '#eab308';
      }
    }
  }, [currentPH, indicator]);

  // Pre-generate full theoretical curve points for graph (from V = 0 to 50 mL)
  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number; v: number; ph: number }[] = [];
    const maxV = 50.0;
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const v = (i / steps) * maxV;
      const ph = calculatePH(v, analyte, titrant);
      // Graph mapping: ViewBox 0 0 500 280.
      // Margin: left 45, right 20, top 20, bottom 35
      // W = 435, H = 225
      const px = 45 + (v / maxV) * 435;
      const py = 245 - (ph / 14.0) * 225;
      pts.push({ x: px, y: py, v, ph });
    }
    return pts;
  }, [analyte, titrant]);

  // Auto-titrate runner
  React.useEffect(() => {
    if (!isAutoTitrating) return;
    const interval = setInterval(() => {
      setAddedVolume(prev => {
        if (prev >= 49.5) {
          setIsAutoTitrating(false);
          return 50.0;
        }
        const step = Math.abs(prev - eqVolume) < 2.0 ? 0.2 : 0.8;
        try {
          audioManager.playLiquidPour();
        } catch (_) {}
        return Math.min(50.0, +(prev + step).toFixed(2));
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isAutoTitrating, eqVolume]);

  const handleAddTitrant = (delta: number) => {
    try {
      audioManager.playLiquidPour();
      audioManager.playClick();
    } catch (_) {}
    setAddedVolume(prev => Math.min(50.0, +(prev + delta).toFixed(2)));
  };

  const handleReset = () => {
    try {
      audioManager.playGlassClink();
      audioManager.playClick();
    } catch (_) {}
    setIsAutoTitrating(false);
    setAddedVolume(0.0);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentMarkerX = 45 + (addedVolume / 50.0) * 435;
  const currentMarkerY = 245 - (currentPH / 14.0) * 225;
  const eqMarkerX = 45 + (eqVolume / 50.0) * 435;
  const eqMarkerY = 245 - (eqPH / 14.0) * 225;

  return (
    <div 
      onClick={() => { audioManager.playClick(); onClose(); }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 md:p-6 overflow-hidden select-none animate-in fade-in duration-200 pointer-events-auto cursor-pointer"
    >
      {/* Container Chamber */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-b from-[#030914] via-[#050f22] to-[#020610] border-2 border-cyan-500/60 rounded-3xl p-5 md:p-7 shadow-[0_0_80px_rgba(6,182,212,0.35)] flex flex-col gap-4 overflow-y-auto custom-scrollbar cursor-default"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              📈
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  {isVi ? 'TRẠM CHUẨN ĐỘ AXIT - BAZƠ ĐIỆN TỬ REALTIME' : 'ANALYTICAL TITRATION & BUFFER CURVE WORKSTATION'}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">
                {isVi ? 'ĐỒ THỊ CHUẨN ĐỘ & BƯỚC NHẢY pH THỜI GIAN THỰC' : 'LIVE TITRATION OSCILLOSCOPE & BUFFER REGION'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-cyan-950/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 text-base font-bold shrink-0 z-10"
            title={isVi ? 'Đóng (ESC hoặc click ngoài)' : 'Close (ESC or click outside)'}
          >
            ✕
          </button>
        </div>

        {/* Configuration Selectors Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#040e1e]/90 p-3 rounded-2xl border border-cyan-900/40 text-xs font-mono">
          {/* Analyte (Axit trong bình) */}
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
              <span>🧪</span>
              <span>{isVi ? 'Dung dịch cần chuẩn độ (Erlenmeyer):' : 'Analyte in Flask:'}</span>
            </span>
            <select
              value={selectedAnalyteId}
              onChange={(e) => {
                setSelectedAnalyteId(e.target.value);
                setAddedVolume(0);
              }}
              className="bg-[#030914] border border-cyan-800/60 rounded-xl px-2.5 py-1.5 text-cyan-200 focus:outline-none focus:border-cyan-400 text-xs"
            >
              {ANALYTES.map(a => (
                <option key={a.id} value={a.id}>
                  {isVi ? a.name.VN : a.name.EN} ({a.formula})
                </option>
              ))}
            </select>
          </div>

          {/* Titrant (Bazơ trên buret) */}
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
              <span>💧</span>
              <span>{isVi ? 'Dung dịch chuẩn (Buret):' : 'Titrant in Buret:'}</span>
            </span>
            <select
              value={selectedTitrantId}
              onChange={(e) => {
                setSelectedTitrantId(e.target.value);
                setAddedVolume(0);
              }}
              className="bg-[#030914] border border-cyan-800/60 rounded-xl px-2.5 py-1.5 text-cyan-200 focus:outline-none focus:border-cyan-400 text-xs"
            >
              {TITRANTS.map(t => (
                <option key={t.id} value={t.id}>
                  {isVi ? t.name.VN : t.name.EN} ({t.formula})
                </option>
              ))}
            </select>
          </div>

          {/* Indicator (Chỉ thị) */}
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
              <span>🎨</span>
              <span>{isVi ? 'Chất chỉ thị màu:' : 'Indicator Selection:'}</span>
            </span>
            <select
              value={selectedIndicatorId}
              onChange={(e) => setSelectedIndicatorId(e.target.value)}
              className="bg-[#030914] border border-cyan-800/60 rounded-xl px-2.5 py-1.5 text-cyan-200 focus:outline-none focus:border-cyan-400 text-xs"
            >
              {INDICATORS.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {isVi ? ind.name.VN : ind.name.EN}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Central Stage: Left Buret/Flask Visualizer + Right Live SVG Oscilloscope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Column (4 cols): Animated Buret & Erlenmeyer Flask */}
          <div className="lg:col-span-4 bg-[#020712]/90 border border-cyan-950 rounded-2xl p-4 flex flex-col items-center justify-between shadow-inner">
            <div className="text-center w-full pb-2 border-b border-cyan-900/30">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                {isVi ? 'THIẾT BỊ BÌNH TAM GIÁC & BURET' : 'BURET & FLASK APPARATUS'}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                V({titrant.formula}) = <strong className="text-amber-400 text-sm">{addedVolume.toFixed(2)} mL</strong>
              </span>
            </div>

            {/* Buret & Flask Graphical Representation */}
            <div className="relative w-48 h-72 flex flex-col items-center justify-end my-2">
              {/* Equivalence Point Celebration Banner */}
              {Math.abs(addedVolume - eqVolume) <= 0.4 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-black font-mono font-black text-[10px] uppercase shadow-[0_0_25px_rgba(245,158,11,0.9)] animate-bounce whitespace-nowrap z-30">
                  ✨ {isVi ? 'ĐẠT ĐIỂM TƯƠNG ĐƯƠNG!' : 'EQUIVALENCE POINT!'}
                </div>
              )}

              {/* Buret Tube */}
              <div className="relative w-6 h-36 bg-slate-900/70 border-2 border-cyan-500/50 rounded-t-sm flex flex-col justify-end overflow-hidden shadow-[inset_0_0_12px_rgba(6,182,212,0.3)]">
                {/* Liquid level inside buret decreases as added */}
                <div 
                  className="w-full bg-cyan-400/60 transition-all duration-150 relative shadow-[0_0_10px_#22d3ee]"
                  style={{ height: `${Math.max(4, 100 - (addedVolume / 50.0) * 100)}%` }}
                >
                  {/* Meniscus curvature inside burette */}
                  <div className="w-full h-1 bg-cyan-200/80 rounded-b-full" />
                </div>
                {/* Calibration notches */}
                <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none opacity-50">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2.5 h-[1px] bg-white self-end mr-0.5" />
                  ))}
                </div>
              </div>

              {/* Stopcock valve with Rotating Handle */}
              <div className="relative flex items-center justify-center my-0.5 z-20">
                <div className="w-7 h-4 bg-slate-800 rounded border border-cyan-500/60 flex items-center justify-center shadow-lg">
                  {/* Rotating Handle Knob */}
                  <div 
                    onClick={() => setIsAutoTitrating(!isAutoTitrating)}
                    className={`w-11 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 border border-white shadow-[0_0_10px_#22d3ee] transition-transform duration-300 cursor-pointer ${
                      isAutoTitrating ? 'rotate-90' : 'rotate-0'
                    }`}
                    title={isVi ? 'Khóa Buret (Nhấn để xoay 90° mở/đóng dòng chảy)' : 'Burette Stopcock (Click to toggle valve flow)'}
                  />
                </div>
              </div>

              {/* Dropping Pipette Tip & Falling Droplets with Ripple */}
              <div className="w-2 h-4 bg-slate-700/90 rounded-b-full relative flex items-center justify-center">
                {(isAutoTitrating || addedVolume > 0) && (
                  <div className="absolute top-2 w-1.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                )}
              </div>

              {/* Erlenmeyer Flask with Magnetic Stirrer and Vortex */}
              <div className="relative w-40 h-32 mt-0.5 flex flex-col items-center justify-end overflow-hidden">
                {/* Glass outline trapezoid */}
                <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  {/* Flask Body */}
                  <polygon 
                    points="55,5 85,5 85,25 130,90 10,90 55,25" 
                    fill="rgba(5, 15, 30, 0.75)" 
                    stroke="#38bdf8" 
                    strokeWidth="2.5" 
                  />
                  {/* Solution in Flask with dynamic color */}
                  <polygon 
                    points="45,45 95,45 125,88 15,88" 
                    fill={solutionColor} 
                    className="transition-colors duration-300"
                  />
                  {/* Meniscus arc */}
                  <path d="M 45,45 Q 70,48 95,45" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
                  
                  {/* Vortex swirl lines when magnetic stirrer is active */}
                  <ellipse cx="70" cy="46" rx="16" ry="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" style={{ transformOrigin: '70px 46px' }} />
                </svg>

                {/* Magnetic Stirrer Capsule Pill */}
                <div 
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-white border border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.9)] flex items-center justify-center animate-spin"
                  style={{ animationDuration: isAutoTitrating ? '0.35s' : '1.0s' }}
                  title={isVi ? 'Con khuấy từ Teflon đang quay trộn đều dung dịch' : 'Magnetic PTFE stir bar rotating'}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                </div>

                {/* Solution Telemetry Badge inside Flask */}
                <div className="absolute bottom-6 text-center">
                  <span className="font-mono text-sm font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.95)]">
                    pH {currentPH.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Titration Control Buttons */}
            <div className="w-full flex flex-col gap-2 pt-2 border-t border-cyan-900/30">
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px] font-bold">
                <button
                  onClick={() => handleAddTitrant(0.5)}
                  className="py-1.5 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/50 rounded-xl text-cyan-200 transition-all cursor-pointer active:scale-95 shadow-sm text-center"
                >
                  +0.5 mL
                </button>
                <button
                  onClick={() => handleAddTitrant(1.0)}
                  className="py-1.5 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/50 rounded-xl text-cyan-200 transition-all cursor-pointer active:scale-95 shadow-sm text-center"
                >
                  +1.0 mL
                </button>
                <button
                  onClick={() => handleAddTitrant(5.0)}
                  className="py-1.5 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/50 rounded-xl text-cyan-200 transition-all cursor-pointer active:scale-95 shadow-sm text-center"
                >
                  +5.0 mL
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsAutoTitrating(!isAutoTitrating)}
                  className={`flex-1 py-2 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-1.5 ${
                    isAutoTitrating
                      ? 'bg-amber-500 text-black animate-pulse shadow-[0_0_15px_#f59e0b]'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500'
                  }`}
                >
                  <span>{isAutoTitrating ? (isVi ? '⏸ TẠM DỪNG' : '⏸ PAUSE') : (isVi ? '▶ CHUẨN ĐỘ TỰ ĐỘNG' : '▶ AUTO TITRATE')}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer active:scale-95 font-mono text-xs font-bold"
                  title={isVi ? 'Đặt lại thí nghiệm (0 mL)' : 'Reset titration (0 mL)'}
                >
                  🔄
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (8 cols): Real-Time High-Tech SVG Titration Oscilloscope */}
          <div className="lg:col-span-8 bg-[#020712]/90 border border-cyan-950 rounded-2xl p-4 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {isVi ? 'ĐƯỜNG CONG BIỂU DIỄN pH THEO THỂ TÍCH' : 'pH vs TITRANT VOLUME (mL)'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  V_eq = {eqVolume.toFixed(1)} mL (pH_eq = {eqPH.toFixed(2)})
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {isVi ? 'Bước nhảy chuẩn độ: pH 4.0 → 10.0' : 'Equivalence Jump: pH 4.0 → 10.0'}
              </span>
            </div>

            {/* The SVG Canvas Chart */}
            <div className="relative w-full h-[260px] md:h-[280px] my-2">
              <svg viewBox="0 0 500 270" className="w-full h-full">
                {/* Background Grid Lines */}
                {[0, 2, 4, 6, 8, 10, 12, 14].map(ph => {
                  const y = 245 - (ph / 14.0) * 225;
                  return (
                    <g key={ph}>
                      <line x1="45" y1={y} x2="480" y2={y} stroke="rgba(34, 211, 238, 0.08)" strokeWidth="1" />
                      <text x="38" y={y + 3.5} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                        {ph}
                      </text>
                    </g>
                  );
                })}

                {[0, 10, 20, 30, 40, 50].map(v => {
                  const x = 45 + (v / 50.0) * 435;
                  return (
                    <g key={v}>
                      <line x1={x} y1="20" x2={x} y2="245" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="1" />
                      <text x={x} y="258" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                        {v}
                      </text>
                    </g>
                  );
                })}

                {/* Henderson-Hasselbalch Buffer Region Shade (for weak acid) */}
                {analyte.type === 'weak_acid' && (
                  <rect
                    x={45 + (1.0 / 50.0) * 435}
                    y={245 - ((analyte.pka! + 1.0) / 14.0) * 225}
                    width={(eqVolume * 0.95 / 50.0) * 435}
                    height={((2.0) / 14.0) * 225}
                    fill="rgba(245, 158, 11, 0.12)"
                    stroke="rgba(245, 158, 11, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Indicator Transition Interval Shade */}
                <rect
                  x="45"
                  y={245 - (indicator.range[1] / 14.0) * 225}
                  width="435"
                  height={((indicator.range[1] - indicator.range[0]) / 14.0) * 225}
                  fill="rgba(244, 63, 94, 0.08)"
                  stroke="rgba(244, 63, 94, 0.3)"
                  strokeWidth="1"
                />

                {/* Vertical Equivalence Line */}
                <line
                  x1={eqMarkerX}
                  y1="20"
                  x2={eqMarkerX}
                  y2="245"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* The Sigmoidal pH Curve Path */}
                <path
                  d={curvePoints.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`, '')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                />

                {/* Equivalence Point Star Marker */}
                <circle cx={eqMarkerX} cy={eqMarkerY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x={eqMarkerX + 8} y={eqMarkerY - 4} fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Eq ({eqVolume.toFixed(1)}mL, pH {eqPH.toFixed(2)})
                </text>

                {/* Live Current Reticle Pulse Marker */}
                <circle cx={currentMarkerX} cy={currentMarkerY} r="7" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-ping" />
                <circle cx={currentMarkerX} cy={currentMarkerY} r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
                
                {/* Live Point Tag */}
                <g transform={`translate(${Math.min(380, currentMarkerX + 10)}, ${Math.max(35, currentMarkerY - 10)})`}>
                  <rect x="0" y="-14" width="90" height="20" rx="4" fill="#030c1c" stroke="#22d3ee" strokeWidth="1" />
                  <text x="45" y="0" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {addedVolume.toFixed(1)}mL | pH {currentPH.toFixed(2)}
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Pedagogical Telemetry Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-cyan-900/40 text-[10px] font-mono">
              <div className="bg-[#040e1e] p-2 rounded-xl border border-cyan-950 flex flex-col">
                <span className="text-slate-400 font-bold uppercase">{isVi ? 'NỒNG ĐỘ [H⁺] / [OH⁻]' : '[H⁺] & [OH⁻] ION CONC:'}</span>
                <span className="text-cyan-300 font-bold text-xs mt-0.5">
                  [H⁺] = {Math.pow(10, -currentPH).toExponential(2)} M
                </span>
                <span className="text-emerald-400 font-bold text-xs">
                  [OH⁻] = {Math.pow(10, -(14 - currentPH)).toExponential(2)} M
                </span>
              </div>

              <div className="bg-[#040e1e] p-2 rounded-xl border border-cyan-950 flex flex-col">
                <span className="text-slate-400 font-bold uppercase">{isVi ? 'TRẠNG THÁI CHỈ THỊ MÀU' : 'INDICATOR STATUS:'}</span>
                <span className="text-white font-bold text-xs mt-0.5">
                  {currentPH < indicator.range[0] ? (isVi ? indicator.acidLabel.VN : indicator.acidLabel.EN)
                    : currentPH > indicator.range[1] ? (isVi ? indicator.baseLabel.VN : indicator.baseLabel.EN)
                    : (isVi ? 'Đang chuyển màu đổi màu' : 'Transition interval')}
                </span>
                <span className="text-slate-400 text-[9px]">
                  {isVi ? `Khoảng đổi màu: pH ${indicator.range[0]} - ${indicator.range[1]}` : `Transition: pH ${indicator.range[0]} - ${indicator.range[1]}`}
                </span>
              </div>

              <div className="bg-[#040e1e] p-2 rounded-xl border border-cyan-950 flex flex-col">
                <span className="text-slate-400 font-bold uppercase">{isVi ? 'CÔNG THỨC HÓA HỌC ÁP DỤNG' : 'APPLIED CHEMICAL LAW:'}</span>
                <span className="text-amber-300 font-bold text-[11px] mt-0.5">
                  {analyte.type === 'weak_acid' && addedVolume < eqVolume
                    ? 'pH = pKa + log([A⁻]/[HA])'
                    : 'C_A × V_A = C_B × V_B'}
                </span>
                <span className="text-slate-400 text-[9px]">
                  {analyte.type === 'weak_acid' ? (isVi ? 'Hệ đệm Henderson-Hasselbalch' : 'Buffer equilibrium') : (isVi ? 'Định luật tương đương' : 'Equivalence law')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTitrationModal;
