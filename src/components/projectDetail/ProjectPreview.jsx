import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Terminal, Maximize2, Zap } from 'lucide-react';

const ProjectPreview = ({ image, name, status }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="group relative mx-auto max-w-6xl perspective-1000 preview-content"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Image Container */}
          <div className="preview-image-container relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-2 backdrop-blur-sm transition-all duration-700 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_100px_rgba(34,211,238,0.1)]">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl relative">
              <img 
                ref={imageRef}
                src={image} 
                alt={name}
                className="preview-image h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-30" />
              
              {/* Light Sweep Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-20" />
            </div>
          </div>

          {/* Orbiting UI Elements */}
          <div className="absolute -top-12 -right-12 h-40 w-40 flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl md:flex shadow-2xl animate-float" style={{ transform: "translateZ(80px)" }}>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                <Cpu size={32} />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Core_Engine</span>
            </div>
          </div>

          <div className="absolute -bottom-12 -left-12 h-32 w-64 flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl lg:flex shadow-2xl animate-float" style={{ transform: "translateZ(60px)", animationDelay: '-2s' }}>
            <div className="flex items-center gap-4 px-6">
              <Terminal size={24} className="text-cyan-400" />
              <div className="flex flex-col">
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">System_Status</span>
                <span className="text-[12px] font-bold text-white uppercase tracking-wider">{status}</span>
              </div>
            </div>
          </div>

          {/* Floating Data Points */}
          <div className="absolute top-1/2 -right-24 flex flex-col gap-4" style={{ transform: "translateZ(40px)" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-cyan-500/30" />
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="font-mono text-[8px] text-slate-500 uppercase">Node_0x0{i}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] orbital-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default ProjectPreview;
