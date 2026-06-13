"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

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
      </div>
    </motion.header>
  );
}
