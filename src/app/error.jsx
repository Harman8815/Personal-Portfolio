"use client";
import React from "react";

export default function Error({ error, reset }) {
  const errorCode = error?.digest || "0x500";
  const message = error?.message || "LOST_IN_THE_VOID";

  return (
    <div className="fixed inset-0 z-[500] bg-[#020617] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-cyan-500/20 animate-scan-fast"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-2 border-red-500/40 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-red-500 font-black text-2xl">!</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.5em] text-red-500 uppercase font-black">
            System_Anomaly_Detected
          </span>
        </div>

        <div className="relative mb-12">
          <h1 className="text-[10rem] md:text-[14rem] font-black font-mono text-white leading-none tracking-tighter tabular-nums select-none glitch-code">
            {errorCode}
          </h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 whitespace-nowrap">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-red-500/40"></div>
            <span className="text-[12px] font-mono uppercase tracking-[0.8em] text-red-400 font-black">
              {message}
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-red-500/40"></div>
          </div>
        </div>

        <div className="w-full bg-slate-950/40 border border-white/5 backdrop-blur-xl p-8 rounded-lg relative overflow-hidden mb-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Diagnostic_Log::CORE_VOID
              </span>
              <span className="font-mono text-[8px] text-red-500/50">
                SEC_ERROR_V4.0
              </span>
            </div>

            <div className="space-y-2 font-mono text-[11px] text-slate-400">
              <div className="flex gap-4">
                <span className="text-red-500 opacity-50">[FAIL]</span>
                <span>Neural_Link_Timeout: Remote server de-synchronized.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-red-500 opacity-50">[FAIL]</span>
                <span>Spatial_Buffer_Overflow: Memory address 0xDEADBEEF unmapped.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-cyan-500 opacity-50">[INFO]</span>
                <span className="animate-pulse">Attempting to re-establish uplink...</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={reset}
          className="group relative px-16 py-5 overflow-hidden transition-all"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-center gap-4">
            <span className="font-mono text-xs font-black uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">
              Initiate_Reboot
            </span>
            <div className="w-4 h-px bg-cyan-500 group-hover:bg-black transition-colors"></div>
          </div>
        </button>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-end opacity-20 pointer-events-none">
        <span className="font-mono text-[8px] tracking-[0.5em] text-slate-500 uppercase mb-2">
          Location::Unknown_Sector
        </span>
        <div className="w-32 h-[1px] bg-gradient-to-l from-red-500 to-transparent"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-fast {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scan-fast {
          animation: scan-fast 2s linear infinite;
        }
        @keyframes glitch-code {
          0%,100% { transform: translate(0); filter: hue-rotate(0deg); }
          5% { transform: translate(-5px,2px); filter: hue-rotate(90deg); }
          10% { transform: translate(5px,-2px); filter: hue-rotate(180deg); }
          15% { transform: translate(-2px,-5px); filter: hue-rotate(270deg); }
          20% { transform: translate(0); }
        }
        .glitch-code {
          animation: glitch-code 5s infinite step-end;
          text-shadow: 0 0 30px rgba(255,255,255,0.1);
        }
      `}} />
    </div>
  );
}
