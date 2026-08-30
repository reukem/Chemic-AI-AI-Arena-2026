import React, { useState, useEffect } from 'react';
import { useSimulationStore } from '../engine/store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { audioManager } from '../engine/AudioManager';

const EducationalInsightModal: React.FC = () => {
    const pendingEducationalReaction = useSimulationStore(state => state.pendingEducationalReaction);
    const resolveEducationalReaction = useSimulationStore(state => state.resolveEducationalReaction);
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN' || language === 'vi';
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (pendingEducationalReaction && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
                e.preventDefault();
                handleAcknowledge();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pendingEducationalReaction, doNotShowAgain]);

    if (!pendingEducationalReaction) return null;

    let r0 = pendingEducationalReaction.reactants ? CHEMICAL_REGISTRY[pendingEducationalReaction.reactants[0]] : null;
    let r1 = pendingEducationalReaction.reactants ? CHEMICAL_REGISTRY[pendingEducationalReaction.reactants[1]] : null;
    const prod = pendingEducationalReaction.product ? CHEMICAL_REGISTRY[pendingEducationalReaction.product] : null;

    const equationText = isVi 
        ? (pendingEducationalReaction.equation?.VN || `${r0?.formula || ''} + ${r1?.formula || ''} → ${prod?.formula || ''}`)
        : (pendingEducationalReaction.equation?.EN || `${r0?.formula || ''} + ${r1?.formula || ''} → ${prod?.formula || ''}`);

    const reactionType = isVi
        ? (pendingEducationalReaction.reactionType?.VN || 'Khám Phá Phản Ứng Hóa Học')
        : (pendingEducationalReaction.reactionType?.EN || 'Educational Reaction Discovery');

    const mechanism = isVi
        ? (pendingEducationalReaction.mechanism?.VN || pendingEducationalReaction.message?.VN || '')
        : (pendingEducationalReaction.mechanism?.EN || pendingEducationalReaction.message?.EN || '');

    const handleAcknowledge = () => {
        try {
            audioManager.playClick();
        } catch (e) {
            console.warn(e);
        }
        try {
            if (doNotShowAgain && pendingEducationalReaction) {
                const rxnKey = pendingEducationalReaction.rxnId || (pendingEducationalReaction.reactants ? `rxn_${pendingEducationalReaction.reactants[0]}_${pendingEducationalReaction.reactants[1]}` : 'rxn_generic');
                const mutedReactions = JSON.parse(localStorage.getItem('chemic_ai_muted_reactions') || '[]');
                if (!mutedReactions.includes(rxnKey)) {
                    mutedReactions.push(rxnKey);
                    localStorage.setItem('chemic_ai_muted_reactions', JSON.stringify(mutedReactions));
                }
            }
        } catch (err) {
            console.warn('Could not persist muted reaction:', err);
        } finally {
            resolveEducationalReaction();
        }
    };

    return (
        <div 
            onClick={(e) => { if (e.target === e.currentTarget) handleAcknowledge(); }}
            className="fixed inset-0 z-[190] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-4 overflow-hidden select-none animate-in fade-in duration-200"
        >
            {/* Ambient Cyan Backdrop Glow */}
            <div className="fixed inset-0 bg-cyan-600/10 pointer-events-none" />

            {/* Cyber Insight Modal Container */}
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-cyan-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(6,182,212,0.35),inset_0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
                
                {/* Ambient Decorative Glows */}
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Header Plate */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-cyan-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <span className="text-xl">⚛️</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                <span className="text-cyan-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'TỪ ĐIỂN KIẾN THỨC // HÓA HỌC 10-12' : 'QUANTUM CODEX // PEDAGOGICAL INSIGHT'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {reactionType}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-600/60 text-cyan-300 font-mono text-[10px] font-bold shadow-[0_0_10px_rgba(6,182,212,0.25)] uppercase">
                            {isVi ? 'KHÁM PHÁ MỚI' : 'DISCOVERY'}
                        </span>
                        <button
                            type="button"
                            onClick={handleAcknowledge}
                            className="w-8 h-8 rounded-full bg-cyan-950/80 hover:bg-rose-950/80 border border-cyan-700/60 hover:border-rose-500 text-cyan-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
                            title="Close / Đóng"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Balanced Stoichiometry Banner */}
                <div className="relative z-10 bg-[#040c18]/90 border border-cyan-900/60 rounded-2xl p-4 mb-5 shadow-inner">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                        <span>{isVi ? 'PHƯƠNG TRÌNH PHẢN ỨNG CÂN BẰNG' : 'BALANCED REACTION EQUATION'}</span>
                        <span className="text-cyan-400 font-bold">GRADE 12 CURRICULUM</span>
                    </div>

                    <div className="text-center py-2.5 px-3 bg-cyan-950/30 border border-cyan-500/40 rounded-xl mb-3 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                        <span className="text-base md:text-xl font-black font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-teal-300">
                            {equationText}
                        </span>
                    </div>

                    {/* Molecular Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 text-center pt-1">
                        {r0 && (
                            <div className="bg-[#061426] border border-cyan-900/50 rounded-xl p-2.5 flex flex-col items-center">
                                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase truncate max-w-full">
                                    {(r0.name as any)[language] || r0.name.EN}
                                </span>
                                <span className="text-xs font-mono text-white font-black mt-0.5">{r0.formula}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">[{r0.stateOfMatter || r0.type}]</span>
                            </div>
                        )}

                        {r1 && (
                            <div className="bg-[#061426] border border-cyan-900/50 rounded-xl p-2.5 flex flex-col items-center">
                                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase truncate max-w-full">
                                    {(r1.name as any)[language] || r1.name.EN}
                                </span>
                                <span className="text-xs font-mono text-white font-black mt-0.5">{r1.formula}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">[{r1.stateOfMatter || r1.type}]</span>
                            </div>
                        )}

                        {prod && (
                            <div className="bg-[#061e20] border border-emerald-800/60 rounded-xl p-2.5 flex flex-col items-center shadow-[0_0_15px_rgba(16,185,129,0.2)] sm:col-auto col-span-full">
                                <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase truncate max-w-full">
                                    {(prod.name as any)[language] || prod.name.EN}
                                </span>
                                <span className="text-xs font-mono text-white font-black mt-0.5">{prod.formula}</span>
                                <span className="text-[9px] font-mono text-emerald-400/80 uppercase mt-0.5">[{prod.stateOfMatter || prod.type}]</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pedagogical Deep Dive / Reaction Mechanism */}
                <div className="relative z-10 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4 mb-5 shadow-inner">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm">🔬</span>
                        <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                            {isVi ? 'BẢN CHẤT HÓA HỌC & Ý NGHĨA THỰC TIỄN' : 'CHEMICAL MECHANISM & PRACTICAL SIGNIFICANCE'}
                        </span>
                    </div>
                    <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-sans font-medium">
                        {mechanism}
                    </p>
                </div>

                {/* Footer Controls: Direct Acknowledge & Shortcut hint */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-bold">ENTER</span>
                        <span>{isVi ? 'hoặc click nút bên cạnh để tiếp tục' : 'or click button to continue'}</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleAcknowledge}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-mono font-bold text-xs md:text-sm rounded-xl tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer border border-cyan-400/60 flex items-center justify-center gap-2"
                    >
                        <span>{isVi ? 'XÁC NHẬN & TIẾP TỤC' : 'ACKNOWLEDGE / CONTINUE'}</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EducationalInsightModal;
