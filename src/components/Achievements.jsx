// Achievements.jsx
import React, { useEffect, useRef } from "react";
import { achievements } from "../data/achievementsData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const hexToRgb = (hex) => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return match
    ? `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(
        match[3],
        16
      )}`
    : "";
};

const Achievements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll("li");

    items.forEach((item) => {
      const icon = item.querySelector(".icon");
      const content = item.querySelectorAll(".title, .descr");

      ScrollTrigger.create({
        trigger: item,
        start: "top 99%",

        onEnter: () => animateItem(icon, item),
        onEnterBack: () => animateItem(icon, item),
      });
    });

    function animateItem(icon, content) {
      // Animate icon: scale and rotate
      gsap.fromTo(
        icon,
        { rotateY: 0, scale: 0, opacity: 0 },
        {
          rotateY: 1440,
          scale: 1,
          opacity: 1,
          duration: 4,
          ease: "power4.out",
        }
      );

      // Animate content (title and description): slide up with stagger
      gsap.fromTo(
        content,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2, // Stagger for title and description
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup
  }, []);

  return (<section id="achievements" className="text-white bg-primary py-8 px-4 tablet:px-8 laptop:px-16">

      <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold mb-6 text-center">
        Achievements
      </h2>
      <ul
        ref={containerRef}
        className="w-full max-w-6xl mx-auto py-20 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5 gap-8 place-items-center"
      >
        {achievements.map(({ title, image, color, descr }, index) => (
          <li
            key={index}
            className="max-w-xs mx-auto text-center"
            style={{ "--icon-color-rgb": hexToRgb(color), "--bgColor": color }}
          >
            <div
              className="icon w-32 h-32 rounded-full p-4 flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <img
                src={image}
                alt={title}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="title text-lg font-semibold uppercase mt-2">
              {title}
            </div>
            <div className="descr text-sm text-gray-200 whitespace-pre-line">
              {descr}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <Link
          to="/achievements"
          className="inline-block px-8 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg hover:from-blue-400 hover:to-blue-600 transition-all duration-300 text-lg font-semibold"
        >
          View All Achievements
        </Link>
      </div>
    </section>
  );
};

export default Achievements;
