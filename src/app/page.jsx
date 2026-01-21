"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingSections from "@/components/LandingSections";
import MainLoader from "@/components/MainLoader";
import HomeHero from "@/pages/Hero/Home";

export default function HomePage() {
  const [isMainLoading, setIsMainLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsMainLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isMainLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary">
        <HomeHero />
        <LandingSections />
      </main>
      <Footer />
    </>
  );
}
