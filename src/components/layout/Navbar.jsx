
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, FileText } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
      );

      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', to: '/', type: 'link' },
    { name: 'Experience', to: 'experience', type: 'link' },
    { name: 'Achievements', to: '/achievements', type: 'link' },
    { name: 'All Projects', to: '/projects', type: 'link' },
    { name: 'Certifications', to: '/certifications', type: 'link' },
    { name: 'Social', to: '/links', type: 'link' },
  ];

  const handleNavClick = (link) => {
    if (link.type === 'link') {
      router.push(link.to);
    }
    setIsMenuOpen(false);
  };

  const isHomePage = pathname === '/';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? 'py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
        : 'py-8 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Branding */}
        <div
          className="relative group cursor-pointer"
          onClick={() => isHomePage ? scroll.scrollToTop() : navigate('/')}
        >
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300">
            HARMAN
          </span>
          <span className="absolute -right-3 bottom-1 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
        </div>

        {/* Desktop Navigation */}
        <div ref={linksRef} className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.type === 'scroll' && isHomePage ? (
                <ScrollLink
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={800}
                  onSetActive={() => setActiveSection(link.to)}
                  className={`cursor-pointer font-mono text-[14px] uppercase tracking-[0.2em] transition-all duration-300 ${activeSection === link.to ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <button
                  onClick={() => handleNavClick(link)}
                  className={`font-mono text-[14px] uppercase tracking-[0.2em] transition-all duration-300 ${pathname === link.to ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {link.name}
                </button>
              )}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 transition-all duration-300 group-hover:w-full ${(link.type === 'scroll' && activeSection === link.to) || (link.type === 'link' && pathname === link.to) ? 'w-full' : ''
                }`} />
            </div>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="group relative px-6 py-2.5 overflow-hidden rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:scale-105 transition-all duration-300 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              <FileText size={14} />
              Resume
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-[72px] left-0 right-0 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 max-h-[calc(100vh-72px)]' : '-translate-y-full opacity-0 max-h-0'
        }`}>
        <div className="flex flex-col p-6 gap-6 overflow-y-auto max-h-[calc(100vh-72px)]">
          {navLinks.map((link, i) => (
            <div
              key={link.name}
              className="border-b border-white/5 pb-3"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.type === 'scroll' && isHomePage ? (
                <ScrollLink
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={800}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-[14px] uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-all duration-300"
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <button
                  onClick={() => handleNavClick(link)}
                  className="font-mono text-[14px] uppercase tracking-[0.2em] transition-all duration-300 text-white hover:text-cyan-400"
                >
                  {link.name}
                </button>
              )}
            </div>
          ))}

          <div className="mt-auto  flex flex-col gap-4">
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs uppercase tracking-widest">
              <span>Appearance</span>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 bg-white/5 rounded-lg"
              >
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-black uppercase tracking-[0.3em] text-white shadow-lg">
              Download_Resume
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
