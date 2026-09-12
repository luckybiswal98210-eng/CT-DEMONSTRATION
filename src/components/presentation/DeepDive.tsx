import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Microscope } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DeepDive({
  basic,
  technical,
  testId,
}: {
  basic: string;
  technical: string;
  testId: string;
}) {
  const [mode, setMode] = useState<"basic" | "technical">("basic");

  return (
    <div className="rounded-2xl border border-white/10 bg-raise/60 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Microscope className="h-4 w-4 text-aws" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Technical Deep Dive
        </span>
        <div className="ml-auto flex rounded-full border border-white/10 p-0.5">
          <button
            data-testid={`${testId}-basic`}
            onClick={() => setMode("basic")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
              mode === "basic" ? "bg-aws text-ink" : "text-slate-400 hover:text-slate-200",
            )}
          >
            <GraduationCap className="h-3.5 w-3.5" /> Basic
          </button>
          <button
            data-testid={`${testId}-technical`}
            onClick={() => setMode("technical")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
              mode === "technical" ? "bg-aws text-ink" : "text-slate-400 hover:text-slate-200",
            )}
          >
            <Microscope className="h-3.5 w-3.5" /> Technical
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "text-sm leading-relaxed",
            mode === "technical" ? "font-mono text-cyan-100/90" : "text-slate-300",
          )}
        >
          {mode === "basic" ? basic : technical}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
