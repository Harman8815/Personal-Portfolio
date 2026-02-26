"use client";

import React, { useRef } from "react";

// Add CSS for scroll-triggered line animations and advanced effects
const rotatingLinesCSS = `
  @keyframes stretchLine {
    0% {
      width: 0;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      width: 25vw;
      opacity: 1;
    }
  }
  
  @keyframes fadeInLine {
    0% {
      opacity: 0;
      transform: rotate(var(--rotation)) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: rotate(var(--rotation)) scale(1);
    }
  }
  
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
      transform-origin: center center;
    }
    to {
      transform: rotate(360deg);
      transform-origin: center center;
    }
  }
  
  @keyframes pulse-ring {
    0%, 100% {
      opacity: 0;
      transform: scale(1);
      transform-origin: center center;
    }
    50% {
      opacity: 0.3;
      transform: scale(1.05);
      transform-origin: center center;
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
    transform-origin: center center;
  }
  
  .pulse-ring {
    animation: pulse-ring 3s ease-in-out infinite;
  }
`;

const experienceData = [
  {
    id: "wob",
    title: "Campus Ambassador",
    company: "Winter of Blockchain",
    logo: "/assets/images/experiences/WOB.jpg",
    color: "rgb(33, 150, 243)",
    gradient: "linear-gradient(135deg, #2196F3, #1976D2, #0D47A1)",
    glowColor: "rgba(33, 150, 243, 0.6)",
    pillGradients: ["linear-gradient(135deg, #2196F3, #1976D2)", "linear-gradient(135deg, #1976D2, #0D47A1)"],
    duration: "2023 - 2024",
    role: "Community Leadership & Blockchain Advocacy",
    contributions: [
      "Led blockchain education initiatives across campus",
      "Organized workshops and hackathons for 500+ students"
    ],
    impact: "Increased blockchain adoption by 40% in campus community",
    techStack: ["Blockchain", "Community Management", "Event Planning", "Public Speaking"]
  },
  {
    id: "iiitm",
    title: "Research Intern",
    company: "ABV-IIITM",
    logo: "/assets/images/experiences/IIIT.png",
    color: "rgb(255, 255, 255)",
    gradient: "linear-gradient(135deg, #FFFFFF, #E3F2FD, #BBDEFB)",
    glowColor: "rgba(255, 255, 255, 0.6)",
    pillGradients: ["linear-gradient(135deg, #FFFFFF, #E3F2FD)", "linear-gradient(135deg, #E3F2FD, #BBDEFB)"],
    duration: "Summer 2023",
    role: "Machine Learning Research & Development",
    contributions: [
      "Developed novel algorithms for predictive analytics",
      "Published research paper on pattern recognition"
    ],
    impact: "Improved prediction accuracy by 25% over existing models",
    techStack: ["Python", "TensorFlow", "Machine Learning", "Data Analysis", "Research"]
  },
  {
    id: "gssoc",
    title: "Contributor",
    company: "GirlScript Summer of Code",
    logo: "/assets/images/experiences/GSSOC.jpg",
    color: "rgb(16, 204, 82)",
    gradient: "linear-gradient(135deg, #10CC52, #0FA342, #0D7A30)",
    glowColor: "rgba(16, 204, 82, 0.6)",
    pillGradients: ["linear-gradient(135deg, #10CC52, #0FA342)", "linear-gradient(135deg, #0FA342, #0D7A30)"],
    duration: "Summer 2023",
    role: "Open Source Development & Mentorship",
    contributions: [
      "Contributed to 15+ open source projects",
      "Mentored 20+ junior developers"
    ],
    impact: "Code merged into projects with 10k+ active users",
    techStack: ["JavaScript", "React", "Node.js", "Git", "Open Source"]
  },
  {
    id: "oasis",
    title: "Summer Intern",
    company: "Oasis Infobyte",
    logo: "/assets/images/experiences/oasis_infobyte.jpg",
    color: "rgb(33, 150, 243)",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF5252, #D32F2F)",
    glowColor: "rgba(255, 107, 107, 0.6)",
    pillGradients: ["linear-gradient(135deg, #FF6B6B, #FF5252)", "linear-gradient(135deg, #FF5252, #D32F2F)"],
    duration: "Summer 2022",
    role: "Full-Stack Web Development",
    contributions: [
      "Built responsive web applications for clients",
      "Optimized database queries improving performance by 30%"
    ],
    impact: "Delivered 5 client projects with 95% satisfaction rate",
    techStack: ["React", "Node.js", "MongoDB", "Express", "REST APIs"]
  },
];

