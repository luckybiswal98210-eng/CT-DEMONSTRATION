import {
  Archive,
  CheckCircle2,
  CloudUpload,
  Database,
  FileUp,
  KeyRound,
  ScanSearch,
  Ticket,
} from "lucide-react";
import { Chapter, Reveal, Section, Term } from "../primitives";
import { FlowSteps } from "../FlowDiagram";
import { DeepDive } from "../DeepDive";
import { UploadFlow3D } from "../UploadFlow3D";

const STEPS = [
  { icon: FileUp, title: "Student selects file", sub: "certificate.pdf · 2.4 MB", tone: "amber" as const },
  { icon: ScanSearch, title: "Frontend validates file", sub: "type, size, name — before any network call", tone: "cyan" as const },
  { icon: KeyRound, title: "Backend authenticates student", sub: "session / JWT verified, permission checked", tone: "amber" as const },
  { icon: Ticket, title: "Backend generates upload authorization", sub: "presigned PUT URL, expires in 300s", tone: "cyan" as const },
  { icon: CloudUpload, title: "File uploads directly to S3", sub: "browser → S3, bypassing the API server", tone: "amber" as const },
  { icon: Archive, title: "S3 stores the object", sub: "durable, replicated, encrypted at rest", tone: "green" as const },
  { icon: Database, title: "Backend stores object metadata", sub: "key, size, type, owner → PostgreSQL", tone: "cyan" as const },
  { icon: CheckCircle2, title: "Success response returned", sub: "student sees 'Upload Successful'", tone: "green" as const },
];

const CODE = `// Node.js — AWS SDK v3 (runs on the backend only)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const command = new PutObjectCommand({
  Bucket: "college-management-prod",
  Key: "students/2026/1001/certificate.pdf",
  ContentType: "application/pdf",
});

const uploadUrl = await getSignedUrl(s3Client, command, {
  expiresIn: 300, // URL is valid for 5 minutes
});`;

export function Upload() {
  return (
    <Section id="upload">
      <Chapter
        num="05"
        kicker="Upload Workflow"
        title="How Does a Student Upload a Certificate?"
        tagline="The browser uploads straight to S3 — AWS credentials never touch the frontend."
      />

      <Reveal>
        <p className="mb-12 max-w-3xl text-base leading-relaxed text-slate-300">
          The key mechanism is the{" "}
          <Term tip="A presigned URL is a temporary, cryptographically signed URL that grants time-limited permission to upload or download one specific object — without exposing AWS credentials.">
            presigned URL
          </Term>
          : temporary upload authorization created by the backend, usable for a few minutes, for one
          specific object key only.
        </p>
      </Reveal>

      <div className="layout-split items-start">
        <div className="layout-split-left">
          <Reveal>
            <FlowSteps steps={STEPS} />
          </Reveal>
        </div>

        {/* RIGHT COLUMN: 3D Live Presigned URL Direct Upload & DeepDive */}
        <div className="layout-split-right flex flex-col gap-6">
          <Reveal delay={0.15} className="w-full">
            <UploadFlow3D />
          </Reveal>

          <Reveal delay={0.25} className="w-full">
            <DeepDive
              testId="deepdive-upload"
              basic="Instead of sending the file through the college server, the server gives the browser a special one-time pass, and the browser delivers the file straight to S3."
              technical="A presigned URL is a temporary, secure link created using AWS Signature V4. When a student uploads a file, their browser sends it directly to Amazon S3 instead of routing heavy file data through the college server. This keeps server CPU and bandwidth fast and free, while S3 automatically validates the security signature, file size limits, and expiration timer on every upload."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
