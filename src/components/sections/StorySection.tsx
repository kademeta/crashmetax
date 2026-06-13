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
    text: "You’re lucky I’m in a chair ♿️ I would of taken the ‘six pack challenge’ 😆",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q4",
    text: "People tell me I'm an inspiration. I just tell them I have good upper body strength and a decent WiFi connection.",
    author: "Crash",
    type: "unfiltered"
  },
  {
    id: "q5",
    text: "I have two modes: praising God and complaining about gas fees.",
    author: "Crash",
    type: "unfiltered"
  }
];

export default function StorySection() {
  const [mode, setMode] = useState<"wisdom" | "unfiltered">("wisdom");

  const filteredQuotes = quotes.filter((q) => q.type === mode);

  return (
    <section id="wisdom" className="relative py-40 bg-[#09090B] overflow-hidden">
      
      {/* Subtle Atmospheric Background Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Wisdom background: Upright truck */}
        <motion.div
          initial={{ opacity: 0.22 }}
          animate={{
            opacity: mode === "wisdom" ? 0.22 : 0,
            scale: mode === "wisdom" ? 1.03 : 1.0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/kademeta_Sin_City_style_Frank_Miller_graphic_novel_aesthetic_hi_7b73b2cc-8426-4c04-9b42-cbbd2f957fde.PNG')",
            filter: "blur(6px) brightness(0.95)",
          }}
        />

        {/* Unfiltered background: Wrecked car (zxKrA.png) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: mode === "unfiltered" ? 0.20 : 0,
            scale: mode === "unfiltered" ? 1.03 : 1.0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/zxKrA.png')",
            filter: "blur(4px) brightness(0.95)",
          }}
        />

        {/* Blue Tint Color Blend Layer */}
        <div className="absolute inset-0 bg-[#22F5FF]/10 mix-blend-color z-10" />

        {/* Strong Vignette and Gradients to Protect Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B] z-10" />
        <div 
          className="absolute inset-0 z-10" 
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(9, 9, 11, 0.1) 0%, rgba(9, 9, 11, 0.75) 70%, #09090B 100%)"
          }}
        />
      </div>

      {/* Ambient cool background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-doginal-teal/[0.04] blur-[120px] rounded-full pointer-events-none z-10"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header & Toggle */}
        <div className="flex flex-col items-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-sans font-semibold text-white mb-8 tracking-tight text-center"
          >
            Wreckage to Wisdom
          </motion.h2>

          {/* Premium Pill Toggle */}
          <div className="flex justify-center mb-10">
            <div className="relative flex items-center p-1 bg-zinc-900 rounded-full border border-white/5 shadow-inner text-sm">
              <div aria-live="polite" className="sr-only">
                {`Currently showing ${mode} quotes.`}
              </div>

              <button
                onClick={() => setMode("wisdom")}
                aria-pressed={mode === "wisdom"}
                className={cn(
                  "relative z-10 px-8 py-3 rounded-full font-sans font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus:outline-none cursor-pointer",
                  mode === "wisdom" ? "text-zinc-900" : "text-white/60 hover:text-white"
                )}
              >
                {mode === "wisdom" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                Wisdom
              </button>
              <button
                onClick={() => setMode("unfiltered")}
                aria-pressed={mode === "unfiltered"}
                className={cn(
                  "relative z-10 px-8 py-3 rounded-full font-sans font-medium tracking-[0.1em] uppercase transition-colors duration-300 focus:outline-none cursor-pointer",
                  mode === "unfiltered" ? "text-zinc-900" : "text-white/60 hover:text-white"
                )}
              >
                {mode === "unfiltered" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                Unfiltered
              </button>
            </div>
          </div>
        </div>

        {/* Quotes Area - Premium Typography */}
        <div className="max-w-4xl mx-auto min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-24 md:space-y-32"
            >
              {filteredQuotes.map((quote) => (
                <blockquote key={quote.id} className="max-w-3xl mx-auto text-center py-12 first:pt-0 last:pb-0">
                  <p className="text-4xl md:text-5xl font-serif font-medium leading-relaxed tracking-tight text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    "{quote.text}"
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-3 text-xs font-sans font-semibold tracking-[0.2em] text-[#ffb1dd]/90 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    <span className="w-6 h-[1px] bg-[#ffb1dd]/30"></span>
                    <span>{quote.author}</span>
                    <span className="w-6 h-[1px] bg-[#ffb1dd]/30"></span>
                  </div>
                </blockquote>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
