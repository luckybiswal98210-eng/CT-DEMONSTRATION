import { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  CheckCircle2,
  CloudUpload,
  Database,
  FileText,
  FolderOpen,
  GraduationCap,
  HardDrive,
  LayoutGrid,
  MonitorSmartphone,
  Network,
  ServerCog,
  Users,
} from "lucide-react";
import { Chapter, CountUp, Reveal, Section } from "../primitives";
import { FlowConnector } from "../FlowDiagram";
import { cn } from "@/lib/utils";

interface SimFile {
  name: string;
  key: string;
  size: string;
  folder: string;
  isNew?: boolean;
}

const INITIAL_FILES: SimFile[] = [
  { name: "certificate.pdf", key: "students/2026/1001/certificate.pdf", size: "2.4 MB", folder: "Certificates" },
  { name: "assignment1.pdf", key: "assignments/CS101/1001/assignment1.pdf", size: "890 KB", folder: "Assignments" },
  { name: "lecture-video.mp4", key: "faculty/204/lecture-video.mp4", size: "184 MB", folder: "Faculty" },
  { name: "profile.jpg", key: "students/2026/1001/profile.jpg", size: "486 KB", folder: "Students" },
  { name: "day1-044.jpg", key: "events/2026/fest/day1-044.jpg", size: "3.2 MB", folder: "Events" },
];

const FOLDERS = [
  { name: "Students", icon: GraduationCap, count: 3250 },
  { name: "Assignments", icon: BookOpen, count: 4102 },
  { name: "Certificates", icon: Award, count: 2318 },
  { name: "Faculty", icon: Briefcase, count: 1406 },
  { name: "Events", icon: Camera, count: 1410 },
];

const STATS = [
  { label: "Total Storage", value: 128, suffix: " GB" },
  { label: "Objects", value: 12486, suffix: "" },
  { label: "Students", value: 3250, suffix: "" },
  { label: "Documents", value: 8420, suffix: "" },
  { label: "Images", value: 2900, suffix: "" },
  { label: "Videos", value: 1166, suffix: "" },
];

