import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrganicTokenData } from '../../data/organicSandboxData';
import { audioManager } from '../../engine/AudioManager';
import lucyFacePFP from '../../assets/lucy_FACE_PFP_clean.png';

interface MolecularCardModalProps {
  compound: OrganicTokenData | null;
  isOpen: boolean;
  onClose: () => void;
  onSpawnOnBoard?: (compound: OrganicTokenData) => void;
  isVi: boolean;
}

export const MolecularCardModal: React.FC<MolecularCardModalProps> = ({
  compound,
  isOpen,
  onClose,
  onSpawnOnBoard,
  isVi
}) => {
  if (!isOpen || !compound) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl pointer-events-auto font-sans select-none">
        {/* Backdrop click dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[560px] bg-gradient-to-b from-[#08182b] via-[#04101e] to-[#020710] border-2 border-cyan-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(6,182,212,0.35)] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Ambient rim light */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-cyan-900/50 mb-5">
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-lg shrink-0"
                style={{ 
                  backgroundColor: `${compound.color}20`,
                  borderColor: compound.color 
                }}
              >
                <span className="font-black text-xl font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  {compound.displaySymbol}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold uppercase tracking-wider">
                    {compound.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {compound.formula}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-wide">
                  {isVi ? compound.vietnameseName : compound.name}
                </h2>
                {compound.iupacName && (
                  <p className="text-xs font-mono text-slate-400">
                    IUPAC: <span className="text-cyan-300 font-semibold">{compound.iupacName}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => { audioManager.playClick(); onClose(); }}
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              ✕
            </button>
          </div>

          {/* Structural Formula Display */}
          {compound.structuralFormula && (
            <div className="mb-5 p-4 rounded-2xl bg-[#020712] border border-cyan-950 shadow-inner flex flex-col items-center justify-center gap-1.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 font-bold">
                {isVi ? 'CẤU TRÚC PHÂN TỬ // 2D' : 'MOLECULAR STRUCTURE // 2D'}
              </span>
              <div className="font-mono text-xl md:text-2xl font-black text-cyan-200 tracking-widest drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                {compound.structuralFormula}
              </div>
            </div>
          )}

          {/* Description & Uses */}
          <div className="space-y-3.5 mb-6 text-xs leading-relaxed text-slate-200">
            <div>
              <span className="font-mono font-bold text-cyan-400 text-[11px] block uppercase tracking-wider mb-1">
                {isVi ? '✦ ĐẶC TÍNH HÓA HỌC' : '✦ CHEMICAL PROFILE'}
              </span>
              <p className="bg-[#051324]/60 p-3 rounded-xl border border-cyan-900/30">
                {isVi ? compound.vietnameseDescription : compound.description}
              </p>
            </div>

            {(compound.uses || compound.vietnameseUses) && (
              <div>
                <span className="font-mono font-bold text-emerald-400 text-[11px] block uppercase tracking-wider mb-1">
                  {isVi ? '✦ ỨNG DỤNG THỰC TIỄN' : '✦ REAL-WORLD APPLICATIONS'}
                </span>
                <p className="bg-[#051324]/60 p-3 rounded-xl border border-emerald-900/30 text-emerald-100">
                  {isVi ? compound.vietnameseUses : compound.uses}
                </p>
              </div>
            )}
          </div>

          {/* Lucy Commentary Box */}
          {(compound.trivia || compound.vietnameseTrivia) && (
            <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-purple-950/40 border border-purple-800/40 flex items-center gap-3">
              <img 
                src={lucyFacePFP} 
                alt="Lucy" 
                className="w-10 h-10 rounded-full border border-purple-400 object-cover shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-wider text-purple-300 font-bold block">
                  {isVi ? 'GHI CHÚ CỦA GS. LUCY' : 'PROF. LUCY\'S LAB NOTE'}
                </span>
                <p className="text-[11px] text-slate-200 italic font-sans">
                  "{isVi ? compound.vietnameseTrivia : compound.trivia}"
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {onSpawnOnBoard && (
              <button
                onClick={() => {
                  audioManager.playClick();
                  onSpawnOnBoard(compound);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>➕</span>
                <span>{isVi ? 'Đưa lên bàn thí nghiệm' : 'Spawn onto Workbench'}</span>
              </button>
            )}

            <button
              onClick={() => { audioManager.playClick(); onClose(); }}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-98 cursor-pointer"
            >
              {isVi ? 'Đóng' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
