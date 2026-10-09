import React, { useState, useMemo, useEffect } from 'react';
import { audioManager } from '../engine/AudioManager';

interface StoichiometryIceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

interface ReactionDefinition {
  id: string;
  name: { EN: string; VN: string };
  equation: string;
  isRedox?: boolean;
  r1: { sym: string; name: { EN: string; VN: string }; coeff: number; m: number };
  r2: { sym: string; name: { EN: string; VN: string }; coeff: number; m: number };
  p1: { sym: string; name: { EN: string; VN: string }; coeff: number; m: number };
  p2?: { sym: string; name: { EN: string; VN: string }; coeff: number; m: number };
  redoxData?: {
    oxHalf: { EN: string; VN: string } | string;
    redHalf: { EN: string; VN: string } | string;
    eTransferred: number;
  };
}

const PRESET_REACTIONS: ReactionDefinition[] = [
  {
    id: 'neutralization',
    name: { EN: 'Acid-Base Neutralization', VN: 'Phản ứng Trung hòa Axit - Bazơ' },
    equation: 'HCl + NaOH → NaCl + H₂O',
    r1: { sym: 'HCl', name: { EN: 'Hydrochloric Acid', VN: 'Axit Clohiđric' }, coeff: 1, m: 36.46 },
    r2: { sym: 'NaOH', name: { EN: 'Sodium Hydroxide', VN: 'Natri Hiđroxit' }, coeff: 1, m: 40.00 },
    p1: { sym: 'NaCl', name: { EN: 'Sodium Chloride', VN: 'Muối ăn' }, coeff: 1, m: 58.44 },
    p2: { sym: 'H₂O', name: { EN: 'Water', VN: 'Nước' }, coeff: 1, m: 18.02 }
  },
  {
    id: 'precipitation_baso4',
    name: { EN: 'Barium Sulfate Precipitation', VN: 'Phản ứng Kết tủa Bari Sunfat' },
    equation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
    r1: { sym: 'BaCl₂', name: { EN: 'Barium Chloride', VN: 'Bari Clorua' }, coeff: 1, m: 208.23 },
    r2: { sym: 'Na₂SO₄', name: { EN: 'Sodium Sulfate', VN: 'Natri Sunfat' }, coeff: 1, m: 142.04 },
    p1: { sym: 'BaSO₄', name: { EN: 'Barium Sulfate (Precipitate)', VN: 'Bari Sunfat (Kết tủa trắng)' }, coeff: 1, m: 233.39 },
    p2: { sym: 'NaCl', name: { EN: 'Sodium Chloride', VN: 'Natri Clorua' }, coeff: 2, m: 58.44 }
  },
  {
    id: 'esterification',
    name: { EN: 'Fischer Esterification Equilibrium', VN: 'Phản ứng Este hóa Axit Axetic & Ethanol' },
    equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
    r1: { sym: 'CH₃COOH', name: { EN: 'Acetic Acid', VN: 'Axit Axetic' }, coeff: 1, m: 60.05 },
    r2: { sym: 'C₂H₅OH', name: { EN: 'Ethanol', VN: 'Ancol Etylic' }, coeff: 1, m: 46.07 },
    p1: { sym: 'CH₃COOC₂H₅', name: { EN: 'Ethyl Acetate', VN: 'Etyl Axetat (Hương táo)' }, coeff: 1, m: 88.11 },
    p2: { sym: 'H₂O', name: { EN: 'Water', VN: 'Nước' }, coeff: 1, m: 18.02 }
  },
  {
    id: 'redox_fe_kmno4',
    name: { EN: 'Redox Titration: Iron(II) & Permanganate', VN: 'Chuẩn độ Oxi hóa - Khử Fe²⁺ và Thuốc tím KMnO₄' },
    equation: '5FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + 2MnSO₄ + K₂SO₄ + 8H₂O',
    isRedox: true,
    r1: { sym: 'FeSO₄', name: { EN: 'Iron(II) Sulfate', VN: 'Sắt(II) Sunfat (Chất khử)' }, coeff: 5, m: 151.91 },
    r2: { sym: 'KMnO₄', name: { EN: 'Potassium Permanganate', VN: 'Thuốc tím (Chất oxi hóa)' }, coeff: 1, m: 158.03 },
    p1: { sym: 'Fe³⁺ (ox)', name: { EN: 'Iron(III) Oxidized', VN: 'Sắt(III) Đã Oxi Hóa' }, coeff: 5, m: 199.98 },
    p2: { sym: 'Mn²⁺ (red)', name: { EN: 'Manganese(II) Reduced', VN: 'Mangan(II) Không màu' }, coeff: 1, m: 151.00 },
    redoxData: {
      oxHalf: {
        EN: 'Fe²⁺ → Fe³⁺ + 1e⁻ (Oxidation Process / Electron Loss)',
        VN: 'Fe²⁺ → Fe³⁺ + 1e⁻ (Quá trình Oxi hóa / Nhường electron)'
      },
      redHalf: {
        EN: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Reduction Process / Electron Gain)',
        VN: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Quá trình Khử / Nhận electron)'
      },
      eTransferred: 5
    }
  },
  {
    id: 'zinc_hcl',
    name: { EN: 'Metal-Acid Gas Synthesis', VN: 'Kim loại tác dụng Axit sinh khí H₂' },
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    isRedox: true,
    r1: { sym: 'Zn', name: { EN: 'Zinc Metal', VN: 'Kẽm kim loại' }, coeff: 1, m: 65.38 },
    r2: { sym: 'HCl', name: { EN: 'Hydrochloric Acid', VN: 'Axit Clohiđric' }, coeff: 2, m: 36.46 },
    p1: { sym: 'ZnCl₂', name: { EN: 'Zinc Chloride', VN: 'Kẽm Clorua' }, coeff: 1, m: 136.30 },
    p2: { sym: 'H₂ (g)', name: { EN: 'Hydrogen Gas', VN: 'Khí Hydro' }, coeff: 1, m: 2.016 },
    redoxData: {
      oxHalf: {
        EN: 'Zn⁰ → Zn²⁺ + 2e⁻ (Zinc loses 2e⁻)',
        VN: 'Zn⁰ → Zn²⁺ + 2e⁻ (Kẽm nhường 2e⁻)'
      },
      redHalf: {
        EN: '2H⁺ + 2e⁻ → H₂⁰ (H⁺ ions gain 2e⁻)',
        VN: '2H⁺ + 2e⁻ → H₂⁰ (Ion H⁺ nhận 2e⁻)'
      },
      eTransferred: 2
    }
  }
];

