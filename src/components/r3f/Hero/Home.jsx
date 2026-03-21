"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import gsap from "gsap";
import { Suspense, useRef, useEffect, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Laptop from "./Laptop";
import ModelLoader from "./ModelLoader.jsx";
import { useLoadingContext } from "../../../context/LoadingContext.jsx";
import SSRSafeWrapper from "../../common/SSRSafeWrapper.jsx";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ onLoad, onLoaderExit }) => {
  const LaptopRef = useRef();
  const contentLoadedRef = useRef(false);
  const [shouldAnimateLaptop, setShouldAnimateLaptop] = useState(false);
  const [_laptopFullyLoaded, setLaptopFullyLoaded] = useState(false);
  const { markContentReady } = useLoadingContext();
  const textRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    if (onLoaderExit) {
      const timer = setTimeout(() => {
        setShouldAnimateLaptop(true);
        onLoad?.();
      }, 800);

      if (textRef.current) {
        gsap.fromTo(textRef.current.children,
          { y: 40, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            delay: 1
          }
        );
      }

      return () => clearTimeout(timer);
    }
  }, [onLoaderExit, onLoad]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!contentLoadedRef.current) {
        contentLoadedRef.current = true;
        markContentReady();
        onLoad?.();
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [markContentReady, onLoad]);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center overflow-hidden bg-[#020617] pt-40 md:pt-56"
    >
      {/* Background Atmosphere & Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Parallax Blobs */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
        />

        {/* Floating Particles Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePos.x * (Math.random() * 50)}px, ${mousePos.y * (Math.random() * 50)}px)`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
      </div>

      <div className="max-w-7xl pointer-event-none mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        {/* Primary Text Area */}
        <div ref={textRef} className="flex flex-col gap-8 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-cyan-500/50" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-400 uppercase font-black">Creative_Developer_v4</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Digital_Worlds
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-lg border-l border-white/10 pl-6">
            Architecting high-performance web experiences, immersive 3D interfaces, and resilient technical systems for the next generation.
          </p>

          <div className="flex flex-wrap gap-8 mt-6">
            <button className="group relative px-12 py-5 overflow-hidden rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95">
              <span className="relative z-10">View_Projects</span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </button>
            <button className="group px-12 py-5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/30 transition-all active:scale-95">
              Contact_Me
            </button>
          </div>
        </div>

        {/* 3D Visualizer - Off-center Laptop */}
        <div className="h-[500px] lg:h-[800px] w-full relative group hidden md:flex min-w-[800px]">
          <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <SSRSafeWrapper fallback={<div className="w-full h-full bg-[#020617] flex items-center justify-center text-white">Loading 3D Scene...</div>}>
            <Canvas
              shadows
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 0, 6], fov: 35 }}
            >
              {/* <Stars radius={100} depth={50} count={1500} factor={6} saturation={0} fade speed={1.5} /> */}

              <ambientLight intensity={0.6} />
              <spotLight position={[10, 10, 10]} intensity={2} angle={0.15} penumbra={1} color="#ffffff" />
              <pointLight position={[-10, -10, -10]} intensity={1.5} color="#22d3ee" />
              <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.5}
                minAzimuthAngle={-Math.PI / 6}
                maxAzimuthAngle={Math.PI / 6}
              />

              <Suspense fallback={<ModelLoader />}>
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                  <Laptop
                    LaptopRef={LaptopRef}
                    shouldAnimate={shouldAnimateLaptop}
                    onLoadComplete={() => setLaptopFullyLoaded(true)}
                    position={[0, 0.8, 0]}
                    rotation={[0, -0.2, 0]}
                    mousePos={mousePos}
                  />
                </Float>
              </Suspense>
            </Canvas>
          </SSRSafeWrapper>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 opacity-30">
        <span className="font-mono text-[8px] tracking-[0.8em] text-cyan-500/50 uppercase">Scroll_To_Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent animate-bounce"></div>
      </div>
    </section>
  );
};

export default Home;
