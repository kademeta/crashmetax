"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

// --- Base Interface ---
interface CollectibleItem {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  glowColor: string;
  image: string;
}

// --- Doginals Data ---
const doginalsData: CollectibleItem[] = [
  { id: "doge-crash", title: "Doginal Dog #8410", subtitle: "Crash PFP", caption: "The face of the metax.", image: "/crash-doginal.png", glowColor: "from-cyan-400/20 to-blue-500/20" },
  { id: "doge-1", title: "Doginal Dog #2860", subtitle: "Doge 001", caption: "The beginning of the journey.", image: "/doge-1.png", glowColor: "from-pink-400/20 to-rose-500/20" },
  { id: "doge-2", title: "Doginal Dog #6038", subtitle: "Doge 042", caption: "A rare find.", image: "/doge-2.png", glowColor: "from-cyan-400/20 to-teal-500/20" },
  { id: "doge-3", title: "Doginal Dog #93", subtitle: "Doge 069", caption: "Nice.", image: "/doge-3.png", glowColor: "from-yellow-400/20 to-amber-500/20" },
  { id: "doge-4", title: "Doginal Dog #101", subtitle: "Doge 101", caption: "Classic edition.", image: "/doge-4.png", glowColor: "from-white/20 to-gray-500/20" },
];

// --- Pokemon Data ---
const pokemonData: CollectibleItem[] = [
  {
    id: "poke-1",
    title: "Base Set Charizard",
    subtitle: "1st Ed Shadowless",
    caption: "The holy grail of Pokémon. 1st Edition Shadowless Charizard.",
    glowColor: "from-orange-500/25 to-red-600/25",
    image: "https://images.pokemontcg.io/base1/4_hires.png"
  },
  {
    id: "poke-2",
    title: "Shining Mewtwo",
    subtitle: "Secret Rare",
    caption: "The legendary shining psychic star from 2002 Neo Destiny.",
    glowColor: "from-purple-500/25 to-fuchsia-600/25",
    image: "https://images.pokemontcg.io/neo4/109_hires.png"
  },
  {
    id: "poke-3",
    title: "Lugia 1st Ed",
    subtitle: "Neo Genesis Holo",
    caption: "The absolute pinnacle of the Neo era. 1st Edition Lugia Holo.",
    glowColor: "from-blue-400/25 to-cyan-400/25",
    image: "https://images.pokemontcg.io/neo1/9_hires.png"
  }
];

