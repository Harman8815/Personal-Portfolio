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

const SkillTiers = () => {
  const tiers = [
    {
      id: 1,
      title: "Frontend",
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
      items: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Python", icon: <SiPython /> },
        { name: "Java", icon: <FaJava /> },
      ],
    },
    {
      id: 3,
      title: "Backend",
      items: [
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Flask", icon: <SiFlask /> },
        { name: "Socket.io", icon: <SiSocketdotio /> },
      ],
    },
    {
      id: 6,
      title: "Machine Learning",
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
      items: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "MySQL", icon: <SiMysql /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
      ],
    },
    {
      id: 5,
      title: "DevOps / Tools",
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
    <div className="parent min-w-3xl laptop:max-w-4xl pl-14">
      {tiers.map((tier, index) => (
        <TiltCard key={index} index={index}>
          <div
            key={tier.id}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              {tier.title}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tier.items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 ">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </TiltCard>
      ))}
    </div>
  );
};

export default SkillTiers;
