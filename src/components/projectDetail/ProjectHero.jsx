import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Play, Pause } from 'lucide-react';
import { useAutoScroll } from '../autoScroll/AutoScrollContext.jsx';

const ProjectHero = ({ name, description, year, id }) => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const { play, pause, resume, isPlaying, isPaused } = useAutoScroll();

  const handlePlayClick = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      play();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotating glow animation
      gsap.to(glowRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Hero entry animations are handled by the parent ScrollTrigger
      // but we can set initial states here
      gsap.set(titleRef.current, { scale: 1, filter: 'blur(0px)', opacity: 1 });

      // Subtle glitch loop
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
      glitchTl.to(".hero-glitch", { opacity: 0.5, duration: 0.1 })
              .to(".hero-glitch", { x: -5, duration: 0.05 })
              .to(".hero-glitch", { x: 5, duration: 0.05 })
              .to(".hero-glitch", { opacity: 0, x: 0, duration: 0.1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-40 md:pt-56">
      {/* Rotating Background Glow */}
      <div 
        ref={glowRef}
        className="absolute w-[1000px] h-[1000px] bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.1),transparent,rgba(168,85,247,0.1),transparent)] rounded-full blur-[100px] pointer-events-none"
      />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-2 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400">
            System_Initialization // {id} // {year}
          </span>
        </motion.div>

        <div className="relative">
          <h1 
            ref={titleRef}
            className="hero-title text-6xl md:text-[12rem] font-black uppercase tracking-tighter text-white leading-[0.8] mb-12 relative"
          >
            {name.split(' ').map((word, i) => (
              <span key={i} className="inline-block relative">
                {word}
                {i === name.split(' ').length - 1 ? <span className="text-cyan-400">.</span> : '\u00A0'}
              </span>
            ))}
          </h1>
          
          {/* Glitch Overlay (Hidden by default, animated via GSAP) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hero-glitch">
             <h1 className="text-6xl md:text-[12rem] font-black uppercase tracking-tighter text-cyan-500/30 leading-[0.8] blur-[2px] translate-x-1">
               {name}
             </h1>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="hero-desc max-w-2xl text-xl md:text-2xl font-light text-slate-400 leading-relaxed mb-12"
        >
          {description}
        </motion.p>

        {/* Play Button with Pulse Wave */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, type: "spring" }}
          className="relative group cursor-pointer outline-none border-none bg-transparent p-0"
          onClick={handlePlayClick}
        >
          {/* Pulse Waves - Light & Slow */}
          <motion.div
            animate={{
              scale: isPlaying ? [1, 2.5] : 1,
              opacity: isPlaying ? [0.4, 0] : 0.1,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full bg-white/10 pointer-events-none"
          />
          
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-110">
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Pause size={40} fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Play size={40} fill="currentColor" className="ml-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* HUD Data Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
          {[
            { label: "Status", value: "Operational" },
            { label: "Core", value: "Neural_v4" },
            { label: "Sync", value: "99.9%" },
            { label: "Uptime", value: "∞" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">{stat.label}</span>
              <span className="font-mono text-[10px] font-bold text-white uppercase">{stat.value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-24 flex flex-col items-center gap-6 opacity-30 animate-bounce">
          <span className="font-mono text-[10px] tracking-[0.8em] uppercase text-cyan-500">Scroll to Decrypt</span>
          <div className="h-20 w-[1px] bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent"></div>
        </div>
      </div>

      {/* Parallax Depth Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full blur-sm opacity-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full blur-sm opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default ProjectHero;
