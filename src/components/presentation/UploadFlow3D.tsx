import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function UploadFlow3D() {
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
        className="relative w-full rounded-3xl border border-aws/35 bg-[#070c18] p-3 shadow-[0_0_90px_rgba(255,153,0,0.25)] overflow-hidden"
      >
        {/* High-Resolution Cinematic 3D Artwork */}
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "540px" }}>
          <img
            src="/images/s3-upload-flow-3d.jpg"
            alt="3D Direct S3 Upload Architecture with Presigned URL"
            className="h-full w-full object-cover scale-100 transition-transform duration-700 hover:scale-105"
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/10 to-[#070c18]/50" />

          {/* Continuous Flowing Electrical Lines & Circuit Pulses SVG Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="stream-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="stream-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9900" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#FF9900" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFD166" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Circuit Line 1 (Base Cyan Track) */}
            <path
              d="M 120 440 L 260 440 L 340 390 L 460 390 L 530 350 L 620 350"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            {/* Flowing Electrical Pulse 1 (Cyan) */}
            <path
              d="M 120 440 L 260 440 L 340 390 L 460 390 L 530 350 L 620 350"
              fill="none"
              stroke="url(#stream-cyan)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-electric-flow"
              filter="url(#glow-cyan)"
            />

            {/* Circuit Line 2 (Base Amber Track) */}
            <path
              d="M 150 310 L 280 310 L 360 270 L 480 270 L 550 300 L 640 300"
              fill="none"
              stroke="#FF9900"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            {/* Flowing Electrical Pulse 2 (Amber) */}
            <path
              d="M 150 310 L 280 310 L 360 270 L 480 270 L 550 300 L 640 300"
              fill="none"
              stroke="url(#stream-amber)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-electric-flow-fast"
              filter="url(#glow-amber)"
            />

            {/* Direct High-Energy Direct Laser Stream (Laptop to S3 Vault Core) */}
            <path
              d="M 280 375 L 530 325"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
            <path
              d="M 280 375 L 530 325"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-electric-flow"
              filter="url(#glow-cyan)"
            />

            {/* Flowing Circuit Bus Line along bottom */}
            <path
              d="M 80 510 L 320 510 L 440 450 L 700 450"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-electric-flow-fast"
              strokeOpacity="0.75"
            />

            {/* Pulsing Circuit Node Dots */}
            <circle cx="260" cy="440" r="4" fill="#00F0FF" className="animate-ping opacity-75" />
            <circle cx="260" cy="440" r="3" fill="#FFFFFF" />
            <circle cx="340" cy="390" r="4" fill="#00F0FF" />
            <circle cx="460" cy="390" r="4" fill="#00F0FF" className="animate-ping opacity-60" />
            <circle cx="460" cy="390" r="3" fill="#FFFFFF" />
            <circle cx="530" cy="350" r="5" fill="#FF9900" filter="url(#glow-amber)" />

            <circle cx="280" cy="310" r="4" fill="#FF9900" className="animate-ping opacity-75" />
            <circle cx="280" cy="310" r="3" fill="#FFD166" />
            <circle cx="360" cy="270" r="4" fill="#FF9900" />
            <circle cx="480" cy="270" r="4" fill="#FF9900" className="animate-ping opacity-60" />
            <circle cx="480" cy="270" r="3" fill="#FFFFFF" />
            <circle cx="550" cy="300" r="5" fill="#00F0FF" filter="url(#glow-cyan)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
