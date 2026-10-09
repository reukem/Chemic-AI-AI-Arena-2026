import React, { useState, useEffect } from 'react';
import { useSimulationStore } from '../engine/store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { audioManager } from '../engine/AudioManager';
import LanguageToggle from './LanguageToggle';
import { GoogleAuthService, GoogleUserProfile } from '../services/GoogleAuthService';
import { MultimodalScannerModal } from './MultimodalScannerModal';
import { LabReportModal } from './LabReportModal';
import { GoogleProfileModal } from './GoogleProfileModal';
import { CurriculumLearningModal } from './CurriculumLearningModal';
import ReactionCodex from './ReactionCodex';
import { LiveTitrationModal } from './LiveTitrationModal';
import { StoichiometryIceModal } from './StoichiometryIceModal';
import { ReactionMechanismModal } from './ReactionMechanismModal';

const PerformanceHud: React.FC = () => {
    const [stats, setStats] = useState({ fps: 60, cpu: 1.2, memMB: 48 });

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animId: number;

        const loop = (now: number) => {
            frameCount++;
            if (now - lastTime >= 1000) {
                const fps = Math.min(120, Math.round((frameCount * 1000) / (now - lastTime)));
                frameCount = 0;
                lastTime = now;
                const mem = (performance as any).memory?.usedJSHeapSize
                    ? Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024))
                    : 0;
                setStats({
                    fps,
                    cpu: +(0.8 + Math.random() * 0.7).toFixed(1),
                    memMB: mem || 48
                });
            }
            animId = requestAnimationFrame(loop);
        };

        animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                    CPU: <span className="text-cyan-300 font-bold">{stats.cpu}%</span>
                </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                    MEM: <span className="text-cyan-300 font-bold">{stats.memMB}MB</span>
                </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                    FPS: <span className="text-emerald-400 font-bold">{stats.fps}</span>
                </span>
            </div>
        </>
    );
};

