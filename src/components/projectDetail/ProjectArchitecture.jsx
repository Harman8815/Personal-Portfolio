import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cloud, ShieldCheck } from 'lucide-react';

const ProjectArchitecture = ({ architecture }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-[#020617] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="font-mono text-[10px] tracking-[0.6em] text-cyan-500 uppercase mb-4 block">
              System_Architecture_v1.0
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Technical <span className="text-cyan-400">Blueprint</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 arch-detail"
            >
              <div className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl relative group">
                <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Server size={32} />
                </div>
                <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed pt-4">
                  {architecture || "A modular, scalable architecture designed for high-concurrency and low-latency data processing."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Database size={16} />, label: "Data_Layer" },
                  { icon: <Cloud size={16} />, label: "Cloud_Sync" },
                  { icon: <ShieldCheck size={16} />, label: "Security" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="text-cyan-400">{item.icon}</div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square flex items-center justify-center arch-blueprint"
            >
              {/* Animated Architecture Diagram Placeholder */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-64 h-64 border border-cyan-500/20 rounded-full animate-slow-spin" />
                <div className="absolute w-48 h-48 border border-purple-500/20 rounded-full animate-slow-spin" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
                <div className="absolute w-32 h-32 border border-cyan-500/40 rounded-full animate-pulse" />
                
                {/* Connecting Lines */}
                <div className="absolute w-full h-full">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div 
                      key={deg}
                      className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent origin-left"
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  ))}
                </div>

                <div className="relative z-10 p-6 rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <span className="font-mono text-[10px] font-bold text-white uppercase">Core_Engine</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* HUD Elements */}
      <div className="absolute top-12 left-12 font-mono text-[8px] tracking-[0.5em] text-cyan-500/20 uppercase vertical-text">
        Architecture_Map_v4.0
      </div>
    </div>
  );
};

export default ProjectArchitecture;
