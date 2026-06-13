import type { Metadata } from "next";
import { Press_Start_2P, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/ui/SkipToContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import { MotionProvider } from "@/components/layout/providers/MotionProvider";

const pixelFont = Press_Start_2P({
  weight: ["400"],
  variable: "--font-pixel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Crash Engine | Crashmetax",
  description: "A premium personal hub for @Crashmetax. God First. Crypto Native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${outfit.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-doginal-teal/30 selection:text-doginal-teal relative">
        {/* Warm tactile noise across everything */}
        <div className="fixed inset-0 bg-noise opacity-40 mix-blend-soft-light pointer-events-none z-[-1]"></div>
        
        <MotionProvider>
          <SkipToContent />
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
