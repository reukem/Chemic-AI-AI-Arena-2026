import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../engine/store';
import { 
  ORGANIC_FRAGMENTS, 
  ORGANIC_PUZZLES, 
  OrganicPuzzle, 
  OrganicFragment 
} from '../data/organicPuzzles';
import lucyFacePFP from '../assets/lucy_FACE_PFP_clean.png';
import lucySpeak from '../assets/lucy_learning_speak_clean.png';
import lucyIdle from '../assets/lucy_learning_idle_clean.png';

type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

interface GuessAttempt {
  fragments: string[]; // fragment IDs
  statuses: TileStatus[];
}

export interface OrganicPuzzleViewProps {
  onBackToMenu?: () => void;
  onSwitchToSandbox?: () => void;
}

export const OrganicPuzzleView: React.FC<OrganicPuzzleViewProps> = ({ 
  onBackToMenu, 
  onSwitchToSandbox 
}) => {
  const setOrganicMode = useSimulationStore(state => state.setOrganicMode);
  const language = useSimulationStore(state => state.language);

  // Current selected puzzle
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const currentPuzzle: OrganicPuzzle = ORGANIC_PUZZLES[puzzleIndex];

  // Active guess in the current row
  const [currentSlots, setCurrentSlots] = useState<(string | null)[]>([]);
  // Past attempts
  const [attempts, setAttempts] = useState<GuessAttempt[]>([]);
  // Game status
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  // Selected slot index for focused insertion
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  // Lucy dialogue message
  const [lucyMessage, setLucyMessage] = useState<string>('');
  // Show level picker modal
  const [isLevelPickerOpen, setIsLevelPickerOpen] = useState<boolean>(false);
  // Show educational info modal on completion
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  // Active palette category filter
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'alkyl' | 'alkenyl' | 'functional' | 'halogen'>('ALL');

  // Initialize or reset puzzle state
  useEffect(() => {
    setCurrentSlots(new Array(currentPuzzle.slots).fill(null));
    setAttempts([]);
    setGameStatus('PLAYING');
    setSelectedSlotIndex(0);
    setShowResultModal(false);

    const initialMsg = language === 'EN'
      ? `Welcome to Organic Mode! Assemble the molecular fragments to match ${currentPuzzle.formula}. You have ${currentPuzzle.maxAttempts} attempts!`
      : `Chào mừng đến với Hóa học Hữu cơ! Ghép các nhóm định chức để tạo thành ${currentPuzzle.formula}. Bạn có ${currentPuzzle.maxAttempts} lượt thử!`;
    setLucyMessage(initialMsg);
  }, [puzzleIndex, language, currentPuzzle.slots, currentPuzzle.formula, currentPuzzle.maxAttempts]);

  // Compute status of fragments used across all previous attempts (Wordle keyboard status)
  const fragmentStatuses = useMemo(() => {
    const statusMap: Record<string, TileStatus> = {};
    attempts.forEach(attempt => {
      attempt.fragments.forEach((fragId, idx) => {
        const stat = attempt.statuses[idx];
        const prev = statusMap[fragId];
        if (stat === 'correct') {
          statusMap[fragId] = 'correct';
        } else if (stat === 'present' && prev !== 'correct') {
          statusMap[fragId] = 'present';
        } else if (stat === 'absent' && !prev) {
          statusMap[fragId] = 'absent';
        }
      });
    });
    return statusMap;
  }, [attempts]);

  // Handle fragment placement into active slot
  const handleSelectFragment = (fragId: string) => {
    if (gameStatus !== 'PLAYING') return;

    const nextSlots = [...currentSlots];
    // Place in selected slot or find first empty slot
    let targetIdx = selectedSlotIndex;
    if (nextSlots[targetIdx] !== null) {
      const firstEmpty = nextSlots.findIndex(s => s === null);
      if (firstEmpty !== -1) {
        targetIdx = firstEmpty;
      }
    }

    nextSlots[targetIdx] = fragId;
    setCurrentSlots(nextSlots);

    // Auto-advance cursor to next empty slot
    const nextEmpty = nextSlots.findIndex((s, i) => i > targetIdx && s === null);
    if (nextEmpty !== -1) {
      setSelectedSlotIndex(nextEmpty);
    } else {
      const anyEmpty = nextSlots.findIndex(s => s === null);
      if (anyEmpty !== -1) setSelectedSlotIndex(anyEmpty);
    }
  };

  // Clear a specific slot
  const handleClearSlot = (index: number) => {
    if (gameStatus !== 'PLAYING') return;
    const nextSlots = [...currentSlots];
    nextSlots[index] = null;
    setCurrentSlots(nextSlots);
    setSelectedSlotIndex(index);
  };

  // Clear all slots in the current row
  const handleClearAll = () => {
    if (gameStatus !== 'PLAYING') return;
    setCurrentSlots(new Array(currentPuzzle.slots).fill(null));
    setSelectedSlotIndex(0);
  };

  // Submit and evaluate current guess
  const handleSubmitGuess = () => {
    if (gameStatus !== 'PLAYING') return;
    if (currentSlots.some(s => s === null)) {
      setLucyMessage(
        language === 'EN' 
          ? 'Fill all fragment slots before testing the synthesis!' 
          : 'Hãy điền đủ tất cả các vị trí trước khi tiến hành tổng hợp!'
      );
      return;
    }

    const guess = currentSlots as string[];
    const targetSeq = currentPuzzle.targetSequence;
    const acceptedSeqs = currentPuzzle.acceptedSequences || [];
    const allValidTargets = [targetSeq, ...acceptedSeqs];

    // Find the best match among accepted orientations
    let bestStatuses: TileStatus[] | null = null;
    let isExactMatch = false;

    for (const target of allValidTargets) {
      const statuses: TileStatus[] = new Array(guess.length).fill('absent');
      const targetAvailable = [...target];

      // Pass 1: Mark exact matches ('correct' - Green)
      guess.forEach((fragId, i) => {
        if (fragId === target[i]) {
          statuses[i] = 'correct';
          targetAvailable[i] = ''; // consumed
        }
      });

      // Check if all are correct
      if (statuses.every(s => s === 'correct')) {
        bestStatuses = statuses;
        isExactMatch = true;
        break;
      }

      // Pass 2: Mark present matches in other positions ('present' - Yellow)
      guess.forEach((fragId, i) => {
        if (statuses[i] !== 'correct') {
          const availIdx = targetAvailable.indexOf(fragId);
          if (availIdx !== -1) {
            statuses[i] = 'present';
            targetAvailable[availIdx] = ''; // consumed
          }
        }
      });

      // Keep the evaluation with the highest score (correct count * 2 + present count)
      if (!bestStatuses) {
        bestStatuses = statuses;
      } else {
        const scoreBest = bestStatuses.filter(s => s === 'correct').length * 2 + bestStatuses.filter(s => s === 'present').length;
        const scoreCurr = statuses.filter(s => s === 'correct').length * 2 + statuses.filter(s => s === 'present').length;
        if (scoreCurr > scoreBest) bestStatuses = statuses;
      }
    }

    const evaluatedStatuses = bestStatuses || new Array(guess.length).fill('absent');
    const newAttempts = [...attempts, { fragments: guess, statuses: evaluatedStatuses }];
    setAttempts(newAttempts);

    if (isExactMatch) {
      setGameStatus('WON');
      setShowResultModal(true);
      setLucyMessage(
        language === 'EN'
          ? `Brilliant! You synthesized ${currentPuzzle.name} in ${newAttempts.length} attempt(s)!`
          : `Tuyệt vời! Bạn đã tổng hợp thành công ${currentPuzzle.vietnameseName} sau ${newAttempts.length} lần thử!`
      );
    } else if (newAttempts.length >= currentPuzzle.maxAttempts) {
      setGameStatus('LOST');
      setShowResultModal(true);
      setLucyMessage(
        language === 'EN'
          ? `Out of attempts! The target molecule was ${currentPuzzle.name} (${currentPuzzle.structuralFormula}).`
          : `Đã hết lượt thử! Hợp chất mục tiêu là ${currentPuzzle.vietnameseName} (${currentPuzzle.structuralFormula}).`
      );
    } else {
      // Clear current row for next attempt
      setCurrentSlots(new Array(currentPuzzle.slots).fill(null));
      setSelectedSlotIndex(0);
      const correctCount = evaluatedStatuses.filter(s => s === 'correct').length;
      const presentCount = evaluatedStatuses.filter(s => s === 'present').length;
      setLucyMessage(
        language === 'EN'
          ? `Attempt ${newAttempts.length}/${currentPuzzle.maxAttempts}: ${correctCount} correct position(s), ${presentCount} misplaced.`
          : `Lần thử ${newAttempts.length}/${currentPuzzle.maxAttempts}: ${correctCount} đúng vị trí, ${presentCount} sai vị trí.`
      );
    }
  };

  // Go to next puzzle
  const handleNextPuzzle = () => {
    const nextIdx = (puzzleIndex + 1) % ORGANIC_PUZZLES.length;
    setPuzzleIndex(nextIdx);
  };

  // Helper for tile styling based on status
  const getStatusStyles = (status: TileStatus) => {
    switch (status) {
      case 'correct':
        return 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'present':
        return 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
      case 'absent':
        return 'bg-slate-800/40 border-slate-700/60 text-slate-500 opacity-60';
      default:
        return 'bg-slate-900/60 border-slate-700/80 text-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040813] text-white flex flex-col font-sans overflow-y-auto selection:bg-cyan-500/30 backdrop-blur-3xl">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-cyan-900/30 bg-[#060c1a]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {onSwitchToSandbox && (
            <div className="flex items-center bg-[#040d1c] p-1 rounded-xl border border-cyan-900/60 shadow-inner">
              <button
                onClick={onSwitchToSandbox}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                🧪 {language === 'EN' ? 'SANDBOX CRAFT' : 'XƯỞNG TỰ DO'}
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                🧩 {language === 'EN' ? 'SYNTHESIS PUZZLE' : 'CÂU ĐỐ TỔNG HỢP'}
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="w-full h-full bg-[#070e1e] rounded-xl flex items-center justify-center font-mono font-bold text-sm text-cyan-300">
                ⬡
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-wider uppercase bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                  {language === 'EN' ? 'Organic Chemistry Wordle' : 'Giải Đố Hóa Học Hữu Cơ'}
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {language === 'EN' ? 'Functional Assembly & Radical Synthesis' : 'Lắp Ráp Gốc Định Chức & Khung Phân Tử'}
              </p>
            </div>
          </div>
        </div>

        {/* Puzzle Selector, Controls & MAIN MENU Exit Button on Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLevelPickerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-800/50 hover:border-cyan-400 text-xs font-mono text-cyan-200 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span>🎯</span>
            <span>
              {language === 'EN' ? 'Level' : 'Bài'}: {puzzleIndex + 1}/{ORGANIC_PUZZLES.length}
            </span>
            <span className="text-[10px] text-slate-400">▼</span>
          </button>

          <button
            onClick={handleNextPuzzle}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/60 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all"
            title={language === 'EN' ? 'Next Molecule' : 'Phân tử kế tiếp'}
          >
            {language === 'EN' ? 'Next ➔' : 'Kế tiếp ➔'}
          </button>

          <div className="h-6 w-px bg-cyan-900/60 mx-1" />

          <button
            onClick={() => onBackToMenu ? onBackToMenu() : setOrganicMode(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-700/80 hover:border-cyan-400 transition-all text-xs font-mono text-cyan-300 group shadow-sm cursor-pointer"
          >
            <span>{language === 'EN' ? 'MAIN MENU' : 'MENU CHÍNH'}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* Target Molecule Clue Banner */}
        <section className="bg-gradient-to-r from-slate-900/90 via-[#0a1324]/90 to-slate-900/90 border border-cyan-900/40 rounded-2xl p-4 md:p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex flex-col items-center justify-center min-w-[70px]">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                {language === 'EN' ? 'FORMULA' : 'CÔNG THỨC'}
              </span>
              <span className="text-xl md:text-2xl font-black text-cyan-200 tracking-wide">
                {currentPuzzle.formula}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {currentPuzzle.category}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${
                  currentPuzzle.difficulty === 'EASY' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : currentPuzzle.difficulty === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {currentPuzzle.difficulty}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  • {currentPuzzle.slots} {language === 'EN' ? 'radicals / slots' : 'nhóm / vị trí'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl mt-1">
                <span className="text-cyan-400 font-semibold">{language === 'EN' ? 'Mission Hint: ' : 'Gợi ý nhiệm vụ: '}</span>
                {language === 'EN' ? currentPuzzle.description : currentPuzzle.vietnameseDescription}
              </p>
            </div>
          </div>

          {/* Lucy Assistant Speech Box */}
          <div className="flex items-center gap-3 bg-[#081224]/80 border border-cyan-500/30 rounded-xl p-3 max-w-md w-full md:w-auto shadow-inner">
            <img 
              src={lucyFacePFP} 
              alt="Lucy" 
              className="w-10 h-10 rounded-full border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)] object-cover shrink-0" 
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                LUCY A.I.
              </span>
              <p className="text-xs text-slate-200 leading-snug line-clamp-2">
                {lucyMessage}
              </p>
            </div>
          </div>
        </section>

        {/* Wordle Board & Active Guess Area */}
        <section className="flex flex-col items-center justify-center gap-4 py-2">
          {/* Wordle Grid (Past Guesses) */}
          <div className="flex flex-col gap-2.5 w-full max-w-lg">
            {/* Render Previous Attempts */}
            {attempts.map((attempt, rowIdx) => (
              <div key={rowIdx} className="flex items-center justify-center gap-3">
                {attempt.fragments.map((fragId, colIdx) => {
                  const frag = ORGANIC_FRAGMENTS[fragId];
                  const status = attempt.statuses[colIdx];
                  return (
                    <motion.div
                      key={colIdx}
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: colIdx * 0.1 }}
                      className={`w-28 h-20 md:w-32 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all ${getStatusStyles(status)}`}
                    >
                      <span className="text-xs font-mono opacity-60 uppercase mb-0.5">
                        {status === 'correct' ? '✓ EXACT' : status === 'present' ? '⇄ WRONG SPOT' : '✕ ABSENT'}
                      </span>
                      <span className="text-xl md:text-2xl font-black tracking-tight">
                        {frag?.displaySymbol || fragId}
                      </span>
                      <span className="text-[10px] font-mono mt-0.5 opacity-80 truncate max-w-full">
                        {language === 'EN' ? frag?.name : frag?.vietnameseName}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Render Current Active Row (if still playing) */}
            {gameStatus === 'PLAYING' && (
              <div className="flex items-center justify-center gap-3 my-1">
                {currentSlots.map((fragId, colIdx) => {
                  const frag = fragId ? ORGANIC_FRAGMENTS[fragId] : null;
                  const isSelected = selectedSlotIndex === colIdx;

                  return (
                    <motion.button
                      key={colIdx}
                      onClick={() => setSelectedSlotIndex(colIdx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-28 h-20 md:w-32 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer relative group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                          : fragId
                          ? 'border-slate-600 bg-slate-900/80 text-white'
                          : 'border-dashed border-slate-700 bg-slate-950/40 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {frag ? (
                        <>
                          <span className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                            {frag.displaySymbol}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300 mt-1 truncate max-w-full">
                            {language === 'EN' ? frag.name : frag.vietnameseName}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearSlot(colIdx);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-950 border border-red-500/80 text-red-400 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                            {language === 'EN' ? `Slot ${colIdx + 1}` : `Vị trí ${colIdx + 1}`}
                          </span>
                          <span className="text-xl text-slate-600 font-light mt-1">+</span>
                        </div>
                      )}

                      {/* Active cursor pill */}
                      {isSelected && (
                        <div className="absolute -bottom-1.5 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Render Empty Future Attempt Placeholders */}
            {Array.from({ 
              length: Math.max(0, currentPuzzle.maxAttempts - attempts.length - (gameStatus === 'PLAYING' ? 1 : 0)) 
            }).map((_, emptyRowIdx) => (
              <div key={emptyRowIdx} className="flex items-center justify-center gap-3 opacity-30">
                {Array.from({ length: currentPuzzle.slots }).map((__, colIdx) => (
                  <div
                    key={colIdx}
                    className="w-28 h-20 md:w-32 md:h-24 rounded-2xl border border-dashed border-slate-800 bg-slate-950/20"
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Realtime Molecule Ribbon & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <button
              onClick={handleClearAll}
              disabled={gameStatus !== 'PLAYING' || currentSlots.every(s => s === null)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              {language === 'EN' ? 'Clear Row' : 'Xóa Hàng'}
            </button>

            <button
              onClick={handleSubmitGuess}
              disabled={gameStatus !== 'PLAYING' || currentSlots.some(s => s === null)}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-mono text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              {language === 'EN' ? '⚡ Synthesize / Test' : '⚡ Tổng Hợp / Kiểm Tra'}
            </button>
          </div>
        </section>

        {/* Radical & Functional Group Toolbox (The "Keyboard") */}
        <section className="bg-[#070e1c]/90 border border-slate-800/80 rounded-2xl p-4 md:p-5 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                {language === 'EN' ? 'Fragment Palette' : 'Bảng Gốc Định Chức'}
              </span>
              <span className="text-[11px] text-slate-500">
                ({language === 'EN' ? 'Click fragment to insert into active slot' : 'Bấm vào nhóm để gắn vào vị trí đã chọn'})
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'ALL', label: language === 'EN' ? 'All' : 'Tất cả' },
                { id: 'alkyl', label: language === 'EN' ? 'Alkyls' : 'Gốc Alkyl' },
                { id: 'alkenyl', label: language === 'EN' ? 'Vinyl / Aromatic' : 'Vinyl / Vòng Thơm' },
                { id: 'functional', label: language === 'EN' ? 'Functional' : 'Nhóm Chức' },
                { id: 'halogen', label: language === 'EN' ? 'Halogens' : 'Halogen' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeCategory === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fragment Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.values(ORGANIC_FRAGMENTS)
              .filter(frag => {
                if (activeCategory === 'ALL') return true;
                if (activeCategory === 'alkenyl') return frag.type === 'alkenyl' || frag.type === 'aromatic';
                return frag.type === activeCategory;
              })
              .map(frag => {
                const status = fragmentStatuses[frag.id];
                const isAllowedForPuzzle = currentPuzzle.allowedFragments.includes(frag.id);

                return (
                  <motion.button
                    key={frag.id}
                    onClick={() => handleSelectFragment(frag.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-center group ${
                      status === 'correct'
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : status === 'present'
                        ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : status === 'absent'
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-40 hover:opacity-80'
                        : isAllowedForPuzzle
                        ? 'bg-[#0b162b]/80 border-cyan-900/50 hover:border-cyan-400 hover:bg-[#0f2142]'
                        : 'bg-slate-900/40 border-slate-800/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Status Pip Badge */}
                    {status && (
                      <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                        status === 'correct' ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' :
                        status === 'present' ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]' :
                        'bg-slate-600'
                      }`} />
                    )}

                    <span className="text-lg font-black text-white group-hover:text-cyan-200 transition-colors">
                      {frag.displaySymbol}
                    </span>
                    <span className="text-xs font-mono text-cyan-400/80">
                      {frag.formula}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-full mt-0.5">
                      {language === 'EN' ? frag.name : frag.vietnameseName}
                    </span>
                  </motion.button>
                );
              })}
          </div>
        </section>

      </main>

      {/* Level Picker Modal */}
      <AnimatePresence>
        {isLevelPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a1224] border border-cyan-900/60 rounded-3xl p-6 max-w-2xl w-full shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-wider">
                    {language === 'EN' ? 'Select Target Molecule' : 'Chọn Hợp Chất Mục Tiêu'}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    {language === 'EN' ? 'Explore organic syntheses across diverse functional classes' : 'Thử thách tổng hợp nhiều nhóm chất hữu cơ'}
                  </p>
                </div>
                <button
                  onClick={() => setIsLevelPickerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-2">
                {ORGANIC_PUZZLES.map((puzzle, idx) => (
                  <button
                    key={puzzle.id}
                    onClick={() => {
                      setPuzzleIndex(idx);
                      setIsLevelPickerOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                      puzzleIndex === idx
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-cyan-800/80 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-cyan-300">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white group-hover:text-cyan-200 transition-colors">
                            {language === 'EN' ? puzzle.name : puzzle.vietnameseName}
                          </span>
                          <span className="font-mono text-xs text-cyan-400 font-semibold">
                            ({puzzle.formula})
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {puzzle.iupacName} • {puzzle.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                        puzzle.difficulty === 'EASY'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                          : puzzle.difficulty === 'MEDIUM'
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800'
                          : 'bg-rose-950/40 text-rose-300 border-rose-800'
                      }`}>
                        {puzzle.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Victory / Defeat Modal */}
      <AnimatePresence>
        {showResultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`border rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-5 text-center relative overflow-hidden ${
                gameStatus === 'WON' 
                  ? 'bg-gradient-to-b from-[#08182b] to-[#040a14] border-cyan-500/60 shadow-[0_0_50px_rgba(34,211,238,0.3)]'
                  : 'bg-gradient-to-b from-[#1c0c14] to-[#0a0408] border-rose-500/60 shadow-[0_0_50px_rgba(244,63,94,0.3)]'
              }`}
            >
              {/* Lucy Sprite Header */}
              <div className="flex justify-center -mt-2">
                <img 
                  src={gameStatus === 'WON' ? lucySpeak : lucyIdle} 
                  alt="Lucy" 
                  className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                />
              </div>

              <div>
                <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
                  gameStatus === 'WON'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {gameStatus === 'WON'
                    ? (language === 'EN' ? '★ SYNTHESIS SUCCESSFUL' : '★ TỔNG HỢP THÀNH CÔNG')
                    : (language === 'EN' ? 'SYNTHESIS DEPLETED' : 'HẾT LƯỢT TỔNG HỢP')}
                </span>

                <h3 className="text-2xl md:text-3xl font-black text-white mt-3 tracking-wide">
                  {language === 'EN' ? currentPuzzle.name : currentPuzzle.vietnameseName}
                </h3>
                <p className="text-sm font-mono text-cyan-300 mt-1">
                  {currentPuzzle.iupacName} ({currentPuzzle.formula})
                </p>
              </div>

              {/* Structural Formula Display */}
              <div className="bg-black/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {language === 'EN' ? 'STRUCTURAL BACKBONE' : 'CẤU TRÚC PHÂN TỬ'}
                </span>
                <span className="text-xl md:text-2xl font-black font-mono tracking-widest text-cyan-200">
                  {currentPuzzle.structuralFormula}
                </span>
              </div>

              {/* Trivia & Applications */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  💡 {language === 'EN' ? 'Chemical Insight' : 'Kiến thức Hóa học'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'EN' ? currentPuzzle.trivia : currentPuzzle.vietnameseTrivia}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <button
                  onClick={() => {
                    setShowResultModal(false);
                    setCurrentSlots(new Array(currentPuzzle.slots).fill(null));
                    setAttempts([]);
                    setGameStatus('PLAYING');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  {language === 'EN' ? 'Replay Puzzle' : 'Chơi Lại'}
                </button>

                <button
                  onClick={handleNextPuzzle}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-mono text-xs tracking-wider uppercase shadow-lg transition-all"
                >
                  {language === 'EN' ? 'Next Molecule ➔' : 'Phân Tử Tiếp Theo ➔'}
                </button>

                <button
                  onClick={() => {
                    setShowResultModal(false);
                    setOrganicMode(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-400 hover:text-white transition-all"
                >
                  {language === 'EN' ? 'Exit to Menu' : 'Về Menu'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganicPuzzleView;
