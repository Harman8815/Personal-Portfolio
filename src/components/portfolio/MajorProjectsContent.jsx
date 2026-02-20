import React, { useMemo } from "react";
import { MoveRight, Github, ExternalLink } from "lucide-react";

// Project data
const projects = [
  {
    id: 1,
    title: "Neural Canvas",
    category: "AI Creative Suite",
    description:
      "Advanced ML-powered design platform with real-time collaboration and generative art capabilities.",
    tech: ["React", "TensorFlow.js", "WebGL", "Node.js"],
    color: "from-cyan-500 to-blue-600",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Quantum Ledger",
    category: "Blockchain Infrastructure",
    description:
      "Next-gen distributed ledger system with quantum-resistant cryptography and sub-second consensus.",
    tech: ["Rust", "WebAssembly", "IPFS", "PostgreSQL"],
    color: "from-purple-500 to-pink-600",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Synthetic Dreams",
    category: "3D Web Experience",
    description:
      "Immersive WebGL-powered virtual environment with physics simulation and real-time rendering.",
    tech: ["Three.js", "React", "GLSL", "WebSocket"],
    color: "from-emerald-500 to-teal-600",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Echo Chamber",
    category: "Audio Platform",
    description:
      "Spatial audio streaming service with AI-driven personalization and 3D sound positioning.",
    tech: ["Next.js", "Web Audio API", "Python", "Redis"],
    color: "from-orange-500 to-red-600",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Data Weave",
    category: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with advanced ML insights and predictive analytics.",
    tech: ["Vue.js", "D3.js", "Python", "MongoDB"],
    color: "from-indigo-500 to-purple-600",
    link: "#",
    github: "#",
    featured: false,
  },
];

const MajorProjectsContent = ({ refs, activeIndex }) => {
  const activeProject = projects[activeIndex % projects.length];
  const totalProjects = projects.length;
  const rotationAngle = 360 / totalProjects;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-20 px-6 md:px-20 relative overflow-hidden">
      {/* 🚀 Phase 1: Header Animation Target */}
      <div
        ref={refs.headerRef}
        className="flex flex-col items-center mb-12 text-center z-50 pointer-events-none"
      >
        <span className="font-mono text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-cyan-500 mb-2">
          Portfolio_Showcase
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Major_Projects
        </h2>
        <div className="h-[2px] w-48 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
      </div>

      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-32 mt-10">
        {/* 📄 LEFT SIDE: Project Card */}
        <div
          ref={refs.cardContainerRef}
          className="w-full md:w-2/3 flex flex-col items-start justify-center z-40 order-2 md:order-1"
        >
          <div className="relative group w-full max-w-xl">
            {/* Morphing background glow */}
            <div
              className={`absolute -inset-4 bg-gradient-to-br ${activeProject.color} opacity-20 blur-3xl transition-all duration-1000`}
            />

            <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
                  Project_0{activeProject.id}
                </span>
                <span className="text-white/20 font-mono text-[10px]">
                  // {activeProject.category}
                </span>
              </div>

              <div className="overflow-hidden">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                  {activeProject.title}
                </h3>
              </div>

              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-md font-light">
                {activeProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {activeProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[11px] font-mono text-cyan-500/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <button
                  className={`group flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${activeProject.color} rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl hover:shadow-cyan-500/20 transition-all active:scale-95`}
                >
                  Launch{" "}
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-4">
                  <Github className="w-6 h-6 text-white/40 hover:text-white cursor-pointer transition-colors" />
                  <ExternalLink className="w-6 h-6 text-white/40 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌀 RIGHT SIDE: Project Wheel */}
        <div className="w-full md:w-1/2 flex items-center justify-center z-30 order-1 md:order-2">
          <div className="relative w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] max-w-[600px] max-h-[600px]">
            {/* The Rotating Wheel */}
            <div
              ref={refs.wheelRef}
              className="absolute inset-0 rounded-full border border-white/5 flex items-center justify-center transition-transform duration-700 ease-out shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(34,211,238,0.03) 0%, transparent 70%)",
              }}
            >
              {/* Center decorative core */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-xl flex items-center justify-center relative">
                <div className="absolute inset-4 rounded-full border border-white/5 animate-spin-slow"></div>
                <span className="font-mono text-[10px] text-cyan-500/40 uppercase tracking-[0.5em] text-center px-4">
                  Project_Core
                </span>
              </div>

              {/* Wheel items */}
              {projects.map((p, i) => {
                const angle = i * rotationAngle;
                const isActive = activeIndex % totalProjects === i;

                return (
                  <div
                    key={p.id}
                    ref={(el) => (refs.wheelItemsRef.current[i] = el)}
                    className="absolute top-1/2 left-1/2 w-8 h-8 md:w-16 md:h-16 pointer-events-none"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-20vh) rotate(-${angle}deg)`,
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-2xl bg-slate-900 border pointer-events-auto cursor-pointer transition-all duration-500 ${isActive ? "scale-150 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]" : "border-white/10 opacity-30 hover:opacity-60"} flex items-center justify-center overflow-hidden`}
                    >
                      <span
                        className={`font-mono font-black text-xl md:text-2xl ${isActive ? "text-cyan-400" : "text-white/20"}`}
                      >
                        0{p.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbiting ring */}
            <div className="absolute inset-[-10%] rounded-full border border-dashed border-white/5 animate-[spin_60s_linear_infinite] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-10 font-mono text-[9px] uppercase tracking-[0.4em] pointer-events-none">
        <span>Rotation_Sync: Active</span>
        <div className="flex gap-1">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-4 rounded-full transition-all duration-500 ${activeIndex % totalProjects === i ? "bg-cyan-500" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorProjectsContent;
