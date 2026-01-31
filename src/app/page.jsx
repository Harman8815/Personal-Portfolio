"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import LandingSections from "@/components/LandingSections";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import HomeHero from "@/pages/Hero/Home";
import { LoadingProvider, useLoadingContext } from "@/context/LoadingContext";

function HomePageContent() {
  const [isMainLoading, setIsMainLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [holdProgress, setHoldProgress] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const finalProgressStartRef = useRef(null);

  const { contentReady, markContentReady } = useLoadingContext();

  const handleAutoEnter = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsMainLoading(false);
    }, 1500);
  }, []);

  // When content is ready and progress is at 90%, start smooth interpolation to 100%
  useEffect(() => {
    if (!contentReady || !holdProgress) return;

    console.log("[HomePage] Content ready, advancing from 90% to 100%");
    finalProgressStartRef.current = Date.now();
    const FINAL_DURATION = 1500; // 1.5 seconds to go from 90 to 100

    const finalInterval = setInterval(() => {
      const elapsed = Date.now() - finalProgressStartRef.current;
      const finalProgress = Math.min(
        90 + (elapsed / FINAL_DURATION) * 10,
        100
      );

      setProgress(Math.floor(finalProgress));

      if (finalProgress >= 100) {
        clearInterval(finalInterval);
        handleAutoEnter();
      }
    }, 50);

    return () => clearInterval(finalInterval);
  }, [contentReady, holdProgress, handleAutoEnter]);

  // Main progress animation - goes to 90% then holds
  useEffect(() => {
    if (isTransitioning || holdProgress) return;

    console.log("[HomePage] Starting progress animation to 90%");
    startTimeRef.current = Date.now();
    const DURATION = 3600; // 3.6 seconds to reach 90%

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(
        Math.floor((elapsed / DURATION) * 90),
        90
      );

      setProgress(newProgress);

      if (newProgress >= 90) {
        clearInterval(intervalRef.current);
        console.log("[HomePage] Reached 90%, holding progress until content loads");
        setHoldProgress(true); // Hold at 90%, wait for content
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [isTransitioning, holdProgress]);

  return (
    <div className="relative">
      {isMainLoading && (
        <div className="fixed inset-0 z-[100] min-h-screen min-w-screen bg-[#020617] overflow-hidden scrollbar-none">
          <LoadingScreen progress={progress} isExiting={isTransitioning} />
        </div>
      )}
      
      {/* Content renders behind loading screen and signals when ready */}
      <div className={isMainLoading ? "invisible" : ""}>
        <HomeHero onLoad={markContentReady} onLoaderExit={!isMainLoading} />
        <LandingSections />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <LoadingProvider>
      <HomePageContent />
    </LoadingProvider>
  );
}
