"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="bg-obsidian-900 border-t border-white/5 py-24 relative overflow-hidden">
      {/* Deep cinematic glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center space-y-6 relative z-10">
        
        {/* Interactive Acronym Container */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(!isHovered)}
          className="flex flex-col items-center cursor-pointer select-none group py-2"
        >
          {/* D.O.G.E letters */}
          <div className="flex items-center space-x-3">
            <motion.span 
              animate={{ 
                color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.5)",
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-pixel uppercase tracking-widest transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,177,221,0.5)]"
            >
              D
            </motion.span>
            
            <motion.div 
              animate={{ scale: isHovered ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 bg-[#64ffff] rounded-full animate-pulse"
            ></motion.div>
            
            <motion.span 
              animate={{ 
                color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.5)",
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="text-2xl font-pixel uppercase tracking-widest transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,177,221,0.5)]"
            >
              O
            </motion.span>
            
            <motion.div 
              animate={{ scale: isHovered ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 2, ease: "easeInOut", delay: 0.3 }}
              className="w-1 h-1 bg-[#64ffff] rounded-full animate-pulse"
            ></motion.div>
            
            <motion.span 
              animate={{ 
                color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.5)",
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-2xl font-pixel uppercase tracking-widest transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,177,221,0.5)]"
            >
              G
            </motion.span>
            
            <motion.div 
              animate={{ scale: isHovered ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 2, ease: "easeInOut", delay: 0.6 }}
              className="w-1 h-1 bg-[#64ffff] rounded-full animate-pulse"
            ></motion.div>
            
            <motion.span 
              animate={{ 
                color: isHovered ? "#ffb1dd" : "rgba(255, 255, 255, 0.5)",
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-2xl font-pixel uppercase tracking-widest transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,177,221,0.5)]"
            >
              E
            </motion.span>
          </div>

          {/* Expanded Text Area */}
          <div className="h-6 overflow-hidden mt-3 relative flex items-center justify-center">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#ffb1dd]/70 uppercase whitespace-nowrap"
                >
                  Do Only Good Everyday
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-white/40 font-sans text-sm tracking-wide">
          © {new Date().getFullYear()} Crashmetax. Built on faith, fueled by jpegs.
        </p>
      </div>
    </footer>
  );
}
