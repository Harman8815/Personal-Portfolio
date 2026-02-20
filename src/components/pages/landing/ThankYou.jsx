"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lumina OS Logout/Gratitude Sequence.
 * A cinematic end-of-page transition simulating system power-down and gratitude.
 */
const phrases = [
  "Gratitude_Acknowledged...",
  "Connection_Closing_Securely...",
  "System_De-sync::Complete",
  "Visit_Again::Required",
];

const ThankYou = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Typing Animation logic
    let currentPhrase = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const fullPhrase = phrases[currentPhrase];

      if (isDeleting) {
        setDisplayText(fullPhrase.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setDisplayText(fullPhrase.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === fullPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const startTyping = setTimeout(type, 1000);

    // GSAP Reveal
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    }

    return () => clearTimeout(startTyping);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617] border-t border-white/5"
    >
      {/* Background Neural Grid (Themed) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Decorative Tag */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="h-[1px] w-12 bg-cyan-500"></div>
          <span className="font-mono text-[10px] tracking-[0.6em] text-cyan-400 uppercase">
            End_Of_Transmission
          </span>
          <div className="h-[1px] w-12 bg-cyan-500"></div>
        </div>

        {/* Large Glitch Header */}
        <h2
          ref={textRef}
          className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-white leading-none glitch-thankyou select-none"
        >
          Thank_You
        </h2>

        {/* Typing Terminal */}
        <div className="flex items-center gap-3 font-mono text-sm md:text-xl text-cyan-400/80">
          <span className="opacity-40">SYSTEM::</span>
          <span className="font-bold tracking-widest">{displayText}</span>
          <span className="w-2 h-5 bg-cyan-500 animate-pulse"></span>
        </div>
      </div>

      {/* Floating System Specs */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 opacity-20 font-mono text-[8px] uppercase tracking-[0.5em] text-slate-500">
        <span>Session_ID::0x7F_SYNC</span>
        <span>Uptime::100%</span>
        <span>Status::Terminated</span>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes thankyou-glitch {
          0% { transform: skew(0deg); filter: blur(0); }
          2% { transform: skew(10deg); filter: blur(1px); color: #22d3ee; }
          4% { transform: skew(-10deg); filter: blur(0); color: #fff; }
          100% { transform: skew(0deg); }
        }
        .glitch-thankyou {
          animation: thankyou-glitch 4s infinite step-end;
          text-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
        }
      `,
        }}
      />
    </section>
  );
};

export default ThankYou;
