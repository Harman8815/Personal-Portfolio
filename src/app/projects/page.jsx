"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Projects from "@/pages/project/Projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
