"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import PortfolioScroll from "../../portfolio/PortfolioScroll";

const LandingSections = () => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    // Automatically trigger loading of remaining sections after first render
    const timer = setTimeout(() => setLoadRest(true), 500); // increased delay for proper initialization
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative" id="bg">
      <PortfolioScroll />

      {loadRest && (
        <Suspense fallback={null}>
          {/* <Experience /> */}
          {/* <Certificates /> */}
          {/* <Education /> */}
          {/* <Achievements /> */}
          {/* <Links /> */}
          {/* <Contact_me /> */}
          {/* <ThankYou /> */}
          {/* <EndSequence /> */}
        </Suspense>
      )}
    </div>
  );
};

export default LandingSections;
