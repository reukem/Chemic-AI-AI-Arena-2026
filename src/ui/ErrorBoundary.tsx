import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: string; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: '' };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Quantum Engine Render Panic:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-10 font-mono text-red-500 z-[9999] select-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
            <span className="w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
            SYSTEM PANIC
          </h1>
          <p className="text-lg mb-6 text-red-400">A fatal React render exception occurred. Core isolation engaged.</p>
          <pre className="bg-red-950/80 p-6 rounded border border-red-500 w-full max-w-4xl overflow-auto text-sm text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            {this.state.error}
          </pre>
          <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 border border-red-500 hover:bg-red-900 hover:text-white transition-colors rounded font-bold tracking-widest">
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
