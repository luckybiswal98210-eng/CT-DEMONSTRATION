import {
  Cloud,
  Database,
  Globe,
  HardDrive,
  KeyRound,
  Lock,
  MonitorSmartphone,
  Radar,
  ServerCog,
  ShieldCheck,
  History,
  Ticket,
  UserCheck,
  Users,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";
import { FlowConnector } from "../FlowDiagram";

const RING = [
  { icon: KeyRound, label: "Authentication" },
  { icon: UserCheck, label: "Authorization" },
  { icon: ShieldCheck, label: "IAM" },
  { icon: Lock, label: "Encryption" },
  { icon: HardDrive, label: "Private Bucket" },
  { icon: Ticket, label: "Presigned URLs" },
  { icon: Radar, label: "Monitoring" },
  { icon: History, label: "Backup / Versioning" },
];

const FLOW = [
  { icon: Users, label: "Students / Faculty / Admin" },
  { icon: MonitorSmartphone, label: "College Portal" },
  { icon: ServerCog, label: "Backend API" },
];

export function Summary() {
  return (
    <Section id="summary">
      <Chapter
        num="15"
        kicker="Final Architecture"
        title="From Local Files to Cloud-Native Storage"
        tagline="Amazon S3 provides the storage foundation for a scalable, secure and manageable College Management System."
      />

      <Reveal>
        <div className="relative rounded-3xl border border-dashed border-aws/30 bg-panel/40 p-6 md:p-10">
          <span className="absolute -top-3 left-8 bg-ink px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-aws">
            Security perimeter — every layer active
          </span>

          <div className="blueprint mx-auto flex max-w-md flex-col rounded-2xl p-4">
            {FLOW.map((n, i) => (
              <div key={n.label}>
                <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-panel/90 px-4 py-3.5 text-sm font-medium text-slate-100">
                  <n.icon className="h-4 w-4 text-aws" />
                  {n.label}
                </div>
                <FlowConnector delay={i * 0.3} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center gap-1 rounded-xl border border-pulse/30 bg-pulse/5 px-3 py-4 text-xs text-pulse">
                <Database className="h-5 w-5" />
                Database
                <span className="font-mono text-[10px] text-slate-500">metadata only</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-aws/40 bg-aws/10 px-3 py-4 text-xs text-aws">
                <HardDrive className="h-5 w-5" />
                Amazon S3
                <span className="font-mono text-[10px] text-slate-500">actual files</span>
              </div>
            </div>
            <FlowConnector delay={0.9} />
            <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-panel/90 px-4 py-3.5 text-sm font-medium text-slate-100">
              <Globe className="h-4 w-4 text-pulse" />
              CloudFront
              <span className="font-mono text-[10px] text-slate-500">optional CDN</span>
            </div>
            <FlowConnector delay={1.2} />
            <div className="flex items-center justify-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-4 py-3.5 text-sm font-medium text-emerald-200">
              <Users className="h-4 w-4" />
              Fast, authorized access for users
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {RING.map((r) => (
              <span
                key={r.label}
                className="flex items-center gap-2 rounded-full border border-aws/25 bg-aws/5 px-3.5 py-1.5 font-mono text-[11px] text-amber-200/90"
              >
                <r.icon className="h-3.5 w-3.5 text-aws" />
                {r.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
            <Cloud className="h-4 w-4 text-aws" />
            one storage layer · infinite headroom
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
