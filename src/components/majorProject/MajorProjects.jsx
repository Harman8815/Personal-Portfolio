import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Project data
const projects = [
  {
    id: 1,
    title: "Neural Canvas",
    category: "AI Creative Suite",
    description: "Advanced ML-powered design platform with real-time collaboration and generative art capabilities.",
    tech: ["React", "TensorFlow.js", "WebGL", "Node.js"],
    color: "from-cyan-500 to-blue-600",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 2,
    title: "Quantum Ledger",
    category: "Blockchain Infrastructure",
    description: "Next-gen distributed ledger system with quantum-resistant cryptography and sub-second consensus.",
    tech: ["Rust", "WebAssembly", "IPFS", "PostgreSQL"],
    color: "from-purple-500 to-pink-600",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 3,
    title: "Synthetic Dreams",
    category: "3D Web Experience",
    description: "Immersive WebGL-powered virtual environment with physics simulation and real-time rendering.",
    tech: ["Three.js", "React", "GLSL", "WebSocket"],
    color: "from-emerald-500 to-teal-600",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 4,
    title: "Echo Chamber",
    category: "Audio Platform",
    description: "Spatial audio streaming service with AI-driven personalization and 3D sound positioning.",
    tech: ["Next.js", "Web Audio API", "Python", "Redis"],
    color: "from-orange-500 to-red-600",
    link: "#",
    github: "#",
    featured: false
  },
  {
    id: 5,
    title: "Data Weave",
    category: "Analytics Dashboard",
    description: "Real-time data visualization platform with advanced ML insights and predictive analytics.",
    tech: ["Vue.js", "D3.js", "Python", "MongoDB"],
    color: "from-indigo-500 to-purple-600",
    link: "#",
    github: "#",
    featured: false
  }
];

const ProjectCard = ({ project, index, isActive, onHover, onLeave, cardsAnimated }) => {
  const cardRef = useRef(null);
  const buttonRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !cardsAnimated) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePos({ x: x * 20, y: y * 20 });
  };

  useEffect(() => {
    // GSAP hover animations for buttons
    buttonRefs.current.forEach((button) => {
      if (!button) return;
      
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mousedown', () => {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseup', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.1,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={cardsAnimated ? onHover : undefined}
      onMouseLeave={cardsAnimated ? onLeave : undefined}
      className={`relative group cursor-pointer transition-opacity duration-300 ${
        cardsAnimated ? 'opacity-100' : 'opacity-60'
      }`}
      style={{
        pointerEvents: cardsAnimated ? 'auto' : 'none',
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      
      {/* Main card */}
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-wider text-white">Featured</span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full animate-pulse`} />
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider opacity-70">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">
            {project.title}
          </h3>

          <p className="text-slate-400 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              ref={(el) => (buttonRefs.current[0] = el)}
              className={`px-6 py-3 bg-gradient-to-r ${project.color} rounded-lg font-mono text-sm font-black text-white uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]`}
            >
              View Project
            </button>
            <button
              ref={(el) => (buttonRefs.current[1] = el)}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-mono text-sm font-black text-white uppercase tracking-wider transition-all duration-300 hover:bg-white/20"
            >
              GitHub
            </button>
          </div>
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
      </div>
    </div>
  );
};

const MajorProjects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create timeline for pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%", // Start when section enters viewport
          end: "+=300%", // Reduced duration for snappier experience
          scrub: 1, // Match Skills section scrub value
          pin: true, // Pin the section
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setIsPinned(self.isActive);
            // Update active card based on scroll progress
            const cardIndex = Math.floor(self.progress * projects.length);
            setActiveIndex(Math.min(cardIndex, projects.length - 1));
            
            // Enable pointer events when cards are fully animated (progress > 0.3)
            if (self.progress > 0.3 && !cardsAnimated) {
              setCardsAnimated(true);
            }
          }
        }
      });

      // Initial states
      gsap.set(headerRef.current.children, {
        opacity: 0,
        y: 50
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0
      });

      gsap.set(cardsRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotateY: 15,
        filter: "blur(10px)"
      });

      // Header entrance animation
      tl.to(headerRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      });

      // Animate cards in sequence
      cardsRef.current.forEach((card, index) => {
        tl.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
        }, `cards+=${index * 0.2}`);
      });

      // Create horizontal scroll effect for cards
      tl.to(cardsRef.current, {
        x: (index) => {
          // Center the active card and offset others
          const offset = index - activeIndex;
          return offset * 120;
        },
        scale: (index) => {
          // Make active card larger
          return index === activeIndex ? 1.1 : 0.9;
        },
        opacity: (index) => {
          // Make active card more opaque
          return index === activeIndex ? 1 : 0.6;
        },
        duration: 0.8,
        ease: "power2.inOut"
      }, "horizontal-scroll");

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        opacity: isPinned ? 1 : 0,
        duration: 0.5,
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]); // Add activeIndex dependency to update animations

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-primary text-white overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 text-center mb-20">
        <div>
          <span className="font-mono text-[11px] tracking-[0.8em] uppercase text-cyan-500 mb-4 block">
            Project_Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            Major Projects
          </h2>
          <div className="h-[2px] w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />
        </div>
      </div>

      {/* Projects container */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 py-20 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[60vh]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="transform-gpu"
            >
              <ProjectCard
                project={project}
                index={index}
                isActive={index === activeIndex}
                cardsAnimated={cardsAnimated}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(Math.floor(activeIndex))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-cyan-500 uppercase tracking-wider">
            Scroll to explore
          </span>
          <div className="w-3 h-3 border-b-2 border-r-2 border-cyan-500 rotate-45 animate-bounce" />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-cyan-500 w-8 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorProjects;
