import React from "react";
import SkillCloud from "../skills/SkillCloud";
import SkillTiers from "../skills/SkillTiers";
import { slugs } from "../../data";

const steps = [
  {
    id: "step-1",
    title: "The Intent",
    label: "PHASE_01",
    desc: "Designing immersive digital experiences where aesthetics and purpose coexist. Every motion, transition, and interaction is intentional—nothing exists without meaning.",
  },
  {
    id: "step-2",
    title: "Engineering Mindset",
    label: "PHASE_02",
    desc: "Performance drives every decision. From optimized render pipelines to modern low-level tooling, visual depth is achieved without sacrificing speed or control.",
  },
  {
    id: "step-3",
    title: "Scalable by Nature",
    label: "PHASE_03",
    desc: "Built for growth, stress, and real-world traffic. Architectures are modular, resilient, and future-proof—ready to evolve without breaking.",
  },
];

const AboutContent = ({ refs }) => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      {/* The Animated Circle */}
      <div
        ref={refs.circleRef}
        className="absolute flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl shadow-[0_0_100px_rgba(34,211,238,0.1)] z-20 pointer-events-none"
      >
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div
          ref={refs.coreIdentityRef}
          className="flex flex-col items-center justify-center text-center p-8"
        >
          <div className="w-12 h-[1px] bg-cyan-500 mb-4 "></div>
          <span className="font-mono text-2xl md:text-3xl text-center tracking-[0.5em] text-cyan-400 uppercase font-black">
            ORIGIN
          </span>
        </div>
      </div>

      {/* Initial Intro State */}
      <div
        ref={refs.introTextRef}
        className="relative z-30 text-center pointer-events-none "
      >
        <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none mb-4">
          Want to <br /> know me?
        </h2>
        <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
          <span className="font-mono text-md font-bold tracking-[0.6em] uppercase text-cyan-500">
            Scroll to begin
          </span>
          <div
            ref={refs.scrollArrowRef}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="scroll-arrow block w-3 h-3 border-b border-r border-cyan-500 rotate-45 mb-1"></span>
            <span className="scroll-arrow block w-3 h-3 border-b border-r border-cyan-500 rotate-45 opacity-60"></span>
          </div>
        </div>
      </div>

      {/* Content Cards Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6 md:px-20">
        <div className="w-full max-w-7xl relative h-full">
          {steps.map((step, i) => (
            <div
              key={step.id}
              id={`card-${i}`}
              className="step-card absolute top-1/2 -translate-y-1/2 max-w-lg"
              style={{
                left: i % 2 === 0 ? "5%" : "auto",
                right: i % 2 === 0 ? "auto" : "5%",
                textAlign: i % 2 === 0 ? "left" : "right",
              }}
            >
              <div
                className={`flex items-center gap-4 mb-6 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}
              >
                <span className="font-mono text-xs text-cyan-500 tracking-[0.5em] uppercase font-black">
                  {step.label}
                </span>
                <div className="h-px w-12 bg-cyan-500/20" />
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6 leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LAYER 2: SKILLS STACK (Transition Target) */}
      <div
        ref={refs.skillsContainerRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 md:px-20 pointer-events-none"
      >
        <div className="w-full h-full flex flex-col py-24">
          {/* Header: Centered fixed entrance via ref style, then transitions to flex flow */}
          <div
            ref={refs.skillsHeaderRef}
            className="flex flex-col items-center mb-20 text-center pointer-events-auto shrink-0 relative z-50"
          >
            <span className="font-mono text-[11px] tracking-[0.8em] uppercase text-cyan-500 ">
              Competency_Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-primary">
              Stack_Capabilities
            </h2>
            <div className="h-[2px] w-32 bg-cyan-500 mt-3 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 pointer-events-auto flex-1 w-full relative">
            {/* Cards Assembly */}
            <div
              ref={refs.skillsTiersRef}
              className="w-full lg:w-3/5 order-2 lg:order-1 relative z-40"
            >
              <SkillTiers />
            </div>

            {/* Icon Cloud */}
            <div
              ref={refs.skillsCloudRef}
              className="w-full lg:w-2/5 flex justify-center order-1 lg:order-2 z-30 relative"
            >
              <div className="w-full">
                <SkillCloud slugs={slugs} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD Decoration */}
      <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-10 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="text-cyan-500">AESTHETIC_V1.0</span>
        <span className="h-3 w-[1px] bg-primary"></span>
        <span>SYST_ACTIVE</span>
      </div>
    </div>
  );
};

export default AboutContent;
