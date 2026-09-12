import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Cloud,
  Database,
  Layers,
  MapPin,
  Undo2,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";

const FORMULA = ["Storage", "Requests", "Data Transfer", "Retrieval", "Optional Services"];

const DRIVERS = [
  { icon: Database, label: "Amount of stored data" },
  { icon: ArrowUpFromLine, label: "PUT request count" },
  { icon: ArrowDownToLine, label: "GET request count" },
  { icon: Cloud, label: "Data transfer out" },
  { icon: Layers, label: "Storage class mix" },
  { icon: Undo2, label: "Retrieval frequency" },
  { icon: MapPin, label: "AWS region" },
  { icon: Cloud, label: "CloudFront usage" },
];

export function Cost() {
  return (
    <Section id="cost">
      <Chapter
        num="11"
        kicker="Cost Model"
        title="How Much Does It Cost?"
        tagline="There is no single fixed price — S3 is usage-based, and that is the point."
      />

      <Reveal>
        <div className="rounded-2xl border border-aws/25 bg-panel/70 p-8 text-center backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Monthly Cost ≈</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {FORMULA.map((f, i) => (
              <span key={f} className="flex items-center gap-3">
                <span className="rounded-xl border border-aws/40 bg-aws/10 px-4 py-2.5 font-heading text-sm font-semibold text-aws md:text-base">
                  {f}
                </span>
                {i < FORMULA.length - 1 && <span className="font-heading text-xl text-slate-500">+</span>}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {DRIVERS.map((d, i) => (
          <Reveal key={d.label + i} delay={i * 0.05}>
            <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-raise/60 p-4 transition-colors hover:border-aws/40">
              <d.icon className="h-4 w-4 shrink-0 text-pulse" />
              <span className="text-sm text-slate-300">{d.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p className="text-sm leading-relaxed text-amber-100/90">
            The honest answer: estimate the college's real usage — gigabytes stored, uploads and
            downloads per month, retention policy — then compute the bill from{" "}
            <span className="font-semibold">current AWS regional pricing</span>. Always verify
            pricing before deployment; it varies by region and changes over time.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
