import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Lightbulb,
  Link2,
  Play,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { HOW_IT_WORKS } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STEPS = HOW_IT_WORKS.map((s, i) => ({
  ...s,
  accent: [
    "from-violet-500 via-purple-500 to-cyan-400",
    "from-fuchsia-500 via-violet-500 to-pink-400",
    "from-cyan-500 via-blue-500 to-violet-500",
    "from-amber-400 via-orange-500 to-rose-400",
  ][i],
  glow: ["violet", "fuchsia", "cyan", "amber"][i],
  tag: ["Connect", "Generate", "Evaluate", "Ship"][i],
}));

function StepPreview({ step }: { step: number }) {
  const previews: Record<number, React.ReactNode> = {
    0: (
      <div className="space-y-2.5 p-1">
        {["REST URL", "Bedrock agentId", "API key"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          >
            <Link2 className="h-3.5 w-3.5 shrink-0 text-violet-400" />
            <span className="text-[11px] text-white/50">{label}</span>
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </motion.div>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-[10px] font-medium text-cyan-400"
        >
          8 platforms · 60s setup
        </motion.p>
      </div>
    ),
    1: (
      <div className="space-y-2 p-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-2 text-[11px] text-fuchsia-200"
        >
          &ldquo;Support bot handles refunds&hellip;&rdquo;
        </motion.div>
        {["PII edge cases", "Tool-call flows", "Escalation paths"].map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-2 text-[11px] text-white/60"
          >
            <Sparkles className="h-3 w-3 text-fuchsia-400" />
            {t}
            <CheckCircle2 className="ml-auto h-3 w-3 text-emerald-400" />
          </motion.div>
        ))}
      </div>
    ),
    2: (
      <div className="space-y-3 p-1">
        <div className="flex items-center justify-between text-[10px] text-white/40">
          <span>prod-regression</span>
          <span className="text-cyan-400">Running</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
            initial={{ width: "0%" }}
            animate={{ width: "72%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { l: "PII", ok: true },
            { l: "Grounded", ok: true },
            { l: "Tools", ok: false },
            { l: "G-Eval", ok: true },
          ].map((e, i) => (
            <motion.div
              key={e.l}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className={`rounded-md px-2 py-1.5 text-center text-[10px] font-medium ${
                e.ok ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
              }`}
            >
              {e.l} {e.ok ? "✓" : "✗"}
            </motion.div>
          ))}
        </div>
      </div>
    ),
    3: (
      <div className="space-y-2 p-1">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2"
        >
          <div className="text-center">
            <p className="font-display text-xl font-bold text-emerald-400">94%</p>
            <p className="text-[9px] text-white/40">Pass rate</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <p className="text-[11px] leading-snug text-white/60">
            Fix tool calls first — 3 failures in prod-regression
          </p>
        </motion.div>
        <div className="flex gap-2">
          {["HTML report", "Jira", "GitHub"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-white/10 py-1.5 text-[9px] text-white/50"
            >
              {i === 0 && <Lightbulb className="h-2.5 w-2.5 text-amber-400" />}
              {i === 1 && <GitBranch className="h-2.5 w-2.5 text-cyan-400" />}
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    ),
  };
  return previews[step] ?? null;
}

export function HowItWorks() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const current = STEPS[active];
  const Icon = current.icon as LucideIcon;

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-6" id="how-it-works">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              The journey
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              How <span className="gradient-text">noryx</span> works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Four fluid steps from first connection to CI-gated deploys.
            </p>
          </div>
        </SectionReveal>

        <div ref={ref} className="relative mt-14 lg:mt-20">
          {/* Fluid pipeline — desktop */}
          <div className="relative hidden lg:block">
            <svg
              className="absolute left-0 right-0 top-[52px] h-[4px] w-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 4"
              aria-hidden
            >
              <defs>
                <linearGradient id="how-pipe" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop stopColor="#7C3AED" />
                  <stop offset="0.33" stopColor="#06B6D4" />
                  <stop offset="0.66" stopColor="#EC4899" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <motion.rect
                x="0"
                y="0"
                height="4"
                rx="2"
                fill="url(#how-pipe)"
                fillOpacity="0.25"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              {!reduced && (
                <motion.rect
                  y="0"
                  height="4"
                  width="80"
                  rx="2"
                  fill="url(#how-pipe)"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 920, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </svg>

            <div className="relative grid grid-cols-4 gap-4">
              {STEPS.map((step, i) => {
                const StepIcon = step.icon as LucideIcon;
                const isActive = active === i;
                const isPast = i < active;
                return (
                  <motion.button
                    key={step.step}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group relative flex flex-col items-center text-center"
                    aria-pressed={isActive}
                    aria-label={`Step ${step.step}: ${step.title}`}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <div className="relative">
                      {isActive && !reduced && (
                        <motion.div
                          layoutId="step-ring"
                          className={`absolute -inset-3 rounded-full bg-gradient-to-r ${step.accent} opacity-30 blur-md`}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                      )}
                      <motion.div
                        className={`relative flex h-[104px] w-[104px] items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                          isActive
                            ? `border-transparent bg-gradient-to-br ${step.accent} shadow-xl`
                            : isPast
                              ? "border-emerald-500/40 bg-emerald-500/10"
                              : "border-white/15 bg-white/[0.04] group-hover:border-white/30"
                        }`}
                        animate={isActive && !reduced ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                      >
                        <StepIcon
                          className={`h-9 w-9 ${isActive ? "text-white" : isPast ? "text-emerald-400" : "text-white/50"}`}
                        />
                        <span
                          className={`absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            isActive
                              ? "bg-[#0a0918] text-white ring-2 ring-white/20"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {isPast && !isActive ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            step.step
                          )}
                        </span>
                      </motion.div>
                    </div>
                    <span
                      className={`mt-4 text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? "text-cyan-300" : "text-white/35"
                      }`}
                    >
                      {step.tag}
                    </span>
                    <span
                      className={`mt-1 font-display text-sm font-semibold transition-colors ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      {step.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Mobile step pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden scrollbar-none">
            {STEPS.map((step, i) => (
              <button
                key={step.step}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active === i
                    ? `border-transparent bg-gradient-to-r ${step.accent} text-white`
                    : "border-white/15 text-white/50"
                }`}
              >
                {step.step}. {step.tag}
              </button>
            ))}
          </div>

          {/* Detail stage */}
          <motion.div
            className="how-stage relative mt-10 overflow-hidden rounded-3xl border border-white/10 lg:mt-14"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-700 ${current.accent}`}
              aria-hidden
            />

            <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_280px] lg:items-center">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduced ? false : { opacity: 0, x: -20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={reduced ? undefined : { opacity: 0, x: 20, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${current.accent}`}
                      >
                        Step {current.step}
                      </span>
                      <motion.span
                        className="flex items-center gap-1 text-xs text-white/40"
                        animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="h-3 w-3" /> Live preview
                      </motion.span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                      {current.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base text-white/60 leading-relaxed md:text-lg">
                      {current.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {STEPS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActive(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === active ? "w-10 bg-gradient-to-r from-violet-500 to-cyan-400" : "w-3 bg-white/20"
                          }`}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => setActive((a) => (a + 1) % STEPS.length)}
                        className="ml-2 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Next step <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`preview-${active}`}
                  initial={reduced ? false : { opacity: 0, scale: 0.92, rotateY: -8 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.95, rotateY: 8 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl border border-white/15 bg-[#0d0c18]/90 p-5 shadow-2xl backdrop-blur-md"
                  style={{ perspective: 800, transformStyle: "preserve-3d" }}
                >
                  <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${current.accent}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40">Stage preview</p>
                      <p className="text-xs font-semibold text-white/80">{current.tag}</p>
                    </div>
                  </div>
                  <StepPreview step={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile vertical timeline */}
            <div className="border-t border-white/10 px-6 py-4 lg:hidden">
              <div className="flex items-center justify-between gap-2">
                {STEPS.map((step, i) => (
                  <div key={step.step} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={`h-1 w-full rounded-full transition-colors ${
                        i <= active ? "bg-gradient-to-r from-violet-500 to-cyan-400" : "bg-white/10"
                      }`}
                    />
                    <span className="text-[9px] text-white/40">{step.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
