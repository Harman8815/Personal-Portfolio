"use client";

import { useState, useEffect, useContext, createContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values for SSR or when context is not available
    return {
      theme: 'dark',
      toggleTheme: () => {},
      setThemeMode: () => {},
      mounted: false
    };
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference, fallback to 'dark'
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const root = document.documentElement;
    
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      // Update CSS custom properties for light theme
      root.style.setProperty('--color-primary', '#f8f9fa');
      root.style.setProperty('--color-secondary', '#e9ecef');
      root.style.setProperty('--color-accent', '#0066cc');
      root.style.setProperty('--color-text-primary', '#212529');
      root.style.setProperty('--color-text-secondary', '#6c757d');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      // Update CSS custom properties for dark theme
      root.style.setProperty('--color-primary', '#020617');
      root.style.setProperty('--color-secondary', '#282a36');
      root.style.setProperty('--color-accent', '#8be9fd');
      root.style.setProperty('--color-text-primary', '#f8f8f2');
      root.style.setProperty('--color-text-secondary', '#6272a4');
    }

    // Persist to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const setThemeMode = (mode) => {
    if (mode === 'dark' || mode === 'light') {
      setTheme(mode);
    }
  };

  // Prevent flash of incorrect theme
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
