"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 ${scrolled
          ? "bg-[#020617]/90 border-b border-gray-800 shadow-md"
          : "bg-transparent"
        } text-white`}
    >
      <div className=" mx-auto flex items-center justify-between py-2 px-4 laptop:px-8">
        <div className="text-lg font-bold">Harman</div>

        <nav className="hidden lg:flex space-x-6">
          <Link
            to="home"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            About
          </Link>
          <Link
            to="project"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            All Projects
          </Link>
          <Link
            to="experience"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            Experience
          </Link>
          <Link
            to="achievements"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            Achievements
          </Link>
          <Link
            to="certifications"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            Certifications
          </Link>
          <Link
            to="education"
            smooth
            duration={500}
            className="cursor-pointer hover:text-yellow-400"
          >
            Education
          </Link>
        </nav>

        <div className="hidden lg:block">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
            Resume
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#020617] border-t border-gray-800 px-4 py-4 space-y-4">
          <Link
            to="home"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            About
          </Link>
          <Link
            to="project"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            All Projects
          </Link>
          <Link
            to="experience"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            Experience
          </Link>
          <Link
            to="achievements"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            Achievements
          </Link>
          <Link
            to="certifications"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            Certifications
          </Link>
          <Link
            to="education"
            smooth
            duration={500}
            onClick={() => setOpen(false)}
            className="block"
          >
            Education
          </Link>

          <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition">
            Resume
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
