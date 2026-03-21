"use client"
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(MotionPathPlugin);

const SOCIAL_LINKS = [
  { id: 'github', name: 'GitHub', icon: <Github size={24} />, url: '#', color: '#00D4FF' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={24} />, url: '#', color: '#7A5CFF' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={24} />, url: '#', color: '#FF00D4' },
  { id: 'twitter', name: 'Twitter', icon: <Twitter size={24} />, url: '#', color: '#00D4FF' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={24} />, url: '#', color: '#FF0000' },
  { id: 'website', name: 'Portfolio', icon: <Globe size={24} />, url: '#', color: '#00FFD4' },
];

const HEX_CHARS = "0123456789ABCDEF";
const generateHex = (len) => Array.from({ length: len }).map(() => HEX_CHARS[Math.floor(Math.random() * 16)]).join("");

const SocialHub = () => {
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const headingRef = useRef(null);
  const nodesRef = useRef(null);
  const pathsRef = useRef([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax for background and traces
      gsap.to('.bg-parallax', {
        x: () => mousePos.x * 20,
        y: () => mousePos.y * 20,
        duration: 2,
        ease: "power2.out"
      });

      gsap.to('.traces-parallax', {
        x: () => mousePos.x * 10,
        y: () => mousePos.y * 10,
        duration: 1.5,
        ease: "power2.out"
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" }
      });

      // 1. SYSTEM BOOT (0 → 0.6s)
      tl.set(containerRef.current, { opacity: 0, scale: 0.98 });
      tl.set(coreRef.current, { opacity: 0, scale: 0.8, filter: 'blur(20px)' });
      tl.set(headingRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' });
      tl.set('.social-node', { opacity: 0, scale: 0.5 });
      tl.set('.connection-path, .coord-label', { opacity: 0 });

      tl.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.out"
      }, 0);

      // 2. ENERGY FORMATION (0.6 → 1.2s)
      tl.to(coreRef.current, {
        opacity: 0.6,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: "power2.out"
      }, 0.6);

      // 3. IDENTITY REVEAL (1.2 → 1.8s)
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: "expo.out",
        onStart: () => {
          // Subtle glitch effect
          gsap.to(headingRef.current, {
            skewX: 10,
            duration: 0.05,
            repeat: 1,
            yoyo: true,
            ease: "none"
          });
        }
      }, 1.2);

      tl.to(coreRef.current, {
        opacity: 0.3,
        duration: 0.4
      }, 1.6);

      // 4. CONNECTION NODES (1.8 → 2.6s)
      // A. Circuit Traces
      tl.to('.connection-path', {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.inOut"
      }, 1.8);

      // B. Labels
      tl.to('.coord-label', {
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out"
      }, 2.2);

      // C. Icon Spawn
      tl.to('.social-node', {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }, 2.4);

      // D. Data Packets
      SOCIAL_LINKS.forEach((_, i) => {
        const packet = `.packet-${i}`;
        const path = pathsRef.current[i];
        if (!path) return;

        gsap.set(packet, { opacity: 0 });

        // Loop data flow
        const flowTl = gsap.timeline({ repeat: -1, delay: 2.8 + (i * 0.2) });
        flowTl.to(packet, { opacity: 1, duration: 0.1 })
          .to(packet, {
            motionPath: {
              path: path,
              align: path,
              autoRotate: true,
              alignOrigin: [0.5, 0.5]
            },
            duration: 2,
            ease: "none"
          })
          .to(packet, { opacity: 0, duration: 0.1 });
      });

      // 5. STABILIZATION (2.6 → 2.8s)
      tl.to('.connection-path', {
        opacity: 0.3,
        duration: 0.4
      }, 2.6);

      // Idle Animations
      // Floating icons
      SOCIAL_LINKS.forEach((_, i) => {
        gsap.to(`.node-${i}`, {
          y: '+=8',
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Core breathing
      gsap.to(coreRef.current, {
        scale: 1.1,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Background gradient shift
      gsap.to('.bg-gradient-mesh', {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden bg-parallax">
        {/* Subtle Grid */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/* Schematic Lines */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute top-[15%] left-0 w-full h-px bg-cyan-500/30" />
          <div className="absolute top-[85%] left-0 w-full h-px bg-cyan-500/30" />
          <div className="absolute left-[15%] top-0 w-px h-full bg-cyan-500/30" />
          <div className="absolute left-[85%] top-0 w-px h-full bg-cyan-500/30" />

          {/* Blueprint Labels */}
          <div className="absolute top-[16%] left-[16%] text-[8px] font-mono text-cyan-400/40 uppercase tracking-widest">Sector_01_Alpha</div>
          <div className="absolute top-[16%] right-[16%] text-[8px] font-mono text-cyan-400/40 uppercase tracking-widest">Node_Sync_Active</div>
          <div className="absolute bottom-[16%] left-[16%] text-[8px] font-mono text-cyan-400/40 uppercase tracking-widest">Core_Temp_Stable</div>
          <div className="absolute bottom-[16%] right-[16%] text-[8px] font-mono text-cyan-400/40 uppercase tracking-widest">Protocol_V2.4</div>

          {/* Corner Accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-cyan-500/40" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-cyan-500/40" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-cyan-500/40" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-cyan-500/40" />

          {/* Micro Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Hex Data Streams */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-around overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`stream-${i}`} className="flex flex-col animate-scrolling-text whitespace-nowrap font-mono text-[10px] text-cyan-400">
              {Array.from({ length: 40 }).map((_, j) => (
                <div key={`hex-${i}-${j}`} className="py-1">{generateHex(8)}</div>
              ))}
              {/* Duplicate for seamless loop */}
              {Array.from({ length: 40 }).map((_, j) => (
                <div key={`hex-dup-${i}-${j}`} className="py-1">{generateHex(8)}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Radar Pulses */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute w-[400px] h-[400px] border border-cyan-500/10 rounded-full animate-radar-pulse" />
          <div className="absolute w-[600px] h-[600px] border border-cyan-500/5 rounded-full animate-radar-pulse delay-1000" />
          <div className="absolute w-[800px] h-[800px] border border-cyan-500/5 rounded-full animate-radar-pulse delay-2000" />
        </div>

        {/* Dynamic Animated Figures (Floating Data Cubes & Schematic Shapes) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`figure-${i}`}
              className={`absolute border border-cyan-500/20 bg-cyan-500/5 ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rotate-45' : 'skew-x-12'} animate-float`}
              style={{
                width: `${8 + Math.random() * 25}px`,
                height: `${8 + Math.random() * 25}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${12 + Math.random() * 15}s`,
                opacity: 0.03 + Math.random() * 0.12
              }}
            >
              {/* Inner detail for some figures */}
              {i % 4 === 0 && <div className="absolute inset-1 border border-cyan-500/10 animate-pulse" />}
            </div>
          ))}
        </div>

        <div className="bg-gradient-mesh absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#7A5CFF_0%,transparent_50%),radial-gradient(circle_at_70%_70%,#00D4FF_0%,transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      </div>



      {/* Energy Core (Detailed IC Look) */}
      <div
        ref={coreRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0 pointer-events-none flex items-center justify-center transition-transform duration-1000 ${hoveredId ? 'scale-110' : 'scale-100'} hidden md:flex`}
      >
        {/* Heartbeat Effect */}
        <div className={`absolute inset-0 rounded-full bg-cyan-500/5 transition-opacity duration-300 ${hoveredId ? 'animate-ping opacity-20' : 'opacity-0'}`} />

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow" />

        {/* IC Grid Pattern (Diamond Shape) */}
        <div className="absolute w-48 h-48 border border-cyan-500/40 rotate-45 flex items-center justify-center overflow-hidden bg-cyan-500/5 backdrop-blur-sm">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`bg-cyan-400 w-full h-full ${Math.random() > 0.8 ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${Math.random() * 2}s` }}
              />
            ))}
          </div>
          {/* Inner Diamond Accent */}
          <div className="w-12 h-12 border border-cyan-400/50 rotate-45 animate-pulse" />
        </div>

        {/* Central Glow */}
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(122, 92, 255, 0.1) 50%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* Identity Heading */}
      <div className={`relative z-20 text-center font-orbitron transition-all duration-700 ${hoveredId ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'} px-6 md:mt-0 mt-20`}>
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white uppercase"
        >
          <span className="block text-white">Digital</span>
          <span className="block -mt-1 md:-mt-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">Identity</span>
        </h1>
        <p className="md:hidden mt-4 text-[10px] text-white/40 uppercase tracking-[0.3em] font-mono">
          System_Access // Social_Nodes
        </p>
      </div>

      {/* Social Nodes (Desktop) */}
      <div ref={nodesRef} className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        {SOCIAL_LINKS.map((link, i) => {
          const angle = (i / SOCIAL_LINKS.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 260;
          const isHovered = hoveredId === link.id;
          const magneticX = isHovered ? mousePos.x * 15 : 0;
          const magneticY = isHovered ? mousePos.y * 15 : 0;

          // Determine card position based on quadrant
          const isRight = Math.cos(angle) > 0;
          const isBottom = Math.sin(angle) > 0;

          return (
            <div
              key={link.id}
              className={`social-node node-${i} absolute top-1/2 left-1/2 pointer-events-auto transition-all duration-500 ease-out`}
              style={{
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius + magneticX}px, ${Math.sin(angle) * radius + magneticY}px)`,
                zIndex: isHovered ? 100 : 30
              }}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 ${isHovered ? 'scale-125 -translate-y-4 border-cyan-500/50 bg-cyan-500/10' : 'hover:scale-110'}`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 blur-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: link.color + '44' }}
                />

                <div className={`relative z-10 transition-all duration-500 ${isHovered ? 'text-white scale-110' : 'text-white/50 group-hover:text-white'}`}>
                  {link.icon}
                </div>

                {/* Dynamic Hover Card (Popup) - Enhanced Design */}
                <div className={`absolute w-64 p-6 rounded-2xl bg-[#0a0a0a]/95 border border-white/10 backdrop-blur-3xl transition-all duration-500 pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  } ${isRight ? 'left-full ml-8' : 'right-full mr-8'
                  } ${isBottom ? 'bottom-0' : 'top-0'
                  }`}>
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-10">
                    <div className="w-full h-1 bg-white/20 animate-scan" />
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{link.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] text-cyan-400/60 font-mono tracking-widest uppercase">Node_Active</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
                        {link.icon}
                      </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[7px] text-white/30 uppercase tracking-widest block">Protocol</span>
                        <span className="text-[9px] text-white font-mono">HTTPS/TLS</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[7px] text-white/30 uppercase tracking-widest block">Bitrate</span>
                        <span className="text-[9px] text-white font-mono">1.2 Gbps</span>
                      </div>
                    </div>

                    <div className="mt-2 p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group/btn">
                      <span className="text-[9px] text-white font-black uppercase tracking-[0.2em]">Establish_Link</span>
                      <ArrowRight size={14} className="text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Mobile List View */}
      <div className="md:hidden absolute top-0 left-0 h-full w-full p-6 z-40 min-h-[60vh] overflow-y-auto bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">Available_Links</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-75" />
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-150" />
            </div>
          </div>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={`mobile-${link.id}`}
              href={link.url}
              className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl active:scale-95 active:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: link.color + '15', color: link.color }}
                >
                  {link.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-white">{link.name}</span>
                  <span className="text-[8px] text-white/30 font-mono mt-0.5">0x{link.id.toUpperCase()}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-active:text-cyan-400 group-active:border-cyan-400/30 transition-colors">
                <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
