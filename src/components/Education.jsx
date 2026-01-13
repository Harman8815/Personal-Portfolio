import React from "react";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EducationCard = ({ edu }) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const el = cardRef.current;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
        scale: 1,
        background: "#0d1117",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1.05,
        backgroundImage: "linear-gradient(to top right, #06b6d4, #7c3aed)", // cyan to purple
        boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)", // hover shadow
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return (
    <div
      ref={cardRef}
      className="bg-[#0d1117] p-8 rounded-lg ring-2 ring-blue-800 "
    >
      <h3 className="text-3xl font-bold mb-4">{edu.title}</h3>
      <p className="text-xl mb-3">{edu.degree}</p>
      <p className="text-md mb-3">{edu.duration}</p>
      <p className="text-md">Grade: {edu.grade}</p>
      <p className="text-md mt-6">{edu.activities}</p>
    </div>
  );
};

const educationData = [
  {
    title: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
    degree: "Bachelor of Technology - BTech, Computer Software Engineering",
    duration: "Oct 2021 - Aug 2025",
    grade: "7.8 CGPA",
    activities:
      "Engaged in hackathons, coding competitions, and volunteered for sports events.",
  },
  {
    title: "Central Board of Secondary Education",
    degree: "12th CBSE, PCM",
    duration: "Aug 2019 - Aug 2020",
    grade: "86%",
    activities:
      "Served as the Head Boy. Participated in science fairs and created innovative projects.",
  },
  {
    title: "CISCE",
    degree: "10th",
    duration: "Aug 2017 - Aug 2018",
    grade: "80%",
    activities: "Took part in inter-school events and team-based competitions.",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="bg-primary text-white py-16 px-4 tablet:px-8 laptop:px-16 overflow-hidden"
    >
      <h2 className="section-title text-center text-3xl tablet:text-4xl laptop:text-5xl font-extrabold mb-12">
        Education
      </h2>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 px-4">
          {educationData.map((edu, index) => (
            <EducationCard key={index} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
