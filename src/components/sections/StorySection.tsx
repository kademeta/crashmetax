"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Quote {
  id: string;
  text: string;
  author: string;
  type: "wisdom" | "unfiltered";
}

const quotes: Quote[] = [
  {
    id: "q1",
    text: "There is no wreckage so complete that faith cannot rebuild it.",
    author: "Crash",
    type: "wisdom"
  },
  {
    id: "q2",
    text: "Sometimes the hardest steps are the ones you take sitting still.",
    author: "Crash",
    type: "wisdom"
  },
  {
    id: "q3",
    text: "Perspective is your passport or your prison. Choose your timeline.",
    author: "Crash",
    type: "wisdom"
  },
  {
    id: "q4",
    text: "The strength of the signal isn't measured in the absence of noise, but in the clarity of the truth.",
    author: "Crash",
    type: "wisdom"
  },
  {
    id: "q5",
    text: "Every crash is just a calibration for the next ascent.",
    author: "Crash",
    type: "wisdom"
  },
  {
    id: "q6",
    text: "You’re lucky I’m in a chair ♿️ I would of taken the ‘six pack challenge’ 😆",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q7",
    text: "People tell me I'm an inspiration. I just tell them I have good upper body strength and a decent WiFi connection.",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q8",
    text: "I have two modes: praising God and complaining about gas fees.",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q9",
    text: "Dogecoin to $1 is cool, but Do Only Good Everyday is the real ledger.",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q10",
    text: "Spaces are host-native. If you can't stand the heat, don't request the mic.",
    author: "Crash",
    type: "unfiltered"
  }
];

export default function StorySection() {
  const [mode, setMode] = useState<"wisdom" | "unfiltered">("wisdom");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide next, -1 = slide prev

  const filteredQuotes = quotes.filter((q) => q.type === mode);
  const currentQuote = filteredQuotes[quoteIndex] || filteredQuotes[0];

  // Reset index when mode changes
  const handleModeChange = (newMode: "wisdom" | "unfiltered") => {
    if (newMode === mode) return;
    setDirection(newMode === "unfiltered" ? 1 : -1);
    setMode(newMode);
    setQuoteIndex(0);
  };

  const handleNextQuote = () => {
    setDirection(1);
    setQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  return (
    <section id="wisdom" className="relative py-28 md:py-36 lg:py-40 bg-[#09090B] overflow-hidden">
      
      {/* Subtle Atmospheric Background Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Wisdom background: Upright truck */}
        <motion.div
          initial={{ opacity: 0.15 }}
          animate={{
            opacity: mode === "wisdom" ? 0.15 : 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            willChange: "opacity",
            backgroundImage: "url('/kademeta_Sin_City_style_Frank_Miller_graphic_novel_aesthetic_hi_7b73b2cc-8426-4c04-9b42-cbbd2f957fde.PNG')",
            filter: "blur(6px) brightness(0.85)",
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />

        {/* Unfiltered background: Wrecked car */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: mode === "unfiltered" ? 0.15 : 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            willChange: "opacity",
            backgroundImage: "url('/zxKrA.png')",
            filter: "blur(5px) brightness(0.85)",
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />

        {/* Blue Tint Color Blend Layer */}
        <div className="absolute inset-0 bg-[#22F5FF]/5 mix-blend-color z-10" />

        {/* Strong Vignette and Gradients to Protect Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B] z-10" />
        <div 
          className="absolute inset-0 z-10" 
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(9, 9, 11, 0.1) 0%, rgba(9, 9, 11, 0.8) 70%, #09090B 100%)"
          }}
        />
      </div>

      {/* Ambient cool background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-doginal-teal/[0.02] blur-[120px] rounded-full pointer-events-none z-10" />
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-10 bg-noise" />

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header & Toggle */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-8 tracking-tight text-center"
          >
            Wreckage to Wisdom
          </motion.h2>

          {/* Premium Physically Sliding Pill Toggle */}
          <div className="flex justify-center select-none">
            <div className="relative flex items-center p-1 bg-white/[0.02] backdrop-blur-lg rounded-full border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.05)] text-sm w-72">
              <div aria-live="polite" className="sr-only">
                {`Currently showing ${mode} quotes.`}
              </div>

              {/* Active slider background */}
              <motion.div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
                animate={{
                  left: mode === "wisdom" ? 4 : 144,
                  right: mode === "wisdom" ? 144 : 4,
                }}
                style={{ willChange: "left, right" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />

              <button
                onClick={() => handleModeChange("wisdom")}
                aria-pressed={mode === "wisdom"}
                className={cn(
                  "relative z-10 w-36 py-2.5 rounded-full font-sans font-bold tracking-[0.08em] uppercase text-[10px] transition-colors duration-500 focus:outline-none cursor-pointer text-center",
                  mode === "wisdom" ? "text-zinc-950" : "text-white/45 hover:text-white/85"
                )}
              >
                Wisdom
              </button>
              <button
                onClick={() => handleModeChange("unfiltered")}
                aria-pressed={mode === "unfiltered"}
                className={cn(
                  "relative z-10 w-36 py-2.5 rounded-full font-sans font-bold tracking-[0.08em] uppercase text-[10px] transition-colors duration-500 focus:outline-none cursor-pointer text-center",
                  mode === "unfiltered" ? "text-zinc-950" : "text-white/45 hover:text-white/85"
                )}
              >
                Unfiltered
              </button>
            </div>
          </div>
        </div>

        {/* Quotes Area - Premium Cycling Display */}
        <div className="max-w-4xl mx-auto min-h-[280px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait" initial={false}>
            {currentQuote && (
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, x: direction * 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center"
              >
                <blockquote className="max-w-3xl mx-auto flex flex-col items-center">
                  
                  {/* Transmission Counter (Integrated elegantly above quote) */}
                  <div className="mb-4 select-none">
                    <span className="text-[9px] font-sans font-bold tracking-[0.3em] text-[#ffb1dd] opacity-45 uppercase">
                      Transmission 0{quoteIndex + 1} / 0{filteredQuotes.length}
                    </span>
                  </div>

                  {/* Subtle design accent line */}
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#ffb1dd]/45 to-transparent mx-auto mb-8" />

                  <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium leading-relaxed md:leading-snug tracking-tight text-white text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-2xl px-4">
                    “{currentQuote.text}”
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-sans font-bold tracking-[0.25em] text-[#ffb1dd]/90 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none">
                    <span className="w-6 h-[1px] bg-[#ffb1dd]/30"></span>
                    <span>{currentQuote.author}</span>
                    <span className="w-6 h-[1px] bg-[#ffb1dd]/30"></span>
                  </div>
                </blockquote>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cycling controls */}
          <div className="flex flex-col items-center gap-6 mt-12 z-20 relative">
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2 select-none">
              {filteredQuotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > quoteIndex ? 1 : -1);
                    setQuoteIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                    idx === quoteIndex 
                      ? "bg-doginal-pink w-4 shadow-[0_0_8px_rgba(255,177,221,0.6)]" 
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next cycle button */}
            {filteredQuotes.length > 1 && (
              <motion.button
                onClick={handleNextQuote}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 px-6 py-3 bg-white/[0.03] border border-white/10 hover:border-doginal-pink/40 hover:bg-white/[0.07] text-white/70 hover:text-white rounded-full text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-doginal-pink/40"
              >
                <span>Next Transmission</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-doginal-pink font-bold"
                >
                  →
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
