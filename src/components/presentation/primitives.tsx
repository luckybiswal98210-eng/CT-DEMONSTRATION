import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 md:py-32", className)}
    >
      {children}
    </section>
  );
}

export function Chapter({
  num,
  kicker,
  title,
  tagline,
}: {
  num: string;
  kicker: string;
  title: string;
  tagline?: string;
}) {
  return (
    <div className="relative z-10 mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-end gap-5">
          <span className="mb-1 font-mono text-xs uppercase tracking-[0.3em] text-aws drop-shadow-md md:mb-2">
            {num} — {kicker}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-slate-100 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {tagline && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:text-lg">
            {tagline}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Term({ children, tip }: { children: ReactNode; tip: string }) {
  return (
    <span className="group relative cursor-help whitespace-nowrap font-medium text-aws">
      <span className="border-b border-dashed border-aws/60">{children}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 whitespace-normal rounded-lg border border-white/10 bg-slate-950/95 p-3 font-sans text-xs font-normal leading-relaxed text-slate-300 opacity-0 shadow-2xl backdrop-blur-xl transition-opacity duration-200 group-hover:opacity-100">
        {tip}
      </span>
    </span>
  );
}

export function Glass({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-panel/70 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
