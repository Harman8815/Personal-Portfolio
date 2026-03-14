
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Sparkles, X, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { projectsDat, Project } from '@/data';
import ProjectCard from './ProjectCard';
import FilterModal from './FilterModal';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = ['All', 'AI', 'Web', 'Tools', 'Experiments'];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const [advancedFilters, setAdvancedFilters] = useState({
    techStack: [],
    category: [],
    projectType: [],
    status: [],
    complexity: [],
    years: []
  });

  const loaderRef = useRef(null);

  // Extract all unique tech from data
  const allTech = useMemo(() => {
    const tech = new Set();
    if (Array.isArray(projectsDat)) {
      projectsDat.forEach(p => {
        if (p && Array.isArray(p.techStack)) {
          p.techStack.forEach(t => {
            if (t && typeof t === 'string') tech.add(t);
          });
        }
      });
    }
    return Array.from(tech);
  }, []);

  // Filter projects based on search, category, and advanced filters
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projectsDat)) return [];
    
    return projectsDat.filter((project) => {
      if (!project) return false;
      
      // Basic Search
      const projectName = project.name || '';
      const projectDescription = project.description || '';
      const projectTechStack = Array.isArray(project.techStack) ? project.techStack : [];
      
      const matchesSearch = projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          projectDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          projectTechStack.some(tech => tech && tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Quick Category (from top bar)
      const matchesQuickCategory = activeCategory === 'All' || project.category === activeCategory;

      // Advanced Filters
      const matchesTech = !Array.isArray(advancedFilters.techStack) || advancedFilters.techStack.length === 0 || 
                         advancedFilters.techStack.every(tech => projectTechStack.includes(tech));
      
      const matchesCategory = !Array.isArray(advancedFilters.category) || advancedFilters.category.length === 0 || 
                             advancedFilters.category.includes(project.category);
      
      const matchesType = !Array.isArray(advancedFilters.projectType) || advancedFilters.projectType.length === 0 || 
                         advancedFilters.projectType.includes(project.projectType);
      
      const matchesStatus = !Array.isArray(advancedFilters.status) || advancedFilters.status.length === 0 || 
                           advancedFilters.status.includes(project.status);
      
      const matchesComplexity = !Array.isArray(advancedFilters.complexity) || advancedFilters.complexity.length === 0 || 
                               advancedFilters.complexity.includes(project.complexity);
      
      const matchesYear = !Array.isArray(advancedFilters.years) || advancedFilters.years.length === 0 || 
                         advancedFilters.years.includes(project.year);

      return matchesSearch && matchesQuickCategory && matchesTech && matchesCategory && 
             matchesType && matchesStatus && matchesComplexity && matchesYear;
    });
  }, [searchQuery, activeCategory, advancedFilters]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProjects.length && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredProjects.length, isLoading]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, filteredProjects.length));
      setIsLoading(false);
    }, 800);
  };

  const handleApplyFilters = (filters) => {
    setAdvancedFilters(filters);
    setIsFilterModalOpen(false);
    setVisibleCount(10); // Reset pagination on filter change
  };

  const removeFilter = (category, value) => {
    if (!category || !advancedFilters || !Array.isArray(advancedFilters[category])) return;
    
    setAdvancedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
  };

  const activeFilterTags = useMemo(() => {
    const tags = [];
    if (!advancedFilters) return tags;
    
    Object.entries(advancedFilters).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        values.forEach(value => {
          if (value) {
            tags.push({ category: key, value });
          }
        });
      }
    });
    return tags;
  }, [advancedFilters]);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={advancedFilters}
        availableTech={allTech}
      />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <span className="font-mono text-[10px] tracking-[0.6em] text-cyan-500 uppercase mb-4">Project_Vault</span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              All_Artifacts<span className="text-cyan-400">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light text-slate-400 md:text-xl">
              A comprehensive collection of digital experiments, technical architectures, and creative interfaces developed across the multiverse.
            </p>
          </motion.div>
        </div>

        {/* Control Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-24 z-40 mb-6 flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, tech, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-white/5 py-3 pl-12 pr-4 text-sm font-light text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Quick Categories & Advanced Filter Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 lg:flex">
              Quick_Filter:
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                activeFilterTags.length > 0
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-white/5 text-slate-400 border border-transparent hover:bg-white/10 hover:text-white"
              )}
            >
              <SlidersHorizontal size={14} />
              Advanced_Filters
              {activeFilterTags.length > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[8px] text-white">
                  {activeFilterTags.length}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Active Filter Tags */}
        <AnimatePresence>
          {activeFilterTags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 flex flex-wrap gap-2 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-2">
                Active_Parameters:
              </div>
              {activeFilterTags.map((tag, idx) => (
                <motion.button
                  key={`${tag.category}-${tag.value}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => removeFilter(tag.category, tag.value)}
                  className="group flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500/20"
                >
                  <span className="text-slate-500 font-mono text-[8px]">{tag.category}:</span>
                  {tag.value}
                  <X size={10} className="text-slate-500 group-hover:text-cyan-400" />
                </motion.button>
              ))}
              <button 
                onClick={() => setAdvancedFilters({
                  techStack: [],
                  category: [],
                  projectType: [],
                  status: [],
                  complexity: [],
                  years: []
                })}
                className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors ml-2"
              >
                [Clear_All]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid - Hybrid Dynamic Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="mb-6 rounded-full bg-white/5 p-8 text-slate-700">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter text-white">No Artifacts Found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-8 rounded-lg border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              Reset_Filters
            </button>
          </motion.div>
        )}

        {/* Loading / End of List */}
        <div ref={loaderRef} className="mt-20 flex flex-col items-center justify-center py-10">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-cyan-500" size={32} />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500">Syncing_Data_Stream...</span>
            </div>
          ) : visibleCount < filteredProjects.length ? (
            <button 
              onClick={loadMore}
              className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:border-cyan-500/50"
            >
              <span className="relative z-10">Load_More_Artifacts</span>
              <div className="absolute inset-0 z-0 translate-y-full bg-cyan-500 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          ) : filteredProjects.length > 0 ? (
            <div className="flex flex-col items-center gap-4 opacity-30">
              <div className="h-[1px] w-20 bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500">End_of_Archive</span>
            </div>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl border-t border-white/5 px-6 py-20">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
          </div>
          <div className="font-mono text-[9px] tracking-[0.5em] uppercase text-slate-700">
            &copy; MMXXV // DESIGNED IN THE VOID // VERSION_4.0.1
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
