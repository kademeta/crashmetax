"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
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
    <div className="relative group perspective-[1200px] w-full max-w-[340px] mx-auto z-10 hover:z-50">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full rounded-2xl obsidian-glass transition-shadow duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-6 bg-[#1E2937] flex flex-col justify-between shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] ${
          item.id === "doge-crash" 
            ? "border-2 border-doginal-teal/65 shadow-[0_0_25px_rgba(34,245,255,0.22)]" 
            : "border border-white/10"
        }`}
      >
        <div style={{ transform: "translateZ(1px)" }}>
          <div className={`w-full rounded-xl bg-obsidian-900 border-2 relative overflow-hidden flex items-center justify-center shadow-[inset_0_8px_20px_rgba(0,0,0,0.8)] ${
            isDoginal ? "aspect-square" : "aspect-[2.5/3.5]"
          } border-black/40`}>
             <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>

             {item.image === "/placeholder-card.png" ? (
               <span className="text-8xl relative z-10 pixelated drop-shadow-2xl">🃏</span>
             ) : (
               <img 
                 src={item.image} 
                 alt={item.title} 
                 loading="lazy" 
                 className={`relative z-10 w-full h-full pixelated drop-shadow-2xl ${
                   isDoginal ? "object-cover" : "object-fill"
                 }`} 
               />
             )}
          </div>

          <div className="pt-6">
            {!isDoginal && (
              <p className="text-[10px] font-sans font-bold tracking-[0.2em] text-white/40 uppercase mb-2">{item.subtitle}</p>
            )}
            <p className={
              isDoginal
                ? "font-sans font-semibold text-[13px] md:text-[14px] text-white/85 tracking-wider uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                : "font-sans font-medium text-xl text-white/90 leading-tight tracking-tight"
            }>
              {item.title}
            </p>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,1) 25%, transparent 30%)",
            backgroundSize: "200% 200%",
            backgroundPositionX: glareX,
            backgroundPositionY: glareY,
            transform: "translateZ(2px)",
          }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[110%] text-center pointer-events-none"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="inline-block bg-obsidian-900/90 backdrop-blur-md text-white/80 px-5 py-3 rounded-xl text-sm font-sans font-light border border-white/10 shadow-2xl">
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

  return (
    <section id="vault" className="pt-32 pb-16 bg-transparent relative overflow-hidden">
      
      {/* Deep ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-doginal-teal/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#94a3b8]/50"></span>
            <span className="text-xs font-sans font-medium tracking-[0.3em] text-[#94a3b8] uppercase">The Vault</span>
            <span className="w-12 h-[1px] bg-[#94a3b8]/50"></span>
          </div>
          <h3 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight mb-8">
            The Collector's Vault
          </h3>
          <p className="text-white/60 font-sans text-lg max-w-2xl leading-relaxed mb-12">
            Prized collectibles. These aren't just jpegs or cardboard; they are pieces of history.
          </p>

          {/* Premium Pill Tabs */}
          <div className="relative flex items-center p-1.5 bg-obsidian-800/50 backdrop-blur-md rounded-full border border-white/5 shadow-inner">
            <button 
              onClick={() => setActiveTab("doginals")}
              className={`relative z-10 px-8 py-3 rounded-full text-xs font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none ${activeTab === "doginals" ? "text-obsidian-900" : "text-white/60 hover:text-white"}`}
            >
              {activeTab === "doginals" && (
                <motion.div
                  layoutId="vault-tab"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              Doginal Dogs
            </button>
            <button 
              onClick={() => setActiveTab("pokemon")}
              className={`relative z-10 px-8 py-3 rounded-full text-xs font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none ${activeTab === "pokemon" ? "text-obsidian-900" : "text-white/60 hover:text-white"}`}
            >
              {activeTab === "pokemon" && (
                <motion.div
                  layoutId="vault-tab"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              Pokémon Grails
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="relative pt-10 min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {activeTab === "doginals" && (
              <motion.div 
                key="doginals"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center max-w-7xl mx-auto w-full"
              >
                {/* Doginal Dogs Official Branding Logo Space */}
                <div className="mb-16 select-none flex justify-center w-full">
                  <img 
                    src="https://cdn.prod.website-files.com/691115821a026cc99483f73b/6962cc6d7b44da5cc123f3ae_Doginal%20Dogs%20LOGO%20White.png" 
                    alt="Doginal Dogs Logo" 
                    className="h-32 md:h-40 w-auto object-contain pixelated pointer-events-none -my-8"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                  {doginalsData.map((item) => (
                    <TiltCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "pokemon" && (
              <motion.div 
                key="pokemon"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center max-w-6xl mx-auto w-full"
              >
                {/* Pokémon Official Branding Logo Space */}
                <div className="mb-16 select-none flex justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
                    alt="Pokémon Logo" 
                    className="h-16 md:h-20 w-auto object-contain pointer-events-none filter drop-shadow-[0_8px_24px_rgba(255,214,10,0.18)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-28 md:gap-12 w-full">
                  {pokemonData.map((item) => (
                    <TiltCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
