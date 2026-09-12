import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";

const PROS = [
  "Highly scalable",
  "Durable storage",
  "Secure access control",
  "Easy backup & versioning",
  "Suitable for large files",
  "Supports lifecycle policies",
  "Integrates with web applications",
  "Reduces physical infrastructure",
];

const CONS = [
  "Requires internet connectivity",
  "AWS costs must be monitored",
  "Incorrect permissions can expose data",
  "Architecture requires proper IAM configuration",
  "Data transfer / retrieval costs can matter",
  "Vendor dependency",
];

export function ProsCons() {
  return (
    <Section id="pros-cons">
      <Chapter
        num="13"
        kicker="Honest Evaluation"
        title="Advantages vs Limitations"
        tagline="A good engineer names the trade-offs, not just the wins."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-emerald-400/25 bg-emerald-500/5 p-6">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">
              Advantages
            </p>
            <ul className="space-y-3">
              {PROS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-slate-200 md:text-base">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="h-full rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-amber-300">
              Limitations
            </p>
            <ul className="space-y-3">
              {CONS.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-slate-200 md:text-base">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
