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
  { id: "cost", num: "10", label: "Cost Model" },
  { id: "simulation", num: "11", label: "Live Demo" },
  { id: "real-world", num: "12", label: "One Request" },
  { id: "pros-cons", num: "13", label: "Trade-offs" },
  { id: "conclusion", num: "14", label: "Conclusion" },
];
