import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useAutoScrollController = (options = {}) => {
  const {
    speed: initialSpeed = 0.5,
    pauseOnUserInteraction = true,
    restartFromTop = true,
  } = options;

  const [state, setState] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [speed, setSpeedState] = useState(initialSpeed);
  
  const rafRef = useRef(null);
  const scrollYRef = useRef(0);
  const lastScrollY = useRef(0);
  const speedRef = useRef(initialSpeed);

  const setSpeed = useCallback((newSpeed) => {
    speedRef.current = newSpeed;
    setSpeedState(newSpeed);
  }, []);

  const isAtBottom = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return true;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const currentScroll = window.scrollY;
    return currentScroll + clientHeight >= scrollHeight - 10; // Increased buffer
  }, []);

  const isAtTop = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return window.scrollY <= 10;
  }, []);

  const updateProgress = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      setProgress(0);
      return;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const currentScroll = window.scrollY;
    const totalScrollable = scrollHeight - clientHeight;
    
    if (totalScrollable <= 0) return;
    
    const currentProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
    setProgress(currentProgress);
  }, []);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setState('idle');
  }, []);

  const pause = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setState('paused');
  }, []);

  const scrollStep = useCallback(() => {
    if (isAtBottom()) {
      setState('completed');
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    // Use a precise accumulator to avoid rounding issues at low speeds
    scrollYRef.current += speedRef.current;
    
    // Ensure we're actually moving forward
    const targetScroll = Math.max(scrollYRef.current, window.scrollY + 0.1);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'auto'
    });
    
    // Sync the ref with actual scroll in case of browser clamping
    const actualScroll = window.scrollY;
    lastScrollY.current = actualScroll;
    
    updateProgress();
    
    // Force ScrollTrigger to update
    ScrollTrigger.update();

    rafRef.current = requestAnimationFrame(scrollStep);
  }, [isAtBottom, updateProgress]);

  const play = useCallback(() => {
    if (state === 'completed' && restartFromTop) {
      window.scrollTo(0, 0);
      scrollYRef.current = 0;
    } else {
      scrollYRef.current = window.scrollY;
    }
    
    setState('playing');
    lastScrollY.current = window.scrollY;
    rafRef.current = requestAnimationFrame(scrollStep);
  }, [state, restartFromTop, scrollStep]);

  const resume = useCallback(() => {
    if (state === 'paused') {
      play();
    }
  }, [state, play]);

  // Handle manual scroll detection
  useEffect(() => {
    const handleInteraction = () => {
      if (state === 'playing' && pauseOnUserInteraction) {
        pause();
      }
    };

    const handleScroll = () => {
      // If the scroll position changed significantly and we're not the ones who did it
      // Increased tolerance for high-refresh rate screens or rounding
      const diff = Math.abs(window.scrollY - lastScrollY.current);
      if (state === 'playing' && diff > Math.max(speed * 2, 10)) {
        pause();
      }
      updateProgress();
    };

    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('mousedown', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [state, pause, pauseOnUserInteraction, speed, updateProgress]);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state === 'playing') {
        pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state, pause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    play,
    pause,
    resume,
    stop,
    state,
    progress,
    speed,
    setSpeed,
    isPlaying: state === 'playing',
    isPaused: state === 'paused',
    isCompleted: state === 'completed',
    isAtTop: isAtTop(),
    isAtBottom: isAtBottom(),
  };
};
