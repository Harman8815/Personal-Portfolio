"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutContent from "./AboutContent";
import MajorProjectsContent from "./MajorProjectsContent";

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
    cardsRef: useRef([]),
    headerRef: useRef(null),
    scrollIndicatorRef: useRef(null),
  };

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectsVisible, setProjectsVisible] = useState(false);

  // Use a ref to track the last index we set, to avoid redundant state updates in onUpdate
  const lastIndexRef = useRef(0);
  const projectsVisibleRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress > 0.58) {
              if (!projectsVisibleRef.current) {
                projectsVisibleRef.current = true;
                setProjectsVisible(true);
              }

              const projectProgress = (progress - 0.6) / 0.4;
              const newIndex = Math.min(Math.floor(projectProgress * 5), 4);

              if (newIndex >= 0 && newIndex !== lastIndexRef.current) {
                lastIndexRef.current = newIndex;
                setActiveProjectIndex(newIndex);
              }
            } else if (projectsVisibleRef.current) {
              projectsVisibleRef.current = false;
              setProjectsVisible(false);
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
        y: 100,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
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

        // 2. SKILLS TRANSITION
        .addLabel("skills-entrance")
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
          "skills-entrance+=2",
        )

        // Appear Skills Header
        .to(
          aboutRefs.skillsHeaderRef.current,
          {
            opacity: 1,
            scale: 1,
            y: "-45vh", // Move up from center
            duration: 3,
            ease: "expo.out",
          },
          "skills-entrance+=2.5",
        )

        // Reveal Skills Cloud and Tiers
        .addLabel("skills-reveal")
        .to(
          aboutRefs.skillsCloudRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            x: "30vw",
            y: "5vh",
            duration: 4,
            ease: "power3.out",
          },
          "skills-reveal",
        )
        .to(
          aboutRefs.skillsTiersRef.current,
          {
            opacity: 1,
            scale: 1,
            x: "-15vw",
            y: "5vh",
            duration: 4,
            ease: "power3.out",
          },
          "skills-reveal+=0.5",
        )

        // Animate individual skill cards
        .to(
          ".skill-card-container",
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            stagger: { amount: 2 },
            duration: 3,
            ease: "back.out(1.4)",
          },
          "skills-reveal+=1",
        )

        .to({}, { duration: 4 }, "skills-hold") // Buffer for reading skills

        // 3. SKILLS SHATTER & PROJECTS ENTRANCE
        .addLabel("skills-shatter")
        .to(
          aboutRefs.skillsContainerRef.current,
          {
            opacity: 0,
            scale: 1.2,
            filter: "blur(30px)",
            duration: 3,
            ease: "power2.in",
          },
          "skills-shatter",
        )
        .to(
          ".skill-card-container",
          {
            opacity: 0,
            y: -500,
            rotateZ: 45,
            stagger: 0.05,
            duration: 2,
          },
          "skills-shatter",
        )

        // Ensure circle is totally gone
        .set(aboutRefs.circleRef.current, { display: "none" })

        // 4. MAJOR PROJECTS
        .addLabel("projects-start")
        .to(
          projectsRefs.containerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 4,
            ease: "power3.out",
          },
          "projects-start",
        )

        // Header and cards sequence
        .fromTo(
          projectsRefs.headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 },
          "projects-start+=1",
        )

        .addLabel("projects-reveal")
        // Animate cards into view
        .to(
          projectsRefs.cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.3,
            duration: 3,
            ease: "power3.out",
          },
          "projects-reveal",
        )

        .to(
          projectsRefs.scrollIndicatorRef.current,
          {
            opacity: 1,
            duration: 2,
          },
          "projects-reveal+=2",
        )
        .to({}, { duration: 5 }); // Final buffer at end of Projects
    }, sectionRef);

    return () => ctx.revert();
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
    </section>
  );
};

export default PortfolioScroll;
