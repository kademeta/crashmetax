"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 p-4 rounded-full bg-obsidian-800 border border-white/10 text-white/50 z-50 hover:text-white hover:bg-obsidian-700 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,177,221,0.3)] focus:outline-none focus:ring-2 focus:ring-doginal-pink transition-all duration-300 backdrop-blur-md",
        isVisible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
