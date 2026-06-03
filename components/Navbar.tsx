import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-black/10 backdrop-blur-[12px]">
      <div className="flex items-center justify-between px-6 md:px-12 max-w-6xl mx-auto h-full w-full">
        {/* Left Side: Logo */}
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-white hover:text-purple-300 transition-colors">
          MatrixPulse
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white font-semibold transition-colors">
            Calculator
          </Link>
          <Link href="/meaning/15" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white font-semibold transition-colors">
            Arcana Profiles
          </Link>
          <Link href="/sitemap.xml" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white font-semibold transition-colors" target="_blank">
            Sitemap
          </Link>
        </nav>

        {/* Right Side: GitHub repository button */}
        <div>
          <a
            href="https://github.com/sarwech-odho/MatrixPulse"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/10 hover:border-purple-500/30 rounded-full text-[10px] uppercase tracking-widest font-semibold text-zinc-300 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
          >
            Repository
          </a>
        </div>
      </div>
    </header>
  );
}
