import React, { useRef } from "react";
import Earth from "./Earth.jsx";

const Contact_me = ({ refs, visible }) => {
  const containerRef = refs?.containerRef || useRef(null);
  const headerRef = refs?.headerRef || useRef(null);

  return (
    <>
      {/* Header Block - Same design as Education and Social */}
      <div
        ref={headerRef}
        className="flex flex-col items-center text-center z-50 pointer-events-none absolute"
      >
        <span className="font-mono text-[10px] md:text-[12px] tracking-[0.8em] uppercase text-cyan-500 mb-2">
          Get_In_Touch
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Contact
        </h2>
        <div className="h-[2px] w-48 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 rounded-full opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.8)]"></div>
      </div>

      {/* Contact Container */}
      <section
        ref={containerRef}
        id="contactus"
        className=" flex justify-center items-center px-4 sm:px-6 md:px-10 py-12 min-h-screen"
      >
        <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row justify-center items-center gap-8 rounded-2xl  shadow-sm p-6 sm:p-8 md:p-10">
          <div className="w-full lg:w-[45%] border-2 border-primary rounded-2xl p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-primary block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-primary block mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-primary block mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Write your message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="w-full lg:w-[45%] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex justify-center items-center">
            <Earth />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact_me;
