import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../engine/store';
import * as RAW_REGISTRY from '../data/ChemicalRegistry';
import { getSubstanceStructureProfile } from '../data/ChemicalStructureData';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const ATOMIC_DATA: Record<string, { z: number, m: number, v?: string }> = {
  'H': { z: 1, m: 1.008, v: '+1, -1' }, 'He': { z: 2, m: 4.0026, v: '0' }, 'Li': { z: 3, m: 6.94, v: '+1' }, 'Be': { z: 4, m: 9.0122, v: '+2' },
  'B': { z: 5, m: 10.81, v: '+3' }, 'C': { z: 6, m: 12.011, v: '-4, +2, +4' }, 'N': { z: 7, m: 14.007, v: '-3, +1..+5' }, 'O': { z: 8, m: 15.999, v: '-2' },
  'F': { z: 9, m: 18.998, v: '-1' }, 'Ne': { z: 10, m: 20.180, v: '0' }, 'Na': { z: 11, m: 22.990, v: '+1' }, 'Mg': { z: 12, m: 24.305, v: '+2' },
  'Al': { z: 13, m: 26.982, v: '+3' }, 'Si': { z: 14, m: 28.085, v: '-4, +4' }, 'P': { z: 15, m: 30.974, v: '-3, +3, +5' }, 'S': { z: 16, m: 32.06, v: '-2, +4, +6' },
  'Cl': { z: 17, m: 35.45, v: '-1, +1..+7' }, 'Ar': { z: 18, m: 39.95, v: '0' }, 'K': { z: 19, m: 39.098, v: '+1' }, 'Ca': { z: 20, m: 40.078, v: '+2' },
  'Fe': { z: 26, m: 55.845, v: '+2, +3' }, 'Co': { z: 27, m: 58.933, v: '+2, +3' }, 'Ni': { z: 28, m: 58.693, v: '+2' }, 'Cu': { z: 29, m: 63.546, v: '+1, +2' },
  'Zn': { z: 30, m: 65.38, v: '+2' }, 'Br': { z: 35, m: 79.904, v: '-1, +1..+5' }, 'Rb': { z: 37, m: 85.468, v: '+1' }, 'Ag': { z: 47, m: 107.87, v: '+1' },
  'I': { z: 53, m: 126.90, v: '-1, +1..+7' }, 'Cs': { z: 55, m: 132.91, v: '+1' }, 'Ba': { z: 56, m: 137.33, v: '+2' }, 'Au': { z: 79, m: 196.97, v: '+1, +3' },
  'Pb': { z: 82, m: 207.2, v: '+2, +4' }
};

