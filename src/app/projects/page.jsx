"use client";

import dynamic from "next/dynamic";
import ProjectsPage from "@/components/projects/ProjectsPage";
import ErrorBoundary from "@/components/ErrorBoundary";
const Projects = dynamic(() => import("@/components/r3f/project/Projects"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-2xl">Loading Projects...</div>
  </div>
});

export default function ProjectsPageWrapper() {
  return (
    <ErrorBoundary>
      <ProjectsPage />
    </ErrorBoundary>
  );
}
