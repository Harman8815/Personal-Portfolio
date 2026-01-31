"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
      
      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });
      
      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(tipRef.current, {
        x: clientX + 15,
        y: clientY + 15,
        duration: 0.2,
      });
    };

    const onMouseDown = () => {
      gsap.to(ringRef.current, { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={tipRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] font-mono text-[8px] text-cyan-500/60 uppercase tracking-tighter"
      >
        <div className="flex flex-col">
          <span>X: {coords.x}</span>
          <span>Y: {coords.y}</span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
