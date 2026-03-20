import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Maximize2, X, RotateCcw } from "lucide-react";
import { CardContext } from "../context/Context";

export const BadgeGrid = ({ badges, onBadgeClick }) => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileLimit = 12;
  const displayedBadges = isMobile
    ? showAll
      ? badges
      : badges.slice(0, mobileLimit)
    : badges;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6">
        <AnimatePresence mode="popLayout">
          {displayedBadges.map((badge, i) => (
            <motion.button
              key={badge + i}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onBadgeClick(badge)}
              className="w-20 h-20 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors group/badge relative"
            >
              <ImageWithLoading
                src={badge}
                alt="badge"
                className="w-full h-full"
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-slate-800 text-[10px] text-white opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                View Detail
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {isMobile && badges.length > mobileLimit && (
          <motion.button
            layout
            onClick={() => setShowAll(!showAll)}
            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:border-cyan-500/50 transition-all group"
          >
            {showAll ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="text-[12px] font-bold">
                  +{badges.length - mobileLimit}
                </span>
                <Maximize2 className="w-4 h-4" />
              </div>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

export const ImageWithLoading = ({ src, alt, className, fallback }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 rounded-lg animate-pulse" />
      )}
      {hasError && fallback ? (
        <div className="absolute inset-0 bg-white/5 rounded-lg flex items-center justify-center">
          <div className="text-white/30 text-xs">Loading...</div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain relative z-10 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export const LogoWithLoading = ({ src, alt, className, fallbackIcon }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`w-16 h-16 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-white/10 ${className}`}
    >
      {isLoading && !hasError && (
        <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse" />
      )}
      {hasError ? (
        <div className="text-white/20">{fallbackIcon}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-10 h-10 object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export const Counter = ({ value, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const BackgroundLayer = ({ type }) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {type === "grid" && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      )}
      {type === "mesh" && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse [animation-delay:2s]" />
        </div>
      )}
      {type === "dots" && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff22 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
      {type === "pulse" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-cyan-500/10 animate-[ping_10s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-blue-500/10 animate-[ping_8s_linear_infinite]" />
        </div>
      )}
    </div>
  );
};

export const DraggableCard = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  const { resetTrigger } = useContext(CardContext);

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [resetTrigger]);

  return (
    <div ref={constraintsRef} className="relative w-full h-full">
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        animate={{ x: position.x, y: position.y }}
        onDrag={(_, info) =>
          setPosition({ x: info.offset.x, y: info.offset.y })
        }
        className={`relative group cursor-grab active:cursor-grabbing ${className}`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative h-full w-full bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const AnimatedCard = ({ id, children, className }) => {
  const context = useContext(CardContext);
  const isExpanded = context.expandedCard === id;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`relative cursor-pointer ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        if (isExpanded) {
          context.closeModal();
          context.setExpandedCard(null);
        } else {
          context.setExpandedCard(id);
          context.openCardModal(id);
        }
      }}
    >
      {children}
    </motion.div>
  );
};
