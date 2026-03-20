import React from 'react';
import { motion } from 'framer-motion';

const ProjectTechStack = ({ techStack = [] }) => {
  const displayStack = techStack.length > 0 ? techStack : ['React', 'TypeScript', 'GSAP', 'Tailwind', 'Framer Motion'];
  
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              Technical_Manifest_v4.0
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Tech <span className="text-cyan-400">Stack</span>
          </h2>
          <div className="h-[1px] w-24 bg-cyan-500/50 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {displayStack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] transition-all duration-500 overflow-hidden"
            >
              {/* Technical Blueprint Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-500/50 font-bold tracking-widest">0x{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-500 transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-tighter">
                  {tech}
                </h3>
                <div className="mt-4 h-[1px] w-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors" />
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">Module_Active</span>
                  <div className="w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-cyan-500/40"
                    />
                  </div>
                </div>
              </div>

              {/* Background HUD Grid */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
    </div>
  );
};

export default ProjectTechStack;
