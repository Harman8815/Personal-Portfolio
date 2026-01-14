import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProductCard = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const image = "/assets/MP1.png";

  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const shineTL = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- GSAP SETUP ---------------- */
  useEffect(() => {
    // initial position
    gsap.set(shineRef.current, { xPercent: -120 });

    shineTL.current = gsap.timeline({ paused: true });

    shineTL.current.to(shineRef.current, {
      xPercent: 300,
      duration: 1.2,
      ease: "power2.out",
      clearProps: "transform", // allows replay
    });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 95%",
      onEnter: () => shineTL.current.restart(),
      onEnterBack: () => shineTL.current.restart(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---------------- INTERACTIONS ---------------- */
  const handleHover = () => {
    shineTL.current.restart();
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();

    setTilt({
      x: ((e.clientX - left) / width) * 30 - 15,
      y: ((e.clientY - top) / height) * -30 + 15,
    });
  };

  /* ---------------- JSX ---------------- */
  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${
          tilt.y
        }deg) rotateY(${-tilt.x}deg)`,
      }}
      className="
        group relative max-w-[380px] rounded-2xl p-[1px]
        bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/30
        transition-transform duration-200
      "
    >
      {/* Ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-indigo-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Card Body */}
      <div
        className="
        relative rounded-2xl overflow-hidden
        bg-gradient-to-br from-[#0b1020] via-[#020617] to-[#020617]
        backdrop-blur-xl shadow-lg
        group-hover:shadow-indigo-500/20
        transition-all duration-200 group-hover:-translate-y-1
      "
      >
        {/* SHINE OVERLAY */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            ref={shineRef}
            className="
              absolute top-[-20%] left-[-120%]
              h-[140%] w-[90%]
              bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)]
              skew-x-[-20deg]
            "
          />
        </div>

        {/* CONTENT */}
        <div className="relative p-5 space-y-5">
          <div
            style={{
              transform: `perspective(600px) rotateX(${-0.25 * tilt.y}deg)`,
            }}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={project.image || image}
              alt={project.title}
              className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="space-y-3 text-center">
            <h3 className="text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400">{project.desc}</p>

            <div className="flex justify-center gap-3 pt-2">
              {project.tags.map((tag, i) => (
                <img
                  key={i}
                  src={tag.path}
                  className="h-8 w-8 opacity-80 hover:opacity-100"
                />
              ))}
            </div>

            <a className="inline-block pt-4 text-sm text-indigo-400 hover:text-indigo-300">
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
