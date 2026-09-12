import { ArrowDown, Cloud, FileVideo, Globe, Server, TrendingUp, User } from "lucide-react";
import { Chapter, Reveal, Section, Term } from "../primitives";

const RAMP = [
  { label: "100 students", width: "18%" },
  { label: "1,000 students", width: "45%" },
  { label: "10,000 students", width: "74%" },
  { label: "Large academic archive", width: "100%" },
];

const PARTS = ["Part 1", "Part 2", "Part 3", "Part 4"];

export function Performance() {
  return (
    <Section id="performance" className="relative overflow-visible">
      <Chapter
        num="09"
        kicker="Performance & Scalability"
        title="Can It Handle Thousands of Students?"
        tagline="Object storage separates file storage from application servers — growth stops being a hardware problem."
      />

      {/* 3D Live Planetary Globe placed in the Top Right Corner (larger size, grand atmospheric perspective) */}
      <div 
        className="pointer-events-none absolute z-0 hidden select-none md:flex items-center justify-center"
        style={{
          top: "-30px",
          right: "-50px",
          width: "680px",
          height: "680px",
        }}
      >
        <div className="relative h-full w-full rounded-full border border-pulse/30 p-2 shadow-[0_0_140px_rgba(0,240,255,0.4)] flex items-center justify-center">
          {/* Continuously Rotating Circular Globe */}
          <div className="relative h-[95%] w-[95%] rounded-full overflow-hidden animate-globe-spin shadow-[0_0_90px_rgba(0,240,255,0.5)]">
            <img
              src="/images/s3-performance-3d.jpg"
              alt="3D Global CloudFront Edge Network Globe"
              className="h-full w-full object-cover opacity-90 scale-105"
            />
          </div>

          {/* Glowing Planetary Atmosphere Ring */}
          <div className="pointer-events-none absolute h-[90%] w-[90%] rounded-full border border-cyan-400/50 shadow-[0_0_55px_rgba(0,240,255,0.5)]" />

          {/* Continuously Rotating Holographic Global Orbit */}
          <div
            className="pointer-events-none absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative flex items-center justify-center rounded-full animate-spin"
              style={{
                width: "520px",
                height: "520px",
                transform: "rotateX(72deg) rotateY(15deg)",
                transformStyle: "preserve-3d",
                animationDuration: "10s",
                animationTimingFunction: "linear",
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/70 shadow-[0_0_40px_rgba(0,240,255,0.6)]" />
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-cyan-200 shadow-[0_0_20px_#00F0FF]" />
              <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 h-4 w-4 rounded-full bg-aws shadow-[0_0_16px_#FF9900]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF]" />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_#FF9900]" />
            </div>

            {/* Radar Wave Emission */}
            <div
              className="absolute rounded-full border-2 border-cyan-300/40 animate-ping opacity-30"
              style={{
                width: "320px",
                height: "320px",
                transform: "rotateX(72deg) rotateY(15deg)",
                animationDuration: "3.5s",
              }}
            />
          </div>
        </div>
      </div>

      {/* FOREGROUND: All Text & Architecture Cards Forward (relative z-10) */}
      <div className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* LEFT COLUMN: Scaling Metrics */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/15 card-opaque p-6 shadow-xl flex flex-col justify-between">
              <div>
                <p className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-white">
                  <TrendingUp className="h-5 w-5 text-aws" /> Scales Automatically Without New Hardware
                </p>
                <div className="space-y-3.5">
                  {RAMP.map((r, i) => (
                    <div key={r.label}>
                      <div className="mb-1 flex justify-between font-mono text-xs text-slate-300 font-medium">
                        <span>{r.label}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-aws/80 to-aws transition-transform duration-1000 shadow-[0_0_12px_rgba(255,153,0,0.4)]"
                          style={{ width: r.width, transitionDelay: `${i * 150}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-slate-300">
                From hundreds to tens of thousands of concurrent students, Amazon S3 absorbs the burst traffic — the college never has to buy or rack another physical server.
              </p>
            </div>
          </Reveal>

          {/* RIGHT COLUMN: CloudFront & Multipart Upload */}
          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/15 card-opaque p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <p className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-pulse">
                    <Globe className="h-4 w-4" /> CloudFront for Hot Content
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                    <span className="flex items-center gap-1 rounded-md border border-white/10 bg-raise/60 px-2 py-1">
                      <User className="h-3 w-3 text-slate-400" /> User
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="flex items-center gap-1 rounded-md border border-pulse/30 bg-pulse/10 px-2 py-1 text-pulse">
                      <Cloud className="h-3 w-3" /> CloudFront
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="flex items-center gap-1 rounded-md border border-aws/30 bg-aws/10 px-2 py-1 text-aws">
                      <Server className="h-3 w-3" /> S3
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
                  <Term tip="CloudFront caches files across hundreds of global edge locations close to students, reducing latency to single-digit milliseconds.">CloudFront</Term> caches popular files at edge locations closer to users.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/15 card-opaque p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <p className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    <FileVideo className="h-4 w-4 text-emerald-400" /> Multipart Upload
                  </p>
                  <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-slate-300">
                    <span>lecture.mp4 · 850 MB</span>
                    <ArrowDown className="h-3 w-3 text-emerald-400" />
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PARTS.map((p) => (
                      <div
                        key={p}
                        className="rounded-lg border border-emerald-500/30 card-opaque-success py-1.5 text-center font-mono text-[10px] text-emerald-200"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
                  Large lecture videos split into parallel parts — if one part fails, only that chunk retries.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
