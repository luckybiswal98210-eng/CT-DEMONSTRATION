import { motion, useInView } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { EASE } from "../primitives";
import { HeroCore3D } from "../HeroCore3D";

function MaskedLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const BADGES = [
  { k: "99.999999999%", v: "durability by design" },
  { k: "18", v: "chapters" },
  { k: "7–8 min", v: "scroll-through" },
];

export function Hero({ onExplore }: { onExplore: () => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { margin: "100px" });

  return (
    <section ref={heroRef} id="hero" className="hero-glow relative flex min-h-screen items-center overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0" />
      
      {/* 3D Core Vault WebGL Model: Real-time 360 Interactive OrbitControls Scene */}
      <div 
        className="absolute inset-y-0 right-0 hidden md:flex items-center justify-center z-20 pointer-events-auto"
        style={{ width: "52%", minWidth: "460px" }}
      >
        <div 
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: "600px", maxWidth: "660px" }}
        >
          <HeroCore3D />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] bg-gradient-to-r from-ink via-transparent to-transparent lg:block z-10" />

      {/* LEFT COLUMN: Headings & Presented By Badge (Pointer-events-none on backdrop, pointer-events-auto on content) */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-28 pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-aws" />
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-aws">
              Technical Case Study
            </span>
          </motion.div>

          <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.25}>Cloud Storage</MaskedLine>
            <MaskedLine delay={0.4}>
              using <span className="text-aws">Amazon S3</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-6 text-base text-slate-300 md:text-lg"
          >
            Designing a secure and scalable storage layer for a{" "}
            <span className="text-slate-100">College Management System</span> — from local hard
            drives to cloud-native object storage.
          </motion.p>

          {/* Presented by Lucky Biswal: Aligned left under the text with highlighted yellow dot and generous spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="mt-8 flex justify-start"
          >
            <div className="flex items-center gap-5 rounded-2xl border-2 border-yellow-400/60 card-opaque px-6 py-3.5 shadow-[0_0_35px_rgba(250,204,21,0.35)]">
              {/* Highlighted Glowing Yellow Blinking Point (blinks every 3 to 4 seconds) */}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400/25 border border-yellow-400 shadow-[0_0_18px_#FACC15]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-60" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#FACC15] animate-blink-slow-yellow shadow-[0_0_15px_#FACC15]" />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  Presented by
                </span>
                <span className="font-heading text-lg font-bold tracking-wide text-white">
                  Lucky Biswal
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-slate-500" />
      </motion.div>
    </section>
  );
}
