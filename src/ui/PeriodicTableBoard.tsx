import React, { useState } from 'react';
import { PERIODIC_TABLE_DATA, ElementData } from '../data/PeriodicTableData';
import ElementInfoModal from './ElementInfoModal';
import ElementHoverCard from './ElementHoverCard';
import { audioManager } from '../engine/AudioManager';
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

const CATEGORY_BORDER_COLORS: Record<string, string> = {
    'diatomic nonmetal': '#22d3ee',
    'noble gas': '#a78bfa',
    'alkali metal': '#f87171',
    'alkaline earth metal': '#fb923c',
    'metalloid': '#84cc16',
    'polyatomic nonmetal': '#34d399',
    'post-transition metal': '#60a5fa',
    'transition metal': '#facc15',
    'lanthanide': '#f472b6',
    'actinide': '#e879f9',
    'unknown, probably transition metal': '#9ca3af',
    'unknown, probably post-transition metal': '#9ca3af',
    'unknown, probably metalloid': '#9ca3af',
    'unknown, predicted to be noble gas': '#9ca3af',
};

const ElementTile = React.memo(({ element, isSelected, isVi, onClick, onMouseEnter, onMouseMove, onMouseLeave }: any) => {
  let col = element.xpos || element.group || 1;
  let row = element.ypos || element.period || 1;
  
  if (!element.xpos) {
    if (element.category?.toLowerCase().includes('lanthanide') || (element.number >= 57 && element.number <= 71)) {
      row = 9; col = (element.number - 57) + 4;
    } else if (element.category?.toLowerCase().includes('actinide') || (element.number >= 89 && element.number <= 103)) {
      row = 10; col = (element.number - 89) + 4;
    }
  }

  const borderColor = element.color || '#475569';
  const displayName = isVi ? (ELEMENT_VI_NAMES[element.name] || element.name) : element.name;

  return (
    <button 
      onClick={() => onClick(element)}
      onMouseEnter={(e) => onMouseEnter(element, e)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative flex flex-col items-center justify-between border rounded-xl transition-all duration-150 will-change-transform overflow-hidden ${
        isSelected 
          ? 'bg-cyan-950/90 z-20 scale-125 ring-2 ring-cyan-300 border-opacity-100 shadow-[0_0_20px_currentColor]' 
          : 'bg-[#071322]/85 border-opacity-40 hover:scale-[1.18] hover:z-10 hover:bg-[#0d223a] hover:border-opacity-100 hover:shadow-[0_0_15px_currentColor]'
      } min-w-[3rem] min-h-[3.8rem] sm:min-w-[3.4rem] sm:min-h-[4.2rem] md:min-w-[3.8rem] md:min-h-[4.8rem] p-1.5`}
      style={{ 
        gridColumn: col, 
        gridRow: row,
        borderColor: borderColor, 
        color: borderColor
      }}
    >
      {/* Atomic Number */}
      <span className="absolute top-1 left-1.5 text-[0.55rem] sm:text-[0.65rem] font-mono font-bold opacity-80 leading-none">
        {element.atomicNumber || element.number}
      </span>
      
      {/* Main Symbol */}
      <span className="text-base sm:text-lg md:text-xl font-black mt-1 text-white drop-shadow-[0_0_6px_currentColor]">
        {element.symbol}
      </span>
      
      {/* Full Name */}
      <span className="text-[0.35rem] sm:text-[0.45rem] md:text-[0.5rem] w-full text-center px-0.5 opacity-80 mt-auto mb-0.5 leading-tight truncate text-slate-200">
        {displayName}
      </span>
    </button>
  );
}, (prevProps: any, nextProps: any) => {
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.element === nextProps.element &&
         prevProps.isVi === nextProps.isVi;
});

const PeriodicTableBoard: React.FC = () => {
    const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
    const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
    const [isMinimized, setIsMinimized] = useState(true);
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';

    const handleElementClick = React.useCallback((element: ElementData) => {
        audioManager.playClick();
        setSelectedElement(element);
    }, []);

    const handleElementMouseEnter = React.useCallback((element: ElementData, e: React.MouseEvent) => {
        setHoveredElement(element);
        setHoverPosition({ x: e.clientX, y: e.clientY });
    }, []);

    const handleElementMouseMove = React.useCallback((e: React.MouseEvent) => {
        setHoverPosition({ x: e.clientX, y: e.clientY });
    }, []);

    const handleElementMouseLeave = React.useCallback(() => {
        setHoveredElement(null);
    }, []);

    return (
        <>
            {isMinimized ? (
                /* Sleek floating button positioned right beside the w-80 left dock without overlap */
                <button
                    onClick={() => { audioManager.playClick(); setIsMinimized(false); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="absolute top-4 left-4 md:left-[340px] z-30 pointer-events-auto flex items-center gap-2.5 bg-[#050e1c]/90 hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 px-4 py-2.5 rounded-2xl text-xs text-cyan-300 hover:text-white font-mono font-bold shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all cursor-pointer tracking-wider uppercase backdrop-blur-xl group active:scale-95"
                >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                    <span>{isVi ? 'BẢNG TUẦN HOÀN' : 'PERIODIC TABLE'}</span>
                    <span className="text-cyan-500 group-hover:translate-x-0.5 transition-transform">➔</span>
                </button>
            ) : (
                /* Holographic Board Container */
                <div className="absolute top-4 left-4 md:left-[340px] right-6 z-30 flex items-start justify-start opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-[0.45] sm:scale-[0.52] md:scale-[0.58] lg:scale-[0.62] xl:scale-[0.68] origin-top-left">
                    <div className="pointer-events-auto relative w-full bg-[#040914]/95 p-5 rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col items-center">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center w-full mb-3 border-b border-cyan-900/40 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                    <div className="w-full h-full bg-[#070e1e] rounded-xl flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                                        ⚛
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-sm font-black text-white tracking-widest uppercase bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                                        {isVi ? 'BẢNG TUẦN HOÀN CÁC NGUYÊN TỐ' : 'PERIODIC TABLE OF ELEMENTS'}
                                    </h1>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        {isVi ? 'Hệ thống tuần hoàn hóa học chuẩn IUPAC' : 'Interactive Standard IUPAC Formulation'}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => { audioManager.playClick(); setIsMinimized(true); }}
                                onMouseEnter={() => audioManager.playHover()}
                                className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-mono font-bold px-3.5 py-1.5 border border-cyan-900 hover:border-cyan-400 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 transition-all cursor-pointer uppercase shadow-sm"
                            >
                                <span>{isVi ? 'THU GỌN' : 'MINIMIZE'}</span>
                                <span>✕</span>
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1.5 sm:gap-2 w-full min-w-[1000px] max-w-[1500px] mx-auto p-3 pb-8 custom-scrollbar overflow-x-auto">
                            {PERIODIC_TABLE_DATA.map((element) => {
                                const elementWithColor = {
                                    ...element,
                                    number: element.atomicNumber,
                                    color: CATEGORY_BORDER_COLORS[element.category] || '#9ca3af'
                                };
                                return (
                                    <ElementTile
                                        key={element.atomicNumber}
                                        element={elementWithColor}
                                        isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                                        isVi={isVi}
                                        onClick={handleElementClick}
                                        onMouseEnter={handleElementMouseEnter}
                                        onMouseMove={handleElementMouseMove}
                                        onMouseLeave={handleElementMouseLeave}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Hover card */}
            {hoveredElement && (
                <ElementHoverCard 
                    element={hoveredElement} 
                    position={hoverPosition}
                    color={CATEGORY_BORDER_COLORS[hoveredElement.category] || '#22d3ee'}
                />
            )}

            {/* Detailed modal when clicked */}
            {selectedElement && (
                <ElementInfoModal 
                    element={selectedElement}
                    onClose={() => setSelectedElement(null)}
                    color={CATEGORY_BORDER_COLORS[selectedElement.category] || '#22d3ee'}
                />
            )}
        </>
    );
};

export default PeriodicTableBoard;
