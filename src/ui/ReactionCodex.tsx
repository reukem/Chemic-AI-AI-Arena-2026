import React, { useState, useMemo } from 'react';
import { audioManager } from '../engine/AudioManager';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { useSimulationStore } from '../engine/store';

const REACTION_DATABASE = [
    // Tier 0: Foundational Concepts
    {
        id: 'rxn-0-1',
        tier: 'Foundational',
        tierVI: 'Khái niệm Nền tảng',
        reactants: '$\\text{Alkali Metal} + \\text{Water}$',
        result: '$\\text{Explosion} / \\text{H}_{2(g)}$',
        description: 'Foundational Concept: Highly exothermic reaction producing flammable hydrogen gas and hydroxide solution. Can ignite spontaneously.',
        descriptionVI: 'Khái niệm Nền tảng: Phản ứng tỏa nhiệt dữ dội sinh ra khí hydro dễ cháy và dung dịch kiềm ăn mòn. Có thể tự bốc cháy trong không khí.'
    },
    {
        id: 'rxn-0-2',
        tier: 'Foundational',
        tierVI: 'Khái niệm Nền tảng',
        reactants: '$\\text{Strong Acid} + \\text{Strong Base}$',
        result: '$\\text{Neutralization (Salt} + \\text{Water)}$',
        description: 'Foundational Concept: Forms a neutral salt and water. Highly exothermic, rapid temperature increase.',
        descriptionVI: 'Khái niệm Nền tảng: Phản ứng trung hòa tạo muối và nước. Tỏa nhiệt mạnh làm dung dịch nóng lên rất nhanh.'
    },
    {
        id: 'rxn-0-3',
        tier: 'Foundational',
        tierVI: 'Khái niệm Nền tảng',
        reactants: '$\\text{Unknown Reagents} + \\text{Heat}$',
        result: '$\\text{Entropy Sludge}$',
        description: 'Foundational Concept: A chaotic, unstable byproduct of improper chemical mixing. Highly toxic and difficult to clean.',
        descriptionVI: 'Khái niệm Nền tảng: Cặn bã hỗn loạn sinh ra khi pha trộn hóa chất sai quy cách. Rất độc hại và khó làm sạch.'
    },

    // Tier 1: Hardcoded Engine Rules
    {
        id: 'rxn-1-1',
        tier: 'Engine Rule',
        tierVI: 'Quy tắc Phản ứng',
        reactants: '$\\text{HCl}_{(aq)} + \\text{NaOH}_{(aq)}$',
        result: '$\\text{NaCl}_{(aq)} + \\text{H}_2\\text{O}_{(l)}$',
        description: 'Neutralization: Hydrochloric acid and Sodium Hydroxide perfectly neutralize to form neutral Salt Water.',
        descriptionVI: 'Phản ứng Trung hòa: Axit clohidric tác dụng với Natri hidroxit tạo thành muối ăn (NaCl) và nước trung tính.'
    },
    {
        id: 'rxn-1-2',
        tier: 'Redox / Explosive',
        tierVI: 'Oxy hóa khử / Mãnh liệt',
        reactants: '$2\\text{Na}_{(s)} + 2\\text{H}_2\\text{O}_{(l)}$',
        result: '$2\\text{NaOH}_{(aq)} + \\text{H}_{2(g)}$',
        description: 'Violent Exothermic Redox: Sodium metal reacts vigorously with water, producing Hydrogen gas and caustic Sodium Hydroxide.',
        descriptionVI: 'Oxy hóa khử Mãnh liệt: Kim loại Natri phản ứng dữ dội trên mặt nước, giải phóng khí Hydro và tạo dung dịch bazơ NaOH.'
    },
    {
        id: 'rxn-1-3',
        tier: 'Redox / Explosive',
        tierVI: 'Oxy hóa khử / Mãnh liệt',
        reactants: '$2\\text{K}_{(s)} + 2\\text{H}_2\\text{O}_{(l)}$',
        result: '$2\\text{KOH}_{(aq)} + \\text{H}_{2(g)}$',
        description: 'Explosive Alkali Redox: Potassium reacts explosively with water, igniting the emitted hydrogen with a distinct lilac flame.',
        descriptionVI: 'Phản ứng Nổ Kiềm: Kali phản ứng bốc cháy mãnh liệt với nước, ngọn lửa cháy sáng có màu tím đặc trưng.'
    },
    {
        id: 'rxn-1-4',
        tier: 'Thermodynamic Hazard',
        tierVI: 'Nguy hiểm Nhiệt động',
        reactants: '$\\text{H}_2\\text{SO}_{4(conc)} + \\text{H}_2\\text{O}_{(l)}$',
        result: '$\\text{Violent Flash-Boiling}$',
        description: 'Extreme Danger: Adding water into concentrated sulfuric acid causes instantaneous flash-boiling and hazardous thermal acid splashing.',
        descriptionVI: 'Cực kỳ Nguy hiểm: Rót nước vào axit sunfuric đặc làm nước sôi bùng tức thì, bắn tung tóe axit gây bỏng nặng.'
    },
    {
        id: 'rxn-1-5',
        tier: 'Safe Protocol',
        tierVI: 'Quy trình Chuẩn',
        reactants: '$\\text{H}_2\\text{O}_{(l)} + \\text{H}_2\\text{SO}_{4(conc)}$',
        result: '$\\text{Dilute Acid}_{(aq)}$',
        description: 'Standard Protocol: Adding concentrated acid slowly into a large volume of water allows safe thermal dissipation.',
        descriptionVI: 'Quy trình Chuẩn an toàn: Rót từ từ axit đặc vào lượng lớn nước dọc theo đũa thủy tinh để tản nhiệt an toàn.'
    },
    {
        id: 'rxn-1-6',
        tier: 'Displacement',
        tierVI: 'Phản ứng Thế',
        reactants: '$\\text{Mg}_{(s)} + 2\\text{HCl}_{(aq)}$',
        result: '$\\text{MgCl}_{2(aq)} + \\text{H}_{2(g)}$',
        description: 'Single Displacement: Magnesium ribbon reacts effervescently with hydrochloric acid, evolving hydrogen gas.',
        descriptionVI: 'Phản ứng Thế kim loại: Dải Magie sủi bọt khí mạnh mẽ trong dung dịch axit clohidric, giải phóng khí Hydro.'
    },
    {
        id: 'rxn-1-7',
        tier: 'Indicator Activation',
        tierVI: 'Chỉ thị Màu',
        reactants: '$\\text{Phenolphthalein} + \\text{NaOH}_{(aq)}$',
        result: '$\\text{Pink Alkaline Complex}$',
        description: 'Optical Indicator: Phenolphthalein deprotonates in basic media (pH > 8.2), shifting to vibrant magenta/fuchsia.',
        descriptionVI: 'Chỉ thị Màu: Dung dịch Phenolphthalein không màu chuyển sang màu hồng cánh sen rực rỡ trong môi trường bazơ (pH > 8.2).'
    },
    {
        id: 'rxn-1-8',
        tier: 'Organic Synthesis',
        tierVI: 'Tổng hợp Hữu cơ',
        reactants: '$\\text{C}_2\\text{H}_5\\text{OH}_{(l)} + \\text{CH}_3\\text{COOH}_{(l)}$',
        result: '$\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$',
        description: 'Fischer Esterification: Ethanol and Acetic Acid condense in the presence of acid catalyst to form fruity Ethyl Acetate.',
        descriptionVI: 'Phản ứng Este hóa Fischer: Rượu Etylic tác dụng với Axit Axetic (xúc tác axit nhiệt độ) tạo Etyl Axetat có mùi thơm trái cây chín.'
    },

    // Tier 2: Registry Derivations
    {
        id: 'rxn-2-1',
        tier: 'Redox',
        tierVI: 'Oxy hóa khử',
        reactants: '$2\\text{Li}_{(s)} + 2\\text{H}_2\\text{O}_{(l)}$',
        result: '$2\\text{LiOH}_{(aq)} + \\text{H}_{2(g)}$',
        description: 'Alkali-Water Redox: Lithium reacts steadily with water, forming lithium hydroxide and releasing hydrogen gas.',
        descriptionVI: 'Phản ứng Kiềm - Nước: Liti tan đều đặn trong nước, sinh ra khí Hydro và dung dịch Liti hidroxit.'
    },
    {
        id: 'rxn-2-2',
        tier: 'Redox',
        tierVI: 'Oxy hóa khử',
        reactants: '$\\text{Ca}_{(s)} + 2\\text{H}_2\\text{O}_{(l)}$',
        result: '$\\text{Ca(OH)}_{2(aq)} + \\text{H}_{2(g)}$',
        description: 'Alkaline Earth Redox: Calcium turnings react to form a cloudy suspension of calcium hydroxide (limewater) and hydrogen gas.',
        descriptionVI: 'Kim loại Kiềm thổ: Canxi phản ứng sinh bọt khí Hydro và vẩn đục nước vôi trong Canxi hidroxit.'
    },
    {
        id: 'rxn-2-3',
        tier: 'Precipitation',
        tierVI: 'Phản ứng Kết tủa',
        reactants: '$\\text{AgNO}_{3(aq)} + \\text{NaCl}_{(aq)}$',
        result: '$\\text{AgCl}_{(s)} \\downarrow + \\text{NaNO}_{3(aq)}$',
        description: 'Double Displacement: Silver Nitrate and Sodium Chloride produce an immediate curd-like white precipitate of Silver Chloride.',
        descriptionVI: 'Phản ứng Trao đổi: Bạc Nitrat tác dụng với muối ăn tạo kết tủa trắng dạng vón của Bạc Clorua (AgCl).'
    },
    {
        id: 'rxn-2-4',
        tier: 'Precipitation',
        tierVI: 'Phản ứng Kết tủa',
        reactants: '$\\text{Ba(OH)}_{2(aq)} + \\text{H}_2\\text{SO}_{4(aq)}$',
        result: '$\\text{BaSO}_{4(s)} \\downarrow + 2\\text{H}_2\\text{O}_{(l)}$',
        description: 'Concurrent Neutralization & Precipitation: Forms insoluble white barium sulfate precipitate with near-zero residual conductivity.',
        descriptionVI: 'Trung hòa & Kết tủa: Sinh ra kết tủa trắng Bari Sunfat (BaSO4) không tan trong axit mạnh, độ dẫn điện giảm về gần 0.'
    },
    {
        id: 'rxn-2-5',
        tier: 'Precipitation',
        tierVI: 'Phản ứng Kết tủa',
        reactants: '$\\text{Pb(NO}_3)_{2(aq)} + 2\\text{KI}_{(aq)}$',
        result: '$\\text{PbI}_{2(s)} \\downarrow + 2\\text{KNO}_{3(aq)}$',
        description: 'Golden Rain Reaction: Lead(II) Nitrate and Potassium Iodide yield a brilliant yellow precipitate of Lead(II) Iodide.',
        descriptionVI: 'Phản ứng Mưa Vàng: Chì(II) Nitrat tác dụng với Kali Iotua tạo kết tủa vàng lấp lánh tuyệt đẹp của Chì(II) Iotua (PbI2).'
    }
];

