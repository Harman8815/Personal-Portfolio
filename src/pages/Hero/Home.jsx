"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { Suspense, useRef, useEffect, useState } from "react";

import { Stars, Float } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelLoader from "./ModelLoader.jsx";
import { useLoadingContext } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ onLoad, onLoaderExit }) => {
  const videoContainer = useRef(null);
  const LaptopRef = useRef();
  const contentLoadedRef = useRef(false);
  const [shouldAnimateLaptop, setShouldAnimateLaptop] = useState(false);
  const [laptopFullyLoaded, setLaptopFullyLoaded] = useState(false);
  const { markContentReady } = useLoadingContext();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.6, scale: 1, duration: 3, ease: "power2.out" },
      );
    }

    if (onLoaderExit) {
      const timer = setTimeout(() => {
        setShouldAnimateLaptop(true);
        onLoad?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [onLoaderExit, onLoad]);
  useEffect(() => {
    const video = videoContainer.current;
    // Initial entrance animation on first load
    gsap.fromTo(
      video,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
    );
  }, []);

  // Trigger laptop animation when loader exits
  useEffect(() => {
    if (onLoaderExit) {
      console.log("[HomeHero] Loader exited, triggering laptop animation");
      setShouldAnimateLaptop(true);
    }
  }, [onLoaderExit]);

  useEffect(() => {
    console.log(
      "[HomeHero] useEffect mounting - setting up readiness callback",
    );
    // Mark content as ready when component mounts and all resources have time to load
    const timer = setTimeout(() => {
      console.log(
        "[HomeHero] 800ms timeout reached - calling markContentReady",
      );
      if (!contentLoadedRef.current) {
        contentLoadedRef.current = true;
        console.log("[HomeHero] Calling markContentReady()");
        markContentReady();
        console.log("[HomeHero] Called onLoad callback");
        onLoad?.();
      }
    }, 800); // Wait for Canvas and models to initialize

    return () => {
      console.log("[HomeHero] useEffect cleanup - clearing timeout");
      clearTimeout(timer);
    };
  }, [markContentReady, onLoad]);

  return (
    <section
      id="home"
      className="bg-home min-h-screen w-full flex flex-col items-center justify-center relative"
    >
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="rotate-180 z-1 w-full h-auto absolute -top-[285px]
        laptop:-top-[425px] desktop:-top-[495px]  left-0"
        ref={videoContainer}
      >
        <source src="/assets/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`image z-3 max-h-screen overflow-hidden absolute -top-40 left-0 w-[100%] mix-blend-exclusion transition-opacity duration-1000 ${laptopFullyLoaded ? "block" : "hidden"}`}
      >
        <img
          src="/assets/starsky1.webp"
          alt=""
          className="object-cover w-[100%]"
        />
      </div>
      <div className="z-6 info text-left mb-10 desktop:mx-10 absolute top-[30%] left-10">
        <h1 className="desktop:text-6xl laptop:text-5xl font-extrabold text-white leading-tight tracking-wide">
          Hi, I'm Harman
        </h1>
        <p className="desktop:text-xl laptop:text-lg text-gray-200 mt-4">
          Full Stack Developer crafting seamless web experiences
        </p>
        <a
          href="#about"
          className="mt-6 inline-block bg-white text-gray-900 px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
        >
          Discover More
        </a>
      </div> */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen opacity-40"
        >
          <source src="/assets/video.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-nebula-in-space-background-2724-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-80" />
      </div>

      <div className="z-6 laptopmodel w-full h-screen overflow-hidden">
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
          camera={{ position: [0, 2, -12], fov: 32 }}
        >
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <ambientLight intensity={0.5} />
          <hemisphereLight
            color="#22d3ee"
            groundColor="#000000"
            intensity={0.8}
          />

          <spotLight
            position={[5, 15, 5]}
            intensity={2.5}
            angle={0.3}
            penumbra={1}
            color="#22d3ee"
            castShadow
          />
          <pointLight position={[-5, 5, -5]} intensity={1.5} color="#6366f1" />

          <OrbitControls
            enableZoom={false}
            // minPolarAngle={Math.PI / 4}
            // maxPolarAngle={Math.PI / 1.8}
            // minAzimuthAngle={-Math.PI / 4}
            // maxAzimuthAngle={Math.PI / 4}
            enablePan={false}
            makeDefault
          />

          <Suspense fallback={<ModelLoader />}>
            <group position={[0, 0, 0]}>
              {/* <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}> */}
              <Laptop
                LaptopRef={LaptopRef}
                shouldAnimate={shouldAnimateLaptop}
                onLoadComplete={() => setLaptopFullyLoaded(true)}
              />
              {/* </Float> */}
            </group>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Home;
