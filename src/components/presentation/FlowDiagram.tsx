import type { LucideIcon } from "lucide-react";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

export interface FlowStepDef {
  icon: LucideIcon;
  title: string;
  sub?: string;
  tone?: "amber" | "cyan" | "green" | "red" | "slate";
}

const TONES: Record<string, string> = {
  amber: "border-aws/40 bg-aws/10 text-aws",
  cyan: "border-pulse/40 bg-pulse/10 text-pulse",
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  red: "border-rose-400/40 bg-rose-400/10 text-rose-300",
  slate: "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

export function FlowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative mx-auto h-12 w-px">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-aws/50 via-slate-600/60 to-aws/50" />
      <span
        className="flow-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aws shadow-[0_0_12px_rgba(255,153,0,0.9)]"
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  );
}

export function FlowNode({
  step,
  index,
  active,
}: {
  step: FlowStepDef;
  index?: number;
  active?: boolean;
}) {
  const Icon = step.icon;
  return (
    <div
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border bg-panel/80 px-5 py-4 backdrop-blur transition-all duration-300",
        active ? "border-aws/60 shadow-[0_0_30px_rgba(255,153,0,0.18)]" : "border-white/10",
      )}
    >
      {typeof index === "number" && (
        <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
      )}
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border", TONES[step.tone ?? "amber"])}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-heading text-sm font-semibold text-slate-100 md:text-base">{step.title}</p>
        {step.sub && <p className="truncate text-xs text-slate-400 md:text-sm">{step.sub}</p>}
      </div>
    </div>
  );
}

export function FlowSteps({ steps, className }: { steps: FlowStepDef[]; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((s, i) => (
        <div key={i}>
          <Reveal delay={i * 0.06}>
            <FlowNode step={s} index={i} />
          </Reveal>
          {i < steps.length - 1 && <FlowConnector delay={i * 0.25} />}
        </div>
      ))}
    </div>
  );
}
