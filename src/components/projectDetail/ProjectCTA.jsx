import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import Magnetic from '../../ui/Magnetic.jsx';

const ProjectCTA = ({ githubUrl, demoUrl }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 overflow-hidden bg-[#020617]">
      <div ref={contentRef} className="container mx-auto px-6 text-center relative z-10 cta-content">
        <div>
          <span className="font-mono text-[10px] tracking-[1em] text-cyan-500 uppercase mb-8 block animate-pulse">
            Terminal_Session_End
          </span>
          <h2 className="mb-16 text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none">
            Explore_The <br />
            <span className="text-cyan-400">Source_Code.</span>
          </h2>
          
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
            <Magnetic strength={0.2}>
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-white px-12 py-6 text-sm font-bold uppercase tracking-widest text-black transition-all hover:pr-16"
              >
                <Github size={24} />
                <span>View_on_GitHub</span>
                <ChevronRight size={24} className="absolute right-8 opacity-0 transition-all group-hover:opacity-100" />
              </a>
            </Magnetic>

            {demoUrl && (
              <Magnetic strength={0.2}>
                <a 
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-12 py-6 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-cyan-500/30"
                >
                  <ExternalLink size={24} />
                  <span>Open_Live_Demo</span>
                </a>
              </Magnetic>
            )}
          </div>

          <div className="mt-24">
            <Link 
              href="/projects"
              className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.5em] text-slate-500 hover:text-cyan-400 transition-all"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-2" />
              <span>[Return_to_Archive]</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};

export default ProjectCTA;
