import React from "react";

const ProjectCard = ({ index, title, description, link,backgroundImage  }) => {
  return (
    <div
      className="project-card w-full h-[70vh] rounded-3xl flex bg-cover bg-center overflow-hidden relative group shadow-sm shadow-amber-600"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Index Number (Initially Hidden) */}
      <div className="absolute left-5 top-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-[100px] font-bold text-white">0{index + 1}</span>
      </div>

      {/* Content */}
      <div className="content w-[100%] p-6 flex flex-col justify-center items-end ">
        <div className="w-[80%] space-y-4 transform scale-100 group-hover:scale-105 transition-transform duration-500">
          <h3 className="text-4xl font-bold text-white">{title}</h3>
          <p className="text-lg text-white">{description}</p>
          <a href={link} className="text-lg text-blue-500 hover:text-blue-300 transition">
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
