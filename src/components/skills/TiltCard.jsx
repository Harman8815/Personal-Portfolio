"use client";

import React, { useState } from "react";

const TiltCard = ({ children, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    const x = (offsetX / width) * -30 + 15;
    const y = (offsetY / height) * 30 + 15;

    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={` relative h-full tilt-card div${
        index + 1
      }  border  shadow-md  ring-2 ring-blue-800 rounded-lg p-4  
       transition-all duration-300 ease-in-out transform hover:scale-105 
       hover:bg-gradient-to-tr from-cyan-500 to-purple-600 hover:shadow-xl hover:shadow-purple-500/30`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.1s ease",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
