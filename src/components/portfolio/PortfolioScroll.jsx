"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutContent from "./AboutContent";
import MajorProjectsContent from "./MajorProjectsContent";
import Education from "../pages/education/Education";
import Contact_me from "../contact/Contact_me";
import EndSequence from "../pages/landing/EndSequence";

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

  // Education section refs
  const educationRefs = {
    containerRef: useRef(null),
    headerRef: useRef(null),
    card1Ref: useRef(null),
    card2Ref: useRef(null),
    card3Ref: useRef(null),
  };

  // Contact section refs
  const contactRefs = {
    containerRef: useRef(null),
    headerRef: useRef(null),
  };

  // EndSequence refs
  const endSequenceRefs = {
    containerRef: useRef(null),
  };

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [endSequenceVisible, setEndSequenceVisible] = useState(false);

  // Use a ref to track the last index we set, to avoid redundant state updates in onUpdate
  const lastIndexRef = useRef(0);
  const projectsVisibleRef = useRef(false);
  const educationVisibleRef = useRef(false);
  const contactVisibleRef = useRef(false);
  const endSequenceVisibleRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4500%", // Further increased to prevent header collisions
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // 🚀 BUG FIX: Sync visibility with timeline labels.
            if (progress > 0.25) {
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

            // Education section visibility
            if (progress > 0.55) {
              if (!educationVisibleRef.current) {
                educationVisibleRef.current = true;
                setEducationVisible(true);
              }
            } else if (educationVisibleRef.current) {
              educationVisibleRef.current = false;
              setEducationVisible(false);
            }

            // Contact section visibility
            if (progress > 0.8) {
              if (!contactVisibleRef.current) {
                contactVisibleRef.current = true;
                setContactVisible(true);
              }
            } else if (contactVisibleRef.current) {
              contactVisibleRef.current = false;
              setContactVisible(false);
            }

            // EndSequence visibility
            if (progress > 0.9) {
              if (!endSequenceVisibleRef.current) {
                endSequenceVisibleRef.current = true;
                setEndSequenceVisible(true);
              }
            } else if (endSequenceVisibleRef.current) {
              endSequenceVisibleRef.current = false;
              setEndSequenceVisible(false);
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
        scale: 0,
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

      // Education cards initial states will be set dynamically in timeline

      // Contact section initial states
      gsap.set(contactRefs.containerRef.current, {
        opacity: 0,
        position: "absolute",
        inset: 0,
        zIndex: 90,
      });

      gsap.set(contactRefs.headerRef.current, {
        opacity: 0,
        scale: 0.2,
        position: "absolute",
        top: "50vh",
        left: "50vw",
        xPercent: -50,
        yPercent: -50,
      });

      // EndSequence initial states
      gsap.set(endSequenceRefs.containerRef.current, {
        opacity: 0,
        scale: 0,
        position: "absolute",
        inset: 0,
        zIndex: 100,
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
            y: "-38vh",
            duration: 3,
            ease: "power3.inOut",
          },
          "skills-header-placement",
        )

        // Phase 3 — Skill Cloud Formation: Two-stage animation
        .addLabel("skills-cloud-formation", "skills-header-placement+=0.5")

        // Stage 1: Cloud appears from center (scale 0 to 1)
        .fromTo(
          aboutRefs.skillsCloudRef.current,
          { opacity: 0, scale: 0, x: 0, y: 0 },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            x: 0,
            y: 0,
            duration: 2,
            ease: "back.out(1.2)",
          },
          "skills-cloud-formation",
        )

        // Stage 2: Cloud moves from center to right side
        .addLabel("skills-cloud-move-right", "skills-cloud-formation+=2")
        .to(
          aboutRefs.skillsCloudRef.current,
          {
            x: "30vw",
            y: "5vh",
            duration: 2,
            ease: "power3.inOut",
          },
          "skills-cloud-move-right",
        )

        // Phase 4 — Skill Cards Assembly: Starts after cloud stage 1 completes
        .addLabel("skills-cards-assembly", "skills-cloud-formation+=2")

        // Container appears from center, slightly below skills cloud
        .fromTo(
          aboutRefs.skillsTiersRef.current,
          { opacity: 0, scale: 0.8, x: 0, y: "2vh" },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: "2vh",
            duration: 2,
            ease: "power3.out",
          },
          "skills-cards-assembly",
        )

        // Container moves from center to left side
        .addLabel("skills-cards-move-left", "skills-cards-assembly+=2")
        .to(
          aboutRefs.skillsTiersRef.current,
          {
            x: "-15vw",
            y: "5vh",
            duration: 2,
            ease: "power3.inOut",
          },
          "skills-cards-move-left",
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
          "skills-cards-move-left+=0.5",
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

        // Header Animation: Zoom in from center (size 0 to 100%)
        .fromTo(
          projectsRefs.headerRef.current,
          {
            opacity: 0,
            scale: 0,
            y: 0,
            yPercent: -50,
            xPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute",
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 2.5,
            ease: "back.out(1.8)",
          },
          "projects-start",
        )

        // Header moves upward to its final top position
        .to(
          projectsRefs.headerRef.current,
          {
            y: "-36vh",
            duration: 3,
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

        .to({}, { duration: 0.5 }) // Final buffer before transition

        // 6. SYNCHRONIZED TRANSITION - MAJOR PROJECTS EXIT + EDUCATION ENTRY
        .addLabel("projects-transition")

        // === MAJOR PROJECTS CLEANUP ===
        .to(
          projectsRefs.containerRef.current,
          {
            opacity: 0,
            duration: 3,
            ease: "power2.inOut",
          },
          "projects-transition",
        )

        .to(
          projectsRefs.headerRef.current,
          {
            y: "-60vh",
            opacity: 0,
            scale: 0.8,
            duration: 3,
            ease: "power2.in",
          },
          "projects-transition",
        )

        .to(
          projectsRefs.wheelRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 2,
            ease: "power2.in",
          },
          "projects-transition",
        )

        .to(
          projectsRefs.cardContainerRef.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "projects-transition",
        )

        // No hold, transition immediately
        .set(
          educationRefs.containerRef.current,
          { opacity: 1 },
          "projects-transition+=2.0",
        )

        // Education header zooms in from center with blur that sharpens
        .addLabel("education-header-entrance", "projects-transition+=2.0") 
        .fromTo(
          educationRefs.headerRef.current,
          {
            opacity: 0,
            scale: 0.1, // Start even smaller for dramatic zoom
            y: 0,
            yPercent: -50,
            xPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute",
            filter: "blur(8px)", // Start with blur
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)", // Sharpen as it reaches final position
            duration: 2.5,
            ease: "back.out(1.8)",
          },
          "education-header-entrance",
        )

        // === SYNCHRONIZED PHASE 2: Cards Collapse + Header Moves Up ===
        .addLabel("header-lift-phase", "education-header-entrance+2") // Header starts moving as it finishes zooming

        // Education header moves to top position (same time as cards collapse)
        .to(
          educationRefs.headerRef.current,
          {
            top: "15%",
            yPercent: -50,
            duration: 2,
            ease: "power3.inOut",
          },
          "header-lift-phase",
        )

        // Background return to normal
        .to(
          sectionRef.current,
          {
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
          },
          "+=0.5",
        )

        // === EDUCATION CARDS ENTRANCE (AFTER HEADER SETTLES + CLEAR SEPARATION) ===
        .addLabel("education-cards-start", "education-header-entrance+4"); // Clear separation after header settles

      // Calculate responsive positions
      const screenWidth = window.innerWidth;
      let cardWidth, leftOffset, rightOffset;

      if (screenWidth >= 1024) {
        // Large desktop
        cardWidth = "18rem";
        leftOffset = "-23rem";
        rightOffset = "23rem";
      } else if (screenWidth >= 768) {
        // Tablet
        cardWidth = "16rem";
        leftOffset = "-19rem";
        rightOffset = "19rem";
      } else {
        // Mobile
        cardWidth = "14rem";
        leftOffset = "-14rem";
        rightOffset = "14rem";
      }

      // Set initial card states (scaled down, translated down, opacity 0)
      gsap.set(educationRefs.card1Ref.current, {
        opacity: 0,
        scale: 0.9,
        y: 60,
        x: 0,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
        width: cardWidth,
        maxWidth: "85vw",
        maxHeight: "65vh",
        zIndex: 20,
        transformOrigin: "center center",
      });

      gsap.set(educationRefs.card2Ref.current, {
        opacity: 0,
        scale: 0.9,
        y: 60,
        x: leftOffset,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
        width: cardWidth,
        maxWidth: "85vw",
        maxHeight: "65vh",
        zIndex: 10,
        transformOrigin: "center center",
      });

      gsap.set(educationRefs.card3Ref.current, {
        opacity: 0,
        scale: 0.9,
        y: 60,
        x: rightOffset,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
        width: cardWidth,
        maxWidth: "85vw",
        maxHeight: "65vh",
        zIndex: 10,
        transformOrigin: "center center",
      });

      // Simple staggered card animation (center first, then sides)
      tl.to(
        educationRefs.card1Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.3)",
        },
        "education-cards-start",
      )
        .to(
          educationRefs.card2Ref.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.3)",
          },
          "education-cards-start+0.2",
        )
        .to(
          educationRefs.card3Ref.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.3)",
          },
          "education-cards-start+0.4",
        );

      // Hold for viewing
      tl.to({}, { duration: 6 }, "education-hold");

      // 13. EDUCATION SECTION EXIT
      tl.addLabel("education-exit");

      // Cards fade and move down
      tl.to(
        educationRefs.card1Ref.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 2,
          ease: "power2.in",
        },
        "education-exit",
      );
      tl.to(
        educationRefs.card2Ref.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 2,
          ease: "power2.in",
        },
        "education-exit+=0.3",
      );
      tl.to(
        educationRefs.card3Ref.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 2,
          ease: "power2.in",
        },
        "education-exit+=0.6",
      );

      // Header fade out
      tl.to(
        educationRefs.headerRef.current,
        {
          opacity: 0,
          top: "5%",
          yPercent: -50,
          duration: 2,
          ease: "power2.in",
        },
        "education-exit",
      );

      // Container cleanup
      tl.to(
        educationRefs.containerRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        "education-exit+=1",
      )

        // 15. CONTACT SECTION ENTRANCE
        .addLabel("contact-start", "education-exit+=2")

        // Contact container becomes visible
        .to(
          contactRefs.containerRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "contact-start",
        )

        // STEP 1: Header Animation (Same As Education)
        .fromTo(
          contactRefs.headerRef.current,
          {
            opacity: 0,
            scale: 0.1, // Same entry scale as Education header
            y: 0,
            yPercent: -50,
            xPercent: -50,
            left: "50%",
            top: "50%",
            position: "absolute",
            filter: "blur(8px)", // Start with blur
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)", // Sharpen as it reaches final position
            duration: 2.5,
            ease: "back.out(1.8)", // Same easing as Education header
          },
          "contact-start",
        )

        // Header moves to top position (same as Education)
        .addLabel("contact-header-lift", "contact-start+2.5")
        .to(
          contactRefs.headerRef.current,
          {
            top: "15vh", // Same top position as Education header
            transform: "translate(-50%, -50%)",
            duration: 2,
            ease: "power3.inOut", // Same easing as Education header
          },
          "contact-header-lift",
        )

        // STEP 2: Contact Container Reveal (after header settles)
        .addLabel("contact-container-reveal", "contact-start+4.5") // After header settles
        .fromTo(
          contactRefs.containerRef.current,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.3)", // Same ease as Education card entrance
          },
          "contact-container-reveal",
        )

        // Hold for viewing
        .to({}, { duration: 6 }, "contact-hold")

        // STEP 3: Contact Section Fade Out
        .addLabel("contact-exit")
        .to(
          contactRefs.containerRef.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          },
          "contact-exit",
        )
        .to(
          contactRefs.headerRef.current,
          {
            opacity: 0,
            top: "5vh",
            transform: "translate(-50%, -50%)",
            filter: "blur(4px)",
            duration: 2,
            ease: "power2.in",
          },
          "contact-exit",
        )

        // 17. ENDSEQUENCE ENTRANCE
        .addLabel("endsequence-start", "contact-exit+1")

        // EndSequence scale and opacity animation
        .fromTo(
          endSequenceRefs.containerRef.current,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "back.out(1.6)",
          },
          "endsequence-start",
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

      {/* Contact Section Content */}
      <div
        className="absolute inset-0"
        style={{
          visibility: contactVisible ? "visible" : "hidden",
          opacity: contactVisible ? 1 : 0,
          pointerEvents: contactVisible ? "auto" : "none",
        }}
      >
        <Contact_me refs={contactRefs} visible={contactVisible} />
      </div>

      {/* EndSequence Content */}
      <div
        className="absolute inset-0"
        style={{
          visibility: endSequenceVisible ? "visible" : "hidden",
          opacity: endSequenceVisible ? 1 : 0,
          pointerEvents: endSequenceVisible ? "auto" : "none",
        }}
      >
        <EndSequence refs={endSequenceRefs} visible={endSequenceVisible} />
      </div>
    </section>
  );
};

export default PortfolioScroll;
