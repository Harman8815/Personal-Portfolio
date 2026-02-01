import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 px-4 tablet:px-8 laptop:px-16">
      <div className="max-w-7xl mx-auto flex flex-col laptop:flex-row items-center justify-between gap-8">
        
        {/* Left */}
        <div className="text-center laptop:text-left">
          <h2 className="text-xl tablet:text-2xl font-semibold">
            Harman Deep Singh
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-md">
            Passionate Web Developer | Continuous Learner | Innovator
          </p>
        </div>

        {/* Middle */}
        <nav className="flex gap-6 text-sm">
          <a href="#about" className="text-gray-300 hover:text-white transition">
            About
          </a>
          <a href="#projects" className="text-gray-300 hover:text-white transition">
            Projects
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Right */}
        <div className="flex gap-5 text-lg">
          <a
            href="https://github.com/harman88157"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/harman-deep-singh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="mailto:harman88157@gmail.com"
            className="text-gray-300 hover:text-white transition"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        © 2025 Harman Deep Singh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
