import React from "react";

const Education = () => {
  return (
    <section id="education" className="bg-primary text-white py-16 overflow-hidden">
      <h2 className="section-title text-center text-5xl font-extrabold mb-12">
        Education
      </h2>
      <div className="container w-[60%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Rajiv Gandhi Prodyogiki Vishwavidyalaya */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gray-700 hover:ring-4 hover:ring-blue-400">
            <h3 className="text-3xl font-bold mb-4">Rajiv Gandhi Prodyogiki Vishwavidyalaya</h3>
            <p className="text-xl mb-3">Bachelor of Technology - BTech, Computer Software Engineering</p>
            <p className="text-md mb-3">Oct 2021 - Aug 2025</p>
            <p className="text-md">Grade: 7.8 CGPA</p>
            <p className="text-md mt-6">Activities and societies: Engaged in hackathons, coding competitions, and volunteered for sports events.</p>
          </div>
          {/* Central Board of Secondary Education */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gray-700 hover:ring-6 hover:ring-blue-400">
            <h3 className="text-3xl font-bold mb-4">Central Board of Secondary Education</h3>
            <p className="text-xl mb-3">12th CBSE, PCM</p>
            <p className="text-md mb-3">Aug 2019 - Aug 2020</p>
            <p className="text-md">Grade: 86%</p>
            <p className="text-md mt-6">Activities and societies: Served as the Head Boy in my final year, demonstrating leadership and responsibility. Actively participated in science fairs and created innovative projects.</p>
          </div>
          {/* CISCE */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-gray-700 hover:ring-4 hover:ring-blue-400">
            <h3 className="text-3xl font-bold mb-4">CISCE</h3>
            <p className="text-xl mb-3">10th</p>
            <p className="text-md mb-3">Aug 2017 - Aug 2018</p>
            <p className="text-md">Grade: 80%</p>
            <p className="text-md mt-6">Activities and societies: Participated in various inter-school events and activities to enhance leadership skills and foster a spirit of teamwork.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
