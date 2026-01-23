"use client";

import { useEffect, useState } from "react";
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
      <HomeHero />
      <LandingSections />
    </>
  );
}
