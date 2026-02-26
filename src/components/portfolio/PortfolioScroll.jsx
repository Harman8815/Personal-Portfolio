"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutContent from "./AboutContent";
import MajorProjectsContent from "./MajorProjectsContent";
import ExperienceBloom from "../pages/experience/ExperienceBloom";
import Education from "../pages/education/Education";

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
    linesContainerRef: useRef(null),
    clockHandRef: useRef(null),
    line45Ref: useRef(null),
    line135Ref: useRef(null),
    line225Ref: useRef(null),
    line315Ref: useRef(null),
    card45Ref: useRef(null),
    card135Ref: useRef(null),
    card225Ref: useRef(null),
    card315Ref: useRef(null),
  };

  // Education section refs
  const educationRefs = {
    containerRef: useRef(null),
    headerRef: useRef(null),
    card1Ref: useRef(null),
    card2Ref: useRef(null),
    card3Ref: useRef(null),
  };

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);

  // Use a ref to track the last index we set, to avoid redundant state updates in onUpdate
  const lastIndexRef = useRef(0);
  const projectsVisibleRef = useRef(false);
  const experienceVisibleRef = useRef(false);
  const educationVisibleRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800%", // Increased to accommodate Education section
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

            // Experience bloom visibility - updated to match synchronized transition
            if (progress > 0.65) {
              if (!experienceVisibleRef.current) {
                experienceVisibleRef.current = true;
                setExperienceVisible(true);
              }
            } else if (experienceVisibleRef.current) {
              experienceVisibleRef.current = false;
              setExperienceVisible(false);
            }

            // Education section visibility
            if (progress > 0.75) {
              if (!educationVisibleRef.current) {
                educationVisibleRef.current = true;
                setEducationVisible(true);
              }
            } else if (educationVisibleRef.current) {
              educationVisibleRef.current = false;
              setEducationVisible(false);
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

      // Education section initial states
      gsap.set(educationRefs.containerRef.current, {
        opacity: 0,
        position: "absolute",
        inset: 0,
        zIndex: 70,
      });

      gsap.set(educationRefs.headerRef.current, {
        opacity: 0,
        scale: 0.2,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(educationRefs.card1Ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      gsap.set(educationRefs.card2Ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      gsap.set(educationRefs.card3Ref.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
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

        .to({}, { duration: 5 }) // Final buffer before transition

        // 6. SYNCHRONIZED WHEEL TRANSITION - MAJOR PROJECTS EXIT + EXPERIENCE ENTRY OVERLAP
        .addLabel("wheel-transition")

        // Background transition: dim only (no blur for experience section)
        .to(
          sectionRef.current,
          {
            opacity: 0.9,
            duration: 3,
            ease: "power2.inOut",
          },
          "wheel-transition",
        )

        // === MAJOR PROJECTS WHEEL MOVE TO CENTER (NO FADE YET) ===
        // Wheel moves to center first, maintaining full opacity
        .to(
          projectsRefs.wheelRef.current,
          {
            x: () => (window.innerWidth >= 768 ? "-28vw" : "0"), // Responsive centering
            duration: 2.5,
            ease: "power3.inOut",
          },
          "wheel-transition",
        )

        // === SYNCHRONIZED CROSS-FADE (CENTER POSITION) ===
        .addLabel("cross-fade", "wheel-transition+=2.5")

        // Major Projects wheel fades out from center
        .to(
          projectsRefs.wheelRef.current,
          {
            rotate: "-=45", // Subtle rotation during fade
            opacity: 0,
            duration: 2.5,
            ease: "power3.inOut",
          },
          "cross-fade",
        )

        // Experience wheel fades in at center (perfect cross-fade)
        .fromTo(
          experienceRefs.wheelRef.current,
          {
            opacity: 0,
            scale: 0.3,
            rotate: 45, // Mirror entry rotation
            x: 0,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0, // Neutral position
            x: 0,
            y: 0,
            duration: 2.5, // Same duration as Major Projects fade
            ease: "power3.inOut", // Same easing as Major Projects fade
          },
          "cross-fade", // Same start time for perfect cross-fade
        )

        // Experience container becomes visible
        .to(
          experienceRefs.containerRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          "wheel-transition+=0.5",
        )

        // === MAJOR PROJECTS CLEANUP ===
        // Cards fade out
        .to(
          projectsRefs.cardContainerRef.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "wheel-transition+=0.5",
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
          "wheel-transition+=0.5",
        )

        // Container cleanup
        .to(
          projectsRefs.containerRef.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "wheel-transition+=1.5",
        )

        // 7. EXPERIENCE WHEEL EXPANSION PHASE
        .addLabel("experience-expansion", "wheel-transition+=2")

        // Center decorative element appears
        .to(
          experienceRefs.centerRef.current,
          {
            opacity: 0.8,
            scale: 1,
            duration: 3,
            y: 10,
            ease: "back.out(1.3)",
          },
          "experience-expansion+=0.5",
        )

        // Header emerges from center (same pattern as previous sections)
        .fromTo(
          experienceRefs.headerRef.current,
          {
            opacity: 0,
            scale: 0.2, // Same entry scale as Major Projects header
            y: 0,
            yPercent: -50,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: "back.out(1.6)", // Same easing as Major Projects header
          },
          "experience-expansion+=0.5",
        )

        // 8. HEADER LIFT ANIMATION (CENTER → TOP)
        .addLabel("header-lift", "experience-expansion+=3.5")

        // Header moves to top position (mirroring Major Projects header animation)
        .to(
          experienceRefs.headerRef.current,
          {
            y: "-38vh", // Same translateY as Major Projects header
            duration: 2.5, // Same duration as Major Projects header
            ease: "power3.inOut", // Same easing as Major Projects header
          },
          "header-lift",
        )

        // 9. CLOCK-HAND FORMATION ANIMATION (after header moves up)
        .addLabel("clock-hand-formation", "header-lift+=0.5")

        // Part 1: Initial Line Spawn
        .to(
          experienceRefs.clockHandRef.current,
          {
            height: window.innerWidth >= 768 ? "19.25vw" : "15.4vw", // Increased by 10%
            duration: 0.8, // Short, sharp grow
            ease: "power2.out", // Same micro-ease as line/petal animations
          },
          "clock-hand-formation",
        )

        // Part 2: Clock-Hand Rotation + Line Duplication
        .addLabel("clock-hand-rotation", "clock-hand-formation+=0.5")

        // Rotate 45° → 135°
        .to(
          experienceRefs.clockHandRef.current,
          {
            rotation: 135,
            duration: 1.5,
            ease: "power1.inOut", // Smooth scrub-based rotation
          },
          "clock-hand-rotation",
        )

        // Clone at 45° and freeze
        .to(
          experienceRefs.line45Ref.current,
          {
            height: window.innerWidth >= 768 ? "19.25vw" : "15.4vw", // Increased by 10%
            opacity: 1,
            rotation: 45,
            duration: 0.3,
            ease: "power2.out",
          },
          "clock-hand-rotation+=0.1", // Clone immediately after rotation starts
        )

        // Show card for 45° line
        .to(
          experienceRefs.card45Ref.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "clock-hand-rotation+=0.2",
        )

        // Rotate 135° → 225°
        .to(
          experienceRefs.clockHandRef.current,
          {
            rotation: 225,
            duration: 1.5,
            ease: "power1.inOut",
          },
          "clock-hand-rotation+=1.5",
        )

        // Clone at 135° and freeze
        .to(
          experienceRefs.line135Ref.current,
          {
            height: window.innerWidth >= 768 ? "19.25vw" : "15.4vw", // Increased by 10%
            opacity: 1,
            rotation: 135,
            duration: 0.3,
            ease: "power2.out",
          },
          "clock-hand-rotation+=1.6",
        )

        // Show card for 135° line
        .to(
          experienceRefs.card135Ref.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "clock-hand-rotation+=1.7",
        )

        // Rotate 225° → 315°
        .to(
          experienceRefs.clockHandRef.current,
          {
            rotation: 315,
            duration: 1.5,
            ease: "power1.inOut",
          },
          "clock-hand-rotation+=3.0",
        )

        // Clone at 225° and freeze
        .to(
          experienceRefs.line225Ref.current,
          {
            height: window.innerWidth >= 768 ? "19.25vw" : "15.4vw", // Increased by 10%
            opacity: 1,
            rotation: 225,
            duration: 0.3,
            ease: "power2.out",
          },
          "clock-hand-rotation+=3.1",
        )

        // Show card for 225° line
        .to(
          experienceRefs.card225Ref.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "clock-hand-rotation+=3.2",
        )

        // Clone at 315° and freeze (final line)
        .to(
          experienceRefs.line315Ref.current,
          {
            height: window.innerWidth >= 768 ? "19.25vw" : "15.4vw", // Increased by 10%
            opacity: 1,
            rotation: 315,
            duration: 0.3,
            ease: "power2.out",
          },
          "clock-hand-rotation+=4.6",
        )

        // Show card for 315° line
        .to(
          experienceRefs.card315Ref.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "clock-hand-rotation+=4.7",
        )

        // Part 3: Kill rotation and hide clock hand immediately after 4th line
        .to(
          experienceRefs.clockHandRef.current,
          {
            opacity: 0, // Hide the rotating clock hand
            duration: 0.5,
            ease: "power2.in",
          },
          "clock-hand-rotation+=5.2", // Vanish after final card appears
        )

        .to({}, { duration: 5 }) // Hold for viewing

        // 10. SECONDARY BLOOM EXPANSION PHASE
        .addLabel("secondary-bloom-start")
        .call(() => console.log("Secondary bloom phase reached"), [], "secondary-bloom-start")

        // Phase 1 — Cards expand and reveal detailed content
        .addLabel("card-expansion", "secondary-bloom-start")
        
        // Card 45° expansion and content reveal
        .to(
          experienceRefs.card45Ref.current,
          {
            scale: 1.2, // Reduced scale for compact cards
            width: "18rem", // Compact width
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          experienceRefs.card45Ref.current,
          {
            transform: "rotate(45deg) translateY(-18vw) translateY(-2rem) rotate(-45deg) translateX(-2rem) translateY(-1rem)",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          gsap.utils.selector(experienceRefs.card45Ref.current)(".expanded-content"),
          {
            opacity: 1,
            maxHeight: "150px", // Compact height for 2 lines
            padding: "0 0.5rem 0.5rem 0.5rem",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "card-expansion+=0.5",
        )

        // Card 135° expansion and content reveal
        .to(
          experienceRefs.card135Ref.current,
          {
            scale: 1.2,
            width: "18rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          experienceRefs.card135Ref.current,
          {
            transform: "rotate(135deg) translateY(-18vw) translateY(-2rem) rotate(-135deg) translateX(-2rem) translateY(-2rem)",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          gsap.utils.selector(experienceRefs.card135Ref.current)(".expanded-content"),
          {
            opacity: 1,
            maxHeight: "150px",
            padding: "0 0.5rem 0.5rem 0.5rem",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "card-expansion+=0.7",
        )

        // Card 225° expansion and content reveal
        .to(
          experienceRefs.card225Ref.current,
          {
            scale: 1.2,
            width: "18rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          experienceRefs.card225Ref.current,
          {
            transform: "rotate(225deg) translateY(-18vw) translateY(-2rem) rotate(-225deg) translateX(-14rem) translateY(-2rem)",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          gsap.utils.selector(experienceRefs.card225Ref.current)(".expanded-content"),
          {
            opacity: 1,
            maxHeight: "150px",
            padding: "0 0.5rem 0.5rem 0.5rem",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "card-expansion+=0.9",
        )

        // Card 315° expansion and content reveal
        .to(
          experienceRefs.card315Ref.current,
          {
            scale: 1.2,
            width: "18rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          experienceRefs.card315Ref.current,
          {
            transform: "rotate(315deg) translateY(-18vw) translateY(-2rem) rotate(-315deg) translateX(-16rem) translateX(2rem) translateY(-1rem)",
            duration: 2,
            ease: "power2.inOut",
          },
          "card-expansion",
        )
        .to(
          gsap.utils.selector(experienceRefs.card315Ref.current)(".expanded-content"),
          {
            opacity: 1,
            maxHeight: "150px",
            padding: "0 0.5rem 0.5rem 0.5rem",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "card-expansion+=1.1",
        )

        // Phase 2 — Hold expanded state for viewing
        .to({}, { duration: 10 }) // Extended hold for reading detailed content

        // Phase 3 — Pre-Exit Content Hide and Card Recompression
        .addLabel("recompression-start")
        
        // Hide content first
        .to(
          gsap.utils.selector(experienceRefs.card45Ref.current)(".expanded-content"),
          {
            opacity: 0,
            maxHeight: "0",
            padding: "0 0.5rem 0 0.5rem",
            duration: 1,
            ease: "power2.inOut",
          },
          "recompression-start",
        )
        .to(
          gsap.utils.selector(experienceRefs.card135Ref.current)(".expanded-content"),
          {
            opacity: 0,
            maxHeight: "0",
            padding: "0 0.5rem 0 0.5rem",
            duration: 1,
            ease: "power2.inOut",
          },
          "recompression-start+=0.2",
        )
        .to(
          gsap.utils.selector(experienceRefs.card225Ref.current)(".expanded-content"),
          {
            opacity: 0,
            maxHeight: "0",
            padding: "0 0.5rem 0 0.5rem",
            duration: 1,
            ease: "power2.inOut",
          },
          "recompression-start+=0.4",
        )
        .to(
          gsap.utils.selector(experienceRefs.card315Ref.current)(".expanded-content"),
          {
            opacity: 0,
            maxHeight: "0",
            padding: "0 0.5rem 0 0.5rem",
            duration: 1,
            width: "16rem",
            transform: "rotate(315deg) translateY(-19.25vw) translateY(-2rem) rotate(-315deg) translateX(-16rem) translateX(2rem) translateY(-1rem)",
            duration: 2,
            ease: "power2.inOut",
          },
          "recompression-start",
        )

        .to({}, { duration: 2 }) // Brief pause before collapse

        // 11. EXPERIENCE SECTION FINAL COLLAPSE ANIMATION
        .addLabel("experience-collapse-start")

        // Phase 1 — Pre-Collapse Heart Beat (Inner Circle Pulse)
        .addLabel("heartbeat-phase", "experience-collapse-start")
        .to(
          experienceRefs.centerRef.current,
          {
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out",
          },
          "heartbeat-phase",
        )
        .to(
          experienceRefs.centerRef.current,
          {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
          },
          "heartbeat-phase+=0.3",
        )
        .to(
          experienceRefs.centerRef.current,
          {
            scale: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "heartbeat-phase+=0.5",
        )

        // Phase 2 — Card Collapse to Center (starts during heartbeat)
        .addLabel("card-collapse", "heartbeat-phase+=0.3")
        .to(
          experienceRefs.card45Ref.current,
          {
            x: 0,
            y: 0,
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "card-collapse",
        )
        .to(
          experienceRefs.card135Ref.current,
          {
            x: 0,
            y: 0,
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "card-collapse",
        )
        .to(
          experienceRefs.card225Ref.current,
          {
            x: 0,
            y: 0,
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "card-collapse",
        )
        .to(
          experienceRefs.card315Ref.current,
          {
            x: 0,
            y: 0,
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "card-collapse",
        )

        // Phase 3 — Radial Line Retraction (starts after cards begin collapsing)
        .addLabel("line-retraction", "card-collapse+=0.5")
        .to(
          experienceRefs.line45Ref.current,
          {
            scaleY: 0,
            duration: 1.5,
            ease: "power2.in",
          },
          "line-retraction",
        )
        .to(
          experienceRefs.line135Ref.current,
          {
            scaleY: 0,
            duration: 1.5,
            ease: "power2.in",
          },
          "line-retraction",
        )
        .to(
          experienceRefs.line225Ref.current,
          {
            scaleY: 0,
            duration: 1.5,
            ease: "power2.in",
          },
          "line-retraction",
        )
        .to(
          experienceRefs.line315Ref.current,
          {
            scaleY: 0,
            duration: 1.5,
            ease: "power2.in",
          },
          "line-retraction",
        )

        // Phase 4 — Final Core Collapse (after heartbeat completes and cards nearly reach center)
        .addLabel("final-collapse", "heartbeat-phase+1")
        .to(
          experienceRefs.centerRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: "power3.in",
          },
          "final-collapse",
        )

        // Header fade out
        .to(
          experienceRefs.headerRef.current,
          {
            opacity: 0,
            y: "-60vh",
            duration: 2,
            ease: "power2.in",
          },
          "final-collapse",
        )

        // Container cleanup
        .to(
          experienceRefs.containerRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "final-collapse+=1",
        )

        // Background return to normal
        .to(
          sectionRef.current,
          {
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
          },
          "final-collapse",
        )

        // 12. EDUCATION SECTION ENTRANCE
        .addLabel("education-start", "heartbeat-phase") // Start when experience circle begins shrinking

        // Education container becomes visible
        .to(
          educationRefs.containerRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "education-start",
        )

        // Header emerges from center (following same pattern as other sections)
        .fromTo(
          educationRefs.headerRef.current,
          {
            opacity: 0,
            scale: 0.2,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: "back.out(1.6)",
          },
          "education-start",
        )

        // Header moves to top position (after experience cards begin collapsing)
        .addLabel("education-header-lift", "card-collapse+=0.5")
        .to(
          educationRefs.headerRef.current,
          {
            top: "15%",
            yPercent: -50,
            duration: 2.5,
            ease: "power3.inOut",
          },
          "education-header-lift",
        )

        // Education cards entrance with stagger (after experience cards are collapsing)
        .addLabel("education-cards-entrance", "line-retraction")
        
        // Card 1 (left) - Bachelors
        .fromTo(
          educationRefs.card1Ref.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.4)",
          },
          "education-cards-entrance",
        )

        // Card 2 (center) - Intermediate
        .fromTo(
          educationRefs.card2Ref.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.4)",
          },
          "education-cards-entrance+=0.3",
        )

        // Card 3 (right) - High School
        .fromTo(
          educationRefs.card3Ref.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.4)",
          },
          "education-cards-entrance+=0.6",
        )

        // Hold for viewing
        .to({}, { duration: 8 }, "education-hold")

        // 13. EDUCATION SECTION EXIT
        .addLabel("education-exit")

        // Cards fade and move down
        .to(
          educationRefs.card1Ref.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 2,
            ease: "power2.in",
          },
          "education-exit",
        )
        .to(
          educationRefs.card2Ref.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 2,
            ease: "power2.in",
          },
          "education-exit+=0.3",
        )
        .to(
          educationRefs.card3Ref.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 2,
            ease: "power2.in",
          },
          "education-exit+=0.6",
        )

        // Header fade out
        .to(
          educationRefs.headerRef.current,
          {
            opacity: 0,
            top: "5%",
            yPercent: -50,
            duration: 2,
            ease: "power2.in",
          },
          "education-exit",
        )

        // Container cleanup
        .to(
          educationRefs.containerRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "education-exit+=1",
        );
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

      {/* Education Section Content */}
      <div
        className="absolute inset-0"
        style={{
          visibility: educationVisible ? "visible" : "hidden",
          opacity: educationVisible ? 1 : 0,
          pointerEvents: educationVisible ? "auto" : "none",
        }}
      >
        <Education refs={educationRefs} visible={educationVisible} />
      </div>
    </section>
  );
};

export default PortfolioScroll;
