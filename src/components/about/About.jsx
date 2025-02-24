import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Developermodel from "../Developermodel.jsx";

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"];

const About = () => {
  const [animationName, setAnimationName] = useState("idle");
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [containerOpen, setContainerOpen] = useState(true);
  let lastScrollY = window.scrollY;
  const listRef = useRef(null);

  const handleClick = () => {
    const animations = ["idle", "clapping", "salute", "victory"];
    setAnimationName(animations[Math.floor(Math.random() * animations.length)]);
    setTimeout(() => setAnimationName("idle"), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = aboutRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setScrollDirection(window.scrollY > lastScrollY ? "down" : "up");
      lastScrollY = window.scrollY;
      setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) setAnimationName("victory");
    else if (scrollDirection === "down") setAnimationName("salute");
  }, [isVisible, scrollDirection]);

  const Item = ({ skill }) => (
    <div className=" text-black flex flex-col items-center transition duration-1000 ease-in-out clip-path-custom rounded-tr-2xl rounded-bl-2xl">
      <div className="card bg-gray-800 p-4 rounded-lg shadow-lg border border-white text-center">
        <h2 className="text-white text-3xl desktop:text-3xl laptop:text-2xl">{skill}</h2>
        <p className="text-white text-sm desktop:text-sm laptop:text-[0.8rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={aboutRef}
      id="about"
      className="bg-linear-to-b from-[#000026]  to-[#030303]  text-white flex flex-row justify-center items-center laptop:min-h-[150vh] min-h-[70vh] cursor-pointer select-none pb-30"
      onClick={handleClick}
    >
      <div className="container px-10 py-12 rounded-4xl flex flex-row gap-10">
        <div className="left w-1/2 ml-28 desktop:ml-24 laptop:ml-30 ">
          <div className="relative flex justify-center items-center min-h-[90vh] min-w-[90%]">
            {containerOpen ? (
              <div
                className="circle bg-amber-300 rounded-full w-114 h-114 laptop:w-94 desktop:w-114 laptop:h-94 desktop:h-114 flex justify-center items-center cursor-pointer transition-all duration-1000 ease-in-out"
                onClick={() => setContainerOpen(false)}
              >
                <h2 className="text-black text-3xl">About</h2>
              </div>
            ) : (
              <>
                <div
                  className="absolute w-84 h-84 desktop:w-84 laptop:w-74 desktop:h-84 laptop:h-74 z-2 bg-[#06013a] transition-all duration-1000 ease-in-out clip-path-custom rounded-full flex flex-col items-center justify-center align-middle p-8"
                  onClick={() => setContainerOpen(true)}
                >
                  <div className="w-20 h-20 bg-white rounded-lg mx-auto"></div>
                  <span className="font-bold text-white text-center text-lg mt-2">
                    About Me
                  </span>
                  <p className="font-normal text-white text-center text-sm mt-2">
                    I’m Walter, a multidisciplinary designer who focuses on
                    telling my clients’ stories visually.
                  </p>
                  <button className="px-6 py-2 mt-4 mx-auto rounded-full border-none font-bold bg-white text-black transition duration-400 hover:bg-red-500 hover:text-white cursor-pointer">
                    Resume
                  </button>
                </div>

                <ul
                  ref={listRef}
                  className="about-list relative w-[300px] h-[300px] flex justify-center items-center"
                >
                  {skills.map((skill, index) => {
                    let angle = (index / skills.length) * 360 + 15;
                    return (<li
                      key={skill}
                      className="absolute w-[220px] h-[220px] flex justify-center items-center transition-all duration-2000 ease-in-out"
                      style={{
                        transform: `rotate(${angle}deg) translate(${
                          window.innerWidth < 1600 ? 300 : 360
                        }px) rotate(${-angle}deg)`,
                      }}
                    >
                    
                        <div
                          className="absolute w-[2px] h-[320px] desktop:h-[320px] laptop:h-[200px] bg-[#2a1a63]"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${
                              angle + 90
                            }deg) translate(45px)`,
                            transformOrigin: "top center",
                          }}
                        ></div>

                        <span className="bg-[#2a1a63] text-black px-4 py-2 rounded-md shadow-lg transition duration-1000 ease-in-out rounded-tr-2xl rounded-bl-2xl">
                          <Item skill={skill} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="right w-1/2 min-h-[300px] rounded-4xl  -mt-40">
          <Canvas >
            <ambientLight intensity={7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            <Developermodel
              position-y={-3}
              scale={2.8}
              animationName={animationName}
              rotation-x={0.05}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default About;
