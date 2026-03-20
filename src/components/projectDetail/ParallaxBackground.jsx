import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ParallaxBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Layer (Slowest - Deep Depth)
      gsap.to('.parallax-bg', {
        y: -50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: 'body',
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Midground Layer (Medium - Structural)
      gsap.to('.parallax-mid', {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: 'body',
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Foreground Layer (Fastest - Detail)
      gsap.to('.parallax-fore', {
        y: -500,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: 'body',
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020617]">
      {/* Background Layer - Deep Blur & Gradients */}
      <div className="parallax-bg absolute inset-0 opacity-30">
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] right-[10%] w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[200px]" />
        <div className="absolute top-[30%] left-[40%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Midground Layer - Sharp Icons & Lines */}
      <div className="parallax-mid absolute inset-0 opacity-20">
        <div className="absolute top-[20%] right-[15%] w-96 h-96 border border-cyan-500/10 rounded-full" />
        <div className="absolute bottom-[30%] left-[10%] w-72 h-72 border border-purple-500/10 rounded-full" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rotate-12" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -rotate-12" />
      </div>

      {/* Foreground Layer - High Contrast Details */}
      <div className="parallax-fore absolute inset-0 opacity-10">
        <div className="absolute top-[15%] left-[40%] w-px h-80 bg-gradient-to-b from-cyan-400/40 to-transparent" />
        <div className="absolute top-[70%] right-[30%] w-px h-[400px] bg-gradient-to-b from-purple-400/40 to-transparent" />
        <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <div className="absolute bottom-[40%] left-[10%] w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,38,211,0.5)]" />
      </div>
    </div>
  );
};

export default ParallaxBackground;