const INORGANIC_EXPANSION = [
  { 
    id: 'H2', formula: 'H₂ (g)', 
    name: { EN: 'Hydrogen Gas', VN: 'Khí Hydro' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Lightest, most abundant element. Highly combustible diatomic gas.', 
      VN: 'Nguyên tố nhẹ nhất, phổ biến nhất trong vũ trụ. Khí không màu, dễ cháy.' 
    }, 
    color: '#38bdf8' 
  },
  { 
    id: 'He', formula: 'He (g)', 
    name: { EN: 'Helium', VN: 'Heli' }, 
    category: 'NOBLE_GAS', 
    desc: { 
      EN: 'Inert, monatomic noble gas with lowest boiling point of any element.', 
      VN: 'Khí trơ đơn nguyên tử, nhiệt độ sôi thấp nhất trong tất cả các nguyên tố.' 
    }, 
    color: '#c084fc' 
  },
  { 
    id: 'C', formula: 'C (s)', 
    name: { EN: 'Carbon', VN: 'Cacbon' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Fundamental basis of organic life, exists as graphite and diamond.', 
      VN: 'Nền tảng của sự sống hữu cơ, tồn tại dưới dạng than chì và kim cương.' 
    }, 
    color: '#94a3b8' 
  },
  { 
    id: 'N2', formula: 'N₂ (g)', 
    name: { EN: 'Nitrogen Gas', VN: 'Khí Nitơ' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Makes up 78% of Earth’s atmosphere, bonded with extremely strong triple bond.', 
      VN: 'Chiếm 78% bầu khí quyển, liên kết ba bền vững bậc nhất.' 
    }, 
    color: '#60a5fa' 
  },
  { 
    id: 'O2', formula: 'O₂ (g)', 
    name: { EN: 'Oxygen Gas', VN: 'Khí Oxy' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Essential life-supporting gas, powerful oxidizing agent in combustion.', 
      VN: 'Khí duy trì hô hấp và sự sống, chất oxy hóa mạnh trong phản ứng cháy.' 
    }, 
    color: '#38bdf8' 
  },
  { 
    id: 'F2', formula: 'F₂ (g)', 
    name: { EN: 'Fluorine Gas', VN: 'Khí Flo' }, 
    category: 'HALOGEN', 
    desc: { 
      EN: 'Extremely reactive, poisonous pale-yellow halogen gas.', 
      VN: 'Khí halogen màu vàng nhạt, có độ âm điện cao nhất và tính oxy hóa cực mạnh.' 
    }, 
    color: '#a3e635' 
  },
  { 
    id: 'Ne', formula: 'Ne (g)', 
    name: { EN: 'Neon', VN: 'Neon' }, 
    category: 'NOBLE_GAS', 
    desc: { 
      EN: 'Inert noble gas emitting intense reddish-orange luminescence in discharge tubes.', 
      VN: 'Khí hiếm trơ phát ra ánh sáng đỏ cam rực rỡ khi phóng điện.' 
    }, 
    color: '#f472b6' 
  },
  { 
    id: 'Si', formula: 'Si (s)', 
    name: { EN: 'Silicon', VN: 'Silic' }, 
    category: 'METALLOID', 
    desc: { 
      EN: 'Semiconducting crystalline metalloid, cornerstone of modern computer chips.', 
      VN: 'Á kim bán dẫn dạng tinh thể, trái tim của ngành vi mạch bán dẫn.' 
    }, 
    color: '#94a3b8' 
  },
  { 
    id: 'P', formula: 'P (s)', 
    name: { EN: 'Phosphorus', VN: 'Photpho' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Highly reactive non-metal found in DNA backbones and fertilizers.', 
      VN: 'Phi kim dễ phản ứng, thành phần cốt lõi trong DNA, ATP và phân bón.' 
    }, 
    color: '#fb923c' 
  },
  { 
    id: 'S', formula: 'S (s)', 
    name: { EN: 'Sulfur', VN: 'Lưu huỳnh' }, 
    category: 'PURE_NONMETAL', 
    desc: { 
      EN: 'Bright yellow crystalline non-metal forming sulfuric acid and vulcanized rubber.', 
      VN: 'Chất rắn kết tinh màu vàng tươi, dùng sản xuất axit sunfuric và lưu hóa cao su.' 
    }, 
    color: '#facc15' 
  },
  { 
    id: 'Ar', formula: 'Ar (g)', 
    name: { EN: 'Argon', VN: 'Argon' }, 
    category: 'NOBLE_GAS', 
    desc: { 
      EN: 'Inert gas widely utilized as a protective shielding atmosphere in welding.', 
      VN: 'Khí trơ phổ biến thứ 3 trong khí quyển, dùng làm khí bảo vệ khi hàn kim loại.' 
    }, 
    color: '#c084fc' 
  }
];

const parseFormula = (rawFormula: string) => {
  const cleanBase = rawFormula.split(' ')[0].replace(/\([a-z]+\)/gi, '');
  const subs: Record<string, string> = { '₀':'0', '₁':'1', '₂':'2', '₃':'3', '₄':'4', '₅':'5', '₆':'6', '₇':'7', '₈':'8', '₉':'9' };
  let normalized = cleanBase.replace(/[₀-₉]/g, m => subs[m]);
  normalized = normalized.replace(/\(([A-Za-z0-9]+)\)(\d+)/g, (_, inner, mult) => {
    return inner.replace(/([A-Z][a-z]*)(\d*)/g, (_2: string, elem: string, count: string) => `${elem}${(count ? parseInt(count) : 1) * parseInt(mult)}`);
  });
  normalized = normalized.replace(/[^A-Za-z0-9]/g, '');
  
  let mass = 0, z = 0, atomCount = 0, elemTypes = 0, primaryElem = '';
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  while ((match = regex.exec(normalized)) !== null) {
    const elem = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    if (elemTypes === 0) primaryElem = elem;
    elemTypes++; atomCount += count;
    if (ATOMIC_DATA[elem]) { 
      mass += ATOMIC_DATA[elem].m * count; 
      z += ATOMIC_DATA[elem].z * count; 
    }
  }
  return { mass, z, atomCount, isCompound: elemTypes > 1, primaryElem, valence: ATOMIC_DATA[primaryElem]?.v || '' };
};

