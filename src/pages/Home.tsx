import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { SECTIONS } from "@/components/presentation/sections";
import { Chrome } from "@/components/presentation/Chrome";
import { Marquee } from "@/components/presentation/Marquee";
import { Hero } from "@/components/presentation/sections/Hero";
import { Problem } from "@/components/presentation/sections/Problem";
import { WhyS3 } from "@/components/presentation/sections/WhyS3";
import { Architecture } from "@/components/presentation/sections/Architecture";
import { InsideBucket } from "@/components/presentation/sections/InsideBucket";
import { Upload } from "@/components/presentation/sections/Upload";
import { Download } from "@/components/presentation/sections/Download";
import { Security } from "@/components/presentation/sections/Security";
import { Lifecycle } from "@/components/presentation/sections/Lifecycle";
import { Performance } from "@/components/presentation/sections/Performance";
import { Cost } from "@/components/presentation/sections/Cost";
import { Simulation } from "@/components/presentation/sections/Simulation";
import { RealWorldFlow } from "@/components/presentation/sections/RealWorldFlow";
import { ProsCons } from "@/components/presentation/sections/ProsCons";
import { Conclusion } from "@/components/presentation/sections/Conclusion";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [active, setActive] = useState("hero");
  const [presentation, setPresentation] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const jump = useCallback((id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.0, offset: -30 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        jump(SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)].id);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        jump(SECTIONS[Math.max(idx - 1, 0)].id);
      } else if (e.key.toLowerCase() === "p") {
        setPresentation((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, jump]);

  return (
    <div className="relative min-h-screen bg-ink text-slate-100">
      <Chrome
        sections={SECTIONS}
        active={active}
        presentation={presentation}
        onTogglePresentation={() => setPresentation((p) => !p)}
        onJump={jump}
      />
      <main>
        <Hero onExplore={() => jump("architecture")} />
        <Marquee />
        <Problem />
        <WhyS3 />
        <Architecture />
        <InsideBucket />
        <Upload />
        <Download />
        <Security />
        <Lifecycle />
        <Performance />
        <Cost />
        <Simulation />
        <RealWorldFlow />
        <ProsCons />
        <Conclusion />
      </main>
    </div>
  );
}
