import { motion, useScroll, useSpring } from "framer-motion";
import { Cloud, FileDown, Maximize, Minimize, Presentation } from "lucide-react";
import { useEffect, useState } from "react";
import type { SectionDef } from "./sections";
import { cn } from "@/lib/utils";

export function Chrome({
  sections,
  active,
  presentation,
  onTogglePresentation,
  onJump,
}: {
  sections: SectionDef[];
  active: string;
  presentation: boolean;
  onTogglePresentation: () => void;
  onJump: (id: string) => void;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const [fullscreen, setFullscreen] = useState(false);
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active));

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen?.();
      setFullscreen(true);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        data-testid="scroll-progress-bar"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-aws via-amber-400 to-pulse"
        style={{ scaleX }}
      />


      {!presentation && (
        <nav
          data-testid="floating-section-nav"
          className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex"
        >
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                data-testid={`nav-dot-${s.id}`}
                onClick={() => onJump(s.id)}
                className="group flex items-center justify-end gap-2.5"
              >
                <span
                  className={cn(
                    "rounded-md border border-white/10 bg-slate-950/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-300 opacity-0 backdrop-blur transition-all duration-200 group-hover:opacity-100",
                    isActive && "border-aws/40 text-aws opacity-100",
                  )}
                >
                  {s.num} · {s.label}
                </span>
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    isActive ? "w-6 bg-aws shadow-[0_0_10px_rgba(255,153,0,0.9)]" : "w-1.5 bg-slate-600 group-hover:bg-slate-400",
                  )}
                />
              </button>
            );
          })}
        </nav>
      )}

      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <a
          data-testid="download-pdf-button"
          href="/Amazon-S3-Presentation.pdf"
          download="Cloud-Storage-using-Amazon-S3.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Download Presentation PDF"
          className="flex h-10 items-center gap-2 rounded-full border border-aws/40 bg-slate-950/80 px-3.5 font-mono text-xs font-semibold text-aws backdrop-blur transition-all hover:bg-aws hover:text-slate-950 shadow-[0_0_15px_rgba(255,153,0,0.2)]"
        >
          <FileDown className="h-4 w-4" />
          <span>PDF</span>
        </a>
        <button
          data-testid="fullscreen-toggle"
          onClick={toggleFullscreen}
          title="Fullscreen (F)"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-300 backdrop-blur transition-colors hover:border-aws/50 hover:text-aws"
        >
          {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>
        <button
          data-testid="presentation-mode-toggle"
          onClick={onTogglePresentation}
          title="Presentation Mode (P)"
          className={cn(
            "flex h-10 items-center gap-2 rounded-full border px-4 font-mono text-xs backdrop-blur transition-colors",
            presentation
              ? "border-aws bg-aws text-ink"
              : "border-white/10 bg-slate-950/80 text-slate-300 hover:border-aws/50 hover:text-aws",
          )}
        >
          <Presentation className="h-4 w-4" />
          {presentation ? "EXIT" : "PRESENT"}
        </button>
      </div>

      {presentation && (
        <div
          data-testid="slide-counter"
          className="fixed bottom-5 left-5 z-50 rounded-full border border-aws/30 bg-slate-950/90 px-4 py-2 font-mono text-xs text-slate-300 backdrop-blur"
        >
          <span className="text-aws">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="text-slate-500"> / {sections.length} — </span>
          {sections[activeIndex]?.label}
        </div>
      )}
    </>
  );
}
