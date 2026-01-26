import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCloud from "../skills/SkillCloud";
import SkillTiers from "../skills/SkillTiers";
import { slugs } from "../../data";

const steps = [
  {
    id: "step-1",
    title: "The Intent",
    label: "PHASE_01",
    desc: "Designing immersive digital experiences where aesthetics and purpose coexist. Every motion, transition, and interaction is intentional—nothing exists without meaning.",
  },
  {
    id: "step-2",
    title: "Engineering Mindset",
    label: "PHASE_02",
    desc: "Performance drives every decision. From optimized render pipelines to modern low-level tooling, visual depth is achieved without sacrificing speed or control.",
  },
  {
    id: "step-3",
    title: "Scalable by Nature",
    label: "PHASE_03",
    desc: "Built for growth, stress, and real-world traffic. Architectures are modular, resilient, and future-proof—ready to evolve without breaking.",
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const introTextRef = useRef(null);
  const coreIdentityRef = useRef(null);
  const scrollArrowRef = useRef(null);

  // Skills Refs
  const skillsContainerRef = useRef(null);
  const skillsHeaderRef = useRef(null);
  const skillsCloudRef = useRef(null);
  const skillsTiersRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          // pinSpacing: false,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial state
      gsap.set(".step-card", { opacity: 0, x: -50, filter: "blur(10px)" });
      gsap.set(circleRef.current, {
        scale: 1,
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "min(60vw, 500px)",
        height: "min(60vw, 500px)",
      });

      gsap.set(coreIdentityRef.current, {
        opacity: 0,
        y: 10,
      });
      gsap.set(".scroll-arrow", { y: 0, opacity: 0.4 });

      gsap.to(".scroll-arrow", {
        y: 8,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
      });
      gsap.to(scrollArrowRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=10% top",
        },
      });
      // Skills components - Initially centered and hidden
      gsap.set(skillsContainerRef.current, {
        visibility: "hidden",
        opacity: 0,
      });

      // FIXED ENTRANCE STATES: Positioned at viewport center (50/50)
      gsap.set(skillsHeaderRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0,
        zIndex: 100,
      });

      gsap.set(skillsCloudRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0,
        filter: "blur(40px)",
        zIndex: 90,
      });

      gsap.set(skillsTiersRef.current, { opacity: 0 });
      gsap.set(".skill-card-container", { opacity: 0, x: -100, scale: 0.9 });
      // 1. Initial Intro Phase: "Want to know me?"
      // As we start scrolling, the text fades out and circle begins its journey.
      tl.addLabel("stack-start", "-=2");

      tl.to(introTextRef.current, { opacity: 0, y: -20, duration: 1 })

        // 2. Journey to Bottom-Right (Step 1)
        .to(
          circleRef.current,
          {
            left: "85%",
            top: "80%",
            scale: 0.5,
            duration: 2,
            ease: "power2.inOut",
          },
          "step1",
        )
        .to(
          coreIdentityRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "step1+=0.6",
        )
        .to(
          "#card-0",
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1 },
          "step1+=0.5",
        )

        // 3. Journey to Top-Left (Step 2)
        .to(
          circleRef.current,
          {
            left: "15%",
            top: "20%",
            scale: 0.45,
            duration: 2,
            ease: "power2.inOut",
          },
          "step2",
        )
        .to(
          "#card-0",
          { opacity: 0, x: -50, filter: "blur(10px)", duration: 0.5 },
          "step2",
        )
        .to(
          "#card-1",
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            left: "auto",
            right: "10%",
          },
          "step2+=0.5",
        )

        // 4. Journey to Center-Right (Step 3)
        .to(
          circleRef.current,
          {
            left: "80%",
            top: "50%",
            scale: 0.6,
            duration: 2,
            ease: "power2.inOut",
          },
          "step3",
        )
        .to(
          "#card-1",
          { opacity: 0, x: 50, filter: "blur(10px)", duration: 0.5 },
          "step3",
        )
        .to(
          "#card-2",
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1 },
          "step3+=0.5",
        )

        // 5. Return to Center & Final Zoom
        .to("#card-2", { opacity: 0, duration: 0.5 }, "exit")
        .to(
          circleRef.current,
          {
            left: "50%",
            top: "50%",
            scale: 0.1,
            opacity: 0.5,
            duration: 1.5,
            ease: "power3.in",
          },
          "exit",
        )
        .to(
          circleRef.current,
          {
            scale: 40,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "stack",
        );

      // --- PART 2: THE STACKED TRANSITION (ZOOM FROM CAMERA) ---
      tl.to(
        "#card-2",
        { opacity: 0, scale: 0.8, filter: "blur(15px)", duration: 1.5 },
        "transition-start",
      )
        .to(
          circleRef.current,
          {
            left: "50%",
            top: "50%",
            scale: 60,
            opacity: 0,
            duration: 3,
            ease: "power4.in",
          },
          "transition-start",
        )

        // Activate Skills Container Early
        .set(
          skillsContainerRef.current,
          { visibility: "visible", opacity: 1 },
          "transition-start",
        )
        // 1. Header Zooms in from EXACT viewport center
        .to(skillsHeaderRef.current, {
          opacity: 1,
          scale: 2,
          duration: 2,
          ease: "expo.out",
        })

        // 2. Header shifts UP to its final position (Y move)
        .to(
          skillsHeaderRef.current,
          {
            top: "10%",
            scale: 1,
            duration: 2,
            ease: "power3.inOut",
          },
          "header-move",
        )

        // 3. Skill Cloud zooms in at the SAME viewport center
        .to(
          skillsCloudRef.current,
          {
            opacity: 1,
            scale: 1.5,
            filter: "blur(0px)",
            duration: 2.5,
            ease: "expo.out",
          },
          "header-move",
        )

        // 4. Cloud L-Path: Horizontal move (X) to the right while maintaining Y
        .to(
          skillsCloudRef.current,
          {
            left: "70%", // Final horizontal position
            scale: 1,
            duration: 2.5,
            ease: "power4.inOut",
          },
          "cloud-drift",
        )

        // 5. Reveal Skill Cards Assembly (Grid)
        .to(
          skillsTiersRef.current,
          {
            right: "30%",
            scale: 1,
            opacity: 1,
            duration: 1.5,
          },
          "cloud-drift+=1",
        )

        .to(
          ".skill-card-container",
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.2,
            duration: 2,
            ease: "back.out(1.2)",
          },
          "cloud-drift+=1.5",
        );

      // Final cleanup: Switch fixed elements to relative/absolute flow for resizing stability
      // .set(skillsHeaderRef.current, {
      //   position: "relative",
      //   top: "auto",
      //   left: "auto",
      //   xPercent: 0,
      //   yPercent: 0,
      // })
      // .set(skillsCloudRef.current, {
      //   position: "relative",
      //   top: "auto",
      //   left: "auto",
      //   xPercent: 0,
      //   yPercent: 0,
      // })
      // .set(skillsContainerRef.current, { display: "block" }); // Ensure layout is settled
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#020617] overflow-hidden min-h-screen border-t border-slate-900"
    >
      <div className="h-screen w-full relative flex items-center justify-center">
        {/* The Animated Circle */}
        <div
          ref={circleRef}
          className="absolute flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl shadow-[0_0_100px_rgba(34,211,238,0.1)] z-20 pointer-events-none"
        >
          <div className="absolute inset-2 rounded-full border border-white/5" />
          <div
            ref={coreIdentityRef}
            className="flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-12 h-[1px] bg-cyan-500 mb-4 "></div>
            <span className="font-mono text-2xl md:text-3xl text-center tracking-[0.5em] text-cyan-400 uppercase font-black">
              ORIGIN
            </span>
          </div>
        </div>

        {/* Initial Intro State */}
        <div
          ref={introTextRef}
          className="relative z-30 text-center pointer-events-none "
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Want to <br /> know me?
          </h2>
          <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
            <span className="font-mono text-md font-bold tracking-[0.6em] uppercase text-cyan-500">
              Scroll to begin
            </span>
            <div
              ref={scrollArrowRef}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span className="scroll-arrow block w-3 h-3 border-b border-r border-cyan-500 rotate-45 mb-1"></span>
              <span className="scroll-arrow block w-3 h-3 border-b border-r border-cyan-500 rotate-45 opacity-60"></span>
            </div>
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
                  left: i % 2 === 0 ? "5%" : "auto",
                  right: i % 2 === 0 ? "auto" : "5%",
                  textAlign: i % 2 === 0 ? "left" : "right",
                }}
              >
                <div
                  className={`flex items-center gap-4 mb-6 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}
                >
                  <span className="font-mono text-xs text-cyan-500 tracking-[0.5em] uppercase font-black">
                    {step.label}
                  </span>
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
        {/* LAYER 2: SKILLS STACK (Transition Target) */}
        <div
          ref={skillsContainerRef}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 md:px-20 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col py-24">
            {/* Header: Centered fixed entrance via ref style, then transitions to flex flow */}
            <div
              ref={skillsHeaderRef}
              className="flex flex-col items-center mb-20 text-center pointer-events-auto shrink-0 relative z-50"
            >
              <span className="font-mono text-[11px] tracking-[0.8em] uppercase text-cyan-500 mb-3">
                Competency_Matrix
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Stack_Capabilities
              </h2>
              <div className="h-[2px] w-32 bg-cyan-500 mt-3 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 pointer-events-auto flex-1 w-full relative">
              {/* Cards Assembly */}
              <div
                ref={skillsTiersRef}
                className="w-full lg:w-3/5 order-2 lg:order-1 relative z-40"
              >
                <SkillTiers />
              </div>

              {/* Icon Cloud */}
              <div
                ref={skillsCloudRef}
                className="w-full lg:w-2/5 flex justify-center order-1 lg:order-2 z-30 relative"
              >
                <div className="w-full max-w-[500px]">
                  <SkillCloud slugs={slugs} />
                </div>
              </div>
            </div>
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
