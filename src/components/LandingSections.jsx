import React, { useEffect, useState, Suspense, lazy } from "react";
import About from "./About/About";
import Skills from "./skills/Skills";

// Lazy imports
const MajorProjects = lazy(() => import("./MajorProject/MajorProjects"));
const Achievements = lazy(() => import("./Achievements"));
const MoreProject = lazy(() => import("./MoreProjects/MoreProjects"));
const Certifications = lazy(() => import("./Certifications"));
const Experience = lazy(() => import("./Experience"));
const Education = lazy(() => import("./Education"));
const Links = lazy(() => import("./Links"));
const Contact_me = lazy(() => import("./Contact/Contact_me"));
const ThankYou = lazy(() => import("./ThankYou"));

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
      <Skills />

      {loadRest && (
        <Suspense fallback={null}>
          <MajorProjects />
          <Achievements />
          <MoreProject />
          <Certifications />
          <Experience />
          <Education />
          <Links />
          <Contact_me />
          <ThankYou />
        </Suspense>
      )}
    </div>
  );
};

export default LandingSections;
