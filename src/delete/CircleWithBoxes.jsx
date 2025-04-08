import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
const skillDescriptions = [
  // 🟡 Circle 1 (Core Skills)
  {
    name: "JavaScript",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    description:
      "A versatile, high-level programming language primarily used for building interactive web applications.",
  },
  {
    name: "TypeScript",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    description:
      "A superset of JavaScript that introduces static typing, enhancing code quality and development efficiency.",
  },
  {
    name: "Python",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    description:
      "A high-level programming language known for its readability and versatility in fields like web development, data science, and AI.",
  },
  {
    name: "C++",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    description:
      "A powerful general-purpose language widely used for system software, game development, and performance-critical applications.",
  },
  {
    name: "Java",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    description:
      "A widely used, object-oriented programming language, ideal for building large-scale enterprise applications.",
  },
  {
    name: "HTML5",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    description:
      "The standard markup language for creating web pages and web applications, enabling structure and content presentation.",
  },
  {
    name: "CSS3",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    description:
      "A style sheet language used to describe the presentation of a document written in HTML or XML, enabling responsive design and animations.",
  },

  // 🔵 Circle 2 (Frontend Libraries & Frameworks)
  {
    name: "React.js",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    description:
      "A widely used JavaScript library for building user interfaces, especially for single-page applications.",
  },
  {
    name: "Redux",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
    description:
      "A state management library for JavaScript apps, primarily used with React to manage global application state.",
  },
  {
    name: "Three.js",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    description:
      "A 3D graphics library that simplifies the process of creating 3D content in the browser using WebGL.",
  },
  {
    name: "Material UI",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
    description:
      "A popular React UI framework that follows Google’s Material Design principles to create sleek and modern user interfaces.",
  },
  {
    name: "Bootstrap",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    description:
      "A CSS framework used to build responsive, mobile-first web applications with predefined grid systems and components.",
  },
  {
    name: "Tailwind CSS",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    description:
      "A utility-first CSS framework for building custom designs without having to leave your HTML.",
  },
  {
    name: "Sass",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
    description:
      "A preprocessor scripting language that extends CSS with features like variables, nested rules, and functions for enhanced styling.",
  },

  // 🟣 Circle 3 (Backend Technologies)
  {
    name: "Node.js",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    description:
      "A JavaScript runtime built on Chrome’s V8 JavaScript engine, designed for building scalable network applications.",
  },
  {
    name: "Express.js",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    description:
      "A minimal and flexible Node.js web application framework that simplifies routing and middleware integration.",
  },
  {
    name: "Flask",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
    description:
      "A lightweight Python framework for building web applications, focusing on simplicity and extensibility.",
  },
  {
    name: "Socket.io",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
    description:
      "A library for real-time web applications, enabling bi-directional communication between web clients and servers.",
  },
  {
    name: "REST API",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/restapi/restapi-original.svg", // Placeholder
    description:
      "An architectural style for designing networked applications, using HTTP requests to access and manipulate data.",
  },

  // 🟠 Circle 4 (Databases & Storage)
  {
    name: "MongoDB",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    description:
      "A NoSQL database that stores data in flexible, JSON-like documents, ideal for building scalable web applications.",
  },
  {
    name: "MySQL",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    description:
      "An open-source relational database management system based on SQL, widely used for storing structured data.",
  },

  // 🟤 Circle 5 (DevOps & Deployment)
  {
    name: "Docker",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    description:
      "A platform used for developing, shipping, and running applications inside containers, ensuring consistency across environments.",
  },
  {
    name: "Netlify",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original-wordmark.svg",
    description:
      "A platform for deploying static websites and serverless functions, with features like continuous integration and CDN support.",
  },
  {
    name: "GitHub",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    description:
      "A web-based platform for version control and collaboration, allowing developers to manage and store code repositories.",
  },
  {
    name: "Postman",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    description:
      "An API development and testing tool that simplifies API design, testing, and collaboration.",
  },
  {
    name: "Vercel",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original-wordmark.svg",
    description:
      "A platform for frontend developers to build, preview, and deploy applications, optimized for frameworks like Next.js.",
  },

  // ⚫ Circle 6 (Miscellaneous & AI/ML)
  {
    name: "TensorFlow",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    description:
      "An open-source machine learning library used for building and deploying ML models in various industries.",
  },
  {
    name: "PyTorch",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    description:
      "An open-source deep learning framework known for its flexibility and efficiency in training neural networks.",
  },
  {
    name: "Pandas",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    description:
      "A data analysis and manipulation library for Python, providing powerful tools for working with structured data.",
  },
  {
    name: "NumPy",
    link: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    description:
      "A library for numerical computing in Python, providing support for large, multi-dimensional arrays and matrices.",
  },
];
const CircleWithBoxes = ({ radius, numOfBoxes, speed, direction, skills, setskillName, setskildescription }) => {
  const [isHovered, setIsHovered] = useState(false);
  const angleStep = 360 / numOfBoxes;
  const rotationDuration = `${Math.abs(360 / speed)}s`;
  const rotationDirection = direction === -1 ? "reverse" : "normal";

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    const skill = e.target.getAttribute("data-skillname"); // Ensure you get the correct attribute
    const description = e.target.getAttribute("data-skilldescription"); 
    setskillName(skill || ""); // Avoid setting undefined
    setskildescription(description || ""); 
};


  const handleMouseLeave = () => {
    setIsHovered(false);
    setskillName("");
    setskildescription("");
  };

  const boxes = Array.from({ length: numOfBoxes }, (_, index) => {
    const skillName = skills[index];
    const skillDescription = skillDescriptions.find(
      (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
    );
    const size=window.innerWidth>1600?"60px":"45px";
    const angle = angleStep * index;
    const boxStyle = {
      position: "absolute",
      top: `calc(50% - 30px + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
      left: `calc(50% - 30px + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
      width: size,
      height: size,
      backgroundColor: "white",
      borderRadius: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      boxShadow:"1px 1px 5px 5px #ffffff"
    };

    return (
      <div
      key={index}
      className="relative"
      style={boxStyle}
      data-skillname={skillName}
      data-skilldescription={skillDescription?.description}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px" }}>
          <img src={skillDescription?.link} alt={skillName} style={{ width: "40px", height: "40px" }} />
        </div>
      </div>
    );
  });

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        borderRadius: "50%",
        backgroundColor: "transparent",
        border: "5px solid white",
        animation: `rotate ${rotationDuration} linear infinite ${rotationDirection} ${isHovered ? "paused" : ""}`,
      }}
    >
      {boxes}
    </div>
  );
};

export default CircleWithBoxes;

