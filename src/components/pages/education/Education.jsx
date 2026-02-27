"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationData } from "../../../data/index.js";

gsap.registerPlugin(ScrollTrigger);

// CSS for education section animations
const educationCSS = `
  @keyframes slideUpStagger {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes headerLift {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }
  
  .education-card {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .education-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%);
    pointer-events: none;
  }
  
  .education-card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255,255,255,0.01) 10px,
      rgba(255,255,255,0.01) 20px
    );
    pointer-events: none;
    opacity: 0.3;
  }
  
  .education-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  
  .education-card:hover .card-glow {
    opacity: 1;
  }
  
  .card-glow {
    position: absolute;
    inset: -2px;
    background: var(--card-glow-gradient);
    border-radius: 16px;
    opacity: 0.6;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  .degree-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    opacity: 0.1;
    background: var(--icon-color);
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z'/%3E%3C/svg%3E") center/contain no-repeat;
  }
  
  .corner-accent {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent-color);
    opacity: 0.3;
  }
  
  .corner-accent.top-left {
    top: 10px;
    left: 10px;
    border-right: none;
    border-bottom: none;
  }
  
  .corner-accent.bottom-right {
    bottom: 10px;
    right: 10px;
    border-left: none;
    border-top: none;
  }
`;

const EducationCard = ({ edu, index, totalCards, cardRef }) => {
  const internalRef = useRef(null);
  const ref = cardRef || internalRef;

  // Only run internal animations if not controlled by PortfolioScroll
  useLayoutEffect(() => {
    if (cardRef) return; // Skip internal animations if controlled externally

    const el = ref.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Staggered entrance animation
    tl.fromTo(el, 
      {
        opacity: 0,
        y: 80,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.15
      }
    );

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(el, {
        scale: 1.03,
        y: -4,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index, cardRef]);

  return (
    <div
      ref={ref}
      className="education-card relative p-6 h-full"
      style={{
        '--card-glow-gradient': edu.gradient,
        '--icon-color': edu.color,
        '--accent-color': edu.glowColor
      }}
    >
      <div className="card-glow"></div>
      <div className="corner-accent top-left"></div>
      <div className="corner-accent bottom-right"></div>
      <div className="degree-icon"></div>
      
      {/* Header Area */}
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {edu.degree}
        </h3>
        <p className="text-sm md:text-base text-gray-300 mb-3 font-medium">
          {edu.field}
        </p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">
            {edu.institution}
          </p>
          <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
            {edu.duration}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 h-px mb-4">
        <div 
          className="h-full w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${edu.glowColor}, transparent)`
          }}
        ></div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 space-y-4">
        {/* CGPA */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Performance</p>
          <p className="text-lg font-bold" style={{ color: edu.color }}>
            {edu.cgpa}
          </p>
        </div>

        {/* Highlights */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Key Highlights</p>
          <ul className="space-y-2">
            {edu.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span 
                  className="text-xs mt-1 flex-shrink-0"
                  style={{ color: edu.color }}
                >▸</span>
                <span className="text-xs text-gray-300 leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        {edu.achievements && edu.achievements.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Achievements</p>
            <div className="flex flex-wrap gap-1">
              {edu.achievements.slice(0, 2).map((achievement, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: `${edu.color}20`,
                    border: `1px solid ${edu.color}40`,
                    color: edu.color
                  }}
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Education = ({ refs, visible }) => {
  const sectionRef = refs?.containerRef || useRef(null);
  const headerRef = refs?.headerRef || useRef(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    
    // Only run header animation if not controlled by PortfolioScroll
    if (!refs) {
      // Header animation
      gsap.fromTo(header,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: -10,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Exit animation for entire section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          gsap.to(".education-card", {
            opacity: 0.3,
            y: 20,
            duration: 0.6,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to(".education-card", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.inOut"
          });
        }
      });
    }
  }, [refs]);

  return (
    <>
      <style>{educationCSS}</style>
      <section
        ref={sectionRef}
        id="education"
        className="min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="text-center mb-16"
          >
            <span className="font-mono text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-cyan-500 mb-2 block">
              Academic_Foundation
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Education
            </h2>
            <div className="h-[2px] w-48 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
          </div>

          {/* Education Cards Grid - 1x3 Layout */}
          <div className="relative" style={{ minHeight: "400px" }}>
            {/* Standard grid layout for standalone use */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 ${refs ? 'opacity-0 pointer-events-none' : ''}`}>
              {educationData.map((edu, index) => (
                <EducationCard
                  key={edu.id}
                  edu={edu}
                  index={index}
                  totalCards={educationData.length}
                  cardRef={null}
                />
              ))}
            </div>
            
            {/* Absolute positioned cards for PortfolioScroll control */}
            {refs && (
              <>
                <EducationCard
                  edu={educationData[1]} // Intermediate (center card)
                  index={0}
                  totalCards={educationData.length}
                  cardRef={refs.card1Ref}
                />
                <EducationCard
                  edu={educationData[0]} // Bachelors (left card)
                  index={1}
                  totalCards={educationData.length}
                  cardRef={refs.card2Ref}
                />
                <EducationCard
                  edu={educationData[2]} // High School (right card)
                  index={2}
                  totalCards={educationData.length}
                  cardRef={refs.card3Ref}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
