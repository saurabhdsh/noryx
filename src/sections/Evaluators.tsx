import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { EVALUATORS } from "../data/content";

export function Evaluators() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-visible px-4 py-24 md:px-6" id="evaluators">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl overflow-visible">
        <SectionReveal>
          <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
            10+ production-grade <span className="gradient-text">evaluators</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/55">
            Configure thresholds, severity levels, and LLM models per evaluator.
          </p>
        </SectionReveal>

        <div className="relative mt-14 overflow-visible pt-4 pb-2">
          <div className="flex flex-wrap justify-center gap-3 overflow-visible">
            {EVALUATORS.map((ev, i) => {
              const isHovered = hovered === i;
              return (
                <motion.div
                  key={ev.name}
                  className={`relative ${isHovered ? "z-[100]" : "z-0"}`}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  whileHover={{ scale: 1.03 }}
                >
                  <button
                    type="button"
                    className="glass relative flex items-center gap-3 rounded-full px-5 py-3 text-left transition hover:bg-white/10"
                    aria-describedby={isHovered ? `evaluator-tip-${i}` : undefined}
                    style={{
                      boxShadow: isHovered ? `0 0 24px ${ev.color}40` : undefined,
                    }}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: `conic-gradient(${ev.color} ${ev.pass ? 280 : 120}deg, rgba(255,255,255,0.1) 0)`,
                      }}
                    >
                      {ev.pass ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </span>
                    <span className="font-medium text-white/90">{ev.name}</span>
                  </button>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        id={`evaluator-tip-${i}`}
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-none absolute bottom-full left-1/2 z-[110] mb-3 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-white/15 bg-[#12101f]/95 p-4 text-sm text-white/75 shadow-2xl backdrop-blur-xl"
                      >
                        <div
                          className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-[#12101f]/95"
                          aria-hidden
                        />
                        <p className="relative leading-relaxed">{ev.description}</p>
                        <span
                          className={`relative mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            ev.pass
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-rose-500/20 text-rose-400"
                          }`}
                        >
                          {ev.pass ? "Pass example" : "Fail example"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
