import {
  ArrowRight,
  Cloud,
  FileSpreadsheet,
  FileText,
  Image,
  Layers,
  Lock,
  RefreshCw,
  Scale,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Chapter, Reveal, Section, Term } from "../primitives";

const PILLARS = [
  {
    icon: Scale,
    title: "Scalability",
    desc: "Storage automatically scales with application requirements — from semester one to a decade of archives.",
  },
  {
    icon: ShieldCheck,
    title: "Durability",
    desc: "S3 is designed for 99.999999999% (11 nines) durability of stored objects across multiple facilities.",
  },
  {
    icon: Lock,
    title: "Security",
    desc: "IAM, bucket policies, encryption and access controls protect sensitive student data.",
  },
  {
    icon: RefreshCw,
    title: "Availability",
    desc: "Files can be accessed whenever authorized users need them, from anywhere.",
  },
  {
    icon: Layers,
    title: "Cost Efficiency",
    desc: "Pay for storage and requests according to usage — no physical infrastructure to buy or maintain.",
  },
];

export function WhyS3() {
  return (
    <Section id="why-s3" className="relative">
      <Chapter
        num="02"
        kicker="Why Amazon S3"
        title="Object Storage Built for the Internet"
        tagline="Amazon S3 (Simple Storage Service) stores and retrieves any amount of data from anywhere over the internet."
      />

      <div className="layout-split mb-12">
        {/* LEFT COLUMN: Narrative & Architecture Comparison */}
        <div className="layout-split-left flex flex-col gap-6">
          <Reveal>
            <div className="rounded-2xl border border-white/10 card-opaque p-6 shadow-xl">
              <p className="text-base leading-relaxed text-slate-200 md:text-lg">
                Instead of files living on the college's own hard drives, they become{" "}
                <Term tip="A flat storage model where each file is an object with a unique key, metadata and data — no real folders, no fixed capacity.">
                  objects
                </Term>{" "}
                inside an{" "}
                <Term tip="An S3 bucket is a top-level container for objects, with its own region, access policies, and lifecycle rules.">
                  S3 bucket
                </Term>{" "}
                — while the application keeps working exactly as before.
              </p>
            </div>
          </Reveal>

          {/* Traditional Storage vs Amazon S3 Comparison */}
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2 items-stretch">
              {/* Traditional */}
              <div className="rounded-2xl border border-white/10 card-opaque-subtle p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  Traditional Storage
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                  {["Server", "HDD", "Backup", "Maintenance"].map((item, idx) => (
                    <span key={item} className="flex items-center gap-1">
                      <span className="rounded-md border border-white/10 bg-raise/80 px-2 py-1">
                        {item}
                      </span>
                      {idx < 3 && <span className="text-slate-500">+</span>}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  Buy hardware upfront · capacity fixed · you manage failures
                </p>
              </div>

              {/* Amazon S3 */}
              <div className="rounded-2xl border border-emerald-500/30 card-opaque-success p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
                  Amazon S3
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <span className="rounded-md border border-white/10 bg-raise/80 px-2 py-1">
                    App
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-aws" />
                  <span className="flex items-center gap-1.5 rounded-md border border-aws/40 bg-aws/10 px-2 py-1 font-medium text-aws">
                    <Cloud className="h-3.5 w-3.5" /> S3 Bucket
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  Unlimited capacity · AWS-managed durability · pay per use
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: 3D Live S3 Bucket with Streaming Ingestion (Large & Impactful) */}
        <div className="layout-split-right">
          <Reveal delay={0.15} className="w-full">
            <div className="sticky top-24 relative w-full rounded-3xl border border-aws/35 card-opaque p-3.5 shadow-[0_0_90px_rgba(255,153,0,0.3)] overflow-hidden">
              <div 
                className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ width: "100%", height: "600px", minHeight: "520px" }}
              >
                {/* 3D High-Resolution Amazon S3 Bucket */}
                <img
                  src="/images/s3-bucket-3d.jpg"
                  alt="3D Amazon S3 Bucket"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-95 scale-100 drop-shadow-[0_0_50px_rgba(0,240,255,0.35)]"
                />
                <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/15 to-[#070c18]/70 opacity-50" />

                {/* Live Falling Data Objects streaming into the glowing bucket opening */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-cyan-400/80 card-opaque px-3 py-1.5 text-xs font-mono font-medium text-cyan-200 shadow-[0_0_18px_rgba(0,240,255,0.7)]"
                    style={{ left: "38%", animationDelay: "0s" }}
                  >
                    <FileText className="h-3.5 w-3.5 text-cyan-300" />
                    <span>student_id.pdf</span>
                  </div>

                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-aws/90 card-opaque px-3 py-1.5 text-xs font-mono font-medium text-amber-200 shadow-[0_0_18px_rgba(255,153,0,0.7)]"
                    style={{ left: "54%", animationDelay: "1.4s" }}
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5 text-aws" />
                    <span>marksheet.xlsx</span>
                  </div>

                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-emerald-400/80 card-opaque px-3 py-1.5 text-xs font-mono font-medium text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.7)]"
                    style={{ left: "32%", animationDelay: "2.8s" }}
                  >
                    <Image className="h-3.5 w-3.5 text-emerald-300" />
                    <span>convocation.jpg</span>
                  </div>

                  <div 
                    className="animate-fall-bucket absolute flex items-center gap-1.5 rounded-lg border border-purple-400/80 card-opaque px-3 py-1.5 text-xs font-mono font-medium text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.7)]"
                    style={{ left: "48%", animationDelay: "4.1s" }}
                  >
                    <Video className="h-3.5 w-3.5 text-purple-300" />
                    <span>lecture_04.mp4</span>
                  </div>

                  {/* Radiant Golden Rim Ingestion Glow */}
                  <div 
                    className="absolute top-[25%] left-[50%] -translate-x-1/2 h-14 w-48 rounded-full border border-yellow-400/70 bg-yellow-400/20 blur-md animate-pulse"
                    style={{ animationDuration: "2.5s" }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 5 Architectural Pillars Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 card-opaque p-5 shadow-lg transition-all duration-300 hover:border-aws/40 hover:shadow-[0_0_25px_rgba(255,153,0,0.15)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-aws/30 bg-aws/10 text-aws transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-aws">
                  {p.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{p.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
