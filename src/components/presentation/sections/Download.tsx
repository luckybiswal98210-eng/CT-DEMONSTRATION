import {
  CheckCircle2,
  DownloadCloud,
  FileSearch,
  KeyRound,
  ShieldCheck,
  Ticket,
  User,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";
import { FlowSteps } from "../FlowDiagram";

const STEPS = [
  { icon: User, title: "User requests a file", sub: "student, faculty or admin", tone: "amber" as const },
  { icon: KeyRound, title: "Login / Authentication", sub: "who is asking?", tone: "cyan" as const },
  { icon: ShieldCheck, title: "Backend authorization", sub: "is this user allowed this object?", tone: "amber" as const },
  { icon: FileSearch, title: "Permission + ownership check", sub: "students see only their own documents", tone: "cyan" as const },
  { icon: Ticket, title: "Generate presigned GET URL", sub: "expires in minutes, single object", tone: "amber" as const },
  { icon: DownloadCloud, title: "Amazon S3 serves the object", sub: "or CloudFront edge cache, if enabled", tone: "cyan" as const },
  { icon: CheckCircle2, title: "File downloads", sub: "audited in application logs", tone: "green" as const },
];

const ROWS = [
  ["Student ID", "1001"],
  ["File Name", "certificate.pdf"],
  ["S3 Key", "students/2026/1001/certificate.pdf"],
  ["Size", "2.4 MB"],
  ["Uploaded", "10 Sept 2026 · 09:41 UTC"],
];

export function Download() {
  return (
    <Section id="download">
      <Chapter
        num="06"
        kicker="Download / Access Flow"
        title="How Does a Student or Faculty Member Access a File?"
        tagline="Every download is authenticated, authorized, temporary — and auditable."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="rounded-2xl border border-pulse/25 bg-pulse/5 p-6">
              <p className="font-heading text-lg font-semibold text-slate-100">
                The database never stores the file.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                It stores metadata and the S3 object key. S3 handles the bytes; the database handles
                the facts. This separation keeps the architecture clean and lets each system do what
                it is optimized for.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/70 backdrop-blur">
              <div className="border-b border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                documents table — one row
              </div>
              <div className="divide-y divide-white/5">
                {ROWS.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-mono text-xs text-slate-200 md:text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <FlowSteps steps={STEPS} />
        </Reveal>
      </div>
    </Section>
  );
}
