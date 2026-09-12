import { useEffect, useState } from "react";
import {
  Archive,
  CheckCircle2,
  CloudUpload,
  Database,
  FileUp,
  KeyRound,
  Play,
  RotateCcw,
  ScanSearch,
  Ticket,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";
import { cn } from "@/lib/utils";
import { NetworkPipeline3D } from "../NetworkPipeline3D";

const STEPS = [
  { icon: FileUp, title: "Browser selects certificate.pdf", ms: "0 ms" },
  { icon: KeyRound, title: "Backend authenticates student", ms: "~45 ms" },
  { icon: ScanSearch, title: "Backend checks file type & size", ms: "~5 ms" },
  { icon: Ticket, title: "Backend creates presigned upload URL", ms: "~120 ms" },
  { icon: CloudUpload, title: "Browser uploads directly to S3", ms: "~850 ms" },
  { icon: Archive, title: "S3 stores the object", ms: "~200 ms" },
  { icon: Database, title: "Backend stores metadata", ms: "~35 ms" },
  { icon: CheckCircle2, title: "Student receives success response", ms: "~20 ms" },
];

export function RealWorldFlow() {
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const done = active >= STEPS.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1050);
    return () => clearTimeout(t);
  }, [playing, active, done]);

  const play = () => {
    setActive(-1);
    setPlaying(true);
  };

  return (
    <Section id="real-world">
      <Chapter
        num="13"
        kicker="One Complete Request"
        title="What Happens When I Click Upload?"
        tagline="Watch certificate.pdf travel from a student's laptop into the bucket — step by step, with realistic latency."
      />

      <div className="layout-split items-start">
        {/* LEFT COLUMN: Request Stepper & Latency Timeline */}
        <div className="layout-split-left flex flex-col">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <button
                data-testid="trace-play-button"
                onClick={play}
                disabled={playing}
                className="flex items-center gap-2.5 rounded-full bg-aws px-6 py-3 font-heading text-sm font-semibold text-ink transition-transform hover:scale-[1.03] disabled:opacity-50"
              >
                {done ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {done ? "Replay the request" : playing ? "Tracing request…" : "Trace the request"}
              </button>
              {done && (
                <span className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> 200 OK — object stored, metadata committed
                </span>
              )}
            </div>
          </Reveal>

          <div className="relative w-full">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" />
            <div
              className="absolute left-[27px] top-6 w-px bg-gradient-to-b from-aws to-pulse transition-all duration-700"
              style={{ height: `${(Math.max(0, active + 1) / STEPS.length) * 100}%`, maxHeight: "calc(100% - 48px)" }}
            />
            <div className="space-y-3">
              {STEPS.map((s, i) => {
                const state = i < active || (done && i <= active) ? "done" : i === active ? "active" : "idle";
                return (
                  <Reveal key={s.title} delay={i * 0.05}>
                    <div
                      data-testid={`trace-step-${i}`}
                      className={cn(
                        "relative flex items-center gap-4 rounded-2xl border px-4 py-4 pl-3 transition-all duration-500",
                        state === "active" && "border-aws/60 bg-aws/10 shadow-[0_0_30px_rgba(255,153,0,0.15)]",
                        state === "done" && "border-emerald-400/25 bg-emerald-400/5",
                        state === "idle" && "border-white/10 bg-panel/60",
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                          state === "done" && "border-emerald-400 bg-emerald-400/15 text-emerald-300",
                          state === "active" && "pulse-ring border-aws bg-aws/15 text-aws",
                          state === "idle" && "border-slate-700 bg-raise text-slate-500",
                        )}
                      >
                        {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                      </span>
                      <p
                        className={cn(
                          "text-sm font-medium md:text-base",
                          state === "idle" ? "text-slate-500" : "text-slate-100",
                        )}
                      >
                        {s.title}
                      </p>
                      <span className="ml-auto font-mono text-[11px] text-slate-500">{s.ms}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Live Request Pipeline Illustration */}
        <div className="layout-split-right">
          <Reveal delay={0.15} className="w-full">
            <NetworkPipeline3D />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
