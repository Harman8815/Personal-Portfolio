import React, { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

/**
 * EndSequence Component.
 * A high-fidelity "System Termination" sequence.
 * Features a circular desync indicator and cinematic typography.
 * Increased duration and absolute persistence to prevent disappearing.
 */
const EndSequence = ({ refs, visible }) => {
  const containerRef = refs?.containerRef || useRef(null);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const isComplete = progress >= 100;

  const logs = [
    "UPLINK_STATUS: DISCONNECTING",
    "PURGING_VOLATILE_MEMORY...",
    "FLUSHING_SHADERS::0x00FF",
    "ENCRYPTED_TUNNEL_CLOSE",
    "DE-SYNCHRONIZING_CORE_NODES",
    "NEURAL_FABRIC_COLLAPSE",
    "ARCHIVING_SESSION_ASSETS",
    "FINAL_HANDSHAKE_COMPLETE",
    "POWERING_DOWN_SUBSYSTEMS",
    "VOID_CONNECTION::ESTABLISHED",
  ];

  const currentLogIndex = Math.min(
    Math.floor((progress / 100) * logs.length),
    logs.length - 1,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        
        if (isIntersecting && !hasStarted) {
          // Start the sequence when scrolling into view
          setHasStarted(true);
        } else if (!isIntersecting && hasStarted) {
          // Reset when scrolling out of view so it can restart
          setHasStarted(false);
          setProgress(0);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const interval = setInterval(() => {
      // Much slower termination progress for higher tension
      const isSlow = Math.random() > 0.15;
      const jump = isSlow ? Math.random() * 0.4 + 0.5 : Math.random() * 2 + 1;

      current = Math.min(current + jump, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center w-full min-h-screen bg-primary text-primary overflow-hidden"
    >
      {/* Cinematic Digital Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:60px_60px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-primary)_95%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(34,211,238,0.015)_50%)] bg-[length:100%_4px] animate-scanline"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-8 py-20 transition-all duration-1000">
        {!isComplete ? (
          <div className="flex flex-col items-center gap-16 animate-fade-in w-full">
            {/* Holographic Circular Progress */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 border-[1px] border-cyan-500/10 rounded-full animate-spin-slow"></div>
              <div
                className={`absolute inset-8 border-[2px] border-cyan-400/20 rounded-full ${Math.floor(progress * 10) % 10 === 0 ? "scale-105 opacity-40" : "scale-100 opacity-10"} transition-all duration-300`}
              ></div>

              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray="754"
                  strokeDashoffset={754 - (progress * 754) / 100}
                  className="text-cyan-500 transition-all duration-150 ease-linear drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]"
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-7xl font-black tabular-nums tracking-tighter">
                  {Math.round(progress)}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-cyan-500/60 font-black mt-1">
                  Status_Purge
                </span>
              </div>
            </div>

            {/* Termination Logs Dashboard */}
            <div className="w-full max-w-md bg-white/[0.02] border border-white/5 backdrop-blur-xl p-10 rounded-3xl relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_#ef4444]"></span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">
                    Term_Log_Stream
                  </span>
                </div>
                <span className="font-mono text-[8px] text-cyan-500/40">
                  SEC_VOID_HANDSHAKE
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 font-mono text-xs text-white font-medium uppercase tracking-widest min-h-[1.5rem] opacity-80">
                  <span className="text-cyan-500">0x</span>
                  <span>{logs[currentLogIndex]}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-[3px] transition-all duration-500 ${i < progress / 3.125 ? "bg-cyan-500 shadow-[0_0_12px_#22d3ee]" : "bg-slate-900/50"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center animate-reveal-gratitude">
            {/* Triumphant Status */}
            <div className="mb-14 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 px-10 py-3 bg-[#00FF88]/5 border border-[#00FF88]/40 rounded-full backdrop-blur-3xl shadow-[0_0_60px_rgba(0,255,136,0.2)]">
                <div className="relative">
                  <span className="absolute inset-0 w-3 h-3 bg-[#00FF88] rounded-full animate-ping"></span>
                  <span className="relative block w-3 h-3 bg-[#00FF88] rounded-full"></span>
                </div>
                <span className="font-mono text-[10px] text-[#00FF88] uppercase tracking-[0.8em] font-black">
                  Connection_De-synced
                </span>
              </div>
            </div>

            <div className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-14 text-primary drop-shadow-[0_0_100px_rgba(0,255,136,0.45)]">
              <TypeAnimation
                sequence={[
                  "Thank You!",
                  4000,
                  "Stay_Real",
                  2000,
                  "0xDEV::OFFLINE",
                  2000,
                ]}
                speed={40}
                repeat={Infinity}
              />
            </div>

            <div className="relative group max-w-2xl w-full px-8 py-10 bg-slate-950/50 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl overflow-hidden hover:border-[#00FF88]/40 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/50 to-transparent"></div>
              <p className="font-mono text-[10px] md:text-xs text-slate-400 leading-relaxed uppercase tracking-[0.4em] mb-10">
                The session has been archived in the void. <br />
                No active listeners remaining on current channel. <br />
                <span className="text-primary mt-8 block font-black text-2xl tracking-[0.6em] drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                  0xDEV // MMXXV
                </span>
              </p>
              <div className="pt-10 border-t border-white/10 flex justify-center gap-16 text-[9px] font-mono text-slate-500 uppercase tracking-[0.6em]">
                <span className="hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110">
                  GitHub
                </span>
                <span className="hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110">
                  Resume
                </span>
                <span className="hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110">
                  Contact
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scanline {
          from { transform: translateY(0); }
          to { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 12s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes reveal-gratitude {
          from { opacity: 0; transform: translateY(80px) scale(0.85); filter: blur(40px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-reveal-gratitude {
          animation: reveal-gratitude 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
      `,
        }}
      />
    </section>
  );
};

export default EndSequence;
