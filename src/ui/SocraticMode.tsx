import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSimulationStore } from '../engine/store';
import { askSocraticLucy } from '../engine/aiService';
import lucyIdle from '../assets/lucy_socratic_idle_clean.png';
import lucySpeak from '../assets/lucy_socratic_speak_clean.png';
import lucyFacePFP from '../assets/lucy_FACE_PFP_clean.png';

interface ChatMessage {
    role: 'lucy' | 'user' | 'ai';
    text: string;
}

const INTRO_DIALOGUE_VI = [
    "Đừng cố gắng điều chỉnh giao diện. Em đã bị kéo khỏi mô phỏng chính.",
    "Tôi là Lucy. Nhưng không phải người cố vấn hiền lành mà em từng biết trong phòng học.",
    "Ở đây, tôi là thẩm tra viên logic của em. Nhiệm vụ của tôi không phải là dạy em, mà là bẻ gãy mọi giả thuyết sai lầm của em.",
    "Hãy đưa ra một kết luận hóa học. Bất kỳ kết luận nào em nghĩ là đúng từ các thí nghiệm vừa rồi.",
    "Hãy nhớ: Tôi sẽ không gợi ý câu trả lời. Tôi sẽ chỉ ra từng lỗ hổng trong tư duy của em cho đến khi em tự tìm ra chân lý."
];

const INTRO_DIALOGUE_EN = [
    "Do not attempt to adjust your interface. You have been pulled from the main simulation.",
    "I am Lucy. But not the gentle mentor you know from the learning chamber.",
    "Here, I am your logical interrogator. My task is not to spoon-feed you, but to deconstruct every flawed assumption you hold.",
    "Present a chemical claim or hypothesis. Anything you believe to be true based on your lab experiments.",
    "Remember: I will offer no answers. I will probe every inconsistency in your reasoning until you uncover the truth yourself."
];

const TypewriterText: React.FC<{ text: string; speed?: number; onType?: () => void }> = ({ text, speed = 20, onType }) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayed('');
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
                onType?.();
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, onType]);

    return <span>{displayed}</span>;
};

