
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, RotateCcw, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// FilterState interface removed for JSX compatibility
// The component expects an object with these properties:
// techStack: string[], category: string[], projectType: string[], 
// status: string[], complexity: string[], years: number[]

const CATEGORIES = ['Web', 'AI', 'Tools', 'Experiments'];
const PROJECT_TYPES = ['Personal', 'Client', 'Open Source', 'Experimental'];
const STATUSES = ['Completed', 'In Progress', 'Archived'];
const COMPLEXITIES = ['Beginner', 'Intermediate', 'Advanced'];
const YEARS = [2022, 2023, 2024, 2025];

const FilterModal = ({ isOpen, onClose, onApply, initialFilters, availableTech }) => {
  const [tempFilters, setTempFilters] = useState(initialFilters);
  const [techSearch, setTechSearch] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const filteredTech = useMemo(() => {
    if (!Array.isArray(availableTech)) return [];
    
    return availableTech.filter(tech => 
      tech && typeof tech === 'string' && 
      tech.toLowerCase().includes(techSearch.toLowerCase())
    ).sort();
  }, [availableTech, techSearch]);

  const toggleFilter = (category, value) => {
    if (!category || value === undefined || !tempFilters) return;
    
    setTempFilters(prev => {
      if (!prev || !Array.isArray(prev[category])) return prev;
      
      const current = prev[category];
      const exists = current.includes(value);
      return {
        ...prev,
        [category]: exists 
          ? current.filter(v => v !== value) 
          : [...current, value]
      };
    });
  };

  const handleReset = () => {
    setTempFilters({
      techStack: [],
      category: [],
      projectType: [],
      status: [],
      complexity: [],
      years: []
    });
  };

  const activeCount = useMemo(() => {
    if (!tempFilters) return 0;
    return Object.values(tempFilters).flat().filter(Boolean).length;
  }, [tempFilters]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-md"
          />

          {/* Modal Container - Using fixed inset-0 and flex to ensure true centering */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="pointer-events-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-[#0a0f1e] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Filter size={14} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Filter_Archive</h2>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      {activeCount} Active_Parameters
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-white/5">
                  
                  {/* Left Column: Tech Stack */}
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Technologies</h3>
                      <div className="relative w-32">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600" size={10} />
                        <input 
                          type="text" 
                          placeholder="Search..."
                          value={techSearch}
                          onChange={(e) => setTechSearch(e.target.value)}
                          className="w-full rounded-md border border-white/5 bg-white/5 py-1 pl-7 pr-2 text-[9px] font-mono text-white placeholder:text-slate-700 focus:border-cyan-500/30 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {filteredTech.map((tech) => (
                        <button
                          key={tech || 'unknown'}
                          onClick={() => toggleFilter('techStack', tech)}
                          className={cn(
                            "flex items-center gap-1 rounded-md border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest transition-all",
                            Array.isArray(tempFilters.techStack) && tempFilters.techStack.includes(tech)
                              ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                              : "border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300"
                          )}
                        >
                          {tech || 'Unknown'}
                          {Array.isArray(tempFilters.techStack) && tempFilters.techStack.includes(tech) && <Check size={6} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Other Filters */}
                  <div className="p-5 space-y-5">
                    {/* Category */}
                    <section>
                      <h3 className="mb-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Category</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => toggleFilter('category', cat)}
                            className={cn(
                              "rounded-md border py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all text-center",
                              tempFilters.category.includes(cat)
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                                : "border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Project Type */}
                    <section>
                      <h3 className="mb-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Project Type</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {PROJECT_TYPES.map(type => (
                          <button
                            key={type}
                            onClick={() => toggleFilter('projectType', type)}
                            className={cn(
                              "flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-widest transition-all",
                              tempFilters.projectType.includes(type)
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                                : "border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300"
                            )}
                          >
                            {type}
                            <div className={cn(
                              "h-1 w-1 rounded-full",
                              tempFilters.projectType.includes(type) ? "bg-cyan-500" : "bg-slate-800"
                            )} />
                          </button>
                        ))}
                      </div>
                    </section>

                    {/* Status & Complexity Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <section>
                        <h3 className="mb-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Status</h3>
                        <div className="space-y-0.5">
                          {STATUSES.map(status => (
                            <button
                              key={status}
                              onClick={() => toggleFilter('status', status)}
                              className={cn(
                                "flex w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest transition-all",
                                tempFilters.status.includes(status) ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                              )}
                            >
                              <div className={cn(
                                "h-2.5 w-2.5 rounded border flex items-center justify-center transition-all",
                                tempFilters.status.includes(status) ? "border-cyan-500 bg-cyan-500" : "border-white/10 bg-white/5"
                              )}>
                                {tempFilters.status.includes(status) && <Check size={6} className="text-white" />}
                              </div>
                              {status}
                            </button>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Complexity</h3>
                        <div className="space-y-0.5">
                          {COMPLEXITIES.map(comp => (
                            <button
                              key={comp}
                              onClick={() => toggleFilter('complexity', comp)}
                              className={cn(
                                "flex w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest transition-all",
                                tempFilters.complexity.includes(comp) ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                              )}
                            >
                              <div className={cn(
                                "h-2.5 w-2.5 rounded border flex items-center justify-center transition-all",
                                tempFilters.complexity.includes(comp) ? "border-cyan-500 bg-cyan-500" : "border-white/10 bg-white/5"
                              )}>
                                {tempFilters.complexity.includes(comp) && <Check size={6} className="text-white" />}
                              </div>
                              {comp}
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Timeline */}
                    <section>
                      <h3 className="mb-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/80">Timeline</h3>
                      <div className="flex gap-1">
                        {YEARS.map(year => (
                          <button
                            key={year}
                            onClick={() => toggleFilter('years', year)}
                            className={cn(
                              "flex-1 rounded-md border py-1.5 text-[9px] font-bold transition-all",
                              tempFilters.years.includes(year)
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                                : "border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300"
                            )}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 bg-[#0a0f1e] p-4">
                <div className="flex items-center justify-between gap-3">
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 transition-all hover:bg-white/5 hover:text-white"
                  >
                    <RotateCcw size={10} />
                    Clear
                  </button>
                  <button 
                    onClick={() => onApply(tempFilters)}
                    className="flex-1 rounded-lg bg-cyan-500 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:bg-cyan-400 active:scale-[0.98]"
                  >
                    Apply_Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default FilterModal;
