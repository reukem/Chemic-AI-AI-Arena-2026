import React, { useState } from 'react';
import { useSimulationStore } from '../engine/store';
import { audioManager } from '../engine/AudioManager';

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const customApiKey = useSimulationStore(state => state.customApiKey);
  const setCustomApiKey = useSimulationStore(state => state.setCustomApiKey);
  const rawLanguage = useSimulationStore(state => state.language);
  const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
  
  const [inputKey, setInputKey] = useState(customApiKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    audioManager.playClick();
    setCustomApiKey(inputKey.trim() === '' ? null : inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    audioManager.playClick();
    setInputKey('');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl pointer-events-auto select-none font-sans cursor-pointer"
    >
      {/* Ambient Background Glows */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-6 md:p-7 rounded-3xl bg-gradient-to-b from-[#061426]/95 via-[#030914]/95 to-[#01040a]/95 border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.95)] backdrop-blur-3xl overflow-hidden cursor-default animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <div className="w-full h-full bg-[#070e1e] rounded-2xl flex items-center justify-center text-cyan-300 font-bold">
                ⚙
              </div>
            </div>
            <div>
              <h2 className="text-sm md:text-base font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 uppercase">
                {isVi ? 'CẤU HÌNH HỆ THỐNG' : 'SYSTEM CONFIGURATION'}
              </h2>
              <p className="text-[10px] font-mono text-slate-400">
                {isVi ? 'Quản lý khóa API & bảo mật nơ-ron' : 'Neural Core Authentication Matrix'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { audioManager.playClick(); onClose(); }}
            onMouseEnter={() => audioManager.playHover()}
            className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white flex items-center justify-center text-xs font-mono transition-all"
            title="Close"
          >
            ✕
          </button>
        </div>
        
        {/* API Key Input Section */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-mono font-bold text-slate-300 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {isVi ? 'KHÓA GEMINI API (TÙY CHỌN):' : 'GEMINI API KEY (OPTIONAL):'}
              </label>
              {inputKey && (
                <button
                  onClick={handleClear}
                  className="text-[10px] font-mono text-rose-400 hover:text-rose-300 uppercase cursor-pointer"
                >
                  {isVi ? 'Xóa khóa' : 'Clear Key'}
                </button>
              )}
            </div>

            <div className="relative">
              <input 
                type={showKey ? "text" : "password"} 
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder={isVi ? 'Dán khóa AI Studio của bạn hoặc để trống...' : 'Paste your custom Gemini API key or leave blank...'}
                className="w-full bg-[#020712] border border-cyan-900/60 focus:border-cyan-400 text-cyan-200 font-mono text-xs rounded-xl py-3 pl-4 pr-11 focus:outline-none transition-all shadow-inner placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 text-xs transition-colors p-1 cursor-pointer"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Key Status Pill */}
          <div className="p-3 rounded-2xl bg-[#071628]/70 border border-cyan-950 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 text-[10px] uppercase">
              {isVi ? 'Trạng thái khóa:' : 'Key Status:'}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
              inputKey.trim() 
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300' 
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
            }`}>
              {inputKey.trim() 
                ? (isVi ? 'Khóa Người Dùng Tùy Chọn' : 'Custom User Key') 
                : (isVi ? 'Khóa Mặc Định Của Hệ Thống' : 'Default System Key Active')}
            </span>
          </div>

          {/* Security & Privacy Notice */}
          <div className="p-3 rounded-2xl bg-[#040e1c]/50 border border-cyan-950 text-[10px] text-slate-400 leading-relaxed font-sans flex gap-2.5">
            <span className="text-sm shrink-0">🔒</span>
            <p>
              {isVi 
                ? 'Khóa API được lưu cục bộ an toàn trong phiên trình duyệt của bạn và không bao giờ gửi đến máy chủ ngoài.' 
                : 'API Keys are securely retained in local browser memory and never dispatched to external servers.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3">
          <button 
            onClick={() => { audioManager.playClick(); onClose(); }}
            onMouseEnter={() => audioManager.playHover()}
            className="px-4 py-2 text-slate-400 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            {isVi ? 'HỦY' : 'CANCEL'}
          </button>
          
          <button 
            onClick={handleSave}
            onMouseEnter={() => audioManager.playHover()}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95 cursor-pointer"
          >
            {isVi ? 'ÁP DỤNG CẤU HÌNH ➔' : 'APPLY CONFIG ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}
