import React from "react";
import { Link } from "react-scroll";
const Navbar = () => {
  return (
    <header className="z-4 bg-primary/60 text-white shadow-md relative navbar">
      <div className="container mx-auto flex items-center justify-between p-1 laptop:p-1.5 desktop:p-4 desktop:px-12">
        {/* Left Section (1/6) */}
        <div className="w-1/6 text-lg font-semibold">
          <h1>Harman's Portfolio</h1>
        </div>

        {/* Center Section (3/6) - Navigation */}
        <nav className="w-3/6">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="skills"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 transition"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 transition"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section (1/6) */}
        <div className="w-1/6 flex justify-end items-center align-baseline">
          <button className="bg-blue-600 px-4 py-2 desktop:text-xl laptop:text-sm text-center rounded-lg hover:bg-blue-700 transition">
            Resume
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