const getCategoryTheme = (cat: string) => {
  const str = String(cat).toLowerCase().replace(/_/g, ' ');
  if (str.includes('strong acid') || str.includes('axit mạnh')) {
    return {
      border: 'border-red-500/50 hover:border-red-400',
      text: 'text-red-400',
      bg: 'bg-red-950/25',
      glow: 'rgba(239,68,68,0.3)',
      pill: 'bg-red-500/20 text-red-300 border-red-500/40'
    };
  }
  if (str.includes('weak acid') || str.includes('axit yếu')) {
    return {
      border: 'border-orange-500/50 hover:border-orange-400',
      text: 'text-orange-400',
      bg: 'bg-orange-950/25',
      glow: 'rgba(249,115,22,0.3)',
      pill: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
    };
  }
  if (str.includes('strong base') || str.includes('alkali') || str.includes('bazơ mạnh')) {
    return {
      border: 'border-blue-500/50 hover:border-blue-400',
      text: 'text-blue-400',
      bg: 'bg-blue-950/25',
      glow: 'rgba(59,130,246,0.3)',
      pill: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    };
  }
  if (str.includes('weak base') || str.includes('bazơ yếu')) {
    return {
      border: 'border-sky-500/50 hover:border-sky-400',
      text: 'text-sky-400',
      bg: 'bg-sky-950/25',
      glow: 'rgba(14,165,233,0.3)',
      pill: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
    };
  }
  if (str.includes('noble gas') || str.includes('khí hiếm')) {
    return {
      border: 'border-purple-500/50 hover:border-purple-400',
      text: 'text-purple-300',
      bg: 'bg-purple-950/25',
      glow: 'rgba(168,85,247,0.3)',
      pill: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    };
  }
  if (str.includes('pure') || str.includes('metalloid')) {
    return {
      border: 'border-cyan-500/50 hover:border-cyan-400',
      text: 'text-cyan-300',
      bg: 'bg-cyan-950/25',
      glow: 'rgba(6,182,212,0.3)',
      pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    };
  }
  if (str.includes('metal') || str.includes('kim loại')) {
    return {
      border: 'border-amber-500/50 hover:border-amber-400',
      text: 'text-amber-300',
      bg: 'bg-amber-950/25',
      glow: 'rgba(245,158,11,0.3)',
      pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    };
  }
  if (str.includes('halogen') || str.includes('phi kim') || str.includes('nonmetal')) {
    return {
      border: 'border-emerald-500/50 hover:border-emerald-400',
      text: 'text-emerald-300',
      bg: 'bg-emerald-950/25',
      glow: 'rgba(16,185,129,0.3)',
      pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    };
  }
  return {
    border: 'border-cyan-500/40 hover:border-cyan-400',
    text: 'text-cyan-300',
    bg: 'bg-slate-900/60',
    glow: 'rgba(34,211,238,0.25)',
    pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  };
};

const translateCategory = (cat: string, lang: string) => {
  const isVi = String(lang).toLowerCase().includes('v');
  const clean = String(cat).toUpperCase().replace(/_/g, ' ');
  if (!isVi) return clean;
  const viMap: Record<string, string> = {
    'ALL': 'TẤT CẢ', 'PURE NONMETAL': 'PHI KIM', 'NOBLE GAS': 'KHÍ HIẾM', 
    'ALKALI METAL': 'KIM LOẠI KIỀM', 'ALKALINE EARTH METAL': 'KIM LOẠI KIỀM THỔ', 
    'METALLOID': 'Á KIM', 'HALOGEN': 'HALOGEN', 'TRANSITION METAL': 'KIM LOẠI CHUYỂN TIẾP', 
    'TRANSITION METAL SALT': 'MUỐI CHUYỂN TIẾP', 'STRONG ACID': 'AXIT MẠNH', 
    'WEAK ACID': 'AXIT YẾU', 'STRONG BASE': 'BAZƠ MẠNH', 'WEAK BASE': 'BAZƠ YẾU', 
    'SOLVENT': 'DUNG MÔI', 'INDICATOR': 'CHẤT CHỈ THỊ', 'PRECIPITATE': 'KẾT TỦA', 'SALT': 'MUỐI'
  };
  return viMap[clean] || clean;
};

