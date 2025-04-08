import React from "react";

import EmblaCarousel from "./embla/EmblaCarousel.jsx";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const MajorProjects = () => {
  return (
    <section
      id="project"
      className=" bg-linear-to-t from-[#03041f]  to-[#030303] major-projects-section  min-h-screen w-full text-white  py-12 pt-30"
    >
      <h2 className=" section-title text-center text-6xl font-bold mb-10 mt-20">
        Major Projects
      </h2>

      <EmblaCarousel slides={SLIDES} options={OPTIONS} certificates={false} />
    </section>
  );
};

export default MajorProjects;
