import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo, FaBehance, FaDribbble, FaGithub, FaPiedPiper } from 'react-icons/fa';

const Links = () => {
  return (
    <div className="w-full min-h-[30vh] bg-primary flex justify-center items-center">
      <div id="social-test" className="text-center">
        <h2 className="text-white text-3xl font-light mb-12">Social Buttons</h2>
        <ul className="social flex justify-center space-x-6">
          <li>
            <FaFacebook className="icon text-gray-300 hover:text-yellow-500 " />
          </li>
          <li>
            <FaTwitter className="icon text-gray-400 hover:text-yellow-500" />
          </li>
          <li>
            <FaInstagram className="icon text-gray-400 hover:text-yellow-500" />
          </li>
          <li>
            <FaVimeo className="icon text-gray-400 hover:text-yellow-500" />
          </li>
          <li>
            <FaBehance className="icon text-gray-400 hover:text-yellow-500" style/>
          </li>
          <li>
            <FaDribbble className="icon text-gray-400 hover:text-yellow-500" />
          </li>
          <li>
            <FaGithub className="icon text-gray-400 hover:text-yellow-500" />
          </li>
          <li>
            <FaPiedPiper className="icon text-gray-400 hover:text-yellow-500" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Links;
