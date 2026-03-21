import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LeetCodeCard, GFGCard, InterviewBitCard } from "./Cards";
import { EnhancedCardWrapper } from "./EnhancedCardStyles";

export const UnifiedModal = ({ isOpen, type, content, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && type === "badge" && (
        <motion.div
          key="badge-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
          onClick={onClose}
        >
          <EnhancedCardWrapper 
            variant="impact"
            randomColor={true} // Always use random colors for badge modals
            className="relative max-w-lg w-full bg-[#1e293b] border border-white/10 rounded-[3rem] p-12 text-center shadow-2xl"
            style={{ '--card-bg': '#1e293b' }}
          >
            <div className="relative mb-10 mx-auto w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-125 pointer-events-none" />
              <img
                src={content}
                alt="Badge Detail"
                className="w-full h-full object-contain relative z-10"
                referrerPolicy="no-referrer"
                onError={(e) => console.error("Badge image failed to load:", e)}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                Achievement Unlocked
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                This badge represents a significant milestone in technical
                mastery and consistent problem-solving dedication.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5"
              >
                <div className="text-left">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Status
                  </div>
                  <div className="text-cyan-400 font-bold">
                    Verified Achievement
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="text-left">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Platform
                  </div>
                  <div className="text-white font-bold">Code Mastery</div>
                </div>
              </motion.div>
            </motion.div>
          </EnhancedCardWrapper>
        </motion.div>
      )}

      {isOpen && type === "card" && (
        <motion.div
          key="card-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
          onClick={onClose}
        >
          <EnhancedCardWrapper 
            variant="award"
            randomColor={true} // Always use random colors for card modals
            className="relative max-w-4xl w-full bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 shadow-2xl"
            style={{ '--card-bg': 'rgba(15, 23, 42, 0.95)' }}
          >
            <div className="relative z-10">
              {content === "leetcode" && <LeetCodeCard />}
              {content === "gfg" && <GFGCard />}
              {content === "interviewbit" && <InterviewBitCard />}
            </div>
          </EnhancedCardWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
