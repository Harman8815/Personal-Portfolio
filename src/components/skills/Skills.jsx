import React from "react";
import SkillCloud from "./SkillCloud";
import SkillTiers from "./SkillTiers";
import { slugs } from "../../data";

const Skills = () => {
  return (
    <section className="w-full  bg-black py-10 text-white px-6">
      <h2 className="text-6xl font-bold laptop:text-5xl desktop:text-6xl text-center pb-10">
        Skills
      </h2>
      <div className="flex flex-row gap-10 ">
        <SkillTiers />
        <SkillCloud slugs={slugs} />
      </div>
    </section>
  );
};

export default Skills;
