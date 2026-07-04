"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Mic, Calendar, Clock, Headphones, Play, Radio, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import statusData from "../../../status.json";

interface UpcomingSpace {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface RecentSpace {
  id: string;
  title: string;
  date: string;
  duration: string;
  link: string;
}

export default function SpacesHubSection() {
  const { isLive, upcoming, recent } = statusData as {
    isLive: boolean;
    upcoming: UpcomingSpace[];
    recent: RecentSpace[];
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  // Viewport observer to pause waveform animations when out of sight
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [isMainClickAnimating, setIsMainClickAnimating] = useState(false);
  const [isBroadcastClickAnimating, setIsBroadcastClickAnimating] = useState(false);

  const handleMainCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isMainClickAnimating) return;
    setIsMainClickAnimating(true);
    setTimeout(() => {
      setIsMainClickAnimating(false);
      window.open(SITE_CONFIG.links.xProfile, "_blank");
    }, 600);
  };

  const handleBroadcastCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isBroadcastClickAnimating) return;
    setIsBroadcastClickAnimating(true);
    setTimeout(() => {
      setIsBroadcastClickAnimating(false);
      window.open(SITE_CONFIG.links.xProfile, "_blank");
    }, 600);
  };

  // Scroll entry animation variants
  const rightContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
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
    <section ref={sectionRef} id="live" className="py-28 md:py-36 lg:py-40 bg-transparent relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-0 bg-noise" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6 select-none">
            <span className="w-12 h-[1px] bg-white/20"></span>
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-white/40 uppercase">Broadcast Hub</span>
            <span className="w-12 h-[1px] bg-white/20"></span>
          </div>
          <h3 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-6">
            Spaces Hub
          </h3>
          <p className="text-white/55 font-sans text-sm md:text-base max-w-xl leading-relaxed">
            Connect to the frequency. Tune in live or explore the archive of past broadcasts.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT: Main Broadcast Card (Mobile Command Center) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            style={{ willChange: "transform" }}
            className="lg:col-span-7 flex flex-col group/live"
          >
            <div className="flex-1 obsidian-card rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-[inset_0_2px_20px_rgba(255,255,255,0.03),0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 group-hover/live:border-doginal-pink/35 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,177,221,0.12)] flex flex-col justify-between min-h-[480px]">
              
              {/* Pulsing glow background when live */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ 
                    opacity: isLive ? [0.12, 0.25, 0.12] : [0.03, 0.08, 0.03] 
                  }}
                  style={{ willChange: "opacity" }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] ${
                    isLive 
                      ? "bg-[radial-gradient(circle_at_center,rgba(255,177,221,0.25)_0%,transparent_60%)]" 
                      : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]"
                  }`}
                />
              </div>

              {/* Top Row: Live Badge + Viewport Aware Waveform */}
              <div className="relative z-10 self-start flex items-center gap-3">
                <div className="flex items-center space-x-3 bg-black/40 px-5 py-2.5 rounded-full border border-white/5 shadow-inner select-none">
                  <div className="relative flex h-2.5 w-2.5">
                    {isLive && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]' : 'bg-white/30'}`}></span>
                  </div>
                  <span className={`text-[10px] font-sans font-bold tracking-[0.25em] uppercase ${isLive ? 'text-white' : 'text-white/55'}`}>
                    {isLive ? 'ON AIR' : 'OFFLINE'}
                  </span>
                </div>

                {/* Animated Waveform (Only pulses when section is in viewport) */}
                {isLive && (
                  <div 
                    className="flex items-end gap-[3px] h-3.5 px-2 select-none animate-[fade-in_0.5s_ease-out]"
                    aria-hidden="true"
                  >
                    <span className={`w-[2px] bg-red-500 rounded-full h-full origin-bottom ${isInView ? 'animate-wave-1' : 'scale-y-[0.2]'}`} />
                    <span className={`w-[2px] bg-red-500 rounded-full h-full origin-bottom ${isInView ? 'animate-wave-2' : 'scale-y-[0.2]'}`} />
                    <span className={`w-[2px] bg-red-500 rounded-full h-full origin-bottom ${isInView ? 'animate-wave-3' : 'scale-y-[0.2]'}`} />
                    <span className={`w-[2px] bg-red-500 rounded-full h-full origin-bottom ${isInView ? 'animate-wave-4' : 'scale-y-[0.2]'}`} />
                  </div>
                )}
              </div>

              {/* Middle Row: Content */}
              <div className="relative z-10 my-8">
                <h4 className="text-3xl md:text-4xl font-sans font-bold text-white mb-5 tracking-tight flex items-center gap-3">
                  <Radio className={`w-8 h-8 ${isLive ? 'text-doginal-pink animate-pulse' : 'text-white/45'}`} />
                  Mobile Command Center
                </h4>
                <p className="text-white/55 font-sans text-sm md:text-base leading-relaxed max-w-xl">
                  Broadcasting live from wherever this chair is parked today. The signal's strong, the Lord is good, and the jokes might be questionable. Tune in before someone takes the mic away.
                </p>
                {!isLive && (
                  <p className="text-[#ffb1dd]/85 text-xs font-sans italic mt-4 tracking-wider uppercase font-semibold">
                    Next live session coming soon — stay tuned!
                  </p>
                )}
              </div>

              {/* Bottom Row: CTA Button */}
              <div className="relative z-10 self-start">
                <a 
                  href={SITE_CONFIG.links.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMainCtaClick}
                  className={`group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-xs md:text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 border backdrop-blur-md active:scale-95 shadow-md hover:scale-[1.03] ${
                    isLive 
                      ? "bg-gradient-to-r from-doginal-pink to-[#ff8ac5] text-obsidian-900 border-doginal-pink/40 hover:shadow-[0_8px_30px_rgba(255,177,221,0.45)]" 
                      : "bg-white/[0.04] text-white border-white/10 hover:bg-white/[0.08] hover:border-doginal-pink/30 hover:shadow-[0_8px_25px_rgba(255,177,221,0.1)]"
                  }`}
                  aria-label="Tune in to X Space"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-glare"></span>
                  
                  {isMainClickAnimating && (
                    <>
                      <span className={`absolute inset-0 rounded-full border-2 animate-ping pointer-events-none z-0 ${isLive ? 'border-doginal-pink' : 'border-white'}`}></span>
                      <span className={`absolute -inset-6 rounded-full border animate-[ping_0.8s_ease-out_infinite] pointer-events-none z-0 ${isLive ? 'border-doginal-pink/50' : 'border-white/30'}`}></span>
                    </>
                  )}

                  <span className="relative z-10 flex items-center space-x-3 text-xs md:text-sm tracking-widest">
                    <Mic className={`w-4 h-4 ${isLive ? 'text-obsidian-900 animate-bounce' : 'text-white/50 group-hover:text-doginal-pink transition-colors duration-300'}`} />
                    <span>Tune In On X</span>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Upcoming & Recent Area */}
          <motion.div 
            variants={rightContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            
            {/* Upper: Upcoming Sessions */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform" }}
              className="obsidian-card rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col justify-between flex-1 min-h-[220px] transition-all duration-500 hover:border-doginal-teal/40 hover:bg-obsidian-900/70 hover:shadow-[0_12px_30px_rgba(34,245,255,0.08)] group/upcoming"
            >
              <div>
                <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-sans font-bold select-none">
                  <Calendar className="w-3.5 h-3.5 text-doginal-pink" />
                  Upcoming Session
                </div>

                {upcoming.length > 0 ? (
                  upcoming.map((item) => (
                    <div key={item.id} className="mt-4">
                      <h5 className="text-white font-sans font-bold text-lg leading-snug group-hover/upcoming:text-doginal-teal transition-colors duration-300">
                        {item.title}
                      </h5>
                      <div className="flex items-center gap-2 text-doginal-teal mt-2 text-sm font-sans font-medium select-none">
                        <Clock className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <p className="text-white/50 text-sm font-sans mt-3 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="mt-6 text-white/40 text-sm font-sans italic select-none">
                    No upcoming sessions scheduled. Check back soon or follow on X for updates!
                  </div>
                )}
              </div>

              {upcoming.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/5">
                  <a 
                    href={upcoming[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-doginal-teal hover:text-white transition-colors duration-300 focus-visible:outline-none"
                  >
                    <span>Set Reminder</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              )}
            </motion.div>

            {/* Lower: Recent Archive (Sleek Glassmorphic Cards) */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ willChange: "transform" }}
              className="obsidian-card rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col justify-between flex-1 min-h-[220px] transition-all duration-500 hover:border-doginal-teal/20 hover:bg-obsidian-900/70"
            >
              <div>
                <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-sans font-bold mb-4 select-none">
                  <Headphones className="w-3.5 h-3.5 text-doginal-teal" />
                  Recent Broadcasts
                </div>

                <div className="flex flex-col gap-4">
                  {recent.length > 0 ? (
                    recent.map((item) => (
                      <a 
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ willChange: "transform" }}
                        className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-doginal-teal/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-doginal-teal/30 hover:scale-[1.01]"
                      >
                        {/* Play Button Icon wrapper */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-obsidian-800 border border-white/5 group-hover/item:border-doginal-teal/30 group-hover/item:bg-doginal-teal/10 shadow-md transition-all duration-300 shrink-0">
                          <Play className="w-3.5 h-3.5 text-white/70 group-hover/item:text-doginal-teal fill-white/10 group-hover/item:fill-doginal-teal/20 transition-all duration-300 ml-0.5" />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h6 className="text-white text-sm font-sans font-bold tracking-tight truncate group-hover/item:text-doginal-teal transition-colors duration-300">
                            {item.title}
                          </h6>
                          <div className="flex items-center gap-2 text-white/40 text-[11px] font-sans mt-0.5 select-none">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] uppercase font-bold tracking-wider">{item.duration}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="text-white/40 text-sm font-sans italic py-4 select-none">
                      No recording archives available.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
