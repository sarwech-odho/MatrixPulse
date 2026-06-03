import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="relative w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl w-full px-6 pt-9 pb-6 flex items-baseline justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="ml-2 md:ml-4 font-serif text-3xl md:text-4xl font-bold tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:text-purple-300 transition-colors">
          MatrixPulse
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 mt-1 md:mt-2">
          <Link href="/" className="text-sm md:text-[15px] uppercase tracking-wider text-zinc-400 hover:text-white font-semibold transition-colors">
            Calculator
          </Link>
          <Link href="/meaning/15" className="text-sm md:text-[15px] uppercase tracking-wider text-zinc-400 hover:text-white font-semibold transition-colors">
            Arcana Profiles
          </Link>
          <Link href="/meaning/1" className="text-sm md:text-[15px] uppercase tracking-wider text-zinc-400 hover:text-white font-semibold transition-colors">
            Arcana Library
          </Link>
        </nav>

        {/* Right Side: High-contrast Get Premium button */}
        <div className="mt-1 md:mt-2">
          <Link
            href="/#calculator"
            className="glass glass-high hover:glass-glow border-purple-500/25 px-6 py-3 rounded-full text-xs md:text-sm uppercase tracking-wider font-bold text-white hover:text-purple-300 hover:border-purple-500/40 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
          >
            Get Premium
          </Link>
        </div>
      </div>
    </header>
  );
}
