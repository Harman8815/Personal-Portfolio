"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * NotFound Component
 * A cinematic 404 experience for the Lumina OS ecosystem.
 * Features: Holographic glitching, CRT effects, and spatial HUD elements.
 */
const NotFound= () => {
  const containerRef = useRef(null);
  const glitchTextRef = useRef(null);

  useEffect(() => {
    // Random glitch effect for the "404" text
    const glitchInterval = setInterval(() => {
      if (glitchTextRef.current) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const skew = (Math.random() - 0.5) * 5;
        
        gsap.to(glitchTextRef.current, {
          x,
          y,
          skewX: skew,
          duration: 0.05,
          onComplete: () => {
            gsap.to(glitchTextRef.current, { x: 0, y: 0, skewX: 0, duration: 0.05 });
          }
        });
      }
    }, 2000);

    // Initial entrance animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 2, ease: "power4.out" }
    );

    return () => clearInterval(glitchInterval);
  }, []);

  const handleReturn = () => {
    // Simulate a system reboot/redirect
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power4.in",
      onComplete: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden text-white selection:bg-cyan-500/30 min-w-0"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        
        {/* Animated Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(34,211,238,0.02)_50%)] bg-[length:100%_4px] animate-scanline pointer-events-none"></div>
        
        {/* Noise Layer */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]"></div>
      </div>

      {/* Spatial HUD - Top Left */}
      <div className="absolute top-12 left-12 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-[0.5em] text-cyan-500/40">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Signal_Lost::Sector_Unknown</span>
        </div>
        <div className="w-48 h-[1px] bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
      </div>

      {/* Spatial HUD - Bottom Right */}
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 font-mono text-[9px] uppercase tracking-[0.5em] text-slate-500/40">
        <span>Coordinate::NULL_X_NULL_Y</span>
        <div className="w-48 h-[1px] bg-gradient-to-l from-slate-500/40 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-full min-w-0">
        {/* Glitchy 404 */}
        <div className="relative mb-8">
          <h1 
            ref={glitchTextRef}
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black font-mono leading-none tracking-tighter tabular-nums text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.1)] relative z-10 break-words min-w-0"
          >
            404
          </h1>
          {/* Ghost Layers for Glitch Depth */}
          <span className="absolute inset-0 text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black font-mono leading-none tracking-tighter tabular-nums text-cyan-500/20 -translate-x-1 blur-sm animate-pulse min-w-0">404</span>
          <span className="absolute inset-0 text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black font-mono leading-none tracking-tighter tabular-nums text-red-500/10 translate-x-1 blur-[1px] min-w-0">404</span>
        </div>

        {/* Messaging */}
        <div className="max-w-xl flex flex-col items-center gap-8 mb-16 w-full min-w-0">
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-cyan-500/30"></div>
            <span className="font-mono text-xs tracking-[0.8em] text-cyan-400 font-black uppercase">Void_Entry_Detected</span>
            <div className="h-[1px] w-12 bg-cyan-500/30"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-tight break-words min-w-0">
            You have drifted <br /> 
            <span className="text-cyan-500 italic">beyond the mapped network</span>
          </h2>
          
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest leading-relaxed break-words min-w-0">
            The resource you are attempting to access has been <br />
            de-synchronized from the primary Lumina uplink.
          </p>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleReturn}
          className="interactive group relative px-8 sm:px-12 py-5 overflow-hidden border border-white/10 backdrop-blur-md rounded-full transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] min-w-0"
        >
          <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out opacity-10"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-white">
              Initiate_Return_Sequence
            </span>
            <svg className="w-4 h-4 text-cyan-400 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          from { transform: translateY(0); }
          to { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default NotFound;
