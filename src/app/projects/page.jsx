"use client";

import dynamic from "next/dynamic";
import ProjectsPage from "../../components/projects/ProjectsPage.jsx";
import ErrorBoundary from "../../components/ErrorBoundary.jsx";

export default function ProjectsPageWrapper() {
  return (
    <ErrorBoundary>
      <ProjectsPage />
    </ErrorBoundary>
  );
}
