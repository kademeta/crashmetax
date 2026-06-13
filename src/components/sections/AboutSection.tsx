"use client";

import { motion, Variants } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

function CrossIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20M8 8h8" />
    </svg>
  );
}

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="about" className="py-20 md:py-28 lg:py-36 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start max-w-6xl mx-auto"
        >
          {/* LEFT COLUMN - Sticky on desktop, static flow on mobile/tablet */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-start text-left w-full lg:sticky lg:top-32"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-white/30" />
              <span className="text-xs font-sans font-semibold tracking-[0.3em] text-white/50 uppercase">
                The Journey
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-sans font-bold text-white tracking-tight leading-none mb-8">
              About Crash
            </h2>

            {/* Avatar */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-[2.25rem] overflow-hidden border border-white/10 shadow-2xl bg-obsidian-900 flex items-center justify-center mb-8 md:mb-10">
              <img
                src="/crash-doginal.png"
                alt="Crash Avatar"
                className="w-full h-full object-cover pixelated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Featured Quote */}
            <div className="w-full border-y border-white/10 py-8 md:py-10 mb-8">
              <p className="text-[21px] md:text-3xl font-serif font-medium text-white leading-tight tracking-[-0.01em]">
                “From Impact to Insight. Do you want your perspective to be your prison or your passport? 1 life, 2 timelines.”
              </p>
              <div className="mt-4 text-xs font-sans font-bold tracking-[0.2em] text-[#ffb1dd]/90">
                — CRASH
              </div>
            </div>

            {/* Intro Paragraph */}
            <p className="text-white/40 font-sans text-sm md:text-[15px] leading-relaxed max-w-md">
              I’ve been through my share of crashes, both the kind you see coming and the ones that hit out of nowhere. 
              I’m still here though. I build, I collect, and I show up with faith first and a sense of humor close behind. 
              Most of my time goes into crypto, Doginal Dogs, and digital history because I actually love this space and the people in it.
            </p>
          </motion.div>

          {/* RIGHT COLUMN: Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* God First */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="backdrop-blur-md bg-[#1E2937]/50 border border-white/10 rounded-3xl p-7 md:p-8 flex items-start gap-5 transition-all duration-300 hover:border-white/20 hover:bg-[#1E2937]/70"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-[#ffb1dd] shrink-0">
                <CrossIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-sans font-bold text-white tracking-tight">God First</h3>
                <p className="text-white/55 text-sm mt-2.5 leading-relaxed">
                  Everything starts here. For me, faith isn’t a checklist or a bio keyword—it’s the actual foundation of how I live, build, and navigate the noise. It’s what keeps me grounded when things get chaotic.
                </p>
              </div>
            </motion.div>

            {/* Culture & Antiquity */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="backdrop-blur-md bg-[#1E2937]/50 border border-white/10 rounded-3xl p-7 md:p-8 flex items-start gap-5 transition-all duration-300 hover:border-white/20 hover:bg-[#1E2937]/70"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-doginal-teal shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-sans font-bold text-white tracking-tight">Culture & Antiquity</h3>
                <p className="text-white/55 text-sm mt-2.5 leading-relaxed">
                  I’ve always had a deep respect for things that last. From rare digital history to real-world antiquity, I believe we are building tomorrow’s culture today. For me, it’s about protecting the story and keeping the good parts of history alive.
                </p>
              </div>
            </motion.div>

            {/* Showing Up */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="backdrop-blur-md bg-[#1E2937]/50 border border-white/10 rounded-3xl p-7 md:p-8 flex items-start gap-5 transition-all duration-300 hover:border-white/20 hover:bg-[#1E2937]/70"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 text-[#ffe154] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-sans font-bold text-white tracking-tight">Showing Up</h3>
                <p className="text-white/55 text-sm mt-2.5 leading-relaxed">
                  You don’t always get perfect conditions. I’ve learned that showing up anyway is what actually matters. Whether things are going great or you’re rolling through a setback, you keep building, keep creating, and keep showing up for the people around you.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
