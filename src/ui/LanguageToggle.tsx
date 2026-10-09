import React from 'react';
import { useSimulationStore } from '../engine/store';
import { audioManager } from '../engine/AudioManager';

export const VietnamFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 30 20" className={`rounded-[3px] shadow-sm overflow-hidden shrink-0 ${className}`}>
        <rect width="30" height="20" fill="#da251d" />
        <polygon
            points="15,4 16.5,8.8 21.6,8.8 17.5,11.8 19,16.5 15,13.5 11,16.5 12.5,11.8 8.4,8.8 13.5,8.8"
            fill="#ffff00"
        />
    </svg>
);

export const USFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 30 20" className={`rounded-[3px] shadow-sm overflow-hidden shrink-0 ${className}`}>
        <rect width="30" height="20" fill="#b22234" />
        <path d="M0,3.08h30M0,6.15h30M0,9.23h30M0,12.31h30M0,15.38h30M0,18.46h30" stroke="#ffffff" strokeWidth="1.54" />
        <rect width="13" height="10.8" fill="#3c3b6e" />
        <circle cx="3" cy="2.5" r="0.8" fill="#fff" />
        <circle cx="6.5" cy="2.5" r="0.8" fill="#fff" />
        <circle cx="10" cy="2.5" r="0.8" fill="#fff" />
        <circle cx="4.7" cy="5.4" r="0.8" fill="#fff" />
        <circle cx="8.3" cy="5.4" r="0.8" fill="#fff" />
        <circle cx="3" cy="8.3" r="0.8" fill="#fff" />
        <circle cx="6.5" cy="8.3" r="0.8" fill="#fff" />
        <circle cx="10" cy="8.3" r="0.8" fill="#fff" />
    </svg>
);

interface LanguageToggleProps {
    variant?: 'default' | 'compact' | 'segmented';
    className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'default', className = '' }) => {
    const language = useSimulationStore(state => state.language);
    const setLanguage = useSimulationStore(state => state.setLanguage);
    const isEn = language === 'EN';

    const handleSelect = (target: 'EN' | 'VN') => {
        if (language === target) return;
        try {
            audioManager.playClick();
        } catch (_) {}
        setLanguage(target);
    };

    const toggleLanguage = () => {
        try {
            audioManager.playClick();
        } catch (_) {}
        setLanguage(isEn ? 'VN' : 'EN');
    };

    if (variant === 'segmented') {
        return (
            <div className={`inline-flex items-center p-1 bg-[#040e1c]/90 hover:bg-[#06152a]/95 border border-cyan-500/40 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all ${className}`}>
                <button
                    type="button"
                    onClick={() => handleSelect('VN')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        !isEn
                            ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/80 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                    title="Chuyển sang Tiếng Việt"
                >
                    <VietnamFlag className="w-4 h-3" />
                    <span>VN</span>
                </button>

                <button
                    type="button"
                    onClick={() => handleSelect('EN')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        isEn
                            ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/80 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                    title="Switch to English"
                >
                    <USFlag className="w-4 h-3" />
                    <span>EN</span>
                </button>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <button
                type="button"
                onClick={toggleLanguage}
                title={isEn ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-[#051120]/90 hover:bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 cursor-pointer backdrop-blur-xl group ${className}`}
            >
                {isEn ? <USFlag className="w-4 h-3" /> : <VietnamFlag className="w-4 h-3" />}
                <span className="text-xs font-mono font-bold text-cyan-200 group-hover:text-white">
                    {isEn ? 'EN' : 'VN'}
                </span>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            title={isEn ? 'Nhấp để chuyển sang Tiếng Việt' : 'Click to switch to English'}
            className={`flex items-center gap-2.5 px-3.5 py-2 bg-[#040e1c]/90 hover:bg-[#071933]/90 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 rounded-xl text-xs font-bold text-slate-100 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] cursor-pointer z-50 active:scale-95 group font-mono ${className}`}
        >
            <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded-lg border border-cyan-900/50">
                {isEn ? <USFlag className="w-5 h-3.5 shadow-sm" /> : <VietnamFlag className="w-5 h-3.5 shadow-sm" />}
            </div>
            
            <div className="flex flex-col text-left">
                <span className="text-[11px] font-black tracking-wider text-cyan-200 group-hover:text-white transition-colors">
                    {isEn ? 'English' : 'Tiếng Việt'}
                </span>
                <span className="text-[9px] text-slate-400 group-hover:text-cyan-400/80 transition-colors">
                    {isEn ? 'Switch to VN' : 'Chuyển sang EN'}
                </span>
            </div>

            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse ml-1" />
        </button>
    );
};

export default LanguageToggle;
