"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="bg-obsidian-900 border-t border-white/5 py-24 md:py-32 relative overflow-hidden z-20">
      
      {/* Deep cinematic glow & subtle noise grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none z-0 bg-noise" />
      
      <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Closing Quote (Elevated breathing room & weight) */}
        <div className="mb-6 max-w-xl text-center select-none">
          <p className="text-xl md:text-2xl font-serif italic text-white/80 leading-relaxed text-balance">
            “The frequency is strongest together.”
          </p>
        </div>

        {/* Refined Secondary Follow CTA (Less dominant, clean glass styling) */}
        <div className="mb-16 select-none">
          <a
            href={SITE_CONFIG.links.xProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-3 bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white rounded-full border border-white/10 hover:border-doginal-teal/40 transition-all duration-300 font-sans font-bold tracking-[0.18em] uppercase text-[10px] md:text-xs shadow-sm cursor-pointer active:scale-95 text-center overflow-hidden"
            aria-label="Follow Crashmetax on X"
          >
            {/* Soft gloss flare reflection on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-glare"></span>
            <span className="relative z-10">Follow @Crashmetax on 𝕏</span>
          </a>
        </div>

        {/* Interactive Ethos Container (D.O.G.E. Quiet brand statement) */}
        <motion.div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(!isHovered)}
          animate={{ 
            scale: isHovered ? 1.025 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 cursor-pointer select-none py-2 px-4 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-doginal-pink/40 mb-8"
          tabIndex={0}
          aria-label="D.O.G.E. - Do Only Good Everyday"
        >
          {/* D.O.G.E letters */}
          <div className="flex items-center space-x-2.5">
            {["D", "O", "G", "E"].map((letter, idx) => (
              <span key={letter} className="flex items-center">
                <motion.span 
                  animate={{ 
                    color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.55)"
                  }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="text-lg md:text-xl font-pixel uppercase tracking-wider transition-shadow duration-300"
                  style={{
                    textShadow: isHovered ? "0 0 12px rgba(255,177,221,0.5)" : "none"
                  }}
                >
                  {letter}
                </motion.span>
                {idx < 3 && (
                  <span className="text-white/35 ml-2 font-pixel text-xs">.</span>
                )}
              </span>
            ))}
          </div>

          <span className="hidden md:inline text-white/20 text-lg font-light">|</span>

          {/* Expanded Text */}
          <motion.span
            animate={{ 
              color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.45)"
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[11px] md:text-xs font-sans font-bold tracking-[0.25em] uppercase transition-shadow duration-300"
            style={{
              textShadow: isHovered ? "0 0 10px rgba(255,177,221,0.4)" : "none"
            }}
          >
            Do Only Good Everyday
          </motion.span>
        </motion.div>

        {/* Footer Credits and Copyright (Compacted & cleaned) */}
        <div className="flex flex-col items-center gap-2 pt-6 border-t border-white/5 w-full max-w-md select-none">
          <p className="text-white/30 font-sans text-[10px] tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} Crashmetax. Built on faith, fueled by jpegs.
          </p>
          <p className="text-[9px] text-white/20 font-sans tracking-[0.15em] uppercase">
            Site crafted by{" "}
            <a 
              href={SITE_CONFIG.links.kadeProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-doginal-pink transition-colors duration-300 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-doginal-pink/55"
            >
              Kade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
