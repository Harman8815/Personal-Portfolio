"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutContent from "./AboutContent";
import MajorProjectsContent from "./MajorProjectsContent";
import ExperienceBloom from "../pages/experience/ExperienceBloom";

const PortfolioScroll = () => {
  const sectionRef = useRef(null);

  // About section refs
  const aboutRefs = {
    circleRef: useRef(null),
    introTextRef: useRef(null),
    coreIdentityRef: useRef(null),
    scrollArrowRef: useRef(null),
    skillsContainerRef: useRef(null),
    skillsHeaderRef: useRef(null),
    skillsCloudRef: useRef(null),
    skillsTiersRef: useRef(null),
  };

  // MajorProjects section refs
  const projectsRefs = {
    containerRef: useRef(null),
    wheelRef: useRef(null),
    wheelItemsRef: useRef([]),
    cardContainerRef: useRef(null),
    headerRef: useRef(null),
    scrollIndicatorRef: useRef(null),
  };

  // Experience Bloom section refs
  const experienceRefs = {
    containerRef: useRef(null),
    wheelRef: useRef(null),
    headerRef: useRef(null),
    centerRef: useRef(null),
  };

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);

  // Use a ref to track the last index we set, to avoid redundant state updates in onUpdate
  const lastIndexRef = useRef(0);
  const projectsVisibleRef = useRef(false);
  const experienceVisibleRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // 🚀 BUG FIX: Sync visibility with timeline labels.
            if (progress > 0.35) {
              if (!projectsVisibleRef.current) {
                projectsVisibleRef.current = true;
                setProjectsVisible(true);
              }
            } else if (projectsVisibleRef.current) {
              projectsVisibleRef.current = false;
              setProjectsVisible(false);
              // Reset index when scrolling back up past projects
              lastIndexRef.current = 0;
              setActiveProjectIndex(0);
            }

            // Experience bloom visibility
            if (progress > 0.75) {
              if (!experienceVisibleRef.current) {
                experienceVisibleRef.current = true;
                setExperienceVisible(true);
              }
            } else if (experienceVisibleRef.current) {
              experienceVisibleRef.current = false;
              setExperienceVisible(false);
            }
          },
        },
      });

      // === INITIAL STATES ===

      // About section initial states
      gsap.set(".step-card", { opacity: 0, x: -50, filter: "blur(10px)" });
      gsap.set(aboutRefs.circleRef.current, {
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        width: "min(60vw, 500px)",
        height: "min(60vw, 500px)",
        position: "absolute",
        zIndex: 20,
      });
      gsap.set(aboutRefs.coreIdentityRef.current, {
        opacity: 0,
        y: 20,
      });

      // Skills initial states - Absolute positioning to avoid layout shifts
      gsap.set(aboutRefs.skillsContainerRef.current, {
        visibility: "hidden",
        opacity: 0,
        position: "absolute",
        inset: 0,
        zIndex: 40,
      });

      gsap.set(aboutRefs.skillsHeaderRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(aboutRefs.skillsCloudRef.current, {
        opacity: 0,
        scale: 0.5,
        filter: "blur(20px)",
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(aboutRefs.skillsTiersRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100%",
        maxWidth: "1200px",
      });

      // Projects initial states
      gsap.set(projectsRefs.containerRef.current, {
        opacity: 0,
        position: "absolute",
        inset: 0,
        zIndex: 50,
      });

      gsap.set(projectsRefs.headerRef.current, {
        opacity: 0,
        scale: 0.2,
        y: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(projectsRefs.wheelRef.current, {
        opacity: 0,
        scale: 0.5,
        rotate: 0,
        x: "50vw",
      });

      gsap.set(projectsRefs.cardContainerRef.current, {
        opacity: 0,
        x: "-50vw",
        scale: 0.8,
      });

      // Experience Bloom initial states
      gsap.set(experienceRefs.containerRef.current, {
        opacity: 0,
        position: "absolute",
        inset: 0,
        zIndex: 60,
      });

      gsap.set(experienceRefs.headerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(experienceRefs.wheelRef.current, {
        opacity: 0,
        scale: 0.3,
        rotate: 0,
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(experienceRefs.centerRef.current, {
        opacity: 0,
        scale: 0,
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(".experience-petal", {
        opacity: 0,
        scale: 0.2,
        rotate: 0,
      });

      // === TIMELINE CONSTRUCTION ===

      // 1. INTRO (About Phase 1)
      tl.to(aboutRefs.introTextRef.current, { opacity: 0, y: -50, duration: 2 })

        // Step 1: Circle to bottom-right, reveal first card
        .addLabel("step1")
        .to(
          aboutRefs.circleRef.current,
          {
            x: "30vw",
            y: "25vh",
            scale: 0.6,
            duration: 3,
            ease: "power2.inOut",
          },
          "step1",
        )
        .to(
          aboutRefs.coreIdentityRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "step1+=1",
        )
        .to(
          "#card-0",
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 2 },
          "step1+=1",
        )

        // Step 2: Circle to top-left, reveal second card
        .addLabel("step2")
        .to(
          aboutRefs.circleRef.current,
          {
            x: "-30vw",
            y: "-25vh",
            scale: 0.5,
            duration: 3,
            ease: "power2.inOut",
          },
          "step2",
        )
        .to(
          "#card-0",
          { opacity: 0, x: -50, filter: "blur(10px)", duration: 1 },
          "step2",
        )
        .to(
          "#card-1",
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 2 },
          "step2+=0.5",
        )

        // Step 3: Circle to center-right, reveal third card
        .addLabel("step3")
        .to(
          aboutRefs.circleRef.current,
          {
            x: "25vw",
            y: "0",
            scale: 0.7,
            duration: 3,
            ease: "power2.inOut",
          },
          "step3",
        )
        .to(
          "#card-1",
          { opacity: 0, x: 50, filter: "blur(10px)", duration: 1 },
          "step3",
        )
        .to(
          "#card-2",
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 2 },
          "step3+=0.5",
        )

        // 2. SKILLS ENTRANCE (ENTRY FLOW: Phase 1 - 4)
        .addLabel("skills-entrance")

        // Phase 1 — Cross Transition: About zooms out, Skills header zooms in
        .to(
          "#card-2",
          { opacity: 0, scale: 0.8, filter: "blur(20px)", duration: 2 },
          "skills-entrance",
        )
        .to(
          aboutRefs.circleRef.current,
          {
            x: 0,
            y: 0,
            scale: 50,
            opacity: 0,
            duration: 4,
            ease: "power3.in",
          },
          "skills-entrance",
        )
        .set(
          aboutRefs.skillsContainerRef.current,
          { visibility: "visible", opacity: 1 },
          "skills-entrance+=2.5",
        )

        // Header zooms in from center
        .fromTo(
          aboutRefs.skillsHeaderRef.current,
          { opacity: 0, scale: 0, y: 0 },
          { opacity: 1, scale: 1, duration: 3, ease: "expo.out" },
          "skills-entrance+=2.5",
        )

        // Phase 2 — Header Placement: Header moves to top
        .addLabel("skills-header-placement")
        .to(
          aboutRefs.skillsHeaderRef.current,
          {
            y: "-43vh",
            duration: 3,
            ease: "power3.inOut",
          },
          "skills-header-placement",
        )

        // Phase 3 — Skill Cloud Formation: Cloud zooms in while header moves
        .addLabel("skills-cloud-formation", "skills-header-placement+=0.5")
        .fromTo(
          aboutRefs.skillsCloudRef.current,
          { opacity: 0, scale: 0, x: 0, y: 0 },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            x: "30vw",
            y: "5vh",
            duration: 4,
            ease: "back.out(1.2)",
          },
          "skills-cloud-formation",
        )

        // Phase 4 — Skill Cards Assembly: Dynamic construction with stagger
        .addLabel("skills-cards-assembly")
        .fromTo(
          aboutRefs.skillsTiersRef.current,
          { opacity: 0, scale: 0.8, x: 0, y: 0 },
          {
            opacity: 1,
            scale: 1,
            x: "-15vw",
            y: "5vh",
            duration: 4,
            ease: "power3.out",
          },
          "skills-cards-assembly",
        )
        .fromTo(
          ".skill-card-container",
          {
            opacity: 0,
            scale: 0.5,
            x: (i) => (i % 2 === 0 ? -500 : 500),
            y: (i) => i * 100 - 200,
            rotateZ: (i) => (i % 2 === 0 ? -15 : 15),
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotateZ: 0,
            stagger: { amount: 2, from: "center" },
            duration: 3,
            ease: "back.out(1.4)",
          },
          "skills-cards-assembly+=0.8",
        )

        .to({}, { duration: 5 }, "skills-hold") // Buffer for reading skills

        // SKILLS EXIT (EXIT FLOW: Phase 5 - 7)
        .addLabel("skills-exit")

        // Phase 5 — Header Exit: Header moves upward further and fades out
        .to(
          aboutRefs.skillsHeaderRef.current,
          {
            y: "-100vh",
            opacity: 0,
            duration: 3,
            ease: "power2.in",
          },
          "skills-exit",
        )

        // Phase 6 — Skill Tier (Cloud) Collapse: Cloud shrinks and fades
        .to(
          aboutRefs.skillsCloudRef.current,
          {
            scale: 0,
            opacity: 0,
            filter: "blur(20px)",
            duration: 3,
            ease: "power2.in",
          },
          "skills-exit+=0.4",
        )

        // Phase 7 — Skill Cards Disassembly: Clean disassembly scatter
        .to(
          ".skill-card-container",
          {
            opacity: 0,
            scale: 0.5,
            z: -1000,
            x: (_i) => (Math.random() - 0.5) * 3000,
            y: (_i) => (Math.random() - 0.5) * 3000,
            rotate: () => (Math.random() - 0.5) * 720,
            stagger: { amount: 1.5, from: "random" },
            duration: 4,
            ease: "power4.in",
          },
          "skills-exit",
        )

        // Final cleanup of the container before projects
        .to(
          aboutRefs.skillsContainerRef.current,
          { opacity: 0, duration: 1 },
          "skills-exit+=3.5",
        )

        // Ensure circle is totally gone if any trace remains
        .set(aboutRefs.circleRef.current, { display: "none" })

        // 4. MAJOR PROJECTS
        // 🚀 BUG FIX: Trigger start simultaneously with skills exit to ensure zero black gap
        .addLabel("projects-start", "skills-exit")

        // Ensure projects container is ready
        .to(
          projectsRefs.containerRef.current,
          { opacity: 1, duration: 1 },
          "projects-start",
        )

        // Header Animation: Emerge from center with dramatic zoom
        .fromTo(
          projectsRefs.headerRef.current,
          { opacity: 0, scale: 0.2, y: 0, yPercent: -50 },
          { opacity: 1, scale: 1, duration: 3, ease: "back.out(1.6)" },
          "projects-start",
        )

        // Header moves upward to its final top position
        .to(
          projectsRefs.headerRef.current,
          {
            y: "-38vh",
            duration: 2.5,
            ease: "power3.inOut",
          },
          "projects-start+=3",
        )

        // Wheel comes from right (starts after header scale completes)
        .addLabel("projects-reveal", "projects-start+=3")
        .fromTo(
          projectsRefs.wheelRef.current,
          { opacity: 0, scale: 0.5, x: "50vw", rotate: 0 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 3,
            ease: "power3.out",
          },
          "projects-reveal",
        )

        // Cards come from left (starts after header scale completes)
        .fromTo(
          projectsRefs.cardContainerRef.current,
          { opacity: 0, x: "-50vw", scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 3,
            ease: "power3.out",
          },
          "projects-reveal+0.5",
        )

        // 🌀 CONTINUOUS WHEEL ROTATION
        // We have 5 projects, so we rotate (5-1) segments.
        // Rotation is negative to feel like it's pulling the next one from the bottom/right.
        .addLabel("projects-rotation")
        .to(
          projectsRefs.wheelRef.current,
          {
            rotate: -288, // 4 gaps of 72deg = 288deg to reach project 5
            duration: 20,
            ease: "none",
            onUpdate: function () {
              const self = this;
              const progress = self.progress();

              // Sync the CSS variable with the current rotation for child counter-rotation
              const rot = gsap.getProperty(self.targets()[0], "rotate");
              self
                .targets()[0]
                .style.setProperty("--wheel-rotation", rot + "deg");

              // 🚀 BUG FIX: Derive index from rotation progress
              // We have 5 projects. We want index to be 0 for while, then 1, 2, 3, 4.
              const newIndex = Math.min(Math.floor(progress * 5), 4);
              if (newIndex !== lastIndexRef.current) {
                lastIndexRef.current = newIndex;
                setActiveProjectIndex(newIndex);
              }
            },
          },
          "projects-rotation",
        )

        .to({}, { duration: 5 }) // Final buffer before exit

        // 5. MAJOR PROJECTS EXIT - HORIZONTAL SPLIT TRANSITION
        .addLabel("projects-exit")

        // Background transition: dim only (no blur for experience section)
        .to(
          sectionRef.current,
          {
            opacity: 0.9,
            duration: 3,
            ease: "power2.inOut",
          },
          "projects-exit",
        )

        // Horizontal Split: Wheel moves left (mirror of entrance)
        .to(
          projectsRefs.wheelRef.current,
          {
            x: "-50vw",
            scale: 0.3,
            rotate: "-=180",
            opacity: 0,
            duration: 4,
            ease: "power3.inOut",
          },
          "projects-exit+=0.5",
        )

        // Horizontal Split: Cards move right (mirror of entrance)
        .to(
          projectsRefs.cardContainerRef.current,
          {
            x: "60vw",
            scale: 0.4,
            opacity: 0,
            duration: 4,
            ease: "power3.inOut",
          },
          "projects-exit+=0.8",
        )

        // Header fades out upward
        .to(
          projectsRefs.headerRef.current,
          {
            y: "-60vh",
            opacity: 0,
            scale: 0.8,
            duration: 3,
            ease: "power2.in",
          },
          "projects-exit+=1",
        )

        // Container cleanup
        .to(
          projectsRefs.containerRef.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "projects-exit+=3",
        )

        .to({}, { duration: 2 }) // Final buffer for smooth transition

        // 6. EXPERIENCE BLOOM FORMATION
        .addLabel("experience-bloom-start")

        // Container fade in with clear filter
        .to(
          experienceRefs.containerRef.current,
          { opacity: 1, filter: "blur(0px)", duration: 2 },
          "experience-bloom-start",
        )

        // Wheel Re-Center: Bring wheel back to center smoothly
        .addLabel("wheel-recenter")
        .to(
          experienceRefs.wheelRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 4,
            ease: "power2.inOut",
          },
          "wheel-recenter",
        )

        // Center decorative element appears
        .to(
          experienceRefs.centerRef.current,
          {
            opacity: 0.8,
            scale: 1,
            duration: 3,
            ease: "back.out(1.3)",
          },
          "wheel-recenter+=1",
        )

        // Header emerges from center
        .fromTo(
          experienceRefs.headerRef.current,
          { opacity: 0, scale: 0.5, y: 0 },
          { opacity: 1, scale: 1, duration: 4, ease: "expo.out" },
          "wheel-recenter+=1.5",
        )

        // Header moves to top position
        .to(
          experienceRefs.headerRef.current,
          {
            y: "-35vh",
            duration: 3,
            ease: "power3.inOut",
          },
          "wheel-recenter+=5.5",
        )

        // Bloom Formation: Petals expand radially with stagger
        .addLabel("bloom-formation", "wheel-recenter+=2")
        .to(
          ".experience-petal",
          {
            opacity: 1,
            scale: 1,
            rotate: (i) => (i % 2 === 0 ? 5 : -5), // Slight elegant rotation
            stagger: { amount: 2, from: "center" },
            duration: 3,
            ease: "back.out(1.4)",
          },
          "bloom-formation",
        )

        // Subtle bloom motion: gentle rotation and scale pulsing
        .addLabel("bloom-motion", "bloom-formation+=2")
        .to(
          experienceRefs.wheelRef.current,
          {
            rotate: 15,
            duration: 8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          "bloom-motion",
        )
        .to(
          ".experience-petal",
          {
            scale: 1.05,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            stagger: { amount: 1, from: "center" },
          },
          "bloom-motion",
        )

        .to({}, { duration: 5 }); // Hold the bloom for viewing
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // EMPTIED DEPS to prevent killing/rebuilding timeline mid-scroll

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-primary text-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* About Content - Contains Intro, Phase Cards, and Skills Overlay */}
      <AboutContent refs={aboutRefs} />

      {/* Major Projects Content - Wrapped in absolute div for stability */}
      <div
        className="absolute inset-0"
        style={{
          visibility: projectsVisible ? "visible" : "hidden",
          opacity: projectsVisible ? 1 : 0,
          pointerEvents: projectsVisible ? "auto" : "none",
        }}
      >
        <MajorProjectsContent
          refs={projectsRefs}
          activeIndex={activeProjectIndex}
          cardsAnimated={projectsVisible}
          setActiveIndex={setActiveProjectIndex}
        />
      </div>

      {/* Experience Bloom Content */}
      <ExperienceBloom refs={experienceRefs} visible={experienceVisible} />
    </section>
  );
};

export default PortfolioScroll;
