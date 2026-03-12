
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


const CertificationCard = ({ certification, index, onClick }) => {
  const isFeatured = certification.sizeType === 'featured';
  const isMedium = certification.sizeType === 'medium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30 hover:bg-slate-900/60 cursor-pointer",
        isFeatured ? "min-h-[400px] p-8 md:p-10" : isMedium ? "min-h-[400px] p-6 md:p-8" : "min-h-[200px] p-5"
      )}
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-[100px] transition-opacity group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-full flex-col">
        {/* Top Section: Logo & Category */}
        <div className="mb-6 flex items-start justify-between">
          <div className={cn(
            "flex items-center justify-center rounded-2xl bg-white/5 p-3 transition-transform duration-500 group-hover:scale-110",
            isFeatured ? "h-20 w-20" : "h-14 w-14"
          )}>
            <img 
              src={certification.logo} 
              alt={certification.issuer} 
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
            {certification.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={cn(
            "font-black uppercase tracking-tighter text-white transition-colors group-hover:text-cyan-400",
            isFeatured ? "text-3xl md:text-4xl mb-4" : isMedium ? "text-xl mb-3" : "text-base mb-2"
          )}>
            {certification.title}
          </h3>
          
          <div className="mb-4 flex flex-wrap items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
              <Award size={12} className="text-cyan-500/50" />
              {certification.issuer}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
              <Calendar size={12} className="text-cyan-500/50" />
              {certification.issueDate}
            </div>
          </div>

          {(isFeatured || isMedium) && certification.description && (
            <p className="mb-6 text-sm font-light leading-relaxed text-slate-500 line-clamp-3">
              {certification.description}
            </p>
          )}

          {certification.credentialId && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
              <ShieldCheck size={12} className="text-cyan-500" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                ID: {certification.credentialId}
              </span>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="mt-auto pt-4">
          <a 
            href={certification.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 transition-all hover:text-cyan-400 group/link"
          >
            Verify_Credential
            <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Decorative Index */}
      <div className="absolute bottom-4 right-6 font-mono text-[40px] font-black text-white/[0.02] transition-colors group-hover:text-cyan-500/[0.05]">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  );
};

export default CertificationCard;
