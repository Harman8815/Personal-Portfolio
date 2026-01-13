import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./components/Error";
import ThankYou from "./components/ThankYou";
import Project from "./pages/Project/Projects";
import Home from "./pages/Hero/Home";
import LandingSections from "./components/LandingSections";
import MainLoader from "./components/MainLoader";

const App = () => {
  const [isMainLoading, setIsMainLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsMainLoading(false);

    // Listen for all page assets to be loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Router>
      {isMainLoading ? (
        <MainLoader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<><Home /><LandingSections /></>} />
            <Route path="/projects" element={<Project />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;
