import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary py-8 px-4 tablet:px-8 laptop:px-16">
      <div className="max-w-7xl mx-auto flex flex-col laptop:flex-row items-center justify-between gap-8">
        
        {/* Left */}
        <div className="text-center laptop:text-left">
          <h2 className="text-xl tablet:text-2xl font-semibold">
            Harman Deep Singh
          </h2>
          <p className="mt-2 text-sm text-secondary max-w-md">
            Passionate Web Developer | Continuous Learner | Innovator
          </p>
        </div>

        {/* Middle */}
        <nav className="flex gap-6 text-sm">
          <a href="#about" className="text-secondary hover:text-primary transition">
            About
          </a>
          <a href="#projects" className="text-secondary hover:text-primary transition">
            Projects
          </a>
          <a href="#contact" className="text-secondary hover:text-primary transition">
            Contact
          </a>
        </nav>

        {/* Right */}
        <div className="flex gap-5 text-lg">
          <a
            href="https://github.com/harman88157"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/harman-deep-singh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="mailto:harman88157@gmail.com"
            className="text-secondary hover:text-primary transition"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-secondary">
        © 2025 Harman Deep Singh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
