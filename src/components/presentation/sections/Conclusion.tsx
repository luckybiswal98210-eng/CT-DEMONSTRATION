import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import { EASE, Reveal, Section } from "../primitives";

const STATEMENTS = [
  { text: "Store files in S3.", tone: "text-slate-100" },
  { text: "Store metadata in the database.", tone: "text-slate-100" },
  { text: "Control access through authentication, authorization and IAM.", tone: "text-aws" },
];

export function Conclusion() {
  return (
    <Section id="conclusion" className="max-w-5xl text-center">
      <p className="mb-14 font-mono text-xs uppercase tracking-[0.35em] text-slate-500">
        16 — Conclusion
      </p>

      <div className="space-y-6">
        {STATEMENTS.map((s, i) => (
          <motion.div
            key={s.text}
            className="overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: EASE }}
              className={`font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl ${s.tone}`}
            >
              {s.text}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.5}>
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/10 bg-panel/70 p-8 backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Result</p>
          <p className="mt-3 text-lg leading-relaxed text-slate-200 md:text-xl">
            A scalable, secure and maintainable cloud storage architecture for college applications.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-24 font-mono text-6xl font-bold uppercase tracking-[0.08em] md:text-8xl">
          <span className="text-animated-gradient">Thank You</span>
          <span className="animate-pulse text-aws">_</span>
        </p>
      </Reveal>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-aws to-transparent"
      />

      <Reveal delay={0.45}>
        <div className="mt-16 flex items-center justify-center gap-3 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
          <Cloud className="h-4 w-4 text-aws/60" />
          Cloud Storage Using Amazon S3 — Technical Case Study
        </div>
      </Reveal>
    </Section>
  );
}
