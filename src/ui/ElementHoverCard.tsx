import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ElementData } from '../data/PeriodicTableData';
import OrbitalBoxDiagram from './OrbitalBoxDiagram';
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

interface ElementHoverCardProps {
    element: ElementData;
    position: { x: number; y: number };
    color: string;
}

const ElementHoverCard: React.FC<ElementHoverCardProps> = ({ element, position, color }) => {
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';

    const [cardPos, setCardPos] = useState({ x: position.x + 20, y: position.y + 20 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        let newX = position.x + 24;
        let newY = position.y + 24;

        if (newX + rect.width > window.innerWidth - 16) {
            newX = Math.max(16, position.x - rect.width - 24);
        }
        
        if (newY + rect.height > window.innerHeight - 16) {
            newY = Math.max(16, position.y - rect.height - 24);
        }
        
        setCardPos({ x: newX, y: newY });
    }, [position]);

    const displayName = isVi ? (ELEMENT_VI_NAMES[element.name] || element.name) : element.name;
    const displayCat = isVi ? (CATEGORY_VI_NAMES[element.category] || element.category) : element.category;

    return createPortal(
        <div 
            ref={cardRef}
            className="fixed pointer-events-none w-84 bg-[#040c18]/95 backdrop-blur-2xl rounded-2xl p-4.5 border-2 shadow-[0_0_40px_rgba(0,0,0,0.85)] transition-all duration-75 flex flex-col gap-3.5 overflow-hidden font-sans select-none z-[99999]"
            style={{ 
                left: `${cardPos.x}px`, 
                top: `${cardPos.y}px`,
                borderColor: color,
                boxShadow: `0 0 25px ${color}35, inset 0 0 15px ${color}10`
            }}
        >
            {/* Header with 3D Holographic Spinning Atom */}
            <div className="flex items-start justify-between border-b border-cyan-900/40 pb-3 relative z-10 gap-3">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative w-12 h-12 flex items-center justify-center perspective-[600px] shrink-0">
                        <div 
                            className="absolute w-2.5 h-2.5 rounded-full animate-pulse" 
                            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}, 0 0 24px ${color}` }} 
                        />
                        <div className="absolute" style={{ transform: 'rotateX(65deg) rotateY(25deg)', transformStyle: 'preserve-3d' }}>
                            <div className="w-11 h-11 border rounded-full animate-[spin_3s_linear_infinite]" style={{ borderColor: `${color}70` }} />
                        </div>
                        <div className="absolute" style={{ transform: 'rotateX(65deg) rotateY(-45deg)', transformStyle: 'preserve-3d' }}>
                            <div className="w-11 h-11 border rounded-full animate-[spin_4s_linear_infinite_reverse]" style={{ borderColor: `${color}70` }} />
                        </div>
                        <div className="absolute" style={{ transform: 'rotateX(65deg) rotateY(85deg)', transformStyle: 'preserve-3d' }}>
                            <div className="w-11 h-11 border rounded-full animate-[spin_5s_linear_infinite]" style={{ borderColor: `${color}70` }} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 overflow-hidden">
                            <span 
                                className="text-3xl font-black font-sans leading-none shrink-0 drop-shadow-[0_0_10px_currentColor]" 
                                style={{ color }}
                            >
                                {element.symbol}
                            </span>
                            <span className="text-white font-bold text-base tracking-wider uppercase truncate">
                                {displayName}
                            </span>
                        </div>
                        <span 
                            className="inline-block text-[9px] font-mono font-bold tracking-wider uppercase mt-1 px-2 py-0.5 rounded-full border truncate"
                            style={{ 
                                borderColor: `${color}60`, 
                                color: color, 
                                backgroundColor: `${color}15` 
                            }}
                        >
                            {displayCat}
                        </span>
                    </div>
                </div>

                <div className="text-3xl font-black text-slate-600 font-mono leading-none select-none self-start shrink-0">
                    {element.atomicNumber}
                </div>
            </div>

            {/* Properties Matrix */}
            <div className="grid grid-cols-2 gap-2 relative z-10 text-xs">
                <div className="col-span-2 bg-[#061426]/80 border border-cyan-950 rounded-xl p-2.5">
                    <div className="text-slate-400 font-mono text-[9px] tracking-widest uppercase mb-0.5">
                        {isVi ? 'HÓA TRỊ / SỐ OXY HÓA' : 'VALENCY / OXIDATION STATE'}
                    </div>
                    <div className="text-white font-mono font-bold text-sm">
                        {element.valency || <span className="text-cyan-400/70">N/A</span>}
                    </div>
                </div>

                <div className="bg-[#061426]/80 border border-cyan-950 rounded-xl p-2.5">
                    <div className="text-slate-400 font-mono text-[9px] tracking-widest uppercase mb-0.5">
                        {isVi ? 'NGUYÊN TỬ KHỐI' : 'ATOMIC MASS'}
                    </div>
                    <div className="text-white font-mono font-bold text-sm">
                        {element.atomicMass.toFixed(3)} <span className="text-[9px] text-slate-500">u</span>
                    </div>
                </div>

                <div className="bg-[#061426]/80 border border-cyan-950 rounded-xl p-2.5">
                    <div className="text-slate-400 font-mono text-[9px] tracking-widest uppercase mb-0.5">
                        {isVi ? 'ĐỘ ÂM ĐIỆN' : 'ELECTRONEGATIVITY'}
                    </div>
                    <div className="text-white font-mono font-bold text-sm">
                        {element.electronegativity ? (
                            <span>{element.electronegativity.toFixed(2)}</span>
                        ) : (
                            <span className="text-rose-400/70">N/A</span>
                        )}
                    </div>
                </div>

                <div className="col-span-2 bg-[#061426]/80 border border-cyan-950 rounded-xl p-2.5 flex flex-col gap-1.5">
                    <div className="text-slate-400 font-mono text-[9px] tracking-widest uppercase">
                        {isVi ? 'CẤU HÌNH ELECTRON' : 'ELECTRON CONFIGURATION'}
                    </div>
                    <div className="text-cyan-300 font-mono text-xs tracking-wider break-words drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
                        {element.electronConfiguration}
                    </div>
                    <OrbitalBoxDiagram configuration={element.electronConfiguration} color={color} />
                </div>

                <div 
                    className="col-span-2 bg-[#061426]/60 rounded-xl p-2.5 border-l-2" 
                    style={{ borderLeftColor: color }}
                >
                    <div className="text-slate-400 font-mono text-[9px] tracking-widest uppercase mb-1">
                        {isVi ? 'DỮ LIỆU LƯỢNG TỬ' : 'QUANTUM DATABASE ENTRY'}
                    </div>
                    <div className="text-slate-300 text-xs leading-relaxed whitespace-normal break-words overflow-y-auto max-h-20 pr-1 custom-scrollbar font-sans">
                        {element.description}
                    </div>
                </div>
            </div>
            
            {/* Ambient Corner Glow */}
            <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-25 mix-blend-screen blur-xl"
                style={{ background: `radial-gradient(circle at top left, ${color}, transparent 70%)` }}
            />
        </div>,
        document.body
    );
};

export default ElementHoverCard;
