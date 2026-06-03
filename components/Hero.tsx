"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { calculateMatrixNodes } from '../lib/matrix-math';

export default function Hero() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [nodes, setNodes] = useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
    center: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || d < 1 || d > 31) {
      setError('Please enter a valid day (1-31)');
      return;
    }
    if (isNaN(m) || m < 1 || m > 12) {
      setError('Please enter a valid month (1-12)');
      return;
    }
    if (isNaN(y) || y < 1000 || y > 9999) {
      setError('Please enter a valid 4-digit year');
      return;
    }

    try {
      const dobString = `${d.toString().padStart(2, '0')}.${m.toString().padStart(2, '0')}.${y}`;
      const calculated = calculateMatrixNodes(dobString);
      setNodes(calculated);
    } catch (err: any) {
      setError(err.message || 'Calculation failed');
    }
  };

  const handleReset = () => {
    setNodes(null);
    setDay('');
    setMonth('');
    setYear('');
    setError('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050508] overflow-hidden px-4 py-12 md:py-24">
      {/* 
        Slow-Moving hardware-accelerated aurora background circles. 
        Will-change: transform and translation-only animations prevent layout shifts.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[var(--aurora-1)] blur-[80px] md:blur-[120px] opacity-60 animate-aurora-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] md:w-[38vw] md:h-[38vw] rounded-full bg-[var(--aurora-2)] blur-[90px] md:blur-[130px] opacity-50 animate-aurora-2" />
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] md:w-[28vw] md:h-[28vw] rounded-full bg-[var(--aurora-3)] blur-[70px] md:blur-[100px] opacity-40 animate-aurora-3" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!nodes ? (
            <motion.div
              key="input-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <GlassCard glow={true} className="w-full text-center flex flex-col gap-6 md:gap-8">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-medium tracking-tight mb-2">
                    MatrixPulse
                  </h1>
                  <p className="text-[var(--text-secondary)] text-sm md:text-base tracking-wide max-w-sm mx-auto uppercase">
                    Destiny Matrix Coaching Engine
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                  <div className="flex flex-col items-center gap-4">
                    <label className="font-serif text-xl md:text-2xl text-zinc-100 block">
                      I was born on...
                    </label>
                    <div className="inline-flex gap-2 items-center border-b border-white/10 pb-2 focus-within:border-purple-500/80 transition-colors duration-300">
                      <input
                        type="text"
                        placeholder="DD"
                        value={day}
                        onChange={(e) => setDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        className="w-12 text-center text-2xl md:text-3xl font-serif bg-transparent text-purple-400 outline-none placeholder:text-zinc-700 focus:placeholder:text-transparent"
                      />
                      <span className="text-zinc-700 text-2xl font-light">/</span>
                      <input
                        type="text"
                        placeholder="MM"
                        value={month}
                        onChange={(e) => setMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        className="w-12 text-center text-2xl md:text-3xl font-serif bg-transparent text-purple-400 outline-none placeholder:text-zinc-700 focus:placeholder:text-transparent"
                      />
                      <span className="text-zinc-700 text-2xl font-light">/</span>
                      <input
                        type="text"
                        placeholder="YYYY"
                        value={year}
                        onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="w-20 text-center text-2xl md:text-3xl font-serif bg-transparent text-purple-400 outline-none placeholder:text-zinc-700 focus:placeholder:text-transparent"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400/90 text-sm font-light mt-1"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-500 active:scale-98 text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer"
                  >
                    Reveal My Matrix
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="results-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <GlassCard glow={true} className="w-full flex flex-col gap-6 md:gap-8">
                <div className="text-center">
                  <h2 className="font-serif text-2xl md:text-3xl text-white font-medium mb-1">
                    Your Primary Energies
                  </h2>
                  <p className="text-[var(--text-secondary)] text-sm tracking-wide uppercase">
                    Calculation Engine Output
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left (Soul) */}
                  <div className="flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-200">
                    <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Left Node (Soul / Inner Driver)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-white">{nodes.left}</span>
                      <span className="text-xs text-purple-400/80">Arcana {nodes.left}</span>
                    </div>
                  </div>

                  {/* Top (Spiritual) */}
                  <div className="flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-200">
                    <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Top Node (Spiritual Connection)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-white">{nodes.top}</span>
                      <span className="text-xs text-purple-400/80">Arcana {nodes.top}</span>
                    </div>
                  </div>

                  {/* Right (Material) */}
                  <div className="flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-200">
                    <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Right Node (Material / Society)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-white">{nodes.right}</span>
                      <span className="text-xs text-purple-400/80">Arcana {nodes.right}</span>
                    </div>
                  </div>

                  {/* Bottom (Karma) */}
                  <div className="flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-200">
                    <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Bottom Node (Karmic Tail Anchor)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-white">{nodes.bottom}</span>
                      <span className="text-xs text-purple-400/80">Arcana {nodes.bottom}</span>
                    </div>
                  </div>

                  {/* Center (Comfort Zone) */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1 p-4 rounded-xl border border-purple-500/10 bg-purple-500/[0.02] hover:bg-purple-500/[0.04] transition-colors duration-200">
                    <span className="text-xs text-purple-400 uppercase font-semibold tracking-wider">Center Node (Comfort Zone / Core Essence)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif font-bold text-purple-300">{nodes.center}</span>
                      <span className="text-xs text-purple-400/80">Arcana {nodes.center}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-white/10 hover:border-white/20 active:scale-98 text-zinc-300 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    Calculate Another Date
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
