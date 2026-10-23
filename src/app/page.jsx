"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import LandingSections from "../components/pages/landing/LandingSections.jsx";
import LoadingScreen from "../components/loadingScreen/LoadingScreen.jsx";
import CustomCursor from "../components/common/CustomCursor.jsx";
import dynamicImport from "next/dynamic";
import { LoadingProvider, useLoadingContext } from "../context/LoadingContext.jsx";
import { AutoScrollProvider, useAutoScroll } from "../components/autoScroll/AutoScrollContext.jsx";
import { Play, Pause, RotateCcw, X, Sparkles } from "lucide-react";

const HomeHero = dynamicImport(() => import("../components/r3f/Hero/Home.jsx"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="text-primary text-2xl">Loading...</div>
  </div>
});

const ScrollProgressTimeline = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable > 0) {
        const scrollProgress = Math.min(Math.max(scrollY / totalScrollable, 0), 1);
        setProgress(scrollProgress);
      }
    };

    const handleScroll = () => {
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 h-1 bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

const AutoScrollPrompt = ({ onAccept, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to allow the loading screen to fully transition out
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#020617]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 shadow-2xl shadow-cyan-500/20 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">Experience the animation</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Would you like to automatically scroll through the homepage animation? You can pause or control it anytime.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onAccept();
                  setIsVisible(false);
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Start Animation
              </button>
              <button
                onClick={() => {
                  onDismiss();
                  setIsVisible(false);
                }}
                className="px-3 py-2 bg-white/10 rounded-lg text-slate-400 text-xs hover:bg-white/20 transition-all duration-300"
              >
                Skip
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              onDismiss();
              setIsVisible(false);
            }}
            className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AutoScrollButton = () => {
  const { play, pause, stop, state, speed, setSpeed, isPlaying, isPaused, isCompleted } = useAutoScroll();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleStop = () => {
    stop();
  };

  const handleRestart = () => {
    stop();
    play();
  };

  const handleMainButtonClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      handleToggle();
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {/* Collapsible control panel */}
      <div
        className={`bg-[#020617]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'p-4 w-64' : 'w-0 h-0 p-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={handleStop}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            title="Stop"
            aria-label="Stop animation"
          >
            <Pause size={20} />
          </button>

          <button
            onClick={handleRestart}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            title="Restart from top"
            aria-label="Restart animation from top"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Speed</span>
            <span>{speed.toFixed(1)}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            aria-label="Animation speed"
          />
        </div>

        <div className="mt-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider text-center">
          {state}
        </div>
      </div>

      {/* Minimalist floating button */}
      <div className="relative">
        <button
          onClick={handleMainButtonClick}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110"
          title={isExpanded ? "Collapse controls" : (isPlaying ? "Pause" : "Play")}
          aria-label={isExpanded ? "Collapse playback controls" : (isPlaying ? "Pause animation" : "Play animation")}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        {/* Small expand button */}
        {!isExpanded && (
          <button
            onClick={handleExpandClick}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            title="Expand controls"
            aria-label="Expand playback controls"
          >
            <span className="text-[10px]">+</span>
          </button>
        )}
      </div>
    </div>
  );
};

function HomePageContent() {
  const [isMainLoading, setIsMainLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [holdProgress, setHoldProgress] = useState(false);
  const [showAutoScrollPrompt, setShowAutoScrollPrompt] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const finalProgressStartRef = useRef(null);

  const { contentReady, markContentReady } = useLoadingContext();
  const { play, pause, isPlaying, isPaused, isCompleted } = useAutoScroll();

  const handleAutoEnter = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsMainLoading(false);
    }, 1500);
  }, []);

  // Reset scroll position on mount
  useEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Show auto-scroll prompt on first visit (once per session)
  useEffect(() => {
    if (isMainLoading || prefersReducedMotion()) {
      return;
    }

    // Check if user has already seen the prompt this session
    const hasSeenPrompt = sessionStorage.getItem('hasSeenAutoScrollPrompt');
    if (hasSeenPrompt) {
      return;
    }

    // Wait for content to be ready, then show prompt
    if (contentReady) {
      setShowAutoScrollPrompt(true);
    }
  }, [isMainLoading, contentReady, prefersReducedMotion]);

  const handleAutoScrollAccept = () => {
    sessionStorage.setItem('hasSeenAutoScrollPrompt', 'true');
    play();
  };

  const handleAutoScrollDismiss = () => {
    sessionStorage.setItem('hasSeenAutoScrollPrompt', 'true');
  };

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
      <CustomCursor />
      {isMainLoading && (
        <div className="fixed inset-0 z-[100] min-h-screen min-w-screen bg-primary overflow-hidden scrollbar-none">
          <LoadingScreen progress={progress} isExiting={isTransitioning} />
        </div>
      )}

      {/* Content renders behind loading screen and signals when ready */}
      <div className={isMainLoading ? "invisible overflow-hidden" : "overflow-x-hidden"}>
        <HomeHero onLoad={markContentReady} onLoaderExit={!isMainLoading} />
        <LandingSections />
      </div>

      {/* Progress timeline - only show when not loading */}
      {!isMainLoading && <ScrollProgressTimeline />}

      {/* Auto-scroll button - only show when not loading */}
      {!isMainLoading && <AutoScrollButton />}

      {/* Auto-scroll prompt - only show on first visit */}
      {showAutoScrollPrompt && !isMainLoading && (
        <AutoScrollPrompt
          onAccept={handleAutoScrollAccept}
          onDismiss={handleAutoScrollDismiss}
        />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <LoadingProvider>
      <AutoScrollProvider>
        <HomePageContent />
      </AutoScrollProvider>
    </LoadingProvider>
  );
}
