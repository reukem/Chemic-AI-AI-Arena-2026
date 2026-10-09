import React from 'react';
import { createPortal } from 'react-dom';
import { ElementData } from '../data/PeriodicTableData';
import { useSimulationStore } from '../engine/store';

const ELEMENT_VI_NAMES: Record<string, string> = {
  'Hydrogen': 'Hydro', 'Helium': 'Heli', 'Lithium': 'Liti', 'Beryllium': 'Beri',
  'Boron': 'Bo', 'Carbon': 'Cacbon', 'Nitrogen': 'Nitơ', 'Oxygen': 'Oxy',
  'Fluorine': 'Flo', 'Neon': 'Neon', 'Sodium': 'Natri', 'Magnesium': 'Magie',
  'Aluminium': 'Nhôm', 'Aluminum': 'Nhôm', 'Silicon': 'Silic', 'Phosphorus': 'Photpho',
  'Sulfur': 'Lưu huỳnh', 'Chlorine': 'Clo', 'Argon': 'Agon', 'Potassium': 'Kali',
  'Calcium': 'Canxi', 'Scandium': 'Scandi', 'Titanium': 'Titan', 'Vanadium': 'Vanadi',
  'Chromium': 'Crom', 'Manganese': 'Mangan', 'Iron': 'Sắt', 'Cobalt': 'Coban',
  'Nickel': 'Niken', 'Copper': 'Đồng', 'Zinc': 'Kẽm', 'Gallium': 'Gali',
  'Germanium': 'Gecmani', 'Arsenic': 'Asen', 'Selenium': 'Selen', 'Bromine': 'Brom',
  'Krypton': 'Krypton', 'Rubidium': 'Rubidi', 'Strontium': 'Stronti', 'Yttrium': 'Ytri',
  'Zirconium': 'Zirconi', 'Niobium': 'Niobi', 'Molybdenum': 'Molipđen', 'Technetium': 'Tecneti',
  'Ruthenium': 'Rutheni', 'Rhodium': 'Rodi', 'Palladium': 'Paladi', 'Silver': 'Bạc',
  'Cadmium': 'Cadmi', 'Indium': 'Indi', 'Tin': 'Thiếc', 'Antimony': 'Antimon',
  'Tellurium': 'Telu', 'Iodine': 'Iot', 'Xenon': 'Xenon', 'Caesium': 'Xesi', 'Cesium': 'Xesi',
  'Barium': 'Bari', 'Lanthanum': 'Lantan', 'Cerium': 'Xeri', 'Praseodymium': 'Praseođim',
  'Neodymium': 'Neođim', 'Promethium': 'Prometi', 'Samarium': 'Samari', 'Europium': 'Europi',
  'Gadolinium': 'Gađolini', 'Terbium': 'Tebi', 'Dysprosium': 'Đisprosi', 'Holmium': 'Honmi',
  'Erbium': 'Ebi', 'Thulium': 'Tuli', 'Ytterbium': 'Ytebi', 'Lutetium': 'Luteti',
  'Hafnium': 'Hafni', 'Tantalum': 'Tantan', 'Tungsten': 'Vonfram', 'Rhenium': 'Reni',
  'Osmium': 'Osmi', 'Iridium': 'Iriđi', 'Platinum': 'Bạch kim', 'Gold': 'Vàng',
  'Mercury': 'Thủy ngân', 'Thallium': 'Tali', 'Lead': 'Chì', 'Bismuth': 'Bismut',
  'Polonium': 'Poloni', 'Astatine': 'Astatin', 'Radon': 'Radon', 'Francium': 'Franxi',
  'Radium': 'Radi', 'Actinium': 'Actini', 'Thorium': 'Thori', 'Protactinium': 'Protactini',
  'Uranium': 'Urani', 'Neptunium': 'Neptuni', 'Plutonium': 'Plutoni', 'Americium': 'Americi'
};

