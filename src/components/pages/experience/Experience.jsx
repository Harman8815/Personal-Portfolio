"use client"
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Zap,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);


const experiences = [
  {
    id: 'exp-1',
    role: "Senior Frontend Engineer",
    company: "TechNova Systems",
    period: "2023 - Present",
    location: "San Francisco, CA",
    description: "Leading the development of high-performance web applications using React, Three.js, and WebGPU. Optimized rendering pipelines for 60FPS immersive experiences.",
    skills: ["React", "Three.js", "WebGPU", "GSAP", "TypeScript"],
    color: "#00D4FF"
  },
  {
    id: 'exp-2',
    role: "Full Stack Architect",
    company: "CloudScale Solutions",
    period: "2021 - 2023",
    location: "Remote",
    description: "Architected scalable microservices using Node.js and Go. Implemented distributed caching strategies that reduced API latency by 45%.",
    skills: ["Node.js", "Go", "Redis", "Docker", "Kubernetes"],
    color: "#7A5CFF"
  },
  {
    id: 'exp-3',
    role: "UI/UX Developer",
    company: "CreativePulse Agency",
    period: "2019 - 2021",
    location: "New York, NY",
    description: "Designed and implemented immersive user interfaces for luxury brands. Focused on motion design and interactive storytelling using GSAP and Canvas.",
    skills: ["Figma", "GSAP", "Canvas API", "React", "Tailwind"],
    color: "#FF00D4"
  },
  {
    id: 'exp-4',
    role: "Software Engineer",
    company: "StartUpHub",
    period: "2018 - 2019",
    location: "Austin, TX",
    description: "Built responsive web applications and contributed to open-source projects. Spearheaded the migration from monolithic to component-based architecture.",
    skills: ["JavaScript", "React", "Redux", "Sass", "Jest"],
    color: "#00FFD4"
  }
];

