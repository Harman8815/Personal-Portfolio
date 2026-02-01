"use client";

import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/r3f/project/Projects"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-2xl">Loading Projects...</div>
  </div>
});

export default function ProjectsPage() {
  return (
    <div className="pt-28">
      <Projects />
    </div>
  );
}
