import {
  AlertTriangle,
  FileWarning,
  Fingerprint,
  GraduationCap,
  HardDrive,
  Lock,
  Server,
  ShieldAlert,
  Video,
  Zap,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";
import { DeepDive } from "../DeepDive";

const CATEGORIES = [
  {
    title: "Student & Academic Records",
    icon: GraduationCap,
    desc: "Marksheets, degree certificates, assignment submissions, attendance PDFs",
    tag: "High Volume",
    tone: "border-aws/30 text-aws",
  },
  {
    title: "Identity & Confidential Data",
    icon: Fingerprint,
    desc: "Aadhaar cards, student KYC scans, faculty payroll, official fee receipts",
    tag: "Sensitive / Private",
    tone: "border-rose-400/30 text-rose-300",
  },
  {
    title: "Heavy Digital Media",
    icon: Video,
    desc: "HD lecture video recordings, convocation photos, annual campus fest media",
    tag: "Gigabytes / File",
    tone: "border-purple-400/30 text-purple-300",
  },
];

const ARCH_FLOW = [
  { icon: GraduationCap, role: "Student / Faculty", desc: "Requests or uploads file from browser" },
  { icon: Server, role: "College Web Server", desc: "Proxies all file traffic through single host CPU" },
  { icon: HardDrive, role: "Local Mechanical HDD", desc: "Raw internal disk — zero automated redundancy", critical: true },
];

const FAILURE_POINTS = [
  {
    title: "Storage Exhaustion",
    desc: "Fixed physical drive runs out of disk space during admission season traffic peaks.",
    icon: HardDrive,
  },
  {
    title: "Catastrophic Data Loss",
    desc: "Mechanical disk heads wear out or fail; unbacked-up academic history is lost forever.",
    icon: AlertTriangle,
  },
  {
    title: "Severe Bottlenecks",
    desc: "Hundreds of remote students downloading files simultaneously crashes web server bandwidth.",
    icon: Zap,
  },
  {
    title: "Security & Privacy Risks",
    desc: "Aadhaar cards and exam papers stored unencrypted on shared local drives without IAM control.",
    icon: Lock,
  },
];

export function Problem() {
  return (
    <Section id="problem" className="relative">
      <Chapter
        num="01"
        kicker="The Problem"
        title="Why Does a College Need Cloud Storage?"
        tagline="A college management system never stops generating files — but saving them on physical local servers creates massive risks."
      />

      <div className="layout-split">
        {/* LEFT COLUMN: All Text, Categories, Architecture Flow & Deep Dive */}
        <div className="layout-split-left flex flex-col gap-5">
          <Reveal delay={0.05}>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                Daily College Data Flow
              </p>
              <span className="font-mono text-[11px] text-aws">Thousands of Files / Week</span>
            </div>
          </Reveal>

          <div className="space-y-3">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={0.05 + i * 0.05}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-white/10 card-opaque p-4 shadow-lg transition-all duration-300 hover:border-aws/40">
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-raise/50 ${c.tone}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-sm font-semibold text-white">{c.title}</h4>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          {c.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">{c.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Before Cloud Architecture Box */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-rose-500/40 card-opaque p-5 shadow-xl">
              <div className="mb-3.5 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-rose-300">
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  Before Cloud: The Physical Bottleneck
                </span>
                <span className="rounded-full border border-rose-500/40 bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] uppercase text-rose-300">
                  High Risk
                </span>
              </div>

              <div className="space-y-2">
                {ARCH_FLOW.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.role}>
                      <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 shadow-md ${
                        step.critical 
                          ? "border-rose-500/40 card-opaque-danger text-rose-100" 
                          : "border-white/10 card-opaque-subtle text-slate-200"
                      }`}>
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          step.critical ? "bg-rose-500/20 text-rose-300" : "bg-white/5 text-slate-400"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-white">{step.role}</p>
                          <p className="text-[11px] text-slate-300">{step.desc}</p>
                        </div>
                        {step.critical && (
                          <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-rose-400 font-semibold">
                            Single Point of Failure
                          </span>
                        )}
                      </div>
                      {i < ARCH_FLOW.length - 1 && (
                        <div className="mx-auto h-2 w-px bg-gradient-to-b from-slate-600 to-slate-700" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <DeepDive
              testId="deepdive-problem"
              basic="A college produces thousands of documents, photos and videos every day. Storing them on an ordinary office computer or server is risky and quickly runs out of space."
              technical="In on-premises storage, all files live on a single local server. If that hard drive crashes or runs out of disk space during admissions, you face complete data loss and downtime because there is no automatic backup or RAID failover."
            />
          </Reveal>
        </div>

        {/* RIGHT COLUMN: 3D Live Server Image with Dynamic Live Alerts */}
        <div className="layout-split-right">
          <Reveal delay={0.1}>
            <div className="sticky top-28 relative w-full rounded-3xl border border-rose-500/30 card-opaque p-3 shadow-[0_0_80px_rgba(244,63,94,0.25)] overflow-hidden">
              <div className="relative h-[380px] sm:h-[420px] w-full rounded-2xl overflow-hidden">
                <img
                  src="/images/s3-problem-3d.jpg"
                  alt="Overheated physical server failing in on-premises data room"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-95"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-transparent opacity-60" />

                {/* Live Floating Failure Indicators */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-rose-500/70 card-opaque-danger px-2.5 py-1 text-[11px] font-mono font-medium text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                    style={{ left: "28%", animationDelay: "0s" }}
                  >
                    <FileWarning className="h-3 w-3 text-rose-400" />
                    <span>[ALERT: Disk 98% Full]</span>
                  </div>

                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-amber-500/70 card-opaque px-2.5 py-1 text-[11px] font-mono font-medium text-amber-200 shadow-[0_0_15px_rgba(255,153,0,0.6)]"
                    style={{ left: "42%", animationDelay: "1.6s" }}
                  >
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                    <span>[WARN: HDD Queue Stalled]</span>
                  </div>

                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-rose-500/70 card-opaque-danger px-2.5 py-1 text-[11px] font-mono font-medium text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                    style={{ left: "34%", animationDelay: "3.2s" }}
                  >
                    <ShieldAlert className="h-3 w-3 text-rose-400" />
                    <span>[ERROR: Zero Redundancy]</span>
                  </div>

                  {/* Pulsing Danger Radar Beacon */}
                  <div 
                    className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border border-rose-500/40 bg-rose-500/15 blur-sm animate-ping"
                    style={{ animationDuration: "2.8s" }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 4 Core Failure Points Grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FAILURE_POINTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-2xl border border-rose-500/25 card-opaque p-5 shadow-lg transition-all duration-300 hover:border-rose-500/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-white">{p.title}</h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">{p.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