const CATEGORY_VI_NAMES: Record<string, string> = {
  'diatomic nonmetal': 'Phi kim nhị nguyên tử',
  'noble gas': 'Khí hiếm',
  'alkali metal': 'Kim loại kiềm',
  'alkaline earth metal': 'Kim loại kiềm thổ',
  'metalloid': 'Á kim',
  'polyatomic nonmetal': 'Phi kim đa nguyên tử',
  'post-transition metal': 'Kim loại sau chuyển tiếp',
  'transition metal': 'Kim loại chuyển tiếp',
  'lanthanide': 'Họ Lantan',
  'actinide': 'Họ Actini',
  'unknown, probably transition metal': 'Kim loại chuyển tiếp (dự đoán)',
  'unknown, probably post-transition metal': 'Kim loại sau chuyển tiếp (dự đoán)',
  'unknown, probably metalloid': 'Á kim (dự đoán)',
  'unknown, predicted to be noble gas': 'Khí hiếm (dự đoán)'
};

interface Props {
    element: ElementData;
    onClose: () => void;
    color: string;
}

const getShells = (totalZ: number) => {
  let e = totalZ; 
  const shells = []; 
  const maxShells = [2, 8, 18, 32, 32, 18, 8];
  for (let max of maxShells) { 
    if (e <= 0) break; 
    shells.push(Math.min(e, max)); 
    e -= max; 
  }
  return shells;
};

import ChemicalStructureViewer from './components/ChemicalStructureViewer';