const ReactionCodex: React.FC = () => {
    const [isCodexOpen, setIsCodexOpen] = useState(false);
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

    const filteredReactions = useMemo(() => {
        if (!searchQuery.trim()) return REACTION_DATABASE;
        const q = searchQuery.toLowerCase();
        return REACTION_DATABASE.filter(r => 
            r.reactants.toLowerCase().includes(q) ||
            r.result.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.descriptionVI.toLowerCase().includes(q) ||
            r.tier.toLowerCase().includes(q) ||
            r.tierVI.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        <>
            {/* Unified Top-Right Floating Trigger Button */}
            <div className="absolute top-4 right-[60px] z-40 pointer-events-auto">
                <button
                    onClick={() => { audioManager.playClick(); setIsCodexOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3.5 rounded-xl bg-[#050e1c]/85 hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 transition-all cursor-pointer text-xs font-mono font-bold text-cyan-300 hover:text-white active:scale-95 group"
                    title={isVi ? 'Từ Điển Phản Ứng' : 'Reaction Codex'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📖</span>
                    <span className="hidden sm:inline tracking-wider uppercase">
                        {isVi ? 'TỪ ĐIỂN PHẢN ỨNG' : 'REACTION CODEX'}
                    </span>
                </button>
            </div>

            {/* Overhauled Cyberpunk Modal */}
            {isCodexOpen && (
                <div 
                    onClick={() => setIsCodexOpen(false)}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl pointer-events-auto select-none font-sans cursor-pointer"
                >
                    {/* Ambient Background Glow */}
                    <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl max-h-[84vh] bg-gradient-to-b from-[#061426]/95 via-[#030914]/95 to-[#01040a]/95 border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex flex-col overflow-hidden cursor-default"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-cyan-900/40 bg-[#040e1c]/80 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                    <div className="w-full h-full bg-[#070e1e] rounded-2xl flex items-center justify-center text-lg text-cyan-300">
                                        📖
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg md:text-xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 uppercase">
                                        {isVi ? 'TỪ ĐIỂN PHẢN ỨNG HÓA HỌC' : 'QUANTUM REACTION CODEX'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-mono">
                                        {isVi ? 'Hệ thống quy tắc phản ứng nhiệt động học & biến đổi phân tử' : 'Synthesis Rules & Thermodynamic Reaction Matrix'}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => { audioManager.playClick(); setIsCodexOpen(false); }}
                                onMouseEnter={() => audioManager.playHover()}
                                className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center font-mono font-bold transition-all shadow-md active:scale-95 text-xs"
                                title={isVi ? 'Đóng' : 'Close'}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Search & Filter Ribbon */}
                        <div className="px-6 py-3 border-b border-cyan-950 bg-[#030914]/60 flex items-center justify-between gap-4 shrink-0">
                            <div className="relative flex-1 max-w-md">
                                <input 
                                    type="text"
                                    placeholder={isVi ? 'Tìm phản ứng theo chất tham gia, sản phẩm, quy tắc...' : 'Search reaction by reactant, product, or rule...'}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#020712] border border-cyan-900/60 text-cyan-200 pl-4 pr-8 py-2 rounded-xl focus:outline-none focus:border-cyan-400 text-xs font-mono transition-all shadow-inner placeholder:text-slate-500"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 text-xs font-mono"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-900/50 shrink-0">
                                {filteredReactions.length} {isVi ? 'Phản ứng' : 'Rules'}
                            </span>
                        </div>

                        {/* Knowledge Grid */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#020712]/50 space-y-3.5">
                            {filteredReactions.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 font-mono text-xs italic">
                                    {isVi ? 'Không tìm thấy phản ứng hóa học nào phù hợp.' : 'No chemical reactions match your search query.'}
                                </div>
                            ) : (
                                filteredReactions.map((reaction) => (
                                    <div 
                                        key={reaction.id} 
                                        className="bg-[#061324]/80 hover:bg-[#091e38] border border-cyan-950 hover:border-cyan-500/50 rounded-2xl p-4.5 transition-all shadow-md flex flex-col gap-2.5 relative overflow-hidden group"
                                    >
                                        {/* Top Meta Bar */}
                                        <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-wider">
                                                {isVi ? reaction.tierVI : reaction.tier}
                                            </span>
                                            <span className="text-slate-500 uppercase tracking-widest">
                                                {reaction.id.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Chemical Formula Transformation */}
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-sans pt-1">
                                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                                <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
                                                    {isVi ? 'CHẤT ĐẦU' : 'REACTANTS'}
                                                </span>
                                                <span className="text-slate-100 font-medium text-sm overflow-x-auto custom-scrollbar whitespace-nowrap">
                                                    <Latex>{reaction.reactants}</Latex>
                                                </span>
                                            </div>

                                            <span className="text-cyan-400 font-bold hidden sm:inline">➔</span>

                                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0">
                                                    {isVi ? 'SẢN PHẨM' : 'PRODUCTS'}
                                                </span>
                                                <span className="text-cyan-200 font-medium text-sm overflow-x-auto custom-scrollbar whitespace-nowrap">
                                                    <Latex>{reaction.result}</Latex>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Insight Description */}
                                        <div className="border-l-2 border-cyan-500/50 pl-3 mt-1 text-xs text-slate-300 leading-relaxed font-sans italic bg-cyan-950/10 py-1 rounded-r-lg">
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
};

export default ReactionCodex;
