import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ProjectArtifacts = ({ artifacts }) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3 rounded-full border border-purple-500/20 bg-purple-500/5 px-6 py-2"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-500" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400">
              Visual_Artifact_Repository
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
            System <span className="text-purple-400">Visuals</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {artifacts.map((item, i) => (
            <div 
              key={i}
              className="artifact-item group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-700 hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Artifact_0x0{i + 1}</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  <p className="text-xl font-bold text-white uppercase tracking-tight">
                    {item.caption || "System_Artifact_Visual"}
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/20 rounded-tr-[2rem] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default ProjectArtifacts;
