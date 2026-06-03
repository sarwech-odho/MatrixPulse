import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="relative w-full border-b border-white/5 bg-black/40 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <div className="mx-auto max-w-7xl w-full px-4 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:text-purple-300 transition-colors">
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
