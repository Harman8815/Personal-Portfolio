
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../../data/index.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ProjectCard props:
// project: Project object with name, description, techStack, etc.
// index: number for animation delay

const ProjectCard = ({ project, index }) => {
  const router = useRouter();
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-[240px] rounded-2xl border border-white/5 bg-slate-900/40 text-slate-500">
        <span>Project data unavailable</span>
      </div>
    );
  }
  
  const isFeatured = project.sizeType === 'featured';
  const isMedium = project.sizeType === 'medium';
  
  // Safely get project data with fallbacks
  const projectName = project.name || 'Untitled Project';
  const projectDescription = project.description || 'No description available';
  const projectImage = project.image || 'https://picsum.photos/seed/default/800/600';
  const projectTechStack = Array.isArray(project.techStack) ? project.techStack : [];
  const githubUrl = project.githubUrl;
  const demoUrl = project.demoUrl;
  
  // Generate project ID from name (slugify)
  const projectId = projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  const handleCardClick = () => {
    router.push(`/project/${projectId}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 5) * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] cursor-pointer",
        isFeatured ? "md:col-span-2 md:row-span-2 h-[500px]" : 
        isMedium ? "md:col-span-1 md:row-span-2 h-[500px]" : 
        "h-[240px]"
      )}
    >
      {/* Background Image with Parallax-like effect on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={projectImage}
          alt={projectName}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
          onError={(e) => {
            e.target.src = 'https://picsum.photos/seed/fallback/800/600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {projectTechStack.slice(0, isFeatured ? 6 : 3).map((tech) => (
            <span 
              key={tech || 'unknown'} 
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 backdrop-blur-sm"
            >
              {tech || 'Unknown'}
            </span>
          ))}
          {projectTechStack.length > (isFeatured ? 6 : 3) && (
            <span className="text-[10px] text-slate-500">+{projectTechStack.length - (isFeatured ? 6 : 3)}</span>
          )}
        </div>

        <h3 className={cn(
          "font-black uppercase tracking-tighter text-white transition-colors group-hover:text-cyan-400",
          isFeatured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
        )}>
          {projectName}
        </h3>

        <p className={cn(
          "mt-2 line-clamp-2 font-light text-slate-400",
          isFeatured ? "text-lg max-w-xl" : "text-sm"
        )}>
          {projectDescription}
        </p>

        <div className="mt-6 flex items-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              <Github size={14} />
              Source
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-white"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
        <Code2 size={16} className="text-cyan-400" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
