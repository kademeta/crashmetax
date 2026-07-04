"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection() {
  const [stage, setStage] = useState<'avatar' | 'crash' | 'metax' | 'settled'>('avatar');
  const [isSubscribeAnimating, setIsSubscribeAnimating] = useState(false);
  const [isFollowAnimating, setIsFollowAnimating] = useState(false);

  const { scrollY } = useScroll();
  // Very gentle y-parallax on background elements for depth
  const backgroundY = useTransform(scrollY, [0, 800], [0, 120]);

  useEffect(() => {
    // Stage 1: Avatar entrance begins immediately on mount (stage is 'avatar')

    // Stage 2: 'crash' entrance starts at 700ms (after Avatar settles)
    const crashTimer = setTimeout(() => {
      setStage('crash');
    }, 700);

    // Stage 3: 'metax' slide-out starts at 1500ms
    const metaxTimer = setTimeout(() => {
      setStage('metax');
    }, 1500);

    // Stage 4: 'settled' stage starts at 2150ms, fading in tagline, CTA, & scroll indicator
    const settledTimer = setTimeout(() => {
      setStage('settled');
    }, 2150);

    return () => {
      clearTimeout(crashTimer);
      clearTimeout(metaxTimer);
      clearTimeout(settledTimer);
    };
  }, []);

  const handleSubscribeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isSubscribeAnimating) return;
    
    setIsSubscribeAnimating(true);
    // Standardized 600ms ripple pulse delay before navigating
    setTimeout(() => {
      setIsSubscribeAnimating(false);
      window.open(SITE_CONFIG.links.xSubscribe, "_blank");
    }, 600);
  };

  const handleFollowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isFollowAnimating) return;
    
    setIsFollowAnimating(true);
    // Standardized 600ms ripple pulse delay before navigating
    setTimeout(() => {
      setIsFollowAnimating(false);
      window.open(SITE_CONFIG.links.xProfile, "_blank");
    }, 600);
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0F172A] py-20" id="hero">
      
      {/* Ambient background grid with gentle parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-30 select-none"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          
          {/* Subtle horizontal waveform background lines (Pink & Blue) */}
          <path 
            d="M -100,450 C 200,250 400,650 800,450 C 1200,250 1400,650 1800,450" 
            fill="none" 
            stroke="rgba(255,177,221,0.025)" 
            strokeWidth="1.5" 
          />
          <path 
            d="M -100,500 C 300,300 500,600 900,500 C 1100,300 1300,600 1900,500" 
            fill="none" 
            stroke="rgba(34,245,255,0.025)" 
            strokeWidth="1" 
          />
        </svg>
      </motion.div>

      {/* Floating Slow Ambient Lighting Blobs (Pink & Blue) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] left-[25%] w-[400px] h-[400px] bg-doginal-pink/[0.015] blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[25%] w-[450px] h-[450px] bg-doginal-teal/[0.015] blur-[140px] rounded-full"
        />
      </div>

      {/* Tactile micro-noise */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-0 bg-noise" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center select-none max-w-4xl mx-auto">
        
        {/* Avatar Container (Slightly larger, breathing pulse & cyan border glow) */}
        <div className="relative mb-6">
          
          {/* Subtle Breathing Glow behind Avatar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={stage !== 'avatar' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.04, 1], 
                opacity: [0.35, 0.55, 0.35] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full rounded-full bg-doginal-teal/20 blur-[80px]"
            />
          </motion.div>
          
          {/* Avatar (Subtle slow breathing scale + cyan border ring) */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ 
              scale: stage === 'settled' ? [1, 1.025, 1] : 1,
              opacity: 1 
            }}
            transition={
              stage === 'settled'
                ? { 
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8 } 
                  }
                : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full border border-doginal-teal/25 p-2 bg-obsidian-900/60 shadow-[0_0_35px_rgba(34,245,255,0.12)] z-10 flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-full border border-white/10 overflow-hidden bg-[#18181B] shadow-inner">
              <img 
                src="/crash-doginal.png" 
                alt="Crash Doginal Collector" 
                className="w-full h-full object-cover rounded-full pixelated" 
              />
            </div>
          </motion.div>
        </div>

        {/* Heading Text (Tightened vertical gaps & refined negative tracking) */}
        <motion.h1 
          layout
          className="flex items-center justify-center font-sans text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none drop-shadow-xl select-none mb-3"
        >
          {/* "Crash" - Confident bold */}
          <motion.span 
            layout 
            initial={{ scale: 0.97, opacity: 0 }}
            animate={stage !== 'avatar' ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white tracking-[-0.03em] inline-block"
          >
            Crash
          </motion.span>
          
          {/* "metax" - Light, elegant slide-out */}
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
              className="font-light text-white/65 inline-block pl-2 tracking-[-0.03em]"
            >
              metax
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Tagline (fades in gracefully, unified font & tight margins) */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={stage === 'settled' ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3.5 text-lg md:text-xl font-sans font-light tracking-wide text-white/80 select-none text-balance"
        >
          Built on faith. Powered by jpegs.
        </motion.p>

        {/* CTA Buttons (Primary/Secondary visual hierarchy refined) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={stage === 'settled' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-8 flex flex-col items-center gap-5 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md px-4">
            
            {/* PRIMARY: Lock into the Signal (Prominent Pink Gradient) */}
            <a
              href={SITE_CONFIG.links.xProfile}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFollowClick}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-doginal-pink to-[#ff8ac5] text-obsidian-900 rounded-full font-sans font-bold tracking-wider uppercase text-xs md:text-sm shadow-[0_4px_22px_rgba(255,177,221,0.25)] hover:shadow-[0_8px_30px_rgba(255,177,221,0.45)] border border-doginal-pink/40 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 text-center shrink-0"
              aria-label="Lock into the Signal - Follow @Crashmetax on X"
            >
              {/* Glossy glare effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-glare"></span>
              
              {/* Custom signal ripple circles on click */}
              {isFollowAnimating && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-doginal-pink animate-ping pointer-events-none z-0"></span>
                  <span className="absolute -inset-6 rounded-full border border-doginal-pink/50 animate-[ping_0.8s_ease-out_infinite] pointer-events-none z-0"></span>
                </>
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-obsidian-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-obsidian-900"></span>
                </span>
                <span>Lock into the Signal</span>
              </span>
            </a>

            {/* SECONDARY: Subscribe on X (Dark Glass / Subtle supporting style) */}
            <a
              href={SITE_CONFIG.links.xSubscribe}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSubscribeClick}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/85 hover:text-white rounded-full font-sans font-bold tracking-wider uppercase text-xs md:text-sm shadow-sm border border-white/10 hover:border-doginal-pink/30 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 text-center shrink-0"
              aria-label="Subscribe to @Crashmetax on X"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-glare"></span>
              
              {isSubscribeAnimating && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-doginal-pink animate-ping pointer-events-none z-0"></span>
                  <span className="absolute -inset-6 rounded-full border border-doginal-pink/50 animate-[ping_0.8s_ease-out_infinite] pointer-events-none z-0"></span>
                </>
              )}

              <span className="relative z-10">Subscribe on 𝕏</span>
            </a>

          </div>
          
          {/* Supporting Text (Integrated tightly below buttons, reduced size and optimized opacity) */}
          <p className="text-[10px] md:text-xs text-white/40 font-sans tracking-[0.08em] uppercase max-w-sm text-center leading-relaxed">
            Follow & Subscribe to <span className="text-doginal-pink font-semibold tracking-normal lowercase">@Crashmetax</span> on 𝕏 • Join {SITE_CONFIG.followerCount} riding with us
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator (Refined chevron bounce & opacity) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={stage === 'settled' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none select-none opacity-40 hover:opacity-85 transition-opacity duration-300"
      >
        <span className="text-[9px] uppercase tracking-[6px] font-bold text-white/40 mb-1.5">Scroll</span>
        <motion.svg 
          animate={{ y: [0, 4, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white/40"
        >
          <path d="m6 9 6 6 6-6"/>
        </motion.svg>
      </motion.div>
    </section>
  );
}
