import React, { useState, useEffect } from 'react';
import { useSimulationStore } from '../engine/store';
import { VIETNAM_EXAM_QUESTS, ExamQuest } from '../data/VietnamExamQuests';
import { audioManager } from '../engine/AudioManager';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

interface VietnamExamModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STORAGE_QUESTS_KEY = 'chemic_ai_completed_quests';

export const VietnamExamModal: React.FC<VietnamExamModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN';
    const containers = useSimulationStore(state => state.containers);
    const setAppState = useSimulationStore(state => state.setAppState);

    const [activeQuestIndex, setActiveQuestIndex] = useState<number>(0);
    const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_QUESTS_KEY) || '[]');
        } catch {
            return [];
        }
    });
    const [hintLevel, setHintLevel] = useState<number>(0);
    const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null);

    const currentQuest = VIETNAM_EXAM_QUESTS[activeQuestIndex];

    useEffect(() => {
        setHintLevel(0);
        setVerificationResult(null);
    }, [activeQuestIndex]);

    if (!isOpen) return null;

    const handleLoadToBench = () => {
        audioManager.playClick();
        const addReagent = useSimulationStore.getState().addReagent;
        const flushAll = useSimulationStore.getState().flushAll;

        // Reset bench & load exact setup
        flushAll();

        setTimeout(() => {
            currentQuest.experimentSetup.forEach((setup, idx) => {
                if (containers[idx]) {
                    addReagent(idx, setup.reagentId);
                }
            });
            onClose();
            // Transition directly into lab workspace if in main menu
            setAppState('RUNNING');
        }, 150);
    };

    const handleVerifyCompletion = () => {
        audioManager.playClick();

        // Check if any container contains all required reagents or reaction product
        const hasReactantsMixed = containers.some(c => {
            const keys = Object.keys(c.contents || {});
            return currentQuest.requiredReagents.every(req => keys.includes(req) || keys.length > 1);
        });

        if (hasReactantsMixed) {
            audioManager.playDiscoveryChime();
            const updated = Array.from(new Set([...completedQuestIds, currentQuest.id]));
            setCompletedQuestIds(updated);
            localStorage.setItem(STORAGE_QUESTS_KEY, JSON.stringify(updated));

            setVerificationResult({
                success: true,
                message: isVi 
                    ? '🎉 Xuất sắc! Bạn đã thực hiện đúng quy trình thí nghiệm và ghi nhận hiện tượng thành công.'
                    : '🎉 Outstanding! Experiment verified and competency points awarded.'
            });
        } else {
            setVerificationResult({
                success: false,
                message: isVi 
                    ? '⚠️ Chưa đạt yêu cầu: Hãy trộn đúng các hóa chất theo quy trình hoặc nạp lại dụng cụ thí nghiệm.'
                    : '⚠️ Incomplete: Mix required reagents together on the workbench.'
            });
        }
    };

    const isCurrentQuestCompleted = completedQuestIds.includes(currentQuest.id);

    return (
        <div className="fixed inset-0 z-[190] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto p-4 overflow-y-auto select-none animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-red-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(239,68,68,0.3)] overflow-hidden">
                
                {/* Official National Exam Header */}
                <div className="flex items-center justify-between pb-4 border-b border-red-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600/30 to-amber-600/30 border border-red-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                            <span className="text-2xl">🇻🇳</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_#f87171] animate-pulse" />
                                <span className="text-red-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'BỘ GD&ĐT // CHƯƠNG TRÌNH GDPT 2018' : 'VIETNAM NATIONAL EXAM // GDPT 2018'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {isVi ? 'THI THỬ THỰC HÀNH HÓA HỌC THPT QUỐC GIA' : 'HIGH SCHOOL EXAM PRACTICAL LAB QUESTS'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-red-950/80 border border-red-700/60 rounded-xl text-red-300 font-mono text-xs font-bold">
                            {isVi ? 'HOÀN THÀNH: ' : 'COMPLETED: '}
                            <span className="text-white font-black">{completedQuestIds.length} / {VIETNAM_EXAM_QUESTS.length}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-slate-900 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Quest Selector Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
                    {VIETNAM_EXAM_QUESTS.map((q, idx) => {
                        const isDone = completedQuestIds.includes(q.id);
                        const isSelected = idx === activeQuestIndex;
                        return (
                            <button
                                key={q.id}
                                type="button"
                                onClick={() => { audioManager.playClick(); setActiveQuestIndex(idx); }}
                                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[70px] ${
                                    isSelected
                                        ? 'bg-red-950/60 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                        : 'bg-[#061426]/80 border-cyan-950 hover:border-red-900/80'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-red-300">Lớp {q.grade}</span>
                                    {isDone && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                                </div>
                                <span className="text-[11px] font-bold text-slate-200 line-clamp-1 mt-1">
                                    {q.code}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Quest Detailed Card */}
                <div className="bg-[#040c18] border border-red-900/50 rounded-2xl p-5 mb-5 shadow-inner">
                    <div className="flex items-center justify-between border-b border-red-900/40 pb-2.5 mb-3">
                        <div>
                            <span className="text-[10px] font-mono text-red-400 uppercase font-bold tracking-wider">
                                {(currentQuest.curriculumUnit as any)[language] || currentQuest.curriculumUnit.VN}
                            </span>
                            <h3 className="text-base font-black text-white mt-0.5">
                                {(currentQuest.title as any)[language] || currentQuest.title.VN}
                            </h3>
                        </div>

                        {isCurrentQuestCompleted && (
                            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 text-xs font-mono font-bold">
                                ✓ {isVi ? 'ĐÃ ĐẠT ĐIỂM TỐI ĐA' : 'COMPLETED'}
                            </span>
                        )}
                    </div>

                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mb-3">
                        {(currentQuest.description as any)[language] || currentQuest.description.VN}
                    </p>

                    {/* Equation Formula Box */}
                    <div className="text-center py-2.5 px-3 bg-red-950/30 border border-red-500/40 rounded-xl font-mono text-xs md:text-sm font-bold text-red-200 mb-4">
                        {(currentQuest.balancedEquation as any)[language] || currentQuest.balancedEquation.VN}
                    </div>

                    {/* Progressive Socratic Hints */}
                    <div className="bg-[#030914] border border-cyan-900/60 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                                <span>💡</span>
                                <span>{isVi ? 'GỢI Ý TỪ GIÁO SƯ LUCY' : 'HINTS FROM PROF. LUCY'}</span>
                            </span>
                            {hintLevel < currentQuest.hints.length && (
                                <button
                                    type="button"
                                    onClick={() => { audioManager.playClick(); setHintLevel(prev => prev + 1); }}
                                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
                                >
                                    + {isVi ? 'Mở thêm gợi ý' : 'Reveal next hint'}
                                </button>
                            )}
                        </div>

                        {hintLevel === 0 ? (
                            <p className="text-xs text-slate-500 italic">
                                {isVi ? 'Hãy tự suy luận trước khi mở gợi ý để tối ưu hóa điểm số.' : 'Try solving independently before revealing hints.'}
                            </p>
                        ) : (
                            <div className="space-y-1.5">
                                {currentQuest.hints.slice(0, hintLevel).map((h, hIdx) => (
                                    <div key={hIdx} className="text-xs text-cyan-200 flex items-start gap-2">
                                        <span className="text-cyan-400 font-bold">▸</span>
                                        <span>{(h as any)[language] || h.VN}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Verification Status Feedback */}
                    {verificationResult && (
                        <div className={`p-3 rounded-xl border text-xs font-mono mb-2 flex items-center gap-2 ${
                            verificationResult.success 
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                : 'bg-amber-950/80 border-amber-500 text-amber-300'
                        }`}>
                            <span>{verificationResult.message}</span>
                        </div>
                    )}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={handleLoadToBench}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>🚀</span>
                        <span>{isVi ? 'NẠP VÀO BÀN THÍ NGHIỆM' : 'LOAD TO LAB BENCH'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleVerifyCompletion}
                        className="w-full sm:w-auto px-7 py-3 bg-[#061426] hover:bg-emerald-950 border border-emerald-600/70 hover:border-emerald-400 text-emerald-300 font-mono font-bold text-xs rounded-xl tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>✓</span>
                        <span>{isVi ? 'KIỂM TRA KẾT QUẢ THÍ NGHIỆM' : 'VERIFY COMPLETION'}</span>
                    </button>
                </div>

            </div>
        </div>
    );
};
