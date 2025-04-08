import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { myProjects } from "../../data/index.js";
gsap.registerPlugin(ScrollTrigger);

const MoreProjects = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".product-card");

    cards.forEach((card) => {
      triggerRef.current = ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse", // Handles play/reverse for scroll in/out
        onEnter: () => scrollInAnimation(card),
        onLeave: () => scrollOutAnimation(card),
        onEnterBack: () => scrollReEnterAnimation(card),
        onLeaveBack: () => scrollOutUpAnimation(card),
      });
    });

    function scrollInAnimation(card) {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    function scrollOutAnimation(card) {
      gsap.to(card, {
        y: -50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.in",
      });
    }

    function scrollReEnterAnimation(card) {
      gsap.fromTo(
        card,
        { y: -100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    function scrollOutUpAnimation(card) {
      gsap.to(card, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.in",
      });
    }

    return () => {
      triggerRef.current?.kill(); // Kill only this instance
    };
  }, []);

  return (
    <section
      id="allprojects"
      ref={containerRef}
      className="bg-primary flex flex-col justify-center items-center text-white px-20 py-12 space-y-8"
    >
      <h2 className="text-6xl font-bold laptop:text-5xl desktop:text-6xl">All Projects</h2>
      <div className="grid grid-cols-1 laptop:grid-cols-3 gap-8 w-full justify-center justify-items-center">
        {myProjects.map((data, index) => (
          <ProductCard key={index} project={data} className="product-card" />
        ))}
      </div>
    </section>
  );
};

export default MoreProjects;
