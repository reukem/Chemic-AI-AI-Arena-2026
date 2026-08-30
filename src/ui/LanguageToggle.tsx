import React from 'react';
import { useSimulationStore } from '../engine/store';

const LanguageToggle: React.FC = () => {
    const language = useSimulationStore(state => state.language);
    const setLanguage = useSimulationStore(state => state.setLanguage);

    const toggleLanguage = () => {
        setLanguage(language === 'EN' ? 'VN' : 'EN');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 backdrop-blur-md border border-slate-600/50 hover:border-cyan-500/60 rounded-xl text-sm font-bold text-slate-200 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer z-50 active:scale-95"
        >
            <span className="text-lg leading-none">
                {language === 'EN' ? '🇺🇸/🇬🇧' : '🇻🇳'}
            </span>
            <span className="tracking-wider">
                {language === 'EN' ? 'English' : 'Tiếng Việt'}
            </span>
        </button>
    );
};

export default LanguageToggle;
