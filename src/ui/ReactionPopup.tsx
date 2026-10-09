import React, { useEffect, useState } from 'react';
import { useSimulationStore } from '../engine/store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { audioManager } from '../engine/AudioManager';
import { ReactionMechanismModal } from './ReactionMechanismModal';
import { StoichiometryIceModal } from './StoichiometryIceModal';

const ReactionPopup: React.FC = () => {
    const pendingReaction = useSimulationStore(state => state.pendingReaction);
    const resolvePendingReaction = useSimulationStore(state => state.resolvePendingReaction);
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN' || language === 'vi';

    const [isMechOpen, setIsMechOpen] = useState(false);
    const [isIceOpen, setIsIceOpen] = useState(false);

    const handleDismiss = () => {
        try {
            audioManager.playClick();
        } catch (e) {
            console.warn(e);
        } finally {
            resolvePendingReaction();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMechOpen || isIceOpen) return;
            if (pendingReaction && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
                e.preventDefault();
                handleDismiss();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pendingReaction, resolvePendingReaction, isMechOpen, isIceOpen]);

    if (!pendingReaction) return null;

    const r0 = CHEMICAL_REGISTRY[pendingReaction.reactants?.[0]];
    const r1 = CHEMICAL_REGISTRY[pendingReaction.reactants?.[1]];
    const prod = CHEMICAL_REGISTRY[pendingReaction.product];

    const equationText = isVi 
        ? (pendingReaction.equation?.VN || `${r0?.formula || ''} + ${r1?.formula || ''} → ${prod?.formula || ''}`)
        : (pendingReaction.equation?.EN || `${r0?.formula || ''} + ${r1?.formula || ''} → ${prod?.formula || ''}`);

    const reactionType = isVi
        ? (pendingReaction.reactionType?.VN || 'Phản Ứng Tỏa Nhiệt Mãnh Liệt')
        : (pendingReaction.reactionType?.EN || 'Critical Exothermic Event');

    const mechanism = isVi
        ? (pendingReaction.mechanism?.VN || pendingReaction.message?.VN || '')
        : (pendingReaction.mechanism?.EN || pendingReaction.message?.EN || '');

    return (
        <div 
            onClick={(e) => { /* Critical hazard modal requires explicit acknowledgement, not backdrop dismissal */ }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto p-4 overflow-hidden select-none animate-in fade-in duration-200"
        >
            {/* Blinding Screen Flash */}
            <div className="fixed inset-0 bg-red-600/20 pointer-events-none animate-pulse" />

            {/* Cyber Hazard Modal Container */}
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#140608]/98 via-[#0c0406]/98 to-[#060204]/98 border-2 border-red-500/70 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(239,68,68,0.45),inset_0_0_35px_rgba(239,68,68,0.2)] overflow-hidden">
                
                {/* Ambient Red Reactor Core Glow */}
                <div className="absolute -top-24 -right-24 w-56 h-56 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* Top Cybernetic Status Banner */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-red-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-red-950/90 border border-red-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <span className="text-xl animate-bounce">⚠️</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping" />
                                <span className="text-red-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'CẢNH BÁO: CRITICAL REACTION // NGUY HIỂM' : 'CRITICAL REACTION // LAB HAZARD PROTOCOL'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {reactionType}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-600/60 text-red-300 font-mono text-[10px] font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] uppercase">
                            {pendingReaction.temperatureSpike ? `+${pendingReaction.temperatureSpike}°C ΔT` : 'EXOTHERMIC'}
                        </span>
                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="w-8 h-8 rounded-full bg-red-950/80 hover:bg-rose-950 border border-red-700/60 hover:border-red-400 text-red-300 hover:text-white flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
                            title={isVi ? 'Bỏ qua' : 'Dismiss'}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Balanced Chemical Stoichiometry Plate */}
                <div className="relative z-10 bg-[#060204]/90 border border-red-900/60 rounded-2xl p-4 mb-5 shadow-inner">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                        <span>{isVi ? 'PHƯƠNG TRÌNH HÓA HỌC CÂN BẰNG' : 'BALANCED CHEMICAL EQUATION'}</span>
                        <span className="text-red-400 font-bold">STOICHIOMETRY</span>
                    </div>

                    <div className="text-center py-2.5 px-3 bg-red-950/20 border border-red-500/30 rounded-xl mb-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                        <span className="text-base md:text-xl font-black font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-amber-200 to-white">
                            {equationText}
                        </span>
                    </div>

                    {/* Reactants -> Products Visual Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        {r0 && (
                            <div className="bg-[#120406] border border-red-900/40 rounded-xl p-2.5 flex flex-col items-center">
                                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase truncate max-w-full">
                                    {(r0.name as any)[language] || r0.name.EN}
                                </span>
                                <span className="text-xs font-mono text-white font-black mt-0.5">{r0.formula}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">
                                    [{r0.stateOfMatter || r0.type}]
                                </span>
                            </div>
                        )}

                        <div className="flex items-center justify-center font-black text-red-500 text-xl font-mono">
                            +
                        </div>

                        {r1 && (
                            <div className="bg-[#120406] border border-red-900/40 rounded-xl p-2.5 flex flex-col items-center">
                                <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase truncate max-w-full">
                                    {(r1.name as any)[language] || r1.name.EN}
                                </span>
                                <span className="text-xs font-mono text-white font-black mt-0.5">{r1.formula}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">
                                    [{r1.stateOfMatter || r1.type}]
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pedagogical Deep Dive / Reaction Mechanism */}
                <div className="relative z-10 bg-red-950/30 border border-red-500/40 rounded-2xl p-4 mb-6 shadow-inner">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">🔬</span>
                            <span className="text-[10px] font-mono font-bold text-red-300 uppercase tracking-wider">
                                {isVi ? 'BẢN CHẤT & CƠ CHẾ PHẢN ỨNG' : 'PEDAGOGICAL MECHANISM & INSIGHT'}
                            </span>
                        </div>

                        {/* Interactive Deep-Dive Action Buttons */}
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => { audioManager.playClick(); setIsMechOpen(true); }}
                                className="px-2.5 py-1 bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400/60 rounded-lg text-cyan-200 font-mono text-[10px] font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
                                title={isVi ? 'Xem chuyển dịch electron từng bước' : 'Inspect electron arrow-pushing'}
                            >
                                <span>🎬</span>
                                <span>{isVi ? 'CƠ CHẾ ELECTRON' : 'MECHANISM'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => { audioManager.playClick(); setIsIceOpen(true); }}
                                className="px-2.5 py-1 bg-amber-950/90 hover:bg-amber-900 border border-amber-400/60 rounded-lg text-amber-200 font-mono text-[10px] font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
                                title={isVi ? 'Xem bảng tính lượng chất I-C-E' : 'Inspect stoichiometry balance'}
                            >
                                <span>⚖️</span>
                                <span>{isVi ? 'BẢNG I-C-E' : 'STOICHIOMETRY'}</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-sans font-medium">
                        {mechanism}
                    </p>
                </div>

                {/* Confirm / Continue Button */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                    <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400">
                        {isVi ? 'Nhấn [ENTER] hoặc [SPACE] để tiếp tục' : 'Press [ENTER] or [SPACE] to resume'}
                    </span>

                    <button
                        onClick={() => {
                            audioManager.playClick();
                            resolvePendingReaction();
                        }}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs md:text-sm rounded-xl tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(239,68,68,0.5)] active:scale-95 cursor-pointer border border-red-400/60"
                    >
                        {isVi ? 'XÁC NHẬN (ACKNOWLEDGE)' : 'ACKNOWLEDGE & RESUME'}
                    </button>
                </div>
            </div>

            {/* Modals triggered from ReactionPopup */}
            <ReactionMechanismModal isOpen={isMechOpen} onClose={() => setIsMechOpen(false)} isVi={isVi} />
            <StoichiometryIceModal isOpen={isIceOpen} onClose={() => setIsIceOpen(false)} isVi={isVi} />
        </div>
    );
};

export default ReactionPopup;
