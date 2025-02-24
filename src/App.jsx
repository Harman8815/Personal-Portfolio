import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Hero/Home";
import About from "./components/about/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Links from "./components/Links";
import MoreProject from "./components/moreprojects/MoreProjects";
import MajorProjects from "./components/majorProject/MajorProjects";
import Contact_me from "./components/contact/Contact_me";
import Footer from "./components/Footer";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import ThankYou from "./components/ThankYou";
import Error from "./components/error";
import StyledStarsCanvas from "./components/Stars";
const App = () => {
  return (
    <>
      <Navbar />
      {/* <StyledStarsCanvas /> */}
      <Home />
      <div className="relative " id="bg">
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
        <Footer />
        <Error />
      </div>
    </>
  );
};

export default App;
