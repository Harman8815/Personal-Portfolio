import React from "react";
import Earth from "./Earth.jsx";

const Contact_me = () => {
  return (
    <section
      id="contactus"
      className="bg-primary flex justify-center items-center px-4 sm:px-6 md:px-10 py-12"
    >
      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row justify-center items-center gap-8 rounded-2xl bg-primary/70 shadow-sm p-6 sm:p-8 md:p-10">
        <div className="w-full lg:w-[45%] bg-primary border-2 border-white rounded-2xl p-6">
          <h2 className="text-2xl text-white text-center font-semibold mb-4">
            Contact Us
          </h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white block mb-1">
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
              <label htmlFor="email" className="text-white block mb-1">
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
              <label htmlFor="message" className="text-white block mb-1">
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
  );
};

export default Contact_me;
