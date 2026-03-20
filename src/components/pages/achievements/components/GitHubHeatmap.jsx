import React from "react";
import { motion } from "framer-motion";
import { Github, TrendingUp } from "lucide-react";
import { BackgroundLayer } from "./UIComponents";

export const GitHubHeatmap = () => {
  const days = Array.from({ length: 365 });
  const stats = [
    { label: "Commits", value: "1,240", color: "text-green-400" },
    { label: "PRs", value: "84", color: "text-purple-400" },
    { label: "Issues", value: "62", color: "text-orange-400" },
    { label: "Stars", value: "156", color: "text-yellow-400" },
  ];

  return (
    <div className="w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
      <BackgroundLayer type="grid" />

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white/5 text-white">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                Contribution Ecosystem
              </h3>
              <p className="text-slate-400 font-light">
                Visualizing a year of consistent development and open-source
                impact.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                  {stat.label}
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Activity Intensity
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[8px] text-slate-500 uppercase">
                  Less
                </span>
                {[0, 0.2, 0.5, 0.8, 1].map((v) => (
                  <div
                    key={v}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: `rgba(34, 197, 94, ${v})` }}
                  />
                ))}
                <span className="text-[8px] text-slate-500 uppercase">
                  More
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
              {days.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.002 }}
                  className="aspect-square rounded-sm hover:scale-150 hover:z-10 transition-transform cursor-pointer"
                  style={{
                    backgroundColor:
                      Math.random() > 0.3
                        ? `rgba(34, 197, 94, ${Math.random() * 0.8 + 0.2})`
                        : "rgba(255, 255, 255, 0.05)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-white/10">
            <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">
              Current Streak
            </div>
            <div className="text-6xl font-black text-white mb-2">28</div>
            <div className="text-sm text-slate-400">
              Days of consistent commits
            </div>
            <div className="mt-8 flex items-center gap-2 text-green-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs last month</span>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
              Top Languages
            </div>
            <div className="space-y-4">
              {[
                { name: "TypeScript", value: 45, color: "#3178c6" },
                { name: "Rust", value: 30, color: "#dea584" },
                { name: "Go", value: 15, color: "#00add8" },
                { name: "Python", value: 10, color: "#3776ab" },
              ].map((lang) => (
                <div key={lang.name} className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <div className="flex-1 text-xs font-bold text-white uppercase tracking-widest">
                    {lang.name}
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {lang.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
