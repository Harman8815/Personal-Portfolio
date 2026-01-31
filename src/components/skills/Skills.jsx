import React from "react";
import SkillCloud from "./SkillCloud";
import SkillTiers from "./SkillTiers";
import { slugs } from "../../data";
import { useState, useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
const Skills = () => {
  const skillsRef = useRef(null);
  const tiersRef = useRef(null);
  const cloudRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 100%",
          end: "top 100%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial states
      gsap.set(cloudRef.current, {
        y: -2000,
        x: -100,
        scale: 0.6,
        opacity: 0,
      });

      gsap.set(tiersRef.current, {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
      });

      // SkillCloud enters first
      tl.to(cloudRef.current, {
        y: 0,
        x: 120,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      });

      // SkillTiers assembles
      tl.to(
        tiersRef.current,
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6",
      );

      // Optional: animate grid items individually
      tl.from(
        ".skill-tier-item",
        {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={skillsRef}
      className="relative w-full py-32 text-white px-6 overflow-x-hidden"
    >
      <h2 className="text-6xl font-bold text-center pb-20">Skills</h2>

      <div className="relative flex flex-row gap-10 items-start">
        <div ref={tiersRef} className="flex-1">
          <SkillTiers />
        </div>

        <div ref={cloudRef} className="flex-1">
          <SkillCloud slugs={slugs} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
