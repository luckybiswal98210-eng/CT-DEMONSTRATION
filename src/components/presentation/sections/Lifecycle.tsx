import { ArrowRight, FileCheck, FileText, GitBranch, History, Snowflake, Timer, Zap } from "lucide-react";
import { Chapter, Reveal, Section, Term } from "../primitives";
import { DeepDive } from "../DeepDive";

const VERSIONS = [
  { v: "Version 3", tag: "current", tone: "border-aws/50 card-opaque-subtle text-aws font-medium" },
  { v: "Version 2", tag: "recoverable", tone: "border-white/15 card-opaque-subtle text-slate-200" },
  { v: "Version 1", tag: "recoverable", tone: "border-white/15 card-opaque-subtle text-slate-200" },
];

const STAGES = [
  { icon: Zap, name: "S3 Standard", when: "Frequent access", desc: "Active semester documents", tone: "text-aws border-aws/50 card-opaque-subtle font-medium" },
  { icon: Timer, name: "S3 Standard-IA", when: "After inactivity", desc: "Previous semesters, rarely opened", tone: "text-pulse border-pulse/50 card-opaque-subtle font-medium" },
  { icon: Snowflake, name: "S3 Glacier", when: "Long-term archival", desc: "Alumni records, compliance archives", tone: "text-sky-300 border-sky-400/50 card-opaque-subtle font-medium" },
];

export function Lifecycle() {
  return (
    <Section id="lifecycle" className="relative">
      <Chapter
        num="08"
        kicker="Backup & Recovery"
        title="What Happens If a File Is Accidentally Deleted?"
        tagline="Versioning keeps history. Lifecycle policies quietly move old files to cheaper storage."
      />

      <div className="layout-split items-start">
        {/* LEFT COLUMN: Versioning, Lifecycle Policies & Cross-Region Replication */}
        <div className="layout-split-left flex flex-col gap-6">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-white/15 card-opaque p-6 shadow-xl">
              <p className="mb-1 flex items-center gap-2 font-heading text-base font-semibold text-white">
                <History className="h-5 w-5 text-aws" /> S3 Versioning
              </p>
              <p className="mb-4 text-xs text-slate-300">certificate.pdf — every overwrite kept, nothing lost</p>
              <div className="space-y-2.5">
                {VERSIONS.map((v, i) => (
                  <div key={v.v}>
                    <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 shadow-md ${v.tone}`}>
                      <FileText className="h-4 w-4" />
                      <span className="text-xs font-semibold">{v.v}</span>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-wider opacity-90">
                        {v.tag}
                      </span>
                    </div>
                    {i < VERSIONS.length - 1 && <div className="mx-auto h-2.5 w-px bg-slate-600" />}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                With <Term tip="S3 versioning keeps every variant of an object under the same key. Deletes add a delete marker instead of removing data; previous versions can be restored.">versioning enabled</Term>,
                an accidental overwrite or delete can be rolled back to a previous version.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/15 card-opaque p-6 shadow-xl">
              <p className="mb-1 flex items-center gap-2 font-heading text-base font-semibold text-white">
                <GitBranch className="h-5 w-5 text-pulse" /> Lifecycle Policies
              </p>
              <p className="mb-4 text-xs text-slate-300">Automatic tier transitions as files age</p>
              <div className="flex flex-col items-stretch gap-0">
                {STAGES.map((s, i) => (
                  <div key={s.name}>
                    <div className={`flex items-center gap-3.5 rounded-xl border px-3.5 py-3 shadow-md ${s.tone}`}>
                      <s.icon className="h-4 w-4 shrink-0" />
                      <div>
                        <p className="font-heading text-xs font-semibold text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-300">{s.desc}</p>
                      </div>
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-slate-300 font-medium">
                        {s.when}
                      </span>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className="mx-auto flex h-3 w-px items-center justify-center bg-slate-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-start gap-3.5 rounded-2xl border border-white/15 card-opaque p-5 shadow-lg">
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-aws" />
              <p className="text-xs leading-relaxed text-slate-300">
                <span className="font-semibold text-white">Cross-Region Replication:</span> S3 can automatically replicate mission-critical documents to a secondary AWS region for complete disaster recovery posture.
              </p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: 3D Live Vault + Technical Deep Dive Just Below It */}
        <div className="layout-split-right flex flex-col gap-6">
          {/* 3D LIVE Vault with Retention Orbit and Floating Recovered Files */}
          <Reveal delay={0.1}>
            <div className="relative w-full rounded-3xl border border-aws/35 card-opaque p-3.5 shadow-[0_0_90px_rgba(255,153,0,0.3)] overflow-hidden">
              <div className="relative h-[480px] sm:h-[540px] lg:h-[580px] w-full rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="/images/s3-lifecycle-3d.jpg"
                  alt="3D Archive Secure Vault"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-95 scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-transparent opacity-45" />

                {/* Live Floating Recovered Data Object Badge */}
                <div className="pointer-events-none absolute left-[54%] top-[42%] -translate-x-1/2 flex items-center gap-2 rounded-xl border border-emerald-400/80 card-opaque px-3 py-1.5 text-xs font-mono font-medium text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.7)] animate-vault-float">
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  <span>certificate.pdf [v2 restored]</span>
                </div>

                <div 
                  className="pointer-events-none absolute left-[44%] top-[60%] -translate-x-1/2 flex items-center gap-1.5 rounded-lg border border-aws/70 card-opaque px-2.5 py-1 text-[11px] font-mono font-medium text-amber-200 shadow-[0_0_15px_rgba(255,153,0,0.6)] animate-vault-float"
                  style={{ animationDelay: "3s" }}
                >
                  <History className="h-3 w-3 text-aws" />
                  <span>v1 archived · 0 data lost</span>
                </div>

                {/* Animated Rotating Retention Ring (Tilted 3D Ellipse) */}
                <div
                  className="pointer-events-none absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative flex items-center justify-center rounded-full animate-spin"
                    style={{
                      width: "320px",
                      height: "320px",
                      transform: "rotateX(65deg) rotateZ(20deg)",
                      transformStyle: "preserve-3d",
                      animationDuration: "14s",
                      animationTimingFunction: "linear",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-aws/70 shadow-[0_0_35px_rgba(255,153,0,0.5)]" />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-aws shadow-[0_0_18px_#FF9900]" />
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#00F0FF]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_12px_#FF9900]" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Technical Deep Dive placed in the right side just below the 3D image */}
          <Reveal delay={0.2}>
            <DeepDive
              testId="deepdive-lifecycle"
              basic="S3 can keep old copies of files and automatically move rarely-used files to cheaper storage, like moving old records from a desk drawer to a store room."
              technical="With S3 Versioning enabled, whenever a file is updated, S3 assigns a new version ID instead of overwriting the original. When deleted, S3 simply places a reversible 'delete marker' so the file can be restored anytime. Meanwhile, Lifecycle Policies automatically move older files from S3 Standard to cheaper storage tiers (like S3 Infrequent Access after 60 days, and S3 Glacier archive after 1 year), cutting storage bills automatically."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
