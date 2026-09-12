import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function NetworkPipeline3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "1200px", width: "100%" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-3xl border border-pulse/35 bg-[#070c18] p-3 shadow-[0_0_90px_rgba(0,240,255,0.25)] overflow-hidden"
      >
        {/* High-Resolution Cinematic 3D Artwork */}
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "540px" }}>
          <img
            src="/images/s3-request-pipeline-3d.jpg"
            alt="3D Request Pipeline and Latency Check Architecture"
            className="h-full w-full object-cover scale-100 transition-transform duration-700 hover:scale-105"
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/10 to-[#070c18]/50" />

          {/* Continuous Flowing Electrical Lines & Fiber Stream SVG Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow-pipeline-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-pipeline-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="pipe-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="pipe-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9900" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#FF9900" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFD166" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Pipeline Stream 1 (Workstation -> Core Router -> Latency Nodes -> S3) */}
            <path
              d="M 170 470 L 290 470 L 290 350 L 190 280 L 260 230 L 350 180 L 460 210 L 530 240"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            {/* Animated Flowing Pulse (Client to S3 Request) */}
            <path
              d="M 170 470 L 290 470 L 290 350 L 190 280 L 260 230 L 350 180 L 460 210 L 530 240"
              fill="none"
              stroke="url(#pipe-cyan)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-electric-flow"
              filter="url(#glow-pipeline-cyan)"
            />

            {/* Pipeline Stream 2 (S3 Response Stream -> Edge Gateway -> Client) */}
            <path
              d="M 530 380 L 440 430 L 370 470 L 250 510 L 150 510"
              fill="none"
              stroke="#FF9900"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            {/* Animated Flowing Pulse (S3 Response to Client) */}
            <path
              d="M 530 380 L 440 430 L 370 470 L 250 510 L 150 510"
              fill="none"
              stroke="url(#pipe-amber)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-electric-flow-fast"
              filter="url(#glow-pipeline-amber)"
            />

            {/* High-speed Fiber Bundle feeding directly into the S3 Cube */}
            <path
              d="M 450 340 L 540 340"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-electric-flow"
              filter="url(#glow-pipeline-cyan)"
            />
            <path
              d="M 460 360 L 540 360"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-electric-flow-fast"
              filter="url(#glow-pipeline-cyan)"
            />
            <path
              d="M 470 380 L 540 380"
              fill="none"
              stroke="#FF9900"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-electric-flow"
              filter="url(#glow-pipeline-amber)"
            />

            {/* Pulsing Circuit Node Dots at Routers & Latency Checkpoints */}
            <circle cx="290" cy="470" r="4" fill="#00F0FF" className="animate-ping opacity-80" />
            <circle cx="290" cy="470" r="3" fill="#FFFFFF" />
            <circle cx="290" cy="350" r="4" fill="#00F0FF" />
            <circle cx="190" cy="280" r="5" fill="#00F0FF" filter="url(#glow-pipeline-cyan)" />
            <circle cx="260" cy="230" r="5" fill="#FF9900" filter="url(#glow-pipeline-amber)" />
            <circle cx="350" cy="180" r="5" fill="#00F0FF" filter="url(#glow-pipeline-cyan)" />
            <circle cx="440" cy="430" r="4" fill="#FF9900" className="animate-ping opacity-75" />
            <circle cx="440" cy="430" r="3" fill="#FFD166" />
            <circle cx="370" cy="470" r="4" fill="#FF9900" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
