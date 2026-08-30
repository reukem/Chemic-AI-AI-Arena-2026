import React, { useState, useEffect, useRef } from 'react';
import { useSimulationStore } from '../engine/store';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'framer-motion';
import lucyIdle from '../assets/lucy_learning_idle_clean.png';
import lucySpeak from '../assets/lucy_learning_speak_clean.png';
import lucyFacePFP from '../assets/lucy_FACE_PFP_clean.png';

interface ChatMessage {
    role: 'lucy' | 'user' | 'ai';
    text: string;
}

const LearningMode: React.FC = () => {
    const isLearningModeActive = useSimulationStore(state => state.isLearningModeActive);
    const setLearningMode = useSimulationStore(state => state.setLearningMode);
    const rawLanguage = useSimulationStore(state => state.language);
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
    const customApiKey = useSimulationStore(state => state.customApiKey);

    const [academicLevel, setAcademicLevel] = useState('Vietnamese High School Graduation Exam (THPTQG)');

    const introTextEN = "Hello! I am Professor Lucy, your adaptive chemistry mentor. Whether you're stuck on homework, solving stoichiometry problems, or preparing for high school and AP exams, I am here to guide you step by step. What are we studying today?";
    const introTextVI = "Chào em! Cô là Giáo sư Lucy, cố vấn học tập hóa học của em. Dù em đang gặp khó khăn với bài tập về nhà, giải toán hóa, hay ôn thi THPT Quốc Gia, cô luôn ở đây để hướng dẫn em từng bước. Hôm nay chúng mình cùng học gì nào?";

    const [isBooting, setIsBooting] = useState(true);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const handleCopy = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatMessagesContainerRef.current) {
            chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isTyping]);

    // Initial boot sequence
    useEffect(() => {
        if (isLearningModeActive) {
            setIsBooting(true);
            const timer = setTimeout(() => {
                setIsBooting(false);
                setChatHistory([
                    { role: 'ai', text: isVi ? introTextVI : introTextEN }
                ]);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [isLearningModeActive, isVi, introTextVI, introTextEN]);

    // Handle ESC key to exit
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isLearningModeActive) {
                setLearningMode(false);
                setTimeout(() => {
                    setChatHistory([{ role: 'ai', text: isVi ? introTextVI : introTextEN }]);
                    setAttachedFile(null);
                }, 300);
            }
        };

        if (isLearningModeActive) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLearningModeActive, setLearningMode, isVi, introTextVI, introTextEN]);

    const handleSubmit = async () => {
        if ((!inputValue.trim() && !attachedFile) || isTyping) return;

        const userText = inputValue.trim();
        const currentFile = attachedFile;
        setChatHistory(prev => [...prev, { role: 'user', text: userText || (currentFile ? `[Attached File: ${currentFile.name}]` : '') }]);
        setInputValue('');
        setAttachedFile(null);
        setIsTyping(true);

        try {
            const DEFAULT_GEMINI_KEY = 'AIzaSyD_HG86cparkxU6igrfeT5aRdKNhClvN2Q';
            const activeKey = customApiKey || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || DEFAULT_GEMINI_KEY;
            const ai = new GoogleGenAI({ apiKey: activeKey });
            
            const systemInstruction = `
You are Professor Lucy (Lead Chemistry Professor and AI Mentor in Chemic-AI).
Target Curriculum / Academic Level: "${academicLevel}".
Language Mode: ${isVi ? 'VIETNAMESE' : 'ENGLISH'}.
${isVi 
    ? 'BẠN PHẢI TRẢ LỜI HOÀN TOÀN BẰNG TIẾNG VIỆT với phong thái giảng dạy thân thiện, sư phạm, chuẩn mực theo SGK Hóa học Việt Nam (GDPT 2018). Nếu học sinh gửi ảnh bài tập hay tài liệu, hãy phân tích đề bài, trích xuất dữ kiện, viết phương trình phản ứng cân bằng và giải từng bước rõ ràng.' 
    : 'You MUST respond entirely in English with an encouraging, supportive pedagogical tone. If student attaches notes/exercises, break down given data, write balanced chemical equations, and provide clear step-by-step guidance.'}
Use clean markdown formatting, chemical formulas (e.g. H2SO4, NaOH), reaction conditions (temperature, catalysts), and clear bullet points.
`;

            let promptParts: any[] = [];

            if (currentFile) {
                const reader = new FileReader();
                const base64Data = await new Promise<string>((resolve, reject) => {
                    reader.onloadend = () => {
                        const res = reader.result as string;
                        const base64 = res.includes(',') ? res.split(',')[1] : res;
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(currentFile);
                });

                promptParts.push({
                    inlineData: {
                        mimeType: currentFile.type || 'image/jpeg',
                        data: base64Data
                    }
                });
            }

            // Build recent chat history context
            const recentHistory = chatHistory.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Lucy'}: ${m.text}`).join('\n');
            const fullPromptText = `${systemInstruction}\n\nRecent Conversation Context:\n${recentHistory}\n\nCurrent User Input: ${userText || 'Please analyze the attached chemistry problem/document in detail.'}`;

            promptParts.push({ text: fullPromptText });

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ role: 'user', parts: promptParts }],
                config: { temperature: 0.3 }
            });

            const responseText = result.text || (isVi ? "Cô đã đọc câu hỏi của em! Em hãy đặt thêm câu hỏi cụ thể hơn nhé." : "I've reviewed your question! Let me know if you need more details.");
            
            setChatHistory(prev => [...prev, { role: 'lucy', text: responseText }]);
            
        } catch (error) {
            console.error("Learning Mode API Error:", error);
            setChatHistory(prev => [...prev, { 
                role: 'lucy', 
                text: isVi 
                    ? "Giáo sư Lucy: Đã xảy ra lỗi khi kết nối mạng hoặc xử lý tệp! Em hãy thử kiểm tra lại kết nối mạng hoặc gửi lại câu hỏi nhé! (•‿•)" 
                    : "Prof. Lucy: An error occurred while connecting or analyzing the file! Please check your network and try again! (•‿•)" 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isLearningModeActive) return null;

    if (isBooting) {
        return (
            <div className="fixed inset-0 z-[1000] bg-[#020712] flex flex-col items-center justify-center font-mono overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />
                
                <div className="w-[420px] max-w-[90%] flex flex-col items-center gap-6 relative z-10">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute inset-0 border-2 border-emerald-500/30 rounded-full border-t-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        />
                        <img 
                            src={lucyFacePFP} 
                            alt="Lucy Avatar" 
                            className="w-16 h-16 rounded-full border border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.5)] object-cover"
                        />
                    </div>
                    
                    <div className="w-full flex flex-col gap-3 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                            <h2 className="text-sm font-bold text-white tracking-[0.25em] uppercase font-mono">
                                {isVi ? 'KHỞI TẠO CỐ VẤN HỌC TẬP' : 'INITIALIZING MENTOR PROTOCOL'}
                            </h2>
                        </div>
                        
                        <p className="text-[11px] text-emerald-400 font-mono tracking-wider">
                            {isVi ? 'Đang hiệu chuẩn mạng nơ-ron của Giáo sư Lucy...' : 'Calibrating Prof. Lucy neural matrix...'}
                        </p>

                        <div className="w-full h-1.5 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-900/50 mt-1">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 animate-[fillBar_1.2s_ease-out_forwards]" />
                        </div>
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

    return (
        <div className="fixed inset-0 z-[250] bg-[#030914] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Navigation & Status Bar - Strictly Pinned to Top */}
            <header className="relative z-30 px-6 py-3 flex justify-between items-center border-b border-emerald-900/40 bg-[#040e1c]/90 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-[1px] shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <div className="w-full h-full bg-[#061814] rounded-xl flex items-center justify-center font-mono font-bold text-sm text-emerald-300">
                            🎓
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-sm md:text-base font-black tracking-wider uppercase bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                                {isVi ? 'PHÒNG CỐ VẤN : HỌC TẬP & ÔN THI' : 'MENTOR CHAMBER : LEARNING LAB'}
                            </h2>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                {isVi ? 'GIÁO SƯ TRỰC TUYẾN' : 'AI MENTOR ONLINE'}
                            </span>
                            {/* Live Mentor Status Pill next to title */}
                            <div className="hidden xl:flex items-center gap-2 px-3 py-0.5 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-[11px] font-mono text-emerald-200 shadow-inner">
                                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                                <span>
                                    {isTyping 
                                        ? (isVi ? '✦ Cô Lucy đang phân tích tài liệu & giải toán...' : '✦ Prof. Lucy is computing breakdown & reaction logic...')
                                        : (isVi ? '✦ Đính kèm ảnh bài tập hoặc hỏi Giáo sư Lucy bất kỳ kiến thức nào' : '✦ Attach problem notes or ask Prof. Lucy anything')
                                    }
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">
                            {isVi ? 'Hỗ trợ giải bài tập, phân tích tài liệu và luyện thi chuyên sâu' : 'Interactive Socratic Homework Helper & Curriculum Tutor'}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setLearningMode(false);
                        setTimeout(() => { 
                            setChatHistory([{ role: 'ai', text: isVi ? introTextVI : introTextEN }]); 
                            setAttachedFile(null); 
                        }, 300);
                    }}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-400 text-emerald-300 text-xs font-mono tracking-widest uppercase transition-all shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                    <span>←</span>
                    <span>{isVi ? 'THOÁT / VỀ PHÒNG THÍ NGHIỆM' : 'ESC / RETURN TO LAB'}</span>
                </button>
            </header>

            {/* Main Stage: Well-Proportioned Left Chat Console + Right Standing Lucy Sprite */}
            <main className="relative z-10 flex-1 min-h-0 flex flex-col lg:flex-row items-stretch justify-center px-4 md:px-8 xl:px-12 pb-3 pt-3 gap-6 xl:gap-10 max-w-[1680px] w-full mx-auto overflow-hidden">
                
                {/* Left/Center Side: Well-Proportioned VN Dialogue Terminal */}
                <div className="flex-1 max-w-3xl xl:max-w-4xl w-full h-full max-h-[calc(100vh-95px)] bg-gradient-to-b from-[#061424]/95 via-[#040e1a]/95 to-[#02070e]/95 border border-emerald-500/35 rounded-3xl p-5 md:p-6 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-2xl flex flex-col overflow-hidden relative">
                    
                    {/* Header Tag inside Chat Box */}
                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-emerald-900/40 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img 
                                    src={lucyFacePFP} 
                                    alt="Avatar" 
                                    className="w-9 h-9 rounded-full border border-emerald-400 object-cover shadow-[0_0_12px_rgba(16,185,129,0.4)]" 
                                />
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest block">
                                    PROF. LUCY
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {isVi ? 'Cố vấn Hóa học Trực quan' : 'Adaptive Chemistry Mentor'}
                                </span>
                            </div>
                        </div>

                        {/* Curriculum Selection Dropdown */}
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline text-[10px] font-mono text-slate-400 uppercase">
                                {isVi ? 'Chương trình:' : 'Target:'}
                            </span>
                            <select 
                                value={academicLevel} 
                                onChange={(e) => setAcademicLevel(e.target.value)}
                                className="bg-[#030914] text-emerald-300 border border-emerald-800/60 rounded-xl px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
                            >
                                <option value="Middle School Chemistry (Grades 6-8)">Middle School (Grades 6-8)</option>
                                <option value="General High School (Grades 9-11)">General High School</option>
                                <option value="Vietnamese High School Graduation Exam (THPTQG)">VN THPT Quốc Gia</option>
                                <option value="Advanced Placement (AP) / IB Chemistry">AP / IB Chemistry</option>
                                <option value="University Chemistry (General & Organic)">University Level</option>
                            </select>
                        </div>
                    </div>

                    {/* Chat Messages Body */}
                    <div ref={chatMessagesContainerRef} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 space-y-3.5 font-sans text-sm select-text">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} select-text`}>
                                <div className={`max-w-[85%] rounded-2xl p-3.5 transition-all select-text cursor-text selection:bg-emerald-500/40 selection:text-white ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-600/50 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                                        : 'bg-[#061220]/80 border border-slate-800 text-slate-200 shadow-md'
                                }`}>
                                    <div className="flex items-center justify-between gap-3 mb-1 select-none">
                                        <span className={`block text-[10px] font-mono uppercase tracking-widest font-bold ${
                                            msg.role === 'user' ? 'text-emerald-400' : 'text-cyan-400'
                                        }`}>
                                            {msg.role === 'user' ? '> RESEARCHER' : '✦ PROF. LUCY'}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(msg.text, idx)}
                                            className="text-[9px] font-mono text-slate-400 hover:text-emerald-300 opacity-60 hover:opacity-100 transition-all flex items-center gap-1 cursor-pointer"
                                            title={isVi ? 'Sao chép vào khay nhớ tạm' : 'Copy to clipboard'}
                                        >
                                            {copiedIdx === idx ? (
                                                <span className="text-emerald-400 font-bold">✓ {isVi ? 'ĐÃ SAO CHÉP' : 'COPIED'}</span>
                                            ) : (
                                                <span>📋 {isVi ? 'SAO CHÉP' : 'COPY'}</span>
                                            )}
                                        </button>
                                    </div>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans select-text cursor-text selection:bg-emerald-500/40 selection:text-white">
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="max-w-[85%] rounded-2xl p-3.5 bg-[#061220]/80 border border-emerald-500/40 shadow-md">
                                    <span className="block text-[10px] font-mono uppercase tracking-widest mb-1 text-emerald-400 font-bold">
                                        ✦ PROF. LUCY
                                    </span>
                                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs">
                                        <span>{isVi ? 'Cô Lucy đang phân tích tài liệu' : 'Lucy is analyzing your notes'}</span>
                                        <span className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Attached File Preview Pill */}
                    {attachedFile && (
                        <div className="mt-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs text-emerald-300 font-mono shrink-0">
                            <span className="truncate max-w-sm">📎 {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                            <button onClick={() => setAttachedFile(null)} className="hover:text-red-400 text-slate-400 font-bold ml-2">✕</button>
                        </div>
                    )}

                    {/* Bottom Prompt Bar */}
                    <div className="mt-2.5 pt-2.5 border-t border-emerald-900/40 flex items-center gap-2.5 shrink-0">
                        {/* File Attachment Button */}
                        <label className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-xl bg-[#030914] border border-emerald-900/60 hover:border-emerald-400 text-emerald-400 hover:text-emerald-200 transition-all shadow-inner shrink-0 group">
                            <input 
                                type="file" 
                                accept="image/*,application/pdf" 
                                className="hidden" 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setAttachedFile(e.target.files[0]);
                                    }
                                }} 
                            />
                            <span className="text-base group-hover:scale-110 transition-transform">📎</span>
                        </label>

                        {/* Input Field */}
                        <input 
                            type="text" 
                            placeholder={isVi ? 'Hỏi Giáo sư Lucy bất kỳ câu hỏi nào về phản ứng, bài tập...' : 'Ask Prof. Lucy anything about chemical reactions, mechanisms...'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmit();
                            }}
                            disabled={isTyping}
                            className="flex-1 bg-[#030914] border border-emerald-900/60 focus:border-emerald-400 text-emerald-100 placeholder:text-slate-500 rounded-xl px-4 h-10 text-sm font-sans focus:outline-none transition-all shadow-inner"
                        />

                        {/* Submit Button */}
                        <button 
                            onClick={handleSubmit}
                            disabled={isTyping || (!inputValue.trim() && !attachedFile)}
                            className="h-10 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 shrink-0"
                        >
                            {isVi ? 'GỬI ➔' : 'SUBMIT ➔'}
                        </button>
                    </div>
                </div>

                {/* Right Side: Clean Unobstructed Visual-Novel Style Lucy Cut-in (Thigh-Up) */}
                <div className="hidden lg:flex flex-col items-center justify-start w-[500px] xl:w-[600px] 2xl:w-[700px] h-full shrink-0 pointer-events-none select-none relative overflow-hidden pt-0">
                    {/* Floor Ambient Glow Shadow */}
                    <div className="absolute bottom-0 w-96 h-24 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Large Standing Lucy Image (Anchored at TOP: Head & Fox Mask are 100% visible, lower legs cut off at bottom by container) */}
                    <div className="relative w-full flex-1 flex items-start justify-center overflow-hidden">
                        <img 
                            src={isTyping ? lucySpeak : lucyIdle} 
                            alt="Prof. Lucy Sprite" 
                            className="w-[560px] xl:w-[660px] 2xl:w-[760px] max-w-none h-auto object-cover object-top drop-shadow-[0_0_50px_rgba(16,185,129,0.45)] transition-all duration-300 pointer-events-auto"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default LearningMode;
