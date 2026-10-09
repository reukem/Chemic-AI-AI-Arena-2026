import React, { useState, useMemo, useEffect } from 'react';
import { useSimulationStore } from '../engine/store';
import { VIETNAM_CURRICULUM_DATA, CurriculumLesson, TEXTBOOK_CATALOG, GradeTextbookInfo } from '../data/VietnamCurriculumData';
import { audioManager } from '../engine/AudioManager';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { LatexRenderer } from './LatexRenderer';

interface CurriculumLearningModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CurriculumLearningModal: React.FC<CurriculumLearningModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN' || language === 'vi';
    const containers = useSimulationStore(state => state.containers);
    const setAppState = useSimulationStore(state => state.setAppState);

    const [selectedGrade, setSelectedGrade] = useState<number>(12);
    const [viewMode, setViewMode] = useState<'LESSON' | 'PDF'>('LESSON');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeLessonId, setActiveLessonId] = useState<string>('hh12_b1');
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const getChapterText = (ch: any): string => {
        if (!ch) return '';
        if (typeof ch === 'object') {
            return isVi ? (ch.VN || ch.vn || '') : (ch.EN || ch.en || ch.VN || '');
        }
        return String(ch);
    };

    // Filter lessons based on grade and search query
    const filteredLessons = useMemo(() => {
        return VIETNAM_CURRICULUM_DATA.filter(l => {
            if (l.grade !== selectedGrade) return false;
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const title = ((l.title as any)[language] || (isVi ? l.title.VN : l.title.EN) || l.title.VN).toLowerCase();
            const summary = ((l.summary as any)[language] || (isVi ? l.summary.VN : l.summary.EN) || l.summary.VN).toLowerCase();
            const code = l.code.toLowerCase();
            const chapter = getChapterText(l.chapterTitle).toLowerCase();
            return title.includes(q) || summary.includes(q) || code.includes(q) || chapter.includes(q);
        });
    }, [selectedGrade, searchQuery, language, isVi]);

    // When switching grade or searching, auto select first match
    useEffect(() => {
        if (filteredLessons.length > 0) {
            const exists = filteredLessons.some(l => l.id === activeLessonId);
            if (!exists) {
                setActiveLessonId(filteredLessons[0].id);
                setShowAnswer(false);
            }
        }
    }, [selectedGrade, filteredLessons, activeLessonId]);

    const activeLesson: CurriculumLesson = useMemo(() => {
        return VIETNAM_CURRICULUM_DATA.find(l => l.id === activeLessonId) || filteredLessons[0] || VIETNAM_CURRICULUM_DATA[0];
    }, [activeLessonId, filteredLessons]);

    const currentTextbook: GradeTextbookInfo = TEXTBOOK_CATALOG[selectedGrade] || TEXTBOOK_CATALOG[12];

    if (!isOpen) return null;

    const handleCopyLesson = () => {
        if (!activeLesson) return;
        audioManager.playClick();
        const lessonTitle = isVi ? activeLesson.title.VN : (activeLesson.title.EN || activeLesson.title.VN);
        const lessonSummary = isVi ? activeLesson.summary.VN : (activeLesson.summary.EN || activeLesson.summary.VN);
        
        const textToCopy = `[${activeLesson.code}] ${lessonTitle}\n\n` +
            `${isVi ? 'TÓM TẮT:' : 'SUMMARY:'}\n${lessonSummary}\n\n` +
            (activeLesson.sections ? activeLesson.sections.map(s => {
                const h = isVi ? s.heading.VN : (s.heading.EN || s.heading.VN);
                const pts = s.points.map(p => `• ${isVi ? p.VN : (p.EN || p.VN)}`).join('\n');
                return `--- ${h} ---\n${pts}`;
            }).join('\n\n') : '') +
            `\n\n${isVi ? 'CÔNG THỨC:' : 'KEY FORMULAS:'}\n` + (activeLesson.keyFormulas ? activeLesson.keyFormulas.map(kf => typeof kf === 'object' ? (isVi ? kf.VN : (kf.EN || kf.VN)) : kf).join('\n') : '') +
            `\n\n${isVi ? 'PHƯƠNG TRÌNH:' : 'EQUATIONS:'}\n` + (activeLesson.equations ? activeLesson.equations.map(eq => typeof eq === 'object' ? (isVi ? eq.VN : (eq.EN || eq.VN)) : eq).join('\n') : '');

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLoadToLab = (reagents: string[]) => {
        audioManager.playClick();
        const state = useSimulationStore.getState();

        // 1. Reset lab bench and spawn a fresh beaker
        state.flushAll();
        state.spawnContainer('beaker');

        // 2. Dispense suggested chemicals into the beaker
        setTimeout(() => {
            const currentContainers = useSimulationStore.getState().containers;
            const targetId = currentContainers.length > 0 ? currentContainers[0].id : 0;

            const validReagents = (reagents || []).filter(rId => CHEMICAL_REGISTRY[rId]);
            const dose = validReagents.length > 0 ? Math.min(30, Math.floor(60 / validReagents.length)) : 20;

            validReagents.forEach((chemId) => {
                useSimulationStore.getState().addReagentToContainer(targetId, chemId, dose);
            });

            // 3. Switch to lab workbench and close modal
            useSimulationStore.getState().setActiveTab('lab');
            useSimulationStore.getState().setAppState('WORKBENCH');
            onClose();
        }, 120);
    };

    return (
        <div className="fixed inset-0 z-[200] bg-[#020712] text-slate-100 flex flex-col pointer-events-auto select-text overflow-hidden animate-in fade-in duration-200">
            
            {/* Top Navigation Bar */}
            <div className="h-16 border-b border-cyan-900/60 bg-[#040e1c]/95 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between shrink-0 shadow-lg z-20">
                {/* Brand & Curriculum Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <span className="text-xl">📚</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                            <span className="text-cyan-400 font-mono text-[10px] font-black tracking-[0.2em] uppercase">
                                {isVi ? 'HỌC VIỆN HÓA HỌC // GDPT 2018' : 'CHEMISTRY ACADEMY // CURRICULUM'}
                            </span>
                        </div>
                        <h1 className="text-sm md:text-base font-black text-white tracking-wide uppercase">
                            {isVi ? `GIÁO TRÌNH HÓA HỌC LỚP ${selectedGrade}` : `GRADE ${selectedGrade} CHEMISTRY CURRICULUM`}
                        </h1>
                    </div>
                </div>

                {/* Grade Switcher Tabs */}
                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-[#020712]/90 border border-cyan-950 rounded-2xl">
                    {[8, 9, 10, 11, 12].map(gradeNum => (
                        <button
                            key={gradeNum}
                            type="button"
                            onClick={() => { audioManager.playClick(); setSelectedGrade(gradeNum); }}
                            className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                                selectedGrade === gradeNum
                                    ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                    : 'text-slate-400 hover:text-white hover:bg-cyan-950/40'
                            }`}
                        >
                            {isVi ? `LỚP ${gradeNum}` : `GRADE ${gradeNum}`}
                        </button>
                    ))}
                </div>

                {/* Right Action Tools */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Open Calculating Board / Formulas Button */}
                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); useSimulationStore.getState().setCalculatingMode(true); }}
                        title={isVi ? 'Mở Bảng Công Thức & Máy Tính Hóa Học' : 'Open Formula Board & Calculator'}
                        className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/70 rounded-xl text-amber-300 hover:text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <span>🧮</span>
                        <span className="hidden sm:inline">{isVi ? 'BẢNG CÔNG THỨC' : 'FORMULAS'}</span>
                    </button>

                    {/* Copy Lesson Notes Button */}
                    <button
                        type="button"
                        onClick={handleCopyLesson}
                        title={isVi ? 'Sao chép nội dung bài học' : 'Copy lesson notes'}
                        className="px-3 py-1.5 bg-[#05162a] hover:bg-cyan-950 border border-cyan-700/60 rounded-xl text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <span>{copied ? '✅' : '📋'}</span>
                        <span className="hidden sm:inline">{copied ? (isVi ? 'ĐÃ COPY' : 'COPIED') : (isVi ? 'COPY BÀI HỌC' : 'COPY LESSON')}</span>
                    </button>

                    {/* View Mode Toggle: Interactive Lessons vs PDF Textbook */}
                    <div className="flex items-center p-1 bg-[#020712]/90 border border-cyan-900/60 rounded-xl">
                        <button
                            type="button"
                            onClick={() => { audioManager.playClick(); setViewMode('LESSON'); }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                viewMode === 'LESSON'
                                    ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <span>💡</span>
                            <span>{isVi ? 'SƠ ĐỒ TƯ DUY' : 'MINDMAP'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { audioManager.playClick(); setViewMode('PDF'); }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                viewMode === 'PDF'
                                    ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <span>📖</span>
                            <span>{isVi ? 'SGK PDF' : 'PDF BOOK'}</span>
                        </button>
                    </div>

                    {/* Exit Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 bg-[#061426] hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500 rounded-xl text-slate-300 hover:text-rose-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                        <span>✕</span>
                        <span className="hidden sm:inline">{isVi ? 'ĐÓNG' : 'EXIT'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Grade Switcher */}
            <div className="flex lg:hidden items-center justify-around py-2 px-4 bg-[#030914] border-b border-cyan-950 shrink-0">
                {[8, 9, 10, 11, 12].map(gradeNum => (
                    <button
                        key={gradeNum}
                        type="button"
                        onClick={() => { audioManager.playClick(); setSelectedGrade(gradeNum); }}
                        className={`px-3 py-1 rounded-lg font-mono text-xs font-bold ${
                            selectedGrade === gradeNum
                                ? 'bg-cyan-600 text-white'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        {isVi ? `Lớp ${gradeNum}` : `Gr ${gradeNum}`}
                    </button>
                ))}
            </div>

            {/* Main Interactive Work Area */}
            <div className="flex-1 flex overflow-hidden">

                {viewMode === 'LESSON' ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
                        
                        {/* Left Sidebar: Lesson Directory & Instant Search */}
                        <div className="md:col-span-4 lg:col-span-3 border-r border-cyan-950/80 bg-[#030914]/90 flex flex-col overflow-hidden">
                            {/* Search Box */}
                            <div className="p-3 border-b border-cyan-950/80 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={isVi ? 'Tìm bài học, este, xà phòng...' : 'Search lessons, formulas, reactions...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#051120] border border-cyan-900/60 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Lesson List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 select-text">
                                {filteredLessons.length === 0 ? (
                                    <div className="text-center py-12 text-xs font-mono text-slate-500 italic">
                                        {isVi ? 'Không tìm thấy bài học nào phù hợp.' : 'No matching lessons found.'}
                                    </div>
                                ) : (
                                    filteredLessons.map(lesson => {
                                        const isSelected = lesson.id === activeLesson?.id;
                                        const title = isVi ? lesson.title.VN : (lesson.title.EN || lesson.title.VN);
                                        const chapterShort = getChapterText(lesson.chapterTitle).split(':')[0];
                                        return (
                                            <div
                                                key={lesson.id}
                                                onClick={() => { audioManager.playClick(); setActiveLessonId(lesson.id); setShowAnswer(false); }}
                                                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 group ${
                                                    isSelected
                                                        ? 'bg-gradient-to-r from-cyan-950/80 to-emerald-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                                        : 'bg-[#040e1c]/60 border-cyan-950/80 hover:border-cyan-800 hover:bg-[#06182e]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="px-2 py-0.5 rounded-md bg-[#020712] border border-cyan-900/60 text-cyan-400 font-mono text-[9px] font-bold">
                                                        {lesson.code}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-slate-400 font-bold truncate max-w-[120px]">
                                                        {chapterShort}
                                                    </span>
                                                </div>
                                                <h3 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
                                                    {title}
                                                </h3>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Right Main Learning Pane with LaTeX & Mindmap Sections */}
                        <div className="md:col-span-8 lg:col-span-9 bg-[#020712] overflow-y-auto custom-scrollbar p-5 md:p-8 flex flex-col justify-between select-text">
                            {activeLesson && (
                                <div className="max-w-4xl space-y-6">
                                    {/* Header Plate */}
                                    <div className="border-b border-cyan-950 pb-4">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950 border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-black uppercase">
                                                {getChapterText(activeLesson.chapterTitle)}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] font-black uppercase">
                                                {isVi ? `LỚP ${activeLesson.grade}` : `GRADE ${activeLesson.grade}`}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-white tracking-wide mt-1">
                                            {isVi ? activeLesson.title.VN : (activeLesson.title.EN || activeLesson.title.VN)}
                                        </h2>
                                        <div className="text-sm text-slate-300 mt-2.5 leading-relaxed font-sans font-normal bg-[#040e1c]/60 p-3 rounded-xl border border-cyan-950">
                                            <LatexRenderer content={activeLesson.summary} language={language} />
                                        </div>
                                    </div>

                                    {/* Mindmap-Style Visual Section Cards */}
                                    {activeLesson.sections && activeLesson.sections.length > 0 ? (
                                        <div className="space-y-4">
                                            {activeLesson.sections.map((sec, sIdx) => {
                                                const headingText = isVi ? sec.heading.VN : (sec.heading.EN || sec.heading.VN);
                                                return (
                                                    <div key={sIdx} className="bg-gradient-to-br from-[#041021]/95 to-[#020814]/95 border border-cyan-800/40 hover:border-cyan-500/60 rounded-2xl p-4 md:p-5 shadow-md transition-all">
                                                        <h4 className="text-xs md:text-sm font-mono font-bold text-cyan-300 mb-3 flex items-center gap-2 pb-2 border-b border-cyan-950">
                                                            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_8px_#22d3ee]" />
                                                            <span className="uppercase tracking-wider">{headingText}</span>
                                                        </h4>
                                                        <div className="space-y-2.5">
                                                            {sec.points.map((pt, pIdx) => (
                                                                <div key={pIdx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200 leading-relaxed pl-3 border-l-2 border-cyan-900/60 hover:border-cyan-400 transition-colors">
                                                                    <span className="text-cyan-400 font-bold font-mono">▸</span>
                                                                    <div className="flex-1">
                                                                        <LatexRenderer content={pt} language={language} />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        /* Fallback for standard theory points */
                                        <div>
                                            <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <span>💡</span>
                                                <span>{isVi ? 'LÝ THUYẾT & HIỆN TƯỢNG TRỌNG TÂM' : 'CORE THEORETICAL CONCEPTS'}</span>
                                            </h3>
                                            <div className="space-y-2">
                                                {activeLesson.theoryPoints.map((tp, idx) => (
                                                    <div key={idx} className="p-3 rounded-xl bg-[#040e1c]/80 border border-cyan-950 flex items-start gap-2.5 text-xs md:text-sm text-slate-200 leading-relaxed">
                                                        <span className="text-cyan-400 font-bold font-mono">▸</span>
                                                        <LatexRenderer content={tp} language={language} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Mathematical & Stoichiometric Formulas with KaTeX */}
                                    {activeLesson.keyFormulas.length > 0 && (
                                        <div className="bg-gradient-to-br from-[#041426] to-[#030d1a] border border-cyan-700/50 rounded-2xl p-4 shadow-inner">
                                            <h3 className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                                <span>📐</span>
                                                <span>{isVi ? 'CÔNG THỨC & QUY TẮC CẦN NHỚ (LATEX)' : 'FORMULAS & CONSTANTS (LATEX)'}</span>
                                            </h3>
                                            <div className="space-y-2">
                                                {activeLesson.keyFormulas.map((kf, idx) => (
                                                    <div key={idx} className="p-2.5 rounded-xl bg-[#020712] border border-cyan-500/30 text-cyan-200 text-xs md:text-sm shadow-sm overflow-x-auto">
                                                        <LatexRenderer content={kf} language={language} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Characteristic Chemical Reaction Equations with KaTeX */}
                                    {activeLesson.equations.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                                <span>⚗️</span>
                                                <span>{isVi ? 'PHƯƠNG TRÌNH HÓA HỌC TIÊU BIỂU (LATEX)' : 'CHARACTERISTIC CHEMICAL EQUATIONS (LATEX)'}</span>
                                            </h3>
                                            <div className="space-y-2">
                                                {activeLesson.equations.map((eq, idx) => (
                                                    <div key={idx} className="py-2.5 px-4 bg-emerald-950/25 border border-emerald-500/40 rounded-xl text-xs md:text-sm font-bold text-emerald-200 shadow-sm overflow-x-auto">
                                                        <LatexRenderer content={eq} language={language} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Socratic Practice Quiz Question & Expert Explanation */}
                                    <div className="bg-gradient-to-br from-[#0e1f33] to-[#040f1c] border border-amber-500/50 rounded-2xl p-4 md:p-5 shadow-lg">
                                        <div className="flex items-center justify-between border-b border-amber-900/40 pb-2 mb-2.5">
                                            <span className="text-[11px] font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                                                <span>❓</span>
                                                <span>{isVi ? 'CÂU HỎI VẬN DỤNG & CỦNG CỐ' : 'PRACTICE QUIZ & CONCEPT CHECK'}</span>
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setShowAnswer(!showAnswer)}
                                                className="text-xs font-mono text-amber-300 hover:text-amber-100 underline cursor-pointer"
                                            >
                                                {showAnswer ? (isVi ? 'Ẩn đáp án' : 'Hide explanation') : (isVi ? 'Xem lời giải' : 'Reveal explanation')}
                                            </button>
                                        </div>
                                        <div className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed">
                                            <LatexRenderer content={activeLesson.sampleQuestion.question} language={language} />
                                        </div>
                                        {showAnswer && (
                                            <div className="mt-3 p-3.5 rounded-xl bg-black/60 border border-emerald-500/50 text-xs md:text-sm text-emerald-300 leading-relaxed animate-in fade-in">
                                                <span className="font-bold text-emerald-400 font-mono">✓ {isVi ? 'Phân tích & Lời giải: ' : 'Analysis & Solution: '}</span>
                                                <LatexRenderer content={activeLesson.sampleQuestion.answer} language={language} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Bottom Action Ribbon */}
                            {activeLesson && (
                                <div className="pt-6 border-t border-cyan-950 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-xs font-mono text-slate-400">
                                        {isVi ? 'Hóa chất đề xuất: ' : 'Suggested reagents: '}
                                        <strong className="text-cyan-300">{activeLesson.suggestedReagents.join(', ')}</strong>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleLoadToLab(activeLesson.suggestedReagents)}
                                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-mono font-bold text-xs rounded-2xl tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <span>🚀</span>
                                        <span>{isVi ? 'NẠP THÍ NGHIỆM VÀO BÀN LAB' : 'LOAD TO VIRTUAL LAB BENCH'}</span>
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                ) : (
                    /* In-App PDF Textbook Reader Pane */
                    <div className="flex-1 flex flex-col bg-[#01040a] overflow-hidden">
                        <div className="p-3 bg-[#030914] border-b border-cyan-950 flex items-center justify-between px-6 shrink-0">
                            <div>
                                <h3 className="text-sm font-black text-white">
                                    {isVi ? currentTextbook.title.VN : (currentTextbook.title.EN || currentTextbook.title.VN)}
                                </h3>
                                <p className="text-xs font-mono text-slate-400">
                                    {isVi ? currentTextbook.description.VN : (currentTextbook.description.EN || currentTextbook.description.VN)}
                                </p>
                            </div>

                            <a
                                href={currentTextbook.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 rounded-xl text-cyan-200 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>📥</span>
                                <span>{isVi ? 'Tải PDF về máy' : 'Download PDF'}</span>
                            </a>
                        </div>

                        <div className="flex-1 w-full h-full bg-[#111] overflow-hidden">
                            <iframe
                                src={currentTextbook.pdfUrl}
                                title={currentTextbook.title.VN}
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
