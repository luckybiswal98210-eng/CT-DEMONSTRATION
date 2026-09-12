import { Activity, Radar, ScrollText } from "lucide-react";
import { Chapter, CountUp, Reveal, Section } from "../primitives";

const SERVICES = [
  {
    icon: Activity,
    name: "Amazon CloudWatch",
    body: "Monitors relevant AWS metrics and raises alarms when storage or request patterns look wrong.",
  },
  {
    icon: ScrollText,
    name: "AWS CloudTrail",
    body: "Records API activity — an audit trail of who performed which AWS action, and when.",
  },
  {
    icon: Radar,
    name: "Application Logs",
    body: "The backend tracks uploads, downloads and errors at the application level.",
  },
];

const STATS = [
  { label: "Storage Usage", value: 128, suffix: " GB", tone: "text-aws" },
  { label: "Files Uploaded", value: 12486, suffix: "", tone: "text-pulse" },
  { label: "Download Requests", value: 84392, suffix: "", tone: "text-emerald-300" },
  { label: "Failed Uploads", value: 17, suffix: "", tone: "text-rose-300" },
  { label: "API Activity Events", value: 231480, suffix: "", tone: "text-sky-300" },
];

const BARS = [42, 58, 37, 66, 74, 52, 88, 61, 45, 79, 93, 68, 55, 71, 84, 49, 62, 90, 77, 58, 69, 95, 81, 64];

export function Monitoring() {
  return (
    <Section id="monitoring">
      <Chapter
        num="10"
        kicker="Monitoring & Management"
        title="How Do We Monitor the Storage System?"
        tagline="Metrics for health, audit trails for accountability, logs for debugging."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-panel/70 p-6 backdrop-blur transition-colors hover:border-aws/40">
              <s.icon className="mb-4 h-6 w-6 text-aws" />
              <h3 className="font-heading text-base font-semibold text-slate-100">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0A0F1C] p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
              Storage Operations Dashboard
            </span>
            <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{s.label}</p>
                <p className={`mt-2 font-heading text-2xl font-bold ${s.tone}`}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex h-24 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-aws/25 to-aws/70"
                style={{
                  height: `${h}%`,
                  animation: `grow-bar 0.9s ${i * 0.04}s cubic-bezier(0.22,1,0.36,1) both`,
                }}
              />
            ))}
          </div>
          <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-wider text-slate-500">
            requests / hour · last 24h
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
