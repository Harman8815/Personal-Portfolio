import { useState } from "react";
import React from "react";
import CircleWithBoxes from "./CircleWithBoxes";

const Skills = () => {
  const [skillName, setskillName] = useState("Skills");
  const [skildescription, setskildescription] = useState(
    "This section showcases my skills"
  );
  const skills = [
    ["javascript", "python", "java"],
    ["typescript", "html5", "css3", "react.js", "redux"],
    ["node.js", "express.js", "flask", "socket.io", "three.js", "Material UI"],
    ["mongodb", "mysql", "bootstrap", "tailwind css", "sass"],
    [
      "docker",
      "netlify",
      "github",
      "postman",
      "vercel",
      "tensorflow",
      "pytorch",
    ],
    ["pandas", "numpy"],
  ];

  return (
    <section
      id="skills"
      className="text-white bg-linear-to-t from-[#0c0c0c] via-black to-[#01000f] flex flex-col min-h-[100vh] w-full justify-center items-center align-baseline relative"
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] laptop:h-[150%] desktop:h-[120%] bg-cover bg-no-repeat bg-center "
        style={{
          backgroundImage: "url('../assets/bg-skills.jpg')",
          opacity: "0.7",
          transition: "opacity 0.3s ease-in-out",
        }}
      ></div>

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[120%]  mix-blend-multiply"
        style={{
          backgroundColor: "slateblue",
          opacity: 1,
          zIndex: 1,
        }}
      ></div>
      <h1 className="text-7xl desktop:text-7xl laptop:text-4xl text-center mb-10 z-10">Skills</h1>
      <div className="container z-20 relative">
        <ul className="relative flex flex-col justify-center items-center align-middle -mt-14 desktop:-mt-14 laptop:-mt-10.5">
          {Array.from({ length: 6 }, (_, index) => {
            console.log(window.innerWidth);
           const radius = window.innerWidth < 1600 ? (100 + index * 80) : (150 + index * 100);

            const speed = 7 + index;
            const direction = index % 2 === 0 ? 1 : -1;
            const zIndex = 20 - index;

            return (
              <li key={index} className="absolute" style={{ zIndex }}>
                <CircleWithBoxes
                  radius={radius}
                  numOfBoxes={skills[index].length}
                  speed={speed}
                  direction={direction}
                  skills={skills[index]}
                  setskillName={setskillName} 
                  setskildescription={setskildescription} 
                />
              </li>
            );
          })}
        </ul>
      </div>

    {skillName&&  <div className="absolute -top-[4%] right-[3%] w-70 min-h-50 desktop:w-70 laptop:w-50 desktop:min-h-50 laptop:min-h-30 flex-col justify-start p-4 bg-gray-800 z-20">
        <strong className="text-2xl  desktop:text-2xl laptop:text-xl font-bold uppercase">{skillName}</strong>
        <p className="mt-4 text-lg desktop:text-lg laptop:text-sm">{skildescription}</p>
      </div>}
    </section>
  );
};

export default Skills;
