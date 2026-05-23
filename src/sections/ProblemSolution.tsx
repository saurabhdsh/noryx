import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { SectionReveal } from "../components/SectionReveal";
import { PROBLEMS, SOLUTIONS } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

const PAIR_COUNT = Math.min(PROBLEMS.length, SOLUTIONS.length);

export function ProblemSolution() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % PAIR_COUNT);
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-6" id="problem">
      {/* Section ambience */}
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              Chaos → Control
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              From <span className="text-rose-400">broken agents</span> to{" "}
              <span className="gradient-text">production confidence</span>
            </h2>
          </div>
        </SectionReveal>

        <div ref={ref} className="relative mt-16 lg:mt-20">
          {/* Desktop pipeline layout */}
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_140px_1fr] lg:gap-4 xl:grid-cols-[1fr_180px_1fr]">
            <ProblemPanel
              active={active}
              onSelect={setActive}
              inView={inView}
              reduced={reduced}
            />

            <TransformHub active={active} inView={inView} reduced={reduced} />

            <SolutionPanel active={active} inView={inView} reduced={reduced} />
          </div>

          {/* Mobile flow connector */}
          <div className="mt-6 flex justify-center lg:hidden" aria-hidden>
            <motion.div
              className="flex flex-col items-center gap-1 text-cyan-400/60"
              animate={reduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-8 w-px bg-gradient-to-b from-rose-500/50 to-cyan-400" />
              <Zap className="h-4 w-4" />
              <div className="h-8 w-px bg-gradient-to-b from-cyan-400 to-emerald-400/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemPanel({
  active,
  onSelect,
  inView,
  reduced,
}: {
  active: number;
  onSelect: (i: number) => void;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="problem-panel relative overflow-hidden rounded-3xl border border-rose-500/25 p-6 md:p-8"
      initial={reduced ? false : { opacity: 0, x: -40, rotate: -1 }}
      animate={inView ? { opacity: 1, x: 0, rotate: -0.5 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="problem-scanline pointer-events-none absolute inset-0 rounded-3xl opacity-[0.07]" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            The problem
          </span>
          <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white md:text-2xl">
            Production fails in ways{" "}
            <span className="text-rose-400/90">manual QA never catches</span>
          </h3>
        </div>
        <motion.div
          animate={reduced ? undefined : { rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          className="hidden shrink-0 rounded-2xl border border-rose-500/30 bg-rose-950/50 p-3 sm:block"
        >
          <AlertTriangle className="h-8 w-8 text-rose-400" />
        </motion.div>
      </div>

      <ul className="relative mt-8 space-y-3" role="list">
        {PROBLEMS.map(({ icon: Icon, text }, i) => {
          const isActive = active === i;
          return (
            <motion.li
              key={text}
              role="listitem"
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-rose-400/60 bg-rose-500/15 shadow-lg shadow-rose-900/30"
                    : "border-white/10 bg-white/[0.03] hover:border-rose-500/30 hover:bg-rose-500/5"
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="problem-glow"
                    className="absolute inset-0 bg-gradient-to-r from-rose-600/20 via-transparent to-transparent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-rose-500/30 text-rose-300" : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {isActive && !reduced && (
                    <motion.span
                      className="absolute inset-0 rounded-xl border border-rose-400/50"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </span>
                <span className="relative flex-1">
                  <span
                    className={`block text-sm font-medium leading-snug transition-colors md:text-base ${
                      isActive ? "text-white" : "text-white/65"
                    }`}
                  >
                    {text}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-rose-600 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? "100%" : "35%" }}
                        transition={{ duration: isActive ? 2.8 : 0.4 }}
                      />
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-rose-400/80">
                      Risk
                    </span>
                  </span>
                </span>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="shrink-0 text-rose-400"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function TransformHub({
  active,
  inView,
  reduced,
}: {
  active: number;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <div className="relative hidden flex-col items-center justify-center lg:flex">
      {/* Flow lines to panels */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 180 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="flow-out" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#f43f5e" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const y = 70 + i * 72;
          const activeY = 70 + active * 72;
          const isActive = i === active;
          return (
            <g key={i}>
              <motion.path
                d={`M 0 ${y} Q 90 ${y} 90 200 T 180 ${200 + (i - 1.5) * 20}`}
                fill="none"
                stroke="url(#flow-out)"
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.7 : 0.15}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
              />
              {isActive && !reduced && (
                <motion.circle
                  r="4"
                  fill="#06b6d4"
                  filter="url(#glow-dot)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  style={{
                    offsetPath: `path('M 0 ${activeY} Q 90 ${activeY} 90 200 T 180 ${200 + (active - 1.5) * 20}')`,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={reduced ? false : { scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      >
        <div className="relative flex h-28 w-28 items-center justify-center">
          {!reduced && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-violet-500/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-dashed border-cyan-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 shadow-xl shadow-violet-500/40">
            <Sparkles className="h-9 w-9 text-white" />
          </div>
          <motion.div
            className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-xl"
            animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>

        <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-300/90">
          noryx
        </p>
        <p className="mt-1 max-w-[120px] text-center text-[10px] leading-tight text-white/45">
          Transforms risk into governed evals
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/70"
          >
            Pair {active + 1} / {PAIR_COUNT}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-4 flex items-center gap-2 text-cyan-400/70"
        animate={reduced ? undefined : { x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden
      >
        <ArrowRight className="h-4 w-4 rotate-180 opacity-40" />
        <div className="flex gap-1">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
            />
          ))}
        </div>
        <ArrowRight className="h-4 w-4" />
      </motion.div>
    </div>
  );
}

function SolutionPanel({
  active,
  inView,
  reduced,
}: {
  active: number;
  inView: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="solution-panel relative overflow-hidden rounded-3xl border border-cyan-500/25 p-6 md:p-8"
      initial={reduced ? false : { opacity: 0, x: 40, rotate: 1 }}
      animate={inView ? { opacity: 1, x: 0, rotate: 0.5 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-[80px]" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
            <Check className="h-3 w-3" />
            The solution
          </span>
          <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white md:text-2xl">
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              noryx
            </span>{" "}
            is your continuous evaluation control plane
          </h3>
        </div>
        <motion.div
          className="hidden shrink-0 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3 sm:block"
          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Check className="h-8 w-8 text-emerald-400" />
        </motion.div>
      </div>

      <ul className="relative mt-8 space-y-3" role="list">
        {SOLUTIONS.map((text, i) => {
          const isActive = active === i;
          const Icon = PROBLEMS[i]?.icon;
          return (
            <motion.li
              key={text}
              role="listitem"
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div
                className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 transition-all duration-500 ${
                  isActive
                    ? "border-emerald-400/50 bg-emerald-500/10 shadow-lg shadow-emerald-900/25"
                    : "border-white/10 bg-white/[0.03] opacity-70"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                    >
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="icon"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/30"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="flex-1">
                  <span
                    className={`block text-sm font-medium leading-snug transition-colors md:text-base ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  >
                    {text}
                  </span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      Resolved by noryx
                    </motion.span>
                  )}
                </span>

                {isActive && !reduced && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-400 to-violet-500"
                    layoutId="solution-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
