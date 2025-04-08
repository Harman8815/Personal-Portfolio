import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGithub, FaLinkedin, FaUniversity } from "react-icons/fa";
import { MdWork, MdMemory } from "react-icons/md";
import { SiHiveBlockchain, SiOpensourceinitiative } from "react-icons/si";

const Experience = () => {
  return (
    <section id="experience" className="bg-primary text-white py-12">
      <h2 className="section-title text-center text-6xl font-bold mb-10">
        Experiences
      </h2>
      <VerticalTimeline>
        {/* Winter of Blockchain */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Sep 2024 - Nov 2024"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff",  }}
          icon={
            <img
              src="../assets/images/experiences/WOB.jpg"
              alt="Custom Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
          }
        >
          <h3 className="vertical-timeline-element-title">Campus Ambassador</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Winter of Blockchain (Remote)
          </h4>
          <p>
            Campus Ambassador for a Blockchain event, enrolling participants,
            managing tasks, and actively contributing to open source projects on
            GitHub. Leading and engaging campus community.
          </p>
        </VerticalTimelineElement>

        {/* ABV-IIITM Research Intern */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Aug 2024"
          iconStyle={{ background: "rgb(255, 255, 255)", color: "#fff" }}
          icon={<img
            src="../assets/images/experiences/IIIT.png"
            alt="Custom Icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />}
        >
          <h3 className="vertical-timeline-element-title">Research Intern</h3>
          <h4 className="vertical-timeline-element-subtitle">
            ABV-Indian Institute of Information Technology and Management
          </h4>
          <p>
            I conducted research on methods to enhance the current applications
            of machine learning in cybersecurity.
          </p>
        </VerticalTimelineElement>

        {/* GirlScript Summer of Code Contributor */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="May 2024 - Aug 2024"
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<img
            src="../assets/images/experiences/GSSOC.jpg"
            alt="Custom Icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />}
        >
          <h3 className="vertical-timeline-element-title">Contributor</h3>
          <h4 className="vertical-timeline-element-subtitle">
            GirlScript Summer of Code (Remote)
          </h4>
          <p>
            Contributed to real-world projects in real-time, collaborated with
            diverse developers, and enhanced my skills to align with industry
            standards. This experience had deepened my technical expertise and
            honed my problem-solving abilities for future challenges.
          </p>
        </VerticalTimelineElement>

        {/* Oasis Infobyte Summer Intern */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Sep 2023"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<img
            src="../assets/images/experiences/oasis_infobyte.jpg"
            alt="Custom Icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />}
        >
          <h3 className="vertical-timeline-element-title">Summer Intern</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Oasis Infobyte (Remote)
          </h4>
          <p>
            Object-Oriented Programming (OOP), Java Development and +2 skills.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        />
      </VerticalTimeline>
    </section>
  );
};

export default Experience;
