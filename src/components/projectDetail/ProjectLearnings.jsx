import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Lightbulb, Code2 } from 'lucide-react';

const defaultLearnings = [
  {
    title: "Scalability Bottlenecks",
    content: "Identified critical latency issues in P2P synchronization layer when scaling beyond 1000 concurrent nodes. Solved by implementing a hierarchical gossip protocol.",
    type: 'challenge'
  },
  {
    title: "Neural Mapping Accuracy",
    content: "Discovered that standard weighting algorithms were insufficient for non-linear data sets. Developed a custom adaptive weighting system that improved accuracy by 22%.",
    type: 'insight'
  },
  {
    title: "WebGPU Optimization",
    content: "Leveraged hardware-accelerated processing to offload heavy computations from CPU, resulting in a 3x speedup for real-time model training.",
    type: 'technical'
  }
];

const ProjectLearnings = ({ learnings }) => {
  const data = Array.isArray(learnings) 
    ? learnings 
    : typeof learnings === 'string'
      ? [{ title: "Key Insights", content: learnings, type: 'insight' }]
      : defaultLearnings;

  const getIcon = (type) => {
    switch (type) {
      case 'challenge': return <ShieldAlert className="text-red-400" size={20} />;
      case 'insight': return <Lightbulb className="text-amber-400" size={20} />;
      case 'technical': return <Code2 className="text-cyan-400" size={20} />;
      default: return <BookOpen className="text-white" size={20} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-slate-900/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Title Section */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="font-mono text-[10px] tracking-[0.6em] text-cyan-500 uppercase">
                Post_Mortem_Analysis
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                Challenges & <span className="text-cyan-400">Learnings</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-md">
                A deep dive into technical hurdles encountered during development and strategic insights gained through iterative problem-solving.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4 opacity-20">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-px w-12 bg-white" />
                  <span className="font-mono text-[8px] uppercase">System_Log_0x0{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Learning Cards */}
          <div className="lg:col-span-2 space-y-6">
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-500 learning-card"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-white">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h4>
                      <span className={`font-mono text-[8px] px-2 py-0.5 rounded border uppercase ${
                        item.type === 'challenge' ? 'border-red-500/30 text-red-400' :
                        item.type === 'insight' ? 'border-amber-500/30 text-amber-400' :
                        'border-cyan-500/30 text-cyan-400'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-slate-400 font-light leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
                
                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Text HUD */}
      <div className="absolute bottom-12 right-12 font-mono text-[8px] tracking-[0.5em] text-cyan-500/20 uppercase vertical-text">
        Knowledge_Base_Access // 0x7F
      </div>
    </div>
  );
};

export default ProjectLearnings;
