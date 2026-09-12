import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause, RotateCcw, ShieldCheck } from "lucide-react";

const MODELS = [
  {
    id: "cube",
    name: "S3 Hologram Cube",
    src: "/images/s3-hero-cube-hologram.jpg",
    badge: "S3 OBJECT VAULT · ACTIVE",
  },
  {
    id: "vault",
    name: "S3 Hex Vault",
    src: "/images/s3-hero-vault-live.jpg",
    badge: "S3 CORE VAULT · 11 9s",
  },
  {
    id: "core",
    name: "S3 Cyber Matrix",
    src: "/images/s3-hero-core-3d.jpg",
    badge: "S3 VAULT MATRIX · SSE-KMS",
  },
];

export function HeroCore3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelIndex, setModelIndex] = useState(0);
  const [autoSpin, setAutoSpin] = useState(true);

  const currentModel = MODELS[modelIndex];

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid natural motion
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleReset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleNextModel = () => {
    setModelIndex((prev) => (prev + 1) % MODELS.length);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "1200px", width: "100%", height: "100%" }}
    >
      {/* 3D Tilting Vault Core Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[580px] aspect-square rounded-3xl p-3 flex items-center justify-center transition-shadow duration-500"
      >
        {/* Outer Radiant Glow Atmosphere */}
        <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/20 via-amber-500/15 to-transparent blur-3xl opacity-75" />

        {/* High-Resolution Cinematic 3D S3 Core Vault Image */}
        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-cyan-400/40 shadow-[0_0_80px_rgba(0,240,255,0.25)] bg-[#070c18]/90">
          <img
            key={currentModel.id}
            src={currentModel.src}
            alt={currentModel.name}
            className={`h-full w-full object-cover scale-105 transition-all duration-700 ${autoSpin ? "animate-pulse" : ""}`}
            style={{ animationDuration: "6s" }}
          />

          {/* Dynamic Holographic Specular Glare reacting to cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-35"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
            }}
          />

          {/* Ambient Dark Edge Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/10 to-[#070c18]/60" />

          {/* Floating Holographic Technical Badges */}
          <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full border border-cyan-400/60 bg-[#070c18]/90 px-3 py-1 font-mono text-[10px] text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{currentModel.badge}</span>
          </div>

          <div className="pointer-events-none absolute bottom-14 right-4 z-20 flex items-center gap-1.5 rounded-full border border-aws/60 bg-[#070c18]/90 px-3 py-1 font-mono text-[10px] text-amber-300 shadow-[0_0_15px_rgba(255,153,0,0.4)] backdrop-blur-md">
            <ShieldCheck className="h-3 w-3 text-aws" />
            <span>COLLEGE DATA REPO · S3 STANDARD</span>
          </div>

          {/* Live Telemetry Radar Wave */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full border border-cyan-400/30 animate-ping opacity-20" style={{ animationDuration: "4s" }} />
          </div>
        </div>

        {/* Bottom Interactive HUD Controls */}
        <div className="pointer-events-auto absolute bottom-3 left-6 right-6 z-30 flex items-center justify-between">
          <button
            onClick={handleNextModel}
            title="Switch 3D View Concept"
            className="flex items-center gap-2 rounded-full border border-aws/60 bg-[#070c18]/95 px-3.5 py-1.5 font-mono text-[11px] text-amber-300 shadow-[0_0_20px_rgba(255,153,0,0.35)] hover:border-aws hover:bg-aws/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-aws animate-ping" />
            <span className="font-bold">⇄ SWITCH 3D MODEL</span>
            <span className="text-slate-400 font-normal">({currentModel.name})</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpin(!autoSpin)}
              title={autoSpin ? "Pause Pulse" : "Resume Pulse"}
              className="flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-[#070c18]/90 px-3 font-mono text-[10px] text-slate-300 hover:border-aws/50 hover:text-aws transition-all shadow-md backdrop-blur-md"
            >
              {autoSpin ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{autoSpin ? "Pulse" : "Static"}</span>
            </button>
            <button
              onClick={handleReset}
              title="Reset 3D Angle"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#070c18]/90 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-all shadow-md backdrop-blur-md"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
