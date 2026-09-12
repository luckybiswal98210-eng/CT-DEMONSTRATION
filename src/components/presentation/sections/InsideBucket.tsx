import { useState } from "react";
import { ChevronRight, FileText, FileImage, FileVideo, Landmark, Boxes, Box, Tags, type LucideIcon } from "lucide-react";
import { Chapter, Reveal, Section, Term } from "../primitives";
import { cn } from "@/lib/utils";

const HIERARCHY = [
  { icon: Landmark, label: "AWS Account" },
  { icon: Boxes, label: "S3 Bucket" },
  { icon: Box, label: "Objects" },
  { icon: Tags, label: "Key + Metadata + Data" },
];

interface S3Object {
  name: string;
  key: string;
  size: string;
  type: string;
  uploaded: string;
  storageClass: string;
  icon: LucideIcon;
  tone: string;
}

const OBJECTS: S3Object[] = [
  { name: "profile.jpg", key: "students/2026/1001/profile.jpg", size: "486 KB", type: "image/jpeg", uploaded: "02 Sept 2026", storageClass: "STANDARD", icon: FileImage, tone: "text-sky-300" },
  { name: "aadhaar.pdf", key: "students/2026/1001/aadhaar.pdf", size: "1.1 MB", type: "application/pdf", uploaded: "02 Sept 2026", storageClass: "STANDARD", icon: FileText, tone: "text-rose-300" },
  { name: "certificate.pdf", key: "students/2026/1001/certificate.pdf", size: "2.4 MB", type: "application/pdf", uploaded: "10 Sept 2026", storageClass: "STANDARD", icon: FileText, tone: "text-rose-300" },
  { name: "assignment1.pdf", key: "assignments/CS101/1001/assignment1.pdf", size: "890 KB", type: "application/pdf", uploaded: "14 Sept 2026", storageClass: "STANDARD", icon: FileText, tone: "text-rose-300" },
  { name: "lecture-video.mp4", key: "faculty/204/lecture-video.mp4", size: "184 MB", type: "video/mp4", uploaded: "18 Sept 2026", storageClass: "STANDARD_IA", icon: FileVideo, tone: "text-violet-300" },
  { name: "day1-044.jpg", key: "events/2026/fest/day1-044.jpg", size: "3.2 MB", type: "image/jpeg", uploaded: "21 Sept 2026", storageClass: "STANDARD", icon: FileImage, tone: "text-sky-300" },
];

export function InsideBucket() {
  const [selected, setSelected] = useState(2);
  const obj = OBJECTS[selected];

  return (
    <Section id="inside-bucket">
      <Chapter
        num="04"
        kicker="Inside Amazon S3"
        title="Buckets, Objects & Keys"
        tagline="S3 is object storage — not a traditional hierarchical file system."
      />

      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {HIERARCHY.map((h, i) => (
            <span key={h.label} className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-panel/70 px-4 py-2.5 text-sm text-slate-200">
                <h.icon className="h-4 w-4 text-aws" />
                {h.label}
              </span>
              {i < HIERARCHY.length - 1 && <ChevronRight className="h-4 w-4 text-slate-500" />}
            </span>
          ))}
        </div>
        <p className="mb-12 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
          A <Term tip="A bucket is a container for objects. This one: college-management-prod">bucket</Term> holds{" "}
          <Term tip="An object is the actual file plus its metadata.">objects</Term>. Each object has a unique{" "}
          <Term tip="The object key is the full identifier, e.g. students/2026/1001/certificate.pdf. The 'folders' are just prefixes inside the key — S3 has no real directories.">object key</Term> and{" "}
          <Term tip="Metadata describes the object: content type, size, custom tags, encryption status.">metadata</Term>.
          The folders below are part of the key name — not real directories.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/70 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <Boxes className="h-4 w-4 text-aws" />
              <span className="font-mono text-sm text-slate-200">college-management-prod</span>
              <span className="ml-auto rounded-full bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase text-emerald-300">
                private
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {OBJECTS.map((o, i) => (
                <button
                  key={o.key}
                  data-testid={`bucket-object-${i}`}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors",
                    i === selected ? "bg-aws/10" : "hover:bg-white/5",
                  )}
                >
                  <o.icon className={cn("h-4 w-4 shrink-0", o.tone)} />
                  <span className="truncate font-mono text-xs text-slate-300 md:text-sm">{o.key}</span>
                  <span className="ml-auto shrink-0 font-mono text-[11px] text-slate-500">{o.size}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div data-testid="bucket-object-detail" className="rounded-2xl border border-aws/25 bg-raise/70 p-6 backdrop-blur">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Object Inspector
            </p>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-aws/30 bg-aws/10">
                <obj.icon className="h-5 w-5 text-aws" />
              </span>
              <p className="font-heading text-lg font-semibold text-slate-100">{obj.name}</p>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                ["Key", obj.key, true],
                ["Size", obj.size, false],
                ["Content-Type", obj.type, true],
                ["Uploaded", obj.uploaded, false],
                ["Storage Class", obj.storageClass, true],
              ].map(([k, v, mono]) => (
                <div key={k as string} className="flex items-start justify-between gap-4 border-b border-white/5 pb-2.5">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className={cn("text-right text-slate-200", mono && "font-mono text-xs leading-5")}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
