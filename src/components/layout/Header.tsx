"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          
          // Force highlight last section "Live" when scrolled to the very bottom
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
            setActiveSection("live");
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy active section detection
  useEffect(() => {
    const sections = ["hero", "about", "wisdom", "vault", "live"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger active link when section occupies center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Wisdom", href: "#wisdom" },
    { name: "Vault", href: "#vault" },
    { name: "Live", href: "#live" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-500 border-b",
          isScrolled
            ? "bg-obsidian-900/90 backdrop-blur-2xl border-white/5 shadow-2xl py-4"
            : "bg-transparent border-transparent py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#hero"
            className="text-2xl font-sans tracking-tight text-white flex items-center gap-3 group"
            aria-label="Crashmetax Home"
          >
            <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-[#18181B] shadow-lg">
              <img src="/crash-doginal.png" alt="Crash" className="w-full h-full object-cover pixelated group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex items-center">
              <span className="font-bold">Crash</span>
              <span className="font-normal text-white/70">metax</span>
            </div>
          </a>
          
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
              {navLinks.map((link) => {
                const isLinkActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      className={cn(
                        "relative z-10 px-5 py-2 rounded-full text-sm font-medium font-sans transition-colors duration-300 block",
                        isLinkActive ? "text-white" : "text-white/60 hover:text-white"
                      )}
                    >
                      {link.name}
                    </a>
                    {isLinkActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{ originY: "0px" }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Hamburger Menu Toggle Button (Touch target 44px min) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block md:hidden p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-doginal-pink/55 relative z-50 w-11 h-11 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Mobile Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer (Accessible overlay & slide) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-45 md:hidden"
            />
            
            {/* Sidebar drawer container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-obsidian-950 border-l border-white/5 shadow-2xl p-8 pt-24 z-45 md:hidden flex flex-col justify-between"
            >
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => {
                  const isLinkActive = activeSection === link.href.slice(1);
                  return (
                    <motion.li 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.08, duration: 0.35, ease: "easeOut" }}
                      key={link.name}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-5 py-3 rounded-xl text-sm font-bold font-sans tracking-widest uppercase transition-colors duration-300",
                          isLinkActive 
                            ? "text-doginal-pink bg-white/[0.04] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]" 
                            : "text-white/60 hover:text-white hover:bg-white/[0.01]"
                        )}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              
              <div className="text-[10px] text-white/20 font-sans tracking-[0.15em] uppercase select-none">
                © {new Date().getFullYear()} Crashmetax.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
