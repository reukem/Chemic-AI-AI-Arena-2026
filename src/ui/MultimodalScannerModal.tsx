import React, { useState, useRef } from 'react';
import { useSimulationStore } from '../engine/store';
import { analyzeChemistryImage, VisionSolveResult, getOfflineVisionFallback } from '../services/GeminiVisionService';
import { audioManager } from '../engine/AudioManager';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

interface MultimodalScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MultimodalScannerModal: React.FC<MultimodalScannerModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN';
    const containers = useSimulationStore(state => state.containers);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState<string>('image/jpeg');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [solveResult, setSolveResult] = useState<VisionSolveResult | null>(null);
    const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'camera'>('preset');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

    if (!isOpen) return null;

    const sampleProblems = [
        {
            id: 'saponification',
            title: isVi ? 'Xà phòng hóa chất béo (Đề thi THPT QG)' : 'Saponification of Triglycerides (Grade 12)',
            desc: isVi ? 'Thủy phân Tristearin trong dung dịch NaOH đun nóng' : 'Alkaline hydrolysis of Tristearin in NaOH',
            tag: 'Grade 12 // Organic',
            query: 'saponification triglyceride naoh soap'
        },
        {
            id: 'effervescence',
            title: isVi ? 'Axit axetic tác dụng Baking Soda (Sủi bọt)' : 'Vinegar + Baking Soda Effervescence',
            desc: isVi ? 'Phản ứng giải phóng khí CO2 sủi bọt cuồn cuộn' : 'Vigorous CO2 gas bubble release',
            tag: 'Grade 11 // Acid-Base',
            query: 'bicarbonate acetic acid co2'
        },
        {
            id: 'silver_mirror',
            title: isVi ? 'Phản ứng tráng bạc Tollens (Anđehit)' : 'Tollens Silver Mirror Redox',
            desc: isVi ? 'Khử ion bạc amoniac tạo lớp gương bạc sáng loáng' : 'Reduction of diamminesilver(I) to silver mirror',
            tag: 'Grade 12 // Redox',
            query: 'tollens aldehyde silver mirror'
        },
        {
            id: 'polyol_complex',
            title: isVi ? 'Nhận biết Ancol đa chức với Cu(OH)2' : 'Polyol Identification with Cu(OH)2',
            desc: isVi ? 'Hòa tan kết tủa Cu(OH)2 tạo phức màu xanh lam đậm' : 'Dissolution of Cu(OH)2 into sapphire blue complex',
            tag: 'Grade 12 // Chelation',
            query: 'glycerol cuoh2 complex'
        }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMimeType(file.type || 'image/jpeg');
        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target?.result as string;
            setSelectedImage(dataUrl);
            setSolveResult(null);
            runAnalysis(dataUrl, file.type || 'image/jpeg');
        };
        reader.readAsDataURL(file);
    };

    const startCamera = async () => {
        try {
            setIsCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.warn("Could not start camera:", err);
            setIsCameraActive(false);
        }
    };

    const captureCamera = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setSelectedImage(dataUrl);
            setMimeType('image/jpeg');
            stopCamera();
            runAnalysis(dataUrl, 'image/jpeg');
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    const handlePresetSelect = (preset: typeof sampleProblems[0]) => {
        audioManager.playClick();
        setIsLoading(true);
        setSelectedImage('preset_' + preset.id);
        setTimeout(() => {
            const res = getOfflineVisionFallback(preset.query, isVi);
            setSolveResult(res);
            setIsLoading(false);
            audioManager.playDiscoveryChime();
        }, 600);
    };

    const runAnalysis = async (dataUrl: string, mime: string) => {
        audioManager.playClick();
        setIsLoading(true);
        try {
            const res = await analyzeChemistryImage(dataUrl, mime);
            setSolveResult(res);
            audioManager.playDiscoveryChime();
        } catch (error) {
            console.error("Analysis error:", error);
            const fallback = getOfflineVisionFallback(dataUrl, isVi);
            setSolveResult(fallback);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetupBench = () => {
        if (!solveResult) return;
        audioManager.playClick();

        const addReagent = useSimulationStore.getState().addReagent;
        const flushAll = useSimulationStore.getState().flushAll;

        // Reset bench cleanly
        flushAll();

        setTimeout(() => {
            // Populate containers based on suggested solution
            solveResult.suggestedContainers.forEach((sc, idx) => {
                if (containers[idx]) {
                    addReagent(idx, sc.reagentId);
                }
            });
            onClose();
        }, 150);
    };

    return (
        <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-4 overflow-y-auto select-none animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-cyan-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(6,182,212,0.35)] overflow-hidden">
                
                {/* Header Plate */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <span className="text-xl">📸</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                <span className="text-cyan-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'GEMINI 2.5 FLASH // TRỢ LÝ THỊ GIÁC' : 'GEMINI 2.5 FLASH // MULTIMODAL VISION SOLVER'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {isVi ? 'QUÉT ĐỀ BÀI & HÓA CHẤT TỰ ĐỘNG' : 'SNAP & SOLVE CHEMISTRY HOMEWORK'}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => { stopCamera(); onClose(); }}
                        className="w-8 h-8 rounded-full bg-cyan-950/80 hover:bg-rose-950/80 border border-cyan-700/60 hover:border-rose-500 text-cyan-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Input Method Selector Tabs */}
                <div className="flex gap-2 border-b border-cyan-900/40 pb-3 mb-4">
                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('preset'); stopCamera(); }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'preset'
                                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                : 'bg-[#061426] border border-cyan-950 text-slate-400 hover:text-cyan-300'
                        }`}
                    >
                        <span>📚</span>
                        <span>{isVi ? 'Đề Thi Mẫu (GDPT 2018)' : 'Sample Exam Problems'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('upload'); stopCamera(); }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'upload'
                                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                : 'bg-[#061426] border border-cyan-950 text-slate-400 hover:text-cyan-300'
                        }`}
                    >
                        <span>📁</span>
                        <span>{isVi ? 'Tải Ảnh Lên' : 'Upload Image'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('camera'); startCamera(); }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'camera'
                                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                : 'bg-[#061426] border border-cyan-950 text-slate-400 hover:text-cyan-300'
                        }`}
                    >
                        <span>📷</span>
                        <span>{isVi ? 'Chụp Trực Tiếp' : 'Live Camera'}</span>
                    </button>
                </div>

                {/* Tab 1: Preset Sample Problems */}
                {activeTab === 'preset' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {sampleProblems.map(p => (
                            <div
                                key={p.id}
                                onClick={() => handlePresetSelect(p)}
                                className="bg-[#061426]/90 border border-cyan-900/60 hover:border-cyan-400 hover:bg-[#091f3a] rounded-2xl p-3.5 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{p.tag}</span>
                                        <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">⚡ Chọn</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                                        {p.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 2: Upload Image */}
                {activeTab === 'upload' && (
                    <div className="mb-4">
                        <input 
                            ref={fileInputRef} 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                        />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-cyan-800 hover:border-cyan-400 bg-[#040d1a] rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                        >
                            <span className="text-3xl group-hover:scale-110 transition-transform">🖼️</span>
                            <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">
                                {isVi ? 'Nhấp để chọn ảnh bài tập hoặc kéo thả vào đây' : 'Click to select homework photo or drag & drop'}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">PNG, JPG, WebP supported</span>
                        </div>
                    </div>
                )}

                {/* Tab 3: Live Camera */}
                {activeTab === 'camera' && (
                    <div className="mb-4 flex flex-col items-center gap-3">
                        <div className="relative w-full max-w-md h-56 bg-black rounded-2xl overflow-hidden border border-cyan-800">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        </div>
                        {isCameraActive && (
                            <button
                                type="button"
                                onClick={captureCamera}
                                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs rounded-xl uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
                            >
                                📸 {isVi ? 'CHỤP & PHÂN TÍCH' : 'CAPTURE & ANALYZE'}
                            </button>
                        )}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="py-8 flex flex-col items-center justify-center gap-3 bg-[#040d1a]/80 border border-cyan-900/60 rounded-2xl my-3">
                        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_#22d3ee]" />
                        <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest animate-pulse">
                            {isVi ? 'GEMINI 2.5 FLASH ĐANG GIẢI BÀI TOÁN...' : 'GEMINI 2.5 FLASH PROCESSING VISION TOKENS...'}
                        </span>
                    </div>
                )}

                {/* Solution View */}
                {solveResult && !isLoading && (
                    <div className="bg-[#040c18] border border-cyan-900/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3.5 shadow-inner">
                        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
                            <div>
                                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{solveResult.curriculumLevel}</span>
                                <h3 className="text-base font-black text-white">{solveResult.title}</h3>
                            </div>
                            <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-[10px] font-mono font-bold">
                                {isVi ? 'ĐÃ GIẢI XONG' : 'SOLVED'}
                            </span>
                        </div>

                        {/* Equation Box */}
                        <div className="text-center py-2 px-3 bg-cyan-950/40 border border-cyan-500/50 rounded-xl font-mono text-sm font-bold text-cyan-200">
                            {solveResult.equationText}
                        </div>

                        {/* Explanation & Steps */}
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            {solveResult.explanation}
                        </p>

                        <div className="space-y-1">
                            {solveResult.stepByStep.map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                    <span className="text-cyan-400 font-bold font-mono">▸</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action: Setup Bench */}
                        <div className="pt-2 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleSetupBench}
                                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>🚀</span>
                                <span>{isVi ? 'TỰ ĐỘNG NẠP VÀO BÀN THÍ NGHIỆM' : 'AUTO SETUP ON LAB BENCH'}</span>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
