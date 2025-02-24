import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col laptop:flex-row justify-between items-center">
        {/* Left Side - Logo and Description */}
        <div className="text-center laptop:text-left mb-6 laptop:mb-0">
          <h2 className="text-2xl font-semibold">Harman Deep Singh</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xs laptop:max-w-md">
            Passionate Web Developer | Continuous Learner | Innovator
          </p>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex flex-col laptop:flex-row laptop:space-x-6 text-center laptop:text-left">
          <a href="#about" className="text-gray-300 hover:text-white mb-2 laptop:mb-0">
            About
          </a>
          <a href="#projects" className="text-gray-300 hover:text-white mb-2 laptop:mb-0">
            Projects
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4 laptop:space-x-6 mt-6 laptop:mt-0">
          <a
            href="https://github.com/harman88157"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-lg desktop:text-xl"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/harman-deep-singh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-lg desktop:text-xl"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:harman88157@gmail.com"
            className="text-gray-300 hover:text-white text-lg desktop:text-xl"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 Harman Deep Singh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
