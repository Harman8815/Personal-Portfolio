"use client";

import React, { useRef, useState, useEffect } from "react";
import { socialData } from "../../../data/index";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// CSS for Timeline Orbital Bloom animations
const orbitalCSS = `
  @keyframes orbitRotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes planetPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.04);
    }
  }
  
  @keyframes ringGlow {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
  }
  
  .orbit-container {
    animation-play-state: paused;
  }
  
  .orbit-container.running {
    animation-play-state: running;
  }
  
  .orbit-container.inner {
    animation: orbitRotation 30s linear infinite;
  }
  
  .orbit-container.middle {
    animation: orbitRotation 45s linear infinite;
  }
  
  .orbit-container.outer {
    animation: orbitRotation 60s linear infinite;
  }
  
  .planet-core {
    animation: planetPulse 3.5s ease-in-out infinite;
  }
  
  .orbit-ring {
    animation: ringGlow 4s ease-in-out infinite;
  }
  
  .social-orbital-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .social-orbital-icon:hover {
    transform: var(--hover-transform) scale(1.2) translateY(-6px) !important;
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
    z-index: 50;
  }
  
  .social-orbital-icon .glow-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .social-orbital-icon:hover .glow-ring {
    opacity: 1;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SocialHub = ({ refs, visible }) => {
  const containerRef = refs?.containerRef || useRef(null);
  const headerRef = refs?.headerRef || useRef(null);
  const timelineLineRef = refs?.timelineLineRef || useRef(null);
  const socialCoreRef = refs?.socialCoreRef || useRef(null);
  const socialIconsContainerRef = useRef(null);
  const planetRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [hoveredRing, setHoveredRing] = useState(null);

  // Timeline for social animations
  const socialTimelineRef = useRef(null);

  // Initialize GSAP timeline for social section
  useEffect(() => {
    if (!containerRef.current || !headerRef.current || !planetRef.current) return;

    // Wait for education timeline to complete before starting
    const startSocialTimeline = () => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          setAnimationStarted(true);
          // Start orbital rotation after all animations complete
          startOrbitalRotation();
        }
      });

      // 1. Header animates first (same as Experience/Education)
      tl.fromTo(headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // 2. Central planet forms after header
      tl.fromTo(planetRef.current,
        {
          scale: 0.4,
          opacity: 0,
          filter: "blur(16px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.6"
      );

      // 3. Outer ring appears and scales in
      const outerRing = planetRef.current.querySelector('.planet-ring.outer');
      tl.fromTo(outerRing,
        {
          scale: 0.3,
          opacity: 0,
          filter: "blur(12px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out"
        },
        "+=0.3"
      );

      // 4. Middle ring appears (after 0.25s delay)
      const middleRing = planetRef.current.querySelector('.planet-ring.middle');
      tl.fromTo(middleRing,
        {
          scale: 0.3,
          opacity: 0,
          filter: "blur(12px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out"
        },
        "+=0.25"
      );

      // 5. Inner ring appears (after 0.25s delay)
      const innerRing = planetRef.current.querySelector('.planet-ring.inner');
      tl.fromTo(innerRing,
        {
          scale: 0.3,
          opacity: 0,
          filter: "blur(12px)"
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out"
        },
        "+=0.25"
      );

      socialTimelineRef.current = tl;

      // Start the timeline
      tl.play();
    };

    // Check if education timeline is complete or start after a delay
    const checkAndStart = () => {
      // For now, start after a short delay (can be integrated with education timeline later)
      setTimeout(startSocialTimeline, 500);
    };

    checkAndStart();

    return () => {
      if (socialTimelineRef.current) {
        socialTimelineRef.current.kill();
      }
    };
  }, []);

  // Start orbital rotation after animations complete
  const startOrbitalRotation = () => {
    const orbitContainers = socialIconsContainerRef.current?.querySelectorAll('.orbit-container');
    orbitContainers?.forEach(container => {
      container.classList.add('running');
    });
  };

  // Handle hover state for pausing individual ring rotation
  const handleOrbitHover = (ringType, hovered) => {
    setHoveredRing(hovered ? ringType : null);

    const orbitContainer = socialIconsContainerRef.current?.querySelector(`.orbit-container.${ringType}`);
    if (orbitContainer) {
      orbitContainer.classList.toggle('running', !hovered);
    }
  };

  // Update the socialIconsRef in PortfolioScroll when component mounts
  React.useLayoutEffect(() => {
    if (refs?.socialIconsRef && socialIconsContainerRef.current) {
      const icons = socialIconsContainerRef.current.querySelectorAll('[data-social-icon]');
      refs.socialIconsRef.current = Array.from(icons);
    }
  }, [refs]);

  // Social icons distribution across 3 rings
  const selectedSocials = socialData;
  const innerRingIcons = selectedSocials.slice(0, 3);
  const middleRingIcons = selectedSocials.slice(3, 6);
  const outerRingIcons = selectedSocials.slice(6);

  // Calculate icon positions using proper rotation and translation
  const calculateIconPosition = (index, total, radius) => {
    const angle = (index * 360 / total) * (Math.PI / 180);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const rotation = (index * 360 / total);
    return { x, y, rotation };
  };

  return (
    <>
      <style>{orbitalCSS}</style>
      <section
        ref={containerRef}
        id="social"
        className="relative flex items-center justify-center overflow-hidden py-32"
      >
        {/* Background Treatment - Enhanced depth */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial bloom behind planet */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)]" />

          {/* Vertical gradient fade at edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/20" />

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>


        {/* Header Block - Same design as Experience and Education */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center z-50 pointer-events-none absolute"
          style={{
            left: "50%",
            top: "80px",
            transform: "translateX(-50%)"
          }}
        >
          <span className="font-mono text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-cyan-500 mb-2">
            Digital_Connections
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Social Hub
          </h2>
          <div className="h-[2px] w-48 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
        </div>

        {/* Central Planet System - Enhanced and Prominent */}
        <div
          ref={planetRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            perspective: '1000px',
            transform: 'translate(-50%, calc(-50% + 10vh)) rotateX(18deg)'
          }}
        >
          {/* Planet Rings - Progressive Bloom */}
          <div className="planet-ring outer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/25"
            style={{ width: '720px', height: '720px' }} />
          <div className="planet-ring middle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/30"
            style={{ width: '520px', height: '520px' }} />
          <div className="planet-ring inner absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-500/35"
            style={{ width: '340px', height: '340px' }} />

          {/* Central Planet - Strong and Prominent */}
          <div className="planet-core relative w-36 h-36 md:w-40 md:h-40 rounded-full shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #8b5cf6, #6366f1, #3730a3, #1e1b4b)',
              boxShadow: `
                 0 0 80px rgba(139, 92, 246, 0.6),
                 0 0 120px rgba(59, 130, 246, 0.4),
                 0 0 200px rgba(99, 102, 241, 0.3),
                 inset 0 0 40px rgba(139, 92, 246, 0.4),
                 inset 0 0 80px rgba(59, 130, 246, 0.2)
               `
            }}
          >
            {/* Planet surface layers for depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-indigo-700/40" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/10" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent" />

            {/* Animated texture layer */}
            <div className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle at 70% 70%, transparent 30%, rgba(139, 92, 246, 0.2) 70%)',
                animation: 'planetPulse 4s ease-in-out infinite'
              }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white z-10">
              <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Timeline Orbital Bloom - Multi-Layer System */}
        <div
          ref={socialIconsContainerRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '720px',
            height: '720px',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            transform: 'translate(-50%, calc(-50% + 10vh))'
          }}
        >
          {/* Orbit Ring Guides */}
          <div className="orbit-ring absolute rounded-full border border-purple-500/10"
            style={{ width: '340px', height: '340px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="orbit-ring absolute rounded-full border border-blue-500/10"
            style={{ width: '520px', height: '520px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="orbit-ring absolute rounded-full border border-cyan-500/10"
            style={{ width: '720px', height: '720px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

          {/* Inner Ring - 170px radius - 3 icons */}
          <div
            className="orbit-container inner absolute inset-0"
            onMouseEnter={() => handleOrbitHover('inner', true)}
            onMouseLeave={() => handleOrbitHover('inner', false)}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(18deg)'
            }}
          >
            {innerRingIcons.map((social, index) => {
              const { x, y, rotation } = calculateIconPosition(index, 3, 170);

              return (
                <div
                  key={social.id}
                  data-social-icon
                  className="social-orbital-icon absolute flex items-center justify-center w-14 h-14 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/20 hover:border-white/40 cursor-pointer group"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '56px',
                    height: '56px',
                    marginLeft: '-28px',
                    marginTop: '-28px',
                    transform: `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    '--hover-transform': `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    zIndex: 30
                  }}
                  onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="glow-ring" />
                  <div
                    className="text-white/90 group-hover:text-white transition-colors duration-300 relative z-10"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                    {social.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Ring - 260px radius - 3 icons */}
          <div
            className="orbit-container middle absolute inset-0"
            onMouseEnter={() => handleOrbitHover('middle', true)}
            onMouseLeave={() => handleOrbitHover('middle', false)}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(18deg)'
            }}
          >
            {middleRingIcons.map((social, index) => {
              const { x, y, rotation } = calculateIconPosition(index, 3, 260);

              return (
                <div
                  key={social.id}
                  data-social-icon
                  className="social-orbital-icon absolute flex items-center justify-center w-14 h-14 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/20 hover:border-white/40 cursor-pointer group"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '56px',
                    height: '56px',
                    marginLeft: '-28px',
                    marginTop: '-28px',
                    transform: `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    '--hover-transform': `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    zIndex: 20
                  }}
                  onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="glow-ring" />
                  <div
                    className="text-white/90 group-hover:text-white transition-colors duration-300 relative z-10"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                    {social.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer Ring - 360px radius - remaining icons */}
          <div
            className="orbit-container outer absolute inset-0"
            onMouseEnter={() => handleOrbitHover('outer', true)}
            onMouseLeave={() => handleOrbitHover('outer', false)}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(18deg)'
            }}
          >
            {outerRingIcons.map((social, index) => {
              const totalIcons = outerRingIcons.length;
              const { x, y, rotation } = calculateIconPosition(index, totalIcons, 360);

              return (
                <div
                  key={social.id}
                  data-social-icon
                  className="social-orbital-icon absolute flex items-center justify-center w-14 h-14 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/20 hover:border-white/40 cursor-pointer group"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '56px',
                    height: '56px',
                    marginLeft: '-28px',
                    marginTop: '-28px',
                    transform: `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    '--hover-transform': `rotate(${rotation}deg) translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
                    zIndex: 10
                  }}
                  onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="glow-ring" />
                  <div
                    className="text-white/90 group-hover:text-white transition-colors duration-300 relative z-10"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-slate-900/95 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                    {social.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialHub;
