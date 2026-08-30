import React, { useState, useEffect, useRef } from 'react';
import { useSimulationStore } from '../engine/store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { askLucyAssistant } from '../engine/aiService';
import { audioManager } from '../engine/AudioManager';
import lucyFacePFP from '../assets/lucy_FACE_PFP_clean.png';

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const Commlink: React.FC = () => {
    const env = useSimulationStore(state => state.env);
    const rawLanguage = useSimulationStore(state => state.language);
    const language = rawLanguage === 'VN' || rawLanguage === 'vi' ? 'vi' : 'en';
    const containers = useSimulationStore(state => state.containers);

    const welcomeEN = "Welcome to the Quantum Reality Engine. I am Professor Lucy. What is your hypothesis?";
    const welcomeVI = "Chào mừng em đến với Quantum Reality Engine. Cô là Giáo sư Lucy. Giả thuyết của em là gì?";

    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{ 
        sender: 'ai', 
        text: language === 'vi' ? welcomeVI : welcomeEN 
    }]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [isChatExpanded, setIsChatExpanded] = useState(true);

    useEffect(() => {
        if (chatHistory.length === 1 && chatHistory[0].sender === 'ai') {
            const welcomeText = language === 'vi' ? welcomeVI : welcomeEN;
            if (chatHistory[0].text !== welcomeText) {
                setChatHistory([{ sender: 'ai', text: welcomeText }]);
            }
        }
    }, [language, welcomeVI, welcomeEN]);

    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleCopy = (text: string, idx: number) => {
        audioManager.playClick();
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isThinking]);

    const handleAnalyze = async (query: string | React.MouseEvent) => {
        const textQuery = typeof query === 'string' ? query : "Give me a general status report on the current workbench.";
        setChatHistory(prev => [...prev, { sender: 'user', text: textQuery }]);
        setIsThinking(true);
        
        const cleanState = containers.map(c => ({
            id: c.id,
            volume: c.volume,
            pH: c.ph.toFixed(1),
            contents: Object.entries(c.contents).reduce((acc, [chemId, vol]) => {
                if(!chemId.startsWith('reacted_')) {
                    acc[(CHEMICAL_REGISTRY[chemId]?.name as any)?.[language] || CHEMICAL_REGISTRY[chemId]?.name.EN || chemId] = vol;
                }
                return acc;
            }, {} as Record<string, number>),
            temperature: env.temp
        }));

        const sysInstruction = language === 'vi' 
            ? "\n\nSystem Instruction: Giao diện đang ở chế độ tiếng Việt. Bạn PHẢI phản hồi hoàn toàn bằng tiếng Việt với ngữ điệu tự nhiên, sử dụng thuật ngữ hóa học chính xác của Việt Nam."
            : "\n\nSystem Instruction: The user has selected English. You MUST respond entirely in English.";

        const payloadQuery = textQuery + sysInstruction;

        const response = await askLucyAssistant(payloadQuery, cleanState);
        setChatHistory(prev => [...prev, { sender: 'ai', text: response }]);
        setIsThinking(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && userInput.trim()) {
            handleAnalyze(userInput);
            setUserInput("");
        }
    };

    return (
        <div className="absolute bottom-6 right-6 z-50 w-88 max-w-[90vw] pointer-events-auto bg-gradient-to-b from-[#051122]/95 to-[#030914]/95 backdrop-blur-2xl rounded-3xl border border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.15)] p-4 flex flex-col overflow-hidden transition-all duration-300">
            {/* Holographic Header */}
            <div
                className="flex items-center justify-between gap-3 cursor-pointer group"
                onClick={() => { audioManager.playClick(); setIsChatExpanded(!isChatExpanded); }}
                onMouseEnter={() => audioManager.playHover()}
            >
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        <img 
                            src={lucyFacePFP} 
                            alt="Lucy Avatar" 
                            className="w-11 h-11 rounded-full border border-cyan-400 object-cover shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#030914] rounded-full animate-pulse" />
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-sm font-black text-white tracking-wide font-sans group-hover:text-cyan-200 transition-colors flex items-center gap-2">
                            <span>{language === 'vi' ? 'GIÁO SƯ LUCY' : 'PROF. LUCY'}</span>
                            <span className="text-[9px] font-mono font-bold text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/60">
                                AI ASSISTANT
                            </span>
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                                {language === 'vi' ? 'TRỰC TUYẾN & NGOẠI TUYẾN SẴN SÀNG' : 'ONLINE / OFFLINE READY'}
                            </span>
                        </div>
                    </div>
                </div>

                <span className={`text-cyan-400 text-xs font-mono group-hover:scale-125 transition-transform duration-300 ${isChatExpanded ? 'rotate-0' : 'rotate-180'}`}>
                    ▼
                </span>
            </div>

            {/* Expandable Chat Console */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${isChatExpanded ? 'max-h-[500px] opacity-100 mt-3 gap-3' : 'max-h-0 opacity-0 mt-0 gap-0'}`}>
                
                {/* Quick Action Suggestion Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-0.5">
                    <button
                        onClick={() => handleAnalyze("What is in my containers right now? Give me a status report.")}
                        disabled={isThinking}
                        className="px-2.5 py-1 bg-[#07172c] hover:bg-cyan-950/80 border border-cyan-800/60 hover:border-cyan-400 text-[10px] font-mono text-cyan-300 rounded-lg whitespace-nowrap transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                        🔍 {language === 'vi' ? 'Báo cáo bàn thí nghiệm' : 'Status Report'}
                    </button>
                    <button
                        onClick={() => handleAnalyze("Are any of the chemicals currently mixed dangerous or reacting?")}
                        disabled={isThinking}
                        className="px-2.5 py-1 bg-[#07172c] hover:bg-cyan-950/80 border border-cyan-800/60 hover:border-cyan-400 text-[10px] font-mono text-cyan-300 rounded-lg whitespace-nowrap transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                        ⚡ {language === 'vi' ? 'Kiểm tra an toàn' : 'Safety Check'}
                    </button>
                    <button
                        onClick={() => handleAnalyze("Give me an educational chemistry challenge or pop quiz to test my knowledge!")}
                        disabled={isThinking}
                        className="px-2.5 py-1 bg-[#07172c] hover:bg-cyan-950/80 border border-cyan-800/60 hover:border-cyan-400 text-[10px] font-mono text-cyan-300 rounded-lg whitespace-nowrap transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                        🎯 {language === 'vi' ? 'Câu đố thử thách' : 'Pop Quiz'}
                    </button>
                </div>

                {/* Chat Body */}
                <div className="h-[260px] overflow-y-auto flex flex-col gap-2.5 p-3 custom-scrollbar bg-[#020712]/70 rounded-2xl border border-cyan-950 shadow-inner font-sans text-xs relative select-text">
                    <div className="relative z-10 flex flex-col gap-2.5 mt-auto select-text">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} select-text`}>
                                <div className={`px-3 py-2 rounded-xl max-w-[90%] whitespace-pre-wrap leading-relaxed shadow-sm select-text cursor-text selection:bg-cyan-500/40 selection:text-white ${
                                    msg.sender === 'user' 
                                        ? 'bg-cyan-900/30 text-cyan-100 border border-cyan-500/40' 
                                        : 'bg-[#081528]/85 text-slate-200 border border-slate-800'
                                }`}>
                                    <div className="flex items-center justify-between gap-3 mb-1 select-none">
                                        <span className={`block text-[8px] font-mono font-bold uppercase tracking-wider ${
                                            msg.sender === 'user' ? 'text-cyan-400' : 'text-emerald-400'
                                        }`}>
                                            {msg.sender === 'user' ? '> RESEARCHER' : '✦ PROF. LUCY'}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(msg.text, i)}
                                            className="text-[9px] font-mono text-slate-400 hover:text-cyan-300 opacity-60 hover:opacity-100 transition-all flex items-center gap-1 cursor-pointer"
                                            title={language === 'vi' ? 'Sao chép vào khay nhớ tạm' : 'Copy to clipboard'}
                                        >
                                            {copiedIdx === i ? (
                                                <span className="text-emerald-400 font-bold">✓ {language === 'vi' ? 'ĐÃ SAO CHÉP' : 'COPIED'}</span>
                                            ) : (
                                                <span>📋 {language === 'vi' ? 'SAO CHÉP' : 'COPY'}</span>
                                            )}
                                        </button>
                                    </div>
                                    <div className="select-text cursor-text selection:bg-cyan-500/40 selection:text-white">
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isThinking && (
                            <div className="flex items-start">
                                <div className="px-3 py-2 rounded-xl bg-[#081528]/80 text-cyan-400 font-mono text-[10px] uppercase tracking-wider border border-cyan-800/50 flex items-center gap-2">
                                    <span>{language === 'vi' ? 'Đang phân tích' : 'Lucy is analyzing'}</span>
                                    <span className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>

                {/* Chat Input */}
                <div className="relative flex items-center gap-2 shrink-0">
                    <input
                        type="text"
                        placeholder={language === 'vi' ? "Giả thuyết của em là gì?..." : "What is your hypothesis?..."}
                        className="text-cyan-200 font-sans text-xs bg-[#020712] h-10 px-3.5 rounded-xl border border-cyan-900/60 flex-grow focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600 shadow-inner"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isThinking}
                    />
                    <button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white font-bold transition-all flex items-center justify-center h-10 w-10 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
                        onClick={() => {
                            if(userInput.trim()) {
                                handleAnalyze(userInput);
                                setUserInput("");
                            }
                        }}
                    >
                        <span className="text-xs font-mono font-bold">➔</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Commlink;
