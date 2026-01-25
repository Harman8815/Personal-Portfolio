
import React, { useMemo } from 'react';
import ThreeBackground from './ThreeBackground';


const LoadingScreen = ({ progress, isExiting }) => {
  const logs = useMemo(() => [
    "Establishing connection...",
    "Mounting React Fiber components...",
    "Initializing Three.js WebGL context...",
    "Syncing developer repositories...",
    "Fetching tech stack dependencies...",
    "Compiling Tailwind styles...",
    "Optimizing asset delivery...",
    "Waking up the neural engine...",
    "Finalizing UI transitions...",
    "Ready for deployment."
  ], []);

  // Determine which log to show based on progress
  const currentLogIndex = Math.floor((progress / 100) * (logs.length - 1));

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'} overflow-hidden`}>
      
      {/* 3D Visualizer */}
     <ThreeBackground progress={progress} />

      {/* Main UI */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        
        {/* Progress Counter - Large & Bold */}
        <div className="flex flex-col items-center mb-12">
           <div className="flex items-baseline space-x-2">
            <span className="text-9xl md:text-[12rem] font-black font-mono text-white leading-none tracking-tighter tabular-nums select-none">
              {progress}
            </span>
            <span className="text-2xl font-mono text-cyan-400 font-bold">%</span>
          </div>
          
          <div className="mt-4 flex items-center gap-3">
             <div className="h-px w-12 bg-slate-800"></div>
             <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-cyan-500/80 font-bold">System Loading</span>
             <div className="h-px w-12 bg-slate-800"></div>
          </div>
        </div>

        {/* Technical Progress Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Console Output</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg font-mono text-xs overflow-hidden h-24 flex flex-col justify-end shadow-2xl">
              {logs.slice(Math.max(0, currentLogIndex - 2), currentLogIndex + 1).map((log, i) => (
                <div key={log} className={`transition-all duration-300 ${i === 2 ? 'text-cyan-400' : 'text-slate-600 opacity-50'}`}>
                  <span className="text-cyan-800 mr-2">➜</span> {log}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end font-mono text-[10px] text-slate-500 uppercase tracking-widest px-1">
              <span>Bitstream Check</span>
              <span>{progress === 100 ? 'Verified' : 'Processing...'}</span>
            </div>
            <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-sm p-0.5 overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-2">
               {Array.from({length: 10}).map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < Math.floor(progress/10) ? 'bg-cyan-500/50' : 'bg-slate-800'}`} 
                 />
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Branding */}
      <div className="absolute bottom-10 left-10 flex items-center gap-3 font-mono opacity-50 text-[10px] tracking-widest uppercase">
        <span className="text-cyan-400">0xDEV</span> 
        <span className="h-3 w-px bg-slate-700"></span>
        <span>Portfolio 2025</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
