
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    id: 'step-1',
    title: "The Vision",
    label: "PHASE_01",
    desc: "Architecting digital landscapes that blur the line between utility and high-art. Every interaction is a deliberate stroke in a larger narrative."
  },
  {
    id: 'step-2',
    title: "Technical Philosophy",
    label: "PHASE_02",
    desc: "Performance is our core currency. Utilizing low-level systems like Rust and WebGPU to ensure visual complexity never compromises speed."
  },
  {
    id: 'step-3',
    title: "Global Resilience",
    label: "PHASE_03",
    desc: "Distributed networks ensure 99.9% uptime. Our architectures are built to survive and thrive in a decentralized, high-traffic world."
  }
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const introTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      });

      // Initial state
      gsap.set(".step-card", { opacity: 0, x: -50, filter: 'blur(10px)' });
      gsap.set(circleRef.current, { 
        scale: 1, 
        left: "50%", 
        top: "50%", 
        xPercent: -50, 
        yPercent: -50,
        width: "min(60vw, 500px)",
        height: "min(60vw, 500px)"
      });

      // 1. Initial Intro Phase: "Want to know me?"
      // As we start scrolling, the text fades out and circle begins its journey.
      tl.to(introTextRef.current, { opacity: 0, y: -20, duration: 1 })
        
        // 2. Journey to Bottom-Right (Step 1)
        .to(circleRef.current, { 
          left: "85%", 
          top: "80%", 
          scale: 0.5, 
          duration: 2, 
          ease: "power2.inOut" 
        }, "step1")
        .to("#card-0", { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1 }, "step1+=0.5")

        // 3. Journey to Top-Left (Step 2)
        .to(circleRef.current, { 
          left: "15%", 
          top: "20%", 
          scale: 0.45, 
          duration: 2, 
          ease: "power2.inOut" 
        }, "step2")
        .to("#card-0", { opacity: 0, x: -50, filter: 'blur(10px)', duration: 0.5 }, "step2")
        .to("#card-1", { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, left: 'auto', right: '10%' }, "step2+=0.5")

        // 4. Journey to Center-Right (Step 3)
        .to(circleRef.current, { 
          left: "80%", 
          top: "50%", 
          scale: 0.6, 
          duration: 2, 
          ease: "power2.inOut" 
        }, "step3")
        .to("#card-1", { opacity: 0, x: 50, filter: 'blur(10px)', duration: 0.5 }, "step3")
        .to("#card-2", { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1 }, "step3+=0.5")

        // 5. Return to Center & Final Zoom
        .to("#card-2", { opacity: 0, duration: 0.5 }, "exit")
        .to(circleRef.current, { 
          left: "50%", 
          top: "50%", 
          scale: 0.1, 
          opacity: 0.5,
          duration: 1.5,
          ease: "power3.in"
        }, "exit")
        .to(circleRef.current, { 
          scale: 40, 
          opacity: 0, 
          duration: 2, 
          ease: "power2.in" 
        }, "exit+=1.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#020617] overflow-hidden min-h-screen border-t border-slate-900">
      <div className="h-screen w-full relative flex items-center justify-center">
        
        {/* The Animated Circle */}
        <div 
          ref={circleRef}
          className="absolute flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl shadow-[0_0_100px_rgba(34,211,238,0.1)] z-20 pointer-events-none"
        >
          <div className="absolute inset-2 rounded-full border border-white/5" />
          <div className="flex flex-col items-center justify-center text-center p-8">
             <div className="w-12 h-[1px] bg-cyan-500 mb-4 opacity-50"></div>
             <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-400 uppercase font-black">Core_Identity</span>
          </div>
        </div>

        {/* Initial Intro State */}
        <div ref={introTextRef} className="relative z-30 text-center pointer-events-none">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Want to <br /> know me?
          </h2>
          <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
            <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-cyan-500">Scroll to begin</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent"></div>
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
                  left: i % 2 === 0 ? '5%' : 'auto', 
                  right: i % 2 === 0 ? 'auto' : '5%',
                  textAlign: i % 2 === 0 ? 'left' : 'right'
                }}
              >
                <div className={`flex items-center gap-4 mb-6 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <span className="font-mono text-xs text-cyan-500 tracking-[0.5em] uppercase font-black">{step.label}</span>
                  <div className="h-px w-12 bg-cyan-500/20" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-10 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span className="text-cyan-500">AESTHETIC_V1.0</span>
          <span className="h-3 w-[1px] bg-white"></span>
          <span>SYST_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