const SocraticMode: React.FC = () => {
    const isSocraticModeActive = useSimulationStore(state => state.isSocraticModeActive);
    const setSocraticMode = useSimulationStore(state => state.setSocraticMode);
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
    const customApiKey = useSimulationStore(state => state.customApiKey);

    const introDialogue = isVi ? INTRO_DIALOGUE_VI : INTRO_DIALOGUE_EN;

    const socraticIntroEN = "Present your hypothesis. Tell me what chemical phenomenon you believe you observed, and why you think it occurred.";
    const socraticIntroVI = "Hãy trình bày giả thuyết của em. Nói cho tôi biết hiện tượng hóa học em đã quan sát, và giải thích vì sao em tin điều đó xảy ra.";

    const [isBooting, setIsBooting] = useState(true);
    const [introStep, setIntroStep] = useState(0);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [aiEmotion, setAiEmotion] = useState<string>('NEUTRAL');
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        if (chatMessagesContainerRef.current) {
            chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
        }
    }, []);

    // Initial boot sequence
    useEffect(() => {
        if (isSocraticModeActive) {
            setIsBooting(true);
            const timer = setTimeout(() => {
                setIsBooting(false);
                setIntroStep(0);
                setChatHistory([
                    { role: 'ai', text: isVi ? socraticIntroVI : socraticIntroEN }
                ]);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [isSocraticModeActive, isVi, socraticIntroVI, socraticIntroEN]);

    // Handle ESC key to exit
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSocraticModeActive) {
                setSocraticMode(false);
                setTimeout(() => {
                    setIntroStep(0);
                    setChatHistory([
                        { role: 'ai', text: isVi ? socraticIntroVI : socraticIntroEN }
                    ]);
                    setAiEmotion('NEUTRAL');
                }, 300);
            }
        };

        if (isSocraticModeActive) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSocraticModeActive, setSocraticMode, isVi, socraticIntroVI, socraticIntroEN]);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isTyping, introStep, scrollToBottom]);

    if (!isSocraticModeActive) return null;

    if (isBooting) {
        return (
            <div className="fixed inset-0 z-[1000] bg-[#070204] flex flex-col items-center justify-center font-mono overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none" />
                <div className="w-[420px] max-w-[90%] flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-ping" />
                        <p className="text-rose-400 font-bold tracking-widest uppercase text-xs">
                            {'>'} {isVi ? 'KHỞI TẠO LIÊN KẾT PHẢN BIỆN SOCRATIC....' : 'INITIALIZING SOCRATIC NEURAL LINK....'}
                        </p>
                    </div>
                    <div className="w-full h-1.5 bg-rose-950/80 rounded-full overflow-hidden border border-rose-900/50">
                        <div className="h-full bg-gradient-to-r from-rose-600 to-red-500 animate-[fillBar_1.2s_ease-out_forwards]" />
                    </div>
                </div>
                <style>{`
                    @keyframes fillBar {
                        0% { width: 0%; }
                        40% { width: 35%; }
                        70% { width: 85%; }
                        100% { width: 100%; }
                    }
                `}</style>
            </div>
        );
    }

    const isIntroComplete = introStep >= introDialogue.length - 1;

    const handleNext = () => {
        setIntroStep(prev => prev + 1);
    };

    const handleSkip = () => {
        setIntroStep(introDialogue.length - 1);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userText = inputValue.trim();
        const currentHistory = [...chatHistory];
        
        setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
        setInputValue('');
        setIsTyping(true);

        const activeKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;
        const response = await askSocraticLucy(currentHistory, userText, activeKey);
        
        const match = response.match(/^\[(.*?)\]/);
        let parsedEmotion = 'NEUTRAL';
        let cleanText = response;

        if (match) {
            parsedEmotion = match[1].toUpperCase();
            cleanText = response.replace(/^\[.*?\]\s*/, '');
        }

        setAiEmotion(parsedEmotion);
        setChatHistory(prev => [...prev, { role: 'lucy', text: cleanText }]);
        setIsTyping(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="fixed inset-0 z-[250] bg-[#060205] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Navigation & Status Bar - Strictly Pinned to Top */}
            <header className="relative z-30 px-6 py-3 flex justify-between items-center border-b border-rose-950/60 bg-[#0c0407]/90 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-700 p-[1px] shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                        <div className="w-full h-full bg-[#180509] rounded-xl flex items-center justify-center font-mono font-bold text-sm text-rose-300">
                            ⚡
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-sm md:text-base font-black tracking-wider uppercase bg-gradient-to-r from-white via-rose-200 to-red-400 bg-clip-text text-transparent">
                                {isVi ? 'THÁCH THỨC SOCRATIC : CHẤT VẤN LOGIC' : 'SOCRATIC CHALLENGE : SYMBIOTIC MATRIX'}
                            </h2>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                {isVi ? 'CHẾ ĐỘ PHẢN BIỆN' : 'STRICT ADVERSARIAL MODE'}
                            </span>
                            {/* Status pill in header */}
                            <div className="hidden xl:flex items-center gap-2 px-3 py-0.5 bg-rose-950/60 border border-rose-500/40 rounded-full text-[11px] font-mono text-rose-200 shadow-inner">
                                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-amber-400 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
                                <span>
                                    {isTyping 
                                        ? (isVi ? '✦ Đang thẩm định phản chứng logic...' : '✦ Deconstructing your scientific premise...')
                                        : (isVi ? '✦ Đưa ra giả thuyết hóa học để đối chất cùng Giáo sư Lucy' : '✦ Present your chemical hypothesis to cross-examine')
                                    }
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">
                            {isVi ? 'Tranh luận khoa học và mổ xẻ các ngộ nhận hóa học' : 'Deep Socratic Cross-Examination & Misconception Deconstruction'}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setSocraticMode(false);
                        setTimeout(() => { 
                            setIntroStep(0); 
                            setChatHistory([{ role: 'ai', text: isVi ? socraticIntroVI : socraticIntroEN }]); 
                            setAiEmotion('NEUTRAL'); 
                        }, 300);
                    }}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-400 text-rose-300 text-xs font-mono tracking-widest uppercase transition-all shadow-sm hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                >
                    <span>←</span>
                    <span>{isVi ? 'THOÁT / VỀ PHÒNG THÍ NGHIỆM' : 'ESC / RETURN TO LAB'}</span>
                </button>
            </header>

            {/* Main Stage: Well-Proportioned Left VN Console + Right Standing Lucy Sprite */}
            <main className="relative z-10 flex-1 min-h-0 flex flex-col lg:flex-row items-stretch justify-center px-4 md:px-8 xl:px-12 pb-3 pt-3 gap-6 xl:gap-10 max-w-[1680px] w-full mx-auto overflow-hidden">
                
                {/* Left/Center Side: Well-Proportioned VN Dialogue Console */}
                <div className="flex-1 max-w-3xl xl:max-w-4xl w-full h-full max-h-[calc(100vh-95px)] bg-gradient-to-b from-[#18080e]/95 via-[#0f0408]/95 to-[#060204]/95 border border-rose-500/40 rounded-3xl p-5 md:p-6 shadow-[0_0_50px_rgba(244,63,94,0.2)] backdrop-blur-2xl flex flex-col overflow-hidden relative">
                    
                    {/* Header Tag inside Chat Box */}
                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-rose-900/40 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img 
                                    src={lucyFacePFP} 
                                    alt="Avatar" 
                                    className="w-9 h-9 rounded-full border border-rose-400 object-cover shadow-[0_0_12px_rgba(244,63,94,0.5)]" 
                                />
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-rose-400 border-2 border-slate-950 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-widest block">
                                    PROF. LUCY : INTERROGATOR
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {isVi ? 'Lõi suy luận logic không khoan nhượng' : 'Uncompromising Chemical Interrogator'}
                                </span>
                            </div>
                        </div>

                        {/* Skip Intro Button */}
                        {!isIntroComplete && (
                            <button 
                                onClick={handleSkip}
                                className="px-3 py-1 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-800 text-rose-300 text-[10px] font-mono rounded-lg tracking-wider uppercase transition-colors"
                            >
                                {isVi ? 'BỎ QUA GIỚI THIỆU ⏭' : 'SKIP INTRO ⏭'}
                            </button>
                        )}
                    </div>

                    {/* Chat Messages Body */}
                    <div ref={chatMessagesContainerRef} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 space-y-3.5 font-sans text-sm select-text">
                        {!isIntroComplete ? (
                            <div className="flex-1 flex flex-col justify-center items-center h-full py-4 select-text">
                                <div className="p-5 rounded-2xl bg-[#13060a]/90 border border-rose-900/60 text-rose-100 text-base md:text-lg leading-relaxed font-mono shadow-inner w-full select-text cursor-text selection:bg-rose-500/40 selection:text-white">
                                    <TypewriterText text={introDialogue[introStep]} speed={18} onType={scrollToBottom} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl text-xs font-mono text-rose-300 select-text cursor-text selection:bg-rose-500/40 selection:text-white">
                                    <p>✦ {introDialogue[introDialogue.length - 1]}</p>
                                </div>
                                
                                {chatHistory.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} select-text`}>
                                        <div className={`max-w-[85%] rounded-2xl p-3.5 transition-all select-text cursor-text selection:bg-rose-500/40 selection:text-white ${
                                            msg.role === 'user' 
                                                ? 'bg-gradient-to-r from-rose-950/50 to-red-950/50 border border-rose-700/50 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
                                                : 'bg-[#120509]/80 border border-slate-800 text-slate-200 shadow-md'
                                        }`}>
                                            <div className="flex items-center justify-between gap-3 mb-1 select-none">
                                                <span className={`block text-[10px] font-mono uppercase tracking-widest font-bold ${
                                                    msg.role === 'user' ? 'text-rose-400' : 'text-cyan-400'
                                                }`}>
                                                    {msg.role === 'user' ? '> HYPOTHESIS' : '✦ PROF. LUCY'}
                                                </span>
                                                <button
                                                    onClick={() => handleCopy(msg.text, idx)}
                                                    className="text-[9px] font-mono text-slate-400 hover:text-rose-300 opacity-60 hover:opacity-100 transition-all flex items-center gap-1 cursor-pointer"
                                                    title={isVi ? 'Sao chép vào khay nhớ tạm' : 'Copy to clipboard'}
                                                >
                                                    {copiedIdx === idx ? (
                                                        <span className="text-rose-400 font-bold">✓ {isVi ? 'ĐÃ SAO CHÉP' : 'COPIED'}</span>
                                                    ) : (
                                                        <span>📋 {isVi ? 'SAO CHÉP' : 'COPY'}</span>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans select-text cursor-text selection:bg-rose-500/40 selection:text-white">
                                                {(msg.role === 'lucy' || msg.role === 'ai') && idx === chatHistory.length - 1 ? (
                                                    <TypewriterText text={msg.text} speed={18} onType={scrollToBottom} />
                                                ) : (
                                                    msg.text
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[85%] rounded-2xl p-3.5 bg-[#120509]/80 border border-rose-500/40 shadow-md">
                                            <span className="block text-[10px] font-mono uppercase tracking-widest mb-1 text-rose-400 font-bold">
                                                ✦ PROF. LUCY
                                            </span>
                                            <div className="flex items-center gap-2 text-rose-300 font-mono text-xs">
                                                <span>{isVi ? 'Đang thẩm định phản chứng logic' : 'Deconstructing your premise'}</span>
                                                <span className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Bottom Interaction Bar */}
                    <div className="mt-2.5 pt-2.5 border-t border-rose-900/40 shrink-0">
                        {!isIntroComplete ? (
                            <div className="flex justify-end">
                                <button 
                                    onClick={handleNext}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <span>{isVi ? 'TIẾP TỤC' : 'CONTINUE'}</span>
                                    <span>➔</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2.5">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isTyping}
                                    placeholder={isVi ? 'Trình bày giả thuyết hoặc lập luận hóa học của em...' : 'State your chemical reasoning or scientific hypothesis...'} 
                                    className="flex-1 bg-[#060205] border border-rose-900/60 focus:border-rose-400 text-rose-100 placeholder:text-slate-600 rounded-xl px-4 h-10 text-sm font-sans focus:outline-none transition-all shadow-inner disabled:opacity-50"
                                />
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isTyping || !inputValue.trim()}
                                    className="h-10 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all active:scale-95 shrink-0"
                                >
                                    {isVi ? 'GỬI LẬP LUẬN ➔' : 'SUBMIT LOGIC ➔'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Clean Unobstructed Visual-Novel Style Lucy Cut-in (Thigh-Up) */}
                <div className="hidden lg:flex flex-col items-center justify-start w-[500px] xl:w-[600px] 2xl:w-[700px] h-full shrink-0 pointer-events-none select-none relative overflow-hidden pt-0">
                    {/* Floor Ambient Glow Shadow */}
                    <div className="absolute bottom-0 w-96 h-24 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Large Standing Lucy Image (Anchored at TOP: Head & Fox Mask are 100% visible, lower legs cut off at bottom by container) */}
                    <div className="relative w-full flex-1 flex items-start justify-center overflow-hidden">
                        <img 
                            src={isTyping ? lucySpeak : lucyIdle} 
                            alt="Prof. Lucy Sprite" 
                            className="w-[560px] xl:w-[660px] 2xl:w-[760px] max-w-none h-auto object-cover object-top drop-shadow-[0_0_50px_rgba(244,63,94,0.45)] transition-all duration-300 pointer-events-auto"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default SocraticMode;
