"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialData } from "../../../data/index";

gsap.registerPlugin(ScrollTrigger);

const socialCSS = `
  .social-card {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .social-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--card-glow-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  .social-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  .social-card:hover::before {
    opacity: 1;
  }

  .social-card:hover::after {
    opacity: 1;
  }

  .social-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .social-icon {
    width: 3rem;
    height: 3rem;
    color: var(--icon-color);
    transition: all 0.3s ease;
  }

  .social-card:hover .social-icon {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2);
  }

  .social-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin: 1rem 0 0.5rem 0;
  }

  .social-descriptor {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }

  .social-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--icon-color);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .social-card:hover .social-cta {
    gap: 0.75rem;
    color: white;
  }

  .social-arrow {
    transition: transform 0.3s ease;
  }

  .social-card:hover .social-arrow {
    transform: translateX(4px);
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

  .network-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.1;
    background-image: 
      radial-gradient(circle at 20% 50%, var(--accent-color) 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, var(--accent-color) 1px, transparent 1px),
      radial-gradient(circle at 80% 50%, var(--accent-color) 1px, transparent 1px);
    background-size: 100% 100%;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
  }

  .network-pulse {
    animation: pulse 4s ease-in-out infinite;
  }
`;

const SocialCard = ({ social, index, totalCards, cardRef }) => {
  const internalRef = useRef(null);
  const ref = cardRef || internalRef;

  useLayoutEffect(() => {
    const el = ref.current;
    
    // Only run animations if not controlled by PortfolioScroll
    if (!cardRef) {
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
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1
        }
      );
    }

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(el, {
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
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

  const handleClick = () => {
    window.open(social.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={ref}
      className="social-card relative"
      style={{
        '--card-glow-gradient': social.gradient,
        '--icon-color': social.color,
        '--accent-color': social.glowColor
      }}
      onClick={handleClick}
    >
      <div className="network-lines network-pulse"></div>
      <div className="corner-accent top-left"></div>
      <div className="corner-accent bottom-right"></div>
      
      <div className="social-icon">
        {social.icon}
      </div>
      
      <h3 className="social-name">{social.name}</h3>
      <p className="social-descriptor">{social.descriptor}</p>
      
      <div className="social-cta">
        <span>Connect</span>
        <svg className="social-arrow w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
};

const SocialPresence = ({ refs, visible }) => {
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
          gsap.to(".social-card", {
            opacity: 0.3,
            y: 20,
            duration: 0.6,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to(".social-card", {
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
      <style>{socialCSS}</style>
      <section
        ref={sectionRef}
        id="social"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Digital Presence
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with me across professional platforms and digital spaces
            </p>
          </div>

          {/* Social Cards Grid - 1x4 on desktop, 2x2 on tablet, 1x1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {socialData.map((social, index) => (
              <SocialCard
                key={social.id}
                social={social}
                index={index}
                totalCards={socialData.length}
                cardRef={refs ? [refs.card1Ref, refs.card2Ref, refs.card3Ref, refs.card4Ref][index] : null}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialPresence;
