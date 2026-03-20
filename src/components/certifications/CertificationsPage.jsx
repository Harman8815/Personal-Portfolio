
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, Search, Award, GraduationCap, Trophy, X, ChevronLeft, ChevronRight, Image as ImageIcon, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { certificationsData } from '../../data/index.js';
import CertificationCard from './CertificationCard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = ['All', 'AI', 'Web Development', 'Cloud', 'Data Science', 'Cybersecurity'];
const ISSUERS = ['All', 'Google', 'AWS', 'Meta', 'Microsoft', 'IBM', 'Stanford Online'];

const CertificationsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIssuer, setActiveIssuer] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // GSAP refs
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const controlBarRef = useRef(null);
  const gridRef = useRef(null);
  const containerRef = useRef(null);

  // Filter certifications
  const filteredCertifications = useMemo(() => {
    return certificationsData.filter((cert) => {
      const matchesCategory = activeCategory === 'All' || cert.category === activeCategory;
      const matchesIssuer = activeIssuer === 'All' || cert.issuer.includes(activeIssuer);
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesIssuer && matchesSearch;
    });
  }, [activeCategory, activeIssuer, searchQuery]);

  const selectedCert = selectedCertIndex !== null ? filteredCertifications[selectedCertIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev > 0 ? prev - 1 : filteredCertifications.length - 1));
      setActiveTab('description');
      setImageLoaded(false);
      setImageError(false);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev < filteredCertifications.length - 1 ? prev + 1 : 0));
      setActiveTab('description');
      setImageLoaded(false);
      setImageError(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedCertIndex !== null) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [selectedCertIndex]);

  useEffect(() => {
    if (selectedCert) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [selectedCert]);

  // GSAP Scroll Animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero Section Animation
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from(heroRef.current.querySelector('h1'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(heroRef.current.querySelector('p'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(heroRef.current.querySelector('.font-mono'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    // Stats Animation
    gsap.from(statsRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Control Bar Animation
    gsap.from(controlBarRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: controlBarRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Grid Animation
    const gridItems = gridRef.current?.querySelectorAll('[data-cert-card]') || [];
    gsap.from(gridItems, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    });

    // Parallax effect on hero
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef, dependencies: [filteredCertifications.length] });

  // Stats for the header
  const stats = useMemo(() => {
    return {
      total: certificationsData.length,
      ai: certificationsData.filter(c => c.category === 'AI').length,
      cloud: certificationsData.filter(c => c.category === 'Cloud').length,
      web: certificationsData.filter(c => c.category === 'Web Development').length
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div ref={heroRef} className="mb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <span className="font-mono text-[10px] tracking-[0.6em] text-cyan-500 uppercase mb-4 block">Professional_Recognition</span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Verified_Skills<span className="text-cyan-400">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light text-slate-400 md:text-xl">
              A curated archive of professional certifications and academic credentials validating expertise across the technical spectrum.
            </p>
          </div>

          {/* Stats Grid */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4"
          >
            {[
              { label: 'Total_Certs', value: stats.total, icon: GraduationCap },
              { label: 'AI_Specialist', value: stats.ai, icon: Sparkles },
              { label: 'Cloud_Arch', value: stats.cloud, icon: Award },
              { label: 'Web_Mastery', value: stats.web, icon: Trophy }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl min-w-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={14} className="text-cyan-500/50" />
                  <span className="text-xl font-black text-white">{stat.value}</span>
                </div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Bar */}
        <div 
          ref={controlBarRef}
          className="sticky top-24 z-40 mb-12 flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search by title or issuer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-white/5 py-3 pl-12 pr-4 text-sm font-light text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-all"
              />
            </div>

            {/* Issuer Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mr-2 whitespace-nowrap">Issuer:</div>
              {ISSUERS.map(issuer => (
                <button
                  key={issuer}
                  onClick={() => setActiveIssuer(issuer)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                    activeIssuer === issuer 
                      ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {issuer}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-white/5" />

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mr-2 whitespace-nowrap">Category:</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-lg px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid - Dynamic Adaptive Layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, index) => (
              <div key={cert.id} data-cert-card>
                <CertificationCard 
                  certification={cert} 
                  index={index} 
                  onClick={() => {
                    setSelectedCertIndex(index);
                    setActiveTab('description');
                  }}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="mb-6 rounded-full bg-white/5 p-8 text-slate-700">
              <Award size={48} />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter text-white">No Credentials Found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your search or filters to locate the specific certification.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All'); setActiveIssuer('All');}}
              className="mt-8 rounded-lg border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              Reset_Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Expanded Modal View */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#020617]/95 backdrop-blur-2xl"
              onClick={() => setSelectedCertIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/80 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertIndex(null)}
                  className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-110"
                >
                  <X size={20} />
                </button>

                {/* Navigation Arrows */}
                <div className="absolute inset-y-0 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={handlePrev}
                    className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-cyan-500 hover:scale-110 group"
                  >
                    <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-cyan-500 hover:scale-110 group"
                  >
                    <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                <div className="flex flex-col min-h-[750px] max-h-[85vh]">
                  {/* Header Info */}
                  <div className="p-8 md:p-12 pb-0 text-center pt-12">
                    <div className="mb-6">
                      <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500 uppercase mb-2 block">
                        {selectedCert.category}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight mb-4">
                        {selectedCert.title}
                      </h2>
                      <div className="flex items-center justify-center gap-6 text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Award size={14} className="text-cyan-500" /> {selectedCert.issuer}</span>
                        <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-cyan-500" /> {selectedCert.year}</span>
                      </div>
                    </div>

                    {/* Tabs - Centered */}
                    <div className="flex justify-center mb-8">
                      <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 w-fit border border-white/5 backdrop-blur-md">
                        <button
                          onClick={() => setActiveTab('image')}
                          className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            activeTab === 'image' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-400 hover:text-white"
                          )}
                        >
                          <ImageIcon size={14} />
                          Visual_Asset
                        </button>
                        <button
                          onClick={() => setActiveTab('description')}
                          className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            activeTab === 'description' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-400 hover:text-white"
                          )}
                        >
                          <FileText size={14} />
                          Detailed_Spec
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 px-8 md:px-12 pb-8 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                      {activeTab === 'description' ? (
                        <motion.div
                          key="desc"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="max-w-3xl mx-auto space-y-8"
                        >
                          <p className="text-slate-400 leading-relaxed font-light text-xl text-center">
                            {selectedCert.description || "No detailed description available for this credential."}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-2">Credential_ID</div>
                              <div className="text-white font-mono text-base">{selectedCert.credentialId || "N/A"}</div>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-2">Issue_Date</div>
                              <div className="text-white font-mono text-base">{selectedCert.issueDate}</div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center py-4"
                      >
                        <div className="relative group/img w-full w-[500px] h-fit
                         rounded-[2rem] overflow-hidden bg-white/5  border border-white/10 shadow-2xl flex items-center justify-center mx-auto">
                          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
                          
                          {/* Image Loading State */}
                          {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-20">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 size={40} className="text-cyan-500" />
                              </motion.div>
                            </div>
                          )}

                          {/* Image Error State */}
                          {imageError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm z-20 p-8">
                              <ImageIcon size={48} className="text-slate-500 mb-4" />
                              <p className="text-slate-400 text-sm text-center">Image not available</p>
                            </div>
                          )}

                          <img 
                            src={selectedCert.logo} 
                            alt={selectedCert.title} 
                            onLoad={() => {
                              setImageLoaded(true);
                              setImageError(false);
                            }}
                            onError={() => {
                              setImageLoaded(true);
                              setImageError(true);
                            }}
                            className={cn(
                              "relative z-10 max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-opacity duration-500",
                              imageLoaded && !imageError ? "opacity-100" : "opacity-0"
                            )}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Official_Credential_Asset</p>
                      </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Action */}
                  <AnimatePresence>
                    {activeTab !== 'image' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-8 md:p-12 pt-0 flex justify-center"
                      >
                        <a
                          href={selectedCert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-cyan-500 text-white font-mono text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                        >
                          Verify_Credential
                          <ExternalLink size={16} />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
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

export default CertificationsPage;
