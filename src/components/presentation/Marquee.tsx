const ITEMS = [
  "3,250+ Students",
  "850+ Faculty",
  "42 TB Academic Archive",
  "99.999999999% Durability",
  "Zero Servers to Maintain",
  "Pay-per-Use Storage",
  "Presigned URL Security",
  "Versioning & Lifecycle",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-panel/40 py-5">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-heading text-sm font-medium uppercase tracking-[0.25em] text-slate-400">
              {item}
            </span>
            <span className="mx-8 h-1.5 w-1.5 rounded-full bg-aws shadow-[0_0_12px_rgba(255,153,0,0.8)]" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