const Experience= () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${experiences.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Environment Init
      masterTl.fromTo(containerRef.current, 
        { scale: 0.97, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }
      );

      // Fade out intro scene
      masterTl.to(".intro-scene", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut"
      });

      experiences.forEach((exp, index) => {
        const node = nodesRef.current[index];
        if (!node) return;
        
        const line = linesRef.current[index];
        const contentElements = node.querySelectorAll('.reveal-item');
        
        const nodeTl = gsap.timeline();

        // 2. NODE FORMATION
        nodeTl.fromTo(node,
          { 
            scale: 0.8, 
            opacity: 0, 
            filter: 'blur(10px)', 
            pointerEvents: 'none',
            xPercent: index % 2 === 0 ? -60 : -40,
            yPercent: -50
          },
          { 
            scale: 1, 
            opacity: 1, 
            filter: 'blur(0px)', 
            pointerEvents: 'auto', 
            duration: 0.7, 
            ease: "back.out(1.7)",
            xPercent: index % 2 === 0 ? -60 : -40,
            yPercent: -50
          }
        );

        // 3. CONTENT REVEAL
        if (contentElements) {
          nodeTl.fromTo(contentElements,
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.1, 
              duration: 0.8, 
              ease: "expo.out",
              onStart: () => {
                // Chromatic aberration flicker
                gsap.to(node, {
                  skewX: 2,
                  duration: 0.05,
                  repeat: 1,
                  yoyo: true,
                  ease: "none"
                });
              }
            },
            "-=0.4"
          );
        }

        // 4. CONNECTIONS / TIMELINE LINKS
        if (line && index < experiences.length - 1) {
          nodeTl.fromTo(line,
            { strokeDashoffset: 1000, opacity: 0 },
            { strokeDashoffset: 0, opacity: 0.5, duration: 0.8, ease: "power2.inOut" },
            "-=0.2"
          );
        }

        // 5. STABILIZATION
        nodeTl.to(node, {
          boxShadow: `0 0 20px ${exp.color}22`,
          duration: 0.2
        });

        // Add to master timeline
        masterTl.add(nodeTl, index > 0 ? `+=0.2` : "+=0.1");

        // If not the last node, fade out current node slightly to focus on next
        if (index < experiences.length - 1) {
          masterTl.to(node, { opacity: 0.3, scale: 0.95, duration: 0.5 }, `+=0.5`);
        }
      });

      // 6. FINAL GRID FORMATION
      masterTl.addLabel("grid-formation", "+=0.5");
      
      // Fade out the timeline line
      masterTl.to(".timeline-line", { opacity: 0, duration: 0.5 }, "grid-formation");

      const cols = 2;
      const rows = Math.ceil(experiences.length / cols);

      experiences.forEach((_, index) => {
        const node = nodesRef.current[index];
        if (!node) return;

        const col = index % cols;
        const row = Math.floor(index / cols);
        
        // Calculate offsets to center the grid
        const xOffset = (col - (cols - 1) / 2) * 90;
        const yOffset = (row - (rows - 1) / 2) * 95;

        masterTl.to(node, {
          opacity: 1,
          scale: 0.5,
          xPercent: xOffset - 50,
          yPercent: yOffset - 50,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.inOut"
        }, "grid-formation");
      });

      // Final CTA / Footer Reveal
      masterTl.fromTo(".final-cta",
        { opacity: 0, y: 50, xPercent: -50, yPercent: -50, pointerEvents: 'none' },
        { opacity: 1, y: 0, xPercent: -50, yPercent: -50, pointerEvents: 'auto', duration: 1, ease: "expo.out" },
        "+=0.2"
      );

      experiences.forEach((_, index) => {
        const node = nodesRef.current[index];
        if (!node) return;

        gsap.to(node, {
          y: "+=6",
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Background gradient animation
      gsap.to('.bg-gradient-layer', {
        rotate: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
      id="experience"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Gradient Base */}
        <div className="bg-gradient-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#7A5CFF_0%,transparent_50%),radial-gradient(circle_at_70%_70%,#00D4FF_0%,transparent_50%)]" />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Scanning Line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent absolute top-0 animate-scan shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </div>

        {/* Hex Data Streams (Left & Right) */}
        <div className="absolute left-4 top-0 bottom-0 w-8 overflow-hidden opacity-10 hidden lg:block">
          <div className="flex flex-col gap-2 animate-data-stream">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="font-mono text-[8px] text-cyan-400">
                {Math.random().toString(16).substring(2, 8).toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute right-4 top-0 bottom-0 w-8 overflow-hidden opacity-10 hidden lg:block">
          <div className="flex flex-col gap-2 animate-data-stream-reverse">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="font-mono text-[8px] text-purple-400">
                {Math.random().toString(16).substring(2, 8).toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Noise & Glow */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl h-full flex items-center justify-center px-6">
        
        {/* Intro Scene Placeholder (Visible initially) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none intro-scene">
          <div className="mb-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Briefcase size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">Career Journey</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent text-center leading-none">
            PROFESSIONAL<br />EXPERIENCE
          </h1>
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-500/60 uppercase animate-bounce">Scroll to Begin</span>
          </div>
        </div>

        {/* Timeline Line (Vertical) */}
        <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => { nodesRef.current[i] = el; }}
              className="experience-node absolute top-1/2 left-1/2 w-full max-w-2xl p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl group shadow-2xl flex flex-col md:flex-row gap-8"
              style={{ opacity: 0, pointerEvents: 'none' }}
            >
              {/* Left Side: Icon & Period */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 text-white shadow-inner reveal-item"
                  style={{ color: exp.color }}
                >
                  {i === 0 ? <Zap size={32} /> : i === 1 ? <Cpu size={32} /> : i === 2 ? <Layers size={32} /> : <Briefcase size={32} />}
                </div>
                <div className="flex flex-col items-center md:items-start reveal-item">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-1">Duration</span>
                  <span className="text-sm font-bold text-white whitespace-nowrap">{exp.period}</span>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="flex-1 space-y-4">
                <div className="reveal-item">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <MapPin size={12} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{exp.location}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2 group-hover:text-cyan-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white/80">{exp.company}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Active_Project</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed reveal-item">
                  {exp.description}
                </p>

                {/* Optional Media Placeholder */}
                <div className="reveal-item w-full h-32 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative group/media">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50 group-hover/media:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 opacity-20 group-hover/media:opacity-40 transition-opacity">
                      <Layers size={24} />
                      <span className="text-[8px] font-mono uppercase tracking-widest">Media_Preview_Unavailable</span>
                    </div>
                  </div>
                  {/* Subtle scanning effect on media */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-1/2 -top-full group-hover/media:top-full transition-all duration-1000" />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 reveal-item">
                  {exp.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/60 uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center reveal-item">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors group/btn">
                    Case_Study <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                    <div className="w-1 h-1 rounded-full bg-cyan-500/20" />
                    <div className="w-1 h-1 rounded-full bg-cyan-500/10" />
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-4 right-4 opacity-20">
                <ExternalLink size={14} className="text-white" />
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-500/30 rounded-br-xl" />
            </div>
          ))}
        </div>

        {/* Final CTA (Visible at the end) */}
        <div className="absolute top-1/2 left-1/2 z-50 text-center opacity-0 final-cta pointer-events-none">
          <div className="mb-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Layers size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">Chronicle Grid</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8 leading-none">
            EXPERIENCE<br /><span className="text-cyan-400">ARCHIVE</span>
          </h2>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <Link href="/dashboard" className="px-8 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all">
              Main_Dashboard
            </Link>
            <Link href="/projects" className="px-8 py-3 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              View_Projects
            </Link>
          </div>
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
          {experiences.map((_, i) => {
            if (i === experiences.length - 1) return null;
            return (
              <path
                key={`line-${i}`}
                ref={(el) => { linesRef.current[i] = el; }}
                d={`M 512 ${200 + i * 300} L 512 ${500 + i * 300}`} // Placeholder paths, will be refined if needed
                stroke="url(#line-grad)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="opacity-0"
              />
            );
          })}
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7A5CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles (Minimal) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Section Label */}
      <div className="absolute top-12 left-12 font-mono text-[10px] tracking-[0.6em] text-white/20 uppercase vertical-text">
        Career_Chronicle_V2.0
      </div>

      {/* Navigation */}
      <div className="absolute bottom-12 left-12 z-[100]">
        <Link href="/dashboard" className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back_to_Base
        </Link>
      </div>
    </section>
  );
};

export default Experience;