const ExperienceBloom = ({ refs, visible }) => {
  return (
    <>
      <style>{rotatingLinesCSS}</style>
      <div
        ref={refs.containerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          visibility: visible ? "visible" : "hidden",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Experience Bloom Header */}
        <div
          ref={refs.headerRef}
          className="flex flex-col items-center text-center z-50 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
          }}
        >
          <span className="font-mono text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-cyan-500 mb-2">
            Professional_Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Experience
          </h2>
          <div className="h-[2px] w-48 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
        </div>

        {/* Experience Wheel Container */}
        <div
          ref={refs.wheelRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "770px",
            height: "770px",
            "--wheel-rotation": "0deg",
          }}
        >
          {/* Clock-Hand Formation Lines Container */}
          <div
            ref={refs.linesContainerRef}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: "translate(-50%, -50%)",
              zIndex: 5, // Below circle (z-index 20)
              pointerEvents: "none",
            }}
          >
            {/* Active clock hand line (rotates) */}
            <div
              ref={refs.clockHandRef}
              className="absolute"
              style={{
                width: "2px",
                height: "0", // Initial state: no height
                background:
                  "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
                transformOrigin: "bottom center", // Anchored at core
                bottom: "50%", // Position at center
                left: "50%",
                xPercent: -50,
                rotation: 0,
                opacity: 1,
              }}
            />

            {/* Static lines that will be cloned and locked */}
            <div
              ref={refs.line45Ref}
              className="absolute"
              style={{
                width: "2px",
                height: "0", // Initial state: no height
                background:
                  "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
                transformOrigin: "bottom center",
                bottom: "50%",
                left: "50%",
                xPercent: -50,
                rotation: 0,
                opacity: 0, // Initially hidden
              }}
            />
            {/* Horizontal card for 45° line */}
            <div
              ref={refs.card45Ref}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transform:
                  "rotate(45deg) translateY(-19.25vw) translateY(-2rem) rotate(-45deg) translateX(-2rem) translateY(-1rem)",
                opacity: 0, // Initially hidden
                pointerEvents: "none",
              }}
            >
              {/* Basic Card */}
              <div
                className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-52 relative overflow-hidden transition-all duration-500"
                style={{
                  background: experienceData[0].gradient,
                  boxShadow: `0 0 30px ${experienceData[0].glowColor}, 0 0 60px ${experienceData[0].glowColor}40`,
                  border: `1px solid ${experienceData[0].glowColor}`
                }}
              >
                {/* Basic Header */}
                <div className="flex items-center gap-1.5 mb-1.5 p-2">
                  <div
                    className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: experienceData[0].color }}
                  >
                    <img
                      src={experienceData[0].logo}
                      alt={experienceData[0].company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[10px] leading-none">
                      {experienceData[0].title}
                    </h4>
                    <p className="text-gray-200 text-[10px]">
                      {experienceData[0].company}
                    </p>
                  </div>
                </div>

                {/* Expanded Content - Initially Hidden */}
                <div
                  className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                  style={{ padding: '0 0.5rem' }}
                >
                  <div className="border-t border-white/20 pt-1.5">
                    {/* Line 1 */}
                    <p className="text-white text-[10px] font-medium">
                      {experienceData[0].contributions[0]}
                    </p>

                    {/* Line 2 */}
                    <p className="text-gray-100 text-[10px] leading-tight mt-1">
                      {experienceData[0].contributions[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={refs.line135Ref}
              className="absolute"
              style={{
                width: "2px",
                height: "0",
                background:
                  "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
                transformOrigin: "bottom center",
                bottom: "50%",
                left: "50%",
                xPercent: -50,
                rotation: 0,
                opacity: 0,
              }}
            />
            {/* Horizontal card for 135° line */}
            <div
              ref={refs.card135Ref}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transform:
                  "rotate(135deg) translateY(-19.25vw) translateY(-2rem) rotate(-135deg) translateX(-2rem) translateY(-2rem)",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              {/* Basic Card */}
              <div
                className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-52 relative overflow-hidden transition-all duration-500"
                style={{
                  background: experienceData[1].gradient,
                  boxShadow: `0 0 30px ${experienceData[1].glowColor}, 0 0 60px ${experienceData[1].glowColor}40`,
                  border: `1px solid ${experienceData[1].glowColor}`
                }}
              >
                {/* Basic Header */}
                <div className="flex items-center gap-1.5 mb-1.5 p-2">
                  <div
                    className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: experienceData[1].color }}
                  >
                    <img
                      src={experienceData[1].logo}
                      alt={experienceData[1].company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[10px] leading-none">
                      {experienceData[1].title}
                    </h4>
                    <p className="text-gray-200 text-[10px]">
                      {experienceData[1].company}
                    </p>
                  </div>
                </div>

                {/* Expanded Content - Initially Hidden */}
                <div
                  className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                  style={{ padding: '0 0.5rem' }}
                >
                  <div className="border-t border-white/20 pt-1.5">
                    {/* Line 1 */}
                    <p className="text-white text-[10px] font-medium">
                      {experienceData[1].contributions[0]}
                    </p>

                    {/* Line 2 */}
                    <p className="text-gray-100 text-[10px] leading-tight mt-1">
                      {experienceData[1].contributions[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={refs.line135Ref}
              className="absolute"
              style={{
                width: "2px",
                height: "0",
                background:
                  "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
                transformOrigin: "bottom center",
                bottom: "50%",
                left: "50%",
                xPercent: -50,
                rotation: 0,
                opacity: 0,
              }}
            />
            {/* Horizontal card for 135° line */}
            <div
              ref={refs.card135Ref}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transform:
                  "rotate(135deg) translateY(-19.25vw) translateY(-2rem) rotate(-135deg) translateX(-2rem) translateY(-2rem)",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              {/* Basic Card */}
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-64 relative overflow-hidden transition-all duration-500">
                {/* Basic Header */}
                <div className="flex items-center gap-2 mb-2 p-3">
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: experienceData[1].color }}
                  >
                    <img
                      src={experienceData[1].logo}
                      alt={experienceData[1].company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">
                      {experienceData[1].title}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {experienceData[1].company}
                    </p>
                  </div>
                </div>

                {/* Detailed Content - Initially Hidden */}
                <div
                  className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                  style={{ padding: '0 0.75rem' }}
                >
                  <div className="border-t border-white/10 pt-2">
                    {/* Duration */}
                    <p className="text-cyan-400 text-xs font-medium mb-1">
                      {experienceData[1].duration}
                    </p>
                    <ul className="space-y-0.5">
                      {experienceData[1].contributions.map((contribution, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start gap-1">
                          <span className="text-cyan-400 mt-0.5 text-xs">▸</span>
                          <span className="leading-tight">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="mb-2">
                    <h5 className="text-white font-semibold text-xs mb-0.5">Impact</h5>
                    <p className="text-green-400 text-xs font-medium">
                      {experienceData[1].impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="pb-1">
                    <h5 className="text-white font-semibold text-[10px] mb-0.5 tracking-wide">
                      Tech Stack
                    </h5>

                    <div className="flex flex-wrap gap-1">
                      {experienceData[1].techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="
          px-2 py-[2px]
          text-[10px]
          rounded-full
          bg-cyan-500/15
          border border-cyan-400/30
          text-cyan-300
          backdrop-blur-sm
          leading-none
          tracking-wide
        "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={refs.line135Ref}
            className="absolute"
            style={{
              width: "2px",
              height: "0",
              background:
                "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
              transformOrigin: "bottom center",
              bottom: "50%",
              left: "50%",
              xPercent: -50,
              rotation: 0,
              opacity: 0,
            }}
          />
          {/* Horizontal card for 135° line */}
          <div
            ref={refs.card135Ref}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              transform:
                "rotate(135deg) translateY(-19.25vw) translateY(-2rem) rotate(-135deg) translateX(-2rem) translateY(-2rem)",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* Basic Card */}
            <div
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-52 relative overflow-hidden transition-all duration-500"
              style={{
                background: experienceData[1].gradient,
                boxShadow: `0 0 30px ${experienceData[1].glowColor}, 0 0 60px ${experienceData[1].glowColor}40`,
                border: `1px solid ${experienceData[1].glowColor}`
              }}
            >
              {/* Basic Header */}
              <div className="flex items-center gap-1.5 mb-1.5 p-2">
                <div
                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: experienceData[1].color }}
                >
                  <img
                    src={experienceData[1].logo}
                    alt={experienceData[1].company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[10px] leading-none">
                    {experienceData[1].title}
                  </h4>
                  <p className="text-gray-200 text-[10px]">
                    {experienceData[1].company}
                  </p>
                </div>
              </div>

              {/* Expanded Content - Initially Hidden */}
              <div
                className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                style={{ padding: '0 0.5rem' }}
              >
                <div className="border-t border-white/20 pt-1.5">
                  {/* Line 1 */}
                  <p className="text-white text-[10px] font-medium">
                    {experienceData[1].contributions[0]}
                  </p>

                  {/* Line 2 */}
                  <p className="text-gray-100 text-[10px] leading-tight mt-1">
                    {experienceData[1].contributions[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={refs.line225Ref}
            className="absolute"
            style={{
              width: "2px",
              height: "0",
              background:
                "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
              transformOrigin: "bottom center",
              bottom: "50%",
              left: "50%",
              xPercent: -50,
              rotation: 0,
              opacity: 0,
            }}
          />
          {/* Horizontal card for 225° line */}
          <div
            ref={refs.card225Ref}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              transform:
                "rotate(225deg) translateY(-19.25vw) translateY(-2rem) rotate(-225deg) translateX(-14rem) translateY(-2rem)",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* Basic Card */}
            <div
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-52 relative overflow-hidden transition-all duration-500"
              style={{
                background: experienceData[2].gradient,
                boxShadow: `0 0 30px ${experienceData[2].glowColor}, 0 0 60px ${experienceData[2].glowColor}40`,
                border: `1px solid ${experienceData[2].glowColor}`
              }}
            >
              {/* Basic Header */}
              <div className="flex items-center gap-1.5 mb-1.5 p-2">
                <div
                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: experienceData[2].color }}
                >
                  <img
                    src={experienceData[2].logo}
                    alt={experienceData[2].company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[10px] leading-none">
                    {experienceData[2].title}
                  </h4>
                  <p className="text-gray-200 text-[10px]">
                    {experienceData[2].company}
                  </p>
                </div>
              </div>

              {/* Expanded Content - Initially Hidden */}
              <div
                className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                style={{ padding: '0 0.5rem' }}
              >
                <div className="border-t border-white/20 pt-1.5">
                  <p className="text-white text-[10px] font-medium">
                    {experienceData[2].contributions[0]}
                  </p>

                  <p className="text-gray-100 text-[10px] leading-tight mt-1">
                    {experienceData[2].contributions[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={refs.line315Ref}
            className="absolute"
            style={{
              width: "2px",
              height: "0",
              background:
                "linear-gradient(180deg, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)",
              transformOrigin: "bottom center",
              bottom: "50%",
              left: "50%",
              xPercent: -50,
              rotation: 0,
              opacity: 0,
            }}
          />
          {/* Horizontal card for 315° line */}
          <div
            ref={refs.card315Ref}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              transform:
                "rotate(315deg) translateY(-19.25vw) translateY(-2rem) rotate(-315deg) translateX(-16rem) translateX(2rem) translateY(-1rem)",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* Basic Card */}
            <div
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl w-52 relative overflow-hidden transition-all duration-500"
              style={{
                background: experienceData[3].gradient,
                boxShadow: `0 0 30px ${experienceData[3].glowColor}, 0 0 60px ${experienceData[3].glowColor}40`,
                border: `1px solid ${experienceData[3].glowColor}`
              }}
            >
              {/* Basic Header */}
              <div className="flex items-center gap-1.5 mb-1.5 p-2">
                <div
                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: experienceData[3].color }}
                >
                  <img
                    src={experienceData[3].logo}
                    alt={experienceData[3].company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[10px] leading-none">
                    {experienceData[3].title}
                  </h4>
                  <p className="text-gray-200 text-[10px]">
                    {experienceData[3].company}
                  </p>
                </div>
              </div>

              {/* Expanded Content - Initially Hidden */}
              <div
                className="expanded-content opacity-0 max-h-0 overflow-hidden transition-all duration-500"
                style={{ padding: '0 0.5rem' }}
              >
                <div className="border-t border-white/20 pt-1.5">
                  {/* Line 1 */}
                  <p className="text-white text-[10px] font-medium">
                    {experienceData[3].contributions[0]}
                  </p>

                  {/* Line 2 */}
                  <p className="text-gray-100 text-[10px] leading-tight mt-1">
                    {experienceData[3].contributions[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Decorative Element - Advanced Multi-layered Design */}
      <div
        ref={refs.centerRef}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "557px", // Increased by 15% total from 440px (440 * 1.15 = 506, rounded to 557)
          height: "557px",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{ preserveAspectRatio: "xMidYMid meet" }}
        >
          <defs>
            {/* Multi-stop radial gradient for base circle */}
            <radialGradient id="exp-base-gradient" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
            </radialGradient>

            {/* Inner glow effect */}
            <radialGradient id="exp-inner-glow" cx="50%" cy="30%" r="40%">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            {/* Glass overlay gradient */}
            <linearGradient
              id="exp-glass-overlay"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* Pulse animation gradient */}
            <radialGradient id="exp-pulse-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="80%" stopColor="#22d3ee" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base Circle with refined gradient */}
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="url(#exp-base-gradient)"
            className="drop-shadow-[0_4px_12px_rgba(34,211,238,0.3)]"
          />

          {/* Inner glow overlay */}
          <circle cx="100" cy="100" r="60" fill="url(#exp-inner-glow)" />

          {/* Outer Ring System - Ring 1 (innermost) */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="8 4"
            style={{
              transformOrigin: "100px 100px",
              animation: "spin-slow 20s linear infinite",
            }}
          />

          {/* Outer Ring System - Ring 2 (middle) */}
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
            strokeDasharray="12 6"
            strokeDashoffset="3"
          />

          {/* Outer Ring System - Ring 3 (outermost) */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="16 8"
            strokeDashoffset="8"
          />

          {/* Radial Line Detail - 8 evenly spaced lines */}
          <g opacity="0.08">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="100"
                y1="100"
                x2={100 + Math.cos((angle * Math.PI) / 180) * 55}
                y2={100 + Math.sin((angle * Math.PI) / 180) * 55}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Micro Accent Elements - Dots at radial intersections */}
          <g opacity="0.3">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={`exp-dot-${angle}`}
                cx={100 + Math.cos((angle * Math.PI) / 180) * 50}
                cy={100 + Math.sin((angle * Math.PI) / 180) * 50}
                r="1"
                fill="rgba(255,255,255,0.8)"
              />
            ))}
          </g>

          {/* Micro Accent Elements - Arc segments at 45° offsets */}
          <g opacity="0.15">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (angle) => (
                <path
                  key={`exp-arc-${angle}`}
                  d={`M ${100 + Math.cos(((angle - 10) * Math.PI) / 180) * 72} ${100 + Math.sin(((angle - 10) * Math.PI) / 180) * 72} 
                    A 72 72 0 0 1 ${100 + Math.cos(((angle + 10) * Math.PI) / 180) * 72} ${100 + Math.sin(((angle + 10) * Math.PI) / 180) * 72}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="0.8"
                />
              ),
            )}
          </g>

          {/* Glass overlay effect */}
          <ellipse
            cx="100"
            cy="80"
            rx="60"
            ry="40"
            fill="url(#exp-glass-overlay)"
            opacity="0.6"
          />

          {/* Subtle dark edge vignette for depth */}
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="2"
          />

          {/* Pulse effect layer for future animation */}
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="url(#exp-pulse-gradient)"
            style={{
              transformOrigin: "100px 100px",
            }}
            className="pulse-ring"
          />
        </svg>
      </div>

      {/* === LINE → ORB → CARD → BLOOM ANIMATION ELEMENTS === */}

      {/* Part 1: Line Emergence */}
      <div
        ref={refs.lineRef}
        className="absolute bg-gradient-to-t from-cyan-400 to-blue-500"
        style={{
          bottom: "15vh", // Positioned relative to wheel container
          left: "50%",
          xPercent: -50,
          width: "3px",
          height: "0px", // Initial state: no height
          transformOrigin: "bottom center",
          opacity: 0, // Initially hidden
        }}
      />

      {/* Part 2: Circular Node Formation */}
      <div
        ref={refs.orbRef}
        className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg"
        style={{
          bottom: "calc(15vh + 60px)", // Positioned at tip of line
          left: "50%",
          xPercent: -50,
          width: "24px",
          height: "24px",
          transformOrigin: "center center",
          opacity: 0, // Initially hidden
          scale: 0, // Initially hidden
        }}
      />

      {/* Part 3: Card Formation */}
      <div
        ref={refs.cardRef}
        className="absolute bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          bottom: "calc(15vh + 60px)", // Same position as orb
          left: "50%",
          xPercent: -50,
          width: "24px", // Starts as circle
          height: "24px",
          transformOrigin: "center center",
          opacity: 0, // Initially hidden
          scale: 0, // Initially hidden
          borderRadius: "50%", // Initially circle
        }}
      >
        <img
          src="/assets/images/experiences/WOB.jpg" // Use first experience as example
          alt="Experience"
          className="w-full h-full object-cover opacity-0" // Initially hidden
        />
      </div>

      {/* Part 4: Rotational Orbit Container */}
      <div
        ref={refs.orbitContainerRef}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "440px",
          height: "440px",
          transformOrigin: "center center",
          opacity: 0, // Initially hidden
        }}
      >
        {/* Orbiting Card */}
        <div
          ref={refs.orbitingCardRef}
          className="absolute bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
          style={{
            top: "0",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "80px",
            height: "100px",
            transformOrigin: "center 200px", // Rotate around wheel center
            opacity: 0, // Initially hidden
            scale: 0, // Initially hidden
          }}
        >
          <img
            src="/assets/images/experiences/WOB.jpg"
            alt="Experience"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Part 5: Bloom Formation Container */}
      <div
        ref={refs.bloomContainerRef}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "660px",
          height: "660px",
          transformOrigin: "center center",
          opacity: 0, // Initially hidden
        }}
      >
        {/* Bloom Cards - Will be cloned dynamically */}
        {experienceData.map((exp, index) => {
          const angle = (index * 360) / experienceData.length;
          const radius = 275;

          return (
            <div
              key={`bloom-${exp.id}`}
              className="bloom-card absolute bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
              style={{
                width: "80px",
                height: "100px",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                transform: `
                  rotate(${angle}deg) 
                  translateY(-${radius}px) 
                  rotate(${-angle}deg)
                `,
                transformOrigin: "center center",
                opacity: 0, // Initially hidden
                scale: 0, // Initially hidden
              }}
            >
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExperienceBloom;
