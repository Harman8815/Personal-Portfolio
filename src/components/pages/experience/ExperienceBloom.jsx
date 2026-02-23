"use client";

import React, { useRef } from "react";

const experienceData = [
  {
    id: "wob",
    title: "Campus Ambassador",
    company: "Winter of Blockchain",
    logo: "/assets/images/experiences/WOB.jpg",
    color: "rgb(33, 150, 243)"
  },
  {
    id: "iiitm",
    title: "Research Intern", 
    company: "ABV-IIITM",
    logo: "/assets/images/experiences/IIIT.png",
    color: "rgb(255, 255, 255)"
  },
  {
    id: "gssoc",
    title: "Contributor",
    company: "GirlScript Summer of Code", 
    logo: "/assets/images/experiences/GSSOC.jpg",
    color: "rgb(16, 204, 82)"
  },
  {
    id: "oasis",
    title: "Summer Intern",
    company: "Oasis Infobyte",
    logo: "/assets/images/experiences/oasis_infobyte.jpg", 
    color: "rgb(33, 150, 243)"
  }
];

const ExperienceBloom = ({ refs, visible }) => {
  return (
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
        className="absolute text-center z-30"
        style={{
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
        }}
      >
        <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-white mb-4">
          Experience
        </h2>
        <p className="text-lg tablet:text-xl text-gray-300">
          Projects evolving into professional journey
        </p>
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
          width: "400px",
          height: "400px",
          "--wheel-rotation": "0deg",
        }}
      >
        {/* Experience Petals */}
        {experienceData.map((exp, index) => {
          const angle = (index * 360) / experienceData.length;
          const radius = 180;
          
          return (
            <div
              key={exp.id}
              className="experience-petal absolute"
              style={{
                width: "160px",
                height: "200px",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                transform: `
                  rotate(${angle}deg) 
                  translateY(-${radius}px) 
                  rotate(calc(-${angle}deg - var(--wheel-rotation)))
                `,
                transformOrigin: "center center",
                "--petal-index": index,
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/20 hover:scale-105">
                {/* Company Logo */}
                <div 
                  className="w-14 h-14 rounded-full mb-3 overflow-hidden border-2 border-white/30 flex items-center justify-center"
                  style={{ backgroundColor: exp.color }}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Experience Title */}
                <h3 className="text-sm font-bold text-white mb-1 text-center">
                  {exp.title}
                </h3>
                
                {/* Company Name */}
                <p className="text-xs text-gray-300 text-center">
                  {exp.company}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Decorative Element */}
      <div
        ref={refs.centerRef}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-80"
        style={{
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
        }}
      />
    </div>
  );
};

export default ExperienceBloom;
