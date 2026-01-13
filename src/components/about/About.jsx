import React, { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Developermodel from "../Developermodel.jsx"
import Boxer from "./Boxer.jsx"

const About = () => {
  const [animationName, setAnimationName] = useState("idle")
  const aboutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  let lastScrollY = window.scrollY

  const handleClick = () => {
    const animations = ["idle", "clapping", "salute", "victory"]
    setAnimationName(animations[Math.floor(Math.random() * animations.length)])
    setTimeout(() => setAnimationName("idle"), 5000)
  }

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const { left, top, width, height } = card.getBoundingClientRect()
    const offsetX = e.clientX - left
    const offsetY = e.clientY - top

    const x = (offsetX / width) * -30 + 5
    const y = (offsetY / height) * 30 + 5

    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  useEffect(() => {
    const handleScroll = () => {
      const section = aboutRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()

      setScrollDirection(window.scrollY > lastScrollY ? "down" : "up")
      lastScrollY = window.scrollY

      setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible) {
      setAnimationName("victory")
    } else if (scrollDirection === "down") {
      setAnimationName("salute")
    }
  }, [isVisible, scrollDirection])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="bg-linear-to-b from-[#000026] to-[#030303] text-white flex flex-row justify-center items-center laptop:min-h-[100vh] min-h-[70vh] cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="container px-10 py-12 mr-20 flex flex-row-reverse gap-10">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: "transform 0.1s ease",
            willChange: "transform",
          }}
          className="container left w-1/2 mr-20 ring-4 ring-blue-800 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-tr from-cyan-500 to-purple-600 px-10 py-4 rounded-4xl relative pt-6 h-fit pb-10"
        >
          <div className="info space-y-8 text-xl">
            <p className="pl-48">
              I am a passionate and dedicated individual with a strong interest
              in technology and innovation. I thrive on solving complex problems
              and constantly seek to improve my skills through learning and
              collaboration. With a background in software development and a
              keen eye for detail, I strive to create meaningful and impactful
              solutions.
            </p>
            <p>
              Throughout my journey, I’ve worked on various projects that
              reflect my ability to adapt, lead, and contribute effectively to
              team goals. I believe in writing clean, maintainable code and
              building user-friendly interfaces. My experiences have taught me
              the importance of perseverance, communication, and staying curious
              in an ever-evolving field.
            </p>
            <p>
              I am always eager to take on new challenges and explore
              opportunities that push me beyond my comfort zone. Whether it’s
              developing full-stack applications, diving into AI/ML, or
              contributing to open-source, I am committed to continuous growth
              and making a positive difference through technology.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-60 h-60 rounded-xl">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
              <Boxer scale={1.8} tilt={tilt}/>
            </Canvas>
          </div>
        </div>
        <div className="right w-1/2 min-h-[300px] rounded-4xl -mt-40">
          <Canvas>
            <ambientLight intensity={7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            <Developermodel
              position-y={-3}
              scale={3}
              animationName={animationName}
              rotation-x={0.05}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default About
