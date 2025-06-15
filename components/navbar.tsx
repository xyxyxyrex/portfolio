'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-xl font-bold">My Portfolio</div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-25">
        <a href="#about" className="tracking-[.10em] w-[100px] text-center hover:text-[var(--accent)] hover:font-bold transition-all">HOME</a>
        <a href="#skills" className="tracking-[.10em] w-[100px] text-center hover:text-[var(--accent)] hover:font-bold transition-all">SKILLS</a>
        <a href="#projects" className="tracking-[.10em] w-[100px] text-center hover:text-[var(--accent)] hover:font-bold transition-all">PROJECTS</a>
        <a href="#contact" className="tracking-[.10em] w-[100px] text-center hover:text-[var(--accent)] hover:font-bold transition-all">CONTACT</a>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        )}
      </button>
    </nav>
  );
}
