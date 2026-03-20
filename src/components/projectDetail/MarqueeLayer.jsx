import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarqueeRow = ({ text, direction, speed, baseOpacity, activeKeyword, blur = true }) => {
  const rowRef = useRef(null);
  const xPercent = useRef(0);
  const velocity = useRef(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        onUpdate: (self) => {
          const scrollVelocity = self.getVelocity();
          const targetVelocity = 1 + Math.abs(scrollVelocity) * 0.008;
          
          gsap.to(velocity, {
            current: scrollVelocity < 0 ? -targetVelocity : targetVelocity,
            duration: 0.5,
            overwrite: true
          });
        }
      });

      const animate = () => {
        const moveAmount = speed * velocity.current;
        xPercent.current += (direction === 'left' ? -moveAmount : moveAmount);
        
        if (xPercent.current <= -50) xPercent.current = 0;
        if (xPercent.current >= 0) xPercent.current = -50;

        if (rowRef.current) {
          gsap.set(rowRef.current, { xPercent: xPercent.current });
        }
        
        const decayTarget = velocity.current > 0 ? 1 : -1;
        velocity.current += (decayTarget - velocity.current) * 0.02;
      };

      gsap.ticker.add(animate);
      return () => gsap.ticker.remove(animate);
    });

    return () => ctx.revert();
  }, [direction, speed]);

  const parts = text.split(' • ');

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 select-none pointer-events-none">
      <div ref={rowRef} className="inline-block">
        <div className="inline-flex gap-12 px-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {parts.map((part, j) => (
                <span 
                  key={j} 
                  className={`font-mono text-4xl md:text-[6rem] font-black uppercase tracking-[0.3em] transition-all duration-1000 ${
                    activeKeyword && part.includes(activeKeyword) 
                      ? 'text-cyan-400 opacity-100 scale-105 drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]' 
                      : 'text-white'
                  }`}
                  style={{ 
                    opacity: activeKeyword && part.includes(activeKeyword) ? 0.8 : baseOpacity,
                    filter: blur ? 'blur(4px)' : 'none'
                  }}
                >
                  {part}
                  {j < parts.length - 1 && <span className="mx-8 text-cyan-500/10">•</span>}
                </span>
              ))}
              {i < 3 && <span className="mx-8 text-cyan-500/10">•</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MarqueeLayer = ({ activeKeyword }) => {
  return (
    <div className="fixed inset-0 z-0 flex flex-col justify-between py-10 opacity-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="space-y-0">
        <MarqueeRow 
          text="NEURAL_NEXUS • REALTIME_PROCESSING • DATA_PIPELINE • EVENT_STREAM • LOW_LATENCY • SCALABLE_SYSTEM" 
          direction="left" 
          speed={0.12} 
          baseOpacity={0.15}
          activeKeyword={activeKeyword}
        />
        <MarqueeRow 
          text="QUANTUM_COMPUTE • EDGE_DELIVERY • WIREFRAME_SYNC • PROTOCOL_X • DISTRIBUTED_LEDGER • MESH_NETWORK" 
          direction="right" 
          speed={0.15} 
          baseOpacity={0.1}
          activeKeyword={activeKeyword}
          blur={false}
        />
        <MarqueeRow 
          text="AUTONOMOUS_AGENTS • NEURAL_SYNC • PIPELINE_OPTIMIZATION • CLOUD_NATIVE • MICROSERVICES" 
          direction="left" 
          speed={0.09} 
          baseOpacity={0.15}
          activeKeyword={activeKeyword}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] opacity-70" />
    </div>
  );
};

export default MarqueeLayer;