const ScientificVisualizer: React.FC<{ formula: string, colorStr?: string, defaultColorTheme: any, language: string }> = ({ 
  formula, 
  colorStr, 
  defaultColorTheme, 
  language 
}) => {
  const { z } = parseFormula(formula);
  const displayZ = z > 0 ? Math.min(z, 54) : 6;

  const getShells = (totalZ: number) => {
    let e = totalZ; 
    const shells = []; 
    const maxShells = [2, 8, 18, 32, 18, 8];
    for (let max of maxShells) { 
      if (e <= 0) break; 
      shells.push(Math.min(e, max)); 
      e -= max; 
    }
    return shells;
  };

  const glowColor = defaultColorTheme.glow || '#22d3ee';

  return (
    <div className="relative flex flex-col items-center justify-center h-60 w-full bg-[#050b17]/90 rounded-2xl border border-cyan-900/40 overflow-hidden shadow-inner flex-shrink-0">
      {/* Top Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
          {language === 'vi' ? `MÔ HÌNH LƯỢNG TỬ (MẪU BOHR • ${displayZ} e⁻)` : `QUANTUM BOHR MODEL (${displayZ} e⁻)`}
        </span>
      </div>

      {/* SVG Multi-shell Orbital Engine */}
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
        <svg viewBox="-160 -160 320 320" className="w-full h-full max-w-[260px] max-h-[260px] overflow-visible pointer-events-none">
          {/* Luminous Nucleus */}
          <circle cx="0" cy="0" r="18" fill="url(#nucleusGlow)" />
          <circle cx="0" cy="0" r="8" fill="#ffffff" />
          <defs>
            <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor={glowColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dynamic Shells */}
          {getShells(displayZ).map((electronCount, i) => {
            const radius = 32 + (i * 20);
            const duration = 10 + (i * 5);
            const direction = i % 2 === 0 ? 'normal' : 'reverse';

            return (
              <g key={i}>
                {/* Orbital Ring Track */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={radius} 
                  fill="none" 
                  stroke="rgba(56, 189, 248, 0.2)" 
                  strokeWidth="1.2" 
                  strokeDasharray={i % 2 === 0 ? "4 2" : "none"}
                />
                
                {/* Orbiting Electrons Group */}
                <g style={{ animation: `spinBohr ${duration}s linear infinite ${direction}`, transformOrigin: '0px 0px' }}>
                  {Array.from({ length: electronCount }).map((_, eIdx) => {
                    const angle = (eIdx / electronCount) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <g key={eIdx}>
                        {/* Glowing halo */}
                        <circle cx={x} cy={y} r="4.5" fill="#38bdf8" opacity="0.4" />
                        {/* Core electron */}
                        <circle cx={x} cy={y} r="2" fill="#ffffff" />
                      </g>
                    );
                  })}
                </g>
              </g>
            );
          })}
        </svg>
        <style>{`@keyframes spinBohr { 100% { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
    </div>
  );
};

const getFormulaStyle = (formula: string) => {
  const clean = formula.split(' ')[0];
  const len = clean.length;
  if (len <= 3) return 'text-xl md:text-2xl';
  if (len <= 5) return 'text-base md:text-lg';
  if (len <= 7) return 'text-xs md:text-sm';
  if (len <= 10) return 'text-[10px] md:text-xs tracking-tighter';
  return 'text-[9px] md:text-[10px] tracking-tighter break-all';
};

const getDossierFormulaStyle = (formula: string) => {
  const clean = formula.split(' ')[0];
  const len = clean.length;
  if (len <= 4) return 'text-3xl';
  if (len <= 7) return 'text-xl';
  if (len <= 10) return 'text-base';
  if (len <= 13) return 'text-xs tracking-tighter break-all';
  return 'text-[10px] tracking-tighter break-all';
};

export default function ReagentDatabase({ onBack }: { onBack: () => void }) {
  const language = useSimulationStore(state => state.language || state.locale || state.lang || 'en');
  const isVi = String(language).toLowerCase().includes('v');
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getLocalString = (raw: any, lang: string) => {
    const isVi = String(lang).toLowerCase().includes('v');
    if (!raw) return '';
    if (typeof raw === 'object' && !Array.isArray(raw)) {
      if (isVi) {
        return String(raw.VN || raw.vn || raw.vi || raw.EN || raw.en || Object.values(raw)[0] || '');
      } else {
        return String(raw.EN || raw.en || Object.values(raw)[0] || '');
      }
    }
    let result = String(raw);
    if (result.includes(' / ')) {
      const parts = result.split(' / ');
      result = isVi && parts.length > 1 ? parts[1].trim() : parts[0].trim();
    }
    if (isVi) {
      const dict: Record<string, string> = {
        'Helium': 'Heli', 'Nitrogen Gas': 'Khí Nitơ', 'Oxygen Gas': 'Khí Oxy', 
        'Fluorine Gas': 'Khí Flo', 'Silicon': 'Silic', 'Phosphorus': 'Photpho', 
        'Sulfur': 'Lưu huỳnh', 'Argon': 'Argon', 'Distilled Water': 'Nước Cất',
        'Inert, monatomic gas.': 'Khí trơ, đơn nguyên tử.', 'Lightest, most abundant element.': 'Nguyên tố nhẹ nhất, phổ biến nhất.'
      };
      for (const [en, vn] of Object.entries(dict)) {
        if (result.includes(en)) result = result.replace(en, vn);
      }
    }
    return result;
  };

  const allReagents = useMemo(() => {
    try {
      const flatList: any[] = [];
      const extractChems = (node: any) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) node.forEach(extractChems);
        else if (node.ID || node.id || node.Formula || node.Name || node.name) flatList.push(node);
        else Object.values(node).forEach(extractChems);
      };
      extractChems(RAW_REGISTRY);
      
      // Auto-inject inorganic elements
      if (typeof INORGANIC_EXPANSION !== 'undefined') {
        INORGANIC_EXPANSION.forEach(elem => {
          if (!flatList.find(c => c.ID === elem.id || c.id === elem.id)) {
            flatList.push({
              id: elem.id, 
              Formula: elem.formula, 
              Name: elem.name, 
              ReactionClass: elem.category, 
              Behavior: elem.desc, 
              Color: `(${elem.color})`
            });
          }
        });
      }

      return flatList.map((item: any) => {
        const formulaStr = getLocalString(item?.Formula || item?.formula, 'en') || '?';
        const rawClass = String(item?.ReactionClass || item?.reactionClass || '');
        const catStr = translateCategory(getLocalString(item?.ReactionClass || item?.reactionClass, language) || 'Uncategorized', language);
        const { z, mass, atomCount } = parseFormula(formulaStr);
        
        return {
          id: item?.ID || item?.id || Math.random().toString(),
          formula: formulaStr,
          name: getLocalString(item?.Name || item?.name, language) || 'Unknown',
          category: catStr,
          rawClass: rawClass,
          desc: getLocalString(item?.Description || item?.description || item?.Behavior || item?.State, language) || 'No data available.',
          pH: item?.pH !== undefined ? Number(item.pH) : undefined,
          color: getLocalString(item?.Color || item?.color, language),
          z,
          mass,
          atomCount
        };
      }).sort((a, b) => {
        const getWeight = (cat: string) => {
          const s = String(cat).toUpperCase();
          if (s.includes('PURE') || s.includes('NONMETAL') || s.includes('NOBLE')) return 1;
          if (s.includes('ALKALI') || s.includes('EARTH')) return 2;
          if (s.includes('METALLOID') || s.includes('HALOGEN')) return 3;
          if (s.includes('METAL') && !s.includes('SALT')) return 4;
          if (s.includes('SOLVENT')) return 5;
          if (s.includes('STRONG_ACID')) return 6;
          if (s.includes('WEAK_ACID')) return 7;
          if (s.includes('STRONG_BASE')) return 8;
          if (s.includes('WEAK_BASE')) return 9;
          if (s.includes('SALT') || s.includes('TRANSITION')) return 10;
          if (s.includes('INDICATOR')) return 11;
          if (s.includes('PRECIPITATE')) return 12;
          return 13;
        };
        
        const wA = getWeight(a.rawClass);
        const wB = getWeight(b.rawClass);
        if (wA !== wB) return wA - wB;
        if (a.z !== b.z && a.z > 0 && b.z > 0) return a.z - b.z;
        if (a.mass !== b.mass) return a.mass - b.mass;
        return a.formula.localeCompare(b.formula);
      });
    } catch (e) { return []; }
  }, [language]);

  const categories = ['All', ...Array.from(new Set(allReagents.map(r => r.category)))];
  const [selected, setSelected] = useState(allReagents[0] || null);

  const filteredReagents = useMemo(() => {
    return allReagents.filter((c: any) => {
      const matchesCat = activeCat === 'All' || c.category === activeCat;
      if (!matchesCat) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.formula.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [allReagents, activeCat, searchQuery]);

  return (
    <div className="absolute inset-0 bg-[#040813] text-white flex flex-col p-4 md:p-6 z-[200] overflow-hidden font-sans select-none backdrop-blur-3xl">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="relative z-10 flex flex-col gap-4 mb-4 w-full max-w-[1680px] mx-auto flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <div className="w-full h-full bg-[#070e1e] rounded-2xl flex items-center justify-center font-mono font-bold text-lg text-cyan-300">
                ⚛
              </div>
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {isVi ? 'HỆ THỐNG LƯỢNG TỬ : TỪ ĐIỂN HOÁ CHẤT' : 'QUANTUM ENGINE : REAGENT CODEX'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {isVi ? 'Hệ thống tra cứu phân tử & phản ứng lượng tử' : 'Interactive Quantum Molecular & Reagent Database'}
              </p>
            </div>
          </div>

          <button 
            onClick={onBack} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-mono tracking-widest uppercase transition-all shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span>←</span>
            <span>{isVi ? 'QUAY LẠI' : 'RETURN / ESC'}</span>
          </button>
        </div>
        
        {/* Filter Pills & Search Ribbon */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 w-full bg-[#070f1e]/80 p-2.5 rounded-2xl border border-cyan-900/40 backdrop-blur-xl shadow-xl">
          <div className="flex gap-1.5 overflow-x-auto custom-scrollbar flex-1 w-full items-center px-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold mr-2 uppercase tracking-wider">
              {isVi ? 'Phân loại:' : 'Filters:'}
            </span>
            {categories.map(cat => {
              const theme = getCategoryTheme(String(cat));
              const isActive = activeCat === String(cat);
              return (
                <button 
                  key={String(cat)} 
                  onClick={() => setActiveCat(String(cat))} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl transition-all whitespace-nowrap border ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.3)] font-bold' 
                      : 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-600'}`} />
                  {translateCategory(String(cat), language)}
                </button>
              );
            })}
          </div>

          <div className="relative w-full xl:w-72 flex-shrink-0">
            <input 
              type="text" 
              placeholder={isVi ? 'Tìm kiếm phân tử, ký hiệu...' : 'Search chemical or symbol...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050b16] border border-cyan-900/50 text-cyan-200 pl-4 pr-9 py-2 rounded-xl focus:outline-none focus:border-cyan-400 text-xs font-mono transition-all shadow-inner placeholder:text-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Grid + Right Holographic Dossier */}
      <div className="relative z-10 flex flex-col md:flex-row flex-1 gap-6 w-full max-w-[1680px] mx-auto min-h-0">
        
        {/* Left: Futuristic Dense Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5">
            {filteredReagents.map((chem: any) => {
              const { z, mass, isCompound } = parseFormula(chem.formula);
              const isSelected = selected?.id === chem.id;
              const theme = getCategoryTheme(chem.rawClass || chem.category);

              return (
                <motion.button 
                  key={chem.id} 
                  onClick={() => setSelected(chem)} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square rounded-2xl p-1.5 md:p-2 flex flex-col items-center justify-between transition-all border overflow-hidden ${theme.border} ${
                    isSelected 
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] ring-2 ring-cyan-400/50 z-10' 
                      : 'bg-[#071120]/75 hover:bg-[#0a182e] border-opacity-40 backdrop-blur-md'
                  }`}
                >
                  {/* Top Row: Z and Mass */}
                  <div className="w-full flex justify-between items-center text-[9px] md:text-[10px] font-mono opacity-70 leading-none">
                    <span>{!isCompound && z > 0 ? z : ''}</span>
                    <span>{mass > 0 ? mass.toFixed(1) : ''}</span>
                  </div>

                  {/* Main Symbol - Dynamic Sizing & Clamped */}
                  <div className="w-full flex-1 flex items-center justify-center min-h-0 px-1 overflow-hidden">
                    <span className={`font-black text-center text-white drop-shadow-md max-w-full leading-tight select-none ${getFormulaStyle(chem.formula)}`}>
                      {chem.formula.split(' ')[0]}
                    </span>
                  </div>

                  {/* Chemical Name */}
                  <span className="text-[8px] md:text-[9px] font-mono text-slate-300 truncate w-full text-center px-0.5 opacity-80 leading-none">
                    {chem.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Holographic Dossier Panel */}
        <div className="w-full md:w-[420px] xl:w-[460px] flex-shrink-0 flex flex-col">
          {selected && (() => {
            const { mass, z, valence, isCompound } = parseFormula(selected.formula);
            const theme = getCategoryTheme(selected.rawClass || selected.category);

            return (
              <div className="border border-cyan-800/40 rounded-3xl bg-gradient-to-b from-[#08152a]/95 via-[#050e1c]/95 to-[#03070f]/95 flex flex-col relative shadow-2xl h-full overflow-hidden backdrop-blur-2xl">
                <motion.div 
                  key={selected.id} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.25 }} 
                  className="flex flex-col h-full p-6"
                >
                  {/* Top Insignia Header */}
                  <div className="flex items-center gap-4 mb-5 flex-shrink-0">
                    <div className={`relative w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg flex-shrink-0 bg-[#040a16] p-2 overflow-hidden ${theme.border}`}>
                      {!isCompound && z > 0 && <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-cyan-400 leading-none">{z}</span>}
                      {mass > 0 && <span className="absolute bottom-1.5 text-[9px] font-mono text-slate-400 leading-none">{mass.toFixed(2)}</span>}
                      <span className={`font-black text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] text-center max-w-full leading-tight ${getDossierFormulaStyle(selected.formula)}`}>
                        {selected.formula.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl font-black text-white mb-1.5 truncate tracking-wide">
                        {selected.name}
                      </h1>
                      <div className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 inline-flex items-center gap-1.5 rounded-lg border ${theme.pill}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {translateCategory(selected.rawClass || selected.category, language)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Scrollable Data Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
                    {/* Overview Text */}
                    <div className="bg-[#071120]/70 border border-slate-800 rounded-2xl p-3.5">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                        {isVi ? 'TỔNG QUAN HÓA HỌC' : 'CHEMICAL OVERVIEW'}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selected.desc}
                      </p>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {mass > 0 && (
                        <div className="bg-[#050d1a] p-3 rounded-xl border border-slate-800/80 shadow-inner">
                          <div className="text-slate-400 text-[9px] font-mono tracking-widest mb-0.5 uppercase">
                            {isVi ? 'KHỐI LƯỢNG MOL' : 'MOLAR MASS'}
                          </div>
                          <div className="text-sm text-cyan-200 font-mono font-bold">
                            {mass.toFixed(3)} <span className="text-[10px] text-slate-500">g/mol</span>
                          </div>
                        </div>
                      )}

                      {z > 0 && (
                        <div className="bg-[#050d1a] p-3 rounded-xl border border-slate-800/80 shadow-inner">
                          <div className="text-slate-400 text-[9px] font-mono tracking-widest mb-0.5 uppercase">
                            {isVi ? (isCompound ? 'TỔNG ELECTRON' : 'SỐ HIỆU (Z)') : (isCompound ? 'TOTAL ELECTRONS' : 'ATOMIC NUMBER')}
                          </div>
                          <div className="text-sm text-cyan-200 font-mono font-bold">
                            {isCompound ? `${z} e⁻` : `Z = ${z}`}
                          </div>
                        </div>
                      )}

                      {!isCompound && valence && (
                        <div className="bg-[#050d1a] p-3 rounded-xl border border-slate-800/80 shadow-inner">
                          <div className="text-slate-400 text-[9px] font-mono tracking-widest mb-0.5 uppercase">
                            {isVi ? 'SỐ OXY HÓA' : 'OXIDATION STATES'}
                          </div>
                          <div className="text-sm text-cyan-200 font-mono font-bold">
                            {valence}
                          </div>
                        </div>
                      )}

                      {selected.pH !== undefined && (
                        <div className="bg-[#050d1a] p-3 rounded-xl border border-slate-800/80 shadow-inner">
                          <div className="text-slate-400 text-[9px] font-mono tracking-widest mb-0.5 uppercase">
                            pH VALUE
                          </div>
                          <div className="text-sm text-cyan-200 font-mono font-bold">
                            {Number(selected.pH).toFixed(1)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quantum Bohr Visualizer */}
                    <ScientificVisualizer 
                      formula={selected.formula} 
                      colorStr={selected.color} 
                      defaultColorTheme={theme} 
                      language={language} 
                    />

                    {/* Scientific Cấu hình Electron & Công thức Cấu tạo Dossier */}
                    {(() => {
                      const structureProfile = getSubstanceStructureProfile(selected.id, selected.formula, z, isCompound, isVi);

                      const renderLatex = (latex: string) => {
                        try {
                          return katex.renderToString(latex, {
                            throwOnError: false,
                            displayMode: false
                          });
                        } catch (e) {
                          return latex;
                        }
                      };

                      return (
                        <div className="space-y-3 pt-1">
                          {/* 1. Cấu hình Electron (Electron Configuration) */}
                          <div className="bg-[#050d1a] p-3.5 rounded-2xl border border-cyan-900/50 shadow-inner space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                                <span className="text-xs">⚛</span>
                                <span>{isVi ? 'CẤU HÌNH ELECTRON' : 'ELECTRON CONFIGURATION'}</span>
                              </span>
                              {structureProfile.electronConfig.nobleGas && (
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 font-bold">
                                  {isVi ? 'CHUẨN IUPAC' : 'IUPAC STANDARD'}
                                </span>
                              )}
                            </div>

                            {/* Main Configuration with high-legibility styling */}
                            <div className="p-2.5 rounded-xl bg-[#030812] border border-cyan-950/80 font-mono text-xs font-bold text-cyan-200 tracking-wide select-text shadow-inner break-words">
                              {isVi ? structureProfile.electronConfig.full.VN : structureProfile.electronConfig.full.EN}
                            </div>

                            {/* Ionic / Breakdown Breakdown if compound */}
                            {structureProfile.electronConfig.ions && (
                              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/25 border border-emerald-900/40 p-2 rounded-xl select-text">
                                <span className="text-[9px] text-emerald-400 font-bold uppercase block mb-0.5">
                                  {isVi ? 'PHÂN LỚP ELECTRON THEO ION' : 'IONIC ELECTRON SHELLS'}
                                </span>
                                {isVi ? structureProfile.electronConfig.ions.VN : structureProfile.electronConfig.ions.EN}
                              </div>
                            )}

                            {structureProfile.electronConfig.nobleGas && (
                              <div className="text-[10px] font-mono text-slate-400 bg-slate-950/40 border border-slate-900 px-2 py-1 rounded-lg select-text">
                                {isVi ? structureProfile.electronConfig.nobleGas.VN : structureProfile.electronConfig.nobleGas.EN}
                              </div>
                            )}
                          </div>

                          {/* 2. Công thức cấu tạo & Liên kết (Structural Formula & Bonding) */}
                          <div className="bg-[#050d1a] p-3.5 rounded-2xl border border-purple-900/40 shadow-inner space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                                <span className="text-xs">⬡</span>
                                <span>{isVi ? 'CÔNG THỨC CẤU TẠO // 2D' : 'STRUCTURAL FORMULA // 2D'}</span>
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/80 text-purple-300 font-bold">
                                {isVi ? structureProfile.bondType.VN.split('(')[0].trim() : structureProfile.bondType.EN.split('(')[0].trim()}
                              </span>
                            </div>

                            {/* 2D Structural Formula Centerpiece with LaTeX Graphical Display */}
                            <div className="py-4 px-5 rounded-2xl bg-gradient-to-br from-[#06152a] via-[#040e1d] to-[#020712] border border-cyan-500/30 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden group">
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)] pointer-events-none" />

                              {/* Rendered LaTeX Formula with Glowing Gradient Typography */}
                              <div 
                                className="relative z-10 text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.6)] py-1.5 px-3 select-text flex items-center justify-center [&_.katex]:font-bold [&_.katex]:text-cyan-200 [&_.mrel]:text-cyan-300 [&_.mbin]:text-purple-300"
                                dangerouslySetInnerHTML={{ __html: renderLatex(structureProfile.latexFormula) }}
                              />

                              {/* Clean text representation */}
                              <span className="relative z-10 font-mono text-xs font-bold text-cyan-400/80 mt-1 select-text tracking-wider">
                                {structureProfile.plainFormula}
                              </span>

                              {/* Strictly localized geometry note */}
                              <span className="relative z-10 text-[11px] font-sans font-medium text-slate-300 mt-1 select-text">
                                {isVi ? structureProfile.geometry.VN : structureProfile.geometry.EN}
                              </span>
                            </div>

                            {/* Detailed Chemical Bonding Description */}
                            <div className="text-[11px] text-slate-300 bg-[#071324]/60 border border-cyan-950 p-2.5 rounded-xl flex items-start gap-2">
                              <span className="text-cyan-400 font-bold mt-0.5">✦</span>
                              <div className="flex-1">
                                <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase block mb-0.5">
                                  {isVi ? 'BẢN CHẤT LIÊN KẾT HÓA HỌC' : 'CHEMICAL BOND NATURE'}
                                </span>
                                <span className="text-xs text-slate-200 select-text leading-relaxed">
                                  {isVi ? structureProfile.bondType.VN : structureProfile.bondType.EN}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
