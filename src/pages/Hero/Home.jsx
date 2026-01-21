"use client";

import React  from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { Suspense, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelLoader from "./ModelLoader.jsx";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const videoContainer = useRef(null);
  const LaptopRef = useRef();
  React.useEffect(() => {
    const video = videoContainer.current;
    // const laptop=LaptopRef.current;
    // Initial entrance animation on first load
    gsap.fromTo(
      video,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        
      }
    );
  }, []);

  return (
    <section
      id="home"
      className="bg-home min-h-screen w-full flex flex-col items-center justify-center relative"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="rotate-180 z-1 w-full h-auto absolute -top-133
        laptop:-top-96 desktop:-top-135  left-0"
        ref={videoContainer}
      >
        <source src="/assets/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="image z-3 max-h-screen overflow-hidden absolute -top-40 left-0 w-[100%] mix-blend-exclusion ">
        <img
          src="/assets/starsky1.webp"
          alt=""
          className="object-cover w-[100%] opacity-30 "
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
      </div>

      <div className="z-6 laptopmodel w-full h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
          <hemisphereLight
            skyColor="skyblue"
            groundColor="darkblue"
            intensity={2}
          />
          <pointLight
            position={[0, 1, -10.5]}
            intensity={13}
            color="blue"
            castShadow
          />
          <directionalLight
            position={[0, 10, 2]}
            color="mediumblue"
            intensity={0.6}
            castShadow
          />

          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
          />

          <Suspense fallback={<ModelLoader />}>
            <Center />
            <Laptop LaptopRef={LaptopRef}/>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Home;
