import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Target, Lightbulb } from 'lucide-react';

const ProjectSystemFlow = ({ problem, solution, features }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-slate-900/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Problem & Solution */}
          <div className="space-y-16 flow-content">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-red-500">
                <Target size={24} />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.4em]">The_Challenge</h3>
              </div>
              <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed italic border-l-2 border-red-500/30 pl-8">
                "{problem}"
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-emerald-500">
                <Lightbulb size={24} />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.4em]">The_Solution</h3>
              </div>
              <p className="text-xl md:text-2xl font-light text-slate-400 leading-relaxed">
                {solution}
              </p>
            </motion.div>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 feature-card"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Zap size={40} className="text-cyan-400" />
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Layers size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">{feature}</h4>
                <div className="h-[1px] w-0 bg-cyan-500/50 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] orbital-grid opacity-[0.05] animate-slow-spin" />
      </div>

      <div className="absolute top-12 right-12 font-mono text-[8px] tracking-[0.5em] text-cyan-500/20 uppercase vertical-text">
        System_Flow_Analysis // Active
      </div>
      <div className="absolute bottom-12 left-12 flex gap-4 opacity-10">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-1 h-12 bg-white rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default ProjectSystemFlow;
