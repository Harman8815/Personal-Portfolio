import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

const defaultMetrics = [
  {
    label: "Performance",
    value: "45",
    suffix: "%",
    icon: <Zap size={24} />,
    description: "Increase in overall system throughput and response times."
  },
  {
    label: "User Growth",
    value: "12",
    suffix: "k+",
    icon: <Users size={24} />,
    description: "Active users reached within the first three months of deployment."
  },
  {
    label: "Efficiency",
    value: "99.9",
    suffix: "%",
    icon: <TrendingUp size={24} />,
    description: "System uptime maintained during high-load stress testing."
  },
  {
    label: "Data Flow",
    value: "2.5",
    suffix: "TB",
    icon: <BarChart3 size={24} />,
    description: "Processed data volume per day across distributed nodes."
  }
];

const ProjectMetrics = ({ metrics }) => {
  const data = metrics && metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col items-center justify-center bg-[#020617] py-20 lg:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        <div className="mb-10 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              Impact_Analysis
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Core <span className="text-cyan-400">Metrics</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {data.map((metric, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center metric-card"
            >
              {/* Circular HUD Ring */}
              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-white/5 fill-none"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-cyan-500 fill-none"
                    strokeWidth="2"
                    strokeDasharray="552.92"
                    initial={{ strokeDashoffset: 552.92 }}
                    whileInView={{ strokeDashoffset: 552.92 - (552.92 * (parseFloat(metric.value) / 100)) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: i * 0.2, ease: "circOut" }}
                  />
                </svg>
                
                {/* Inner Glow */}
                <div className="absolute inset-4 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-all" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-2 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                    {metric.icon || <Zap size={24} />}
                  </div>
                  <div className="text-4xl font-black text-white tracking-tighter">
                    {metric.value}
                    <span className="text-lg text-cyan-400 ml-0.5">{metric.suffix}</span>
                  </div>
                </div>

                {/* Rotating HUD Elements */}
                <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-dotted border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              </div>
              
              <div className="space-y-3 max-w-[200px]">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/60 font-bold">{metric.label}</h3>
                {metric.description && (
                  <p className="text-xs text-slate-500 leading-relaxed font-light uppercase tracking-wider">
                    {metric.description}
                  </p>
                )}
              </div>

              {/* Data Reveal Bar */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cyan-500/20 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background HUD Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default ProjectMetrics;
