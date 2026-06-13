"use client";

import { motion } from "framer-motion";
import { Mic, Calendar, Clock, Headphones, Play, Radio, ArrowUpRight } from "lucide-react";
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

  return (
    <section id="live" className="pt-16 pb-32 bg-transparent relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-doginal-pink/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#94a3b8]/50"></span>
            <span className="text-xs font-sans font-medium tracking-[0.3em] text-[#94a3b8] uppercase">Broadcast Hub</span>
            <span className="w-12 h-[1px] bg-[#94a3b8]/50"></span>
          </div>
          <h3 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight mb-6">
            Spaces Hub
          </h3>
          <p className="text-white/60 font-sans text-lg max-w-xl leading-relaxed">
            Tune in live or listen to recorded sessions. Pull up a chair and let's talk shop.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT: Main Broadcast Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 bg-obsidian-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-[inset_0_2px_20px_rgba(255,255,255,0.05),0_40px_80px_rgba(0,0,0,0.8)] border-2 border-white/5 flex flex-col justify-between min-h-[480px]">
              
              {/* Pulsing glow background when live */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ 
                    opacity: isLive ? [0.12, 0.25, 0.12] : [0.03, 0.08, 0.03] 
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] ${
                    isLive 
                      ? "bg-[radial-gradient(circle_at_center,rgba(255,177,221,0.25)_0%,transparent_60%)]" 
                      : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]"
                  }`}
                />
              </div>

              {/* Top Row: Live Badge */}
              <div className="relative z-10 self-start">
                <div className="flex items-center space-x-3 bg-black/40 px-5 py-2.5 rounded-full border border-white/5 shadow-inner">
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
              </div>

              {/* Middle Row: Content */}
              <div className="relative z-10 my-8">
                <h4 className="text-3xl md:text-4xl font-sans font-bold text-white mb-5 tracking-tight flex items-center gap-3">
                  <Radio className={`w-8 h-8 ${isLive ? 'text-[#ffb1dd] animate-pulse' : 'text-white/40'}`} />
                  Mobile Command Center
                </h4>
                <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed max-w-xl">
                  Broadcasting live from wherever this chair is parked today. The signal's strong, the Lord is good, and the jokes might be questionable. Tune in before someone takes the mic away.
                </p>
                {!isLive && (
                  <p className="text-white/40 text-sm font-sans italic mt-4">
                    Next live session coming soon — stay tuned!
                  </p>
                )}
              </div>

              {/* Bottom Row: CTA Button */}
              <div className="relative z-10 self-start">
                <a 
                  href="https://x.com/crashmetax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center justify-center px-8 py-4 font-sans font-semibold text-white rounded-full overflow-hidden transition-all duration-500 backdrop-blur-md border ${
                    isLive 
                      ? "bg-[#ffb1dd]/10 border-[#ffb1dd]/30 hover:bg-[#ffb1dd]/20 hover:border-[#ffb1dd]/50 hover:shadow-[0_0_35px_rgba(255,177,221,0.25)]" 
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                  }`}
                  aria-label="Tune in to X Space"
                >
                  <span className="relative z-10 flex items-center space-x-3 text-sm tracking-wider uppercase">
                    <Mic className={`w-4 h-4 ${isLive ? 'text-[#ffb1dd] animate-bounce' : 'text-white/50 group-hover:text-doginal-pink transition-colors duration-300'}`} />
                    <span>Tune In On X</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Upcoming & Recent Area */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Upper: Upcoming Sessions */}
            <div className="bg-obsidian-900/55 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 shadow-xl flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-sans font-bold">
                  <Calendar className="w-3.5 h-3.5 text-doginal-pink" />
                  Upcoming Session
                </div>

                {upcoming.length > 0 ? (
                  upcoming.map((item) => (
                    <div key={item.id} className="mt-4">
                      <h5 className="text-white font-sans font-bold text-lg leading-snug hover:text-doginal-pink transition-colors duration-300">
                        {item.title}
                      </h5>
                      <div className="flex items-center gap-2 text-doginal-teal mt-2 text-sm font-sans font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <p className="text-white/55 text-sm font-sans mt-3 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="mt-6 text-white/45 text-sm font-sans italic">
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
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase text-doginal-teal hover:text-white transition-colors duration-300"
                  >
                    Set Reminder <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Lower: Recent Archive */}
            <div className="bg-obsidian-900/55 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 shadow-xl flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[10px] font-sans font-bold mb-4">
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
                        className="group flex items-center gap-4 p-3 rounded-2xl bg-black/20 hover:bg-white/5 border border-white/0 hover:border-white/5 transition-all duration-300"
                      >
                        {/* Play Button Icon wrapper */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-obsidian-800 border border-white/5 group-hover:border-doginal-teal/30 group-hover:bg-doginal-teal/10 shadow-md transition-all duration-300">
                          <Play className="w-4 h-4 text-white/70 group-hover:text-doginal-teal fill-white/10 group-hover:fill-doginal-teal/20 transition-all duration-300 ml-0.5" />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h6 className="text-white text-sm font-sans font-bold tracking-tight truncate group-hover:text-doginal-teal transition-colors duration-300">
                            {item.title}
                          </h6>
                          <div className="flex items-center gap-2 text-white/40 text-[11px] font-sans mt-0.5">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="text-white/45 text-sm font-sans italic py-4">
                      No recording archives available.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