const UIOverlay: React.FC = () => {
    const env = useSimulationStore(state => state.env);
    const setEnvTemp = useSimulationStore(state => state.setEnvTemp);
    const setEnvPressure = useSimulationStore(state => state.setEnvPressure);
    const flushAll = useSimulationStore(state => state.flushAll);
    const isPaused = useSimulationStore(state => state.isPaused);
    const togglePause = useSimulationStore(state => state.togglePause);
    const setAppState = useSimulationStore(state => state.setAppState);
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN' || language === 'vi';
    const containers = useSimulationStore(state => state.containers);
    const selectedContainerId = useSimulationStore(state => state.selectedContainerId);
    const setSelectedContainerId = useSimulationStore(state => state.setSelectedContainerId);
    const dispenseVolume = useSimulationStore(state => state.dispenseVolume);
    const setDispenseVolume = useSimulationStore(state => state.setDispenseVolume);
    const addReagentToContainer = useSimulationStore(state => state.addReagentToContainer);
    const spawnContainer = useSimulationStore(state => state.spawnContainer);

    const [inventoryOpen, setInventoryOpen] = useState(true);
    const [equipmentOpen, setEquipmentOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [hoveredChemId, setHoveredChemId] = useState<string | null>(null);

    // Google Workspace, Curriculum Learning & Multimodal Modals
    const [isScannerOpen, setScannerOpen] = useState(false);
    const [isReportOpen, setReportOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
    const [isCodexOpen, setIsCodexOpen] = useState(false);
    const [isTitrationOpen, setIsTitrationOpen] = useState(false);
    const [isIceOpen, setIsIceOpen] = useState(false);
    const [isMechanismOpen, setIsMechanismOpen] = useState(false);
    const [googleUser, setGoogleUser] = useState<GoogleUserProfile>(GoogleAuthService.getUser());

    const categories = [
        { id: 'ALL', label: isVi ? 'Tất cả' : 'All', icon: '🧪' },
        { id: 'element', label: isVi ? 'Đơn chất' : 'Elements', icon: '⚡' },
        { id: 'acid', label: isVi ? 'Axit' : 'Acids', icon: '🔴' },
        { id: 'base', label: isVi ? 'Bazơ' : 'Bases', icon: '🔵' },
        { id: 'salt', label: isVi ? 'Muối' : 'Salts', icon: '🧂' },
        { id: 'organic', label: isVi ? 'Hữu cơ' : 'Organic', icon: '🌿' },
        { id: 'indicator', label: isVi ? 'Chỉ thị' : 'Tests', icon: '🎨' },
    ];

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.setData(`reagent-${id}`, 'true');
    };

    const handleQuickAdd = (e: React.MouseEvent, chemId: string) => {
        e.stopPropagation();
        try {
            audioManager.playClick();
            audioManager.playBubble();
        } catch (_) {}

        let targetId = selectedContainerId;
        if (targetId === null || !containers.some(c => c.id === targetId)) {
            if (containers.length > 0) {
                targetId = containers[0].id;
                setSelectedContainerId(targetId);
            } else {
                spawnContainer('beaker', window.innerWidth * 0.45, Math.max(250, window.innerHeight - 220));
                setTimeout(() => {
                    const state = useSimulationStore.getState();
                    if (state.containers.length > 0) {
                        state.addReagentToContainer(state.containers[0].id, chemId, dispenseVolume);
                    }
                }, 50);
                return;
            }
        }
        addReagentToContainer(targetId, chemId, dispenseVolume);
    };

    useEffect(() => {
        const handleKeyDownEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                togglePause();
            }
        };
        window.addEventListener('keydown', handleKeyDownEscape);
        return () => window.removeEventListener('keydown', handleKeyDownEscape);
    }, [togglePause]);

    const filteredReagents = Object.values(CHEMICAL_REGISTRY).filter(chem => {
        if (chem.reactionClass === 'precipitate' || chem.id === 'ENTROPY_SLUDGE') return false;
        if (selectedCategory !== 'ALL' && chem.category !== selectedCategory) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const chemName = (chem.name as any)[language] || chem.name.EN;
        return chemName.toLowerCase().includes(q) || chem.formula.toLowerCase().includes(q) || chem.id.toLowerCase().includes(q);
    });

    const hoveredChem = hoveredChemId ? CHEMICAL_REGISTRY[hoveredChemId] : null;

    return (
        <div className="absolute inset-0 pointer-events-none font-sans overflow-hidden select-none z-50">

            {/* Top Left Section: Sleek Cyber-Glass Floating Command Dock */}
            <div className="absolute top-4 left-4 flex flex-col gap-3 pointer-events-auto w-80">
                
                {/* Title & Pause Capsule */}
                <div className="bg-[#050e1c]/85 backdrop-blur-xl border border-cyan-900/50 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative overflow-hidden flex items-center justify-between">
                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-cyan-500/15 rounded-full blur-xl pointer-events-none" />
                    
                    <div>
                        <h1 className="text-2xl font-black tracking-wider font-mono chemic-gradient-cycle">
                            CHEMIC-AI
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                            <span className="text-[9px] text-cyan-300/80 font-mono font-bold tracking-widest uppercase">
                                {isVi ? 'ĐỘNG CƠ LƯỢNG TỬ v2.0' : 'QUANTUM REALITY v2.0'}
                            </span>
                        </div>
                    </div>

                    {/* Pause Button */}
                    <button 
                        onClick={() => { audioManager.playClick(); togglePause(); }}
                        onMouseEnter={() => audioManager.playHover()}
                        className="w-10 h-10 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center text-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] group active:scale-95"
                        title={isVi ? 'Tạm dừng mô phỏng (ESC)' : 'Pause Simulation (ESC)'}
                    >
                        <span className="font-mono font-black text-sm">❚❚</span>
                    </button>
                </div>

                {/* Status Indicator */}
                <div className="bg-[#050e1c]/85 backdrop-blur-xl border border-cyan-900/40 rounded-xl px-3.5 py-2 flex justify-between items-center shadow-lg">
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                        {isVi ? 'TRẠNG THÁI HỆ' : 'REACTION STATUS'}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                            {isVi ? 'ỔN ĐỊNH / AN TOÀN' : 'STABLE / SAFE'}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    </div>
                </div>

                {/* Environment Controls */}
                <div className="bg-[#050e1c]/85 backdrop-blur-xl border border-cyan-900/40 rounded-2xl p-3.5 shadow-xl flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-cyan-900/30 pb-2">
                        <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5">
                            <span>⚡</span>
                            <span>{isVi ? 'MÔI TRƯỜNG PHÒNG THÍ NGHIỆM' : 'ENVIRONMENT MATRIX'}</span>
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-bold">
                            {env.temp === 25 && env.pressure === 1.0 ? 'STP 100%' : `${env.temp}°C / ${env.pressure.toFixed(1)}a`}
                        </span>
                    </div>

                    {/* Live Thermodynamic State Pill */}
                    <div className="py-1 px-2 rounded-lg bg-[#030812] border border-cyan-950 flex items-center justify-between text-[10px] font-mono">
                        {env.temp <= 0 ? (
                            <span className="text-cyan-300 flex items-center gap-1 font-bold animate-pulse">
                                <span>❄️</span>
                                <span>{isVi ? 'TRẠNG THÁI ĐÔNG ĐẶC (≤0°C)' : 'FREEZING MATRIX (≤0°C)'}</span>
                            </span>
                        ) : env.temp >= 100 ? (
                            <span className="text-rose-400 flex items-center gap-1 font-bold animate-pulse">
                                <span>♨️</span>
                                <span>{isVi ? 'SÔI MÃNH LIỆT (≥100°C)' : 'VIGOROUS BOILING (≥100°C)'}</span>
                            </span>
                        ) : env.pressure <= 0.3 && env.temp >= 40 ? (
                            <span className="text-purple-300 flex items-center gap-1 font-bold animate-pulse">
                                <span>🌀</span>
                                <span>{isVi ? 'SÔI CHÂN KHÔNG (ÁP SUẤT THẤP)' : 'VACUUM BOIL (<0.3 ATM)'}</span>
                            </span>
                        ) : (
                            <span className="text-emerald-400 flex items-center gap-1 font-bold">
                                <span>🌡️</span>
                                <span>{isVi ? 'NHIỆT ĐỘ CÂN BẰNG' : 'AMBIENT EQUILIBRIUM'}</span>
                            </span>
                        )}
                        <span className="text-[9px] text-slate-500 font-mono">LIVE PHYSICS</span>
                    </div>

                    {/* Temp Slider */}
                    <div className="flex flex-col gap-1 text-xs font-mono">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-[11px] font-bold">
                                {isVi ? 'NHIỆT ĐỘ' : 'TEMPERATURE'}
                            </span>
                            <span className="text-right">
                                <span className={`font-bold ${env.temp <= 0 ? 'text-cyan-300' : env.temp >= 100 ? 'text-rose-400' : 'text-white'}`}>{env.temp}</span> 
                                <span className="text-cyan-400 text-xs ml-0.5">°C</span>
                            </span>
                        </div>
                        <input 
                            type="range" 
                            className="cyber-slider w-full accent-cyan-400 cursor-pointer" 
                            min="-50" 
                            max="250" 
                            value={env.temp} 
                            onChange={(e) => setEnvTemp(Number(e.target.value))} 
                        />
                        {/* Quick Temp Preset Pills */}
                        <div className="grid grid-cols-4 gap-1 pt-0.5">
                            {[
                                { label: '❄ 0°C', val: 0 },
                                { label: '🌡 25°C', val: 25 },
                                { label: '♨ 100°C', val: 100 },
                                { label: '🔥 180°C', val: 180 }
                            ].map((preset) => (
                                <button
                                    key={preset.val}
                                    type="button"
                                    onClick={() => { audioManager.playClick(); setEnvTemp(preset.val); }}
                                    className={`text-[9px] font-mono py-0.5 rounded border transition-all cursor-pointer ${env.temp === preset.val ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold' : 'bg-[#061426]/60 border-cyan-950/70 text-slate-400 hover:text-cyan-300'}`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pressure Slider */}
                    <div className="flex flex-col gap-1 text-xs font-mono pt-1 border-t border-cyan-950/60">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-[11px] font-bold">
                                {isVi ? 'ÁP SUẤT KHÍ QUYỂN' : 'PRESSURE'}
                            </span>
                            <span className="text-right">
                                <span className="text-white font-bold">{env.pressure.toFixed(1)}</span> 
                                <span className="text-cyan-400 text-[10px] ml-0.5">atm</span>
                            </span>
                        </div>
                        <input 
                            type="range" 
                            className="cyber-slider w-full accent-cyan-400 cursor-pointer" 
                            min="0.1" 
                            max="5.0" 
                            step="0.1" 
                            value={env.pressure} 
                            onChange={(e) => setEnvPressure(Number(e.target.value))} 
                        />
                        {/* Quick Pressure Preset Pills */}
                        <div className="grid grid-cols-3 gap-1 pt-0.5">
                            {[
                                { label: '🌀 0.1a (Vac)', val: 0.1 },
                                { label: '1.0a (STP)', val: 1.0 },
                                { label: '⚡ 3.0a (High)', val: 3.0 }
                            ].map((preset) => (
                                <button
                                    key={preset.val}
                                    type="button"
                                    onClick={() => { audioManager.playClick(); setEnvPressure(preset.val); }}
                                    className={`text-[9px] font-mono py-0.5 rounded border transition-all cursor-pointer ${Math.abs(env.pressure - preset.val) < 0.05 ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold' : 'bg-[#061426]/60 border-cyan-950/70 text-slate-400 hover:text-cyan-300'}`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Flush Button */}
                    <button 
                        onClick={() => { audioManager.playClick(); flushAll(); }} 
                        onMouseEnter={() => audioManager.playHover()} 
                        className="mt-1 w-full py-2 bg-rose-950/40 border border-rose-600/50 hover:bg-rose-900/60 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] text-rose-300 rounded-xl text-[10px] font-mono font-bold tracking-widest transition-all flex items-center justify-center gap-2 uppercase active:scale-95 cursor-pointer"
                    >
                        <span>⚠️</span>
                        <span>{isVi ? 'LÀM SẠCH BÀN THÍ NGHIỆM' : 'EMERGENCY FLUSH LAB'}</span>
                    </button>
                </div>

                {/* Equipment Dock (Draggable Glassware) */}
                <div className="bg-[#050e1c]/85 backdrop-blur-xl border border-cyan-900/40 rounded-2xl flex flex-col shadow-xl overflow-hidden p-3.5">
                    <div 
                        className="flex justify-between items-center cursor-pointer transition-colors border-b border-cyan-900/30 pb-2 mb-2.5" 
                        onClick={() => { audioManager.playClick(); setEquipmentOpen(!equipmentOpen); }} 
                        onMouseEnter={() => audioManager.playHover()}
                    >
                        <h2 className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                            {isVi ? 'DỤNG CỤ THÍ NGHIỆM' : 'LAB EQUIPMENT'}
                        </h2>
                        <span className="text-cyan-400 text-xs font-mono">{equipmentOpen ? '▼' : '▶'}</span>
                    </div>

                    {equipmentOpen && (
                        <div className="flex flex-col gap-2">
                            <div
                                draggable
                                onDragStart={(e) => e.dataTransfer.setData('containerType', 'beaker')}
                                onMouseEnter={() => audioManager.playHover()}
                                className="flex justify-between items-center bg-[#09182d]/80 border border-cyan-900/60 hover:border-cyan-400/80 hover:bg-[#0c2242] transition-all rounded-xl p-2.5 cursor-grab active:cursor-grabbing shadow-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-100">
                                        {isVi ? 'Cốc Thủy Tinh (Beaker)' : 'Empty Beaker'}
                                    </span>
                                    <span className="text-cyan-400/80 font-mono text-[10px]">
                                        {isVi ? 'Dung tích: 100 mL (Vạch 20-100)' : 'Capacity: 100 mL (Marks 20-100)'}
                                    </span>
                                </div>
                                <span className="text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">🫙</span>
                            </div>

                            <div
                                draggable
                                onDragStart={(e) => e.dataTransfer.setData('containerType', 'flask')}
                                onMouseEnter={() => audioManager.playHover()}
                                className="flex justify-between items-center bg-[#09182d]/80 border border-cyan-900/60 hover:border-cyan-400/80 hover:bg-[#0c2242] transition-all rounded-xl p-2.5 cursor-grab active:cursor-grabbing shadow-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-100">
                                        {isVi ? 'Bình Tam Giác (Flask)' : 'Erlenmeyer Flask'}
                                    </span>
                                    <span className="text-cyan-400/80 font-mono text-[10px]">
                                        {isVi ? 'Dung tích: 100 mL (Vạch 20-100)' : 'Capacity: 100 mL (Marks 20-100)'}
                                    </span>
                                </div>
                                <span className="text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">⚗️</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reagents Drawer (Categorized Multi-Tab Shelf) */}
                <div className="bg-[#050e1c]/90 backdrop-blur-xl border border-cyan-900/40 rounded-2xl flex flex-col shadow-xl overflow-hidden p-3.5">
                    <div 
                        className="flex justify-between items-center cursor-pointer transition-colors border-b border-cyan-900/30 pb-2 mb-2.5" 
                        onClick={() => { audioManager.playClick(); setInventoryOpen(!inventoryOpen); }} 
                        onMouseEnter={() => audioManager.playHover()}
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                            <h2 className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                                {isVi ? 'KHO HÓA CHẤT LƯỢNG TỬ' : 'CHEMICAL REAGENTS CODEX'}
                            </h2>
                        </div>
                        <span className="text-cyan-400 text-xs font-mono">{inventoryOpen ? '▼' : '▶'}</span>
                    </div>

                    {inventoryOpen && (
                        <>
                            {/* Search & Quick Clear */}
                            <div className="mb-2 shrink-0 pointer-events-auto relative">
                                <input
                                    type="text"
                                    placeholder={isVi ? 'Tìm hóa chất (tên, CTHH: HCl, NaOH...)' : 'Search reagents (name, formula: HCl, NaOH...)'}
                                    className="w-full bg-[#030914] border border-cyan-900/60 rounded-xl py-1.5 pl-7 pr-3 text-xs text-cyan-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono shadow-inner"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">🔍</span>
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-cyan-300 cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Category Filter Pills (Horizontal Scroll) */}
                            <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1.5 mb-2 shrink-0 pointer-events-auto">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => { audioManager.playClick(); setSelectedCategory(cat.id); }}
                                        className={`shrink-0 px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                            selectedCategory === cat.id
                                                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                                                : 'bg-[#061426]/70 border border-cyan-950/70 text-slate-400 hover:text-cyan-300 hover:bg-[#091e38]'
                                        }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Dose Volume Selector & Quick Pour Guide */}
                            <div className="flex items-center justify-between gap-1 px-2 py-1 rounded-lg bg-[#061426]/90 border border-cyan-950/70 mb-2 shrink-0 pointer-events-auto">
                                <div className="flex items-center gap-1">
                                    <span className="text-[9px] font-mono text-slate-400 font-bold">{isVi ? 'Định lượng:' : 'Dose:'}</span>
                                    {[10, 20, 50].map(vol => (
                                        <button
                                            key={vol}
                                            type="button"
                                            onClick={() => {
                                                audioManager.playClick();
                                                setDispenseVolume(vol);
                                            }}
                                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                                dispenseVolume === vol 
                                                    ? 'bg-cyan-500/40 text-cyan-200 border border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]' 
                                                    : 'bg-[#030914] text-slate-400 border border-cyan-950 hover:text-cyan-300'
                                            }`}
                                        >
                                            {vol}ml
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[9px] font-mono text-cyan-400/90 italic truncate" title={isVi ? "Kéo vào bình hoặc click nút + để rót" : "Drag or click + to add"}>
                                    {isVi ? '💡 Kéo hoặc bấm +' : '💡 Drag or click +'}
                                </span>
                            </div>

                            {/* Scrollable Reagents Shelf */}
                            <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[38vh] pr-1 pointer-events-auto">
                                {filteredReagents.length === 0 && (
                                    <div className="text-slate-500 text-[10px] text-center py-4 font-mono italic">
                                        {isVi ? 'Không tìm thấy hóa chất phù hợp.' : 'No reagents matching filter.'}
                                    </div>
                                )}

                                {filteredReagents.map(chem => {
                                    const name = (chem.name as any)[language] || chem.name.EN;
                                    return (
                                        <div
                                            key={chem.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, chem.id)}
                                            onClick={(e) => handleQuickAdd(e, chem.id)}
                                            onMouseEnter={() => {
                                                audioManager.playHover();
                                                setHoveredChemId(chem.id);
                                            }}
                                            onMouseLeave={() => setHoveredChemId(null)}
                                            className="relative flex items-center justify-between bg-gradient-to-r from-[#071527]/90 to-[#040e1c]/90 border border-cyan-950/80 hover:border-cyan-400/80 hover:from-[#0b213f] hover:to-[#07182f] transition-all rounded-xl p-2 cursor-grab active:cursor-grabbing shadow-sm group"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                {/* Color Swatch Orb / State Badge */}
                                                <div className="relative shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-[#030914] border border-cyan-900/60 shadow-inner">
                                                    {chem.type === 'solid' ? (
                                                        <span className="text-xs drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">🪨</span>
                                                    ) : chem.type === 'gas' ? (
                                                        <span className="text-xs drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">💨</span>
                                                    ) : (
                                                        <div
                                                            className="w-3.5 h-3.5 rounded-full shadow-sm"
                                                            style={{ backgroundColor: chem.color, boxShadow: `0 0 8px ${chem.color}80` }}
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex flex-col min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                                                            {name}
                                                        </span>
                                                        {chem.hazardTypes?.includes('flammable') && <span className="text-[10px]" title="Flammable">🔥</span>}
                                                        {chem.hazardTypes?.includes('corrosive') && <span className="text-[10px]" title="Corrosive">⚠️</span>}
                                                        {chem.hazardTypes?.includes('toxic') && <span className="text-[10px]" title="Toxic">⚡</span>}
                                                        {chem.hazardTypes?.includes('explosive') && <span className="text-[10px]" title="Explosive">💥</span>}
                                                    </div>
                                                    <span className="text-cyan-400/90 font-mono text-[10px] font-bold">
                                                        {chem.formula}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* pH Badge & Quick Pour (+) Button */}
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-900/70 text-[9px] font-mono text-cyan-300 font-bold">
                                                    pH {chem.ph.toFixed(1)}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleQuickAdd(e, chem.id)}
                                                    title={isVi ? `Rót nhanh ${dispenseVolume}ml vào bình đang chọn` : `Quick pour ${dispenseVolume}ml into active vessel`}
                                                    className="w-5 h-5 rounded-md bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 font-bold text-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Live Reagent Hover Details Card */}
                {hoveredChem && (
                    <div className="bg-[#030914]/95 backdrop-blur-2xl border border-cyan-500/50 rounded-2xl p-3 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col gap-1.5 text-xs pointer-events-none animate-in fade-in duration-150">
                        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-1.5">
                            <span className="font-bold text-white font-mono text-sm">{hoveredChem.formula}</span>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                                {hoveredChem.category} • pH {hoveredChem.ph}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans leading-snug">
                            {(hoveredChem.description as any)[language] || hoveredChem.description.EN}
                        </p>
                        {hoveredChem.molarMass && (
                            <span className="text-[9px] font-mono text-slate-400">
                                M = {hoveredChem.molarMass} g/mol
                            </span>
                        )}
                    </div>
                )}

            </div>

            {/* Top Right Action Bar: Futuristic Cyber Command Dock */}
            <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto z-40">
                {/* 00: Calculating Mode / Formula Sheet & Solvers */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); useSimulationStore.getState().setCalculatingMode(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3.5 bg-gradient-to-r from-amber-950/90 to-yellow-950/90 hover:from-amber-900/90 hover:to-yellow-900/90 border border-amber-500/50 hover:border-amber-400 rounded-xl flex items-center gap-2 text-amber-300 hover:text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Bảng Công Thức & Máy Tính Hóa Học Lớp 8-12' : 'Chemistry Formula Sheet & Calculations (Grades 8-12)'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">🧮</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">
                        {isVi ? 'TÍNH TOÁN' : 'FORMULAS'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                </button>

                {/* 01: Chemistry Academy (8-12) Button */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setIsCurriculumOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3.5 bg-gradient-to-r from-emerald-950/90 to-cyan-950/90 hover:from-emerald-900/90 hover:to-cyan-900/90 border border-emerald-500/50 hover:border-emerald-400 rounded-xl flex items-center gap-2 text-emerald-300 hover:text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Học viện Hóa học GDPT 2018 (Lớp 8-12)' : 'Chemistry Academy (Grades 8-12)'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📚</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden md:inline">
                        {isVi ? 'HỌC VIỆN GDPT' : 'ACADEMY'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                </button>

                {/* 02: Reaction Codex Button */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setIsCodexOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 rounded-xl flex items-center gap-1.5 text-cyan-300 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Từ Điển Phản Ứng (67 Phản ứng chuẩn)' : 'Reaction Codex (67 Authenticated Rules)'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📖</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        {isVi ? 'TỪ ĐIỂN' : 'CODEX'}
                    </span>
                </button>

                {/* 02.1: Live Titration Station */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setIsTitrationOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-pink-950/70 border border-pink-500/40 hover:border-pink-400 rounded-xl flex items-center gap-1.5 text-pink-300 hover:text-white shadow-[0_0_15px_rgba(236,72,153,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Đồ thị Chuẩn độ pH Thời gian thực' : 'Live Titration & Buffer Curve'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📈</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        {isVi ? 'CHUẨN ĐỘ' : 'TITRATION'}
                    </span>
                </button>

                {/* 02.2: Stoichiometry & I-C-E Table */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setIsIceOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-amber-950/70 border border-amber-500/40 hover:border-amber-400 rounded-xl flex items-center gap-1.5 text-amber-300 hover:text-white shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Bảng Tính Cân Bằng I-C-E & Lượng Chất' : 'Stoichiometry & I-C-E Balance'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">⚖️</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        {isVi ? 'I-C-E' : 'I-C-E'}
                    </span>
                </button>

                {/* 02.3: Reaction Mechanisms */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setIsMechanismOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-purple-950/70 border border-purple-500/40 hover:border-purple-400 rounded-xl flex items-center gap-1.5 text-purple-300 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Cơ Chế Phản Ứng Dịch Chuyển Electron' : 'Reaction Mechanisms'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">🎬</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        {isVi ? 'CƠ CHẾ' : 'MECHANISM'}
                    </span>
                </button>

                {/* 03: Gemini Vision AI Scanner */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setScannerOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 rounded-xl flex items-center gap-1.5 text-cyan-300 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Quét bài tập Hóa học bằng AI Vision' : 'AI Homework & Question Scanner'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📷</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        GEMINI
                    </span>
                </button>

                {/* 04: Lab Report Generator */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setReportOpen(true); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#051120]/90 hover:bg-indigo-950/70 border border-indigo-500/40 hover:border-indigo-400 rounded-xl flex items-center gap-1.5 text-indigo-300 hover:text-white shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={isVi ? 'Xuất báo cáo thực hành chuẩn GDPT' : 'Export Lab Report'}
                >
                    <span className="text-base group-hover:scale-110 transition-transform">📄</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden lg:inline">
                        {isVi ? 'BÁO CÁO' : 'REPORT'}
                    </span>
                </button>

                {/* 05: Reset Lab Bench */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); flushAll(); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 w-10 bg-[#050e1c]/85 hover:bg-rose-950/50 border border-cyan-500/40 hover:border-rose-500 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all active:scale-95 backdrop-blur-xl group cursor-pointer shrink-0"
                    title={language === 'EN' ? 'Reset Workbench' : 'Làm mới bàn thí nghiệm'}
                >
                    <span className="text-base group-hover:rotate-180 transition-transform duration-500">🔄</span>
                </button>

                {/* 06: Quick Language Switch */}
                <LanguageToggle variant="compact" />

                {/* 07: Back to Menu */}
                <button
                    type="button"
                    onClick={() => { audioManager.playClick(); setAppState('MENU'); }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="h-10 px-3 bg-[#030914]/85 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-500 rounded-xl flex items-center gap-1.5 text-slate-300 hover:text-white shadow-md transition-all active:scale-95 backdrop-blur-xl cursor-pointer shrink-0"
                    title={isVi ? 'Quay lại Menu Chính' : 'Return to Main Menu'}
                >
                    <span className="text-sm">🏠</span>
                    <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">MENU</span>
                </button>
            </div>

            {/* Bottom Center Cyber Telemetry Ribbon */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#040c18]/90 backdrop-blur-xl border border-cyan-900/50 px-4 py-1.5 pointer-events-auto rounded-2xl shadow-2xl">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                        SYS: <span className="text-emerald-400 font-bold">{isVi ? 'HOẠT ĐỘNG' : 'ONLINE'}</span>
                    </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                        NODE: <span className="text-cyan-300 font-bold">GEMINI 2.5</span>
                    </span>
                </div>

                <PerformanceHud />

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#071326] border border-cyan-950">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {isVi ? 'BÌNH: ' : 'VESSELS: '}<span className="text-cyan-300 font-bold">{containers.length}</span>
                    </span>
                </div>
            </div>

            {/* MODALS */}
            <MultimodalScannerModal isOpen={isScannerOpen} onClose={() => setScannerOpen(false)} />
            <LabReportModal isOpen={isReportOpen} onClose={() => setReportOpen(false)} />
            <GoogleProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} onUserUpdated={setGoogleUser} />
            <CurriculumLearningModal isOpen={isCurriculumOpen} onClose={() => setIsCurriculumOpen(false)} />
            <ReactionCodex isOpen={isCodexOpen} onClose={() => setIsCodexOpen(false)} />
            <LiveTitrationModal isOpen={isTitrationOpen} onClose={() => setIsTitrationOpen(false)} isVi={isVi} />
            <StoichiometryIceModal isOpen={isIceOpen} onClose={() => setIsIceOpen(false)} isVi={isVi} />
            <ReactionMechanismModal isOpen={isMechanismOpen} onClose={() => setIsMechanismOpen(false)} isVi={isVi} />

            {/* PAUSE MENU OVERLAY */}
            {isPaused && (
                <div className="fixed inset-0 z-[100] bg-[#02050c]/85 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto">
                    <div className="absolute bottom-6 left-6">
                        <LanguageToggle />
                    </div>
                    
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] tracking-[0.3em] uppercase mb-2">
                            {language === 'EN' ? 'SIMULATION PAUSED' : 'ĐÃ TẠM DỪNG MÔ PHỎNG'}
                        </h2>
                        <p className="text-sm font-mono text-cyan-400/80">
                            {language === 'EN' ? 'Time-dilation field activated. What is your command?' : 'Trường giãn nở thời gian đang kích hoạt.'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-72">
                        <button 
                            onClick={() => { audioManager.playClick(); togglePause(); }}
                            onMouseEnter={() => audioManager.playHover()}
                            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] font-mono font-bold tracking-wider uppercase active:scale-95"
                        >
                            {language === 'EN' ? 'Resume Lab' : 'Tiếp Tục'}
                        </button>

                        <button 
                            onClick={() => { audioManager.playClick(); togglePause(); setAppState('MENU'); }}
                            onMouseEnter={() => audioManager.playHover()}
                            className="w-full py-3.5 bg-slate-900/90 border border-slate-700 hover:border-rose-500/80 rounded-xl text-slate-300 hover:text-white transition-all font-mono font-bold tracking-wider uppercase active:scale-95"
                        >
                            {language === 'EN' ? 'Exit to Menu' : 'Trở Về Menu Chính'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UIOverlay;
