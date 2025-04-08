import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Hero/Home";
import About from "./components/About/About";
import Skills from "./components/skills/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Links from "./components/Links";
import MoreProject from "./components/MoreProjects/MoreProjects";
import MajorProjects from "./components/MajorProject/MajorProjects";
import Contact_me from "./components/Contact/Contact_me";
import Footer from "./components/Footer";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import ThankYou from "./components/ThankYou";
import Error from "./components/Error";
import Project from "./pages/Project/Projects";
import Temo from "./components/Temo";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <div className="relative" id="bg">
                <About />
                <Skills />
                <MajorProjects />
                <Achievements />
                <MoreProject />
                <Certifications />
                <Experience />
                <Education />
                <Links />
                <Contact_me />
                <ThankYou />
              </div>
            </>
          }
        />
        <Route path="/project" element={<Project />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
