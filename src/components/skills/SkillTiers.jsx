import React from "react";
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiSocketdotio,
  SiThreedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import TiltCard from "./TiltCard";
import "./style.css";

const SkillTiers = ({ skillref }) => {
  const tiers = [
    {
      id: 1,
      title: "Frontend",
      className: "lg:col-span-1 lg:row-span-2",
      items: [
        { name: "React", icon: <SiReact /> },
        { name: "Redux", icon: <SiRedux /> },
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "CSS3", icon: <SiCss3 /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "Bootstrap", icon: <SiBootstrap /> },
        { name: "Material UI", icon: <SiMui /> },
        { name: "SASS", icon: <SiSass /> },
        { name: "Three.js", icon: <SiThreedotjs /> },
      ],
    },
    {
      id: 2,
      title: "Core Languages",
      className: "lg:col-span-1 lg:row-span-1",
      items: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Python", icon: <SiPython /> },
        { name: "Java", icon: <FaJava /> },
      ],
    },
    {
      id: 6,
      title: "Machine Learning",
      className: "lg:col-span-1 lg:row-span-1",
      items: [
        { name: "TensorFlow", icon: <SiTensorflow /> },
        { name: "PyTorch", icon: <SiPytorch /> },
        { name: "Pandas", icon: <SiPandas /> },
        { name: "NumPy", icon: <SiNumpy /> },
      ],
    },
    {
      id: 4,
      title: "Databases",
      className: "lg:col-span-1 lg:row-span-1",
      items: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "MySQL", icon: <SiMysql /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
      ],
    },
    {
      id: 5,
      title: "Backend",
      className: "lg:col-span-1 lg:row-span-2",
      items: [
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Flask", icon: <SiFlask /> },
        { name: "Socket.io", icon: <SiSocketdotio /> },
      ],
    },
    {
      id: 3,
      title: "DevOps / Tools",
      className: "lg:col-span-2 lg:row-span-1",
      items: [
        { name: "Docker", icon: <SiDocker /> },
        { name: "GitHub", icon: <SiGithub /> },
        { name: "Postman", icon: <SiPostman /> },
        { name: "Vercel", icon: <SiVercel /> },
        { name: "Netlify", icon: <SiNetlify /> },
      ],
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
    auto-rows-fr gap-6 w-full"
    >
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={`skill-card-container h-full  ${tier.className}`}
        >
          <TiltCard>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {tier.title}
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
                {tier.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-3 group/item"
                  >
                    <span className="text-lg text-slate-500 group-hover/item:text-cyan-400 transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors duration-300 font-mono">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>
      ))}
    </div>
  );
};

export default SkillTiers;
