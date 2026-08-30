import React, { useState } from 'react';
import { useSimulationStore } from '../engine/store';
import { GoogleAuthService, GoogleUserProfile } from '../services/GoogleAuthService';
import { audioManager } from '../engine/AudioManager';

interface GoogleProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserUpdated: (user: GoogleUserProfile) => void;
}

export const GoogleProfileModal: React.FC<GoogleProfileModalProps> = ({ isOpen, onClose, onUserUpdated }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN';

    const [user, setUser] = useState<GoogleUserProfile>(GoogleAuthService.getUser());
    const [customName, setCustomName] = useState(user.name);
    const [customEmail, setCustomEmail] = useState(user.email);

    if (!isOpen) return null;

    const handleGoogleSignIn = () => {
        audioManager.playClick();
        const updated = GoogleAuthService.signInWithGoogleMock(customName, customEmail);
        setUser(updated);
        onUserUpdated(updated);
        audioManager.playDiscoveryChime();
        onClose();
    };

    const handleSignOut = () => {
        audioManager.playClick();
        const guest = GoogleAuthService.signOut();
        setUser(guest);
        onUserUpdated(guest);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[190] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-4 overflow-hidden select-none animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-cyan-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(6,182,212,0.35)] overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60 mb-5">
                    <div className="flex items-center gap-2.5">
                        <span className="text-2xl">🌐</span>
                        <div>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest">
                                GOOGLE WORKSPACE
                            </span>
                            <h3 className="text-base font-black text-white">
                                {isVi ? 'Hồ Sơ Google Học Sinh' : 'Google Student Identity'}
                            </h3>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-cyan-950/80 hover:bg-rose-950/80 border border-cyan-700/60 hover:border-rose-500 text-cyan-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex flex-col items-center text-center p-4 bg-[#030914] border border-cyan-900/60 rounded-2xl mb-4 shadow-inner">
                    <img 
                        src={user.picture} 
                        alt="Google Avatar" 
                        className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] mb-2.5 bg-cyan-950" 
                    />
                    <h4 className="text-base font-bold text-white">{user.name}</h4>
                    <span className="text-xs font-mono text-cyan-300">{user.email}</span>
                    <span className="mt-2 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-mono font-bold">
                        {user.isGoogleConnected ? '✓ Google Workspace Active' : 'Guest Scholar Mode'}
                    </span>
                </div>

                {/* Name & Email inputs for judges or custom login */}
                <div className="space-y-3 mb-5">
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                            {isVi ? 'Tên Học Sinh / Thí Nghiệm Viên:' : 'Student / Researcher Name:'}
                        </label>
                        <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="w-full bg-[#030914] border border-cyan-900 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                            {isVi ? 'Email Google / Trường Học:' : 'Google / School Email:'}
                        </label>
                        <input
                            type="email"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            className="w-full bg-[#030914] border border-cyan-900 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono font-bold text-xs rounded-xl tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>🔑</span>
                        <span>{user.isGoogleConnected ? (isVi ? 'CẬP NHẬT HỒ SƠ' : 'UPDATE PROFILE') : (isVi ? 'ĐĂNG NHẬP VỚI GOOGLE' : 'SIGN IN WITH GOOGLE')}</span>
                    </button>

                    {user.isGoogleConnected && (
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full py-2 bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700 text-slate-400 hover:text-rose-300 font-mono text-xs rounded-xl transition-all cursor-pointer"
                        >
                            {isVi ? 'Đăng xuất tài khoản' : 'Sign out'}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};