const ElementInfoModal: React.FC<Props> = ({ element, onClose, color }) => {
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
    const z = element.atomicNumber || element.number || 1;
    const shells = getShells(z);
    const [chamberMode, setChamberMode] = React.useState<'bohr' | 'lewis' | 'orbital' | 'insignia'>('bohr');

    const displayName = isVi ? (ELEMENT_VI_NAMES[element.name] || element.name) : element.name;
    const displayCat = isVi ? (CATEGORY_VI_NAMES[element.category] || element.category) : element.category;

    return createPortal(
        <div 
            onClick={onClose}
            className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl pointer-events-auto select-none font-sans cursor-pointer"
        >
            {/* Ambient Background Glows */}
            <div 
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: color }}
            />

            {/* Grand Specimen Chamber Container */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[620px] bg-gradient-to-b from-[#061426]/95 via-[#030914]/95 to-[#01040a]/95 rounded-3xl border-2 flex flex-col md:flex-row overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl cursor-default"
                style={{ borderColor: color }}
            >
                {/* Left Side: Specimen Structural Analysis Holographic Chamber */}
                <div className="w-full md:w-1/2 h-72 md:h-full border-b md:border-b-0 md:border-r border-cyan-900/40 relative bg-[#020712]/80 overflow-hidden flex flex-col items-center justify-between p-4">
                    {/* Top Mode Navigation Tabs */}
                    <div className="w-full flex items-center justify-between z-20 gap-1 pb-2 border-b border-cyan-950/60">
                        <div className="flex items-center gap-1.5 shrink-0">
                            <span 
                                className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" 
                                style={{ backgroundColor: color, color }}
                            />
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                                #{z} {element.symbol}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 bg-[#040e1e]/90 p-1 rounded-xl border border-cyan-900/50 text-[10px] font-mono font-bold">
                            <button
                                type="button"
                                onClick={() => setChamberMode('bohr')}
                                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                                    chamberMode === 'bohr' 
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.3)]' 
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                ⚛️ Bohr
                            </button>
                            <button
                                type="button"
                                onClick={() => setChamberMode('lewis')}
                                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                                    chamberMode === 'lewis' 
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.3)]' 
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                ⚡ Lewis
                            </button>
                            <button
                                type="button"
                                onClick={() => setChamberMode('orbital')}
                                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                                    chamberMode === 'orbital' 
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.3)]' 
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                📦 Ô Orbital
                            </button>
                            <button
                                type="button"
                                onClick={() => setChamberMode('insignia')}
                                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                                    chamberMode === 'insignia' 
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]' 
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                🛡️ Insignia
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Central Chamber Display */}
                    <div className="relative w-full flex-1 flex items-center justify-center overflow-visible my-auto">
                        {chamberMode === 'bohr' && (
                            <svg viewBox="-500 -500 1000 1000" className="w-full h-full max-w-[380px] max-h-[380px] overflow-visible pointer-events-none drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                                <circle cx="0" cy="0" r="45" fill={color} />
                                <circle cx="0" cy="0" r="95" fill={color} opacity="0.18" />
                                <circle cx="0" cy="0" r="16" fill="#ffffff" />
                                
                                {(() => {
                                    const baseRadius = 160;
                                    const maxRadius = 450;
                                    const spacing = shells.length > 1 ? (maxRadius - baseRadius) / (shells.length - 1) : 0;

                                    return shells.map((electronCount, i) => {
                                        const radius = shells.length === 1 ? 280 : baseRadius + (i * spacing);
                                        const duration = 18 + (i * 4);
                                        const direction = i % 2 === 0 ? 'normal' : 'reverse';
                                        
                                        return (
                                            <g key={i}>
                                                <circle 
                                                    cx="0" 
                                                    cy="0" 
                                                    r={radius} 
                                                    fill="none" 
                                                    stroke="rgba(56, 189, 248, 0.25)" 
                                                    strokeWidth="2.5" 
                                                    strokeDasharray={i % 2 === 0 ? "8 4" : "none"}
                                                />
                                                
                                                <g style={{ animation: `spinBohr ${duration}s linear infinite ${direction}`, transformOrigin: '0px 0px', willChange: 'transform' }}>
                                                    {Array.from({ length: electronCount }).map((_, eIdx) => {
                                                        const angle = (eIdx / electronCount) * Math.PI * 2;
                                                        const x = Math.cos(angle) * radius;
                                                        const y = Math.sin(angle) * radius;
                                                        return (
                                                            <g key={eIdx}>
                                                                <circle cx={x} cy={y} r="14" fill="#38bdf8" opacity="0.4" />
                                                                <circle cx={x} cy={y} r="6" fill="#ffffff" />
                                                            </g>
                                                        );
                                                    })}
                                                </g>
                                            </g>
                                        );
                                    });
                                })()}
                            </svg>
                        )}

                        {chamberMode === 'lewis' && (
                            <ChemicalStructureViewer 
                                id={element.symbol.toLowerCase()} 
                                color={color} 
                                initialMode="lewis" 
                                allowModeSwitch={false} 
                                isVi={isVi} 
                                className="border-0 bg-transparent shadow-none w-full"
                            />
                        )}

                        {chamberMode === 'orbital' && (
                            <ChemicalStructureViewer 
                                id={element.symbol.toLowerCase()} 
                                color={color} 
                                initialMode="electron" 
                                allowModeSwitch={false} 
                                isVi={isVi} 
                                className="border-0 bg-transparent shadow-none w-full"
                            />
                        )}

                        {chamberMode === 'insignia' && (
                            <ChemicalStructureViewer 
                                id={element.symbol.toLowerCase()} 
                                color={color} 
                                initialMode="insignia" 
                                allowModeSwitch={false} 
                                isVi={isVi} 
                                className="border-0 bg-transparent shadow-none w-full"
                            />
                        )}

                        <style>{`@keyframes spinBohr { 100% { transform: rotate(360deg) translateZ(0); } }`}</style>
                    </div>

                    {/* Bottom Shells Pill */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 bg-[#040d1a]/80 border border-cyan-950 px-3 py-1.5 rounded-xl z-10">
                        <span>{isVi ? `Tổng electron: ${z} e⁻` : `Total Electrons: ${z} e⁻`}</span>
                        <span className="text-cyan-300 font-bold">{shells.length} {isVi ? 'Lớp orbital (Bohr Shells)' : 'Shells'}</span>
                    </div>

                    {/* Cyber Grid Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                </div>

                {/* Right Side: Holographic Element Dossier */}
                <div className="w-full md:w-1/2 h-full p-6 md:p-8 flex flex-col relative overflow-y-auto custom-scrollbar">
                    {/* Top Insignia Box & Title */}
                    <div className="flex items-center gap-4 mb-6 border-b border-cyan-900/40 pb-5 shrink-0">
                        <div
                            className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg shrink-0 bg-[#040a16] border-2"
                            style={{ borderColor: color }}
                        >
                            <span className="text-3xl font-black text-white drop-shadow-[0_0_12px_currentColor]" style={{ color }}>
                                {element.symbol}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">
                                #{z}
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl md:text-3xl font-black text-white mb-1.5 truncate tracking-wide">
                                {displayName}
                            </h1>
                            <span 
                                className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border truncate"
                                style={{ borderColor: `${color}60`, color, backgroundColor: `${color}15` }}
                            >
                                {displayCat}
                            </span>
                        </div>
                    </div>

                    {/* Properties Matrix */}
                    <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                        <div className="bg-[#061426]/70 border border-cyan-950 rounded-xl p-3 shadow-inner">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                                {isVi ? 'SỐ HIỆU (Z)' : 'ATOMIC NUMBER'}
                            </p>
                            <p className="text-white font-mono font-bold text-base">{element.atomicNumber}</p>
                        </div>

                        <div className="bg-[#061426]/70 border border-cyan-950 rounded-xl p-3 shadow-inner">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                                {isVi ? 'NGUYÊN TỬ KHỐI' : 'ATOMIC MASS'}
                            </p>
                            <p className="text-cyan-200 font-mono font-bold text-base">{element.atomicMass} <span className="text-xs text-slate-500 font-normal">u</span></p>
                        </div>

                        <div className="bg-[#061426]/70 border border-cyan-950 rounded-xl p-3 shadow-inner">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                                {isVi ? 'NHÓM / CHU KỲ' : 'GROUP / PERIOD'}
                            </p>
                            <p className="text-white font-mono font-bold text-base">{element.group || '-'} / {element.period}</p>
                        </div>

                        <div className="bg-[#061426]/70 border border-cyan-950 rounded-xl p-3 shadow-inner">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mb-0.5">
                                {isVi ? 'ĐỘ ÂM ĐIỆN' : 'ELECTRONEGATIVITY'}
                            </p>
                            <p className="text-cyan-200 font-mono font-bold text-base">{element.electronegativity ? element.electronegativity.toFixed(2) : 'N/A'}</p>
                        </div>

                        <div className="col-span-2 bg-[#061426]/70 border border-cyan-950 rounded-xl p-3 shadow-inner">
                            <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mb-1">
                                {isVi ? 'CẤU HÌNH ELECTRON' : 'ELECTRON CONFIGURATION'}
                            </p>
                            <p className="text-cyan-300 font-mono text-xs tracking-wider break-words">
                                {element.electronConfiguration}
                            </p>
                        </div>
                    </div>

                    {/* Database Description */}
                    <div className="bg-[#061426]/50 border border-cyan-950 rounded-2xl p-4 flex-1 flex flex-col min-h-[100px] mb-4">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5 block">
                            💡 {isVi ? 'Từ Điển Bách Khoa Lượng Tử' : 'Quantum Encyclopedia Entry'}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed overflow-y-auto custom-scrollbar pr-1 font-sans">
                            {element.description}
                        </p>
                    </div>

                    {/* Bottom Close Action */}
                    <div className="mt-auto pt-2 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95"
                        >
                            {isVi ? 'Trở Về Bàn Thí Nghiệm ➔' : 'Return to Workbench ➔'}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ElementInfoModal;
