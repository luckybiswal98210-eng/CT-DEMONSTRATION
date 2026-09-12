export interface SectionDef {
  id: string;
  num: string;
  label: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "hero", num: "00", label: "Intro" },
  { id: "problem", num: "01", label: "The Problem" },
  { id: "why-s3", num: "02", label: "Why Amazon S3" },
  { id: "architecture", num: "03", label: "Architecture" },
  { id: "inside-bucket", num: "04", label: "Inside S3" },
  { id: "upload", num: "05", label: "Upload Flow" },
  { id: "download", num: "06", label: "Download Flow" },
  { id: "security", num: "07", label: "Security" },
  { id: "lifecycle", num: "08", label: "Backup & Lifecycle" },
  { id: "performance", num: "09", label: "Scalability" },
  { id: "monitoring", num: "10", label: "Monitoring" },
  { id: "cost", num: "11", label: "Cost Model" },
  { id: "simulation", num: "12", label: "Live Demo" },
  { id: "real-world", num: "13", label: "One Request" },
  { id: "pros-cons", num: "14", label: "Trade-offs" },
  { id: "summary", num: "15", label: "Final Blueprint" },
  { id: "conclusion", num: "16", label: "Conclusion" },
];