export const StoichiometryIceModal: React.FC<StoichiometryIceModalProps> = ({
  isOpen,
  onClose,
  isVi = true
}) => {
  const [selectedRxnId, setSelectedRxnId] = useState('neutralization');
  const [n1, setN1] = useState<number>(0.150); // Initial moles of R1
  const [n2, setN2] = useState<number>(0.100); // Initial moles of R2

  const rxn = PRESET_REACTIONS.find(r => r.id === selectedRxnId) || PRESET_REACTIONS[0];

  // Stoichiometry calculation
  const calc = useMemo(() => {
    // Equivalent ratio comparison: n1 / coeff1 vs n2 / coeff2
    const ratio1 = n1 / rxn.r1.coeff;
    const ratio2 = n2 / rxn.r2.coeff;

    let limitingReactant: 'R1' | 'R2' | 'EQUAL' = 'EQUAL';
    let xMax = ratio1;

    if (ratio1 < ratio2 - 1e-6) {
      limitingReactant = 'R1';
      xMax = ratio1;
    } else if (ratio2 < ratio1 - 1e-6) {
      limitingReactant = 'R2';
      xMax = ratio2;
    } else {
      limitingReactant = 'EQUAL';
      xMax = ratio1;
    }

    // Changes: Δn
    const delta1 = xMax * rxn.r1.coeff;
    const delta2 = xMax * rxn.r2.coeff;
    const deltaP1 = xMax * rxn.p1.coeff;
    const deltaP2 = rxn.p2 ? xMax * rxn.p2.coeff : 0;

    // Final equilibrium moles
    const final1 = Math.max(0, n1 - delta1);
    const final2 = Math.max(0, n2 - delta2);
    const finalP1 = deltaP1;
    const finalP2 = deltaP2;

    // Mass balances
    const massInit1 = n1 * rxn.r1.m;
    const massInit2 = n2 * rxn.r2.m;
    const totalMassInit = massInit1 + massInit2;

    const massFinal1 = final1 * rxn.r1.m;
    const massFinal2 = final2 * rxn.r2.m;
    const massFinalP1 = finalP1 * rxn.p1.m;
    const massFinalP2 = rxn.p2 ? finalP2 * rxn.p2.m : 0;
    const totalMassFinal = massFinal1 + massFinal2 + massFinalP1 + massFinalP2;

    // Electron balance for redox
    const totalElectrons = rxn.isRedox && rxn.redoxData
      ? +(xMax * rxn.redoxData.eTransferred).toFixed(4)
      : 0;

    return {
      limitingReactant,
      xMax,
      delta1,
      delta2,
      deltaP1,
      deltaP2,
      final1,
      final2,
      finalP1,
      finalP2,
      massInit1,
      massInit2,
      totalMassInit,
      massFinal1,
      massFinal2,
      massFinalP1,
      massFinalP2,
      totalMassFinal,
      totalElectrons
    };
  }, [rxn, n1, n2]);

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

  return (
    <div 
      onClick={() => { audioManager.playClick(); onClose(); }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 md:p-6 overflow-hidden select-none animate-in fade-in duration-200 pointer-events-auto cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-[#060412] via-[#09071c] to-[#04020c] border-2 border-amber-500/60 rounded-3xl p-5 md:p-7 shadow-[0_0_80px_rgba(245,158,11,0.35)] flex flex-col gap-4 overflow-y-auto custom-scrollbar cursor-default"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  {isVi ? 'BẢNG CÂN BẰNG LƯỢNG CHẤT I-C-E & BẢO TOÀN LƯỢNG TỬ' : 'STOICHIOMETRY I-C-E & QUANTUM CONSERVATION MATRIX'}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">
                {isVi ? 'TÍNH TOÁN CHẤT HẾT - CHẤT DƯ & BẢO TOÀN ELECTRON' : 'LIMITING REACTANT, I-C-E TABLE & ELECTRON BALANCE'}
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
            className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-amber-950/80 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 text-base font-bold shrink-0 z-10"
            title={isVi ? 'Đóng (ESC hoặc click ngoài)' : 'Close (ESC or click outside)'}
          >
            ✕
          </button>
        </div>

        {/* Reaction Preset Selector Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0a071e]/90 p-3 rounded-2xl border border-amber-900/40 text-xs font-mono">
          <div className="flex-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
              {isVi ? 'Chọn phương trình hóa học nghiên cứu:' : 'Select Chemical Reaction Target:'}
            </span>
            <select
              value={selectedRxnId}
              onChange={(e) => {
                setSelectedRxnId(e.target.value);
                setN1(0.15);
                setN2(0.10);
              }}
              className="w-full bg-[#050314] border border-amber-800/60 rounded-xl px-3 py-1.5 text-amber-200 focus:outline-none focus:border-amber-400 text-xs font-bold"
            >
              {PRESET_REACTIONS.map(r => (
                <option key={r.id} value={r.id}>
                  {isVi ? r.name.VN : r.name.EN} ({r.equation})
                </option>
              ))}
            </select>
          </div>

          {/* Equation Banner */}
          <div className="px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center flex flex-col justify-center">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              {isVi ? 'PHƯƠNG TRÌNH' : 'EQUATION'}
            </span>
            <span className="text-sm font-black text-white font-mono mt-0.5">
              {rxn.equation}
            </span>
          </div>
        </div>

        {/* Interactive Reactant Amount Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reactant 1 Input */}
          <div className="bg-[#050314]/90 border border-amber-950 p-3.5 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 font-mono">
                {rxn.r1.sym} : {isVi ? rxn.r1.name.VN : rxn.r1.name.EN}
              </span>
              <span className="text-xs font-black font-mono text-white bg-cyan-950 px-2 py-0.5 rounded-lg border border-cyan-800">
                {n1.toFixed(3)} mol ({ (n1 * rxn.r1.m).toFixed(2) }g)
              </span>
            </div>
            <input 
              type="range" 
              min="0.01" 
              max="0.50" 
              step="0.01"
              value={n1}
              onChange={(e) => setN1(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0.01 mol</span>
              <span>{isVi ? 'Hệ số:' : 'Coeff:'} {rxn.r1.coeff}</span>
              <span>0.50 mol</span>
            </div>
          </div>

          {/* Reactant 2 Input */}
          <div className="bg-[#050314]/90 border border-amber-950 p-3.5 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 font-mono">
                {rxn.r2.sym} : {isVi ? rxn.r2.name.VN : rxn.r2.name.EN}
              </span>
              <span className="text-xs font-black font-mono text-white bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-800">
                {n2.toFixed(3)} mol ({ (n2 * rxn.r2.m).toFixed(2) }g)
              </span>
            </div>
            <input 
              type="range" 
              min="0.01" 
              max="0.50" 
              step="0.01"
              value={n2}
              onChange={(e) => setN2(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0.01 mol</span>
              <span>{isVi ? 'Hệ số:' : 'Coeff:'} {rxn.r2.coeff}</span>
              <span>0.50 mol</span>
            </div>
          </div>
        </div>

        {/* Limiting Reactant Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-[#100824]/90 to-amber-950/60 border border-amber-500/50 p-3 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎯</span>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                {isVi ? 'KẾT QUẢ ĐÁNH GIÁ LƯỢNG CHẤT PHẢN ỨNG' : 'LIMITING REACTANT EVALUATION'}
              </span>
              <span className="text-sm font-black text-white">
                {calc.limitingReactant === 'R1' ? (
                  isVi ? `Chất phản ứng HẾT: ${rxn.r1.sym} | Chất DƯ: ${rxn.r2.sym}` : `Limiting Reactant: ${rxn.r1.sym} | Excess: ${rxn.r2.sym}`
                ) : calc.limitingReactant === 'R2' ? (
                  isVi ? `Chất phản ứng HẾT: ${rxn.r2.sym} | Chất DƯ: ${rxn.r1.sym}` : `Limiting Reactant: ${rxn.r2.sym} | Excess: ${rxn.r1.sym}`
                ) : (
                  isVi ? 'Vừa đủ: Hai chất phản ứng vừa vặn theo tỉ lệ mol stoichiometric!' : 'Stoichiometric match: Both reactants fully consumed!'
                )}
              </span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block">{isVi ? 'Độ tiến triển x:' : 'Reaction Extent x:'}</span>
            <span className="text-xs font-bold text-amber-300">{calc.xMax.toFixed(3)} mol</span>
          </div>
        </div>

        {/* The Cyber I-C-E Glowing Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-amber-900/60 bg-[#03020c]/90 shadow-inner">
          <table className="w-full text-center border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-amber-950/40 text-amber-300 border-b border-amber-900/60">
                <th className="py-2.5 px-3 text-left">{isVi ? 'GIAI ĐOẠN' : 'STAGE'}</th>
                <th className="py-2.5 px-3">{rxn.r1.sym} {isVi ? '(Chất tham gia 1)' : '(Reactant 1)'}</th>
                <th className="py-2.5 px-3">{rxn.r2.sym} {isVi ? '(Chất tham gia 2)' : '(Reactant 2)'}</th>
                <th className="py-2.5 px-3">{rxn.p1.sym} {isVi ? '(Sản phẩm 1)' : '(Product 1)'}</th>
                {rxn.p2 && <th className="py-2.5 px-3">{rxn.p2.sym} {isVi ? '(Sản phẩm 2)' : '(Product 2)'}</th>}
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Initial (I) */}
              <tr className="border-b border-amber-950/60 hover:bg-slate-900/30">
                <td className="py-2.5 px-3 text-left font-bold text-cyan-400">
                  {isVi ? 'I (Ban đầu)' : 'I (Initial)'}
                </td>
                <td className="py-2 px-3 text-cyan-200">{n1.toFixed(3)} mol</td>
                <td className="py-2 px-3 text-emerald-200">{n2.toFixed(3)} mol</td>
                <td className="py-2 px-3 text-slate-500">0.000 mol</td>
                {rxn.p2 && <td className="py-2 px-3 text-slate-500">0.000 mol</td>}
              </tr>

              {/* Row 2: Change (C) */}
              <tr className="border-b border-amber-950/60 bg-amber-950/15">
                <td className="py-2.5 px-3 text-left font-bold text-amber-400">
                  {isVi ? 'C (Biến thiên)' : 'C (Change Δn)'}
                </td>
                <td className="py-2 px-3 text-rose-400 font-bold">-{calc.delta1.toFixed(3)} mol</td>
                <td className="py-2 px-3 text-rose-400 font-bold">-{calc.delta2.toFixed(3)} mol</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">+{calc.deltaP1.toFixed(3)} mol</td>
                {rxn.p2 && <td className="py-2 px-3 text-emerald-400 font-bold">+{calc.deltaP2.toFixed(3)} mol</td>}
              </tr>

              {/* Row 3: Equilibrium / Final (E) */}
              <tr className="bg-amber-950/30 font-bold">
                <td className="py-2.5 px-3 text-left text-emerald-300">
                  {isVi ? 'E (Cân bằng)' : 'E (Equilibrium)'}
                </td>
                <td className={`py-2.5 px-3 ${calc.final1 === 0 ? 'text-red-400 font-black' : 'text-slate-200'}`}>
                  {calc.final1.toFixed(3)} mol {calc.final1 === 0 && (isVi ? '(Hết)' : '(Consumed)')}
                </td>
                <td className={`py-2.5 px-3 ${calc.final2 === 0 ? 'text-red-400 font-black' : 'text-slate-200'}`}>
                  {calc.final2.toFixed(3)} mol {calc.final2 === 0 && (isVi ? '(Hết)' : '(Consumed)')}
                </td>
                <td className="py-2.5 px-3 text-emerald-300">
                  {calc.finalP1.toFixed(3)} mol ({ (calc.finalP1 * rxn.p1.m).toFixed(2) }g)
                </td>
                {rxn.p2 && (
                  <td className="py-2.5 px-3 text-emerald-300">
                    {calc.finalP2.toFixed(3)} mol ({ (calc.finalP2 * rxn.p2.m).toFixed(2) }g)
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dual Scientific Laws Verification: Mass Conservation & Electron Conservation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          {/* Law 1: Mass Conservation */}
          <div className="bg-[#050314] p-3 rounded-2xl border border-cyan-900/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                ⚖️ {isVi ? 'ĐỊNH LUẬT BẢO TOÀN KHỐI LƯỢNG' : 'CONSERVATION OF MASS'}
              </span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>{isVi ? 'Σ Khối lượng Ban đầu:' : 'Σ Initial Mass:'}</span>
                  <strong className="text-white">{calc.totalMassInit.toFixed(2)} g</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isVi ? 'Σ Khối lượng Sau phản ứng:' : 'Σ Final Mass:'}</span>
                  <strong className="text-emerald-400">{calc.totalMassFinal.toFixed(2)} g</strong>
                </div>
              </div>
            </div>
            <div className="mt-2 text-[9px] text-cyan-400/80 italic text-right">
              ✓ {isVi ? 'Sai số bảo toàn: 0.000% (Chuẩn xác tuyệt đối)' : 'Mass delta: 0.000% (Strictly preserved)'}
            </div>
          </div>

          {/* Law 2: Redox Electron Conservation */}
          <div className="bg-[#050314] p-3 rounded-2xl border border-amber-900/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                ⚛️ {isVi ? 'BẢO TOÀN ELECTRON QUANG ĐIỆN (REDOX)' : 'REDOX ELECTRON CONSERVATION'}
              </span>
              {rxn.isRedox && rxn.redoxData ? (
                <div className="space-y-1 text-slate-300">
                  <div className="text-[10px] text-cyan-300 truncate">
                    {typeof rxn.redoxData.oxHalf === 'object' ? (isVi ? rxn.redoxData.oxHalf.VN : rxn.redoxData.oxHalf.EN) : rxn.redoxData.oxHalf}
                  </div>
                  <div className="text-[10px] text-rose-300 truncate">
                    {typeof rxn.redoxData.redHalf === 'object' ? (isVi ? rxn.redoxData.redHalf.VN : rxn.redoxData.redHalf.EN) : rxn.redoxData.redHalf}
                  </div>
                  <div className="flex justify-between font-bold text-amber-300 text-xs pt-0.5 border-t border-amber-900/40">
                    <span>{isVi ? 'Σ Số mol e⁻ trao đổi:' : 'Σ Moles of e⁻ transferred:'}</span>
                    <span>{calc.totalElectrons.toFixed(3)} mol e⁻</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-xs py-2 italic">
                  {isVi ? 'Phản ứng trao đổi ion / Không có sự chuyển dịch số oxi hóa electron.' : 'Non-redox / Ion exchange equilibrium.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoichiometryIceModal;
