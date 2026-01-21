"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard.jsx";
import { myProjects, skillTags } from "../../data/index.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MoreProjects = () => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState(["all"]); // normalized
  const containerRef = useRef(null);
  const triggerRefs = useRef([]);

  const allTags = ["all", ...Object.keys(skillTags).map((t) => t.toLowerCase())];

  const handleTagClick = (tag) => {
    console.log(tag)
    const normalizedTag = tag.toLowerCase().replace(/\./g, "");
    if (normalizedTag === "all") {
      setActiveTags(["all"]);
    } else {
      setActiveTags((prev) => {
        const newTags = prev.includes(normalizedTag)
          ? prev.filter((t) => t !== normalizedTag)
          : [...prev.filter((t) => t !== "all"), normalizedTag];
        return newTags.length === 0 ? ["all"] : newTags;
      });
    }
  };

  // Filter projects based on normalized tags
  const filteredProjects = myProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

    const projectTagSlugs = project.tags.map((t) =>
      t.slug ? t.slug.toLowerCase().replace(/\./g, "") : t.name.toLowerCase().replace(/\./g, "")
    );

    const matchesTags = activeTags.includes("all") || projectTagSlugs.some((slug) => activeTags.includes(slug));

    return matchesSearch && matchesTags;
  });

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".product-card");
    triggerRefs.current = [];

    cards.forEach((card) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
        onEnter: () => scrollInAnimation(card),
        onLeave: () => scrollOutAnimation(card),
        onEnterBack: () => scrollReEnterAnimation(card),
        onLeaveBack: () => scrollOutUpAnimation(card),
      });
      triggerRefs.current.push(trigger);
    });

    function scrollInAnimation(card) {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    function scrollOutAnimation(card) {
      gsap.to(card, { y: -50, opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.in" });
    }

    function scrollReEnterAnimation(card) {
      gsap.fromTo(
        card,
        { y: -100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );
    }

    function scrollOutUpAnimation(card) {
      gsap.to(card, { y: 50, opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.in" });
    }

    return () => triggerRefs.current.forEach((t) => t?.kill());
  }, [visibleCount, activeTags, searchQuery]);

  return (
    <section
      id="allprojects"
      ref={containerRef}
      className="bg-primary flex flex-col justify-center items-center text-white px-6 md:px-20 py-12 space-y-8"
    >
      <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold mb-6">All Projects</h2>

      {/* Tabs & Search */}
      <div className="flex flex-col laptop:flex-row justify-between items-center w-full gap-4 mb-8 px-2 tablet:px-12 laptop:px-18">
        <div className="flex flex-wrap gap-3 w-full laptop:w-full">
          {allTags.map((slug) => {
            const tag = skillTags[slug] || {};
            const normalizedSlug = slug.toLowerCase().replace(/\./g, "");
            const isActive = activeTags.includes(normalizedSlug);
            return (
              <button
                key={slug}
                onClick={() => handleTagClick(slug)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200
                  ${isActive ? (tag.color ? `bg-gradient-to-r ${tag.color} text-white shadow-md transform scale-105` : "bg-indigo-500 text-white shadow-md transform scale-105") : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"}
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1
                `}
              >
                {tag.icon && <img src={tag.icon} alt={tag.label} className="w-4 h-4" />}
                {tag.label || (slug === "all" ? "All" : slug)}
              </button>
            );
          })}
        </div>

        <div className="w-full laptop:w-auto">
          <input
            type="text"
            placeholder="Search Projects..."
            className="w-full laptop:w-auto laptop:min-w-[470px] px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid w-full tablet:grid-cols-2 grid-cols-1 laptop:grid-cols-3 gap-6 sm:gap-8 place-items-center">
        {filteredProjects.slice(0, visibleCount).map((data, index) => (
          <ProductCard key={index} project={data} className="product-card" />
        ))}
      </div>

      {visibleCount < filteredProjects.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 9)}
          className="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 text-lg font-semibold"
        >
          See More
        </button>
      )}
    </section>
  );
};

export default MoreProjects;
