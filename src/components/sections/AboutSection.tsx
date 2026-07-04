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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-28 md:py-36 lg:py-40 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        
        {/* ROW 1: Header + Quote & Bio (Left) + Avatar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Title, Quote, and Bio (Span 8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col items-start text-left"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-4 select-none">
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-white/40 uppercase">
                The Journey
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight leading-none mb-10">
              About Crash
            </h2>

            {/* Featured Quote (Elevated size and blockquote pink-line accent) */}
            <div className="pl-6 border-l-2 border-doginal-pink/40 py-2 mb-8">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-white/95 leading-snug tracking-[-0.01em]">
                “From Impact to Insight. Do you want your perspective to be your prison or your passport? 1 life, 2 timelines.”
              </p>
              <div className="mt-4 text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] text-[#ffb1dd]/90 uppercase">
                — CRASH
              </div>
            </div>

            {/* Personal Bio Paragraph (Integrated prominently below the quote) */}
            <p className="text-white/55 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
              I’ve been through my share of crashes, both the kind you see coming and the ones that hit out of nowhere. 
              I’m still here though. I build, I collect, and I show up with faith first and a sense of humor close behind. 
              Most of my time goes into crypto, Doginal Dogs, and digital history because I actually love this space and the people in it.
            </p>
          </motion.div>

          {/* Right Column: Pixel Dog Avatar visual anchor (Span 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center lg:justify-end w-full"
          >
            <div className="relative group w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-obsidian-900 flex items-center justify-center select-none">
              <img
                src="/crash-doginal.png"
                alt="Crash Collector Avatar"
                className="w-full h-full object-cover pixelated group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* Subtle hover backlight */}
              <div className="absolute inset-0 bg-doginal-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[20px] pointer-events-none rounded-[2.5rem]" />
            </div>
          </motion.div>
        </div>

        {/* ROW 2: The Three Pillars Side-by-Side Grid (Staggered load-in) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full"
        >
          
          {/* God First (Pink Hover Theme) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="obsidian-card border border-white/5 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:border-doginal-pink/40 hover:bg-[#1E2937]/50 hover:shadow-[0_12px_30px_rgba(255,177,221,0.1)] group focus-within:ring-2 focus-within:ring-doginal-pink/30"
          >
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 text-[#ffb1dd] group-hover:bg-[#ffb1dd]/10 group-hover:border-doginal-pink/30 transition-all duration-500 shrink-0 mb-6">
                <CrossIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">God First</h3>
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                Everything starts here. For me, faith isn’t a checklist or a bio keyword—it’s the actual foundation of how I live, build, and navigate the noise. It’s what keeps me grounded when things get chaotic.
              </p>
            </div>
          </motion.div>

          {/* Culture & Antiquity (Teal Hover Theme) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="obsidian-card border border-white/5 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:border-doginal-teal/40 hover:bg-[#1E2937]/50 hover:shadow-[0_12px_30px_rgba(34,245,255,0.1)] group focus-within:ring-2 focus-within:ring-doginal-teal/30"
          >
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 text-doginal-teal group-hover:bg-doginal-teal/10 group-hover:border-doginal-teal/30 transition-all duration-500 shrink-0 mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">Culture & Antiquity</h3>
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                I’ve always had a deep respect for things that last. From rare digital history to real-world antiquity, I believe we are building tomorrow’s culture today. For me, it’s about protecting the story and keeping the good parts of history alive.
              </p>
            </div>
          </motion.div>

          {/* Showing Up (Teal Hover Theme with Gold Sparkles Icon) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            className="obsidian-card border border-white/5 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:border-doginal-teal/40 hover:bg-[#1E2937]/50 hover:shadow-[0_12px_30px_rgba(34,245,255,0.1)] group focus-within:ring-2 focus-within:ring-doginal-teal/30"
          >
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 text-[#FFD60A] group-hover:bg-[#FFD60A]/10 group-hover:border-[#FFD60A]/30 transition-all duration-500 shrink-0 mb-6">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">Showing Up</h3>
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                You don’t always get perfect conditions. I’ve learned that showing up anyway is what actually matters. Whether things are going great or you’re rolling through a setback, you keep building, keep creating, and keep showing up for the people around you.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
