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
          <Link href="/meaning/1" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white font-semibold transition-colors">
            Arcana Library
          </Link>
        </nav>

        {/* Right Side: High-contrast Get Premium button */}
        <div>
          <Link
            href="/#calculator"
            className="glass glass-high hover:glass-glow border-purple-500/25 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white hover:text-purple-300 hover:border-purple-500/40 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
          >
            Get Premium
          </Link>
        </div>
      </div>
    </header>
  );
}
