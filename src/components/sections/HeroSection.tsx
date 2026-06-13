"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [stage, setStage] = useState<'avatar' | 'crash' | 'metax' | 'settled'>('avatar');

  useEffect(() => {
    // Stage 1: Avatar entrance begins immediately on mount (stage is 'avatar')

    // Stage 2: 'crash' entrance starts at 700ms (after Avatar settles)
    const crashTimer = setTimeout(() => {
      setStage('crash');
    }, 700);

    // Stage 3: 'metax' slide-out starts at 1500ms (adding a short pause after Crash settles)
    const metaxTimer = setTimeout(() => {
      setStage('metax');
    }, 1500);

    // Stage 4: 'settled' stage starts at 2150ms, fading in tagline & scroll indicator
    const settledTimer = setTimeout(() => {
      setStage('settled');
    }, 2150);

    return () => {
      clearTimeout(crashTimer);
      clearTimeout(metaxTimer);
      clearTimeout(settledTimer);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0F172A]" id="hero">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center select-none">
        
        {/* Avatar Container */}
        <div className="relative mb-8">
          
          {/* Subtle Breathing Glow behind Avatar (fades in gently after Avatar settles) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={stage !== 'avatar' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.08, 1], 
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ 
                duration: 4.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full rounded-full bg-doginal-teal/20 blur-[80px]"
            />
          </motion.div>
          
          {/* Avatar (Gentle scale + fade entrance) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-[5px] border-[#18181B] shadow-[0_35px_80px_rgba(0,0,0,0.65)] overflow-hidden bg-[#18181B] z-10"
          >
            <img 
              src="/crash-doginal.png" 
              alt="Crash" 
              className="w-full h-full object-cover rounded-full pixelated" 
            />
          </motion.div>
        </div>

        {/* Heading Text */}
        <motion.h1 
          layout
          className="flex items-center justify-center font-sans text-[64px] md:text-[80px] lg:text-[92px] tracking-tight leading-none drop-shadow-xl"
        >
          {/* "Crash" - Clean, confident entrance */}
          <motion.span 
            layout 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={stage !== 'avatar' ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white inline-block"
          >
            Crash
          </motion.span>
          
          {/* "metax" - Smooth, elegant slide-out */}
          <motion.span 
            layout
            initial={{ width: 0, opacity: 0 }}
            animate={
              (stage === 'metax' || stage === 'settled')
                ? { width: 'auto', opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ 
              width: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.5, ease: "easeOut", delay: 0.05 }
            }}
            className="overflow-hidden inline-block align-bottom"
            style={{ whiteSpace: 'nowrap' }}
          >
            <motion.span 
              initial={{ x: -25 }}
              animate={
                (stage === 'metax' || stage === 'settled')
                  ? { x: 0 } 
                  : { x: -25 }
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-normal text-white/70 inline-block"
            >
              metax
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Tagline (fades in gracefully last) */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={stage === 'settled' ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-lg md:text-xl text-white/70 tracking-[0.3px]"
        >
          Built on faith. Fueled by jpegs.
        </motion.p>
      </div>

      {/* Scroll Indicator (fades in last) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={stage === 'settled' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[4px] font-medium text-white/60 mb-2">Scroll</span>
        <motion.svg 
          animate={{ y: [0, 6, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white/80"
        >
          <path d="m6 9 6 6 6-6"/>
        </motion.svg>
      </motion.div>
    </section>
  );
}