function fmtSize(bytes: number) {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export function Simulation() {
  const [files, setFiles] = useState<SimFile[]>(INITIAL_FILES);
  const [folder, setFolder] = useState<string | null>(null);
  const [upload, setUpload] = useState<{ name: string; size: string; progress: number } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [archView, setArchView] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!upload) return;
    const t = setInterval(() => {
      setUpload((u) => {
        if (!u) return u;
        const next = Math.min(100, u.progress + 3 + Math.random() * 7);
        if (next >= 100 && !doneRef.current) {
          doneRef.current = true;
          clearInterval(t);
          setTimeout(() => {
            setFiles((f) => [
              {
                name: u.name,
                key: `students/2026/1001/${u.name}`,
                size: u.size,
                folder: folder ?? "Students",
                isNew: true,
              },
              ...f,
            ]);
            setUpload(null);
            setSuccess(u.name);
            setTimeout(() => setSuccess(null), 2600);
          }, 350);
        }
        return { ...u, progress: next };
      });
    }, 80);
    return () => clearInterval(t);
  }, [upload !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || upload) return;
    setSuccess(null);
    doneRef.current = false;
    setUpload({ name: f.name, size: fmtSize(f.size), progress: 0 });
    e.target.value = "";
  };

  const visible = folder ? files.filter((f) => f.folder === folder || f.isNew) : files;

  return (
    <Section id="simulation" className="max-w-7xl">
      <Chapter
        num="12"
        kicker="Interactive Demo"
        title="College Cloud Storage — Live Simulation"
        tagline="A working feel of the S3 console: browse prefixes, inspect objects, upload a file."
      />

      <Reveal>
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pulse/40 bg-pulse/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-pulse">
          <Network className="h-3.5 w-3.5" />
          Frontend simulation — no AWS connection, no credentials
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="rounded-xl border border-white/10 bg-panel/70 p-4 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className="mt-1.5 font-heading text-xl font-bold text-slate-100">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <Reveal delay={0.1}>
          <div className="space-y-2">
            <button
              data-testid="sim-folder-all"
              onClick={() => setFolder(null)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                folder === null ? "border-aws/50 bg-aws/10 text-aws" : "border-white/10 text-slate-300 hover:border-white/25",
              )}
            >
              <LayoutGrid className="h-4 w-4" /> All objects
            </button>
            {FOLDERS.map((f) => (
              <button
                key={f.name}
                data-testid={`sim-folder-${f.name.toLowerCase()}`}
                onClick={() => setFolder(f.name)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                  folder === f.name ? "border-aws/50 bg-aws/10 text-aws" : "border-white/10 text-slate-300 hover:border-white/25",
                )}
              >
                <f.icon className="h-4 w-4 text-amber-300" />
                {f.name}
                <span className="ml-auto font-mono text-[11px] text-slate-500">
                  {f.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1C] shadow-2xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-3.5">
              <span className="flex items-center gap-2 font-mono text-sm text-slate-200">
                <HardDrive className="h-4 w-4 text-aws" />
                college-management-prod
              </span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  data-testid="sim-architecture-toggle"
                  onClick={() => setArchView((v) => !v)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                    archView ? "border-pulse/50 bg-pulse/10 text-pulse" : "border-white/10 text-slate-400 hover:text-pulse",
                  )}
                >
                  <Network className="h-3.5 w-3.5" />
                  Architecture View
                </button>
                <button
                  data-testid="sim-upload-button"
                  onClick={() => inputRef.current?.click()}
                  disabled={!!upload}
                  className="flex items-center gap-2 rounded-lg bg-aws px-4 py-1.5 font-heading text-xs font-semibold text-ink transition-transform hover:scale-[1.03] disabled:opacity-50"
                >
                  <CloudUpload className="h-4 w-4" />
                  Upload File
                </button>
                <input
                  ref={inputRef}
                  data-testid="sim-file-input"
                  type="file"
                  className="hidden"
                  onChange={onPick}
                />
              </div>
            </div>

            {upload && (
              <div data-testid="sim-upload-progress" className="border-b border-white/10 bg-aws/5 px-5 py-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300">
                    Uploading to Amazon S3… <span className="text-slate-500">{upload.name}</span>
                  </span>
                  <span className="font-mono text-aws">{Math.floor(upload.progress)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-aws to-amber-300 transition-all duration-100"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
              </div>
            )}

            {success && (
              <div data-testid="sim-upload-success" className="flex items-center gap-2 border-b border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Upload Successful — {success} stored as a new object (simulated)
              </div>
            )}

            {archView ? (
              <div className="blueprint p-6">
                <div className="mx-auto flex max-w-xs flex-col text-center">
                  {[
                    { icon: Users, label: "Students / Faculty / Admin" },
                    { icon: MonitorSmartphone, label: "React College Portal" },
                    { icon: ServerCog, label: "Backend API · Auth + Presigned URLs" },
                  ].map((n, i) => (
                    <div key={n.label}>
                      <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-panel/80 px-4 py-3 text-sm text-slate-200">
                        <n.icon className="h-4 w-4 text-aws" /> {n.label}
                      </div>
                      <FlowConnector delay={i * 0.3} />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-pulse/30 bg-pulse/5 px-3 py-3 text-xs text-pulse">
                      <Database className="h-4 w-4" /> Database · metadata
                    </div>
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-aws/40 bg-aws/10 px-3 py-3 text-xs text-aws">
                      <HardDrive className="h-4 w-4" /> Amazon S3 · files
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {visible.map((f) => (
                  <div key={f.key} className="flex items-center gap-3 px-5 py-3">
                    {f.isNew ? (
                      <FolderOpen className="h-4 w-4 shrink-0 text-emerald-300" />
                    ) : (
                      <FileText className="h-4 w-4 shrink-0 text-sky-300" />
                    )}
                    <span className="truncate font-mono text-xs text-slate-300 md:text-sm">{f.key}</span>
                    {f.isNew && (
                      <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-[10px] uppercase text-emerald-300">
                        new
                      </span>
                    )}
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-slate-500">{f.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
