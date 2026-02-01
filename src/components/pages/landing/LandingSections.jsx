"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import About from "../../about/About";
import Skills from "../../skills/Skills";

// Lazy imports
const MajorProjects = lazy(() => import("../../majorProject/MajorProjects"));
const Contact_me = lazy(() => import("../../contact/Contact_me"));
const ThankYou = lazy(() => import("./ThankYou"));
const Education = lazy(() => import("../education/Education"));
const Links = lazy(() => import("../links/Links"));
const Certificates = lazy(() => import("../certifications/Certifications"));
const Experience = lazy(() => import("../experience/Experience"));
const Achievements = lazy(() => import("../achievements/Achievements"));
const LandingSections = () => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    // Automatically trigger loading of remaining sections after first render
    const timer = setTimeout(() => setLoadRest(true), 100); // slight delay after initial mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative" id="bg">
      <About />
      {/* <Skills /> */}

      {loadRest && (
        <Suspense fallback={null}>
          <MajorProjects />
          <Experience />
          <Certificates />
          <Education />
          <Achievements />
          <Links />
          <Contact_me />
          <ThankYou />
        </Suspense>
      )}
    </div>
  );
};

export default LandingSections;
