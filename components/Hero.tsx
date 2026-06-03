"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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

  // Refs for auto-advance input logic
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && month === '') {
      dayRef.current?.focus();
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && year === '') {
      monthRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || d < 1 || d > 31) {
      setError('Invalid day (1-31)');
      return;
    }
    if (isNaN(m) || m < 1 || m > 12) {
      setError('Invalid month (1-12)');
      return;
    }
    if (isNaN(y) || y < 1000 || y > 9999) {
      setError('Invalid 4-digit year');
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
    <div className="relative min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-center bg-[#050508] overflow-hidden px-6 pt-8 pb-12 lg:pb-24">
      {/* 
        Slow-Moving hardware-accelerated aurora background circles. 
        Adjusted to blur-[100px] and 0.15 opacity for an ethereal, premium feel.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[var(--aurora-1)] blur-[100px] opacity-15 animate-aurora-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] md:w-[38vw] md:h-[38vw] rounded-full bg-[var(--aurora-2)] blur-[100px] opacity-15 animate-aurora-2" />
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] md:w-[28vw] md:h-[28vw] rounded-full bg-[var(--aurora-3)] blur-[100px] opacity-15 animate-aurora-3" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Headline & Brand Content (Animated Entrance) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 text-left"
        >
          {/* Trust Badge Line */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-[10px] uppercase tracking-widest font-semibold w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Used by 50,000+ seekers
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl text-white font-medium leading-tight tracking-tight">
            Map Your Destiny.<br />
            <span className="text-purple-400">Master Your Life.</span>
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
            MatrixPulse is an AI-powered Destiny Matrix engine that decodes your core personality, career accelerators, and ancestral karmic tracks. Align your path with precision.
          </p>
        </motion.div>

        {/* Right Side: Floating Liquid Glass Calculator Card */}
        <div className="flex items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
            id="calculator"
          >
            {/* 
              Smooth Infinite y-axis Float Oscillation.
              Combined with GlassCard to provide a lifelike feel.
            */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full"
            >
              <AnimatePresence mode="wait">
                {!nodes ? (
                  <motion.div
                    key="form-entry"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <GlassCard glow={true} className="w-full text-center flex flex-col gap-6 md:gap-7">
                      <div>
                        <h2 className="font-serif text-xl md:text-2xl text-white font-medium mb-1">
                          Calculate Matrix Profile
                        </h2>
                        <p className="text-zinc-500 text-xs tracking-wider uppercase">
                          Enter date of birth
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                        {/* Capsules DOB Inputs with Floating Focus-Glow */}
                        <div className="flex gap-3 justify-center items-center w-full">
                          {/* Day */}
                          <div className="flex flex-col items-center w-16 p-2 rounded-xl bg-white/[0.015] border border-white/5 focus-within:border-purple-500/40 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] focus-within:-translate-y-0.5 transition-all duration-300">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Day</span>
                            <input
                              ref={dayRef}
                              type="text"
                              placeholder="DD"
                              value={day}
                              onChange={handleDayChange}
                              className="w-full text-center text-xl font-semibold bg-transparent text-white outline-none placeholder:text-zinc-700"
                            />
                          </div>

                          <span className="text-zinc-700 text-lg font-light">/</span>

                          {/* Month */}
                          <div className="flex flex-col items-center w-16 p-2 rounded-xl bg-white/[0.015] border border-white/5 focus-within:border-purple-500/40 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] focus-within:-translate-y-0.5 transition-all duration-300">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Month</span>
                            <input
                              ref={monthRef}
                              type="text"
                              placeholder="MM"
                              value={month}
                              onChange={handleMonthChange}
                              onKeyDown={handleMonthKeyDown}
                              className="w-full text-center text-xl font-semibold bg-transparent text-white outline-none placeholder:text-zinc-700"
                            />
                          </div>

                          <span className="text-zinc-700 text-lg font-light">/</span>

                          {/* Year */}
                          <div className="flex flex-col items-center w-24 p-2 rounded-xl bg-white/[0.015] border border-white/5 focus-within:border-purple-500/40 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] focus-within:-translate-y-0.5 transition-all duration-300">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mb-1">Year</span>
                            <input
                              ref={yearRef}
                              type="text"
                              placeholder="YYYY"
                              value={year}
                              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              onKeyDown={handleYearKeyDown}
                              className="w-full text-center text-xl font-semibold bg-transparent text-white outline-none placeholder:text-zinc-700"
                            />
                          </div>
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400/90 text-xs font-light"
                          >
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer w-full mt-2"
                        >
                          Reveal My Matrix
                        </motion.button>
                        
                        {/* See How It Works Link */}
                        <Link
                          href="/meaning/15/material"
                          className="text-[11px] text-zinc-500 hover:text-purple-400 transition-colors underline underline-offset-4"
                        >
                          See how it works (2 min read)
                        </Link>
                      </form>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <GlassCard glow={true} className="w-full flex flex-col gap-6 text-center">
                      <div>
                        <h2 className="font-serif text-xl md:text-2xl text-white font-medium mb-1">
                          Your Core Matrix Energies
                        </h2>
                        <p className="text-zinc-500 text-xs tracking-wider uppercase">
                          Click any sector to read details
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 text-left">
                        {/* Left Node */}
                        <Link
                          href={`/meaning/${nodes.left}/soul`}
                          className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Soul / Inner</span>
                            <span className="text-white font-serif font-medium text-sm">Arcana {nodes.left}</span>
                          </div>
                          <span className="text-[10px] text-purple-400 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">Explore Channel &rarr;</span>
                        </Link>

                        {/* Top Node */}
                        <Link
                          href={`/meaning/${nodes.top}/spiritual`}
                          className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Spiritual / Divine</span>
                            <span className="text-white font-serif font-medium text-sm">Arcana {nodes.top}</span>
                          </div>
                          <span className="text-[10px] text-purple-400 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">Explore Channel &rarr;</span>
                        </Link>

                        {/* Right Node */}
                        <Link
                          href={`/meaning/${nodes.right}/material`}
                          className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Material / Money</span>
                            <span className="text-white font-serif font-medium text-sm">Arcana {nodes.right}</span>
                          </div>
                          <span className="text-[10px] text-purple-400 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">Explore Channel &rarr;</span>
                        </Link>

                        {/* Bottom Node */}
                        <Link
                          href={`/meaning/${nodes.bottom}/karma`}
                          className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Karma / Lessons</span>
                            <span className="text-white font-serif font-medium text-sm">Arcana {nodes.bottom}</span>
                          </div>
                          <span className="text-[10px] text-purple-400 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">Explore Channel &rarr;</span>
                        </Link>

                        {/* Center Node */}
                        <Link
                          href={`/meaning/${nodes.center}/comfort`}
                          className="group flex items-center justify-between p-3 rounded-xl border border-purple-500/10 bg-purple-500/[0.02] hover:bg-white/5 hover:border-purple-500/20 transition-all duration-300"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold">Comfort Zone (Core)</span>
                            <span className="text-purple-300 font-serif font-medium text-sm">Arcana {nodes.center}</span>
                          </div>
                          <span className="text-[10px] text-purple-400 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">Explore Channel &rarr;</span>
                        </Link>
                      </div>

                      <div className="flex justify-center mt-2">
                        <button
                          onClick={handleReset}
                          className="px-6 py-2 border border-white/10 hover:border-white/20 text-zinc-300 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          Calculate Another Date
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Live Seekers Ticker (Infinite horizontal marquee) */}
      <motion.div 
        className="hidden sm:flex my-12 py-6 w-full overflow-hidden relative border-y border-purple-500/10 bg-black/20 select-none cursor-pointer"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {[
            { icon: '🔮', text: <>Seeker in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Berlin</span> just unlocked Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">10</span></> },
            { icon: '✨', text: <>Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">22</span> transition advice updated <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">4m ago</span></> },
            { icon: '💫', text: <>New compatibility map calculated from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">London</span></> },
            { icon: '🔮', text: <>Seeker in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Berlin</span> just unlocked Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">10</span></> },
            { icon: '✨', text: <>Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">22</span> transition advice updated <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">4m ago</span></> },
            { icon: '💫', text: <>New compatibility map calculated from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">London</span></> },
            { icon: '🔮', text: <>Seeker in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Berlin</span> just unlocked Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">10</span></> },
            { icon: '✨', text: <>Arcana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">22</span> transition advice updated <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">4m ago</span></> },
            { icon: '💫', text: <>New compatibility map calculated from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">London</span></> }
          ].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-6 py-3 mx-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] cursor-pointer transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06] group text-sm tracking-wide text-white/80"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
