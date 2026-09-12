import { useState } from "react";
import {
  Cloud,
  Database,
  Globe,
  HardDrive,
  MonitorSmartphone,
  ServerCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Chapter, Reveal, Section } from "../primitives";
import { FlowConnector } from "../FlowDiagram";
import { DeepDive } from "../DeepDive";
import { cn } from "@/lib/utils";

interface ArchNode {
  id: string;
  icon: LucideIcon;
  title: string;
  sub: string;
  desc: string;
  bullets: string[];
}

const NODES: Record<string, ArchNode> = {
  users: {
    id: "users",
    icon: Users,
    title: "Students / Faculty / Admin",
    sub: "Actors",
    desc: "Every interaction starts here — uploading a certificate, downloading a marksheet, reviewing assignments.",
    bullets: ["Role-aware UI", "Works on any device", "HTTPS only"],
  },
  frontend: {
    id: "frontend",
    icon: MonitorSmartphone,
    title: "React / Web App",
    sub: "Frontend",
    desc: "The college portal. Validates files client-side and talks only to the backend API — never to AWS directly.",
    bullets: ["File type & size validation", "Upload progress UI", "Zero AWS credentials in browser"],
  },
  backend: {
    id: "backend",
    icon: ServerCog,
    title: "Backend API",
    sub: "Node.js / Express",
    desc: "Handles authentication, validation, business logic and all communication with AWS. Issues presigned URLs.",
    bullets: ["Authenticates every request", "Generates presigned URLs", "Writes metadata to DB"],
  },
  database: {
    id: "database",
    icon: Database,
    title: "PostgreSQL / MySQL",
    sub: "Metadata store",
    desc: "Stores structured metadata about every file — never the file itself.",
    bullets: ["user ID", "file name & type", "S3 object key", "upload timestamp", "file size"],
  },
  s3: {
    id: "s3",
    icon: HardDrive,
    title: "Amazon S3 Bucket",
    sub: "Object storage",
    desc: "Stores the actual files as objects, organised by key prefixes.",
    bullets: ["students/", "certificates/", "assignments/", "images/", "videos/"],
  },
  cloudfront: {
    id: "cloudfront",
    icon: Globe,
    title: "CloudFront",
    sub: "Optional CDN layer",
    desc: "Caches frequently accessed files at edge locations closer to users, reducing latency and S3 load.",
    bullets: ["Edge caching", "Lower latency", "Reduced origin requests"],
  },
};

function NodeCard({
  node,
  selected,
  onSelect,
}: {
  node: ArchNode;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = node.icon;
  return (
    <button
      data-testid={`arch-node-${node.id}`}
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border bg-panel/80 px-5 py-4 text-left backdrop-blur transition-all duration-300",
        selected
          ? "border-aws shadow-[0_0_35px_rgba(255,153,0,0.2)]"
          : "border-white/10 hover:border-aws/40",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
          selected ? "border-aws bg-aws text-ink" : "border-aws/30 bg-aws/10 text-aws",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-heading text-sm font-semibold text-slate-100 md:text-base">{node.title}</p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{node.sub}</p>
      </div>
    </button>
  );
}

export function Architecture() {
  const [selected, setSelected] = useState<string>("backend");
  const [showCdn, setShowCdn] = useState(true);
  const node = NODES[selected];

  return (
    <Section id="architecture">
      <Chapter
        num="03"
        kicker="System Architecture"
        title="End-to-End System Architecture"
        tagline="Click any component to inspect its role. Watch data pulse through the pipeline."
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <div className="blueprint rounded-3xl border border-white/10 bg-panel/40 p-6 md:p-8">
            <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
              College Management System
            </p>
            <div className="mx-auto flex max-w-sm flex-col">
              <NodeCard node={NODES.users} selected={selected === "users"} onSelect={() => setSelected("users")} />
              <FlowConnector />
              <NodeCard node={NODES.frontend} selected={selected === "frontend"} onSelect={() => setSelected("frontend")} />
              <FlowConnector delay={0.3} />
              <NodeCard node={NODES.backend} selected={selected === "backend"} onSelect={() => setSelected("backend")} />
              <FlowConnector delay={0.6} />
              <div className="grid grid-cols-2 gap-3">
                <NodeCard node={NODES.database} selected={selected === "database"} onSelect={() => setSelected("database")} />
                <NodeCard node={NODES.s3} selected={selected === "s3"} onSelect={() => setSelected("s3")} />
              </div>
              {showCdn && (
                <>
                  <FlowConnector delay={0.9} />
                  <NodeCard node={NODES.cloudfront} selected={selected === "cloudfront"} onSelect={() => setSelected("cloudfront")} />
                </>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                data-testid="cloudfront-toggle"
                onClick={() => setShowCdn((v) => !v)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  showCdn
                    ? "border-pulse/50 bg-pulse/10 text-pulse"
                    : "border-white/10 text-slate-400 hover:border-pulse/40 hover:text-pulse",
                )}
              >
                <Cloud className="h-3.5 w-3.5" />
                CloudFront layer: {showCdn ? "on" : "off"}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.15}>
            <div
              data-testid="arch-detail-panel"
              className="rounded-2xl border border-aws/25 bg-raise/70 p-6 backdrop-blur"
            >
              <div className="mb-3 flex items-center gap-3">
                <node.icon className="h-5 w-5 text-aws" />
                <h3 className="font-heading text-lg font-semibold text-slate-100">{node.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{node.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {node.bullets.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <DeepDive
              testId="deepdive-architecture"
              basic="The website shows pages, the server checks who you are, the database remembers information about each file, and S3 stores the files themselves."
              technical="The college backend API uses the AWS SDK to generate short-lived presigned URLs for users. The SQL database stores only lightweight file metadata (user ID, S3 object path, file type, upload time, and file size) instead of storing heavy file data. This architectural split keeps the database and API fast and scalable, while Amazon S3 reliably handles unlimited file storage in the cloud."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
