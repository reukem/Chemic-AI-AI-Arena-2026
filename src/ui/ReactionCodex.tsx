import React, { useState, useMemo } from 'react';
import { audioManager } from '../engine/AudioManager';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { useSimulationStore } from '../engine/store';
import { REACTION_RULES, CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

export interface ReactionEntry {
    id: string;
    tier: string;
    tierVI: string;
    equationEN: string;
    equationVN: string;
    reactantsLatex: string;
    resultLatex: string;
    description: string;
    descriptionVI: string;
    effect?: string;
    hazardLevel?: string;
}

export interface ReactionCodexProps {
    isOpen?: boolean;
    onClose?: () => void;
    showTrigger?: boolean;
}

export default function ReactionCodex({
    isOpen: controlledOpen,
    onClose: controlledClose,
    showTrigger = false
}: ReactionCodexProps = {}) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isCodexOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const handleClose = controlledClose || (() => setInternalOpen(false));
    const handleOpen = () => setInternalOpen(true);

    const [searchQuery, setSearchQuery] = useState('');
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
    const setActiveTab = useSimulationStore(state => state.setActiveTab);

    React.useEffect(() => {
        if (isCodexOpen) {
            setActiveTab('codex');
        } else {
            setActiveTab('lab');
        }
    }, [isCodexOpen, setActiveTab]);

    // Format all authentic reactions from REACTION_RULES into the Codex
    const allReactions: ReactionEntry[] = useMemo(() => {
        const formatted: ReactionEntry[] = [];

        REACTION_RULES.forEach((rule, idx) => {
            const r0 = rule.reactants?.[0] ? CHEMICAL_REGISTRY[rule.reactants[0]] : null;
            const r1 = rule.reactants?.[1] ? CHEMICAL_REGISTRY[rule.reactants[1]] : null;
            const p0 = rule.product ? CHEMICAL_REGISTRY[rule.product] : null;

            const eqEN = rule.equation?.EN || `${r0?.formula || rule.reactants[0]} + ${r1?.formula || rule.reactants[1]} → ${p0?.formula || rule.product}`;
            const eqVN = rule.equation?.VN || eqEN;

            // Extract reactants and products from equation or build fallback LaTeX
            let rLatex = '';
            let pLatex = '';
            if (eqEN.includes('→')) {
                const parts = eqEN.split('→');
                rLatex = parts[0].trim().replace(/\(aq\)/gi, '_{(aq)}').replace(/\(s\)/gi, '_{(s)}').replace(/\(l\)/gi, '_{(l)}').replace(/\(g\)/gi, '_{(g)}');
                pLatex = parts[1].trim().replace(/\(aq\)/gi, '_{(aq)}').replace(/\(s\)/gi, '_{(s)}').replace(/\(l\)/gi, '_{(l)}').replace(/\(g\)/gi, '_{(g)}');
            } else {
                rLatex = `\\text{${r0?.formula || rule.reactants[0]}} + \\text{${r1?.formula || rule.reactants[1]}}`;
                pLatex = `\\text{${p0?.formula || rule.product}}`;
            }

            formatted.push({
                id: `rxn-${idx + 1}`,
                tier: rule.reactionType?.EN || 'Inorganic / Organic Reaction',
                tierVI: rule.reactionType?.VN || 'Phản Ứng Hóa Học',
                equationEN: eqEN,
                equationVN: eqVN,
                reactantsLatex: `$${rLatex}$`,
                resultLatex: `$${pLatex}$`,
                description: rule.mechanism?.EN || rule.message.EN,
                descriptionVI: rule.mechanism?.VN || rule.message.VN,
                effect: rule.effect,
                hazardLevel: rule.hazardLevel
            });
        });

        return formatted;
    }, []);

    const filteredReactions = useMemo(() => {
        if (!searchQuery.trim()) return allReactions;
        const q = searchQuery.toLowerCase();
        return allReactions.filter(r => 
            r.equationEN.toLowerCase().includes(q) ||
            r.equationVN.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.descriptionVI.toLowerCase().includes(q) ||
            r.tier.toLowerCase().includes(q) ||
            r.tierVI.toLowerCase().includes(q) ||
            r.id.toLowerCase().includes(q)
        );
    }, [searchQuery, allReactions]);

    return (
        <>
            {/* Optional Floating Trigger Button (only if showTrigger is true) */}
            {showTrigger && (
                <div className="absolute top-4 right-[60px] z-40 pointer-events-auto">
                    <button
                        onClick={() => { audioManager.playClick(); handleOpen(); }}
                        onMouseEnter={() => audioManager.playHover()}
                        className="h-10 px-3.5 rounded-xl bg-[#050e1c]/85 hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 transition-all cursor-pointer text-xs font-mono font-bold text-cyan-300 hover:text-white active:scale-95 group"
                        title={isVi ? 'Từ Điển Phản Ứng (67 Phản ứng chuẩn)' : 'Reaction Codex (67 Authenticated Rules)'}
                    >
                        <span className="text-base group-hover:scale-110 transition-transform">📖</span>
                        <span className="hidden sm:inline tracking-wider uppercase">
                            {isVi ? 'TỪ ĐIỂN PHẢN ỨNG' : 'REACTION CODEX'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-[10px] text-cyan-200">
                            {allReactions.length}
                        </span>
                    </button>
                </div>
            )}

            {/* Overhauled Cyberpunk Modal */}
            {isCodexOpen && (
                <div 
                    onClick={handleClose}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl pointer-events-auto select-none font-sans cursor-pointer"
                >
                    {/* Ambient Background Glow */}
                    <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-b from-[#061426]/95 via-[#030914]/95 to-[#01040a]/95 border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex flex-col overflow-hidden cursor-default"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-cyan-900/40 bg-[#040e1c]/80 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                    <div className="w-full h-full bg-[#050e1c] rounded-2xl flex items-center justify-center">
                                        <span className="text-xl">⚛️</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                        <h2 className="text-lg font-black tracking-wide text-white font-mono uppercase">
                                            {isVi ? 'TỪ ĐIỂN PHẢN ỨNG HÓA HỌC' : 'REACTION ARCHIVE // CODEX'}
                                        </h2>
                                    </div>
                                    <p className="text-[11px] text-cyan-400/80 font-mono">
                                        {isVi ? 'Hệ thống cơ chế nhiệt động học, phương trình ion & sản phẩm lượng tử thực nghiệm' : 'Thermodynamic reaction mechanisms, ion equations & quantum engine physical products'}
                                    </p>
                                </div>
                            </div>

                            <button 
                                onClick={() => { audioManager.playClick(); handleClose(); }}
                                className="w-9 h-9 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 hover:border-cyan-400 text-slate-400 hover:text-white transition-all flex items-center justify-center font-mono text-sm cursor-pointer shadow-sm active:scale-95"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Search & Statistics Bar */}
                        <div className="px-6 py-3.5 border-b border-cyan-900/30 bg-[#030b18]/60 flex items-center gap-3 shrink-0">
                            <div className="relative flex-1">
                                <input 
                                    type="text"
                                    placeholder={isVi ? 'Tìm phản ứng theo chất tham gia, sản phẩm, quy tắc (ví dụ: Na, HCl, Golden Rain, CO2...)' : 'Search reaction by reactant, product, rule (e.g. Na, HCl, Golden Rain, CO2...)'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#020712] border border-cyan-900/60 text-cyan-200 pl-4 pr-8 py-2 rounded-xl focus:outline-none focus:border-cyan-400 text-xs font-mono transition-all shadow-inner placeholder:text-slate-500"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 text-xs font-mono cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-900/50 shrink-0 font-bold">
                                {filteredReactions.length} / {allReactions.length} {isVi ? 'Phản ứng' : 'Rules'}
                            </span>
                        </div>

                        {/* Knowledge Grid */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#020712]/50 space-y-3.5">
                            {filteredReactions.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 font-mono text-xs italic">
                                    {isVi ? 'Không tìm thấy phản ứng hóa học nào phù hợp với từ khóa.' : 'No chemical reactions match your search query.'}
                                </div>
                            ) : (
                                filteredReactions.map((reaction) => (
                                    <div 
                                        key={reaction.id} 
                                        className="bg-[#061324]/80 hover:bg-[#091e38] border border-cyan-950 hover:border-cyan-500/50 rounded-2xl p-4.5 transition-all shadow-md flex flex-col gap-2.5 relative overflow-hidden group"
                                    >
                                        {/* Top Meta Bar */}
                                        <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-wider">
                                                    {isVi ? reaction.tierVI : reaction.tier}
                                                </span>
                                                {reaction.hazardLevel === 'CRITICAL' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-300 font-bold uppercase">
                                                        ⚠️ {isVi ? 'NGUY HIỂM CAO' : 'CRITICAL HAZARD'}
                                                    </span>
                                                )}
                                                {reaction.hazardLevel === 'DANGER' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-orange-950/80 border border-orange-500/60 text-orange-300 font-bold uppercase">
                                                        ⚡ {isVi ? 'CẢNH BÁO' : 'DANGER'}
                                                    </span>
                                                )}
                                                {reaction.effect === 'precipitate' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold">
                                                        ↓ {isVi ? 'KẾT TỦA' : 'PRECIPITATE'}
                                                    </span>
                                                )}
                                                {reaction.effect === 'explosion' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-300 font-bold">
                                                        💥 {isVi ? 'TỎA NHIỆT MẠNH' : 'EXPLOSION'}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-slate-500 uppercase tracking-widest font-mono text-[9px]">
                                                {reaction.id.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Chemical Equation Bar */}
                                        <div className="bg-[#020814] border border-cyan-950/90 rounded-xl p-3 flex items-center justify-between overflow-x-auto custom-scrollbar">
                                            <span className="text-cyan-200 font-mono text-xs md:text-sm font-bold whitespace-nowrap">
                                                {isVi ? reaction.equationVN : reaction.equationEN}
                                            </span>
                                        </div>

                                        {/* Insight Description */}
                                        <div className="border-l-2 border-cyan-500/50 pl-3 mt-1 text-xs text-slate-300 leading-relaxed font-sans italic bg-cyan-950/15 py-1.5 rounded-r-lg">
                                            "{isVi ? reaction.descriptionVI : reaction.description}"
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
