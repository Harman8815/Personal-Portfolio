"use client";
import React, { useState } from "react";
import Link from "next/link";

const More = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer hover:text-yellow-400 transition"
      >
        More
      </button>
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 bg-black bg-opacity-90 text-white rounded-md shadow-lg z-50"
        >
          <ul className="py-2">
            <li className="hover:bg-gray-700">
              <Link href="/moreprojects" className="block px-4 py-2">More Projects</Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link href="/experience" className="block px-4 py-2">Experience</Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link href="/achievements" className="block px-4 py-2">Achievements</Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link href="/certifications" className="block px-4 py-2">Certifications</Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link href="/links" className="block px-4 py-2">Links</Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link href="/education" className="block px-4 py-2">Education</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default More;
