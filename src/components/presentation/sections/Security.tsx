import {
  ArrowDown,
  CheckCircle2,
  Globe,
  KeyRound,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Timer,
  UserCheck,
  XCircle,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";

const LAYERS = [
  { icon: KeyRound, name: "Authentication", points: ["Student login", "Faculty login", "Admin login"] },
  { icon: UserCheck, name: "Authorization", points: ["Role-based permissions", "Students → own files only", "Faculty → permitted academic files"] },
  { icon: ShieldCheck, name: "IAM Roles & Policies", points: ["IAM roles, not root keys", "Principle of least privilege"] },
  { icon: Lock, name: "Bucket Security", points: ["Block all public access", "Carefully scoped bucket policies", "Sensitive files stay private"] },
  { icon: ShieldAlert, name: "Encryption", points: ["SSE-S3 / SSE-KMS at rest", "HTTPS / TLS in transit"] },
  { icon: Timer, name: "Temporary Access", points: ["Presigned URLs", "Short expiration times"] },
];

const BAD_STEPS = [
  { text: "Public S3 Bucket", desc: "No access control restrictions" },
  { text: "Anyone with the URL", desc: "Anonymous internet scrapers" },
  { text: "Student Aadhaar Exposed", desc: "Confidential identity documents leaked" },
];

const SECURE_STEPS = [
  { text: "Authenticated User", desc: "Verified student/faculty credentials" },
  { text: "Backend Authorization", desc: "RBAC validates student permissions" },
  { text: "Temporary Presigned URL", desc: "Cryptographic token expires in 15m" },
  { text: "Private S3 Object", desc: "Encrypted at rest, never public" },
];

export function Security() {
  return (
    <Section id="security" className="relative overflow-visible min-h-[900px]">
      <Chapter
        num="07"
        kicker="Security"
        title="Security: The Most Important Layer"
        tagline="Student identity documents are sensitive — six layers stand between them and the internet."
      />

      {/* TOP SECTION: Left: All 6 Security Layer Boxes (taller height, stacked) | Right: 3D Holographic Security Shield (smaller) */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2 items-center relative z-10">
        {/* LEFT COLUMN: All 6 Security Layers stacked with a bit larger height */}
        <div className="flex flex-col gap-3.5">
          {LAYERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.04}>
              <div className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-white/15 card-opaque px-5 py-3.5 shadow-lg transition-all duration-300 hover:border-aws/50 hover:shadow-[0_0_25px_rgba(255,153,0,0.2)]">
                {/* L1 to L6 centered vertically */}
                <span className="font-mono text-sm text-slate-400 font-bold shrink-0 self-center">
                  L{i + 1}
                </span>
                {/* Logo Icon with comfortable container */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-aws/30 bg-aws/10 text-aws transition-transform duration-300 group-hover:scale-110">
                  <l.icon className="h-5 w-5" />
                </span>
                {/* Written Part */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-semibold text-white tracking-wide">{l.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    {l.points.join(" · ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* RIGHT COLUMN: 3D Holographic Security Padlock Shield (made smaller, positioned cleanly in right side) */}
        <div className="flex items-center justify-center">
          <div className="relative w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
            <img
              src="/images/s3-security-3d.jpg"
              alt="3D Holographic Security Padlock Shield"
              loading="lazy"
              className="h-full w-full object-contain opacity-90 scale-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/25 to-[#070c18]/85" />

            {/* Active 3D Live Vertical Laser Scan Beam */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[220px] lg:w-[260px] animate-scan-shield">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00F0FF]" />
              <div className="h-6 w-full bg-gradient-to-b from-cyan-400/20 to-transparent blur-sm" />
            </div>

            {/* Continuously Rotating Holographic Rings around the central Lock */}
            <div
              className="pointer-events-none absolute left-[50.5%] top-[53%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* Outer Cyan Ring */}
              <div
                className="relative flex items-center justify-center rounded-full animate-spin"
                style={{
                  width: "190px",
                  height: "190px",
                  transform: "rotateX(68deg) rotateY(-10deg)",
                  transformStyle: "preserve-3d",
                  animationDuration: "8s",
                  animationTimingFunction: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/70 shadow-[0_0_35px_rgba(0,240,255,0.85)]" />
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-cyan-100 shadow-[0_0_20px_#00F0FF]" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00F0FF]" />
              </div>

              {/* Inner Amber Counter-Rotating Ring */}
              <div
                className="absolute flex items-center justify-center rounded-full animate-spin"
                style={{
                  width: "135px",
                  height: "135px",
                  transform: "rotateX(68deg) rotateY(-10deg)",
                  transformStyle: "preserve-3d",
                  animationDuration: "12s",
                  animationDirection: "reverse",
                  animationTimingFunction: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-aws/80 shadow-[0_0_25px_rgba(255,153,0,0.75)]" />
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_18px_#FF9900]" />
              </div>

              {/* Radar Wave Emission Ping */}
              <div
                className="absolute rounded-full border-2 border-cyan-300/40 animate-ping opacity-35"
                style={{
                  width: "110px",
                  height: "110px",
                  transform: "rotateX(68deg) rotateY(-10deg)",
                  animationDuration: "3s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Underneath the top layers, place the other two tables (Bad vs Secure Arch) */}
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl relative z-10">
          {/* Bad Architecture Flow */}
          <Reveal delay={0.15}>
            <div className="h-full rounded-2xl border border-rose-500/40 card-opaque p-5 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-rose-500/20 pb-3">
                  <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-rose-300">
                    <ShieldAlert className="h-4 w-4 text-rose-400" /> Bad Arch
                  </p>
                  <span className="rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                    Vulnerable
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  {BAD_STEPS.map((s, i) => (
                    <div key={s.text} className="w-full flex flex-col items-center">
                      <div className="w-full rounded-xl border border-rose-500/30 card-opaque-danger p-3 shadow-md">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                          <p className="text-xs font-semibold text-rose-100">{s.text}</p>
                        </div>
                        <p className="mt-1 pl-6 text-[11px] text-rose-300/80">{s.desc}</p>
                      </div>

                      {/* Prominent Glowing Arrow Down Marker */}
                      {i < BAD_STEPS.length - 1 && (
                        <div className="my-2 flex items-center justify-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-rose-500/50 bg-rose-950/80 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse">
                            <ArrowDown className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-center">
                <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-300">
                  <Globe className="h-3.5 w-3.5" /> One leaked link = Major Incident
                </p>
              </div>
            </div>
          </Reveal>

          {/* Secure Architecture Flow */}
          <Reveal delay={0.2}>
            <div className="h-full rounded-2xl border border-emerald-500/40 card-opaque p-5 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-emerald-500/20 pb-3">
                  <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" /> Secure Arch
                  </p>
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 font-medium">
                    Zero Trust
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  {SECURE_STEPS.map((s, i) => (
                    <div key={s.text} className="w-full flex flex-col items-center">
                      <div className="w-full rounded-xl border border-emerald-500/30 card-opaque-success p-3 shadow-md">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          <p className="text-xs font-semibold text-emerald-100">{s.text}</p>
                        </div>
                        <p className="mt-1 pl-6 text-[11px] text-emerald-300/80">{s.desc}</p>
                      </div>

                      {/* Prominent Glowing Arrow Down Marker */}
                      {i < SECURE_STEPS.length - 1 && (
                        <div className="my-2 flex items-center justify-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-950/80 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse">
                            <ArrowDown className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center">
                <p className="text-xs font-semibold text-emerald-300">
                  Verified, temporary & fully logged
                </p>
              </div>
            </div>
          </Reveal>
        </div>
    </Section>
  );
}
