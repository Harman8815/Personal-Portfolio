"use client";
import React from "react";

export default function GlobalError({ error, reset }) {
  const errorCode = error?.digest || "0xFATAL";
  const message = "SYSTEM_FAILURE";

  return (
    <html>
      <body className="fixed inset-0 bg-[#020617] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-red-500/30 animate-scan-fast"></div>
        </div>

        <main className="relative z-10 min-h-screen flex items-center justify-center px-8">
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="w-14 h-14 border-2 border-red-500/50 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-red-500 font-black text-3xl">!</span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.6em] text-red-500 uppercase font-black">
                Critical_System_Failure
              </span>
            </div>

            <div className="relative mb-12">
              <h1 className="text-[9rem] md:text-[12rem] font-black font-mono text-white leading-none tracking-tighter select-none glitch-code">
                {errorCode}
              </h1>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 whitespace-nowrap">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-red-500/50"></div>
                <span className="text-[11px] font-mono uppercase tracking-[0.8em] text-red-400 font-black">
                  {message}
                </span>
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-red-500/50"></div>
              </div>
            </div>

            <div className="w-full bg-slate-950/40 border border-white/5 backdrop-blur-xl p-8 rounded-lg relative overflow-hidden mb-12 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>

              <div className="flex flex-col gap-4 font-mono text-[11px] text-slate-400">
                <div className="flex gap-4">
                  <span className="text-red-500 opacity-60">[CRASH]</span>
                  <span>Root layout execution halted unexpectedly.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-red-500 opacity-60">[CORE]</span>
                  <span>Hydration boundary failed to synchronize.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-cyan-500 opacity-60">[INFO]</span>
                  <span className="animate-pulse">
                    Attempting full system restart...
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={reset}
              className="group relative px-16 py-5 overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 font-mono text-xs font-black uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">
                Force_Reboot
              </span>
            </button>
          </div>
        </main>

        <div className="absolute bottom-12 right-12 flex flex-col items-end opacity-20 pointer-events-none">
          <span className="font-mono text-[8px] tracking-[0.5em] text-slate-500 uppercase mb-2">
            Kernel::Unknown_State
          </span>
          <div className="w-32 h-[1px] bg-gradient-to-l from-red-500 to-transparent"></div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes scan-fast {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(1000%); }
            }
            .animate-scan-fast {
              animation: scan-fast 1.8s linear infinite;
            }
            @keyframes glitch-code {
              0%,100% { transform: translate(0); filter: hue-rotate(0deg); }
              5% { transform: translate(-6px,3px); filter: hue-rotate(90deg); }
              10% { transform: translate(6px,-3px); filter: hue-rotate(180deg); }
              15% { transform: translate(-3px,-6px); filter: hue-rotate(270deg); }
              20% { transform: translate(0); }
            }
            .glitch-code {
              animation: glitch-code 4s infinite step-end;
              text-shadow: 0 0 40px rgba(255,255,255,0.12);
            }
          `,
          }}
        />
      </body>
    </html>
  );
}
