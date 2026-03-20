import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, X, FastForward, Square } from 'lucide-react';
import { useAutoScroll } from '../autoScroll/AutoScrollContext.jsx';

const CinematicController = () => {
  const {
    play,
    pause,
    resume,
    stop,
    state,
    progress,
    speed,
    setSpeed,
    isPlaying,
    isPaused,
    isCompleted
  } = useAutoScroll();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      play();
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    play();
    setIsOpen(false);
  };

  const handleStop = () => {
    stop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const speedOptions = [2, 4, 10, 20, 40];

  // Radial progress calculation
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="mb-2 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl min-w-[200px]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-bottom border-white/5 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Auto_Pilot_Settings</span>
                <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>

              {/* Playback Controls */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleToggle}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  {isPlaying ? <Pause size={16} className="text-cyan-400" /> : <Play size={16} className="text-cyan-400" />}
                  <span className="font-mono text-[8px] uppercase text-white/40 group-hover:text-white/60">
                    {isPlaying ? 'Pause' : 'Play'}
                  </span>
                </button>
                <button
                  onClick={handleRestart}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <RotateCcw size={16} className="text-purple-400" />
                  <span className="font-mono text-[8px] uppercase text-white/40 group-hover:text-white/60">Restart</span>
                </button>
                <button
                  onClick={handleStop}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <Square size={16} className="text-red-400" />
                  <span className="font-mono text-[8px] uppercase text-white/40 group-hover:text-white/60">Stop</span>
                </button>
              </div>

              {/* Speed Control */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/50">
                  <FastForward size={12} />
                  <span className="font-mono text-[8px] uppercase tracking-widest">Scroll_Velocity</span>
                </div>
                <div className="flex gap-1">
                  {speedOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`flex-1 py-1 rounded-md font-mono text-[10px] transition-all ${
                        speed === s 
                          ? 'bg-cyan-500 text-black font-bold' 
                          : 'bg-white/5 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <span className="font-mono text-[8px] uppercase text-white/30">Progress</span>
                <span className="font-mono text-[10px] text-cyan-500 font-bold">{Math.round(progress * 100)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Utility Button */}
      <motion.button
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center group pointer-events-auto"
      >
        {/* Radial Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="text-cyan-500"
            strokeLinecap="round"
          />
        </svg>

        {/* Icon */}
        <div className="relative z-10 text-white/80 group-hover:text-white transition-colors">
          {isOpen ? <X size={20} /> : <Settings size={20} className={isPlaying ? 'animate-spin-slow' : ''} />}
        </div>

        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-cyan-500/20"
          />
        )}
      </motion.button>

      {/* Mini Label */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 pr-2"
        >
          {isPlaying ? `Auto_Pilot: ${speed}x` : 'Manual_Control'}
        </motion.div>
      )}
    </div>
  );
};

export default CinematicController;
