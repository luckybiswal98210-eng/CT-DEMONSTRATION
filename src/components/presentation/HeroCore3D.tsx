export function HeroCore3D() {
  return (
    <div className="relative flex items-center justify-center select-none w-full h-full">
      {/* 3D Static Vault Core Container (360 tilt and text buttons disabled) */}
      <div className="relative w-full max-w-[560px] aspect-square rounded-3xl p-3 flex items-center justify-center">
        {/* Outer Radiant Glow Atmosphere */}
        <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/20 via-amber-500/15 to-transparent blur-3xl opacity-75" />

        {/* High-Resolution Cinematic 3D S3 Core Cube Image (Clean, No text overlays) */}
        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-cyan-400/40 shadow-[0_0_80px_rgba(0,240,255,0.25)] bg-[#070c18]">
          <img
            src="/images/s3-hero-cube-hologram.jpg"
            alt="Amazon S3 Cloud Storage 3D Core"
            className="h-full w-full object-cover scale-100 transition-transform duration-700 hover:scale-105"
          />

          {/* Ambient Dark Edge Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070c18]/10 to-[#070c18]/50" />
        </div>
      </div>
    </div>
  );
}
