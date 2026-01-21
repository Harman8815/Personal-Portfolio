"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 shadow-md  ${
        scrolled ? "bg-black bg-opacity-90 " : "bg-transparent"
      } text-white`}
    >
      <div className="container mx-auto flex items-center justify-between py-1 px-4 laptop:px-8">
        {/* Left Section */}
        <div className="text-lg font-bold">Harman</div>

        {/* Center Navigation */}
        <nav className="space-x-6  md:flex">
          <Link
            to="home"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            About
          </Link>
          <Link
            to="skills"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Skills
          </Link>
          <Link
            to="projects"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Projects
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Right Button */}
        <div>
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
            Resume
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
