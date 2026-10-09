import React, { useMemo } from 'react';
import { useSimulationStore } from '../engine/store';
import { GoogleAuthService } from '../services/GoogleAuthService';
import { audioManager } from '../engine/AudioManager';
import { VIETNAM_EXAM_QUESTS } from '../data/VietnamExamQuests';

interface CompetencyRadarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STORAGE_QUESTS_KEY = 'chemic_ai_completed_quests';

export const CompetencyRadarModal: React.FC<CompetencyRadarModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN';

    const user = GoogleAuthService.getUser();

    const completedQuestIds: string[] = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_QUESTS_KEY) || '[]');
        } catch {
            return [];
        }
    }, [isOpen]);

    // Compute 5-axis competency score (0 - 100)
    const competencies = useMemo(() => {
        let stoichiometry = 45;
        let thermodynamics = 40;
        let organic = 50;
        let safety = 60;
        let inorganic = 45;

        completedQuestIds.forEach(qId => {
            const q = VIETNAM_EXAM_QUESTS.find(item => item.id === qId);
            if (q) {
                stoichiometry += q.competencyScores.stoichiometry * 0.4;
                thermodynamics += q.competencyScores.thermodynamics * 0.4;
                organic += q.competencyScores.organic * 0.4;
                safety += q.competencyScores.safety * 0.4;
                inorganic += q.competencyScores.inorganic * 0.4;
            }
        });

        return {
            stoichiometry: Math.min(100, Math.round(stoichiometry)),
            thermodynamics: Math.min(100, Math.round(thermodynamics)),
            organic: Math.min(100, Math.round(organic)),
            safety: Math.min(100, Math.round(safety)),
            inorganic: Math.min(100, Math.round(inorganic)),
        };
    }, [completedQuestIds]);

    if (!isOpen) return null;

    const handlePrintCertificate = () => {
        audioManager.playClick();
        window.print();
    };

    // Calculate SVG Polygon coordinates for 5-axis radar
    const center = 110;
    const radius = 80;
    const angles = [
        -Math.PI / 2,                  // Top: Stoichiometry
        -Math.PI / 2 + (2 * Math.PI) / 5, // Top-Right: Thermodynamics
        -Math.PI / 2 + (4 * Math.PI) / 5, // Bottom-Right: Organic
        -Math.PI / 2 + (6 * Math.PI) / 5, // Bottom-Left: Safety
        -Math.PI / 2 + (8 * Math.PI) / 5  // Top-Left: Inorganic
    ];

    const values = [
        competencies.stoichiometry / 100,
        competencies.thermodynamics / 100,
        competencies.organic / 100,
        competencies.safety / 100,
        competencies.inorganic / 100
    ];

    const polygonPoints = angles.map((angle, i) => {
        const r = radius * values[i];
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const webPoints = [0.25, 0.5, 0.75, 1.0].map(level => {
        return angles.map(angle => {
            const r = radius * level;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    });

    return (
        <div className="fixed inset-0 z-[190] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto p-4 overflow-y-auto select-none animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-cyan-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(6,182,212,0.35)] overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <span className="text-2xl">📊</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                <span className="text-cyan-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'ĐÁNH GIÁ NĂNG LỰC HỌC SINH' : 'STUDENT COMPETENCY MATRIX'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {isVi ? 'BIỂU ĐỒ NĂNG LỰC & CHỨNG NHẬN' : 'COMPETENCY RADAR & CERTIFICATE'}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-900 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Left: 5-Axis Radar Chart */}
                    <div className="bg-[#030914] border border-cyan-900/60 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-inner">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                            {isVi ? 'RADAR ĐÁNH GIÁ 5 TIÊU CHUẨN' : '5-AXIS MASTERY RADAR'}
                        </span>

                        <svg width="220" height="220" className="overflow-visible">
                            {/* Spider Web Rings */}
                            {webPoints.map((pts, wIdx) => (
                                <polygon key={wIdx} points={pts} fill="none" stroke="#0e2a47" strokeWidth="1" />
                            ))}

                            {/* Axis Lines */}
                            {angles.map((angle, aIdx) => {
                                const x = center + radius * Math.cos(angle);
                                const y = center + radius * Math.sin(angle);
                                return <line key={aIdx} x1={center} y1={center} x2={x} y2={y} stroke="#0e2a47" strokeWidth="1" />;
                            })}

                            {/* Data Polygon */}
                            <polygon 
                                points={polygonPoints} 
                                fill="rgba(34, 211, 238, 0.25)" 
                                stroke="#22d3ee" 
                                strokeWidth="2" 
                                className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                            />

                            {/* Axis Labels */}
                            <text x={center} y={center - radius - 8} textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                                {isVi ? 'LƯỢNG CHẤT' : 'STOICHIOMETRY'}
                            </text>
                            <text x={center + radius + 15} y={center - 20} textAnchor="start" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                                {isVi ? 'NHIỆT ĐỘNG' : 'THERMODYNAMICS'}
                            </text>
                            <text x={center + radius - 10} y={center + radius + 14} textAnchor="start" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                                {isVi ? 'HỮU CƠ' : 'ORGANIC'}
                            </text>
                            <text x={center - radius + 10} y={center + radius + 14} textAnchor="end" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                                {isVi ? 'AN TOÀN' : 'SAFETY'}
                            </text>
                            <text x={center - radius - 15} y={center - 20} textAnchor="end" fill="#67e8f9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                                {isVi ? 'VÔ CƠ' : 'INORGANIC'}
                            </text>
                        </svg>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono text-slate-300 w-full mt-3 pt-2 border-t border-cyan-950">
                            <div>{isVi ? 'Tính toán:' : 'Calculations:'} <strong className="text-cyan-300">{competencies.stoichiometry}%</strong></div>
                            <div>{isVi ? 'Nhiệt động:' : 'Thermodynamics:'} <strong className="text-cyan-300">{competencies.thermodynamics}%</strong></div>
                            <div>{isVi ? 'Hóa hữu cơ:' : 'Organic:'} <strong className="text-cyan-300">{competencies.organic}%</strong></div>
                            <div>{isVi ? 'An toàn:' : 'Lab Safety:'} <strong className="text-cyan-300">{competencies.safety}%</strong></div>
                        </div>
                    </div>

                    {/* Right: Digital Certificate Preview Card */}
                    <div className="bg-gradient-to-br from-[#0c233c] to-[#040f1c] border-2 border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(251,191,36,0.15)] relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                        <div>
                            <div className="flex items-center justify-between border-b border-amber-400/30 pb-2 mb-3">
                                <span className="text-[10px] font-mono font-bold text-amber-300 tracking-widest uppercase">
                                    GOOGLE AI RISER 2026 // CERTIFICATE
                                </span>
                                <span className="text-xs">🏆</span>
                            </div>

                            <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                {isVi ? 'CHỨNG NHẬN THỰC HÀNH HÓA HỌC' : 'CERTIFICATE OF LABORATORY EXCELLENCE'}
                            </h3>
                            <p className="text-[11px] text-slate-300 mt-1">
                                {isVi ? 'Chứng nhận học sinh đã hoàn thành xuất sắc các bài thực hành Hóa học chuẩn GDPT 2018:' : 'Awarded for demonstrating proficiency in chemistry experiments:'}
                            </p>

                            <div className="my-3 py-1.5 px-3 bg-black/40 border border-amber-400/40 rounded-xl text-center">
                                <span className="text-sm font-black font-mono text-amber-300">{user.name}</span>
                                <span className="block text-[9px] font-mono text-slate-400">{user.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-cyan-900/40 text-[9px] font-mono text-slate-400">
                            <div>
                                <span>{isVi ? 'Ký tên: ' : 'Signed: '}</span>
                                <strong className="text-cyan-300">{isVi ? 'Giáo sư Lucy' : 'Professor Lucy'}</strong>
                            </div>
                            <span className="text-emerald-400 font-bold">{isVi ? '✓ Xác thực trên Chuỗi' : '✓ Blockchain Verified'}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handlePrintCertificate}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer flex items-center gap-2"
                    >
                        <span>🖨️</span>
                        <span>{isVi ? 'IN / TẢI CHỨNG NHẬN (PDF)' : 'PRINT CERTIFICATE (PDF)'}</span>
                    </button>
                </div>

            </div>
        </div>
    );
};
