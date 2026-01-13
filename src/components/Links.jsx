import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo, FaBehance, FaDribbble, FaGithub, FaPiedPiper } from 'react-icons/fa';

const Links = () => {
  return (
   <div className="w-full min-h-[30vh] bg-primary flex items-center justify-center px-4 tablet:px-8 laptop:px-16">
  <div id="social-test" className="text-center">
    <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold mb-6 text-center text-white">
         Social Buttons
    </h2>

    <ul className="flex flex-wrap justify-center gap-6">
      <li><FaFacebook className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaTwitter className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaInstagram className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaVimeo className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaBehance className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaDribbble className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaGithub className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
      <li><FaPiedPiper className="icon text-gray-400 hover:text-yellow-500 transition-colors" /></li>
    </ul>
  </div>
</div>

  );
};

export default Links;
