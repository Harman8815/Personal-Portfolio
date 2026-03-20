"use client";

import { useParams } from 'next/navigation';
import dynamic from "next/dynamic";
import Link from 'next/link';
import ErrorBoundary from "../../../components/ErrorBoundary.jsx";
import { AutoScrollProvider } from "../../../components/autoScroll/AutoScrollContext.jsx";

// Dynamically import all project detail components
const ProjectHero = dynamic(() => import("../../../components/projectDetail/ProjectHero.jsx"), { ssr: false });
const MarqueeLayer = dynamic(() => import("../../../components/projectDetail/MarqueeLayer.jsx"), { ssr: false });
const ParallaxBackground = dynamic(() => import("../../../components/projectDetail/ParallaxBackground.jsx"), { ssr: false });
const ProjectPreview = dynamic(() => import("../../../components/projectDetail/ProjectPreview.jsx"), { ssr: false });
const ProjectSystemFlow = dynamic(() => import("../../../components/projectDetail/ProjectSystemFlow.jsx"), { ssr: false });
const ProjectArchitecture = dynamic(() => import("../../../components/projectDetail/ProjectArchitecture.jsx"), { ssr: false });
const ProjectTechStack = dynamic(() => import("../../../components/projectDetail/ProjectTechStack.jsx"), { ssr: false });
const ProjectMetrics = dynamic(() => import("../../../components/projectDetail/ProjectMetrics.jsx"), { ssr: false });
const ProjectLearnings = dynamic(() => import("../../../components/projectDetail/ProjectLearnings.jsx"), { ssr: false });
const ProjectArtifacts = dynamic(() => import("../../../components/projectDetail/ProjectArtifacts.jsx"), { ssr: false });
const ProjectCTA = dynamic(() => import("../../../components/projectDetail/ProjectCTA.jsx"), { ssr: false });
const CinematicController = dynamic(() => import("../../../components/projectDetail/CinematicController.jsx"), { ssr: false });

// Import actual project data
import { myProjects } from '../../../data/index.js';

// Create project data object with proper IDs
const projectData = {};
myProjects.forEach(project => {
  projectData[project.id] = {
    name: project.name,
    description: project.description,
    year: project.year,
    id: project.id,
    image: project.image,
    status: project.status,
    problem: project.problemStatement,
    solution: project.solutionApproach,
    features: project.features,
    techStack: project.techStack,
    artifacts: project.media,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    architecture: project.architecture,
    challenges: project.challenges,
    metrics: project.metrics,
    learnings: project.learnings,
    timeline: project.timeline
  };
});

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectid;
  const project = projectData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AutoScrollProvider>
      <ErrorBoundary>
        <div className="relative min-h-screen bg-[#020617] overflow-x-hidden">
        {/* Background Layers */}
        <ParallaxBackground />
        <MarqueeLayer activeKeyword={project.name.split(' ')[0]} />
        
        {/* Project Components */}
        <ProjectHero 
          name={project.name}
          description={project.description}
          year={project.year}
          id={project.id}
        />
        
        <ProjectPreview 
          image={project.image}
          name={project.name}
          status={project.status}
        />
        
        <ProjectSystemFlow 
          problem={project.problem}
          solution={project.solution}
          features={project.features}
        />
        
        <ProjectArchitecture 
          architecture={project.architecture}
          challenges={project.challenges}
        />
        
        <ProjectTechStack techStack={project.techStack} />
        
        <ProjectMetrics 
          metrics={project.metrics}
        />
        
        <ProjectLearnings 
          learnings={project.learnings}
          timeline={project.timeline}
        />
        
        <ProjectArtifacts artifacts={project.artifacts} />
        
        <ProjectCTA 
          githubUrl={project.githubUrl}
          demoUrl={project.demoUrl}
        />
        
        {/* Cinematic Controller */}
        <CinematicController />
      </div>
    </ErrorBoundary>
    </AutoScrollProvider>
  );
}
