import React, { useState } from "react";
// import image from "../../assets/MP1.png";

const ProductCard = ({project}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const image='/assets/MP1.png'
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    const x = (offsetX / width) * 30 - 30;
    const y = (offsetY / height) * -30 + 25;

    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="product-card bg-indigo-900 rounded-2xl p-5 w-fit max-w-[400px] laptop:max-w-[350px] desktop:max-w-[400px] space-y-6 transition-all duration-180 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-indigo-800"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${1*tilt.y}deg) rotateY(${-1*tilt.x}deg)`,
      }}
    >
      <div
        className="max-w-[350px] rounded-2xl overflow-hidden "
        style={{
          transform: `perspective(200px) rotateX(${-0.3 * tilt.x}deg)`,
        }}
        
      ><img
      src={project.image ? project.image : image}
      alt=""
      className="w-full aspect-[16/9] bg-black object-fit"
    />
    
      </div>
      <div className="info space-y-4">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-gray-300">
          {project.desc}
        </p>
        <div className="flex flex-col items-center gap-10 justify-around ">
        <div className="flex items-center gap-3">
              {project.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} className="max-w-10" />
                </div>
              ))}
            </div>
          <a href="/project" className="text-white-500 hover:text-blue-400">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