// --- Tilt Card Component ---
function TiltCard({ item }: { item: CollectibleItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDoginal = item.id.startsWith("doge");
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group perspective-[1200px] w-full max-w-[340px] mx-auto z-10 hover:z-50 py-4 select-none">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.025, y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className={`relative w-full rounded-3xl obsidian-card transition-all duration-500 flex flex-col justify-between shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] p-6 bg-[#1E2937]/35 border ${
          item.id === "doge-crash" 
            ? "border border-doginal-teal/50 shadow-[0_0_20px_rgba(34,245,255,0.1)] hover:border-doginal-teal/70 hover:shadow-[0_0_30px_rgba(34,245,255,0.22)]" 
            : "border border-white/5 hover:border-doginal-pink/55 hover:shadow-[0_12px_25px_rgba(255,177,221,0.12)]"
        }`}
      >
        {/* Subtle metallic edge highlight overlay */}
        <div className="absolute inset-[1px] rounded-3xl border border-white/5 pointer-events-none z-20"></div>

        <div style={{ transform: "translateZ(1px)" }}>
          <div className={`w-full rounded-2xl bg-obsidian-900 border-2 relative overflow-hidden flex items-center justify-center shadow-[inset_0_8px_20px_rgba(0,0,0,0.8)] ${
            isDoginal ? "aspect-square" : "aspect-[2.5/3.5]"
          } border-black/40`}>
             <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>

             {item.image === "/placeholder-card.png" ? (
               <span className="text-6xl relative z-10 pixelated drop-shadow-2xl select-none">🃏</span>
             ) : (
               <div className="relative w-full h-full">
                 <Image 
                   src={item.image} 
                   alt={item.title} 
                   fill
                   sizes="(max-width: 768px) 250px, 300px"
                   priority={item.id === "doge-crash"}
                   className={`relative z-10 pixelated drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 ${
                     isDoginal ? "object-cover" : "object-fill"
                   }`} 
                 />
               </div>
             )}
          </div>

          <div className="pt-5">
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-doginal-pink/80 uppercase mb-1.5">
              {item.subtitle}
            </p>
            <p className="font-sans font-bold text-base md:text-lg text-white/90 tracking-tight leading-tight">
              {item.title}
            </p>
          </div>
        </div>

        {/* Action Link: View details / inscription */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4 z-20 relative">
          <a 
            href={isDoginal ? SITE_CONFIG.links.doginalDogs : `${SITE_CONFIG.links.pokemonTcg}?q=${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-white/50 hover:text-doginal-pink transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-doginal-pink/40"
          >
            <span>{isDoginal ? "View Inscription" : "View Details"}</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover/link:text-doginal-pink group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>

        {/* Dynamic mouse interactive glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,1) 25%, transparent 30%)",
            backgroundSize: "200% 200%",
            backgroundPositionX: glareX,
            backgroundPositionY: glareY,
            transform: "translateZ(2px)",
          }}
        />

        {/* Caption text popup */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[110%] text-center pointer-events-none hidden md:block"
          style={{ transform: "translateZ(40px)", willChange: "transform, opacity" }}
        >
          <div className="inline-block bg-obsidian-900/95 backdrop-blur-md text-white/90 px-4 py-2.5 rounded-xl text-xs font-sans font-medium border border-white/10 shadow-2xl">
            "{item.caption}"
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- Main Section ---
export default function CollectionSection() {
  const [activeTab, setActiveTab] = useState<"doginals" | "pokemon">("doginals");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile 
        ? { duration: 0 } 
        : {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          },
    },
  };

  return (
    <section id="vault" className="py-28 md:py-36 lg:py-40 bg-transparent relative overflow-hidden">
      
      {/* Deep ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-0 bg-noise" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6 select-none">
            <span className="w-12 h-[1px] bg-white/20"></span>
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-white/40 uppercase">The Vault</span>
            <span className="w-12 h-[1px] bg-white/20"></span>
          </div>
          <h3 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-8">
            The Collector's Vault
          </h3>
          <p className="text-white/55 font-sans text-sm md:text-base max-w-2xl leading-relaxed mb-12">
            Prized collectibles. These aren't just jpegs or cardboard; they are pieces of history.
          </p>

          {/* Unified sliding toggle slider */}
          <div className="relative flex items-center p-1 bg-white/[0.02] backdrop-blur-lg rounded-full border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.05)] text-sm w-80 select-none">
            
            {/* Active slider background */}
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
              animate={{
                left: activeTab === "doginals" ? 4 : 160,
                right: activeTab === "doginals" ? 160 : 4,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />

            <button
              onClick={() => setActiveTab("doginals")}
              className={cn(
                "relative z-10 w-40 py-2.5 rounded-full font-sans font-bold tracking-[0.08em] uppercase text-[10px] transition-colors duration-500 focus:outline-none cursor-pointer text-center",
                activeTab === "doginals" ? "text-zinc-950" : "text-white/45 hover:text-white/85"
              )}
            >
              Doginal Dogs
            </button>
            <button
              onClick={() => setActiveTab("pokemon")}
              className={cn(
                "relative z-10 w-40 py-2.5 rounded-full font-sans font-bold tracking-[0.08em] uppercase text-[10px] transition-colors duration-500 focus:outline-none cursor-pointer text-center",
                activeTab === "pokemon" ? "text-zinc-950" : "text-white/45 hover:text-white/85"
              )}
            >
              Pokémon Grails
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {activeTab === "doginals" && (
              <motion.div 
                key="doginals"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-7xl mx-auto w-full"
              >
                {/* Brand Identifier (Replacing large logo space) */}
                <div className="w-full flex justify-start mb-6 px-4 md:px-0">
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#ffb1dd] uppercase bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full select-none">
                    DOGINAL DOGS COLLECTION
                  </span>
                </div>

                {/* Mobile Snap Carousel / Desktop Responsive Grid */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-12 w-full px-4 -mx-4 sm:px-0 sm:mx-0 scroll-smooth"
                >
                  {doginalsData.map((item) => (
                    <motion.div 
                      key={item.id} 
                      variants={itemVariants}
                      className="snap-center shrink-0 w-[275px] sm:w-auto"
                    >
                      <TiltCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === "pokemon" && (
              <motion.div 
                key="pokemon"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-6xl mx-auto w-full"
              >
                {/* Brand Identifier (Replacing large logo space) */}
                <div className="w-full flex justify-start mb-6 px-4 md:px-0">
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#ffb1dd] uppercase bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full select-none">
                    POKÉMON GRAILS COLLECTION
                  </span>
                </div>

                {/* Mobile Snap Carousel / Desktop Responsive Grid */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-12 w-full px-4 -mx-4 sm:px-0 sm:mx-0 scroll-smooth"
                >
                  {pokemonData.map((item) => (
                    <motion.div 
                      key={item.id} 
                      variants={itemVariants}
                      className="snap-center shrink-0 w-[285px] sm:w-auto"
                    >
                      <TiltCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
